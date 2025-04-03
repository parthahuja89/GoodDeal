import { Router, Request, Response } from "express";

const route = Router();
const TMDBService = require('../../services/tmdb');

route.get("/", (req: Request, res: Response) => {
  res.json({ default: "route" }).status(200);
});

route.get("/get-movies", (req: Request, res: Response) => {
  TMDBService.GetAccessToken();
  res.json({ movie_name: "name" }).status(200);
});
export default route;
