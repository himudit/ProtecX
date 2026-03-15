import React from "react";
import styles from './MiniQuickStart.module.css';
import createProjectImg from '../../assets/QuickStart/create_project.png';
import copyCredentialImg from '../../assets/QuickStart/copy_credential.png';
import CodeBlock from "../ui/CodeBlock/CodeBlock";

const MiniQuickStart = () => {
    return (
        <section className={styles.miniQuickstartSection}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>It's that easy</h2>
                    <p className={styles.subtitle}>Get your first app running in minutes.</p>
                </div>

                <div className={styles.stepsContainer}>

                    {/* Step 1: Text Left, Image Right */}
                    <div className={styles.stepRow}>
                        <div className={styles.textContent}>
                            <h3>Create project</h3>
                            <p className={styles.textDimmed}>
                                Head over to the dashboard to create a new project.
                                It takes less than a minute to set up your database, authentication, and storage.
                            </p>
                        </div>
                        <div className={styles.stepBadge}>1</div>
                        <div className={styles.mediaContent}>
                            <div className={styles.imageContainer}>
                                <img src={createProjectImg} alt="Create Project" className={styles.stepImage} />
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Image Left (reversed), Text Right */}
                    <div className={`${styles.stepRow} ${styles.rowReversed}`}>
                        <div className={styles.textContent}>
                            <h3>Install SDK</h3>
                            <p className={styles.textDimmed}>
                                Install the ProtecX JavaScript SDK via npm into your application.
                                It's a lightweight wrapper around our robust APIs.
                            </p>
                        </div>
                        <div className={styles.stepBadge}>2</div>
                        <div className={styles.mediaContent}>
                            <div className={styles.codeWrapper}>
                                <CodeBlock text="npm i @protecx/js" label="Shell" language="bash" filename="Terminal" />
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Text Left, Image Right */}
                    <div className={styles.stepRow}>
                        <div className={styles.textContent}>
                            <h3>Import SDK</h3>
                            <p className={styles.textDimmed}>
                                Grab your API keys from the project settings and initialize the client
                                to securely connect your app to ProtecX.
                            </p>
                        </div>
                        <div className={styles.stepBadge}>3</div>
                        <div className={styles.mediaContent}>
                            <div className={styles.codeWrapper}>
                                <CodeBlock
                                    text={`import { ProtecX } from '@protecx/js';\n\nexport const protecx = new ProtecX({\n  baseUrl: "https://api.protecx.com/v1/",\n  projectId: "<YOUR_PROJECT_ID>",\n  apiKey: "<YOUR_API_KEY>"\n});`}
                                    label="JS"
                                    language="javascript"
                                    filename="src/lib/protecx.js"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Step 4: Image Left, Text Right (reversed) */}
                    {/* <div className={`${styles.stepRow} ${styles.rowReversed}`}>
                        <div className={styles.textContent}>
                            <div className={styles.stepBadge}>4</div>
                            <h3>Create Login Page</h3>
                            <p className={styles.textDimmed}>
                                Use the instance to authenticate users easily. Just call your authentication
                                function within your form handlers and you're good to go!
                            </p>
                        </div>
                        <div className={styles.mediaContent}>
                            <div className={styles.codeWrapper}>
                                <CodeBlock
                                    text={`import { protecx } from '../lib/protecx';\n\nasync function handleLogin(email, password) {\n  try {\n    const { user } = await protecx.login({ email, password });\n    console.log('Success!', user);\n  } catch (err) {\n    console.error('Failed:', err.message);\n  }\n}`}
                                    label="Login.jsx"
                                    language="javascript"
                                    filename="Login.jsx"
                                />
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        </section>
    );
};

export default MiniQuickStart;
