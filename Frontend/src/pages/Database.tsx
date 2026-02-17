import { Plus, Filter, RefreshCw } from 'lucide-react';
import { useRelativeTime } from '@/utils/useRelativeTime';
import styles from './Database.module.css';
import { XTable } from '@/components/ui/x-table/XTable';
import { SkeletonXTable } from '@/components/ui/x-table/SkeletonXTable';
import type { ProjectUserRowResponseDto } from '@/modules/projectUser/dto/projectUserRow-response.dto';
import { ProjectRole } from '@/enums/enum';
import type { Column } from '@/components/ui/x-table/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectUsers } from '@/services/project.api';
// import { toast } from 'react-hot-toast';

export default function Database() {
  const { projectId } = useParams<{ projectId: string }>();
  const [users, setUsers] = useState<ProjectUserRowResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    if (!projectId) return;
    try {
      setIsLoading(true);
      const response = await getProjectUsers(projectId);
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [projectId]);

  const columns: Column<ProjectUserRowResponseDto>[] = [
    { key: 'id', label: 'User Id', copyable: true },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    // { key: 'isVerified', label: 'Verified' },
    {
      key: 'createdAt',
      label: 'Created At',
      render: (value) => useRelativeTime(value)
    },
    {
      key: 'lastLoginAt',
      label: 'Last Login',
      render: (value) => useRelativeTime(value)
    },
  ];

  return (
    <div className={styles['database-page']}>
      <div className={styles['tables-section']}>
        <div className={styles['section-header']}>
          <div className={styles['header-left']}>
            <h2>Project Users</h2>
            <span className={styles['section-count']}>{users.length} users</span>
          </div>
          <button
            className={styles['refresh-btn']}
            onClick={fetchUsers}
            disabled={isLoading}
            title="Refresh Users"
          >
            <RefreshCw size={18} className={isLoading ? styles.spinning : ''} />
          </button>
        </div>

        <div className={styles['table-container']}>
          {isLoading ? (
            <SkeletonXTable columns={columns} />
          ) : (
            <XTable
              data={users}
              columns={columns}
              onRowClick={(row) => console.log('Clicked row:', row)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

