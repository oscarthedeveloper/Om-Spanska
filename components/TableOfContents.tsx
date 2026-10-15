'use client';

import {useEffect, useState} from 'react';
import type {Heading} from '@/lib/types';
import {useGrammarMode} from '@/lib/grammar-mode';
import styles from './TableOfContents.module.css';

export default function TableOfContents({
  headings,
  headingsLattsam,
}: {
  headings: Heading[];
  headingsLattsam?: Heading[];
}) {
  const [mode] = useGrammarMode();
  const [rigorosIds, setRigorosIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const found = new Set<string>();
    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el && el.closest('[data-rigoros-block="true"]')) {
        found.add(h.id);
      }
    }
    setRigorosIds(found);
  }, [headings]);

  const visibleHeadings =
    mode === 'lattsam' && headingsLattsam
      ? headingsLattsam
      : mode === 'rigoros'
      ? headings
      : headings.filter(h => !rigorosIds.has(h.id));

  if (visibleHeadings.length < 2) return null;

  return (
    <nav className={styles.toc} aria-label="På den här sidan">
      <p className={styles.title}>På den här sidan</p>
      <ul className={styles.list}>
        {visibleHeadings.map(h => (
          <li key={h.id} className={h.level === 3 ? styles.sub : undefined}>
            <a href={`#${h.id}`} className={styles.link}>{h.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
