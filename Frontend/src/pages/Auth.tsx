import { Users, Key, Mail, Lock } from 'lucide-react';
import ShieldIcon from '../components/Common/ShieldIcon';
import './Auth.css';

export default function Auth() {
  const providers = [
    { name: 'Email', icon: Mail, enabled: true, users: 3420 },
    { name: 'Google', icon: ShieldIcon, enabled: true, users: 1250 },
    { name: 'GitHub', icon: Key, enabled: false, users: 0 },
    { name: 'Magic Link', icon: Lock, enabled: true, users: 890 },
  ];

  return (
    <div className="auth-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Authentication</h1>
          <p className="page-subtitle">Manage user authentication and providers</p>
        </div>
      </div>

      <div className="auth-stats">
        <div className="auth-stat-card">
          <Users size={24} />
          <div>
            <h3>5,560</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="auth-stat-card">
          <ShieldIcon size={24} />
          <div>
            <h3>3</h3>
            <p>Active Providers</p>
          </div>
        </div>
        <div className="auth-stat-card">
          <Key size={24} />
          <div>
            <h3>98.5%</h3>
            <p>Uptime</p>
          </div>
        </div>
      </div>

      <div className="providers-section">
        <div className="section-header">
          <h2>Authentication Providers</h2>
          <button className="primary-btn">Configure</button>
        </div>
        <div className="providers-list">
          {providers.map((provider) => {
            const Icon = provider.icon;
            return (
              <div key={provider.name} className="provider-card">
                <div className="provider-info">
                  <div className="provider-icon">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="provider-name">{provider.name}</h3>
                    <p className="provider-users">{provider.users.toLocaleString()} users</p>
                  </div>
                </div>
                <div className="provider-toggle">
                  <label className="toggle-switch">
                    <input type="checkbox" checked={provider.enabled} readOnly />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
