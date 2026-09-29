'use client';
import {useId, useState} from 'react';
import styles from './GrammarLab.module.css';
type Part = {text: string; label: string; role: 'subject' | 'verb' | 'object' | 'connector'};
type Step = {sentence: string; translation: string; explanation: string; parts?: Part[]};
export default function SentenceSteps({title, steps}: {title: string; steps: Step[]}) {
  const [index, setIndex] = useState(0);
  const id = useId();
  const step = steps[index];
  if (!step) return null;
  return <section className={styles.lab} aria-labelledby={id}>
    <p className="eyebrow">Följ meningen · steg för steg</p><h3 id={id}>{title}</h3>
    <div aria-live="polite" aria-atomic="true">
      <p className={styles.label}>Steg {index + 1} av {steps.length}</p>
      <div className={styles.example}><p className={styles.spanish} lang="es">{step.sentence}</p><p className={styles.translation}>{step.translation}</p></div>
      {step.parts && <div className={styles.parts}>{step.parts.map((part, i) => <div key={i} className={`${styles.part} ${styles[part.role]}`}><span className={styles.label}>{part.label}</span><span lang="es">{part.text}</span></div>)}</div>}
      <p>{step.explanation}</p>
    </div>
    <div className={styles.controls}>
      <button type="button" className={styles.choice} disabled={index === 0} onClick={() => setIndex(index - 1)}>Föregående steg</button>
      <button type="button" className={styles.choice} disabled={index === steps.length - 1} onClick={() => setIndex(index + 1)}>Nästa steg</button>
      {index === steps.length - 1 && <button type="button" className={styles.choice} onClick={() => setIndex(0)}>Börja om</button>}
    </div>
  </section>;
}
