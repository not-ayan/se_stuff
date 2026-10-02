import React, { useState } from 'react';
import {
  AlertCircle,
  Bot,
  BrainCircuit,
  Check,
  CheckCircle2,
  Key,
  Layers,
  MessageSquare,
  Play,
  RotateCcw,
  Send,
  Settings,
  Sparkles,
  Trophy,
  Zap,
} from 'lucide-react';
import {
  AI_MODELS,
  askSeMentor,
  evaluateSubjectiveAnswer,
  generateAiQuiz,
  getStoredApiKey,
  getStoredModel,
  setStoredApiKey,
  setStoredModel,
} from '../lib/gemini';
import type { Question } from '../types';
import { renderMarkdown } from '../lib/markdown';

interface CompanionViewProps {
  onStartCustomQuiz: (questions: Question[]) => void;
}

type TabKey = 'chat' | 'quiz_gen' | 'grader';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const PRESET_PROMPTS = [
  'Explain the 7 levels of Cohesion with memory tricks & code examples',
  'Why does Iterative Waterfall feedback to SRS cost 100x-200x more?',
  'How do I balance a Level 2 DFD and prevent Black Holes / Miracles?',
  'Explain Hoare Triples {P} S {Q} and algebraic ADT specs simply',
  'Give me an ultra-condensed 5-minute revision sheet for Module 1',
];

const PRESET_EXAM_QUESTIONS = [
  'Explain the Böhm-Jacopini Theorem and why SESE control flow graphs eliminate the need for GOTO statements.',
  'Discuss the 4 quadrants of Boehm’s Spiral Model and explain why it is classified as a meta-model.',
  'Differentiate between Cohesion and Coupling. Why is Content Coupling considered the most hazardous?',
  'Explain the DFD Balancing Rule and identify three common structural defects in DFD construction.',
];

export const CompanionView: React.FC<CompanionViewProps> = ({ onStartCustomQuiz }) => {
  const [apiKey, setApiKey] = useState(getStoredApiKey());
  const [selectedModel, setSelectedModel] = useState(getStoredModel());
  const [activeTab, setActiveTab] = useState<TabKey>('chat');
  const [showSettings, setShowSettings] = useState(!apiKey);

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `👋 **Hello! I am your AI Software Engineering Exam Mentor.**

I have complete, grounded context across all course lecture slides, notes, and the 439 KB master reference (Modules 1 to 5 + DFDs).
* Ask me any doubt, derivation, or formula.
* Ask for mnemonics or exam tips.
* Switch tabs to **Generate Custom Quizzes** or **Grade Your Written Answers**!`,
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  // Quiz Gen State
  const [quizTopic, setQuizTopic] = useState('DFD Rules, Balancing and Illegal Flows');
  const [quizCount, setQuizCount] = useState(5);
  const [quizDifficulty, setQuizDifficulty] = useState<'easy' | 'exam' | 'hard'>('exam');
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [isQuizLoading, setIsQuizLoading] = useState(false);
  const [quizError, setQuizError] = useState<string | null>(null);

  // Grader State
  const [graderQuestion, setGraderQuestion] = useState(PRESET_EXAM_QUESTIONS[0]);
  const [graderAnswer, setGraderAnswer] = useState('');
  const [isGrading, setIsGrading] = useState(false);
  const [graderResult, setGraderResult] = useState<{
    score: number;
    totalMarks: number;
    verdict: string;
    strengths: string[];
    missingPoints: string[];
    modelAnswer: string;
  } | null>(null);
  const [graderError, setGraderError] = useState<string | null>(null);

  const saveSettings = (newKey: string, newModel: string) => {
    setApiKey(newKey);
    setStoredApiKey(newKey);
    setSelectedModel(newModel);
    setStoredModel(newModel);
    setShowSettings(false);
  };

  // Chat Submission
  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend ?? userInput;
    if (!text.trim()) return;

    if (!apiKey) {
      setShowSettings(true);
      setChatError('Please enter your Google AI Studio API Key to chat with the mentor.');
      return;
    }

    setChatError(null);
    const userMsg: ChatMessage = { id: `user-${Date.now()}`, role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setUserInput('');
    setIsChatLoading(true);

    try {
      const response = await askSeMentor({
        apiKey,
        model: selectedModel,
        userMessage: text,
      });

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setChatError(msg);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Quiz Generation Submission
  const handleGenerateQuiz = async () => {
    if (!apiKey) {
      setShowSettings(true);
      setQuizError('Please enter your Google AI Studio API Key in settings first.');
      return;
    }

    setQuizError(null);
    setIsQuizLoading(true);
    setGeneratedQuestions([]);

    try {
      const qs = await generateAiQuiz({
        apiKey,
        model: selectedModel,
        topic: quizTopic,
        count: quizCount,
        difficulty: quizDifficulty,
      });
      setGeneratedQuestions(qs);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setQuizError(msg);
    } finally {
      setIsQuizLoading(false);
    }
  };

  // Grader Submission
  const handleGradeAnswer = async () => {
    if (!apiKey) {
      setShowSettings(true);
      setGraderError('Please enter your Google AI Studio API Key in settings first.');
      return;
    }
    if (!graderAnswer.trim()) {
      setGraderError('Please write an answer to be evaluated.');
      return;
    }

    setGraderError(null);
    setIsGrading(true);
    setGraderResult(null);

    try {
      const res = await evaluateSubjectiveAnswer({
        apiKey,
        model: selectedModel,
        question: graderQuestion,
        userAnswer: graderAnswer,
      });
      setGraderResult(res);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setGraderError(msg);
    } finally {
      setIsGrading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1100px] space-y-6 px-4 py-8 sm:px-6">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-5 sm:p-6">
        <div className="flex items-center gap-3.5">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-md">
            <BrainCircuit className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-ink">AI Study Companion &amp; Mentor</h1>
            <p className="text-[12.5px] text-subtle">
              Powered by <span className="font-semibold text-ink">{AI_MODELS.find((m) => m.id === selectedModel)?.name}</span> · Grounded with full course notes &amp; master reference
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowSettings((v) => !v)}
          className="flex items-center gap-2 rounded-xl border border-line-strong bg-canvas px-3.5 py-2 text-[12.5px] font-semibold text-body transition-colors hover:border-faint hover:text-ink"
        >
          <Settings className="h-4 w-4 text-muted" />
          <span>{apiKey ? 'Model & API Key' : 'Configure API Key'}</span>
          {!apiKey && <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />}
        </button>
      </div>

      {/* Settings Modal / Accordion */}
      {showSettings && (
        <div className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-5">
          <div className="flex items-center justify-between gap-2 mb-3">
            <h3 className="text-[13.5px] font-semibold text-ink flex items-center gap-2">
              <Key className="h-4 w-4 text-sky-600" /> Google AI Studio Configuration
            </h3>
            <button
              onClick={() => setShowSettings(false)}
              className="text-[11.5px] text-subtle hover:text-ink"
            >
              Close
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-subtle">
                Google AI Studio API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="mt-1.5 w-full rounded-xl border border-line-strong bg-canvas px-3 py-2 text-[13px] text-ink font-mono focus:border-sky-600 focus:outline-none"
              />
              <p className="mt-1 text-[11px] text-muted">
                Free keys available at{' '}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-600 underline"
                >
                  aistudio.google.com
                </a>
                . Stored only in your local browser storage.
              </p>
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-subtle">
                Selected Model
              </label>
              <select
                value={AI_MODELS.some((m) => m.id === selectedModel) ? selectedModel : 'custom'}
                onChange={(e) => {
                  if (e.target.value !== 'custom') {
                    setSelectedModel(e.target.value);
                  }
                }}
                className="mt-1.5 w-full rounded-xl border border-line-strong bg-canvas px-3 py-2 text-[13px] text-ink focus:border-sky-600 focus:outline-none"
              >
                {AI_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} — {m.category}
                  </option>
                ))}
                <option value="custom">Custom Model Endpoint…</option>
              </select>

              {(!AI_MODELS.some((m) => m.id === selectedModel) || selectedModel === 'custom') && (
                <input
                  type="text"
                  value={selectedModel === 'custom' ? '' : selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  placeholder="Enter exact model ID, e.g. gemini-3.1-flash-lite"
                  className="mt-2 w-full rounded-xl border border-line-strong bg-canvas px-3 py-1.5 text-[12.5px] text-ink font-mono focus:border-sky-600 focus:outline-none"
                />
              )}

              <p className="mt-1 text-[11px] text-muted">
                {AI_MODELS.find((m) => m.id === selectedModel)?.description ?? 'Custom endpoint provided by user'}
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => saveSettings(apiKey, selectedModel)}
              className="rounded-xl bg-ink px-4 py-2 text-[12.5px] font-semibold text-paper hover:bg-ink/90"
            >
              Save Configuration
            </button>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b border-line">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-[13px] font-semibold transition-colors ${
            activeTab === 'chat'
              ? 'border-ink text-ink'
              : 'border-transparent text-subtle hover:text-ink'
          }`}
        >
          <MessageSquare className="h-4 w-4" /> Ask SE Mentor (Q&amp;A)
        </button>
        <button
          onClick={() => setActiveTab('quiz_gen')}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-[13px] font-semibold transition-colors ${
            activeTab === 'quiz_gen'
              ? 'border-ink text-ink'
              : 'border-transparent text-subtle hover:text-ink'
          }`}
        >
          <Zap className="h-4 w-4 text-amber-600" /> AI Quiz Generator
        </button>
        <button
          onClick={() => setActiveTab('grader')}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-[13px] font-semibold transition-colors ${
            activeTab === 'grader'
              ? 'border-ink text-ink'
              : 'border-transparent text-subtle hover:text-ink'
          }`}
        >
          <Trophy className="h-4 w-4 text-indigo-600" /> Examiner Answer Grader
        </button>
      </div>

      {/* ── TAB 1: Chat / Mentor ────────────────────────────────────────── */}
      {activeTab === 'chat' && (
        <div className="space-y-4">
          {/* Quick preset chips */}
          <div className="flex flex-wrap gap-2">
            {PRESET_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSendMessage(prompt)}
                disabled={isChatLoading}
                className="rounded-xl border border-line bg-surface px-3 py-1.5 text-[11.5px] font-medium text-body transition-colors hover:border-line-strong hover:text-ink disabled:opacity-50"
              >
                💡 {prompt}
              </button>
            ))}
          </div>

          {/* Messages container */}
          <div className="space-y-3 rounded-2xl border border-line bg-surface p-4 sm:p-5 min-h-[400px] max-h-[600px] overflow-y-auto">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${
                  m.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.role === 'assistant' && (
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-ink text-paper">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-ink text-paper'
                      : 'border border-line bg-canvas text-ink'
                  }`}
                >
                  {m.role === 'user' ? (
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  ) : (
                    <div
                      className="notes-prose text-ink"
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }}
                    />
                  )}
                </div>
              </div>
            ))}

            {isChatLoading && (
              <div className="flex gap-3 items-center text-[12px] text-muted p-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-ink border-t-transparent" />
                <span>SE Mentor is consulting the course notes…</span>
              </div>
            )}

            {chatError && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-50 p-3 text-[12.5px] text-rose-800 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{chatError}</span>
              </div>
            )}
          </div>

          {/* Chat input form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask any question, derivation, or doubt from Modules 1 to 5…"
              disabled={isChatLoading}
              className="flex-1 rounded-xl border border-line-strong bg-canvas px-4 py-3 text-[13.5px] text-ink placeholder:text-muted focus:border-sky-600 focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isChatLoading || !userInput.trim()}
              className="flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-[13px] font-semibold text-paper transition-colors hover:bg-ink/90 disabled:opacity-50"
            >
              <Send className="h-4 w-4" /> Ask
            </button>
          </form>
        </div>
      )}

      {/* ── TAB 2: AI Quiz Generator ────────────────────────────────────── */}
      {activeTab === 'quiz_gen' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-5 space-y-4">
            <h2 className="text-[14px] font-bold text-ink flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-600" /> Generate Dynamic AI Quiz
            </h2>
            <p className="text-[12.5px] text-subtle">
              Generate custom, unrepeated multiple-choice and true/false exam questions grounded strictly in the course notes.
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-subtle">
                  Topic Focus
                </label>
                <input
                  type="text"
                  value={quizTopic}
                  onChange={(e) => setQuizTopic(e.target.value)}
                  placeholder="e.g. Cohesion vs Coupling, DFD Balancing, Boehm Curve"
                  className="mt-1.5 w-full rounded-xl border border-line-strong bg-canvas px-3 py-2 text-[13px] text-ink focus:border-sky-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-subtle">
                  Number of Questions
                </label>
                <div className="mt-1.5 flex gap-2">
                  {[3, 5, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setQuizCount(num)}
                      className={`flex-1 rounded-xl border py-2 text-[12.5px] font-semibold ${
                        quizCount === num
                          ? 'border-ink bg-ink text-paper'
                          : 'border-line bg-canvas text-body hover:border-line-strong'
                      }`}
                    >
                      {num} Qs
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-subtle">
                  Difficulty Level
                </label>
                <div className="mt-1.5 flex gap-2">
                  {(['easy', 'exam', 'hard'] as const).map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setQuizDifficulty(diff)}
                      className={`flex-1 rounded-xl border py-2 text-[12.5px] font-semibold capitalize ${
                        quizDifficulty === diff
                          ? 'border-ink bg-ink text-paper'
                          : 'border-line bg-canvas text-body hover:border-line-strong'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerateQuiz}
              disabled={isQuizLoading || !quizTopic.trim()}
              className="flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-[13px] font-semibold text-paper hover:bg-ink/90 disabled:opacity-50"
            >
              {isQuizLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-paper border-t-transparent" />
                  Generating {quizCount} questions…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  Generate Quiz with {AI_MODELS.find((m) => m.id === selectedModel)?.name}
                </>
              )}
            </button>

            {quizError && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-50 p-3 text-[12.5px] text-rose-800 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{quizError}</span>
              </div>
            )}
          </div>

          {/* Generated Questions Preview & Play CTA */}
          {generatedQuestions.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-bold text-ink">
                  Generated {generatedQuestions.length} Questions for &quot;{quizTopic}&quot;
                </h3>
                <button
                  onClick={() => onStartCustomQuiz(generatedQuestions)}
                  className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-[13px] font-bold text-white shadow-md transition-colors hover:bg-emerald-700"
                >
                  <Play className="h-4 w-4 fill-white" /> Start This Interactive Quiz
                </button>
              </div>

              <div className="space-y-3">
                {generatedQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="rounded-2xl border border-line bg-surface p-4 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-line font-mono text-[10.5px] font-bold">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-[13.5px] text-ink">{q.question}</span>
                    </div>
                    {q.options && (
                      <div className="grid gap-1.5 sm:grid-cols-2 mt-2">
                        {q.options.map((opt) => (
                          <div
                            key={opt}
                            className={`rounded-lg border px-3 py-1.5 text-[12px] ${
                              String(opt).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()
                                ? 'border-emerald-500/40 bg-emerald-50 text-emerald-800 font-medium'
                                : 'border-line bg-canvas text-body'
                            }`}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="text-[11.5px] text-subtle border-t border-line pt-2 mt-2">
                      <span className="font-semibold text-emerald-700">Answer: {String(q.correctAnswer)}</span> · {q.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── TAB 3: Examiner Answer Grader ───────────────────────────────── */}
      {activeTab === 'grader' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-5 space-y-4">
            <h2 className="text-[14px] font-bold text-ink flex items-center gap-2">
              <Trophy className="h-4 w-4 text-indigo-600" /> Examiner Mock Answer Evaluation
            </h2>
            <p className="text-[12.5px] text-subtle">
              Practice answering descriptive university exam questions. The AI evaluates your answer like a strict chief examiner, giving a score out of 10, identifying missing keywords, and providing an ideal model answer.
            </p>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-subtle">
                Choose or Enter Exam Question
              </label>
              <select
                value={graderQuestion}
                onChange={(e) => setGraderQuestion(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-line-strong bg-canvas px-3 py-2 text-[13px] text-ink focus:border-sky-600 focus:outline-none"
              >
                {PRESET_EXAM_QUESTIONS.map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-subtle">
                Your Answer (Write in your own words)
              </label>
              <textarea
                rows={6}
                value={graderAnswer}
                onChange={(e) => setGraderAnswer(e.target.value)}
                placeholder="Type your explanation here. Include key technical principles, formulas, or steps..."
                className="mt-1.5 w-full rounded-xl border border-line-strong bg-canvas p-3 text-[13px] text-ink focus:border-sky-600 focus:outline-none font-sans"
              />
            </div>

            <button
              onClick={handleGradeAnswer}
              disabled={isGrading || !graderAnswer.trim()}
              className="flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-[13px] font-semibold text-paper hover:bg-ink/90 disabled:opacity-50"
            >
              {isGrading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-paper border-t-transparent" />
                  Chief Examiner is grading your answer…
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Grade My Answer (/10 Marks)
                </>
              )}
            </button>

            {graderError && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-50 p-3 text-[12.5px] text-rose-800 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{graderError}</span>
              </div>
            )}
          </div>

          {/* Grader Results */}
          {graderResult && (
            <div className="rounded-2xl border border-line bg-surface p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-subtle">
                    Evaluation Result
                  </span>
                  <div className="text-xl font-bold text-ink mt-0.5">
                    Verdict: <span className="text-indigo-600">{graderResult.verdict}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-3xl font-extrabold text-ink">
                    {graderResult.score}
                  </span>
                  <span className="text-muted text-lg"> / {graderResult.totalMarks}</span>
                </div>
              </div>

              {/* Strengths */}
              {graderResult.strengths?.length > 0 && (
                <div>
                  <h4 className="text-[12.5px] font-semibold text-emerald-700 flex items-center gap-1.5 mb-2">
                    <Check className="h-4 w-4" /> Strong Points Identified:
                  </h4>
                  <ul className="space-y-1 pl-5 list-disc text-[12.5px] text-body">
                    {graderResult.strengths.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Missing Points */}
              {graderResult.missingPoints?.length > 0 && (
                <div>
                  <h4 className="text-[12.5px] font-semibold text-rose-700 flex items-center gap-1.5 mb-2">
                    <AlertCircle className="h-4 w-4" /> Crucial Points Omitted:
                  </h4>
                  <ul className="space-y-1 pl-5 list-disc text-[12.5px] text-body">
                    {graderResult.missingPoints.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 10/10 Model Answer */}
              <div className="rounded-xl border border-line bg-canvas p-4 space-y-2">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-indigo-700">
                  Ideal 10/10 Examiner Model Answer
                </div>
                <div
                  className="notes-prose text-[12.5px] text-ink leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(graderResult.modelAnswer) }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
