import express, { Router } from 'express';
import AuthController from './routeControllers/AuthController';
import GameController from './routeControllers/GameController';
import { authenticateWithToken } from './middlewares/AuthMiddleware';


const router: Router = express.Router();

// Route imports
router.use('/auth', AuthController);
router.use('/games', GameController);

export default router;