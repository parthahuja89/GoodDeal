import { Router, Request, Response } from "express";
import logger from "../../services/logger";
import * as AuthService from '../../services/Auth';

const route = Router();

route.get("/", (req: Request, res: Response) => {
  res.json({ default: "route" }).status(200);
});

route.post("/token", async (req: Request, res: Response) => {
  const { auth_code: authCode } = req.body;
  if (!authCode) {
    res.status(400).json({ error: "Authorization code is required in the request body." });
    return;
  }
  const token = await AuthService.createUserToken(authCode);

  if (token === '') {
    res.status(401).json({ error: "Error generating access token. Authorization code may be invalid." });
    return;
  } else {
    res.cookie('auth_token', token, {
      httpOnly: false,
      secure: false,
      domain: process.env.NODE_ENV === 'production' ? 'good-deal-ui.vercel.app' : 'localhost',
      sameSite: 'lax',
    });

    res.status(200).json('Token cookie generated successfully.');
  }
});

route.get("/status", async (req: Request, res: Response) => {
  const authToken = req.cookies['auth_token'] || req.headers['auth_token'] as string;
  if (!authToken) {
    res.status(401).json({ error: "Unauthorized. No authentication token found." });
    return;
  }
  try {
    const isTokenValid = await AuthService.validateAuthToken(authToken);
    if (isTokenValid) {
      res.status(200).json({ status: "Token is valid." });
    } else {
      res.status(401).json({ error: "Invalid authentication token." });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error while validating token." });
  }
});

export default route;
