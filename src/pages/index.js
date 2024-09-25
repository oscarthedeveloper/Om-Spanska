import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';
import TextMarquee from '@site/src/components/TextMarquee/TextMarquee'; // Ensure the path is correct

function HomepageHeader() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.textSection}>
        <h1 className={styles.title}>Om Spanska</h1>
        <p className={styles.subtitle}>Den mest omfattande spanska grammatikan.</p>
        <Link className={styles.button} to="/docs/Introduktion/Börja här">
          Grammatik
          <svg className={styles.buttonIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 16" fill="none" height="16" width="17">
            <path d="M.5 8h14M9.234 2.725l5.978 5.979m-5.978 4.57 5.978-5.978" stroke="currentColor" strokeWidth="2" fill="none"></path>
          </svg>
        </Link>
      </div>
      <div className={styles.logoSection}>
        <img
          src="/img/spain-svgrepo-com.svg"
          alt="OmSpanska Logo"
          className={styles.logo}
        />
      </div>
    </div>
  );
}

function HomepageTextSection() {
  return (
    <div className={styles.headerContainerSecond}>
      <div className={styles.logoSectionSecond}>
        <img
          src="/img/spanishflag-svgrepo-com.svg"
          alt="OmSpanska Logo"
          className={styles.logoSecond}
        />
      </div>
      <div className={styles.textSectionSecond}>
        <h1 className={styles.titleSecond}>Allt om spansk grammatik</h1>
        <p className={styles.subtitleSecond}>Denna grammatika är den mest omfattande du kan hitta online. Den är <strong>konsis</strong>, <strong>förståelig</strong> och <strong>pedagogisk</strong>. Den är dessutom en <strong>gratis resurs</strong> för dig som studerar spanska, så om du tycker att den är hjälpsam får du gärna tipsa en kompis! 😁</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Layout title="Om Spanska" description="Omfattande grammatika för spanska">
      <HomepageHeader />
      <HomepageTextSection />
      <TextMarquee /> {/* Add your text marquee component here */}
    </Layout>
  );
}
