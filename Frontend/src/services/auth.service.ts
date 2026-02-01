import { apiClient } from './base.service';
import type { LoginRequest, AuthResponse, SignupRequest } from '../types/auth';

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
};
