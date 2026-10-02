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
    label: 'Day 1',
    focus: 'Foundations, Life Cycle Models (Waterfall, Prototyping, Evolutionary, Spiral)',
    chapterIds: ['ch-01', 'ch-02'],
  },
  {
    day: 2,
    label: 'Day 2',
    focus: 'Requirements (SRS IEEE 830, Decision Tables) & Software Design (Cohesion & Coupling)',
    chapterIds: ['ch-03', 'ch-04'],
  },
  {
    day: 3,
    label: 'Day 3',
    focus: 'DFD Theory, Rules, Balancing & 10 Solved University Exam Problems',
    chapterIds: ['ch-05', 'ch-06'],
  },
];

export const chapterById = (id: string): Chapter | undefined => CHAPTERS.find((chapter) => chapter.id === id);

export const chaptersForDay = (day: StudyDay): Chapter[] =>
  day.chapterIds.map(chapterById).filter((chapter): chapter is Chapter => Boolean(chapter));

export const minutesForDay = (day: StudyDay): number =>
  chaptersForDay(day).reduce((sum, chapter) => sum + chapter.estMinutes, 0);
