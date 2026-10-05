export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type ExamDay = 1 | 2 | 3;

export interface TopicItem {
  id: string;
  moduleId: string;
  lessonNumber: number;
  title: string;
  day?: ExamDay;
  difficulty: Difficulty;
  isHighYield: boolean;
  isNumerical: boolean;
  hasDiagram: boolean;
  tags: string[];
  summary: string;
  keyPoints: string[];
  fullNotes: string;
  formula?: string;
  diagramType?: string;
  examTips: string;
}

export interface CourseModule {
  id: string;
  moduleNumber: number;
  title: string;
  description: string;
  day?: ExamDay;
  topics: TopicItem[];
}

export interface Question {
  id: string;
  moduleId: string;
  type: 'mcq' | 'true_false' | 'short_answer' | 'numerical';
  question: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation: string;
  hint?: string;
}


