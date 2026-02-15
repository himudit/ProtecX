import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './BreadCrumb.module.css';

export const BreadCrumb: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    // If we are on the landing page or dashboard root, maybe show something simple or nothing
    // For now, let's just generate from pathnames

    return (
        <nav className={styles.breadcrumb}>
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                // Replace UUIDs or complex IDs with something more readable if needed
                // For now just show the path segment
                const label = value.length > 20 ? value : value.replace(/-/g, ' ');

                return (
                    <React.Fragment key={to}>
                        <Link
                            to={to}
                            className={`${styles.item} ${last ? styles.current : ''}`}
                        >
                            {label}
                        </Link>
                        {!last && <span className={styles.separator}>/</span>}
                    </React.Fragment>
                );
            })}
        </nav>
    );
};
