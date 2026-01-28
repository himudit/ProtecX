import { Plus, Code, Play, Clock, Zap } from 'lucide-react';
import styles from './Functions.module.css';

export default function Functions() {
  const functions = [
    {
      name: 'process-payment',
      runtime: 'Node.js 18',
      status: 'active',
      invocations: 12500,
      avgDuration: '120ms',
      updated: '2 hours ago',
    },
    {
      name: 'send-email',
      runtime: 'Python 3.11',
      status: 'active',
      invocations: 3420,
      avgDuration: '85ms',
      updated: '5 hours ago',
    },
    {
      name: 'generate-report',
      runtime: 'Node.js 18',
      status: 'idle',
      invocations: 0,
      avgDuration: '-',
      updated: '1 day ago',
    },
  ];

  return (
    <div className={styles['functions-page']}>
      <div className={styles['page-header']}>
        <div>
          <h1 className={styles['page-title']}>Edge Functions</h1>
          <p className={styles['page-subtitle']}>Deploy and manage serverless functions</p>
        </div>
        <button className={styles['primary-btn']}>
          <Plus size={18} />
          <span>New Function</span>
        </button>
      </div>

      <div className={styles['functions-stats']}>
        <div className={styles['function-stat-card']}>
          <Zap size={24} />
          <div>
            <h3>{functions.length}</h3>
            <p>Total Functions</p>
          </div>
        </div>
        <div className={styles['function-stat-card']}>
          <Play size={24} />
          <div>
            <h3>15,920</h3>
            <p>Total Invocations</p>
          </div>
        </div>
        <div className={styles['function-stat-card']}>
          <Clock size={24} />
          <div>
            <h3>102ms</h3>
            <p>Avg Duration</p>
          </div>
        </div>
      </div>

      <div className={styles['functions-list']}>
        <div className={styles['section-header']}>
          <h2>Functions</h2>
        </div>
        <div className={styles['functions-table']}>
          {functions.map((func) => (
            <div key={func.name} className={styles['function-row']}>
              <div className={styles['function-info']}>
                <div className={styles['function-icon']}>
                  <Code size={20} />
                </div>
                <div>
                  <h3 className={styles['function-name']}>{func.name}</h3>
                  <p className={styles['function-runtime']}>{func.runtime}</p>
                </div>
              </div>
              <div className={styles['function-metrics']}>
                <div className={styles['function-metric']}>
                  <span className={styles['metric-label']}>Invocations</span>
                  <span className={styles['metric-value']}>{func.invocations.toLocaleString()}</span>
                </div>
                <div className={styles['function-metric']}>
                  <span className={styles['metric-label']}>Avg Duration</span>
                  <span className={styles['metric-value']}>{func.avgDuration}</span>
                </div>
              </div>
              <div className={styles['function-status']}>
                <span className={`${styles['status-badge']} ${styles[func.status]}`}>{func.status}</span>
                <span className={styles['function-updated']}>Updated {func.updated}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
