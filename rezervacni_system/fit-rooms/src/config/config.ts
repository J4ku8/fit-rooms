import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../.env.dev'),
});

const config = {
  node_env: process.env.NODE_ENV || "",
  port: process.env.PORT || "",
  cors_origin: process.env.CORS_ORIGIN || "",
  client_id: process.env.CLIENT_ID || "",
  client_secret: process.env.CLIENT_SECRET || ""
};

export default config;
