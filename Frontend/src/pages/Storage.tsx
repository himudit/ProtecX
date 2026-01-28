import { Upload, Folder, File, HardDrive } from 'lucide-react';
import styles from './Storage.module.css';

export default function Storage() {
  const buckets = [
    { name: 'images', files: 1240, size: '12.4 GB', updated: '1 hour ago' },
    { name: 'documents', files: 342, size: '2.1 GB', updated: '3 hours ago' },
    { name: 'videos', files: 89, size: '45.8 GB', updated: '1 day ago' },
    { name: 'backups', files: 12, size: '8.3 GB', updated: '2 days ago' },
  ];

  return (
    <div className={styles['storage-page']}>
      <div className={styles['page-header']}>
        <div>
          <h1 className={styles['page-title']}>Storage</h1>
          <p className={styles['page-subtitle']}>Manage your file storage buckets</p>
        </div>
        <button className={styles['primary-btn']}>
          <Upload size={18} />
          <span>Upload Files</span>
        </button>
      </div>

      <div className={styles['storage-overview']}>
        <div className={styles['storage-card']}>
          <HardDrive size={24} />
          <div>
            <h3>68.6 GB</h3>
            <p>Total Storage Used</p>
            <div className={styles['storage-bar']}>
              <div className={styles['storage-progress']} style={{ width: '68%' }}></div>
            </div>
            <span className={styles['storage-limit']}>of 100 GB limit</span>
          </div>
        </div>
      </div>

      <div className={styles['buckets-section']}>
        <div className={styles['section-header']}>
          <h2>Buckets</h2>
          <button className={styles['secondary-btn']}>
            <Folder size={18} />
            <span>New Bucket</span>
          </button>
        </div>
        <div className={styles['buckets-grid']}>
          {buckets.map((bucket) => (
            <div key={bucket.name} className={styles['bucket-card']}>
              <div className={styles['bucket-header']}>
                <div className={styles['bucket-icon']}>
                  <Folder size={24} />
                </div>
                <h3 className={styles['bucket-name']}>{bucket.name}</h3>
              </div>
              <div className={styles['bucket-stats']}>
                <div className={styles['bucket-stat']}>
                  <File size={16} />
                  <span>{bucket.files.toLocaleString()} files</span>
                </div>
                <div className={styles['bucket-stat']}>
                  <HardDrive size={16} />
                  <span>{bucket.size}</span>
                </div>
              </div>
              <div className={styles['bucket-footer']}>
                <span className={styles['bucket-updated']}>Updated {bucket.updated}</span>
                <button className={styles['text-link']}>View Files</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
