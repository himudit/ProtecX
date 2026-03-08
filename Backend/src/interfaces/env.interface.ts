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
  AUTH_MICROSERVICE?: string;
  FRONTEND_URL?: string;
  RABBITMQ_URL?: string;
  RABBITMQ_QUEUE?: string;
  RABBITMQ_PREFETCH?: number;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  REDIS_URL?: string;
}

