'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';
import SearchDialog from './SearchDialog';
import styles from './Navbar.module.css';

const LINKS = [
  {href: '/docs/grunder/alfabet', label: 'Grammatik', match: '/docs'},
  {href: '/verbdrillen', label: 'Verbdrillen', match: '/verbdrillen'},
  {href: '/glosdrillen', label: 'Glosdrillen', match: '/glosdrillen'},
  {href: '/blog', label: 'Bloggen', match: '/blog'},
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Stäng mobilmenyn när man navigerar.
  useEffect(() => { setOpen(false); }, [pathname]);

  // Cmd/Ctrl+K öppnar sökrutan.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header className={styles.navbar}>
        <nav className={styles.inner} aria-label="Huvudmeny">
          <div className={styles.left}>
            <Link href="/" className={styles.brand}>
              omspanska<span className={styles.brandTld}>.se</span>
            </Link>

            <ul className={styles.links}>
              {LINKS.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={pathname.startsWith(l.match) ? styles.linkActive : styles.link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.searchBtn}
              onClick={() => setSearchOpen(true)}
              aria-label="Sök i grammatiken">
              <span aria-hidden="true">Sök</span>
              <kbd className={styles.kbd}>⌘K</kbd>
            </button>
            <Link href="/kontakt" className={`${styles.pill} ${styles.pillSecondary}`}>
              Kontakt
            </Link>
            <Link href="/docs/verb/introduktion" className={`${styles.pill} ${styles.pillPrimary}`}>
              Börja lära dig
            </Link>
            <button
              type="button"
              className={styles.toggle}
              aria-expanded={open}
              aria-controls="mobilmeny"
              onClick={() => setOpen(v => !v)}>
              <span className="srOnly">Meny</span>
              <span aria-hidden="true">{open ? '✕' : '☰'}</span>
            </button>
          </div>
        </nav>

        {open && (
          <div id="mobilmeny" className={styles.mobile}>
            {LINKS.map(l => (
              <Link key={l.href} href={l.href} className={styles.mobileLink}>
                {l.label}
              </Link>
            ))}
            <Link href="/kontakt" className={styles.mobileLink}>Kontakt</Link>
            <Link
              href="/docs/verb/introduktion"
              className={`${styles.pill} ${styles.pillPrimary} ${styles.mobileCta}`}>
              Börja lära dig
            </Link>
          </div>
        )}
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
