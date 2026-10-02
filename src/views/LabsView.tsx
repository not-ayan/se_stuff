import React, { useState } from 'react';
import { Calculator, Layers3, Network } from 'lucide-react';
import { DFDStudio } from '../components/DFDStudio';
import { FormulaCalculator } from '../components/FormulaCalculator';
import { DiagramViewer } from '../components/DiagramViewer';
import { SectionHeading } from '../components/ui';

type LabTab = 'dfd' | 'numerical' | 'diagrams';

interface LabsViewProps {
  initialTab?: LabTab;
}

const DIAGRAMS = [
  { type: 'waterfall_effort', title: 'Classical waterfall: 6 phases & effort distribution' },
  { type: 'iterative_waterfall', title: 'Iterative waterfall: feedback paths & phase containment' },
  { type: 'spiral_quadrants', title: 'Boehm spiral model: four quadrants & risk loops' },
  { type: 'cohesion_coupling_ladders', title: 'Cohesion (7 levels) & coupling (5 levels)' },
  { type: 'cfg_cyclomatic', title: 'Control flow graph & McCabe cyclomatic complexity' },
  { type: 'bathtub_software_curve', title: 'Hardware bathtub curve vs software failure curve' },
  { type: 'cmm_pyramid', title: 'SEI capability maturity model: 5 levels & KPAs' },
];

export const LabsView: React.FC<LabsViewProps> = ({ initialTab = 'dfd' }) => {
  const [tab, setTab] = useState<LabTab>(initialTab);

  const tabs: { key: LabTab; label: string; description: string; icon: React.ReactNode }[] = [
    { key: 'dfd', label: 'DFD Studio', description: 'Structured analysis, step by step', icon: <Network className="h-4 w-4" /> },
    { key: 'numerical', label: 'Numerical Lab', description: 'COCOMO, Putnam, Halstead, McCabe', icon: <Calculator className="h-4 w-4" /> },
    { key: 'diagrams', label: 'Diagrams', description: 'Interactive concept visualisers', icon: <Layers3 className="h-4 w-4" /> },
  ];

  return (
    <div className="mx-auto max-w-[1100px] space-y-6 px-4 py-8 sm:px-6">
      <SectionHeading
        eyebrow="Practice labs"
        title="Apply what you read"
        description="Work through structured-analysis problems, run the exam numericals, and inspect the core diagrams."
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {tabs.map((item) => {
          const active = tab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${
                active ? 'border-ink bg-ink' : 'border-line bg-surface hover:border-line-strong'
              }`}
            >
              <span className={`mt-0.5 ${active ? 'text-paper' : 'text-subtle'}`}>{item.icon}</span>
              <span>
                <span className={`block text-[13.5px] font-semibold ${active ? 'text-paper' : 'text-ink'}`}>{item.label}</span>
                <span className={`block text-[11.5px] ${active ? 'text-white/60' : 'text-subtle'}`}>{item.description}</span>
              </span>
            </button>
          );
        })}
      </div>

      {tab === 'dfd' && <DFDStudio />}
      {tab === 'numerical' && <FormulaCalculator />}
      {tab === 'diagrams' && (
        <div className="space-y-5">
          {DIAGRAMS.map((diagram) => (
            <DiagramViewer key={diagram.type} type={diagram.type} title={diagram.title} />
          ))}
        </div>
      )}
    </div>
  );
};
