import { CHAPTERS, getChapterMarkdown, type Chapter } from './chapters';
import { extractHeadings, markdownToPlainText } from '../lib/markdown';

export interface Section {
  id: string;
  text: string;
  level: number;
}

export interface ChapterOutline {
  chapter: Chapter;
  /** Level 2+ headings; the level 1 heading is the document title. */
  sections: Section[];
  /** Markdown stripped to plain text, used for search and previews. */
  plain: string;
  wordCount: number;
}

const buildOutlines = (): Record<string, ChapterOutline> => {
  const map: Record<string, ChapterOutline> = {};
  for (const chapter of CHAPTERS) {
    const markdown = getChapterMarkdown(chapter);
    const headings = extractHeadings(markdown);
    const plain = markdownToPlainText(markdown);
    map[chapter.id] = {
      chapter,
      sections: headings
        .filter((h) => h.level >= 2)
        .map((h) => ({ id: h.id, text: h.text, level: h.level })),
      plain,
      wordCount: plain.split(' ').filter(Boolean).length,
    };
  }
  return map;
};

export const OUTLINES: Record<string, ChapterOutline> = buildOutlines();

export const getOutline = (chapterId: string): ChapterOutline | undefined => OUTLINES[chapterId];

export const TOTAL_SECTION_COUNT = Object.values(OUTLINES).reduce(
  (sum, outline) => sum + outline.sections.length,
  0,
);

/** Total words across the whole course, used for the "reading load" stat. */
export const TOTAL_WORDS = Object.values(OUTLINES).reduce((sum, outline) => sum + outline.wordCount, 0);
