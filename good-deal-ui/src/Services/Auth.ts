import Resources from '../resources.json'
import axios, { AxiosResponse } from 'axios';

const url = process.env.NODE_ENV === 'production' ? "prod-urls" : "local-urls"
const baseApiUri = Resources[url].api_base_uri

/**
 * Handler for OAuth service calls for authenticating wit Google and Github
 */

export function redirectToGoogleAuth() {
    const clientID = import.meta.env.VITE_GAUTH_CLIENTID;
    if (!clientID) {
        throw new Error("Google Client ID is not defined in the environment variables");
    }

    const params = new URLSearchParams({
        client_id: clientID,
        redirect_uri: Resources[url].redirect_uri,
        access_type: 'offline',
        response_type: 'code',
        scope: 'openid profile email',
    });

    const googleAuthUrl = `${Resources[url].google_oauth_uri}?${params.toString()}`;

    window.location.href = googleAuthUrl;
}

//Gets the current auth status from API
export async function getAuthStatus(): Promise<boolean> {
    try {
        console.log("Checking authentication status...");
        const response: AxiosResponse = await axios.get(`${baseApiUri}/api/auth/status`, {
            withCredentials: true
        });
        console.log(response.status);
        return response.status === 200;
    } catch (error) {
        console.error("Error fetching auth status:", error);
        return false;
    }
}

//Gets the token from API by exchanging auth code
export async function getTokenFromCode(authCode: string) {
    await axios.get(`${baseApiUri}/api/auth/token`, {
        withCredentials: true,
        headers: {
            auth_code: authCode
        }

    })       
}
export default redirectToGoogleAuth;
