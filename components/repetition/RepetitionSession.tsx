'use client';

import Link from 'next/link';
import {useEffect, useId, useState, type FormEvent} from 'react';
import {
  getDailyReviewItems,
  getReviewSummary,
  recordReviewAnswer,
  type ReviewItem,
} from '@/lib/repetition-queue';
import styles from './RepetitionSession.module.css';

const ACCENT_CHARS = ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü'];

function clean(value: string): string {
  return value.toLowerCase().trim().replace(/[¿¡?!.,;:]/g, '').replace(/\s+/g, ' ');
}

function expectedAnswer(item: ReviewItem): string {
  if (item.kind === 'quiz') return item.options[item.answer];
  if (item.kind === 'verb') return item.answer;
  return item.word.article ? `${item.word.article} ${item.word.es}` : item.word.es;
}

function writtenAnswerIsCorrect(item: ReviewItem, value: string): boolean {
  const given = clean(value);
  if (item.kind === 'verb') return given === clean(item.answer);
  if (item.kind === 'gloss') {
    const bare = clean(item.word.es);
    const full = item.word.article ? clean(`${item.word.article} ${item.word.es}`) : bare;
    return given === bare || given === full;
  }
  return false;
}

function sourceLabel(item: ReviewItem): string {
  if (item.kind === 'quiz') return `Miniövning · ${item.title}`;
  if (item.kind === 'verb') return `Verb · ${item.categoryLabel}`;
  return `Glosor · Kortlek ${item.deck.id}`;
}

export default function RepetitionSession() {
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [ready, setReady] = useState(false);
  const [finished, setFinished] = useState(false);
  const promptId = useId();

  function loadSession() {
    setItems(getDailyReviewItems(10));
    setIndex(0);
    setAnswer('');
    setSelected(null);
    setChecked(false);
    setCorrect(false);
    setScore(0);
    setFinished(false);
    setReady(true);
  }

  useEffect(() => { loadSession(); }, []);

  const item = items[index];

  function registerResult(isCorrect: boolean) {
    if (!item || checked) return;
    setCorrect(isCorrect);
    setChecked(true);
    if (isCorrect) setScore(value => value + 1);
    recordReviewAnswer(item, isCorrect);
  }

  function choose(optionIndex: number) {
    if (!item || item.kind !== 'quiz' || checked) return;
    setSelected(optionIndex);
    registerResult(optionIndex === item.answer);
  }

  function checkWritten(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!item || item.kind === 'quiz' || !answer.trim()) return;
    registerResult(writtenAnswerIsCorrect(item, answer));
  }

  function insertCharacter(character: string) {
    setAnswer(value => `${value}${character}`);
  }

  function next() {
    if (!checked) return;
    if (index === items.length - 1) {
      setFinished(true);
      return;
    }
    setIndex(value => value + 1);
    setAnswer('');
    setSelected(null);
    setChecked(false);
    setCorrect(false);
  }

  if (!ready) {
    return <main className={styles.page}><p>Läser in dagens repetition …</p></main>;
  }

  if (finished) {
    const remaining = getReviewSummary().due;
    return (
      <main className={styles.page}>
        <section className={`${styles.session} ${styles.finished}`}>
          <p className="eyebrow">Dagens repetition · Klar</p>
          <h1>{score} av {items.length} rätt</h1>
          <p>
            {score === items.length
              ? 'Bra. Det du kunde flyttas nu fram till nästa repetitionsintervall.'
              : 'Det som inte satt kommer tillbaka snart. Du behöver inte nöta allt på en gång.'}
          </p>
          <div className={styles.actions}>
            {remaining > 0 && (
              <button type="button" className="pillButton pillButton--primary" onClick={loadSession}>
                Fortsätt med nästa {Math.min(10, remaining)}
              </button>
            )}
            <Link href="/framsteg" className="pillButton pillButton--secondary">
              Till Mina framsteg
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (!item) {
    const summary = getReviewSummary();
    return (
      <main className={styles.page}>
        <section className={`${styles.session} ${styles.empty}`}>
          <p className="eyebrow">Dagens repetition</p>
          <h1>Inget väntar idag.</h1>
          <p>
            {summary.scheduled > 0
              ? 'Bra jobbat. Nästa repetition öppnas automatiskt när det är dags.'
              : 'När du gör en miniövning, verbdrill eller glosdrill samlas misstagen här.'}
          </p>
          <Link href="/framsteg" className="pillButton pillButton--primary">Till Mina framsteg</Link>
        </section>
      </main>
    );
  }

  const cardClass = item.kind === 'quiz'
    ? styles.quizCard
    : item.kind === 'verb'
      ? styles.verbCard
      : styles.glossCard;

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p className="eyebrow">5–10 minuter · bara sådant du behöver</p>
          <h1>Dagens repetition</h1>
        </div>
        <p>{index + 1} av {items.length}</p>
      </header>

      <div className={styles.progress} aria-hidden="true">
        <span style={{width: `${((index + (checked ? 1 : 0)) / items.length) * 100}%`}} />
      </div>

      <section className={`${styles.session} ${cardClass}`} aria-labelledby={promptId}>
        <p className="eyebrow">{sourceLabel(item)}</p>

        {item.kind === 'quiz' && (
          <>
            <h2 id={promptId}>{item.prompt}</h2>
            <div className={styles.options} role="group" aria-labelledby={promptId}>
              {item.options.map((option, optionIndex) => {
                let className = styles.option;
                if (checked) {
                  if (optionIndex === item.answer) className += ` ${styles.correctOption}`;
                  else if (optionIndex === selected) className += ` ${styles.wrongOption}`;
                  else className += ` ${styles.dimOption}`;
                }
                return (
                  <button
                    key={option}
                    type="button"
                    className={className}
                    onClick={() => choose(optionIndex)}
                    disabled={checked}>
                    <span>{String.fromCharCode(65 + optionIndex)}</span>
                    {option}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {item.kind === 'verb' && (
          <>
            <h2 id={promptId}>Böj <em>{item.verb.inf}</em> för <em>{item.person}</em>.</h2>
            <p className={styles.hint}>Svenska: {item.verb.swe}</p>
          </>
        )}

        {item.kind === 'gloss' && (
          <>
            <h2 id={promptId}>Hur säger man <em>{item.word.sv}</em> på spanska?</h2>
            <p className={styles.hint}>Skriv gärna artikeln om ordet är ett substantiv.</p>
          </>
        )}

        {item.kind !== 'quiz' && (
          <form className={styles.answerForm} onSubmit={checkWritten}>
            <label htmlFor="repetitionssvar" className="srOnly">Ditt svar</label>
            <input
              id="repetitionssvar"
              value={answer}
              onChange={event => setAnswer(event.target.value)}
              placeholder="Skriv ditt svar"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              disabled={checked}
              autoFocus
            />
            <div className={styles.accents} aria-label="Spanska tecken">
              {ACCENT_CHARS.map(character => (
                <button key={character} type="button" onClick={() => insertCharacter(character)} disabled={checked}>
                  {character}
                </button>
              ))}
            </div>
            {!checked && (
              <button type="submit" className="pillButton pillButton--primary" disabled={!answer.trim()}>
                Rätta
              </button>
            )}
          </form>
        )}

        {checked && (
          <div className={`${styles.feedback} ${correct ? styles.correctFeedback : styles.wrongFeedback}`} role="status">
            <strong>{correct ? 'Rätt.' : 'Inte riktigt.'}</strong>
            {item.kind === 'quiz' && <p>{item.explanation}</p>}
            {!correct && <p>Rätt svar: <strong>{expectedAnswer(item)}</strong></p>}
            {correct && item.kind !== 'quiz' && <p>Svaret är {expectedAnswer(item)}.</p>}
          </div>
        )}

        {checked && (
          <button type="button" className="pillButton pillButton--primary" onClick={next}>
            {index === items.length - 1 ? 'Se resultat' : 'Nästa fråga'}
          </button>
        )}
      </section>
    </main>
  );
}
