declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: string;
        readonly PORT: string;
        readonly CORS_ORIGIN: string;
        readonly CLIENT_ID: string;
        readonly CLIENT_SECRET: string;
    }
}
