import React, { useState } from 'react';
import { EXAM_QUESTIONS } from '../data/questionsData';
import { Question } from '../types';
import { HelpCircle, Check, X, Eye, EyeOff, Award, RotateCcw, Filter } from 'lucide-react';

export const QuizBank: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({});

  const filteredQuestions = EXAM_QUESTIONS.filter(q => {
    if (selectedModule !== 'all' && q.moduleId !== selectedModule) return false;
    if (selectedType !== 'all' && q.type !== selectedType) return false;
    return true;
  });

  const handleSelectAnswer = (qId: string, val: any) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));
    setRevealedExplanations(prev => ({ ...prev, [qId]: true }));
  };

  const toggleExplanation = (qId: string) => {
    setRevealedExplanations(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const resetQuiz = () => {
    setAnswers({});
    setRevealedExplanations({});
  };

  // Score calculation
  const totalAttempted = Object.keys(answers).length;
  const correctCount = Object.entries(answers).filter(([qId, userAns]) => {
    const q = EXAM_QUESTIONS.find(item => item.id === qId);
    if (!q) return false;
    if (typeof q.correctAnswer === 'boolean') {
      return userAns === q.correctAnswer;
    }
    return String(userAns).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase();
  }).length;

  return (
    <div className="space-y-6 text-slate-100">
      {/* Top Header & Stats */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                <HelpCircle className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold tracking-tight">University Exam Test Bank & Mock Quiz</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Extracted directly from IIT Kharagpur / Dr. Rajib Mall lecture exam questions with answers and justifications.
            </p>
          </div>

          {/* Score pill */}
          <div className="flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 font-mono">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Score</div>
              <div className="text-sm font-bold text-white">
                <span className="text-emerald-400">{correctCount}</span> / {totalAttempted} ({totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0}%)
              </div>
            </div>
            {totalAttempted > 0 && (
              <button
                onClick={resetQuiz}
                title="Reset answers"
                className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors ml-2"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5" /> Filter by:
          </div>

          {/* Module Filter */}
          <select
            value={selectedModule}
            onChange={e => setSelectedModule(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-xs text-slate-200 px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-purple-500 font-medium"
          >
            <option value="all">All Modules</option>
            <option value="mod-1">Mod 1: Intro & Structured Programming</option>
            <option value="mod-2">Mod 2: Life Cycle Models</option>
            <option value="mod-3">Mod 3: Requirements & Formal Specs</option>
            <option value="mod-4-5">Mod 4 & 5: Software Design & DFD</option>
            <option value="mod-6-7">Mod 6 & 7: UML Modeling</option>
            <option value="mod-8">Mod 8: OOD & Design Patterns</option>
            <option value="mod-10">Mod 10: Coding & Testing</option>
            <option value="mod-11">Mod 11: Project Planning & Estimation</option>
            <option value="mod-12">Mod 12: Teams & Risk Management</option>
            <option value="mod-13">Mod 13: Reliability & ISO/CMM</option>
            <option value="mod-14-17">Mod 14-17: Maintenance & Architecture</option>
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-xs text-slate-200 px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-purple-500 font-medium"
          >
            <option value="all">All Question Types</option>
            <option value="mcq">Multiple Choice (MCQ)</option>
            <option value="true_false">True / False</option>
            <option value="numerical">Numerical / Calculations</option>
            <option value="short_answer">Short Answer</option>
          </select>

          <span className="text-xs text-slate-400 ml-auto font-mono">
            Showing {filteredQuestions.length} questions
          </span>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => {
          const userAnswer = answers[q.id];
          const hasAnswered = userAnswer !== undefined;
          const isCorrect = typeof q.correctAnswer === 'boolean'
            ? userAnswer === q.correctAnswer
            : String(userAnswer).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase();
          const isRevealed = revealedExplanations[q.id];

          return (
            <div
              key={q.id}
              className={`p-5 rounded-2xl border transition-all ${hasAnswered ? (isCorrect ? 'border-emerald-500/50 bg-emerald-950/10' : 'border-rose-500/50 bg-rose-950/10') : 'border-slate-800 bg-slate-900/70'}`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-mono font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {q.type.replace('_', ' ')}
                  </span>
                </div>

                <button
                  onClick={() => toggleExplanation(q.id)}
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 font-medium"
                >
                  {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {isRevealed ? 'Hide Explanation' : 'View Answer'}
                </button>
              </div>

              {/* Question Text */}
              <p className="text-sm font-medium text-slate-100 mb-4 leading-relaxed">
                {q.question}
              </p>

              {/* MCQ Options */}
              {q.type === 'mcq' && q.options && (
                <div className="space-y-2 mb-4">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswer === opt;
                    const isThisCorrect = opt === q.correctAnswer;
                    let btnStyle = 'border-slate-800 bg-slate-950/60 hover:bg-slate-800 text-slate-300';
                    if (hasAnswered) {
                      if (isThisCorrect) btnStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-bold';
                      else if (isSelected && !isThisCorrect) btnStyle = 'border-rose-500 bg-rose-950/40 text-rose-200';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={hasAnswered}
                        onClick={() => handleSelectAnswer(q.id, opt)}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {hasAnswered && isThisCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                        {hasAnswered && isSelected && !isThisCorrect && <X className="w-4 h-4 text-rose-400" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* True/False Buttons */}
              {q.type === 'true_false' && (
                <div className="flex gap-3 mb-4">
                  {[true, false].map((val) => {
                    const isSelected = userAnswer === val;
                    const isThisCorrect = val === q.correctAnswer;
                    let btnStyle = 'border-slate-800 bg-slate-950/60 hover:bg-slate-800 text-slate-300';
                    if (hasAnswered) {
                      if (isThisCorrect) btnStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-bold';
                      else if (isSelected && !isThisCorrect) btnStyle = 'border-rose-500 bg-rose-950/40 text-rose-200';
                    }

                    return (
                      <button
                        key={String(val)}
                        disabled={hasAnswered}
                        onClick={() => handleSelectAnswer(q.id, val)}
                        className={`px-5 py-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-2 ${btnStyle}`}
                      >
                        {val ? 'TRUE' : 'FALSE'}
                        {hasAnswered && isThisCorrect && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                        {hasAnswered && isSelected && !isThisCorrect && <X className="w-3.5 h-3.5 text-rose-400" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Numerical or Short Answer Input */}
              {(q.type === 'numerical' || q.type === 'short_answer') && (
                <div className="mb-4">
                  {!hasAnswered ? (
                    <div className="flex gap-2 max-w-sm">
                      <input
                        type="text"
                        placeholder="Enter your answer..."
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            const val = (e.target as HTMLInputElement).value;
                            if (val.trim()) handleSelectAnswer(q.id, val);
                          }
                        }}
                        className="flex-1 px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 font-mono"
                      />
                      <button
                        onClick={(e) => {
                          const input = (e.currentTarget.previousElementSibling as HTMLInputElement).value;
                          if (input.trim()) handleSelectAnswer(q.id, input);
                        }}
                        className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold"
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <div className="text-xs font-mono">
                      Your Answer: <span className={isCorrect ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{String(userAnswer)}</span>
                      {!isCorrect && (
                        <span className="ml-3 text-emerald-400">Correct: <strong>{String(q.correctAnswer)}</strong></span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Explanation & Hint */}
              {isRevealed && (
                <div className="pt-3 border-t border-slate-800 text-xs space-y-1.5">
                  <div className="text-slate-300">
                    <strong className="text-amber-400">Explanation &amp; Justification:</strong> {q.explanation}
                  </div>
                  {q.hint && (
                    <div className="text-[11px] text-slate-400 italic">
                      Hint: {q.hint}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
