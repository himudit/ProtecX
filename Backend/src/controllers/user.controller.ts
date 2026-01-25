import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';
import { AuthRequest } from '../interfaces/auth-request.interface';

/**
 * Sign up a new user
 */
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    const result = await userService.signup({
      email,
      password,
      name,
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login an existing user
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const result = await userService.login({
      email,
      password,
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user profile
 */
export const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.userId;

    if (!userId) {
      const error = new Error('User ID is missing');
      (error as any).statusCode = 401;
      throw error;
    }

    const profile = await userService.getProfile(userId);

    res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

