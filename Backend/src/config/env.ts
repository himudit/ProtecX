import dotenv from 'dotenv';
import { EnvConfig } from '../interfaces/env.interface';
import { ApiEnvironment } from '@prisma/client';

// Load environment variables
dotenv.config();

/**
 * Safely map NODE_ENV string to Prisma ApiEnvironment enum
 */
const parseNodeEnv = (value?: string): ApiEnvironment => {
  switch (value) {
    case 'production':
      return ApiEnvironment.PRODUCTION;
    case 'development':
    default:
      return ApiEnvironment.DEVELOPMENT;
  }
};

// Create env config
export const env: EnvConfig = {
  NODE_ENV: parseNodeEnv(process.env.NODE_ENV),
  PORT: Number(process.env.PORT ?? 3000),
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_TTL: process.env.JWT_TTL ?? '3600',
  API_KEY: process.env.API_KEY,
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
};

// Validate PORT
if (!Number.isInteger(env.PORT) || env.PORT < 1 || env.PORT > 65535) {
  throw new Error('PORT must be a valid number between 1 and 65535');
}

// Validate required env vars in production
if (env.NODE_ENV === ApiEnvironment.PRODUCTION) {
  const requiredEnvVars: (keyof EnvConfig)[] = [
    'DATABASE_URL',
    'JWT_SECRET',
    'ENCRYPTION_KEY',
    'CORS_ORIGIN',
  ];

  const missing = requiredEnvVars.filter((key) => !env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables in production: ${missing.join(
        ', '
      )}`
    );
  }
}

// Helpful flags
export const isDev = env.NODE_ENV === ApiEnvironment.DEVELOPMENT;
export const isProd = env.NODE_ENV === ApiEnvironment.PRODUCTION;
