import { config } from '@keystone-6/core';
import { BaseKeystoneTypeInfo, DatabaseConfig } from '@keystone-6/core/types';

import 'dotenv/config';

export const cloudinary = {
  cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  apiKey: `${process.env.CLOUDINARY_KEY}`,
  apiSecret: `${process.env.CLOUDINARY_SECRET}`,
  folder: 'tngvi',
};
import lists from './admin/schema';

declare module 'express-serve-static-core' {
  interface Request {
    logIn: any;
  }
}

// Fallback
let dbConfig: DatabaseConfig<BaseKeystoneTypeInfo> = {
  provider: 'sqlite',
  url: 'file:./app.db',
};
if (process.env.DB_URI) {
  dbConfig = {
    provider: 'postgresql',
    url: process.env.DB_URI,
  };
}
let ksConfig = {
  db: dbConfig,
  experimental: {
    generateNextGraphqlAPI: true,
    generateNodeAPI: true,
  },
  lists,
};

export default (() => {
  return config(ksConfig);
})();
