import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import styles from './Categories.module.css'

const CATS = [
  {
    id: 'Verb', num: '01', title: 'Verb', sub: 'Konjugering & tempus',
    href: '/docs/Verb/Introduktion',
    excerpt: 'Spanska verb böjs efter person, numerus och tempus. Presens, preteritum, imperfekt, perfekt, futurum, konditionalis och subjuntivo.',
    tags: ['Presens', 'Preteritum', 'Imperfekt', 'Subjuntivo'],
    bar: '#0b00cb',
  },
  {
    id: 'Substantiv', num: '02', title: 'Substantiv', sub: 'Genus, numerus & artiklar',
    href: '/docs/Substantiv/Genus',
    excerpt: 'Alla substantiv har ett grammatiskt genus — maskulinum eller femininum. Lär dig genus, pluralisbildning, artiklar och genitiv.',
    tags: ['Genus', 'Numerus', 'Artiklar', 'Genitiv'],
    bar: '#1d6a8a',
  },
  {
    id: 'Adjektiv', num: '03', title: 'Adjektiv', sub: 'Böjning & komparation',
    href: '/docs/Adjektiv/Bojning',
    excerpt: 'Adjektiv böjs i genus och numerus för att stämma med substantivet. Lär dig böjning, komparation och placering.',
    tags: ['Böjning', 'Komparation', 'Placering'],
    bar: '#6a4a9a',
  },
  {
    id: 'Pronomen', num: '04', title: 'Pronomen', sub: 'Personliga, possessiva & reflexiva',
    href: '/docs/Pronomen/Personliga_pronomen',
    excerpt: 'Pronomen ersätter substantiv och varierar beroende på grammatisk funktion. Personliga, possessiva, reflexiva och demonstrativa.',
    tags: ['Personliga', 'Possessiva', 'Reflexiva', 'Demonstrativa'],
    bar: '#8a4a3a',
  },
  {
    id: 'Adverb', num: '05', title: 'Adverb', sub: 'Bildning & användning',
    href: '/docs/Adverb/Anvandning',
    excerpt: 'Adverb modifierar verb, adjektiv och andra adverb. Lär dig bildning med -mente och de vanligaste adverben.',
    tags: ['Användning', 'Muy / Mucho', 'Tan / Tanto'],
    bar: '#2a7a5a',
  },
  {
    id: 'Syntax', num: '06', title: 'Syntax', sub: 'Meningsbyggnad & ordföljd',
    href: '/docs/Syntax/Introduktion',
    excerpt: 'Syntaxen beskriver hur ord fogas samman till meningar. Grundordföljd SVO, frågor och bisatser med que.',
    tags: ['Ordföljd', 'Frågor', 'Que', 'Negation'],
    bar: '#3a5a8a',
  },
]

export default function Categories() {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from('.js-cat-card', {
        opacity: 0, y: 32,
        duration: 0.65, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section} id="kategorier" ref={sectionRef}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.label}>
            <span className={styles.labelN}>—</span> GRAMMATIK
          </p>
        </header>

        <div className={styles.grid}>
          {CATS.map(cat => (
            <a
              key={cat.id}
              href={cat.href}
              className={`${styles.card} js-cat-card`}
              style={{ '--bar': cat.bar }}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardNum}>{cat.num}</span>
                <span className={styles.cardArrow} aria-hidden="true">→</span>
              </div>
              <div className={styles.cardTitle}>
                <h3>{cat.title}</h3>
                <p className={styles.cardSub}>{cat.sub}</p>
              </div>
              <p className={styles.cardExcerpt}>{cat.excerpt}</p>
              <div className={styles.cardTags}>
                {cat.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
              </div>
              <div className={styles.cardBar} style={{ background: cat.bar }} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
