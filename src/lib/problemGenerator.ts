export type ProblemTopic =
  | 'all'
  // CSMC501 Mid-Term Core Topics
  | 'software_crisis_traceability'
  | 'sdlc_phase_containment'
  | 'quality_maintainability_portability'
  | 'requirements_decision_tables'
  | 'design_cohesion_coupling'
  | 'design_fod_vs_ood'
  | 'testing_fundamentals_unit'
  // Reference & Advanced Topics
  | 'cocomo'
  | 'mccabe'
  | 'halstead'
  | 'fp'
  | 'putnam'
  | 'reliability'
  | 'error_seeding'
  | 'decision_table'
  | 'cohesion_coupling'
  | 'testing_bva';

export type ProblemType = 'numerical' | 'choice';

export interface GeneratedProblem {
  id: string;
  topic: ProblemTopic;
  topicLabel: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  title: string;
  type: ProblemType;
  prompt: string;
  givenData: { label: string; value: string | number }[];
  options?: string[]; // for choice questions
  expectedAnswer: number | string; // number or choice string
  tolerance?: number; // e.g. 0.05 for 5% or 0.5 for absolute
  unit?: string;
  hints: string[];
  derivationSteps: string[];
  finalExplanation: string;
  formulaUsed: string;
}

const randInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randChoice = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// 1. COCOMO Generator
function generateCocomoProblem(): GeneratedProblem {
  const modes = [
    { mode: 'Organic', a1: 2.4, a2: 1.05, b1: 2.5, b2: 0.38, desc: 'Small team with experienced developers' },
    { mode: 'Semi-detached', a1: 3.0, a2: 1.12, b1: 2.5, b2: 0.35, desc: 'Medium team with mixed experience and constraints' },
    { mode: 'Embedded', a1: 3.6, a2: 1.20, b1: 2.5, b2: 0.32, desc: 'Complex system with tight hardware and regulatory constraints' },
  ];
  const selectedMode = randChoice(modes);
  const kloc = randInt(15, 95);
  const subType = randChoice(['effort', 'duration', 'staff']);

  const effortExact = selectedMode.a1 * Math.pow(kloc, selectedMode.a2);
  const effortRounded = Math.round(effortExact * 10) / 10;
  const tdevExact = selectedMode.b1 * Math.pow(effortExact, selectedMode.b2);
  const tdevRounded = Math.round(tdevExact * 10) / 10;
  const staffExact = effortExact / tdevExact;
  const staffRounded = Math.round(staffExact * 10) / 10;

  if (subType === 'effort') {
    return {
      id: `cocomo-eff-${Date.now()}-${randInt(100, 999)}`,
      topic: 'cocomo',
      topicLabel: 'COCOMO Estimation',
      difficulty: 'Easy',
      title: `${selectedMode.mode} Mode Effort Estimation`,
      type: 'numerical',
      prompt: `A software development company is planning a project estimated at ${kloc} KLOC in the ${selectedMode.mode} mode (${selectedMode.desc}). Using the Basic COCOMO model with parameters $a_1 = ${selectedMode.a1}$ and $a_2 = ${selectedMode.a2}$, calculate the total project effort in Person-Months (PM).`,
      givenData: [
        { label: 'Size', value: `${kloc} KLOC` },
        { label: 'Development Mode', value: selectedMode.mode },
        { label: 'Coefficients', value: `a₁ = ${selectedMode.a1}, a₂ = ${selectedMode.a2}` },
      ],
      expectedAnswer: effortRounded,
      tolerance: 0.05, // 5%
      unit: 'PM',
      hints: [
        `The Basic COCOMO effort formula is: Effort = a₁ × (KLOC)^a₂`,
        `Substitute: Effort = ${selectedMode.a1} × (${kloc})^${selectedMode.a2}`,
      ],
      derivationSteps: [
        `1. Identify formula: Effort = a₁ × (Size in KLOC)^a₂`,
        `2. For ${selectedMode.mode} mode, a₁ = ${selectedMode.a1} and a₂ = ${selectedMode.a2}`,
        `3. Compute (${kloc})^${selectedMode.a2} ≈ ${(Math.pow(kloc, selectedMode.a2)).toFixed(2)}`,
        `4. Effort = ${selectedMode.a1} × ${(Math.pow(kloc, selectedMode.a2)).toFixed(2)} = ${effortRounded} Person-Months`,
      ],
      finalExplanation: `The estimated development effort is ${effortRounded} Person-Months.`,
      formulaUsed: 'Effort = a₁ × (KLOC)^a₂',
    };
  }

  if (subType === 'duration') {
    return {
      id: `cocomo-tdev-${Date.now()}-${randInt(100, 999)}`,
      topic: 'cocomo',
      topicLabel: 'COCOMO Estimation',
      difficulty: 'Medium',
      title: `${selectedMode.mode} Mode Nominal Duration`,
      type: 'numerical',
      prompt: `For a ${selectedMode.mode} software project of ${kloc} KLOC, the estimated effort is ${effortRounded} PM. Using Basic COCOMO parameters $b_1 = ${selectedMode.b1}$ and $b_2 = ${selectedMode.b2}$, calculate the nominal development time ($T_{dev}$) in months.`,
      givenData: [
        { label: 'Effort', value: `${effortRounded} PM` },
        { label: 'Development Mode', value: selectedMode.mode },
        { label: 'Duration Coefficients', value: `b₁ = ${selectedMode.b1}, b₂ = ${selectedMode.b2}` },
      ],
      expectedAnswer: tdevRounded,
      tolerance: 0.05,
      unit: 'months',
      hints: [
        `The nominal development time formula is: Tdev = b₁ × (Effort)^b₂`,
        `Substitute: Tdev = ${selectedMode.b1} × (${effortRounded})^${selectedMode.b2}`,
      ],
      derivationSteps: [
        `1. Identify formula: Tdev = b₁ × (Effort)^b₂`,
        `2. For ${selectedMode.mode} mode, b₁ = ${selectedMode.b1}, b₂ = ${selectedMode.b2}`,
        `3. Compute (${effortRounded})^${selectedMode.b2} ≈ ${(Math.pow(effortRounded, selectedMode.b2)).toFixed(2)}`,
        `4. Tdev = ${selectedMode.b1} × ${(Math.pow(effortRounded, selectedMode.b2)).toFixed(2)} = ${tdevRounded} months`,
      ],
      finalExplanation: `The nominal development schedule is ${tdevRounded} months.`,
      formulaUsed: 'Tdev = b₁ × (Effort)^b₂',
    };
  }

  return {
    id: `cocomo-staff-${Date.now()}-${randInt(100, 999)}`,
    topic: 'cocomo',
    topicLabel: 'COCOMO Estimation',
    difficulty: 'Medium',
    title: `${selectedMode.mode} Mode Average Staff Size`,
    type: 'numerical',
    prompt: `A software system in ${selectedMode.mode} mode requires ${effortRounded} Person-Months of effort over a development schedule of ${tdevRounded} months. Calculate the average staff size required throughout the project lifecycle.`,
    givenData: [
      { label: 'Effort', value: `${effortRounded} PM` },
      { label: 'Development Time', value: `${tdevRounded} months` },
    ],
    expectedAnswer: staffRounded,
    tolerance: 0.05,
    unit: 'persons',
    hints: [
      `Average staffing is defined as total effort divided by nominal development time.`,
      `Formula: Staff Size = Effort / Tdev`,
    ],
    derivationSteps: [
      `1. Average Staff Size = Total Effort (PM) / Development Time (Tdev in months)`,
      `2. Substitute: ${effortRounded} / ${tdevRounded}`,
      `3. Result = ${(effortRounded / tdevRounded).toFixed(2)} ≈ ${staffRounded} persons`,
    ],
    finalExplanation: `The required average full-time staffing is ${staffRounded} persons.`,
    formulaUsed: 'Average Staff = Effort / Tdev',
  };
}

// 2. McCabe's Cyclomatic Complexity Generator
function generateMcCabeProblem(): GeneratedProblem {
  const isGraph = Math.random() > 0.4;
  if (isGraph) {
    const nodes = randInt(7, 16);
    const edges = randInt(nodes + 1, nodes + 7);
    const components = 1;
    const complexity = edges - nodes + 2 * components;

    return {
      id: `mccabe-graph-${Date.now()}-${randInt(100, 999)}`,
      topic: 'mccabe',
      topicLabel: 'Cyclomatic Complexity',
      difficulty: 'Easy',
      title: 'Graph-Theoretic Cyclomatic Complexity V(G)',
      type: 'numerical',
      prompt: `A program's Control Flow Graph (CFG) contains ${nodes} nodes, ${edges} edges, and 1 connected component (P = 1). Calculate McCabe's Cyclomatic Complexity V(G) and determine the number of linearly independent basis execution paths.`,
      givenData: [
        { label: 'Nodes (N)', value: nodes },
        { label: 'Edges (E)', value: edges },
        { label: 'Connected Components (P)', value: 1 },
      ],
      expectedAnswer: complexity,
      tolerance: 0,
      unit: 'paths',
      hints: [
        `McCabe's formula using edges and nodes is: V(G) = E - N + 2P`,
        `Substitute: ${edges} - ${nodes} + 2(1)`,
      ],
      derivationSteps: [
        `1. McCabe's Cyclomatic Complexity formula: V(G) = E - N + 2P`,
        `2. E = ${edges}, N = ${nodes}, P = 1`,
        `3. V(G) = ${edges} - ${nodes} + 2(1) = ${edges - nodes} + 2 = ${complexity}`,
      ],
      finalExplanation: `The cyclomatic complexity V(G) is ${complexity}, meaning there are exactly ${complexity} linearly independent basis paths required to achieve full branch/path coverage.`,
      formulaUsed: 'V(G) = E - N + 2P',
    };
  }

  const ifCount = randInt(2, 5);
  const loopCount = randInt(1, 3);
  const logicCount = randInt(1, 3);
  const totalPredicates = ifCount + loopCount + logicCount;
  const complexity = totalPredicates + 1;

  return {
    id: `mccabe-pred-${Date.now()}-${randInt(100, 999)}`,
    topic: 'mccabe',
    topicLabel: 'Cyclomatic Complexity',
    difficulty: 'Easy',
    title: 'Decision Predicate Rule V(G)',
    type: 'numerical',
    prompt: `A function contains ${ifCount} 'if' statements, ${loopCount} 'while' loops, and ${logicCount} compound Boolean operators ('&&' / '||'). Assuming each condition acts as an independent binary decision predicate, calculate the cyclomatic complexity V(G).`,
    givenData: [
      { label: 'If statements', value: ifCount },
      { label: 'While loops', value: loopCount },
      { label: 'Compound logical operators', value: logicCount },
      { label: 'Total Predicate Nodes (P)', value: totalPredicates },
    ],
    expectedAnswer: complexity,
    tolerance: 0,
    unit: 'complexity',
    hints: [
      `For structured programs with binary decision predicates, V(G) = P + 1.`,
      `Sum all decision points: P = ${ifCount} + ${loopCount} + ${logicCount} = ${totalPredicates}.`,
    ],
    derivationSteps: [
      `1. Count total decision predicates (P): ${ifCount} (ifs) + ${loopCount} (loops) + ${logicCount} (logical ops) = ${totalPredicates}`,
      `2. By predicate node theorem: V(G) = P + 1`,
      `3. V(G) = ${totalPredicates} + 1 = ${complexity}`,
    ],
    finalExplanation: `The cyclomatic complexity is ${complexity}. Exactly ${complexity} test cases are required for basis path testing.`,
    formulaUsed: 'V(G) = P + 1',
  };
}

// 3. Halstead Software Science Generator
function generateHalsteadProblem(): GeneratedProblem {
  const eta1 = randInt(6, 14); // unique operators
  const eta2 = randInt(8, 16); // unique operands
  const n1 = randInt(eta1 + 4, eta1 + 18); // total operators
  const n2 = randInt(eta2 + 3, eta2 + 15); // total operands

  const subType = randChoice(['vocabulary', 'length', 'volume']);
  const vocabulary = eta1 + eta2;
  const length = n1 + n2;
  const volume = Math.round(length * Math.log2(vocabulary));

  if (subType === 'vocabulary') {
    return {
      id: `halstead-voc-${Date.now()}-${randInt(100, 999)}`,
      topic: 'halstead',
      topicLabel: 'Halstead Software Science',
      difficulty: 'Easy',
      title: 'Program Vocabulary (η)',
      type: 'numerical',
      prompt: `Static analysis of a module finds ${eta1} unique operators (η₁) and ${eta2} unique operands (η₂). Calculate Halstead's Program Vocabulary (η).`,
      givenData: [
        { label: 'Unique Operators (η₁)', value: eta1 },
        { label: 'Unique Operands (η₂)', value: eta2 },
      ],
      expectedAnswer: vocabulary,
      tolerance: 0,
      unit: 'symbols',
      hints: [
        `Halstead's Program Vocabulary is the sum of unique operators and unique operands.`,
        `Formula: η = η₁ + η₂`,
      ],
      derivationSteps: [
        `1. Identify formula: η = η₁ + η₂`,
        `2. Substitute: ${eta1} + ${eta2} = ${vocabulary}`,
      ],
      finalExplanation: `The program vocabulary η is ${vocabulary} distinct symbols.`,
      formulaUsed: 'η = η₁ + η₂',
    };
  }

  if (subType === 'length') {
    return {
      id: `halstead-len-${Date.now()}-${randInt(100, 999)}`,
      topic: 'halstead',
      topicLabel: 'Halstead Software Science',
      difficulty: 'Easy',
      title: 'Program Length (N)',
      type: 'numerical',
      prompt: `In a source file, operators appear a total of ${n1} times (N₁) and operands appear a total of ${n2} times (N₂). Calculate Halstead's actual Program Length (N).`,
      givenData: [
        { label: 'Total Operator Occurrences (N₁)', value: n1 },
        { label: 'Total Operand Occurrences (N₂)', value: n2 },
      ],
      expectedAnswer: length,
      tolerance: 0,
      unit: 'tokens',
      hints: [
        `Actual program length is the sum of total operator and operand occurrences.`,
        `Formula: N = N₁ + N₂`,
      ],
      derivationSteps: [
        `1. Identify formula: N = N₁ + N₂`,
        `2. Substitute: ${n1} + ${n2} = ${length}`,
      ],
      finalExplanation: `The actual program length N is ${length} tokens.`,
      formulaUsed: 'N = N₁ + N₂',
    };
  }

  return {
    id: `halstead-vol-${Date.now()}-${randInt(100, 999)}`,
    topic: 'halstead',
    topicLabel: 'Halstead Software Science',
    difficulty: 'Medium',
    title: 'Program Volume (V)',
    type: 'numerical',
    prompt: `A code segment has a Program Length of N = ${length} tokens and a Program Vocabulary of η = ${vocabulary} symbols. Calculate Halstead's Program Volume (V) in bits. Round your answer to the nearest integer.`,
    givenData: [
      { label: 'Program Length (N)', value: length },
      { label: 'Program Vocabulary (η)', value: vocabulary },
    ],
    expectedAnswer: volume,
    tolerance: 0.03, // 3%
    unit: 'bits',
    hints: [
      `Halstead's Volume formula is: V = N × log₂(η)`,
      `Calculate log₂(${vocabulary}) and multiply by ${length}.`,
    ],
    derivationSteps: [
      `1. Identify formula: V = N × log₂(η)`,
      `2. log₂(${vocabulary}) ≈ ${(Math.log2(vocabulary)).toFixed(4)} bits/token`,
      `3. V = ${length} × ${(Math.log2(vocabulary)).toFixed(4)} = ${volume} bits`,
    ],
    finalExplanation: `The program volume V is ${volume} bits (the minimum storage needed to represent the program in memory).`,
    formulaUsed: 'V = N × log₂(η)',
  };
}

// 4. Function Point (FP) Analysis Generator
function generateFpProblem(): GeneratedProblem {
  const ei = randInt(4, 12);
  const eo = randInt(3, 10);
  const eq = randInt(3, 8);
  const ilf = randInt(2, 6);
  const eif = randInt(1, 4);

  // Standard average complexity weights: EI:4, EO:5, EQ:4, ILF:10, EIF:7
  const ufp = ei * 4 + eo * 5 + eq * 4 + ilf * 10 + eif * 7;
  const tdi = randInt(18, 48); // total degree of influence (0 to 70)
  const vaf = Math.round((0.65 + 0.01 * tdi) * 100) / 100;
  const fp = Math.round(ufp * vaf * 10) / 10;

  const isUfp = Math.random() > 0.5;

  if (isUfp) {
    return {
      id: `fp-ufp-${Date.now()}-${randInt(100, 999)}`,
      topic: 'fp',
      topicLabel: 'Function Point Analysis',
      difficulty: 'Medium',
      title: 'Unadjusted Function Points (UFP)',
      type: 'numerical',
      prompt: `A software system has the following average-complexity components:
- External Inputs (EI): ${ei} (weight = 4)
- External Outputs (EO): ${eo} (weight = 5)
- External Inquiries (EQ): ${eq} (weight = 4)
- Internal Logical Files (ILF): ${ilf} (weight = 10)
- External Interface Files (EIF): ${eif} (weight = 7)
Calculate the Unadjusted Function Points (UFP).`,
      givenData: [
        { label: 'EI (weight 4)', value: ei },
        { label: 'EO (weight 5)', value: eo },
        { label: 'EQ (weight 4)', value: eq },
        { label: 'ILF (weight 10)', value: ilf },
        { label: 'EIF (weight 7)', value: eif },
      ],
      expectedAnswer: ufp,
      tolerance: 0,
      unit: 'UFP',
      hints: [
        `UFP = (EI × 4) + (EO × 5) + (EQ × 4) + (ILF × 10) + (EIF × 7)`,
        `Multiply each count by its respective complexity weight and sum the products.`,
      ],
      derivationSteps: [
        `1. EI: ${ei} × 4 = ${ei * 4}`,
        `2. EO: ${eo} × 5 = ${eo * 5}`,
        `3. EQ: ${eq} × 4 = ${eq * 4}`,
        `4. ILF: ${ilf} × 10 = ${ilf * 10}`,
        `5. EIF: ${eif} × 7 = ${eif * 7}`,
        `6. UFP = ${ei * 4} + ${eo * 5} + ${eq * 4} + ${ilf * 10} + ${eif * 7} = ${ufp}`,
      ],
      finalExplanation: `The Unadjusted Function Points (UFP) count is ${ufp}.`,
      formulaUsed: 'UFP = Σ (Count × Weight)',
    };
  }

  return {
    id: `fp-adjusted-${Date.now()}-${randInt(100, 999)}`,
    topic: 'fp',
    topicLabel: 'Function Point Analysis',
    difficulty: 'Hard',
    title: 'Adjusted Function Points (FP)',
    type: 'numerical',
    prompt: `A project has an Unadjusted Function Point count of UFP = ${ufp}. The evaluation of the 14 General System Characteristics gives a Total Degree of Influence (TDI = Σ Fᵢ) of ${tdi}. Calculate the final Adjusted Function Point count (FP). Round to 1 decimal place.`,
    givenData: [
      { label: 'UFP', value: ufp },
      { label: 'Total Degree of Influence (TDI)', value: tdi },
      { label: 'VAF Formula', value: 'VAF = 0.65 + 0.01 × TDI' },
    ],
    expectedAnswer: fp,
    tolerance: 0.02,
    unit: 'FP',
    hints: [
      `Value Adjustment Factor: VAF = 0.65 + 0.01 × TDI = 0.65 + 0.01 × ${tdi} = ${vaf}`,
      `Final FP = UFP × VAF = ${ufp} × ${vaf}`,
    ],
    derivationSteps: [
      `1. Compute Value Adjustment Factor (VAF): VAF = 0.65 + (0.01 × ${tdi}) = ${vaf}`,
      `2. Compute Adjusted FP: FP = UFP × VAF`,
      `3. FP = ${ufp} × ${vaf} = ${fp}`,
    ],
    finalExplanation: `The adjusted function point count is ${fp} FP.`,
    formulaUsed: 'FP = UFP × [0.65 + 0.01 × Σ Fᵢ]',
  };
}

// 5. Putnam's 4th Power / Compression Generator
function generatePutnamProblem(): GeneratedProblem {
  const origT = randInt(12, 20); // months
  const newT = Math.round(origT * 0.75); // 25% schedule compression
  const origEffort = randInt(40, 100); // PM

  const compressionRatio = origT / newT;
  const multiplier = Math.pow(compressionRatio, 4);
  const newEffort = Math.round(origEffort * multiplier * 10) / 10;

  return {
    id: `putnam-${Date.now()}-${randInt(100, 999)}`,
    topic: 'putnam',
    topicLabel: "Putnam's Model",
    difficulty: 'Hard',
    title: "Putnam's 4th-Power Schedule Compression Tradeoff",
    type: 'numerical',
    prompt: `According to Putnam's Software Lifecycle Model, effort is inversely proportional to the 4th power of development time: $E_1 \\times t_1^4 = E_2 \\times t_2^4$.
A project normally takes ${origT} months with an effort of ${origEffort} Person-Months. Management demands the delivery time be compressed to ${newT} months. Calculate the new effort $E_2$ in Person-Months required. Round to 1 decimal place.`,
    givenData: [
      { label: 'Original Duration (t₁)', value: `${origT} months` },
      { label: 'Compressed Duration (t₂)', value: `${newT} months` },
      { label: 'Original Effort (E₁)', value: `${origEffort} PM` },
    ],
    expectedAnswer: newEffort,
    tolerance: 0.04,
    unit: 'PM',
    hints: [
      `By Putnam's Law: E₂ = E₁ × (t₁ / t₂)⁴`,
      `Calculate ratio: (${origT} / ${newT})⁴ = ${(multiplier).toFixed(3)}`,
    ],
    derivationSteps: [
      `1. Putnam's Effort-Time tradeoff law: E₂ = E₁ × (t₁ / t₂)⁴`,
      `2. Time compression factor: ${origT} / ${newT} = ${(compressionRatio).toFixed(3)}`,
      `3. 4th power multiplier: (${(compressionRatio).toFixed(3)})⁴ = ${(multiplier).toFixed(3)}`,
      `4. New Effort E₂ = ${origEffort} × ${(multiplier).toFixed(3)} = ${newEffort} Person-Months`,
    ],
    finalExplanation: `Compressing schedule by ${(100 - (newT / origT) * 100).toFixed(0)}% causes effort to explode by ${(multiplier).toFixed(2)}× from ${origEffort} PM to ${newEffort} PM! This is known as the "manpower curse".`,
    formulaUsed: 'E₂ = E₁ × (t₁ / t₂)⁴',
  };
}

// 6. Error Seeding (Mills Metric) Generator
function generateErrorSeedingProblem(): GeneratedProblem {
  const S = randInt(20, 50); // seeded defects
  const s = randInt(Math.round(S * 0.65), S - 2); // seeded found
  const n = randInt(35, 80); // natural found

  const totalNatural = Math.round((S * n) / s);
  const remaining = totalNatural - n;
  const isRemaining = Math.random() > 0.5;

  if (isRemaining) {
    return {
      id: `err-rem-${Date.now()}-${randInt(100, 999)}`,
      topic: 'error_seeding',
      topicLabel: 'Error Seeding',
      difficulty: 'Medium',
      title: 'Remaining Undetected Natural Defects',
      type: 'numerical',
      prompt: `Before system testing, the quality assurance team introduces S = ${S} known seeded defects into the software. During testing, the team uncovers s = ${s} of the seeded defects, along with n = ${n} natural (unseeded) defects.
Using Mills' Error Seeding formula ($s / S = n / N$), calculate the estimated number of REMAINING (undetected) natural defects in the software.`,
      givenData: [
        { label: 'Seeded Defects Introduced (S)', value: S },
        { label: 'Seeded Defects Found (s)', value: s },
        { label: 'Natural Defects Found (n)', value: n },
      ],
      expectedAnswer: remaining,
      tolerance: 0.05,
      unit: 'defects',
      hints: [
        `First find the total estimated natural defects: N = (S × n) / s`,
        `Then find remaining natural defects: Remaining = N - n`,
      ],
      derivationSteps: [
        `1. Mills' Proportion: s / S = n / N`,
        `2. Total Natural Defects N = (S × n) / s = (${S} × ${n}) / ${s} = ${totalNatural}`,
        `3. Remaining undetected natural defects = N - n = ${totalNatural} - ${n} = ${remaining}`,
      ],
      finalExplanation: `An estimated ${remaining} natural defects still remain in the system.`,
      formulaUsed: 'N = (S × n) / s; Remaining = N - n',
    };
  }

  return {
    id: `err-tot-${Date.now()}-${randInt(100, 999)}`,
    topic: 'error_seeding',
    topicLabel: 'Error Seeding',
    difficulty: 'Easy',
    title: 'Total Estimated Natural Defects (Mills Metric)',
    type: 'numerical',
    prompt: `To estimate defect density, S = ${S} artificial bugs are seeded into a codebase. An independent testing team identifies s = ${s} seeded bugs and n = ${n} real bugs.
Calculate the total number of real natural bugs (N) originally present in the codebase. Round to the nearest integer.`,
      givenData: [
        { label: 'Seeded Bugs (S)', value: S },
        { label: 'Seeded Bugs Recovered (s)', value: s },
        { label: 'Natural Bugs Found (n)', value: n },
      ],
      expectedAnswer: totalNatural,
      tolerance: 0.05,
      unit: 'defects',
      hints: [
        `Mills' Error Seeding Formula: N = (S × n) / s`,
        `Substitute: (${S} × ${n}) / ${s}`,
      ],
      derivationSteps: [
        `1. Ratio of seeded found to total seeded equals ratio of natural found to total natural: s / S = n / N`,
        `2. N = (S × n) / s`,
        `3. N = (${S} × ${n}) / ${s} = ${((S * n) / s).toFixed(2)} ≈ ${totalNatural}`,
      ],
      finalExplanation: `The codebase originally contained approximately ${totalNatural} natural bugs.`,
      formulaUsed: 'N = (S × n) / s',
  };
}

// 7. Reliability & Availability Generator
function generateReliabilityProblem(): GeneratedProblem {
  const mttf = randInt(400, 1600); // hours
  const mttr = randInt(4, 20); // hours
  const mtbf = mttf + mttr;
  const availability = Math.round((mttf / mtbf) * 10000) / 100; // e.g. 98.75%

  const isAvail = Math.random() > 0.4;
  if (isAvail) {
    return {
      id: `rel-avail-${Date.now()}-${randInt(100, 999)}`,
      topic: 'reliability',
      topicLabel: 'Software Reliability',
      difficulty: 'Medium',
      title: 'System Operational Availability (A)',
      type: 'numerical',
      prompt: `A cloud banking system operates with a Mean Time To Failure (MTTF) of ${mttf} hours and a Mean Time To Repair (MTTR) of ${mttr} hours.
Calculate the system availability percentage (A). Round your answer to two decimal places (e.g. 98.75).`,
      givenData: [
        { label: 'MTTF (Mean Time To Failure)', value: `${mttf} hours` },
        { label: 'MTTR (Mean Time To Repair)', value: `${mttr} hours` },
        { label: 'MTBF (Mean Time Between Failures)', value: `${mtbf} hours` },
      ],
      expectedAnswer: availability,
      tolerance: 0.01,
      unit: '%',
      hints: [
        `Availability formula: A = MTTF / (MTTF + MTTR) × 100%`,
        `Substitute: ${mttf} / (${mttf} + ${mttr}) × 100`,
      ],
      derivationSteps: [
        `1. MTBF = MTTF + MTTR = ${mttf} + ${mttr} = ${mtbf} hours`,
        `2. Availability A = (MTTF / MTBF) × 100%`,
        `3. A = (${mttf} / ${mtbf}) × 100% = ${availability}%`,
      ],
      finalExplanation: `The steady-state availability is ${availability}%.`,
      formulaUsed: 'Availability = [MTTF / (MTTF + MTTR)] × 100%',
    };
  }

  return {
    id: `rel-mtbf-${Date.now()}-${randInt(100, 999)}`,
    topic: 'reliability',
    topicLabel: 'Software Reliability',
    difficulty: 'Easy',
    title: 'Mean Time Between Failures (MTBF)',
    type: 'numerical',
    prompt: `An embedded medical controller has an MTTF of ${mttf} hours and an MTTR of ${mttr} hours. What is its Mean Time Between Failures (MTBF) in hours?`,
    givenData: [
      { label: 'MTTF', value: `${mttf} hours` },
      { label: 'MTTR', value: `${mttr} hours` },
    ],
    expectedAnswer: mtbf,
    tolerance: 0,
    unit: 'hours',
    hints: [
      `MTBF is the total elapsed time from the start of an operational period to the end of the subsequent repair period.`,
      `Formula: MTBF = MTTF + MTTR`,
    ],
    derivationSteps: [
      `1. MTBF = MTTF + MTTR`,
      `2. Substitute: ${mttf} + ${mttr} = ${mtbf} hours`,
    ],
    finalExplanation: `The MTBF is ${mtbf} hours.`,
    formulaUsed: 'MTBF = MTTF + MTTR',
  };
}

// 8. Decision Table Rule Count Generator
function generateDecisionTableProblem(): GeneratedProblem {
  const k = randInt(3, 6);
  const totalRules = Math.pow(2, k);

  return {
    id: `dt-rules-${Date.now()}-${randInt(100, 999)}`,
    topic: 'decision_table',
    topicLabel: 'Decision Tables',
    difficulty: 'Easy',
    title: 'Decision Table Complete Rule Enumeration',
    type: 'numerical',
    prompt: `A complex business logic specification contains ${k} independent binary conditions (each condition can evaluate strictly to True or False). How many distinct test rules (columns) must a complete, unsimplified Decision Table contain to exhaustively cover all condition combinations?`,
    givenData: [
      { label: 'Independent Binary Conditions (k)', value: k },
      { label: 'Possible States per Condition', value: 2 },
    ],
    expectedAnswer: totalRules,
    tolerance: 0,
    unit: 'rules',
    hints: [
      `For k independent binary conditions, total combination columns equal 2^k.`,
      `Calculate 2^${k}.`,
    ],
    derivationSteps: [
      `1. Each binary condition has 2 possible evaluations (True or False).`,
      `2. Total rules = 2^k where k = ${k}`,
      `3. 2^${k} = ${totalRules} rules`,
    ],
    finalExplanation: `A complete decision table requires exactly ${totalRules} rule columns to be mathematically complete without missing edge cases.`,
    formulaUsed: 'Total Rules = 2^k',
  };
}

// 9. Cohesion & Coupling Diagnostic Scenarios
function generateCohesionCouplingProblem(): GeneratedProblem {
  const isCohesion = Math.random() > 0.5;

  if (isCohesion) {
    const scenarios = [
      {
        scenario: 'A module named `SystemInitializer` performs system startup routines: it resets the printer buffer, initializes the network socket, and resets the error logs upon device boot.',
        correct: 'Temporal Cohesion',
        options: ['Coincidental Cohesion', 'Temporal Cohesion', 'Logical Cohesion', 'Functional Cohesion'],
        explanation: 'All tasks execute at the exact same point in time (system startup), which is the textbook definition of Temporal Cohesion.',
      },
      {
        scenario: 'A module named `ProcessInputs` accepts a flag parameter: if flag = 1 it prints a report, if flag = 2 it updates inventory, and if flag = 3 it generates an employee salary slip.',
        correct: 'Logical Cohesion',
        options: ['Logical Cohesion', 'Temporal Cohesion', 'Sequential Cohesion', 'Procedural Cohesion'],
        explanation: 'The module performs logically categorized activities selected through an external flag or code selector (Logical Cohesion).',
      },
      {
        scenario: 'A module `CalculateSine` accepts an angle in radians, calculates the Taylor series expansion, and returns the floating-point sine value.',
        correct: 'Functional Cohesion',
        options: ['Functional Cohesion', 'Sequential Cohesion', 'Communicational Cohesion', 'Logical Cohesion'],
        explanation: 'The module performs one single, essential, well-defined mathematical task towards a single goal (Functional Cohesion — the highest and ideal cohesion level).',
      },
      {
        scenario: 'A function `ReadSensorAndCalculateStats` reads temperature data from a sensor into an array and then immediately calculates the average, variance, and standard deviation over that exact same array.',
        correct: 'Communicational Cohesion',
        options: ['Communicational Cohesion', 'Sequential Cohesion', 'Temporal Cohesion', 'Functional Cohesion'],
        explanation: 'Multiple operations operate on the exact same input data structure (Communicational Cohesion).',
      },
      {
        scenario: 'A utility file contains routines `reverseString()`, `calculateTax()`, and `matrixInvert()` bundled together solely because the developer created them in the same week.',
        correct: 'Coincidental Cohesion',
        options: ['Coincidental Cohesion', 'Logical Cohesion', 'Temporal Cohesion', 'Procedural Cohesion'],
        explanation: 'Operations have no meaningful semantic, temporal, or functional relationship (Coincidental Cohesion — the worst form).',
      },
    ];

    const pick = randChoice(scenarios);
    return {
      id: `diag-coh-${Date.now()}-${randInt(100, 999)}`,
      topic: 'cohesion_coupling',
      topicLabel: 'Cohesion & Coupling',
      difficulty: 'Medium',
      title: 'Identify Module Cohesion Level',
      type: 'choice',
      prompt: `Analyze the following module design specification and determine which of the 7 levels of Cohesion it exhibits:
"${pick.scenario}"`,
      givenData: [{ label: 'Module Characteristic', value: 'Design Audit' }],
      options: pick.options,
      expectedAnswer: pick.correct,
      hints: [
        'Recall the 7 levels in order from worst to best: Coincidental, Logical, Temporal, Procedural, Communicational, Sequential, Functional.',
        'Observe how the internal elements communicate with each other or share data.',
      ],
      derivationSteps: [
        `1. Analyze relationship between functions in the module.`,
        `2. ${pick.explanation}`,
        `3. Correct classification: ${pick.correct}`,
      ],
      finalExplanation: pick.explanation,
      formulaUsed: 'Page-Jones & Constantine Cohesion Ladder',
    };
  }

  const couplingScenarios = [
    {
      scenario: 'Module A modifies the internal assembly instructions and private local variables of Module B by directly writing to Module B’s memory address space.',
      correct: 'Content Coupling',
      options: ['Content Coupling', 'Common Coupling', 'Control Coupling', 'Data Coupling'],
      explanation: 'One module directly tampers with or branches into the internal code or memory of another (Content Coupling — the worst coupling level).',
    },
    {
      scenario: 'Modules A, B, C, and D read and mutate a set of global variables declared in a public shared memory block `globals.h`.',
      correct: 'Common Coupling',
      options: ['Common Coupling', 'Stamp Coupling', 'Control Coupling', 'Data Coupling'],
      explanation: 'Multiple modules communicate via shared global variables (Common Coupling).',
    },
    {
      scenario: 'Module A passes a flag `sortByAscendingOrder: boolean` to Module B to govern whether Module B executes an ascending or descending quicksort branch.',
      correct: 'Control Coupling',
      options: ['Control Coupling', 'Data Coupling', 'Stamp Coupling', 'Common Coupling'],
      explanation: 'One module passes control flags or signals that dictate the internal execution flow of the receiving module (Control Coupling).',
    },
    {
      scenario: 'Module A passes a full `CustomerRecord` composite structure (containing 25 fields) to Module B, even though Module B only reads the customer’s phone number.',
      correct: 'Stamp Coupling',
      options: ['Stamp Coupling', 'Data Coupling', 'Common Coupling', 'Control Coupling'],
      explanation: 'An entire record/composite data structure is passed when only a fraction of its fields are needed (Stamp Coupling / Data Structure Coupling).',
    },
    {
      scenario: 'Module A passes two primitive integers `x` and `y` to Module B, which returns their sum `x + y` without any side effects or flag logic.',
      correct: 'Data Coupling',
      options: ['Data Coupling', 'Stamp Coupling', 'Control Coupling', 'Common Coupling'],
      explanation: 'Modules communicate strictly through discrete scalar data arguments (Data Coupling — the cleanest and best practical coupling level).',
    },
  ];

  const pick = randChoice(couplingScenarios);
  return {
    id: `diag-cpl-${Date.now()}-${randInt(100, 999)}`,
    topic: 'cohesion_coupling',
    topicLabel: 'Cohesion & Coupling',
    difficulty: 'Medium',
    title: 'Identify Module Coupling Type',
    type: 'choice',
    prompt: `Analyze the interaction between the modules described below and classify the exact type of Coupling present:
"${pick.scenario}"`,
    givenData: [{ label: 'Interaction Pattern', value: 'Architecture Review' }],
    options: pick.options,
    expectedAnswer: pick.correct,
    hints: [
      'Coupling ladder from worst to best: Content > Common > Control > Stamp > Data.',
      'Check whether global data, whole structures, flags, or pure scalars are exchanged.',
    ],
    derivationSteps: [
      `1. Examine the communication interface between Module A and Module B.`,
      `2. ${pick.explanation}`,
      `3. Correct classification: ${pick.correct}`,
    ],
    finalExplanation: pick.explanation,
    formulaUsed: 'Stevens, Myers & Constantine Coupling Hierarchy',
  };
}

// 10. Boundary Value Analysis (BVA) Generator
function generateBvaProblem(): GeneratedProblem {
  const minVal = randInt(10, 25);
  const maxVal = randInt(minVal + 30, minVal + 80);
  const numVariables = randInt(2, 4);

  const isTestCount = Math.random() > 0.5;

  if (isTestCount) {
    const singleFaultCount = 4 * numVariables + 1;
    const robustnessCount = 6 * numVariables + 1;
    const isRobust = Math.random() > 0.5;
    const count = isRobust ? robustnessCount : singleFaultCount;
    const modeName = isRobust ? 'Robustness Testing' : 'Standard Boundary Value Analysis';
    const formulaStr = isRobust ? '6n + 1' : '4n + 1';

    return {
      id: `bva-count-${Date.now()}-${randInt(100, 999)}`,
      topic: 'testing_bva',
      topicLabel: 'Black-Box Testing (BVA)',
      difficulty: 'Medium',
      title: `${modeName} Test Suite Size`,
      type: 'numerical',
      prompt: `A function takes ${numVariables} independent input variables. Under single-fault assumption ${modeName}, how many test cases are required in total?`,
      givenData: [
        { label: 'Number of Variables (n)', value: numVariables },
        { label: 'Testing Method', value: modeName },
        { label: 'Assumption', value: 'Single-fault assumption' },
      ],
      expectedAnswer: count,
      tolerance: 0,
      unit: 'test cases',
      hints: [
        `Standard BVA requires 4n + 1 test cases (min, min+, nom, max-, max per variable, plus one all-nominal test case).`,
        `Robustness testing tests out-of-bound values (min- and max+) requiring 6n + 1 test cases.`,
      ],
      derivationSteps: [
        `1. Formula for ${modeName}: Test Cases = ${formulaStr}`,
        `2. Here n = ${numVariables}`,
        `3. Test Cases = ${isRobust ? `(6 × ${numVariables}) + 1` : `(4 × ${numVariables}) + 1`} = ${count}`,
      ],
      finalExplanation: `For ${numVariables} variables under ${modeName}, exactly ${count} test cases must be generated.`,
      formulaUsed: `Test Cases = ${formulaStr}`,
    };
  }

  return {
    id: `bva-vals-${Date.now()}-${randInt(100, 999)}`,
    topic: 'testing_bva',
    topicLabel: 'Black-Box Testing (BVA)',
    difficulty: 'Easy',
    title: 'BVA Boundary Points for Range [min, max]',
    type: 'numerical',
    prompt: `An integer input variable $X$ has an equivalence class of valid values specified as $[${minVal}, ${maxVal}]$.
In standard Boundary Value Analysis, how many discrete test values are derived for this single variable (including its boundary neighbors and nominal center)?`,
    givenData: [
      { label: 'Valid Range', value: `[${minVal}, ${maxVal}]` },
      { label: 'Variable Type', value: 'Integer' },
    ],
    expectedAnswer: 5,
    tolerance: 0,
    unit: 'values',
    hints: [
      `Standard BVA for a range [a, b] evaluates 5 key points: min, min+1, nominal, max-1, max.`,
      `Count the points: {${minVal}, ${minVal + 1}, nominal, ${maxVal - 1}, ${maxVal}}.`,
    ],
    derivationSteps: [
      `1. Standard BVA selects: min (a), just above min (a+1), nominal (mid), just below max (b-1), and max (b).`,
      `2. For range [${minVal}, ${maxVal}], the test set is {${minVal}, ${minVal + 1}, ${Math.round((minVal + maxVal) / 2)}, ${maxVal - 1}, ${maxVal}}.`,
      `3. Total points = 5`,
    ],
    finalExplanation: `Standard single-variable BVA tests exactly 5 points: min, min+1, nominal, max-1, and max.`,
    formulaUsed: 'BVA Set = {min, min+1, nom, max-1, max}',
  };
}

// 12. Software Crisis & Requirement Traceability Generator
function generateSoftwareCrisisTraceabilityProblem(): GeneratedProblem {
  const subType = randChoice(['rtm_direction', 'rtm_gold_plating', 'hw_sw_cost', 'program_vs_product']);

  if (subType === 'rtm_direction') {
    const isForward = Math.random() > 0.5;
    if (isForward) {
      return {
        id: `rtm-fwd-${Date.now()}-${randInt(100, 999)}`,
        topic: 'software_crisis_traceability',
        topicLabel: 'Module 1: Traceability Matrix',
        difficulty: 'Easy',
        title: 'Forward Requirement Traceability Verification',
        type: 'choice',
        prompt: `An auditor is checking whether every requirement in the approved SRS document has corresponding design modules, source code implementations, and test cases. Which form of traceability is being performed, and what primary risk does it prevent?`,
        givenData: [
          { label: 'Evaluation Path', value: 'SRS Requirement → Design → Code → Test Cases' },
          { label: 'Artifact', value: 'Requirements Traceability Matrix (RTM)' },
        ],
        options: [
          'Forward Traceability — Prevents requirements from being dropped or forgotten',
          'Backward Traceability — Prevents gold plating and unrequested features',
          'Horizontal Traceability — Measures cyclomatic complexity of functions',
          'Bi-temporal Traceability — Verifies hardware-software partitioning',
        ],
        expectedAnswer: 'Forward Traceability — Prevents requirements from being dropped or forgotten',
        hints: [
          'Forward traceability travels from the original requirements down toward code and test cases.',
          'Its primary purpose is completeness: ensuring 100% of client requirements are actually built and verified.',
        ],
        derivationSteps: [
          '1. Traceability starting at the SRS requirement and tracking forwards to code/test cases is Forward Traceability.',
          '2. Forward traceability guarantees completeness, ensuring no client requirement is overlooked.',
          '3. Backward traceability moves in the opposite direction (Test/Code -> SRS) to justify why code exists.',
        ],
        finalExplanation: 'Forward Traceability tracks each requirement forward into design, code, and test cases to guarantee that all specified requirements are implemented and verified.',
        formulaUsed: 'Forward Traceability: SRS Req -> Design -> Code -> Test',
      };
    } else {
      return {
        id: `rtm-bwd-${Date.now()}-${randInt(100, 999)}`,
        topic: 'software_crisis_traceability',
        topicLabel: 'Module 1: Traceability Matrix',
        difficulty: 'Medium',
        title: 'Backward Traceability & Gold Plating Detection',
        type: 'choice',
        prompt: `During a codebase audit, a senior QA engineer discovers an undocumented encryption module in the repository with unit tests, but finds NO corresponding requirement in the client-signed SRS document. What traceability technique detects this issue, and what term describes this problem?`,
        givenData: [
          { label: 'Condition', value: 'Code exists without corresponding SRS requirement' },
          { label: 'Investigation Direction', value: 'Source Code / Test Case → SRS Document' },
        ],
        options: [
          'Backward Traceability; detects Gold Plating (unrequested scope creep)',
          'Forward Traceability; detects Phase Containment errors',
          'Temporal Traceability; detects Coincidental Cohesion',
          'Structural Traceability; detects Common Coupling',
        ],
        expectedAnswer: 'Backward Traceability; detects Gold Plating (unrequested scope creep)',
        hints: [
          'Tracing backwards from code/tests back to the SRS identifies why each piece of code was written.',
          'Adding unrequested features that the customer never asked for is termed "gold plating".',
        ],
        derivationSteps: [
          '1. When starting from code or test cases and tracing back to the SRS, this is Backward Traceability.',
          '2. If code exists that cannot be traced back to any valid requirement, it represents unrequested scope addition known as "gold plating".',
          '3. Gold plating increases maintenance costs and potential attack surfaces without customer authorization.',
        ],
        finalExplanation: 'Backward Traceability links source code and test cases back to originating SRS requirements, catching gold plating and facilitating change impact analysis.',
        formulaUsed: 'Backward Traceability: Code/Tests -> SRS Requirement',
      };
    }
  }

  if (subType === 'hw_sw_cost') {
    const totalBudget = randChoice([500000, 1000000, 2000000, 5000000]);
    const swPercent = randChoice([80, 85, 90]);
    const swCost = Math.round(totalBudget * (swPercent / 100));

    return {
      id: `crisis-cost-${Date.now()}-${randInt(100, 999)}`,
      topic: 'software_crisis_traceability',
      topicLabel: 'Module 1: Software Crisis',
      difficulty: 'Easy',
      title: 'Hardware vs Software Budget Divergence',
      type: 'numerical',
      prompt: `In an enterprise IT infrastructure upgrade with a total capital budget of $${totalBudget.toLocaleString()}, historical data indicates that software development and maintenance currently account for ${swPercent}% of total IT costs (reflecting the post-1990 software crisis cost trend). Calculate the expected total software expenditure in dollars.`,
      givenData: [
        { label: 'Total IT Budget', value: `$${totalBudget.toLocaleString()}` },
        { label: 'Software Cost Share', value: `${swPercent}%` },
        { label: 'Hardware Cost Share', value: `${100 - swPercent}%` },
      ],
      expectedAnswer: swCost,
      tolerance: 0.01,
      unit: 'USD',
      hints: [
        `Software Cost = Total Budget × (Software Percentage / 100)`,
        `Multiply: ${totalBudget} × ${swPercent / 100}`,
      ],
      derivationSteps: [
        `1. Relative cost curves in software engineering show that software now consumes 80-90% of total systems budgets.`,
        `2. Software Expenditure = $${totalBudget.toLocaleString()} × ${swPercent / 100}`,
        `3. Total Software Cost = $${swCost.toLocaleString()}`,
      ],
      finalExplanation: `The software expenditure is $${swCost.toLocaleString()}, illustrating why managing software costs through rigorous engineering is the central motivation of modern SE.`,
      formulaUsed: 'Software Cost = Total Budget × (Software % / 100)',
    };
  }

  // Program vs Product
  return {
    id: `prog-vs-prod-${Date.now()}-${randInt(100, 999)}`,
    topic: 'software_crisis_traceability',
    topicLabel: 'Module 1: Programs vs Products',
    difficulty: 'Easy',
    title: 'Program vs Software Product Classification',
    type: 'choice',
    prompt: `Which of the following characteristics correctly distinguishes a "Software Product" from a simple "Program"?`,
    givenData: [
      { label: 'Comparison', value: 'Personal Program vs Engineered Software Product' },
    ],
    options: [
      'A software product is developed by a team for diverse users, requires formal documentation, user manuals, and accepted SE discipline',
      'A program is developed using iterative lifecycle models while a software product is written in assembly language without design',
      'A software product has only a single developer who is also the sole user of the application',
      'A program requires extensive user documentation, SRS specifications, and systematic maintenance procedures',
    ],
    expectedAnswer: 'A software product is developed by a team for diverse users, requires formal documentation, user manuals, and accepted SE discipline',
    hints: [
      'A program is usually small, authored by an individual for personal use with ad-hoc development.',
      'A software product has multiple developers, diverse users, careful UI design, thorough documentation, and systematic SE processes.',
    ],
    derivationSteps: [
      '1. Review Rajib Mall Table on Program vs Product.',
      '2. Program: small size, sole user = developer, ad hoc, lacks documentation.',
      '3. Software Product: large size, many users != developers, well documented, systematic SE principles.',
    ],
    finalExplanation: 'A software product is engineered for a large user base by a team of developers, requiring standard documentation, user interfaces, and disciplined software engineering methodologies.',
    formulaUsed: 'Software Product = Team + Multiple Users + Formal Documentation + SE Principles',
  };
}

// 13. SDLC & Phase Containment Problem Generator
function generateSdlcPhaseContainmentProblem(): GeneratedProblem {
  const subType = randChoice(['defect_amplification', 'model_selection', 'phase_contain_def']);

  if (subType === 'defect_amplification') {
    const baseCost = randChoice([50, 100, 200]);
    const numDefects = randInt(5, 20);
    const multiplier = randChoice([60, 80, 100]); // 60x to 100x cost in maintenance
    const costInRequirements = numDefects * baseCost;
    const costInMaintenance = numDefects * baseCost * multiplier;
    const savings = costInMaintenance - costInRequirements;

    return {
      id: `sdlc-phase-${Date.now()}-${randInt(100, 999)}`,
      topic: 'sdlc_phase_containment',
      topicLabel: 'Module 2: Phase Containment of Errors',
      difficulty: 'Medium',
      title: 'Defect Cost Escalation in Maintenance vs. Requirements',
      type: 'numerical',
      prompt: `During development, fixing a defect in the Requirements phase costs $${baseCost}. If the defect escapes phase containment and is discovered only in the Maintenance phase, the cost escalation factor is ${multiplier}×.
If ${numDefects} requirements defects escape undetected into the Maintenance phase, calculate the excess financial loss (money wasted that could have been saved by catching them in the Requirements phase) in dollars.`,
      givenData: [
        { label: 'Base Cost in Requirements', value: `$${baseCost}` },
        { label: 'Defects Escaped', value: `${numDefects}` },
        { label: 'Cost Multiplier in Maintenance', value: `${multiplier}×` },
      ],
      expectedAnswer: savings,
      tolerance: 0.01,
      unit: 'USD',
      hints: [
        `Cost in Maintenance = ${numDefects} × ($${baseCost} × ${multiplier})`,
        `Cost in Requirements = ${numDefects} × $${baseCost}`,
        `Excess loss = Cost in Maintenance - Cost in Requirements`,
      ],
      derivationSteps: [
        `1. Cost if fixed early in Requirements = ${numDefects} × $${baseCost} = $${costInRequirements.toLocaleString()}`,
        `2. Cost when fixed in Maintenance = ${numDefects} × ($${baseCost} × ${multiplier}) = $${costInMaintenance.toLocaleString()}`,
        `3. Excess loss = $${costInMaintenance.toLocaleString()} - $${costInRequirements.toLocaleString()} = $${savings.toLocaleString()}`,
      ],
      finalExplanation: `Failing to achieve phase containment costs an excess of $${savings.toLocaleString()}. This demonstrates why phase reviews and early defect detection are critical in software engineering.`,
      formulaUsed: 'Excess Cost = N × BaseCost × (Multiplier - 1)',
    };
  }

  if (subType === 'model_selection') {
    const scenarios = [
      {
        scenario: 'A startup is building an innovative mobile social app where the target audience needs are poorly understood, user interaction flow is paramount, and the client wants to test mockups before finalizing requirements.',
        model: 'Prototyping Model',
        reason: 'Prototyping is ideal when requirements are ambiguous and user interface validation is required before committing to full development.',
      },
      {
        scenario: 'A defence aerospace contractor is building a satellite flight controller with high financial liability, severe technical uncertainties, and unknown risk factors requiring formal risk assessment at every milestone.',
        model: 'Boehm Spiral Model',
        reason: 'The Spiral Model is a risk-driven meta-model where every cycle incorporates explicit risk analysis and prototype validation before committing to the next phase.',
      },
      {
        scenario: 'A legacy billing calculation system with completely frozen, well-understood requirements, mature technical tools, and strict sequential phase deliverables.',
        model: 'Classical Waterfall Model',
        reason: 'Classical Waterfall is suited only when requirements are completely well understood and frozen with zero expected changes.',
      },
    ];
    const picked = randChoice(scenarios);

    return {
      id: `sdlc-model-${Date.now()}-${randInt(100, 999)}`,
      topic: 'sdlc_phase_containment',
      topicLabel: 'Module 2: Life Cycle Models',
      difficulty: 'Easy',
      title: 'Life Cycle Model Selection Scenario',
      type: 'choice',
      prompt: `Consider the following project scenario:
"${picked.scenario}"
Which software life cycle model should the project manager select as the most appropriate process?`,
      givenData: [
        { label: 'Project Scenario', value: picked.scenario },
      ],
      options: [
        picked.model,
        ...['Classical Waterfall Model', 'Prototyping Model', 'Boehm Spiral Model', 'Iterative Waterfall Model'].filter(m => m !== picked.model).slice(0, 3),
      ],
      expectedAnswer: picked.model,
      hints: [
        'Analyze the project risk profile, requirement clarity, and whether user feedback on UI mockups is essential.',
      ],
      derivationSteps: [
        `1. Analyze requirement volatility and technical risk in the scenario.`,
        `2. ${picked.reason}`,
        `3. Therefore, the recommended model is ${picked.model}.`,
      ],
      finalExplanation: `${picked.model} is the best choice. ${picked.reason}`,
      formulaUsed: 'SDLC Selection = f(Requirement Stability, Risk Level, User Feedback Need)',
    };
  }

  // Phase containment definition
  return {
    id: `sdlc-contain-${Date.now()}-${randInt(100, 999)}`,
    topic: 'sdlc_phase_containment',
    topicLabel: 'Module 2: Phase Containment of Errors',
    difficulty: 'Easy',
    title: 'Principle of Phase Containment of Errors',
    type: 'choice',
    prompt: `What is the core objective of the "Phase Containment of Errors" principle in software life cycle models?`,
    givenData: [
      { label: 'Concept', value: 'Phase Containment of Errors' },
    ],
    options: [
      'Detecting and correcting defects in the exact same phase in which they are introduced, preventing them from propagating downstream',
      'Ensuring that code from phase N is never executed until all future phases are completed',
      'Containing all testing activities strictly to the maintenance phase after product release',
      'Restricting defect tracking solely to software compiler syntax errors',
    ],
    expectedAnswer: 'Detecting and correcting defects in the exact same phase in which they are introduced, preventing them from propagating downstream',
    hints: [
      'Think about what happens when a requirement defect leaks into design, coding, or maintenance.',
      'The principle states that errors should be contained locally within the phase where they originate.',
    ],
    derivationSteps: [
      '1. Phase containment states that defects should be discovered and fixed in the phase where they are introduced.',
      '2. If an error escapes into later phases, fixing it requires rework across all intermediate artifacts (design, code, test cases), multiplying cost exponentially.',
    ],
    finalExplanation: 'Phase Containment of Errors means discovering and correcting errors in the very phase they are introduced to avoid exponential downstream rework costs.',
    formulaUsed: 'Phase Containment: Defect in Phase K must be detected & resolved in Phase K',
  };
}

// 14. Software Quality: Maintainability & Portability Generator
function generateQualityMaintainabilityPortabilityProblem(): GeneratedProblem {
  const subType = randChoice(['lifecycle_ratio', 'maintenance_type', 'portability_layer']);

  if (subType === 'lifecycle_ratio') {
    const devCost = randChoice([100000, 250000, 400000, 800000]);
    const maintenanceCost = devCost * 1.5;
    const totalCost = devCost + maintenanceCost;
    const askTotal = Math.random() > 0.5;

    return {
      id: `qual-ratio-${Date.now()}-${randInt(100, 999)}`,
      topic: 'quality_maintainability_portability',
      topicLabel: 'Module 3: Software Maintainability',
      difficulty: 'Easy',
      title: '40:60 Development vs. Maintenance Lifecycle Calculation',
      type: 'numerical',
      prompt: `A software company spent $${devCost.toLocaleString()} on the initial development (feasibility, requirements, design, coding, and testing) of an enterprise management system.
According to the empirical software engineering rule of thumb, development and maintenance effort follow a 40:60 ratio.
Calculate the expected total ${askTotal ? 'lifetime cost of the software (Development + Maintenance)' : 'maintenance expenditure over the system lifetime'} in dollars.`,
      givenData: [
        { label: 'Initial Development Cost', value: `$${devCost.toLocaleString()}` },
        { label: 'Empirical Ratio (Dev : Maint)', value: '40 : 60' },
      ],
      expectedAnswer: askTotal ? totalCost : maintenanceCost,
      tolerance: 0.01,
      unit: 'USD',
      hints: [
        `If Development is 40% and Maintenance is 60%, Maintenance Cost = DevCost × (60 / 40) = 1.5 × DevCost.`,
        askTotal ? `Total Lifetime Cost = DevCost + Maintenance Cost = 2.5 × DevCost.` : `Compute 1.5 × ${devCost}.`,
      ],
      derivationSteps: [
        `1. Development Share = 40%, Maintenance Share = 60%`,
        `2. Maintenance Cost = $${devCost.toLocaleString()} × (60 / 40) = $${maintenanceCost.toLocaleString()}`,
        askTotal ? `3. Total Cost = $${devCost.toLocaleString()} + $${maintenanceCost.toLocaleString()} = $${totalCost.toLocaleString()}` : `3. Expected Maintenance Cost = $${maintenanceCost.toLocaleString()}`,
      ],
      finalExplanation: askTotal
        ? `The total lifetime cost is $${totalCost.toLocaleString()} ($${devCost.toLocaleString()} dev + $${maintenanceCost.toLocaleString()} maintenance).`
        : `The expected maintenance expenditure is $${maintenanceCost.toLocaleString()} (1.5× the development cost).`,
      formulaUsed: 'Maintenance = DevCost × (60 / 40); Total = DevCost + Maintenance',
    };
  }

  if (subType === 'maintenance_type') {
    const types = [
      {
        scenario: 'A banking client requests an enhancement to add biometric two-factor authentication and support automated PDF report downloads to improve user productivity.',
        ans: 'Perfective Maintenance',
        reason: 'Adding new features, enhancing functionality, and improving performance according to user requests constitutes Perfective Maintenance (~50-60% of total maintenance).',
      },
      {
        scenario: 'The server operating system was upgraded from Ubuntu 20.04 to Ubuntu 24.04, causing the legacy networking socket library to fail due to deprecated kernel system calls. The code is modified to interface with the new OS kernel.',
        ans: 'Adaptive Maintenance',
        reason: 'Modifying software to keep pace with a changing external environment (new OS, new hardware, new database version) is Adaptive Maintenance (~20-25%).',
      },
      {
        scenario: 'An end-user reports that when entering an order of zero quantity, the checkout system crashes with an uncaught DivideByZeroException. A patch is deployed to handle the edge case.',
        ans: 'Corrective Maintenance',
        reason: 'Correcting latent errors and defects that escaped development and were discovered during operational use is Corrective Maintenance (~15-20%).',
      },
    ];
    const picked = randChoice(types);

    return {
      id: `qual-maint-${Date.now()}-${randInt(100, 999)}`,
      topic: 'quality_maintainability_portability',
      topicLabel: 'Module 3: Maintenance Categories',
      difficulty: 'Easy',
      title: 'Classify the Maintenance Activity',
      type: 'choice',
      prompt: `Classify the following software maintenance activity into its proper category:
"${picked.scenario}"`,
      givenData: [
        { label: 'Engineering Activity', value: picked.scenario },
      ],
      options: [
        'Corrective Maintenance',
        'Adaptive Maintenance',
        'Perfective Maintenance',
        'Preventive Maintenance',
      ],
      expectedAnswer: picked.ans,
      hints: [
        'Recall the three main maintenance types: Corrective (bug fixing), Adaptive (adapting to environmental changes like new OS/hardware), and Perfective (new features & enhancements).',
      ],
      derivationSteps: [
        `1. Analyze the triggering event in the scenario.`,
        `2. ${picked.reason}`,
        `3. Correct classification is: ${picked.ans}.`,
      ],
      finalExplanation: `${picked.ans}: ${picked.reason}`,
      formulaUsed: 'Maintenance Classification = { Corrective, Adaptive, Perfective }',
    };
  }

  // Portability Layer
  return {
    id: `qual-port-${Date.now()}-${randInt(100, 999)}`,
    topic: 'quality_maintainability_portability',
    topicLabel: 'Module 3: Software Portability',
    difficulty: 'Medium',
    title: 'Portability Interface / Abstraction Layer Architecture',
    type: 'choice',
    prompt: `To achieve high portability across different operating systems (Windows, Linux, macOS), what standard architectural solution does software engineering prescribe (Rajib Mall Fig. 16.1)?`,
    givenData: [
      { label: 'Goal', value: 'High Portability across disparate OS platforms' },
    ],
    options: [
      'Route all platform-dependent calls through a standardized Portability Interface (PAL), isolating OS-specific code into thin adapters',
      'Rewrite the entire application codebase in assembly language for each target architecture',
      'Embed conditional compiler directives (#ifdef) directly inside every business logic function',
      'Rely on virtual memory hardware without modifying software architecture',
    ],
    expectedAnswer: 'Route all platform-dependent calls through a standardized Portability Interface (PAL), isolating OS-specific code into thin adapters',
    hints: [
      'Think of an abstraction layer that wraps all operating system calls (file I/O, threads, sockets).',
      'The core application logic remains 100% platform-independent; only the adapter changes.',
    ],
    derivationSteps: [
      '1. Directly scattering OS-dependent system calls makes code unportable and difficult to maintain.',
      '2. The standard solution is a Portability Interface (Platform Abstraction Layer).',
      '3. Business logic calls the uniform interface; platform-specific adapters translate to concrete OS syscalls.',
    ],
    finalExplanation: 'A Portability Interface insulates application business logic from underlying platform differences, allowing porting to a new OS by implementing only a thin adapter module.',
    formulaUsed: 'Portability Pattern = Application Logic -> Portability Interface -> Platform Adapter',
  };
}

// 15. Requirements & Decision Table Problem Generator
function generateRequirementsDecisionTableProblem(): GeneratedProblem {
  const subType = randChoice(['decision_table', 'req_classification', 'srs_ieee830']);
  if (subType === 'decision_table') {
    const p = generateDecisionTableProblem();
    p.topic = 'requirements_decision_tables';
    p.topicLabel = 'Module 4: Decision Tables & Requirements';
    return p;
  }

  if (subType === 'req_classification') {
    const scenarios = [
      {
        req: 'The system shall authenticate the user using OAuth 2.0 and calculate monthly compound interest on savings accounts.',
        ans: 'Functional Requirement',
        reason: 'It specifies a specific behavior, calculation, and transformation that the software must perform.',
      },
      {
        req: 'The search interface must respond to user queries within 250 milliseconds under a concurrent load of 10,000 active users.',
        ans: 'Non-Functional Requirement (Performance)',
        reason: 'It specifies a quality attribute and performance constraint (latency and throughput) rather than a functional behavior.',
      },
      {
        req: 'The software must be written in TypeScript with Node.js LTS and run on the client’s existing Ubuntu Linux server hardware.',
        ans: 'Design Constraint',
        reason: 'It restricts the developer’s freedom of design choices by mandating a specific language, platform, and operating environment.',
      },
    ];
    const picked = randChoice(scenarios);

    return {
      id: `req-class-${Date.now()}-${randInt(100, 999)}`,
      topic: 'requirements_decision_tables',
      topicLabel: 'Module 4: Requirements Classification',
      difficulty: 'Easy',
      title: 'Classify: Functional vs. Non-Functional vs. Design Constraint',
      type: 'choice',
      prompt: `Classify the following requirement statement from a software engineering specification:
"${picked.req}"`,
      givenData: [
        { label: 'Requirement Statement', value: picked.req },
      ],
      options: [
        'Functional Requirement',
        'Non-Functional Requirement (Performance)',
        'Design Constraint',
        'Informal User Suggestion',
      ],
      expectedAnswer: picked.ans,
      hints: [
        'Functional = What the system does (features, computations).',
        'Non-Functional = Quality attributes (speed, security, availability).',
        'Design Constraint = Mandatory restrictions on tools, language, or environment.',
      ],
      derivationSteps: [
        `1. Analyze what the statement mandates.`,
        `2. ${picked.reason}`,
        `3. Correct classification: ${picked.ans}.`,
      ],
      finalExplanation: `${picked.ans}: ${picked.reason}`,
      formulaUsed: 'Requirement Classification = { Functional, Non-Functional, Design Constraint }',
    };
  }

  // IEEE 830 SRS characteristic
  return {
    id: `req-ieee-${Date.now()}-${randInt(100, 999)}`,
    topic: 'requirements_decision_tables',
    topicLabel: 'Module 4: IEEE 830 SRS Standards',
    difficulty: 'Easy',
    title: 'Characteristics of a Good SRS Document (IEEE 830)',
    type: 'choice',
    prompt: `Under the IEEE 830 standard for Software Requirements Specifications (SRS), which property requires that every stated requirement can be checked by an objective, cost-effective test or demonstration?`,
    givenData: [
      { label: 'Standard', value: 'IEEE 830 SRS Guidelines' },
      { label: 'Property Criterion', value: 'Can be proved by an objective test or inspection' },
    ],
    options: [
      'Verifiable (Testable)',
      'Unambiguous',
      'Traceable',
      'Modifiable',
    ],
    expectedAnswer: 'Verifiable (Testable)',
    hints: [
      'If a requirement cannot be tested objectively, it is not verifiable (e.g. "the UI should be user friendly" is un-verifiable).',
    ],
    derivationSteps: [
      '1. IEEE 830 specifies that a requirement is Verifiable if and only if there exists a finite, cost-effective process with which a person or machine can verify that the software product meets the requirement.',
      '2. Ambiguous terms like "fast" or "user-friendly" violate verifiability unless quantitative metrics are provided.',
    ],
    finalExplanation: 'Verifiability ensures that every requirement in the SRS is objectively testable with measurable acceptance criteria.',
    formulaUsed: 'IEEE 830 Characteristic: Verifiable / Testable',
  };
}

// 16. Software Design: FOD vs OOD Generator
function generateDesignFodVsOodProblem(): GeneratedProblem {
  const subType = randChoice(['booch_dictum', 'fire_alarm_state', 'state_locality']);

  if (subType === 'booch_dictum') {
    return {
      id: `fod-booch-${Date.now()}-${randInt(100, 999)}`,
      topic: 'design_fod_vs_ood',
      topicLabel: 'Module 5: FOD vs OOD Philosophies',
      difficulty: 'Easy',
      title: "Grady Booch's Dictum on Design Philosophies",
      type: 'choice',
      prompt: `According to the famous formulation by Grady Booch, what parts of speech should an engineer identify to discover procedural / function-oriented components versus object-oriented components?`,
      givenData: [
        { label: 'Authority', value: 'Grady Booch' },
        { label: 'Question', value: 'Syntactic distinction between FOD and OOD' },
      ],
      options: [
        'Identify verbs for procedural/function-oriented design, and nouns for object-oriented design',
        'Identify adjectives for procedural design, and adverbs for object-oriented design',
        'Identify nouns for procedural design, and verbs for object-oriented design',
        'Identify conjunctions for procedural design, and prepositions for object-oriented design',
      ],
      expectedAnswer: 'Identify verbs for procedural/function-oriented design, and nouns for object-oriented design',
      hints: [
        'Function-oriented design centers on actions/transformations (verbs like compute, parse, print).',
        'Object-oriented design centers on real-world entities/data (nouns like Customer, Account, Detector).',
      ],
      derivationSteps: [
        '1. Grady Booch stated: "Identify verbs if you are after procedural design, and nouns if you are after object-oriented design."',
        '2. Verbs represent functional transformations; nouns represent encapsulated objects.',
      ],
      finalExplanation: 'Booch highlighted that procedural/function-oriented design focuses on decomposing actions (verbs), while object-oriented design focuses on modeling domain entities (nouns).',
      formulaUsed: 'Booch Dictum: Verbs -> Procedural/FOD; Nouns -> Object-Oriented/OOD',
    };
  }

  if (subType === 'fire_alarm_state') {
    return {
      id: `fod-alarm-${Date.now()}-${randInt(100, 999)}`,
      topic: 'design_fod_vs_ood',
      topicLabel: 'Module 5: Fire-Alarm Case Study',
      difficulty: 'Medium',
      title: 'State Architecture in Fire-Alarm System (FOD vs OOD)',
      type: 'choice',
      prompt: `In the 80-floor, 1,000-room Fire-Alarm System case study (Dr. Rajib Mall), how is the system state organized in Function-Oriented Design (FOD) compared to Object-Oriented Design (OOD)?`,
      givenData: [
        { label: 'System Size', value: '80 floors, 1,000 rooms with smoke detector & alarm' },
      ],
      options: [
        'FOD centralizes state in five global arrays accessed by all functions; OOD distributes encapsulated state across 1,000 Detector and Alarm objects',
        'FOD creates 1,000 classes while OOD uses one large global C structure without methods',
        'FOD distributes state into local private variables; OOD forces all data into a single global array',
        'Both FOD and OOD store state identically in a centralized SQL database with identical interfaces',
      ],
      expectedAnswer: 'FOD centralizes state in five global arrays accessed by all functions; OOD distributes encapsulated state across 1,000 Detector and Alarm objects',
      hints: [
        'Review Slide 19 and 20 of Software Design lecture.',
        'In FOD: detector_status[1000], alarm_status[1000], neighbor_alarms[1000][10] are all global arrays.',
        'In OOD: each room has class Detector and class Alarm encapsulating its own state.',
      ],
      derivationSteps: [
        '1. In FOD, state is centralized in global arrays (detector_status[1000], alarm_status[1000], etc.), and functions all reach into it.',
        '2. In OOD, state is distributed and encapsulated inside Detector and Alarm class instances.',
      ],
      finalExplanation: 'FOD centralizes state into global data stores causing common coupling risks, whereas OOD encapsulates state in distributed object instances communicating via messages.',
      formulaUsed: 'FOD: Centralized State in Global Arrays | OOD: Distributed State in Objects',
    };
  }

  // Complementary nature
  return {
    id: `fod-comp-${Date.now()}-${randInt(100, 999)}`,
    topic: 'design_fod_vs_ood',
    topicLabel: 'Module 5: FOD & OOD Synthesis',
    difficulty: 'Easy',
    title: 'Complementary Application of FOD and OOD in Practice',
    type: 'choice',
    prompt: `In modern software development, how do Function-Oriented Design and Object-Oriented Design relate to each other?`,
    givenData: [
      { label: 'Architectural Question', value: 'Are FOD and OOD mutually exclusive or complementary?' },
    ],
    options: [
      'They are complementary: OOD is used at the macro level to design classes and interfaces, while FOD top-down refinement is used inside individual methods to design algorithms',
      'They are mutually exclusive: a program written in an object-oriented language cannot contain any procedural functions or algorithms',
      'Function-oriented design has been completely deprecated and is never used in any phase of modern software design',
      'Object-oriented design can only be used for database storage while FOD is used exclusively for network protocols',
    ],
    expectedAnswer: 'They are complementary: OOD is used at the macro level to design classes and interfaces, while FOD top-down refinement is used inside individual methods to design algorithms',
    hints: [
      'A system can look object-oriented on the outside, while each method inside a class contains a procedural algorithm.',
    ],
    derivationSteps: [
      '1. High-level architecture benefits from OOD (nouns, domain objects, encapsulation).',
      '2. Inside any given method, detailed logic is designed using top-down procedural decomposition (FOD).',
      '3. Therefore, FOD and OOD complement each other at different levels of design granularity.',
    ],
    finalExplanation: 'OOD structures the system into classes and packages, while FOD is applied within class methods to structure procedural algorithms.',
    formulaUsed: 'Macro Architecture = OOD | Micro Method Algorithms = FOD',
  };
}

// 17. Testing Fundamentals & Unit Testing Generator
function generateTestingFundamentalsUnitProblem(): GeneratedProblem {
  const subType = randChoice(['error_fault_failure', 'verification_validation', 'driver_vs_stub']);

  if (subType === 'error_fault_failure') {
    const scenarios = [
      {
        text: 'A programmer mistypes an array boundary condition as `i <= length` instead of `i < length` while writing a loop.',
        ans: 'Error (Human mistake)',
        reason: 'A mental mistake or incorrect action made by a developer during coding/design is an Error.',
      },
      {
        text: 'The compiled class file contains the incorrect comparison instruction sitting dormant on disk.',
        ans: 'Fault / Defect (Bug in software artifact)',
        reason: 'The static manifestation of an error in the source code or binary is a Fault (or Defect).',
      },
      {
        text: 'During execution with an array of size 10, the program attempts to read index 10 and abruptly terminates with `ArrayIndexOutOfBoundsException`.',
        ans: 'Failure (Observed dynamic deviation at runtime)',
        reason: 'The runtime dynamic deviation of the program from its expected behavior is a Failure.',
      },
    ];
    const picked = randChoice(scenarios);

    return {
      id: `test-eff-${Date.now()}-${randInt(100, 999)}`,
      topic: 'testing_fundamentals_unit',
      topicLabel: 'Module 6: Testing Terminology',
      difficulty: 'Easy',
      title: 'Classify: Error vs. Fault/Defect vs. Failure',
      type: 'choice',
      prompt: `Under standard IEEE software engineering terminology, classify the following occurrence:
"${picked.text}"`,
      givenData: [
        { label: 'Occurrence', value: picked.text },
      ],
      options: [
        'Error (Human mistake)',
        'Fault / Defect (Bug in software artifact)',
        'Failure (Observed dynamic deviation at runtime)',
        'Incident (Unrelated network glitch)',
      ],
      expectedAnswer: picked.ans,
      hints: [
        'Error = Developer mistake.',
        'Fault = Static code defect.',
        'Failure = Dynamic runtime deviation.',
      ],
      derivationSteps: [
        `1. Analyze whether this is a developer action, a static code flaw, or dynamic runtime execution.`,
        `2. ${picked.reason}`,
        `3. Correct classification: ${picked.ans}.`,
      ],
      finalExplanation: `${picked.ans}: ${picked.reason}`,
      formulaUsed: 'Human Error -> Code Fault -> Runtime Failure',
    };
  }

  if (subType === 'verification_validation') {
    const isVerification = Math.random() > 0.5;
    return {
      id: `test-vv-${Date.now()}-${randInt(100, 999)}`,
      topic: 'testing_fundamentals_unit',
      topicLabel: 'Module 6: Verification vs. Validation',
      difficulty: 'Easy',
      title: `Boehm's Criterion: Verification vs. Validation`,
      type: 'choice',
      prompt: isVerification
        ? `According to Barry Boehm's classic definition, which question defines "Verification", and how is it primarily conducted?`
        : `According to Barry Boehm's classic definition, which question defines "Validation", and how is it primarily conducted?`,
      givenData: [
        { label: 'Target', value: isVerification ? 'Verification' : 'Validation' },
        { label: 'Authority', value: 'Barry Boehm' },
      ],
      options: isVerification
        ? [
            '"Are we building the product right?" — Conducted via static reviews, inspections, and consistency checks against phase specifications',
            '"Are we building the right product?" — Conducted via dynamic execution of test cases against customer expectations',
            '"How fast can we build the product?" — Conducted via COCOMO effort estimations',
            '"Will the product sell well in the market?" — Conducted via market surveys',
          ]
        : [
            '"Are we building the right product?" — Conducted via dynamic execution of test cases to verify customer operational requirements',
            '"Are we building the product right?" — Conducted via static reviews, inspections, and phase conformance checks',
            '"How fast can we build the product?" — Conducted via project scheduling',
            '"Can the product be patented?" — Conducted via legal reviews',
          ],
      expectedAnswer: isVerification
        ? '"Are we building the product right?" — Conducted via static reviews, inspections, and consistency checks against phase specifications'
        : '"Are we building the right product?" — Conducted via dynamic execution of test cases to verify customer operational requirements',
      hints: [
        'Verification = "Right product" or "Product right"? Verification checks conformance to specification ("building the product right").',
        'Validation checks whether the customer gets what they actually wanted ("building the right product").',
      ],
      derivationSteps: [
        isVerification
          ? '1. Verification = "Are we building the product right?". Checks phase outputs against phase inputs statically.'
          : '1. Validation = "Are we building the right product?". Checks final software against real user requirements dynamically.',
      ],
      finalExplanation: isVerification
        ? 'Verification asks "Are we building the product right?" and is performed statically (reviews, inspections) to ensure conformance to specifications.'
        : 'Validation asks "Are we building the right product?" and is performed dynamically (running test cases) to ensure customer requirements are satisfied.',
      formulaUsed: 'Verification: Building product right | Validation: Building right product',
    };
  }

  // Driver vs Stub
  const isDriver = Math.random() > 0.5;
  return {
    id: `test-scaffold-${Date.now()}-${randInt(100, 999)}`,
    topic: 'testing_fundamentals_unit',
    topicLabel: 'Module 6: Drivers & Stubs in Unit Testing',
    difficulty: 'Medium',
    title: `Unit Test Scaffolding: ${isDriver ? 'Driver' : 'Stub'} Module Role`,
    type: 'choice',
    prompt: isDriver
      ? `A module under test (MUT) named 'CalculateTax' needs to be unit tested in isolation, but the user interface and main coordinating program that normally call it have not yet been implemented. What scaffolding component must be constructed, and what is its role?`
      : `A module under test (MUT) named 'OrderProcessor' calls a subordinate function 'queryCreditScore()' which queries a remote bank database. The bank module is not yet written. What scaffolding component must be constructed, and what is its role?`,
    givenData: [
      { label: 'Module Under Test', value: isDriver ? 'CalculateTax' : 'OrderProcessor' },
      { label: 'Missing Dependency', value: isDriver ? 'Calling Superordinate (Caller)' : 'Called Subordinate (Callee)' },
    ],
    options: isDriver
      ? [
          'A Driver module — a dummy calling program that passes test inputs to the MUT and verifies returned outputs',
          'A Stub module — a dummy called procedure that returns a hardcoded mock value',
          'A Compiler Linker — automatically synthesizes missing main routines',
          'A Boundary Value Analyzer — generates mathematical proofs',
        ]
      : [
          'A Stub module — a dummy called procedure with the same interface that returns simplified or hardcoded mock data to the MUT',
          'A Driver module — a dummy calling program that simulates the superordinate main function',
          'A Regression Harness — re-executes all previously passed test suites',
          'A Structure Chart — visualizes call hierarchies',
        ],
    expectedAnswer: isDriver
      ? 'A Driver module — a dummy calling program that passes test inputs to the MUT and verifies returned outputs'
      : 'A Stub module — a dummy called procedure with the same interface that returns simplified or hardcoded mock data to the MUT',
    hints: [
      isDriver ? 'The missing component is the CALLER sitting above the MUT.' : 'The missing component is the CALLEE sitting below the MUT.',
      'Drivers call the module; Stubs are called by the module.',
    ],
    derivationSteps: [
      isDriver
        ? '1. The missing component is superordinate (calls the MUT).'
        : '1. The missing component is subordinate (called by the MUT).',
      isDriver
        ? '2. A Driver is a dummy calling harness designed to pass inputs and verify outputs.'
        : '2. A Stub is a dummy called routine providing a simplified or table-lookup response.',
    ],
    finalExplanation: isDriver
      ? 'A Driver simulates the calling environment above the module under test.'
      : 'A Stub simulates a called subordinate procedure below the module under test.',
    formulaUsed: 'Driver: Sits Above MUT (Calls) | Stub: Sits Below MUT (Called)',
  };
}

// Master Dispatcher
export function generateRandomProblem(topic: ProblemTopic = 'all'): GeneratedProblem {
  let target = topic;
  if (target === 'all') {
    const midTermCoreTopics: ProblemTopic[] = [
      'software_crisis_traceability',
      'sdlc_phase_containment',
      'quality_maintainability_portability',
      'requirements_decision_tables',
      'design_cohesion_coupling',
      'design_fod_vs_ood',
      'testing_fundamentals_unit',
    ];
    target = randChoice(midTermCoreTopics);
  }

  switch (target) {
    case 'software_crisis_traceability':
      return generateSoftwareCrisisTraceabilityProblem();
    case 'sdlc_phase_containment':
      return generateSdlcPhaseContainmentProblem();
    case 'quality_maintainability_portability':
      return generateQualityMaintainabilityPortabilityProblem();
    case 'requirements_decision_tables':
      return generateRequirementsDecisionTableProblem();
    case 'design_cohesion_coupling':
      return generateCohesionCouplingProblem();
    case 'design_fod_vs_ood':
      return generateDesignFodVsOodProblem();
    case 'testing_fundamentals_unit':
      return generateTestingFundamentalsUnitProblem();
    case 'cocomo':
      return generateCocomoProblem();
    case 'mccabe':
      return generateMcCabeProblem();
    case 'halstead':
      return generateHalsteadProblem();
    case 'fp':
      return generateFpProblem();
    case 'putnam':
      return generatePutnamProblem();
    case 'reliability':
      return generateReliabilityProblem();
    case 'error_seeding':
      return generateErrorSeedingProblem();
    case 'decision_table':
      return generateDecisionTableProblem();
    case 'cohesion_coupling':
      return generateCohesionCouplingProblem();
    case 'testing_bva':
      return generateBvaProblem();
    default:
      return generateSoftwareCrisisTraceabilityProblem();
  }
}

