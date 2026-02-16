import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Code,
  Package,
  Webhook,
  Settings,
  ChevronRight,
  ChevronLeft,
  Menu,
  GripVertical,
  PanelLeftOpen,
  PanelRightOpen
} from 'lucide-react';
import styles from './Sidebar.module.css';
import { useNavigate } from 'react-router-dom';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard/overview' },
  { icon: FolderKanban, label: 'Projects', path: '/dashboard/projects' },
  { icon: Package, label: 'SDK', path: '/dashboard/sdk' },
  { icon: Webhook, label: 'API', path: '/dashboard/api' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const navigate = useNavigate();
  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      {/* Sidebar starting below Header */}
      <nav className={styles['sidebar-nav']}>
        {navItems.map((item) => {
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
          // Prevent click if we were dragging
          // Actually, a simple click should still work as a fallback
          onToggle();
        }}
      >
        <GripVertical size={14} />
      </div>
    </aside>
  );
}
