import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { CHAPTERS } from '../content/chapters';
import { OUTLINES, TOTAL_SECTION_COUNT } from '../content/outline';

const STORAGE_KEY = 'se-prep-progress-v2';

export interface QuizAttempt {
  correct: boolean;
  attempts: number;
  lastAt: number;
}

export interface CardAttempt {
  seen: number;
  known: number;
}

export interface LastVisit {
  chapterId: string;
  sectionId?: string;
  at: number;
}

export interface ProgressState {
  readSections: Record<string, Record<string, boolean>>;
  completeChapters: Record<string, boolean>;
  bookmarks: Record<string, boolean>;
  quiz: Record<string, QuizAttempt>;
  cards: Record<string, CardAttempt>;
  studyDays: string[];
  chapterTimeSeconds: Record<string, number>;
  dailyTimeSeconds: Record<string, number>;
  totalTimeSeconds: number;
  lastVisit?: LastVisit;
}

const EMPTY_STATE: ProgressState = {
  readSections: {},
  completeChapters: {},
  bookmarks: {},
  quiz: {},
  cards: {},
  studyDays: [],
  chapterTimeSeconds: {},
  dailyTimeSeconds: {},
  totalTimeSeconds: 0,
};

export const todayKey = (): string => new Date().toISOString().slice(0, 10);

export const formatDuration = (seconds: number): string => {
  if (!seconds || seconds <= 0) return '0m';
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  const remMins = mins % 60;
  return remMins > 0 ? `${hours}h ${remMins}m` : `${hours}h`;
};

const loadState = (): ProgressState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      ...EMPTY_STATE,
      ...parsed,
      chapterTimeSeconds: parsed.chapterTimeSeconds ?? {},
      dailyTimeSeconds: parsed.dailyTimeSeconds ?? {},
      totalTimeSeconds: parsed.totalTimeSeconds ?? 0,
    };
  } catch {
    return EMPTY_STATE;
  }
};

/** Counts consecutive study days ending today (or yesterday, before today's session). */
const computeStreak = (studyDays: string[]): number => {
  if (studyDays.length === 0) return 0;
  const days = new Set(studyDays);
  const cursor = new Date();
  if (!days.has(cursor.toISOString().slice(0, 10))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  let streak = 0;
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
};

export interface ChapterStats {
  read: number;
  total: number;
  percent: number;
  complete: boolean;
}

export interface ProgressContextValue {
  state: ProgressState;
  toggleSection: (chapterId: string, sectionId: string) => void;
  setSection: (chapterId: string, sectionId: string, read: boolean) => void;
  isSectionRead: (chapterId: string, sectionId: string) => boolean;
  chapterStats: (chapterId: string) => ChapterStats;
  isChapterComplete: (chapterId: string) => boolean;
  toggleChapterComplete: (chapterId: string) => void;
  setChapterComplete: (chapterId: string, complete: boolean) => void;
  toggleBookmark: (chapterId: string) => void;
  recordQuizAnswer: (questionId: string, correct: boolean) => void;
  recordCard: (cardId: string, known: boolean) => void;
  visitChapter: (chapterId: string, sectionId?: string) => void;
  resetProgress: () => void;
  addStudyTime: (seconds: number, chapterId?: string) => void;
  totalTimeSeconds: number;
  todayTimeSeconds: number;
  chapterTimeSeconds: (chapterId: string) => number;
  overall: { percent: number; sectionsRead: number; sectionsTotal: number; chaptersComplete: number };
  quizSummary: { answered: number; correct: number; accuracy: number };
  streak: number;
  bookmarkedChapters: string[];
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ProgressState>(loadState);
  const activeChapterRef = useRef<string | undefined>(state.lastVisit?.chapterId);
  const lastActiveRef = useRef<number>(Date.now());
  const pendingRef = useRef<{ total: number; byChapter: Record<string, number> }>({
    total: 0,
    byChapter: {},
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable (private mode) — progress simply won't persist */
    }
  }, [state]);

  /** Adds today to the study-day log so streaks and heatmaps stay current. */
  const markStudied = useCallback((current: ProgressState): ProgressState => {
    const today = todayKey();
    if (current.studyDays.includes(today)) return current;
    return { ...current, studyDays: [...current.studyDays, today].slice(-365) };
  }, []);

  const setSection = useCallback(
    (chapterId: string, sectionId: string, read: boolean) => {
      setState((prev) => {
        const chapter = { ...(prev.readSections[chapterId] ?? {}) };
        if (Boolean(chapter[sectionId]) === read) return prev;
        if (read) chapter[sectionId] = true;
        else delete chapter[sectionId];
        return markStudied({ ...prev, readSections: { ...prev.readSections, [chapterId]: chapter } });
      });
    },
    [markStudied],
  );

  const toggleSection = useCallback(
    (chapterId: string, sectionId: string) => {
      setState((prev) => {
        const chapter = { ...(prev.readSections[chapterId] ?? {}) };
        if (chapter[sectionId]) delete chapter[sectionId];
        else chapter[sectionId] = true;
        return markStudied({ ...prev, readSections: { ...prev.readSections, [chapterId]: chapter } });
      });
    },
    [markStudied],
  );

  const isSectionRead = useCallback(
    (chapterId: string, sectionId: string) => Boolean(state.readSections[chapterId]?.[sectionId]),
    [state.readSections],
  );

  const chapterStats = useCallback(
    (chapterId: string): ChapterStats => {
      const total = OUTLINES[chapterId]?.sections.length ?? 0;
      const read = Object.keys(state.readSections[chapterId] ?? {}).filter(
        (id) => state.readSections[chapterId]?.[id],
      ).length;
      const percent = total > 0 ? Math.round((read / total) * 100) : 0;
      return { read: Math.min(read, total), total, percent, complete: total > 0 && read >= total };
    },
    [state.readSections],
  );

  const isChapterComplete = useCallback(
    (chapterId: string) => Boolean(state.completeChapters[chapterId]) || chapterStats(chapterId).complete,
    [chapterStats, state.completeChapters],
  );

  const setChapterComplete = useCallback(
    (chapterId: string, complete: boolean) => {
      setState((prev) => {
        if (Boolean(prev.completeChapters[chapterId]) === complete) return prev;
        const next = { ...prev.completeChapters };
        if (complete) next[chapterId] = true;
        else delete next[chapterId];
        return markStudied({ ...prev, completeChapters: next });
      });
    },
    [markStudied],
  );

  const toggleChapterComplete = useCallback(
    (chapterId: string) => {
      setState((prev) => {
        const next = { ...prev.completeChapters };
        if (next[chapterId]) delete next[chapterId];
        else next[chapterId] = true;
        return markStudied({ ...prev, completeChapters: next });
      });
    },
    [markStudied],
  );

  const toggleBookmark = useCallback(
    (chapterId: string) => {
      setState((prev) => {
        const next = { ...prev.bookmarks };
        if (next[chapterId]) delete next[chapterId];
        else next[chapterId] = true;
        return { ...prev, bookmarks: next };
      });
    },
    [],
  );

  const recordQuizAnswer = useCallback(
    (questionId: string, correct: boolean) => {
      setState((prev) => {
        const existing = prev.quiz[questionId];
        return markStudied({
          ...prev,
          quiz: {
            ...prev.quiz,
            [questionId]: { correct, attempts: (existing?.attempts ?? 0) + 1, lastAt: Date.now() },
          },
        });
      });
    },
    [markStudied],
  );

  const recordCard = useCallback(
    (cardId: string, known: boolean) => {
      setState((prev) => {
        const existing = prev.cards[cardId] ?? { seen: 0, known: 0 };
        return markStudied({
          ...prev,
          cards: {
            ...prev.cards,
            [cardId]: { seen: existing.seen + 1, known: existing.known + (known ? 1 : 0) },
          },
        });
      });
    },
    [markStudied],
  );

  const visitChapter = useCallback((chapterId: string, sectionId?: string) => {
    activeChapterRef.current = chapterId;
    setState((prev) => ({ ...prev, lastVisit: { chapterId, sectionId, at: Date.now() } }));
  }, []);

  const addStudyTime = useCallback(
    (seconds: number, chapterId?: string) => {
      if (seconds <= 0) return;
      setState((prev) => {
        const today = todayKey();
        const nextDaily = { ...prev.dailyTimeSeconds, [today]: (prev.dailyTimeSeconds[today] ?? 0) + seconds };
        const nextChapterTimes = { ...prev.chapterTimeSeconds };
        if (chapterId) {
          nextChapterTimes[chapterId] = (nextChapterTimes[chapterId] ?? 0) + seconds;
        }
        return markStudied({
          ...prev,
          totalTimeSeconds: (prev.totalTimeSeconds ?? 0) + seconds,
          dailyTimeSeconds: nextDaily,
          chapterTimeSeconds: nextChapterTimes,
        });
      });
    },
    [markStudied],
  );

  // Active time tracker with idle detection (pause after 60s idle or hidden tab)
  useEffect(() => {
    const onActivity = () => {
      lastActiveRef.current = Date.now();
    };
    window.addEventListener('mousemove', onActivity, { passive: true });
    window.addEventListener('keydown', onActivity, { passive: true });
    window.addEventListener('scroll', onActivity, { passive: true });
    window.addEventListener('touchstart', onActivity, { passive: true });

    const interval = setInterval(() => {
      if (document.hidden) return;
      if (Date.now() - lastActiveRef.current > 60000) return;

      const ch = activeChapterRef.current;
      pendingRef.current.total += 1;
      if (ch) {
        pendingRef.current.byChapter[ch] = (pendingRef.current.byChapter[ch] ?? 0) + 1;
      }

      // Flush to state every 5 seconds
      if (pendingRef.current.total >= 5) {
        const delta = pendingRef.current.total;
        const chDeltas = { ...pendingRef.current.byChapter };
        pendingRef.current = { total: 0, byChapter: {} };

        setState((prev) => {
          const today = todayKey();
          const nextDaily = { ...prev.dailyTimeSeconds, [today]: (prev.dailyTimeSeconds[today] ?? 0) + delta };
          const nextChapterTimes = { ...prev.chapterTimeSeconds };
          for (const [cId, secs] of Object.entries(chDeltas) as [string, number][]) {
            nextChapterTimes[cId] = (nextChapterTimes[cId] ?? 0) + secs;
          }
          return markStudied({
            ...prev,
            totalTimeSeconds: (prev.totalTimeSeconds ?? 0) + delta,
            dailyTimeSeconds: nextDaily,
            chapterTimeSeconds: nextChapterTimes,
          });
        });
      }
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', onActivity);
      window.removeEventListener('keydown', onActivity);
      window.removeEventListener('scroll', onActivity);
      window.removeEventListener('touchstart', onActivity);
      clearInterval(interval);
    };
  }, [markStudied]);

  const resetProgress = useCallback(() => setState(EMPTY_STATE), []);

  const overall = useMemo(() => {
    const sectionsRead = CHAPTERS.reduce((sum, chapter) => sum + chapterStats(chapter.id).read, 0);
    const chaptersComplete = CHAPTERS.filter((chapter) => isChapterComplete(chapter.id)).length;
    return {
      sectionsRead,
      sectionsTotal: TOTAL_SECTION_COUNT,
      percent: TOTAL_SECTION_COUNT > 0 ? Math.round((sectionsRead / TOTAL_SECTION_COUNT) * 100) : 0,
      chaptersComplete,
    };
  }, [chapterStats, isChapterComplete]);

  const quizSummary = useMemo(() => {
    const attempts = Object.values(state.quiz);
    const correct = attempts.filter((a) => a.correct).length;
    return {
      answered: attempts.length,
      correct,
      accuracy: attempts.length > 0 ? Math.round((correct / attempts.length) * 100) : 0,
    };
  }, [state.quiz]);

  const streak = useMemo(() => computeStreak(state.studyDays), [state.studyDays]);

  const todayTimeSeconds = useMemo(() => {
    const today = todayKey();
    return state.dailyTimeSeconds[today] ?? 0;
  }, [state.dailyTimeSeconds]);

  const totalTimeSeconds = state.totalTimeSeconds ?? 0;

  const chapterTimeSeconds = useCallback(
    (chapterId: string) => state.chapterTimeSeconds[chapterId] ?? 0,
    [state.chapterTimeSeconds],
  );

  const bookmarkedChapters = useMemo(
    () => Object.keys(state.bookmarks).filter((id) => state.bookmarks[id]),
    [state.bookmarks],
  );

  const value = useMemo<ProgressContextValue>(
    () => ({
      state,
      toggleSection,
      setSection,
      isSectionRead,
      chapterStats,
      isChapterComplete,
      toggleChapterComplete,
      setChapterComplete,
      toggleBookmark,
      recordQuizAnswer,
      recordCard,
      visitChapter,
      resetProgress,
      addStudyTime,
      totalTimeSeconds,
      todayTimeSeconds,
      chapterTimeSeconds,
      overall,
      quizSummary,
      streak,
      bookmarkedChapters,
    }),
    [
      state,
      toggleSection,
      setSection,
      isSectionRead,
      chapterStats,
      isChapterComplete,
      toggleChapterComplete,
      setChapterComplete,
      toggleBookmark,
      recordQuizAnswer,
      recordCard,
      visitChapter,
      resetProgress,
      addStudyTime,
      totalTimeSeconds,
      todayTimeSeconds,
      chapterTimeSeconds,
      overall,
      quizSummary,
      streak,
      bookmarkedChapters,
    ],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};

export const useProgress = (): ProgressContextValue => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within a ProgressProvider');
  return context;
};
