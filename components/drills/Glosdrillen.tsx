'use client';

import {useState, useRef, useEffect} from 'react';
import {DECKS, type Deck, type Word, type WordType} from '@/data/decks';
import styles from './Glosdrillen.module.css';

type DeckStat = {best: number | null; missed: string[]};
type Progress = Record<number, DeckStat>;
type Phase = 'select' | 'drill' | 'results';
type Mode = 'write' | 'choice';

const ACCENT_CHARS = ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü'];

const STORAGE_KEY = 'omspanska.glosdrillen.v1';

const TYPE_LABEL: Record<WordType, string> = {
  subst: 'subst.', verb: 'verb', adj: 'adj.',
  adv: 'adv.', konj: 'konj.', prep: 'prep.',
  interj: 'interj.', pron: 'pron.', uttr: 'uttryck',
};

// ─── HJÄLPFUNKTIONER ─────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalize(s: string): string {
  return s
    .toLowerCase().trim()
    .replace(/[¿¡?!.,;:]/g, '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ').trim();
}

function displayAnswer(word: Word): string {
  return word.article ? `${word.article} ${word.es}` : word.es;
}

function checkAnswer(input: string, word: Word): boolean {
  const u    = normalize(input);
  const es   = normalize(word.es);
  const full = word.article ? normalize(`${word.article} ${word.es}`) : null;
  return u === es || (full !== null && u === full);
}

function generateChoices(deckWords: Word[], correct: Word): Word[] {
  const pool  = shuffle(deckWords.filter(w => w.es !== correct.es));
  return shuffle([correct, ...pool.slice(0, 3)]);
}

function typeDisplay(word: Word): string {
  const base = TYPE_LABEL[word.type] || word.type;
  if (word.type === 'subst' && word.article) return `${base} · ${word.article}`;
  return base;
}

function loadProgress(): Progress {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveProgress(data: Progress): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* privat läge eller full disk — övningen fungerar ändå */
  }
}

/* Kortlekarnas färgblock, i ordning per nivå. */
const LEVEL_BLOCK: Record<string, string> = {
  'Absolut nybörjare': 'blockLime',
  'Nybörjare':         'blockMint',
  'Mellannivå':        'blockCream',
  'Mellansvår':        'blockCoral',
  'Svår':              'blockPink',
  'Proffs':            'blockLilac',
};

// ─── DELKOMPONENTER ──────────────────────────────────────────────────────────

function DeckCard({deck, stat, onStart, onStartMissed}: {
  deck: Deck;
  stat?: DeckStat;
  onStart: () => void;
  onStartMissed: () => void;
}) {
  const counts = deck.words.reduce<Record<string, number>>((acc, w) => {
    acc[w.type] = (acc[w.type] || 0) + 1;
    return acc;
  }, {});
  const other = deck.words.length - (counts.subst || 0) - (counts.verb || 0) - (counts.adj || 0);
  const missed = stat?.missed?.length || 0;

  return (
    <article className={`${styles.deckCard} ${styles[LEVEL_BLOCK[deck.level]] || ''}`}>
      <div className={styles.deckTop}>
        <span className={styles.deckNum}>{String(deck.id).padStart(2, '0')}</span>
        <span className={styles.deckLevel}>{deck.level}</span>
      </div>
      <h2 className={styles.deckTheme}>{deck.theme}</h2>
      <p className={styles.deckCompo}>
        {deck.words.length} glosor · {counts.subst || 0} subst · {counts.verb || 0} verb
        · {counts.adj || 0} adj · {other} blandat
      </p>

      {stat?.best != null && (
        <p className={styles.deckBest}>
          Bästa resultat: {stat.best} av {deck.words.length}
          {missed > 0 && ` · ${missed} att repetera`}
        </p>
      )}

      <div className={styles.deckActions}>
        <button type="button" className="pillButton pillButton--onColor" onClick={onStart}>
          {stat?.best != null ? 'Öva igen' : 'Börja öva'}
        </button>
        {missed > 0 && (
          <button type="button" className={styles.textBtn} onClick={onStartMissed}>
            Mina fel ({missed})
          </button>
        )}
      </div>
    </article>
  );
}

// ─── HUVUDKOMPONENT ──────────────────────────────────────────────────────────

export default function Glosdrillen() {
  const [phase, setPhase] = useState<Phase>('select');
  const [deckId, setDeckId] = useState<number | null>(null);
  const [mode, setMode] = useState<Mode>('write');
  const [shuffled, setShuffled] = useState<Word[]>([]);
  const [idx,      setIdx]      = useState(0);
  const [answer, setAnswer] = useState('');
  const [choices, setChoices] = useState<Word[]>([]);
  const [chosen, setChosen] = useState<number | null>(null);
  const [checked,  setChecked]  = useState(false);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [score,    setScore]    = useState({ right: 0, wrong: 0 });
  const [missedNow, setMissedNow] = useState<string[]>([]);
  const [progressData, setProgressData] = useState<Progress>({});
  const [isReview, setIsReview] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => { setProgressData(loadProgress()); }, []);

  const deck = deckId !== null ? DECKS.find(d => d.id === deckId) ?? null : null;
  const word  = shuffled[idx] || null;
  const total = shuffled.length;
  const pctThrough = total > 0 ? (idx / total) * 100 : 0;

  useEffect(() => {
    if (phase === 'drill' && mode === 'choice' && deck && word) {
      setChoices(generateChoices(deck.words, word));
    }
  }, [idx, mode, phase, deckId]);

  useEffect(() => {
    if (phase === 'drill' && mode === 'write' && !checked) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 90);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [idx, mode, phase, checked]);

  const beginDrill = (id: number, words: Word[], review: boolean) => {
    setDeckId(id);
    setShuffled(shuffle(words));
    setIdx(0);
    setAnswer('');
    setChosen(null);
    setChecked(false);
    setCorrect(null);
    setScore({ right: 0, wrong: 0 });
    setMissedNow([]);
    setIsReview(review);
    setPhase('drill');
  };

  const startDeck = (id: number) => {
    const d = DECKS.find(x => x.id === id);
    if (!d) return;
    beginDrill(id, d.words, false);
  };

  const startMissed = (id: number) => {
    const d = DECKS.find(x => x.id === id);
    if (!d) return;
    const missed = progressData[id]?.missed || [];
    const words = d.words.filter(w => missed.includes(w.es));
    if (words.length === 0) return;
    beginDrill(id, words, true);
  };

  const switchMode = (m: Mode) => {
    if (m === mode) return;
    setMode(m);
    setAnswer('');
    setChosen(null);
    setChecked(false);
    setCorrect(null);
  };

  const register = (ok: boolean) => {
    setChecked(true);
    setCorrect(ok);
    setScore(s => ({ right: s.right + (ok ? 1 : 0), wrong: s.wrong + (ok ? 0 : 1) }));
    if (!ok && word) setMissedNow(m => (m.includes(word.es) ? m : [...m, word.es]));
  };

  const handleCheck = () => {
    if (!word || checked) return;
    register(checkAnswer(answer, word));
  };

  const handleChoiceSelect = (i: number) => {
    if (checked || !word) return;
    register(choices[i].es === word.es);
  };

  const persistResult = (right: number) => {
    if (!deckId) return;
    const prev = progressData[deckId] || { best: null, missed: [] };
    const prevMissed = new Set<string>(prev.missed);
    // Ord som gick rätt den här omgången räknas som repeterade
    shuffled.forEach(w => { if (!missedNow.includes(w.es)) prevMissed.delete(w.es); });
    missedNow.forEach(es => prevMissed.add(es));
    const best = isReview ? prev.best : Math.max(prev.best ?? 0, right);
    const next = { ...progressData, [deckId]: { best, missed: [...prevMissed] } };
    setProgressData(next);
    saveProgress(next);
  };

  const handleNext = () => {
    if (idx < total - 1) {
      setIdx(i => i + 1);
      setAnswer('');
      setChosen(null);
      setChecked(false);
      setCorrect(null);
    } else {
      persistResult(score.right);
      setPhase('results');
    }
  };

  const handleBack = () => {
    setPhase('select');
    setDeckId(null);
    setShuffled([]);
    setIsReview(false);
  };

  const insertAccent = (char: string) => {
    const el = inputRef.current;
    if (!el) return;
    const s = el.selectionStart ?? 0;
    const e = el.selectionEnd ?? s;
    setAnswer(answer.slice(0, s) + char + answer.slice(e));
    window.setTimeout(() => { el.focus(); el.setSelectionRange(s + 1, s + 1); }, 0);
  };

  const pct = total > 0 ? Math.round((score.right / total) * 100) : 0;
  const stillMissed = (deckId !== null && progressData[deckId]?.missed?.length) || 0;

  return (
    <div className={styles.page}>

        <header className={styles.header}>
          <p className={styles.eyebrow}>Övning</p>
          <h1 className={styles.title}>Glosdrillen</h1>
          <p className={styles.desc}>
            Femton kortlekar, 750 glosor. Skriv svaret eller välj bland fyra
            alternativ. Dina resultat sparas i den här webbläsaren.
          </p>
        </header>

        {/* ══ VÄLJ KORTLEK ══════════════════════════════════════════════════ */}
        {phase === 'select' && (
          <div className={styles.deckGrid}>
            {DECKS.map(d => (
              <DeckCard
                key={d.id}
                deck={d}
                stat={progressData[d.id]}
                onStart={() => startDeck(d.id)}
                onStartMissed={() => startMissed(d.id)}
              />
            ))}
          </div>
        )}

        {/* ══ ÖVNING ════════════════════════════════════════════════════════ */}
        {phase === 'drill' && word && (
          <div className={styles.drillPhase}>

            <div className={styles.drillHeader}>
              <button type="button" className={styles.textBtn} onClick={handleBack}>
                ← Kortlekar
              </button>
              <div className={styles.modeToggle} role="group" aria-label="Övningsläge">
                <button
                  type="button"
                  aria-pressed={mode === 'write'}
                  className={`${styles.modeBtn} ${mode === 'write' ? styles.modeBtnActive : ''}`}
                  onClick={() => switchMode('write')}>
                  Skriv
                </button>
                <button
                  type="button"
                  aria-pressed={mode === 'choice'}
                  className={`${styles.modeBtn} ${mode === 'choice' ? styles.modeBtnActive : ''}`}
                  onClick={() => switchMode('choice')}>
                  Flerval
                </button>
              </div>
              <span className={styles.progressLabel}>
                {isReview && 'repetition · '}{idx + 1} / {total}
              </span>
            </div>

            <div
              className={styles.progressBarOuter}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={idx}
              aria-label="Framsteg i kortleken">
              <div className={styles.progressBarFill} style={{width: `${pctThrough}%`}} />
            </div>

            <div className={styles.wordCard}>
              <p className={styles.wordSv}>{word.sv}</p>
              <div className={styles.wordMeta}>
                <span className={styles.wordType}>{typeDisplay(word)}</span>
                {word.note && <span className={styles.wordNote}>{word.note}</span>}
              </div>
            </div>

            {/* Skrivläge */}
            {mode === 'write' && (
              <div className={styles.answerArea}>
                <label className={styles.srOnly} htmlFor="glosanswer">
                  Skriv {word.sv} på spanska
                </label>
                <input
                  id="glosanswer"
                  ref={inputRef}
                  type="text"
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  onKeyDown={e => {
                    if (e.key !== 'Enter') return;
                    e.preventDefault();
                    if (checked) handleNext(); else handleCheck();
                  }}
                  className={`${styles.writeInput} ${checked && correct ? styles.writeInputOk : ''} ${checked && !correct ? styles.writeInputErr : ''}`}
                  placeholder="Skriv på spanska…"
                  disabled={checked}
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  aria-invalid={checked && !correct ? true : undefined}
                />

                {!checked && (
                  <div className={styles.accentRow}>
                    <span className={styles.accentLabel}>Tecken</span>
                    {ACCENT_CHARS.map(c => (
                      <button
                        key={c}
                        type="button"
                        className={styles.accentBtn}
                        aria-label={`Infoga ${c}`}
                        tabIndex={-1}
                        onMouseDown={e => { e.preventDefault(); insertAccent(c); }}>
                        {c}
                      </button>
                    ))}
                  </div>
                )}

                {checked && (
                  <p
                    className={correct ? styles.feedbackOk : styles.feedbackErr}
                    role="status"
                    aria-live="polite">
                    {correct ? 'Rätt.' : 'Fel. '}
                    <strong>{displayAnswer(word)}</strong>
                  </p>
                )}

                <div className={styles.actions}>
                  {!checked ? (
                    <button type="button" className="pillButton pillButton--primary" onClick={handleCheck}>
                      Kontrollera
                    </button>
                  ) : (
                    <button type="button" className="pillButton pillButton--primary" onClick={handleNext}>
                      {idx < total - 1 ? 'Nästa' : 'Se resultat'}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Flervalsläge */}
            {mode === 'choice' && choices.length === 4 && (
              <div className={styles.answerArea}>
                <div className={styles.choiceGrid}>
                  {choices.map((c, i) => {
                    const isRight  = c.es === word.es;
                    const isChosen = chosen === i;
                    let cls = styles.choiceBtn;
                    if (checked) {
                      if (isRight)        cls += ' ' + styles.choiceBtnCorrect;
                      else if (isChosen)  cls += ' ' + styles.choiceBtnWrong;
                      else                cls += ' ' + styles.choiceBtnDim;
                    }
                    return (
                      <button
                        key={i}
                        type="button"
                        className={cls}
                        onClick={() => handleChoiceSelect(i)}
                        disabled={checked}>
                        {displayAnswer(c)}
                      </button>
                    );
                  })}
                </div>

                {checked && (
                  <>
                    <p
                      className={correct ? styles.feedbackOk : styles.feedbackErr}
                      role="status"
                      aria-live="polite">
                      {correct ? 'Rätt.' : 'Fel. '}
                      <strong>{displayAnswer(word)}</strong>
                    </p>
                    <div className={styles.actions}>
                      <button type="button" className="pillButton pillButton--primary" onClick={handleNext}>
                        {idx < total - 1 ? 'Nästa' : 'Se resultat'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* ══ RESULTAT ══════════════════════════════════════════════════════ */}
        {phase === 'results' && deck && (
          <div className={styles.resultsCard}>
            <p className={styles.eyebrow}>
              Kortlek {String(deck.id).padStart(2, '0')} · {deck.theme}
            </p>
            <p className={styles.resultsScore}>
              {score.right}<span className={styles.resultsSlash}>/{total}</span>
            </p>
            <p className={styles.resultsPct}>{pct} % rätt</p>
            <p className={styles.resultsFeedback}>
              {pct === 100
                ? 'Hela kortleken rätt.'
                : pct >= 80
                  ? 'Nästan hela vägen. Ta de sista i en repetitionsrunda.'
                  : pct >= 60
                    ? 'Halvvägs. Repetera de du missade så sitter de nästa gång.'
                    : 'Den här kortleken behöver en runda till.'}
            </p>
            <div className={styles.resultsBtns}>
              {stillMissed > 0 && (
                <button
                  type="button"
                  className="pillButton pillButton--primary"
                  onClick={() => startMissed(deck.id)}>
                  Öva mina fel ({stillMissed})
                </button>
              )}
              <button
                type="button"
                className="pillButton pillButton--secondary"
                onClick={() => startDeck(deck.id)}>
                Hela kortleken igen
              </button>
              <button type="button" className={styles.textBtn} onClick={handleBack}>
                ← Kortlekar
              </button>
            </div>
          </div>
        )}

    </div>
  );
}
