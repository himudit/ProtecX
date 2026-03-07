import { ProjectStatus, ProjectRole } from "@prisma/client";
import { ApiEnvironment } from "@prisma/client";

export interface CreateProjectDto {
    name: string;
    description?: string;
}

export interface CreateProjectResponseDto {
    project: ProjectResponseDto;
    apiKey: ApiKeyCreateResponseDto;
    jwtKey: JwtKeyResponseDto;
}

export interface ApiKeyCreateResponseDto {
    id: string;
    apiKey: string;
    secretKey: string; // shown ONCE
    environment: string;
    isActive: boolean;
    createdAt: Date;
}

export interface ProjectResponseDto {
    id: string;
    ownerId: string;
    name: string;
    description?: string | null;
    status: ProjectStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface ApiKeyResponseDto {
    id: string;
    apiKey: string;
    environment: string;
    isActive: boolean;
    createdAt: Date;
}

export interface JwtKeyResponseDto {
    id: string;
    kid: string;
    publicKey: string;
    algorithm: string;
    isActive: boolean;
    createdAt: Date;
}

export interface ProjectMetaResponseDto {
    project: ProjectResponseDto;
    apiKey: ApiKeyResponseDto;
    jwtKey: JwtKeyResponseDto;
}

export interface ProjectUserRowResponseDto {
    id: string;
    name: string;
    email: string;
    role: ProjectRole;
    isVerified: boolean;
    createdAt: string;
    lastLoginAt: string;
}


export interface DashboardStatsResponseDto {
    totalProjects: number;
    totalUsers: number;
    totalRequests: number;
    dailyRequestStats: DailyRequestStat[];
}

export interface DailyRequestStat {
    date: string;
    count: number;
}
