import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from '@/store';
import { logout } from "../store/slices/authSlice";
import styles from "./Navbar.module.css";
import { Avatar } from "../components/ui/Avatar/Avatar";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
            <div className={styles['navbar-inner']}>
                {/* Logo */}
                <div className={styles['navbar-logo']} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <div className={`${styles['logo-icon']} ${scrolled ? styles.scrolled : ""}`}>
                        <img src="/shield.png" alt="ShieldX" className={styles['logo-img']} />
                    </div>
                    <span className={styles['logo-text']}>Shield</span>
                </div>

                {/* Links */}
                <div className={styles['navbar-links-container']}>
                    <a href="#features" className={styles['nav-link']}>Features</a>
                    <a href="#docs" className={styles['nav-link']}>Docs</a>
                </div>

                {/* Actions */}
                <div className={styles['navbar-actions']}>
                    {!isAuthenticated ? (
                        <>
                            <Link to="/login" className={styles['nav-link-btn']}>Sign In</Link>
                            <Link to="/signup" className={`${styles['nav-primary-btn']} ${scrolled ? styles.scrolled : ""}`}>
                                Get Started
                                <ArrowRight size={16} />
                            </Link>
                        </>
                    ) : (
                        <div className={styles['user-menu-container']} ref={dropdownRef}>
                            <div
                                className={styles['user-menu']}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <div className={styles['user-avatar']}>
                                    <Avatar name={user?.name || 'User'} size={24} />
                                </div>
                                <ChevronDown size={16} className={styles['chevron-icon']} />
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
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

