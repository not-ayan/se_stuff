import React, { useMemo } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Brain,
  Calculator,
  Check,
  Clock,
  Compass,
  Dices,
  Flame,
  Layers3,
  RotateCcw,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
} from 'lucide-react';
import { CHAPTERS, getChapterById } from '../content/chapters';
import { ALL_QUESTIONS, QUIZ_MODULE_LABELS } from '../data/quiz';
import { FLASHCARDS } from '../data/flashcards';
import { formatDuration, useProgress } from '../lib/progress';
import { ACCENT_CLASSES, ProgressBar, SectionHeading, StatTile } from '../components/ui';
import type { ViewKey } from '../components/TopBar';

interface DashboardProps {
  onSelectChapter: (id: string) => void;
  onNavigate: (view: ViewKey) => void;
  onOpenQuiz: (moduleId?: string) => void;
  onOpenCards: (chapterId?: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectChapter, onNavigate, onOpenQuiz, onOpenCards }) => {
  const {
    overall,
    quizSummary,
    streak,
    chapterStats,
    isChapterComplete,
    state,
    bookmarkedChapters,
    resetProgress,
    todayTimeSeconds,
    totalTimeSeconds,
    chapterTimeSeconds,
  } = useProgress();

  const continueChapter = useMemo(() => {
    if (state.lastVisit) {
      const last = getChapterById(state.lastVisit.chapterId);
      if (last) return last;
    }
    return CHAPTERS.find((chapter) => !isChapterComplete(chapter.id)) ?? CHAPTERS[0];
  }, [isChapterComplete, state.lastVisit]);

  const focusNext = useMemo(
    () => CHAPTERS.find((chapter) => chapterStats(chapter.id).percent < 100) ?? CHAPTERS[CHAPTERS.length - 1],
    [chapterStats],
  );

  const reviewQueue = useMemo(
    () =>
      ALL_QUESTIONS.filter((question) => state.quiz[question.id]?.correct === false)
        .sort((a, b) => (state.quiz[b.id]?.lastAt ?? 0) - (state.quiz[a.id]?.lastAt ?? 0))
        .slice(0, 5),
    [state.quiz],
  );

  const cardsSeen = Object.keys(state.cards).length;
  const cardsKnown = Object.values(state.cards).filter((card) => card.known > 0).length;
  const focusStats = chapterStats(focusNext.id);

  return (
    <div className="mx-auto max-w-[1200px] space-y-9 px-4 py-7 sm:px-6 sm:py-9">
      {/* ── Hero: the white card, with the dark summary panel beside it ────── */}
      <section className="rounded-[20px] border border-line bg-surface p-6 shadow-card sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_330px]">
          <div className="flex flex-col">
            <div className="flex flex-wrap items-start gap-4 sm:gap-5">
              <span className="grid h-[68px] w-[68px] shrink-0 place-content-center rounded-2xl bg-canvas text-center sm:h-20 sm:w-20">
                <span className="block font-mono text-xl font-semibold leading-none text-ink">{continueChapter.order}</span>
                <span className="mt-1 block text-[10.5px] leading-none text-muted">of {CHAPTERS.length}</span>
              </span>
              <div className="min-w-0">
                <h1 className="text-[22px] font-semibold leading-tight tracking-tight text-ink sm:text-[27px]">
                  CSMC501 — Software Engineering Mid-Term
                </h1>
                <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-subtle">
                  Curated strictly to the Mid-Term Syllabus (Modules 1–6: Software Crisis, Traceability, SDLC & Phase Containment, Quality, Requirements & Decision Tables, Design up to FOD vs OOD, and Testing Fundamentals). Procedural problem generators and real-time solution checkers embedded directly in every lesson.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <button
                onClick={() => onSelectChapter(continueChapter.id)}
                className="flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-[13px] font-semibold text-paper transition-colors hover:bg-ink/85"
              >
                <BookOpen className="h-4 w-4" />
                {state.lastVisit ? 'Continue reading' : 'Start learning'}
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => onOpenQuiz()}
                className="flex items-center gap-2 rounded-xl bg-canvas px-4 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-line"
              >
                <Sparkles className="h-4 w-4 text-amber-700" />
                Mixed quiz
              </button>
              <button
                onClick={() => onNavigate('labs')}
                className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-[13px] font-semibold text-amber-900 transition-colors hover:bg-amber-500/20 shadow-sm"
              >
                <Dices className="h-4 w-4 text-amber-600" />
                Problem Generator
              </button>
            </div>

            <div className="mt-auto pt-5 text-[12.5px] text-muted">
              Up next — <span className="text-body">{continueChapter.moduleLabel} · {continueChapter.title}</span>
            </div>
          </div>

          {/* Exam readiness — the one dark surface in the workspace */}
          <aside className="rounded-2xl bg-ink p-5 text-paper shadow-ink">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-white/70" />
              <h2 className="text-[13.5px] font-semibold">Exam readiness</h2>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-mono text-[26px] font-semibold leading-none">{overall.percent}%</span>
              <span className="text-[11.5px] text-white/55">of the course covered</span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${overall.percent}%` }} />
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-[12.5px] font-medium text-white/85">
                  <Compass className="h-3.5 w-3.5" /> Progress
                </div>
                <p className="mt-1 text-[12px] leading-relaxed text-white/60">
                  {overall.chaptersComplete} of {CHAPTERS.length} chapters complete · {overall.sectionsRead} of{' '}
                  {overall.sectionsTotal} sections read.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[12.5px] font-medium text-white/85">
                  <Target className="h-3.5 w-3.5" /> Focus next
                </div>
                <p className="mt-1 text-[12px] leading-relaxed text-white/60">
                  {focusNext.moduleLabel} · {focusNext.title}
                  {focusStats.total > focusStats.read
                    ? ` — ${focusStats.total - focusStats.read} sections left.`
                    : ' — every section marked read.'}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[12.5px] font-medium text-white/85">
                  <Brain className="h-3.5 w-3.5" /> Recall
                </div>
                <p className="mt-1 text-[12px] leading-relaxed text-white/60">
                  {quizSummary.answered > 0
                    ? `${quizSummary.answered} questions answered at ${quizSummary.accuracy}% accuracy.`
                    : 'No quiz attempts yet. Ten questions is a good first pass.'}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatTile
          label="Study Time"
          value={formatDuration(todayTimeSeconds)}
          hint={`${formatDuration(totalTimeSeconds)} total logged`}
          icon={<Clock className="h-4 w-4" />}
          tone="text-emerald-700"
        />
        <StatTile label="Streak" value={`${streak}d`} hint="Consecutive study days" icon={<Flame className="h-4 w-4" />} tone="text-amber-700" />
        <StatTile label="Questions" value={`${quizSummary.answered}`} hint={`${quizSummary.correct} correct so far`} icon={<Trophy className="h-4 w-4" />} tone="text-ink" />
        <StatTile label="Flashcards" value={`${cardsKnown}/${FLASHCARDS.length}`} hint={`${cardsSeen} cards reviewed`} icon={<Sparkles className="h-4 w-4" />} tone="text-violet-700" />
        <StatTile label="Bookmarks" value={`${bookmarkedChapters.length}`} hint="Chapters saved for revision" icon={<BookmarkCheck className="h-4 w-4" />} tone="text-sky-700" />
      </section>

      {/* ── Chapter library ───────────────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHeading eyebrow="Library" title="All chapters" description="Every chapter maps directly to a module in the syllabus." />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CHAPTERS.map((chapter) => {
            const stats = chapterStats(chapter.id);
            const accent = ACCENT_CLASSES[chapter.accent];
            const bookmarked = Boolean(state.bookmarks[chapter.id]);
            const spentSecs = chapterTimeSeconds(chapter.id);
            return (
              <button
                key={chapter.id}
                onClick={() => onSelectChapter(chapter.id)}
                className="group flex flex-col rounded-2xl border border-line bg-surface p-4 text-left transition-all hover:border-line-strong hover:shadow-card"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={`rounded-full px-2 py-[3px] text-[10.5px] font-semibold ${accent.bg} ${accent.text}`}>
                    {chapter.moduleLabel}
                  </span>
                  {bookmarked && <Bookmark className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />}
                  {isChapterComplete(chapter.id) && <Check className="h-4 w-4 text-emerald-700" />}
                </div>
                <h3 className="mt-3 text-[14px] font-semibold leading-snug tracking-tight text-ink">{chapter.title}</h3>
                <p className="mt-1 line-clamp-2 flex-1 text-[12px] leading-snug text-subtle">{chapter.subtitle}</p>
                <div className="mt-4">
                  <ProgressBar value={stats.percent} tone={accent.bar} />
                  <div className="mt-2 flex items-center justify-between text-[10.5px] text-muted">
                    <span className="font-mono">{stats.read}/{stats.total} sections</span>
                    <span className="flex items-center gap-1 font-mono text-[10.5px]">
                      {spentSecs > 0 && <span className="text-emerald-700 font-semibold">{formatDuration(spentSecs)} /</span>}
                      <span>{chapter.estMinutes} min</span>
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Review queue + labs ───────────────────────────────────────────── */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <SectionHeading
            eyebrow="Active recall"
            title="Review queue"
            description="Questions you answered incorrectly. Revisit them — spaced repetition is where the marks are won."
            action={
              reviewQueue.length > 0 ? (
                <button
                  onClick={() => onOpenQuiz()}
                  className="flex items-center gap-1.5 rounded-xl border border-line px-3 py-1.5 text-[12px] font-semibold text-body transition-colors hover:border-line-strong hover:text-ink"
                >
                  Practise all <ArrowRight className="h-3.5 w-3.5" />
                </button>
              ) : undefined
            }
          />
          {reviewQueue.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line-strong bg-surface p-6 text-center">
              <TrendingUp className="mx-auto h-6 w-6 text-emerald-700" />
              <p className="mt-2 text-[13px] font-semibold text-ink">Nothing to review yet</p>
              <p className="mt-1 text-[12px] text-subtle">
                {quizSummary.answered === 0
                  ? 'Take a quiz and any misses will collect here for revision.'
                  : 'Clean sheet — every question you have answered was correct.'}
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {reviewQueue.map((question) => (
                <li key={question.id} className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-3.5">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-700" />
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-[13px] font-medium text-strong">{question.question}</p>
                    <p className="mt-1 text-[10.5px] text-muted">
                      {QUIZ_MODULE_LABELS[question.moduleId] ?? question.moduleId}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-2">
          <SectionHeading eyebrow="Practice" title="Labs" />
          <button
            onClick={() => onNavigate('labs')}
            className="flex w-full items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-left transition-colors hover:border-amber-400 hover:bg-amber-50"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-100">
              <Dices className="h-4 w-4 text-amber-700" />
            </span>
            <span>
              <span className="block text-[13px] font-semibold text-ink">Problem Generator &amp; Checker</span>
              <span className="block text-[11.5px] text-amber-900/75">Infinite random questions &amp; step-by-step solvers</span>
            </span>
          </button>
          <button
            onClick={() => onNavigate('labs')}
            className="flex w-full items-center gap-3 rounded-2xl border border-line bg-surface p-4 text-left transition-colors hover:border-line-strong"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-canvas">
              <Layers3 className="h-4 w-4 text-emerald-700" />
            </span>
            <span>
              <span className="block text-[13px] font-semibold text-ink">Concept Visualizers</span>
              <span className="block text-[11.5px] text-subtle">Waterfall, Spiral, Bathtub &amp; Cohesion</span>
            </span>
          </button>
          <button
            onClick={() => onNavigate('labs')}
            className="flex w-full items-center gap-3 rounded-2xl border border-line bg-surface p-4 text-left transition-colors hover:border-line-strong"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-canvas">
              <Calculator className="h-4 w-4 text-ink" />
            </span>
            <span>
              <span className="block text-[13px] font-semibold text-ink">Formula &amp; numerical lab</span>
              <span className="block text-[11.5px] text-subtle">COCOMO, Putnam, Halstead, McCabe</span>
            </span>
          </button>
          <button
            onClick={() => onOpenCards()}
            className="flex w-full items-center gap-3 rounded-2xl border border-line bg-surface p-4 text-left transition-colors hover:border-line-strong"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-canvas">
              <Layers3 className="h-4 w-4 text-violet-700" />
            </span>
            <span>
              <span className="block text-[13px] font-semibold text-ink">Flashcard decks</span>
              <span className="block text-[11.5px] text-subtle">{FLASHCARDS.length} recall cards</span>
            </span>
          </button>
          <button
            onClick={() => {
              if (window.confirm('Reset all reading progress, quiz results and flashcard history?')) resetProgress();
            }}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-[11.5px] text-muted transition-colors hover:text-rose-700"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset all progress
          </button>
        </div>
      </section>
    </div>
  );
};
