import { useState } from 'react';
import styles from './XTable.module.css';
import type { Column } from './types';
import { Search, Copy, Check } from 'lucide-react';


type Props<T> = {
    data: T[];
    columns: Column<T>[];
    onRowClick?: (row: T) => void;
};

export function XTable<T extends Record<string, any>>({
    data,
    columns,
    onRowClick,
}: Props<T>) {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<keyof T | null>(null);
    const [reverse, setReverse] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = (e: React.MouseEvent, text: string, id: string) => {
        e.stopPropagation();
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const filteredData = data.filter((row) =>
        columns.some((col) =>
            String(row[col.key]).toLowerCase().includes(search.toLowerCase())
        )
    );

    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortBy) return 0;

        const valA = String(a[sortBy]);
        const valB = String(b[sortBy]);

        return reverse
            ? valB.localeCompare(valA)
            : valA.localeCompare(valB);
    });

    const handleSort = (key: keyof T) => {
        if (sortBy === key) {
            setReverse(!reverse);
        } else {
            setSortBy(key);
            setReverse(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles['search-wrapper']}>
                <Search className={styles['search-icon']} size={18} />
                <input
                    className={styles.search}
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={String(col.key)} onClick={() => handleSort(col.key)}>
                                {col.label}
                                {sortBy === col.key && (reverse ? ' 🔽' : ' 🔼')}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {sortedData.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className={styles.empty}>
                                Nothing found
                            </td>
                        </tr>
                    ) : (
                        sortedData.map((row, idx) => (
                            <tr
                                key={idx}
                                onClick={() => onRowClick?.(row)}
                                className={onRowClick ? styles.clickable : ''}
                            >
                                {columns.map((col) => {
                                    const value = row[col.key];
                                    const displayValue = col.render ? col.render(value, row) : String(value);
                                    const uniqueId = `${idx}-${String(col.key)}`;
                                    const isCopied = copiedId === uniqueId;

                                    return (
                                        <td key={String(col.key)} title={String(value)}>
                                            {col.copyable ? (
                                                <div
                                                    className={styles['copy-container']}
                                                    onClick={(e) => handleCopy(e, String(value), uniqueId)}
                                                    title={`Copy: ${String(value)}`}
                                                >
                                                    <div className={`${styles['copy-btn']} ${isCopied ? styles.copied : ''}`}>
                                                        {isCopied ? <Check size={14} /> : <Copy size={14} />}
                                                    </div>
                                                    <span className={styles['copy-text']}>{displayValue}</span>
                                                </div>
                                            ) : (
                                                <span className={styles['cell-text']}>{displayValue}</span>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

