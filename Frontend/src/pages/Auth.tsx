import { Users, Key, Mail, Lock } from 'lucide-react';
import ShieldIcon from '../components/Common/ShieldIcon';
import styles from './Auth.module.css';

export default function Auth() {
  const providers = [
    { name: 'Email', icon: Mail, enabled: true, users: 3420 },
    { name: 'Google', icon: ShieldIcon, enabled: true, users: 1250 },
    { name: 'GitHub', icon: Key, enabled: false, users: 0 },
    { name: 'Magic Link', icon: Lock, enabled: true, users: 890 },
  ];

  return (
    <div className={styles['auth-page']}>
      <div className={styles['page-header']}>
        <div>
          <h1 className={styles['page-title']}>Authentication</h1>
          <p className={styles['page-subtitle']}>Manage user authentication and providers</p>
        </div>
      </div>

      <div className={styles['auth-stats']}>
        <div className={styles['auth-stat-card']}>
          <Users size={24} />
          <div>
            <h3>5,560</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className={styles['auth-stat-card']}>
          <ShieldIcon size={24} />
          <div>
            <h3>3</h3>
            <p>Active Providers</p>
          </div>
        </div>
        <div className={styles['auth-stat-card']}>
          <Key size={24} />
          <div>
            <h3>98.5%</h3>
            <p>Uptime</p>
          </div>
        </div>
      </div>

      <div className={styles['providers-section']}>
        <div className={styles['section-header']}>
          <h2>Authentication Providers</h2>
          <button className={styles['primary-btn']}>Configure</button>
        </div>
        <div className={styles['providers-list']}>
          {providers.map((provider) => {
            const Icon = provider.icon;
            return (
              <div key={provider.name} className={styles['provider-card']}>
                <div className={styles['provider-info']}>
                  <div className={styles['provider-icon']}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className={styles['provider-name']}>{provider.name}</h3>
                    <p className={styles['provider-users']}>{provider.users.toLocaleString()} users</p>
                  </div>
                </div>
                <div className={styles['provider-toggle']}>
                  <label className={styles['toggle-switch']}>
                    <input type="checkbox" checked={provider.enabled} readOnly />
                    <span className={styles['toggle-slider']}></span>
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
