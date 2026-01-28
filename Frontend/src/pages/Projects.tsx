import { Plus, MoreVertical, Database, Users, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Projects.module.css';

export default function Projects() {
  const navigate = useNavigate();
  const projects = [
    {
      id: 1,
      name: 'E-commerce Platform',
      description: 'Production API for e-commerce platform',
      status: 'active',
      region: 'us-east-1',
      databases: 3,
      users: 1250,
      updated: '2 hours ago',
    },
    {
      id: 2,
      name: 'Analytics Dashboard',
      description: 'Analytics service with real-time dashboards',
      status: 'active',
      region: 'eu-west-1',
      databases: 2,
      users: 432,
      updated: '1 day ago',
    },
    {
      id: 3,
      name: 'Mobile API',
      description: 'Mobile backend API service',
      status: 'paused',
      region: 'us-west-2',
      databases: 1,
      users: 89,
      updated: '3 days ago',
    },
  ];

  return (
    <div className={styles['projects-page']}>
      <div className={styles['page-header']}>
        <div>
          <h1 className={styles['page-title']}>Projects</h1>
          <p className={styles['page-subtitle']}>Manage your projects and resources</p>
        </div>
        <button className={styles['primary-btn']}>
          <Plus size={18} />
          <span>New Project</span>
        </button>
      </div>

      <div className={styles['projects-grid']}>
        {projects.map((project) => (
          <div
            key={project.id}
            className={styles['project-card']}
            onClick={() => navigate(`/dashboard/projects/${project.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles['project-header']}>
              <div className={styles['project-info']}>
                <h3 className={styles['project-name']}>{project.name}</h3>
                <p className={styles['project-description']}>{project.description}</p>
              </div>
              <button className={styles['icon-btn']} onClick={(e) => e.stopPropagation()}>
                <MoreVertical size={18} />
              </button>
            </div>
            <div className={styles['project-stats']}>
              <div className={styles['project-stat']}>
                <Database size={16} />
                <span>{project.databases} Databases</span>
              </div>
              <div className={styles['project-stat']}>
                <Users size={16} />
                <span>{project.users.toLocaleString()} Users</span>
              </div>
              <div className={styles['project-stat']}>
                <Globe size={16} />
                <span>{project.region}</span>
              </div>
            </div>
            <div className={styles['project-footer']}>
              <span className={`${styles['status-badge']} ${styles[project.status]}`}>
                {project.status}
              </span>
              <span className={styles['project-updated']}>Updated {project.updated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
