import React, { useEffect, useState } from 'react';
import { ArrowLeft, Check, Eye, RotateCcw, Sparkles, X } from 'lucide-react';
import { CHAPTERS } from '../content/chapters';
import { FLASHCARDS, getFlashcardsForChapter, type Flashcard } from '../data/flashcards';
import { useProgress } from '../lib/progress';
import { SectionHeading } from '../components/ui';

interface FlashcardsViewProps {
  initialChapterId?: string;
}

type Phase = 'setup' | 'study' | 'done';

const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ initialChapterId }) => {
  const { recordCard, state } = useProgress();
  const [phase, setPhase] = useState<Phase>('setup');
  const [chapterId, setChapterId] = useState<string>(initialChapterId ?? 'all');
  const [deck, setDeck] = useState<Flashcard[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);

  useEffect(() => {
    if (initialChapterId) {
      setChapterId(initialChapterId);
      setPhase('setup');
    }
  }, [initialChapterId]);

  const deckSource = chapterId === 'all' ? FLASHCARDS : getFlashcardsForChapter(chapterId);

  const startDeck = () => {
    if (deckSource.length === 0) return;
    setDeck(shuffle(deckSource));
    setIndex(0);
    setFlipped(false);
    setKnownCount(0);
    setPhase('study');
  };

  const answer = (known: boolean) => {
    recordCard(deck[index].id, known);
    if (known) setKnownCount((prev) => prev + 1);
    if (index + 1 >= deck.length) {
      setPhase('done');
      return;
    }
    setIndex((prev) => prev + 1);
    setFlipped(false);
  };

  const knownTotal = Object.values(state.cards).filter((card) => card.known > 0).length;

  /* ── Setup ───────────────────────────────────────────────────────────── */
  if (phase === 'setup') {
    return (
      <div className="mx-auto max-w-[900px] space-y-6 px-4 py-8 sm:px-6">
        <SectionHeading
          eyebrow="Active recall"
          title="Flashcards"
          description={`${FLASHCARDS.length} recall cards. Read the prompt, answer from memory, then check yourself.`}
          action={
            <span className="rounded-xl border border-line bg-surface px-3 py-2 font-mono text-[11px] text-subtle">
              {knownTotal}/{FLASHCARDS.length} mastered
            </span>
          }
        />

        <div className="rounded-2xl border border-line bg-surface p-5">
          <label htmlFor="deck" className="text-[11px] text-subtle">
            Deck
          </label>
          <select
            id="deck"
            value={chapterId}
            onChange={(event) => setChapterId(event.target.value)}
            className="mt-2 w-full rounded-xl border border-line-strong bg-canvas px-3 py-2.5 text-[13px] text-ink focus:border-sky-600 focus:outline-none"
          >
            <option value="all">All chapters — {FLASHCARDS.length} cards</option>
            {CHAPTERS.map((chapter) => {
              const count = getFlashcardsForChapter(chapter.id).length;
              if (count === 0) return null;
              return (
                <option key={chapter.id} value={chapter.id}>
                  {chapter.moduleLabel} · {chapter.title} — {count} cards
                </option>
              );
            })}
          </select>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button
              onClick={startDeck}
              className="flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-[13px] font-semibold text-paper transition-colors hover:bg-ink/90"
            >
              <Sparkles className="h-4 w-4" /> Study {deckSource.length} cards
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {CHAPTERS.map((chapter) => {
            const cards = getFlashcardsForChapter(chapter.id);
            if (cards.length === 0) return null;
            const mastered = cards.filter((card) => (state.cards[card.id]?.known ?? 0) > 0).length;
            return (
              <button
                key={chapter.id}
                onClick={() => {
                  setChapterId(chapter.id);
                  setDeck(shuffle(cards));
                  setIndex(0);
                  setFlipped(false);
                  setKnownCount(0);
                  setPhase('study');
                }}
                className="rounded-2xl border border-line bg-surface p-4 text-left transition-colors hover:border-line-strong"
              >
                <div className="text-[10.5px] text-muted">{chapter.moduleLabel}</div>
                <div className="mt-1 text-[13px] font-semibold text-ink">{chapter.title}</div>
                <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-muted">
                  <span>{cards.length} cards</span>
                  <span className="text-emerald-700">{mastered} mastered</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* ── Done ────────────────────────────────────────────────────────────── */
  if (phase === 'done') {
    return (
      <div className="mx-auto max-w-[700px] px-4 py-16 text-center sm:px-6">
        <Check className="mx-auto h-10 w-10 text-emerald-700" />
        <h2 className="mt-4 text-2xl font-bold text-ink">Deck complete</h2>
        <p className="mt-2 text-[13.5px] text-subtle">
          You recalled {knownCount} of {deck.length} cards ({Math.round((knownCount / deck.length) * 100)}%).
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={startDeck} className="flex items-center gap-2 rounded-xl bg-ink px-4 py-2 text-[13px] font-semibold text-paper hover:bg-ink/90">
            <RotateCcw className="h-3.5 w-3.5" /> Shuffle and repeat
          </button>
          <button onClick={() => setPhase('setup')} className="rounded-xl border border-line-strong px-4 py-2 text-[13px] font-semibold text-strong hover:border-faint">
            Choose another deck
          </button>
        </div>
      </div>
    );
  }

  /* ── Study ───────────────────────────────────────────────────────────── */
  const card = deck[index];
  return (
    <div className="mx-auto max-w-[700px] space-y-5 px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between">
        <button onClick={() => setPhase('setup')} className="flex items-center gap-1.5 text-[12.5px] text-subtle hover:text-ink">
          <ArrowLeft className="h-3.5 w-3.5" /> Exit deck
        </button>
        <span className="font-mono text-[11px] text-muted">
          {index + 1} / {deck.length}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
        <div className="h-full rounded-full bg-ink transition-all duration-300" style={{ width: `${((index + 1) / deck.length) * 100}%` }} />
      </div>

      <div
        className={`flex min-h-[340px] flex-col items-center justify-center rounded-3xl border p-7 text-center transition-colors duration-300 ${
          flipped ? 'border-ink bg-ink' : 'border-line bg-surface'
        }`}
      >
        <span className={`text-[10.5px] ${flipped ? 'text-white/55' : 'text-muted'}`}>
          {flipped ? 'Answer' : 'Prompt'}
        </span>
        <p
          className={`mt-4 text-balance font-semibold leading-relaxed ${
            flipped ? 'text-[16px] text-paper' : 'text-xl text-ink'
          }`}
        >
          {flipped ? card.back : card.front}
        </p>
        {!flipped && (
          <button
            onClick={() => setFlipped(true)}
            className="mt-6 flex items-center gap-2 rounded-xl bg-ink px-4 py-2 text-[13px] font-semibold text-paper transition-colors hover:bg-ink/85"
          >
            <Eye className="h-4 w-4" /> Reveal answer
          </button>
        )}
      </div>

      {flipped && (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => answer(false)}
            className="flex items-center justify-center gap-2 rounded-xl border border-rose-500/40 bg-rose-50 px-4 py-3 text-[13px] font-semibold text-rose-800 transition-colors hover:bg-rose-50"
          >
            <X className="h-4 w-4" /> Again
          </button>
          <button
            onClick={() => answer(true)}
            className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-50 px-4 py-3 text-[13px] font-semibold text-emerald-800 transition-colors hover:bg-emerald-50"
          >
            <Check className="h-4 w-4" /> Got it
          </button>
        </div>
      )}
    </div>
  );
};
