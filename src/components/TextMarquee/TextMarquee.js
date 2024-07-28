import React from 'react';
import styles from './TextMarquee.module.css';

const TextMarquee = () => {
  return (
    <div className={styles.marqueeWrapper}>
      <div className={styles.marqueeContent}>
        <span className={styles.marqueeText}>omspanska.se</span>
      </div>
    </div>
  );
};

export default TextMarquee;
