import { searchGame } from './../../../.history/good-deal-backend/src/services/Games/Game_20250517192621';
import axios from 'axios';
import { GameDeal } from '../models/GameDeal';
import { Game } from '../models/Game';

export async function fetchGameDeals(): Promise<GameDeal[]> {
    try {
        const response = await axios.get('http://localhost:3000/api/games/get-games');
        return response.data as GameDeal[];
    } catch (error) {
        console.error('Error fetching game deals:', error);
        throw error;
    }
}

export async function fetchGame(id: string): Promise<Game> {
    try {
        const response = await axios.get(`http://localhost:3000/api/games/get-game/${id}`);
        return response.data as Game;
    } catch (error) {
        console.error('Error fetching game:', error);
        throw error;
    }
}

export async function fetchGameDealsById(id: string): Promise<GameDeal[]> {
    try {
        const response = await axios.get(`http://localhost:3000/api/games/get-game-prices/${id}`);
        return response.data as GameDeal[];
    } catch (error) {
        console.error('Error fetching game deals by ID:', error);
        throw error;
    }
}

export async function searchGames(searchTerm: string): Promise<Game[]> {
    try {
        const response = await axios.get(`http://localhost:3000/api/games/search-game/${searchTerm}`);
        return response.data as Game[];
    } catch (error) {
        console.error('Error searching for games:', error);
        throw error;
    }
}