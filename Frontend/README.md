# Shield - Auth as a Service Dashboard

A modern, Supabase-inspired dashboard UI for managing backend services. Shield provides a beautiful and intuitive interface for outsourcing backend functionality.

## Features

- 🎨 **Modern UI Design** - Clean, dark-themed interface inspired by Supabase
- 📊 **Dashboard Overview** - Comprehensive overview of projects and resources
- 🗄️ **Database Management** - View and manage database tables
- 🔐 **Authentication** - Configure authentication providers
- 💾 **Storage** - Manage file storage buckets
- ⚡ **Edge Functions** - Deploy and monitor serverless functions
- ⚙️ **Settings** - Comprehensive settings management

## Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icon library
- **CSS3** - Custom styling with CSS variables

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   └── Layout/
│       ├── Sidebar.tsx       # Navigation sidebar
│       ├── Header.tsx        # Top header bar
│       └── Layout.tsx        # Main layout wrapper
├── pages/
│   ├── Overview.tsx         # Dashboard overview
│   ├── Projects.tsx         # Projects management
│   ├── Database.tsx         # Database tables
│   ├── Auth.tsx             # Authentication
│   ├── Storage.tsx          # File storage
│   ├── Functions.tsx        # Edge functions
│   └── Settings.tsx         # Settings
├── App.tsx                  # Main app component with routing
└── main.tsx                 # Entry point
```

## Design System

The UI uses a consistent design system with CSS variables:

- **Colors**: Dark theme with accent colors
- **Typography**: System fonts for optimal performance
- **Spacing**: Consistent padding and margins
- **Components**: Reusable card-based components

## Features Overview

### Overview Page
- Statistics cards showing key metrics
- Recent activity feed
- Quick action buttons

### Projects Page
- Grid view of all projects
- Project status indicators
- Resource usage information

### Database Page
- Table management interface
- Search and filter functionality
- Schema viewing capabilities


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
import { GoogleLogin } from "@react-oauth/google";
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

                        <div
                            //  style={{ width: '100%', display: 'flex', justifyContent: 'center', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
                            style={{
                                width: "320px",
                                borderRadius: "0.5em",
                                overflow: "hidden",   // important
                                border: "2px solid #000",
                            }}
                        >
                            <GoogleLogin
                                theme="outline"
                                width="320"
                                shape="rectangular"
                                onSuccess={async (credentialResponse) => {
                                    console.log(credentialResponse);
                                    const idToken = credentialResponse.credential;
                                    setToast({ visible: true, message: 'Signing in with Google...', type: 'loading' });

                                    try {
                                        const response = await fetch("http://localhost:5000/api/auth/google", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({ idToken }),
                                        });

                                        const data = await response.json();
                                        if (data.success) {
                                            const { user, token } = data.data;
                                            dispatch(setCredentials({ user, token }));
                                            setToast(null);
                                            navigate('/dashboard/overview');
                                        } else {
                                            throw new Error(data.message || 'Google login failed');
                                        }
                                    } catch (error: any) {
                                        console.error("Google Login Error:", error);
                                        setToast({ visible: true, message: 'Google Login Failed', type: 'error' });
                                        setTimeout(() => setToast(null), 3000);
                                    }
                                }}
                                onError={() => {
                                    console.log("Login Failed");
                                    setToast({ visible: true, message: 'Google Login Failed', type: 'error' });
                                    setTimeout(() => setToast(null), 3000);
                                }}
                                theme="outline"
                                width="330"
                                shape="pill"
                            />
                        </div>

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
