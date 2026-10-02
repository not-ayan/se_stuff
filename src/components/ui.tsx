import React from 'react';
import type { Accent } from '../content/chapters';

/**
 * Chapter accents are a garnish, not a theme: they tint the module chip and
 * nothing else. Every progress fill is ink, so a twelve-chapter grid stays
 * calm instead of reading as a rainbow.
 */
export const ACCENT_CLASSES: Record<Accent, { text: string; bg: string; ring: string; bar: string; soft: string }> = {
  indigo: { text: 'text-indigo-700', bg: 'bg-indigo-50', ring: 'ring-indigo-200', bar: 'bg-ink', soft: 'bg-indigo-50' },
  sky: { text: 'text-sky-700', bg: 'bg-sky-50', ring: 'ring-sky-200', bar: 'bg-ink', soft: 'bg-sky-50' },
  emerald: { text: 'text-emerald-700', bg: 'bg-emerald-50', ring: 'ring-emerald-200', bar: 'bg-ink', soft: 'bg-emerald-50' },
  amber: { text: 'text-amber-700', bg: 'bg-amber-50', ring: 'ring-amber-200', bar: 'bg-ink', soft: 'bg-amber-50' },
  rose: { text: 'text-rose-700', bg: 'bg-rose-50', ring: 'ring-rose-200', bar: 'bg-ink', soft: 'bg-rose-50' },
  violet: { text: 'text-violet-700', bg: 'bg-violet-50', ring: 'ring-violet-200', bar: 'bg-ink', soft: 'bg-violet-50' },
};

export const ProgressBar: React.FC<{ value: number; className?: string; tone?: string }> = ({
  value,
  className = '',
  tone = 'bg-ink',
}) => (
  <div
    className={`h-1.5 w-full overflow-hidden rounded-full bg-line ${className}`}
    role="progressbar"
    aria-valuenow={Math.round(value)}
    aria-valuemin={0}
    aria-valuemax={100}
  >
    <div
      className={`h-full rounded-full transition-all duration-500 ${tone}`}
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

export const Pill: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full border border-line bg-canvas px-2.5 py-[3px] text-[10.5px] font-medium text-subtle ${className}`}
  >
    {children}
  </span>
);

/** A white card with a rounded-square icon, a big value and a gray hint. */
export const StatTile: React.FC<{
  label: string;
  value: React.ReactNode;
  hint?: string;
  icon: React.ReactNode;
  tone?: string;
}> = ({ label, value, hint, icon, tone = 'text-ink' }) => (
  <div className="rounded-2xl border border-line bg-surface p-4">
    <div className="flex items-start justify-between gap-3">
      <span className="text-[11px] font-medium text-muted">{label}</span>
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-canvas">
        <span className={tone}>{icon}</span>
      </span>
    </div>
    <div className="mt-2 text-2xl font-semibold tracking-tight text-ink">{value}</div>
    {hint && <div className="mt-1 text-[11.5px] leading-snug text-subtle">{hint}</div>}
  </div>
);

export const SectionHeading: React.FC<{
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}> = ({ eyebrow, title, description, action }) => (
  <div className="flex flex-wrap items-end justify-between gap-3">
    <div>
      {eyebrow && <div className="text-[11.5px] font-medium text-muted">{eyebrow}</div>}
      <h2 className="mt-0.5 text-[17px] font-semibold tracking-tight text-ink sm:text-[19px]">{title}</h2>
      {description && <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-subtle">{description}</p>}
    </div>
    {action}
  </div>
);

export const VIEW_LABELS: Record<string, string> = {
  home: 'Home',
  learn: 'Learn',
  quiz: 'Quiz',
  cards: 'Flashcards',
  labs: 'Labs',
};
