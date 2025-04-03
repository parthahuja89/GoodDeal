// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import logger from "./logger";

// import tmdb from './api/routeControllers/tmdb';
import AuthController from '../api/routeControllers/AuthController'
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

//Route imports
// app.use('/tmdb', tmdb);
app.use('/auth', AuthController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})