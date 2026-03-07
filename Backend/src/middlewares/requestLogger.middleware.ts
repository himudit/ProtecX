import { Request, Response, NextFunction } from 'express';
import { publish } from '../rabbitmq/publisher';
import { QUEUES } from '../rabbitmq/queues';
import { ApiLogEvent } from '../rabbitmq/types';

export const requestLogger = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const start = Date.now();

    const originalJson = res.json;

    res.json = function (body: any) {
        res.locals.responseBody = body;
        return originalJson.call(this, body);
    };

    res.on('finish', async () => {
        const duration = Date.now() - start;

        const logEvent: ApiLogEvent = {
            projectId: (req.headers['x-project-id'] as string) || 'null',
            providerId: (req.headers['x-provider-id'] as string) || 'null',
            endpoint: req.originalUrl,
            requestType: req.method,
            statusCode: res.statusCode,
            error: res.statusCode >= 400,
            message: res.locals.responseBody?.message ?? null,
            ip: req.ip || null,
            userAgent: req.headers['user-agent'] ?? null,
            duration: duration,
            createdAt: new Date().toISOString(),
        };

        try {
            await publish(QUEUES.API_LOGS, logEvent);
        } catch (err) {
            console.error('Failed to publish log event:', err);
        }
    });

    next();
};
