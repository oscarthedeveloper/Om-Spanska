'use client';

import {useGrammarMode} from '@/lib/grammar-mode';
import styles from './GrammarModeToggle.module.css';

export default function GrammarModeToggle({mobile = false}: {mobile?: boolean}) {
  const [mode, setMode] = useGrammarMode();

  const toggle = (
    <div
      className={styles.toggleGroup}
      role="radiogroup"
      aria-label="Välj grammatikläge">
      <button
        type="button"
        role="radio"
        aria-checked={mode === 'lattsam'}
        className={`${styles.button} ${mode === 'lattsam' ? styles.buttonActive : ''}`}
        onClick={() => setMode('lattsam')}
        title="Lättsam">
        <span className={styles.icon} aria-hidden="true">☕</span>
        <span className={styles.label}>Lättsam</span>
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={mode === 'rigoros'}
        className={`${styles.button} ${mode === 'rigoros' ? styles.buttonActive : ''}`}
        onClick={() => setMode('rigoros')}
        title="Rigorös">
        <span className={styles.icon} aria-hidden="true">🔬</span>
        <span className={styles.label}>Rigorös</span>
      </button>
    </div>
  );

  if (mobile) {
    return (
      <div className={styles.mobileContainer}>
        <p className={styles.mobileLabel}>Grammatikläge</p>
        <p className={styles.mobileDesc}>
          {mode === 'lattsam'
            ? '☕ Lättsam: Grundläggande grammatik och övningar.'
            : '🔬 Rigorös: Fullständigt referensverk.'}
        </p>
        {toggle}
      </div>
    );
  }

  return toggle;
}
