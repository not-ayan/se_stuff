import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { COURSE_MODULES } from './data/courseData';
import { CourseModule, TopicItem } from './types';
import { Header } from './components/Header';
import { TopicRow } from './components/TopicRow';
import { TopicModal } from './components/TopicModal';
import { ThreeDayRoadmap } from './components/ThreeDayRoadmap';
import { DFDStudio } from './components/DFDStudio';
import { FormulaCalculator } from './components/FormulaCalculator';
import { QuizBank } from './components/QuizBank';
import { DiagramViewer } from './components/DiagramViewer';
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  Layers,
  Sparkles,
  HelpCircle,
  Clock,
  Download,
  CheckCircle2,
  FolderGit2,
  GraduationCap
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'sheet' | 'roadmap' | 'dfd' | 'diagrams' | 'calculator' | 'quiz'>('sheet');
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('se_completed_topics');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [starredTopics, setStarredTopics] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('se_starred_topics');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed' | 'starred'>('all');
  const [dayFilter, setDayFilter] = useState<number>(0);
  const [selectedTopic, setSelectedTopic] = useState<TopicItem | null>(null);
  const [selectedDiagramTopic, setSelectedDiagramTopic] = useState<TopicItem | null>(null);

  // Accordion state: by default, all modules are open
  const [openModules, setOpenModules] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    COURSE_MODULES.forEach(m => { initial[m.id] = true; });
    return initial;
  });

  useEffect(() => {
    try {
      localStorage.setItem('se_completed_topics', JSON.stringify(completedTopics));
    } catch (e) {
      console.error(e);
    }
  }, [completedTopics]);

  useEffect(() => {
    try {
      localStorage.setItem('se_starred_topics', JSON.stringify(starredTopics));
    } catch (e) {
      console.error(e);
    }
  }, [starredTopics]);

  const toggleComplete = (id: string) => {
    setCompletedTopics(prev => {
      const next = { ...prev, [id]: !prev[id] };
      // Trigger confetti if marking complete
      if (!prev[id]) {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 }
          });
        } catch {}
      }
      return next;
    });
  };

  const toggleStar = (id: string) => {
    setStarredTopics(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleModuleOpen = (modId: string) => {
    setOpenModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset your completion and revision tracking?')) {
      setCompletedTopics({});
      setStarredTopics({});
    }
  };

  // Compute stats
  const allTopics = COURSE_MODULES.flatMap(m => m.topics);
  const totalTopicsCount = allTopics.length;
  const completedCount = allTopics.filter(t => completedTopics[t.id]).length;
  const starredCount = allTopics.filter(t => starredTopics[t.id]).length;

  // Filter topics
  const filterTopic = (t: TopicItem) => {
    if (dayFilter !== 0 && t.day !== dayFilter) return false;
    if (statusFilter === 'pending' && completedTopics[t.id]) return false;
    if (statusFilter === 'completed' && !completedTopics[t.id]) return false;
    if (statusFilter === 'starred' && !starredTopics[t.id]) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchSummary = t.summary.toLowerCase().includes(q);
      const matchTags = t.tags.some(tag => tag.toLowerCase().includes(q));
      const matchKeyPoints = t.keyPoints.some(kp => kp.toLowerCase().includes(q));
      if (!matchTitle && !matchSummary && !matchTags && !matchKeyPoints) return false;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedCount={completedCount}
        totalTopics={totalTopicsCount}
        starredCount={starredCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dayFilter={dayFilter}
        setDayFilter={setDayFilter}
        onResetProgress={handleResetProgress}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* TAB 1: Striver A2Z DSA-Style Sheet View */}
        {activeTab === 'sheet' && (
          <div className="space-y-6">
            {/* Quick Helper Banner */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950/60 border border-slate-800 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-indigo-400" />
                  <h2 className="text-base font-bold text-white">Striver\'s Style A2Z Software Engineering Sheet</h2>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Step-by-step curriculum organized into expandable modules. Check off topics as you study to track your 3-day readiness.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const allOpen: Record<string, boolean> = {};
                    COURSE_MODULES.forEach(m => { allOpen[m.id] = true; });
                    setOpenModules(allOpen);
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300 border border-slate-700 transition-colors"
                >
                  Expand All
                </button>
                <button
                  onClick={() => setOpenModules({})}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300 border border-slate-700 transition-colors"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* Modules Accordion List */}
            <div className="space-y-4">
              {COURSE_MODULES.map((module) => {
                const moduleTopics = module.topics.filter(filterTopic);
                if (moduleTopics.length === 0 && (searchQuery || statusFilter !== 'all' || dayFilter !== 0)) {
                  return null;
                }

                const totalModTopics = module.topics.length;
                const completedInMod = module.topics.filter(t => completedTopics[t.id]).length;
                const modPercent = totalModTopics > 0 ? Math.round((completedInMod / totalModTopics) * 100) : 0;
                const isOpen = openModules[module.id] ?? true;

                return (
                  <div
                    key={module.id}
                    className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-md transition-all hover:border-slate-700/80"
                  >
                    {/* Module Accordion Header */}
                    <div
                      onClick={() => toggleModuleOpen(module.id)}
                      className="px-5 py-4 bg-slate-900 cursor-pointer flex items-center justify-between gap-4 select-none group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="p-1.5 rounded-lg bg-slate-800 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </span>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-indigo-400">
                              Step {module.moduleNumber} &bull; Day {module.day}
                            </span>
                            <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                              {completedInMod}/{totalModTopics} Done
                            </span>
                          </div>
                          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-200 transition-colors truncate">
                            {module.title}
                          </h3>
                        </div>
                      </div>

                      {/* Right: Progress bar & badge */}
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="hidden sm:block w-24">
                          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${modPercent}%` }}
                              className="bg-emerald-500 h-full transition-all duration-300"
                            />
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          {modPercent}%
                        </span>
                      </div>
                    </div>

                    {/* Topics Table/List */}
                    {isOpen && (
                      <div className="border-t border-slate-800/80">
                        {moduleTopics.length > 0 ? (
                          moduleTopics.map(topic => (
                            <TopicRow
                              key={topic.id}
                              topic={topic}
                              isCompleted={!!completedTopics[topic.id]}
                              isStarred={!!starredTopics[topic.id]}
                              onToggleComplete={toggleComplete}
                              onToggleStar={toggleStar}
                              onSelectTopic={setSelectedTopic}
                              onOpenDiagram={topic => setSelectedTopic(topic)}
                              onOpenQuiz={topic => {
                                setSelectedTopic(topic);
                              }}
                            />
                          ))
                        ) : (
                          <div className="p-4 text-center text-xs text-slate-500 italic">
                            No topics match your current filter settings in this step.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: 3-Day Crash Plan */}
        {activeTab === 'roadmap' && (
          <ThreeDayRoadmap
            modules={COURSE_MODULES}
            completedTopics={completedTopics}
            onSelectTopic={setSelectedTopic}
            onToggleComplete={toggleComplete}
          />
        )}

        {/* TAB 3: DFD Practice Studio */}
        {activeTab === 'dfd' && <DFDStudio />}

        {/* TAB 4: Interactive Diagrams Visualizer */}
        {activeTab === 'diagrams' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                Comprehensive Visual Diagram Explorer
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Visualizing core architectural and computational models across the entire software engineering curriculum.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <DiagramViewer type="waterfall_effort" title="1. Classical Waterfall 6-Phase Pipeline & Effort Distribution" />
              <DiagramViewer type="iterative_waterfall" title="2. Iterative Waterfall with Feedback Paths & Phase Containment" />
              <DiagramViewer type="spiral_quadrants" title="3. Barry Boehm Spiral Model (4 Quadrants & Risk Loops)" />
              <DiagramViewer type="cohesion_coupling_ladders" title="4. Modularity Ladders: Cohesion (7 Levels) & Coupling (5 Levels)" />
              <DiagramViewer type="cfg_cyclomatic" title="5. Control Flow Graph (CFG) & McCabe Cyclomatic Complexity" />
              <DiagramViewer type="bathtub_software_curve" title="6. Hardware Bathtub Curve vs Software Failure Step Curve" />
              <DiagramViewer type="cmm_pyramid" title="7. SEI Capability Maturity Model (CMM) 5 Levels & KPAs" />
            </div>
          </div>
        )}

        {/* TAB 5: Formula & Numerical Lab */}
        {activeTab === 'calculator' && <FormulaCalculator />}

        {/* TAB 6: Exam Test Bank & Mock Quiz */}
        {activeTab === 'quiz' && <QuizBank />}
      </main>

      {/* Topic Detail Modal */}
      {selectedTopic && (
        <TopicModal
          topic={selectedTopic}
          onClose={() => setSelectedTopic(null)}
          isCompleted={!!completedTopics[selectedTopic.id]}
          isStarred={!!starredTopics[selectedTopic.id]}
          onToggleComplete={toggleComplete}
          onToggleStar={toggleStar}
        />
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-6 px-4 sm:px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Software Engineering 3-Day University Exam Accelerator</span>
          </div>
          <div className="text-[11px]">
            Based on the curriculum of Dr. Rajib Mall (IIT Kharagpur) &amp; Prof. Swarup Roy (Tezpur University).
          </div>
        </div>
      </footer>
    </div>
  );
}
