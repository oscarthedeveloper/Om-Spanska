import type {Heading} from '@/lib/types';
import styles from './TableOfContents.module.css';

export default function TableOfContents({headings}: {headings: Heading[]}) {
  if (headings.length < 2) return null;
  return (
    <nav className={styles.toc} aria-label="På den här sidan">
      <p className={styles.title}>På den här sidan</p>
      <ul className={styles.list}>
        {headings.map(h => (
          <li key={h.id} className={h.level === 3 ? styles.sub : undefined}>
            <a href={`#${h.id}`} className={styles.link}>{h.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
