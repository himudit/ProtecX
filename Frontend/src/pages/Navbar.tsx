import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ShieldIcon from "../components/Common/ShieldIcon";
import styles from "./Navbar.module.css";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
            <div className={styles['navbar-inner']}>
                {/* Logo */}
                <div className={styles['navbar-logo']} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <div className={`${styles['logo-icon']} ${scrolled ? styles.scrolled : ""}`}>
                        <ShieldIcon size={20} />
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
                    <Link to="/login" className={styles['nav-link-btn']}>Sign In</Link>
                    <Link to="/signup" className={`${styles['nav-primary-btn']} ${scrolled ? styles.scrolled : ""}`}>
                        Get Started
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

