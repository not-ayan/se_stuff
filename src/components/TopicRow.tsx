import React from 'react';
import { TopicItem } from '../types';
import { CheckCircle2, Bookmark, BookOpen, Layers, HelpCircle, ChevronRight } from 'lucide-react';

interface TopicRowProps {
  topic: TopicItem;
  isCompleted: boolean;
  isStarred: boolean;
  onToggleComplete: (id: string) => void;
  onToggleStar: (id: string) => void;
  onSelectTopic: (topic: TopicItem) => void;
  onOpenDiagram: (topic: TopicItem) => void;
  onOpenQuiz: (topic: TopicItem) => void;
}

export const TopicRow: React.FC<TopicRowProps> = ({
  topic,
  isCompleted,
  isStarred,
  onToggleComplete,
  onToggleStar,
  onSelectTopic,
  onOpenDiagram,
  onOpenQuiz
}) => {
  return (
    <div
      className={`group px-4 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 transition-colors ${
        isCompleted ? 'bg-slate-900/30' : 'hover:bg-slate-800/40 bg-slate-900/60'
      }`}
    >
      {/* Left: Checkbox, Star & Title */}
      <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
        {/* Status Checkbox */}
        <button
          onClick={() => onToggleComplete(topic.id)}
          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors mt-0.5 sm:mt-0 ${
            isCompleted
              ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm'
              : 'border-slate-600 hover:border-emerald-500 bg-slate-950'
          }`}
          title={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
        >
          {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
        </button>

        {/* Bookmark for Revision */}
        <button
          onClick={() => onToggleStar(topic.id)}
          className={`p-1 rounded hover:bg-slate-800 transition-colors shrink-0 ${
            isStarred ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
          }`}
          title={isStarred ? 'Remove bookmark' : 'Bookmark for rapid revision'}
        >
          <Bookmark className={`w-4 h-4 ${isStarred ? 'fill-amber-400' : ''}`} />
        </button>

        {/* Topic Title and Tags */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              onClick={() => onSelectTopic(topic)}
              className={`text-xs sm:text-sm font-medium cursor-pointer transition-colors hover:text-indigo-300 ${
                isCompleted ? 'text-slate-400 line-through' : 'text-slate-100 font-semibold'
              }`}
            >
              {topic.title}
            </span>

            {/* Difficulty Badge */}
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                topic.difficulty === 'Easy'
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                  : topic.difficulty === 'Medium'
                  ? 'bg-amber-950/80 text-amber-400 border border-amber-800/60'
                  : 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
              }`}
            >
              {topic.difficulty}
            </span>

            {/* High Yield Badge */}
            {topic.isHighYield && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold">
                HIGH YIELD
              </span>
            )}

            {/* Numerical Badge */}
            {topic.isNumerical && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-mono font-bold">
                NUMERICAL
              </span>
            )}
          </div>

          <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
            {topic.summary}
          </div>
        </div>
      </div>

      {/* Right Action Buttons */}
      <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
        {/* Deep Notes */}
        <button
          onClick={() => onSelectTopic(topic)}
          className="px-2.5 py-1 text-xs rounded-lg font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-1 transition-colors"
          title="Open complete study notes & theory"
        >
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          <span>Notes</span>
        </button>

        {/* Diagram button if available */}
        {topic.diagramType && (
          <button
            onClick={() => onOpenDiagram(topic)}
            className="px-2.5 py-1 text-xs rounded-lg font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-1 transition-colors"
            title="View interactive diagram"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Diagram</span>
          </button>
        )}

        {/* Practice Quiz */}
        <button
          onClick={() => onOpenQuiz(topic)}
          className="px-2.5 py-1 text-xs rounded-lg font-medium text-purple-300 bg-purple-950/40 hover:bg-purple-900/50 border border-purple-800/60 flex items-center gap-1 transition-colors"
          title="Practice university questions"
        >
          <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden sm:inline">Quiz</span>
        </button>
      </div>
    </div>
  );
};
