import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout/Layout';
import Landing from './pages/Landing';
import Overview from './pages/Overview';
import Projects from './pages/Projects';
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

// Docs Pages
import DocsOverview from './pages/Docs/Overview';
import GetStarted from './pages/Docs/GetStarted';
import SDKs from './pages/Docs/SDKs';
import DocsAPI from './pages/Docs/API';
import Features from './pages/Docs/Features';

import {
  FileText,
  TvMinimalPlay,
  Code,
  Codesandbox,
  ListChecks
} from 'lucide-react';

const docsNavItems = [
  { icon: FileText, label: 'Overview', path: '/docs/overview' },
  { icon: TvMinimalPlay, label: 'Quickstart', path: '/docs/get-started' },
  { icon: Codesandbox, label: 'SDKs', path: '/docs/sdks' },
  { icon: Code, label: 'API', path: '/docs/api' },
];

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
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Docs Routes - Publicly accessible */}
        <Route path="/docs" element={<Layout sidebarItems={docsNavItems} />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<DocsOverview />} />
          <Route path="get-started" element={<GetStarted />} />
          <Route path="sdks" element={<SDKs />} />
          <Route path="api" element={<DocsAPI />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
