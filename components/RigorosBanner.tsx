'use client';

import {useGrammarMode} from '@/lib/grammar-mode';
import styles from './RigorosBanner.module.css';

export default function RigorosBanner() {
  const [mode, setMode] = useGrammarMode();

  return (
    <aside className={styles.banner} aria-label="Information om rigoröst läge">
      <div className={styles.content}>
        <span className={styles.badge}>🔬 Rigorös fördjupning</span>
        <p className={styles.text}>
          {mode === 'lattsam'
            ? 'Denna artikel ingår i det fullständiga referensverket. Byt till Rigoröst läge för att se alla relaterade sidor i menyn.'
            : 'Du läser i Rigoröst läge. Alla fördjupningsartiklar och specialregler är synliga.'}
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
