import { User, Bell, CreditCard, Globe } from 'lucide-react';
import ShieldIcon from '../components/Common/ShieldIcon';
import styles from './Settings.module.css';

export default function Settings() {
  const settingsSections = [
    {
      icon: User,
      title: 'Profile',
      description: 'Manage your account information',
      items: ['Display Name', 'Email Address', 'Password'],
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Configure notification preferences',
      items: ['Email Notifications', 'Push Notifications', 'SMS Alerts'],
    },
    {
      icon: ShieldIcon,
      title: 'Security',
      description: 'Security and authentication settings',
      items: ['Two-Factor Authentication', 'API Keys', 'Sessions'],
    },
    {
      icon: CreditCard,
      title: 'Billing',
      description: 'Manage your subscription and payment',
      items: ['Payment Method', 'Billing History', 'Usage Limits'],
    },
    {
      icon: Globe,
      title: 'Preferences',
      description: 'Application preferences',
      items: ['Theme', 'Language', 'Timezone'],
    },
  ];

  return (
    <div className={styles['settings-page']}>
      <div className={styles['page-header']}>
        <div>
          <h1 className={styles['page-title']}>Settings</h1>
          <p className={styles['page-subtitle']}>Manage your account and preferences</p>
        </div>
      </div>

      <div className={styles['settings-grid']}>
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.title} className={styles['settings-card']}>
              <div className={styles['settings-card-header']}>
                <div className={styles['settings-icon']}>
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className={styles['settings-title']}>{section.title}</h3>
                  <p className={styles['settings-description']}>{section.description}</p>
                </div>
              </div>
              <div className={styles['settings-items']}>
                {section.items.map((item) => (
                  <div key={item} className={styles['settings-item']}>
                    <span>{item}</span>
                    <button className={styles['text-link']}>Configure</button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
