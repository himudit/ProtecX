import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../interfaces/auth-request.interface';
import { validateApiKey } from '../utils/gatewayHelper';
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
                message: 'API key and project ID are required',
                data: null,
            });
        }

        const userId = await validateApiKey(
            apiKey as string,
            projectId as string
        );

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Invalid API key or ProjectId',
                data: null,
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
                message: 'API key and project ID are required',
                data: null,
            });
        }

        const userId = await validateApiKey(
            apiKey as string,
            projectId as string
        );

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Invalid API key or ProjectId',
                data: null,
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
                message: 'API key and project ID are required',
                data: null,
            });
        }

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required',
            });
        }

        const userId = await validateApiKey(
            apiKey as string,
            projectId as string
        );

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Invalid API key or ProjectId',
                data: null,
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
        const accessToken = req.body?.accessToken;

        if (!apiKey || !projectId) {
            return res.status(400).json({
                success: false,
                message: 'API key and project ID are required',
                data: null,
            });
        }

        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required',
            });
        }

        const userId = await validateApiKey(
            apiKey as string,
            projectId as string
        );

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Invalid API key or ProjectId',
                data: null,
            });
        }

        const response = await fetch(`${env.AUTH_MICROSERVICE}/iam/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-project-id': projectId as string,
                'x-provider-id': userId as string,
            },
            body: JSON.stringify({ accessToken }),
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

