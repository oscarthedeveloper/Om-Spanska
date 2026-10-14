'use client';

import {useEffect, useState} from 'react';

export type GrammarMode = 'lattsam' | 'rigoros';

export const GRAMMAR_MODE_EVENT = 'omspanska:grammar-mode';
export const GRAMMAR_MODE_STORAGE_KEY = 'omspanska_grammar_mode';

export function readGrammarMode(): GrammarMode {
  if (typeof window === 'undefined') return 'lattsam';
  try {
    const saved = localStorage.getItem(GRAMMAR_MODE_STORAGE_KEY);
    return saved === 'rigoros' ? 'rigoros' : 'lattsam';
  } catch {
    return 'lattsam';
  }
}

export function writeGrammarMode(mode: GrammarMode) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(GRAMMAR_MODE_STORAGE_KEY, mode);
  } catch {
    /* Ignore storage quotas / disabled storage */
  }
  document.documentElement.setAttribute('data-grammar-mode', mode);
  window.dispatchEvent(new CustomEvent(GRAMMAR_MODE_EVENT, {detail: mode}));
}

/** Hook som ger aktuellt grammatikläge och uppdateras automatiskt vid byte. */
export function useGrammarMode(): [GrammarMode, (mode: GrammarMode) => void] {
  const [mode, setMode] = useState<GrammarMode>('lattsam');

  useEffect(() => {
    // Initial sync
    setMode(readGrammarMode());

    function onModeChange(event: Event) {
      if (event instanceof CustomEvent && (event.detail === 'lattsam' || event.detail === 'rigoros')) {
        setMode(event.detail);
      } else {
        setMode(readGrammarMode());
      }
    }

    window.addEventListener(GRAMMAR_MODE_EVENT, onModeChange);
    window.addEventListener('storage', onModeChange);
    return () => {
      window.removeEventListener(GRAMMAR_MODE_EVENT, onModeChange);
      window.removeEventListener('storage', onModeChange);
    };
  }, []);

  return [mode, writeGrammarMode];
}
