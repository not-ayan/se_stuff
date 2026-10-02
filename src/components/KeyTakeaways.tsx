import React from 'react';
import { Award, ChevronRight, Lightbulb, Layers } from 'lucide-react';
import { COURSE_MODULES } from '../data/courseData';
import { DiagramViewer, SUPPORTED_DIAGRAM_TYPES } from './DiagramViewer';

interface KeyTakeawaysProps {
  courseModuleId?: string;
}

/**
 * Surfaces the distilled key points and professor's exam tips attached to a
 * module, plus any bespoke diagram that exists for its topics.
 */
export const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({ courseModuleId }) => {
  const module = COURSE_MODULES.find((item) => item.id === courseModuleId);
  if (!module || module.topics.length === 0) return null;

  return (
    <details className="group mb-8 overflow-hidden rounded-2xl border border-line bg-canvas">
      <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-4">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-700">
          <Award className="h-4 w-4" />
        </span>
        <span className="flex-1">
          <span className="block text-[13.5px] font-semibold text-ink">Study brief — key points &amp; exam tips</span>
          <span className="block text-[11.5px] text-subtle">
            {module.topics.length} topics distilled from the lecture material. Expand before you revise.
          </span>
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-90" />
      </summary>

      <div className="space-y-3 border-t border-line px-5 py-4">
        {module.topics.map((topic) => (
          <div key={topic.id} className="rounded-xl border border-line bg-surface p-4">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-[13.5px] font-semibold text-ink">{topic.title}</h4>
              {topic.isHighYield && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                  High yield
                </span>
              )}
            </div>

            <ul className="mt-2.5 space-y-1.5">
              {topic.keyPoints.map((point, i) => (
                <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-body">
                  <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-faint" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {topic.examTips && (
              <div className="mt-3 flex gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
                <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-700" />
                <p className="text-[12px] leading-relaxed text-amber-800">{topic.examTips}</p>
              </div>
            )}

            {topic.diagramType && SUPPORTED_DIAGRAM_TYPES.has(topic.diagramType) && (
              <div className="mt-3">
                <div className="mb-1 flex items-center gap-1.5 text-[10.5px] text-muted">
                  <Layers className="h-3 w-3" /> Interactive diagram
                </div>
                <DiagramViewer type={topic.diagramType} title={topic.title} />
              </div>
            )}
          </div>
        ))}
      </div>
    </details>
  );
};
