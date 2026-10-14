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
        title="Lättsam: grundläggande och praktisk grammatik">
        <span className={styles.icon} aria-hidden="true">☕</span>
        <span>Lättsam</span>
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={mode === 'rigoros'}
        className={`${styles.button} ${mode === 'rigoros' ? styles.buttonActive : ''}`}
        onClick={() => setMode('rigoros')}
        title="Rigorös: fullständigt uppslagsverk med alla regler och fördjupningar">
        <span className={styles.icon} aria-hidden="true">🔬</span>
        <span>Rigorös</span>
      </button>
    </div>
  );

  if (mobile) {
    return (
      <div className={styles.mobileContainer}>
        <p className={styles.mobileLabel}>Grammatikläge</p>
        {toggle}
      </div>
    );
  }

  return toggle;
}
