import { CHAPTERS, type Chapter } from './chapters';

export interface StudyDay {
  day: number;
  label: string;
  focus: string;
  chapterIds: string[];
}

export const STUDY_PLAN: StudyDay[] = [
  {
    day: 1,
    label: 'Part 1',
    focus: 'Foundations & Life Cycle Models: Software Crisis, Traceability, Waterfall, Prototyping, Phase Containment',
    chapterIds: ['ch-01', 'ch-02'],
  },
  {
    day: 2,
    label: 'Part 2',
    focus: 'Quality & Requirements: Maintainability (40:60), Portability Interface, SRS IEEE 830, Decision Tables (2^k rules)',
    chapterIds: ['ch-03', 'ch-04'],
  },
  {
    day: 3,
    label: 'Part 3',
    focus: 'Design & Testing Fundamentals: Cohesion (7 levels), Coupling (5 levels), FOD vs OOD (Fire-Alarm), Drivers & Stubs',
    chapterIds: ['ch-05', 'ch-06'],
  },
];

export const chapterById = (id: string): Chapter | undefined => CHAPTERS.find((chapter) => chapter.id === id);

export const chaptersForDay = (day: StudyDay): Chapter[] =>
  day.chapterIds.map(chapterById).filter((chapter): chapter is Chapter => Boolean(chapter));

export const minutesForDay = (day: StudyDay): number =>
  chaptersForDay(day).reduce((sum, chapter) => sum + chapter.estMinutes, 0);
