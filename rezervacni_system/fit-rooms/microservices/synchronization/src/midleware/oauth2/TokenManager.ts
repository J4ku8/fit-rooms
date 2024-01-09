import {OAuthConfig} from "../../../utils/types";
import config from "../../../config/config";
import OAuth2Client from "./OAuth2Client";


const authConfigCvut: OAuthConfig = {
    clientId: config.client_id,
    clientSecret: config.client_secret,
    tokenEndpoint: config.cvut_oauth_token_uri,
    scope: "cvut:kosapi:read"
}

export class TokenManager {
    private expiresIn: number;
    private accessToken: string;

    constructor() {
        this.accessToken = "";
        this.expiresIn = 0;
    }

    async requestNewToken(): Promise<void>{
        const oauth2Client = new OAuth2Client(authConfigCvut);

        try {
            const { access_token: newAccessToken, expires_in: newExpiryDate } = await oauth2Client.getToken();

            this.accessToken = newAccessToken;
            this.expiresIn = newExpiryDate;
            console.log('Nový token získán.');
            this.scheduleTokenRefresh();
        } catch (error) {
            console.error('Error fetching access token:', error);
        }

    }

    scheduleTokenRefresh() {
        setTimeout(() => {
            console.log('Token expiroval. Probíhá obnovení...');
            this.requestNewToken();
        }, this.expiresIn * 1000);
    }

    // @ts-ignore
    async getAccessToken() {
        if (!this.accessToken || this.expiresIn < 60) {
            console.log('Token není platný nebo brzy expiruje. Probíhá obnovení...');
            await this.requestNewToken();
        }

        return this.accessToken;
    }
}
