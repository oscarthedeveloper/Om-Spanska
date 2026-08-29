import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <main className={styles.page}>
      <p className="eyebrow">404</p>
      <h1 className={styles.title}>Sidan finns inte.</h1>
      <p className={styles.lead}>
        Länken kan vara gammal. Grammatiken flyttade till kortare adresser under
        2026 — pröva att söka i stället, eller börja om från innehållsförteckningen.
      </p>
      <div className={styles.actions}>
        <Link href="/docs/grunder/alfabet" className="pillButton pillButton--primary">
          Till grammatiken
        </Link>
        <Link href="/" className="pillButton pillButton--secondary">
          Till startsidan
        </Link>
      </div>
    </main>
  );
}
