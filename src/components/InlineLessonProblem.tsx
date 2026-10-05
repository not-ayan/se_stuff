import React, { useCallback, useState } from 'react';
import {
  ArrowRight,
  Brain,
  Calculator,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Dices,
  Lightbulb,
  Sparkles,
  XCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  generateRandomProblem,
  type GeneratedProblem,
  type ProblemTopic,
} from '../lib/problemGenerator';
import { useProgress } from '../lib/progress';

export const CHAPTER_PROBLEM_TOPICS: Record<string, ProblemTopic[]> = {
  'ch-01': ['software_crisis_traceability'],
  'ch-02': ['sdlc_phase_containment'],
  'ch-03': ['quality_maintainability_portability'],
  'ch-04': ['requirements_decision_tables', 'decision_table'],
  'ch-05': ['design_cohesion_coupling', 'design_fod_vs_ood'],
  'ch-06': ['testing_fundamentals_unit', 'testing_bva'],
  'ch-07': ['all'],
  'ch-master': ['all'],
};

interface InlineLessonProblemProps {
  chapterId: string;
  chapterTitle: string;
}

export const InlineLessonProblem: React.FC<InlineLessonProblemProps> = ({
  chapterId,
  chapterTitle,
}) => {
  const { addStudyTime } = useProgress();

  const getTopicForChapter = useCallback((): ProblemTopic => {
    const list = CHAPTER_PROBLEM_TOPICS[chapterId] ?? ['all'];
    return list[Math.floor(Math.random() * list.length)];
  }, [chapterId]);

  const [problem, setProblem] = useState<GeneratedProblem>(() =>
    generateRandomProblem(getTopicForChapter()),
  );
  const [userNumberAnswer, setUserNumberAnswer] = useState<string>('');
  const [userChoiceAnswer, setUserChoiceAnswer] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showDerivation, setShowDerivation] = useState<boolean>(false);
  const [hintIndex, setHintIndex] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const nextLessonProblem = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const p = generateRandomProblem(getTopicForChapter());
      setProblem(p);
      setUserNumberAnswer('');
      setUserChoiceAnswer('');
      setStatus('idle');
      setShowDerivation(false);
      setHintIndex(0);
      setIsGenerating(false);
    }, 120);
  };

  const handleCheck = () => {
    if (status === 'correct') {
      nextLessonProblem();
      return;
    }

    let isCorrect = false;

    if (problem.type === 'numerical') {
      const parsed = parseFloat(userNumberAnswer);
      if (isNaN(parsed)) return;

      const expected =
        typeof problem.expectedAnswer === 'number'
          ? problem.expectedAnswer
          : parseFloat(problem.expectedAnswer);
      const tol = problem.tolerance ?? 0.03;

      if (tol === 0) {
        isCorrect = Math.abs(parsed - expected) < 0.0001;
      } else {
        const margin = Math.abs(expected * tol);
        isCorrect = Math.abs(parsed - expected) <= Math.max(margin, 0.2);
      }
    } else {
      isCorrect =
        userChoiceAnswer.trim().toLowerCase() ===
        String(problem.expectedAnswer).trim().toLowerCase();
    }

    addStudyTime(30);

    if (isCorrect) {
      setStatus('correct');
      setShowDerivation(true);
      try {
        confetti({
          particleCount: 45,
          spread: 55,
          origin: { y: 0.8 },
        });
      } catch {
        // ignore
      }
    } else {
      setStatus('incorrect');
    }
  };

  return (
    <div className="my-10 rounded-2xl border-2 border-dashed border-sky-400/50 bg-gradient-to-b from-sky-50/40 to-surface p-5 sm:p-7 shadow-sm">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-sky-600 text-paper text-[12px] font-bold">
            🎯
          </span>
          <div>
            <div className="text-[13px] font-bold text-ink">
              In-Lesson Problem: {problem.topicLabel}
            </div>
            <div className="text-[11px] text-muted">
              Auto-generated test problem for {chapterTitle}
            </div>
          </div>
        </div>

        <button
          onClick={nextLessonProblem}
          disabled={isGenerating}
          className="flex items-center gap-1.5 rounded-xl border border-line bg-surface px-3 py-1.5 text-[11.5px] font-semibold text-ink transition-colors hover:bg-canvas shadow-sm"
          title="Roll a different randomized problem for this lesson"
        >
          <Dices className={`h-3.5 w-3.5 text-amber-600 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>New Problem</span>
        </button>
      </div>

      {/* Problem Content */}
      <div className="mt-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-sky-800 bg-sky-100/70 px-2 py-0.5 rounded-md">
            {problem.formulaUsed}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              problem.difficulty === 'Easy'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : problem.difficulty === 'Medium'
                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            {problem.difficulty}
          </span>
        </div>

        <h4 className="mt-2 text-[16px] font-semibold text-ink sm:text-[17px]">
          {problem.title}
        </h4>

        <p className="mt-2 text-[13.5px] leading-relaxed text-body whitespace-pre-line">
          {problem.prompt}
        </p>

        {/* Given Parameters */}
        {problem.givenData.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-2">
            {problem.givenData.map((d, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-canvas px-2.5 py-1 font-mono text-[11.5px]"
              >
                <span className="text-muted">{d.label}:</span>
                <span className="font-semibold text-ink">{d.value}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Solution Input & Checker */}
      <div className="mt-5 rounded-xl border border-line bg-surface p-4">
        <div className="text-[11.5px] font-semibold text-muted uppercase tracking-wider">
          Solve Directly Below:
        </div>

        {problem.type === 'numerical' ? (
          <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
            <div className="relative min-w-[180px] flex-1">
              <input
                type="number"
                step="any"
                value={userNumberAnswer}
                onChange={(e) => {
                  setUserNumberAnswer(e.target.value);
                  if (status !== 'idle') setStatus('idle');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCheck();
                }}
                placeholder={`Your calculation${problem.unit ? ` (${problem.unit})` : ''}...`}
                className={`w-full rounded-xl border px-3 py-2 font-mono text-[13.5px] text-ink focus:outline-none ${
                  status === 'correct'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-300'
                    : status === 'incorrect'
                    ? 'border-rose-400 bg-rose-50 text-rose-900 ring-1 ring-rose-200'
                    : 'border-line-strong bg-canvas focus:border-sky-600 focus:ring-1 focus:ring-sky-200'
                }`}
              />
              {problem.unit && (
                <span className="absolute right-3 top-2.5 text-[11px] font-medium text-muted">
                  {problem.unit}
                </span>
              )}
            </div>

            <button
              onClick={handleCheck}
              className="flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2 text-[12.5px] font-semibold text-paper transition-colors hover:bg-neutral-800 shadow-sm"
            >
              {status === 'correct' ? (
                <>
                  <span>Next Problem</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              ) : (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Check Answer</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="mt-3 space-y-2">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {problem.options?.map((opt) => {
                const selected = userChoiceAnswer === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => {
                      setUserChoiceAnswer(opt);
                      if (status !== 'idle') setStatus('idle');
                    }}
                    className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all ${
                      selected
                        ? 'border-ink bg-canvas shadow-sm ring-1 ring-ink'
                        : 'border-line bg-canvas hover:border-line-strong'
                    }`}
                  >
                    <span
                      className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full border ${
                        selected ? 'border-ink bg-ink text-paper' : 'border-line-strong'
                      }`}
                    >
                      {selected && <Check className="h-2 w-2" />}
                    </span>
                    <span className={`text-[12.5px] ${selected ? 'font-semibold text-ink' : 'text-body'}`}>
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-3 flex justify-end">
              <button
                onClick={handleCheck}
                disabled={!userChoiceAnswer}
                className="flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2 text-[12.5px] font-semibold text-paper transition-colors hover:bg-neutral-800 disabled:opacity-50 shadow-sm"
              >
                {status === 'correct' ? (
                  <>
                    <span>Next Problem</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                ) : (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Check Answer</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Status feedback */}
        {status === 'correct' && (
          <div className="mt-3.5 flex items-start gap-2.5 rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-emerald-900">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
            <div className="text-[12px] leading-snug">
              <span className="font-bold">Correct!</span> {problem.finalExplanation}
            </div>
          </div>
        )}

        {status === 'incorrect' && (
          <div className="mt-3.5 flex items-start gap-2.5 rounded-xl border border-rose-300 bg-rose-50 p-3 text-rose-900">
            <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-700" />
            <div className="text-[12px] leading-snug">
              <span className="font-bold">Not quite right.</span> Double-check the values or reveal a hint below.
            </div>
          </div>
        )}
      </div>

      {/* Hints & Derivations */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 text-[11.5px]">
        <div className="flex items-center gap-2">
          {problem.hints.length > 0 && (
            <button
              onClick={() => setHintIndex((h) => Math.min(h + 1, problem.hints.length))}
              className="flex items-center gap-1 rounded-lg border border-line bg-surface px-2.5 py-1 text-subtle hover:text-ink"
            >
              <Lightbulb className="h-3 w-3 text-amber-500" />
              <span>{hintIndex === 0 ? 'Hint' : `Hint (${hintIndex}/${problem.hints.length})`}</span>
            </button>
          )}

          <button
            onClick={() => setShowDerivation((s) => !s)}
            className="flex items-center gap-1 rounded-lg border border-line bg-surface px-2.5 py-1 text-subtle hover:text-ink"
          >
            <Calculator className="h-3 w-3 text-sky-600" />
            <span>{showDerivation ? 'Hide Steps' : 'Step-by-step Solution'}</span>
            {showDerivation ? <ChevronUp className="h-2.5 w-2.5" /> : <ChevronDown className="h-2.5 w-2.5" />}
          </button>
        </div>

        <span className="text-[10.5px] text-muted">
          Tolerance: {problem.tolerance ? `±${(problem.tolerance * 100).toFixed(0)}%` : 'Exact'}
        </span>
      </div>

      {hintIndex > 0 && (
        <div className="mt-3 space-y-1 rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-[12px] text-amber-900">
          {problem.hints.slice(0, hintIndex).map((h, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <span className="font-bold">💡 Hint {i + 1}:</span>
              <span>{h}</span>
            </div>
          ))}
        </div>
      )}

      {showDerivation && (
        <div className="mt-3 rounded-xl border border-sky-200 bg-sky-50/70 p-4 text-[12.5px] text-sky-950">
          <div className="flex items-center justify-between font-semibold text-sky-900 border-b border-sky-200 pb-2">
            <span className="flex items-center gap-1.5">
              <Brain className="h-3.5 w-3.5" /> Full Mathematical Solution
            </span>
            <span className="font-mono">
              Answer: {String(problem.expectedAnswer)} {problem.unit ?? ''}
            </span>
          </div>
          <ol className="mt-2.5 list-inside list-decimal space-y-1 text-sky-900">
            {problem.derivationSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};
