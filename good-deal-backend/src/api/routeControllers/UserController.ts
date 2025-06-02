import { Router, Request, Response } from "express";
const route = Router();

import { SteamDeal } from "../models/SteamDeal";
import { addUserGames, getUserDeals, getUserInfo, updateUserInfo } from "../../services/User";


/**
 * Updates user's library by processing their Steam ID
 * and refreshing game data in the user_games table.
 *
 * @route PATCH /update-user-steam
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {string} req.query.steamid - User's Steam ID to fetch games from]
 */
route.patch("/update-user-steam", async (req: Request, res: Response) => {
  const steamid = req.query.steamid as string;
  const user_id = req.user?.id.toString() || '';
  try {
    await addUserGames((user_id).toString(), steamid);
    res.status(200).json({ message: "Successfully updated user's Steam library" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

route.get("/get-user-deals", async (req: Request, res: Response) => {
  const user_id = req.user?.id.toString() || '';

  try {
    const deals = await getUserDeals((user_id).toString())
    res.status(200).json(deals);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

route.get("/me", async (req: Request, res: Response) => {
  try {
    const userInfo = await getUserInfo(req.user?.id.toString() || '');
    res.status(200).json(userInfo);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

route.patch("/me", async (req: Request, res: Response) => {
  try {
    const userInfo = await updateUserInfo(req.user?.id.toString() || '', req.body);
    res.status(200).json(userInfo);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default route;
