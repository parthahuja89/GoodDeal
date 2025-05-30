import { db } from "../database/db";
import { user_games } from "../database/Schema";

export async function addUserGames(
  user_id: string,
  game_ids: string[]
): Promise<void> {
  try {
    await db.insert(user_games).values(
      game_ids.map((game_id) => ({
        user_id: user_id,
        game_id: game_id,
      }))
    );
  } catch (error) {
    console.error("Error adding user games:", error);
    throw error;
  }
}

