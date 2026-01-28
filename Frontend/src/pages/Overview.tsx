import { Activity, Database, Users, Zap, TrendingUp, Server } from 'lucide-react';
import styles from './Overview.module.css';

export default function Overview() {
  const stats = [
    { label: 'Total Projects', value: '12', icon: Server, change: '+2 this month', color: '#f97316' },
    { label: 'API Requests', value: '1.2M', icon: Activity, change: '+12% from last month', color: '#ff8c42' },
    { label: 'Database Size', value: '45.2 GB', icon: Database, change: '+5.1 GB', color: '#ea580c' },
    { label: 'Active Users', value: '8,432', icon: Users, change: '+234 this week', color: '#f97316' },
  ];

  return (
    <div className={styles['overview-page']}>
      <div className={styles['page-header']}>
        <div>
          <h1 className={styles['page-title']}>Overview</h1>
          <p className={styles['page-subtitle']}>Monitor your projects and resources</p>
        </div>
      </div>

      <div className={styles['stats-grid']}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={styles['stat-card']}>
              <div className={styles['stat-header']}>
                <div className={styles['stat-icon']} style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                  <Icon size={20} />
                </div>
                <span className={styles['stat-change']}>{stat.change}</span>
              </div>
              <div className={styles['stat-content']}>
                <h3 className={styles['stat-value']}>{stat.value}</h3>
                <p className={styles['stat-label']}>{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles['content-grid']}>
        <div className={styles['content-card']}>
          <div className={styles['card-header']}>
            <h2>Recent Activity</h2>
            <button className={styles['text-link']}>View all</button>
          </div>
          <div className={styles['activity-list']}>
            {[
              { action: 'New project created', project: 'ecommerce-api', time: '2h ago' },
              { action: 'Database migration completed', project: 'analytics-db', time: '5h ago' },
              { action: 'Function deployed', project: 'payment-service', time: '1d ago' },
              { action: 'Storage bucket updated', project: 'media-files', time: '2d ago' },
            ].map((activity, idx) => (
              <div key={idx} className={styles['activity-item']}>
                <div className={styles['activity-dot']}></div>
                <div className={styles['activity-content']}>
                  <span className={styles['activity-action']}>{activity.action}</span>
                  <span className={styles['activity-project']}>{activity.project}</span>
                </div>
                <span className={styles['activity-time']}>{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles['content-card']}>
          <div className={styles['card-header']}>
            <h2>Quick Actions</h2>
          </div>
          <div className={styles['quick-actions']}>
            <button className={styles['action-btn']}>
              <Zap size={18} />
              <span>Create Project</span>
            </button>
            <button className={styles['action-btn']}>
              <Database size={18} />
              <span>New Database</span>
            </button>
            <button className={styles['action-btn']}>
              <TrendingUp size={18} />
              <span>View Analytics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
