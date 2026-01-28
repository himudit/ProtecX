// import crypto from 'crypto';
// import { prisma } from '../config/primsa';
// import { encrypt } from '../utils/crypto';
// import { JwtAlgorithm } from '../enums/jwt-algorithm.enum';

// /**
//  * Generate RSA key pair for a project
//  */
// export const createJwtKey = async (
//     projectId: string,
//     prismaClient = prisma
// ): Promise<any> => {
//     // Generate RSA key pair
//     const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
//         modulusLength: 2048,
//         publicKeyEncoding: {
//             type: 'spki',
//             format: 'pem',
//         },
//         privateKeyEncoding: {
//             type: 'pkcs8',
//             format: 'pem',
//         },
//     });

//     // Generate a unique Key ID (kid)
//     const kid = crypto.randomBytes(16).toString('hex');

//     // Encrypt private key
//     const privateKeyEncrypted = encrypt(privateKey);

//     // Save to database
//     const projectJwtKey = await prismaClient.projectJwtKey.create({
//         data: {
//             projectId,
//             kid,
//             publicKey,
//             algorithm: JwtAlgorithm.RS256,
//         },
//     });

//     return projectJwtKey;
// };

// /**
//  * Get active JWT keys for a project
//  */
// export const getProjectJwtKeys = async (projectId: string) => {
//     return prisma.projectJwtKey.findMany({
//         where: {
//             projectId,
//             isActive: true,
//         },
//         select: {
//             id: true,
//             projectId: true,
//             kid: true,
//             publicKey: true,
//             algorithm: true,
//             isActive: true,
//             createdAt: true,
//             // Do NOT select privateKeyEncrypted
//         },
//     });
// };

import crypto from 'crypto';
import { encrypt } from '../utils/crypto';
import { JwtAlgorithm } from '../enums/jwt-algorithm.enum';

/**
 * Prepare JWT key pair (NO DB CALLS)
 */
export const prepareJwtKey = () => {
    // Generate RSA key pair
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        },
    });

    const kid = crypto.randomBytes(16).toString('hex');
    const privateKeyEncrypted = encrypt(privateKey);

    return {
        kid,
        publicKey,
        privateKeyEncrypted,
        algorithm: JwtAlgorithm.RS256,
    };
};
