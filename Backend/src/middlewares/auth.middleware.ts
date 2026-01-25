import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { AppError } from '../interfaces/error.interface';
import { AuthRequest } from '../interfaces/auth-request.interface';

/**
 * Authentication middleware to verify JWT token
 * Extracts token from Authorization header and verifies it
 * Adds userId to request object for use in subsequent handlers
 */
export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      const error: AppError = new Error('Authorization header is missing');
      error.statusCode = 401;
      throw error;
    }

    // Extract token from "Bearer <token>" format
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      const error: AppError = new Error('Invalid authorization header format. Expected: Bearer <token>');
      error.statusCode = 401;
      throw error;
    }

    const token = parts[1];

    if (!token) {
      const error: AppError = new Error('Token is missing');
      error.statusCode = 401;
      throw error;
    }

    // Verify token
    const decoded = verifyToken(token);

    // Add userId to request object
    req.userId = decoded.user_id;

    next();
  } catch (error) {
    // If token verification fails, pass error to error middleware
    if (error instanceof Error) {
      const appError: AppError = error;
      if (!appError.statusCode) {
        appError.statusCode = 401;
      }
      next(appError);
    } else {
      const appError: AppError = new Error('Authentication failed');
      appError.statusCode = 401;
      next(appError);
    }
  }
};

