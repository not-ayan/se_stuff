import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, HelpCircle, RotateCcw, Sparkles, Trophy, X } from 'lucide-react';
import type { Question } from '../types';
import { CHAPTERS } from '../content/chapters';
import {
  ALL_QUESTIONS,
  QUIZ_MODULE_LABELS,
  QUIZ_MODULE_ORDER,
  buildMixedQuiz,
  countQuestionsByModule,
  getQuestionsByModule,
  shuffle,
} from '../data/quiz';
import { useProgress } from '../lib/progress';
import { QuizQuestionCard } from '../components/quiz/QuizQuestionCard';
import { ProgressBar, SectionHeading } from '../components/ui';

import { generateAiQuiz, getStoredApiKey } from '../lib/gemini';

interface QuizViewProps {
  initialModuleId?: string;
  initialQuestions?: Question[];
  onSelectChapter: (chapterId: string) => void;
  onOpenAiCompanion?: (prompt?: string) => void;
}

type Phase = 'setup' | 'running' | 'results';
type SetupMode = 'bank' | 'ai';

interface AnswerRecord {
  question: Question;
  correct: boolean;
}

const COUNT_OPTIONS = [5, 10, 15, 20];

export const QuizView: React.FC<QuizViewProps> = ({
  initialModuleId,
  initialQuestions,
  onSelectChapter,
  onOpenAiCompanion,
}) => {
  const { recordQuizAnswer, quizSummary, state } = useProgress();
  const [phase, setPhase] = useState<Phase>(initialQuestions && initialQuestions.length > 0 ? 'running' : 'setup');
  const [setupMode, setSetupMode] = useState<SetupMode>('bank');
  const [moduleId, setModuleId] = useState<string>(initialModuleId ?? 'mixed');
  const [count, setCount] = useState(10);
  const [questions, setQuestions] = useState<Question[]>(initialQuestions ?? []);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  // Inline AI Generator State
  const [aiTopic, setAiTopic] = useState('DFD Rules, Balancing and Illegal Flows');
  const [aiCount, setAiCount] = useState(5);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    if (initialQuestions && initialQuestions.length > 0) {
      setQuestions(initialQuestions);
      setAnswers([]);
      setIndex(0);
      setPhase('running');
    } else if (initialModuleId) {
      setModuleId(initialModuleId);
      setPhase('setup');
    }
  }, [initialModuleId, initialQuestions]);

  const availableCount = moduleId === 'mixed' ? ALL_QUESTIONS.length : countQuestionsByModule(moduleId);
  const effectiveCount = Math.min(count, availableCount);

  const start = (list?: Question[]) => {
    const built =
      list ??
      (moduleId === 'mixed'
        ? buildMixedQuiz([...QUIZ_MODULE_ORDER], effectiveCount)
        : shuffle(getQuestionsByModule(moduleId)).slice(0, effectiveCount));
    setQuestions(built);
    setAnswers([]);
    setIndex(0);
    setPhase('running');
    window.scrollTo({ top: 0 });
  };

  const handleAnswered = (correct: boolean) => {
    const question = questions[index];
    recordQuizAnswer(question.id, correct);
    setAnswers((prev) => [...prev, { question, correct }]);
  };

  const handleNext = () => {
    if (index + 1 >= questions.length) setPhase('results');
    else setIndex((prev) => prev + 1);
  };

  const correctCount = answers.filter((a) => a.correct).length;
  const accuracy = answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0;
  const missed = useMemo(() => answers.filter((a) => !a.correct).map((a) => a.question), [answers]);

  const chapterForModule = (id: string) => CHAPTERS.find((chapter) => chapter.quizModuleId === id);

  /* ── Setup ───────────────────────────────────────────────────────────── */
  if (phase === 'setup') {
    return (
      <div className="mx-auto max-w-[1000px] space-y-6 px-4 py-8 sm:px-6">
        <SectionHeading
          eyebrow="Interactive Evaluation"
          title="Study & Quiz Mode"
          description="Test your understanding with either our curated question bank or dynamically generate infinite exam questions using our auto-switching AI models."
        />

        {/* Mode Selector */}
        <div className="flex rounded-2xl border border-line bg-surface p-1.5 gap-1.5">
          <button
            type="button"
            onClick={() => setSetupMode('bank')}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-semibold transition-colors ${
              setupMode === 'bank'
                ? 'bg-ink text-paper shadow-sm'
                : 'text-subtle hover:text-ink'
            }`}
          >
            <HelpCircle className="h-4 w-4" /> Curated Question Bank ({ALL_QUESTIONS.length} Qs)
          </button>
          <button
            type="button"
            onClick={() => setSetupMode('ai')}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-semibold transition-colors ${
              setupMode === 'ai'
                ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-paper shadow-sm'
                : 'text-subtle hover:text-ink'
            }`}
          >
            <Sparkles className="h-4 w-4 text-amber-300" /> ✨ AI Infinite Generator (Auto-Switching)
          </button>
        </div>

        {setupMode === 'ai' ? (
          <div className="rounded-2xl border border-line bg-surface p-5 space-y-4">
            <div className="text-[13px] font-semibold text-ink flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" /> Dynamic Exam Question Generator
            </div>
            <p className="text-[12.5px] text-subtle">
              Generates custom exam questions on demand using syllabus notes. Auto-rotates between <strong>Gemini 3.1 Flash Lite</strong>, <strong>Gemma 4 26B</strong>, and <strong>Gemma 4 31B</strong> based on rate limits.
            </p>

            <div>
              <label className="text-[11px] text-subtle">Topic Focus</label>
              <input
                type="text"
                value={aiTopic}
                onChange={(e) => setAiTopic(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-line-strong bg-canvas px-3 py-2 text-[13px] text-ink focus:border-sky-600 focus:outline-none"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[
                  'DFD Balancing & Illegal Flows',
                  '7 Cohesion Levels',
                  '6 Coupling Levels',
                  'Spiral Model 4 Quadrants',
                  'Boehm Cost Escalation Curve',
                  'Hoare Triples & Formal Specs',
                ].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setAiTopic(t)}
                    className="rounded-lg border border-line bg-canvas px-2.5 py-1 text-[11px] text-body hover:border-line-strong"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] text-subtle">Question Count</span>
              <div className="mt-1.5 flex gap-2">
                {[3, 5, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setAiCount(num)}
                    className={`rounded-xl border px-4 py-2 text-[13px] font-semibold ${
                      aiCount === num ? 'border-ink bg-ink text-paper' : 'border-line text-body hover:border-line-strong'
                    }`}
                  >
                    {num} questions
                  </button>
                ))}
              </div>
            </div>

            {aiError && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-50 p-3 text-[12px] text-rose-800">
                {aiError}
              </div>
            )}

            <button
              onClick={async () => {
                const key = getStoredApiKey();
                if (!key) {
                  setAiError('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file.');
                  return;
                }
                setIsAiGenerating(true);
                setAiError(null);
                try {
                  const { questions: qs } = await generateAiQuiz({
                    apiKey: key,
                    topic: aiTopic,
                    count: aiCount,
                  });
                  start(qs);
                } catch (err: unknown) {
                  const msg = err instanceof Error ? err.message : String(err);
                  setAiError(msg);
                } finally {
                  setIsAiGenerating(false);
                }
              }}
              disabled={isAiGenerating}
              className="flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-[13px] font-semibold text-paper hover:bg-ink/90 disabled:opacity-50"
            >
              {isAiGenerating ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-paper border-t-transparent" />
                  Generating &amp; loading quiz…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-amber-300" /> Generate &amp; Start Quiz ({aiCount} Qs)
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="rounded-2xl border border-line bg-surface p-5">
            <label htmlFor="quiz-module" className="text-[11px] text-subtle">
              Topic
            </label>
            <select
              id="quiz-module"
              value={moduleId}
              onChange={(event) => setModuleId(event.target.value)}
              className="mt-2 w-full rounded-xl border border-line-strong bg-canvas px-3 py-2.5 text-[13px] text-ink focus:border-sky-600 focus:outline-none"
            >
              <option value="mixed">Mixed — {ALL_QUESTIONS.length} questions across every module</option>
              {QUIZ_MODULE_ORDER.map((id) => (
                <option key={id} value={id}>
                  {QUIZ_MODULE_LABELS[id]} — {countQuestionsByModule(id)} questions
                </option>
              ))}
            </select>

            <div className="mt-5">
              <span className="text-[11px] text-subtle">Length</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {COUNT_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => setCount(option)}
                    disabled={option > availableCount}
                    className={`rounded-xl border px-4 py-2 text-[13px] font-semibold transition-colors disabled:opacity-40 ${
                      count === option ? 'border-ink bg-ink text-paper' : 'border-line text-body hover:border-line-strong'
                    }`}
                  >
                    {option} questions
                  </button>
                ))}
                {availableCount > 0 && availableCount < 5 && (
                  <span className="self-center text-[12px] text-muted">Only {availableCount} available here — the full set will be used.</span>
                )}
              </div>
            </div>

            <button
              onClick={() => start()}
              disabled={availableCount === 0}
              className="mt-6 flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-[13px] font-semibold text-paper transition-colors hover:bg-ink/90 disabled:opacity-40"
            >
              <HelpCircle className="h-4 w-4" /> Start quiz ({effectiveCount} questions)
            </button>

            {quizSummary.answered > 0 && (
              <p className="mt-3 font-mono text-[11px] text-muted">
                Lifetime accuracy: {quizSummary.accuracy}% across {quizSummary.answered} answered questions.
              </p>
            )}
          </div>
        )}

        <div className="rounded-2xl border border-line bg-surface p-5">
          <h3 className="text-[13px] font-semibold text-ink">Weak spots</h3>
          {missedAll(state).length === 0 ? (
            <p className="mt-1 text-[12.5px] text-subtle">No missed questions recorded yet — take a quiz to start building your revision list.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {missedAll(state).slice(0, 6).map((id) => {
                const question = ALL_QUESTIONS.find((q) => q.id === id);
                if (!question) return null;
                return (
                  <li key={id} className="flex items-center justify-between gap-3 rounded-xl border border-line bg-canvas px-3 py-2">
                    <span className="line-clamp-1 text-[12.5px] text-body">{question.question}</span>
                    <span className="shrink-0 text-[10.5px] text-muted">
                      {QUIZ_MODULE_LABELS[question.moduleId]?.split('·')[0]}
                    </span>
                  </li>
                );
              })}
              <li>
                <button
                  onClick={() => {
                    const list = missedAll(state)
                      .map((id) => ALL_QUESTIONS.find((q) => q.id === id))
                      .filter((q): q is Question => Boolean(q));
                    if (list.length) start(shuffle(list).slice(0, Math.min(20, list.length)));
                  }}
                  className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-50 px-3 py-2 text-[12.5px] font-semibold text-rose-800"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Drill my {missedAll(state).length} missed questions
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }

  /* ── Running ─────────────────────────────────────────────────────────── */
  if (phase === 'running') {
    const question = questions[index];
    if (!question) return null;
    return (
      <div className="mx-auto max-w-[820px] space-y-5 px-4 py-8 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => setPhase('setup')}
            className="flex items-center gap-1.5 text-[12.5px] text-subtle transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Exit quiz
          </button>
          <span className="font-mono text-[11px] text-muted">
            Score {correctCount}/{answers.length}
          </span>
        </div>
        <ProgressBar value={((index + (answers.length > index ? 1 : 0)) / questions.length) * 100} />

        <QuizQuestionCard
          key={question.id}
          question={question}
          index={index}
          total={questions.length}
          onAnswered={handleAnswered}
          onNext={handleNext}
          isLast={index === questions.length - 1}
          onAskAiToExplain={(q) =>
            onOpenAiCompanion?.(
              `Explain this question and the underlying theory in depth: "${q.question}". The correct answer is: ${String(q.correctAnswer)}.`
            )
          }
        />
      </div>
    );
  }

  /* ── Results ─────────────────────────────────────────────────────────── */
  const chapterLink = chapterForModule(moduleId);
  return (
    <div className="mx-auto max-w-[820px] space-y-6 px-4 py-8 sm:px-6">
      <div className="rounded-3xl border border-line bg-surface p-7 text-center">
        <Trophy className={`mx-auto h-8 w-8 ${accuracy >= 70 ? 'text-amber-700' : 'text-subtle'}`} />
        <div className="mt-3 font-mono text-4xl font-bold text-ink">{accuracy}%</div>
        <p className="mt-1 text-[13px] text-subtle">
          {correctCount} of {answers.length} correct
          {accuracy >= 90 ? ' — exam ready.' : accuracy >= 70 ? ' — solid, tighten the misses.' : ' — worth another pass at the notes.'}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <button onClick={() => setPhase('setup')} className="rounded-xl bg-ink px-4 py-2 text-[13px] font-semibold text-paper hover:bg-ink/90">
            New quiz
          </button>
          {missed.length > 0 && (
            <button
              onClick={() => start(shuffle(missed))}
              className="flex items-center gap-2 rounded-xl border border-line-strong px-4 py-2 text-[13px] font-semibold text-strong hover:border-faint"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Retry the {missed.length} missed
            </button>
          )}
          {chapterLink && (
            <button
              onClick={() => onSelectChapter(chapterLink.id)}
              className="rounded-xl border border-line-strong px-4 py-2 text-[13px] font-semibold text-strong hover:border-faint"
            >
              Re-read {chapterLink.title}
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <SectionHeading eyebrow="Review" title="Answer breakdown" />
        {answers.map(({ question, correct }, i) => (
          <details key={question.id} className="rounded-2xl border border-line bg-surface p-4">
            <summary className="flex cursor-pointer items-start gap-3 text-[13px] text-strong">
              <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${correct ? 'bg-emerald-500/20 text-emerald-700' : 'bg-rose-500/20 text-rose-700'}`}>
                {correct ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
              </span>
              <span className="flex-1">
                <span className="font-mono text-[10px] text-muted">Q{i + 1} · </span>
                {question.question}
              </span>
            </summary>
            <div className="mt-3 border-t border-line pt-3 text-[12.5px] leading-relaxed text-body">
              <div className="font-mono text-[11px] text-emerald-700">Correct answer: {String(question.correctAnswer)}</div>
              <p className="mt-1.5 text-subtle">{question.explanation}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

/** Returns the ids of questions the learner has previously answered incorrectly. */
const missedAll = (state: ReturnType<typeof useProgress>['state']): string[] =>
  Object.entries(state.quiz)
    .filter(([, attempt]) => !attempt.correct)
    .map(([id]) => id);
