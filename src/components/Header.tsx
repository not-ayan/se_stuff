import React from 'react';
import { BookMarked, Search, CheckCircle2, Bookmark, Flame, Calendar, RotateCcw, Filter, Sparkles, Layers, Calculator, HelpCircle, Network } from 'lucide-react';

interface HeaderProps {
  activeTab: 'sheet' | 'roadmap' | 'dfd' | 'diagrams' | 'calculator' | 'quiz';
  setActiveTab: (tab: 'sheet' | 'roadmap' | 'dfd' | 'diagrams' | 'calculator' | 'quiz') => void;
  completedCount: number;
  totalTopics: number;
  starredCount: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  statusFilter: 'all' | 'pending' | 'completed' | 'starred';
  setStatusFilter: (filter: 'all' | 'pending' | 'completed' | 'starred') => void;
  dayFilter: number;
  setDayFilter: (day: number) => void;
  onResetProgress: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  completedCount,
  totalTopics,
  starredCount,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  dayFilter,
  setDayFilter,
  onResetProgress
}) => {
  const percent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top Banner: Exam Urgency */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-rose-900 text-white px-4 py-1.5 text-xs text-center font-medium flex items-center justify-center gap-2">
        <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>
          <strong>3-Day Software Engineering University Exam Sprint:</strong> Master All Modules &amp; Solved DFDs based on Dr. Rajib Mall (IIT Kharagpur) Syllabus!
        </span>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 font-black text-lg">
              SE
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  Software Engineering A2Z Sheet
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Striver-Style
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Curated Prep Hub for University Exams &bull; Complete Theory, Formulas, DFDs &amp; Diagrams
              </p>
            </div>
          </div>

          {/* Overall Progress Gauge */}
          <div className="flex items-center gap-4 bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-2xl">
            <div className="w-36 sm:w-48">
              <div className="flex justify-between text-xs font-mono font-medium mb-1">
                <span className="text-slate-300">Total Progress</span>
                <span className="text-emerald-400 font-bold">{completedCount}/{totalTopics} ({percent}%)</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  style={{ width: `${percent}%` }}
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-full transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
              <button
                onClick={() => setStatusFilter(statusFilter === 'starred' ? 'all' : 'starred')}
                className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${statusFilter === 'starred' ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'border-slate-800 text-slate-400 hover:text-white'}`}
                title="Filter bookmarked revision topics"
              >
                <Bookmark className={`w-3.5 h-3.5 ${starredCount > 0 ? 'fill-amber-400 text-amber-400' : ''}`} />
                <span className="font-mono">{starredCount}</span>
              </button>

              <button
                onClick={onResetProgress}
                className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-850 transition-colors"
                title="Reset completion tracking"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-4 pb-1 border-t border-slate-800/80 mt-3 no-scrollbar text-xs font-semibold">
          {[
            { id: 'sheet', label: 'A2Z Course Sheet', icon: BookMarked },
            { id: 'roadmap', label: '3-Day Crash Plan', icon: Calendar },
            { id: 'dfd', label: 'DFD Practice Studio (10 Qs)', icon: Network },
            { id: 'diagrams', label: 'Interactive Diagrams', icon: Layers },
            { id: 'calculator', label: 'Formula & Numerical Lab', icon: Calculator },
            { id: 'quiz', label: 'Exam Test Bank (150+ Qs)', icon: HelpCircle },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sub-bar for Search & Filter (shown on Sheet view) */}
        {activeTab === 'sheet' && (
          <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[220px] max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search topics, formulas, keywords (e.g. COCOMO, DFD, McCabe, Z notation)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Day filter */}
              <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
                {[
                  { d: 0, label: 'All Days' },
                  { d: 1, label: 'Day 1' },
                  { d: 2, label: 'Day 2' },
                  { d: 3, label: 'Day 3' }
                ].map(item => (
                  <button
                    key={item.d}
                    onClick={() => setDayFilter(item.d)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      dayFilter === item.d
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Status filter */}
              <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'pending', label: 'Pending' },
                  { id: 'completed', label: 'Done' }
                ].map(sf => (
                  <button
                    key={sf.id}
                    onClick={() => setStatusFilter(sf.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      statusFilter === sf.id
                        ? 'bg-purple-600 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {sf.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
