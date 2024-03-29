import * as dotenv from 'dotenv';
import path from 'path';
import * as process from 'process';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

const config = {
  node_env: process.env.NODE_ENV || '',
  port: process.env.PORT || '',
  db: process.env.DB_URL || '',
  cors_origin: process.env.CORS_ORIGIN || '',
  client_id_kos: process.env.CLIENT_ID_KOS || '',
  client_secret_kos: process.env.CLIENT_SECRET_KOS || '',
  client_id_ms: process.env.CLIENT_ID_MS || '',
  client_secret_ms: process.env.CLIENT_SECRET_MS || '',
  tenant_id_ms: process.env.TENANT_ID_MS || '',
  kos_api: process.env.KOS_API || '',
  cvut_oauth_uri: process.env.CVUT_OAUTH_URI || '',
  cvut_oauth_token_uri: process.env.CVUT_OAUTH_TOKEN_URI || '',
  cvut_oauth_check_token_uri: process.env.CVUT_OAUTH_CHECK_TOKEN_URI || '',
};

export default config;
