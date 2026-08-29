import Link from 'next/link';
import styles from './Footer.module.css';

const COLUMNS = [
  {
    title: 'Ordklasser',
    items: [
      {label: 'Grunder & uttal', href: '/docs/grunder/alfabet'},
      {label: 'Substantiv', href: '/docs/substantiv/genus'},
      {label: 'Adjektiv', href: '/docs/adjektiv/kongruens'},
      {label: 'Pronomen', href: '/docs/pronomen/personliga'},
      {label: 'Verb', href: '/docs/verb/introduktion'},
      {label: 'Adverb', href: '/docs/adverb/anvandning'},
      {label: 'Syntax', href: '/docs/syntax/introduktion'},
    ],
  },
  {
    title: 'Öva',
    items: [
      {label: 'Verbdrillen', href: '/verbdrillen'},
      {label: 'Glosdrillen', href: '/glosdrillen'},
      {label: 'Tidsformer', href: '/docs/verb/tempus/presens'},
      {label: 'Oregelbundna verb', href: '/docs/verb/oregelbundna-verb'},
      {label: 'Konjunktiv', href: '/docs/verb/konjunktiv'},
    ],
  },
  {
    title: 'Sajten',
    items: [
      {label: 'Bloggen', href: '/blog'},
      {label: 'Kontakt', href: '/kontakt'},
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {COLUMNS.map(col => (
            <div key={col.title} className={styles.column}>
              <p className={styles.columnTitle}>{col.title}</p>
              <ul className={styles.list}>
                {col.items.map(item => (
                  <li key={item.href}>
                    <Link href={item.href} className={styles.link}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className={styles.copyright}>
          omspanska.se · {new Date().getFullYear()} · Gratis digital grammatika
        </p>
      </div>
    </footer>
  );
}
