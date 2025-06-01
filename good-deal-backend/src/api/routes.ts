import express, { Router } from 'express';
import AuthController from './routeControllers/AuthController';
import GameController from './routeControllers/GameController';
import { authenticateWithToken } from './middlewares/AuthMiddleware';
import UserController from './routeControllers/UserController';

const router: Router = express.Router();

// Route imports
router.use('/auth', AuthController);
router.use('/games', authenticateWithToken, GameController);
router.use('/user', authenticateWithToken, UserController);

export default router;