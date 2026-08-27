import React from 'react';
import styles from './BrowserWindow.module.css';

const BrowserWindow = ({ title, children }) => {
  return (
    <div className={styles.browserWindow}>
      <div className={styles.browserHeader}>
        <div className={styles.browserControls}>
          <span className={`${styles.control} ${styles.red}`}></span>
          <span className={`${styles.control} ${styles.yellow}`}></span>
          <span className={`${styles.control} ${styles.green}`}></span>
        </div>
        <div className={styles.browserTitle}>
          {title}
        </div>
      </div>
      <div className={styles.browserContent}>
        {children}
      </div>
    </div>
  );
};

export default BrowserWindow;
