import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, AlertTriangle, BookOpen, Flame, Award, ChevronRight } from 'lucide-react';
import { CourseModule, TopicItem } from '../types';

interface ThreeDayRoadmapProps {
  modules: CourseModule[];
  completedTopics: Record<string, boolean>;
  onSelectTopic: (topic: TopicItem) => void;
  onToggleComplete: (topicId: string) => void;
}

export const ThreeDayRoadmap: React.FC<ThreeDayRoadmapProps> = ({
  modules,
  completedTopics,
  onSelectTopic,
  onToggleComplete
}) => {
  const [selectedDay, setSelectedDay] = useState<1 | 2 | 3>(1);

  const dayModules = modules.filter(m => m.day === selectedDay);
  const dayTopics = dayModules.flatMap(m => m.topics);
  const completedDayCount = dayTopics.filter(t => completedTopics[t.id]).length;
  const progressPercent = dayTopics.length > 0 ? Math.round((completedDayCount / dayTopics.length) * 100) : 0;

  const dayInfo = {
    1: {
      title: 'Day 1: Foundations, Lifecycle & Requirements Engineering',
      tagline: 'Master the core SE definitions, the 5 lifecycle models, SRS standards, decision logic, and mathematical formal specifications.',
      estimatedHours: '6 - 7 Hours',
      highYieldAlert: 'Expect 35-40% of conceptual short/long questions from this day (Classical vs Iterative Waterfall, Boehm Spiral 4 Quadrants, SRS IEEE 830, and Z Schemas).'
    },
    2: {
      title: 'Day 2: Software Design, DFDs, UML & Architecture',
      tagline: 'Deep dive into Cohesion (7 levels), Coupling (5 levels), Structure Charts, Level 0-2 DFDs, 10 practice problems, UML 5 views, and design patterns.',
      estimatedHours: '7 - 8 Hours',
      highYieldAlert: 'Every university exam includes either a 15-mark DFD drawing problem or Cohesion/Coupling classification. Practice the 10 DFD problems in the DFD Studio!'
    },
    3: {
      title: 'Day 3: Testing, Project Estimation, Quality & Advanced Systems',
      tagline: 'Conquer White-Box CFG Cyclomatic Complexity, Black-box BVA/ECP, Basic COCOMO formulas, Putnam 4th Power Law, CPM Critical Path, ISO 9001 vs SEI-CMM, and CORBA.',
      estimatedHours: '7 - 8 Hours',
      highYieldAlert: 'All major numerical questions live here: Cyclomatic Complexity V(G), Basic COCOMO effort/time, Error Seeding, and Putnam schedule compression penalty!'
    }
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Roadmap Header banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                <Flame className="w-5 h-5 text-amber-400" />
              </span>
              <h2 className="text-xl font-bold tracking-tight text-white">
                3-Day University Exam Sprint Roadmap
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Carefully partitioned revision timeline to guarantee you finish the complete software engineering syllabus within 72 hours before your exam.
            </p>
          </div>

          {/* Quick Progress */}
          <div className="bg-slate-900/80 border border-slate-700/80 p-3 rounded-xl flex items-center gap-4">
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Day {selectedDay} Progress</div>
              <div className="text-base font-bold text-white font-mono">
                {completedDayCount} / {dayTopics.length} ({progressPercent}%)
              </div>
            </div>
            <div className="w-14 h-14 relative flex items-center justify-center">
              <div className="text-xs font-bold text-emerald-400 font-mono">{progressPercent}%</div>
            </div>
          </div>
        </div>

        {/* Day Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          {[1, 2, 3].map((d) => {
            const dayNum = d as 1 | 2 | 3;
            const isSelected = selectedDay === dayNum;
            const topicsForD = modules.filter(m => m.day === dayNum).flatMap(m => m.topics);
            const doneForD = topicsForD.filter(t => completedTopics[t.id]).length;
            const pct = topicsForD.length > 0 ? Math.round((doneForD / topicsForD.length) * 100) : 0;

            return (
              <button
                key={d}
                onClick={() => setSelectedDay(dayNum)}
                className={`p-4 rounded-xl border text-left transition-all relative ${isSelected ? 'bg-slate-800/90 border-indigo-500 shadow-xl ring-2 ring-indigo-500/20' : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-850'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
                    Day {d} Focus
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold">{pct}%</span>
                </div>
                <div className="text-sm font-bold text-slate-100">{d === 1 ? 'Foundations & Specs' : d === 2 ? 'Design, DFD & UML' : 'Testing, Math & Quality'}</div>
                <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-2">
                  <Clock className="w-3 h-3" /> {d === 1 ? '6-7 hrs' : d === 2 ? '7-8 hrs' : '7-8 hrs'}
                  <span>&bull;</span>
                  <span>{topicsForD.length} Topics</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mt-3">
                  <div style={{ width: `${pct}%` }} className="bg-emerald-500 h-full transition-all duration-300"></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Day Overview Banner */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-base font-bold text-white">{dayInfo[selectedDay].title}</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{dayInfo[selectedDay].tagline}</p>
            <div className="mt-3 p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2 text-xs text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>High Yield Exam Trap:</strong> {dayInfo[selectedDay].highYieldAlert}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modules & Topics Breakdown for Selected Day */}
      <div className="space-y-6">
        {dayModules.map((mod) => (
          <div key={mod.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-slate-800/60 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                  Module {mod.moduleNumber}
                </span>
                <h4 className="text-sm font-bold text-white">{mod.title}</h4>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {mod.topics.filter(t => completedTopics[t.id]).length} / {mod.topics.length} Done
              </span>
            </div>

            <div className="divide-y divide-slate-800/60">
              {mod.topics.map((t) => {
                const isCompleted = !!completedTopics[t.id];
                return (
                  <div
                    key={t.id}
                    className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${isCompleted ? 'bg-emerald-950/5' : 'hover:bg-slate-850/50'}`}
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <button
                        onClick={() => onToggleComplete(t.id)}
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${isCompleted ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-slate-600 hover:border-emerald-500 bg-slate-950'}`}
                      >
                        {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-xs font-semibold ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-100'}`}>
                            {t.title}
                          </span>
                          {t.isHighYield && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                              HIGH YIELD
                            </span>
                          )}
                          {t.isNumerical && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold border border-cyan-500/30">
                              NUMERICAL
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug line-clamp-2">
                          {t.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => onSelectTopic(t)}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors shadow"
                      >
                        <BookOpen className="w-3.5 h-3.5" /> Read Notes &amp; Diagrams
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
