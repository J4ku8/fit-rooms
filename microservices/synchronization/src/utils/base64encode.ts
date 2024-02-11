export function encodeCredentials(client_id: string, client_secret: string): string {
    const credentialsString = `${client_id}:${client_secret}`;
    return Buffer.from(credentialsString).toString('base64');
}
