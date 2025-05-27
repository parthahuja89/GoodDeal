import { searchGame } from './../../../.history/good-deal-backend/src/services/Games/Game_20250517192621';
import axios from 'axios';
import GameDeal from '../models/GameDeal';
import { Game } from '../models/Game';
import { SteamDeal } from '@/models/SteamDeal';

export async function fetchGameDeals(): Promise<GameDeal[]> {
    try {
        const response = await axios.get('http://localhost:3000/api/games/get-games');
        return response.data as GameDeal[];
    } catch (error) {
        throw error;
    }
}

export async function fetchGame(id: string): Promise<Game> {
    try {
        const response = await axios.get(`http://localhost:3000/api/games/get-game/${id}`);
        return response.data as Game;
    } catch (error) {
        throw error;
    }
}

export async function fetchGameDealsById(id: string): Promise<GameDeal[]> {
    try {
        const response = await axios.get(`http://localhost:3000/api/games/get-game-prices/${id}`);
        return response.data as GameDeal[];
    } catch (error) {
        throw error;
    }
}

export async function searchGames(searchTerm: string): Promise<Game[]> {
    try {
        const response = await axios.get(`http://localhost:3000/api/games/search-game/${searchTerm}`);
        return response.data as Game[];
    } catch (error) {
        throw error;
    }
}

export async function syncSteamWishlist(steamId: string): Promise<SteamDeal[]> {
    try {
        const response = await axios.get(`http://localhost:3000/api/games/get-steam-deals?steamid=${steamId}`)
        console.log(response)
        return response.data as SteamDeal[]

    } catch (error) {
        throw error;
    }
}

export function calculateGameSavings(deals: SteamDeal[]) {
    const totalSavings = deals
        .reduce((acc, deal) => acc + Math.max(0, deal.steam_price - deal.best_price), 0);

    const validDeals = deals.filter(deal => Number(deal.steam_price) > 0);

    const averageDiscount = validDeals.length > 0
        ? validDeals.reduce((acc, deal) => {
            const discount = ((deal.steam_price - deal.best_price) / deal.steam_price) * 100;
            return acc + Math.max(0, discount);
        }, 0) / validDeals.length
        : 0;

    return [
        Number(totalSavings.toFixed(2)),
        Number(averageDiscount.toFixed(2))
    ];
}