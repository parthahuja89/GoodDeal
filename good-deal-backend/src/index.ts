// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import logger from "./services/logger";

import auth from './api/routeControllers/AuthController';
dotenv.config();
const cors = require('cors');

const app: Express = express();
const port = process.env.PORT || 3000;

//cors policy 
  
const corsOptions = {
  origin: 'http://localhost:5173',  // Allow this origin
  methods: 'GET,POST,PUT,DELETE',  // Allow specific methods if needed
  credentials: true,  // Allow cookies if required
};

app.use(cors(corsOptions));


//Route imports
app.use('/auth', auth);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})