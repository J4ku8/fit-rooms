import {ClientSecretCredential} from '@azure/identity';
import {Client} from '@microsoft/microsoft-graph-client';
import {
    TokenCredentialAuthenticationProvider
} from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import {AppSettings} from "../src/types";

class GraphApiClient {
    private settings: AppSettings;
    private clientSecretCredential: ClientSecretCredential | undefined;
    private appClient: Client | undefined;

    constructor(settings: AppSettings) {
        if (!settings) {
            throw new Error('Settings cannot be undefined');
        }

        this.settings = settings;
    }

    private initializeClient(): Client {
        if (!this.clientSecretCredential) {
            this.clientSecretCredential = new ClientSecretCredential(
                this.settings.tenantId,
                this.settings.clientId,
                this.settings.clientSecret
            );
        }
        if (!this.appClient) {
            const authProvider = new TokenCredentialAuthenticationProvider(this.clientSecretCredential, {
                scopes: ['https://graph.microsoft.com/.default'],
            });
            this.appClient = Client.initWithMiddleware({
                authProvider,
            });
        }
        return this.appClient
    }

    public initializeGraphForAppOnlyAuth(): Client {
        return this.initializeClient()
    }

    public async getAppOnlyTokenAsync(): Promise<string> {
        if (!this.clientSecretCredential) {
            throw new Error('Graph has not been initialized for app-only auth');
        }

        const response = await this.clientSecretCredential.getToken([
            'https://graph.microsoft.com/.default',
        ]);
        return response.token;
    }
}

export default GraphApiClient
