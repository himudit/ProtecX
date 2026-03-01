import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import type { NavItem } from './Sidebar';
import Header from './Header';
import styles from './Layout.module.css';

interface LayoutProps {
  sidebarItems?: NavItem[];
}

export default function Layout({ sidebarItems }: LayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Automatically collapse sidebar when entering a project's detail view
  useEffect(() => {
    const isProjectDetail = location.pathname.includes('/dashboard/projects/') &&
      location.pathname.split('/').length > 3;

    if (isProjectDetail) {
      setIsCollapsed(true);
    }
  }, [location.pathname]);

  return (
    <div className={`${styles.layout} ${isCollapsed ? styles.collapsed : ''}`}>
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        items={sidebarItems}
      />
      <Header />
      <main className={styles['main-content']}>
        <Outlet />
      </main>
    </div>
  );
}
