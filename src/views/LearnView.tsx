import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, BrainCircuit, ChevronLeft, ChevronRight, Dices, HelpCircle, List, Sparkles, X } from 'lucide-react';
import { CHAPTERS, getChapterById } from '../content/chapters';
import { NotesReader } from '../components/NotesReader';
import { ChapterSidebar } from '../components/ChapterSidebar';
import { useProgress } from '../lib/progress';

interface LearnViewProps {
  chapterId: string;
  onSelectChapter: (id: string) => void;
  onOpenQuiz: (chapterId: string) => void;
  onOpenCards: (chapterId: string) => void;
  onOpenPractice: () => void;
  onOpenAiMentor?: (prompt?: string) => void;
}

export const LearnView: React.FC<LearnViewProps> = ({
  chapterId,
  onSelectChapter,
  onOpenQuiz,
  onOpenCards,
  onOpenPractice,
  onOpenAiMentor,
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);
  const { visitChapter } = useProgress();
  const desktopSidebarId = 'desktop-chapter-sidebar';
  const mobileSidebarId = 'mobile-chapter-sidebar';

  const chapter = getChapterById(chapterId) ?? CHAPTERS[0];
  const index = CHAPTERS.findIndex((c) => c.id === chapter.id);
  const prev = index > 0 ? CHAPTERS[index - 1] : undefined;
  const next = index < CHAPTERS.length - 1 ? CHAPTERS[index + 1] : undefined;

  const selectChapter = (id: string) => {
    onSelectChapter(id);
    visitChapter(id);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0 });
  };

  const jumpSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (!mobileSidebarOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileSidebarOpen(false);
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileSidebarOpen]);

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 sm:py-9">
      <div className={`grid grid-cols-1 gap-6 ${desktopSidebarCollapsed ? 'lg:grid-cols-[minmax(0,1fr)]' : 'lg:grid-cols-[268px_minmax(0,1fr)]'}`}>
        {/* Desktop sidebar */}
        {!desktopSidebarCollapsed && (
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-[11px] text-subtle">Navigation</span>
                <button
                  onClick={() => setDesktopSidebarCollapsed(true)}
                  aria-controls={desktopSidebarId}
                  aria-expanded
                  aria-label="Collapse chapter sidebar"
                  className="ml-auto inline-flex items-center gap-1 rounded-lg border border-line bg-canvas px-2 py-1 text-[11px] text-subtle transition-colors hover:text-ink"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span>Hide</span>
                </button>
              </div>
              <div id={desktopSidebarId}>
                <ChapterSidebar activeChapterId={chapter.id} onSelectChapter={selectChapter} onJumpSection={jumpSection} />
              </div>
            </div>
          </aside>
        )}
        {/* Mobile drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Chapter navigation">
            <button className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} aria-label="Close chapter navigation overlay" />
            <div id={mobileSidebarId} className="absolute left-0 top-0 h-full w-[300px] max-w-[86vw] overflow-y-auto border-r border-line bg-panel p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[11px] text-subtle">Chapters</span>
                <button onClick={() => setMobileSidebarOpen(false)} aria-label="Close chapter list" className="rounded-lg p-1.5 text-subtle hover:bg-canvas">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ChapterSidebar activeChapterId={chapter.id} onSelectChapter={selectChapter} onJumpSection={jumpSection} />
            </div>
          </div>
        )}

        {/* Main column — the white reading pane, like the reference's detail card */}
        <main className="min-w-0 rounded-[20px] border border-line bg-surface p-5 shadow-card sm:p-8">
          {/* Toolbar */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              aria-controls={mobileSidebarId}
              aria-expanded={mobileSidebarOpen}
              className="flex items-center gap-2 rounded-xl border border-line bg-canvas px-3 py-2 text-[13px] font-medium text-body lg:hidden"
            >
              <List className="h-4 w-4" /> Chapters
            </button>
            {desktopSidebarCollapsed && (
              <button
                onClick={() => setDesktopSidebarCollapsed(false)}
                aria-controls={desktopSidebarId}
                aria-expanded={false}
                aria-label="Expand chapter sidebar"
                className="hidden items-center gap-2 rounded-xl border border-line bg-canvas px-3 py-2 text-[13px] font-medium text-body lg:flex"
              >
                <ChevronRight className="h-4 w-4" /> Navigation
              </button>
            )}

            <div className="ml-auto flex flex-wrap items-center gap-2">
              {onOpenAiMentor && (
                <button
                  onClick={() => onOpenAiMentor(`Explain the core intuition, mathematical concepts, and exam traps for ${chapter.title}`)}
                  className="flex items-center gap-1.5 rounded-xl border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-[13px] font-semibold text-sky-800 transition-colors hover:bg-sky-500/20 shadow-sm"
                  title="Ask AI Mentor to explain this chapter"
                >
                  <BrainCircuit className="h-4 w-4 text-sky-600" /> Ask AI Mentor
                </button>
              )}
              <button
                onClick={() => onOpenQuiz(chapter.id)}
                className="flex items-center gap-2 rounded-xl border border-line bg-canvas px-3 py-2 text-[13px] font-medium text-body transition-colors hover:border-line-strong hover:text-ink"
              >
                <HelpCircle className="h-4 w-4 text-ink" /> Quiz this chapter
              </button>
              <button
                onClick={() => onOpenCards(chapter.id)}
                className="flex items-center gap-2 rounded-xl border border-line bg-canvas px-3 py-2 text-[13px] font-medium text-body transition-colors hover:border-line-strong hover:text-ink"
              >
                <Sparkles className="h-4 w-4 text-amber-700" /> Flashcards
              </button>
              <button
                onClick={onOpenPractice}
                className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-[13px] font-medium text-amber-900 transition-colors hover:bg-amber-500/20"
                title="Practice randomly generated problems"
              >
                <Dices className="h-4 w-4 text-amber-600" /> Practice Problems
              </button>
              {chapter.hasPractice && (
                <button
                  onClick={onOpenPractice}
                  className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[13px] font-medium text-amber-800 transition-colors hover:bg-amber-100"
                >
                  <Dices className="h-4 w-4" /> Practice Studio
                </button>
              )}
            </div>
          </div>

          <NotesReader chapter={chapter} />

          {/* Previous / next */}
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {prev ? (
              <button
                onClick={() => selectChapter(prev.id)}
                className="group flex items-center gap-3 rounded-2xl border border-line bg-canvas p-4 text-left transition-colors hover:border-line-strong"
              >
                <ArrowLeft className="h-4 w-4 shrink-0 text-muted group-hover:text-ink" />
                <span className="min-w-0">
                  <span className="block text-[10.5px] text-muted">Previous</span>
                  <span className="block truncate text-[13px] font-semibold text-strong">{prev.title}</span>
                </span>
              </button>
            ) : (
              <div />
            )}
            {next && (
              <button
                onClick={() => selectChapter(next.id)}
                className="group flex items-center justify-end gap-3 rounded-2xl border border-line bg-canvas p-4 text-right transition-colors hover:border-line-strong"
              >
                <span className="min-w-0">
                  <span className="block text-[10.5px] text-muted">Next</span>
                  <span className="block truncate text-[13px] font-semibold text-strong">{next.title}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted group-hover:text-ink" />
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
