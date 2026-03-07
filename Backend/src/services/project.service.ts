import { prisma } from '../config/prisma';
import { CreateProjectDto, ProjectResponseDto, ApiKeyCreateResponseDto, JwtKeyResponseDto, CreateProjectResponseDto, ProjectMetaResponseDto, ApiKeyResponseDto, ProjectUserRowResponseDto, DailyRequestStat } from '../interfaces/project.interface';
import * as projectApiKeyService from './projectApiKey.service';
import * as projectJwtKeyService from './projectJwtKey.service';
import { ApiEnvironment } from '../enums/api-environment.enum';
import { env } from '../config/env';
import { ProjectStatus } from '@prisma/client';
import { Prisma } from "@prisma/client";

export const createProject = async (
  userId: string,
  data: CreateProjectDto
): Promise<any> => {
  const apiKeyPrepared = await projectApiKeyService.prepareApiKey(
    env.NODE_ENV as ApiEnvironment
  );

  const jwtKeyPrepared = projectJwtKeyService.prepareJwtKey();

  const result = await prisma.$transaction(async (tx) => {
    const projectModel = await tx.project.create({
      data: {
        name: data.name,
        description: data.description,
        ownerId: userId,
      },
    });
    const projectDto: ProjectResponseDto = {
      id: projectModel.id,
      ownerId: projectModel.ownerId,
      name: projectModel.name,
      description: projectModel.description,
      status: projectModel.status,
      createdAt: projectModel.createdAt,
      updatedAt: projectModel.updatedAt,
    };

    const apiKeyModel = await tx.projectApiKey.create({
      data: {
        projectId: projectModel.id,
        apiKey: apiKeyPrepared.apiKey,
        secretKeyHash: apiKeyPrepared.secretKeyHash,
        environment: apiKeyPrepared.environment,
      },
    });
    const apiKeyDto: ApiKeyCreateResponseDto = {
      id: apiKeyModel.id,
      apiKey: apiKeyModel.apiKey,
      secretKey: apiKeyPrepared.secretKey,
      environment: apiKeyModel.environment,
      isActive: apiKeyModel.isActive,
      createdAt: apiKeyModel.createdAt,
    };

    const jwtKeyModel = await tx.projectJwtKey.create({
      data: {
        projectId: projectModel.id,
        kid: jwtKeyPrepared.kid,
        publicKey: jwtKeyPrepared.publicKey,
        privateKeyEncrypted: jwtKeyPrepared.privateKeyEncrypted,
        algorithm: jwtKeyPrepared.algorithm,
      },
    });
    const jwtKeyDto: JwtKeyResponseDto = {
      id: jwtKeyModel.id,
      kid: jwtKeyModel.kid,
      publicKey: jwtKeyModel.publicKey,
      algorithm: jwtKeyModel.algorithm,
      isActive: jwtKeyModel.isActive,
      createdAt: jwtKeyModel.createdAt
    };

    const result: CreateProjectResponseDto = {
      project: projectDto,
      apiKey: apiKeyDto,
      jwtKey: jwtKeyDto,
    }
    return result;
  });

  return result;
};

export const getProjects = async (userId: string): Promise<ProjectResponseDto[]> => {
  const projectsModel = await prisma.project.findMany({
    where: {
      ownerId: userId,
    },
    select: {
      id: true,
      ownerId: true,
      name: true,
      description: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const projectsDto: ProjectResponseDto[] = projectsModel.map((project) => ({
    id: project.id,
    ownerId: project.ownerId,
    name: project.name,
    description: project.description,
    status: project.status,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  }));

  return projectsDto;
};

export const getProjectById = async (userId: string, projectId: string): Promise<ProjectMetaResponseDto> => {

  const projectModel = await prisma.project.findFirst({
    where: {
      id: projectId,
      ownerId: userId,
    },
    select: {
      id: true,
      ownerId: true,
      name: true,
      description: true,
      status: true,
      createdAt: true,
      updatedAt: true,

      apiKeys: {
        where: { isActive: true },
        select: {
          id: true,
          apiKey: true,
          environment: true,
          isActive: true,
          createdAt: true,
        },
      },

      jwtKeys: {
        where: { isActive: true },
        select: {
          id: true,
          kid: true,
          publicKey: true,
          algorithm: true,
          isActive: true,
          createdAt: true,
        },
      },
    },
  });


  if (!projectModel) {
    throw new Error('Project not found');
  }

  const projectDto: ProjectResponseDto = {
    id: projectModel.id,
    ownerId: projectModel.ownerId,
    name: projectModel.name,
    description: projectModel.description,
    status: projectModel.status,
    createdAt: projectModel.createdAt,
    updatedAt: projectModel.updatedAt,
  };

  const activeApiKey = projectModel.apiKeys[0];
  const apiKeyDto: ApiKeyResponseDto | null = activeApiKey ? {
    id: activeApiKey.id,
    apiKey: activeApiKey.apiKey,
    environment: activeApiKey.environment,
    isActive: activeApiKey.isActive,
    createdAt: activeApiKey.createdAt,
  } : null;

  const activeJwtKey = projectModel.jwtKeys[0];
  const jwtKeyDto: JwtKeyResponseDto | null = activeJwtKey ? {
    id: activeJwtKey.id,
    kid: activeJwtKey.kid,
    publicKey: activeJwtKey.publicKey,
    algorithm: activeJwtKey.algorithm,
    isActive: activeJwtKey.isActive,
    createdAt: activeJwtKey.createdAt
  } : null;

  if (!apiKeyDto || !jwtKeyDto) {
    throw new Error('Project configuration is incomplete (missing active keys)');
  }

  const result: ProjectMetaResponseDto = {
    project: projectDto,
    apiKey: apiKeyDto,
    jwtKey: jwtKeyDto,
  };

  return result;
};

export const getProjectUsers = async (userId: string, projectId: string): Promise<ProjectUserRowResponseDto[]> => {
  const projectUsers = await prisma.projectUser.findMany({
    where: {
      providerId: userId,
      projectId: projectId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return projectUsers.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isVerified: user.isVerified,
    createdAt: user.createdAt.toISOString(),
    lastLoginAt: user.lastLoginAt ? user.lastLoginAt.toISOString() : 'Never',
  }));
};

export const getProjectLogs = async (userId: string, projectId: string): Promise<any[]> => {
  const logs = await prisma.logs.findMany({
    where: {
      projectId: projectId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return logs;
};

export const getDailyRequestStats = async (userId: string): Promise<DailyRequestStat[]> => {
  const projects = await prisma.project.findMany({
    where: {
      ownerId: userId,
    },
    select: {
      id: true,
    },
  });

  const projectIds = projects.map((p) => p.id);

  if (projectIds.length === 0) {
    return [];
  }

  const dailyRequestStats = await prisma.$queryRaw<DailyRequestStat[]>`
    SELECT to_char("createdAt", 'YYYY-MM-DD') as date, COUNT(*) as count
    FROM "Logs"
    WHERE "projectId" IN (${Prisma.join(projectIds)})
    GROUP BY to_char("createdAt", 'YYYY-MM-DD')
    ORDER BY date ASC
  `;

  return dailyRequestStats.map((stat) => ({
    ...stat,
    count: Number(stat.count),
  }));
};
