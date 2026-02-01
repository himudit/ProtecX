import styles from './SkeletonDiv.module.css';
import '../shimmer.css';

interface SkeletonDivProps {
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    className?: string;
    style?: React.CSSProperties;
}

export default function SkeletonDiv({
    width = '100%',
    height = '1rem',
    borderRadius = '4px',
    className = '',
    style = {}
}: SkeletonDivProps) {
    return (
        <div
            className={`${styles.skeleton} shimmer-effect ${className}`}
            style={{
                width,
                height,
                borderRadius,
                ...style
            }}
        />
    );
}
