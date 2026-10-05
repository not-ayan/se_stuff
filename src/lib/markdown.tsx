import React from 'react';
import katex from 'katex';

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export interface RenderedMarkdown {
  content: React.ReactNode;
  headings: TocHeading[];
}

interface InlineContext {
  keyPrefix: string;
}

/**
 * Renders a LaTeX fragment with KaTeX. If KaTeX cannot parse the fragment we
 * fall back to a readable unicode rendering rather than showing raw TeX.
 */
const renderMath = (tex: string, display: boolean, key: string): React.ReactNode => {
  try {
    const html = katex.renderToString(tex, {
      displayMode: display,
      throwOnError: false,
      strict: false,
      output: 'html',
    });
    return (
      <span
        key={key}
        className={display ? 'my-3 block overflow-x-auto text-center' : 'inline-block px-1 align-baseline'}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch {
    return (
      <code key={key} className="rounded bg-line px-1.5 py-0.5 font-mono text-[0.85em] text-cyan-800">
        {tex}
      </code>
    );
  }
};

const INLINE_PATTERN =
  /(\*\*[^*]+\*\*|__[^_]+__|~~[^~]+~~|`[^`]+`|\\\[[\s\S]+?\\\]|\\\([^\n]+?\\\)|\$\$[^$]+\$\$|\$[^$\n]+\$|\[[^\]]+\]\([^)]+\)|\*[^*\n]+\*|(?<![\w_])_[^_\n]+_(?![\w_]))/g;

/**
 * Parses inline markdown (bold, italic, code, links, math, strikethrough)
 * into React nodes. Supports both $...$/$$...$$ and \(...\)/\[...\] LaTeX math delimiters.
 */
export const renderInline = (text: string, ctx: InlineContext): React.ReactNode[] => {
  const parts = text.split(INLINE_PATTERN).filter((part) => part !== undefined && part !== '');
  return parts.map((part, index) => {
    const key = `${ctx.keyPrefix}-i${index}`;
    if (/^\*\*[^*]+\*\*$/.test(part) || /^__[^_]+__$/.test(part)) {
      return <strong key={key} className="font-semibold text-ink">{part.slice(2, -2)}</strong>;
    }
    if (/^~~[^~]+~~$/.test(part)) {
      return <del key={key} className="text-muted">{part.slice(2, -2)}</del>;
    }
    if (/^`[^`]+`$/.test(part)) {
      return (
        <code key={key} className="rounded bg-line px-1.5 py-0.5 font-mono text-[0.85em] text-emerald-800">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (/^\\\([^\n]+?\\\)$/.test(part)) return renderMath(part.slice(2, -2).trim(), false, key);
    if (/^\\\[[\s\S]+?\\\]$/.test(part)) return renderMath(part.slice(2, -2).trim(), true, key);
    if (/^\$\$[^$]+\$\$$/.test(part)) return renderMath(part.slice(2, -2).trim(), true, key);
    if (/^\$[^$\n]+\$$/.test(part)) return renderMath(part.slice(1, -1).trim(), false, key);
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      return (
        <a
          key={key}
          href={link[2]}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-indigo-700 underline decoration-indigo-500/40 underline-offset-2 hover:text-indigo-800"
        >
          {link[1]}
        </a>
      );
    }
    if (/^\*[^*\n]+\*$/.test(part) || /^_[^_\n]+_$/.test(part)) {
      return <em key={key} className="italic text-strong">{part.slice(1, -1)}</em>;
    }
    return <React.Fragment key={key}>{part}</React.Fragment>;
  });
};

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[`*_$~]/g, '')
    .replace(/\\\(.*?\\\)/g, '')
    .replace(/\\\[.*?\\\]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 64) || 'section';

const HEADING_RE = /^(#{1,6})\s+(.*)$/;

const normalize = (source: string): string[] => source.replace(/\r\n/g, '\n').split('\n');

/**
 * Pre-computes the heading outline (with stable, de-duplicated ids) for a
 * document. Both the renderer and the outline/navigation use this so anchors
 * always line up.
 */
const buildHeadings = (lines: string[]): TocHeading[] => {
  const used = new Map<string, number>();
  const headings: TocHeading[] = [];
  for (const line of lines) {
    const match = HEADING_RE.exec(line.trim());
    if (!match) continue;
    const text = match[2].replace(/\s*#+\s*$/, '').trim();
    const base = slugify(text);
    const count = (used.get(base) ?? 0) + 1;
    used.set(base, count);
    headings.push({ id: count === 1 ? base : `${base}-${count}`, text, level: match[1].length });
  }
  return headings;
};

/** Extracts the heading outline for a markdown document. */
export const extractHeadings = (source: string): TocHeading[] => buildHeadings(normalize(source));

const isTableSeparator = (line: string): boolean => /^\s*\|?[\s:|-]+\|?\s*$/.test(line) && line.includes('-');
const splitRow = (line: string): string[] =>
  line.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map((cell) => cell.trim());

/**
 * Parses a markdown document into React nodes plus a heading outline.
 * Supports the subset of markdown used across the course notes.
 */
export const renderMarkdown = (source: string): RenderedMarkdown => {
  const lines = normalize(source);
  const headings = buildHeadings(lines);
  const nodes: React.ReactNode[] = [];
  let headingCursor = 0;
  let index = 0;
  let nodeKey = 0;
  const nextKey = () => `md-${nodeKey++}`;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    // Blank line
    if (trimmed === '') {
      index += 1;
      continue;
    }

    // Standalone image: ![alt](url)
    const imgMatch = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(trimmed);
    if (imgMatch) {
      const alt = imgMatch[1];
      const src = imgMatch[2];
      nodes.push(
        <figure key={nextKey()} className="my-6 overflow-hidden rounded-2xl border border-line bg-canvas p-2.5 shadow-card">
          <img src={src} alt={alt} className="w-full h-auto rounded-xl object-contain transition-all hover:brightness-105" loading="lazy" />
          {alt && (
            <figcaption className="mt-2.5 px-2 pb-1 text-center font-mono text-[11px] text-indigo-700">
              ▲ {alt}
            </figcaption>
          )}
        </figure>,
      );
      index += 1;
      continue;
    }

    // Fenced code block
    if (/^```/.test(trimmed)) {
      const language = trimmed.slice(3).trim();
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !/^```/.test(lines[index].trim())) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      nodes.push(
        <figure key={nextKey()} className="my-5 overflow-hidden rounded-xl border border-line bg-canvas">
          {language && (
            <figcaption className="border-b border-line bg-surface px-3 py-1.5 text-[10.5px] text-subtle">
              {language}
            </figcaption>
          )}
          <pre className="overflow-x-auto px-4 py-3 text-[12.5px] leading-relaxed">
            <code className="font-mono text-strong">{code.join('\n')}</code>
          </pre>
        </figure>,
      );
      continue;
    }

    // Standalone Block Display Math: \[ ... \] or $$ ... $$
    if (trimmed.startsWith('\\[') || trimmed.startsWith('$$')) {
      const isBracket = trimmed.startsWith('\\[');
      const closeDelim = isBracket ? '\\]' : '$$';

      // Single-line block math
      if (trimmed.length > 2 && trimmed.endsWith(closeDelim)) {
        const tex = trimmed.slice(2, -2).trim();
        nodes.push(
          <div key={nextKey()} className="my-5 overflow-x-auto rounded-xl border border-line bg-canvas/60 p-4 text-center shadow-sm">
            {renderMath(tex, true, nextKey())}
          </div>,
        );
        index += 1;
        continue;
      }

      // Multi-line block math
      const mathLines: string[] = [];
      const firstLineContent = trimmed.slice(2).trim();
      if (firstLineContent) mathLines.push(firstLineContent);
      index += 1;

      while (index < lines.length && !lines[index].trim().includes(closeDelim)) {
        mathLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) {
        const closingLine = lines[index].trim();
        const closeIdx = closingLine.indexOf(closeDelim);
        const beforeClose = closingLine.slice(0, closeIdx).trim();
        if (beforeClose) mathLines.push(beforeClose);
        index += 1;
      }

      const tex = mathLines.join('\n').trim();
      if (tex) {
        nodes.push(
          <div key={nextKey()} className="my-5 overflow-x-auto rounded-xl border border-line bg-canvas/60 p-4 text-center shadow-sm">
            {renderMath(tex, true, nextKey())}
          </div>,
        );
      }
      continue;
    }

    // Heading
    const heading = HEADING_RE.exec(trimmed);
    if (heading) {
      const level = heading[1].length;
      const extracted = headings[headingCursor++] ?? { id: slugify(heading[2]), text: heading[2], level };
      const id = extracted.id;
      const text = extracted.text;
      const sizeClass =
        level === 1
          ? 'text-2xl sm:text-3xl mt-2 mb-4'
          : level === 2
            ? 'text-xl sm:text-2xl mt-10 mb-3'
            : level === 3
              ? 'text-lg mt-7 mb-2'
              : 'text-base mt-5 mb-2';
      const Tag = (`h${Math.min(level, 6)}`) as 'h1';
      nodes.push(
        <Tag
          key={nextKey()}
          id={id}
          className={`${sizeClass} scroll-mt-28 font-bold tracking-tight text-ink`}
        >
          {renderInline(text, { keyPrefix: id })}
        </Tag>,
      );
      index += 1;
      continue;
    }

    // Horizontal rule
    if (/^(\*{3,}|-{3,}|_{3,})$/.test(trimmed)) {
      nodes.push(<hr key={nextKey()} className="my-7 border-line" />);
      index += 1;
      continue;
    }

    // Table
    if (trimmed.includes('|') && index + 1 < lines.length && isTableSeparator(lines[index + 1])) {
      const header = splitRow(trimmed);
      index += 2;
      const rows: string[][] = [];
      while (index < lines.length && lines[index].trim().includes('|')) {
        rows.push(splitRow(lines[index].trim()));
        index += 1;
      }
      nodes.push(
        <div key={nextKey()} className="my-5 overflow-x-auto rounded-xl border border-line">
          <table className="w-full border-collapse text-left text-[13px]">
            <thead className="bg-canvas">
              <tr>
                {header.map((cell, cellIndex) => (
                  <th key={cellIndex} className="border-b border-line px-3 py-2 font-semibold text-strong">
                    {renderInline(cell, { keyPrefix: `th${cellIndex}` })}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="odd:bg-canvas">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border-b border-line px-3 py-2 align-top text-body">
                      {renderInline(cell, { keyPrefix: `td${rowIndex}-${cellIndex}` })}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    // Blockquote / callout
    if (/^>/.test(trimmed)) {
      const quoted: string[] = [];
      while (index < lines.length && /^\s*>/.test(lines[index])) {
        quoted.push(lines[index].replace(/^\s*>\s?/, ''));
        index += 1;
      }
      const body = quoted.join('\n').trim();
      const callout = /^\[!(\w+)\]\s*(.*)$/.exec(body);
      const tone = callout ? callout[1].toUpperCase() : '';
      const toneMap: Record<string, string> = {
        NOTE: 'border-sky-500/40 bg-sky-50 text-sky-800',
        TIP: 'border-emerald-500/40 bg-emerald-50 text-emerald-800',
        WARNING: 'border-amber-500/40 bg-amber-50 text-amber-800',
        DANGER: 'border-rose-500/40 bg-rose-50 text-rose-800',
        EXAM: 'border-fuchsia-500/40 bg-fuchsia-50 text-fuchsia-800',
      };
      const content = callout ? callout[2] : body;
      nodes.push(
        <blockquote
          key={nextKey()}
          className={`my-4 rounded-r-xl border-l-4 px-4 py-3 text-[13.5px] leading-relaxed ${
            toneMap[tone] ?? 'border-line-strong bg-canvas text-body'
          }`}
        >
          {tone && toneMap[tone] && (
            <span className="mb-1 block text-[10.5px] font-semibold opacity-80">{tone}</span>
          )}
          {renderInline(content, { keyPrefix: nextKey() })}
        </blockquote>,
      );
      continue;
    }

    // Lists (ordered / unordered, one level of nesting)
    if (/^\s*([-*+]|\d+\.)\s+/.test(lines[index])) {
      const items: { text: string; depth: number }[] = [];
      while (index < lines.length && /^\s*([-*+]|\d+\.)\s+/.test(lines[index])) {
        const raw = lines[index];
        const indent = /^(\s*)/.exec(raw)?.[1].length ?? 0;
        const text = raw.replace(/^\s*([-*+]|\d+\.)\s+/, '');
        items.push({ text, depth: indent >= 3 ? 1 : 0 });
        index += 1;
      }
      nodes.push(
        <ul key={nextKey()} className="my-3 space-y-1.5">
          {items.map((item, itemIndex) => (
            <li
              key={itemIndex}
              className={`flex gap-2.5 text-[13.5px] leading-relaxed text-body ${item.depth > 0 ? 'ml-6' : ''}`}
            >
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-faint" />
              <span>{renderInline(item.text, { keyPrefix: `li${itemIndex}` })}</span>
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    // Paragraph
    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() !== '' &&
      !/^(#{1,6})\s+/.test(lines[index].trim()) &&
      !/^```/.test(lines[index].trim()) &&
      !/^\s*>/.test(lines[index]) &&
      !/^\s*([-*+]|\d+\.)\s+/.test(lines[index])
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    if (paragraph.length) {
      nodes.push(
        <p key={nextKey()} className="my-3 text-[14.5px] leading-[1.75] text-body">
          {renderInline(paragraph.join(' '), { keyPrefix: nextKey() })}
        </p>,
      );
    }
  }

  return { content: nodes, headings };
};

/** Strips markdown syntax for plain-text search and previews. */
export const markdownToPlainText = (source: string): string =>
  source
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_`>~]/g, '')
    .replace(/\\\[[\s\S]*?\\\]/g, ' ')
    .replace(/\\\([^\n]*?\\\)/g, ' ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$]*\$/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\|/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
