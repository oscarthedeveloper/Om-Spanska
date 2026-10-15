import type {ReactNode} from 'react';
import styles from './Rigoros.module.css';

export default function Rigoros({children}: {children: ReactNode}) {
  return (
    <div className={styles.rigorosBlock} data-rigoros-block="true">
      <div className={styles.header}>
        <span className={styles.badge}>🔬 Fördjupning (Rigorös)</span>
      </div>
      {children}
    </div>
  );
}
