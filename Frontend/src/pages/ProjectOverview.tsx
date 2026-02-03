import { useParams } from 'react-router-dom';
import { Database, Users, Activity, Clock, Eye, EyeOff, Copy, Trash2, Plus, Check } from 'lucide-react';
import { Avatar } from '../components/ui/Avatar/Avatar';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { getProjectById } from '../services/project.api';
import type { ProjectMetaResponseDto } from '../modules/projectById/dto/projectMeta-response.dto';
import type { ProjectResponseDto } from '../modules/project/dto/project-response.dto';
import SkeletonDiv from '../components/ui/Skeleton/SkeletonDiv/SkeletonDiv';
import styles from './ProjectOverview.module.css';

export default function ProjectOverview() {
    const { projectId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [projectData, setProjectData] = useState<ProjectMetaResponseDto | null>(null);
    const user = useSelector((state: RootState) => state.auth.user);
    const [showApiKey, setShowApiKey] = useState(false);
    const [showJwtKey, setShowJwtKey] = useState(false);
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const copyToClipboard = (text: string, keyId: string) => {
        navigator.clipboard.writeText(text);
        setCopiedKey(keyId);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    const getStatusClass = (status: string | undefined) => {
        if (!status) return '';
        switch (status.toUpperCase()) {
            case 'ACTIVE': return styles['status-active'];
            case 'INACTIVE': return styles['status-inactive'];
            case 'ARCHIVED': return styles['status-archived'];
            default: return '';
        }
    };

    useEffect(() => {
        fetchProject();
    }, [projectId]);

    const fetchProject = async () => {
        if (!projectId) {
            console.warn("ProjectOverview: No projectId found in params");
            return;
        }
        try {
            setIsLoading(true);
            console.log("ProjectOverview: Fetching project for ID:", projectId);
            const res = await getProjectById(projectId);
            console.log("ProjectOverview: Received response:", res);
            if (res && res.data) {
                setProjectData(res.data);
            }
        } catch (err) {
            console.error("ProjectOverview: Error fetching project:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles['branch-overview']}>

            {/* HEADER */}
            <div className={styles['branch-header']}>
                <div className={styles['branch-title-row']}>
                    <h2 className={styles['branch-title']}>
                        {isLoading ? <SkeletonDiv width="250px" height="36px" /> : (projectData?.project.name || 'Project Overview')}
                    </h2>

                    <div className={styles['branch-meta']}>
                        {isLoading ? (
                            <SkeletonDiv width="80px" height="24px" borderRadius="999px" />
                        ) : (
                            <span className={`${styles['branch-badge']} ${getStatusClass(projectData?.project.status)}`}>
                                {projectData?.project.status || 'Active'}
                            </span>
                        )}
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
                            {isLoading ? (
                                <SkeletonDiv width="150px" height="18px" />
                            ) : (
                                projectData?.project.createdAt ? new Date(projectData.project.createdAt).toLocaleString() : 'N/A'
                            )}
                        </div>
                    </div>

                    <div className={styles['divider']} />

                    <div className={styles['info-item']}>
                        <div className={styles['info-label']}>Created by</div>

                        <div className={styles['user-row']}>
                            {isLoading ? (
                                <SkeletonDiv width="100px" height="18px" />
                            ) : (
                                <>
                                    <div className={styles['user-avatar']}>
                                        <Avatar name={user?.name || 'Owner'} size={24} />
                                    </div>
                                    <div className={styles['user-name']}>
                                        {user?.name || 'Owner'}
                                    </div>
                                </>
                            )}
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
                                {isLoading ? (
                                    <SkeletonDiv width="100%" height="18px" />
                                ) : (
                                    showApiKey ? (projectData?.apiKey.apiKey || 'N/A') : '••••••••••••••••••••••••••••'
                                )}
                            </code>
                            <button className={styles['icon-button']} onClick={() => setShowApiKey(!showApiKey)}>
                                {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                            <button className={styles['icon-button']} onClick={() => projectData?.apiKey.apiKey && copyToClipboard(projectData.apiKey.apiKey, 'api')}>
                                {copiedKey === 'api' ? <Check size={16} style={{ color: '#10b981' }} /> : <Copy size={16} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* SECRET KEYS (JWT Public Key) */}
                <div className={styles['key-card']}>
                    <h3 className={styles['card-title']}>JWT Public Key</h3>
                    <p className={styles['card-description']}>
                        The JWT Public Key is used to verify JSON Web Tokens (JWTs) issued by this project.
                        It is generated using asymmetric cryptography (RS256) and can be safely shared with services that need to validate tokens. This key cannot be used to sign or modify tokens.
                    </p>

                    {/* SECRET KEY ITEM */}
                    <div className={styles['public-key-container']}>
                        <div className={styles['key-label-row']}>
                            <span className={styles['key-label']}>Public Key</span>
                            <div className={styles['key-actions']}>
                                <button className={styles['icon-button']} onClick={() => setShowJwtKey(!showJwtKey)}>
                                    {showJwtKey ? <EyeOff size={16} /> : <Eye size={16} />}
                                    <span>{showJwtKey ? 'Hide' : 'Show'}</span>
                                </button>
                                <button className={styles['icon-button']} onClick={() => projectData?.jwtKey.publicKey && copyToClipboard(projectData.jwtKey.publicKey, 'jwt')}>
                                    {copiedKey === 'jwt' ? <Check size={16} style={{ color: '#10b981' }} /> : <Copy size={16} />}
                                    <span>{copiedKey === 'jwt' ? 'Copied' : 'Copy'}</span>
                                </button>
                            </div>
                        </div>

                        <div className={styles['public-key-box']}>
                            <code className={styles['public-key-value']}>
                                {isLoading ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <SkeletonDiv width="100%" />
                                        <SkeletonDiv width="95%" />
                                        <SkeletonDiv width="98%" />
                                        <SkeletonDiv width="90%" />
                                    </div>
                                ) : (
                                    showJwtKey
                                        ? (projectData?.jwtKey.publicKey || 'N/A')
                                        : (projectData?.jwtKey.publicKey
                                            ? projectData.jwtKey.publicKey.substring(0, 150) + '...'
                                            : 'N/A')
                                )}
                            </code>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
