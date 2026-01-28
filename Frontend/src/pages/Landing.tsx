import { ArrowRight, Database, Lock, HardDrive, Code, Globe } from 'lucide-react';
import ShieldIcon from '../components/Common/ShieldIcon';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CodeBlock, IconButton, createShikiAdapter } from "@chakra-ui/react"
import type { HighlighterGeneric } from "shiki"
import Navbar from './Navbar';
import styles from './Landing.module.css';

const shikiAdapter = createShikiAdapter<HighlighterGeneric<any, any>>({
  async load() {
    const { createHighlighter } = await import("shiki")
    return createHighlighter({
      langs: ["tsx", "scss", "html", "bash", "json"],
      themes: ["github-dark"],
    })
  },
  theme: "github-dark",
})

const file = {
  code: `<div class="container">
  <h1>Hello, world!</h1>
</div>`,
  language: "tsx",
  title: "example.ts",
}

export default function Landing() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
      icon: ShieldIcon,
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
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <div
          className={`${styles['gradient-orb']} ${styles['orb-2']}`}
          style={{
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`,
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
            Build <span className={styles.strikethrough}>faster</span> <span className={styles['fastest-text']}>fastest</span> backend with <span className={styles['gradient-text']}>Shield</span>
          </h1>
          <p className={styles['hero-description']}>
            Shield is a backend platform that gives you everything you need to build modern apps.
            <br />
            Database, authentication, storage, and edge functions, all in one place.
          </p>
          <div className={styles['hero-cta']}>
            <Link to="/dashboard" className={styles['cta-primary']}>
              Start Building
              <ArrowRight size={20} />
            </Link>
            <a href="#code" className={styles['cta-secondary']}>
              View Code Example
            </a>
          </div>
          <div className={styles['hero-note']}>
            Free tier available • No credit card required
          </div>
        </div>
      </section>

      {/* Code Preview Section */}
      <section id="code" className={styles['code-section']}>
        <div className={styles['code-container']}>
          <CodeBlock.AdapterProvider value={shikiAdapter}>
            <CodeBlock.Root code={file.code} language={file.language} variant="subtle">
              <CodeBlock.Header>
                <CodeBlock.Title>{file.title}</CodeBlock.Title>
                <CodeBlock.CopyTrigger asChild>
                  <IconButton variant="ghost" size="2xs">
                    <CodeBlock.CopyIndicator />
                  </IconButton>
                </CodeBlock.CopyTrigger>
              </CodeBlock.Header>
              <CodeBlock.Content>
                <CodeBlock.Code>
                  <CodeBlock.CodeText />
                </CodeBlock.Code>
              </CodeBlock.Content>
            </CodeBlock.Root>
          </CodeBlock.AdapterProvider>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className={styles['features-section']}>
        <div className={styles['features-container']}>
          <div className={styles['section-header']}>
            <h2 className={styles['section-title']}>What Shield provides</h2>
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

      {/* CTA Section */}
      <section className={styles['cta-section']}>
        <div className={styles['cta-container']}>
          <h2 className={styles['cta-title']}>Ready to get started?</h2>
          <p className={styles['cta-description']}>
            Create your project and start building in minutes.
          </p>
          <Link to="/dashboard" className={styles['cta-button']}>
            Create Project
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles['landing-footer']}>
        <div className={styles['footer-container']}>
          <div className={styles['footer-brand']}>
            <div className={styles['footer-logo']}>
              <ShieldIcon size={20} />
              <span>Shield</span>
            </div>
            <p className={styles['footer-tagline']}>Backend as a Service</p>
          </div>
          <div className={styles['footer-links']}>
            <div className={styles['footer-column']}>
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#docs">Documentation</a>
            </div>
            <div className={styles['footer-column']}>
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Blog</a>
            </div>
          </div>
        </div>
        <div className={styles['footer-bottom']}>
          <p>© 2024 Shield</p>
        </div>
      </footer>
    </div>
  );
}
