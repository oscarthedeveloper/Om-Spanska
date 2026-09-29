'use client';
import {useId, useState} from 'react';
import styles from './GrammarLab.module.css';
type Choice = {text: string; feedback: string; correct: boolean};
export default function SentenceTransform({title, sentence, instruction, choices}: {title: string; sentence: string; instruction: string; choices: Choice[]}) {
  const [selected, setSelected] = useState<number | null>(null);
  const id = useId();
  return <section className={styles.lab} aria-labelledby={id}>
    <p className="eyebrow">Prova själv · bygg om meningen</p><h3 id={id}>{title}</h3>
    <p className={styles.spanish} lang="es">{sentence}</p><p>{instruction}</p>
    <div className={styles.controls} role="group" aria-label="Välj din mening">
      {choices.map((choice, i) => <button type="button" key={i} lang="es" className={styles.choice} aria-pressed={selected === i} onClick={() => setSelected(i)}>{choice.text}</button>)}
    </div>
    <div aria-live="polite" aria-atomic="true">
      {selected !== null && <div className={styles.feedback}><p><strong>{choices[selected].correct ? 'Precis.' : 'Titta en gång till.'}</strong> {choices[selected].feedback}</p><button type="button" className={styles.choice} onClick={() => setSelected(null)}>Försök igen</button></div>}
    </div>
  </section>;
}
