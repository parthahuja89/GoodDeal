import { OAuth2Client, TokenPayload } from "google-auth-library";
import { Request, Response, NextFunction } from "express";
import { db } from "../../database/db";
import { users } from "../../database/Schema";
import { eq } from "drizzle-orm";


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Verifies a Google ID token and returns the payload if valid.
 * @param token - The Google ID token to verify.
 * @returns The decoded token payload if verification succeeds.
 * @throws If the token is invalid or verification fails.
 */
async function verifyToken(token: string): Promise<TokenPayload | undefined> {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
}

/**
 * Express middleware to authenticate requests using a Google ID token.
 * If authentication succeeds, attaches the user object to req.user.
 * Responds with 401 if authentication fails.
 */
async function authenticateWithToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.cookies.auth_token;
  if (!token) {
    res.status(401).json({ error: "No authentication token provided." });
    return;
  }

  try {
    const payload = await verifyToken(token);

    if (!payload) {
      res.status(401).json({ error: "Invalid token payload" });
      return;
    }

    const user = await obtainDBUser(payload);
    if (!user?.id) {
      res.status(401).json({ error: "User has no ID." });
      return;
    }
    // Attaching user to the request object for downstream handlers
    req.user = user;


    

    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ error: "Unauthorized Token." });
    return;
  }
}

/**
 * Fetches a user from the database by Google ID, or creates a new user if not found.
 * @param payload - The decoded Google token payload.
 * @returns The user object from the database.
 */
async function obtainDBUser(payload: TokenPayload) {
  const { sub: google_id, email, name, picture } = payload!;

  
  const user = (
    await db
      .select()
      .from(users)
      .where(eq(users.google_id, google_id!))
  )[0];

  if (user) return user;

  // If user does not exist, create a new user
  const [newUser] = await db
    .insert(users)
    .values({
      google_id: google_id!,
      email: email!,
      name: name ?? null,
      picture: picture ?? null,
    })
    .returning();

  return newUser;
}


export { authenticateWithToken };