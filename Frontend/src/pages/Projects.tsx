import { Plus, MoreVertical, Database, Users, Globe, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Projects.module.css';
import { useState } from 'react';
import { createProject } from '../services/project.api';
import { XTable } from '../components/ui/x-table/XTable';

export default function Projects() {
  const navigate = useNavigate();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');


  const openCreateDialog = () => {
    setName('');
    setDescription('');
    setIsCreateOpen(true);
  };


  const handleCreateProject = async () => {
    setIsLoading(true);
    try {
      await createProject({
        name,
        description,
      });

      setIsCreateOpen(false);
      // refresh project list later
    } catch (err) {
      console.error(err);
    }
    finally {
      setIsLoading(false);
    }
  };


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

  const data = [
    { name: 'Athena', createdAt: '2022-01-01', storage: '100GB', status: 'active', lastActive: '2 hours ago' },
    { name: 'John', createdAt: '2022-01-02', storage: '200GB', status: 'paused', lastActive: '1 day ago' },
  ];

  return (
    <div className={styles['projects-page']}>
      <div className={styles['page-header']}>
        <div className={styles.header}>
          <h1 className={styles.title}>Mudit's Projects</h1>
          <p className={styles.subtitle}>Manage your projects and resources</p>
        </div>

        <button
          className={styles['primary-btn']}
          onClick={openCreateDialog}
        >
          <Plus size={18} />
          <span>New Project</span>
        </button>

      </div>
      {isCreateOpen && (
        <div
          className={styles['dialog-overlay']}
          onClick={() => setIsCreateOpen(false)}
        >
          <div
            className={styles['dialog']}
            onClick={(e) => e.stopPropagation()} // prevent close on dialog click
          >
            <div className={styles['dialog-header']}>
              <h2 className={styles['dialog-title']}>Create Project</h2>
              <button
                className={styles['icon-btn']}
                onClick={() => setIsCreateOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles['form-group']}>
              <label>Name</label>
              <input
                type="text"
                className={styles['form-control']}
                placeholder="Project name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles['form-group']}>
              <label>Description</label>
              <textarea
                className={styles['form-control']}
                placeholder="Briefly describe your project..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className={styles['dialog-footer']}>
              <button
                className={styles['secondary-btn']}
                onClick={() => setIsCreateOpen(false)}
              >
                Cancel
              </button>
              <button
                className={`${styles['primary-btn']} ${isLoading ? styles['loading'] : ''}`}
                onClick={handleCreateProject}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className={styles.loader}></span>
                    <span className={styles.dimText}>Creating...</span>
                  </>
                ) : (
                  'Create Project'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <XTable
        data={data}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'createdAt', label: 'Created At' },
          { key: 'storage', label: 'Storage' },
          { key: 'lastActive', label: 'Last Active' },
          { key: 'status', label: 'Status' },
        ]}
      />
    </div>
  );
}
