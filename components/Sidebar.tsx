'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import type {SidebarNode} from '@/lib/types';
import {useGrammarMode} from '@/lib/grammar-mode';
import styles from './Sidebar.module.css';

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

function Nodes({
  nodes,
  depth,
  mode,
}: {
  nodes: SidebarNode[];
  depth: number;
  mode: 'lattsam' | 'rigoros';
}) {
  const pathname = usePathname();
  return (
    <ul className={depth === 0 ? styles.root : styles.nested}>
      {nodes.map(node =>
        node.kind === 'category' ? (
          <li key={`${node.label}-${node.position}`} className={styles.category}>
            <p className={styles.categoryLabel}>{node.label}</p>
            <Nodes nodes={node.items} depth={depth + 1} mode={mode} />
          </li>
        ) : (
          <li key={node.href}>
            <Link
              href={node.href}
              aria-current={pathname === node.href ? 'page' : undefined}
              className={pathname === node.href ? styles.linkActive : styles.link}>
              {mode === 'lattsam' && node.labelLattsam ? node.labelLattsam : node.label}
            </Link>
          </li>
        ),
      )}
    </ul>
  );
}

export default function Sidebar({
  nodes,
  heading,
}: {
  nodes: SidebarNode[];
  /** Visas överst när sektionen saknar egna kategorier. */
  heading?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mode] = useGrammarMode();
  const visibleNodes = filterNodes(nodes, mode);
  return (
    <>
      <button
        type="button"
        className={styles.mobileToggle}
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}>
        {open ? 'Dölj innehållet' : 'Visa allt innehåll'}
      </button>
      <nav
        className={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`}
        aria-label={heading ?? 'Grammatikens innehåll'}>
        {heading && <p className={styles.heading}>{heading}</p>}
        <Nodes nodes={visibleNodes} depth={0} mode={mode} />
      </nav>
    </>
  );
}
