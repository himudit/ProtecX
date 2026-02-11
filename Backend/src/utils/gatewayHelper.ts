import { prisma } from '../config/primsa';

export const validateApiKey = async (apiKey: string, projectId: string): Promise<string | null> => {
    const apiKeyRecord = await prisma.projectApiKey.findUnique({
        where: { apiKey },
        select: {
            isActive: true,
            projectId: true,
            project: {
                select: { ownerId: true },
            },
        },
    });

    if (!apiKeyRecord || !apiKeyRecord.isActive || apiKeyRecord.projectId !== projectId) {
        return null;
    }

    return apiKeyRecord.project.ownerId;
};


