import React, { useMemo, useState } from 'react';
import { ArrowRight, BrainCircuit, Check, Lightbulb, X } from 'lucide-react';
import type { Question } from '../../types';

interface QuizQuestionCardProps {
  question: Question;
  index: number;
  total: number;
  onAnswered: (correct: boolean) => void;
  onNext: () => void;
  isLast: boolean;
  onAskAiToExplain?: (question: Question) => void;
}

const TYPE_LABEL: Record<Question['type'], string> = {
  mcq: 'Multiple choice',
  true_false: 'True / False',
  numerical: 'Numerical',
  short_answer: 'Short answer',
};

const normalize = (value: unknown): string => String(value).trim().toLowerCase().replace(/\s+/g, ' ');

export const QuizQuestionCard: React.FC<QuizQuestionCardProps> = ({
  question,
  index,
  total,
  onAnswered,
  onNext,
  isLast,
  onAskAiToExplain,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState<string | boolean | null>(null);
  const [textValue, setTextValue] = useState('');

  const isCorrect = useMemo(() => {
    if (!submitted) return false;
    if (question.type === 'true_false') return selected === question.correctAnswer;
    return normalize(selected ?? textValue) === normalize(question.correctAnswer);
  }, [question, selected, submitted, textValue]);

  const submit = (value: string | boolean) => {
    setSelected(value);
    setSubmitted(true);
    const correct =
      question.type === 'true_false'
        ? value === question.correctAnswer
        : normalize(value) === normalize(question.correctAnswer);
    onAnswered(correct);
  };

  const optionState = (option: string): string => {
    if (!submitted) return 'border-line bg-canvas text-body hover:border-line-strong';
    if (normalize(option) === normalize(question.correctAnswer)) return 'border-emerald-500/60 bg-emerald-50 text-emerald-800';
    if (selected === option) return 'border-rose-500/60 bg-rose-50 text-rose-800';
    return 'border-line bg-canvas text-muted';
  };

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-line font-mono text-[11px] font-bold text-body">
            {index + 1}
          </span>
          <span className="rounded-full bg-line px-2.5 py-0.5 text-[10.5px] text-subtle">
            {TYPE_LABEL[question.type]}
          </span>
        </div>
        <span className="font-mono text-[11px] text-muted">
          {index + 1} / {total}
        </span>
      </div>

      <p className="mt-4 text-[15px] font-medium leading-relaxed text-ink">{question.question}</p>

      {/* MCQ */}
      {question.type === 'mcq' && question.options && (
        <div className="mt-4 space-y-2">
          {question.options.map((option) => (
            <button
              key={option}
              disabled={submitted}
              onClick={() => submit(option)}
              className={`flex w-full items-center justify-between gap-3 rounded-xl border p-3 text-left text-[13px] transition-colors ${optionState(option)}`}
            >
              <span>{option}</span>
              {submitted && normalize(option) === normalize(question.correctAnswer) && <Check className="h-4 w-4 shrink-0 text-emerald-700" />}
              {submitted && selected === option && normalize(option) !== normalize(question.correctAnswer) && <X className="h-4 w-4 shrink-0 text-rose-700" />}
            </button>
          ))}
        </div>
      )}

      {/* True / False */}
      {question.type === 'true_false' && (
        <div className="mt-4 flex gap-3">
          {[true, false].map((value) => {
            const correctOption = value === question.correctAnswer;
            const chosen = selected === value;
            let tone = 'border-line bg-canvas text-body hover:border-line-strong';
            if (submitted && correctOption) tone = 'border-emerald-500/60 bg-emerald-50 text-emerald-800';
            else if (submitted && chosen) tone = 'border-rose-500/60 bg-rose-50 text-rose-800';
            else if (submitted) tone = 'border-line bg-canvas text-muted';
            return (
              <button
                key={String(value)}
                disabled={submitted}
                onClick={() => submit(value)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-[13px] font-semibold transition-colors ${tone}`}
              >
                {value ? 'True' : 'False'}
                {submitted && correctOption && <Check className="h-3.5 w-3.5" />}
              </button>
            );
          })}
        </div>
      )}

      {/* Text answer */}
      {(question.type === 'numerical' || question.type === 'short_answer') && (
        <div className="mt-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={textValue}
              disabled={submitted}
              placeholder="Type your answer…"
              onChange={(event) => setTextValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && textValue.trim() && !submitted) submit(textValue);
              }}
              className="flex-1 rounded-xl border border-line-strong bg-canvas px-3 py-2 font-mono text-[13px] text-ink placeholder:text-faint focus:border-sky-600 focus:outline-none"
            />
            {!submitted && (
              <button
                onClick={() => textValue.trim() && submit(textValue)}
                className="rounded-xl bg-ink px-4 py-2 text-[13px] font-semibold text-paper transition-colors hover:bg-ink/90"
              >
                Check
              </button>
            )}
          </div>
          {submitted && (
            <div className="mt-2 flex flex-wrap items-center gap-3 text-[12.5px] font-mono">
              <span className={isCorrect ? 'text-emerald-700' : 'text-rose-700'}>Your answer: {String(selected ?? textValue)}</span>
              {!isCorrect && <span className="text-emerald-700">Correct: {String(question.correctAnswer)}</span>}
            </div>
          )}
        </div>
      )}

      {/* Feedback */}
      {submitted && (
        <div className="mt-4 space-y-3 border-t border-line pt-4">
          <div className={`flex items-center gap-2 text-[13px] font-semibold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
            {isCorrect ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            {isCorrect ? 'Correct' : 'Not quite'}
          </div>
          <div className="rounded-xl border border-line bg-canvas p-3">
            <div className="mb-1 text-[10.5px] text-amber-700">Explanation</div>
            <p className="text-[13px] leading-relaxed text-body">{question.explanation}</p>
          </div>
          {question.hint && (
            <div className="flex items-start gap-2 text-[12px] text-subtle">
              <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-700" />
              <span>{question.hint}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {onAskAiToExplain && (
              <button
                type="button"
                onClick={() => onAskAiToExplain(question)}
                className="flex items-center gap-1.5 rounded-xl border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-[12px] font-semibold text-sky-800 transition-colors hover:bg-sky-500/20"
              >
                <BrainCircuit className="h-3.5 w-3.5 text-sky-600" /> Ask AI Mentor to explain deeper
              </button>
            )}

            <button
              onClick={onNext}
              className="flex items-center gap-2 rounded-xl bg-ink px-4 py-2 text-[13px] font-semibold text-paper transition-colors hover:bg-ink/90 ml-auto"
            >
              {isLast ? 'See results' : 'Next question'} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
