import axios from 'axios';
import { GameDeal } from '../models/GameDeal';

export async function fetchGameDeals(): Promise<GameDeal[]> {
    try {
        const response = await axios.get('http://localhost:3000/api/games/get-games');
        return response.data as GameDeal[];
    } catch (error) {
        console.error('Error fetching game deals:', error);
        throw error;
    }
}