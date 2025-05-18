import axios from "axios";
import logger from "../logger";
import { Game } from "../../api/models/Game";
import GameDeal from "../../api/models/GameDeal";
import dotenv from "dotenv";
import { platform } from "os";
import { log } from "console";
dotenv.config();


const ITAD_API_KEY = process.env.ITAD_API_KEY ?? "";
const BASE_URL = "https://api.isthereanydeal.com";

if (!ITAD_API_KEY) {
  logger.error("ITAD_API_KEY is not defined in the environment variables.");
  throw new Error("ITAD_API_KEY is not defined");
}

/**
 * Returns the most popular games
 * @param limit The number of games to fetch (default is 8)
 */
export const getPopularGames = async (
  limit: number = 12
): Promise<GameDeal[]> => {
  logger.info(`Using ITAD API key: ${ITAD_API_KEY}`);
  try {
    const response = await axios.get(`${BASE_URL}/deals/v2`, {
      params: {
        key: ITAD_API_KEY,
        limit,
        sort: "-trending",
      },
    });

    const data = response.data;

    if (data.error) {
      logger.error("Error fetching popular games:", data.error);
      throw new Error(data.error);
    }

    const games: GameDeal[] = data.list.map((game: any) => ({
      title: game.title,
      id: game.id,
      asset_url: game.assets?.banner600 || game.assets?.banner400,
      price_new: game.deal.price.amount,
      price_regular: game.deal.regular.amount,
      url: game.deal.url,
    }));

    return games;
  } catch (error) {
    logger.error("Error fetching popular games:", error);
    throw error;
  }
};


/**
 * Returns the game information for a given game ID
 * @param gameId The ID of the game to fetch
 */
export const getGameInfo = async (gameId: string): Promise<Game> => {
  try {
    const response = await axios.get(`${BASE_URL}/games/info/v2`, {
      params: {
        key: ITAD_API_KEY,
        id: gameId,
      },
    });

    const data = response.data;

    if (data.error) {
      logger.error("Error fetching game info:", data.error);
      throw new Error(data.error);
    }

    const game: Game = {
      title: data.title,
      id: data.id,
      description: data.description,
      release_date: data.releaseDate,
      platforms: data.platforms,
      genres: data.genres,
      developers: data.developers,
      publishers: data.publishers,
      tags: data.tags,
      asset_url: data.assets?.banner600 || data.assets?.banner400,
      reviews: data.reviews
      .filter((review: any) => review.score > 0)
      .map((review: any) => ({
        score: review.score,
        source: review.source,
        link: review.url,
      })),
    };
    
    return game;
  } catch (error) {
    logger.error("Error fetching game info:", error);
    throw error;
  }
};

/**
 * Returns the game deals for a given game ID
 * @param gameId The ID of the game to fetch deals for
 */
export const getGamePrices = async (gameId: string): Promise<GameDeal[]> => {
  try {
    const response = await axios.post(`${BASE_URL}/games/prices/v3`, [gameId],{
      params: {
      key: ITAD_API_KEY,
      deals: true,
      }
    });

    const data = response.data;

    if (data.error) {
      logger.error("Error fetching game deals:", data.error);
      throw new Error(data.error);
    }
    logger.info("Game deals data:", data);
    const deals: GameDeal[] = data[0].deals?.map((deal: any) => ({
      price_new: deal.price.amount,
      price_regular: deal.regular.amount,
      store: deal.shop.name,
      platforms: deal.platforms,
      url: deal.url,
    }));

    deals.forEach((deal) => {
      deal.platforms.push("steam");
    }
    
    return deals;
  } catch (error) {
    logger.error("Error fetching game deals:", error);
    throw error;
  }
}