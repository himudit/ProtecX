import type { ProjectResponseDto } from '../modules/project/dto/project-response.dto';
import { apiClient } from './base.service';


export function createProject(data: { name: string; description?: string }) {
    return apiClient<ProjectResponseDto>('/api/projects', {
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export function getProjects() {
    return apiClient<ProjectResponseDto[]>('/api/projects');
}