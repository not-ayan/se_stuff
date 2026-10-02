import React, { useState } from 'react';
import { Layers, ZoomIn, ZoomOut, RotateCcw, Info, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';

interface DiagramViewerProps {
  type: string;
  title?: string;
}

export const DiagramViewer: React.FC<DiagramViewerProps> = ({ type, title }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);

  const resetZoom = () => setZoom(1);
  const zoomIn = () => setZoom(prev => Math.min(prev + 0.15, 1.6));
  const zoomOut = () => setZoom(prev => Math.max(prev - 0.15, 0.7));

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-xl overflow-hidden shadow-2xl my-4 text-slate-100">
      {/* Header toolbar */}
      <div className="bg-slate-800/90 px-4 py-3 border-b border-slate-700 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
            <Layers className="w-4 h-4" />
          </span>
          <span className="text-sm font-semibold text-slate-200">
            {title || 'Deep Learning Architecture Diagram'}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">
            Interactive Visualizer
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 text-slate-400 bg-slate-950/60 p-1 rounded-lg border border-slate-800">
          <button onClick={zoomOut} title="Zoom Out" className="p-1 hover:text-white hover:bg-slate-800 rounded">
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] px-1 font-mono">{Math.round(zoom * 100)}%</span>
          <button onClick={zoomIn} title="Zoom In" className="p-1 hover:text-white hover:bg-slate-800 rounded">
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button onClick={resetZoom} title="Reset" className="p-1 hover:text-white hover:bg-slate-800 rounded ml-1">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Diagram Canvas */}
      <div className="p-4 sm:p-6 overflow-x-auto flex justify-center items-center min-h-[320px] bg-slate-950/80">
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'center center', transition: 'transform 0.2s ease' }} className="w-full max-w-3xl">
          {renderDiagramContent(type, activeTab, setActiveTab)}
        </div>
      </div>
    </div>
  );
};

function renderDiagramContent(type: string, activeTab: number, setActiveTab: (i: number) => void) {
  switch (type) {
    case 'waterfall_effort':
      return (
        <div className="space-y-6">
          <div className="text-center mb-2">
            <h4 className="text-sm font-semibold text-indigo-300">Classical Waterfall 6-Phase Pipeline & Effort Distribution</h4>
            <p className="text-xs text-slate-400">Notice that Maintenance dominates the overall life cycle (40:60 ratio), and Testing dominates the development phase (~18%).</p>
          </div>

          {/* Sequential Phases */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
            {[
              { num: '1', name: 'Feasibility Study', color: 'from-blue-600 to-blue-700', effort: '5%' },
              { num: '2', name: 'Requirements (SRS)', color: 'from-cyan-600 to-cyan-700', effort: '10%' },
              { num: '3', name: 'Design (High & Detail)', color: 'from-teal-600 to-teal-700', effort: '12%' },
              { num: '4', name: 'Coding & Unit Test', color: 'from-amber-600 to-amber-700', effort: '15%' },
              { num: '5', name: 'Integration & System', color: 'from-rose-600 to-rose-700', effort: '18% (Max in Dev)' },
              { num: '6', name: 'Maintenance', color: 'from-purple-600 to-purple-700', effort: '40% (Max overall)' },
            ].map((p, idx) => (
              <div key={idx} className={`p-3 rounded-lg bg-gradient-to-b ${p.color} text-white shadow-lg text-center flex flex-col justify-between border border-white/10 relative`}>
                <div className="text-[10px] font-mono opacity-80">PHASE {p.num}</div>
                <div className="text-xs font-bold my-1 leading-snug">{p.name}</div>
                <div className="mt-2 text-[10px] bg-black/30 py-0.5 rounded font-mono font-semibold">{p.effort}</div>
              </div>
            ))}
          </div>

          {/* Effort Bar Breakdown */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
              <span>Development vs Maintenance Split</span>
              <span className="text-emerald-400 font-mono">Development 40% | Maintenance 60%</span>
            </div>
            <div className="w-full h-7 rounded-lg overflow-hidden flex bg-slate-800 border border-slate-700 font-mono text-[11px] text-white font-bold leading-7 text-center">
              <div style={{ width: '40%' }} className="bg-blue-600 hover:bg-blue-500 transition-colors">Dev (40%)</div>
              <div style={{ width: '60%' }} className="bg-purple-600 hover:bg-purple-500 transition-colors">Maintenance (60%)</div>
            </div>
          </div>
        </div>
      );

    case 'iterative_waterfall':
      return (
        <div className="space-y-4">
          <div className="text-center">
            <h4 className="text-sm font-semibold text-emerald-400">Iterative Waterfall with Feedback Loops & Phase Containment</h4>
            <p className="text-xs text-slate-400">When an error is detected in testing, feedback paths return directly to requirements or design.</p>
          </div>
          <div className="relative border border-slate-800 rounded-xl p-4 bg-slate-900/60">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
              {[
                { name: 'Feasibility', id: '1' },
                { name: 'SRS Document', id: '2', alert: 'Retail Banking limit ambiguity caught here' },
                { name: 'Design (H & L)', id: '3' },
                { name: 'Coding', id: '4' },
                { name: 'System Testing', id: '5', feedbackOrigin: true },
                { name: 'Maintenance', id: '6' },
              ].map((step, i) => (
                <div key={i} className={`p-3 rounded-lg border flex-1 w-full ${step.feedbackOrigin ? 'border-amber-500/80 bg-amber-950/30' : 'border-slate-700 bg-slate-800/80'}`}>
                  <div className="text-[10px] text-slate-400">Step {step.id}</div>
                  <div className="text-xs font-bold text-slate-100">{step.name}</div>
                  {step.feedbackOrigin && (
                    <div className="mt-1 text-[10px] text-amber-400 flex items-center justify-center gap-1 font-semibold">
                      <AlertTriangle className="w-3 h-3" /> Defect Found
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Feedback Return Indicator */}
            <div className="mt-4 p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-lg flex items-center justify-between text-xs text-indigo-300">
              <span className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-emerald-400 animate-spin" />
                <strong>Feedback Loop:</strong> Testing (Step 5) detects ambiguity $\to$ roll back to SRS (Step 2) $\to$ update Design (3) & Code (4) only.
              </span>
              <span className="text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-1 rounded border border-emerald-800">
                Phase Containment of Errors
              </span>
            </div>
          </div>
        </div>
      );

    case 'spiral_quadrants':
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-amber-400">Barry Boehm\'s Spiral Model (4 Quadrants & Outward Risk Loops)</h4>
              <p className="text-xs text-slate-400">Select a loop to see how risk determines the next development cycle.</p>
            </div>
            <div className="flex gap-1">
              {['Loop 1: Feasibility', 'Loop 2: Requirements', 'Loop 3: Design', 'Loop 4: Build & Test'].map((loopName, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-2.5 py-1 text-xs rounded-md transition-all font-medium ${activeTab === idx ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  L{idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Quadrant 1 */}
            <div className="p-3 rounded-lg border border-blue-500/30 bg-blue-950/20">
              <div className="text-xs font-bold text-blue-400 mb-1">QUADRANT 1: OBJECTIVE SETTING</div>
              <p className="text-xs text-slate-300">
                {activeTab === 0 && 'Objective: Determine if 5,000 students can take online exam simultaneously within budget.'}
                {activeTab === 1 && 'Objective: Elicit exact system behavior (autosave, disconnect rules, faculty download).'}
                {activeTab === 2 && 'Objective: Choose a reliable server architecture to survive peak concurrent load.'}
                {activeTab === 3 && 'Objective: Construct, integrate, and security-test the complete exam system.'}
              </p>
            </div>

            {/* Quadrant 2 */}
            <div className="p-3 rounded-lg border border-rose-500/30 bg-rose-950/20">
              <div className="text-xs font-bold text-rose-400 mb-1">QUADRANT 2: RISK ASSESSMENT & REDUCTION</div>
              <p className="text-xs text-slate-300">
                {activeTab === 0 && 'Biggest Risk: Server crash under 5,000 load. Solution: Run load test with 500 simulated users.'}
                {activeTab === 1 && 'Biggest Risk: Disconnect rules confusion. Solution: Build interactive UI prototype for faculty.'}
                {activeTab === 2 && 'Biggest Risk: Single point of failure. Solution: Evaluate load-balanced cloud clusters.'}
                {activeTab === 3 && 'Biggest Risk: Cheating & DB locks. Solution: Penetration testing & database stress scripts.'}
              </p>
            </div>

            {/* Quadrant 3 */}
            <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-950/20">
              <div className="text-xs font-bold text-emerald-400 mb-1">QUADRANT 3: DEVELOPMENT & VALIDATION</div>
              <p className="text-xs text-slate-300">
                {activeTab === 0 && 'Output: Technical experiment and load test report proving feasibility.'}
                {activeTab === 1 && 'Output: Validated SRS document and approved workflow prototype.'}
                {activeTab === 2 && 'Output: Validated cloud architecture and system design specification.'}
                {activeTab === 3 && 'Output: Tested, operational software product ready for deployment.'}
              </p>
            </div>

            {/* Quadrant 4 */}
            <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-950/20">
              <div className="text-xs font-bold text-amber-400 mb-1">QUADRANT 4: REVIEW & PLANNING</div>
              <p className="text-xs text-slate-300">
                {activeTab === 0 && 'Decision: University approves feasibility report; commit budget to Loop 2 (Requirements).'}
                {activeTab === 1 && 'Decision: Requirements clear; proceed to Loop 3 (Architecture Design).'}
                {activeTab === 2 && 'Decision: Architecture approved; authorize full-scale coding for Loop 4.'}
                {activeTab === 3 && 'Decision: Customer evaluates system, plans rollout and maintenance loop.'}
              </p>
            </div>
          </div>

          <div className="text-center p-2 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <span className="text-blue-400">Waterfall: Phase-driven</span> | <span className="text-emerald-400">Evolutionary: Release-driven</span> | <span className="text-amber-400 font-bold">Spiral: Risk-driven</span>
          </div>
        </div>
      );

    case 'cohesion_coupling_ladders':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cohesion ladder */}
          <div className="border border-slate-800 rounded-xl p-4 bg-slate-900/60">
            <div className="text-xs font-bold text-emerald-400 mb-2 flex items-center justify-between">
              <span>Cohesion Spectrum (Functional Strength)</span>
              <span className="text-[10px] text-slate-400">Worst $\to$ Best</span>
            </div>
            <div className="space-y-1.5 font-mono text-xs">
              {[
                { name: '1. Coincidental', level: 'Worst', color: 'bg-red-950/80 text-red-300 border-red-800', eg: 'logError() + readFile() + openSocket()' },
                { name: '2. Logical', level: 'Poor', color: 'bg-orange-950/80 text-orange-300 border-orange-800', eg: 'ioHandler(kind) -> file/kbd/net' },
                { name: '3. Temporal', level: 'Low', color: 'bg-amber-950/80 text-amber-300 border-amber-800', eg: 'startup() -> initVars + openConn' },
                { name: '4. Procedural', level: 'Moderate', color: 'bg-yellow-950/80 text-yellow-300 border-yellow-800', eg: 'decode() -> parseHeader + checksum' },
                { name: '5. Communicational', level: 'Fair', color: 'bg-cyan-950/80 text-cyan-300 border-cyan-800', eg: 'useStack() -> push + pop on same stack' },
                { name: '6. Sequential', level: 'Good', color: 'bg-teal-950/80 text-teal-300 border-teal-800', eg: 'pipeline: sort() -> search() -> display()' },
                { name: '7. Functional', level: 'BEST', color: 'bg-emerald-950/80 text-emerald-300 border-emerald-500 font-bold', eg: 'computeOvertimePay(employee)' }
              ].map((c, i) => (
                <div key={i} className={`p-2 rounded border ${c.color} flex justify-between items-center text-[11px]`}>
                  <div>
                    <span className="font-semibold">{c.name}</span>
                    <div className="text-[10px] text-slate-400 font-sans">{c.eg}</div>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40">{c.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coupling ladder */}
          <div className="border border-slate-800 rounded-xl p-4 bg-slate-900/60">
            <div className="text-xs font-bold text-indigo-400 mb-2 flex items-center justify-between">
              <span>Coupling Spectrum (Interdependence)</span>
              <span className="text-[10px] text-slate-400">Best $\to$ Worst</span>
            </div>
            <div className="space-y-2 font-mono text-xs">
              {[
                { name: '1. Data Coupling', level: 'BEST (Loosest)', color: 'bg-emerald-950/80 text-emerald-300 border-emerald-500', eg: 'Passing elementary int amount' },
                { name: '2. Stamp Coupling', level: 'Acceptable', color: 'bg-teal-950/80 text-teal-300 border-teal-800', eg: 'Passing whole Order record just for total' },
                { name: '3. Control Coupling', level: 'Caution', color: 'bg-amber-950/80 text-amber-300 border-amber-800', eg: 'Passing isRushOrder flag to steer internal branch' },
                { name: '4. Common Coupling', level: 'Bad', color: 'bg-orange-950/80 text-orange-300 border-orange-800', eg: 'Two modules mutating global inventoryCount' },
                { name: '5. Content Coupling', level: 'DEFECT (Tightest)', color: 'bg-red-950/80 text-red-300 border-red-800 font-bold', eg: 'goto into another module\'s internal code' }
              ].map((cp, idx) => (
                <div key={idx} className={`p-2 rounded border ${cp.color} flex justify-between items-center text-[11px]`}>
                  <div>
                    <span className="font-semibold">{cp.name}</span>
                    <div className="text-[10px] text-slate-400 font-sans">{cp.eg}</div>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40">{cp.level}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 text-[11px] text-slate-300 bg-slate-800/80 p-2 rounded border border-slate-700">
              <strong>Golden Rule:</strong> Aim for <em>High Cohesion + Low Coupling</em> = <strong>Functional Independence</strong>.
            </div>
          </div>
        </div>
      );

    case 'cfg_cyclomatic':
      return (
        <div className="space-y-4">
          <div className="text-center">
            <h4 className="text-sm font-semibold text-cyan-400">Control Flow Graph (CFG) & Cyclomatic Complexity Calculation</h4>
            <p className="text-xs text-slate-400">Demonstrating McCabe\'s 3 equivalent formulas on Euclid\'s GCD Algorithm.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Program Code & CFG representation */}
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-xs">
              <div className="text-slate-400 border-b border-slate-800 pb-1 mb-2 font-sans font-semibold">Euclid GCD Algorithm</div>
              <div className="text-slate-300 leading-relaxed">
                <div>int compute_gcd(int x, int y) &#123;</div>
                <div className="text-cyan-400 font-bold pl-2">1: while (x != y) &#123;</div>
                <div className="text-amber-400 font-bold pl-4">2:   if (x &gt; y)</div>
                <div className="pl-6 text-emerald-400">3:     x = x - y;</div>
                <div className="text-amber-400 font-bold pl-4">     else</div>
                <div className="pl-6 text-emerald-400">4:     y = y - x;</div>
                <div className="text-cyan-400 font-bold pl-2">5: &#125;</div>
                <div className="text-indigo-400 font-bold pl-2">6: return x;</div>
                <div>&#125;</div>
              </div>
            </div>

            {/* 3 Calculation Methods */}
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-xs font-bold text-indigo-400">Method 1: Graph Theoretic Formula</div>
                <div className="text-xs font-mono text-slate-200 mt-1">
                  V(G) = E - N + 2 = 7 - 6 + 2 = <span className="text-emerald-400 font-bold text-sm">3</span>
                </div>
                <div className="text-[10px] text-slate-400">Nodes N = 6 statements, Edges E = 7 control links.</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-xs font-bold text-teal-400">Method 2: Planar Bounded Areas</div>
                <div className="text-xs font-mono text-slate-200 mt-1">
                  V(G) = Bounded Regions + 1 = 2 + 1 = <span className="text-emerald-400 font-bold text-sm">3</span>
                </div>
                <div className="text-[10px] text-slate-400">Enclosed loops inside graph = 2 + outer area.</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-xs font-bold text-amber-400">Method 3: Predicate / Decision Points</div>
                <div className="text-xs font-mono text-slate-200 mt-1">
                  V(G) = Decision Statements + 1 = 2 + 1 = <span className="text-emerald-400 font-bold text-sm">3</span>
                </div>
                <div className="text-[10px] text-slate-400">Two decisions: `while(x != y)` and `if(x &gt; y)`.</div>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300">
            <strong>Linearly Independent Paths (Basis Set = 3):</strong><br />
            1. <code>1 -&gt; 6</code> (When x == y initially)<br />
            2. <code>1 -&gt; 2 -&gt; 3 -&gt; 5 -&gt; 1 -&gt; 6</code> (When x &gt; y)<br />
            3. <code>1 -&gt; 2 -&gt; 4 -&gt; 5 -&gt; 1 -&gt; 6</code> (When x &lt; y)
          </div>
        </div>
      );

    case 'bathtub_software_curve':
      return (
        <div className="space-y-4">
          <div className="text-center">
            <h4 className="text-sm font-semibold text-rose-400">Hardware Bathtub Curve vs. Software Failure Curve</h4>
            <p className="text-xs text-slate-400">Why software reliability engineering is fundamentally different from hardware.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900 text-xs">
              <div className="font-bold text-blue-400 mb-2">Hardware: Physical Bathtub Curve</div>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside text-[11px]">
                <li><strong>Burn-in:</strong> High initial failures from manufacturing flaws.</li>
                <li><strong>Useful Life:</strong> Low, steady failure rate.</li>
                <li><strong>Wear-Out:</strong> Failure rate skyrockets due to physical fatigue and aging.</li>
                <li><strong>Repairs:</strong> Restores pre-failure baseline stability.</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900 text-xs">
              <div className="font-bold text-emerald-400 mb-2">Software: Step-Function Curve</div>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside text-[11px]">
                <li><strong>No Wear-Out:</strong> Software does not experience physical friction or aging.</li>
                <li><strong>Testing Drops:</strong> Highest failure rate during integration, dropping as bugs are removed.</li>
                <li><strong>Repairs:</strong> Can improve reliability OR degrade it if new bugs are introduced.</li>
                <li><strong>Goal:</strong> Reliability Growth (increasing inter-failure times).</li>
              </ul>
            </div>
          </div>
        </div>
      );

    case 'cmm_pyramid':
      return (
        <div className="space-y-3">
          <div className="text-center">
            <h4 className="text-sm font-semibold text-purple-400">SEI Capability Maturity Model (CMM) 5 Levels & KPAs</h4>
            <p className="text-xs text-slate-400">Gradual process improvement from chaotic individual heroics to continuous optimization.</p>
          </div>
          <div className="flex flex-col gap-1.5 max-w-xl mx-auto">
            {[
              { lvl: '5', name: 'Optimizing', focus: 'Continuous Process Improvement', kpa: 'Defect prevention, Process & Technology change management', color: 'bg-emerald-600/90 text-white' },
              { lvl: '4', name: 'Managed', focus: 'Product & Process Quality', kpa: 'Quantitative process metrics, Software quality management', color: 'bg-teal-600/90 text-white' },
              { lvl: '3', name: 'Defined', focus: 'Process Standardization (ISO 9001)', kpa: 'Organization process definition, Training program, Peer reviews', color: 'bg-blue-600/90 text-white' },
              { lvl: '2', name: 'Repeatable', focus: 'Project Management Discipline', kpa: 'Project planning, SCM, Subcontract management, Tracking', color: 'bg-amber-600/90 text-white' },
              { lvl: '1', name: 'Initial', focus: 'Competent People / Heroics', kpa: 'Ad hoc, chaotic, no defined processes. Dependent on individual heroics.', color: 'bg-rose-700/90 text-white' },
            ].map((l, i) => (
              <div key={i} className={`p-2.5 rounded-lg ${l.color} shadow flex justify-between items-center text-xs`}>
                <div>
                  <span className="font-mono font-bold mr-2 bg-black/30 px-1.5 py-0.5 rounded">LEVEL {l.lvl}</span>
                  <span className="font-bold">{l.name}</span>
                  <span className="text-[10px] opacity-90 block font-sans">{l.focus}</span>
                </div>
                <div className="text-[10px] text-right max-w-xs font-mono opacity-90 hidden sm:block">
                  KPAs: {l.kpa}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center text-xs text-slate-400 font-mono">
            *ISO 9001 roughly maps to CMM Level 3. Levels cannot be skipped!
          </div>
        </div>
      );

    default:
      return (
        <div className="text-center py-8 text-slate-400 text-xs">
          Interactive diagram renderer for <code>{type}</code> is active.
        </div>
      );
  }
}
