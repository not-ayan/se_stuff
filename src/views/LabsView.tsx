import React, { useState } from 'react';
import { Calculator, Dices, Layers3 } from 'lucide-react';
import { FormulaCalculator } from '../components/FormulaCalculator';
import { DiagramViewer } from '../components/DiagramViewer';
import { ProblemGeneratorStudio } from '../components/ProblemGeneratorStudio';
import { SectionHeading } from '../components/ui';

export type LabTab = 'generator' | 'diagrams' | 'numerical';

interface LabsViewProps {
  initialTab?: LabTab;
}

const DIAGRAMS = [
  { type: 'rtm_traceability', title: 'Module 1 · Requirements Traceability Matrix (Forward & Backward Traceability)' },
  { type: 'waterfall_effort', title: 'Module 2 · Classical Waterfall: 6 Phases & 40:60 Life Cycle Effort Split' },
  { type: 'iterative_waterfall', title: 'Module 2 · Iterative Waterfall: Feedback Paths & Phase Containment' },
  { type: 'maintainability_portability', title: 'Module 3 · Software Quality: Maintainability (40:60 Rule) & Portability (HAL)' },
  { type: 'decision_tree_table', title: 'Module 4 · Formal Specification: Decision Tables (2^k Rules) & Trees' },
  { type: 'fod_vs_ood', title: 'Module 5 · Software Design: Function-Oriented (FOD) vs Object-Oriented (OOD)' },
  { type: 'cohesion_coupling_ladders', title: 'Module 5 · Cohesion (7 Levels) & Coupling (5 Levels) Spectrums' },
  { type: 'testing_pyramid_drivers_stubs', title: 'Module 6 · Testing Fundamentals: Error-Fault-Failure & Drivers/Stubs' },
  { type: 'bathtub_software_curve', title: 'Hardware Bathtub Curve vs Software Failure Curve' },
];

export const LabsView: React.FC<LabsViewProps> = ({ initialTab = 'generator' }) => {
  const [tab, setTab] = useState<LabTab>(initialTab);

  const tabs: { key: LabTab; label: string; description: string; icon: React.ReactNode }[] = [
    {
      key: 'generator',
      label: 'Mid-Term Problem Studio',
      description: 'Procedural problems with real-time solution checkers',
      icon: <Dices className="h-4 w-4 text-amber-500" />,
    },
    {
      key: 'diagrams',
      label: 'Concept Visualizers',
      description: 'Waterfall, Spiral, Bathtub, Cohesion/Coupling',
      icon: <Layers3 className="h-4 w-4 text-emerald-500" />,
    },
    {
      key: 'numerical',
      label: 'Metrics & Calculators',
      description: 'Availability, MTBF, Defect Cost, Estimation',
      icon: <Calculator className="h-4 w-4 text-sky-500" />,
    },
  ];

  return (
    <div className="mx-auto max-w-[1100px] space-y-6 px-4 py-8 sm:px-6">
      <SectionHeading
        eyebrow="Interactive Labs"
        title="CSMC501 Practice Studios"
        description="Solve procedural mid-term problems with real-time verification, explore conceptual architectures, and calculate software metrics."
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

      {tab === 'generator' && <ProblemGeneratorStudio />}
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
