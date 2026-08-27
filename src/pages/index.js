import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

/* Ordklasserna i den ordning grammatiken är tänkt att läsas. */
const SECTIONS = [
  {num: '01', name: 'Grunder & uttal', path: '/docs/grunder/alfabet',
   tag: 'Alfabet · Uttal · Ordförändringar'},
  {num: '02', name: 'Substantiv', path: '/docs/substantiv/genus',
   tag: 'Genus · Artiklar · Plural · Genitiv'},
  {num: '03', name: 'Adjektiv', path: '/docs/adjektiv/kongruens',
   tag: 'Kongruens · Komparation · Ísimo'},
  {num: '04', name: 'Pronomen', path: '/docs/pronomen/personliga',
   tag: 'Personliga · Reflexiva · Possessiva · Demonstrativa'},
  {num: '05', name: 'Verb', path: '/docs/verb/introduktion',
   tag: 'Tidsformer · Imperativ · Konjunktiv · Perifraser · Oregelbundna verb'},
  {num: '06', name: 'Adverb', path: '/docs/adverb/anvandning',
   tag: 'Användning · Muy & mucho · Tan & tanto · Aquí, allí & ahí'},
  {num: '07', name: 'Syntax', path: '/docs/syntax/introduktion',
   tag: 'Ordföljd · Frågor · Que'},
];

const MARQUEE = [
  'Presens', 'Preteritum', 'Imperfekt', 'Perfekt', 'Futurum', 'Konditionalis',
  'Konjunktiv', 'Imperativ', 'Gerundium', 'Oregelbundna verb', 'Genus',
  'Kongruens', 'Ser & estar', 'Muy & mucho', 'Ordföljd',
];

const POSTS = [
  {title: 'Att bli', to: '/blog/attbli',
   blurb: 'Hacerse, ponerse, volverse, llegar a ser eller convertirse en? Spanskan har fem verb där svenskan har ett.'},
  {title: 'Att få', to: '/blog/attfå',
   blurb: 'Recibir, obtener, conseguir, poder eller tener que — vilket som gäller beror helt på sammanhanget.'},
  {title: 'Verb som gustar', to: '/blog/verbsomgustar',
   blurb: 'Kan du böja gustar kan du böja encantar, interesar och doler felfritt. Här är hela listan.'},
  {title: 'Sambandsord', to: '/blog/sambandsord',
   blurb: 'Orden som binder ihop meningarna och gör att texten slutar låta som en uppradning.'},
];

/* ─── HERO ─── */
function Hero() {
  return (
    <section className={styles.hero}>
      <p className={styles.heroEyebrow}>Digital grammatika · Spanska</p>
      <h1 className={styles.heroHeading}>
        Spansk grammatik,<br />
        förklarad på svenska.
      </h1>
      <div className={styles.heroBottom}>
        <p className={styles.heroLead}>
          Sju ordklasser, alla tidsformer och två övningsverktyg. Skrivet för dig
          som pluggar spanska i skolan eller på egen hand — och gratis, utan konto.
        </p>
        <div className={styles.heroActions}>
          <Link to="/docs/verb/introduktion" className="pillButton pillButton--primary">
            Börja lära dig
          </Link>
          <Link to="/verbdrillen" className="pillButton pillButton--secondary">
            Öva verb
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── MARQUEE ─── */
function Marquee() {
  const run = MARQUEE.concat(MARQUEE);
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.marqueeTrack}>
        {run.map((word, i) => (
          <span key={i} className={styles.marqueeItem}>{word}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── INNEHÅLLSFÖRTECKNING ─── */
function GrammarIndex() {
  return (
    <section className={styles.index}>
      <div className={styles.sectionHead}>
        <p className="eyebrow">Ordklasser</p>
        <p className="eyebrow">07 avsnitt</p>
      </div>
      <ol className={styles.indexList}>
        {SECTIONS.map((s) => (
          <li key={s.num}>
            <Link to={s.path} className={styles.indexRow}>
              <span className={styles.indexNum}>{s.num}</span>
              <span className={styles.indexName}>{s.name}</span>
              <span className={styles.indexTag}>{s.tag}</span>
              <span className={styles.indexArrow} aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ─── LIME: OM SAJTEN ─── */
function AboutBlock() {
  return (
    <section className={`${styles.block} ${styles.blockLime}`}>
      <div className={styles.blockInner}>
        <p className="eyebrow">Om hemsidan</p>
        <h2 className={styles.blockHeading}>
          Allt du behöver, ingenting du inte behöver.
        </h2>
        <p className={styles.blockLead}>
          De flesta spanska grammatikor på nätet är antingen skrivna på engelska
          eller gömda bakom en betalvägg. Om Spanska är varken. Varje regel
          förklaras på svenska, med jämförelser mot hur vi säger samma sak.
        </p>
        <dl className={styles.stats}>
          <div className={styles.stat}>
            <dt className="eyebrow">Avsnitt</dt>
            <dd>34</dd>
          </div>
          <div className={styles.stat}>
            <dt className="eyebrow">Glosor att öva</dt>
            <dd>750</dd>
          </div>
          <div className={styles.stat}>
            <dt className="eyebrow">Kostnad</dt>
            <dd>0 kr</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

/* ─── NAVY: DRILLARNA ─── */
function DrillBlock() {
  return (
    <section className={`${styles.block} ${styles.blockNavy}`}>
      <div className={styles.blockInner}>
        <p className="eyebrow">Öva</p>
        <h2 className={styles.blockHeading}>
          Läsa räcker inte. Det måste sitta i fingrarna.
        </h2>
        <div className={styles.drillGrid}>
          <div className={styles.drillCard}>
            <h3 className={styles.drillTitle}>Verbdrillen</h3>
            <p className={styles.drillBody}>
              Böj verb i presens, preteritum, imperfekt, perfekt, futurum och
              konditionalis — i indikativ, konjunktiv och imperativ. Filtrera på
              regelbundna, reflexiva, diftongerande eller oregelbundna.
            </p>
            <p className={styles.drillMeta}>265 verb · 8 tidsformer</p>
            <Link to="/verbdrillen" className="pillButton pillButton--onColor">
              Öppna Verbdrillen
            </Link>
          </div>
          <div className={styles.drillCard}>
            <h3 className={styles.drillTitle}>Glosdrillen</h3>
            <p className={styles.drillBody}>
              Femton kortlekar från absolut nybörjare till akademisk spanska.
              Skriv svaret själv eller välj bland alternativ — och öva om just de
              ord du missade förra gången.
            </p>
            <p className={styles.drillMeta}>750 glosor · 15 kortlekar</p>
            <Link to="/glosdrillen" className="pillButton pillButton--onColor">
              Öppna Glosdrillen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CREAM: BLOGGEN ─── */
function BlogBlock() {
  return (
    <section className={`${styles.block} ${styles.blockCream}`}>
      <div className={styles.blockInner}>
        <div className={styles.sectionHead}>
          <p className="eyebrow">Från bloggen</p>
          <Link to="/blog" className={styles.blockLink}>Alla inlägg →</Link>
        </div>
        <div className={styles.postGrid}>
          {POSTS.map((p) => (
            <Link key={p.to} to={p.to} className={styles.postCard}>
              <h3 className={styles.postTitle}>{p.title}</h3>
              <p className={styles.postBlurb}>{p.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── AVSLUT ─── */
function Closing() {
  return (
    <section className={styles.closing}>
      <h2 className={styles.closingHeading}>Börja där du står.</h2>
      <p className={styles.closingLead}>
        Kan du ingen spanska alls? Börja med alfabetet. Har du läst i tre år och
        fastnat på konjunktiven? Hoppa rakt dit.
      </p>
      <div className={styles.heroActions}>
        <Link to="/docs/grunder/alfabet" className="pillButton pillButton--primary">
          Från början
        </Link>
        <Link to="/docs/verb/konjunktiv" className="pillButton pillButton--secondary">
          Rakt till konjunktiven
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="Spansk grammatik på svenska"
      description="En gratis digital spansk grammatika för svenska elever: sju ordklasser, alla tidsformer, 750 glosor och två övningsverktyg.">
      <Hero />
      <Marquee />
      <main className={styles.main}>
        <GrammarIndex />
        <AboutBlock />
        <DrillBlock />
        <BlogBlock />
        <Closing />
      </main>
    </Layout>
  );
}
