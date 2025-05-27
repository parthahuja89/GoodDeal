import { Router, Request, Response } from "express";
const route = Router();

import * as gameService from "../../services/Games/Game";
import { Game } from "../models/Game";
import GameDeal from "../models/GameDeal";
import { SteamDeal } from "../models/SteamDeal";
import logger from "../../services/logger";

route.get("/", (req: Request, res: Response) => {
  res.status(200).json({ default: "route" });
});

route.get("/get-games", async (req: Request, res: Response) => {
  try {
    gameService.getPopularGames(12)
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

route.get("/get-game/:id", async (req: Request, res: Response) => {
  const gameId = req.params.id;
  try {
    gameService.getGameInfo(gameId)
      .then((game: Game) => {
        res.status(200).json(game);
      })
      .catch((error: any) => {
        res.status(500).json({ error: error.message });
      });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

route.get("/get-game-prices/:id", async (req: Request, res: Response) => {
  const gameId = req.params.id;
  try {
    gameService.getGamePrices(gameId)
      .then((gameDeals: GameDeal[]) => {
        res.status(200).json(gameDeals);
      })
      .catch((error: any) => {
        res.status(500).json({ error: error.message });
      });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


route.get("/search-game/:name", async (req: Request, res: Response) => {
  const gameName = req.params.name;
  try {
    gameService.searchGame(gameName)
      .then((game: Game[]) => {
        res.status(200).json(game);
      })
      .catch((error: any) => {
        res.status(500).json({ error: error.message });
      });
  }
  catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

route.get("/get-steam-deals", async (req: Request, res: Response) => {
  const steamid = req.query.steamid as string;
  
  
  try {
    gameService.getSteamDeals(steamid)
      .then((gameDeals: SteamDeal[]) => {
        res.status(200).json(gameDeals);
      })
      .catch((error: any) => {
        res.status(500).json({ error: error.message });
      });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
export default route;
