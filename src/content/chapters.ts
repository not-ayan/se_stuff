/**
 * Course content registry — Scoped strictly to CSMC501 Mid-Term Syllabus (Modules 1 to 6).
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
  /** Has an interactive procedural practice generator. */
  hasPractice?: boolean;
}

export const CHAPTERS: Chapter[] = [
  {
    id: 'ch-01',
    order: 1,
    moduleLabel: 'Module 1',
    title: 'Introduction to Software Engineering',
    subtitle: 'Software crisis (symptoms, causes & HW/SW cost ratio), requirement traceability (RTM forward & backward), building construction analogy, abstraction & decomposition.',
    tags: ['Software Crisis', 'Traceability Matrix', 'Building Analogy', 'Programs vs Products'],
    estMinutes: 25,
    file: 'module_01_intro_and_structured_programming.md',
    accent: 'indigo',
    courseModuleId: 'mod-1',
    quizModuleId: 'mod-1',
    hasPractice: true,
  },
  {
    id: 'ch-02',
    order: 2,
    moduleLabel: 'Module 2',
    title: 'Software Life Cycle Models',
    subtitle: 'Classical Waterfall vs Iterative Waterfall, Phase Containment of Errors (1x to 100x cost escalation), Prototyping model, Evolutionary & Spiral models.',
    tags: ['Waterfall', 'Prototyping', 'Phase Containment', 'Defect Cost Escalation'],
    estMinutes: 30,
    file: 'module_02_life_cycle_models.md',
    accent: 'sky',
    courseModuleId: 'mod-2',
    quizModuleId: 'mod-2',
    hasPractice: true,
  },
  {
    id: 'ch-03',
    order: 3,
    moduleLabel: 'Module 3',
    title: 'Software Quality (Maintainability & Portability)',
    subtitle: 'Fitness of purpose vs modern quality view, McCall factors, Maintainability (understandability, modifiability, testability, 40:60 ratio), Portability interface, QMS evolution.',
    tags: ['Software Quality', 'Maintainability (40:60)', 'Portability Interface', 'QMS Evolution'],
    estMinutes: 28,
    file: 'module_03_software_quality_maintainability_portability.md',
    accent: 'amber',
    courseModuleId: 'mod-3',
    quizModuleId: 'mod-3',
    hasPractice: true,
  },
  {
    id: 'ch-04',
    order: 4,
    moduleLabel: 'Module 4',
    title: 'Requirements Analysis & Specification (SRS)',
    subtitle: 'Functional vs Non-functional requirements, design constraints, IEEE 830 standard, Formal Specification with Predicate Logic, Decision Trees & Decision Tables (2^k rules).',
    tags: ['Functional Requirements', 'Formal Logic Specs', 'Decision Tables (2^k)', 'IEEE 830'],
    estMinutes: 35,
    file: 'module_03_requirements_and_formal_specifications.md',
    accent: 'violet',
    courseModuleId: 'mod-4',
    quizModuleId: 'mod-4',
    hasPractice: true,
  },
  {
    id: 'ch-05',
    order: 5,
    moduleLabel: 'Module 5',
    title: 'Software Design (FOD vs. OOD & Modularity)',
    subtitle: 'Modularity, all 7 levels of Cohesion, all 5 levels of Coupling, Module hierarchy (fan-in/fan-out), Function-Oriented vs Object-Oriented Design (Booch verbs vs nouns, Fire-Alarm case study).',
    tags: ['Cohesion (7 Levels)', 'Coupling (5 Levels)', 'FOD vs OOD', 'Fire-Alarm Case Study'],
    estMinutes: 38,
    file: 'module_05_software_design_fod_vs_ood.md',
    accent: 'emerald',
    courseModuleId: 'mod-5',
    quizModuleId: 'mod-5',
    hasPractice: true,
  },
  {
    id: 'ch-06',
    order: 6,
    moduleLabel: 'Module 6',
    title: 'Software Testing Fundamentals & Unit Testing',
    subtitle: 'Testing fundamentals, Verification vs Validation (Boehm), Error vs Fault vs Failure, Testing in the Small vs Large, Unit testing scaffolding (Drivers vs Stubs, ECP, BVA).',
    tags: ['Testing Fundamentals', 'Verification vs Validation', 'Drivers & Stubs', 'Unit Testing'],
    estMinutes: 25,
    file: 'module_06_software_testing_fundamentals.md',
    accent: 'rose',
    courseModuleId: 'mod-6',
    quizModuleId: 'mod-6',
    hasPractice: true,
  },
  {
    id: 'ch-07',
    order: 7,
    moduleLabel: 'Module 7',
    title: 'Mid-Term Exam Mastery & Examiner Solution Bank',
    subtitle: 'Curated university mid-term exam questions, model examiner answers, 25 memory anchors, formula cheat sheets, and diagnostic solution guides across Modules 1 to 6.',
    tags: ['Examiner Bank', 'Mid-Term Cheat Sheet', 'High-Yield Mnemonic', 'Model Answers'],
    estMinutes: 45,
    file: 'module_07_exam_mastery_and_examiner_bank.md',
    accent: 'violet',
    courseModuleId: 'mod-7',
    quizModuleId: 'mod-7',
  },
  {
    id: 'ch-master',
    order: 8,
    moduleLabel: 'Master Vault',
    title: 'Complete Mid-Term Master Reference Vault',
    subtitle: 'Exhaustive synthesis of all 6 syllabus modules, deep dives, mathematical proofs, and reference guides in one continuous searchable document.',
    tags: ['Complete Vault', 'All 6 Modules', 'Reference Vault'],
    estMinutes: 75,
    file: 'master_notes_ultra_detailed.md',
    accent: 'indigo',
    courseModuleId: 'mod-master',
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
