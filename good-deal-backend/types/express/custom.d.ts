import { User } from "../db/User";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}