// import React, { useState, useMemo, useRef, useCallback } from 'react';
// import CalendarHeatmap from 'react-calendar-heatmap';
// import './contributionGraph.css';

// interface DataPoint {
//     date: string;
//     count: number;
// }

// interface Range {
//     max: number;
//     class: string;
// }

// interface Props {
//     data?: DataPoint[];
//     title?: string;
//     ranges?: Range[];
// }

// const RequestContributionGraph: React.FC<Props> = ({
//     data = [],
//     title = "API request activity",
//     ranges = [
//         { max: 0, class: 'color-empty' },
//         { max: 10, class: 'color-level-1' },
//         { max: 30, class: 'color-level-2' },
//         { max: 60, class: 'color-level-3' },
//         { max: Infinity, class: 'color-level-4' }
//     ]
// }) => {
//     const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: '' });
//     const containerRef = useRef<HTMLDivElement>(null);

//     // Generate 365 days of dummy data if none provided
//     const contributionData = useMemo(() => {
//         if (data.length > 0) return data;

//         const today = new Date();
//         const result: DataPoint[] = [];
//         for (let i = 365; i >= 0; i--) {
//             const d = new Date(today);
//             d.setDate(today.getDate() - i);

//             const randomSeed = Math.sin(i * 0.5) * 0.5 + 0.5;
//             const dateWeight = (365 - i) / 365;
//             const baseActivity = Math.floor(randomSeed * 40 * dateWeight);
//             const spikes = Math.floor(Math.random() * 80 * (Math.random() > 0.95 ? 1 : 0));

//             result.push({
//                 date: d.toISOString().split('T')[0],
//                 count: Math.max(0, baseActivity + spikes)
//             });
//         }
//         return result;
//     }, [data]);

//     // Memoize date boundaries to prevent recalculation 
//     const { today, lastYear } = useMemo(() => {
//         const today = new Date();
//         const lastYear = new Date(today);
//         lastYear.setFullYear(today.getFullYear() - 1);
//         return { today, lastYear };
//     }, []);

//     // Determine class for value based on request count ranges
//     const getClassForValue = useCallback((value: DataPoint | undefined) => {
//         if (!value || value.count === 0) return 'color-empty';
//         const match = ranges.find(r => value.count <= r.max);
//         return match ? match.class : 'color-level-4';
//     }, [ranges]);

//     // Simplified Tooltip handler
//     const handleMouseOver = useCallback((event: React.MouseEvent, value: DataPoint | undefined) => {
//         if (!value || value.count === undefined || !containerRef.current) return;

//         const rect = containerRef.current.getBoundingClientRect();
//         const x = event.clientX - rect.left;
//         const y = event.clientY - rect.top;

//         setTooltip({
//             visible: true,
//             x: x,
//             y: y - 40,
//             content: `${value.count} requests`
//         });
//     }, []);

//     const handleMouseLeave = useCallback(() => {
//         setTooltip(prev => ({ ...prev, visible: false }));
//     }, []);

//     const heatmapElement = useMemo(() => (
//         <CalendarHeatmap
//             startDate={lastYear}
//             endDate={today}
//             values={contributionData}
//             classForValue={getClassForValue}
//             onMouseOver={handleMouseOver}
//             onMouseLeave={handleMouseLeave}
//             showWeekdayLabels={true}
//             gutterSize={2}
//             weekdayLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
//         />
//     ), [contributionData, lastYear, today, getClassForValue, handleMouseOver, handleMouseLeave]);

//     return (
//         <div className="heatmap-container" ref={containerRef} style={{ position: 'relative' }}>
//             <div className="heatmap-card">
//                 <header className="heatmap-header">
//                     <span className="heatmap-title">{title}</span>
//                 </header>

//                 {heatmapElement}

//                 <div className="heatmap-legend">
//                     <span>Less</span>
//                     <div className="legend-square color-empty" />
//                     <div className="legend-square color-level-1" />
//                     <div className="legend-square color-level-2" />
//                     <div className="legend-square color-level-3" />
//                     <div className="legend-square color-level-4" />
//                     <span>More</span>
//                 </div>

//                 {tooltip.visible && (
//                     <div
//                         className="custom-tooltip"
//                         style={{
//                             top: tooltip.y,
//                             left: tooltip.x,
//                             transform: 'translateX(-50%)'
//                         }}
//                     >
//                         {tooltip.content}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default RequestContributionGraph;

import React, { useRef } from "react";
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
    const tooltipRef = useRef<HTMLDivElement>(null);

    const today = new Date();
    const lastYear = new Date();
    lastYear.setFullYear(today.getFullYear() - 1);

    // dummy data if none provided
    const values: DataPoint[] =
        data.length > 0
            ? data
            : Array.from({ length: 365 }).map((_, i) => {
                const d = new Date();
                d.setDate(today.getDate() - i);
                return {
                    date: d.toISOString().split("T")[0],
                    count: Math.floor(Math.random() * 80)
                };
            });

    const getClassForValue = (value: DataPoint | undefined) => {
        if (!value || value.count === 0) return "color-empty";
        if (value.count <= 10) return "color-level-1";
        if (value.count <= 30) return "color-level-2";
        if (value.count <= 60) return "color-level-3";
        return "color-level-4";
    };

    const handleMouseOver = (
        event: React.MouseEvent,
        value: DataPoint | undefined
    ) => {
        if (!value || !tooltipRef.current) return;

        const tooltip = tooltipRef.current;

        tooltip.innerText = `${value.date} — ${value.count} requests`;
        tooltip.style.opacity = "1";
        tooltip.style.left = event.pageX + "px";
        tooltip.style.top = event.pageY - 35 + "px";
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
                </div>

                <CalendarHeatmap
                    startDate={lastYear}
                    endDate={today}
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