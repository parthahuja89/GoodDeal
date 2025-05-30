import { Router, Request, Response } from "express";
import logger from "../../services/logger";
import * as AuthService from '../../services/Auth';

const route = Router();

route.get("/", (req: Request, res: Response) => {
  res.json({ default: "route" }).status(200);
});

route.get("/token", async (req: Request, res: Response) => {
  const authCode = req.headers['auth_code'] as string;
  if (!authCode) {
    res.status(400).json({ error: "Authorization code is required as a header." });
    return;
  }
  const token = await AuthService.createUserToken(authCode);
  console.log("token", token)
  if(token == ''){
    res.status(401).json({ error: "Error generating access token. Authorization code may be invalid." });
    return;
  }
  else{
    res.cookie('auth_token', token, { httpOnly: true, secure: true });
    res.status(200).json('Token cookie generated successfully.');
  }


});

export default route;
