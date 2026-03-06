import { prisma } from '../config/prisma';
import { hashPassword, verifyPassword } from '../utils/password';
import { signToken } from '../utils/jwt';
import { OAuth2Client } from 'google-auth-library';
import { env } from '../config/env';
import {
  SignupData,
  SignupResult,
  LoginData,
  LoginResult,
  ProfileResult,
} from '../interfaces/user.interface';

/**
 * Sign up a new user
 */
export const signup = async (data: SignupData): Promise<SignupResult> => {
  // Validate input
  if (!data.email || !data.password || !data.name) {
    const error = new Error('Email, password, and name are required');
    (error as any).statusCode = 400;
    throw error;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    const error = new Error('Invalid email format');
    (error as any).statusCode = 400;
    throw error;
  }

  // Validate password length
  if (data.password.length < 8) {
    const error = new Error('Password must be at least 8 characters long');
    (error as any).statusCode = 400;
    throw error;
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    const error = new Error('User with this email already exists');
    (error as any).statusCode = 409;
    throw error;
  }

  // Hash password
  const hashedPassword = await hashPassword(data.password);

  // Create user
  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
    },
  });

  // Generate JWT token
  const token = signToken(user.id, user.email);

  // Return user data (without password) and token
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      image: user.image,
    },
    token,
  };
};


/**
 * Login an existing user
 */
export const login = async (data: LoginData): Promise<LoginResult> => {
  // Validate input
  if (!data.email || !data.password) {
    const error = new Error('Email and password are required');
    (error as any).statusCode = 400;
    throw error;
  }

  // Validate email forma
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    const error = new Error('Invalid email format');
    (error as any).statusCode = 400;
    throw error;
  }

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    const error = new Error('Invalid email or password');
    (error as any).statusCode = 401;
    throw error;
  }

  // Verify password
  const isPasswordValid = await verifyPassword(user.password as string, data.password);

  if (!isPasswordValid) {
    const error = new Error('Invalid email or password');
    (error as any).statusCode = 401;
    throw error;
  }

  // Generate JWT token
  const token = signToken(user.id, user.email);

  // Return user data (without password) and token
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      image: user.image,
    },
    token,
  };
};

/**
 * Get user profile by ID
 */
export const getProfile = async (userId: string): Promise<ProfileResult> => {
  // Find user by ID
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    const error = new Error('User not found');
    (error as any).statusCode = 404;
    throw error;
  }

  return user;
};

const client = new OAuth2Client(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
);

/**
 * Login with Google OAuth
 */
export const googleLogin = async (code: string): Promise<LoginResult> => {
  if (!code) {
    const error = new Error('Authorization code is required');
    (error as any).statusCode = 400;
    throw error;
  }

  try {
    // 1. Exchange Code for tokens
    const { tokens } = await client.getToken({
      code,
      redirect_uri: "postmessage",
    });
    const idToken = tokens.id_token;

    if (!idToken) {
      const error = new Error('Failed to retrieve ID token from Google');
      (error as any).statusCode = 401;
      throw error;
    }

    // 2. Verify ID Token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      const error = new Error('Invalid Google token payload');
      (error as any).statusCode = 401;
      throw error;
    }

    // Check email verification
    if (!payload.email_verified) {
      const error = new Error('Google email is not verified');
      (error as any).statusCode = 401;
      throw error;
    }

    const { sub: providerId, email, name, picture: image } = payload;

    if (!email) {
      const error = new Error('Email not provided by Google');
      (error as any).statusCode = 401;
      throw error;
    }

    // 3. Database Logic (Optimized - Max 2 queries)

    // Step A: Find by providerId + authProvider = GOOGLE
    let user = await prisma.user.findFirst({
      where: {
        providerId,
        authProvider: 'GOOGLE',
      },
    });

    if (user) {
      // If found, update email if it changed
      if (user.email !== email) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { email },
        });
      }
    } else {
      // Step B: If not found → find by email
      const existingUserByEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUserByEmail) {
        // Link Google account to existing user
        user = await prisma.user.update({
          where: { id: existingUserByEmail.id },
          data: {
            providerId,
            authProvider: 'GOOGLE',
            image: existingUserByEmail.image || image,
            isVerified: true, // Google verified emails are trusted
          },
        });
      } else {
        // Step C: If neither exists, create new user
        user = await prisma.user.create({
          data: {
            email,
            name: name || email.split('@')[0],
            image,
            providerId,
            authProvider: 'GOOGLE',
            isVerified: true,
            isActive: true,
          },
        });
      }
    }

    // Check if user is active
    if (!user.isActive) {
      const error = new Error('Account is deactivated. Please contact support.');
      (error as any).statusCode = 403;
      throw error;
    }

    // 4. Issue JWT
    const token = signToken(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        image: user.image,
      },
      token,
    };
  } catch (error: any) {
    if (error.statusCode) throw error;

    const googleError = new Error(error.message || 'Google authentication failed');
    (googleError as any).statusCode = 401;
    throw googleError;
  }
};
