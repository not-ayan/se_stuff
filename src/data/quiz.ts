import { SYLLABUS_EXAM_QUESTIONS } from './syllabusQuestions';
import { EXAM_QUESTIONS } from './questionsData';
import { EXTENDED_QUESTIONS } from './questionsExtended';
import type { Question } from '../types';

/** Every question in the bank, prioritized by syllabus questions. */
export const ALL_QUESTIONS: Question[] = [
  ...SYLLABUS_EXAM_QUESTIONS,
  ...EXAM_QUESTIONS.filter((q) => ['mod-1', 'mod-2', 'mod-3', 'mod-4-5'].includes(q.moduleId)),
  ...EXTENDED_QUESTIONS.filter((q) => ['mod-1', 'mod-2', 'mod-3', 'mod-4-5'].includes(q.moduleId)),
];

export const QUIZ_MODULE_ORDER = [
  'mod-1',
  'mod-2',
  'mod-3',
  'mod-4-5',
] as const;

export const QUIZ_MODULE_LABELS: Record<string, string> = {
  'mod-1': 'Module 1 · Introduction & Structured Programming',
  'mod-2': 'Module 2 · Life Cycle Models',
  'mod-3': 'Module 3 · Requirements & Formal Specification',
  'mod-4-5': 'Modules 4-5 · Design, Cohesion, Coupling & DFD',
};

export const getQuestionsByModule = (moduleId: string): Question[] =>
  ALL_QUESTIONS.filter((question) => question.moduleId === moduleId);

export const countQuestionsByModule = (moduleId: string): number => getQuestionsByModule(moduleId).length;

/** Fisher-Yates shuffle returning a new array. */
export const shuffle = <T>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

/** Builds a mixed quiz across several modules, balanced by module size. */
export const buildMixedQuiz = (moduleIds: string[], limit = 20): Question[] => {
  const pool = moduleIds.flatMap((id) => getQuestionsByModule(id));
  return shuffle(pool).slice(0, limit);
};
