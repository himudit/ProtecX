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
                    <div className="flex flex-col">
                        {/* Step 1: Create Project */}
                        <section id="create-project" className={`${styles['docs-section']} mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700`}>
                            <div className={styles['section-header']}>
                                <div className={styles['section-badge']}>1</div>
                                <h2 className={styles['section-title']}>Create project</h2>
                            </div>
                            <div className={styles['section-content']}>
                                <div className="mt-8 mb-12 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg">
                                    <p className="text-gray-400">
                                        Head over to the dashboard and click on the Create Project button to get started.
                                    </p>
                                    <img
                                        src={createProjectImg}
                                        alt="Create Project"
                                        className={styles['section-image']}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Step 2: Install SDK */}
                        <section id="install-sdk" className={`${styles['docs-section']}  animate-in fade-in slide-in-from-bottom-4 duration-700`}>
                            <div className={styles['section-header']}>
                                <div className={styles['section-badge']}>2</div>
                                <h2 className={styles['section-title']}>Install SDK</h2>
                            </div>
                            <div className={styles['section-content']}>
                                <div className="mt-4">
                                    <CodeBlock
                                        text="npm i protecX-js"
                                        label="Shell"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Step 3: Import SDK */}
                        <section id="import-sdk" className={`${styles['docs-section']} -mt-10 mb-16 animate-in fade-in slide-in-from-bottom-4 border-t-2 border-amber-400 duration-700`}>
                            <div className={styles['section-header']}>
                                <div className={styles['section-badge']}>3</div>
                                <h2 className={styles['section-title']}>Import SDK</h2>
                            </div>
                            <div className={styles['section-content']}>
                                <div className="mt-2 mb-10 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg">
                                    <p className="text-gray-400">
                                        Copy the credentials from the dashboard and paste them in your project.
                                    </p>
                                    <img
                                        src={copyCredentialImg}
                                        alt="Copy Credential"
                                        className={styles['section-image']}
                                    />
                                </div>
                                <p className="text-gray-400">
                                    Create a new file <span className="font-mono text-white">src/lib/protecx.js</span>
                                    and add the following code to it, replace{" "}

                                    <span className="inline-block rounded-2xl bg-gray-700 text-white px-3 py-1 font-mono">
                                        &lt;PROJECT_ID&gt;
                                    </span>{" "}

                                    with your project ID and{" "}

                                    <span className="inline-block bg-gray-700 text-white px-3 py-1 font-mono">
                                        &lt;API_KEY&gt;
                                    </span>{" "}

                                    with your API key.
                                </p>


                                {/* <div className={styles['section-content']}> */}
                                <div className="mt-4">
                                    <CodeBlock
                                        text={`import { ProtecX, ProtecXError } from '@protecx/js';

export const protecx = new ProtecX({
  baseUrl: "https://protecx.onrender.com/api/v1",
  projectId: <PROJECT_ID>, // Replace with actual project ID
  apiKey: <API_KEY>,   // Replace with actual API key
  persistTokens: true // Automatically saves session to localStorage
});`}
                                        label="JS"
                                    />
                                </div>
                                {/* </div> */}
                            </div>
                        </section>

                        {/* Step 4: Create Login Page */}
                        <section id="create-login" className={`${styles['docs-section']} mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700`}>
                            <div className={styles['section-header']}>
                                <div className={styles['section-badge']}>4</div>
                                <h2 className={styles['section-title']}>Create Login Page</h2>
                            </div>
                            <div className={styles['section-content']}>
                                <div className={styles['placeholder-card']}>
                                    Detailed implementation guide for Create Login Page goes here...
                                </div>
                            </div>
                        </section>

                        {/* Step 5: All Set */}
                        <section id="all-set" className={`${styles['docs-section']} mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700`}>
                            <div className={styles['section-header']}>
                                <div className={styles['section-badge']}>5</div>
                                <h2 className={styles['section-title']}>All Set</h2>
                            </div>
                            <div className={styles['section-content']}>
                                <div className={styles['placeholder-card']}>
                                    Detailed implementation guide for All Set goes here...
                                </div>
                            </div>
                        </section>
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
