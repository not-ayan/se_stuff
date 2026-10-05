import type { Question } from '../types';
import { CHAPTERS, getChapterMarkdown } from '../content/chapters';
import { ALL_QUESTIONS } from '../data/quiz';

export interface ModelTier {
  id: string;
  name: string;
  quotaLabel: string;
  rpm: number;
  category?: string;
  description?: string;
}

export const AUTO_MODEL_POOL: ModelTier[] = [
  {
    id: 'gemini-3.1-flash-lite',
    name: 'Gemini 3.1 Flash Lite',
    quotaLabel: '2/15 RPM · 10/250K TPM',
    rpm: 15,
    category: 'Flash Lite',
    description: 'Fastest response with high RPM quota',
  },
  {
    id: 'gemma-4-26b-a4b-it',
    name: 'Gemma 4 26B',
    quotaLabel: '1/30 RPM · 2/16K TPM',
    rpm: 30,
    category: 'Gemma Open Model',
    description: 'High throughput open-weights model',
  },
  {
    id: 'gemma-4-31b-it',
    name: 'Gemma 4 31B',
    quotaLabel: '1/30 RPM · 2/16K TPM',
    rpm: 30,
    category: 'Gemma Large',
    description: 'High capacity open-weights model',
  },
  {
    id: 'gemini-2.5-flash-lite',
    name: 'Gemini 2.5 Flash Lite',
    quotaLabel: 'High throughput backup',
    rpm: 30,
    category: 'Flash Lite',
    description: 'Ultra fast fallback tier',
  },
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    quotaLabel: '1M context fallback',
    rpm: 15,
    category: 'Flash',
    description: 'General purpose 1M context fallback',
  },
];

export const AI_MODELS = AUTO_MODEL_POOL;
export const getStoredModel = (): string => AUTO_MODEL_POOL[0].id;
export const setStoredModel = (_model: string): void => {};

const STORAGE_KEY_API_KEY = 'se_prep_gemini_api_key';

export const getStoredApiKey = (): string => {
  const envKey =
    (import.meta.env.VITE_GEMINI_API_KEY as string) ||
    (import.meta.env.GEMINI_API_KEY as string) ||
    '';
  if (envKey && envKey.trim()) return envKey.trim();
  return localStorage.getItem(STORAGE_KEY_API_KEY) || '';
};

export const setStoredApiKey = (key: string): void => {
  if (key) {
    localStorage.setItem(STORAGE_KEY_API_KEY, key.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY_API_KEY);
  }
};

// ── Auto-Switching State Tracking ────────────────────────────────
interface ModelState {
  cooldownUntil: number;
  recentRequests: number[];
}

const modelStates: Record<string, ModelState> = {};

AUTO_MODEL_POOL.forEach((m) => {
  modelStates[m.id] = { cooldownUntil: 0, recentRequests: [] };
});

export interface ExecutionMeta {
  modelUsed: string;
  modelName: string;
  autoSwitched: boolean;
  attemptedModels: string[];
}

let lastExecutionMeta: ExecutionMeta = {
  modelUsed: AUTO_MODEL_POOL[0].id,
  modelName: AUTO_MODEL_POOL[0].name,
  autoSwitched: false,
  attemptedModels: [],
};

export const getLastExecutionMeta = (): ExecutionMeta => ({ ...lastExecutionMeta });

/**
 * Checks if a model is currently eligible for an immediate request.
 */
function isModelAvailable(modelId: string): boolean {
  const state = modelStates[modelId];
  if (!state) return true;
  const now = Date.now();
  if (now < state.cooldownUntil) return false;

  // Clean requests older than 60s
  state.recentRequests = state.recentRequests.filter((ts) => now - ts < 60000);
  const tier = AUTO_MODEL_POOL.find((m) => m.id === modelId);
  const maxRpm = tier?.rpm ?? 15;
  return state.recentRequests.length < maxRpm;
}

function recordModelRequest(modelId: string): void {
  if (!modelStates[modelId]) {
    modelStates[modelId] = { cooldownUntil: 0, recentRequests: [] };
  }
  modelStates[modelId].recentRequests.push(Date.now());
}

function putModelOnCooldown(modelId: string, durationMs = 45000): void {
  if (!modelStates[modelId]) {
    modelStates[modelId] = { cooldownUntil: 0, recentRequests: [] };
  }
  modelStates[modelId].cooldownUntil = Date.now() + durationMs;
}

/**
 * Builds context from in-memory course notes.
 */
export const getContextForTopic = (moduleId?: string, query?: string): string => {
  if (moduleId) {
    const chapter = CHAPTERS.find((c) => c.quizModuleId === moduleId || c.id === moduleId);
    if (chapter) {
      return getChapterMarkdown(chapter).slice(0, 25000);
    }
  }

  if (query) {
    const queryWords = query
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2);

    let bestChapter = CHAPTERS[0];
    let maxScore = -1;

    for (const ch of CHAPTERS) {
      const text = getChapterMarkdown(ch).toLowerCase();
      let score = 0;
      for (const term of queryWords) {
        if (text.includes(term)) {
          const count = text.split(term).length - 1;
          score += Math.min(count, 15);
        }
      }
      const titleTags = (ch.title + ' ' + ch.subtitle + ' ' + ch.tags.join(' ')).toLowerCase();
      for (const term of queryWords) {
        if (titleTags.includes(term)) score += 20;
      }

      if (score > maxScore) {
        maxScore = score;
        bestChapter = ch;
      }
    }

    if (maxScore > 0) {
      return getChapterMarkdown(bestChapter).slice(0, 25000);
    }
  }

  // Fallback: core syllabus excerpt
  return CHAPTERS.slice(0, 4)
    .map((c) => `### ${c.title}\n${getChapterMarkdown(c).slice(0, 6000)}`)
    .join('\n\n---\n\n');
};

function cleanAndParseJson<T>(raw: string): T {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
  }
  try {
    return JSON.parse(cleaned);
  } catch {
    const firstBracket = cleaned.indexOf('[');
    const lastBracket = cleaned.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
      try {
        return JSON.parse(cleaned.slice(firstBracket, lastBracket + 1));
      } catch {
        // continue
      }
    }
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      try {
        return JSON.parse(cleaned.slice(firstBrace, lastBrace + 1));
      } catch {
        // continue
      }
    }
    throw new Error('Could not parse valid JSON from AI response.');
  }
}

/**
 * Leniently extract questions from raw text or partial/truncated JSON streams.
 */
function extractJsonQuestions(raw: string): Partial<Question>[] {
  if (!raw || !raw.trim()) return [];

  // 1. Try standard clean and parse
  try {
    const parsed = cleanAndParseJson<unknown>(raw);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && typeof parsed === 'object') {
      const arr = Object.values(parsed).find((v) => Array.isArray(v));
      if (arr && Array.isArray(arr)) return arr;
    }
  } catch {
    // proceed to stream recovery
  }

  // 2. Stream recovery: scan string for balanced { ... } objects
  const found: Partial<Question>[] = [];
  let depth = 0;
  let startIdx = -1;
  let inString = false;
  let escape = false;

  for (let i = 0; i < raw.length; i++) {
    const char = raw[i];

    if (inString) {
      if (escape) {
        escape = false;
      } else if (char === '\\') {
        escape = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === '{') {
      if (depth === 0) startIdx = i;
      depth++;
    } else if (char === '}') {
      depth--;
      if (depth === 0 && startIdx !== -1) {
        const slice = raw.slice(startIdx, i + 1);
        try {
          const item = JSON.parse(slice);
          if (item && typeof item === 'object' && (item.question || item.q)) {
            found.push(item);
          }
        } catch {
          // ignore invalid partial
        }
        startIdx = -1;
      }
    }
  }

  return found;
}

/**
 * Execute call with automatic model rotation across quota tiers.
 */
async function callGeminiApiWithAutoSwitch({
  apiKey,
  prompt,
  systemInstruction,
  responseMimeType,
  temperature = 0.2,
  maxOutputTokens = 4096,
}: {
  apiKey: string;
  prompt: string;
  systemInstruction?: string;
  responseMimeType?: string;
  temperature?: number;
  maxOutputTokens?: number;
}): Promise<{ text: string; meta: ExecutionMeta }> {
  // Sort candidate pool: eligible models first
  const candidates = [...AUTO_MODEL_POOL].sort((a, b) => {
    const availA = isModelAvailable(a.id) ? 0 : 1;
    const availB = isModelAvailable(b.id) ? 0 : 1;
    return availA - availB;
  });

  const attempted: string[] = [];
  let lastError: Error | null = null;

  for (let i = 0; i < candidates.length; i += 1) {
    const candidate = candidates[i];
    attempted.push(candidate.id);
    recordModelRequest(candidate.id);

    try {
      const isGemma = candidate.id.toLowerCase().includes('gemma');
      let finalPrompt = prompt;
      if (isGemma && systemInstruction) {
        finalPrompt = `${systemInstruction}\n\n---\n\n${prompt}`;
      }

      const body: Record<string, unknown> = {
        contents: [
          {
            role: 'user',
            parts: [{ text: finalPrompt }],
          },
        ],
      };

      if (systemInstruction && !isGemma) {
        body.systemInstruction = {
          parts: [{ text: systemInstruction }],
        };
      }

      const generationConfig: Record<string, unknown> = {
        temperature,
        maxOutputTokens,
      };

      if (responseMimeType && !isGemma) {
        generationConfig.responseMimeType = responseMimeType;
      }

      body.generationConfig = generationConfig;

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${candidate.id}:generateContent?key=${apiKey}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errText = await res.text();
        const isQuotaOrRateLimit =
          res.status === 429 ||
          res.status === 503 ||
          errText.includes('RESOURCE_EXHAUSTED') ||
          errText.includes('quota') ||
          errText.includes('rate');

        if (res.status === 404 || res.status === 400 || isQuotaOrRateLimit) {
          putModelOnCooldown(candidate.id, res.status === 404 ? 86400000 : 45000);
          lastError = new Error(`Model ${candidate.name} unavailable (${res.status}). Auto-switching...`);
          continue;
        }

        throw new Error(`API Error (${res.status}) on ${candidate.name}: ${errText}`);
      }

      const data = await res.json();
      let text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        putModelOnCooldown(candidate.id, 20000);
        continue;
      }

      // Strip internal thinking tags if emitted
      text = text.replace(/<(?:thought|think)>[\s\S]*?<\/(?:thought|think)>/gi, '').trim();

      const meta: ExecutionMeta = {
        modelUsed: candidate.id,
        modelName: candidate.name,
        autoSwitched: attempted.length > 1,
        attemptedModels: attempted,
      };
      lastExecutionMeta = meta;

      return { text, meta };
    } catch (err: unknown) {
      const e = err instanceof Error ? err : new Error(String(err));
      lastError = e;
      // If network or fatal on this model, try next candidate
      putModelOnCooldown(candidate.id, 30000);
    }
  }

  throw lastError ?? new Error('All models in the quota pool were temporarily busy. Please wait a moment.');
}

/**
 * Ask SE Mentor with auto-switching
 */
export async function askSeMentor({
  apiKey,
  userMessage,
  moduleId,
  model,
}: {
  apiKey: string;
  userMessage: string;
  moduleId?: string;
  model?: string;
}): Promise<{ response: string; meta: ExecutionMeta }> {
  const notesContext = getContextForTopic(moduleId, userMessage);

  const systemInstruction = `You are "SE Mentor", an elite Software Engineering Professor and Exam Coach for university students (Prof. Rajib Mall curriculum).
Curriculum Scope: CSMC501 Mid-Term Modules 1 to 6 (Introduction & Software Crisis, Life Cycle Models & Phase Containment, Quality & Maintainability/Portability, Requirements & Decision Tables, Software Design up to FOD vs OOD, and Testing Fundamentals).
Rules:
1. Base your answer strictly on the provided course notes.
2. Provide intuitive explanations first, then formal definitions, mathematical proofs, diagrams, and exam traps.
3. Use clean markdown and LaTeX math. Keep answers concise, high-yield, and focused.

COURSE NOTES CONTEXT:
${notesContext}`;

  const { text, meta } = await callGeminiApiWithAutoSwitch({
    apiKey,
    prompt: userMessage,
    systemInstruction,
  });

  return { response: text, meta };
}

/**
 * Dynamically Generate AI Quiz with auto-switching
 */
export async function generateAiQuiz({
  apiKey,
  topic,
  count = 5,
  difficulty = 'exam',
  model,
}: {
  apiKey: string;
  topic: string;
  count?: number;
  difficulty?: 'easy' | 'exam' | 'hard';
  model?: string;
}): Promise<{ questions: Question[]; meta: ExecutionMeta }> {
  const notesContext = getContextForTopic(undefined, topic);

  const systemInstruction = `You are an expert university examiner in Software Engineering.
Generate exactly ${count} distinct exam-style questions testing: "${topic}".
Difficulty: ${difficulty}.
CRITICAL INSTRUCTIONS:
- You must respond ONLY with a raw JSON array matching the schema below.
- Do NOT include any introductory or concluding text, explanations outside JSON, or markdown ticks.
- Keep explanation and hint concise (1 to 2 sentences) to guarantee clean, complete output without truncation.
- Schema:
[
  {
    "id": "q-1",
    "moduleId": "mod-1",
    "type": "mcq",
    "question": "Clear question text?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Option A",
    "explanation": "Concise 1-2 sentence explanation.",
    "hint": "Concise hint."
  }
]`;

  const prompt = `Based strictly on standard syllabus definitions in the notes below, generate ${count} rigorous questions on topic "${topic}".
Do NOT hallucinate fictional terms. For MCQs, exactly one option must be unambiguously correct.
Respond ONLY with the raw JSON array.

COURSE NOTES:
${notesContext}`;

  const { text, meta } = await callGeminiApiWithAutoSwitch({
    apiKey,
    prompt,
    systemInstruction,
    responseMimeType: 'application/json',
    temperature: 0.1,
    maxOutputTokens: 8192,
  });

  const list = extractJsonQuestions(text);

  const questions: Question[] = list.map((q, idx) => ({
    id: q.id || `ai-${Date.now()}-${idx}`,
    moduleId: q.moduleId || 'mod-1',
    type: (q.type as Question['type']) || (q.options ? 'mcq' : 'true_false'),
    question: q.question || 'Exam Question',
    options: q.options || (q.type === 'mcq' ? ['Option A', 'Option B', 'Option C', 'Option D'] : undefined),
    correctAnswer: q.correctAnswer ?? (q.type === 'true_false' ? true : 'Option A'),
    explanation: q.explanation || 'No explanation provided.',
    hint: q.hint,
  }));

  if (questions.length === 0) {
    // Intelligent fallback from syllabus questions matching the topic
    const words = topic.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
    const matched = ALL_QUESTIONS.filter((q) =>
      words.some((w) => q.question.toLowerCase().includes(w) || q.explanation.toLowerCase().includes(w))
    );
    const fallback = (matched.length > 0 ? matched : ALL_QUESTIONS).slice(0, count);
    if (fallback.length > 0) {
      return { questions: fallback, meta };
    }
    throw new Error('AI could not produce a valid question array. Please try again.');
  }

  return { questions, meta };
}

/**
 * Subjective Exam Answer Evaluator with auto-switching
 */
export async function evaluateSubjectiveAnswer({
  apiKey,
  question,
  userAnswer,
  model,
}: {
  apiKey: string;
  question: string;
  userAnswer: string;
  model?: string;
}): Promise<{
  score: number;
  totalMarks: number;
  verdict: string;
  strengths: string[];
  missingPoints: string[];
  modelAnswer: string;
  meta: ExecutionMeta;
}> {
  const notesContext = getContextForTopic(undefined, question);

  const systemInstruction = `You are a university chief examiner grading an exam answer out of 10 marks.
Respond strictly in JSON with keys:
- "score": number (0-10)
- "totalMarks": 10
- "verdict": string ("Outstanding", "Good", "Needs Improvement", "Unsatisfactory")
- "strengths": array of strings
- "missingPoints": array of strings
- "modelAnswer": string`;

  const prompt = `QUESTION:\n${question}\n\nSTUDENT'S ANSWER:\n${userAnswer}\n\nCOURSE REFERENCE:\n${notesContext}`;

  const { text, meta } = await callGeminiApiWithAutoSwitch({
    apiKey,
    prompt,
    systemInstruction,
    responseMimeType: 'application/json',
  });

  const parsed = cleanAndParseJson<{
    score: number;
    totalMarks: number;
    verdict: string;
    strengths: string[];
    missingPoints: string[];
    modelAnswer: string;
  }>(text);

  return { ...parsed, meta };
}
