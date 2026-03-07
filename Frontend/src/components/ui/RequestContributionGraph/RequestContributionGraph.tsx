import React, { useRef, useMemo, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "./contributionGraph.css";

interface DataPoint {
    date: string;
    count: number;
}

interface Props {
    data?: DataPoint[];
    title?: string;
    isLoading?: boolean;
}

const RequestContributionGraph: React.FC<Props> = ({
    data = [],
    title = "API request activity",
    isLoading = false
}) => {
    const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear());
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Get years from data and ensure at least 3 previous years exist
    const availableYears = useMemo(() => {
        const currentYear = new Date().getFullYear();
        if (isLoading && data.length === 0) {
            return [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];
        }

        const years = new Set(data.map(d => new Date(d.date).getFullYear()));

        // Always include current year and at least 3 previous years
        years.add(currentYear);
        years.add(currentYear - 1);
        years.add(currentYear - 2);
        years.add(currentYear - 3);

        return Array.from(years).sort((a, b) => b - a);
    }, [data, isLoading]);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const { startDate, endDate } = useMemo(() => {
        return {
            startDate: new Date(`${selectedYear}-01-01`),
            endDate: new Date(`${selectedYear}-12-31`)
        };
    }, [selectedYear]);

    // Filter data for selected year or generate dummy data if none exists for that year
    const values: DataPoint[] = useMemo(() => {
        const filtered = data.filter(d => new Date(d.date).getFullYear() === selectedYear);

        if (filtered.length > 0) return filtered;

        // If loading, show completely empty graph structure with zeros
        if (isLoading) {
            return Array.from({ length: 365 }).map((_, i) => {
                const d = new Date(startDate);
                d.setDate(d.getDate() + i);
                return {
                    date: d.toISOString().split("T")[0],
                    count: 0
                };
            });
        }

        // Return empty year with zero counts if no data exists
        return Array.from({ length: 365 }).map((_, i) => {
            const d = new Date(startDate);
            d.setDate(d.getDate() + i);
            return {
                date: d.toISOString().split("T")[0],
                count: 0
            };
        });
    }, [data, selectedYear, startDate, isLoading]);

    const getClassForValue = (value: any) => {
        const dataValue = value as DataPoint | undefined;
        if (!dataValue || dataValue.count === undefined || dataValue.count === 0) return "color-empty";
        if (dataValue.count <= 10) return "color-level-1";
        if (dataValue.count <= 30) return "color-level-2";
        if (dataValue.count <= 60) return "color-level-3";
        return "color-level-4";
    };

    const handleMouseOver = (
        event: any,
        value: any
    ) => {
        const dataValue = value as DataPoint | undefined;
        if (!dataValue || dataValue.count === undefined || !tooltipRef.current || isLoading) return;

        const tooltip = tooltipRef.current;
        const formattedDate = new Date(dataValue.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        tooltip.innerText = `${formattedDate} — ${dataValue.count} requests`;
        tooltip.style.opacity = "1";
        tooltip.style.left = event.pageX + "px";
        tooltip.style.top = event.pageY - 40 + "px";
    };

    const handleMouseLeave = () => {
        if (tooltipRef.current) {
            tooltipRef.current.style.opacity = "0";
        }
    };

    return (
        <div className="heatmap-container">
            <div className={`heatmap-card ${isLoading ? 'loading' : ''}`}>
                <div className="heatmap-header">
                    <span className="heatmap-title">{title}</span>
                    <div className="heatmap-header-right">
                        <div className="custom-dropdown" ref={dropdownRef}>
                            <button
                                className="dropdown-trigger"
                                onClick={() => !isLoading && setIsDropdownOpen(!isDropdownOpen)}
                                type="button"
                                disabled={isLoading}
                                style={{ opacity: isLoading ? 0.5 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
                            >
                                <span>{selectedYear}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isDropdownOpen ? 'rotated' : ''}><path d="m6 9 6 6 6-6" /></svg>
                            </button>

                            {isDropdownOpen && (
                                <div className="dropdown-menu">
                                    {availableYears.map(year => (
                                        <div
                                            key={year}
                                            className={`dropdown-item ${year === selectedYear ? 'selected' : ''}`}
                                            onClick={() => {
                                                setSelectedYear(year);
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            {year}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="heatmap-wrapper">
                    {isLoading && (
                        <div className="heatmap-loader-overlay">
                            <div className="ios-spinner">
                                <div></div><div></div><div></div><div></div>
                                <div></div><div></div><div></div><div></div>
                                <div></div><div></div><div></div><div></div>
                            </div>
                        </div>
                    )}
                    <CalendarHeatmap
                        startDate={startDate}
                        endDate={endDate}
                        values={values}
                        classForValue={getClassForValue}
                        onMouseOver={handleMouseOver}
                        onMouseLeave={handleMouseLeave}
                        showWeekdayLabels
                        gutterSize={2}
                    />
                </div>

                <div className="heatmap-legend">
                    <span>Less</span>
                    <div className="legend-square color-empty" />
                    <div className="legend-square color-level-1" />
                    <div className="legend-square color-level-2" />
                    <div className="legend-square color-level-3" />
                    <div className="legend-square color-level-4" />
                    <span>More</span>
                </div>
            </div>

            {/* tooltip */}
            {!isLoading && <div ref={tooltipRef} className="custom-tooltip" />}
        </div>
    );
};

export default RequestContributionGraph;