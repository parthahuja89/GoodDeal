import { express } from 'express';
export {};
// types/express.d.ts
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import * as Schema from "../../src/database/Schema";
import * as express from "express";

export type User = InferSelectModel<typeof Schema.users>;
export type NewUser = InferInsertModel<typeof Schema.users>;

declare global {
  namespace Express {
    interface Request {
      user?: User | undefined; 
    }
  }
}