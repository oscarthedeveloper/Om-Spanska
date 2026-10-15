'use client';

import {useGrammarMode} from '@/lib/grammar-mode';
import styles from './GrammarModeToggle.module.css';

export default function GrammarModeToggle({mobile = false}: {mobile?: boolean}) {
  const [mode, setMode] = useGrammarMode();

  const toggle = (
    <div
      className={styles.toggleGroup}
      role="radiogroup"
      aria-label="Välj målgrupp och grammatikläge">
      <button
        type="button"
        role="radio"
        aria-checked={mode === 'lattsam'}
        className={`${styles.button} ${mode === 'lattsam' ? styles.buttonActive : ''}`}
        onClick={() => setMode('lattsam')}
        title="Lättsam: anpassad för högstadiet (steg 1–2). Enkel, ren basgrammatik.">
        <span className={styles.icon} aria-hidden="true">☕</span>
        <span className={styles.label}>Lättsam</span>
        <span className={styles.badge}>Högstadiet</span>
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={mode === 'rigoros'}
        className={`${styles.button} ${mode === 'rigoros' ? styles.buttonActive : ''}`}
        onClick={() => setMode('rigoros')}
        title="Rigorös: anpassad för gymnasiet och universitetet (steg 3–7). Fullständigt referensverk.">
        <span className={styles.icon} aria-hidden="true">🔬</span>
        <span className={styles.label}>Rigorös</span>
        <span className={styles.badge}>Gymnasium & Uni</span>
      </button>
    </div>
  );

  if (mobile) {
    return (
      <div className={styles.mobileContainer}>
        <p className={styles.mobileLabel}>Målgrupp / grammatikläge</p>
        <p className={styles.mobileDesc}>
          {mode === 'lattsam'
            ? '☕ Lättsam: Anpassad för högstadiet (steg 1–2). Basgrammatik och övningar.'
            : '🔬 Rigorös: Anpassad för gymnasium och universitet (steg 3–7). Fullständigt referensverk.'}
        </p>
        {toggle}
      </div>
    );
  }

  return toggle;
}
