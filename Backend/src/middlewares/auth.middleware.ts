import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { AppError } from '../interfaces/error.interface';
import { AuthRequest } from '../interfaces/auth-request.interface';

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      const error: AppError = new Error('Authentication required');
      error.statusCode = 401;
      throw error;
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      const error: AppError = new Error('Invalid authorization header');
      error.statusCode = 401;
      throw error;
    }

    const token = parts[1];

    if (!token) {
      const error: AppError = new Error('Authentication token missing');
      error.statusCode = 401;
      throw error;
    }

    const decoded = verifyToken(token);

    req.userId = decoded.sub;

    next();
  } catch (error) {
    const appError: AppError =
      error instanceof Error ? error : new Error('Authentication failed');

    appError.statusCode = 401;
    next(appError);
  }
};

