import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BookOpen, CornerDownLeft, HelpCircle, ListTree, Search, Sparkles, X } from 'lucide-react';
import { CHAPTERS } from '../content/chapters';
import { OUTLINES } from '../content/outline';
import { ALL_QUESTIONS } from '../data/quiz';
import { FLASHCARDS } from '../data/flashcards';

type SearchKind = 'chapter' | 'section' | 'question' | 'card';

interface SearchEntry {
  id: string;
  kind: SearchKind;
  title: string;
  subtitle: string;
  haystack: string;
  chapterId?: string;
  sectionId?: string;
}

interface SearchPaletteProps {
  open: boolean;
  onClose: () => void;
  onSelectChapter: (chapterId: string, sectionId?: string) => void;
  onOpenQuiz: () => void;
  onOpenCards: () => void;
}

const KIND_META: Record<SearchKind, { icon: React.ReactNode; label: string }> = {
  chapter: { icon: <BookOpen className="h-4 w-4 text-sky-700" />, label: 'Chapter' },
  section: { icon: <ListTree className="h-4 w-4 text-emerald-700" />, label: 'Section' },
  question: { icon: <HelpCircle className="h-4 w-4 text-violet-700" />, label: 'Question' },
  card: { icon: <Sparkles className="h-4 w-4 text-amber-700" />, label: 'Flashcard' },
};

const buildIndex = (): SearchEntry[] => {
  const entries: SearchEntry[] = [];
  for (const chapter of CHAPTERS) {
    entries.push({
      id: `chapter:${chapter.id}`,
      kind: 'chapter',
      title: chapter.title,
      subtitle: `${chapter.moduleLabel} · ${chapter.tags.join(', ')}`,
      haystack: `${chapter.title} ${chapter.subtitle} ${chapter.tags.join(' ')} ${OUTLINES[chapter.id]?.plain ?? ''}`.toLowerCase(),
      chapterId: chapter.id,
    });
    for (const section of OUTLINES[chapter.id]?.sections ?? []) {
      entries.push({
        id: `section:${chapter.id}:${section.id}`,
        kind: 'section',
        title: section.text,
        subtitle: chapter.title,
        haystack: `${section.text} ${chapter.title}`.toLowerCase(),
        chapterId: chapter.id,
        sectionId: section.id,
      });
    }
  }
  for (const question of ALL_QUESTIONS) {
    entries.push({
      id: `question:${question.id}`,
      kind: 'question',
      title: question.question,
      subtitle: question.explanation.slice(0, 120),
      haystack: `${question.question} ${question.explanation}`.toLowerCase(),
    });
  }
  for (const card of FLASHCARDS) {
    entries.push({
      id: `card:${card.id}`,
      kind: 'card',
      title: card.front,
      subtitle: card.back,
      haystack: `${card.front} ${card.back}`.toLowerCase(),
    });
  }
  return entries;
};

export const SearchPalette: React.FC<SearchPaletteProps> = ({ open, onClose, onSelectChapter, onOpenQuiz, onOpenCards }) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(buildIndex, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      const timer = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [open]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (term.length < 2) return [] as SearchEntry[];
    const words = term.split(/\s+/);
    return index
      .map((entry) => {
        if (!words.every((word) => entry.haystack.includes(word))) return null;
        let score = 0;
        const title = entry.title.toLowerCase();
        if (title.startsWith(term)) score += 60;
        else if (title.includes(term)) score += 35;
        if (entry.kind === 'chapter') score += 12;
        if (entry.kind === 'section') score += 6;
        score -= Math.min(entry.haystack.length / 900, 10);
        return { entry, score };
      })
      .filter((item): item is { entry: SearchEntry; score: number } => Boolean(item))
      .sort((a, b) => b.score - a.score)
      .slice(0, 24)
      .map((item) => item.entry);
  }, [index, query]);

  const activate = (entry: SearchEntry) => {
    if (entry.kind === 'chapter' && entry.chapterId) onSelectChapter(entry.chapterId);
    else if (entry.kind === 'section' && entry.chapterId && entry.sectionId) onSelectChapter(entry.chapterId, entry.sectionId);
    else if (entry.kind === 'question') onOpenQuiz();
    else if (entry.kind === 'card') onOpenCards();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-panel">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="h-4 w-4 text-subtle" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') onClose();
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                setActiveIndex((prev) => Math.min(prev + 1, Math.max(results.length - 1, 0)));
              }
              if (event.key === 'ArrowUp') {
                event.preventDefault();
                setActiveIndex((prev) => Math.max(prev - 1, 0));
              }
              if (event.key === 'Enter' && results[activeIndex]) activate(results[activeIndex]);
            }}
            placeholder="Search chapters, sections, questions and flashcards…"
            className="flex-1 bg-transparent py-4 text-[14px] text-ink placeholder:text-muted focus:outline-none"
          />
          <button onClick={onClose} aria-label="Close search" className="rounded-lg p-1.5 text-muted hover:bg-line hover:text-body">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-2">
          {query.trim().length < 2 && (
            <p className="px-3 py-6 text-center text-[13px] text-muted">Type at least two characters to search the whole course.</p>
          )}
          {query.trim().length >= 2 && results.length === 0 && (
            <p className="px-3 py-6 text-center text-[13px] text-muted">No matches for “{query}”.</p>
          )}
          {results.map((entry, i) => (
            <button
              key={entry.id}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => activate(entry)}
              className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                i === activeIndex ? 'bg-canvas' : 'hover:bg-canvas/60'
              }`}
            >
              <span className="mt-0.5 shrink-0">{KIND_META[entry.kind].icon}</span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="text-[10px] text-muted">{KIND_META[entry.kind].label}</span>
                </span>
                <span className="mt-0.5 block truncate text-[13px] font-medium text-ink">{entry.title}</span>
                <span className="mt-0.5 block truncate text-[11.5px] text-muted">{entry.subtitle}</span>
              </span>
              {i === activeIndex && <CornerDownLeft className="mt-1 h-3.5 w-3.5 shrink-0 text-muted" />}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-line px-4 py-2 font-mono text-[10px] text-muted">
          <span>↑ ↓ to navigate · ⏎ to open · esc to close</span>
          <span>{results.length} results</span>
        </div>
      </div>
    </div>
  );
};
