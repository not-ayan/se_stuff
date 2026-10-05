import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  Bot,
  BrainCircuit,
  CheckCircle2,
  MessageSquare,
  Play,
  RotateCcw,
  Send,
  Settings,
  Sparkles,
  Trophy,
  X,
  Zap,
} from 'lucide-react';
import {
  AUTO_MODEL_POOL,
  askSeMentor,
  evaluateSubjectiveAnswer,
  generateAiQuiz,
  getStoredApiKey,
  type ExecutionMeta,
} from '../lib/gemini';
import type { Question } from '../types';
import { renderMarkdown } from '../lib/markdown';

interface AiCompanionDrawerProps {
  open: boolean;
  onClose: () => void;
  currentChapterTitle?: string;
  currentModuleId?: string;
  onLaunchCustomQuiz: (questions: Question[]) => void;
  initialPrompt?: string;
}

type DrawerTab = 'chat' | 'quiz' | 'grader';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  meta?: ExecutionMeta;
}

const PRESET_EXAM_PROMPTS = [
  'Böhm-Jacopini Structured Programming Theorem proof & SESE graph rules',
  'Boehm Cost Escalation Curve (1x to 200x) & Phase Containment',
  'The 7 levels of Cohesion from Coincidental to Functional with code examples',
  'All 6 levels of Coupling and why Content Coupling is the worst',
  'Verification vs Validation and Unit Testing Scaffolding (Driver vs Stub)',
  'Hoare Triples {P} S {Q} axiomatic logic and algebraic ADT equations',
];

export const AiCompanionDrawer: React.FC<AiCompanionDrawerProps> = ({
  open,
  onClose,
  currentChapterTitle,
  currentModuleId,
  onLaunchCustomQuiz,
  initialPrompt,
}) => {
  const apiKey = getStoredApiKey();
  const [activeTab, setActiveTab] = useState<DrawerTab>('chat');
  const [lastMeta, setLastMeta] = useState<ExecutionMeta | null>(null);

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `👋 **Hi! I am your AI Study Mentor.**\n\nI have complete in-memory context of all lecture slides and the 439 KB master reference.\n\n* **Auto-Model Switching is Active:** Automatically rotates between **Gemini 3.1 Flash Lite**, **Gemma 4 26B**, and **Gemma 4 31B** based on quota limits and rate limits.\n* Ask me to explain any formula, code example, or exam pitfall!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Quiz Gen State
  const [quizTopic, setQuizTopic] = useState(currentChapterTitle || 'Cohesion and Coupling');
  const [quizCount, setQuizCount] = useState(5);
  const [isQuizGenerating, setIsQuizGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);

  // Grader State
  const [graderQuestion, setGraderQuestion] = useState(
    'Explain the Böhm-Jacopini theorem and why GOTO statements are eliminated in structured programming.'
  );
  const [graderAnswer, setGraderAnswer] = useState('');
  const [isGrading, setIsGrading] = useState(false);
  const [graderResult, setGraderResult] = useState<{
    score: number;
    totalMarks: number;
    verdict: string;
    strengths: string[];
    missingPoints: string[];
    modelAnswer: string;
    meta?: ExecutionMeta;
  } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt && open) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt, open]);

  useEffect(() => {
    if (currentChapterTitle) {
      setQuizTopic(currentChapterTitle);
    }
  }, [currentChapterTitle]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend ?? input;
    if (!text.trim()) return;

    if (!apiKey) {
      setError('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file.');
      return;
    }

    setError(null);
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const { response, meta } = await askSeMentor({
        apiKey,
        userMessage: text,
        moduleId: currentModuleId,
      });

      setLastMeta(meta);
      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: response,
        meta,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateQuiz = async () => {
    if (!apiKey) {
      setError('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file.');
      return;
    }
    setError(null);
    setIsQuizGenerating(true);
    setGeneratedQuestions([]);

    try {
      const { questions, meta } = await generateAiQuiz({
        apiKey,
        topic: quizTopic,
        count: quizCount,
      });
      setLastMeta(meta);
      setGeneratedQuestions(questions);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setIsQuizGenerating(false);
    }
  };

  const handleGrade = async () => {
    if (!apiKey) {
      setError('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file.');
      return;
    }
    if (!graderAnswer.trim()) {
      setError('Please enter your written answer to be graded.');
      return;
    }

    setError(null);
    setIsGrading(true);
    setGraderResult(null);

    try {
      const res = await evaluateSubjectiveAnswer({
        apiKey,
        question: graderQuestion,
        userAnswer: graderAnswer,
      });
      setLastMeta(res.meta);
      setGraderResult(res);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setIsGrading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over Container */}
      <div className="relative z-10 flex h-full w-full max-w-[540px] flex-col border-l border-line bg-panel shadow-2xl">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5 bg-surface/90">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-ink text-paper">
              <BrainCircuit className="h-4 w-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[13.5px] font-bold text-ink">AI Study Companion</span>
                {/* Auto-switch pill */}
                <span className="inline-flex items-center gap-1 rounded-full border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-[10.5px] font-medium text-sky-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
                  {lastMeta ? lastMeta.modelName : 'Auto-Switching Active'}
                </span>
              </div>
              <span className="block text-[11px] text-muted">
                {currentChapterTitle ? `Grounded in: ${currentChapterTitle}` : 'Grounded in all course notes'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onClose}
              aria-label="Close companion"
              className="rounded-lg p-2 text-subtle hover:bg-canvas hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Sub-Tabs: Mentor Q&A, AI Quiz, Mock Examiner */}
        <div className="flex border-b border-line bg-surface/50 text-[12.5px] font-medium">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 border-b-2 transition-colors ${
              activeTab === 'chat' ? 'border-ink font-semibold text-ink' : 'border-transparent text-subtle hover:text-ink'
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5" /> Ask Mentor
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 border-b-2 transition-colors ${
              activeTab === 'quiz' ? 'border-ink font-semibold text-ink' : 'border-transparent text-subtle hover:text-ink'
            }`}
          >
            <Zap className="h-3.5 w-3.5 text-amber-600" /> AI Quiz
          </button>
          <button
            onClick={() => setActiveTab('grader')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 border-b-2 transition-colors ${
              activeTab === 'grader' ? 'border-ink font-semibold text-ink' : 'border-transparent text-subtle hover:text-ink'
            }`}
          >
            <Trophy className="h-3.5 w-3.5 text-indigo-600" /> Grade Answer
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {error && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-50 p-3 text-[12px] text-rose-800 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* ── TAB 1: Chat ────────────────────────────────────────── */}
          {activeTab === 'chat' && (
            <div className="space-y-3">
              {/* Preset suggestion chips */}
              <div className="flex flex-wrap gap-1.5">
                {PRESET_EXAM_PROMPTS.slice(0, 3).map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    disabled={isLoading}
                    className="rounded-lg border border-line bg-surface px-2.5 py-1 text-[11px] text-body transition-colors hover:border-line-strong hover:text-ink disabled:opacity-50 text-left"
                  >
                    💡 {prompt}
                  </button>
                ))}
              </div>

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'assistant' && (
                    <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-ink text-paper mt-0.5">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[12.5px] leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-ink text-paper'
                        : 'border border-line bg-surface text-ink'
                    }`}
                  >
                    {m.role === 'user' ? (
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    ) : (
                      <div className="notes-prose text-ink">
                        {renderMarkdown(m.content).content}
                      </div>
                    )}
                    {m.meta?.autoSwitched && (
                      <div className="mt-1 text-[10px] text-sky-700 font-mono">
                        ⚡ Rate limit handled: auto-switched to {m.meta.modelName}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-[11.5px] text-muted p-2">
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ink border-t-transparent" />
                  <span>SE Mentor is analyzing notes…</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* ── TAB 2: Dynamic Quiz Generator ──────────────────────── */}
          {activeTab === 'quiz' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-line bg-surface p-4 space-y-3">
                <div className="text-[13px] font-bold text-ink">Generate Infinite Exam Questions</div>
                <p className="text-[12px] text-subtle">
                  Automatically pulls syllabus theory to create fresh MCQs and True/False questions.
                </p>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-subtle">
                    Topic
                  </label>
                  <input
                    type="text"
                    value={quizTopic}
                    onChange={(e) => setQuizTopic(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-line-strong bg-canvas px-3 py-2 text-[12.5px] text-ink focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-subtle">Count:</span>
                  {[3, 5, 10].map((num) => (
                    <button
                      key={num}
                      onClick={() => setQuizCount(num)}
                      className={`rounded-lg border px-3 py-1 text-[11.5px] font-semibold ${
                        quizCount === num ? 'border-ink bg-ink text-paper' : 'border-line bg-canvas text-body'
                      }`}
                    >
                      {num} Qs
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleGenerateQuiz}
                  disabled={isQuizGenerating}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-[12.5px] font-semibold text-paper hover:bg-ink/90 disabled:opacity-50"
                >
                  {isQuizGenerating ? (
                    <>
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-paper border-t-transparent" />
                      Generating with auto-rotation…
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5 text-amber-300" /> Generate {quizCount} Questions
                    </>
                  )}
                </button>
              </div>

              {generatedQuestions.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[12.5px] font-semibold text-ink">
                      {generatedQuestions.length} Questions Ready
                    </span>
                    <button
                      onClick={() => {
                        onLaunchCustomQuiz(generatedQuestions);
                        onClose();
                      }}
                      className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-[12px] font-bold text-white shadow-sm hover:bg-emerald-700"
                    >
                      <Play className="h-3.5 w-3.5 fill-white" /> Take Quiz Now
                    </button>
                  </div>

                  {generatedQuestions.map((q, i) => (
                    <div key={q.id} className="rounded-xl border border-line bg-surface p-3 text-[12px] space-y-1.5">
                      <div className="font-semibold text-ink">Q{i + 1}: {q.question}</div>
                      <div className="text-emerald-700 font-medium">Answer: {String(q.correctAnswer)}</div>
                      <div className="text-muted text-[11px]">{q.explanation}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── TAB 3: Subjective Answer Grader ────────────────────── */}
          {activeTab === 'grader' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-line bg-surface p-4 space-y-3">
                <div className="text-[13px] font-bold text-ink">Examiner Mock Answer Evaluation</div>
                <p className="text-[11.5px] text-subtle">
                  Write out answers to descriptive questions. The AI evaluates your answer out of 10 marks and detects missing technical keywords.
                </p>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-subtle">
                    Exam Question
                  </label>
                  <textarea
                    rows={2}
                    value={graderQuestion}
                    onChange={(e) => setGraderQuestion(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-line-strong bg-canvas p-2 text-[12px] text-ink focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-subtle">
                    Your Written Answer
                  </label>
                  <textarea
                    rows={5}
                    value={graderAnswer}
                    onChange={(e) => setGraderAnswer(e.target.value)}
                    placeholder="Type your explanation in your own words..."
                    className="mt-1 w-full rounded-xl border border-line-strong bg-canvas p-2 text-[12px] text-ink focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleGrade}
                  disabled={isGrading || !graderAnswer.trim()}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-[12.5px] font-semibold text-paper hover:bg-ink/90 disabled:opacity-50"
                >
                  {isGrading ? (
                    <>
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-paper border-t-transparent" />
                      Chief Examiner grading…
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Grade My Answer (/10 Marks)
                    </>
                  )}
                </button>
              </div>

              {graderResult && (
                <div className="rounded-2xl border border-line bg-surface p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-line pb-2">
                    <span className="font-bold text-[13px] text-ink">{graderResult.verdict}</span>
                    <span className="font-mono text-xl font-bold text-ink">
                      {graderResult.score} / {graderResult.totalMarks}
                    </span>
                  </div>

                  {graderResult.missingPoints?.length > 0 && (
                    <div className="text-[11.5px] text-rose-800 space-y-1">
                      <div className="font-semibold">Missing Key Terms/Points:</div>
                      <ul className="list-disc pl-4 space-y-0.5">
                        {graderResult.missingPoints.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="rounded-xl border border-line bg-canvas p-3 text-[11.5px] space-y-1">
                    <div className="font-semibold text-indigo-700">10/10 Model Answer:</div>
                    <div className="notes-prose text-ink">
                      {renderMarkdown(graderResult.modelAnswer).content}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Drawer Chat Input Bar (Only on chat tab) */}
        {activeTab === 'chat' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="border-t border-line p-3 bg-surface flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask SE Mentor any doubt or concept…"
              disabled={isLoading}
              className="flex-1 rounded-xl border border-line-strong bg-canvas px-3 py-2 text-[12.5px] text-ink placeholder:text-muted focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-xl bg-ink p-2 text-paper hover:bg-ink/90 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
