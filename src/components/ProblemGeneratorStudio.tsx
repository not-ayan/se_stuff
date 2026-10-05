import React, { useCallback, useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Brain,
  Calculator,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Dices,
  Flame,
  HelpCircle,
  Lightbulb,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Trophy,
  XCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  generateRandomProblem,
  type GeneratedProblem,
  type ProblemTopic,
} from '../lib/problemGenerator';
import { useProgress } from '../lib/progress';

const TOPIC_OPTIONS: { id: ProblemTopic; label: string; icon: string }[] = [
  { id: 'all', label: 'CSMC501 Mid-Term Mix', icon: '🎯' },
  { id: 'software_crisis_traceability', label: '1. Software Crisis & RTM', icon: '📉' },
  { id: 'sdlc_phase_containment', label: '2. SDLC & Phase Containment', icon: '🔄' },
  { id: 'quality_maintainability_portability', label: '3. Quality (Maintainability & Portability)', icon: '🛡️' },
  { id: 'requirements_decision_tables', label: '4. Requirements & Decision Tables', icon: '📋' },
  { id: 'design_cohesion_coupling', label: '5. Design: Cohesion & Coupling', icon: '🧩' },
  { id: 'design_fod_vs_ood', label: '5. Design: FOD vs. OOD', icon: '🏛️' },
  { id: 'testing_fundamentals_unit', label: '6. Testing Fundamentals & Unit Testing', icon: '🧪' },
  { id: 'decision_table', label: 'Decision Tables (2^k rules)', icon: '📊' },
  { id: 'testing_bva', label: 'BVA Boundary Analysis', icon: '🎯' },
];

export const ProblemGeneratorStudio: React.FC = () => {
  const { addStudyTime } = useProgress();
  const [selectedTopic, setSelectedTopic] = useState<ProblemTopic>('all');
  const [problem, setProblem] = useState<GeneratedProblem>(() => generateRandomProblem('all'));
  const [userNumberAnswer, setUserNumberAnswer] = useState<string>('');
  const [userChoiceAnswer, setUserChoiceAnswer] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showDerivation, setShowDerivation] = useState<boolean>(false);
  const [hintIndex, setHintIndex] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Local problem-session stats
  const [stats, setStats] = useState({
    attempted: 0,
    solved: 0,
    streak: 0,
  });

  const nextProblem = useCallback(
    (topicOverride?: ProblemTopic) => {
      setIsGenerating(true);
      setTimeout(() => {
        const p = generateRandomProblem(topicOverride ?? selectedTopic);
        setProblem(p);
        setUserNumberAnswer('');
        setUserChoiceAnswer('');
        setStatus('idle');
        setShowDerivation(false);
        setHintIndex(0);
        setIsGenerating(false);
      }, 150);
    },
    [selectedTopic],
  );

  const handleTopicChange = (topic: ProblemTopic) => {
    setSelectedTopic(topic);
    nextProblem(topic);
  };

  // Keyboard shortcut to generate new problem: 'R' key when not typing
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        nextProblem();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [nextProblem]);

  const handleCheckSolution = () => {
    if (status === 'correct') {
      nextProblem();
      return;
    }

    let isCorrect = false;

    if (problem.type === 'numerical') {
      const parsed = parseFloat(userNumberAnswer);
      if (isNaN(parsed)) return;

      const expected = typeof problem.expectedAnswer === 'number' ? problem.expectedAnswer : parseFloat(problem.expectedAnswer);
      const tol = problem.tolerance ?? 0.03; // default 3%

      if (tol === 0) {
        // exact match
        isCorrect = Math.abs(parsed - expected) < 0.0001;
      } else {
        const margin = Math.abs(expected * tol);
        isCorrect = Math.abs(parsed - expected) <= Math.max(margin, 0.2);
      }
    } else {
      isCorrect = userChoiceAnswer.trim().toLowerCase() === String(problem.expectedAnswer).trim().toLowerCase();
    }

    setStats((prev) => ({
      attempted: prev.attempted + 1,
      solved: prev.solved + (isCorrect ? 1 : 0),
      streak: isCorrect ? prev.streak + 1 : 0,
    }));

    // Log 30s of active study time on checking
    addStudyTime(30);

    if (isCorrect) {
      setStatus('correct');
      setShowDerivation(true);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
        });
      } catch {
        // ignore
      }
    } else {
      setStatus('incorrect');
    }
  };

  const accuracy = stats.attempted > 0 ? Math.round((stats.solved / stats.attempted) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* ── Topic Selector Pills ────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-line bg-surface p-2">
        {TOPIC_OPTIONS.map((t) => {
          const active = selectedTopic === t.id;
          return (
            <button
              key={t.id}
              onClick={() => handleTopicChange(t.id)}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[12px] font-medium transition-colors ${
                active
                  ? 'bg-ink font-semibold text-paper shadow-sm'
                  : 'text-subtle hover:bg-canvas hover:text-ink'
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Main Problem Card ───────────────────────────────────────────── */}
      <div className="rounded-[20px] border border-line bg-surface p-6 shadow-card sm:p-8">
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-ink px-2.5 py-0.5 text-[11px] font-semibold text-paper">
              {problem.topicLabel}
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold ${
                problem.difficulty === 'Easy'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : problem.difficulty === 'Medium'
                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {problem.difficulty}
            </span>
            <span className="rounded-full border border-line bg-canvas px-2.5 py-0.5 font-mono text-[10.5px] text-muted">
              {problem.formulaUsed}
            </span>
          </div>

          {/* Quick Action Button */}
          <button
            onClick={() => nextProblem()}
            disabled={isGenerating}
            className="flex items-center gap-2 rounded-xl border border-line bg-canvas px-3.5 py-1.5 text-[12.5px] font-semibold text-ink transition-all hover:border-line-strong hover:bg-line disabled:opacity-60 shadow-sm"
            title="Generate a brand new randomized problem (Hotkey: R)"
          >
            <Dices className={`h-4 w-4 text-amber-600 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>New Random Problem</span>
            <kbd className="hidden sm:inline-block rounded bg-line px-1.5 py-0.2 font-mono text-[9px] text-muted">R</kbd>
          </button>
        </div>

        {/* Title & Prompt */}
        <div className="mt-5">
          <h2 className="text-[19px] font-semibold leading-snug tracking-tight text-ink sm:text-[21px]">
            {problem.title}
          </h2>
          <p className="mt-3 whitespace-pre-line text-[14px] leading-relaxed text-body sm:text-[14.5px]">
            {problem.prompt}
          </p>
        </div>

        {/* Given Data Parameters Table */}
        {problem.givenData.length > 0 && (
          <div className="mt-5 rounded-xl border border-line bg-canvas/70 p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              Given Parameters
            </div>
            <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {problem.givenData.map((d, i) => (
                <div key={i} className="rounded-lg border border-line bg-surface p-2.5 text-left">
                  <div className="text-[10.5px] text-muted">{d.label}</div>
                  <div className="mt-0.5 font-mono text-[13px] font-semibold text-ink">{d.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Answer Input & Solution Checker */}
        <div className="mt-7 rounded-2xl border border-line bg-canvas p-5">
          <div className="text-[12px] font-semibold text-ink">Enter Your Solution</div>

          {problem.type === 'numerical' ? (
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <div className="relative min-w-[200px] flex-1">
                <input
                  type="number"
                  step="any"
                  value={userNumberAnswer}
                  onChange={(e) => {
                    setUserNumberAnswer(e.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCheckSolution();
                  }}
                  placeholder={`Enter value${problem.unit ? ` in ${problem.unit}` : ''}...`}
                  className={`w-full rounded-xl border px-3.5 py-2.5 font-mono text-[14px] text-ink focus:outline-none ${
                    status === 'correct'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-300'
                      : status === 'incorrect'
                      ? 'border-rose-400 bg-rose-50 text-rose-900 ring-1 ring-rose-200'
                      : 'border-line-strong bg-surface focus:border-sky-600 focus:ring-2 focus:ring-sky-100'
                  }`}
                />
                {problem.unit && (
                  <span className="absolute right-3.5 top-3 text-[11.5px] font-medium text-muted">
                    {problem.unit}
                  </span>
                )}
              </div>

              <button
                onClick={handleCheckSolution}
                className="flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-[13px] font-semibold text-paper transition-all hover:bg-neutral-800 shadow-sm"
              >
                {status === 'correct' ? (
                  <>
                    <span>Next Problem</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Check Solution</span>
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
                      className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                        selected
                          ? 'border-ink bg-surface shadow-sm ring-1 ring-ink'
                          : 'border-line bg-surface hover:border-line-strong'
                      }`}
                    >
                      <span
                        className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
                          selected ? 'border-ink bg-ink text-paper' : 'border-line-strong bg-canvas'
                        }`}
                      >
                        {selected && <Check className="h-2.5 w-2.5" />}
                      </span>
                      <span className={`text-[13px] ${selected ? 'font-semibold text-ink' : 'text-body'}`}>
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleCheckSolution}
                  disabled={!userChoiceAnswer}
                  className="flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-[13px] font-semibold text-paper transition-all hover:bg-neutral-800 disabled:opacity-50 shadow-sm"
                >
                  {status === 'correct' ? (
                    <>
                      <span>Next Problem</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Check Solution</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Solution Evaluation Status Banner */}
          {status === 'correct' && (
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-900">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-semibold">Correct! Outstanding Work.</div>
                <div className="mt-1 text-[12.5px] text-emerald-800">{problem.finalExplanation}</div>
              </div>
            </div>
          )}

          {status === 'incorrect' && (
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-rose-300 bg-rose-50 p-4 text-rose-900">
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-700" />
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-semibold">Not quite. Review the calculations!</div>
                <div className="mt-1 text-[12px] text-rose-800">
                  Double check the formula coefficients and intermediate rounding. Use the hint below or expand the derivation.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Progressive Hint & Derivation Drawers ────────────────────────── */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {problem.hints.length > 0 && (
              <button
                onClick={() => setHintIndex((h) => Math.min(h + 1, problem.hints.length))}
                className="flex items-center gap-1.5 rounded-xl border border-line bg-canvas px-3 py-1.5 text-[12px] font-medium text-subtle transition-colors hover:border-line-strong hover:text-ink"
              >
                <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                <span>
                  {hintIndex === 0
                    ? 'Need a Hint?'
                    : hintIndex < problem.hints.length
                    ? `Next Hint (${hintIndex}/${problem.hints.length})`
                    : 'All Hints Shown'}
                </span>
              </button>
            )}

            <button
              onClick={() => setShowDerivation((s) => !s)}
              className="flex items-center gap-1.5 rounded-xl border border-line bg-canvas px-3 py-1.5 text-[12px] font-medium text-subtle transition-colors hover:border-line-strong hover:text-ink"
            >
              <Calculator className="h-3.5 w-3.5 text-sky-600" />
              <span>{showDerivation ? 'Hide Full Derivation' : 'Show Full Derivation'}</span>
              {showDerivation ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
          </div>

          <div className="text-[11.5px] text-muted">
            Tolerance: {problem.tolerance ? `±${(problem.tolerance * 100).toFixed(0)}%` : 'Exact'}
          </div>
        </div>

        {/* Render Active Hints */}
        {hintIndex > 0 && (
          <div className="mt-4 space-y-2 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-[12.5px] text-amber-900">
            <div className="flex items-center gap-1.5 font-semibold text-amber-900">
              <Lightbulb className="h-4 w-4 text-amber-600" />
              <span>Hints:</span>
            </div>
            <ul className="list-inside list-disc space-y-1">
              {problem.hints.slice(0, hintIndex).map((hint, idx) => (
                <li key={idx} className="leading-snug">{hint}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Step-by-Step Derivation Card */}
        {showDerivation && (
          <div className="mt-4 rounded-xl border border-sky-200 bg-sky-50/70 p-5 text-sky-950">
            <div className="flex items-center justify-between border-b border-sky-200/80 pb-3 font-semibold">
              <span className="flex items-center gap-1.5 text-[13.5px] text-sky-900">
                <Brain className="h-4 w-4 text-sky-700" />
                Step-by-Step Mathematical Derivation
              </span>
              <span className="font-mono text-[12px] text-sky-800">
                Answer = {String(problem.expectedAnswer)} {problem.unit ?? ''}
              </span>
            </div>
            <ol className="mt-3 space-y-1.5 text-[13px] leading-relaxed text-sky-900">
              {problem.derivationSteps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
            <div className="mt-3 rounded-lg border border-sky-300/60 bg-white/70 p-3 text-[12px] font-medium text-sky-900">
              💡 {problem.finalExplanation}
            </div>
          </div>
        )}
      </div>

      {/* ── Problem Solver Session Tracker Bar ──────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-line bg-surface p-4">
          <div className="flex items-center justify-between text-[11px] text-muted">
            <span>Attempted</span>
            <Calculator className="h-3.5 w-3.5 text-subtle" />
          </div>
          <div className="mt-1 font-mono text-xl font-semibold text-ink">{stats.attempted}</div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-4">
          <div className="flex items-center justify-between text-[11px] text-muted">
            <span>Solved Correct</span>
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          </div>
          <div className="mt-1 font-mono text-xl font-semibold text-emerald-700">{stats.solved}</div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-4">
          <div className="flex items-center justify-between text-[11px] text-muted">
            <span>Accuracy</span>
            <Trophy className="h-3.5 w-3.5 text-amber-600" />
          </div>
          <div className="mt-1 font-mono text-xl font-semibold text-ink">{accuracy}%</div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-4">
          <div className="flex items-center justify-between text-[11px] text-muted">
            <span>Current Streak</span>
            <Flame className="h-3.5 w-3.5 text-amber-700" />
          </div>
          <div className="mt-1 font-mono text-xl font-semibold text-amber-700">{stats.streak}🔥</div>
        </div>
      </div>
    </div>
  );
};
