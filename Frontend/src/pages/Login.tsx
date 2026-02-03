import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import { loginSchema, LoginInput } from '../schemas/auth.schema';
import { authService } from '../services/auth.service';
import type { AuthResponse } from '../types/auth';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [toast, setToast] = useState<{ visible: boolean; message: string; type: 'loading' | 'error' } | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginInput) => {
        setIsLoading(true);
        setApiError(null);
        setToast({ visible: true, message: 'Signing in...', type: 'loading' });
        try {
            const response = await authService.login(data);
            if (response.success) {
                const { user, token } = response.data;
                dispatch(setCredentials({ user, token }));
                setToast(null);
                navigate('/dashboard/overview');
            }
        } catch (error: unknown) {
            const message = error.response?.data?.message || 'Invalid Login credentials';
            setApiError(message);
            setToast({ visible: true, message: 'Invalid Login credentials', type: 'error' });
            setTimeout(() => setToast(null), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {toast && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    zIndex: 1000,
                    backgroundColor: toast.type === 'loading' ? 'var(--bg-tertiary)' : '#ef4444',
                    color: 'white',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    border: toast.type === 'loading' ? '1px solid var(--border-color)' : 'none',
                    animation: 'slideIn 0.3s ease-out'
                }}>
                    {toast.type === 'loading' && <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />}
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>{toast.message}</span>
                </div>
            )}

            <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
                {/* 35% Section - Visible on all screens */}
                <div
                    style={{
                        width: '35%',
                        backgroundColor: 'var(--auth-grey)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem',
                        color: 'white',
                        transition: 'width 0.3s ease',
                    }}
                    className="auth-sidebar"
                >
                    <div style={{ maxWidth: '400px', width: '100%' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <button
                                onClick={() => navigate('/')}
                                style={{
                                    all: 'unset',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    cursor: 'pointer',
                                    color: 'var(--accent)'
                                }}
                            >
                                <img src="/shield.png" alt="ShieldX" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                                <span style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>ShieldX</span>
                            </button>

                            <p style={{ fontSize: '2rem', color: 'var(--text-primary)', marginTop: '0.5rem' }}>Welcome back</p>
                            <p style={{ fontSize: '0.8745em', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Please enter your details</p>
                        </div>


                        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="email" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Email</label>
                                <input
                                    {...register('email')}
                                    id="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    style={{
                                        padding: '0.5rem 0.65rem',
                                        borderRadius: '0.5rem',
                                        border: `1px solid ${errors.email ? '#ef4444' : 'var(--border-color)'}`,
                                        backgroundColor: 'var(--bg-secondary)',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                />
                                {errors.email && (
                                    <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.email.message}</span>
                                )}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="password" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Password</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        {...register('password')}
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        style={{
                                            padding: '0.5rem 0.65rem',
                                            paddingRight: '2.5rem',
                                            borderRadius: '0.5rem',
                                            border: `1px solid ${errors.password ? '#ef4444' : 'var(--border-color)'}`,
                                            backgroundColor: 'var(--bg-secondary)',
                                            color: 'white',
                                            outline: 'none',
                                            width: '100%'
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'none',
                                            border: 'none',
                                            color: 'var(--text-secondary)',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '4px'
                                        }}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.password.message}</span>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                style={{
                                    padding: '0.5rem 0.65rem',
                                    borderRadius: '0.5rem',
                                    backgroundColor: 'var(--accent)',
                                    color: 'white',
                                    fontWeight: '600',
                                    border: 'none',
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    transition: 'background-color 0.2s',
                                    opacity: isLoading ? 0.7 : 1
                                }}
                                onMouseOver={(e) => !isLoading && (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
                                onMouseOut={(e) => !isLoading && (e.currentTarget.style.backgroundColor = 'var(--accent)')}
                            >
                                {isLoading ? 'Logging in...' : 'Log In'}
                            </button>
                        </form>

                        <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            Don't have an account?{' '}
                            <Link to="/signup" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>

                {/* 65% Section - Hidden on mobile */}
                <div
                    style={{
                        width: '65%',
                        backgroundColor: 'var(--bg-primary)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem',
                    }}
                    className="auth-main"
                >
                    <div style={{ textAlign: 'center', color: 'white' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome back to ShieldX</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px' }}>
                            Access your dashboard, manage your projects, and keep your applications secure.
                        </p>
                    </div>
                </div>

                <style>
                    {`
          @media (max-width: 768px) {
            .auth-sidebar {
              width: 100% !important;
            }
            .auth-main {
              display: none !important;
            }
          }
          
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .animate-spin {
            animation: spin 1s linear infinite;
          }
        `}
                </style>
            </div>
        </>
    );
};

export default Login;
