'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useRef, useState} from 'react';
import {
  LEARNING_PROGRESS_EVENT,
  continueLearningWith,
  readLearningProgress,
  type LearningProgress,
} from '@/lib/learning-progress';
import SearchDialog from './SearchDialog';
import styles from './Navbar.module.css';

const GRAMMAR_LINKS = [
  {href: '/docs/grunder/alfabet', label: 'Grunder & uttal'},
  {href: '/docs/substantiv/genus', label: 'Ordklasser'},
  {href: '/mer/ser-och-estar', label: 'Mer grammatik'},
  {href: '/grammatik', label: 'Hitta rätt i grammatiken'},
];

const PRACTICE_LINKS = [
  {href: '/larstig', label: 'Lärstigen'},
  {href: '/repetition', label: 'Dagens repetition'},
  {href: '/verbdrillen', label: 'Verbdrillen'},
  {href: '/glosdrillen', label: 'Glosdrillen'},
];

type OpenMenu = 'grammar' | 'practice' | null;

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [learningCta, setLearningCta] = useState({href: '/larstig', label: 'Börja lära dig'});

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    function syncLearningCta(event?: Event) {
      const progress = event instanceof CustomEvent
        ? event.detail as LearningProgress
        : readLearningProgress();
      const next = continueLearningWith(progress);
      const hasStarted = progress.completed.length > 0
        || Boolean(progress.lastVisited)
        || Object.keys(progress.quizResults).length > 0;
      setLearningCta({
        href: next?.href ?? '/larstig',
        label: hasStarted ? 'Fortsätt' : 'Börja lära dig',
      });
    }

    syncLearningCta();
    window.addEventListener(LEARNING_PROGRESS_EVENT, syncLearningCta);
    return () => window.removeEventListener(LEARNING_PROGRESS_EVENT, syncLearningCta);
  }, []);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null);
    }
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === 'Escape') setOpenMenu(null);
    }
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const grammarActive = pathname.startsWith('/grammatik') || pathname.startsWith('/docs') || pathname.startsWith('/mer');
  const practiceActive = ['/larstig', '/repetition', '/verbdrillen', '/glosdrillen']
    .some(path => pathname.startsWith(path));

  return (
    <>
      <header className={styles.navbar}>
        <nav ref={navRef} className={styles.inner} aria-label="Huvudmeny">
          <div className={styles.left}>
            <Link href="/" className={styles.brand}>
              omspanska<span className={styles.brandTld}>.se</span>
            </Link>

            <ul className={styles.links}>
              <li className={styles.dropdown} data-nav-dropdown>
                <button
                  type="button"
                  className={grammarActive ? styles.linkActive : styles.link}
                  aria-expanded={openMenu === 'grammar'}
                  aria-controls="grammatikmeny"
                  onClick={() => setOpenMenu(value => value === 'grammar' ? null : 'grammar')}>
                  Grammatik <span className={styles.chevron} aria-hidden="true">⌄</span>
                </button>
                {openMenu === 'grammar' && (
                  <div id="grammatikmeny" className={styles.dropdownMenu}>
                    {GRAMMAR_LINKS.map(link => (
                      <Link key={link.href} href={link.href}>{link.label}</Link>
                    ))}
                  </div>
                )}
              </li>

              <li className={styles.dropdown} data-nav-dropdown>
                <button
                  type="button"
                  className={practiceActive ? styles.linkActive : styles.link}
                  aria-expanded={openMenu === 'practice'}
                  aria-controls="ovningsmeny"
                  onClick={() => setOpenMenu(value => value === 'practice' ? null : 'practice')}>
                  Öva <span className={styles.chevron} aria-hidden="true">⌄</span>
                </button>
                {openMenu === 'practice' && (
                  <div id="ovningsmeny" className={styles.dropdownMenu}>
                    {PRACTICE_LINKS.map(link => (
                      <Link key={link.href} href={link.href}>{link.label}</Link>
                    ))}
                  </div>
                )}
              </li>

              <li>
                <Link
                  href="/blog"
                  className={pathname.startsWith('/blog') ? styles.linkActive : styles.link}>
                  Blogg
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.searchBtn}
              onClick={() => setSearchOpen(true)}
              aria-label="Sök i grammatiken"
              title="Sök i grammatiken (⌘K)">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4 4" />
              </svg>
            </button>
            <Link
              href="/framsteg"
              className={`${styles.progressLink} ${pathname.startsWith('/framsteg') ? styles.progressLinkActive : ''}`}>
              Mina framsteg
            </Link>
            <Link href={learningCta.href} className={`${styles.pill} ${styles.pillPrimary}`}>
              {learningCta.label}
            </Link>
            <button
              type="button"
              className={styles.toggle}
              aria-expanded={mobileOpen}
              aria-controls="mobilmeny"
              onClick={() => setMobileOpen(value => !value)}>
              <span className="srOnly">Meny</span>
              <span aria-hidden="true">{mobileOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div id="mobilmeny" className={styles.mobile}>
            <p className={styles.mobileHeading}>Grammatik</p>
            {GRAMMAR_LINKS.map(link => (
              <Link key={link.href} href={link.href} className={styles.mobileLink}>{link.label}</Link>
            ))}

            <p className={styles.mobileHeading}>Öva</p>
            {PRACTICE_LINKS.map(link => (
              <Link key={link.href} href={link.href} className={styles.mobileLink}>{link.label}</Link>
            ))}

            <p className={styles.mobileHeading}>Mer</p>
            <Link href="/blog" className={styles.mobileLink}>Blogg</Link>
            <Link href="/framsteg" className={styles.mobileLink}>Mina framsteg</Link>
            <Link href="/kontakt" className={styles.mobileLink}>Kontakt</Link>
            <Link
              href={learningCta.href}
              className={`${styles.pill} ${styles.pillPrimary} ${styles.mobileCta}`}>
              {learningCta.label}
            </Link>
          </div>
        )}
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
