'use client';

import Link from 'next/link';
import {useGrammarMode} from '@/lib/grammar-mode';
import type {SidebarNode, DocMeta} from '@/lib/types';
import styles from '@/app/grammatik/page.module.css';

function filterNodes(nodes: SidebarNode[], mode: 'lattsam' | 'rigoros'): SidebarNode[] {
  if (mode === 'rigoros') return nodes;
  return nodes
    .filter(node => !node.rigoros)
    .map(node => {
      if (node.kind === 'category') {
        const filteredItems = filterNodes(node.items, mode);
        if (filteredItems.length === 0) return null;
        return {...node, items: filteredItems};
      }
      return node;
    })
    .filter((node): node is SidebarNode => node !== null);
}

function flatten(nodes: SidebarNode[], mode: 'lattsam' | 'rigoros'): {href: string; label: string; rigoros?: boolean}[] {
  return nodes.flatMap(node => {
    if (mode === 'lattsam' && node.rigoros) return [];
    if (node.kind === 'link') {
      const label = mode === 'lattsam' && node.labelLattsam ? node.labelLattsam : node.label;
      return [{href: node.href, label, rigoros: node.rigoros}];
    }
    return flatten(node.items, mode);
  });
}

export default function GrammarDirectory({
  categories,
  extra,
}: {
  categories: SidebarNode[];
  extra: DocMeta[];
}) {
  const [mode, setMode] = useGrammarMode();

  const visibleCategories = filterNodes(categories, mode);

  const visibleExtra = mode === 'lattsam'
    ? extra.filter(d => !d.rigoros)
    : extra;

  return (
    <>
      <section aria-labelledby="alla">
        <div className={styles.sectionHeader}>
          <h2 id="alla">
            {mode === 'lattsam' ? 'Alla grammatikområden' : 'Samtliga grammatikområden'}
          </h2>
          <span className={styles.modeTag}>
            {mode === 'lattsam' ? '☕ Lättsam' : '🔬 Rigorös'}
          </span>
        </div>
        <div className={styles.grid}>
          {visibleCategories.map(node => (
            <div className={styles.category} key={node.label}>
              <h3>{node.label}</h3>
              <ul>
                {flatten([node], mode).map(link => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      {link.label}
                      {mode === 'rigoros' && link.rigoros && (
                        <span className={styles.itemBadge}>🔬 Rigorös</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="fordjupa">
        <div className={styles.sectionHeader}>
          <h2 id="fordjupa">Fördjupningar och klurigheter</h2>
          {mode === 'lattsam' && (
            <button
              type="button"
              onClick={() => setMode('rigoros')}
              className={styles.switchLink}>
              Visa fördjupade artiklar (slå på Rigoröst läge) →
            </button>
          )}
        </div>
        <ul className={styles.linkList}>
          {visibleExtra.map(doc => (
            <li key={doc.href}>
              <Link href={doc.href}>
                {doc.title}
                {doc.rigoros && <span className={styles.itemBadge}>🔬 Rigorös</span>}
              </Link>
              <p>{doc.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
