import type {Metadata} from 'next';
import ContactForm from '@/components/ContactForm';
import styles from './kontakt.module.css';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Hör av dig till Om Spanska med frågor, förslag eller rättelser i grammatiken.',
  alternates: {canonical: '/kontakt'},
};

export default function KontaktPage() {
  return (
    <main className={styles.page}>
      <p className="eyebrow">Kontakt</p>
      <h1 className={styles.title}>Hör av dig</h1>
      <p className={styles.lead}>
        Sajten byggs ut löpande. Har du en fråga, ett förslag på ett avsnitt som
        saknas, eller har du hittat ett fel i grammatiken — skriv det här nedan.
      </p>
      <ContactForm />
    </main>
  );
}
