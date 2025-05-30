import Resources from '../resources.json'
import axios, { AxiosResponse } from 'axios';
const baseApiUri = Resources.urls.api_base_uri

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
        redirect_uri: Resources.urls.redirect_uri,
        access_type: 'offline',
        response_type: 'code',
        scope: 'openid profile email',
    });

    const googleAuthUrl = `${Resources.urls.google_oauth_uri}?${params.toString()}`;

    window.location.href = googleAuthUrl;
}

//Gets the token from API by exchanging auth code
export async function getTokenFromCode(authCode: string) {
    await axios.get(`${baseApiUri}/api/auth/token`, {
        headers: {
            auth_code: authCode
        }
    })       
}
export default redirectToGoogleAuth;