import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../interfaces/auth-request.interface';
import { validateApiKey } from '../helpers/gatewayHelper';
import { env } from '../config/env';
import { iamClient } from '../grpc';
import { createMetadata, getClientIp } from '../grpc/utils/createMetadata';

export const gateWayRegister = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const projectId = Array.isArray(req.headers['x-project-id'])
            ? req.headers['x-project-id'][0]
            : req.headers['x-project-id'];

        const apiKey = Array.isArray(req.headers['x-api-key'])
            ? req.headers['x-api-key'][0]
            : req.headers['x-api-key'];
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
        const metadata = createMetadata({
            projectId,
            providerId: userId,
            ip: getClientIp(req)
        });

        const data: any = await new Promise((resolve, reject) => {
            iamClient.RegisterUser(
                {
                    name,
                    email,
                    password,
                },
                metadata,
                (err: any, response: any) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(response);
                }
            );
        });

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: data,
        });
    } catch (error: any) {

        const grpcToHttp: any = {
            3: 400,
            5: 404,
            6: 409,
            7: 403,
            16: 401,
            13: 500,
        };

        const status = grpcToHttp[error.code] || 500;

        return res.status(status).json({
            success: false,
            message: error.message || "Gateway error",
            data: null,
        });
    }
};

export const gateWayLogin = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const projectId = Array.isArray(req.headers['x-project-id'])
            ? req.headers['x-project-id'][0]
            : req.headers['x-project-id'];

        const apiKey = Array.isArray(req.headers['x-api-key'])
            ? req.headers['x-api-key'][0]
            : req.headers['x-api-key'];
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

        // ---------- Login ----------
        const loginMetadata = createMetadata({
            projectId,
            providerId: userId,
            ip: getClientIp(req),
        });
        

        const loginData: any = await new Promise((resolve, reject) => {
            iamClient.LoginUser(
                { email, password },
                loginMetadata,
                (err: any, response: any) => {
                    if (err) return reject(err);
                    resolve(response);
                }
            );
        });

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: loginData,
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

        // ---------- Refresh Session ----------
        const refreshMetadata = createMetadata({
            projectId,
            providerId: userId,
            ip: getClientIp(req),
        });

        const refreshData: any = await new Promise((resolve, reject) => {
            iamClient.RefreshSession(
                { refreshToken },
                refreshMetadata,
                (err: any, response: any) => {
                    if (err) return reject(err);
                    resolve(response);
                }
            );
        });

        return res.status(200).json({
            success: true,
            message: 'Session refreshed',
            data: refreshData,
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

        // ---------- Logout ----------
        const logoutMetadata = createMetadata({
            projectId,
            providerId: userId,
            ip: getClientIp(req),
        });
        // Add Authorization token to metadata
        if (authHeader) logoutMetadata.add('authorization', authHeader as string);

        const logoutData: any = await new Promise((resolve, reject) => {
            iamClient.LogoutUser(
                {},
                logoutMetadata,
                (err: any, response: any) => {
                    if (err) return reject(err);
                    resolve(response);
                }
            );
        });

        return res.status(200).json({
            success: true,
            message: 'Logout successful',
            data: logoutData,
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

        // ---------- Get Profile ----------
        const profileMetadata = createMetadata({
            projectId,
            providerId: userId,
            ip: getClientIp(req),
        });
        if (authHeader) profileMetadata.add('authorization', authHeader as string);

        const profileData: any = await new Promise((resolve, reject) => {
            iamClient.GetProfile(
                {},
                profileMetadata,
                (err: any, response: any) => {
                    if (err) return reject(err);
                    resolve(response);
                }
            );
        });

        return res.status(200).json({
            success: true,
            message: 'Profile retrieved successfully',
            data: profileData,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Gateway error',
            data: error?.message || null,
        });
    }
};

