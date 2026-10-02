import React, { useState } from 'react';
import { DFD_PROBLEMS } from '../data/dfdProblemsData';
import { DFDProblem } from '../types';
import { Network, Database, ArrowRight, CheckCircle, FileText, Split, Sparkles, Layers } from 'lucide-react';

export const DFDStudio: React.FC = () => {
  const [selectedProblemId, setSelectedProblemId] = useState<string>('tas-master');
  const [activeStep, setActiveStep] = useState<number>(0);

  const problem: DFDProblem = DFD_PROBLEMS.find(p => p.id === selectedProblemId) || DFD_PROBLEMS[0];

  return (
    <div className="space-y-6 text-slate-100">
      {/* Studio Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                <Network className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold tracking-tight">Structured Analysis & DFD Practice Studio</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Master Level 0, Level 1, and Level 2 Data Flow Diagrams with all 10 university examination problems.
            </p>
          </div>

          {/* Problem Selector Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400 font-medium">Select Problem:</label>
            <select
              value={selectedProblemId}
              onChange={e => {
                setSelectedProblemId(e.target.value);
                setActiveStep(0);
              }}
              className="bg-slate-950 border border-slate-700 text-xs text-slate-200 px-3 py-2 rounded-xl focus:outline-none focus:border-cyan-500 font-medium max-w-xs"
            >
              {DFD_PROBLEMS.map(p => (
                <option key={p.id} value={p.id}>
                  {p.problemNumber === 0 ? 'Master Example: TAS' : `Problem ${p.problemNumber}: ${p.systemName}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Problem title badge */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm font-semibold text-cyan-300">
            {problem.title}
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-mono">
            Structured Analysis Pipeline
          </span>
        </div>
      </div>

      {/* 5-Step Pipeline Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {[
          { num: 'Step 1', title: 'Entities & Functions', icon: FileText },
          { num: 'Step 2', title: 'Level 0 Context', icon: Network },
          { num: 'Step 3', title: 'Level 1 DFD', icon: Layers },
          { num: 'Step 4', title: 'Level 2 Factoring', icon: Split },
          { num: 'Step 5', title: 'Data Dictionary & Rules', icon: Database },
        ].map((s, idx) => {
          const Icon = s.icon;
          return (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${activeStep === idx ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200 shadow-lg' : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850'}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono opacity-80">{s.num}</span>
                <Icon className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-xs font-bold text-slate-200 mt-1">{s.title}</div>
            </button>
          );
        })}
      </div>

      {/* Main Requirement Text Box */}
      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-xs text-slate-300">
        <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Problem Statement Requirement</span>
        <p className="leading-relaxed whitespace-pre-line">{problem.requirement}</p>
      </div>

      {/* STEP CONTENT PANELS */}
      {activeStep === 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* External Entities */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span> External Entities (Outside System)
              </h3>
              <div className="space-y-2">
                {problem.externalEntities.map((ent, i) => (
                  <div key={i} className="p-2.5 rounded bg-slate-950 border border-slate-800 text-xs">
                    <div className="font-bold text-slate-100">{ent.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      <span className="text-emerald-400">&darr; Sends:</span> {ent.inputs.join(', ')}
                    </div>
                    {ent.outputs.length > 0 && (
                      <div className="text-[11px] text-slate-400">
                        <span className="text-cyan-400">&uarr; Receives:</span> {ent.outputs.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Candidate Functions */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Candidate Level 1 Functions
              </h3>
              <div className="space-y-2">
                {problem.candidateFunctions.map((fn, i) => (
                  <div key={i} className="p-2.5 rounded bg-slate-950 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-100">{fn.id} {fn.name}</span>
                      <span className="text-[10px] text-emerald-400 font-mono">Process</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1">{fn.description}</p>
                    <div className="text-[10px] text-slate-500 mt-1 font-mono">Triggered by: {fn.triggeredBy}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Stores */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span> Persistent Data Stores
              </h3>
              <div className="space-y-1.5">
                {problem.dataStores.map((ds, i) => (
                  <div key={i} className="p-2 rounded bg-slate-950 border border-slate-800 text-xs flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="font-mono text-slate-200">{ds}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeStep === 1 && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="text-center">
            <h3 className="text-base font-bold text-cyan-400">Level 0 Context Diagram</h3>
            <p className="text-xs text-slate-400">The entire system as exactly ONE central process bubble with external entities attached.</p>
          </div>

          {/* Context diagram visual representation */}
          <div className="flex flex-col items-center justify-center p-6 bg-slate-950 rounded-xl border border-slate-800/80">
            <div className="w-48 h-48 rounded-full border-2 border-cyan-400 bg-cyan-950/40 flex flex-col items-center justify-center p-4 text-center shadow-lg relative my-8">
              <span className="text-xs font-mono text-cyan-300 font-bold mb-1">0</span>
              <span className="text-xs font-extrabold text-white leading-tight">{problem.systemName}</span>
            </div>

            {/* Entities & Flow list */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
              {problem.externalEntities.map((ent, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-slate-700 bg-slate-900 text-xs">
                  <div className="font-bold text-amber-300">{ent.name} (External Entity)</div>
                  <div className="mt-2 space-y-1 text-[11px] text-slate-300">
                    <div>&rarr; Input to system: <span className="font-mono text-emerald-400">{ent.inputs.join(', ')}</span></div>
                    {ent.outputs.length > 0 && (
                      <div>&larr; Output from system: <span className="font-mono text-cyan-400">{ent.outputs.join(', ')}</span></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
            <strong>Context Diagram Rules:</strong> Labeled with a single <strong>Noun</strong> (the software name). External entities appear HERE and nowhere else in the entire DFD model!
          </div>
        </div>
      )}

      {activeStep === 2 && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="text-center">
            <h3 className="text-base font-bold text-emerald-400">Level 1 Data Flow Diagram (Factored Bubbles)</h3>
            <p className="text-xs text-slate-400">Decomposition of context bubble into {problem.level1.bubbles.length} major functional bubbles (comfortably within 3-7 rule).</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {problem.level1.bubbles.map((b, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-[11px]">
                      {b.id}
                    </span>
                    <span className="font-bold text-white text-sm">{b.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Level 1 Process</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block font-semibold">&darr; Data Inflows:</span>
                    <span className="font-mono text-cyan-300">{b.inputs.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">&uarr; Data Outflows:</span>
                    <span className="font-mono text-emerald-300">{b.outputs.join(', ')}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <div>Reads store: <span className="font-mono text-purple-300">{b.readsFrom.join(', ') || 'None'}</span></div>
                  <div>Writes store: <span className="font-mono text-purple-300">{b.writesTo.join(', ') || 'None'}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeStep === 3 && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="text-center">
            <h3 className="text-base font-bold text-amber-400">Level 2 DFD: Decomposing Core Bubble</h3>
            <p className="text-xs text-slate-400">
              Focus on <strong>{problem.level2FocusBubble}</strong>: Exploding into fine-grained sub-processes until each can be written as a simple algorithm.
            </p>
          </div>

          <div className="space-y-3">
            {problem.level2SubBubbles.map((sb, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="font-bold text-amber-300 text-sm">{sb.id} {sb.name}</div>
                  <span className="text-[10px] text-slate-500 font-mono">Level 2 Sub-process</span>
                </div>
                <p className="text-slate-300 text-[11px] mb-2">{sb.description}</p>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-slate-900 p-2 rounded border border-slate-800/80">
                  <div><span className="text-slate-400">Inputs:</span> {sb.inputs.join(', ')}</div>
                  <div><span className="text-slate-400">Outputs:</span> {sb.outputs.join(', ')}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-lg text-xs text-amber-300">
            <strong>Balancing Check:</strong> All inputs entering the parent bubble ({problem.level2FocusBubble}) enter this Level 2 cluster, and all generated outputs exit it. No data leaks or disappears!
          </div>
        </div>
      )}

      {activeStep === 4 && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="text-center">
            <h3 className="text-base font-bold text-purple-400">Data Dictionary & DFD Validation Checklist</h3>
            <p className="text-xs text-slate-400">Definitions of composite data items using standard algebraic notation.</p>
          </div>

          {problem.sampleDataDictionary && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
              <div className="text-slate-400 font-bold border-b border-slate-800 pb-1 font-sans">Data Dictionary Entries</div>
              {problem.sampleDataDictionary.map((dd, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between py-1 border-b border-slate-900 gap-1">
                  <span className="text-purple-300 font-bold">{dd.name}:</span>
                  <span className="text-slate-200">{dd.definition}</span>
                </div>
              ))}
            </div>
          )}

          {/* Validation Checklist */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">Checklist: What Makes this a High-Scoring DFD?</div>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Context Diagram:</strong> Exactly 1 bubble labeled with a noun; all external entities placed here only.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>3-to-7 Rule:</strong> Level 1 has {problem.level1.bubbles.length} bubbles (strictly between 3 and 7).</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Zero Control Flow:</strong> No arrows showing loops, execution order, or conditional decisions—strictly data in motion.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Strict Balancing:</strong> Every input and output matches across Level 0, Level 1, and Level 2.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
