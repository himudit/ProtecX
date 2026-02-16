import { Plus, MoreVertical, Database, Users, Globe, X } from 'lucide-react';
import { useRelativeTime } from '../utils/useRelativeTime';
import { useNavigate } from 'react-router-dom';
import styles from './Projects.module.css';
import { useState, useEffect, useMemo } from 'react';
import { createProject, getProjects } from '../services/project.api';
import { XTable } from '../components/ui/x-table/XTable';
import { SkeletonXTable } from '../components/ui/x-table/SkeletonXTable';
import type { ProjectResponseDto } from '../modules/project/dto/project-response.dto';

export default function Projects() {
  const navigate = useNavigate();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [projects, setProjects] = useState<ProjectResponseDto[]>([]);
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const res = await getProjects();
        setProjects(res.data as ProjectResponseDto[]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);


  const rowData = useMemo(() => {
    return projects.map((project) => ({
      id: project.id,
      name: project.name,
      createdAt: project.createdAt,
      storage: "100GB",
      status: project.status,
      lastActive: "2 hours ago",
    }));
  }, [projects]);

  const openCreateDialog = () => {
    setName('');
    setDescription('');
    setNameError('');
    setIsCreateOpen(true);
  };


  const handleCreateProject = async () => {
    const trimmedName = name.trim();

    // Client-side validation
    if (trimmedName.length < 3) {
      setName(trimmedName);
      setNameError('Project name must be at least 3 characters');
      return;
    }
    if (trimmedName.length > 15) {
      setName(trimmedName);
      setNameError('Project name must not exceed 15 characters');
      return;
    }

    setNameError('');
    setIsCreating(true);
    try {
      const response = await createProject({
        name: trimmedName,
        description,
      });
      setIsCreateOpen(false);
      navigate(`/dashboard/projects/${response.data.project.id}`, { state: { confetti: true } });
    } catch (err: any) {
      console.error(err);
      setNameError(err.response?.data?.message || 'Failed to create project');
    }
    finally {
      setIsCreating(false);
    }
  };

  const handleRowClick = (project: any) => {
    navigate(`/dashboard/projects/${project.id}`);
  };

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
          {/* <Plus size={18} /> */}
          <span>New Project</span>
        </button>

      </div>
      {isCreateOpen && (
        <div
          className={styles['dialog-overlay']}
          onClick={() => {
            if (!isCreating) setIsCreateOpen(false);
          }}
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
                disabled={isCreating}
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles['form-group']}>
              <label>Name</label>
              <input
                type="text"
                className={`${styles['form-control']} ${nameError ? styles['error-border'] : ''}`}
                placeholder="Project name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError) setNameError('');
                }}
              />
              {nameError && <span className={styles['error-message']}>{nameError}</span>}
            </div>

            <div className={styles['form-group']}>
              <label>Description <span className={styles['optional-text']}>(optional)</span></label>
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
                disabled={isCreating}
              >
                Cancel
              </button>
              <button
                className={`${styles['primary-btn']} ${isCreating ? styles['loading'] : ''}`}
                onClick={handleCreateProject}
                disabled={isCreating}
              >
                {isCreating ? (
                  <>
                    <span className={styles.loader}></span>
                    <span className={styles.dimText}>Creating...</span>
                  </>
                ) : (
                  'Create project'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {isLoading ? (
        <SkeletonXTable
          columns={[
            { key: 'name', label: 'Name' },
            {
              key: 'createdAt',
              label: 'Created At',
              render: (value) => useRelativeTime(value)
            },
            { key: 'storage', label: 'Storage' },
            { key: 'lastActive', label: 'Last Active' },
            { key: 'status', label: 'Status' },
          ]}
        />
      ) : (
        <XTable
          data={rowData}
          onRowClick={handleRowClick}
          columns={[
            { key: 'name', label: 'Name' },
            {
              key: 'createdAt',
              label: 'Created At',
              render: (value) => useRelativeTime(value)
            },
            { key: 'storage', label: 'Storage' },
            { key: 'lastActive', label: 'Last Active' },
            { key: 'status', label: 'Status' },
          ]}
        />
      )}
    </div>
  );
}
