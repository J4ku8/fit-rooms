import * as dotenv from 'dotenv';
import path from 'path';
import * as process from "process";

dotenv.config({
  path: path.resolve(__dirname, '../../.env.dev'),
});

const config = {
  node_env: process.env.NODE_ENV || "",
  port: process.env.PORT || "",
  cors_origin: process.env.CORS_ORIGIN || "",
  client_id: process.env.CLIENT_ID || "",
  client_secret: process.env.CLIENT_SECRET || "",
  kos_api: process.env.KOS_API || "",
  cvut_oauth_uri: process.env.CVUT_OAUTH_URI || "",
  cvut_oauth_token_uri: process.env.CVUT_OAUTH_TOKEN_URI || "",
  cvut_oauth_check_token_uri: process.env.CVUT_OAUTH_CHECK_TOKEN_URI || "",
};

export default config;
