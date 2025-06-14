// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import logger from "./services/logger";
import router from "./api/routes";


dotenv.config();
const cors = require('cors');
const cookieParser = require("cookie-parser");

const app: Express = express();
app.use(cookieParser());
const port = process.env.PORT || 3000;

//cors policy 
  
const corsOptions = {
  origin: ['http://localhost:5173', 'https://good-deal-ui.vercel.app'],  
  methods: 'GET,POST,PUT,DELETE,PATCH',  
  credentials: true,  
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

export default app;