import {DECKS, type Deck, type Word} from '@/data/decks';
import {LEARNING_QUIZZES} from '@/data/learning-quizzes';
import {VERB_DATA, type VerbEntry} from '@/data/verbs';
import {LEARNING_STEPS} from './learning-path';
import {readLearningProgress} from './learning-progress';
import {
  readRepetitionProgress,
  reviewId,
  scheduleReview,
  writeRepetitionProgress,
  type ReviewRecord,
  type ReviewReference,
} from './repetition-progress';

type VerbProgress = Record<string, {missed?: string[]}>;
type GlossProgress = Record<string, {missed?: string[]}>;

export type QuizReviewItem = {
  kind: 'quiz';
  id: string;
  record: ReviewRecord;
  title: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type VerbReviewItem = {
  kind: 'verb';
  id: string;
  record: ReviewRecord;
  categoryKey: string;
  categoryLabel: string;
  verb: VerbEntry;
  personIndex: number;
  person: string;
  answer: string;
};

export type GlossReviewItem = {
  kind: 'gloss';
  id: string;
  record: ReviewRecord;
  deck: Deck;
  word: Word;
};

export type ReviewItem = QuizReviewItem | VerbReviewItem | GlossReviewItem;

const VERB_PROGRESS_KEY = 'omspanska.verbdrillen.v1';
const GLOSS_PROGRESS_KEY = 'omspanska.glosdrillen.v1';
const PERSONS = ['yo', 'tú', 'él/ella', 'nosotros', 'vosotros', 'ellos/ellas'];

const TEMPUS_LABELS: Record<string, string> = {
  presens: 'presens',
  preteritum: 'preteritum',
  imperfekt: 'imperfekt',
  perfekt: 'perfekt',
  futurum: 'futurum',
  futurum2: 'futurum II',
  konditionalis: 'konditionalis',
  gerundium: 'presens progressiv',
};

const MODUS_LABELS: Record<string, string> = {
  indikativ: 'indikativ',
  konjunktiv: 'konjunktiv',
  imperativ: 'imperativ',
};

function readRecord<T>(key: string): T {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) ?? '{}');
    return value && typeof value === 'object' ? value as T : {} as T;
  } catch {
    return {} as T;
  }
}

function categoryLabel(key: string): string {
  const [tempus, modus] = key.split('_');
  return [TEMPUS_LABELS[tempus] ?? tempus, MODUS_LABELS[modus] ?? modus].join(' · ');
}

function hash(value: string): number {
  let result = 0;
  for (let index = 0; index < value.length; index += 1) {
    result = ((result << 5) - result + value.charCodeAt(index)) | 0;
  }
  return Math.abs(result);
}

function addReference(
  items: Record<string, ReviewRecord>,
  reference: ReviewReference,
  now: number,
): boolean {
  const id = reviewId(reference);
  if (items[id]) return false;
  items[id] = {id, reference, stage: 0, dueAt: now, mastered: false};
  return true;
}

function syncSources(now: number): Record<string, ReviewRecord> {
  const progress = readRepetitionProgress();
  const items = {...progress.items};
  let changed = false;

  const learning = readLearningProgress();
  for (const [stepId, result] of Object.entries(learning.quizResults)) {
    for (const questionIndex of result.missed) {
      changed = addReference(items, {kind: 'quiz', stepId, questionIndex}, now) || changed;
    }
  }

  const verbProgress = readRecord<VerbProgress>(VERB_PROGRESS_KEY);
  for (const [categoryKey, result] of Object.entries(verbProgress)) {
    for (const infinitive of Array.isArray(result.missed) ? result.missed : []) {
      changed = addReference(items, {kind: 'verb', categoryKey, infinitive}, now) || changed;
    }
  }

  const glossProgress = readRecord<GlossProgress>(GLOSS_PROGRESS_KEY);
  for (const [deckId, result] of Object.entries(glossProgress)) {
    for (const spanish of Array.isArray(result.missed) ? result.missed : []) {
      changed = addReference(items, {kind: 'gloss', deckId: Number(deckId), spanish}, now) || changed;
    }
  }

  if (changed) writeRepetitionProgress({items});
  return items;
}

function resolveRecord(record: ReviewRecord): ReviewItem | undefined {
  const reference = record.reference;
  if (reference.kind === 'quiz') {
    const step = LEARNING_STEPS.find(item => item.id === reference.stepId);
    const quiz = step ? LEARNING_QUIZZES[step.href] : undefined;
    const question = quiz?.questions[reference.questionIndex];
    if (!quiz || !question) return undefined;
    return {
      kind: 'quiz', id: record.id, record, title: quiz.title,
      prompt: question.prompt, options: question.options, answer: question.answer,
      explanation: question.explanation,
    };
  }

  if (reference.kind === 'verb') {
    const verb = VERB_DATA[reference.categoryKey]?.find(item => item.inf === reference.infinitive);
    if (!verb) return undefined;
    const available = verb.forms
      .map((form, index) => ({form, index}))
      .filter(item => item.form && item.form !== '—');
    if (available.length === 0) return undefined;
    const picked = available[(hash(record.id) + record.stage) % available.length];
    return {
      kind: 'verb', id: record.id, record, categoryKey: reference.categoryKey,
      categoryLabel: categoryLabel(reference.categoryKey), verb,
      personIndex: picked.index, person: PERSONS[picked.index], answer: picked.form,
    };
  }

  const deck = DECKS.find(item => item.id === reference.deckId);
  const word = deck?.words.find(item => item.es === reference.spanish);
  if (!deck || !word) return undefined;
  return {kind: 'gloss', id: record.id, record, deck, word};
}

function interleave(items: ReviewItem[]): ReviewItem[] {
  const groups = {
    quiz: items.filter(item => item.kind === 'quiz'),
    verb: items.filter(item => item.kind === 'verb'),
    gloss: items.filter(item => item.kind === 'gloss'),
  };
  const result: ReviewItem[] = [];
  while (groups.quiz.length || groups.verb.length || groups.gloss.length) {
    for (const kind of ['quiz', 'verb', 'gloss'] as const) {
      const item = groups[kind].shift();
      if (item) result.push(item);
    }
  }
  return result;
}

export function getReviewSummary(now = Date.now()): {due: number; scheduled: number; mastered: number} {
  if (typeof window === 'undefined') return {due: 0, scheduled: 0, mastered: 0};
  const records = Object.values(syncSources(now));
  return {
    due: records.filter(record => !record.mastered && record.dueAt !== null && record.dueAt <= now).length,
    scheduled: records.filter(record => !record.mastered).length,
    mastered: records.filter(record => record.mastered).length,
  };
}

export function getDailyReviewItems(limit = 10, now = Date.now()): ReviewItem[] {
  if (typeof window === 'undefined') return [];
  const due = Object.values(syncSources(now))
    .filter(record => !record.mastered && record.dueAt !== null && record.dueAt <= now)
    .sort((a, b) => (a.dueAt ?? 0) - (b.dueAt ?? 0))
    .map(resolveRecord)
    .filter((item): item is ReviewItem => Boolean(item));
  return interleave(due).slice(0, limit);
}

export function recordReviewAnswer(item: ReviewItem, correct: boolean): void {
  const progress = readRepetitionProgress();
  const current = progress.items[item.id] ?? item.record;
  writeRepetitionProgress({
    items: {...progress.items, [item.id]: scheduleReview(current, correct)},
  });
}
