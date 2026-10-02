import React, { useState } from 'react';
import { TopicItem } from '../types';
import { DiagramViewer } from './DiagramViewer';
import { X, Copy, Download, Check, BookOpen, Layers, Award, Sparkles, CheckCircle2, Bookmark } from 'lucide-react';

interface TopicModalProps {
  topic: TopicItem | null;
  onClose: () => void;
  isCompleted: boolean;
  isStarred: boolean;
  onToggleComplete: (id: string) => void;
  onToggleStar: (id: string) => void;
}

export const TopicModal: React.FC<TopicModalProps> = ({
  topic,
  onClose,
  isCompleted,
  isStarred,
  onToggleComplete,
  onToggleStar
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'notes' | 'diagram' | 'flashcard'>('notes');

  if (!topic) return null;

  const handleCopyMarkdown = () => {
    const mdContent = `# ${topic.title}\n\n**Module**: ${topic.moduleId} | **Day**: ${topic.day} | **Difficulty**: ${topic.difficulty}\n\n## Summary\n${topic.summary}\n\n## Key Exam Points\n${topic.keyPoints.map(k => `- ${k}`).join('\n')}\n\n## Exam Tips & Traps\n${topic.examTips}\n\n## Detailed Lecture Notes\n${topic.fullNotes}\n\n${topic.formula ? `## Formula\n\`\`\`\n${topic.formula}\n\`\`\`\n` : ''}`;
    navigator.clipboard.writeText(mdContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const mdContent = `# ${topic.title}\n\n**Module**: ${topic.moduleId} | **Day**: ${topic.day} | **Difficulty**: ${topic.difficulty}\n\n## Summary\n${topic.summary}\n\n## Key Exam Points\n${topic.keyPoints.map(k => `- ${k}`).join('\n')}\n\n## Exam Tips & Traps\n${topic.examTips}\n\n## Detailed Lecture Notes\n${topic.fullNotes}\n\n${topic.formula ? `## Formula\n\`\`\`\n${topic.formula}\n\`\`\`\n` : ''}`;
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${topic.id}_notes.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border border-slate-750 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100 border border-slate-700">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                Lesson {topic.lessonNumber}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded font-bold ${topic.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-300' : topic.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'}`}>
                {topic.difficulty}
              </span>
              {topic.isHighYield && (
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  HIGH YIELD EXAM TOPIC
                </span>
              )}
              {topic.isNumerical && (
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold border border-cyan-500/30">
                  NUMERICAL
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
              {topic.title}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onToggleStar(topic.id)}
              className={`p-2 rounded-xl border transition-colors ${isStarred ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'}`}
              title={isStarred ? 'Remove from revision' : 'Bookmark for revision'}
            >
              <Bookmark className={`w-4 h-4 ${isStarred ? 'fill-amber-400' : ''}`} />
            </button>

            <button
              onClick={() => onToggleComplete(topic.id)}
              className={`p-2 rounded-xl border transition-colors flex items-center gap-1 text-xs font-semibold ${isCompleted ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-slate-800 text-slate-300 hover:bg-slate-800'}`}
              title={isCompleted ? 'Mark incomplete' : 'Mark completed'}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span className="hidden sm:inline">{isCompleted ? 'Completed' : 'Mark Done'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub-nav tabs & Export options */}
        <div className="px-5 py-2.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${activeTab === 'notes' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Full Lecture Notes
            </button>
            {topic.diagramType && (
              <button
                onClick={() => setActiveTab('diagram')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${activeTab === 'diagram' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                <Layers className="w-3.5 h-3.5" /> Interactive Diagram
              </button>
            )}
            <button
              onClick={() => setActiveTab('flashcard')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${activeTab === 'flashcard' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Exam Cheat Sheet
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 flex items-center gap-1 transition-colors"
              title="Copy formatted markdown to clipboard"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied MD!' : 'Copy MD'}
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 flex items-center gap-1 transition-colors"
              title="Download markdown file (.md)"
            >
              <Download className="w-3 h-3" />
              Download .md
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-200 text-sm leading-relaxed">
          {activeTab === 'notes' && (
            <div className="space-y-6">
              {/* Executive Summary */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs uppercase tracking-wider text-indigo-400 font-bold block mb-1">
                  Topic Summary (For Quick Recall)
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{topic.summary}</p>
              </div>

              {/* Key Exam Takeaways */}
              <div className="space-y-2">
                <h3 className="text-xs uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Crucial Concepts &amp; Exam Takeaways
                </h3>
                <div className="space-y-2">
                  {topic.keyPoints.map((pt, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5"></span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diagram embedded in notes if present */}
              {topic.diagramType && (
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-cyan-400 font-bold mb-2 flex items-center gap-1.5">
                    <Layers className="w-4 h-4" /> Concept Visualizer
                  </h3>
                  <DiagramViewer type={topic.diagramType} title={topic.title} />
                </div>
              )}

              {/* Formula Callout */}
              {topic.formula && (
                <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30">
                  <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold block mb-1">
                    Mathematical Formula &amp; Equation
                  </span>
                  <div className="font-mono text-sm text-white bg-slate-900 p-2.5 rounded border border-slate-800">
                    {topic.formula}
                  </div>
                </div>
              )}

              {/* Detailed Lecture Markdown */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                  In-Depth Textbook Theory &amp; Explanations
                </h3>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs leading-relaxed whitespace-pre-line font-sans text-slate-300">
                  {topic.fullNotes}
                </div>
              </div>

              {/* Exam Tip & Trap */}
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200">
                <span className="font-bold uppercase tracking-wider block mb-1 text-amber-400">
                  Professor\'s Exam Alert &amp; Common Pitfalls:
                </span>
                {topic.examTips}
              </div>
            </div>
          )}

          {activeTab === 'diagram' && topic.diagramType && (
            <div>
              <DiagramViewer type={topic.diagramType} title={topic.title} />
            </div>
          )}

          {activeTab === 'flashcard' && (
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-950 border border-indigo-500/30 text-center space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">
                  Rapid Revision Flashcard
                </span>
                <h3 className="text-lg font-bold text-white">{topic.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                  {topic.summary}
                </p>
                {topic.formula && (
                  <div className="inline-block p-2 rounded bg-black/40 border border-cyan-500/40 font-mono text-xs text-cyan-300">
                    {topic.formula}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Must-Remember Bullet Points</h4>
                {topic.keyPoints.map((kp, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300">
                    &bull; {kp}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
