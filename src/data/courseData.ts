import { CourseModule } from '../types';

export const COURSE_DATA: CourseModule[] = [
  // ── MODULE 1: Introduction to Software Engineering ─────────────────────────
  {
    id: 'mod-1',
    moduleNumber: 1,
    title: 'Introduction to Software Engineering',
    description: 'The Software Crisis, Hardware vs. Software cost ratios, Programs vs. Software Products, Building Construction Analogy, Abstraction, Decomposition, and Requirement Traceability Matrices (RTM).',
    day: 1,
    topics: [
      {
        id: 'top-1-1',
        moduleId: 'mod-1',
        lessonNumber: 1,
        title: 'The Software Crisis, Symptoms & Hardware/Software Cost Ratio',
        day: 1,
        difficulty: 'Easy',
        isHighYield: true,
        isNumerical: true,
        hasDiagram: true,
        tags: ['Software Crisis', 'Cost Ratio', 'Software Economics', 'Maintenance'],
        summary: 'Historical emergence of the Software Crisis in the late 1960s. Shift in cost balance from hardware-dominated to software-dominated (>85% software). Key symptoms: cost overruns, delayed delivery, frequent crashes, unmaintainability.',
        keyPoints: [
          'Software Crisis (1968 NATO Conference): Triggered by exponentially increasing hardware capabilities outstripping human ability to build reliable software.',
          'Cost Ratio Inversion: In 1955, Hardware accounted for 80% and Software 20% of IT expenditure. Today, Software and Maintenance exceed 85-90% of total lifetime cost.',
          'Key Symptoms: Skyrocketing development and maintenance budgets, chronic schedule slippage, poor reliability, inability to meet actual user needs, and unmaintainable codebases.'
        ],
        diagramType: 'rtm_traceability',
        examTips: 'Draw the Hardware vs Software Cost curve over the decades and list at least 4 prominent symptoms of the software crisis.',
        fullNotes: `### 1. The Software Crisis
In the late 1960s, the computing world experienced a severe crisis known as the **Software Crisis**. 

#### Historical Origin
Hardware costs were falling exponentially due to advancements in semiconductor technology (Moore's Law), while software costs were skyrocketing. Software projects were consistently:
- Running massively over budget (often 2x to 5x initial estimates).
- Exceeding schedules by months or years.
- Failing to meet user requirements upon delivery.
- Plagued by bugs, poor reliability, and frequent crashes.
- Difficult or impossible to maintain, adapt, or enhance.

#### The Hardware vs. Software Cost Inversion
- **1955:** Hardware accounted for ~80% of IT budgets; Software was ~20%.
- **1970:** Cost was roughly 50:50.
- **1985 onwards:** Software (especially post-delivery maintenance) accounts for **85% to 90%+** of total IT expenditures.`
      },
      {
        id: 'top-1-2',
        moduleId: 'mod-1',
        lessonNumber: 2,
        title: 'Programs vs. Software Products & The Building Construction Analogy',
        day: 1,
        difficulty: 'Easy',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Programs vs Products', 'Building Analogy', 'Discipline'],
        summary: 'A program is small, developed by an individual for personal use with informal methods. A software product is large, built by teams for diverse users, systematically documented, thoroughly tested, and designed for long-term maintainability.',
        keyPoints: [
          'Building Construction Analogy: Building a small garden wall requires intuition and simple tools. Building a 60-story skyscraper collapses without structural engineering, blueprints, and soil load calculations.',
          'Complexity Scaling: For small toy programs, ad-hoc exploratory methods work. For multi-million line enterprise systems, engineering discipline is mandatory.',
          'Documentation: A product requires full lifecycle documentation (SRS, Design, Test Plans, User Manuals) to enable multi-person maintenance.'
        ],
        diagramType: 'waterfall_effort',
        examTips: 'Differentiate between a Program and a Software Product across 4 dimensions: size, user base, documentation, and development style.',
        fullNotes: `### 2. Programs versus Software Products

| Dimension | Program | Software Product |
|---|---|---|
| **Author** | Single programmer / student | Multi-disciplinary team of engineers |
| **User Base** | Author or small group | Thousands or millions of diverse clients |
| **Size** | Small (< 1,000 LOC) | Massive (100 KLOC to Millions of LOC) |
| **Documentation** | Negligible / personal notes | Comprehensive (SRS, Architecture, API, User Manuals) |
| **Maintenance** | Re-written if broken | Maintained for 10-25+ years by evolving teams |
| **Development Style** | Ad-hoc exploratory | Systematic, phase-contained engineering process |`
      },
      {
        id: 'top-1-3',
        moduleId: 'mod-1',
        lessonNumber: 3,
        title: 'Complexity Taming: Abstraction, Decomposition & SESE Structured Programming',
        day: 1,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: true,
        hasDiagram: true,
        tags: ['Abstraction', 'Decomposition', 'Structured Programming', 'Dijkstra'],
        summary: 'Human cognitive limit (Miller 7 ± 2 chunks). Monolithic systems have O(N²) interactions. Abstraction and Decomposition reduce coupling. Böhm-Jacopini Structured Programming Theorem: Sequence, Selection, Iteration with Single-Entry Single-Exit (SESE).',
        keyPoints: [
          'Miller Law: Human working memory can hold only 7 ± 2 chunks of information simultaneously.',
          'Combinatorial Complexity: For N un-partitioned components, potential communication paths equal N(N-1)/2 ≈ O(N²).',
          'Abstraction: Suppresses unnecessary internal details at each layer to manage focus.',
          'Decomposition: Divides a monolith into cohesive, loosely-coupled modules.',
          'Böhm-Jacopini Theorem: Any computable function can be expressed using only three control structures: Sequence, Selection (if-then-else), and Iteration (while-do) with Single-Entry Single-Exit (SESE).'
        ],
        diagramType: 'cohesion_coupling_ladders',
        examTips: 'State the Böhm-Jacopini theorem and explain why unstructured GOTO jumps increase cognitive load and verification difficulty.',
        fullNotes: `### 3. Taming Software Complexity

#### 1. Cognitive Limits & O(N²) Growth
When software grows, interactions between statements and variables explode:
$$\\text{Interactions} = \\frac{N(N-1)}{2} \\approx O(N^2)$$
Without decomposition, understanding the software exceeds human working memory ($7 \\pm 2$).

#### 2. The Twin Pillars of Software Engineering
1. **Abstraction**: Separating internal implementation details from external behavior.
2. **Decomposition**: Dividing a system into smaller, self-contained sub-units.

#### 3. Structured Programming & SESE
Edsger W. Dijkstra (1968, *"GOTO Statement Considered Harmful"*): Unconstrained GOTO jumps create spaghetti control flow. SESE (Single-Entry, Single-Exit) guarantees that every block has exactly one entry point and one exit point.`
      },
      {
        id: 'top-1-4',
        moduleId: 'mod-1',
        lessonNumber: 4,
        title: 'Requirement Traceability Matrix (RTM): Forward vs. Backward Traceability',
        day: 1,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Traceability', 'RTM', 'Forward Traceability', 'Backward Traceability'],
        summary: 'Requirement Traceability Matrix (RTM) cross-references business needs, SRS functional requirements, architectural modules, code files, and test cases. Forward traceability ensures no requirement is omitted; backward traceability prevents gold plating.',
        keyPoints: [
          'RTM Definition: A bidirectional grid mapping requirements to design artifacts, source code functions, and test cases.',
          'Forward Traceability: Traces from Requirement -> Design Module -> Source Code -> Test Case. Proves that every client requirement has been implemented and tested (detects completeness gaps).',
          'Backward (Reverse) Traceability: Traces from Test Case / Code -> Design Module -> Requirement. Proves that every line of code is justified by an authorized requirement (detects "gold plating" and rogue features).'
        ],
        diagramType: 'rtm_traceability',
        examTips: 'Explain the difference between Forward and Backward Traceability and give an example of an RTM table structure.',
        fullNotes: `### 4. Requirement Traceability Matrix (RTM)

A Requirement Traceability Matrix maps requirements across the entire lifecycle:

\`\`\`text
User Need (UN-1) ──> SRS Clause (REQ-1) ──> Design Module (MOD-1) ──> Code Function (calcTax()) ──> Unit Test (TC-1)
       └───────────────────────── FORWARD TRACEABILITY ──────────────────────────────────────────────>
       <──────────────────────── BACKWARD TRACEABILITY ──────────────────────────────────────────────┘
\`\`\`

#### Why Both Directions Matter
- **Forward Traceability**: Answers *"Did we build everything requested?"* (Guarantees completeness).
- **Backward Traceability**: Answers *"Why does this code exist? Who requested it?"* (Guarantees relevance, eliminates unauthorized gold plating).`
      }
    ]
  },

  // ── MODULE 2: Software Life Cycle Models ────────────────────────────────────
  {
    id: 'mod-2',
    moduleNumber: 2,
    title: 'Software Life Cycle Models',
    description: 'Classical Waterfall, Iterative Waterfall, Phase Containment of Errors (Boehm 1x to 100x cost curve), Prototyping Model, Evolutionary and Spiral Models (risk-driven meta-model).',
    day: 1,
    topics: [
      {
        id: 'top-2-1',
        moduleId: 'mod-2',
        lessonNumber: 5,
        title: 'The 6 Life Cycle Stages & Classical Waterfall Model',
        day: 1,
        difficulty: 'Easy',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['SDLC', 'Waterfall', 'Sequential', 'Feasibility'],
        summary: 'The 6 sequential stages: Feasibility Study, Requirements Analysis & Specification (SRS), Design, Coding & Unit Testing, Integration & System Testing, Maintenance. Classical Waterfall is an idealistic baseline with zero feedback paths.',
        keyPoints: [
          'The 6 SDLC Stages in exact sequence: Feasibility -> SRS -> Design -> Coding/Unit Testing -> Integration/System Testing -> Maintenance.',
          'Classical Waterfall: Strictly linear-sequential. A phase starts only after the previous phase is 100% frozen and signed off.',
          'Idealistic Assumption: Assumes zero defects are made during development and requirements never change. Not viable for practical commercial projects.'
        ],
        diagramType: 'waterfall_effort',
        examTips: 'Name the 6 phases in order. Why is Classical Waterfall called an "idealistic" model?',
        fullNotes: `### 1. The Classical Waterfall Model
Introduced by Winston Royce (1970). It serves as the foundational conceptual framework for software engineering.

#### The 6 Sequential Stages
1. **Feasibility Study**: Explores technical, financial, and operational viability.
2. **Requirements Analysis & Specification (SRS)**: Elicits, analyzes, and documents customer requirements.
3. **Design**: Transforms the SRS into high-level architecture and detailed module designs.
4. **Coding & Unit Testing**: Converts design into source code and tests individual modules in isolation.
5. **Integration & System Testing**: Assembles modules and validates the complete system against the SRS.
6. **Maintenance**: Corrects residual bugs, adapts to new environments, and adds requested features.`
      },
      {
        id: 'top-2-2',
        moduleId: 'mod-2',
        lessonNumber: 6,
        title: 'Iterative Waterfall, Feedback Paths & Phase Containment of Errors',
        day: 1,
        difficulty: 'Hard',
        isHighYield: true,
        isNumerical: true,
        hasDiagram: true,
        tags: ['Iterative Waterfall', 'Feedback Loops', 'Phase Containment', 'Boehm Cost Curve'],
        summary: 'Iterative Waterfall introduces feedback paths between consecutive phases. Phase Containment of Errors: catching defects in the phase they occur. Boehm Cost Escalation: cost to fix an error escalates exponentially (1x at Req -> 100x at Maintenance).',
        keyPoints: [
          'Feedback Loops: Allow defects discovered in later phases to be reworked in the phase of origin.',
          'Phase Containment: The discipline of detecting and eliminating defects in the same phase they are introduced before they propagate downstream.',
          'Boehm Defect Cost Escalation: Fixing a requirements defect costs 1x during SRS, 3-5x in Design, 10x in Coding, 20-50x in System Testing, and 100-200x in post-delivery Maintenance.'
        ],
        diagramType: 'iterative_waterfall',
        examTips: 'Explain the Boehm defect cost escalation curve and mathematically show the cost savings of phase containment.',
        fullNotes: `### 2. Iterative Waterfall & Phase Containment

\`\`\`text
Requirements (1x cost) ──> Design (5x cost) ──> Coding (10x cost) ──> Testing (50x cost) ──> Maintenance (100x cost)
       ^                       |                   |                    |                        |
       └───────────────────────┴───────────────────┴────────────────────┴────────────────────────┘
                                     FEEDBACK PATHS FOR REWORK
\`\`\`

#### Boehm Cost Escalation Principle
If a requirement error is caught immediately during the SRS phase, it takes a few minutes to rewrite a sentence ($1x$). If that same error slips into production code, fixing it requires revising requirements, redesigning modules, modifying code, rewriting unit and regression tests, updating manuals, and deploying patches ($100x$).`
      },
      {
        id: 'top-2-3',
        moduleId: 'mod-2',
        lessonNumber: 7,
        title: 'Prototyping Model: Throwaway Prototypes vs. Production Increments',
        day: 1,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Prototyping', 'Throwaway Prototype', 'UI/UX', 'Requirements'],
        summary: 'Prototyping builds a mock-up (throwaway toy) to resolve ambiguous user requirements and UI workflows before full-scale development. Replaced by production code once specifications are finalized.',
        keyPoints: [
          'Use Case: When client has vague, ambiguous requirements or novel user interface expectations.',
          'Throwaway Nature: The prototype is constructed quickly using rapid development tools, omitting robust security, fault handling, and scalability.',
          'Client Collaboration: The client experiments with the prototype, providing rapid feedback to crystalize a precise SRS.',
          'Contrast with Evolutionary: A prototype is discarded after SRS approval; an evolutionary increment is shipped to production.'
        ],
        diagramType: 'spiral_quadrants',
        examTips: 'Differentiate between the Prototyping model and the Evolutionary model across 3 key criteria.',
        fullNotes: `### 3. The Prototyping Model

#### Workflow
1. Quick requirements gathering.
2. Rapid prototype construction (focusing purely on external UI and user interactions).
3. Customer evaluation and hands-on experimentation.
4. Refinement of requirements based on customer feedback.
5. Discarding the prototype and implementing the actual product using an engineered lifecycle model.`
      },
      {
        id: 'top-2-4',
        moduleId: 'mod-2',
        lessonNumber: 8,
        title: 'Evolutionary & Spiral Models: Risk-Driven Meta-Model',
        day: 1,
        difficulty: 'Hard',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Spiral Model', 'Evolutionary', 'Risk Management', 'Meta-Model'],
        summary: 'Evolutionary model delivers functional increments. Boehm Spiral Model is a risk-driven meta-model combining prototyping, waterfall, and iterative development across 4 repeating quadrants.',
        keyPoints: [
          'Evolutionary Model: Decomposes product into core functionality delivered in successive functional releases (Increment 1 -> Increment 2 -> Increment 3).',
          'Boehm Spiral Model (1988): The defining organizing principle is RISK RESOLUTION.',
          'Four Quadrants: Q1: Determine Objectives & Alternatives; Q2: Identify & Resolve Risks (prototyping, simulation); Q3: Develop & Verify Next-Level Product; Q4: Review & Plan Next Loop.',
          'Radial & Angular Dimensions: Radius r represents cumulative cost incurred; Angular displacement theta represents development progress.',
          'Meta-Model: Can emulate Waterfall (zero risk), Prototyping (UI risk), or Evolutionary models.'
        ],
        diagramType: 'spiral_quadrants',
        examTips: 'Draw Boehm’s Spiral Model with all 4 quadrants labeled and explain why it is classified as a Meta-Model.',
        fullNotes: `### 4. Boehm’s Spiral Model
The Spiral model is a **risk-driven meta-model** developed by Barry Boehm in 1988.

#### The 4 Quadrants
1. **Quadrant 1 (Top-Left): Objective Setting & Constraints**  
   Identify specific iteration goals, alternative implementations, and project constraints.
2. **Quadrant 2 (Top-Right): Risk Assessment & Resolution**  
   Analyze technical, financial, and schedule risks. Build prototypes, run benchmarks, or conduct simulations to neutralize top risks.
3. **Quadrant 3 (Bottom-Right): Development & Validation**  
   Implement the increment using appropriate lifecycle techniques (e.g. waterfall, formal proofs).
4. **Quadrant 4 (Bottom-Left): Review & Next Loop Planning**  
   Review deliverables with client and plan the next spiral iteration.`
      }
    ]
  },

  // ── MODULE 3: Software Quality: Maintainability & Portability ────────────────
  {
    id: 'mod-3',
    moduleNumber: 3,
    title: 'Software Quality (Maintainability & Portability)',
    description: 'Quality factors from Introductory Chapter: Traditional vs Modern views of Software Quality, McCall Factor Model, Maintainability Pillars (Understandability, Modifiability, Testability), 40:60 Economics, and Portability Interfaces (HAL).',
    day: 1,
    topics: [
      {
        id: 'top-3-1',
        moduleId: 'mod-3',
        lessonNumber: 9,
        title: 'Modern Software Quality View vs. Fitness of Purpose & McCall Factors',
        day: 1,
        difficulty: 'Easy',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Software Quality', 'Fitness of Purpose', 'McCall Factors', 'Non-Functional'],
        summary: 'In manufacturing, quality is "fitness of purpose". In software, a program can meet functional requirements but have poor UI, crash intermittently, or be impossible to maintain. Modern quality combines functional correctness with maintainability, reliability, and portability.',
        keyPoints: [
          'Inadequacy of Fitness of Purpose: A program with correct arithmetic but cryptic error messages or spaghetti code fails quality standards.',
          'Modern Software Quality: Quality = Correctness + Maintainability + Portability + Reliability + Usability + Efficiency.',
          'McCall Factor Hierarchy: Product Operation (Correctness, Reliability, Usability), Product Revision (Maintainability, Flexibility, Testability), and Product Transition (Portability, Reusability, Interoperability).'
        ],
        diagramType: 'maintainability_portability',
        examTips: 'Explain why "fitness of purpose" is inadequate for software quality using two concrete real-world counterexamples.',
        fullNotes: `### 1. Modern View of Software Quality

#### The Inadequacy of "Fitness of Purpose"
In physical manufacturing, a ceiling fan or car that works reliably has high quality. In software:
- **Case 1 (Unusable UI):** A tax calculator produces correct math but requires obscure command-line hex codes.
- **Case 2 (Spaghetti Code):** An inventory program runs today, but adding one new product type requires 3 months of rewrites due to lack of modularity.

Therefore, modern software engineering requires **Product Operation**, **Product Revision (Maintainability)**, and **Product Transition (Portability)**.`
      },
      {
        id: 'top-3-2',
        moduleId: 'mod-3',
        lessonNumber: 10,
        title: 'Software Maintainability: Understandability, Modifiability & Testability',
        day: 1,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Maintainability', 'Understandability', 'Modifiability', 'Testability'],
        summary: 'Maintainability is the ease with which software can be modified to fix bugs, adapt to new environments, or add features. Supported by three pillars: Understandability, Modifiability, and Testability.',
        keyPoints: [
          'Maintainability Definition: The capability of the software product to be modified. Modifications include corrections, improvements or adaptation to environmental changes.',
          'Understandability: How easily a new engineer can read and comprehend code structure, naming conventions, and architectural intent without author guidance.',
          'Modifiability: How easily code changes can be isolated to a single module without causing ripple effects across the codebase (promoted by high cohesion and low coupling).',
          'Testability: The effort required to validate modified software through isolated unit tests and automated regression suites.'
        ],
        diagramType: 'maintainability_portability',
        examTips: 'Define Maintainability and analyze its three constituent sub-characteristics (Understandability, Modifiability, Testability).',
        fullNotes: `### 2. The Three Pillars of Maintainability

\`\`\`text
                   ┌──────────────────────────────────────┐
                   │       SOFTWARE MAINTAINABILITY       │
                   └──────────────────┬───────────────────┘
         ┌────────────────────────────┼────────────────────────────┐
         ↓                            ↓                            ↓
┌─────────────────┐          ┌─────────────────┐          ┌─────────────────┐
│ UNDERSTANDABILITY│          │  MODIFIABILITY  │          │   TESTABILITY   │
│ Clean code,     │          │ High cohesion,  │          │ Unit harnesses, │
│ naming, docs    │          │ loose coupling  │          │ mock stubs,     │
│ & modular design│          │ & encapsulation │          │ regression suite│
└─────────────────┘          └─────────────────┘          └─────────────────┘
\`\`\`
`
      },
      {
        id: 'top-3-3',
        moduleId: 'mod-3',
        lessonNumber: 11,
        title: 'Software Economics: The 40:60 Development vs. Maintenance Rule',
        day: 1,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: true,
        hasDiagram: true,
        tags: ['Software Economics', '40:60 Ratio', 'Maintenance Cost', 'Lientz-Swanson'],
        summary: 'Empirical studies (Boehm, Lientz & Swanson, Rajib Mall) demonstrate that maintenance accounts for >60% of total lifecycle costs, while initial development accounts for <=40%. Breakdown: Corrective (20%), Adaptive (20%), Perfective (60%).',
        keyPoints: [
          'The 40:60 Rule: Over a software system’s 10-20 year lifetime, at least 60% of total effort and expenditure is dedicated to post-delivery maintenance.',
          'Maintenance Categories: 1. Corrective (repairing bugs, ~20%); 2. Adaptive (porting to new OS, hardware, or third-party APIs, ~20%); 3. Perfective (adding features, tuning performance, ~60%).',
          'Quality Impact: Spending more effort on clean design and testing during initial development significantly reduces the dominant 60% maintenance cost.'
        ],
        diagramType: 'maintainability_portability',
        examTips: 'State the 40:60 rule and calculate the annual maintenance expenditure given initial development cost and change traffic.',
        fullNotes: `### 3. The 40:60 Software Economics Rule

Empirical investigations across hundreds of industrial projects confirm:
$$\\text{Total Lifetime Cost} = \\text{Development Cost (} \\le 40\\% \\text{)} + \\text{Maintenance Cost (} \\ge 60\\% \\text{)}$$

#### The 3 Categories of Maintenance
1. **Corrective (20%)**: Reactive modifications to fix latent defects.
2. **Adaptive (20%)**: Modifications to keep software usable in a changing environment (OS upgrades, cloud migrations, database schema updates).
3. **Perfective (60%)**: Enhancements to improve performance, maintainability, or add user-requested features.`
      },
      {
        id: 'top-3-4',
        moduleId: 'mod-3',
        lessonNumber: 12,
        title: 'Software Portability: Portability Interfaces & Hardware Abstraction Layers (HAL)',
        day: 1,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Portability', 'HAL', 'Hardware Abstraction Layer', 'OS Independence'],
        summary: 'Portability is the ease of transferring software across diverse hardware architectures and operating systems. Achieved by segregating machine-dependent logic into a thin Portability Interface or Hardware Abstraction Layer (HAL).',
        keyPoints: [
          'Portability Definition: The ease with which a software application can run on different platforms without major code rewrites.',
          'Portability Interface / HAL: A specialized software layer that translates standardized machine-independent application calls into target-specific hardware instructions or OS system calls.',
          'Architectural Principle: By confining machine dependencies to <5% of the codebase, 95%+ of the core business logic remains completely portable.'
        ],
        diagramType: 'maintainability_portability',
        examTips: 'Explain how a Hardware Abstraction Layer (HAL) achieves portability with an architectural block diagram.',
        fullNotes: `### 4. Software Portability & The HAL

\`\`\`text
┌────────────────────────────────────────────────────────┐
│     Machine-Independent Core Application Software      │
│            (90% to 95% of total source code)           │
└───────────────────────────┬────────────────────────────┘
                            │ (Standardized API Calls)
┌───────────────────────────▼────────────────────────────┐
│   PORTABILITY INTERFACE / HARDWARE ABSTRACTION LAYER   │
│           (Confines machine-dependent code)            │
└───────────┬───────────────────┬────────────────────┬───┘
            ↓                   ↓                    ↓
┌───────────────────────┐ ┌───────────┐ ┌────────────────┐
│ Linux / POSIX Kernel  │ │ Windows OS│ │ Embedded ARM/RT│
└───────────────────────┘ └───────────┘ └────────────────┘
\`\`\`
`
      }
    ]
  },

  // ── MODULE 4: Requirements Analysis & Specification (SRS) ───────────────────
  {
    id: 'mod-4',
    moduleNumber: 4,
    title: 'Requirements Analysis and Specification (SRS)',
    description: 'Requirements gathering, Functional vs Non-Functional requirements, Design constraints, IEEE 830 standard, Formal Specification with Predicate Logic and Hoare Triples, Decision Trees and 4-quadrant Decision Tables (2^k rules).',
    day: 2,
    topics: [
      {
        id: 'top-4-1',
        moduleId: 'mod-4',
        lessonNumber: 13,
        title: 'Role of System Analyst & Requirements Analysis Process',
        day: 2,
        difficulty: 'Easy',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['System Analyst', 'Requirements Elicitation', 'SRS', 'Interviews'],
        summary: 'System Analyst acts as the communication bridge between non-technical clients and software engineers. Requirements gathering through interviews, questionnaires, task analysis, and observation. Uncovers inconsistencies and incompleteness.',
        keyPoints: [
          'Analyst Responsibilities: Elicitation, analysis, conflict resolution, feasibility assessment, and SRS authorship.',
          'Common Elicitation Techniques: User interviews, brainstorming workshops, questionnaires, task analysis, existing document audits.',
          'Key Defects Detected: Inconsistency (conflicting requirements) and Incompleteness (omitted boundary or failure scenarios).'
        ],
        diagramType: 'decision_tree_table',
        examTips: 'List 4 key qualities of a successful System Analyst and explain why customer interviews must be supplemented with document inspection.',
        fullNotes: `### 1. Requirements Analysis & The System Analyst

#### The Core Problem
Customers know their business domain but rarely speak in technical specifications. Developers understand algorithms but rarely understand business operations. The **System Analyst** bridges this gap.

#### The Two Main Requirement Defects
1. **Inconsistency**: Requirement A demands X while Requirement B demands NOT X.
2. **Incompleteness**: Failure to state what happens when inputs are missing, boundary limits are exceeded, or networks drop.`
      },
      {
        id: 'top-4-2',
        moduleId: 'mod-4',
        lessonNumber: 14,
        title: 'Functional Requirements, Non-Functional Requirements & Design Constraints',
        day: 2,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Functional Requirements', 'Non-Functional', 'Constraints', 'IEEE 830'],
        summary: 'Functional Requirements specify input -> processing -> output behaviors. Non-Functional Requirements describe quality attributes (performance, reliability, security). Constraints restrict design freedom (hardware, OS, regulatory standards).',
        keyPoints: [
          'Functional Requirements (FR): Explicit statement of what the system must compute, validate, transform, and output (e.g., "The system shall compute compound interest").',
          'Non-Functional Requirements (NFR): Operational qualities and performance targets (e.g., "Response time shall be < 2 seconds for 95% of queries").',
          'Design Constraints: Restrictions placed on implementation options (e.g., "Must run on Ubuntu Linux 22.04 LTS and use PostgreSQL 15").'
        ],
        diagramType: 'decision_tree_table',
        examTips: 'Given 5 requirement statements, classify each into Functional Requirement, Non-Functional Requirement, or Design Constraint.',
        fullNotes: `### 2. Functional vs. Non-Functional vs. Constraints

| Category | Definition | Example |
|---|---|---|
| **Functional** | What the system must do (input -> process -> output) | "System shall validate customer PIN and check daily withdrawal limit." |
| **Non-Functional** | How well the system performs (quality targets) | "System shall process transactions within 1.5 seconds under 1,000 concurrent users." |
| **Constraint** | Boundary limitations on developer freedom | "Software must be implemented in Java 17 and comply with HIPAA regulations." |`
      },
      {
        id: 'top-4-3',
        moduleId: 'mod-4',
        lessonNumber: 15,
        title: 'Characteristics of a Good SRS (IEEE 830) & Bad-SRS Anti-Patterns',
        day: 2,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['IEEE 830', 'Good SRS', 'Anti-Patterns', 'Verification'],
        summary: 'IEEE 830 standard criteria: Complete, Consistent, Unambiguous, Verifiable, Modifiable, Traceable. Specifies WHAT, never unnecessary HOW. Bad patterns: Over-specification, ambiguous words (user-friendly, fast), forward referencing.',
        keyPoints: [
          'IEEE 830 Golden Rule: An SRS specifies WHAT the system should do, NOT HOW it is designed or implemented.',
          'Verifiable: Every requirement must have a definitive, quantifiable acceptance test criteria.',
          'Bad SRS Patterns: Overspecification (dictating data structures/algorithms), Ambiguity (vague adjectives like "fast", "robust"), and Contradictions.'
        ],
        diagramType: 'decision_tree_table',
        examTips: 'List 6 characteristics of a good SRS according to IEEE 830. Why is overspecification considered an SRS defect?',
        fullNotes: `### 3. Characteristics of a Good SRS (IEEE 830)
1. **Unambiguous**: Every requirement has exactly one interpretation.
2. **Complete**: All user scenarios, error conditions, and system behaviors are specified.
3. **Consistent**: No requirements contradict one another.
4. **Verifiable**: There exists a cost-effective test method to verify conformance.
5. **Modifiable**: Clear formatting with numbered clauses and table of contents.
6. **Traceable**: Traceable both forward and backward via unique requirement IDs.`
      },
      {
        id: 'top-4-4',
        moduleId: 'mod-4',
        lessonNumber: 16,
        title: 'Formal Specification: First-Order Predicate Logic & Hoare Axiomatic Triples',
        day: 2,
        difficulty: 'Hard',
        isHighYield: true,
        isNumerical: true,
        hasDiagram: true,
        tags: ['Formal Methods', 'Predicate Logic', 'Hoare Triples', 'Z Schemas'],
        summary: 'Mathematical formal specifications remove natural language ambiguity. First-Order Predicate Logic (quantifiers ∀, ∃, connectives ∧, ∨, ¬, →). Hoare Axiomatic Triples {P} S {Q} specify operations with Preconditions and Postconditions.',
        keyPoints: [
          'Why Formal Methods: Natural language is inherently ambiguous, incomplete, and imprecise. Mathematical logic provides provable correctness.',
          'Predicate Logic: Uses universal (∀) and existential (∃) quantifiers to model domain constraints.',
          'Hoare Axiomatic Triples {P} S {Q}: If precondition P holds true before execution of program S, then postcondition Q is guaranteed to hold true upon termination.',
          'State Invariants: Conditions that must remain true before and after every system operation.'
        ],
        diagramType: 'decision_tree_table',
        examTips: 'Express the condition "Every customer with a balance over 10,000 has a gold account" in formal predicate logic.',
        fullNotes: `### 4. Formal Specification using Predicate Logic

#### Hoare Triples
$$\\{P\\} \\; S \\; \\{Q\\}$$
- $P$: Precondition (state assumption before execution).
- $S$: Program operation or state transition.
- $Q$: Postcondition (guaranteed state upon termination).

#### Example: ATM Cash Withdrawal
- **Precondition $P$**: $\\text{amt} > 0 \\land \\text{amt} \\le \\text{balance} \\land (\\text{withdrawnToday} + \\text{amt}) \\le \\text{dailyLimit}$
- **Operation $S$**: $\\text{dispenseCash(amt)}$
- **Postcondition $Q$**: $\\text{balance}' = \\text{balance} - \\text{amt} \\land \\text{withdrawnToday}' = \\text{withdrawnToday} + \\text{amt}$`
      },
      {
        id: 'top-4-5',
        moduleId: 'mod-4',
        lessonNumber: 17,
        title: 'Decision Trees & 4-Quadrant Decision Tables (2^k Rules)',
        day: 2,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: true,
        hasDiagram: true,
        tags: ['Decision Trees', 'Decision Tables', '2^k Rules', 'Condition Stub'],
        summary: 'Represent complex conditional logic. Decision Tables use 4 quadrants: Condition Stub, Condition Entry, Action Stub, Action Entry. An exhaustive table with k boolean conditions has 2^k rule columns, detecting missing combinations and contradictions.',
        keyPoints: [
          'Decision Tree: Graphical branching structure showing conditions on branches and actions at leaf nodes.',
          'Decision Table 4 Quadrants: Condition Stub (top-left), Condition Entry (top-right), Action Stub (bottom-left), Action Entry (bottom-right).',
          'Completeness Rule: For k binary conditions, there must be exactly 2^k distinct combinations of condition values (rules).',
          'Inconsistency Detection: If two rules have identical condition combinations but dictate conflicting actions, an inconsistency is mathematically revealed.'
        ],
        diagramType: 'decision_tree_table',
        examTips: 'Construct a 4-quadrant decision table for a university admission policy with 3 boolean conditions and show that it has 2^3 = 8 rules.',
        fullNotes: `### 5. Decision Trees and Decision Tables

#### The 4 Quadrants of a Decision Table
\`\`\`text
┌───────────────────────────┬────────────────────────────────┐
│   CONDITION STUB          │   CONDITION ENTRY              │
│   (List of all conditions)│   (Rule 1 | Rule 2 | ... 2^k)  │
├───────────────────────────┼────────────────────────────────┤
│   ACTION STUB             │   ACTION ENTRY                 │
│   (List of all actions)   │   (X for executed actions)     │
└───────────────────────────┴────────────────────────────────┘
\`\`\`
`
      }
    ]
  },

  // ── MODULE 5: Software Design: Modularity & FOD vs. OOD ────────────────────
  {
    id: 'mod-5',
    moduleNumber: 5,
    title: 'Software Design: Modularity & FOD vs. OOD',
    description: 'Modularity principles and cost curves, 7 levels of Cohesion, 6 levels of Coupling, Structure Charts (fan-in/fan-out), Function-Oriented Design vs Object-Oriented Design (Booch Dictum), and the Fire-Alarm System case study.',
    day: 2,
    topics: [
      {
        id: 'top-5-1',
        moduleId: 'mod-5',
        lessonNumber: 18,
        title: 'Software Design Goals, Modularity & The Modularity Cost Curve',
        day: 2,
        difficulty: 'Easy',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Design Goals', 'Modularity', 'Cost Curve', 'Understandability'],
        summary: 'Software design transforms SRS into an architectural blueprint. Modularity partitions the system into independent modules. Modularity reduces cognitive load up to an optimum point, after which module interface overhead increases cost.',
        keyPoints: [
          'Design Objectives: Correctness, Understandability, Efficiency, Maintainability, Reusability.',
          'Modularity Principle: Decomposing a large program into discrete, manageable modules with high internal cohesion and low external coupling.',
          'Modularity Cost Curve: Total cost is the sum of Module Development Cost (decreases as modules get smaller) and Inter-Module Interface Overhead (increases as number of modules grows). Minimum total cost occurs at the optimum modularity point.'
        ],
        diagramType: 'cohesion_coupling_ladders',
        examTips: 'Draw the Modularity vs Development Cost curve showing Module Development Cost, Interface Cost, and Total Cost.',
        fullNotes: `### 1. Software Design & Modularity

#### The Modularity Cost Tradeoff
\`\`\`text
Cost
  ^
  │ \\            Total Cost Curve (U-shaped)           /
  │  \\         /─────────────────────────────\\        /
  │   \\       /                               \\      /
  │    \\     /                                 \\    /   Interface Overhead Cost (rises)
  │     \\   /           Optimum Modularity       \\  /   /
  │      \\ v                    v                 \\/   /
  │       *─────────────────────*─────────────────/───/
  │        \\                                     /
  │         \\  Module Development Cost (falls)  /
  └──────────────────────────────────────────────────────────> Degree of Modularity
\`\`\`
`
      },
      {
        id: 'top-5-2',
        moduleId: 'mod-5',
        lessonNumber: 19,
        title: 'Classification of Cohesion: The 7 Levels (Coincidental to Functional)',
        day: 2,
        difficulty: 'Hard',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Cohesion', 'Functional Cohesion', 'Coincidental', 'Module Quality'],
        summary: 'Cohesion measures the internal strength and functional relatedness of elements within a single module. 7 levels ranked from worst to best: Coincidental, Logical, Temporal, Procedural, Communicational, Sequential, Functional.',
        keyPoints: [
          'Cohesion Definition: A measure of how strongly-related and focused the responsibilities of a single module are.',
          '7 Levels (Worst to Best): 1. Coincidental (unrelated); 2. Logical (same category, selected by flag); 3. Temporal (startup/shutdown); 4. Procedural (sequence of steps across different algorithms); 5. Communicational (acts on same data structure); 6. Sequential (output of one feeds next); 7. Functional (performs exactly ONE well-defined task).',
          'Gold Standard: Always strive for Functional Cohesion.'
        ],
        diagramType: 'cohesion_coupling_ladders',
        examTips: 'List the 7 levels of Cohesion in exact order from worst to best and describe recognition cues for Logical vs Functional cohesion.',
        fullNotes: `### 2. The 7 Levels of Cohesion (Worst to Best)

1. **Coincidental Cohesion (Worst)**: Elements grouped arbitrarily with no meaningful relationship (e.g., a "utility" function that prints an invoice, computes a sine wave, and checks disk space).
2. **Logical Cohesion**: Elements perform logically similar activities, selected by a control flag parameter (e.g., an \`operate(flag)\` function that does print, save, or delete based on an integer code).
3. **Temporal Cohesion**: Elements are executed at the same point in time (e.g., an \`initialize()\` routine that configures logging, opens sockets, and allocates memory).
4. **Procedural Cohesion**: Elements are grouped because they follow a specific execution order, but operate on different data items.
5. **Communicational Cohesion**: Elements operate on the same input data set or produce the same output data structure.
6. **Sequential Cohesion**: The output of one task serves as the direct input to the next task within the module.
7. **Functional Cohesion (Best)**: All elements cooperate to perform exactly one well-defined computational task (e.g., \`computeStandardDeviation(data)\`).`
      },
      {
        id: 'top-5-3',
        moduleId: 'mod-5',
        lessonNumber: 20,
        title: 'Classification of Coupling: The 6 Levels (Content to Data)',
        day: 2,
        difficulty: 'Hard',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Coupling', 'Data Coupling', 'Content Coupling', 'Common Coupling'],
        summary: 'Coupling measures the degree of interdependence between two modules. 6 levels ranked from worst to best: Content (worst), Common, Control, Stamp, Data (best). Loose coupling minimizes ripple effects of changes.',
        keyPoints: [
          'Coupling Definition: The degree to which one module relies on the internal implementation details of another module.',
          '6 Levels (Worst to Best): 1. Content (one module modifies internals of another); 2. Common (shared global data); 3. Control (one module directs execution flow of another); 4. Stamp (passes entire composite data record); 5. Data (passes only elementary primitive parameters).',
          'Content Coupling: Fatal to maintainability; branching directly into another module code or modifying its private variables.',
          'Gold Standard: Strive for Data Coupling (minimal parameter passing).'
        ],
        diagramType: 'cohesion_coupling_ladders',
        examTips: 'Differentiate between Stamp Coupling and Data Coupling with code snippets. Why is Common Coupling dangerous in multi-threaded systems?',
        fullNotes: `### 3. The Levels of Coupling (Worst to Best)

1. **Content Coupling (Worst)**: One module directly references or modifies the internal code or private data of another module, or jumps into the middle of another subroutine.
2. **Common Coupling**: Modules share a global data structure (e.g., global variables or shared database tables). Changes to the global structure break all accessing modules simultaneously.
3. **Control Coupling**: One module passes a control flag that explicitly directs the internal execution logic of another module.
4. **Stamp Coupling**: Modules pass an entire composite data structure (e.g., full \`EmployeeRecord\`) when the recipient only needs one primitive field (\`employeeId\`).
5. **Data Coupling (Best)**: Modules communicate solely by passing elementary scalar data items (e.g., integer, float).`
      },
      {
        id: 'top-5-4',
        moduleId: 'mod-5',
        lessonNumber: 21,
        title: 'Structure Charts: Hierarchy, Fan-In (Reuse) & Fan-Out (Span of Control)',
        day: 2,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: true,
        hasDiagram: true,
        tags: ['Structure Chart', 'Fan-In', 'Fan-Out', 'Span of Control'],
        summary: 'Structure charts depict hierarchical module call relationships, data parameters passed, and control flags. Design heuristics: Maximize Fan-In (code reuse); Keep Fan-Out moderate (<= 7 ± 2) to prevent excessive coordinator complexity.',
        keyPoints: [
          'Structure Chart Notation: Rectangles represent modules; directional arrows represent invocations; open circles with tail represent data couples; solid circles with tail represent control couples.',
          'Fan-In: The number of calling modules pointing into a module. High fan-in is highly desirable because it signifies code reuse of utility libraries.',
          'Fan-Out: The number of subordinate modules called by a module. High fan-out (> 7) indicates a module has too many coordinating responsibilities (poor cohesion).',
          'Span of Control: A manager module should ideally call 5 ± 2 subordinates.'
        ],
        diagramType: 'cohesion_coupling_ladders',
        examTips: 'Define Fan-in and Fan-out. Explain why a structure chart with high fan-in and moderate fan-out represents a healthy architecture.',
        fullNotes: `### 4. Structure Charts & Architectural Metrics

\`\`\`text
               ┌────────────────┐
               │  Root Manager  │ (Fan-out = 2)
               └───────┬────────┘
           ┌───────────┴───────────┐
           ↓                       ↓
    ┌──────────────┐        ┌──────────────┐
    │ Sub-Module A │        │ Sub-Module B │
    └──────┬───────┘        └──────┬───────┘
           └───────────┬───────────┘
                       ↓
              ┌────────────────┐
              │ Utility Engine │ (Fan-in = 2: High Reuse!)
              └────────────────┘
\`\`\`
`
      },
      {
        id: 'top-5-5',
        moduleId: 'mod-5',
        lessonNumber: 22,
        title: 'Function-Oriented vs. Object-Oriented Design: Booch Dictum & State Location',
        day: 2,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['FOD vs OOD', 'Booch Dictum', 'State Location', 'Encapsulation'],
        summary: 'Comparison of Function-Oriented Design (FOD) and Object-Oriented Design (OOD). Grady Booch dictum: "Identify verbs for FOD, nouns for OOD". Centralized state in FOD vs distributed encapsulated state in OOD.',
        keyPoints: [
          'Grady Booch Dictum: Function-Oriented Design views software as a collection of subroutines manipulating shared data; Object-Oriented Design views software as autonomous objects encapsulating state and operations.',
          'State Centralization: In FOD, state is centralized in global data tables; functions are primary and data is secondary. In OOD, state is distributed into private object attributes; data and methods are tightly coupled.',
          'Evolution Ripple Effects: Changing a data format in FOD impacts all functions reading that data structure. In OOD, data representation changes are hidden behind private class interfaces.'
        ],
        diagramType: 'fod_vs_ood',
        examTips: 'Contrast FOD and OOD using Grady Booch’s definition across 4 dimensions: primary building block, state location, reusability, and evolution.',
        fullNotes: `### 5. Function-Oriented Design vs. Object-Oriented Design

| Dimension | Function-Oriented Design (FOD) | Object-Oriented Design (OOD) |
|---|---|---|
| **Primary Building Block** | Subroutines / Functions (Verbs) | Autonomous Objects (Nouns) |
| **State Location** | Centralized in global databases/files | Distributed into encapsulated object fields |
| **Data vs. Action** | Functions are primary; data is secondary | Data and operations are bound together |
| **Coupling Type** | Prone to common and stamp coupling | Encapsulated method interfaces (data coupling) |
| **Extensibility** | Adding new data types breaks functions | Polymorphism allows adding classes without modifying callers |`
      },
      {
        id: 'top-5-6',
        moduleId: 'mod-5',
        lessonNumber: 23,
        title: 'Fire-Alarm System Case Study: Extensibility, Maintenance & Sensor Addition',
        day: 2,
        difficulty: 'Hard',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Fire Alarm', 'Case Study', 'Extensibility', 'FOD vs OOD'],
        summary: 'A system polls heat sensors and sounds alarms. When client adds Smoke Detectors: FOD requires modifying and recompiling Interrogate(), CheckThreshold(), and SoundAlarm(). OOD creates a new SmokeSensor subclass with zero modifications to existing code.',
        keyPoints: [
          'Case Study Scenario: An automated fire alarm monitors a multi-story building. Requirements change to introduce new Smoke Detectors alongside existing Heat Detectors.',
          'The FOD Failure Mode: Functions are structured by action (e.g., interrogateAll(), evaluateAlarms()). Adding a new sensor type forces editing the internal switch cases of every single centralized function.',
          'The OOD Solution: A polymorphic Sensor base class defines poll() and isAlert(). Adding SmokeSensor merely extends Sensor. The main loop calls sensor.poll() polymorphically with zero modifications.'
        ],
        diagramType: 'fod_vs_ood',
        examTips: 'Walk through the Fire-Alarm System case study to prove why OOD exhibits superior maintainability and extensibility compared to FOD.',
        fullNotes: `### 6. The Fire-Alarm System Case Study

#### The FOD Extensibility Trap
In FOD, the software has centralized functions:
- \`pollSensors()\`
- \`evaluateStatus()\`
- \`triggerAlarms()\`

When a **Smoke Sensor** is introduced, the developer must open and modify every function to handle the new smoke sensor format. If there are 15 functions, all 15 must be retested and recompiled!

#### The OOD Polymorphic Triumph
In OOD, we define a common interface:
\`\`\`cpp
class Sensor {
public:
    virtual void poll() = 0;
    virtual bool isTriggered() = 0;
};
\`\`\`
To add a Smoke Sensor, simply implement \`class SmokeSensor : public Sensor\`. The controller loop iterates over a list of \`Sensor*\` pointers without ever changing a single line of code!`
      }
    ]
  },

  // ── MODULE 6: Software Testing Fundamentals & Unit Testing ───────────────────
  {
    id: 'mod-6',
    moduleNumber: 6,
    title: 'Software Testing Fundamentals & Unit Testing',
    description: 'Testing fundamentals from Introductory Chapter: Error vs Fault vs Failure causal chain, Verification vs Validation (Boehm), Testing in the Small vs Large, Unit testing scaffolding (Drivers vs Stubs), Equivalence Class Partitioning and Boundary Value Analysis.',
    day: 2,
    topics: [
      {
        id: 'top-6-1',
        moduleId: 'mod-6',
        lessonNumber: 24,
        title: 'Testing Fundamentals: Myers\' Maxim & The Error -> Fault -> Failure Chain',
        day: 2,
        difficulty: 'Easy',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Testing Fundamentals', 'Myers Maxim', 'Error', 'Fault', 'Failure'],
        summary: 'Myers Maxim: Testing is the process of executing a program with the intent of finding errors, not showing it works. Causal chain: Error (cognitive human mistake) -> Fault/Defect (static bug in code) -> Failure (observable runtime breakdown).',
        keyPoints: [
          'Glenford Myers Maxim: A successful test case is one that uncovers a hitherto undiscovered defect, not one that passes without finding errors.',
          'Error: A human cognitive misstep made by a developer, analyst, or designer.',
          'Fault (Defect/Bug): The static manifestation of an error in software artifacts (code, documentation, configuration).',
          'Failure: An observable runtime deviation of the system from its specified requirements. A fault only causes a failure if executed under specific trigger conditions.'
        ],
        diagramType: 'testing_pyramid_drivers_stubs',
        examTips: 'Differentiate between Error, Fault, and Failure with a concrete code example (e.g. array out of bounds).',
        fullNotes: `### 1. The Error -> Fault -> Failure Chain

\`\`\`text
┌───────────────────────────┐
│     HUMAN ERROR           │ (Cognitive misstep: Developer types i <= n instead of i < n)
└─────────────┬─────────────┘
              ↓
┌───────────────────────────┐
│     STATIC FAULT (DEFECT) │ (Bug exists quietly in source code on disk)
└─────────────┬─────────────┘
              ↓ (Triggered dynamically during execution)
┌───────────────────────────┐
│     DYNAMIC FAILURE       │ (Program crashes with ArrayIndexOutOfBoundsException)
└───────────────────────────┘
\`\`\`
`
      },
      {
        id: 'top-6-2',
        moduleId: 'mod-6',
        lessonNumber: 25,
        title: 'Verification vs. Validation: Barry Boehm’s Distinction',
        day: 2,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Verification', 'Validation', 'Boehm Distinction', 'Static vs Dynamic'],
        summary: 'Barry Boehm classic formulation: Verification = "Are we building the product right?" (static syntax checks, code reviews, design inspections). Validation = "Are we building the right product?" (dynamic test execution against customer operational needs).',
        keyPoints: [
          'Verification: Checking whether phase artifacts strictly conform to input specifications without executing the code (reviews, walkthroughs, static analysis, formal proofs).',
          'Validation: Evaluating the executable software against real customer operational needs and business goals.',
          'Core Relationship: Verification ensures internal phase consistency; Validation ensures external client satisfaction.'
        ],
        diagramType: 'testing_pyramid_drivers_stubs',
        examTips: 'State Barry Boehm’s exact definitions of Verification and Validation and list 2 distinct verification techniques.',
        fullNotes: `### 2. Verification versus Validation

| Dimension | Verification | Validation |
|---|---|---|
| **Boehm Question** | *"Are we building the product right?"* | *"Are we building the right product?"* |
| **Execution** | Static (no code execution) | Dynamic (executes code with test vectors) |
| **Techniques** | Inspections, reviews, walkthroughs, static analysis | Unit testing, integration testing, acceptance testing |
| **Goal** | Conformance to specifications | Fulfillment of customer operational expectations |`
      },
      {
        id: 'top-6-3',
        moduleId: 'mod-6',
        lessonNumber: 26,
        title: 'Testing in the Small vs. Testing in the Large & Defect Containment',
        day: 2,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Testing in Small', 'Testing in Large', 'Unit vs Integration', 'Levels'],
        summary: 'Testing in the Small refers to testing individual functions and classes in isolation (Unit Testing). Testing in the Large refers to assembling modules and testing system interactions (Integration, System, and Acceptance Testing).',
        keyPoints: [
          'Testing in the Small: Focuses on algorithmic correctness, boundary conditions, and control paths within a single module.',
          'Testing in the Large: Focuses on inter-module interfaces, communication protocols, performance bottlenecks, and compliance with the SRS.',
          'Why Unit Test First: If multiple untested modules are assembled at once, isolating the root cause of failures becomes a combinatorial nightmare.'
        ],
        diagramType: 'testing_pyramid_drivers_stubs',
        examTips: 'Contrast Testing in the Small with Testing in the Large and explain why unit testing must precede integration testing.',
        fullNotes: `### 3. Testing in the Small vs. Testing in the Large

- **Testing in the Small (Unit Testing)**:
  - Scope: A single function, method, or class.
  - Done by: The original developer.
  - Tools: Unit test frameworks (JUnit, pytest, Jest).
- **Testing in the Large (Integration & System Testing)**:
  - Scope: The entire assembled application.
  - Done by: Independent QA / testing teams.
  - Tools: End-to-end automation, load test rigs.`
      },
      {
        id: 'top-6-4',
        moduleId: 'mod-6',
        lessonNumber: 27,
        title: 'Unit Testing Scaffolding: Test Drivers (Calling Dummy) vs. Test Stubs (Called Dummy)',
        day: 2,
        difficulty: 'Hard',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Test Driver', 'Test Stub', 'Unit Test Harness', 'Scaffolding'],
        summary: 'Isolated modules cannot execute standalone. Test Scaffolding provides dummy code: Test Driver simulates calling routines to pass inputs; Test Stub simulates called subordinate routines by returning canned responses.',
        keyPoints: [
          'Test Harness / Scaffolding: Auxiliary code written specifically to enable an isolated module to execute outside its complete application environment.',
          'Test Driver: Sits ABOVE the module under test. Acts as the dummy main program, invoking the module with test vectors and recording results.',
          'Test Stub: Sits BELOW the module under test. Acts as dummy subroutines, intercepting calls and returning predetermined mock responses.'
        ],
        diagramType: 'testing_pyramid_drivers_stubs',
        examTips: 'Draw a complete unit test scaffolding diagram showing the Test Driver, Module Under Test, and Test Stubs.',
        fullNotes: `### 4. Unit Testing Scaffolding: Drivers vs. Stubs

\`\`\`text
┌────────────────────────────────────────┐
│              TEST DRIVER               │ (Simulates calling module; sends test vectors)
└───────────────────┬────────────────────┘
                    ↓ (Invocations & parameters)
┌────────────────────────────────────────┐
│           MODULE UNDER TEST            │ (The isolated unit being tested)
└───────────────────┬────────────────────┘
                    ↓ (Calls to subordinate modules)
┌────────────────────────────────────────┐
│               TEST STUBS               │ (Simulates unwritten or external modules; returns mock data)
└────────────────────────────────────────┘
\`\`\`
`
      },
      {
        id: 'top-6-5',
        moduleId: 'mod-6',
        lessonNumber: 28,
        title: 'Black-Box Test Design: Equivalence Class Partitioning (ECP) & Boundary Value Analysis',
        day: 2,
        difficulty: 'Hard',
        isHighYield: true,
        isNumerical: true,
        hasDiagram: true,
        tags: ['ECP', 'BVA', 'Black-Box Testing', 'Test Case Design'],
        summary: 'Black-box test design based on requirements. Equivalence Class Partitioning (ECP) divides input domain into valid and invalid classes. Boundary Value Analysis (BVA) tests boundary values (min-1, min, min+1, max-1, max, max+1).',
        keyPoints: [
          'Equivalence Class Partitioning (ECP): Partitions input domain into equivalence classes such that one test case is representative of all values in that class.',
          'Boundary Value Analysis (BVA): Experience shows defects cluster at boundaries. Tests values: minimum, maximum, immediately above boundaries, and immediately below boundaries.'
        ],
        diagramType: 'testing_pyramid_drivers_stubs',
        examTips: 'Design test cases using ECP and BVA for an input field accepting integer age between 18 and 60.',
        fullNotes: `### 5. Equivalence Class Partitioning (ECP) & Boundary Value Analysis (BVA)

#### Example: Age Input $[18, 60]$
- **ECP Classes**:
  1. Invalid Low ($< 18$) -> Test with $10$
  2. Valid Range ($[18, 60]$) -> Test with $35$
  3. Invalid High ($> 60$) -> Test with $75$
- **BVA Test Vectors**:
  - Around Min ($18$): $17$ (invalid), $18$ (valid boundary), $19$ (valid interior)
  - Around Max ($60$): $59$ (valid interior), $60$ (valid boundary), $61$ (invalid)`
      }
    ]
  },

  // ── MODULE 7: Mid-Term Exam Mastery & Examiner Solution Bank ────────────────
  {
    id: 'mod-7',
    moduleNumber: 7,
    title: 'Mid-Term Exam Mastery & Examiner Solution Bank',
    description: 'Complete cross-module synthesis for CSMC501 Mid-Term: 25 memory anchors, formula cheat sheets, model examiner answers, and step-by-step diagnostic problem-solving strategies across Modules 1 to 6.',
    day: 3,
    topics: [
      {
        id: 'top-7-1',
        moduleId: 'mod-7',
        lessonNumber: 29,
        title: 'Cross-Module Integration: From User Need to Code and Maintenance',
        day: 3,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Lifecycle Integration', 'Traceability', 'Exam Strategy'],
        summary: 'How all 6 mid-term modules form one unified engineering pipeline. Tracing customer problem -> Feasibility & SDLC -> Requirements & Formal Logic -> Quality Factors -> Architectural Design -> Unit Testing.',
        keyPoints: [
          'Unified Pipeline: Requirements define the WHAT; Quality attributes establish constraints; Design structures the solution into modules; Unit testing verifies isolated components.',
          'Traceability Thread: Requirement ID links to Design Module, which links to Unit Test Cases.'
        ],
        diagramType: 'rtm_traceability',
        examTips: 'Explain the inter-dependence between the SRS, High-Level Design, and Unit Testing phases in a mid-term essay answer.',
        fullNotes: `### 1. Cross-Module Synthesis
The entire CSMC501 mid-term syllabus forms one unbroken continuum:
1. **Module 1**: Why ad-hoc coding fails and why engineering abstraction is needed.
2. **Module 2**: How project phases and feedback loops are structured over time.
3. **Module 3**: How quality economics (40:60 ratio) and portability drive architectural decisions.
4. **Module 4**: How client needs are formally documented without natural language ambiguity.
5. **Module 5**: How the system is decomposed into cohesive, loosely-coupled modules or classes.
6. **Module 6**: How individual units are verified in isolation before integration.`
      },
      {
        id: 'top-7-2',
        moduleId: 'mod-7',
        lessonNumber: 30,
        title: 'The 25 High-Yield Mid-Term Memory Anchors & Formula Cheat Sheet',
        day: 3,
        difficulty: 'Easy',
        isHighYield: true,
        isNumerical: true,
        hasDiagram: true,
        tags: ['Memory Anchors', 'Formula Cheat Sheet', 'High-Yield Mnemonics'],
        summary: '25 indispensable facts, definitions, and equations that examiners test repeatedly across university mid-terms.',
        keyPoints: [
          'Economics: Maintenance accounts for >= 60% of total lifetime cost.',
          'Error Chain: Error (human mistake) -> Fault (static bug) -> Failure (runtime crash).',
          'Boehm Distinction: Verification = "Building right?"; Validation = "Building right product?".',
          'Booch Dictum: Verbs for FOD, Nouns for OOD.',
          'Decision Tables: Exactly 2^k rule columns for k binary conditions.'
        ],
        diagramType: 'cohesion_coupling_ladders',
        examTips: 'Review these 25 anchors 30 minutes before entering the examination hall.',
        fullNotes: `### 2. High-Yield Exam Anchors
1. **Software Crisis**: Triggered by falling hardware costs and soaring software costs.
2. **40:60 Rule**: Maintenance effort >= 60% of lifetime expenditure.
3. **Boehm Cost Escalation**: Requirement defects cost 100x more to fix in maintenance than in requirements.
4. **Cohesion Ranking**: Coincidental < Logical < Temporal < Procedural < Communicational < Sequential < Functional.
5. **Coupling Ranking**: Content > Common > Control > Stamp > Data (Data is best).
6. **Unit Harness**: Test Driver sits ABOVE, Test Stub sits BELOW.`
      }
    ]
  }
];

export const COURSE_MODULES = COURSE_DATA;
