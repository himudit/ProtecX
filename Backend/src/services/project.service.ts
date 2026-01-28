// import { prisma } from '../config/primsa';
// import { CreateProjectDto } from '../interfaces/project.interface';
// import * as projectApiKeyService from './projectApiKey.service';
// import * as projectJwtKeyService from './projectJwtKey.service';
// import { ApiEnvironment } from '../enums/api-environment.enum';
// import { env } from '../config/env';

// export const createProject = async (userId: string, data: CreateProjectDto): Promise<any> => {
//   // Use a transaction to ensure both project and API key are created
//   const result = await prisma.$transaction(async (tx) => {
//     const project = await tx.project.create({
//       data: {
//         name: data.name,
//         description: data.description,
//         ownerId: userId,
//       },
//     });

//     const apiKey = await projectApiKeyService.createApiKey({
//       projectId: project.id,
//       environment: env.NODE_ENV as ApiEnvironment,
//     }, tx as any);

//     const jwtKey = await projectJwtKeyService.createJwtKey(project.id, tx as any);

//     return { project, apiKey, jwtKey };
//   });

//   return result;
// };


import { prisma } from '../config/primsa';
import { CreateProjectDto } from '../interfaces/project.interface';
import * as projectApiKeyService from './projectApiKey.service';
import * as projectJwtKeyService from './projectJwtKey.service';
import { ApiEnvironment } from '../enums/api-environment.enum';
import { env } from '../config/env';

export const createProject = async (
  userId: string,
  data: CreateProjectDto
): Promise<any> => {
  /**
   * 1️⃣ Generate everything BEFORE the transaction
   * (NO database calls here)
   */
  const apiKeyPrepared = await projectApiKeyService.prepareApiKey(
    env.NODE_ENV as ApiEnvironment
  );

  const jwtKeyPrepared = projectJwtKeyService.prepareJwtKey();

  /**
   * 2️⃣ Transaction = ONLY database operations
   */
  const result = await prisma.$transaction(async (tx) => {
    const project = await tx.project.create({
      data: {
        name: data.name,
        description: data.description,
        ownerId: userId,
      },
    });

    const projectApiKey = await tx.projectApiKey.create({
      data: {
        projectId: project.id,
        apiKey: apiKeyPrepared.apiKey,
        secretKeyHash: apiKeyPrepared.secretKeyHash,
        environment: apiKeyPrepared.environment,
      },
    });

    const projectJwtKey = await tx.projectJwtKey.create({
      data: {
        projectId: project.id,
        kid: jwtKeyPrepared.kid,
        publicKey: jwtKeyPrepared.publicKey,
        privateKeyEncrypted: jwtKeyPrepared.privateKeyEncrypted,
        algorithm: jwtKeyPrepared.algorithm,
      },
    });

    return {
      project,
      apiKey: {
        id: projectApiKey.id,
        projectId: projectApiKey.projectId,
        apiKey: projectApiKey.apiKey,
        secretKey: apiKeyPrepared.secretKey, // shown ONCE
        environment: projectApiKey.environment,
        isActive: projectApiKey.isActive,
        createdAt: projectApiKey.createdAt,
      },
      jwtKey: projectJwtKey,
    };
  });

  return result;
};
