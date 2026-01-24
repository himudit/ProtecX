import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Shield,
  Code,
  Settings,
  ChevronRight,
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
  { icon: Shield, label: 'Authentication', path: '/dashboard/auth' },
  { icon: Code, label: 'Edge Functions', path: '/dashboard/functions' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <Shield size={24} onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
          <span className="logo-text cursor-pointer" onClick={() => navigate('/')}>Shield</span>
        </div>
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
            >
              <Icon size={18} />
              <span className="nav-label">{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
              <ChevronRight size={16} className="nav-chevron" />
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
