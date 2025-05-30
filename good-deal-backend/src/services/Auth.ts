import Resources from '../resources.json'
import logger from './logger'
import axios from 'axios'
import qs from 'qs'


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
