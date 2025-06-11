import { Request, Response } from 'express';
import axios from "axios";
import logger from "../logger";
import { Game } from "../../api/models/Game";
import GameDeal from "../../api/models/GameDeal";
import { SteamDeal } from "../../api/models/SteamDeal";
import { addUserGames } from '../User';
import { db } from '../../database/db';
import dotenv from "dotenv";
import Resources from '../../resources.json'
import { game_meta_data } from '../../database/Schema';

dotenv.config();


const ITAD_API_KEY = process.env.ITAD_API_KEY ?? "";

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
  try {
    const response = await axios.get(`${Resources.urls.base_itad_uri}/deals/v2`, {
      params: {
        key: ITAD_API_KEY,
        limit,
        sort: "rank",
      },
    });

    const data = response.data;

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
    const response = await axios.get(`${Resources.urls.base_itad_uri}/games/info/v2`, {
      params: {
        key: ITAD_API_KEY,
        id: gameId,
      },
    });

    const data = response.data;

    //Get game assets from igdb

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
      boxart_url: data.assets?.boxart,
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
    const response = await axios.post(`${Resources.urls.base_itad_uri}/games/prices/v3`, [gameId],{
      params: {
      key: ITAD_API_KEY,
      }
    });

    const data = response.data;
    
    if(!data || !data[0] || !data[0].deals) {
      logger.error("No deals found for the game with ID:", gameId);
      return [];
    }

    logger.info("Game deals data:", data);
    const deals: GameDeal[] = data[0].deals?.map((deal: any) => ({
      price_new: deal.price.amount,
      price_regular: deal.regular.amount,
      store: deal.shop.name,
      platforms: deal.platforms,
      url: deal.url,
    }));

    return deals;
  } catch (error) {
    logger.error("Error fetching game deals:", error);
    throw error;
  }
}

/**
 * Searches for matching games based on the title string
 * @param gameTitle The title of the game to search for
 */
export const searchGame = async (gameTitle: string): Promise<Game[]> => {
  try {
    const response = await axios.get(`${Resources.urls.base_itad_uri}/games/search/v1`, {
      params: {
        key: ITAD_API_KEY,
        title: gameTitle,
        results: 5,
      },
    });

    const data = response.data;

    const games: Game[] = data.map((game: any) => ({
      title: game.title,
      id: game.id,
      asset_url: game.assets?.banner600 || game.assets?.banner400,
    }));

    return games;
  } catch (error) {
    logger.error("Error searching for games:", error);
    throw error;
  }
}


// /**
//  * Returns the Steam deals for a given Steam ID
//  * @param steamId The Steam ID to fetch deals for
//  */
// export const getSteamDeals = async (req: Request,  steamId: string): Promise<SteamDeal[]> => {
//   try {
//     if (!req.user || !req.user?.id) {
//       throw new Error('User ID is required');
//     }
//     const appIds = await getUserGames(req.user?.id.toString()) || [];
//     const [itadIds, dealsPreload] = await convertSteamAppIdsToItadGameIds(appIds);

//     const deals: SteamDeal[] = await fetchPreloadedDeals(itadIds, dealsPreload);
//     return deals;
//   }
//   catch (error) {
//     logger.error("Error fetching Steam app IDs:", error);
//     throw error;
//   }
// }
    


/**
 * Returns array of appids from a given Steam ID
 * @param steamId The Steam ID to fetch appids for
 * @returns Array of appids
 */
export const getSteamAppIds = async (steamId: string): Promise<string[]> => {
  try {
    logger.info(`Fetching Steam app IDs for user ID: ${steamId}`);
    const response = await axios.get(`${Resources.urls.base_steam_uri}/IWishlistService/GetWishlist/v1`, {
      params: { steamid: steamId },
    });

    const data = response.data;

    if (!data?.response?.items) {
      logger.error(`No items found in the response for Steam ID: ${steamId}`);
      return [];
    }

    const appIds = data.response.items.map((item: { appid: number }) => item.appid.toString());
    logger.info(`Parsed Steam app IDs: ${JSON.stringify(appIds)}`);
    return appIds;
  } catch (error) {
    logger.error(`Error fetching Steam app IDs: ${error}`);
    throw error;
  }
};

/**
 * Converts a Steam app ID to a ITAD game ID
 * Updates the database with the metadata
 * @param appIds The Steam app ID array to convert
 * TODO: Add a cache to avoid multiple requests for the same app ID
 */
export const convertSteamAppIdsToItadGameIds = async (appIds: string[]): Promise<string[]> => {
  const itadGameIds: string[] = [];
  const gameData: SteamDeal[] = [];

  try {
    const itadRequests = appIds.map(async (appId) => {
      try {
        const response = await axios.get(`${Resources.urls.base_itad_uri}/games/lookup/v1`, {
          params: {
            key: ITAD_API_KEY,
            appid: appId,
          },
        });

        const data = response.data;

        if (data?.game?.id) {
          itadGameIds.push(data.game.id);
          gameData.push({
            itad_id: data.game.id,
            asset_url: data.game.assets?.banner600 || data.game.assets?.banner400 || null,
            title: data.game.title,
          });
        } else {
          logger.warn(`No ITAD game ID found for Steam app ID: ${appId}`);
        }
      } catch (error) {
        logger.error(`Error converting Steam app ID ${appId} to ITAD game ID: ${error}`);
        throw error;
      }
    });

    await Promise.all(itadRequests);

    if (gameData.length > 0) {
      await db.insert(game_meta_data).values(
        gameData.map((game) => ({
          game_id: game.itad_id,
          asset_url: game.asset_url,
          title: game.title,
        }))
      ).onConflictDoNothing({ target: [game_meta_data.game_id] });
    }
  } catch (error) {
    logger.error(`Unexpected error during ITAD conversion process: ${error}`);
  }

  return itadGameIds;
};


/**
 * Gets the best deals for preloaded Steam deals
 * @param preloadDeals The preloaded Steam deals to fetch prices for
 */
export const fetchPreloadedDeals = async (itadGameIds: string[], preloadDeals: SteamDeal[]): Promise<SteamDeal[]> => {
  try {
    const response = await axios.post(`${Resources.urls.base_itad_uri}/games/prices/v3`, itadGameIds, {
      params: {
        key: ITAD_API_KEY,
      },
    });

    const data = response.data;

    if (!data || !data[0] || !data[0].deals) {
      logger.error("No deals found for the provided ITAD game IDs.");
      return [];
    }

    const deals: SteamDeal[] = data.map((game: any) => {
      const preloadDeal = preloadDeals.find(deal => deal.itad_id === game.id);
      return {
        itad_id: game.id,
        asset_url: preloadDeal?.asset_url || "",
        title: preloadDeal?.title,
        best_price: Math.min(...game.deals?.map((deal: any) => deal.price.amount) || [0]), 
        steam_price: game.deals?.find((deal: any) => deal.shop.name === "Steam")?.price.amount || 0,
      };
    });

    return deals;
  } catch (error) {
    logger.error("Error fetching best deals for preloaded Steam deals:", error);
    throw error;
  }
};

