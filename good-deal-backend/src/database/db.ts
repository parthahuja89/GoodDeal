import { drizzle } from "drizzle-orm/node-postgres";
import { sql } from "drizzle-orm";
import { Pool } from "pg";
import * as Schema from './Schema';
import dotenv from 'dotenv';
dotenv.config();


if (!process.env.DB_CONNECTION_STRING) {
  throw new Error("DB_CONNECTION_STRING environment variable is not set");
}
const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING
});



export const db = drizzle(pool, {schema: Schema}); ;
