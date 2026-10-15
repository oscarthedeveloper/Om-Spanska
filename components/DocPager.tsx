'use client';

import Link from 'next/link';
import {useGrammarMode} from '@/lib/grammar-mode';
import type {OrderedDoc} from '@/lib/content';
import styles from '@/app/docs/[...slug]/doc.module.css';

type Neighbour = OrderedDoc | null;

export default function DocPager({
  lattsam,
  rigoros,
}: {
  lattsam: {previous: Neighbour; next: Neighbour};
  rigoros: {previous: Neighbour; next: Neighbour};
}) {
  const [mode] = useGrammarMode();
  const {previous, next} = mode === 'lattsam' ? lattsam : rigoros;

  if (!previous && !next) return null;

  return (
    <nav className={styles.pager} aria-label="Föregående och nästa avsnitt">
      {previous ? (
        <Link href={previous.href} className={styles.pagerLink}>
          <span className={styles.pagerLabel}>Föregående</span>
          <span className={styles.pagerTitle}>{previous.label}</span>
          {mode === 'rigoros' && previous.rigoros && (
            <span className={styles.pagerBadge}>🔬 Gymnasium & Uni</span>
          )}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href} className={`${styles.pagerLink} ${styles.pagerNext}`}>
          <span className={styles.pagerLabel}>Nästa</span>
          <span className={styles.pagerTitle}>{next.label}</span>
          {mode === 'rigoros' && next.rigoros && (
            <span className={styles.pagerBadge}>🔬 Gymnasium & Uni</span>
          )}
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
