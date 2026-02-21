import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout/Layout';
import Landing from './pages/Landing';
import Overview from './pages/Overview';
import Projects from './pages/Projects';
import SDK from './pages/SDK';
import API from './pages/API';
import Functions from './pages/Functions';
import Settings from './pages/Settings';
import ProjectLayout from './components/ProjectLayout/ProjectLayout';
import ProjectOverview from './pages/ProjectOverview';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PublicRoute from './components/Auth/PublicRoute';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { GlobalDialog } from './components/ui/Dialog/GlobalDialog';
import './App.css';
import Database from './pages/Database';
import Logs from './pages/Logs';


function App() {

  return (
    <BrowserRouter>
      <GlobalDialog />
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
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:projectId" element={<ProjectLayout />}>
              <Route index element={<ProjectOverview />} />
              <Route path="data-browser" element={<Database />} />
              <Route path="logs" element={<Logs />} />
              <Route path="settings" element={<div>Project Settings Page</div>} />
            </Route>
            <Route path="sdk" element={<SDK />} />
            <Route path="api" element={<API />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
