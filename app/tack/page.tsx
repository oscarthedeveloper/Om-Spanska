import type {Metadata} from 'next';
import Link from 'next/link';
import styles from './tack.module.css';

export const metadata: Metadata = {
  title: 'Tack',
  description: 'Ditt meddelande till Om Spanska har skickats.',
  robots: {index: false, follow: true},
};

export default function TackPage() {
  return (
    <main className={styles.page}>
      <div className={styles.block}>
        <p className="eyebrow">Kontakt</p>
        <h1 className={styles.title}>Tack — meddelandet är skickat.</h1>
        <p className={styles.lead}>
          Jag läser allt som kommer in och svarar så snart jag hinner.
        </p>
        <div className={styles.actions}>
          <Link href="/docs/verb/introduktion" className="pillButton pillButton--primary">
            Tillbaka till grammatiken
          </Link>
          <Link href="/" className="pillButton pillButton--onColor">
            Till startsidan
          </Link>
        </div>
      </div>
    </main>
  );
}
