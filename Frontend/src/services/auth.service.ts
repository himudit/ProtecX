import { apiClient } from './base.service';
import type { LoginRequest, AuthResponse, SignupRequest } from '../types/auth';
import type { User } from '../types/user';

export const authService = {
    login: (data: LoginRequest) =>
        apiClient<AuthResponse>('/api/auth/login', {
            method: 'POST',
            data,
        }),

    signup: (data: SignupRequest) =>
        apiClient<AuthResponse>('/api/auth/signup', {
            method: 'POST',
            data,
        }),

    logout: () =>
        apiClient<void>('/api/auth/logout', {
            method: 'POST',
        }),

    getProfile: () =>
        apiClient<{ user: User }>('/api/auth/profile', {
            method: 'GET',
        }),
};
