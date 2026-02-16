import type { ProjectResponseDto } from '../modules/project/dto/project-response.dto';
import type { ProjectMetaResponseDto } from '../modules/projectById/dto/projectMeta-response.dto';
import { apiClient } from './base.service';
import type { ApiResponse } from '../interfaces/api.interface';


export function createProject(data: { name: string; description?: string }) {
    return apiClient<ApiResponse<ProjectResponseDto>>('/api/projects', {
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export function getProjects() {
    return apiClient<ApiResponse<ProjectResponseDto[]>>('/api/projects');
}

export function getProjectById(projectId: string) {
    return apiClient<ApiResponse<ProjectMetaResponseDto>>(
        `/api/projects/${projectId}`
    );
}

export function getProjectUsers() {
    return apiClient<ApiResponse<ProjectUserRowResponseDto[]>>(
        '/api/projects/users/me'
    );
}

export function getProjectLogs(projectId: string) {
    return apiClient<ApiResponse<any[]>>(`/api/projects/${projectId}/logs`);
}
