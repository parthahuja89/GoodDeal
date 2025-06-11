export interface Game {
    title: string;
    id: number;
    description: string;
    release_date: string;
    platforms: string[];
    genres: string[];
    developers: string[];
    publishers: string[];
    tags: string[];
    boxart_url:string;
    asset_url?: string;
        reviews?: {
        score: number;
        source: string;
        link: string;
    }[];
}