import { Activity, Database, Users, Zap, TrendingUp, Server } from 'lucide-react';
import styles from './Overview.module.css';
import { useDispatch } from 'react-redux';
import { showToast } from '../store/slices/toastSlice';
import RequestContributionGraph from '../components/ui/RequestContributionGraph/RequestContributionGraph';
import { useEffect, useState } from 'react';
import { getDailyRequestStats } from '../services/project.api';
import type { DailyRequestStat } from '../modules/project/dto/daily-request-stat.dto';

export default function Overview() {
  const dispatch = useDispatch();
  const [dailyStats, setDailyStats] = useState<DailyRequestStat[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  const stats = [
    { label: 'Total Projects', value: '12', icon: Server, change: '+2 this month', color: '#f97316' },
    { label: 'API Requests', value: '1.2M', icon: Activity, change: '+12% from last month', color: '#ff8c42' },
    { label: 'Database Size', value: '45.2 GB', icon: Database, change: '+5.1 GB', color: '#ea580c' },
    { label: 'Active Users', value: '8,432', icon: Users, change: '+234 this week', color: '#f97316' },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoadingStats(true);
        const response = await getDailyRequestStats();
        if (response && response.data) {
          // Convert potentially string/bigint counts to number 
          const formattedStats = response.data.map(stat => ({
            ...stat,
            count: Number(stat.count)
          }));
          setDailyStats(formattedStats);
        }
      } catch (error) {
        console.error('Error fetching daily request stats:', error);
      } finally {
        setIsLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

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


      {!isLoadingStats && (
        <div style={{ marginTop: '32px' }}>
          <RequestContributionGraph
            title="Total API Request Activity"
            data={dailyStats}
          />
        </div>
      )}
    </div>
  );
}
