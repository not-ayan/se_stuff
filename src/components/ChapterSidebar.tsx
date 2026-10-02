import React from 'react';
import { Bookmark, Check, ChevronRight } from 'lucide-react';
import { CHAPTERS } from '../content/chapters';
import { STUDY_PLAN, chaptersForDay, minutesForDay } from '../content/plan';
import { getOutline } from '../content/outline';
import { useProgress } from '../lib/progress';
import { ACCENT_CLASSES } from './ui';

interface ChapterSidebarProps {
  activeChapterId: string;
  onSelectChapter: (id: string) => void;
  onJumpSection?: (sectionId: string) => void;
}

export const ChapterSidebar: React.FC<ChapterSidebarProps> = ({ activeChapterId, onSelectChapter, onJumpSection }) => {
  const { chapterStats, isChapterComplete, state, toggleBookmark } = useProgress();
  const activeOutline = getOutline(activeChapterId);

  return (
    <nav aria-label="Course chapters" className="space-y-6">
      {STUDY_PLAN.map((day) => {
        const chapters = chaptersForDay(day);
        const dayPercent = Math.round(
          (chapters.reduce((sum, chapter) => sum + chapterStats(chapter.id).percent, 0) / (chapters.length || 1)),
        );
        return (
          <div key={day.day}>
            <div className="mb-2 flex items-baseline justify-between">
              <div>
                <span className="text-[11.5px] font-semibold text-body">{day.label}</span>
                <span className="ml-2 font-mono text-[10px] text-muted">{minutesForDay(day)} min</span>
              </div>
              <span className="font-mono text-[10px] text-muted">{dayPercent}%</span>
            </div>
            <p className="mb-2 text-[11px] leading-snug text-muted">{day.focus}</p>

            <ul className="space-y-0.5">
              {chapters.map((chapter) => {
                const stats = chapterStats(chapter.id);
                const active = chapter.id === activeChapterId;
                const accent = ACCENT_CLASSES[chapter.accent];
                const complete = isChapterComplete(chapter.id);
                const bookmarked = Boolean(state.bookmarks[chapter.id]);
                return (
                  <li key={chapter.id}>
                    <div
                      className={`group flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors ${
                        active ? 'bg-line' : 'hover:bg-line'
                      }`}
                    >
                      <button
                        onClick={() => onSelectChapter(chapter.id)}
                        className="flex min-w-0 flex-1 items-center gap-2 text-left"
                      >
                        <span
                          className={`grid h-5 w-5 shrink-0 place-items-center rounded-md font-mono text-[10px] font-bold ${
                            complete ? 'bg-emerald-500/20 text-emerald-700' : active ? `${accent.bg} ${accent.text}` : 'bg-canvas text-subtle'
                          }`}
                        >
                          {complete ? <Check className="h-3 w-3" /> : chapter.order}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={`block truncate text-[12.5px] font-medium ${active ? 'text-ink' : 'text-body group-hover:text-ink'}`}>
                            {chapter.title}
                          </span>
                          <span className="mt-0.5 block h-1 w-full overflow-hidden rounded-full bg-line-strong/60">
                            <span className={`block h-full rounded-full ${accent.bar}`} style={{ width: `${stats.percent}%` }} />
                          </span>
                        </span>
                      </button>
                      <button
                        onClick={() => toggleBookmark(chapter.id)}
                        aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark chapter'}
                        title={bookmarked ? 'Remove bookmark' : 'Bookmark for revision'}
                        className={`shrink-0 rounded p-1 transition-colors ${bookmarked ? 'text-amber-700' : 'text-faint opacity-0 hover:text-body group-hover:opacity-100'}`}
                      >
                        <Bookmark className={`h-3.5 w-3.5 ${bookmarked ? 'fill-amber-400' : ''}`} />
                      </button>
                    </div>

                    {/* Sections of the active chapter */}
                    {active && onJumpSection && (
                      <ul className="mb-1 ml-7 mt-0.5 space-y-0.5 border-l border-line pl-2">
                        {activeOutline?.sections.map((section) => (
                          <li key={section.id}>
                            <button
                              onClick={() => onJumpSection(section.id)}
                              className="flex w-full items-center gap-1.5 rounded px-1.5 py-1 text-left text-[11.5px] leading-snug text-subtle transition-colors hover:text-ink"
                            >
                              <ChevronRight className="h-3 w-3 shrink-0 text-faint" />
                              <span className="truncate">{section.text}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      <div className="rounded-xl border border-line bg-surface p-3">
        <div className="text-[10.5px] text-muted">Course library</div>
        <div className="mt-1 text-[11px] leading-snug text-subtle">
          {CHAPTERS.length} chapters · sourced from the Dr. Rajib Mall notes and Prof. Swarup Roy lecture slides.
        </div>
      </div>
    </nav>
  );
};
