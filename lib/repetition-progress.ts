export type ReviewReference =
  | {kind: 'quiz'; stepId: string; questionIndex: number}
  | {kind: 'verb'; categoryKey: string; infinitive: string}
  | {kind: 'gloss'; deckId: number; spanish: string};

export type ReviewRecord = {
  id: string;
  reference: ReviewReference;
  /** Antal korrekta repetitionssteg som redan klarats, 0–4. */
  stage: number;
  dueAt: number | null;
  mastered: boolean;
};

export type RepetitionProgress = {
  items: Record<string, ReviewRecord>;
};

export const REPETITION_PROGRESS_KEY = 'omspanska.repetition.v1';
export const REPETITION_PROGRESS_EVENT = 'omspanska:repetition-progress';
export const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14] as const;

const EMPTY_REPETITION_PROGRESS: RepetitionProgress = {items: {}};
const DAY_MS = 24 * 60 * 60 * 1000;

function isReference(value: unknown): value is ReviewReference {
  if (!value || typeof value !== 'object') return false;
  const reference = value as Partial<ReviewReference> & Record<string, unknown>;
  if (reference.kind === 'quiz') {
    return typeof reference.stepId === 'string' && Number.isInteger(reference.questionIndex);
  }
  if (reference.kind === 'verb') {
    return typeof reference.categoryKey === 'string' && typeof reference.infinitive === 'string';
  }
  if (reference.kind === 'gloss') {
    return Number.isInteger(reference.deckId) && typeof reference.spanish === 'string';
  }
  return false;
}

export function reviewId(reference: ReviewReference): string {
  if (reference.kind === 'quiz') return `quiz:${reference.stepId}:${reference.questionIndex}`;
  if (reference.kind === 'verb') return `verb:${reference.categoryKey}:${reference.infinitive}`;
  return `gloss:${reference.deckId}:${reference.spanish}`;
}

export function readRepetitionProgress(): RepetitionProgress {
  if (typeof window === 'undefined') return EMPTY_REPETITION_PROGRESS;
  try {
    const stored = JSON.parse(window.localStorage.getItem(REPETITION_PROGRESS_KEY) ?? '{}');
    const items: Record<string, ReviewRecord> = {};
    if (stored.items && typeof stored.items === 'object') {
      for (const [id, rawValue] of Object.entries(stored.items)) {
        const value = rawValue as Partial<ReviewRecord>;
        if (!isReference(value.reference)) continue;
        items[id] = {
          id,
          reference: value.reference,
          stage: typeof value.stage === 'number' ? Math.max(0, Math.min(4, value.stage)) : 0,
          dueAt: typeof value.dueAt === 'number' ? value.dueAt : null,
          mastered: value.mastered === true,
        };
      }
    }
    return {items};
  } catch {
    return EMPTY_REPETITION_PROGRESS;
  }
}

export function writeRepetitionProgress(progress: RepetitionProgress): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(REPETITION_PROGRESS_KEY, JSON.stringify(progress));
    window.dispatchEvent(new CustomEvent<RepetitionProgress>(REPETITION_PROGRESS_EVENT, {detail: progress}));
  } catch {
    /* Repetitionen fungerar för stunden även om progressionen inte kan sparas. */
  }
}

export function scheduleReview(record: ReviewRecord, correct: boolean, now = Date.now()): ReviewRecord {
  if (!correct) {
    return {...record, stage: 0, dueAt: now + DAY_MS, mastered: false};
  }
  if (record.stage >= REVIEW_INTERVAL_DAYS.length) {
    return {...record, dueAt: null, mastered: true};
  }
  const days = REVIEW_INTERVAL_DAYS[record.stage];
  return {
    ...record,
    stage: record.stage + 1,
    dueAt: now + days * DAY_MS,
    mastered: false,
  };
}
