import { api } from './api.service';
import type { LoginRequest, AuthResponse, SignupRequest } from '../types/auth';

export const authService = {
    login: (data: LoginRequest) =>
        api.post<AuthResponse>('api/auth/login', data),

    signup: (data: SignupRequest) =>
        api.post<AuthResponse>('api/auth/signup', data),

    logout: () =>
        api.post<void>('api/auth/logout'),
};
