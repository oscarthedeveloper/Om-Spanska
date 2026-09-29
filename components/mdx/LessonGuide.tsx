import Link from 'next/link';
import styles from './GrammarLab.module.css';
type LessonLink = {href: string; label: string};
export function LessonIntro({goals, prerequisites = []}: {goals: string[]; prerequisites?: LessonLink[]}) {
  return <aside className={styles.intro} aria-label="Det här lär du dig"><p className="eyebrow">Det här lär du dig</p><ul>{goals.map(goal => <li key={goal}>{goal}</li>)}</ul>{prerequisites.length > 0 && <p>Bra att kunna före: {prerequisites.map((link, i) => <span key={link.href}>{i > 0 && ' · '}<Link href={link.href}>{link.label}</Link></span>)}</p>}</aside>;
}
export function RelatedLessons({links}: {links: LessonLink[]}) {
  return <nav className={styles.related} aria-label="Relaterade genomgångar"><p className="eyebrow">Jämför och gå vidare</p>{links.map(link => <Link key={link.href} href={link.href}>{link.label} →</Link>)}</nav>;
}
