import { useParams } from 'react-router-dom';
import { Database, Users, Activity, Clock, User, Eye, EyeOff, Copy, Trash2, Plus } from 'lucide-react';
import ShieldIcon from '../components/Common/ShieldIcon';
import styles from './ProjectOverview.module.css';
import { useEffect, useState } from 'react';
import { getProjectById } from '../services/project.api';
import type { ProjectMetaResponseDto } from '../modules/projectById/dto/projectMeta-response.dto';
import type { ProjectResponseDto } from '../modules/project/dto/project-response.dto';

// export interface Project {
//     id: string;
//     name: string;
//     description: string;
//     createdAt: Date;
//     updatedAt: Date;
//     ownerId: string;
// }

export default function ProjectOverview() {
    const { projectId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [projectData, setProjectData] = useState<ProjectMetaResponseDto | null>(null);

    useEffect(() => {
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

        fetchProject();
    }, [projectId]);

    return (
        <div className={styles['branch-overview']}>

            {/* HEADER */}
            <div className={styles['branch-header']}>
                <div className={styles['branch-title-row']}>
                    <h2 className={styles['branch-title']}>{projectData?.project.name || 'Project Overview'}</h2>

                    <div className={styles['branch-meta']}>
                        <span className={styles['branch-badge']}>{projectData?.project.status || 'Active'}</span>
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
                            {projectData?.project.createdAt ? new Date(projectData.project.createdAt).toLocaleString() : 'Loading...'}
                        </div>
                    </div>

                    <div className={styles['divider']} />

                    <div className={styles['info-item']}>
                        <div className={styles['info-label']}>Created by</div>

                        <div className={styles['user-row']}>
                            <div className={styles['user-avatar']}>
                                <User size={16} />
                            </div>
                            <div className={styles['user-name']}>{projectData?.project.ownerId || 'Owner'}</div>
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
                                {projectData?.apiKey.apiKey || 'Loading...'}
                            </code>
                            <button className={styles['icon-button']}>
                                <Copy size={16} />
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
                    <div className={styles['secret-key-row']}>
                        <span className={styles['key-label']}>Public Key</span>

                        <div className={styles['key-input-row']}>
                            <code className={styles['key-value']} style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap', fontSize: '12px' }}>
                                {projectData?.jwtKey.publicKey || 'Loading...'}
                            </code>

                            <button className={styles['icon-button']}>
                                <Eye size={16} />
                            </button>

                            <button className={styles['icon-button']} onClick={() => {
                                if (projectData?.jwtKey.publicKey) {
                                    navigator.clipboard.writeText(projectData.jwtKey.publicKey);
                                }
                            }}>
                                <Copy size={16} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
