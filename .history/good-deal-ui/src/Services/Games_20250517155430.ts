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
