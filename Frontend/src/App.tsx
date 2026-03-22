import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout/Layout';
import Landing from './pages/Landing';
import Overview from './pages/Overview';
import Projects from './pages/Projects';
import ProjectLayout from './components/ProjectLayout/ProjectLayout';
import ProjectOverview from './pages/ProjectOverview';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PublicRoute from './components/Auth/PublicRoute';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { useDispatch } from 'react-redux';
import { getProfile } from './store/slices/authSlice';
import type { AppDispatch } from './store';
import { GlobalDialog } from './components/ui/Dialog/GlobalDialog';

import './App.css';
import Database from './pages/Database';
import Logs from './pages/Logs';

// Docs Pages
import QuickStart from './pages/Docs/QuickStart';
import DocsAPI from './pages/Docs/API';

import Toast from './components/ui/Toast/Toast';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getProfile());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <GlobalDialog />
      <Toast />
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Public Routes - Only accessible when NOT logged in */}
        <Route element={<PublicRoute />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected Routes - Only accessible when logged in */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Navigate to="quickstart" replace />} />
            <Route path="quickstart" element={<QuickStart />} />
            <Route path="analytics" element={<Overview />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:projectId" element={<ProjectLayout />}>
              <Route index element={<ProjectOverview />} />
              <Route path="data-browser" element={<Database />} />
              <Route path="logs" element={<Logs />} />
            </Route>
            <Route path="api" element={<DocsAPI />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
