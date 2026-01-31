import { useState, useRef, useEffect } from 'react';
import { User, ChevronDown, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store';
import { logout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import ShieldIcon from '../Common/ShieldIcon';
import styles from './Header.module.css';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className={styles.header}>
      <div className={styles['header-left']}>
        <div className={styles.logo} onClick={() => navigate('/')}>
          <ShieldIcon size={16} style={{ cursor: 'pointer' }} />
          <span className={styles['logo-text']}>Shield</span>
        </div>
      </div>
      <div className={styles['header-right']}>
        <div className={styles['user-menu-container']} ref={dropdownRef}>
          <div
            className={styles['user-menu']}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className={styles['user-avatar']}>
              <User size={16} />
            </div>
            <ChevronDown size={16} />
          </div>

          {isDropdownOpen && (
            <div className={styles['dropdown-menu']}>
              <div className={styles['dropdown-header']}>
                <p className={styles['user-name']}>{user?.name}</p>
                <p className={styles['user-email']}>{user?.email}</p>
              </div>
              <div className={styles['dropdown-divider']} />
              <button className={styles['logout-btn']} onClick={handleLogout}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
