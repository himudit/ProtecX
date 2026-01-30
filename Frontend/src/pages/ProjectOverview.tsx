import { useParams } from 'react-router-dom';
import { Database, Users, Activity, Clock, User, Eye, EyeOff, Copy, Trash2, Plus } from 'lucide-react';
import ShieldIcon from '../components/Common/ShieldIcon';
import styles from './ProjectOverview.module.css';

export default function ProjectOverview() {
    const { projectId } = useParams();

    // Mock data for the specific project
    const project = {
        id: projectId,
        name: 'E-commerce Platform',
        description: 'Production API for e-commerce platform',
        status: 'active',
        stats: [
            { label: 'Total Requests', value: '1.2M', icon: Activity, color: '#6366f1' },
            { label: 'Active Users', value: '1,250', icon: Users, color: '#10b981' },
            { label: 'Databases', value: '3', icon: Database, color: '#f59e0b' },
            { label: 'Security Score', value: '98%', icon: ShieldIcon, color: '#ef4444' },
        ]
    };

    return (
        <div className={styles['branch-overview']}>

            {/* HEADER */}
            <div className={styles['branch-header']}>
                <div className={styles['branch-title-row']}>
                    <h2 className={styles['branch-title']}>Branch overview</h2>

                    <div className={styles['branch-meta']}>
                        <span className={styles['branch-badge']}>Default</span>
                    </div>
                </div>
            </div>

            {/* METRICS CARD */}
            <div className={styles['overview-card']}>
                <div className={styles['metric-grid']}>
                    <div className={styles['metric-box']}>
                        <div className={styles['metric-label']}>Storage</div>
                        <div className={styles['metric-value']}>38.76 MB</div>
                    </div>

                    <div className={styles['divider']} />

                    <div className={styles['info-item']}>
                        <div className={styles['info-label']}>Created on</div>
                        <div className={styles['info-value']}>
                            2026-01-14 23:22:44 +05:30
                        </div>
                    </div>

                    <div className={styles['divider']} />

                    <div className={styles['info-item']}>
                        <div className={styles['info-label']}>Created by</div>

                        <div className={styles['user-row']}>
                            <div className={styles['user-avatar']}>
                                <User size={16} />
                            </div>
                            <div className={styles['user-name']}>Mudit</div>
                        </div>
                    </div>

                </div>
            </div>

            <div className={styles['keys-wrapper']}>

                {/* PUBLISHABLE KEY */}
                <div className={styles['key-card']}>
                    <h3 className={styles['card-title']}>API Key</h3>
                    <p className={styles['card-description']}>
                        The API Key is used to identify and access your project from client or server applications.
                        This key is safe to expose and can be included in frontend code. It does not grant administrative access and cannot be used to generate or sign tokens.
                    </p>

                    <div className={styles['key-row']}>
                        <span className={styles['key-label']}>apiKey</span>

                        <div className={styles['key-input-row']}>
                            <code className={styles['key-value']}>
                                pk_live_Y2x1cmsub2VyZmFkYS5YSQ
                            </code>
                            <button className={styles['icon-button']}>
                                <Copy size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* SECRET KEYS */}
                <div className={styles['key-card']}>
                    <h3 className={styles['card-title']}>JWT Public Key</h3>
                    <p className={styles['card-description']}>
                        The JWT Public Key is used to verify JSON Web Tokens (JWTs) issued by this project.
                        It is generated using asymmetric cryptography (RS256) and can be safely shared with services that need to validate tokens. This key cannot be used to sign or modify tokens.
                    </p>

                    {/* SECRET KEY ITEM */}
                    <div className={styles['secret-key-row']}>
                        <span className={styles['key-label']}>Default secret key</span>

                        <div className={styles['key-input-row']}>
                            <code className={styles['key-value']}>
                                sk_live_Y2x1cmsub2VyZmFkYS5YSQ
                            </code>

                            <button className={styles['icon-button']}>
                                <Eye size={16} />
                            </button>

                            <button className={styles['icon-button']}>
                                <Copy size={16} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
