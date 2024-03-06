declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: string;
    readonly PORT: string;
    readonly CORS_ORIGIN: string;
    readonly CLIENT_ID: string;
    readonly CLIENT_SECRET: string;
    readonly KOS_API: string;
    readonly CVUT_OAUTH_TOKEN_URI: string;
    readonly CVUT_OAUTH_CHECK_TOKEN_URI: string;
    readonly CVUT_OAUTH_URI: string;
  }
}
