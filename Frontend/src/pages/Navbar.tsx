import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, FileText, ListChecks, Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from '@/store';
import { logout } from "../store/slices/authSlice";
import styles from "./Navbar.module.css";
import { Avatar } from "../components/ui/Avatar/Avatar";

import { initLenis, getLenis } from "../utils/lenis";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        setIsDropdownOpen(false);
        navigate("/login");
    };

    const handleScrollTo = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);

        if (window.location.pathname === '/' && element) {
            const lenis = getLenis();
            if (lenis) {
                lenis.scrollTo(`#${id}`, { offset: -80 });
            } else {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate(`/#${id}`);
            // Small timeout to allow navigation to finish before scrolling
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) {
                    const lenis = getLenis();
                    if (lenis) lenis.scrollTo(`#${id}`, { offset: -80 });
                    else el.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const lenis = initLenis();

        const handleScroll = (e?: any) => {
            const scrollY = e?.scroll ?? lenis?.scroll ?? window.scrollY;
            setScrolled(scrollY > 20);
        };

        const onNativeScroll = () => handleScroll();

        if (lenis) {
            lenis.on('scroll', handleScroll);
        } else {
            window.addEventListener("scroll", onNativeScroll);
        }

        return () => {
            if (lenis) {
                lenis.off('scroll', handleScroll);
            } else {
                window.removeEventListener("scroll", onNativeScroll);
            }
        };
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
                    <span className={styles['logo-text']}>
                        Protec
                        <img src="/X.png" alt="X" className={styles.logoX} />
                    </span>
                </div>

                {/* Links */}
                <div className={styles['navbar-links-container']}>
                    <a
                        href="/#features"
                        className={styles['nav-link']}
                        onClick={(e) => handleScrollTo(e, 'features')}
                    >
                        <ListChecks size={16} />
                        Features
                    </a>
                </div>

                {/* Actions */}
                <div className={styles['navbar-actions']}>
                    {!isAuthenticated ? (
                        <>
                            <Link to="/login" className={styles['nav-link-btn']}>Sign In</Link>
                            <Link to="/signup" className={`${styles['nav-primary-btn']} ${scrolled ? styles.scrolled : ""}`}>
                                Quick Start
                            </Link>
                        </>
                    ) : (
                        <div className={styles['user-menu-container']} ref={dropdownRef}>
                            <div
                                className={styles['user-menu']}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <div className={styles['user-avatar']}>
                                    <Avatar name={user?.name || 'User'} src={user?.image} size={24} />
                                </div>
                                <ChevronDown size={16} className={styles['chevron-icon']} />
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
                {/* Mobile Menu Toggle */}
                <button
                    className={styles['mobile-menu-btn']}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className={styles['mobile-menu']}>
                    <div className={styles['mobile-nav-links']}>
                        <a
                            href="/#features"
                            className={styles['mobile-nav-link']}
                            onClick={(e) => handleScrollTo(e, 'features')}
                        >
                            <ListChecks size={20} />
                            Features
                        </a>
                        <Link to="/docs/overview" className={styles['mobile-nav-link']} onClick={() => setIsMobileMenuOpen(false)}>
                            <FileText size={20} />
                            Docs
                        </Link>
                    </div>

                    <div className={styles['mobile-nav-actions']}>
                        {!isAuthenticated ? (
                            <>
                                <Link to="/login" className={styles['mobile-link-btn']} onClick={() => setIsMobileMenuOpen(false)}>
                                    Sign In
                                </Link>
                                <Link to="/signup" className={styles['mobile-primary-btn']} onClick={() => setIsMobileMenuOpen(false)}>
                                    Quick Start
                                </Link>
                            </>
                        ) : (
                            <div className={styles['mobile-user-section']}>
                                <div className={styles['mobile-user-info']}>
                                    <Avatar name={user?.name || 'User'} src={user?.image} size={44} />
                                    <div className={styles['header-info']}>
                                        <p className={styles['user-name']}>{user?.name || 'User'}</p>
                                        <p className={styles['user-email']}>{user?.email || ''}</p>
                                    </div>
                                </div>
                                <button className={styles['mobile-logout-btn']} onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>
                                    <LogOut size={20} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

