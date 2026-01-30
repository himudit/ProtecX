import { NavLink, useParams } from 'react-router-dom';
import {
    LayoutDashboard,
    Settings,
    Database,
    Users,
    Activity,
    Key,
    ChevronLeft,
    ChevronRight,
    AlignEndHorizontalIcon,
    GripVertical,
    Boxes
} from 'lucide-react';
import styles from './ProjectSidebar.module.css';

interface ProjectSidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

export default function ProjectSidebar({ isCollapsed, onToggle }: ProjectSidebarProps) {
    const { projectId } = useParams();

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: `/dashboard/projects/${projectId}` },
        { icon: Database, label: 'Data Browser', path: `/dashboard/projects/${projectId}/data-browser` },
        { icon: Activity, label: 'Logs', path: `/dashboard/projects/${projectId}/logs` },
        { icon: Settings, label: 'Settings', path: `/dashboard/projects/${projectId}/settings` },
    ];

    return (
        <aside className={`${styles['project-sidebar']} ${isCollapsed ? styles.collapsed : ''}`}>
            <div className={styles['project-sidebar-header']}>
                {!isCollapsed ? <h3> <Boxes size={30} />  Project</h3> : <h3> <Boxes size={30} /> </h3>}

            </div>
            <nav className={styles['project-sidebar-nav']}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === `/dashboard/projects/${projectId}`}
                        className={({ isActive }) => `${styles['project-nav-item']} ${isActive ? styles.active : ''}`}
                        title={isCollapsed ? item.label : ''}
                    >
                        <item.icon size={18} />
                        {!isCollapsed && <span>{item.label}</span>}
                    </NavLink>
                ))}
            </nav>
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
