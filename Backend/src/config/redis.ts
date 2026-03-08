import Redis from 'ioredis';
import { env } from './env';

const redisUrl = env.REDIS_URL;

if (!redisUrl) {
    throw new Error('REDIS_URL is missing in environment variables');
}

export const redis = new Redis(redisUrl);

redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});

redis.on('connect', () => {
    console.log('Connected to Redis');
});
