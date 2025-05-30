import Resources from '../resources.json'
import logger from './logger'
import axios from 'axios'
import qs from 'qs'
import { OAuth2Client, TokenPayload } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Generates an authentication token from the provided authorization code.
 *
 * @param authCode - The authorization code used to generate the authentication token.
 * @returns A string representing the generated authentication token.
 */
export async function createUserToken(authCode: string): Promise<string> {
    const clientID = process.env.G_AUTH_CLIENT_ID;
    const clientSecret = process.env.G_AUTH_SECRET;

    if (!clientID || !clientSecret) {
        logger.error('Missing Google Auth credentials: G_AUTH_CLIENT_ID or G_AUTH_SECRET');
        return '';
    }

    const data = qs.stringify({
        client_id: clientID,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:5173/callback',
        code: authCode,
    });

    const config = {
        method: 'post',
        url: 'https://oauth2.googleapis.com/token',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    try {
        const response = await axios(config);
        logger.info('Token response:', response.data);

        if (response.data && response.data.id_token) {
            return response.data.id_token;
        } else {
            logger.error('ID token not received in response', response.data);
            return '';
        }
    } catch (error) {
        logger.error('Error during token creation', error);
        return '';
    }
}

/**
 * Validates a provided authentication token and returns true if valid, false otherwise.
 * @param authToken - The authentication token to validate.
 * @returns A boolean indicating whether the token is valid.
 */

export async function validateAuthToken(authToken: string): Promise<boolean> {
    try {
        const ticket = await client.verifyIdToken({
            idToken: authToken,
            audience: process.env.G_AUTH_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        return payload !== null;
    } catch (error) {
        return false;
    }
}

