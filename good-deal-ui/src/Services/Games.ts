import { searchGame } from './../../../.history/good-deal-backend/src/services/Games/Game_20250517192621';
import GameDeal from '../models/GameDeal';
import { Game } from '../models/Game';
import { SteamDeal } from '@/models/SteamDeal';
import axiosApiInstance from '@/contexts/AxiosApiInstance';

export async function fetchGameDeals(): Promise<GameDeal[]> {
    try {
        const response = await axiosApiInstance.get('/api/games/get-games',  {withCredentials: true});
        return response.data as GameDeal[];
    } catch (error) {
        throw error;
    }
}

export async function fetchGame(id: string): Promise<Game> {
    try {
        const response = await axiosApiInstance.get(`/api/games/get-game/${id}`, {withCredentials: true});
        return response.data as Game;
    } catch (error) {
        throw error;
    }
}

export async function fetchGameDealsById(id: string): Promise<GameDeal[]> {
    try {
        const response = await axiosApiInstance.get(`/api/games/get-game-prices/${id}`);
        return response.data as GameDeal[];
    } catch (error) {
        throw error;
    }
}

export async function searchGames(searchTerm: string): Promise<Game[]> {
    try {
        const response = await axiosApiInstance.get(`/api/games/search-game/${searchTerm}`);
        return response.data as Game[];
    } catch (error) {
        throw error;
    }
}

export async function getGameDeals():Promise<SteamDeal[]>{
        try {
        const response = await axiosApiInstance.get(`/api/user/get-user-deals`)
        return response.data as SteamDeal[]

    } catch (error) {
        throw error;
    }
}

export async function syncSteamWishlist(steamId: string): Promise<void> {
    try {
        await axiosApiInstance.patch(`/api/user/update-user-steam?steamid=${steamId}`)
    } catch (error) {
        throw error;
    }
}

export function calculateGameSavings(deals: SteamDeal[]) {
    console.log('deals', deals)
    console.log('savings')
    const totalSavings = deals
        .reduce((acc, deal) => acc + Math.max(0, deal.steam_price - deal.best_price), 0);

    

    const validDeals = deals.filter(deal => Number(deal.steam_price) > 0);
    console.log(validDeals)

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