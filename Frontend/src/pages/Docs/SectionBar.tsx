import React from "react";
import { cn } from "@/lib/utils";


import styles from './QuickStart.module.css';

interface SectionBarProps {
    sections: { id: string; title: string }[];
    activeSection: string | undefined;
    onSectionClick: (id: string) => void;
}

const SectionBar: React.FC<SectionBarProps> = ({
    sections,
    activeSection,
    onSectionClick,
}) => {
    return (
        <div className={styles['section-bar-container']}>
            <div className={styles['relative-box']}>
                {/* Animated Background Indicator */}
                <div
                    className={styles['bar-indicator']}
                    style={{
                        height: "2.5rem", // Height of one item
                        top: `${sections.findIndex(s => s.id === activeSection) * 2.5}rem`,
                        opacity: activeSection ? 1 : 0,
                    }}
                />

                <nav className={styles['nav-list']}>
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => onSectionClick(section.id)}
                            className={cn(
                                styles['bar-link'],
                                activeSection === section.id
                                    ? styles['bar-link-active']
                                    : styles['bar-link-inactive']
                            )}
                        >
                            {section.title}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default SectionBar;
