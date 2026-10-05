import React, { useState } from 'react';
import {
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Info,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Wrench,
  Bug,
  FileCheck,
  Database,
  Play,
  Sparkles,
} from 'lucide-react';

/** Diagram types that have a bespoke renderer below. */
export const SUPPORTED_DIAGRAM_TYPES = new Set([
  'rtm_traceability',
  'waterfall_effort',
  'iterative_waterfall',
  'maintainability_portability',
  'decision_tree_table',
  'fod_vs_ood',
  'testing_pyramid_drivers_stubs',
  'spiral_quadrants',
  'cohesion_coupling_ladders',
  'cfg_cyclomatic',
  'bathtub_software_curve',
  'cmm_pyramid',
]);

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
    <div className="bg-surface border border-line-strong rounded-2xl overflow-hidden shadow-card my-4 text-ink">
      {/* Header toolbar */}
      <div className="bg-canvas px-4 py-3 border-b border-line flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-700">
            <Layers className="w-4 h-4" />
          </span>
          <span className="text-sm font-semibold text-strong">
            {title || 'Deep Learning Architecture Diagram'}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 font-medium">
            Interactive Visualizer
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 text-subtle bg-canvas p-1 rounded-lg border border-line">
          <button onClick={zoomOut} title="Zoom Out" className="p-1 hover:text-ink hover:bg-line rounded">
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] px-1 font-mono">{Math.round(zoom * 100)}%</span>
          <button onClick={zoomIn} title="Zoom In" className="p-1 hover:text-ink hover:bg-line rounded">
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button onClick={resetZoom} title="Reset" className="p-1 hover:text-ink hover:bg-line rounded ml-1">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Diagram Canvas */}
      <div className="p-4 sm:p-6 overflow-x-auto flex justify-center items-center min-h-[320px] bg-canvas">
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'center center', transition: 'transform 0.2s ease' }} className="w-full max-w-3xl">
          {renderDiagramContent(type, activeTab, setActiveTab)}
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   Mid-Term Syllabus Custom Interactive Visualizers
   ========================================================================== */

const RtmTraceabilityDiagram: React.FC = () => {
  const [selectedReqIndex, setSelectedReqIndex] = useState<number>(0);
  const [mode, setMode] = useState<'forward' | 'backward'>('forward');

  const requirements = [
    {
      id: 'REQ-101',
      name: 'Biometric MFA Login',
      srs: 'SRS-AUTH-04',
      design: 'MOD_AuthService',
      code: 'auth_biometrics.ts (L45-92)',
      test: 'TC_AUTH_MFA_001',
      status: 'verified',
    },
    {
      id: 'REQ-102',
      name: 'Instant Fund Transfer',
      srs: 'SRS-TX-12',
      design: 'MOD_TransferEngine',
      code: 'tx_engine.ts (L110-184)',
      test: 'TC_TX_INSTANT_014',
      status: 'verified',
    },
    {
      id: 'REQ-103',
      name: 'Regulatory Audit Logger',
      srs: 'SRS-AUDIT-01',
      design: 'MOD_AuditHook',
      code: 'audit_vault.ts (L20-75)',
      test: 'TC_AUDIT_IMMUTABLE_003',
      status: 'verified',
    },
  ];

  const selectedReq = requirements[selectedReqIndex];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-line pb-3">
        <div>
          <h4 className="text-sm font-semibold text-indigo-700 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-indigo-600" />
            Requirements Traceability Matrix (RTM)
          </h4>
          <p className="text-xs text-subtle">
            Bidirectional auditability: Forward (completeness & impact) vs. Backward (gold-plating prevention).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-line rounded-lg p-0.5 text-xs font-medium">
            <button
              onClick={() => setMode('forward')}
              className={`px-2 py-1 rounded-md transition-all ${
                mode === 'forward' ? 'bg-paper text-ink shadow-sm font-bold' : 'text-subtle hover:text-ink'
              }`}
            >
              Forward $\to$
            </button>
            <button
              onClick={() => setMode('backward')}
              className={`px-2 py-1 rounded-md transition-all ${
                mode === 'backward' ? 'bg-paper text-ink shadow-sm font-bold' : 'text-subtle hover:text-ink'
              }`}
            >
              $\leftarrow$ Backward
            </button>
          </div>
          <div className="flex gap-1">
            {requirements.map((r, i) => (
              <button
                key={r.id}
                onClick={() => setSelectedReqIndex(i)}
                className={`px-2 py-1 text-xs rounded-md font-mono transition-all ${
                  selectedReqIndex === i
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'bg-line text-body hover:bg-line-strong'
                }`}
              >
                {r.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Traceability Flow Stages */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
        <div className={`p-3 rounded-xl border transition-all ${mode === 'forward' ? 'border-indigo-400 bg-indigo-50/80 shadow-sm' : 'border-line bg-surface'}`}>
          <span className="text-[10px] font-mono text-indigo-700 font-semibold block uppercase">1. User Requirement</span>
          <div className="font-bold text-ink mt-1">{selectedReq.id}</div>
          <div className="text-[11px] text-subtle mt-0.5">{selectedReq.name}</div>
        </div>

        <div className="flex items-center justify-center -my-2 sm:my-0 text-indigo-400">
          <ArrowRight className={`w-4 h-4 transition-transform ${mode === 'backward' ? 'rotate-180' : ''}`} />
        </div>

        <div className="p-3 rounded-xl border border-cyan-200 bg-cyan-50/70">
          <span className="text-[10px] font-mono text-cyan-700 font-semibold block uppercase">2. SRS Specification</span>
          <div className="font-bold text-ink mt-1 font-mono">{selectedReq.srs}</div>
          <div className="text-[11px] text-subtle mt-0.5">Black-Box Contract</div>
        </div>

        <div className="flex items-center justify-center -my-2 sm:my-0 text-cyan-400">
          <ArrowRight className={`w-4 h-4 transition-transform ${mode === 'backward' ? 'rotate-180' : ''}`} />
        </div>

        <div className="p-3 rounded-xl border border-purple-200 bg-purple-50/70">
          <span className="text-[10px] font-mono text-purple-700 font-semibold block uppercase">3. Design Module</span>
          <div className="font-bold text-ink mt-1 font-mono">{selectedReq.design}</div>
          <div className="text-[11px] text-subtle mt-0.5">High/Low Level Arch</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
        <div className="sm:col-start-2 p-3 rounded-xl border border-amber-200 bg-amber-50/70">
          <span className="text-[10px] font-mono text-amber-700 font-semibold block uppercase">4. Code Implementation</span>
          <div className="font-bold text-ink mt-1 font-mono text-[11px]">{selectedReq.code}</div>
          <div className="text-[11px] text-subtle mt-0.5">Unit Source</div>
        </div>

        <div className="flex items-center justify-center -my-2 sm:my-0 text-amber-400">
          <ArrowRight className={`w-4 h-4 transition-transform ${mode === 'backward' ? 'rotate-180' : ''}`} />
        </div>

        <div className={`p-3 rounded-xl border transition-all ${mode === 'backward' ? 'border-emerald-400 bg-emerald-50/80 shadow-sm' : 'border-line bg-surface'}`}>
          <span className="text-[10px] font-mono text-emerald-700 font-semibold block uppercase">5. Verification Test Case</span>
          <div className="font-bold text-ink mt-1 font-mono text-[11px]">{selectedReq.test}</div>
          <div className="text-[11px] text-emerald-700 font-medium flex items-center justify-center gap-1 mt-0.5">
            <CheckCircle2 className="w-3 h-3" /> Fully Covered
          </div>
        </div>
      </div>

      {/* Traceability Principles Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        <div className={`p-3 rounded-xl border text-xs transition-colors ${mode === 'forward' ? 'border-indigo-400 bg-indigo-50/40' : 'border-line bg-surface'}`}>
          <strong className="text-indigo-700 flex items-center gap-1.5 mb-1">
            <ArrowRight className="w-3.5 h-3.5" /> Forward Traceability (Impact Analysis)
          </strong>
          <p className="text-subtle text-[11.5px] leading-relaxed">
            Traces each user requirement forward to SRS, design, code, and test cases. Ensures <em>completeness</em>: not a single customer requirement is dropped or forgotten during construction.
          </p>
        </div>
        <div className={`p-3 rounded-xl border text-xs transition-colors ${mode === 'backward' ? 'border-rose-400 bg-rose-50/40' : 'border-line bg-surface'}`}>
          <strong className="text-rose-700 flex items-center gap-1.5 mb-1">
            <RotateCcw className="w-3.5 h-3.5" /> Backward Traceability (Scope & Gold-Plating)
          </strong>
          <p className="text-subtle text-[11.5px] leading-relaxed">
            Traces every line of code and test case back to a valid requirement. Prevents <em>gold-plating</em> (developer-added unrequested features) and guarantees auditability.
          </p>
        </div>
      </div>
    </div>
  );
};

const MaintainabilityPortabilityDiagram: React.FC = () => {
  const [platform, setPlatform] = useState<'x86' | 'arm' | 'rtos'>('x86');

  return (
    <div className="space-y-4">
      <div className="text-center mb-1">
        <h4 className="text-sm font-semibold text-emerald-700 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Software Quality Factors: Maintainability & Portability
        </h4>
        <p className="text-xs text-subtle">
          Two central quality pillars from Chapter 1: Economics of change & Hardware Abstraction.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Maintainability Panel */}
        <div className="bg-surface p-4 rounded-xl border border-line flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">
                1. Maintainability (40:60 Economics)
              </span>
              <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded">
                ~60% of Lifecycle Effort
              </span>
            </div>
            <p className="text-xs text-subtle mb-3">
              Maintainability is the ease with which software can be understood, corrected, adapted, and enhanced.
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-canvas border border-line">
                <strong className="text-ink">Pillar A · Understandability:</strong>
                <p className="text-[11px] text-subtle mt-0.5">
                  Clean naming, modularity, and internal documentation. Meaningful identifiers reduce comprehension time by &gt;50%.
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-canvas border border-line">
                <strong className="text-ink">Pillar B · Modifiability:</strong>
                <p className="text-[11px] text-subtle mt-0.5">
                  High cohesion and low coupling localize changes so editing one module never causes ripple-effect defects elsewhere.
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-canvas border border-line">
                <strong className="text-ink">Pillar C · Testability:</strong>
                <p className="text-[11px] text-subtle mt-0.5">
                  Modular design with observable outputs and controllable inputs allows automated regression suites to verify changes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Portability & HAL Panel */}
        <div className="bg-surface p-4 rounded-xl border border-line flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wide">
                2. Portability (Hardware Abstraction)
              </span>
              <span className="text-[10px] font-mono bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded">
                HAL Pattern
              </span>
            </div>
            <p className="text-xs text-subtle mb-3">
              Ease of transferring software from one OS/CPU architecture to another with zero changes to business logic.
            </p>

            {/* Platform Selector */}
            <div className="flex gap-1.5 mb-3">
              {(['x86', 'arm', 'rtos'] as const).map((plat) => (
                <button
                  key={plat}
                  onClick={() => setPlatform(plat)}
                  className={`flex-1 py-1.5 text-xs rounded-lg font-mono font-medium transition-all ${
                    platform === plat
                      ? 'bg-teal-600 text-white font-bold shadow-sm'
                      : 'bg-line text-body hover:bg-line-strong'
                  }`}
                >
                  {plat === 'x86' && 'Windows / x86'}
                  {plat === 'arm' && 'Linux / ARM64'}
                  {plat === 'rtos' && 'Embedded FreeRTOS'}
                </button>
              ))}
            </div>

            {/* HAL Layer Diagram */}
            <div className="space-y-1.5 text-center font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-emerald-600 text-white font-bold shadow">
                Application Business Logic (100% UNCHANGED)
              </div>
              <div className="p-2.5 rounded-lg bg-amber-500/90 text-white font-bold border-2 border-amber-600 animate-pulse">
                Hardware Abstraction Layer (HAL) / Portability Interface
                <div className="text-[10px] font-sans font-normal opacity-90 mt-0.5">
                  {platform === 'x86' && 'Adapts to Win32 API & x86-64 Memory Management'}
                  {platform === 'arm' && 'Adapts to POSIX syscalls & ARM NEON instructions'}
                  {platform === 'rtos' && 'Adapts to Bare-metal MMIO & Tick Timers'}
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-700 text-white font-medium">
                {platform === 'x86' && 'Underlying: Intel x86-64 CPU + Windows OS'}
                {platform === 'arm' && 'Underlying: Apple/ARM Cortex-A + Linux Kernel'}
                {platform === 'rtos' && 'Underlying: RISC-V / ARM Cortex-M + FreeRTOS'}
              </div>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-teal-800 bg-teal-50 border border-teal-200 p-2 rounded-lg">
            <strong>Portability Rule:</strong> By isolating platform-specific device drivers and OS syscalls inside a thin HAL, 95%+ of the codebase remains directly portable.
          </div>
        </div>
      </div>
    </div>
  );
};

const DecisionTreeTableDiagram: React.FC = () => {
  const [c1, setC1] = useState<boolean>(true); // Age >= 60
  const [c2, setC2] = useState<boolean>(false); // High Balance
  const [c3, setC3] = useState<boolean>(true); // Loyalty Member

  // Determine active rule index (0 to 7)
  const ruleIndex = (c1 ? 4 : 0) + (c2 ? 2 : 0) + (c3 ? 1 : 0);

  // Actions based on conditions
  const discount20 = c1 && (c2 || c3);
  const freeShipping = c2 || c3;
  const priorityService = c1 && c2;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-line pb-2">
        <div>
          <h4 className="text-sm font-semibold text-cyan-700 flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-600" />
            Formal Specification: Decision Tables ($2^k$ Rules) & Trees
          </h4>
          <p className="text-xs text-subtle">
            4-Quadrant formal representation for complex boolean logic. Toggle conditions to trigger rules in real-time.
          </p>
        </div>
        <div className="text-xs font-mono bg-cyan-50 text-cyan-700 px-2 py-1 rounded border border-cyan-200 font-semibold">
          3 Conditions $\implies 2^3 = 8$ Rules
        </div>
      </div>

      {/* Interactive Condition Toggles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-canvas p-3 rounded-xl border border-line">
        <button
          onClick={() => setC1(!c1)}
          className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
            c1 ? 'border-emerald-500 bg-emerald-50/70 font-semibold' : 'border-line bg-surface opacity-75'
          }`}
        >
          <div className="text-[10px] text-subtle font-mono">CONDITION 1</div>
          <div className="flex items-center justify-between mt-1">
            <span>C1: Senior Citizen (Age $\ge$ 60)</span>
            <span className={`px-1.5 py-0.5 rounded font-mono text-[10px] ${c1 ? 'bg-emerald-600 text-white' : 'bg-line text-subtle'}`}>
              {c1 ? 'TRUE (T)' : 'FALSE (F)'}
            </span>
          </div>
        </button>

        <button
          onClick={() => setC2(!c2)}
          className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
            c2 ? 'border-emerald-500 bg-emerald-50/70 font-semibold' : 'border-line bg-surface opacity-75'
          }`}
        >
          <div className="text-[10px] text-subtle font-mono">CONDITION 2</div>
          <div className="flex items-center justify-between mt-1">
            <span>C2: Balance $\ge$ $5,000</span>
            <span className={`px-1.5 py-0.5 rounded font-mono text-[10px] ${c2 ? 'bg-emerald-600 text-white' : 'bg-line text-subtle'}`}>
              {c2 ? 'TRUE (T)' : 'FALSE (F)'}
            </span>
          </div>
        </button>

        <button
          onClick={() => setC3(!c3)}
          className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
            c3 ? 'border-emerald-500 bg-emerald-50/70 font-semibold' : 'border-line bg-surface opacity-75'
          }`}
        >
          <div className="text-[10px] text-subtle font-mono">CONDITION 3</div>
          <div className="flex items-center justify-between mt-1">
            <span>C3: Loyalty Club Member</span>
            <span className={`px-1.5 py-0.5 rounded font-mono text-[10px] ${c3 ? 'bg-emerald-600 text-white' : 'bg-line text-subtle'}`}>
              {c3 ? 'TRUE (T)' : 'FALSE (F)'}
            </span>
          </div>
        </button>
      </div>

      {/* 4-Quadrant Decision Table Grid */}
      <div className="overflow-x-auto rounded-xl border border-line bg-surface">
        <table className="w-full text-xs text-center border-collapse">
          <thead>
            <tr className="bg-canvas border-b border-line text-[11px] font-mono">
              <th className="p-2 text-left text-subtle border-r border-line w-44">4 QUADRANTS</th>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((r) => (
                <th
                  key={r}
                  className={`p-2 font-bold ${
                    ruleIndex === r ? 'bg-indigo-600 text-white' : 'text-body'
                  }`}
                >
                  R{r + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Condition Stub & Entries (Top Quadrants) */}
            <tr className="border-b border-line/60">
              <td className="p-2 text-left font-medium text-ink bg-canvas/40 border-r border-line">
                <span className="text-[10px] font-mono text-cyan-700 block">Condition Stub</span>
                C1: Senior Citizen
              </td>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((r) => {
                const isT = r >= 4;
                return (
                  <td key={r} className={`p-2 font-mono ${ruleIndex === r ? 'bg-indigo-50 font-bold text-indigo-700' : ''}`}>
                    {isT ? 'T' : 'F'}
                  </td>
                );
              })}
            </tr>
            <tr className="border-b border-line/60">
              <td className="p-2 text-left font-medium text-ink bg-canvas/40 border-r border-line">
                C2: Balance $\ge$ $5,000
              </td>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((r) => {
                const isT = Math.floor(r / 2) % 2 === 1;
                return (
                  <td key={r} className={`p-2 font-mono ${ruleIndex === r ? 'bg-indigo-50 font-bold text-indigo-700' : ''}`}>
                    {isT ? 'T' : 'F'}
                  </td>
                );
              })}
            </tr>
            <tr className="border-b-2 border-line-strong">
              <td className="p-2 text-left font-medium text-ink bg-canvas/40 border-r border-line">
                C3: Loyalty Member
              </td>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((r) => {
                const isT = r % 2 === 1;
                return (
                  <td key={r} className={`p-2 font-mono ${ruleIndex === r ? 'bg-indigo-50 font-bold text-indigo-700' : ''}`}>
                    {isT ? 'T' : 'F'}
                  </td>
                );
              })}
            </tr>

            {/* Action Stub & Entries (Bottom Quadrants) */}
            <tr className="border-b border-line/60 bg-emerald-50/20">
              <td className="p-2 text-left font-medium text-ink bg-canvas/40 border-r border-line">
                <span className="text-[10px] font-mono text-emerald-700 block">Action Stub</span>
                A1: Apply 20% Senior Discount
              </td>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((r) => {
                const isT1 = r >= 4;
                const isT2 = Math.floor(r / 2) % 2 === 1;
                const isT3 = r % 2 === 1;
                const acts = isT1 && (isT2 || isT3);
                return (
                  <td key={r} className={`p-2 font-mono font-bold ${ruleIndex === r ? 'bg-indigo-50 text-emerald-700' : 'text-subtle'}`}>
                    {acts ? 'X' : '-'}
                  </td>
                );
              })}
            </tr>
            <tr className="border-b border-line/60 bg-emerald-50/20">
              <td className="p-2 text-left font-medium text-ink bg-canvas/40 border-r border-line">
                A2: Free Expedited Shipping
              </td>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((r) => {
                const isT2 = Math.floor(r / 2) % 2 === 1;
                const isT3 = r % 2 === 1;
                const acts = isT2 || isT3;
                return (
                  <td key={r} className={`p-2 font-mono font-bold ${ruleIndex === r ? 'bg-indigo-50 text-emerald-700' : 'text-subtle'}`}>
                    {acts ? 'X' : '-'}
                  </td>
                );
              })}
            </tr>
            <tr className="bg-emerald-50/20">
              <td className="p-2 text-left font-medium text-ink bg-canvas/40 border-r border-line">
                A3: Priority VIP Support
              </td>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((r) => {
                const isT1 = r >= 4;
                const isT2 = Math.floor(r / 2) % 2 === 1;
                const acts = isT1 && isT2;
                return (
                  <td key={r} className={`p-2 font-mono font-bold ${ruleIndex === r ? 'bg-indigo-50 text-emerald-700' : 'text-subtle'}`}>
                    {acts ? 'X' : '-'}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Real-time Fired Action Summary */}
      <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        <div>
          <strong className="text-indigo-800">Active Rule Triggered: Rule R{ruleIndex + 1}</strong>
          <div className="text-indigo-700 text-[11px] mt-0.5">
            Actions Fired: {[discount20 && 'Apply 20% Discount', freeShipping && 'Free Shipping', priorityService && 'Priority VIP Support'].filter(Boolean).join(' + ') || 'Standard Processing (No extra perks)'}
          </div>
        </div>
        <span className="text-[11px] font-mono bg-paper px-2 py-1 rounded border border-indigo-300 text-indigo-700 font-semibold whitespace-nowrap">
          Guaranteed Completeness: Zero Gaps
        </span>
      </div>
    </div>
  );
};

const FodVsOodDiagram: React.FC = () => {
  const [hasAddedCOSensor, setHasAddedCOSensor] = useState<boolean>(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-line pb-2">
        <div>
          <h4 className="text-sm font-semibold text-purple-700 flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-600" />
            Function-Oriented (FOD) vs. Object-Oriented Design (OOD)
          </h4>
          <p className="text-xs text-subtle">
            Booch Dictum: Centralized global state vs. Autonomous encapsulations. Fire-Alarm case study.
          </p>
        </div>
        <button
          onClick={() => setHasAddedCOSensor(!hasAddedCOSensor)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
            hasAddedCOSensor
              ? 'bg-rose-600 text-white shadow'
              : 'bg-indigo-600 text-white shadow hover:bg-indigo-500'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          {hasAddedCOSensor ? 'Reset: Remove CO Sensor' : 'Simulate: Add Carbon Monoxide Sensor'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* FOD Column */}
        <div className="bg-surface p-4 rounded-xl border border-line flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wide">
                Function-Oriented Design (FOD)
              </span>
              <span className="text-[10px] font-mono bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded">
                Centralized Shared Data
              </span>
            </div>
            <p className="text-xs text-subtle mb-3">
              Functions act as data transformers around a central shared data structure. Functions lack private state.
            </p>

            {/* Central Shared State Visual */}
            <div className="p-3 rounded-lg bg-canvas border border-line text-xs font-mono space-y-2 mb-3">
              <div className={`p-2 rounded border text-center font-bold transition-colors ${
                hasAddedCOSensor ? 'bg-rose-100 text-rose-800 border-rose-400' : 'bg-line text-ink'
              }`}>
                {hasAddedCOSensor ? '⚠️ struct SensorData (MODIFIED: +co_level)' : 'struct SensorData (smoke, temp)'}
              </div>
              <div className="grid grid-cols-3 gap-1 text-[10px] text-center">
                <div className={`p-1.5 rounded border ${hasAddedCOSensor ? 'bg-rose-50 text-rose-700 border-rose-300' : 'bg-surface'}`}>
                  poll_sensors() {hasAddedCOSensor && '✏️ Rewritten'}
                </div>
                <div className={`p-1.5 rounded border ${hasAddedCOSensor ? 'bg-rose-50 text-rose-700 border-rose-300' : 'bg-surface'}`}>
                  process_readings() {hasAddedCOSensor && '✏️ Rewritten'}
                </div>
                <div className={`p-1.5 rounded border ${hasAddedCOSensor ? 'bg-rose-50 text-rose-700 border-rose-300' : 'bg-surface'}`}>
                  ring_bell()
                </div>
              </div>
            </div>

            <div className={`p-2.5 rounded-lg border text-xs ${
              hasAddedCOSensor ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-line border-line text-subtle'
            }`}>
              <strong>Maintenance Impact:</strong>
              {hasAddedCOSensor ? (
                <span className="block mt-0.5 text-[11.5px]">
                  🔴 <strong>HIGH RIPPLE EFFECT:</strong> Adding one sensor required altering the central struct and rewriting 2 of the 3 major functions!
                </span>
              ) : (
                <span className="block mt-0.5 text-[11.5px]">
                  Tight coupling to central state structures makes evolution risky.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* OOD Column */}
        <div className="bg-surface p-4 rounded-xl border border-line flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                Object-Oriented Design (OOD)
              </span>
              <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                Encapsulated Objects
              </span>
            </div>
            <p className="text-xs text-subtle mb-3">
              Objects bundle state and operations together. Evolution occurs via polymorphism without touching existing objects.
            </p>

            {/* Decentralized Objects Visual */}
            <div className="p-3 rounded-lg bg-canvas border border-line text-xs font-mono space-y-2 mb-3">
              <div className="p-2 rounded border border-emerald-300 bg-emerald-50 text-emerald-800 text-center font-bold">
                class AlarmController (UNCHANGED)
              </div>
              <div className="grid grid-cols-3 gap-1 text-[10px] text-center">
                <div className="p-1.5 rounded border bg-surface text-ink">SmokeSensor</div>
                <div className="p-1.5 rounded border bg-surface text-ink">HeatSensor</div>
                <div className={`p-1.5 rounded border transition-all ${
                  hasAddedCOSensor
                    ? 'bg-emerald-600 text-white font-bold shadow animate-bounce'
                    : 'bg-line/40 text-subtle border-dashed'
                }`}>
                  {hasAddedCOSensor ? '+ COSensor (NEW)' : 'Empty Slot'}
                </div>
              </div>
            </div>

            <div className={`p-2.5 rounded-lg border text-xs ${
              hasAddedCOSensor ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-line border-line text-subtle'
            }`}>
              <strong>Maintenance Impact:</strong>
              {hasAddedCOSensor ? (
                <span className="block mt-0.5 text-[11.5px]">
                  🟢 <strong>ZERO RIPPLE EFFECT:</strong> Added a single subclass <code>COSensor</code>. <code>AlarmController</code> automatically loops over sensor list via polymorphism!
                </span>
              ) : (
                <span className="block mt-0.5 text-[11.5px]">
                  Booch Dictum: Real-world entities map 1:1 with code objects.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-2.5 rounded-lg bg-canvas border border-line text-xs text-subtle font-mono text-center">
        <strong>Key Exam Distinction:</strong> FOD decomposes by <em>processing steps</em> (functions). OOD decomposes by <em>autonomous entities</em> (objects).
      </div>
    </div>
  );
};

const TestingPyramidDriversStubsDiagram: React.FC = () => {
  const [testRan, setTestRan] = useState<boolean>(false);
  const [testVector, setTestVector] = useState<'valid' | 'invalid'>('valid');

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-line pb-2">
        <div>
          <h4 className="text-sm font-semibold text-rose-700 flex items-center gap-2">
            <Bug className="w-4 h-4 text-rose-600" />
            Testing Fundamentals & Unit Test Scaffolding
          </h4>
          <p className="text-xs text-subtle">
            Error $\to$ Fault $\to$ Failure causal chain & Driver/Stub unit test harness.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={testVector}
            onChange={(e) => {
              setTestVector(e.target.value as 'valid' | 'invalid');
              setTestRan(false);
            }}
            className="text-xs px-2 py-1 rounded bg-canvas border border-line font-mono"
          >
            <option value="valid">Vector A: Account Balance &gt; $0</option>
            <option value="invalid">Vector B: Negative Balance (Fault Trigger)</option>
          </select>
          <button
            onClick={() => setTestRan(true)}
            className="px-3 py-1 bg-rose-600 text-white rounded-md text-xs font-semibold hover:bg-rose-500 flex items-center gap-1 shadow-sm"
          >
            <Play className="w-3 h-3" /> Run Unit Test
          </button>
        </div>
      </div>

      {/* Causal Chain: Error -> Fault -> Failure */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs">
        <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/70">
          <span className="text-[10px] font-mono text-amber-700 font-semibold block uppercase">1. Human Error (Mistake)</span>
          <div className="font-bold text-ink mt-1">Cognitive Slip</div>
          <p className="text-[11px] text-subtle mt-0.5">Developer uses <code>&gt;</code> instead of <code>&gt;=</code></p>
        </div>

        <div className="p-3 rounded-xl border border-orange-200 bg-orange-50/70">
          <span className="text-[10px] font-mono text-orange-700 font-semibold block uppercase">2. Software Fault (Bug)</span>
          <div className="font-bold text-ink mt-1">Static Defect in Code</div>
          <p className="text-[11px] text-subtle mt-0.5">dormant in source until the faulty path is executed</p>
        </div>

        <div className="p-3 rounded-xl border border-rose-200 bg-rose-50/70">
          <span className="text-[10px] font-mono text-rose-700 font-semibold block uppercase">3. System Failure</span>
          <div className="font-bold text-ink mt-1">Dynamic Deviation</div>
          <p className="text-[11px] text-subtle mt-0.5">Observed output deviates from expected SRS behavior</p>
        </div>
      </div>

      {/* Unit Test Scaffolding: Driver -> UUT -> Stub */}
      <div className="p-4 rounded-xl bg-surface border border-line">
        <div className="text-xs font-bold text-strong mb-3 text-center">
          Unit Testing Scaffolding: Driver vs. Stub Isolation Harness
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center text-xs text-center font-mono">
          {/* Test Driver */}
          <div className="p-3 rounded-xl border-2 border-indigo-300 bg-indigo-50/60 text-indigo-900">
            <span className="text-[10px] font-bold block uppercase text-indigo-700">TEST DRIVER (Caller)</span>
            <div className="font-bold text-xs mt-1">Mock Caller Routine</div>
            <div className="text-[10px] text-indigo-700 mt-1">
              Feeds input vector: <code>{testVector === 'valid' ? 'balance = 100' : 'balance = -50'}</code>
            </div>
          </div>

          {/* Unit Under Test */}
          <div className="p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-900 shadow">
            <span className="text-[10px] font-bold block uppercase text-emerald-700">UNIT UNDER TEST (UUT)</span>
            <div className="font-bold text-xs mt-1">withdrawFunds()</div>
            <div className="text-[10px] text-emerald-700 mt-1">Isolated function logic</div>
          </div>

          {/* Test Stub */}
          <div className="p-3 rounded-xl border-2 border-cyan-300 bg-cyan-50/60 text-cyan-900">
            <span className="text-[10px] font-bold block uppercase text-cyan-700">TEST STUB (Callee)</span>
            <div className="font-bold text-xs mt-1">Mock Database / API</div>
            <div className="text-[10px] text-cyan-700 mt-1">Returns canned: <code>status = OK</code></div>
          </div>
        </div>

        {testRan && (
          <div className={`mt-4 p-3 rounded-lg border text-xs flex items-center justify-between ${
            testVector === 'valid'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-rose-50 border-rose-300 text-rose-800'
          }`}>
            <div className="flex items-center gap-2">
              {testVector === 'valid' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-600" />
              )}
              <span>
                <strong>{testVector === 'valid' ? 'Test Vector Passed' : 'Fault Exposed (Failure Detected)'}:</strong>{' '}
                {testVector === 'valid'
                  ? 'UUT safely returned success code 200 via Stub.'
                  : 'Myers’ Maxim verified: Executing edge input exposed unhandled negative balance fault!'}
              </span>
            </div>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-paper border">
              Myers' Maxim Validated
            </span>
          </div>
        )}
      </div>

      {/* Verification vs Validation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-2.5 rounded-lg bg-surface border border-line">
          <strong className="text-indigo-700 block mb-0.5">Verification (Boehm: "Are we building the product right?")</strong>
          <p className="text-subtle text-[11.5px]">
            Static & unit checks to ensure each software artifact conforms precisely to the specification from the preceding phase.
          </p>
        </div>
        <div className="p-2.5 rounded-lg bg-surface border border-line">
          <strong className="text-teal-700 block mb-0.5">Validation (Boehm: "Are we building the right product?")</strong>
          <p className="text-subtle text-[11.5px]">
            System & acceptance checks against actual user operational needs, ensuring customer expectations are genuinely satisfied.
          </p>
        </div>
      </div>
    </div>
  );
};

function renderDiagramContent(type: string, activeTab: number, setActiveTab: (i: number) => void) {
  switch (type) {
    case 'rtm_traceability':
      return <RtmTraceabilityDiagram />;

    case 'maintainability_portability':
      return <MaintainabilityPortabilityDiagram />;

    case 'decision_tree_table':
      return <DecisionTreeTableDiagram />;

    case 'fod_vs_ood':
      return <FodVsOodDiagram />;

    case 'testing_pyramid_drivers_stubs':
      return <TestingPyramidDriversStubsDiagram />;

    case 'waterfall_effort':
      return (
        <div className="space-y-6">
          <div className="text-center mb-2">
            <h4 className="text-sm font-semibold text-indigo-700">Classical Waterfall 6-Phase Pipeline & Effort Distribution</h4>
            <p className="text-xs text-subtle">Notice that Maintenance dominates the overall life cycle (40:60 ratio), and Testing dominates the development phase (~18%).</p>
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
          <div className="bg-surface p-4 rounded-xl border border-line">
            <div className="flex justify-between text-xs font-medium text-body mb-2">
              <span>Development vs Maintenance Split</span>
              <span className="text-emerald-700 font-mono">Development 40% | Maintenance 60%</span>
            </div>
            <div className="w-full h-7 rounded-lg overflow-hidden flex bg-line border border-line-strong font-mono text-[11px] text-white font-bold leading-7 text-center">
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
            <h4 className="text-sm font-semibold text-emerald-700">Iterative Waterfall with Feedback Loops & Phase Containment</h4>
            <p className="text-xs text-subtle">When an error is detected in testing, feedback paths return directly to requirements or design.</p>
          </div>
          <div className="relative border border-line rounded-xl p-4 bg-surface">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
              {[
                { name: 'Feasibility', id: '1' },
                { name: 'SRS Document', id: '2', alert: 'Retail Banking limit ambiguity caught here' },
                { name: 'Design (H & L)', id: '3' },
                { name: 'Coding', id: '4' },
                { name: 'System Testing', id: '5', feedbackOrigin: true },
                { name: 'Maintenance', id: '6' },
              ].map((step, i) => (
                <div key={i} className={`p-3 rounded-lg border flex-1 w-full ${step.feedbackOrigin ? 'border-amber-500/80 bg-amber-50' : 'border-line-strong bg-line'}`}>
                  <div className="text-[10px] text-subtle">Step {step.id}</div>
                  <div className="text-xs font-bold text-ink">{step.name}</div>
                  {step.feedbackOrigin && (
                    <div className="mt-1 text-[10px] text-amber-700 flex items-center justify-center gap-1 font-semibold">
                      <AlertTriangle className="w-3 h-3" /> Defect Found
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Feedback Return Indicator */}
            <div className="mt-4 p-3 bg-indigo-50 border border-indigo-500/30 rounded-lg flex items-center justify-between text-xs text-indigo-700">
              <span className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-emerald-700 animate-spin" />
                <strong>Feedback Loop:</strong> Testing (Step 5) detects ambiguity $\to$ roll back to SRS (Step 2) $\to$ update Design (3) & Code (4) only.
              </span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
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
              <h4 className="text-sm font-semibold text-amber-700">Barry Boehm\'s Spiral Model (4 Quadrants & Outward Risk Loops)</h4>
              <p className="text-xs text-subtle">Select a loop to see how risk determines the next development cycle.</p>
            </div>
            <div className="flex gap-1">
              {['Loop 1: Feasibility', 'Loop 2: Requirements', 'Loop 3: Design', 'Loop 4: Build & Test'].map((loopName, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-2.5 py-1 text-xs rounded-md transition-all font-medium ${activeTab === idx ? 'bg-amber-500 text-paper font-bold' : 'bg-line text-body hover:bg-line-strong'}`}
                >
                  L{idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Quadrant 1 */}
            <div className="p-3 rounded-lg border border-blue-500/30 bg-blue-50">
              <div className="text-xs font-bold text-blue-700 mb-1">QUADRANT 1: OBJECTIVE SETTING</div>
              <p className="text-xs text-body">
                {activeTab === 0 && 'Objective: Determine if 5,000 students can take online exam simultaneously within budget.'}
                {activeTab === 1 && 'Objective: Elicit exact system behavior (autosave, disconnect rules, faculty download).'}
                {activeTab === 2 && 'Objective: Choose a reliable server architecture to survive peak concurrent load.'}
                {activeTab === 3 && 'Objective: Construct, integrate, and security-test the complete exam system.'}
              </p>
            </div>

            {/* Quadrant 2 */}
            <div className="p-3 rounded-lg border border-rose-500/30 bg-rose-50">
              <div className="text-xs font-bold text-rose-700 mb-1">QUADRANT 2: RISK ASSESSMENT & REDUCTION</div>
              <p className="text-xs text-body">
                {activeTab === 0 && 'Biggest Risk: Server crash under 5,000 load. Solution: Run load test with 500 simulated users.'}
                {activeTab === 1 && 'Biggest Risk: Disconnect rules confusion. Solution: Build interactive UI prototype for faculty.'}
                {activeTab === 2 && 'Biggest Risk: Single point of failure. Solution: Evaluate load-balanced cloud clusters.'}
                {activeTab === 3 && 'Biggest Risk: Cheating & DB locks. Solution: Penetration testing & database stress scripts.'}
              </p>
            </div>

            {/* Quadrant 3 */}
            <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-50">
              <div className="text-xs font-bold text-emerald-700 mb-1">QUADRANT 3: DEVELOPMENT & VALIDATION</div>
              <p className="text-xs text-body">
                {activeTab === 0 && 'Output: Technical experiment and load test report proving feasibility.'}
                {activeTab === 1 && 'Output: Validated SRS document and approved workflow prototype.'}
                {activeTab === 2 && 'Output: Validated cloud architecture and system design specification.'}
                {activeTab === 3 && 'Output: Tested, operational software product ready for deployment.'}
              </p>
            </div>

            {/* Quadrant 4 */}
            <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-50">
              <div className="text-xs font-bold text-amber-700 mb-1">QUADRANT 4: REVIEW & PLANNING</div>
              <p className="text-xs text-body">
                {activeTab === 0 && 'Decision: University approves feasibility report; commit budget to Loop 2 (Requirements).'}
                {activeTab === 1 && 'Decision: Requirements clear; proceed to Loop 3 (Architecture Design).'}
                {activeTab === 2 && 'Decision: Architecture approved; authorize full-scale coding for Loop 4.'}
                {activeTab === 3 && 'Decision: Customer evaluates system, plans rollout and maintenance loop.'}
              </p>
            </div>
          </div>

          <div className="text-center p-2 rounded bg-surface border border-line text-xs font-mono text-body">
            <span className="text-blue-700">Waterfall: Phase-driven</span> | <span className="text-emerald-700">Evolutionary: Release-driven</span> | <span className="text-amber-700 font-bold">Spiral: Risk-driven</span>
          </div>
        </div>
      );

    case 'cohesion_coupling_ladders':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cohesion ladder */}
          <div className="border border-line rounded-xl p-4 bg-surface">
            <div className="text-xs font-bold text-emerald-700 mb-2 flex items-center justify-between">
              <span>Cohesion Spectrum (Functional Strength)</span>
              <span className="text-[10px] text-subtle">Worst $\to$ Best</span>
            </div>
            <div className="space-y-1.5 font-mono text-xs">
              {[
                { name: '1. Coincidental', level: 'Worst', color: 'bg-red-50 text-red-700 border-red-200', eg: 'logError() + readFile() + openSocket()' },
                { name: '2. Logical', level: 'Poor', color: 'bg-orange-50 text-orange-700 border-orange-200', eg: 'ioHandler(kind) -> file/kbd/net' },
                { name: '3. Temporal', level: 'Low', color: 'bg-amber-50 text-amber-700 border-amber-200', eg: 'startup() -> initVars + openConn' },
                { name: '4. Procedural', level: 'Moderate', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', eg: 'decode() -> parseHeader + checksum' },
                { name: '5. Communicational', level: 'Fair', color: 'bg-cyan-50 text-cyan-700 border-cyan-200', eg: 'useStack() -> push + pop on same stack' },
                { name: '6. Sequential', level: 'Good', color: 'bg-teal-50 text-teal-700 border-teal-200', eg: 'pipeline: sort() -> search() -> display()' },
                { name: '7. Functional', level: 'BEST', color: 'bg-emerald-50 text-emerald-700 border-emerald-500 font-bold', eg: 'computeOvertimePay(employee)' }
              ].map((c, i) => (
                <div key={i} className={`p-2 rounded border ${c.color} flex justify-between items-center text-[11px]`}>
                  <div>
                    <span className="font-semibold">{c.name}</span>
                    <div className="text-[10px] text-subtle font-sans">{c.eg}</div>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-paper/80">{c.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coupling ladder */}
          <div className="border border-line rounded-xl p-4 bg-surface">
            <div className="text-xs font-bold text-indigo-700 mb-2 flex items-center justify-between">
              <span>Coupling Spectrum (Interdependence)</span>
              <span className="text-[10px] text-subtle">Best $\to$ Worst</span>
            </div>
            <div className="space-y-2 font-mono text-xs">
              {[
                { name: '1. Data Coupling', level: 'BEST (Loosest)', color: 'bg-emerald-50 text-emerald-700 border-emerald-500', eg: 'Passing elementary int amount' },
                { name: '2. Stamp Coupling', level: 'Acceptable', color: 'bg-teal-50 text-teal-700 border-teal-200', eg: 'Passing whole Order record just for total' },
                { name: '3. Control Coupling', level: 'Caution', color: 'bg-amber-50 text-amber-700 border-amber-200', eg: 'Passing isRushOrder flag to steer internal branch' },
                { name: '4. Common Coupling', level: 'Bad', color: 'bg-orange-50 text-orange-700 border-orange-200', eg: 'Two modules mutating global inventoryCount' },
                { name: '5. Content Coupling', level: 'DEFECT (Tightest)', color: 'bg-red-50 text-red-700 border-red-200 font-bold', eg: 'goto into another module\'s internal code' }
              ].map((cp, idx) => (
                <div key={idx} className={`p-2 rounded border ${cp.color} flex justify-between items-center text-[11px]`}>
                  <div>
                    <span className="font-semibold">{cp.name}</span>
                    <div className="text-[10px] text-subtle font-sans">{cp.eg}</div>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-paper/80">{cp.level}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 text-[11px] text-body bg-line p-2 rounded border border-line-strong">
              <strong>Golden Rule:</strong> Aim for <em>High Cohesion + Low Coupling</em> = <strong>Functional Independence</strong>.
            </div>
          </div>
        </div>
      );

    case 'cfg_cyclomatic':
      return (
        <div className="space-y-4">
          <div className="text-center">
            <h4 className="text-sm font-semibold text-cyan-700">Control Flow Graph (CFG) & Cyclomatic Complexity Calculation</h4>
            <p className="text-xs text-subtle">Demonstrating McCabe\'s 3 equivalent formulas on Euclid\'s GCD Algorithm.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Program Code & CFG representation */}
            <div className="bg-surface p-3 rounded-lg border border-line font-mono text-xs">
              <div className="text-subtle border-b border-line pb-1 mb-2 font-sans font-semibold">Euclid GCD Algorithm</div>
              <div className="text-body leading-relaxed">
                <div>int compute_gcd(int x, int y) &#123;</div>
                <div className="text-cyan-700 font-bold pl-2">1: while (x != y) &#123;</div>
                <div className="text-amber-700 font-bold pl-4">2:   if (x &gt; y)</div>
                <div className="pl-6 text-emerald-700">3:     x = x - y;</div>
                <div className="text-amber-700 font-bold pl-4">     else</div>
                <div className="pl-6 text-emerald-700">4:     y = y - x;</div>
                <div className="text-cyan-700 font-bold pl-2">5: &#125;</div>
                <div className="text-indigo-700 font-bold pl-2">6: return x;</div>
                <div>&#125;</div>
              </div>
            </div>

            {/* 3 Calculation Methods */}
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-surface border border-line">
                <div className="text-xs font-bold text-indigo-700">Method 1: Graph Theoretic Formula</div>
                <div className="text-xs font-mono text-strong mt-1">
                  V(G) = E - N + 2 = 7 - 6 + 2 = <span className="text-emerald-700 font-bold text-sm">3</span>
                </div>
                <div className="text-[10px] text-subtle">Nodes N = 6 statements, Edges E = 7 control links.</div>
              </div>

              <div className="p-2.5 rounded-lg bg-surface border border-line">
                <div className="text-xs font-bold text-teal-700">Method 2: Planar Bounded Areas</div>
                <div className="text-xs font-mono text-strong mt-1">
                  V(G) = Bounded Regions + 1 = 2 + 1 = <span className="text-emerald-700 font-bold text-sm">3</span>
                </div>
                <div className="text-[10px] text-subtle">Enclosed loops inside graph = 2 + outer area.</div>
              </div>

              <div className="p-2.5 rounded-lg bg-surface border border-line">
                <div className="text-xs font-bold text-amber-700">Method 3: Predicate / Decision Points</div>
                <div className="text-xs font-mono text-strong mt-1">
                  V(G) = Decision Statements + 1 = 2 + 1 = <span className="text-emerald-700 font-bold text-sm">3</span>
                </div>
                <div className="text-[10px] text-subtle">Two decisions: `while(x != y)` and `if(x &gt; y)`.</div>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded bg-emerald-50 border border-emerald-500/30 text-xs text-emerald-700">
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
            <h4 className="text-sm font-semibold text-rose-700">Hardware Bathtub Curve vs. Software Failure Curve</h4>
            <p className="text-xs text-subtle">Why software reliability engineering is fundamentally different from hardware.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-line bg-surface text-xs">
              <div className="font-bold text-blue-700 mb-2">Hardware: Physical Bathtub Curve</div>
              <ul className="space-y-1.5 text-body list-disc list-inside text-[11px]">
                <li><strong>Burn-in:</strong> High initial failures from manufacturing flaws.</li>
                <li><strong>Useful Life:</strong> Low, steady failure rate.</li>
                <li><strong>Wear-Out:</strong> Failure rate skyrockets due to physical fatigue and aging.</li>
                <li><strong>Repairs:</strong> Restores pre-failure baseline stability.</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl border border-line bg-surface text-xs">
              <div className="font-bold text-emerald-700 mb-2">Software: Step-Function Curve</div>
              <ul className="space-y-1.5 text-body list-disc list-inside text-[11px]">
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
            <h4 className="text-sm font-semibold text-purple-700">SEI Capability Maturity Model (CMM) 5 Levels & KPAs</h4>
            <p className="text-xs text-subtle">Gradual process improvement from chaotic individual heroics to continuous optimization.</p>
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
          <div className="text-center text-xs text-subtle font-mono">
            *ISO 9001 roughly maps to CMM Level 3. Levels cannot be skipped!
          </div>
        </div>
      );

    default:
      return (
        <div className="mx-auto max-w-xl rounded-xl border border-line bg-surface p-5 text-center">
          <Info className="mx-auto h-5 w-5 text-subtle" />
          <p className="mt-2 text-sm font-semibold text-strong">Concept visual not available</p>
          <p className="mt-1 text-xs text-subtle">
            This concept is best learned from the written notes in this chapter, including the worked examples and tables.
          </p>
        </div>
      );
  }
}
