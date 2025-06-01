import { Router, Request, Response } from "express";
const route = Router();

/**
 * Updates user's library by processing their Steam ID
 * and refreshing game data in the user_games table.
 *
 * @route PATCH /update-user-steam
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {string} req.query.steamid - User's Steam ID to fetch games from]
 */
import { SteamDeal } from "../models/SteamDeal";
import { addUserGames, getUserDeals } from "../../services/User";

route.patch("/update-user-steam", async (req: Request, res: Response) => {
  const steamid = req.query.steamid as string;
  try {
    await addUserGames((3).toString(), steamid);
    res.status(200).json({ message: "Successfully updated user's Steam library" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

route.get("/get-user-deals", async (req: Request, res: Response) => {
  try {
    const deals = await getUserDeals((3).toString())
    res.status(200).json(deals);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
export default route;
