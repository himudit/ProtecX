import React from 'react';
import styles from './Avatar.module.css';

interface AvatarProps {
    name: string;
    src?: string | null;
    size?: number;
    className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name, src, size = 32, className = '' }) => {
    const initialsUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=f97316,ff8c42,ea580c,c2410c,9a3412`;
    const avatarUrl = src || initialsUrl;

    return (
        <div
            className={`${styles.avatar} ${className}`}
            style={{ width: size, height: size }}
        >
            <img
                src={avatarUrl}
                alt={name}
                className={styles.avatarImage}
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = initialsUrl;
                }}
            />
        </div>
    );
};
