import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../interfaces/auth-request.interface';
import { validateApiKey } from '../helpers/gatewayHelper';
import { env } from '../config/env';

export const gateWaySignup = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const projectId = req.headers['x-project-id'];
        const apiKey = req.headers['x-api-key'];
        const { email, password, name } = req.body;

        if (!apiKey || !projectId) {
            return res.status(400).json({
                success: false,
                message: 'Signup failed',
                data: {
                    error: 'API key and project ID are required',
                },
            });
        }

        const userId = await validateApiKey(
            apiKey as string,
            projectId as string
        );

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Signup failed',
                data: {
                    error: 'Invalid API key or ProjectId',
                },
            });
        }

        const response = await fetch(`${env.AUTH_MICROSERVICE}/iam/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-project-id': projectId as string,
                'x-provider-id': userId as string,
            },
            body: JSON.stringify({ email, password, name }),
        });

        let data: any = null;
        try {
            data = await response.json();
        } catch {
            data = null;
        }

        // 🔑 Normalize EVERYTHING
        if (!response.ok) {
            return res.status(response.status).json({
                success: false,
                message: data?.message || 'Signup failed',
                data: data,
            });
        }

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Gateway error',
            data: error?.message || null,
        });
    }
};

export const gateWayLogin = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const projectId = req.headers['x-project-id'];
        const apiKey = req.headers['x-api-key'];
        const { email, password } = req.body;

        if (!apiKey || !projectId) {
            return res.status(400).json({
                success: false,
                message: 'Login failed',
                data: {
                    error: 'API key and project ID are required',
                },
            });
        }

        const userId = await validateApiKey(
            apiKey as string,
            projectId as string
        );

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Login failed',
                data: {
                    error: 'Invalid API key or ProjectId',
                },
            });
        }

        const response = await fetch(`${env.AUTH_MICROSERVICE}/iam/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-project-id': projectId as string,
                'x-provider-id': userId as string,
            },
            body: JSON.stringify({ email, password }),
        });

        let data: any = null;
        try {
            data = await response.json();
        } catch {
            data = null;
        }

        if (!response.ok) {
            return res.status(response.status).json({
                success: false,
                message: data?.message || 'Login failed',
                data: data,
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Gateway error',
            data: error?.message || null,
        });
    }
};

export const gateWayRefresh = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const projectId = req.headers['x-project-id'];
        const apiKey = req.headers['x-api-key'];
        const refreshToken = req.body?.refreshToken;

        if (!apiKey || !projectId) {
            return res.status(400).json({
                success: false,
                message: 'Session refresh failed',
                data: {
                    error: 'API key and project ID are required',
                },
            });
        }

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: 'Session refresh failed',
                data: {
                    error: 'Authentication required (Refresh token is missing)',
                },
            });
        }

        const userId = await validateApiKey(
            apiKey as string,
            projectId as string
        );

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Session refresh failed',
                data: {
                    error: 'Invalid API key or ProjectId',
                },
            });
        }

        const response = await fetch(`${env.AUTH_MICROSERVICE}/iam/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-project-id': projectId as string,
                'x-provider-id': userId as string,
            },
            body: JSON.stringify({ refreshToken }),
        });

        let data: any = null;
        try {
            data = await response.json();
        } catch {
            data = null;
        }

        if (!response.ok) {
            return res.status(response.status).json({
                success: false,
                message: data?.message || 'Session expired',
                data: data,
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Session refreshed',
            data: data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Gateway error',
            data: error?.message || null,
        });
    }
};

export const gateWayLogout = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const projectId = req.headers['x-project-id'];
        const apiKey = req.headers['x-api-key'];
        const authHeader = req.headers['authorization'];

        if (!apiKey || !projectId) {
            return res.status(400).json({
                success: false,
                message: 'Logout failed',
                data: {
                    error: 'API key and project ID are required',
                },
            });
        }

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Logout failed',
                data: {
                    error: 'Authorization header is required',
                },
            });
        }

        const userId = await validateApiKey(
            apiKey as string,
            projectId as string
        );

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Logout failed',
                data: {
                    error: 'Invalid API key or ProjectId',
                },
            });
        }

        const response = await fetch(`${env.AUTH_MICROSERVICE}/iam/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader as string,
                'x-project-id': projectId as string,
                'x-provider-id': userId as string,
            },
        });

        let data: any = null;
        try {
            data = await response.json();
        } catch {
            data = null;
        }

        if (!response.ok) {
            return res.status(response.status).json({
                success: false,
                message: data?.message || 'Logout failed',
                data: data,
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Logout successful',
            data: data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Gateway error',
            data: error?.message || null,
        });
    }
};

export const gateWayProfile = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const projectId = req.headers['x-project-id'];
        const apiKey = req.headers['x-api-key'];
        const authHeader = req.headers['authorization'];

        if (!apiKey || !projectId) {
            return res.status(400).json({
                success: false,
                message: 'Profile retrieval failed',
                data: {
                    error: 'API key and project ID are required',
                },
            });
        }

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Profile retrieval failed',
                data: {
                    error: 'Authorization header is required',
                },
            });
        }

        const userId = await validateApiKey(
            apiKey as string,
            projectId as string
        );

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Profile retrieval failed',
                data: {
                    error: 'Invalid API key or ProjectId',
                },
            });
        }

        const response = await fetch(`${env.AUTH_MICROSERVICE}/iam/profile`, {
            method: 'GET',
            headers: {
                'Authorization': authHeader,
                'x-project-id': projectId as string,
                'x-provider-id': userId as string,
            },
        });

        let data: any = null;
        try {
            data = await response.json();
        } catch {
            data = null;
        }

        if (!response.ok) {
            return res.status(response.status).json({
                success: false,
                message: data?.message || 'Profile retrieval failed',
                data: data,
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Profile retrieved successfully',
            data: data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Gateway error',
            data: error?.message || null,
        });
    }
};

