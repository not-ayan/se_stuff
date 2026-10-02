import React, { useState } from 'react';
import { DFD_PROBLEMS } from '../data/dfdProblemsData';
import { DFDProblem } from '../types';
import { Network, Database, ArrowRight, CheckCircle, FileText, Split, Sparkles, Layers } from 'lucide-react';

export const DFDStudio: React.FC = () => {
  const [selectedProblemId, setSelectedProblemId] = useState<string>('tas-master');
  const [activeStep, setActiveStep] = useState<number>(0);

  const problem: DFDProblem = DFD_PROBLEMS.find(p => p.id === selectedProblemId) || DFD_PROBLEMS[0];

  return (
    <div className="space-y-6 text-ink">
      {/* Studio Header */}
      <div className="bg-surface border border-line rounded-2xl p-5 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-700">
                <Network className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold tracking-tight">Structured Analysis & DFD Practice Studio</h2>
            </div>
            <p className="text-xs text-subtle mt-1">
              Master Level 0, Level 1, and Level 2 Data Flow Diagrams with all 10 university examination problems.
            </p>
          </div>

          {/* Problem Selector Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-subtle font-medium">Select Problem:</label>
            <select
              value={selectedProblemId}
              onChange={e => {
                setSelectedProblemId(e.target.value);
                setActiveStep(0);
              }}
              className="bg-canvas border border-line-strong text-xs text-strong px-3 py-2 rounded-xl focus:outline-none focus:border-ink font-medium max-w-xs"
            >
              {DFD_PROBLEMS.map(p => (
                <option key={p.id} value={p.id}>
                  {p.problemNumber === 0 ? 'Master Example: TAS' : `Problem ${p.problemNumber}: ${p.systemName}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Problem title badge */}          <div className="mt-4 pt-4 border-t border-line flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm font-semibold text-cyan-700">
            {problem.title}
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 font-mono">
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
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                activeStep === idx ? 'border-ink bg-ink' : 'border-line bg-surface hover:border-line-strong'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono ${activeStep === idx ? 'text-white/60' : 'text-muted'}`}>{s.num}</span>
                <Icon className={`w-3.5 h-3.5 ${activeStep === idx ? 'text-white/70' : 'text-muted'}`} />
              </div>
              <div className={`text-xs font-bold mt-1 ${activeStep === idx ? 'text-paper' : 'text-strong'}`}>{s.title}</div>
            </button>
          );
        })}
      </div>

      {/* Main Requirement Text Box */}
      <div className="bg-surface border border-line p-4 rounded-xl text-xs text-body">
        <span className="text-[11px] font-semibold text-subtle block mb-1">Problem Statement Requirement</span>
        <p className="leading-relaxed whitespace-pre-line">{problem.requirement}</p>
      </div>

      {/* STEP CONTENT PANELS */}
      {activeStep === 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* External Entities */}
            <div className="p-4 rounded-xl bg-surface border border-line">
              <h3 className="text-[11px] font-semibold text-amber-700 mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> External Entities (Outside System)
              </h3>
              <div className="space-y-2">
                {problem.externalEntities.map((ent, i) => (
                  <div key={i} className="p-2.5 rounded bg-canvas border border-line text-xs">
                    <div className="font-bold text-ink">{ent.name}</div>
                    <div className="text-[11px] text-subtle mt-1">
                      <span className="text-emerald-700">&darr; Sends:</span> {ent.inputs.join(', ')}
                    </div>
                    {ent.outputs.length > 0 && (
                      <div className="text-[11px] text-subtle">
                        <span className="text-cyan-700">&uarr; Receives:</span> {ent.outputs.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Candidate Functions */}
            <div className="p-4 rounded-xl bg-surface border border-line">
              <h3 className="text-[11px] font-semibold text-emerald-700 mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Candidate Level 1 Functions
              </h3>
              <div className="space-y-2">
                {problem.candidateFunctions.map((fn, i) => (
                  <div key={i} className="p-2.5 rounded bg-canvas border border-line text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-ink">{fn.id} {fn.name}</span>
                      <span className="text-[10px] text-emerald-700 font-mono">Process</span>
                    </div>
                    <p className="text-[11px] text-body mt-1">{fn.description}</p>
                    <div className="text-[10px] text-muted mt-1 font-mono">Triggered by: {fn.triggeredBy}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Stores */}
            <div className="p-4 rounded-xl bg-surface border border-line">
              <h3 className="text-[11px] font-semibold text-purple-700 mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span> Persistent Data Stores
              </h3>
              <div className="space-y-1.5">
                {problem.dataStores.map((ds, i) => (
                  <div key={i} className="p-2 rounded bg-canvas border border-line text-xs flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                    <span className="font-mono text-strong">{ds}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeStep === 1 && (
        <div className="bg-surface p-6 rounded-2xl border border-line space-y-6">
          <div className="text-center">
            <h3 className="text-base font-bold text-cyan-700">Level 0 Context Diagram</h3>
            <p className="text-xs text-subtle">The entire system as exactly ONE central process bubble with external entities attached.</p>
          </div>

          {/* Context diagram visual representation */}
          <div className="flex flex-col items-center justify-center p-6 bg-canvas rounded-xl border border-line">
            <div className="w-48 h-48 rounded-full border-2 border-cyan-400 bg-cyan-50 flex flex-col items-center justify-center p-4 text-center shadow-lg relative my-8">
              <span className="text-xs font-mono text-cyan-700 font-bold mb-1">0</span>
              <span className="text-xs font-extrabold text-ink leading-tight">{problem.systemName}</span>
            </div>

            {/* Entities & Flow list */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
              {problem.externalEntities.map((ent, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-line-strong bg-surface text-xs">
                  <div className="font-bold text-amber-700">{ent.name} (External Entity)</div>
                  <div className="mt-2 space-y-1 text-[11px] text-body">
                    <div>&rarr; Input to system: <span className="font-mono text-emerald-700">{ent.inputs.join(', ')}</span></div>
                    {ent.outputs.length > 0 && (
                      <div>&larr; Output from system: <span className="font-mono text-cyan-700">{ent.outputs.join(', ')}</span></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-canvas border border-line text-xs text-body">
            <strong>Context Diagram Rules:</strong> Labeled with a single <strong>Noun</strong> (the software name). External entities appear HERE and nowhere else in the entire DFD model!
          </div>
        </div>
      )}

      {activeStep === 2 && (
        <div className="bg-surface p-6 rounded-2xl border border-line space-y-4">
          <div className="text-center">
            <h3 className="text-base font-bold text-emerald-700">Level 1 Data Flow Diagram (Factored Bubbles)</h3>
            <p className="text-xs text-subtle">Decomposition of context bubble into {problem.level1.bubbles.length} major functional bubbles (comfortably within 3-7 rule).</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {problem.level1.bubbles.map((b, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-canvas border border-line text-xs space-y-2">
                <div className="flex items-center justify-between border-b border-line pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-700 flex items-center justify-center font-mono font-bold text-[11px]">
                      {b.id}
                    </span>
                    <span className="font-bold text-ink text-sm">{b.name}</span>
                  </div>
                  <span className="text-[10px] text-muted font-mono">Level 1 Process</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-subtle block font-semibold">&darr; Data Inflows:</span>
                    <span className="font-mono text-cyan-700">{b.inputs.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-subtle block font-semibold">&uarr; Data Outflows:</span>
                    <span className="font-mono text-emerald-700">{b.outputs.join(', ')}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-line text-[11px] text-subtle">
                  <div>Reads store: <span className="font-mono text-purple-700">{b.readsFrom.join(', ') || 'None'}</span></div>
                  <div>Writes store: <span className="font-mono text-purple-700">{b.writesTo.join(', ') || 'None'}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeStep === 3 && (
        <div className="bg-surface p-6 rounded-2xl border border-line space-y-4">
          <div className="text-center">
            <h3 className="text-base font-bold text-amber-700">Level 2 DFD: Decomposing Core Bubble</h3>
            <p className="text-xs text-subtle">
              Focus on <strong>{problem.level2FocusBubble}</strong>: Exploding into fine-grained sub-processes until each can be written as a simple algorithm.
            </p>
          </div>

          <div className="space-y-3">
            {problem.level2SubBubbles.map((sb, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-canvas border border-line text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="font-bold text-amber-700 text-sm">{sb.id} {sb.name}</div>
                  <span className="text-[10px] text-muted font-mono">Level 2 Sub-process</span>
                </div>
                <p className="text-body text-[11px] mb-2">{sb.description}</p>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-surface p-2 rounded border border-line">
                  <div><span className="text-subtle">Inputs:</span> {sb.inputs.join(', ')}</div>
                  <div><span className="text-subtle">Outputs:</span> {sb.outputs.join(', ')}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
            <strong>Balancing Check:</strong> All inputs entering the parent bubble ({problem.level2FocusBubble}) enter this Level 2 cluster, and all generated outputs exit it. No data leaks or disappears!
          </div>
        </div>
      )}

      {activeStep === 4 && (
        <div className="bg-surface p-6 rounded-2xl border border-line space-y-4">
          <div className="text-center">
            <h3 className="text-base font-bold text-purple-700">Data Dictionary & DFD Validation Checklist</h3>
            <p className="text-xs text-subtle">Definitions of composite data items using standard algebraic notation.</p>
          </div>

          {problem.sampleDataDictionary && (
            <div className="bg-canvas p-4 rounded-xl border border-line font-mono text-xs space-y-2">
              <div className="text-subtle font-bold border-b border-line pb-1 font-sans">Data Dictionary Entries</div>
              {problem.sampleDataDictionary.map((dd, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between py-1 border-b border-line gap-1">
                  <span className="text-purple-700 font-bold">{dd.name}:</span>
                  <span className="text-strong">{dd.definition}</span>
                </div>
              ))}
            </div>
          )}

          {/* Validation Checklist */}
          <div className="p-4 rounded-xl bg-canvas border border-line">
            <div className="text-[11px] font-semibold text-emerald-700 mb-2">Checklist: What Makes this a High-Scoring DFD?</div>
            <div className="space-y-2 text-xs text-body">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span><strong>Context Diagram:</strong> Exactly 1 bubble labeled with a noun; all external entities placed here only.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span><strong>3-to-7 Rule:</strong> Level 1 has {problem.level1.bubbles.length} bubbles (strictly between 3 and 7).</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span><strong>Zero Control Flow:</strong> No arrows showing loops, execution order, or conditional decisions—strictly data in motion.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span><strong>Strict Balancing:</strong> Every input and output matches across Level 0, Level 1, and Level 2.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
