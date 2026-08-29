'use client';

import Link from 'next/link';
import {useEffect, useMemo, useRef, useState} from 'react';
import styles from './SearchDialog.module.css';

type SearchRecord = {
  t: string;   // titel
  d: string;   // beskrivning
  h: string;   // href
  c: string;   // kategori
  k: string;   // sort
  s: string[]; // underrubriker
  b: string;   // brödtext
};

type Hit = SearchRecord & {score: number; excerpt: string};

function fold(s: string) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function excerptAround(body: string, term: string) {
  const i = fold(body).indexOf(term);
  if (i < 0) return body.slice(0, 120).trim();
  const start = Math.max(0, i - 45);
  return (start > 0 ? '…' : '') + body.slice(start, start + 150).trim() + '…';
}

function search(records: SearchRecord[], raw: string): Hit[] {
  const terms = fold(raw).split(/\s+/).filter(t => t.length > 1);
  if (terms.length === 0) return [];

  const hits: Hit[] = [];
  for (const r of records) {
    const title = fold(r.t);
    const desc = fold(r.d);
    const subs = fold(r.s.join(' '));
    const body = fold(r.b);

    let score = 0;
    let matchedAll = true;

    for (const term of terms) {
      let s = 0;
      if (title === term) s += 120;
      else if (title.startsWith(term)) s += 70;
      else if (title.includes(term)) s += 45;
      if (subs.includes(term)) s += 22;
      if (desc.includes(term)) s += 14;
      if (body.includes(term)) s += 6;
      if (s === 0) matchedAll = false;
      score += s;
    }

    if (!matchedAll || score === 0) continue;
    if (r.k === 'grammatik') score += 4;
    hits.push({...r, score, excerpt: excerptAround(r.b || r.d, terms[0])});
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, 12);
}

export default function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [records, setRecords] = useState<SearchRecord[] | null>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open || records || failed) return;
    let cancelled = false;
    fetch('/search-index.json')
      .then(r => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then(data => { if (!cancelled) setRecords(data as SearchRecord[]); })
      .catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, [open, records, failed]);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 40);
      return () => window.clearTimeout(t);
    }
    setQuery('');
    setActive(0);
    return undefined;
  }, [open]);

  const hits = useMemo(
    () => (records ? search(records, query) : []),
    [records, query],
  );

  useEffect(() => { setActive(0); }, [query]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(i => Math.min(i + 1, hits.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive(i => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && hits[active]) {
      window.location.href = hits[active].h;
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Sök i grammatiken"
        onClick={e => e.stopPropagation()}
        onKeyDown={onKeyDown}>
        <div className={styles.inputRow}>
          <input
            ref={inputRef}
            type="search"
            className={styles.input}
            placeholder="Sök på regel, tidsform eller ord…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            aria-label="Sökord"
          />
          <button type="button" className={styles.close} onClick={onClose}>
            Esc
          </button>
        </div>

        <div className={styles.results} role="listbox" aria-label="Sökträffar">
          {failed && (
            <p className={styles.empty}>
              Sökindexet kunde inte laddas. Ladda om sidan och försök igen.
            </p>
          )}

          {!failed && !records && <p className={styles.empty}>Laddar…</p>}

          {records && query.trim().length > 1 && hits.length === 0 && (
            <p className={styles.empty}>
              Inga träffar på <strong>{query}</strong>.
            </p>
          )}

          {records && query.trim().length <= 1 && (
            <p className={styles.empty}>
              Skriv minst två tecken. Piltangenter bläddrar, Enter öppnar.
            </p>
          )}

          {hits.map((hit, i) => (
            <Link
              key={hit.h}
              href={hit.h}
              role="option"
              aria-selected={i === active}
              className={`${styles.hit} ${i === active ? styles.hitActive : ''}`}
              onMouseEnter={() => setActive(i)}
              onClick={onClose}>
              <span className={styles.hitCategory}>{hit.c}</span>
              <span className={styles.hitTitle}>{hit.t}</span>
              <span className={styles.hitExcerpt}>{hit.excerpt}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
