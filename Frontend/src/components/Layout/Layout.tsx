import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`layout ${isCollapsed ? 'collapsed' : ''}`}>
      <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
