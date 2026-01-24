import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Shield,
  Code,
  Package,
  Webhook,
  Settings,
  ChevronRight,
  ChevronLeft,
  Menu
} from 'lucide-react';
import './Sidebar.css';
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
  { icon: Code, label: 'Edge Functions', path: '/dashboard/functions' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const navigate = useNavigate();
  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <Shield size={24} onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
          {!isCollapsed && <span className="logo-text cursor-pointer" onClick={() => navigate('/')}>Shield</span>}
        </div>
        <button className="collapse-toggle" onClick={onToggle}>
          {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
              }
              title={isCollapsed ? item.label : ''}
            >
              <Icon size={18} />
              {!isCollapsed && <span className="nav-label">{item.label}</span>}
              {!isCollapsed && item.badge && <span className="nav-badge">{item.badge}</span>}
              {!isCollapsed && <ChevronRight size={16} className="nav-chevron" />}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
