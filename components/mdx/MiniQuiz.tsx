'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useId, useState} from 'react';
import {getLearningStep, getNextLearningStep} from '@/lib/learning-path';
import {readLearningProgress, writeLearningProgress} from '@/lib/learning-progress';
import styles from './MiniQuiz.module.css';

export type MiniQuizQuestion = {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  /** Valfri, valspecifik förklaring. Samma ordning som options. */
  feedback?: string[];
};

type Props = {
  title?: string;
  questions: MiniQuizQuestion[];
};

export default function MiniQuiz({title = 'Snabbkoll', questions}: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [missedIndices, setMissedIndices] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [stepMarked, setStepMarked] = useState(false);
  const questionId = useId();
  const pathname = usePathname();
  const step = getLearningStep(pathname);
  const nextStep = getNextLearningStep(pathname);

  if (questions.length === 0) return null;

  const question = questions[index];
  const isCorrect = selected === question.answer;

  function choose(optionIndex: number) {
    if (selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === question.answer) setScore(value => value + 1);
    else setMissedIndices(value => value.includes(index) ? value : [...value, index]);
  }

  function next() {
    if (selected === null) return;
    if (index === questions.length - 1) {
      if (step) {
        const progress = readLearningProgress();
        const previous = progress.quizResults[step.id];
        writeLearningProgress({
          ...progress,
          lastVisited: pathname,
          quizResults: {
            ...progress.quizResults,
            [step.id]: {
              best: Math.max(previous?.best ?? 0, score),
              last: score,
              total: questions.length,
              attempts: (previous?.attempts ?? 0) + 1,
              missed: missedIndices,
            },
          },
        });
        setStepMarked(progress.completed.includes(step.id));
      }
      setFinished(true);
      return;
    }
    setIndex(value => value + 1);
    setSelected(null);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setMissedIndices([]);
    setFinished(false);
  }

  function markStepComplete() {
    if (!step) return;
    const progress = readLearningProgress();
    writeLearningProgress({
      ...progress,
      completed: Array.from(new Set([...progress.completed, step.id])),
      lastVisited: nextStep?.href ?? pathname,
    });
    setStepMarked(true);
  }

  if (finished) {
    return (
      <aside className={styles.quiz} aria-label={title}>
        <p className={styles.eyebrow}>Miniövning · Resultat</p>
        <p className={styles.resultScore}>{score} av {questions.length} rätt</p>
        <p className={styles.resultText}>
          {score === questions.length
            ? 'Bra – grunderna sitter.'
            : 'Gör gärna snabbkollen en gång till och läs förklaringarna vid svaren.'}
        </p>
        <div className={styles.resultActions}>
          {step && !stepMarked && (
            <button type="button" className="pillButton pillButton--primary" onClick={markStepComplete}>
              Markera genomgången som läst
            </button>
          )}
          {stepMarked && nextStep && (
            <Link href={nextStep.href} className="pillButton pillButton--primary">
              Nästa: {nextStep.title}
            </Link>
          )}
          {stepMarked && !nextStep && (
            <Link href="/larstig" className="pillButton pillButton--primary">
              Se hela lärstigen
            </Link>
          )}
          <button type="button" className="pillButton pillButton--onColor" onClick={restart}>
            Gör om miniövningen
          </button>
        </div>
      </aside>
    );
  }

  const feedback = selected === null
    ? ''
    : question.feedback?.[selected] || question.explanation;

  return (
    <aside className={styles.quiz} aria-label={title}>
      <div className={styles.topline}>
        <p className={styles.eyebrow}>Miniövning · {title}</p>
        <p className={styles.counter}>Fråga {index + 1} av {questions.length}</p>
      </div>

      <h3 className={styles.prompt} id={questionId}>{question.prompt}</h3>

      <div className={styles.options} role="group" aria-labelledby={questionId}>
        {question.options.map((option, optionIndex) => {
          let className = styles.option;
          if (selected !== null) {
            if (optionIndex === question.answer) className += ` ${styles.optionCorrect}`;
            else if (optionIndex === selected) className += ` ${styles.optionWrong}`;
            else className += ` ${styles.optionDim}`;
          }
          return (
            <button
              key={option}
              type="button"
              className={className}
              onClick={() => choose(optionIndex)}
              disabled={selected !== null}>
              <span className={styles.optionLetter} aria-hidden="true">
                {String.fromCharCode(65 + optionIndex)}
              </span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div
          className={`${styles.feedback} ${isCorrect ? styles.feedbackCorrect : styles.feedbackWrong}`}
          role="status"
          aria-live="polite">
          <p className={styles.feedbackHeading}>{isCorrect ? 'Rätt.' : 'Inte riktigt.'}</p>
          <p>{feedback}</p>
          {!isCorrect && (
            <p>Rätt svar: <strong>{question.options[question.answer]}</strong></p>
          )}
        </div>
      )}

      {selected !== null && (
        <button type="button" className="pillButton pillButton--primary" onClick={next}>
          {index === questions.length - 1 ? 'Se resultat' : 'Nästa fråga'}
        </button>
      )}
    </aside>
  );
}
