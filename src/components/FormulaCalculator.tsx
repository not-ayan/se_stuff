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
    <div className="bg-surface border border-line rounded-2xl p-4 sm:p-6 text-ink shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-700">
              <Calculator className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold tracking-tight">Interactive SE Formula & Numerical Lab</h2>
          </div>
          <p className="text-xs text-subtle mt-1">
            Real-time numerical solvers for university exams: COCOMO, Putnam 4th Power, Halstead, Cyclomatic Complexity & Error Seeding.
          </p>
        </div>

        {/* Tab pills */}
        <div className="flex flex-wrap gap-1.5 bg-canvas p-1.5 rounded-xl border border-line">
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
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeCalc === tab.id ? 'bg-ink text-paper' : 'text-subtle hover:text-strong hover:bg-surface'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* CALCULATOR PANELS */}
      {activeCalc === 'cocomo' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4 bg-canvas p-4 rounded-xl border border-line">
            <h3 className="text-sm font-bold text-indigo-700 flex items-center gap-2">
              <Zap className="w-4 h-4" /> Parameters Input
            </h3>
            <div>
              <label className="block text-xs text-body font-medium mb-1">
                Project Size in Kilo Lines of Code (KLOC): <span className="text-amber-700 font-mono font-bold">{cocomoSize} KLOC</span> ({cocomoSize * 1000} LOC)
              </label>
              <input
                type="range"
                min="1"
                max="200"
                value={cocomoSize}
                onChange={e => setCocomoSize(Number(e.target.value))}
                className="w-full accent-ink cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs text-body font-medium mb-1">Project Category:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'organic', name: 'Organic', desc: 'Small, familiar' },
                  { id: 'semidetached', name: 'Semi-Detached', desc: 'Mixed experience' },
                  { id: 'embedded', name: 'Embedded', desc: 'Hardware coupled' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCocomoMode(cat.id as any)}
                    className={`p-2 rounded-lg border text-left text-xs transition-all ${cocomoMode === cat.id ? 'border-ink bg-canvas text-ink' : 'border-line bg-surface text-subtle'}`}
                  >
                    <div className="font-bold">{cat.name}</div>
                    <div className="text-[10px] opacity-75">{cat.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-body font-medium mb-1">Avg Engineer Salary per Month (₹ / $):</label>
              <input
                type="number"
                value={cocomoSalary}
                onChange={e => setCocomoSalary(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs bg-surface border border-line rounded-lg text-strong font-mono"
              />
            </div>
          </div>

          {/* Results display */}
          <div className="bg-canvas p-5 rounded-xl border border-indigo-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-line pb-2">
                <span className="text-[11px] text-subtle font-semibold">COCOMO Output</span>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-700 font-mono">
                  Effort = {cocomoRes.a1} * (KLOC)^{cocomoRes.a2}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-lg bg-surface border border-line">
                  <div className="text-[11px] text-subtle">Nominal Effort</div>
                  <div className="text-2xl font-black text-amber-700 font-mono">{cocomoRes.effort} <span className="text-xs font-normal text-subtle">PM</span></div>
                  <div className="text-[10px] text-muted mt-1">Person-Months required</div>
                </div>

                <div className="p-3 rounded-lg bg-surface border border-line">
                  <div className="text-[11px] text-subtle">Nominal Duration</div>
                  <div className="text-2xl font-black text-emerald-700 font-mono">{cocomoRes.tdev} <span className="text-xs font-normal text-subtle">Months</span></div>
                  <div className="text-[10px] text-muted mt-1">Calendar time to develop</div>
                </div>

                <div className="p-3 rounded-lg bg-surface border border-line">
                  <div className="text-[11px] text-subtle">Average Team Size</div>
                  <div className="text-xl font-bold text-cyan-700 font-mono">{cocomoRes.avgStaff} <span className="text-xs font-normal text-subtle">Engineers</span></div>
                  <div className="text-[10px] text-muted mt-1">Effort / Duration</div>
                </div>

                <div className="p-3 rounded-lg bg-surface border border-line">
                  <div className="text-[11px] text-subtle">Estimated Cost</div>
                  <div className="text-xl font-bold text-indigo-700 font-mono">₹{cocomoRes.cost.toLocaleString()}</div>
                  <div className="text-[10px] text-muted mt-1">Manpower budget</div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded bg-amber-50 border border-amber-200 text-xs text-amber-700">
              <strong>Exam Note:</strong> For 32 KLOC organic software: Effort = 2.4 * (32)^1.05 = <strong>91 PM</strong>; Nominal Time = 2.5 * (91)^0.38 = <strong>14 Months</strong>.
            </div>
          </div>
        </div>
      )}

      {activeCalc === 'putnam' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4 bg-canvas p-4 rounded-xl border border-line">
            <h3 className="text-sm font-bold text-rose-700">Putnam\'s 4th Power Schedule Compression Law</h3>
            <p className="text-xs text-subtle">
              Putnam proved that Effort/Cost is inversely proportional to the <strong>4th power of delivery duration</strong>: <code>Cost &prop; 1 / (td^4)</code>.
            </p>

            <div>
              <label className="block text-xs text-body font-medium mb-1">Original Normal Duration (td1): {origDuration} Months</label>
              <input
                type="number"
                value={origDuration}
                onChange={e => setOrigDuration(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs bg-surface border border-line rounded-lg text-strong font-mono"
              />
            </div>

            <div>
              <label className="block text-xs text-body font-medium mb-1">Target Compressed Duration (td2): {newDuration} Months</label>
              <input
                type="number"
                value={newDuration}
                onChange={e => setNewDuration(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs bg-surface border border-line rounded-lg text-strong font-mono"
              />
            </div>

            <div>
              <label className="block text-xs text-body font-medium mb-1">Original Estimated Cost (₹ / $):</label>
              <input
                type="number"
                value={origCost}
                onChange={e => setOrigCost(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs bg-surface border border-line rounded-lg text-strong font-mono"
              />
            </div>
          </div>

          <div className="bg-canvas p-5 rounded-xl border border-rose-200 flex flex-col justify-between">
            <div>
              <div className="text-[11px] text-rose-700 font-semibold mb-2">Cost Penalty Analysis</div>
              <div className="p-4 rounded-xl bg-surface border border-line mb-4">
                <div className="text-xs text-subtle">Schedule Compression Ratio (td1 / td2):</div>
                <div className="text-xl font-bold font-mono text-strong">{putnamRes.compressionRatio}x speedup</div>

                <div className="mt-3 text-xs text-subtle">Effort &amp; Cost Multiplication Factor (Ratio^4):</div>
                <div className="text-3xl font-black font-mono text-rose-700">{putnamRes.effortMultiplier}x increase!</div>

                <div className="mt-3 text-xs text-subtle">New Required Budget:</div>
                <div className="text-2xl font-black font-mono text-amber-700">₹{putnamRes.newCost.toLocaleString()}</div>
              </div>
            </div>

            <div className="p-3 rounded bg-rose-50 border border-rose-200 text-xs text-rose-700">
              <strong>Classic Exam Question:</strong> "If normal duration is 1 year (12 months), and client demands delivery in 6 months, how much does cost increase?"
              <br />
              <strong>Answer:</strong> (12 / 6)^4 = 2^4 = <strong>16 times higher cost</strong>!
            </div>
          </div>
        </div>
      )}

      {activeCalc === 'halstead' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3 bg-canvas p-4 rounded-xl border border-line">
            <h3 className="text-sm font-bold text-cyan-700">Halstead\'s Software Science Inputs</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-body">Unique Operators (&eta;1):</label>
                <input type="number" value={eta1} onChange={e => setEta1(Number(e.target.value))} className="w-full px-2.5 py-1 text-xs bg-surface border border-line rounded font-mono" />
              </div>
              <div>
                <label className="text-[11px] text-body">Unique Operands (&eta;2):</label>
                <input type="number" value={eta2} onChange={e => setEta2(Number(e.target.value))} className="w-full px-2.5 py-1 text-xs bg-surface border border-line rounded font-mono" />
              </div>
              <div>
                <label className="text-[11px] text-body">Total Operators (N1):</label>
                <input type="number" value={n1} onChange={e => setN1(Number(e.target.value))} className="w-full px-2.5 py-1 text-xs bg-surface border border-line rounded font-mono" />
              </div>
              <div>
                <label className="text-[11px] text-body">Total Operands (N2):</label>
                <input type="number" value={n2} onChange={e => setN2(Number(e.target.value))} className="w-full px-2.5 py-1 text-xs bg-surface border border-line rounded font-mono" />
              </div>
            </div>
          </div>

          <div className="bg-canvas p-4 rounded-xl border border-cyan-200">
            <div className="text-[11px] text-cyan-700 font-semibold mb-3">Analytical Metrics Output</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
              <div className="p-2 bg-surface rounded border border-line">
                <span className="text-[10px] text-subtle block font-sans">Vocabulary &eta;</span>
                <span className="text-base font-bold text-strong">{halsteadRes.vocabulary}</span>
              </div>
              <div className="p-2 bg-surface rounded border border-line">
                <span className="text-[10px] text-subtle block font-sans">Length N</span>
                <span className="text-base font-bold text-strong">{halsteadRes.totalLength}</span>
              </div>
              <div className="p-2 bg-surface rounded border border-line">
                <span className="text-[10px] text-subtle block font-sans">Estimated Length</span>
                <span className="text-base font-bold text-teal-700">{halsteadRes.estimatedLength}</span>
              </div>
              <div className="p-2 bg-surface rounded border border-line">
                <span className="text-[10px] text-subtle block font-sans">Volume (bits)</span>
                <span className="text-base font-bold text-amber-700">{halsteadRes.volume}</span>
              </div>
              <div className="p-2 bg-surface rounded border border-line">
                <span className="text-[10px] text-subtle block font-sans">Effort E</span>
                <span className="text-base font-bold text-indigo-700">{halsteadRes.effort}</span>
              </div>
              <div className="p-2 bg-surface rounded border border-line">
                <span className="text-[10px] text-subtle block font-sans">Time (hrs)</span>
                <span className="text-base font-bold text-rose-700">{halsteadRes.timeHours} hrs</span>
              </div>
            </div>
            <div className="mt-3 text-[11px] text-subtle">
              *Effort = Volume / Level = V^2 / V*; Time = E / 18 seconds (Stroud number S = 18 mental discriminations/sec).
            </div>
          </div>
        </div>
      )}

      {activeCalc === 'mccabe' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3 bg-canvas p-4 rounded-xl border border-line">
            <h3 className="text-sm font-bold text-emerald-700">McCabe Cyclomatic Complexity V(G)</h3>
            <div>
              <label className="text-xs text-body">Number of Edges (E):</label>
              <input type="number" value={edges} onChange={e => setEdges(Number(e.target.value))} className="w-full px-2.5 py-1 text-xs bg-surface border border-line rounded font-mono" />
            </div>
            <div>
              <label className="text-xs text-body">Number of Nodes (N):</label>
              <input type="number" value={nodes} onChange={e => setNodes(Number(e.target.value))} className="w-full px-2.5 py-1 text-xs bg-surface border border-line rounded font-mono" />
            </div>
            <div>
              <label className="text-xs text-body">Decision Statements (P):</label>
              <input type="number" value={predicates} onChange={e => setPredicates(Number(e.target.value))} className="w-full px-2.5 py-1 text-xs bg-surface border border-line rounded font-mono" />
            </div>
          </div>

          <div className="bg-canvas p-5 rounded-xl border border-emerald-200 flex flex-col justify-between">
            <div>
              <div className="text-[11px] text-emerald-700 font-semibold mb-2">Complexity Result</div>
              <div className="p-4 rounded-xl bg-surface border border-line text-center">
                <div className="text-xs text-subtle">V(G) = E - N + 2 = {edges} - {nodes} + 2:</div>
                <div className="text-4xl font-black font-mono text-emerald-700 my-2">{edges - nodes + 2}</div>
                <div className="text-xs text-body">Method 3 check: P + 1 = {predicates} + 1 = <strong className="text-emerald-700">{predicates + 1}</strong></div>
              </div>
            </div>
            <div className="p-3 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 mt-3">
              Guarantees the maximum number of <strong>linearly independent test paths</strong> needed for 100% path coverage.
            </div>
          </div>
        </div>
      )}

      {activeCalc === 'error_seeding' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3 bg-canvas p-4 rounded-xl border border-line">
            <h3 className="text-sm font-bold text-amber-700">Mills\' Error Seeding Estimator</h3>
            <p className="text-xs text-subtle">
              Formula: <code>n / N = s / S</code> &rArr; Total Natural Defects <code>N = S * n / s</code>.
            </p>
            <div>
              <label className="text-xs text-body">Seeded Artificial Defects (S):</label>
              <input type="number" value={seededTotal} onChange={e => setSeededTotal(Number(e.target.value))} className="w-full px-2.5 py-1 text-xs bg-surface border border-line rounded font-mono" />
            </div>
            <div>
              <label className="text-xs text-body">Seeded Defects Found (s):</label>
              <input type="number" value={seededFound} onChange={e => setSeededFound(Number(e.target.value))} className="w-full px-2.5 py-1 text-xs bg-surface border border-line rounded font-mono" />
            </div>
            <div>
              <label className="text-xs text-body">Natural Defects Found (n):</label>
              <input type="number" value={naturalFound} onChange={e => setNaturalFound(Number(e.target.value))} className="w-full px-2.5 py-1 text-xs bg-surface border border-line rounded font-mono" />
            </div>
          </div>

          <div className="bg-canvas p-5 rounded-xl border border-amber-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-[11px] text-amber-700 font-semibold">Predicted Latent Defects</div>
              <div className="p-3 bg-surface rounded-lg border border-line">
                <div className="text-xs text-subtle">Estimated Total Natural Defects (N):</div>
                <div className="text-2xl font-bold font-mono text-ink">{errorRes.totalNatural} defects</div>
              </div>
              <div className="p-3 bg-surface rounded-lg border border-line">
                <div className="text-xs text-subtle">Residual Bugs Still Remaining in Code (N - n):</div>
                <div className="text-2xl font-bold font-mono text-rose-700">{errorRes.remainingNatural} defects</div>
              </div>
            </div>
            <div className="text-[11px] text-subtle mt-3">
              *Assumption: Seeded defects have identical discovery probabilities as natural defects.
            </div>
          </div>
        </div>
      )}

      {activeCalc === 'fp' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3 bg-canvas p-4 rounded-xl border border-line">
            <h3 className="text-sm font-bold text-teal-700">Albrecht Function Point Metric</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-body block">External Inputs (weight 4):</label>
                <input type="number" value={fpInputs} onChange={e => setFpInputs(Number(e.target.value))} className="w-full px-2 py-1 bg-surface border border-line rounded font-mono" />
              </div>
              <div>
                <label className="text-body block">External Outputs (weight 5):</label>
                <input type="number" value={fpOutputs} onChange={e => setFpOutputs(Number(e.target.value))} className="w-full px-2 py-1 bg-surface border border-line rounded font-mono" />
              </div>
              <div>
                <label className="text-body block">Inquiries (weight 4):</label>
                <input type="number" value={fpInquiries} onChange={e => setFpInquiries(Number(e.target.value))} className="w-full px-2 py-1 bg-surface border border-line rounded font-mono" />
              </div>
              <div>
                <label className="text-body block">Internal Files (weight 10):</label>
                <input type="number" value={fpFiles} onChange={e => setFpFiles(Number(e.target.value))} className="w-full px-2 py-1 bg-surface border border-line rounded font-mono" />
              </div>
              <div>
                <label className="text-body block">Interfaces (weight 10):</label>
                <input type="number" value={fpInterfaces} onChange={e => setFpInterfaces(Number(e.target.value))} className="w-full px-2 py-1 bg-surface border border-line rounded font-mono" />
              </div>
              <div>
                <label className="text-body block">Degree of Influence (0-70):</label>
                <input type="number" min="0" max="70" value={fpDI} onChange={e => setFpDI(Number(e.target.value))} className="w-full px-2 py-1 bg-surface border border-line rounded font-mono" />
              </div>
            </div>
          </div>

          <div className="bg-canvas p-5 rounded-xl border border-teal-200 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-[11px] text-teal-700 font-semibold">Function Points Output</div>
              <div className="p-2.5 bg-surface rounded border border-line text-xs font-mono">
                <span className="text-subtle font-sans block">Unadjusted FP (UFP):</span>
                <span className="text-lg font-bold text-strong">{fpRes.ufp}</span>
              </div>
              <div className="p-2.5 bg-surface rounded border border-line text-xs font-mono">
                <span className="text-subtle font-sans block">Technical Complexity Factor (TCF = 0.65 + 0.01*DI):</span>
                <span className="text-lg font-bold text-teal-700">{fpRes.tcf}</span>
              </div>
              <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-center font-mono">
                <span className="text-xs text-teal-700 font-sans block">Final Function Points (FP = UFP * TCF):</span>
                <span className="text-3xl font-black text-teal-800">{fpRes.fp} FP</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
