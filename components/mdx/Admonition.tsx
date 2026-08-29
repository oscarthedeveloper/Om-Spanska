import type {ReactNode} from 'react';
import styles from './Admonition.module.css';

type AdmonitionType = 'note' | 'tip' | 'info' | 'caution' | 'danger';

const DEFAULT_TITLE: Record<AdmonitionType, string> = {
  note: 'Notera',
  tip: 'Tips',
  info: 'Info',
  caution: 'Se upp',
  danger: 'Varning',
};

export default function Admonition({
  type = 'note',
  title,
  children,
}: {
  type?: AdmonitionType;
  title?: string;
  children: ReactNode;
}) {
  const kind: AdmonitionType = type in DEFAULT_TITLE ? type : 'note';
  return (
    <aside className={`${styles.box} ${styles[kind]}`}>
      <p className={styles.title}>{title || DEFAULT_TITLE[kind]}</p>
      <div className={styles.body}>{children}</div>
    </aside>
  );
}
