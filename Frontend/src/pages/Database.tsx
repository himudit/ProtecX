import { Plus, Filter } from 'lucide-react';
import styles from './Database.module.css';
import { XTable } from '@/components/ui/x-table/XTable';
import type { ProjectUserRowResponseDto } from '@/modules/projectUser/dto/projectUserRow-response.dto';
import { ProjectRole } from '@/enums/enum';
import type { Column } from '@/components/ui/x-table/types';

export default function Database() {
  const dummyUsers: ProjectUserRowResponseDto[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: ProjectRole.OWNER,
      isVerified: true,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: ProjectRole.ADMIN,
      isVerified: true,
      createdAt: new Date().toISOString(),
      lastLoginAt: 'Never',
    },
    {
      id: '3',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      role: ProjectRole.MEMBER,
      isVerified: false,
      createdAt: new Date().toISOString(),
      lastLoginAt: 'Never',
    },
  ];

  const columns: Column<ProjectUserRowResponseDto>[] = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'isVerified', label: 'Verified' },
    { key: 'createdAt', label: 'Created At' },
    { key: 'lastLoginAt', label: 'Last Login' },
  ];

  return (
    <div className={styles['database-page']}>
      <div className={styles['page-header']}>
        <div>
          <h1 className={styles['page-title']}>Database</h1>
          <p className={styles['page-subtitle']}>Manage your project users and permissions</p>
        </div>
        <div className={styles['header-actions']}>
          <button className={styles['secondary-btn']}>
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button className={styles['primary-btn']}>
            <Plus size={18} />
            <span>Add User</span>
          </button>
        </div>
      </div>

      <div className={styles['tables-section']}>
        <div className={styles['section-header']}>
          <h2>Project Users</h2>
          <span className={styles['section-count']}>{dummyUsers.length} users</span>
        </div>

        <div className={styles['table-container']}>
          <XTable
            data={dummyUsers}
            columns={columns}
            onRowClick={(row) => console.log('Clicked row:', row)}
          />
        </div>
      </div>
    </div>
  );
}

