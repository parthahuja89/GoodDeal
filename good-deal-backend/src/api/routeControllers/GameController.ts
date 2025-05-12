import { Router, Request, Response } from "express";
const route = Router();

import { getPopularGames } from "../../services/Games/Game";
import { Game } from "../models/Game";
import GameDeal from "../models/GameDeal";

route.get("/", (req: Request, res: Response) => {
  res.status(200).json({ default: "route" });
});

route.get("/get-games", async (req: Request, res: Response) => {
  try {
    getPopularGames(12)
      .then((games: GameDeal[]) => {
        res.status(200).json(games);
      })
      .catch((error: any) => {
        res.status(500).json({ error: error.message });
      });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default route;
