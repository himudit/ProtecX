import { Plus, Table, Search, Filter } from 'lucide-react';
import styles from './Database.module.css';

export default function Database() {
  const tables = [
    { name: 'users', rows: 1250, size: '2.4 MB', updated: '2 hours ago' },
    { name: 'products', rows: 3420, size: '8.1 MB', updated: '5 hours ago' },
    { name: 'orders', rows: 8920, size: '12.3 MB', updated: '1 day ago' },
    { name: 'payments', rows: 5670, size: '6.8 MB', updated: '2 days ago' },
  ];

  return (
    <div className={styles['database-page']}>
      <div className={styles['page-header']}>
        <div>
          <h1 className={styles['page-title']}>Database</h1>
          <p className={styles['page-subtitle']}>Manage your database tables and queries</p>
        </div>
        <div className={styles['header-actions']}>
          <button className={styles['secondary-btn']}>
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button className={styles['primary-btn']}>
            <Plus size={18} />
            <span>New Table</span>
          </button>
        </div>
      </div>

      <div className={styles['search-bar']}>
        <Search size={18} className={styles['search-icon']} />
        <input
          type="text"
          placeholder="Search tables..."
          className={styles['search-input']}
        />
      </div>

      <div className={styles['tables-section']}>
        <div className={styles['section-header']}>
          <h2>Tables</h2>
          <span className={styles['section-count']}>{tables.length} tables</span>
        </div>
        <div className={styles['tables-grid']}>
          {tables.map((table) => (
            <div key={table.name} className={styles['table-card']}>
              <div className={styles['table-header']}>
                <div className={styles['table-icon']}>
                  <Table size={20} />
                </div>
                <h3 className={styles['table-name']}>{table.name}</h3>
              </div>
              <div className={styles['table-stats']}>
                <div className={styles['table-stat']}>
                  <span className={styles['stat-label']}>Rows</span>
                  <span className={styles['stat-value']}>{table.rows.toLocaleString()}</span>
                </div>
                <div className={styles['table-stat']}>
                  <span className={styles['stat-label']}>Size</span>
                  <span className={styles['stat-value']}>{table.size}</span>
                </div>
              </div>
              <div className={styles['table-footer']}>
                <span className={styles['table-updated']}>Updated {table.updated}</span>
                <button className={styles['text-link']}>View Schema</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
