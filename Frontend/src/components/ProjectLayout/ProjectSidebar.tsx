import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    CheckCircle,
    MessageSquare,
    Calendar,
    ChevronDown,
    ChevronRight,
    Box,
    GripVertical,
    Database,
    Activity,
    Settings,
    Users,
    Key,
    ChevronLeft,
    AlignEndHorizontalIcon,
} from 'lucide-react';
import styles from './ProjectSidebar.module.css';

interface NavItem {
    label: string;
    path: string;
    icon: React.ElementType;
    badge?: {
        text: string;
        type: 'orange' | 'green';
    };
}

interface ProjectSidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

export default function ProjectSidebar({ isCollapsed, onToggle }: ProjectSidebarProps) {
    const { projectId } = useParams();
    const [isProductExpanded, setIsProductExpanded] = useState(true);

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: `/dashboard/projects/${projectId}` },
        { icon: Database, label: 'Data Browser', path: `/dashboard/projects/${projectId}/data-browser` },
        { icon: Activity, label: 'Logs', path: `/dashboard/projects/${projectId}/logs` },
        { icon: Settings, label: 'Settings', path: `/dashboard/projects/${projectId}/settings` },
    ];

    return (
        <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
            <div className={styles.section}>
                <button
                    className={styles.sectionHeader}
                    title={isCollapsed ? 'Product' : ''}
                >
                    <div className={styles.headerTitle}>
                        <Box size={18} className={styles.sectionIcon} />
                        {!isCollapsed && <span className="text-white">Project</span>}
                    </div>

                </button>

                {isProductExpanded && !isCollapsed && (
                    <div className={styles.treeContainer}>
                        <nav className={styles.navList}>
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.label === 'Overview'}
                                    className={({ isActive }) =>
                                        `${styles.navItem} ${isActive ? styles.active : ''}`
                                    }
                                >
                                    <div className={styles.itemConnector}>
                                        <div className={styles.curve}></div>
                                    </div>
                                    <div className={styles.itemContent}>
                                        <item.icon size={18} className={styles.itemIcon} />
                                        <span className={styles.label}>{item.label}</span>
                                    </div>
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                )}

                {isCollapsed && (
                    <nav className={styles.collapsedNav}>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.label === 'Overview'}
                                className={({ isActive }) =>
                                    `${styles.collapsedNavItem} ${isActive ? styles.active : ''}`
                                }
                                title={item.label}
                            >
                                <item.icon size={22} />
                            </NavLink>
                        ))}
                    </nav>
                )}
            </div>

            <div
                className={styles['project-resizer-handle']}
                onMouseDown={(e) => {
                    const startX = e.clientX;
                    document.body.style.userSelect = 'none';
                    document.body.style.cursor = 'col-resize';

                    const handleMouseMove = (moveEvent: MouseEvent) => {
                        const diff = moveEvent.clientX - startX;
                        if (isCollapsed && diff > 50) {
                            onToggle();
                            cleanup();
                        } else if (!isCollapsed && diff < -50) {
                            onToggle();
                            cleanup();
                        }
                    };

                    const cleanup = () => {
                        document.body.style.userSelect = '';
                        document.body.style.cursor = '';
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                    };

                    const handleMouseUp = () => {
                        cleanup();
                    };

                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                }}
                onClick={onToggle}
            >
                <GripVertical size={14} />
            </div>
        </aside>
    );
}
