import type {ReactNode} from 'react';
import styles from './BrowserWindow.module.css';

export default function BrowserWindow({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.window}>
      <div className={styles.header}>
        <span className={styles.dots} aria-hidden="true">
          <i /><i /><i />
        </span>
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
