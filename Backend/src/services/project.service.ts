import { prisma } from '../config/primsa';
import { CreateProjectDto } from '../interfaces/project.interface';
import * as projectApiKeyService from './projectApiKey.service';
import * as projectJwtKeyService from './projectJwtKey.service';
import { ApiEnvironment } from '../enums/api-environment.enum';
import { env } from '../config/env';

export const createProject = async (userId: string, data: CreateProjectDto): Promise<any> => {
  // Use a transaction to ensure both project and API key are created
  const result = await prisma.$transaction(async (tx) => {
    const project = await tx.project.create({
      data: {
        name: data.name,
        description: data.description,
        ownerId: userId,
      },
    });

    // Create a default DEVELOPMENT API key
    const apiKey = await projectApiKeyService.createApiKey({
      projectId: project.id,
      environment: env.NODE_ENV as ApiEnvironment,
    }, tx as any);

    // Create a default JWT Key pair
    const jwtKey = await projectJwtKeyService.createJwtKey(project.id, tx as any);

    return { project, apiKey, jwtKey };
  });

  return result;
};
