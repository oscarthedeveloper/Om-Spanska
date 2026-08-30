import {LEARNING_STEPS, type LearningPathStep} from './learning-path';

export type LearningProgress = {
  completed: string[];
  lastVisited?: string;
  quizResults: Record<string, QuizResult>;
};

export type QuizResult = {
  best: number;
  last: number;
  total: number;
  attempts: number;
  missed: number[];
};

export const LEARNING_PROGRESS_KEY = 'omspanska.larstig.v1';
export const LEARNING_PROGRESS_EVENT = 'omspanska:learning-progress';

export const EMPTY_LEARNING_PROGRESS: LearningProgress = {completed: [], quizResults: {}};

export function readLearningProgress(): LearningProgress {
  if (typeof window === 'undefined') return EMPTY_LEARNING_PROGRESS;

  try {
    const stored = JSON.parse(window.localStorage.getItem(LEARNING_PROGRESS_KEY) ?? '{}');
    const quizResults: Record<string, QuizResult> = {};
    if (stored.quizResults && typeof stored.quizResults === 'object') {
      for (const [id, rawValue] of Object.entries(stored.quizResults)) {
        const value = rawValue as Partial<QuizResult> | null;
        if (!value
          || typeof value.best !== 'number'
          || typeof value.last !== 'number'
          || typeof value.total !== 'number'
          || typeof value.attempts !== 'number') continue;
        quizResults[id] = {
          best: value.best,
          last: value.last,
          total: value.total,
          attempts: value.attempts,
          missed: Array.isArray(value.missed)
            ? value.missed.filter((index): index is number => Number.isInteger(index) && index >= 0)
            : [],
        };
      }
    }

    return {
      completed: Array.isArray(stored.completed)
        ? stored.completed.filter((id: unknown): id is string => typeof id === 'string')
        : [],
      lastVisited: typeof stored.lastVisited === 'string' ? stored.lastVisited : undefined,
      quizResults,
    };
  } catch {
    return EMPTY_LEARNING_PROGRESS;
  }
}

export function writeLearningProgress(progress: LearningProgress): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LEARNING_PROGRESS_KEY, JSON.stringify(progress));
    window.dispatchEvent(new CustomEvent<LearningProgress>(LEARNING_PROGRESS_EVENT, {detail: progress}));
  } catch {
    /* Lärstigen fungerar fortfarande, men progressionen kan inte sparas. */
  }
}

export function continueLearningWith(progress: LearningProgress): LearningPathStep | undefined {
  const last = LEARNING_STEPS.find(step => step.href === progress.lastVisited);
  if (last && !progress.completed.includes(last.id)) return last;
  return LEARNING_STEPS.find(step => !progress.completed.includes(step.id));
}
