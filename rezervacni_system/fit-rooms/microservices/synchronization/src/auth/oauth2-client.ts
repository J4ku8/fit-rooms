import {AxiosError, AxiosResponse} from "axios";
import {OAuthConfig, TokenResponse} from "../utils/types";
import {encodeCredentials} from "../utils/base64encode";

const axios = require('axios');

function isOAuthError(error: unknown): error is AxiosError {
    return axios.isAxiosError(error);
}
class OAuth2Client {
    private config: OAuthConfig;

    constructor(config: OAuthConfig) {
        this.config = config;
    }

    async getToken(): Promise<TokenResponse> {
        try {
            const authHeader = encodeCredentials(this.config.clientId, this.config.clientSecret);
            const customHeaders = {
                Authorization: `Basic ${authHeader}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            };
            const response: AxiosResponse<TokenResponse> =await axios.post(
                this.config.tokenEndpoint,
                `grant_type=client_credentials&scope=${encodeURIComponent(this.config.scope)}`,
                {
                    headers: customHeaders,
                }
            );
            const accessToken: string = response.data.access_token;
            const expiresIn: number = response.data.expires_in;

            return { access_token:accessToken, expires_in: expiresIn };
        } catch (error: unknown) {
            if (isOAuthError(error)) {
                console.error('Error fetching access token:', error.response ? error.response.data : error.message);
            } else {
                console.error('Unknown error:', error);
            }
            throw error;
        }
    }
}

export default OAuth2Client;
