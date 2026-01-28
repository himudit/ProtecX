// import crypto from 'crypto';
// import { prisma } from '../config/primsa';
// import { hashPassword } from '../utils/password';
// import {
//     CreateProjectApiKeyDto,
//     ProjectApiKeyResponse,
// } from '../interfaces/project.interface';
// import { ApiEnvironment } from '../enums/api-environment.enum';


// const generateRandomString = (length: number): string => {
//     return crypto.randomBytes(length).toString('hex');
// };

// const API_ENV_PREFIX: Record<ApiEnvironment, string> = {
//     [ApiEnvironment.DEVELOPMENT]: 'dev',
//     [ApiEnvironment.PRODUCTION]: 'live',
// };


// export const createApiKey = async (
//     data: CreateProjectApiKeyDto,
//     prismaClient = prisma
// ): Promise<ProjectApiKeyResponse> => {

//     const envPrefix = API_ENV_PREFIX[data.environment as ApiEnvironment];

//     // sx_dev_xxxxx or sx_live_xxxxx
//     const apiKey = `sx_${envPrefix}_${generateRandomString(16)}`;

//     // Secret key (shown only once)
//     const secretKey = `sx_sk_${generateRandomString(24)}`;

//     // Hash secret key
//     const secretKeyHash = await hashPassword(secretKey);

//     const projectApiKey = await prismaClient.projectApiKey.create({
//         data: {
//             projectId: data.projectId,
//             apiKey,
//             secretKeyHash,
//             environment: data.environment as ApiEnvironment,
//         },
//     });

//     return {
//         id: projectApiKey.id,
//         projectId: projectApiKey.projectId,
//         apiKey: projectApiKey.apiKey,
//         secretKey, // return only here i.e on Project Creation
//         environment: projectApiKey.environment as ApiEnvironment,
//         isActive: projectApiKey.isActive,
//         createdAt: projectApiKey.createdAt,
//     };
// };

// /**
//  * Get all API keys for a project
//  */
// export const getProjectApiKeys = async (projectId: string) => {
//     return prisma.projectApiKey.findMany({
//         where: { projectId },
//         select: {
//             id: true,
//             projectId: true,
//             apiKey: true,
//             environment: true,
//             isActive: true,
//             createdAt: true,
//             // Do NOT select secretKeyHash
//         },
//     });
// };


import crypto from 'crypto';
import { hashPassword } from '../utils/password';
import { ApiEnvironment } from '../enums/api-environment.enum';

const generateRandomString = (length: number): string => {
    return crypto.randomBytes(length).toString('hex');
};

const API_ENV_PREFIX: Record<ApiEnvironment, string> = {
    [ApiEnvironment.DEVELOPMENT]: 'dev',
    [ApiEnvironment.PRODUCTION]: 'live',
};

/**
 * Prepare API key data (NO DB CALLS)
 */
export const prepareApiKey = async (environment: ApiEnvironment) => {
    const envPrefix = API_ENV_PREFIX[environment];

    // Public API key
    const apiKey = `sx_${envPrefix}_${generateRandomString(16)}`;

    // Secret key (shown only once)
    const secretKey = `sx_sk_${generateRandomString(24)}`;

    // Hash secret key
    const secretKeyHash = await hashPassword(secretKey);

    return {
        apiKey,
        secretKey,
        secretKeyHash,
        environment,
    };
};
