import React, { useState } from 'react';
import { Calculator, Zap, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';

export const FormulaCalculator: React.FC = () => {
  const [activeCalc, setActiveCalc] = useState<'cocomo' | 'putnam' | 'halstead' | 'mccabe' | 'error_seeding' | 'fp'>('cocomo');

  // COCOMO states
  const [cocomoSize, setCocomoSize] = useState<number>(32);
  const [cocomoMode, setCocomoMode] = useState<'organic' | 'semidetached' | 'embedded'>('organic');
  const [cocomoSalary, setCocomoSalary] = useState<number>(15000);

  // Putnam states
  const [origDuration, setOrigDuration] = useState<number>(12); // months
  const [newDuration, setNewDuration] = useState<number>(6); // months
  const [origCost, setOrigCost] = useState<number>(100000);

  // Halstead states
  const [eta1, setEta1] = useState<number>(12); // unique operators
  const [eta2, setEta2] = useState<number>(11); // unique operands
  const [n1, setN1] = useState<number>(20);
  const [n2, setN2] = useState<number>(15);

  // McCabe states
  const [edges, setEdges] = useState<number>(7);
  const [nodes, setNodes] = useState<number>(6);
  const [predicates, setPredicates] = useState<number>(2);

  // Error Seeding states
  const [seededTotal, setSeededTotal] = useState<number>(25);
  const [seededFound, setSeededFound] = useState<number>(20);
  const [naturalFound, setNaturalFound] = useState<number>(50);

  // Function Points states
  const [fpInputs, setFpInputs] = useState<number>(10);
  const [fpOutputs, setFpOutputs] = useState<number>(8);
  const [fpInquiries, setFpInquiries] = useState<number>(5);
  const [fpFiles, setFpFiles] = useState<number>(4);
  const [fpInterfaces, setFpInterfaces] = useState<number>(2);
  const [fpDI, setFpDI] = useState<number>(30); // 0 to 70

  // COCOMO calculation
  const getCocomoResults = () => {
    let a1 = 2.4, a2 = 1.05, b1 = 2.5, b2 = 0.38;
    if (cocomoMode === 'semidetached') {
      a1 = 3.0; a2 = 1.12; b1 = 2.5; b2 = 0.35;
    } else if (cocomoMode === 'embedded') {
      a1 = 3.6; a2 = 1.20; b1 = 2.5; b2 = 0.32;
    }
    const effort = a1 * Math.pow(cocomoSize, a2);
    const tdev = b1 * Math.pow(effort, b2);
    const avgStaff = effort / tdev;
    const cost = effort * cocomoSalary;
    return {
      effort: Math.round(effort * 10) / 10,
      tdev: Math.round(tdev * 10) / 10,
      avgStaff: Math.round(avgStaff * 10) / 10,
      cost: Math.round(cost),
      a1, a2, b1, b2
    };
  };

  // Putnam 4th power calculation
  const getPutnamResults = () => {
    const compressionRatio = origDuration / (newDuration || 1);
    const effortMultiplier = Math.pow(compressionRatio, 4);
    const newCost = origCost * effortMultiplier;
    return {
      compressionRatio: Math.round(compressionRatio * 100) / 100,
      effortMultiplier: Math.round(effortMultiplier * 100) / 100,
      newCost: Math.round(newCost)
    };
  };

  // Halstead calculation
  const getHalsteadResults = () => {
    const vocabulary = eta1 + eta2;
    const totalLength = n1 + n2;
    const estimatedLength = (eta1 > 0 ? eta1 * Math.log2(eta1) : 0) + (eta2 > 0 ? eta2 * Math.log2(eta2) : 0);
    const volume = vocabulary > 0 ? totalLength * Math.log2(vocabulary) : 0;
    const potMinVolume = (2 + eta2) * Math.log2(2 + eta2);
    const level = potMinVolume > 0 && volume > 0 ? potMinVolume / volume : (eta1 > 0 && n2 > 0 ? (2 / eta1) * (eta2 / n2) : 0);
    const effort = level > 0 ? volume / level : 0;
    const timeSec = effort / 18;
    return {
      vocabulary,
      totalLength,
      estimatedLength: Math.round(estimatedLength),
      volume: Math.round(volume),
      level: Math.round(level * 1000) / 1000,
      effort: Math.round(effort),
      timeHours: Math.round((timeSec / 3600) * 100) / 100
    };
  };

  // Error Seeding calculation
  const getErrorSeedingResults = () => {
    if (seededFound <= 0) return { totalNatural: 0, remainingNatural: 0 };
    const totalNatural = (seededTotal * naturalFound) / seededFound;
    const remainingNatural = totalNatural - naturalFound;
    return {
      totalNatural: Math.round(totalNatural * 10) / 10,
      remainingNatural: Math.round(remainingNatural * 10) / 10
    };
  };

  // FP calculation
  const getFPResults = () => {
    const ufp = (fpInputs * 4) + (fpOutputs * 5) + (fpInquiries * 4) + (fpFiles * 10) + (fpInterfaces * 10);
    const tcf = 0.65 + (0.01 * fpDI);
    const fp = ufp * tcf;
    return {
      ufp,
      tcf: Math.round(tcf * 1000) / 1000,
      fp: Math.round(fp * 10) / 10
    };
  };

  const cocomoRes = getCocomoResults();
  const putnamRes = getPutnamResults();
  const halsteadRes = getHalsteadResults();
  const errorRes = getErrorSeedingResults();
  const fpRes = getFPResults();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 text-slate-100 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Calculator className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold tracking-tight">Interactive SE Formula & Numerical Lab</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time numerical solvers for university exams: COCOMO, Putnam 4th Power, Halstead, Cyclomatic Complexity & Error Seeding.
          </p>
        </div>

        {/* Tab pills */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800/80">
          {[
            { id: 'cocomo', label: 'COCOMO' },
            { id: 'putnam', label: 'Putnam 4th-Power' },
            { id: 'halstead', label: 'Halstead Science' },
            { id: 'mccabe', label: 'McCabe CFG' },
            { id: 'error_seeding', label: 'Error Seeding' },
            { id: 'fp', label: 'Function Points' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCalc(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeCalc === tab.id ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* CALCULATOR PANELS */}
      {activeCalc === 'cocomo' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
              <Zap className="w-4 h-4" /> Parameters Input
            </h3>
            <div>
              <label className="block text-xs text-slate-300 font-medium mb-1">
                Project Size in Kilo Lines of Code (KLOC): <span className="text-amber-400 font-mono font-bold">{cocomoSize} KLOC</span> ({cocomoSize * 1000} LOC)
              </label>
              <input
                type="range"
                min="1"
                max="200"
                value={cocomoSize}
                onChange={e => setCocomoSize(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 font-medium mb-1">Project Category:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'organic', name: 'Organic', desc: 'Small, familiar' },
                  { id: 'semidetached', name: 'Semi-Detached', desc: 'Mixed experience' },
                  { id: 'embedded', name: 'Embedded', desc: 'Hardware coupled' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCocomoMode(cat.id as any)}
                    className={`p-2 rounded-lg border text-left text-xs transition-all ${cocomoMode === cat.id ? 'border-indigo-500 bg-indigo-950/50 text-indigo-200' : 'border-slate-800 bg-slate-900/50 text-slate-400'}`}
                  >
                    <div className="font-bold">{cat.name}</div>
                    <div className="text-[10px] opacity-75">{cat.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-300 font-medium mb-1">Avg Engineer Salary per Month (₹ / $):</label>
              <input
                type="number"
                value={cocomoSalary}
                onChange={e => setCocomoSalary(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 font-mono"
              />
            </div>
          </div>

          {/* Results display */}
          <div className="bg-slate-950/90 p-5 rounded-xl border border-indigo-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">COCOMO Output</span>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                  Effort = {cocomoRes.a1} * (KLOC)^{cocomoRes.a2}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Nominal Effort</div>
                  <div className="text-2xl font-black text-amber-400 font-mono">{cocomoRes.effort} <span className="text-xs font-normal text-slate-400">PM</span></div>
                  <div className="text-[10px] text-slate-500 mt-1">Person-Months required</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Nominal Duration</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">{cocomoRes.tdev} <span className="text-xs font-normal text-slate-400">Months</span></div>
                  <div className="text-[10px] text-slate-500 mt-1">Calendar time to develop</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Average Team Size</div>
                  <div className="text-xl font-bold text-cyan-400 font-mono">{cocomoRes.avgStaff} <span className="text-xs font-normal text-slate-400">Engineers</span></div>
                  <div className="text-[10px] text-slate-500 mt-1">Effort / Duration</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Estimated Cost</div>
                  <div className="text-xl font-bold text-indigo-400 font-mono">₹{cocomoRes.cost.toLocaleString()}</div>
                  <div className="text-[10px] text-slate-500 mt-1">Manpower budget</div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded bg-amber-950/20 border border-amber-500/20 text-xs text-amber-300">
              <strong>Exam Note:</strong> For 32 KLOC organic software: Effort = 2.4 * (32)^1.05 = <strong>91 PM</strong>; Nominal Time = 2.5 * (91)^0.38 = <strong>14 Months</strong>.
            </div>
          </div>
        </div>
      )}

      {activeCalc === 'putnam' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="text-sm font-bold text-rose-400">Putnam\'s 4th Power Schedule Compression Law</h3>
            <p className="text-xs text-slate-400">
              Putnam proved that Effort/Cost is inversely proportional to the <strong>4th power of delivery duration</strong>: <code>Cost &prop; 1 / (td^4)</code>.
            </p>

            <div>
              <label className="block text-xs text-slate-300 font-medium mb-1">Original Normal Duration (td1): {origDuration} Months</label>
              <input
                type="number"
                value={origDuration}
                onChange={e => setOrigDuration(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 font-medium mb-1">Target Compressed Duration (td2): {newDuration} Months</label>
              <input
                type="number"
                value={newDuration}
                onChange={e => setNewDuration(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 font-medium mb-1">Original Estimated Cost (₹ / $):</label>
              <input
                type="number"
                value={origCost}
                onChange={e => setOrigCost(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 font-mono"
              />
            </div>
          </div>

          <div className="bg-slate-950/90 p-5 rounded-xl border border-rose-500/30 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-rose-400 font-semibold mb-2">Cost Penalty Analysis</div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mb-4">
                <div className="text-xs text-slate-400">Schedule Compression Ratio (td1 / td2):</div>
                <div className="text-xl font-bold font-mono text-slate-200">{putnamRes.compressionRatio}x speedup</div>

                <div className="mt-3 text-xs text-slate-400">Effort &amp; Cost Multiplication Factor (Ratio^4):</div>
                <div className="text-3xl font-black font-mono text-rose-400">{putnamRes.effortMultiplier}x increase!</div>

                <div className="mt-3 text-xs text-slate-400">New Required Budget:</div>
                <div className="text-2xl font-black font-mono text-amber-300">₹{putnamRes.newCost.toLocaleString()}</div>
              </div>
            </div>

            <div className="p-3 rounded bg-rose-950/30 border border-rose-500/30 text-xs text-rose-300">
              <strong>Classic Exam Question:</strong> "If normal duration is 1 year (12 months), and client demands delivery in 6 months, how much does cost increase?"
              <br />
              <strong>Answer:</strong> (12 / 6)^4 = 2^4 = <strong>16 times higher cost</strong>!
            </div>
          </div>
        </div>
      )}

      {activeCalc === 'halstead' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="text-sm font-bold text-cyan-400">Halstead\'s Software Science Inputs</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-300">Unique Operators (&eta;1):</label>
                <input type="number" value={eta1} onChange={e => setEta1(Number(e.target.value))} className="w-full px-2.5 py-1 text-xs bg-slate-900 border border-slate-800 rounded font-mono" />
              </div>
              <div>
                <label className="text-[11px] text-slate-300">Unique Operands (&eta;2):</label>
                <input type="number" value={eta2} onChange={e => setEta2(Number(e.target.value))} className="w-full px-2.5 py-1 text-xs bg-slate-900 border border-slate-800 rounded font-mono" />
              </div>
              <div>
                <label className="text-[11px] text-slate-300">Total Operators (N1):</label>
                <input type="number" value={n1} onChange={e => setN1(Number(e.target.value))} className="w-full px-2.5 py-1 text-xs bg-slate-900 border border-slate-800 rounded font-mono" />
              </div>
              <div>
                <label className="text-[11px] text-slate-300">Total Operands (N2):</label>
                <input type="number" value={n2} onChange={e => setN2(Number(e.target.value))} className="w-full px-2.5 py-1 text-xs bg-slate-900 border border-slate-800 rounded font-mono" />
              </div>
            </div>
          </div>

          <div className="bg-slate-950/90 p-4 rounded-xl border border-cyan-500/30">
            <div className="text-xs uppercase tracking-wider text-cyan-400 font-semibold mb-3">Analytical Metrics Output</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-sans">Vocabulary &eta;</span>
                <span className="text-base font-bold text-slate-200">{halsteadRes.vocabulary}</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-sans">Length N</span>
                <span className="text-base font-bold text-slate-200">{halsteadRes.totalLength}</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-sans">Estimated Length</span>
                <span className="text-base font-bold text-teal-400">{halsteadRes.estimatedLength}</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-sans">Volume (bits)</span>
                <span className="text-base font-bold text-amber-400">{halsteadRes.volume}</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-sans">Effort E</span>
                <span className="text-base font-bold text-indigo-400">{halsteadRes.effort}</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-sans">Time (hrs)</span>
                <span className="text-base font-bold text-rose-400">{halsteadRes.timeHours} hrs</span>
              </div>
            </div>
            <div className="mt-3 text-[11px] text-slate-400">
              *Effort = Volume / Level = V^2 / V*; Time = E / 18 seconds (Stroud number S = 18 mental discriminations/sec).
            </div>
          </div>
        </div>
      )}

      {activeCalc === 'mccabe' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="text-sm font-bold text-emerald-400">McCabe Cyclomatic Complexity V(G)</h3>
            <div>
              <label className="text-xs text-slate-300">Number of Edges (E):</label>
              <input type="number" value={edges} onChange={e => setEdges(Number(e.target.value))} className="w-full px-2.5 py-1 text-xs bg-slate-900 border border-slate-800 rounded font-mono" />
            </div>
            <div>
              <label className="text-xs text-slate-300">Number of Nodes (N):</label>
              <input type="number" value={nodes} onChange={e => setNodes(Number(e.target.value))} className="w-full px-2.5 py-1 text-xs bg-slate-900 border border-slate-800 rounded font-mono" />
            </div>
            <div>
              <label className="text-xs text-slate-300">Decision Statements (P):</label>
              <input type="number" value={predicates} onChange={e => setPredicates(Number(e.target.value))} className="w-full px-2.5 py-1 text-xs bg-slate-900 border border-slate-800 rounded font-mono" />
            </div>
          </div>

          <div className="bg-slate-950/90 p-5 rounded-xl border border-emerald-500/30 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-2">Complexity Result</div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-xs text-slate-400">V(G) = E - N + 2 = {edges} - {nodes} + 2:</div>
                <div className="text-4xl font-black font-mono text-emerald-400 my-2">{edges - nodes + 2}</div>
                <div className="text-xs text-slate-300">Method 3 check: P + 1 = {predicates} + 1 = <strong className="text-emerald-400">{predicates + 1}</strong></div>
              </div>
            </div>
            <div className="p-3 rounded bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 mt-3">
              Guarantees the maximum number of <strong>linearly independent test paths</strong> needed for 100% path coverage.
            </div>
          </div>
        </div>
      )}

      {activeCalc === 'error_seeding' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="text-sm font-bold text-amber-400">Mills\' Error Seeding Estimator</h3>
            <p className="text-xs text-slate-400">
              Formula: <code>n / N = s / S</code> &rArr; Total Natural Defects <code>N = S * n / s</code>.
            </p>
            <div>
              <label className="text-xs text-slate-300">Seeded Artificial Defects (S):</label>
              <input type="number" value={seededTotal} onChange={e => setSeededTotal(Number(e.target.value))} className="w-full px-2.5 py-1 text-xs bg-slate-900 border border-slate-800 rounded font-mono" />
            </div>
            <div>
              <label className="text-xs text-slate-300">Seeded Defects Found (s):</label>
              <input type="number" value={seededFound} onChange={e => setSeededFound(Number(e.target.value))} className="w-full px-2.5 py-1 text-xs bg-slate-900 border border-slate-800 rounded font-mono" />
            </div>
            <div>
              <label className="text-xs text-slate-300">Natural Defects Found (n):</label>
              <input type="number" value={naturalFound} onChange={e => setNaturalFound(Number(e.target.value))} className="w-full px-2.5 py-1 text-xs bg-slate-900 border border-slate-800 rounded font-mono" />
            </div>
          </div>

          <div className="bg-slate-950/90 p-5 rounded-xl border border-amber-500/30 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold">Predicted Latent Defects</div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <div className="text-xs text-slate-400">Estimated Total Natural Defects (N):</div>
                <div className="text-2xl font-bold font-mono text-slate-100">{errorRes.totalNatural} defects</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <div className="text-xs text-slate-400">Residual Bugs Still Remaining in Code (N - n):</div>
                <div className="text-2xl font-bold font-mono text-rose-400">{errorRes.remainingNatural} defects</div>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 mt-3">
              *Assumption: Seeded defects have identical discovery probabilities as natural defects.
            </div>
          </div>
        </div>
      )}

      {activeCalc === 'fp' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="text-sm font-bold text-teal-400">Albrecht Function Point Metric</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-slate-300 block">External Inputs (weight 4):</label>
                <input type="number" value={fpInputs} onChange={e => setFpInputs(Number(e.target.value))} className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded font-mono" />
              </div>
              <div>
                <label className="text-slate-300 block">External Outputs (weight 5):</label>
                <input type="number" value={fpOutputs} onChange={e => setFpOutputs(Number(e.target.value))} className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded font-mono" />
              </div>
              <div>
                <label className="text-slate-300 block">Inquiries (weight 4):</label>
                <input type="number" value={fpInquiries} onChange={e => setFpInquiries(Number(e.target.value))} className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded font-mono" />
              </div>
              <div>
                <label className="text-slate-300 block">Internal Files (weight 10):</label>
                <input type="number" value={fpFiles} onChange={e => setFpFiles(Number(e.target.value))} className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded font-mono" />
              </div>
              <div>
                <label className="text-slate-300 block">Interfaces (weight 10):</label>
                <input type="number" value={fpInterfaces} onChange={e => setFpInterfaces(Number(e.target.value))} className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded font-mono" />
              </div>
              <div>
                <label className="text-slate-300 block">Degree of Influence (0-70):</label>
                <input type="number" min="0" max="70" value={fpDI} onChange={e => setFpDI(Number(e.target.value))} className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded font-mono" />
              </div>
            </div>
          </div>

          <div className="bg-slate-950/90 p-5 rounded-xl border border-teal-500/30 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-wider text-teal-400 font-semibold">Function Points Output</div>
              <div className="p-2.5 bg-slate-900 rounded border border-slate-800 text-xs font-mono">
                <span className="text-slate-400 font-sans block">Unadjusted FP (UFP):</span>
                <span className="text-lg font-bold text-slate-200">{fpRes.ufp}</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded border border-slate-800 text-xs font-mono">
                <span className="text-slate-400 font-sans block">Technical Complexity Factor (TCF = 0.65 + 0.01*DI):</span>
                <span className="text-lg font-bold text-teal-300">{fpRes.tcf}</span>
              </div>
              <div className="p-3 bg-teal-950/40 rounded-xl border border-teal-500/40 text-center font-mono">
                <span className="text-xs text-teal-300 font-sans block">Final Function Points (FP = UFP * TCF):</span>
                <span className="text-3xl font-black text-white">{fpRes.fp} FP</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
