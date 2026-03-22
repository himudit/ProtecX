import React, { useState } from 'react';
import { ArrowUpRight, ChevronRight, Play, Sparkles } from 'lucide-react';
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
    LogIn: `import { useState } from "react";
import { protecx } from "./lib/protecx";
import { ProtecXError } from "@protecx/js";

const [formData, setFormData] = useState({
  email: "",
  password: ""
});

const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
const [error, setError] = useState<string | null>(null);
const [loading, setLoading] = useState(false);

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  setFieldErrors({});

  try {
    const session = await protecx.login({
      email: formData.email,
      password: formData.password
    });

    console.log("Logged in successfully:", session.user);

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
};`,
    LogOut: `async function logout() {
    try {
      await protecx.logout();
    } catch {
      // Still clear local state even if the API call fails.
    }
    setUser(null);
  };`,
    Profile: `async function refreshProfile() {
    const session = await protecx.profile();
    setUser(session?.user || session || null);
  }`,
    Refresh: `// Refresh session token
const session = await protecx.refreshToken();`,
    Middleware: `const { ProtecXServer } = require("@protecx/js/server");

const protecxServer = new ProtecXServer({
  publicKeyPEM: (process.env.PROTECX_PUBLIC_KEY || "").replace(/\\n/g, "\n")
});

const sdkMiddleware = protecxServer.middleware();

function requireAuth(req, res, next) {
  sdkMiddleware(req, res, () => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log(req.user);
    req.user.id = req.user.userId || req.user.id || req.user.sub;
    next();
  });
}

module.exports = { requireAuth };
`
  };

  const fileNames: Record<string, string> = {
    SignUp: 'Register.tsx',
    LogIn: 'Login.tsx',
    LogOut: 'Auth.tsx',
    Profile: 'User.tsx',
    Refresh: 'Session.tsx',
    Middleware: 'backend/src/middleware/auth.js'
  };

  return (
    <div className={styles.apiContainer}>
      <div className={styles.heroGrid}>
        <div className={styles.leftContent}>
          <h1 className={styles.title}>Simple APIs</h1>
          <p className={styles.description}>
            APIs that you can understand. With powerful libraries that work on client and server-side applications.
          </p>

          <div className={styles.gettingStartedContainer}>
            <div className={styles.gsHeader}>
              <div className={styles.playContainer}><Play size={14} fill="white" /></div>
              <h2 className={styles.gsTitle}>Getting Started</h2>
            </div>
            <p className={styles.gsDescription}>Set up and connect in just a few minutes.</p>

            <div className={styles.logoGrid}>
              <div className={styles.logoItem}>
                <img src="https://cdn.worldvectorlogo.com/logos/javascript-1.svg" alt="JS" />
              </div>
              <div className={styles.logoItem}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" />
              </div>
              <div className={styles.logoItem}>
                <img src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" alt="NodeJS" />
              </div>
              <div className={styles.logoItem}>
                <img src="https://cdn.worldvectorlogo.com/logos/typescript.svg" alt="TS" />
              </div>
            </div>


          </div>

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
                <button
                  className={`${styles.tab} ${activeTab === 'Middleware' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('Middleware')}
                >
                  Middleware
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

