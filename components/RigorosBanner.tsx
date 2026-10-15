'use client';

import {useGrammarMode} from '@/lib/grammar-mode';
import styles from './RigorosBanner.module.css';

export default function RigorosBanner() {
  const [mode, setMode] = useGrammarMode();

  return (
    <aside className={styles.banner} aria-label="Information om målgrupp och grammatikläge">
      <div className={styles.content}>
        <span className={styles.badge}>🔬 Gymnasium & Universitet</span>
        <p className={styles.text}>
          {mode === 'lattsam'
            ? 'Detta kapitel är anpassat för gymnasiets högre kurser och universitetsstudier (steg 3–7). Slå på Rigoröst läge för att se hela kapitlet och alla relaterade fördjupningssidor i menyn.'
            : 'Du läser i Rigoröst läge. Alla fördjupningsartiklar, rektionsmönster och specialregler för gymnasium och universitet är synliga.'}
        </p>
      </div>
      {mode === 'lattsam' && (
        <button
          type="button"
          onClick={() => setMode('rigoros')}
          className={styles.button}>
          Slå på Rigoröst läge
        </button>
      )}
    </aside>
  );
}
