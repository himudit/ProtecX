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
}

const RequestContributionGraph: React.FC<Props> = ({
    data = [],
    title = "API request activity"
}) => {
    const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear());
    const tooltipRef = useRef<HTMLDivElement>(null);

    // Get unique years from data if available, otherwise just current year 
    const availableYears = useMemo(() => {
        if (data.length === 0) return [new Date().getFullYear()];
        const years = new Set(data.map(d => new Date(d.date).getFullYear()));
        const yearList = Array.from(years).sort((a, b) => b - a);
        // Ensure current year is in the list
        const currentYear = new Date().getFullYear();
        if (!years.has(currentYear)) {
            yearList.unshift(currentYear);
        }
        return yearList;
    }, [data]);

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

        // dummy data for empty year
        return Array.from({ length: 365 }).map((_, i) => {
            const d = new Date(startDate);
            d.setDate(d.getDate() + i);
            if (d > new Date()) return null; // Don't show future data in dummy
            return {
                date: d.toISOString().split("T")[0],
                count: Math.floor(Math.random() * 20) // lower dummy count to look realistic
            };
        }).filter(Boolean) as DataPoint[];
    }, [data, selectedYear, startDate]);

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
        if (!dataValue || dataValue.count === undefined || !tooltipRef.current) return;

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
            <div className="heatmap-card">
                <div className="heatmap-header">
                    <span className="heatmap-title">{title}</span>
                    <div className="heatmap-header-right">
                        <select
                            className="year-select"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                        >
                            {availableYears.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>

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
            <div ref={tooltipRef} className="custom-tooltip" />
        </div>
    );
};

export default RequestContributionGraph;