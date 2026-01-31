import styles from './XTable.module.css';
import type { Column } from './types';

type Props<T> = {
    columns: Column<T>[];
    rowCount?: number; // number of skeleton rows to show
};

// SkeletonXTable does not need real data
export function SkeletonXTable<T>({ columns, rowCount = 5 }: Props<T>) {
    return (
        <div className={styles.wrapper}>
            {/* Search input skeleton */}
            <div className={styles['search-wrapper']}>
                <div className={styles['search-icon-skeleton']} />
                <div className={styles['search-skeleton']} />
            </div>

            {/* Table skeleton */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx}>
                                <div className={styles['th-skeleton']} />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rowCount }).map((_, rowIdx) => (
                        <tr key={rowIdx}>
                            {columns.map((_, colIdx) => (
                                <td key={colIdx}>
                                    <div className={styles['td-skeleton']} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
