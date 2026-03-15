import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, ChevronLeft } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import { signupSchema } from '../schemas/auth.schema';
import type { SignupInput } from '../schemas/auth.schema';
import { authService } from '../services/auth.service';
import type { AuthResponse } from '../types/auth';
import { useGoogleLogin } from "@react-oauth/google";
import orangeBackground from '../assets/orange_background.jpg';
import styles from './Signup.module.css';
import { showToast } from '../store/slices/toastSlice';


const Signup: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
    });

    const googleLogin = useGoogleLogin({
        flow: "auth-code",
        onSuccess: async (codeResponse) => {
            dispatch(showToast({ message: 'Creating account with Google...', type: 'loading' }));

            try {
                setIsLoading(true);
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code: codeResponse.code }),
                });
                
                const data = await response.json();

                if (data.success) {
                    dispatch(setCredentials(data.data));
                    dispatch(showToast({ message: 'Account created successfully!', type: 'success' }));
                    navigate("/dashboard/overview");
                } else {
                    throw new Error(data.message || 'Google signup failed');
                }
            } catch (error: any) {
                console.error("Google Signup Error:", error);
                dispatch(showToast({ message: 'Google Signup Failed', type: 'error' }));
            } finally {
                setIsLoading(false);
            }
        },
        onError: () => {
            dispatch(showToast({ message: 'Google Signup Failed', type: 'error' }));
        }
    });

    const onSubmit = async (data: SignupInput) => {
        setIsLoading(true);
        setApiError(null);
        dispatch(showToast({ message: 'Creating account...', type: 'loading' }));
        try {
            const response = await authService.signup(data);
            if (response.success) {
                const { user, token } = response.data;
                dispatch(setCredentials({ user, token }));
                dispatch(showToast({ message: 'Account created successfully!', type: 'success' }));
                navigate('/dashboard/overview');
            }
        } catch (error: any) {
            const message = error.response?.data?.message || 'Invalid Login credentials';
            setApiError(message);
            dispatch(showToast({ message: message, type: 'error' }));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Toast Notification */}


            <div className={styles.authWrapper}>
                {/* 35% Section - Visible on all screens */}
                <div
                    className={styles['auth-sidebar']}
                >
                    <Link 
                        to={isLoading ? "#" : "/"} 
                        className={styles['mobile-home-btn']}
                        style={{ 
                            opacity: isLoading ? 0.5 : 1,
                            pointerEvents: isLoading ? 'none' : 'auto'
                        }}
                    >
                        <ChevronLeft size={20} />
                        Back to Home
                    </Link>
                    <div style={{ maxWidth: '330px', width: '100%' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <p style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '0.5rem' }}>Create an account</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Start securing your applications today</p>
                        </div>

                        <button
                            type="button"
                            className={styles.googleButton}
                            onClick={() => !isLoading && googleLogin()}
                            disabled={isLoading}
                            style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
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


                        {apiError && (
                            <div style={{
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid #ef4444',
                                color: '#ef4444',
                                padding: '0.75rem',
                                borderRadius: '0.5rem',
                                marginBottom: '1rem',
                                fontSize: '0.875rem'
                            }}>
                                {apiError}
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="name" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Full Name</label>
                                <input
                                    {...register('name')}
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    style={{
                                        padding: '0.5rem 0.65rem',
                                        borderRadius: '0.5rem',
                                        border: `1px solid ${errors.name ? '#ef4444' : 'var(--border-color)'}`,
                                        backgroundColor: 'var(--bg-secondary)',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                />
                                {errors.name && (
                                    <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.name.message}</span>
                                )}
                            </div>
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
                                            cursor: isLoading ? 'not-allowed' : 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '4px'
                                        }}
                                        disabled={isLoading}
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
                                {isLoading ? 'Creating account...' : 'Sign Up'}
                            </button>
                        </form>

                        <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            Already have an account?{' '}
                            <Link 
                                to={isLoading ? "#" : "/login"} 
                                style={{ 
                                    color: 'white', 
                                    textDecoration: 'none',
                                    opacity: isLoading ? 0.5 : 1,
                                    pointerEvents: isLoading ? 'none' : 'auto'
                                }}
                            >
                                Log In
                            </Link>
                        </p>
                    </div>
                </div>

                {/* 65% Section - Hidden on mobile */}
                <div
                    className={styles['auth-main']}
                >
                    <div style={{ textAlign: 'center', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                        <button
                            onClick={() => !isLoading && navigate('/')}
                            disabled={isLoading}
                            style={{
                                all: 'unset',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                color: 'var(--accent)',
                                marginBottom: '1rem',
                                opacity: isLoading ? 0.6 : 1
                            }}
                        >
                            <span className={styles['logo-text']}>
                                Protec
                                <img src="/X.png" alt="X" className={styles.logoX} />
                            </span>
                        </button>
                        <div style={{ textAlign: 'center' }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Secure your applications with ProtecX</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px' }}>
                                The most advanced security platform for modern web applications. Protect your data and your users with ease.
                            </p>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
};
export default Signup;
