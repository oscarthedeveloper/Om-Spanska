import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';
import TextMarquee from '@site/src/components/TextMarquee/TextMarquee';

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <h1 className={styles.heroTitle}>Om Spanska</h1>
        <p className={styles.heroSubtitle}>
          En gratis grammatika för dig som studerar spanska
        </p>
        <Link className={styles.heroButton} to="/docs/Grunder & uttal/Alfabet">
          Börja här 
          <svg className={styles.heroButtonIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 16" fill="none" height="16" width="17">
            <path d="M.5 8h14M9.234 2.725l5.978 5.979m-5.978 4.57 5.978-5.978" stroke="currentColor" strokeWidth="2" fill="none"></path>
          </svg>
        </Link>
      </div>
    </section>
  );
}

function FeatureSection() {
  const features = [
    { title: 'Substantiv', link: '/docs/Substantiv/Artiklar' },
    { title: 'Adjektiv', link: '/docs/Adjektiv/B%C3%B6jning' },
    { title: 'Verb', link: '/docs/Verb/Introduktion' },
    { title: 'Pronomina', link: '/docs/Pronomina/Personliga%20pronomina' },
    { title: 'Adverb', link: '/docs/Adverb/Användning%20av%20adverb' },
    { title: 'Prepositioner', link: '/docs/Prepositioner/Användning%20av%20prepositioner' },
  ];

  return (
    <section className={styles.features}>
      <div className={styles.boxContainer}>
        {features.map(f => (
          <Link key={f.title} to={f.link} className={styles.box}>
            {f.title}
          </Link>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.aboutInner}>
        <h2 className={styles.aboutTitle}>Om oss</h2>
        <p className={styles.aboutText}>
          Vi brinner för språkinlärning och har skapat denna plattform för att erbjuda en tydlig,
          gratis och omfattande grammatikkälla för den som studerar spanska. Allt innehåll är
          noggrant strukturerat och pedagogiskt utformat.
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout title="Om Spanska" description="Den mest omfattande grammatiken för spanska online.">
      <HeroSection />
      <FeatureSection />
      <AboutSection />
      <TextMarquee />
    </Layout>
  );
}