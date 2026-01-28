import { apiClient } from './base.service';

export const api = {
    get: <T>(url: string, params?: object) =>
        apiClient.get<T>(url, { params }).then(res => res.data),

    post: <T>(url: string, body?: object) =>
        apiClient.post<T>(url, body).then(res => res.data),

    put: <T>(url: string, body?: object) =>
        apiClient.put<T>(url, body).then(res => res.data),

    delete: <T>(url: string) =>
        apiClient.delete<T>(url).then(res => res.data),
};
