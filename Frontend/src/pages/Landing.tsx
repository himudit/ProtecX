import Navbar from './Navbar';
import styles from './Landing.module.css';
import FAQ from '../components/FAQ/FAQ';
import MiniQuickStart from '../components/MiniQuickStart/MiniQuickStart';

import { ArrowRight, Database, Lock, HardDrive, Code, Globe, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initLenis, destroyLenis } from '../utils/lenis';

export default function Landing() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      document.documentElement.style.setProperty('--mouse-x', `${x}`);
      document.documentElement.style.setProperty('--mouse-y', `${y}`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    initLenis();
    return () => {
      destroyLenis();
    };
  }, []);

  const features = [
    {
      icon: Database,
      title: 'Database',
      description: 'PostgreSQL database with real-time subscriptions. Migrations, backups, and point-in-time recovery.',
    },
    {
      icon: Lock,
      title: 'Auth',
      description: 'User authentication with email, OAuth providers, and magic links. Row-level security policies.',
    },
    {
      icon: HardDrive,
      title: 'Storage',
      description: 'File storage with CDN delivery. Image transformations and automatic optimization.',
    },
    {
      icon: Code,
      title: 'Edge Functions',
      description: 'Deploy TypeScript functions at the edge. Auto-scaling and global distribution.',
    },
    {
      icon: Globe,
      title: 'Realtime',
      description: 'Subscribe to database changes. Broadcast messages to connected clients.',
    },
    {
      icon: () => <img src="/X.png" alt="Security" style={{ width: '24px', height: '24px' }} />,
      title: 'Security',
      description: 'SSL everywhere, encryption at rest. SOC 2 compliant infrastructure.',
    },
  ];

  return (
    <div className={styles['landing-page']}>
      {/* Background */}
      <div className={styles['landing-bg']}>
        <div
          className={`${styles['gradient-orb']} ${styles['orb-1']}`}
          style={{
            transform: `translate(calc(var(--mouse-x, 0) * 20px), calc(var(--mouse-y, 0) * 20px))`,
          }}
        />
        <div
          className={`${styles['gradient-orb']} ${styles['orb-2']}`}
          style={{
            transform: `translate(calc(var(--mouse-x, 0) * -30px), calc(var(--mouse-y, 0) * -30px))`,
          }}
        />
        <div className={styles['grid-pattern']} />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className={styles['hero-section']}>
        <div className={styles['hero-container']}>
          <h1 className={styles['hero-title']}>
            Build <span className={styles.strikethrough}>faster</span> <span className={styles['fastest-text']}>fastest</span> authentication with <span className={styles['gradient-text']}>ProtecX</span>
          </h1>
          <p className={styles['hero-description']}>
            ProtecX is a production-ready authentication platform for modern applications.
            <br />
            Handle users, sessions, tokens, and security with a simple API.
          </p>
        </div>
      </section>

      <div className={styles['hero-cta']}>
        <Link to="/dashboard/quickstart" className={styles['cta-primary']}>
          Get Started
          <ArrowRight size={20} />
        </Link>
        <Link to="/dashboard/projects" className={styles['cta-secondary']}>
          Create Project
        </Link>
      </div>

      {/* Dashboard Preview Section */}
      <section id="dashboard" className={styles['dashboard-section']}>
        <div className={styles['dashboard-container']}>
          <div className={styles['dashboard-glow']} />
          <div className={styles['dashboard-image-wrapper']}>
            <img
              src="/Dashboard-img.png"
              alt="ProtecX Dashboard"
              className={styles['dashboard-img']}
            />
          </div>
        </div>
      </section>

      {/* Mini Quickstart */}
      <MiniQuickStart />

      {/* Features Grid */}
      <section id="features" className={styles['features-section']}>
        <div className={styles['features-container']}>
          <div className={styles['section-header']}>
            <h2 className={styles['section-title']}>What ProtecX provides</h2>
            <p className={styles['section-description']}>
              Everything you need to build your backend, without managing infrastructure.
            </p>
          </div>
          <div className={styles['features-grid']}>
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className={styles['feature-card']}>
                  <div className={styles['feature-icon']}>
                    <Icon size={24} />
                  </div>
                  <h3 className={styles['feature-title']}>{feature.title}</h3>
                  <p className={styles['feature-description']}>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className={styles['cta-section']}>
        <div className={styles['cta-container']}>
          <h2 className={styles['cta-title']}>Ready to get started?</h2>
          <p className={styles['cta-description']}>
            Create your project and start building in minutes.
          </p>
          <Link to="/dashboard/projects" className={styles['cta-button']}>
            Create Project
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles['landing-footer']}>
        <div className={styles['footer-main']}>
          <div className={styles['footer-left']}>
            <div className={styles['social-icons']}>
              <a href="https://github.com/himudit/ProtecX" target="_blank" rel="noopener noreferrer" className={styles['social-icon']} aria-label="GitHub"><Github size={20} /></a>
              <a href="https://linkedin.com/in/mudit-garg-03m" target="_blank" rel="noopener noreferrer" className={styles['social-icon']} aria-label="LinkedIn"><Linkedin size={20} /></a>
            </div>
            <div className={styles['footer-logo-container']}>
            </div>
          </div>

          <div className={styles['footer-right']}>
            <div className={styles['footer-col']}>
              <h4>MENU</h4>
              <a href="/#features" className={styles['disabled-link']}>Product</a>
              <a href="/docs/overview" className={styles['disabled-link']}>Docs</a>
              <a href="/#faq" className={styles['disabled-link']}>FAQ</a>
            </div>
            <div className={styles['footer-col']}>
              <h4>COMPANY</h4>
              <a href="#" className={styles['disabled-link']}>About</a>
              <a href="#" className={styles['disabled-link']}>Blog</a>
              <a href="#" className={styles['disabled-link']}>Careers</a>
            </div>
            <div className={styles['footer-col']}>
              <h4>LEGAL</h4>
              <a href="#" className={styles['disabled-link']}>Terms</a>
              <a href="#" className={styles['disabled-link']}>Privacy</a>
              <a href="#" className={styles['disabled-link']}>Security</a>
            </div>
          </div>
        </div>

        <div className={styles['footer-divider-container']}>
          <div className={styles['footer-divider']} />
          <Link to="/signup" className={styles['footer-cta-btn']}>Get Started</Link>
        </div>

        <div className={styles['footer-bottom']}>
          <div className={styles['footer-tagline-container']}>
            <p className={styles['footer-tagline-text']}>
              From security to seamless integration. Our expert<br />
              team is here to elevate your app and connect you<br />
              with your users securely.
            </p>
          </div>
          <div className={styles['footer-legal-links']}>
            <a href="#" className={styles['disabled-link']}>TERMS & CONDITIONS</a>
            <a href="#" className={styles['disabled-link']}>PRIVACY POLICY</a>
          </div>
        </div>

        <div className={styles['footer-bg-text']}>
          PROTECX
        </div>
      </footer>
    </div>
  );
}
