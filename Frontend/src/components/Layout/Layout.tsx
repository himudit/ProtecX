import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import styles from './Layout.module.css';

export default function Layout() {
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
      <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <Header />
      <main className={styles['main-content']}>
        <Outlet />
      </main>
    </div>
  );
}
