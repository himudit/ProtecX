import { apiClient } from './base.service';

export function createProject(data: {
    name: string;
    description?: string;
}) {
    return apiClient('/api/projects', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}
