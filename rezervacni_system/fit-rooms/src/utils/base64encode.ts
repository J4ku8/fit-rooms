import config from "../config/config";

function encodeCredentials(client_id: string, client_secret: string): string {
    const credentialsString = `${client_id}:${client_secret}`;
    return btoa(credentialsString);
}

const base64EncodedCredentials = encodeCredentials(config.client_id, config.client_secret);

export default base64EncodedCredentials
