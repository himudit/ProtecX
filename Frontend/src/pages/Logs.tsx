import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectLogs } from "../services/project.api";
import { useRelativeTime } from "../utils/useRelativeTime";
import styles from "./Logs.module.css";
import { Activity, RefreshCw } from "lucide-react";

interface LogEntry {
    id: string;
    projectId: string;
    endpoint: string;
    requestType: string;
    statusCode: number;
    message: string;
    error: boolean;
    createdAt: string;
}

const STATUS_COLOR_MAP: Record<string, string> = {
    '2': '#10b981', // 2xx - Success
    '3': '#0ea5e9', // 3xx - Redirection
    '4': '#f59e0b', // 4xx - Client Error
    '5': '#ef4444', // 5xx - Server Error
};

const METHOD_COLOR_MAP: Record<string, string> = {
    'GET': '#3b82f6',
    'POST': '#10b981',
    'PUT': '#eab308',
    'DELETE': '#ef4444',
    'PATCH': '#a855f7',
};

export default function Logs() {
    const { projectId } = useParams<{ projectId: string }>();
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchLogs = async () => {
        if (!projectId) return;
        try {
            setIsLoading(true);
            const response = await getProjectLogs(projectId);
            if (response.success) {
                setLogs(response.data);
            }
        } catch (error) {
            console.error("Error fetching logs:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [projectId]);

    const getStatusColor = (code: number) => {
        const range = Math.floor(code / 100).toString();
        return STATUS_COLOR_MAP[range] || '#888888';
    };

    const getMethodColor = (method: string) => {
        return METHOD_COLOR_MAP[method.toUpperCase()] || '#888888';
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).replace(',', '') + '.' + date.getMilliseconds().toString().padStart(3, '0');
    };

    return (
        <div className={styles['logs-container']}>
            <div className={styles['page-header']}>
                <div>
                    <h1 className={styles.title}>Project Logs</h1>
                    <p className={styles.subtitle}>Real-time traffic and event logs for your project</p>
                </div>
                <button
                    className={styles['refresh-btn']}
                    onClick={fetchLogs}
                    disabled={isLoading}
                    title="Refresh Logs"
                >
                    <RefreshCw size={18} className={isLoading ? styles.spinning : ''} />
                </button>
            </div>

            <div className={styles['logs-card']}>
                <div className={styles['logs-header']}>
                    <div style={{ minWidth: '220px' }} title="Server Time (Local)">TIMESTAMP</div>
                    <span className={styles.separator}>|</span>
                    <div style={{ minWidth: '60px' }} title="HTTP Request Method">METHOD</div>
                    <span className={styles.separator}>|</span>
                    <div style={{ flex: 1.2 }} title="Resource Endpoint">ENDPOINT</div>
                    <span className={styles.separator}>|</span>
                    <div style={{ minWidth: '40px', textAlign: 'left' }} title="HTTP Response Status Code">STATUS</div>
                    <span className={styles.separator}>|</span>
                    <div style={{ flex: 1 }} title="Response Message or Payload">MESSAGE</div>
                </div>

                <div className={styles['log-list']}>
                    {isLoading ? (
                        <div className={styles['loading-container']}>
                            <div className={styles.loader}></div>
                            <span>Fetching latest logs...</span>
                        </div>
                    ) : logs.length === 0 ? (
                        <div className={styles['empty-state']}>
                            <Activity size={48} strokeWidth={1} style={{ marginBottom: '16px' }} />
                            <p>No logs found for this project yet.</p>
                        </div>
                    ) : (
                        logs.map((log) => (
                            <div key={log.id} className={styles['log-item']}>
                                <div className={styles.timestamp} title={`Relative: ${useRelativeTime(log.createdAt)}`}>
                                    {formatDate(log.createdAt)}
                                </div>
                                <span className={styles.separator}>|</span>
                                <div
                                    className={styles.method}
                                    style={{ color: getMethodColor(log.requestType) }}
                                    title={`Request Type: ${log.requestType}`}
                                >
                                    {log.requestType.toUpperCase()}
                                </div>
                                <span className={styles.separator}>|</span>
                                <div className={styles.endpoint} title={log.endpoint}>
                                    "{log.endpoint}"
                                </div>
                                <span className={styles.separator}>|</span>
                                <div
                                    className={styles['status-code']}
                                    style={{ color: getStatusColor(log.statusCode) }}
                                    title={`Status Code: ${log.statusCode}`}
                                >
                                    {log.statusCode}
                                </div>
                                <span className={styles.separator}>|</span>
                                <div className={styles.message} title={log.message}>
                                    {log.message}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
