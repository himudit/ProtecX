import { Search, Bell, User, ChevronDown } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles['header-left']}>
        <div className={styles['search-container']}>
          <Search size={18} className={styles['search-icon']} />
          <input
            type="text"
            placeholder="Search projects, databases..."
            className={styles['search-input']}
          />
        </div>
      </div>
      <div className={styles['header-right']}>
        <button className={styles['header-icon-btn']}>
          <Bell size={18} />
        </button>
        <div className={styles['user-menu']}>
          <div className={styles['user-avatar']}>
            <User size={16} />
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}
