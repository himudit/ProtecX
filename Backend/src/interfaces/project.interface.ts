import { ProjectStatus } from "../generated/prisma";
import { ApiEnvironment } from "../generated/prisma";

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
