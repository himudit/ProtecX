import { useParams } from 'react-router-dom';
import { Database, Users, Activity, Clock } from 'lucide-react';
import ShieldIcon from '../components/Common/ShieldIcon';
import styles from './ProjectOverview.module.css';

export default function ProjectOverview() {
    const { projectId } = useParams();

    // Mock data for the specific project
    const project = {
        id: projectId,
        name: 'E-commerce Platform',
        description: 'Production API for e-commerce platform',
        status: 'active',
        stats: [
            { label: 'Total Requests', value: '1.2M', icon: Activity, color: '#6366f1' },
            { label: 'Active Users', value: '1,250', icon: Users, color: '#10b981' },
            { label: 'Databases', value: '3', icon: Database, color: '#f59e0b' },
            { label: 'Security Score', value: '98%', icon: ShieldIcon, color: '#ef4444' },
        ]
    };

    return (
        <div className={styles['project-overview']}>
            <div className={styles['overview-header']}>
                <div>
                    <h1 className={styles['project-title']}>{project.name}</h1>
                    <p className={styles['project-id']}>Project ID: {projectId}</p>
                </div>
                <div className={`${styles['status-badge']} ${styles[project.status]}`}>
                    {project.status}
                </div>
            </div>

            <div className={styles['stats-grid']}>
                {project.stats.map((stat) => (
                    <div key={stat.label} className={styles['stat-card']}>
                        <div className={styles['stat-icon']} style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                            <stat.icon size={24} />
                        </div>
                        <div className={styles['stat-info']}>
                            <span className={styles['stat-label']}>{stat.label}</span>
                            <span className={styles['stat-value']}>{stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles['recent-activity']}>
                <div className={styles['section-header']}>
                    <Clock size={18} />
                    <h2>Recent Activity</h2>
                </div>
                <div className={styles['activity-list']}>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className={styles['activity-item']}>
                            <div className={styles['activity-dot']} />
                            <div className={styles['activity-content']}>
                                <p className={styles['activity-text']}>Database backup completed successfully</p>
                                <span className={styles['activity-time']}>{i * 2} hours ago</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
