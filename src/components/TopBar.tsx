import React from 'react';
import { BookOpen, BrainCircuit, Command, HelpCircle, Layers3, LayoutGrid, LayoutDashboard, Search, Sparkles } from 'lucide-react';

export type ViewKey = 'home' | 'learn' | 'quiz' | 'cards' | 'labs';

interface TopBarProps {
  view: ViewKey;
  onNavigate: (view: ViewKey) => void;
  onOpenSearch: () => void;
  onOpenAiMentor?: () => void;
  overallPercent: number;
  streak: number;
}

const NAV: { key: ViewKey; label: string; icon: React.ReactNode }[] = [
  { key: 'home', label: 'Home', icon: <LayoutDashboard className="h-4 w-4" /> },
  { key: 'learn', label: 'Learn', icon: <BookOpen className="h-4 w-4" /> },
  { key: 'quiz', label: 'Quiz', icon: <HelpCircle className="h-4 w-4" /> },
  { key: 'cards', label: 'Flashcards', icon: <Sparkles className="h-4 w-4" /> },
  { key: 'labs', label: 'Labs', icon: <Layers3 className="h-4 w-4" /> },
];

export const TopBar: React.FC<TopBarProps> = ({
  view,
  onNavigate,
  onOpenSearch,
  onOpenAiMentor,
  overallPercent,
  streak,
}) => {
  const navList = (className: string) => (
    <nav aria-label="Primary" className={className}>
      {NAV.map((item) => {
        const active = view === item.key;
        return (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            aria-current={active ? 'page' : undefined}
            className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-medium transition-colors ${
              active ? 'bg-ink font-semibold text-paper' : 'text-subtle hover:bg-canvas hover:text-ink'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );

  return (
    <header className="sticky top-2 z-40 rounded-t-[22px] border-b border-line bg-panel/90 backdrop-blur-md sm:top-4">
      <div className="mx-auto flex max-w-[1500px] items-center gap-3 px-3 py-3 sm:px-5">
        {/* Brand — a rounded grid mark beside the workspace name */}
        <button
          onClick={() => onNavigate('home')}
          className="group flex items-center gap-2.5 rounded-xl text-left"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-paper">
            <LayoutGrid className="h-4 w-4" />
          </span>
          <span className="hidden sm:block">
            <span className="block text-[13.5px] font-semibold leading-tight tracking-tight text-ink">Software Engineering</span>
            <span className="block text-[11.5px] leading-tight text-muted">Exam prep workspace</span>
          </span>
        </button>

        {/* Primary nav — inline on desktop */}
        {navList('no-scrollbar ml-1 hidden min-w-0 flex-1 items-center gap-0.5 overflow-x-auto md:flex')}

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          {onOpenAiMentor && (
            <button
              onClick={onOpenAiMentor}
              className="flex items-center gap-1.5 rounded-xl border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-[12.5px] font-semibold text-sky-800 transition-colors hover:bg-sky-500/20 shadow-sm"
              title="Open AI Study Companion [⌘J]"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span className="hidden sm:inline">AI Mentor</span>
              <kbd className="hidden lg:inline rounded bg-white/60 px-1 py-0.2 text-[9.5px] font-mono opacity-80">⌘J</kbd>
            </button>
          )}

          <button
            onClick={onOpenSearch}
            className="hidden items-center gap-2 rounded-xl border border-line bg-canvas px-3 py-2 text-[13px] text-muted transition-colors hover:border-line-strong hover:text-ink xl:flex"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search notes…</span>
            <kbd className="ml-4 flex items-center gap-0.5 rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[10px] text-muted">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </button>

          <button
            onClick={onOpenSearch}
            aria-label="Search notes"
            className="rounded-xl border border-line bg-canvas p-2 text-subtle transition-colors hover:text-ink xl:hidden"
          >
            <Search className="h-4 w-4" />
          </button>

          <div
            className="hidden items-center gap-1.5 rounded-xl border border-line bg-surface px-2.5 py-2 sm:flex"
            title={`${streak}-day study streak`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${streak > 0 ? 'bg-emerald-500' : 'bg-faint'}`} />
            <span className="text-[11.5px] font-medium text-body">{streak}d streak</span>
          </div>

          <div
            className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2"
            title="Overall course progress"
          >
            <div className="hidden h-1.5 w-14 overflow-hidden rounded-full bg-line lg:block">
              <div className="h-full rounded-full bg-ink transition-all duration-500" style={{ width: `${overallPercent}%` }} />
            </div>
            <span className="text-[11.5px] font-semibold text-ink">{overallPercent}%</span>
          </div>
        </div>
      </div>

      {/* Primary nav — its own scrollable row when the header is narrow */}
      <div className="mx-auto max-w-[1500px] px-3 pb-2 sm:px-5 md:hidden">
        {navList('no-scrollbar flex items-center gap-0.5 overflow-x-auto')}
      </div>
    </header>
  );
};
