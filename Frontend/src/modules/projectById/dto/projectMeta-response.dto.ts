import type { ProjectResponseDto } from '@/modules/project/dto/project-response.dto';
import type { ApiKeyCreateResponseDto } from '@/modules/project-api-key/dto/api-key-create-response.dto';
import type { JwtKeyResponseDto } from '@/modules/project-jwt-key/dto/jwt-key-response.dto';

export interface ProjectMetaResponseDto {
    project: ProjectResponseDto;
    apiKey: ApiKeyCreateResponseDto;
    jwtKey: JwtKeyResponseDto;
}
