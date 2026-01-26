/**
 * Environment configuration interfaces
 */

export interface EnvConfig {
  NODE_ENV: string;
  PORT: number;
  CORS_ORIGIN: string;
  DATABASE_URL?: string;
  JWT_SECRET?: string;
  JWT_TTL?: string;
  API_KEY?: string;
  ENCRYPTION_KEY?: string;
}

