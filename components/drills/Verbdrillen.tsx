'use client';

import {useState, useRef, useCallback, useEffect} from 'react';
import {useSearchParams} from 'next/navigation';
import {VERB_DATA, type VerbEntry} from '@/data/verbs';
import styles from './Verbdrillen.module.css';

type Progress = Record<string, {done: string[]; missed: string[]}>;
type ActiveVerb = VerbEntry & {_idx: number};

// ─── FILTERVAL ────────────────────────────────────────────────────────────────

const TEMPUS_OPTIONS = [
  { id: 'presens',       label: 'Presens' },
  { id: 'preteritum',    label: 'Preteritum' },
  { id: 'imperfekt',     label: 'Imperfekt' },
  { id: 'perfekt',       label: 'Perfekt' },
  { id: 'futurum',       label: 'Futurum' },
  { id: 'futurum2',      label: 'Futurum II' },
  { id: 'konditionalis', label: 'Konditionalis' },
  { id: 'gerundium',     label: 'Presens progressiv' },
];

const MODUS_OPTIONS = [
  { id: 'indikativ',  label: 'Indikativ' },
  { id: 'konjunktiv', label: 'Konjunktiv' },
  { id: 'imperativ',  label: 'Imperativ' },
];

const TYP_OPTIONS = [
  { id: 'regular',        label: 'Regelbundna' },
  { id: 'reflexiva',      label: 'Reflexiva' },
  { id: 'diftongerande',  label: 'Diftongerande' },
  { id: 'vokalskiftande', label: 'Vokalskiftande' },
  { id: 'oregelbundna',   label: 'Oregelbundna' },
];

// ─── GILTIGA KOMBINATIONER ────────────────────────────────────────────────────

const VALID_COMBOS: Record<string, Record<string, string[]>> = {
  presens: {
    indikativ:  ['regular', 'reflexiva', 'diftongerande', 'vokalskiftande', 'oregelbundna'],
    konjunktiv: ['regular', 'oregelbundna'],
    imperativ:  ['regular', 'oregelbundna'],
  },
  preteritum: {
    indikativ:  ['regular', 'oregelbundna'],
    konjunktiv: [],
    imperativ:  [],
  },
  imperfekt: {
    indikativ:  ['regular', 'oregelbundna'],
    konjunktiv: ['regular', 'oregelbundna'],
    imperativ:  [],
  },
  perfekt: {
    indikativ:  ['regular', 'oregelbundna'],
    konjunktiv: [],
    imperativ:  [],
  },
  futurum: {
    indikativ:  ['regular'],
    konjunktiv: [],
    imperativ:  [],
  },
  futurum2: {
    indikativ:  ['regular', 'oregelbundna'],
    konjunktiv: [],
    imperativ:  [],
  },
  konditionalis: {
    indikativ:  ['regular', 'oregelbundna'],
    konjunktiv: [],
    imperativ:  [],
  },
  gerundium: {
    indikativ:  ['regular', 'oregelbundna'],
    konjunktiv: [],
    imperativ:  [],
  },
};

// ─── PRONOMEN ─────────────────────────────────────────────────────────────────

const PRONOUNS_DEFAULT   = ['yo', 'tú', 'él/ella', 'nosotros', 'vosotros', 'ellos/ellas'];
const PRONOUNS_IMPERATIV = ['—',  'tú', 'él/usted', 'nosotros', 'vosotros', 'ellos/ustedes'];

const ACCENT_CHARS = ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'];

const STORAGE_KEY = 'omspanska.verbdrillen.v1';


// ─── HJÄLPFUNKTIONER ──────────────────────────────────────────────────────────

const tidy = (s: string): string => s.toLowerCase().trim().replace(/\s+/g, ' ');

const withoutAccents = (s: string): string =>
  tidy(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const FORM_ENDINGS: Record<string, string[]> = {
  futurum2: ['é', 'ás', 'á', 'emos', 'éis', 'án'],
  konditionalis: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
};

function verbErrorFeedback({
  answer,
  correct,
  tempus,
  typ,
  person,
  index,
}: {
  answer: string;
  correct: string;
  tempus: string | null;
  typ: string | null;
  person: string;
  index: number;
}): string {
  const given = tidy(answer);
  const expected = tidy(correct);

  if (!given) return 'Du lämnade formen tom.';
  if (withoutAccents(given) === withoutAccents(expected)) {
    return 'Bokstäverna stämmer, men ett accenttecken saknas eller sitter fel.';
  }

  const ending = tempus ? FORM_ENDINGS[tempus]?.[index] : undefined;
  if (typ === 'oregelbundna' && ending) {
    const stem = expected.slice(0, -ending.length);
    if (given.endsWith(ending)) {
      return 'Ändelsen är rätt. Kontrollera den oregelbundna stammen.';
    }
    if (given.startsWith(stem)) {
      return `Den oregelbundna stammen är rätt. Kontrollera ändelsen för ${person}.`;
    }
    return 'Både den oregelbundna stammen och personändelsen behöver kontrolleras.';
  }

  if (expected.includes(' ')) {
    const [expectedFirst, ...expectedRest] = expected.split(' ');
    const [givenFirst, ...givenRest] = given.split(' ');
    if (givenFirst === expectedFirst) {
      return 'Första delen är rätt. Kontrollera huvudverbets form.';
    }
    if (givenRest.join(' ') === expectedRest.join(' ')) {
      return 'Huvudverbets form är rätt. Kontrollera hjälpverbet eller pronomenet.';
    }
    return 'Kontrollera både hjälpordet och huvudverbets form.';
  }

  const commonPrefix = [...expected].findIndex((char, position) => given[position] !== char);
  if (commonPrefix >= Math.min(3, expected.length - 1)) {
    return `Stammen ser rätt ut. Kontrollera ändelsen för ${person}.`;
  }
  return 'Jämför stammen och personändelsen med den rätta formen.';
}

function loadProgress(): Progress {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}') || {};
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

// ─── KOMPONENT ────────────────────────────────────────────────────────────────

export default function Verbdrillen() {
  const [tempus, setTempus] = useState<string | null>(null);
  const [modus, setModus] = useState<string | null>(null);
  const [typ, setTyp] = useState<string | null>(null);
  const [verb, setVerb] = useState<ActiveVerb | null>(null);
  const [answers, setAnswers] = useState<string[]>(['', '', '', '', '', '']);
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<(boolean | null)[]>([null, null, null, null, null, null]);
  const [usedIdx, setUsedIdx] = useState<Set<number>>(new Set());
  const [shake,   setShake]   = useState(false);
  const [progress, setProgress] = useState<Progress>({});
  const [onlyMissed, setOnlyMissed] = useState(false);

  const searchParams = useSearchParams();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const focusedIdxRef = useRef<number | null>(null);

  useEffect(() => { setProgress(loadProgress()); }, []);

  // Förval från adressen, t.ex. ?tempus=presens&modus=konjunktiv&typ=regular.
  // Grammatiksidorna länkar hit med rätt kategori redan vald.
  useEffect(() => {
    const t = searchParams.get('tempus');
    if (!t || !VALID_COMBOS[t]) return;
    setTempus(t);

    const m = searchParams.get('modus');
    if (!m || !(VALID_COMBOS[t][m]?.length)) return;
    setModus(m);

    const ty = searchParams.get('typ');
    if (ty && VALID_COMBOS[t][m].includes(ty)) setTyp(ty);
  }, [searchParams]);

  // ── Härledda värden ────────────────────────────────────────────────────────

  const dataKey     = tempus && modus && typ ? `${tempus}_${modus}_${typ}` : null;
  const fullList    = dataKey ? (VERB_DATA[dataKey] || []) : [];
  const stats       = (dataKey && progress[dataKey]) || { done: [], missed: [] };
  const missedList  = fullList.filter(v => stats.missed.includes(v.inf));
  const verbList    = onlyMissed ? missedList : fullList;
  const pronouns    = modus === 'imperativ' ? PRONOUNS_IMPERATIV : PRONOUNS_DEFAULT;
  const canStart    = verbList.length > 0;
  const isImperativ = modus === 'imperativ';

  const availableModus = tempus
    ? MODUS_OPTIONS.filter(m => (VALID_COMBOS[tempus]?.[m.id] || []).length > 0)
    : [];

  const availableTyp = tempus && modus
    ? (VALID_COMBOS[tempus]?.[modus] || [])
    : [];

  // Imperativ har ingen yo-form
  const fillableCount = isImperativ ? 5 : 6;
  const correctCount  = results.filter((r, i) => !(isImperativ && i === 0) && r === true).length;
  const allCorrect    = checked && correctCount === fillableCount;

  const doneCount = fullList.filter(v => stats.done.includes(v.inf)).length;

  // ── Val ────────────────────────────────────────────────────────────────────

  const reset = useCallback(() => {
    setVerb(null);
    setAnswers(['', '', '', '', '', '']);
    setChecked(false);
    setResults([null, null, null, null, null, null]);
    setUsedIdx(new Set());
  }, []);

  const handleTempus = (id: string) => { setTempus(id); setModus(null); setTyp(null); setOnlyMissed(false); reset(); };
  const handleModus = (id: string) => { setModus(id);  setTyp(null);   setOnlyMissed(false); reset(); };
  const handleTyp = (id: string) => { setTyp(id);                    setOnlyMissed(false); reset(); };

  // ── Verbval ────────────────────────────────────────────────────────────────

  const pickNext = useCallback((list: VerbEntry[], used: Set<number>): number | null => {
    const available = list.map((_, i) => i).filter(i => !used.has(i));
    if (available.length === 0) return null;
    return available[Math.floor(Math.random() * available.length)];
  }, []);

  const focusFirst = useCallback(() => {
    window.setTimeout(() => {
      inputRefs.current[isImperativ ? 1 : 0]?.focus();
    }, 80);
  }, [isImperativ]);

  const loadVerb = useCallback((list: VerbEntry[], used: Set<number>, idx: number) => {
    setVerb({ ...list[idx], _idx: idx });
    setUsedIdx(used);
    setAnswers(['', '', '', '', '', '']);
    setChecked(false);
    setResults([null, null, null, null, null, null]);
    focusFirst();
  }, [focusFirst]);

  const startDrill = useCallback((missedOnly = false) => {
    const list = missedOnly ? missedList : fullList;
    if (list.length === 0) return;
    setOnlyMissed(missedOnly);
    const idx = pickNext(list, new Set());
    if (idx === null) return;
    loadVerb(list, new Set([idx]), idx);
  }, [fullList, missedList, pickNext, loadVerb]);

  const nextVerb = useCallback(() => {
    let newUsed = new Set<number>(usedIdx);
    if (newUsed.size >= verbList.length) newUsed = new Set();
    const idx = pickNext(verbList, newUsed);
    if (idx === null) return;
    newUsed.add(idx);
    loadVerb(verbList, newUsed, idx);
  }, [verbList, usedIdx, pickNext, loadVerb]);

  const retryVerb = useCallback(() => {
    setAnswers(['', '', '', '', '', '']);
    setChecked(false);
    setResults([null, null, null, null, null, null]);
    focusFirst();
  }, [focusFirst]);

  const backToStart = useCallback(() => { setOnlyMissed(false); reset(); }, [reset]);

  const clearProgress = useCallback(() => {
    if (!dataKey) return;
    const next = { ...progress };
    delete next[dataKey];
    setProgress(next);
    saveProgress(next);
    setOnlyMissed(false);
  }, [dataKey, progress]);

  // ── Rättning ───────────────────────────────────────────────────────────────

  const checkAnswers = useCallback(() => {
    if (!verb || checked) return;
    const newResults = verb.forms.map((correct: string, i: number) => {
      if (isImperativ && i === 0) return true;
      return tidy(answers[i]) === tidy(correct);
    });
    setResults(newResults);
    setChecked(true);

    const gotAll = !newResults.some((r, i) => !(isImperativ && i === 0) && !r);
    if (!gotAll) {
      setShake(true);
      window.setTimeout(() => setShake(false), 500);
    }

    if (dataKey) {
      const prev = progress[dataKey] || { done: [], missed: [] };
      const done = new Set<string>(prev.done);
      const missed = new Set<string>(prev.missed);
      if (gotAll) { done.add(verb.inf); missed.delete(verb.inf); }
      else        { missed.add(verb.inf); done.delete(verb.inf); }
      const next = { ...progress, [dataKey]: { done: [...done], missed: [...missed] } };
      setProgress(next);
      saveProgress(next);
    }
  }, [verb, answers, checked, isImperativ, dataKey, progress]);

  // ── Inmatning ──────────────────────────────────────────────────────────────

  const handleAnswer = (i: number, val: string) => {
    const a = [...answers]; a[i] = val; setAnswers(a);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const next = answers.findIndex(
      (a, idx) => idx > i && !(isImperativ && idx === 0) && a === '' && !checked,
    );
    if (next !== -1) inputRefs.current[next]?.focus();
    else checkAnswers();
  };

  const insertAccent = (char: string) => {
    const i = focusedIdxRef.current;
    if (i === null || i === undefined) return;
    const el = inputRefs.current[i];
    if (!el) return;
    const s = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? s;
    const a = [...answers];
    a[i] = a[i].slice(0, s) + char + a[i].slice(end);
    setAnswers(a);
    window.setTimeout(() => { el.focus(); el.setSelectionRange(s + 1, s + 1); }, 0);
  };

  // ── Rendering ──────────────────────────────────────────────────────────────

  const verbsDone  = usedIdx.size;
  const verbsTotal = verbList.length;
  const tempusLabel = TEMPUS_OPTIONS.find(t => t.id === tempus)?.label;
  const modusLabel  = MODUS_OPTIONS.find(m => m.id === modus)?.label;
  const typLabel    = TYP_OPTIONS.find(t => t.id === typ)?.label;
  const noteRevealsAnswer = verb?.note?.startsWith('oregelbunden stam:') ?? false;

  return (
    <div className={styles.page}>

        {/* ── RUBRIK ── */}
        <header className={styles.header}>
          <p className={styles.eyebrow}>Övning</p>
          <h1 className={styles.title}>Verbdrillen</h1>
          <p className={styles.desc}>
            Välj tidsform, modus och verbtyp — fyll sedan i den tomma
            konjugationstabellen. Dina resultat sparas i den här webbläsaren.
          </p>
        </header>

        <div className={styles.main}>

          {/* ── FILTER ── */}
          <div className={styles.filters}>
            <div className={styles.filterGroup} role="group" aria-label="Tidsform">
              <span className={styles.filterLabel} aria-hidden="true">Tidsform</span>
              <div className={styles.filterBtns}>
                {TEMPUS_OPTIONS.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    aria-pressed={tempus === t.id}
                    onClick={() => handleTempus(t.id)}
                    className={`${styles.filterBtn} ${tempus === t.id ? styles.filterBtnActive : ''}`}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup} role="group" aria-label="Modus">
              <span className={styles.filterLabel} aria-hidden="true">Modus</span>
              <div className={styles.filterBtns}>
                {MODUS_OPTIONS.map(m => {
                  const ok = availableModus.some(o => o.id === m.id);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      aria-pressed={modus === m.id}
                      onClick={() => ok && handleModus(m.id)}
                      disabled={!ok}
                      className={`${styles.filterBtn} ${modus === m.id ? styles.filterBtnActive : ''}`}>
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={styles.filterGroup} role="group" aria-label="Verbtyp">
              <span className={styles.filterLabel} aria-hidden="true">Verbtyp</span>
              <div className={styles.filterBtns}>
                {TYP_OPTIONS.map(t => {
                  const ok = availableTyp.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      aria-pressed={typ === t.id}
                      onClick={() => ok && handleTyp(t.id)}
                      disabled={!ok}
                      className={`${styles.filterBtn} ${typ === t.id ? styles.filterBtnActive : ''}`}>
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── ÖVNINGSYTA ── */}
          <div className={styles.drillArea}>

            {!typ && (
              <div className={styles.emptyState}>
                <p className={styles.emptyText}>
                  Välj tidsform, modus och verbtyp ovan för att börja.
                </p>
              </div>
            )}

            {typ && !verb && (
              <div className={styles.startBox}>
                <div className={styles.startMeta}>
                  <span className={styles.chip}>{tempusLabel}</span>
                  <span className={styles.chip}>{modusLabel}</span>
                  <span className={styles.chip}>{typLabel}</span>
                </div>

                <p className={styles.startCount}>
                  {fullList.length} verb i den här kategorin
                </p>

                {(stats.done.length > 0 || stats.missed.length > 0) && (
                  <div className={styles.progressBox}>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{width: `${Math.round((doneCount / Math.max(fullList.length, 1)) * 100)}%`}}
                      />
                    </div>
                    <p className={styles.progressText}>
                      {doneCount} av {fullList.length} klara
                      {missedList.length > 0 && ` · ${missedList.length} att repetera`}
                    </p>
                  </div>
                )}

                <div className={styles.startActions}>
                  <button type="button" className="pillButton pillButton--primary" onClick={() => startDrill(false)}>
                    {doneCount > 0 ? 'Fortsätt öva' : 'Börja öva'}
                  </button>
                  {missedList.length > 0 && (
                    <button type="button" className="pillButton pillButton--secondary" onClick={() => startDrill(true)}>
                      Öva mina fel ({missedList.length})
                    </button>
                  )}
                  {(stats.done.length > 0 || stats.missed.length > 0) && (
                    <button type="button" className={styles.textBtn} onClick={clearProgress}>
                      Nollställ
                    </button>
                  )}
                </div>
              </div>
            )}

            {verb && (
              <div className={styles.drillWrap}>

                <div className={styles.verbHeader}>
                  <div>
                    <p className={styles.verbInf}>
                      {verb.inf}
                      {verb.note && (!noteRevealsAnswer || checked) && (
                        <span className={styles.verbNote}> {verb.note}</span>
                      )}
                    </p>
                    <p className={styles.verbSwe}>{verb.swe}</p>
                  </div>
                  <div className={styles.verbRight}>
                    <span className={styles.verbProgress}>
                      {onlyMissed && 'repetition · '}{verbsDone} / {verbsTotal}
                    </span>
                    {!checked && (
                      <button type="button" className={styles.textBtn} onClick={nextVerb}>
                        Hoppa över
                      </button>
                    )}
                  </div>
                </div>

                <div className={`${styles.tableWrap} ${shake ? styles.shake : ''}`}>
                  <table className={styles.conjTable}>
                    <caption className={styles.srOnly}>
                      Böj {verb.inf} i {tempusLabel?.toLowerCase()} {modusLabel?.toLowerCase()}
                    </caption>
                    <tbody>
                      {pronouns.map((pron, i) => {
                        const isYo  = isImperativ && i === 0;
                        const isOk  = results[i] === true && !isYo;
                        const isErr = results[i] === false;
                        const id    = `form-${i}`;
                        return (
                          <tr key={i}>
                            <td className={styles.pronCell}>
                              <label htmlFor={id}>{pron}</label>
                            </td>
                            <td className={styles.inputCell}>
                              {isYo ? (
                                <span className={styles.noForm}>—</span>
                              ) : (
                                <div className={styles.inputWrap}>
                                  <input
                                    id={id}
                                    ref={el => { inputRefs.current[i] = el; }}
                                    className={`${styles.inputField} ${isOk ? styles.inputOk : ''} ${isErr ? styles.inputErr : ''}`}
                                    type="text"
                                    value={answers[i]}
                                    onChange={e => handleAnswer(i, e.target.value)}
                                    onKeyDown={e => handleKeyDown(e, i)}
                                    onFocus={() => { focusedIdxRef.current = i; }}
                                    disabled={checked}
                                    placeholder="…"
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    spellCheck={false}
                                    aria-label={`Form för ${pron}`}
                                    aria-invalid={isErr || undefined}
                                  />
                                  {checked && isErr && (
                                    <span className={styles.correction}>
                                      <span className={styles.correctAnswer}>Rätt: {verb.forms[i]}</span>
                                      <span className={styles.errorHint}>
                                        {verbErrorFeedback({
                                          answer: answers[i],
                                          correct: verb.forms[i],
                                          tempus,
                                          typ,
                                          person: pron,
                                          index: i,
                                        })}
                                      </span>
                                    </span>
                                  )}
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {!checked && (
                  <div className={styles.accentRow}>
                    <span className={styles.accentLabel}>Tecken</span>
                    {ACCENT_CHARS.map(c => (
                      <button
                        key={c}
                        type="button"
                        className={styles.accentBtn}
                        aria-label={`Infoga ${c}`}
                        onMouseDown={e => { e.preventDefault(); insertAccent(c); }}
                        tabIndex={-1}>
                        {c}
                      </button>
                    ))}
                  </div>
                )}

                <div className={styles.actions}>
                  {!checked ? (
                    <button type="button" className="pillButton pillButton--primary" onClick={checkAnswers}>
                      Kontrollera
                    </button>
                  ) : (
                    <div className={styles.resultRow}>
                      <p className={styles.score} role="status" aria-live="polite">
                        {allCorrect
                          ? 'Alla rätt.'
                          : `${correctCount} av ${fillableCount} rätt.`}
                      </p>
                      <div className={styles.btnGroup}>
                        {!allCorrect && (
                          <button type="button" className="pillButton pillButton--secondary" onClick={retryVerb}>
                            Prova igen
                          </button>
                        )}
                        <button type="button" className="pillButton pillButton--primary" onClick={nextVerb}>
                          Nästa verb
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button type="button" className={styles.textBtn} onClick={backToStart}>
                  ← Byt kategori
                </button>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}
