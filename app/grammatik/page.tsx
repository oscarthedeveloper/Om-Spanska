import type {Metadata} from 'next';
import Link from 'next/link';
import {getAllDocs, getSidebar} from '@/lib/content';
import type {SidebarNode} from '@/lib/types';
import styles from './page.module.css';
export const metadata: Metadata = {title: 'Hitta rätt i grammatiken', description: 'Alla genomgångar, jämförelser och grammatiska småfrågor på ett ställe.', alternates: {canonical: '/grammatik'}};
function flatten(nodes: SidebarNode[]): {href: string; label: string}[] {
  return nodes.flatMap(node => node.kind === 'link' ? [node] : flatten(node.items));
}
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
  return <main className={styles.page}>
    <header className={styles.hero}><p className="eyebrow">Grammatik · exempel · övningar</p><h1>Vad vill du få ordning på?</h1><p>Slå upp en regel, jämför två former eller följ en genomgång från början. Varje liten bit hjälper nästa mening på traven.</p><Link className="pillButton pillButton--primary" href="/larstig">Följ lärstigen</Link></header>
    <section aria-labelledby="jamfor"><h2 id="jamfor">Vilket ska jag välja?</h2><div className={styles.grid}>{comparisons.map(item => <Link className={styles.card} href={item.href} key={item.href}><h3>{item.label}</h3><p>{item.description}</p><span>Jämför →</span></Link>)}</div></section>
    <section aria-labelledby="alla"><h2 id="alla">Alla grammatikområden</h2><div className={styles.grid}>{categories.map(node => <div className={styles.category} key={node.label}><h3>{node.label}</h3><ul>{flatten([node]).map(link => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul></div>)}</div></section>
    <section aria-labelledby="fordjupa"><h2 id="fordjupa">Fördjupningar och klurigheter</h2><ul className={styles.linkList}>{extra.map(doc => <li key={doc.href}><Link href={doc.href}>{doc.title}</Link><p>{doc.description}</p></li>)}</ul></section>
    <section aria-labelledby="fragor"><h2 id="fragor">Små frågor, användbara svar</h2><p>Korta blogginlägg som reder ut en grammatisk fundering i taget.</p><ul className={styles.linkList}>{questions.map(item => <li key={item.href}><Link href={item.href}>{item.label} →</Link></li>)}</ul></section>
  </main>;
}
