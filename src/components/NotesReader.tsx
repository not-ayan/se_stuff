import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BookOpenCheck, Check, ChevronRight, Circle, Clock, ListTree } from 'lucide-react';
import { getChapterMarkdown, type Chapter } from '../content/chapters';
import { getOutline } from '../content/outline';
import { renderMarkdown } from '../lib/markdown';
import { useProgress } from '../lib/progress';
import { KeyTakeaways } from './KeyTakeaways';
import { ACCENT_CLASSES } from './ui';

interface NotesReaderProps {
  chapter: Chapter;
}

export const NotesReader: React.FC<NotesReaderProps> = ({ chapter }) => {
  const { isSectionRead, toggleSection, chapterStats, isChapterComplete, toggleChapterComplete } = useProgress();
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollPercent, setScrollPercent] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);

  const outline = getOutline(chapter.id);
  const accent = ACCENT_CLASSES[chapter.accent];
  const stats = chapterStats(chapter.id);

  const rendered = useMemo(() => renderMarkdown(getChapterMarkdown(chapter)), [chapter]);

  // Scroll-spy: highlight the heading currently in view and drive the progress bar.
  useEffect(() => {
    const container = articleRef.current;
    if (!container) return;
    const headings = Array.from(container.querySelectorAll<HTMLElement>('h2[id], h3[id]'));
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: [0, 1] },
    );
    headings.forEach((heading) => observer.observe(heading));

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const passed = -rect.top;
      setScrollPercent(total > 0 ? Math.min(100, Math.max(0, (passed / total) * 100)) : 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [chapter.id, rendered]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative">
      {/* Reading progress rail — pinned above the sticky header so it works at any header height */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent">
        <div className={`h-full transition-[width] duration-150 ${accent.bar}`} style={{ width: `${scrollPercent}%` }} />
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_250px]">
        {/* Article */}
        <article ref={articleRef} className="min-w-0">
          <header className="mb-8 border-b border-line pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold ${accent.bg} ${accent.text}`}>
                {chapter.moduleLabel}
              </span>
              {chapter.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-line-strong px-2.5 py-0.5 text-[10.5px] text-subtle">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-3 text-balance text-[26px] font-semibold leading-tight tracking-tight text-ink sm:text-[34px]">
              {chapter.title}
            </h1>
            <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-subtle">{chapter.subtitle}</p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-muted">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {chapter.estMinutes} min read
              </span>
              <span className="flex items-center gap-1.5">
                <ListTree className="h-3.5 w-3.5" /> {stats.total} sections
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpenCheck className="h-3.5 w-3.5" /> {stats.read} marked read
              </span>
            </div>
          </header>

          <KeyTakeaways courseModuleId={chapter.courseModuleId} />

          <div className="max-w-[76ch]">{rendered.content}</div>

          {/* End-of-chapter marker */}
          <div className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-canvas p-5">
            <BookOpenCheck className={`h-5 w-5 ${accent.text}`} />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-ink">
                {isChapterComplete(chapter.id) ? 'Chapter complete' : 'Finished this chapter?'}
              </div>
              <div className="text-[12px] text-subtle">
                {stats.read}/{stats.total} sections marked read. Mark the chapter done to track it on your dashboard.
              </div>
            </div>
            <button
              onClick={() => toggleChapterComplete(chapter.id)}
              className={`rounded-xl px-4 py-2 text-[13px] font-semibold transition-colors ${
                isChapterComplete(chapter.id)
                  ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200'
                  : 'bg-ink text-paper hover:bg-ink/85'
              }`}
            >
              {isChapterComplete(chapter.id) ? 'Completed' : 'Mark chapter complete'}
            </button>
          </div>
        </article>

        {/* Outline */}
        <aside className="hidden xl:block">
          <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10.5px] font-semibold text-muted">On this page</span>
              <span className="font-mono text-[10px] text-muted">
                {stats.read}/{stats.total}
              </span>
            </div>
            <nav aria-label="Chapter sections" className="space-y-0.5 border-l border-line">
              {outline?.sections.map((section) => {
                const isActive = activeSection === section.id;
                const read = isSectionRead(chapter.id, section.id);
                return (
                  <div
                    key={section.id}
                    className={`group flex items-start gap-1 border-l-2 pl-3 ${section.level > 2 ? 'ml-3' : ''} ${
                      isActive ? 'border-ink' : 'border-transparent'
                    }`}
                  >
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`flex-1 py-1.5 text-left text-[12.5px] leading-snug transition-colors ${
                        isActive ? 'font-semibold text-ink' : read ? 'text-muted' : 'text-subtle hover:text-strong'
                      }`}
                    >
                      {section.text}
                    </button>
                    <button
                      onClick={() => toggleSection(chapter.id, section.id)}
                      aria-label={read ? 'Mark section unread' : 'Mark section read'}
                      title={read ? 'Mark unread' : 'Mark read'}
                      className={`mt-1.5 rounded p-0.5 transition-colors ${read ? 'text-emerald-700' : 'text-faint hover:text-body'}`}
                    >
                      {read ? <Check className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                );
              })}
            </nav>

            <div className="mt-5 rounded-xl border border-line bg-canvas p-3">
              <div className="text-[10.5px] text-muted">Chapter progress</div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
                <div className={`h-full rounded-full ${accent.bar}`} style={{ width: `${stats.percent}%` }} />
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[11px] text-subtle">
                <span>{stats.percent}%</span>
                <span className="flex items-center gap-1 text-muted">
                  <ChevronRight className="h-3 w-3" /> {outline?.wordCount.toLocaleString()} words
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
