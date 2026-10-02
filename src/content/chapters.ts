/**
 * Course content registry — Scoped strictly to Lecture PDFs (Intro to Design) and Data Flow Diagrams (DFD).
 *
 * The full study notes live as markdown under `/notes_md`.
 */
const NOTE_FILES = import.meta.glob('/notes_md/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export type Accent = 'indigo' | 'sky' | 'emerald' | 'amber' | 'rose' | 'violet';

export interface Chapter {
  id: string;
  order: number;
  /** Human label such as "Module 1" or "Module 5". */
  moduleLabel: string;
  title: string;
  subtitle: string;
  tags: string[];
  /** Rough reading time in minutes, used by the study planner. */
  estMinutes: number;
  file: string;
  accent: Accent;
  /** Links to the topic data in courseData.ts. */
  courseModuleId?: string;
  /** Links to the question bank module. */
  quizModuleId: string;
  /** Has a matching worked-problem set in the DFD practice studio. */
  hasPractice?: boolean;
}

export const CHAPTERS: Chapter[] = [
  {
    id: 'ch-01',
    order: 1,
    moduleLabel: 'Module 1',
    title: 'Introduction to Software Engineering',
    subtitle: 'Scope, building construction analogy, exponential complexity growth, abstraction, decomposition, software crisis, and structured programming.',
    tags: ['Foundations', 'Building Analogy', 'Complexity', 'Structured Programming'],
    estMinutes: 24,
    file: 'module_01_intro_and_structured_programming.md',
    accent: 'indigo',
    courseModuleId: 'mod-1',
    quizModuleId: 'mod-1',
  },
  {
    id: 'ch-02',
    order: 2,
    moduleLabel: 'Module 2',
    title: 'Software Life Cycle Models',
    subtitle: 'Classical Waterfall, Iterative Waterfall, phase containment of errors, Prototyping, Evolutionary model, and Boehm\'s Spiral meta-model.',
    tags: ['SDLC', 'Waterfall', 'Prototyping', 'Spiral Model', 'High Yield'],
    estMinutes: 30,
    file: 'module_02_life_cycle_models.md',
    accent: 'sky',
    courseModuleId: 'mod-2',
    quizModuleId: 'mod-2',
  },
  {
    id: 'ch-03',
    order: 3,
    moduleLabel: 'Module 3',
    title: 'Requirements Analysis & Specification (SRS)',
    subtitle: 'System analyst role, requirements gathering, analysis, IEEE 830 SRS standard, Decision Trees, Decision Tables, and Axiomatic/Algebraic formal specifications.',
    tags: ['Requirements', 'SRS IEEE 830', 'Decision Tables', 'Formal Specs'],
    estMinutes: 35,
    file: 'module_03_requirements_and_formal_specifications.md',
    accent: 'violet',
    courseModuleId: 'mod-3',
    quizModuleId: 'mod-3',
  },
  {
    id: 'ch-04',
    order: 4,
    moduleLabel: 'Module 4',
    title: 'Software Design & Modularity Principles',
    subtitle: 'Architectural vs detailed design, modularity, all 7 levels of Cohesion, all 6 levels of Coupling, SA/SD methodology, Structure Charts, and Transform/Transaction analysis.',
    tags: ['Design', 'Cohesion (7 Levels)', 'Coupling (6 Levels)', 'Structure Charts', 'High Yield'],
    estMinutes: 45,
    file: 'module_04_software_design_cohesion_coupling.md',
    accent: 'emerald',
    courseModuleId: 'mod-4',
    quizModuleId: 'mod-4-5',
  },
  {
    id: 'ch-05',
    order: 5,
    moduleLabel: 'Module 5',
    title: 'Data Flow Diagrams (DFD) — Theory & Rules',
    subtitle: 'Symbols, rules of construction, Context Diagram (Level 0), Level 1 functional decomposition, Level 2 sub-bubbles, Balancing rules, and Data Dictionaries with Trading House tutorial.',
    tags: ['DFD Theory', 'Level 0 Context', 'Level 1 & 2', 'Data Dictionary', 'Balancing Rule'],
    estMinutes: 40,
    file: 'module_05_dfd_theory_and_rules.md',
    accent: 'rose',
    courseModuleId: 'mod-4',
    quizModuleId: 'mod-4-5',
    hasPractice: true,
  },
  {
    id: 'ch-06',
    order: 6,
    moduleLabel: 'Module 6',
    title: 'DFD Practice Studio — 10 Solved Exam Problems',
    subtitle: 'Ten complete university exam problems fully solved: LMS, POS Supermarket, Hospital HMS, Payroll, ATM Banking, Admission, Reservation, Elevator, Weather, and Inventory.',
    tags: ['DFD Studio', '10 Solved Problems', 'Level 0 & 1', 'Exam Favorite', 'High Yield'],
    estMinutes: 45,
    file: 'module_06_dfd_practice_problems_10_solved.md',
    accent: 'amber',
    courseModuleId: 'mod-4',
    quizModuleId: 'mod-4-5',
    hasPractice: true,
  },
  {
    id: 'ch-07',
    order: 7,
    moduleLabel: 'Module 7',
    title: 'Exam Mastery, Examiner Answer Bank & Master Sheets',
    subtitle: 'Cross-topic mappings, 105 lecture-page audits, model examiner answers, 25 critical memory anchors, and concept maps for rapid revision.',
    tags: ['Examiner Bank', '105 Page Audit', 'Cross-Topic', 'Memory Sheet', 'High Yield'],
    estMinutes: 50,
    file: 'module_07_exam_mastery_and_examiner_bank.md',
    accent: 'violet',
    courseModuleId: 'mod-4',
    quizModuleId: 'mod-4-5',
  },
  {
    id: 'ch-master',
    order: 8,
    moduleLabel: 'Master Vault',
    title: 'Complete Ultra-Detailed Master Notes (Full 439 KB)',
    subtitle: 'The exhaustive, uncompressed 20-part master textbook reference synthesizing all lecture notes, deep dives, and case studies in one place.',
    tags: ['Complete Vault', 'All 20 Parts', '14 Deep Dives', 'Master Reference'],
    estMinutes: 90,
    file: 'master_notes_ultra_detailed.md',
    accent: 'indigo',
    quizModuleId: 'mod-1',
  },
];

const noteByFile = (fileName: string): string => {
  const match = Object.entries(NOTE_FILES).find(([path]) => path.endsWith(fileName));
  return match?.[1] ?? `# Missing notes\n\nCould not load \`${fileName}\`.`;
};

export const getChapterMarkdown = (chapter: Chapter): string => noteByFile(chapter.file);

export const getChapterById = (id: string): Chapter | undefined => CHAPTERS.find((c) => c.id === id);

export const CHAPTER_BY_COURSE_MODULE: Record<string, Chapter[]> = CHAPTERS.reduce<Record<string, Chapter[]>>(
  (acc, chapter) => {
    if (!chapter.courseModuleId) return acc;
    acc[chapter.courseModuleId] = [...(acc[chapter.courseModuleId] ?? []), chapter];
    return acc;
  },
  {},
);

export const TOTAL_READING_MINUTES = CHAPTERS.reduce((sum, c) => sum + c.estMinutes, 0);
