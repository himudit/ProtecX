import { prisma } from '../config/prisma';
import { redis } from '../config/redis';

export const validateApiKey = async (
    apiKey: string,
    projectId: string
): Promise<string | null> => {
    const redisKey = `apiKey:${apiKey}:project:${projectId}`;

    // Step 1 — Check Redis
    const cachedData = await redis.get(redisKey);

    if (cachedData) {
        console.log("Cache HIT");
        try {
            const parsed = JSON.parse(cachedData);
            if (parsed.isActive && parsed.projectId === projectId) {
                return parsed.ownerId;
            }
            return null;
        } catch (error) {
            console.error('Error parsing Redis cache:', error);
        }
    }

    console.log("Cache MISS");

    // Step 2 — If cache miss: Query Prisma
    const record = await prisma.projectApiKey.findUnique({
        where: { apiKey },
        select: {
            isActive: true,
            projectId: true,
            project: {
                select: { ownerId: true }
            }
        }
    });

    console.log("DB query time");

    // Step 3 — Validate result
    if (!record || !record.isActive || record.projectId !== projectId) {
        return null;
    }

    // Step 4 — Store in Redis with TTL 600 seconds
    const cacheValue = {
        ownerId: record.project.ownerId,
        projectId: record.projectId,
        isActive: record.isActive
    };

    await redis.set(redisKey, JSON.stringify(cacheValue), 'EX', 600);

    // Step 5 — return ownerId.
    return record.project.ownerId;
};
