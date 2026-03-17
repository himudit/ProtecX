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
        <div className={styles['quickstart-container']}>
            {/* Main Content */}
            <div className={styles['main-content']}>
                <div className={styles['page-header']}>
                    <h1 className={styles['page-title']}>Quick Start</h1>
                    <p className={styles['page-subtitle']}>
                        Everything you need to get your first ProtecX app up and running in minutes.
                    </p>
                </div>

                <div className={styles['section-container']}>
                    <div className={styles['sections-wrapper']}>
                        {/* Step 1: Create Project */}
                        <section id="create-project" className={`${styles['docs-section']} ${styles['animate-step']}`}>
                            <div className={styles['section-header']}>
                                <div className={styles['section-badge']}>1</div>
                                <h2 className={styles['section-title']}>Create project</h2>
                            </div>
                            <div className={styles['section-content']}>
                                <div className={styles['image-container']}>
                                    <p className={styles['text-dimmed']}>
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
                        <section id="install-sdk" className={`${styles['docs-section']} ${styles['animate-step']}`}>
                            <div className={styles['section-header']}>
                                <div className={styles['section-badge']}>2</div>
                                <h2 className={styles['section-title']}>Install SDK</h2>
                            </div>
                            <div className={styles['section-content']}>
                                <div className={styles['code-block-wrapper']}>
                                    <CodeBlock
                                        text="npm i protecX-js"
                                        label="Shell"
                                        language="bash"
                                        filename="Terminal"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Step 3: Import SDK */}
                        <section id="import-sdk" className={`${styles['docs-section']} ${styles['animate-step']}`}>
                            <div className={styles['section-header']}>
                                <div className={styles['section-badge']}>3</div>
                                <h2 className={styles['section-title']}>Import SDK</h2>
                            </div>
                            <div className={styles['section-content']}>
                                <div className={styles['image-container']}>
                                    <p className={styles['text-dimmed']}>
                                        Copy the credentials from the dashboard and paste them in your project.
                                    </p>
                                    <img
                                        src={copyCredentialImg}
                                        alt="Copy Credential"
                                        className={styles['section-image']}
                                    />
                                </div>
                                <p className={styles['text-dimmed']}>
                                    Create a new file <span className={styles['code-inline']}>src/lib/protecx.js </span>
                                    and add the following code to it, replace{" "}

                                    <span className={styles['code-badge']}>
                                        &lt;PROJECT_ID&gt;
                                    </span>{" "}

                                    with your project ID and{" "}

                                    <span className={styles['code-badge']}>
                                        &lt;API_KEY&gt;
                                    </span>{" "}

                                    with your API key.
                                </p>

                                <div className={styles['code-block-wrapper']}>
                                    <CodeBlock
                                        text={`import { ProtecX, ProtecXError } from '@protecx/js';

export const protecx = new ProtecX({
  baseUrl: "https://protecx.onrender.com/api/v1/",
  projectId: "<PROJECT_ID>", // Replace with actual project ID
  apiKey: "<API_KEY>",   // Replace with actual API key
  persistTokens: true // Automatically saves session to localStorage
});`}
                                        label="JS"
                                        language="javascript"
                                        filename="src/lib/protecx.js"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Step 4: Create Login Page */}
                        <section id="create-login" className={`${styles['docs-section']} ${styles['animate-step']}`}>
                            <div className={styles['section-header']}>
                                <div className={styles['section-badge']}>4</div>
                                <h2 className={styles['section-title']}>Create Login Page</h2>
                            </div>
                            <div className={styles['section-content']}>
                                <p className={styles['text-dimmed']}>
                                    Now use the <span className={styles['code-inline']}>protecx</span> instance to handle user authentication in your login component.
                                </p>
                                <div className={styles['code-block-wrapper']}>
                                    <CodeBlock
                                        text={`import { protecx } from '../lib/protecx';
import { ProtecXError } from "@protecx/js";

const handleLogin = async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const { user, session } = await protecx.login({ email, password });
    console.log('Logged in successfully:', user);
    // Redirect to dashboard
  } catch (err) {
      if (err instanceof ProtecXError) {
        if (err.isValidationError()) {
          const fieldErrors = err.getAllFieldErrors();
          const message = fieldErrors?.email || fieldErrors?.password || "Invalid input";
          setError(message);
        } else if (err.isGlobalError()) {
          const globalErr = err.getErrors();
          const message = typeof globalErr === "string" ? globalErr : "Something went wrong";
          setError(message);
        } else {
          setError("Something went wrong");
        }
      } else {
        console.error("Unexpected error", err);
        setError("Unexpected error");
      }
};`}
                                        label="Login.jsx"
                                        language="javascript"
                                        filename="src/pages/Login.jsx"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Step 5: All Set */}
                        <section id="all-set" className={`${styles['docs-section']} ${styles['animate-step']}`}>
                            <div className={styles['section-header']}>
                                <div className={styles['section-badge']}>5</div>
                                <h2 className={styles['section-title']}>All Set</h2>
                            </div>
                            <div className={styles['section-content']}>
                                <p className={styles['text-dimmed']}>
                                    Congratulations! You've successfully integrated ProtecX into your application.
                                </p>
                                {/* <div className={styles['image-container']}>
                                    <h3 className={styles['next-steps-title']}>Next Steps</h3>
                                    <ul className={styles['next-steps-list']}>
                                        <li className={styles['next-steps-item']}>
                                            <div className={styles['next-steps-dot']} />
                                            Configure Custom Email Templates
                                        </li>
                                        <li className={styles['next-steps-item']}>
                                            <div className={styles['next-steps-dot']} />
                                            Enable Two-Factor Authentication
                                        </li>
                                        <li className={styles['next-steps-item']}>
                                            <div className={styles['next-steps-dot']} />
                                            Set up RBAC (Role Based Access Control)
                                        </li>
                                    </ul>
                                </div> */}
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
