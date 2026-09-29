'use client';

import Link from 'next/link';
import {useEffect, useState} from 'react';
import {LEARNING_STEPS, getLearningStep, getNextLearningStep} from '@/lib/learning-path';
import {
  EMPTY_LEARNING_PROGRESS,
  LEARNING_PROGRESS_EVENT,
  readLearningProgress,
  writeLearningProgress,
  type LearningProgress,
} from '@/lib/learning-progress';
import styles from './LearningStepProgress.module.css';

export default function LearningStepProgress({href}: {href: string}) {
  const step = getLearningStep(href);
  const nextStep = getNextLearningStep(href);
  const [progress, setProgress] = useState<LearningProgress>(EMPTY_LEARNING_PROGRESS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!step) return;
    const stored = readLearningProgress();
    const next = {...stored, lastVisited: href};
    setProgress(next);
    writeLearningProgress(next);
    setReady(true);

    function syncProgress(event: Event) {
      const detail = (event as CustomEvent<LearningProgress>).detail;
      setProgress(detail ?? readLearningProgress());
    }

    window.addEventListener(LEARNING_PROGRESS_EVENT, syncProgress);
    return () => window.removeEventListener(LEARNING_PROGRESS_EVENT, syncProgress);
  }, [href, step]);

  if (!step) return null;

  const stepId = step.id;
  const number = LEARNING_STEPS.findIndex(item => item.id === stepId) + 1;
  const isDone = progress.completed.includes(stepId);

  function toggleComplete() {
    const completed = isDone
      ? progress.completed.filter(id => id !== stepId)
      : [...progress.completed, stepId];
    const next: LearningProgress = {
      ...progress,
      completed,
      lastVisited: !isDone && nextStep ? nextStep.href : href,
    };
    setProgress(next);
    writeLearningProgress(next);
  }

  return (
    <aside className={styles.card} aria-label="Lärsteg">
      <div className={styles.copy}>
        <p className="eyebrow">Spanska från början · Steg {number} av {LEARNING_STEPS.length}</p>
        <h2>{isDone ? 'Du har läst genomgången.' : 'Klar med genomgången?'}</h2>
        <p>
          {isDone
            ? 'Din progression är sparad i den här webbläsaren.'
            : 'Markera när du har läst. Ditt resultat på snabbkollen sparas separat — att ha läst och att kunna använda är två olika steg.'}
        </p>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={`pillButton ${isDone ? 'pillButton--secondary' : 'pillButton--primary'}`}
          onClick={toggleComplete}
          disabled={!ready}>
          {isDone ? 'Ångra markering' : 'Markera som läst'}
        </button>
        {isDone && nextStep && (
          <Link href={nextStep.href} className={styles.nextLink}>
            Nästa i lärstigen: {nextStep.title} →
          </Link>
        )}
        {isDone && !nextStep && (
          <Link href="/larstig" className={styles.nextLink}>Se hela lärstigen →</Link>
        )}
      </div>
    </aside>
  );
}
