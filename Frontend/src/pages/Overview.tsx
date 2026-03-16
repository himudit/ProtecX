import { Activity, Users, Box } from 'lucide-react';
import styles from './Overview.module.css';
import RequestContributionGraph from '../components/ui/RequestContributionGraph/RequestContributionGraph';
import { useEffect, useState } from 'react';
import { getDashboardStats } from '../services/project.api';
import type { DashboardStatsResponseDto } from '../modules/project/dto/dashboard-stats.dto';
import SkeletonDiv from '../components/ui/Skeleton/SkeletonDiv/SkeletonDiv';

export default function Overview() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStatsResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const statsList = [
    {
      label: 'Total Projects',
      value: dashboardStats?.totalProjects ?? 0,
      icon: Box,
      color: '#141414'
    },
    {
      label: 'API Requests',
      value: dashboardStats?.totalRequests ?? 0,
      icon: Activity,
      color: '#141414'
    },
    {
      label: 'Active Users',
      value: dashboardStats?.totalUsers ?? 0,
      icon: Users,
      color: '#141414'
    },
  ];

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setIsLoading(true);
        const response = await getDashboardStats();
        if (response && response.data) {
          setDashboardStats(response.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className={styles['overview-page']}>
      <div className={styles['page-header']}>
        <div>
          <h1 className={styles['page-title']}>Analytics</h1>
          <p className={styles['page-subtitle']}>Monitor your projects and resources</p>
        </div>
      </div>

      <div className={styles['stats-grid']}>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className={styles['stat-card']}>
              <div className={styles['stat-header']} style={{ alignItems: 'center', justifyContent: 'flex-start', gap: '20px' }}>
                <SkeletonDiv width="64px" height="64px" borderRadius="12px" />
                <div className={styles['stat-content']}>
                  <SkeletonDiv width="80px" height="28px" style={{ marginBottom: '8px' }} />
                  <SkeletonDiv width="60px" height="16px" />
                </div>
              </div>
            </div>
          ))
        ) : (
          statsList.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className={styles['stat-card']}>
                <div className={styles['stat-header']} style={{ alignItems: 'center', justifyContent: 'flex-start', gap: '20px' }}>
                  <div className={styles['stat-icon']} style={{
                    backgroundColor: `${stat.color}`,
                    color: 'white',
                    width: '64px',
                    height: '64px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={32} />
                  </div>
                  <div className={styles['stat-content']}>
                    <h3 className={styles['stat-value']} style={{ fontSize: '24px', margin: 0 }}>{stat.value.toLocaleString()}</h3>
                    <p className={styles['stat-label']} style={{ margin: 0, opacity: 0.7 }}>{stat.label}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>


      <div style={{ marginTop: '32px' }}>
        <RequestContributionGraph
          title="Total API Request Activity"
          data={dashboardStats?.dailyRequestStats || []}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
