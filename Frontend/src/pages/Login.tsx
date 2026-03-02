import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import { loginSchema } from '../schemas/auth.schema';
import type { LoginInput } from '../schemas/auth.schema';
import { authService } from '../services/auth.service';
import type { AuthResponse } from '../types/auth';
import { useGoogleLogin } from "@react-oauth/google";
import orangeBackground from '../assets/orange_background.jpg';
import styles from './Login.module.css';


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

    const googleLogin = useGoogleLogin({
        flow: "auth-code",
        onSuccess: async (codeResponse) => {
            setToast({ visible: true, message: 'Signing in with Google...', type: 'loading' });

            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code: codeResponse.code }),
                });

                const data = await response.json();

                if (data.success) {
                    dispatch(setCredentials(data.data));
                    setToast(null);
                    navigate("/dashboard/overview");
                } else {
                    throw new Error(data.message || 'Google login failed');
                }
            } catch (error: any) {
                console.error("Google Login Error:", error);
                setToast({ visible: true, message: 'Google Login Failed', type: 'error' });
                setTimeout(() => setToast(null), 3000);
            }
        },
        onError: () => {
            console.log("Login Failed");
            setToast({ visible: true, message: 'Google Login Failed', type: 'error' });
            setTimeout(() => setToast(null), 3000);
        }
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
        } catch (error: any) {
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
                        width: '45%',
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
                    <div style={{ maxWidth: '330px', width: '100%' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <p style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '0.5rem' }}>Welcome back</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Please enter your details</p>
                        </div>

                        <button
                            type="button"
                            className={styles.googleButton}
                            onClick={() => googleLogin()}
                        >
                            <svg className={styles.googleIcon} viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Continue with Google
                        </button>

                        <div className={styles.separator}>
                            <span className={styles.separatorText}>OR</span>
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
                                    backgroundColor: '#ea580c',
                                    color: 'white',
                                    fontWeight: '600',
                                    border: 'none',
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    transition: 'background-color 0.2s',
                                    opacity: isLoading ? 0.7 : 1
                                }}
                                onMouseOver={(e) => !isLoading && (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
                                onMouseOut={(e) => !isLoading && (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
                            >
                                {isLoading ? 'Logging in...' : 'Log In'}
                            </button>
                        </form>

                        <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            Don't have an account?{' '}
                            <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>

                {/* 65% Section - Hidden on mobile */}
                <div
                    style={{
                        width: '65%',
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${orangeBackground})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem',
                    }}
                    className="auth-main"
                >
                    <div style={{ textAlign: 'center', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                        <button
                            onClick={() => navigate('/')}
                            style={{
                                all: 'unset',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                cursor: 'pointer',
                                color: 'var(--accent)',
                                marginBottom: '1rem'
                            }}
                        >
                            <span className={styles['logo-text']}>
                                Protec
                                <img src="/X.png" alt="X" className={styles.logoX} />
                            </span>
                        </button>
                        <div style={{ textAlign: 'center' }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome back to ProtecX</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px' }}>
                                Access your dashboard, manage your projects, and keep your applications secure.
                            </p>
                        </div>
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
