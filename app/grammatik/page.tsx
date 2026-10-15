import type {Metadata} from 'next';
import Link from 'next/link';
import {getAllDocs, getSidebar} from '@/lib/content';
import GrammarDirectory from '@/components/GrammarDirectory';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Hitta rätt i grammatiken',
  description: 'Alla genomgångar, jämförelser och grammatiska småfrågor på ett ställe.',
  alternates: {canonical: '/grammatik'},
};

const comparisons = [
  {href: '/docs/verb/tempus/preteritum-eller-imperfekt', label: 'Preteritum eller imperfekt?', description: 'Berätta vad som hände och hur det var.'},
  {href: '/mer/ser-och-estar', label: 'Ser eller estar?', description: 'Identitet, plats och tillstånd.'},
  {href: '/mer/por-och-para', label: 'Por eller para?', description: 'Två småord med olika uppgifter.'},
  {href: '/docs/pronomen/objektspronomen-tillsammans', label: 'Le, lo eller se lo?', description: 'Håll reda på vem som får vad.'},
];

const questions = [
  {href: '/blog/me-gusta-me-gustan', label: 'Varför me gusta men me gustan?'},
  {href: '/blog/varfor-se-lo', label: 'Varför blir le lo till se lo?'},
  {href: '/blog/ser-permanent', label: 'Varför räcker inte ”ser är permanent”?'},
  {href: '/blog/attbli', label: 'Hur säger man att bli?'},
  {href: '/blog/attfå', label: 'Hur säger man att få?'},
  {href: '/blog/sambandsord', label: 'Hur binder man ihop resonemang?'},
];

export default function GrammarPage() {
  const categories = getSidebar();
  const extra = getAllDocs('mer').sort((a, b) => a.sidebar_position - b.sidebar_position);

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <p className="eyebrow">Grammatik · exempel · övningar</p>
        <h1>Vad vill du få ordning på?</h1>
        <p>
          Slå upp en regel, jämför två former eller följ en genomgång från början.
          Välj mellan Lättsam (Högstadiet) och Rigorös (Gymnasium & Universitet) i menyn ovan.
        </p>
        <Link className="pillButton pillButton--primary" href="/larstig">
          Följ lärstigen
        </Link>
      </header>

      <section aria-labelledby="jamfor">
        <h2 id="jamfor">Vilket ska jag välja?</h2>
        <div className={styles.grid}>
          {comparisons.map(item => (
            <Link className={styles.card} href={item.href} key={item.href}>
              <h3>{item.label}</h3>
              <p>{item.description}</p>
              <span>Jämför →</span>
            </Link>
          ))}
        </div>
      </section>

      <GrammarDirectory categories={categories} extra={extra} />

      <section aria-labelledby="fragor">
        <h2 id="fragor">Små frågor, användbara svar</h2>
        <p>Korta blogginlägg som reder ut en grammatisk fundering i taget.</p>
        <ul className={styles.linkList}>
          {questions.map(item => (
            <li key={item.href}>
              <Link href={item.href}>{item.label} →</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
