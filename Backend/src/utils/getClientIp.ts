import { Request } from 'express';

export const getClientIp = (req: Request) => {
    const xForwardedFor = req.headers['x-forwarded-for'];
    if (xForwardedFor) {
        const ip = Array.isArray(xForwardedFor) ? xForwardedFor[0] : xForwardedFor.split(',')[0];
        return ip.trim();
    }
    return req.socket.remoteAddress || req.ip || '127.0.0.1';
};
