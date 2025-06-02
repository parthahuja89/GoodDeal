import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  google_id: varchar("google_id", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  picture: text("picture"),
  steam_id: varchar("steam_id", { length: 255 }),
});


export const steam_itad_cache = pgTable("steam_itad_cache", {
  steam_app_id: varchar("steam_app_id", { length: 255 }).primaryKey(),
  itad_id: varchar("itad_id", { length: 255 }),
});

export const user_games = pgTable("user_games", {
  user_id: varchar("user_id", { length: 255 }),
  game_id: varchar("game_id", { length: 255 }),
});

export const game_meta_data = pgTable("game_meta_data", {
  game_id: varchar("game_id", { length: 255 }).primaryKey(),
  asset_url: varchar("asset_url", { length: 255 }),
  title: varchar("title", { length: 255 }),
});