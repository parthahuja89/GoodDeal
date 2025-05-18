export interface Game {
    title: string;
    id: number;
    description: string;
    release_date: string;
    platforms: string[];
    genres: string[];
    developers: string[];
    publishers: string[];
    asset_url?: string;
}