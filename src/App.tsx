import React, { useCallback, useEffect, useState } from 'react';
import { ProgressProvider, useProgress } from './lib/progress';
import { TopBar, type ViewKey } from './components/TopBar';
import { SearchPalette } from './components/SearchPalette';
import { Dashboard } from './views/Dashboard';
import { LearnView } from './views/LearnView';
import { QuizView } from './views/QuizView';
import { FlashcardsView } from './views/FlashcardsView';
import { LabsView } from './views/LabsView';
import { AiCompanionDrawer } from './components/AiCompanionDrawer';
import { CHAPTERS, getChapterById } from './content/chapters';
import type { Question } from './types';
import { Sparkles } from 'lucide-react';

type LabTab = 'dfd' | 'numerical' | 'diagrams';

const Workspace: React.FC = () => {
  const { overall, streak } = useProgress();
  const [view, setView] = useState<ViewKey>('home');
  const [chapterId, setChapterId] = useState<string>(CHAPTERS[0].id);
  const [quizModuleId, setQuizModuleId] = useState<string | undefined>(undefined);
  const [customQuestions, setCustomQuestions] = useState<Question[] | null>(null);
  const [cardsChapterId, setCardsChapterId] = useState<string | undefined>(undefined);
  const [labTab, setLabTab] = useState<LabTab>('dfd');
  const [searchOpen, setSearchOpen] = useState(false);

  // AI Drawer state
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string | undefined>(undefined);

  // Global shortcuts: Cmd+K for search, Cmd+J for AI mentor
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'j') {
        event.preventDefault();
        setAiDrawerOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const navigate = useCallback((next: ViewKey) => {
    setView(next);
    window.scrollTo({ top: 0 });
  }, []);

  const openChapter = useCallback((id: string, sectionId?: string) => {
    setChapterId(id);
    setView('learn');
    window.scrollTo({ top: 0 });
    if (sectionId) {
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    }
  }, []);

  const openQuizForChapter = useCallback((id: string) => {
    setCustomQuestions(null);
    setQuizModuleId(getChapterById(id)?.quizModuleId);
    navigate('quiz');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-canvas text-ink antialiased">
      {/* One large rounded panel sits on the gray backdrop; everything else lives inside it. */}
      <div className="mx-auto max-w-[1560px] p-2 sm:p-4">
        <div className="rounded-[22px] border border-line bg-panel shadow-panel">
      <TopBar
        view={view}
        onNavigate={navigate}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAiMentor={() => {
          setAiInitialPrompt(undefined);
          setAiDrawerOpen(true);
        }}
        overallPercent={overall.percent}
        streak={streak}
      />

      {view === 'home' && (
        <Dashboard
          onSelectChapter={openChapter}
          onNavigate={(next) => {
            if (next === 'quiz') {
              setCustomQuestions(null);
              setQuizModuleId(undefined);
            }
            navigate(next);
          }}
          onOpenQuiz={() => {
            setCustomQuestions(null);
            setQuizModuleId(undefined);
            navigate('quiz');
          }}
          onOpenCards={(id) => {
            setCardsChapterId(id);
            navigate('cards');
          }}
        />
      )}

      {view === 'learn' && (
        <LearnView
          chapterId={chapterId}
          onSelectChapter={setChapterId}
          onOpenQuiz={openQuizForChapter}
          onOpenCards={(id) => {
            setCardsChapterId(id);
            navigate('cards');
          }}
          onOpenPractice={() => {
            setLabTab('dfd');
            navigate('labs');
          }}
          onOpenAiMentor={(prompt) => {
            setAiInitialPrompt(prompt);
            setAiDrawerOpen(true);
          }}
        />
      )}

      {view === 'quiz' && (
        <QuizView
          key={customQuestions ? `ai-${customQuestions.length}` : (quizModuleId ?? 'mixed')}
          initialModuleId={quizModuleId}
          initialQuestions={customQuestions ?? undefined}
          onSelectChapter={openChapter}
          onOpenAiCompanion={(prompt) => {
            setAiInitialPrompt(prompt);
            setAiDrawerOpen(true);
          }}
        />
      )}

      {view === 'cards' && <FlashcardsView key={cardsChapterId ?? 'all'} initialChapterId={cardsChapterId} />}

      {view === 'labs' && <LabsView key={labTab} initialTab={labTab} />}

      {/* Floating AI Study Companion Trigger */}
      <button
        onClick={() => {
          setAiInitialPrompt(undefined);
          setAiDrawerOpen(true);
        }}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-sky-500/40 bg-ink px-4 py-2.5 text-[13px] font-semibold text-paper shadow-xl transition-all duration-200 hover:scale-105 hover:bg-neutral-800"
        title="Open AI Study Companion [⌘J]"
      >
        <Sparkles className="h-4 w-4 text-amber-300" />
        <span>AI Mentor</span>
        <kbd className="hidden sm:inline-block rounded bg-white/20 px-1 py-0.2 font-mono text-[9.5px] text-paper">
          ⌘J
        </kbd>
      </button>

      {/* Slide-over Global AI Companion Drawer */}
      <AiCompanionDrawer
        open={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
        currentChapterTitle={getChapterById(chapterId)?.title}
        currentModuleId={getChapterById(chapterId)?.quizModuleId}
        initialPrompt={aiInitialPrompt}
        onLaunchCustomQuiz={(qs) => {
          setCustomQuestions(qs);
          navigate('quiz');
        }}
      />

      <SearchPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectChapter={openChapter}
        onOpenQuiz={() => {
          setQuizModuleId(undefined);
          navigate('quiz');
        }}
        onOpenCards={() => {
          setCardsChapterId(undefined);
          navigate('cards');
        }}
      />

      <footer className="border-t border-line px-4 py-6 text-center sm:px-6">
        <p className="text-[11.5px] text-muted">
          Software Engineering Exam Prep · Rajib Mall (IIT Kharagpur) &amp; Swarup Roy (Tezpur University)
        </p>
      </footer>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ProgressProvider>
      <Workspace />
    </ProgressProvider>
  );
}
