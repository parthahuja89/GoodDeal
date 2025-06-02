import { SteamDeal } from "../api/models/SteamDeal";
import User from "../api/models/User";
import { db } from "../database/db";
import { game_meta_data, user_games, users } from "../database/Schema";
import { convertSteamAppIdsToItadGameIds, fetchPreloadedDeals, getSteamAppIds } from "./Games/Game";
import { eq, inArray } from "drizzle-orm";

/**
 * Updates the database with Steam game IDs from user's library
 * @param user_id - The user's ID in our system
 * @param steam_user_id - The user's Steam ID
 * @throws Error if database operation fails
 */
export async function addUserGames(
  user_id: string,
  steam_user_id: string
): Promise<void> {
  try {
    //Purge old games
    await db.delete(user_games).where(eq(user_games.user_id, user_id))

    //Get user's steam app ids
    const appIds = (await getSteamAppIds(steam_user_id)).splice(0, 50);
    if(appIds.length === 0){
      return;
    }
    //Convert steam ids to itad
    const itadIds = await convertSteamAppIdsToItadGameIds(appIds);
    console.log(itadIds);

    await db.insert(user_games).values(
      itadIds.map((game_id) => ({
        user_id: user_id,
        game_id: game_id,
      }))
    );

    //update user steam id in db
    await db.update(users)
      .set({ steam_id: steam_user_id })
      .where(eq(users.id, parseInt(user_id)));
  } catch (error) {
    console.error("Error adding user games:", error);
    throw error;
  }
}

//Deals for the games that the user is subscribed for
export async function getUserDeals(user_id: string): Promise<SteamDeal []> {
  try {
    const userGameIds = await db
      .select({ game_id: user_games.game_id })
      .from(user_games)
      .where(eq(user_games.user_id, user_id))
      .then((rows) =>
        rows.map((r) => r.game_id).filter((id): id is string => id !== null)
      );

    if(userGameIds.length==0){
      return [];
    }

    const gameMetaData = await db
      .select()
      .from(game_meta_data)
      .where(inArray(game_meta_data.game_id, userGameIds));

    const steamDeals: SteamDeal[] = gameMetaData.map(game => ({
      itad_id: game.game_id,
      asset_url: game.asset_url ?? '',
      title: game.title ?? '',
    }));

    return await fetchPreloadedDeals(userGameIds, steamDeals);

  } catch (error) {
    console.error("Error retrieving user games:", error);
    throw error;
  }
}

export async function getUserInfo(user_id: string): Promise<User> {
  try {
    const [userInfo] = await db
      .select()
      .from(users)
      .where(eq(users.id, parseInt(user_id)));
    
    if (!userInfo) {
      throw new Error("User not found");
    }
    
    return {
      Firstname: userInfo.name?.split(' ')[0] ?? '',
      Lastname: userInfo.name?.split(' ')[1] ?? '',
      email: userInfo.email,
      picture_url: userInfo.picture ?? '',
      steam_id: userInfo.steam_id ?? '',
    };
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
}

export async function updateUserInfo(user_id: string, userInfo: User): Promise<void> {
  try {
    const updateData: Partial<typeof users.$inferInsert> = {};

    if (userInfo.Firstname !== undefined || userInfo.Lastname !== undefined) {
      updateData.name = `${userInfo.Firstname || ""} ${userInfo.Lastname || ""}`.trim();
    }
    
    if (userInfo.steam_id !== undefined) {
      updateData.steam_id = userInfo.steam_id;
    }
    
    if (Object.keys(updateData).length > 0) {
      await db.update(users).set(updateData).where(eq(users.id, parseInt(user_id)));
    }
  } catch (error) {
    console.error("Error updating user info:", error);
    throw error;
  }
}

