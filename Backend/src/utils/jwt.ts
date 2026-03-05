import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { JWTPayload } from '../interfaces/jwt.interface';

export const signToken = (userId: string, email: string): string => {
  if (!env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  const ttl = parseInt(env.JWT_TTL || '28800', 10);

  return jwt.sign(
    {
      sub: userId,
      email,
    },
    env.JWT_SECRET,
    {
      expiresIn: ttl,
    }
  );
};

export const verifyToken = (token: string): JWTPayload => {
  if (!env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Session expired. Please login again.');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid authentication token');
    }
    throw new Error('Authentication failed.');
  }
};

export const decodeToken = (token: string): JWTPayload | null => {
  try {
    const decoded = jwt.decode(token) as JWTPayload | null;
    return decoded;
  } catch (error) {
    return null;
  }
};

