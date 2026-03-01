import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Code,
  Codesandbox,
  Webhook,
  Settings,
  ChevronRight,
  PanelLeftOpen,
  PanelRightOpen,
  GripVertical
} from 'lucide-react';
import styles from './Sidebar.module.css';

export interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: string;
}

const defaultNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard/overview' },
  { icon: FolderKanban, label: 'Projects', path: '/dashboard/projects' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  items?: NavItem[];
}

export default function Sidebar({ isCollapsed, onToggle, items = defaultNavItems }: SidebarProps) {
  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      {/* Sidebar starting below Header */}
      <nav className={styles['sidebar-nav']}>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles['nav-item']} ${isActive ? styles.active : ''}`
              }
              title={isCollapsed ? item.label : ''}
            >
              <Icon size={18} />
              {!isCollapsed && <span className={styles['nav-label']}>{item.label}</span>}
              {!isCollapsed && item.badge && <span className={styles['nav-badge']}>{item.badge}</span>}
              {!isCollapsed && <ChevronRight size={16} className={styles['nav-chevron']} />}
            </NavLink>
          );
        })}
      </nav>
      <div className={styles['sidebar-footer']}>
        <button
          className={styles['toggle-button']}
          onClick={onToggle}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <PanelRightOpen size={20} /> : <PanelLeftOpen size={20} />}
        </button>
      </div>

      <div
        className={styles['resizer-handle']}
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
        onClick={(e) => {
          onToggle();
        }}
      >
        <GripVertical size={14} />
      </div>
    </aside>
  );
}
