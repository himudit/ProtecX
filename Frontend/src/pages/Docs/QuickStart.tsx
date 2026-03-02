import React, { useState, useEffect, useRef } from "react";
import SectionBar from "./SectionBar";
import styles from './QuickStart.module.css';
import createProjectImg from '../../assets/QuickStart/create_project.png';
import copyCredentialImg from '../../assets/QuickStart/copy_credential.png';
import CodeBlock from "../../components/ui/CodeBlock/CodeBlock";


const sections = [
    { id: "create-project", title: "Create project" },
    { id: "install-sdk", title: "Install SDK" },
    { id: "import-sdk", title: "Import SDK" },
    { id: "create-login", title: "Create Login Page" },
    { id: "all-set", title: "All Set" },
];

const QuickStart = () => {
    const [activeSection, setActiveSection] = useState<string>(sections[0].id);
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observer.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.6 }
        );

        sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.current?.observe(el);
        });

        return () => observer.current?.disconnect();
    }, []);

    const handleSectionClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
            });
        }
    };

    return (
        <div className={`${styles['quickstart-page']} mx-auto flex w-full gap-12`}>
            {/* Main Content */}
            <div className="flex-1 min-w-0">
                <div className={styles['page-header']}>
                    <h1 className={styles['page-title']}>Quick Start</h1>
                    <p className={styles['page-subtitle']}>
                        Everything you need to get your first ProtecX app up and running in minutes.
                    </p>
                </div>

                <div className={styles['section-container']}>
                    <div className="space-y-32">
                        {sections.map((section, index) => (
                            <section
                                key={section.id}
                                id={section.id}
                                className={`${styles['docs-section']} animate-in fade-in slide-in-from-bottom-4 duration-700`}
                            >
                                <div className={styles['section-header']}>
                                    <div className={styles['section-badge']}>
                                        {index + 1}
                                    </div>
                                    <h2 className={styles['section-title']}>
                                        {section.title}
                                    </h2>
                                </div>

                                <div className={styles['section-content']}>
                                    {section.id === "create-project" && (
                                        <div className="my-10 p-6 rounded-2xl border border- dark:border-gray-800 shadow-lg">
                                            <p className=" text-gray-400">
                                                Head over to the dashboard and click on the Create Project button to get started.
                                            </p>
                                            <img
                                                src={createProjectImg}
                                                alt="Create Project"
                                                className={styles['section-image']}
                                            />
                                        </div>
                                    )}

                                    {section.id === "import-sdk" && (
                                        <div className="my-10 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg">
                                            <p className=" text-gray-400">
                                                Copy the credentials from the dashboard and paste them in your project.
                                            </p>
                                            <img
                                                src={copyCredentialImg}
                                                alt="Copy Credential"
                                                className={styles['section-image']}
                                            />
                                        </div>
                                    )}



                                    {section.id === "install-sdk" && (
                                        <div className="mt-4">
                                            <CodeBlock
                                                text="npm i protecX-js"
                                                label="Shell"
                                            />
                                        </div>
                                    )}


                                    {section.id !== "create-project" && section.id !== "install-sdk" && (
                                        <div className={styles['placeholder-card']}>
                                            Detailed implementation guide for {section.title} goes here...
                                        </div>
                                    )}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Navigation */}
            <SectionBar
                sections={sections}
                activeSection={activeSection}
                onSectionClick={handleSectionClick}
            />
        </div>
    );

};

export default QuickStart;
