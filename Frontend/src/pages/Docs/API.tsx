import React, { useState } from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import CodeBlock from '../../components/ui/CodeBlock/CodeBlock';
import styles from './API.module.css';

const API = () => {
  const [activeTab, setActiveTab] = useState('SignUp');
  const codeSnippets: Record<string, string> = {
    SignUp: `import { useState } from "react";
import { protecx } from "./lib/protecx";
import { ProtecXError } from "@protecx/js";

const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  password: ""
});

const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
const [error, setError] = useState<string | null>(null);
const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  setFieldErrors({});

  try {
    const session = await protecx.signup({
      email: formData.email,
      password: formData.password,
      name: formData.fullName
});

    console.log("Welcome!", session.user);

  } catch (err) {
    if (err instanceof ProtecXError) {

      if (err.isValidationError()) {
        setFieldErrors(err.getAllFieldErrors());
      }

      if (err.isGlobalError()) {
        const globalErr = err.getErrors();
        setError(typeof globalErr === "string" ? globalErr : null);
      }

    } else {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    }

  } finally {
    setLoading(false);
  }
};
`,
    LogIn: `// Log in with email and password
const session = await protecx.login({
  email: 'example@email.com',
  password: 'example-password',
})`,
    LogOut: `// Log out the current user
await protecx.logout();`,
    Profile: `// Get current user profile
const profile = await protecx.getProfile();`,
    Refresh: `// Refresh session token
const session = await protecx.refreshToken();`
  };

  const fileNames: Record<string, string> = {
    SignUp: 'Register.tsx',
    LogIn: 'Login.tsx',
    LogOut: 'Auth.tsx',
    Profile: 'User.tsx',
    Refresh: 'Session.tsx'
  };

  return (
    <div className={styles.apiContainer}>
      <div className={styles.heroGrid}>
        <div className={styles.leftContent}>
          <h1 className={styles.title}>Simple APIs</h1>
          <p className={styles.description}>
            APIs that you can understand. With powerful libraries that work on client and server-side applications.
          </p>
          <a href="/docs/overview" className={styles.exploreBtn}>
            <ArrowUpRight size={18} />
            Explore documentation
          </a>

        </div>

        <div className={styles.codeArea}>
          <div className={styles.tabsHeader}>
            <div className={styles.tabsWrapper}>
              <div className={styles.tabs}>
                <button
                  className={`${styles.tab} ${activeTab === 'SignUp' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('SignUp')}
                >
                  Sign up
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'LogIn' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('LogIn')}
                >
                  Log in
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'LogOut' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('LogOut')}
                >
                  Log out
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'Profile' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('Profile')}
                >
                  Profile
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'Refresh' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('Refresh')}
                >
                  Refresh
                </button>
              </div>
              <div className={styles.scrollIndicator}>
                <ChevronRight size={16} />
              </div>
            </div>

          </div>
          <div className={styles.codeContent}>
            <CodeBlock
              text={codeSnippets[activeTab]}
              language="javascript"
              hideHeader={false}
              background="transparent"
              height="400px"
              width="100%" // Control the width here (e.g., "90%", "600px")
              filename={fileNames[activeTab]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default API;

