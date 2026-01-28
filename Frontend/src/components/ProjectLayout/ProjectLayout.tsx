import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ProjectSidebar from './ProjectSidebar';
import styles from './ProjectLayout.module.css';

export default function ProjectLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`${styles['project-layout']} ${isCollapsed ? styles.collapsed : ''}`}>
            <ProjectSidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
            <div className={styles['project-content']}>
                <Outlet />
            </div>
        </div>
    );
}
