import {
  config
} from '@keystone-6/core';
import {
  BaseKeystoneTypeInfo,
  DatabaseConfig,
  KeystoneConfig
} from '@keystone-6/core/types';

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
let dbConfig: DatabaseConfig < BaseKeystoneTypeInfo > ;
if (process.env.DB_URI) {
  console.log(`Using process.env.DB_URI`)
  dbConfig = {
    provider: 'postgresql',
    url: process.env.DB_URI,
  };
} else {
  dbConfig = {
    provider: 'sqlite',
    url: 'file:./app.db',
  }
};
let ksConfig: KeystoneConfig = {
  db: dbConfig,
  experimental: {
    generateNextGraphqlAPI: true,
    generateNodeAPI: true,
  },
  lists,
  server: {
    port: 8080,
  },

};

export default (() => {
  return config(ksConfig);
})();