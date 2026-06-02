import React, { useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const SECTIONS = [
  { num: '01', name: 'Substantiv', path: '/docs/Substantiv/Genus',                    tag: 'Genus · Artiklar · Plural · Genitiv'     },
  { num: '03', name: 'Adjektiv',   path: '/docs/Adjektiv/Kongruens',                   tag: 'Kongruens · Komparation · Ísimo'  },
  { num: '02', name: 'Verb',       path: '/docs/Verb/Introduktion',                   tag: 'Introduktion · Tidsformer · Imperativ · Konjunktiv · Perifraser · Oregelbundna verb' },
  { num: '04', name: 'Pronomen',   path: '/docs/Pronomen/Personliga%20pronomen',      tag: 'Personliga · Reflexiva · Possessiva · Demonstrativa' },
  { num: '05', name: 'Adverb',     path: '/docs/Adverb/Användning',                  tag: 'Användning · Muy & mucho · Tan & tango · Aquí, allí & ahí'     },
  { num: '06', name: 'Syntax',     path: '/docs/Syntax/Introduktion',                 tag: 'Introduktion · Ordföljd i frågor · Que'       },
];

/* ─── HERO ─── */
function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const items = el.querySelectorAll('[data-reveal]');
    items.forEach((item, i) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(18px)';
      item.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        });
      });
    });
  }, []);

  return (
    <section className={styles.hero} ref={heroRef}>
      {/* Top meta */}
      <div className={styles.heroMeta} data-reveal>
        <span>Digital Grammatika · Spanska</span>
        <span>Gratis · För svenska elever</span>
      </div>

      <div className={styles.rule} data-reveal />

      {/* Main display */}
      <div className={styles.heroBody}>
        {/* Stripe ornament */}
        <div className={styles.stripes} aria-hidden="true" data-reveal />

        {/* Giant heading */}
        <h1 className={styles.heroHeading} data-reveal>
          Om<br />
          <span className={styles.heroHeadingAccent}>Spanska</span>
        </h1>

        {/* Right column */}
        <div className={styles.heroRight} data-reveal>
          <p className={styles.heroDesc}>
            En gratis digital grammatika<br />för svenska spanskelever
          </p>
          <Link to="/docs/Verb/Introduktion" className={styles.heroCta}>
            Börja lära dig
          </Link>
        </div>
      </div>

      <div className={styles.rule} data-reveal />

      {/* Bottom ticker */}
      <div className={styles.heroFooter} data-reveal>
        <span>↓ Bläddra</span>
        <span className={styles.heroFooterRight}>
          Verb · Substantiv · Adjektiv · Pronomen · Adverb · Syntax
        </span>
      </div>
    </section>
  );
}

/* ─── GRAMMAR INDEX ─── */
function GrammarIndex() {
  return (
    <section className={styles.index}>
      <div className={styles.indexHeader}>
        <span className={styles.indexMeta}>Ordklasser</span>
        <span className={styles.indexMeta}>06 avsnitt</span>
      </div>

      {SECTIONS.map((s) => (
        <Link key={s.num} to={s.path} className={styles.indexRow}>
          <span className={styles.indexNum}>{s.num}</span>
          <span className={styles.indexName}>{s.name}</span>
          <span className={styles.indexTag}>{s.tag}</span>
          <span className={styles.indexArrow}>→</span>
        </Link>
      ))}
    </section>
  );
}

/* ─── ABOUT ─── */
function About() {
  return (
    <section className={styles.about}>
      <div className={styles.aboutGrid}>

        {/* Pull-quote side */}
        <div className={styles.aboutLeft}>
          <span className={styles.aboutLabel}>Om hemsidan</span>
          <h2 className={styles.aboutHeadline}>
            Digitalt,<br />tydligt<br />&amp;&nbsp;gratis.
          </h2>
        </div>

        {/* Text side */}
        <div className={styles.aboutRight}>
          <p className={styles.aboutBody}>
            En digital grammatika som syftar till att göra spansk grammatik mer
            tillgänglig och lättförståelig — vare sig du studerar spanska i skolan
            eller på egen hand.
          </p>
          <p className={styles.aboutBody}>
            Alla resurser är helt gratis att använda, så att du kan fokusera
            på att lära dig spanska utan några hinder.
          </p>
          <Link to="/docs/Verb/Introduktion" className={styles.aboutLink}>
            Utforska grammatikan →
          </Link>
        </div>

      </div>
    </section>
  );
}

/* ─── PAGE ─── */
export default function Home() {
  return (
    <Layout
      title="Om Spanska"
      description="En gratis digital grammatika för svenska spanskelever"
    >
      <Hero />
      <GrammarIndex />
      <About />
    </Layout>
  );
}
