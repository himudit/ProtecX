import { useState, useRef, useEffect } from 'react';
import { ChevronDown, LogOut, Settings } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store';
import { logout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { Avatar } from '../ui/Avatar/Avatar';
import { BreadCrumb } from '../ui/BreadCrumb/BreadCrumb';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
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
          <span className={styles['logo-text']}>
            Protec
            <img src="/X.png" alt="X" className={styles.logoX} />
          </span>

        </div>
        <span className={styles.separator}>/</span>
        <BreadCrumb />
      </div>
      <div className={styles['header-right']}>
        {isAuthenticated && (
          <div className={styles['user-menu-container']} ref={dropdownRef}>
            <div
              className={styles['user-menu']}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className={styles['user-avatar']}>
                <Avatar name={user?.name || 'User'} src={user?.image} size={24} />
              </div>
              <ChevronDown size={16} />
            </div>

            {isDropdownOpen && (
              <div className={styles['dropdown-menu']}>
                <div className={styles['dropdown-header']}>
                  <div className={styles['header-avatar-row']}>
                    <Avatar name={user?.name || 'User'} src={user?.image} size={50} />
                    <div className={styles['header-info']}>
                      <p className={styles['user-name']}>{user?.name || 'User'}</p>
                      <p className={styles['user-email']}>{user?.email || ''}</p>
                    </div>
                  </div>
                </div>
                <div className={styles['dropdown-divider']} />
                <button className={styles['logout-btn']} onClick={handleLogout}>
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
