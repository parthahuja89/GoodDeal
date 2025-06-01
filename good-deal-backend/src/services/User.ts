import { SteamDeal } from "../api/models/SteamDeal";
import { db } from "../database/db";
import { game_meta_data, user_games } from "../database/Schema";
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
