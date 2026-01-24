import { ArrowRight, Shield, Database, Lock, HardDrive, Code, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

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
      icon: Shield,
      title: 'Security',
      description: 'SSL everywhere, encryption at rest. SOC 2 compliant infrastructure.',
    },
  ];

  return (
    <div className="landing-page">
      {/* Background */}
      <div className="landing-bg">
        <div
          className="gradient-orb orb-1"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <div
          className="gradient-orb orb-2"
          style={{
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`,
          }}
        />
        <div className="grid-pattern" />
      </div>

      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-icon">
              <Shield size={24} onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
            </div>
            <span className="logo-text cursor-pointer" onClick={() => navigate('/')}>Shield</span>
          </div>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#docs" className="nav-link">Docs</a>
          </div>
          <div className="nav-actions">
            <Link to="/dashboard" className="nav-link-btn">Sign In</Link>
            <Link to="/dashboard" className="nav-primary-btn">
              Get Started
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">
            Build <span className="strikethrough">faster</span> <span className="fastest-text">fastest</span> backend with <span className="gradient-text">Shield</span>
          </h1>
          <p className="hero-description">
            Shield is a backend platform that gives you everything you need to build modern apps.
            <br />
            Database, authentication, storage, and edge functions, all in one place.
          </p>
          <div className="hero-cta">
            <Link to="/dashboard" className="cta-primary">
              Start Building
              <ArrowRight size={20} />
            </Link>
            <a href="#code" className="cta-secondary">
              View Code Example
            </a>
          </div>
          <div className="hero-note">
            Free tier available • No credit card required
          </div>
        </div>
      </section>

      {/* Code Preview Section */}
      <section id="code" className="code-section">
        <div className="code-container">
          <div className="code-window">
            <div className="code-header">
              <div className="code-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="code-title">example.ts</span>
            </div>
            <div className="code-content">
              <pre>
                <code>
                  {`import { createClient } from '@shield/client'

const shield = createClient(
  'https://your-project.shield.io',
  'your-anon-key'
)

// Query database
const { data } = await shield
  .from('users')
  .select('*')
  .eq('status', 'active')

// Real-time subscription
shield
  .channel('messages')
  .on('INSERT', (payload) => {
    console.log('New message:', payload)
  })
  .subscribe()`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="features-section">
        <div className="features-container">
          <div className="section-header">
            <h2 className="section-title">What Shield provides</h2>
            <p className="section-description">
              Everything you need to build your backend, without managing infrastructure.
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="feature-card">
                  <div className="feature-icon">
                    <Icon size={24} />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to get started?</h2>
          <p className="cta-description">
            Create your project and start building in minutes.
          </p>
          <Link to="/dashboard" className="cta-button">
            Create Project
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <Shield size={20} />
              <span>Shield</span>
            </div>
            <p className="footer-tagline">Backend as a Service</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#docs">Documentation</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Blog</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Shield</p>
        </div>
      </footer>
    </div>
  );
}
