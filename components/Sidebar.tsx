'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import type {SidebarNode} from '@/lib/types';
import styles from './Sidebar.module.css';

function Nodes({nodes, depth}: {nodes: SidebarNode[]; depth: number}) {
  const pathname = usePathname();
  return (
    <ul className={depth === 0 ? styles.root : styles.nested}>
      {nodes.map(node =>
        node.kind === 'category' ? (
          <li key={`${node.label}-${node.position}`} className={styles.category}>
            <p className={styles.categoryLabel}>{node.label}</p>
            <Nodes nodes={node.items} depth={depth + 1} />
          </li>
        ) : (
          <li key={node.href}>
            <Link
              href={node.href}
              aria-current={pathname === node.href ? 'page' : undefined}
              className={pathname === node.href ? styles.linkActive : styles.link}>
              {node.label}
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
        <Nodes nodes={nodes} depth={0} />
      </nav>
    </>
  );
}
