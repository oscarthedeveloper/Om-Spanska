'use client';

import {useGrammarMode} from '@/lib/grammar-mode';
import styles from './RigorosBanner.module.css';

export default function RigorosBanner() {
  const [mode, setMode] = useGrammarMode();

  if (mode === 'rigoros') return null;

  return (
    <aside className={styles.banner} aria-label="Information om grammatikläge">
      <div className={styles.content}>
        <span className={styles.badge}>🔬 Rigoröst kapitel</span>
        <p className={styles.text}>
          Detta kapitel ingår i det utökade, rigorösa läget. Slå på Rigoröst läge för att läsa kapitlet och se alla relaterade sidor i menyn.
        </p>
      </div>
      <button
        type="button"
        onClick={() => setMode('rigoros')}
        className={styles.button}>
        Slå på Rigoröst läge
      </button>
    </aside>
  );
}
