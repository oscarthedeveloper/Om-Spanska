'use client';

import Link from 'next/link';
import {useEffect, useMemo, useState} from 'react';
import {DECKS} from '@/data/decks';
import {LEARNING_STEPS} from '@/lib/learning-path';
import {
  EMPTY_LEARNING_PROGRESS,
  continueLearningWith,
  readLearningProgress,
  type LearningProgress,
} from '@/lib/learning-progress';
import {getReviewSummary} from '@/lib/repetition-queue';
import styles from './ProgressDashboard.module.css';

type VerbProgress = Record<string, {done?: string[]; missed?: string[]}>;
type GlossProgress = Record<string, {best?: number | null; missed?: string[]}>;

const VERB_PROGRESS_KEY = 'omspanska.verbdrillen.v1';
const GLOSS_PROGRESS_KEY = 'omspanska.glosdrillen.v1';

function readStoredRecord<T>(key: string): T {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) ?? '{}');
    return value && typeof value === 'object' ? value as T : {} as T;
  } catch {
    return {} as T;
  }
}

function verbCategoryHref(key: string): string {
  const [tempus, modus, typ] = key.split('_');
  const params = new URLSearchParams({tempus, modus, typ});
  return `/verbdrillen?${params.toString()}`;
}

export default function ProgressDashboard() {
  const [learning, setLearning] = useState<LearningProgress>(EMPTY_LEARNING_PROGRESS);
  const [verbs, setVerbs] = useState<VerbProgress>({});
  const [glosses, setGlosses] = useState<GlossProgress>({});
  const [review, setReview] = useState({due: 0, scheduled: 0, mastered: 0});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLearning(readLearningProgress());
    setVerbs(readStoredRecord<VerbProgress>(VERB_PROGRESS_KEY));
    setGlosses(readStoredRecord<GlossProgress>(GLOSS_PROGRESS_KEY));
    setReview(getReviewSummary());
    setReady(true);
  }, []);

  const stats = useMemo(() => {
    const completed = LEARNING_STEPS.filter(step => learning.completed.includes(step.id)).length;
    const quizzes = LEARNING_STEPS.filter(step => learning.quizResults[step.id]).length;
    const bestQuizAnswers = Object.values(learning.quizResults)
      .reduce((sum, result) => sum + result.best, 0);
    const totalQuizAnswers = Object.values(learning.quizResults)
      .reduce((sum, result) => sum + result.total, 0);

    const verbEntries = Object.entries(verbs);
    const verbDone = verbEntries.reduce((sum, [, value]) => sum + (Array.isArray(value.done) ? value.done.length : 0), 0);
    const verbMissed = verbEntries.reduce((sum, [, value]) => sum + (Array.isArray(value.missed) ? value.missed.length : 0), 0);
    const firstVerbReview = verbEntries.find(([, value]) => Array.isArray(value.missed) && value.missed.length > 0);

    const glossEntries = Object.entries(glosses);
    const glossDecks = glossEntries.filter(([, value]) => typeof value.best === 'number').length;
    const glossMissed = glossEntries.reduce((sum, [, value]) => sum + (Array.isArray(value.missed) ? value.missed.length : 0), 0);
    const firstGlossReview = glossEntries.find(([, value]) => Array.isArray(value.missed) && value.missed.length > 0);

    return {
      completed,
      quizzes,
      bestQuizAnswers,
      totalQuizAnswers,
      verbDone,
      verbMissed,
      firstVerbReview,
      glossDecks,
      glossMissed,
      firstGlossReview,
    };
  }, [glosses, learning, verbs]);

  const continueStep = continueLearningWith(learning);
  const learningPercent = Math.round((stats.completed / LEARNING_STEPS.length) * 100);
  const firstGlossDeck = stats.firstGlossReview
    ? DECKS.find(deck => String(deck.id) === stats.firstGlossReview?.[0])
    : undefined;

  if (!ready) {
    return <main className={styles.page}><p>Läser in dina framsteg …</p></main>;
  }

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <p className="eyebrow">Sparas lokalt · inget konto</p>
        <h1>Mina framsteg</h1>
        <p>
          Här samlas det du gör i lärstigen, verbdrillen och glosdrillen på den här enheten.
        </p>
      </header>

      <section className={styles.cards} aria-label="Översikt">
        <article className={`${styles.card} ${styles.learningCard}`}>
          <p className="eyebrow">Lärstigen</p>
          <p className={styles.bigNumber}>{stats.completed}<span> / {LEARNING_STEPS.length}</span></p>
          <p>genomgångar lästa · {learningPercent} procent</p>
          <div className={styles.meter} aria-hidden="true">
            <span style={{width: `${learningPercent}%`}} />
          </div>
          <p className={styles.detail}>
            {stats.quizzes} snabbkollar gjorda
            {stats.totalQuizAnswers > 0 && ` · ${stats.bestQuizAnswers} av ${stats.totalQuizAnswers} rätt som bäst`}
          </p>
          <Link href={continueStep?.href ?? '/larstig'} className="pillButton pillButton--primary">
            {continueStep ? `Fortsätt: ${continueStep.title}` : 'Se den klara lärstigen'}
          </Link>
        </article>

        <article className={`${styles.card} ${styles.verbCard}`}>
          <p className="eyebrow">Verbdrillen</p>
          <p className={styles.bigNumber}>{stats.verbDone}</p>
          <p>verb godkända i valda kategorier</p>
          <p className={styles.detail}>
            {stats.verbMissed > 0 ? `${stats.verbMissed} verb väntar på repetition.` : 'Inga sparade fel att repetera.'}
          </p>
          <Link
            href={stats.firstVerbReview ? verbCategoryHref(stats.firstVerbReview[0]) : '/verbdrillen'}
            className="pillButton pillButton--primary">
            {stats.firstVerbReview ? 'Öva verb som blev fel' : 'Öppna verbdrillen'}
          </Link>
        </article>

        <article className={`${styles.card} ${styles.glossCard}`}>
          <p className="eyebrow">Glosdrillen</p>
          <p className={styles.bigNumber}>{stats.glossDecks}<span> / {DECKS.length}</span></p>
          <p>kortlekar påbörjade</p>
          <p className={styles.detail}>
            {stats.glossMissed > 0 ? `${stats.glossMissed} glosor väntar på repetition.` : 'Inga sparade glosfel att repetera.'}
          </p>
          <Link
            href={firstGlossDeck ? `/glosdrillen?kortlek=${firstGlossDeck.id}&repetition=1` : '/glosdrillen'}
            className="pillButton pillButton--primary">
            {firstGlossDeck ? `Repetera kortlek ${firstGlossDeck.id}` : 'Öppna glosdrillen'}
          </Link>
        </article>
      </section>

      <section className={styles.nextMove} aria-labelledby="nasta-rubrik">
        <div>
          <p className="eyebrow">Nästa bra steg</p>
          <h2 id="nasta-rubrik">
            {review.due > 0
              ? `${review.due} ${review.due === 1 ? 'sak' : 'saker'} att repetera idag.`
              : review.scheduled > 0
                ? 'Dagens repetition är klar.'
                : continueStep
                  ? `Fortsätt med ${continueStep.title}.`
                  : 'Fortsätt hålla spanskan levande.'}
          </h2>
        </div>
        <div className={styles.nextAction}>
          <p>
            {review.due > 0
              ? 'Ett kort blandat pass med quizfrågor, verb och glosor som du tidigare missat.'
              : review.scheduled > 0
                ? `${review.scheduled} saker ligger i repetitionsplanen och kommer tillbaka när det är dags.`
                : 'Du har inga sparade fel just nu. Gå vidare i lärstigen eller välj en ny övning.'}
          </p>
          {review.due > 0 && (
            <Link href="/repetition" className="pillButton pillButton--primary">
              Starta dagens repetition
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
