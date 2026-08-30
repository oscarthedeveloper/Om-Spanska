'use client';

import Link from 'next/link';
import {useEffect, useMemo, useState} from 'react';
import {LEARNING_PATH, LEARNING_STEPS} from '@/lib/learning-path';
import {
  EMPTY_LEARNING_PROGRESS,
  LEARNING_PROGRESS_EVENT,
  continueLearningWith,
  readLearningProgress,
  writeLearningProgress,
  type LearningProgress,
} from '@/lib/learning-progress';
import styles from './LearningPath.module.css';

export default function LearningPath() {
  const [progress, setProgress] = useState<LearningProgress>(EMPTY_LEARNING_PROGRESS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(readLearningProgress());
    setReady(true);

    function syncProgress(event: Event) {
      const detail = (event as CustomEvent<LearningProgress>).detail;
      setProgress(detail ?? readLearningProgress());
    }

    window.addEventListener(LEARNING_PROGRESS_EVENT, syncProgress);
    return () => window.removeEventListener(LEARNING_PROGRESS_EVENT, syncProgress);
  }, []);

  const completed = new Set(progress.completed);
  const continueStep = useMemo(() => continueLearningWith(progress), [progress]);
  const completedCount = LEARNING_STEPS.filter(step => completed.has(step.id)).length;
  const percent = Math.round((completedCount / LEARNING_STEPS.length) * 100);

  function rememberVisit(href: string) {
    const next = {...progress, lastVisited: href};
    setProgress(next);
    writeLearningProgress(next);
  }

  return (
    <>
      <section className={styles.overview} aria-labelledby="larstig-rubrik">
        <div className={styles.overviewCopy}>
          <p className="eyebrow">Spanska från början · A1–A2</p>
          <h1 id="larstig-rubrik">En sak i taget, i rätt ordning.</h1>
          <p className={styles.lead}>
            Följ femton korta genomgångar från alfabetet till dåtid. Du kan hoppa
            över sådant du redan kan och fortsätta precis där du slutade.
          </p>
          {ready && continueStep ? (
            <Link
              href={continueStep.href}
              className="pillButton pillButton--primary"
              onClick={() => rememberVisit(continueStep.href)}>
              {completedCount === 0 ? 'Börja med första steget' : `Fortsätt: ${continueStep.title}`}
            </Link>
          ) : ready ? (
            <p className={styles.completeMessage}>Klart! Du har gått igenom hela lärstigen.</p>
          ) : (
            <span className={styles.buttonPlaceholder} aria-hidden="true" />
          )}
        </div>

        <div className={styles.progressCard} aria-live="polite">
          <div className={styles.progressTop}>
            <span className="eyebrow">Din progression</span>
            <strong>{ready ? `${completedCount} av ${LEARNING_STEPS.length}` : '–'}</strong>
          </div>
          <div
            className={styles.progressBar}
            role="progressbar"
            aria-label="Avklarade steg i lärstigen"
            aria-valuemin={0}
            aria-valuemax={LEARNING_STEPS.length}
            aria-valuenow={completedCount}>
            {LEARNING_STEPS.map(step => (
              <span
                key={step.id}
                className={completed.has(step.id) ? styles.progressDone : styles.progressTodo}
              />
            ))}
          </div>
          <p>{ready ? `${percent} procent klart` : 'Läser in din progression …'}</p>
          <p className={styles.storageNote}>Sparas bara i den här webbläsaren. Inget konto behövs.</p>
          <Link href="/framsteg" className={styles.progressLink}>Se mina framsteg →</Link>
        </div>
      </section>

      <main className={styles.main}>
        {LEARNING_PATH.map((phase, phaseIndex) => (
          <section key={phase.id} className={styles.phase} aria-labelledby={`fas-${phase.id}`}>
            <header className={styles.phaseHead}>
              <p className="eyebrow">Del {phaseIndex + 1} av {LEARNING_PATH.length}</p>
              <h2 id={`fas-${phase.id}`}>{phase.title}</h2>
              <p>{phase.description}</p>
            </header>

            <ol className={styles.stepList}>
              {phase.steps.map(step => {
                const number = LEARNING_STEPS.findIndex(item => item.id === step.id) + 1;
                const isDone = completed.has(step.id);
                const isCurrent = ready && continueStep?.id === step.id;
                const quizResult = progress.quizResults[step.id];

                return (
                  <li key={step.id} className={styles.stepItem}>
                    <Link
                      href={step.href}
                      className={`${styles.stepLink} ${isDone ? styles.stepDone : ''} ${isCurrent ? styles.stepCurrent : ''}`}
                      onClick={() => rememberVisit(step.href)}>
                      <span className={styles.stepNumber} aria-hidden="true">
                        {isDone ? '✓' : String(number).padStart(2, '0')}
                      </span>
                      <span className={styles.stepCopy}>
                        <span className={styles.stepTitle}>{step.title}</span>
                        <span className={styles.stepDescription}>{step.description}</span>
                      </span>
                      <span className={styles.stepMeta}>
                        {isCurrent && <span className={styles.currentLabel}>Fortsätt här</span>}
                        {quizResult && (
                          <span className={styles.quizResult}>{quizResult.best}/{quizResult.total} rätt</span>
                        )}
                        <span>{step.time}</span>
                        <span className={styles.stepArrow} aria-hidden="true">→</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </main>
    </>
  );
}
