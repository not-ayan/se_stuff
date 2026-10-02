import { CourseModule } from '../types';

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 'mod-1',
    moduleNumber: 1,
    title: 'Introduction to Software Engineering & Structured Programming',
    description: 'Foundational concepts, the software crisis, complexity explosion, and the evolution from exploratory to structured and modern object-oriented software engineering.',
    day: 1,
    topics: [
      {
        id: 'top-1-1',
        moduleId: 'mod-1',
        lessonNumber: 1,
        title: 'Scope, Necessity & The Building Construction Analogy',
        day: 1,
        difficulty: 'Easy',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Foundations', 'Core Concept', 'Exam Favorite'],
        summary: 'Software engineering is an engineering approach applying systematic methodologies to build high-quality software cost-effectively. Small programs can rely on intuition; large software requires rigorous engineering just as skyscrapers require civil and structural engineering.',
        keyPoints: [
          'Building Wall vs Multistoried Building Analogy: You can build a small brick wall with common sense, but a skyscraper collapses without materials science, structural mechanics, architectural design, and planning.',
          'Small programs vs Large commercial software: Commercial systems have multiple functions and require team coordination.',
          'Software engineering is a systematic collection of past experience organized as methodologies and guidelines.'
        ],
        diagramType: 'building_analogy',
        examTips: 'Often asked in 2-3 mark questions: "Why can small programs be developed intuitively while large software products cannot?" Mention the building wall vs multistoried building analogy!',
        fullNotes: `### Scope and Necessity of Software Engineering
Software engineering is an engineering approach for software development. It can alternatively be viewed as a systematic collection of past experience arranged in the form of methodologies and guidelines.

#### The Building Construction Analogy
- **A Small Wall**: A person can build a small wall using common sense with basic materials (bricks, cement). Intuition suffices.
- **A Multistoried Building**: The same intuition completely collapses. A skyscraper requires deep knowledge of strength of materials, architectural design, foundations, planning, and testing.
- **Software Parallel**: Without software engineering principles, developing large programs leads to chaos, architectural collapse, and project failure.`
      },
      {
        id: 'top-1-2',
        moduleId: 'mod-1',
        lessonNumber: 1,
        title: 'Exponential Complexity Growth & Abstraction / Decomposition',
        day: 1,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Complexity', 'Abstraction', 'Decomposition'],
        summary: 'Program complexity and effort grow exponentially with lines of code. Software engineering combats this through two fundamental mechanisms: Abstraction (suppressing irrelevant detail) and Decomposition (partitioning with minimal inter-component interaction).',
        keyPoints: [
          'Complexity rises exponentially with size: A 10,000 LOC program is not just 10 times harder than 1,000 LOC—it may be 100 times more difficult without SE principles.',
          'Abstraction: Considers only aspects relevant for a specific purpose while suppressing others. Once solved, lower-level abstractions are addressed in a hierarchy.',
          'Decomposition: Divides a problem into smaller components that can be solved independently. Good decomposition MINIMIZES interactions (coupling) among components.'
        ],
        diagramType: 'complexity_curve',
        examTips: 'Exam question: "Identify the two important techniques software engineering uses to tackle exponential complexity growth." Answer: Abstraction and Decomposition (explain both with diagrams!).',
        fullNotes: `### Complexity Explosion and Problem Solving
As program size grows, the number of potential interactions between code elements increases exponentially.

#### Abstraction
The principle of abstraction implies simplifying a problem by omitting irrelevant details at a given level. A hierarchy of abstraction (3rd -> 2nd -> 1st -> Full Problem) allows engineers to master complex architectures step by step.

#### Decomposition
In decomposition, a complex problem is divided into several smaller problems that are solved one by one. Random decomposition does not help; an effective decomposition must minimize interactions among components so they can be developed and maintained independently.`
      },
      {
        id: 'top-1-3',
        moduleId: 'mod-1',
        lessonNumber: 1,
        title: 'The Software Crisis & Program vs Software Product',
        day: 1,
        difficulty: 'Easy',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Software Crisis', 'Comparison Table'],
        summary: 'Hardware costs dropped exponentially while software costs escalated. Software crisis symptoms include budget overruns, schedule delays, low reliability, and unmaintainability. Programs differ fundamentally from software products in user base, documentation, and engineering rigor.',
        keyPoints: [
          'Cost Trend: Hardware cost / software cost ratio has plummeted drastically from 1960 to modern times.',
          '5 Symptoms of Software Crisis: Increasing software costs, schedule delays, unreliable/crashing systems, unmaintainability, and failure to meet user requirements.',
          '4 Factors Causing Crisis: Larger problem sizes, lack of SE training, increasing skill shortage, low productivity improvements.',
          'Program vs Product: Programs are small, single-developer, personal use, minimal documentation; Products are large, multi-developer, diverse users, well-documented, engineered systematically.'
        ],
        diagramType: 'hardware_software_cost',
        examTips: 'Memorize the 4 differences between Program vs Software Product and the 5 symptoms of Software Crisis. Guaranteed 5-mark university exam question.',
        fullNotes: `### The Software Crisis
Software crisis refers to the set of problems encountered in developing software due to rapid hardware cost drops and escalating software costs.

#### Program vs Software Product
1. **User**: Program is for the programmer himself; Product is for external users.
2. **Team**: Program is single developer; Product requires large multidisciplinary teams.
3. **UI & Documentation**: Program has minimal UI/documentation; Product demands polished UI and exhaustive SRS, design, test, and user manuals.
4. **Methodology**: Program follows personal intuition; Product adheres strictly to software engineering standards.`
      },
      {
        id: 'top-1-4',
        moduleId: 'mod-1',
        lessonNumber: 2,
        title: 'Structured Programming, Dijkstra & Evolution of Design Techniques',
        day: 1,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Structured Programming', 'Dijkstra', 'History'],
        summary: 'Evolution from 1950s exploratory programming to high-level languages, structured programming (Dijkstra 1968 GOTO harmful; sequence, selection, iteration), data-structure oriented (JSP), data flow oriented (SA/SD), and object-oriented design.',
        keyPoints: [
          'Dijkstra (1968): "GOTO Statements Considered Harmful". Proved that any logic can be written using only: Sequence, Selection, and Iteration.',
          'Structured programs use single-entry, single-exit constructs (if-then-else, while, do-while), eliminating messy jump spaghetti code.',
          'Evolution Stages: 1950s Exploratory -> 1960s High-Level -> Late 1960s Structured -> 1970s Data Structure (JSP) -> Late 1970s Data Flow (SA/SD) -> 1980s Object-Oriented (OOD).',
          'Exploratory vs Modern SE: Exploratory is error correction (detect in testing); Modern is error prevention (phase containment of errors, high visibility).'
        ],
        diagramType: 'evolution_timeline',
        examTips: 'Know Dijkstra (1968), the 3 essential constructs (Sequence, Selection, Iteration), and the differences between exploratory and modern software engineering.',
        fullNotes: `### Evolution of Software Design
- **1950s Exploratory Style**: Assembly language, tiny programs, individual intuition, error correction.
- **1960s High-Level Languages**: FORTRAN, COBOL, ALGOL. Reduced effort, but control flows became chaotic with GOTO.
- **Structured Programming**: Conclusively proved that GOTO is unnecessary. Single-entry single-exit control flows make code readable, verifiable, and maintainable.
- **1970s JSP**: Michael Jackson's Structured Programming derived program control structure directly from data structures.
- **Late 1970s Data Flow**: SA/SD mapping data transformations to program modules.
- **1980s OOD**: Encapsulation of state and operations into classes/objects.`
      }
    ]
  },
  {
    id: 'mod-2',
    moduleNumber: 2,
    title: 'Software Life Cycle Models',
    description: 'Comprehensive analysis of Classical Waterfall, Iterative Waterfall, Prototyping, Evolutionary, and Spiral Models with worked case studies and selection criteria.',
    day: 1,
    topics: [
      {
        id: 'top-2-1',
        moduleId: 'mod-2',
        lessonNumber: 3,
        title: 'Classical Waterfall Model & Relative Effort Across Phases',
        day: 1,
        difficulty: 'Easy',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Waterfall', 'Effort Distribution', 'Phases'],
        summary: 'Idealized sequential 6-phase model (Feasibility, SRS, Design, Coding, Testing, Maintenance). Assumes zero errors. Maintenance consumes 60% of total lifecycle effort; testing consumes the most effort during development (~18%).',
        keyPoints: [
          'Six Sequential Phases: Feasibility Study -> Requirements Analysis & Specification -> Design -> Coding & Unit Testing -> Integration & System Testing -> Maintenance.',
          'Entry and Exit Criteria: A phase starts only after its entry criteria are satisfied and ends with reviewed deliverables.',
          'Effort Breakdown: Maintenance = ~60% of total lifecycle (40:60 dev:maintenance). Testing = ~18% (highest of all development phases!).',
          'Worked Example: Payroll Processing for Govt College (stable rules, experienced team -> Classical Waterfall is appropriate).',
          'Shortcomings: Idealistic (assumes engineers never make mistakes); No feedback paths; Customer sees no working software until delivery.'
        ],
        diagramType: 'waterfall_effort',
        examTips: 'Exam trap: "Which development phase consumes the maximum effort?" Answer: Testing (18%). "Which lifecycle phase consumes the maximum effort?" Answer: Maintenance (40-60%).',
        fullNotes: `### Classical Waterfall Model
The classical waterfall model divides the software life cycle into 6 sequential phases where each phase begins only after the previous phase finishes.

#### Life Cycle Phases
1. **Feasibility Study**: Determine financial and technical feasibility. (GMC case study: 50 mine sites across 8 states, Rs 1M budget; local DB dial-up was chosen over expensive satellite).
2. **Requirements Analysis & Specification**: SRS document creation.
3. **Design**: High-level structure chart and detailed module specifications.
4. **Coding & Unit Testing**: Translate design into source code and test modules in isolation.
5. **Integration & System Testing**: Incrementally combine modules; Alpha, Beta, and Acceptance testing.
6. **Maintenance**: Corrective, Adaptive, and Perfective maintenance.`
      },
      {
        id: 'top-2-2',
        moduleId: 'mod-2',
        lessonNumber: 3,
        title: 'Iterative Waterfall Model & Phase Containment of Errors',
        day: 1,
        difficulty: 'Easy',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Feedback Loops', 'Phase Containment', 'Industry Standard'],
        summary: 'Makes waterfall practical by incorporating feedback loops between phases. Enforces Phase Containment of Errors: catching defects in the phase where they are introduced is orders of magnitude cheaper than catching them late.',
        keyPoints: [
          'Feedback Loops: When a defect is discovered in coding or testing, control flows back to the phase where the error occurred.',
          'Phase Containment of Errors: An error caught in the design phase costs negligible effort; the same error caught in system testing requires reworking design, code, and test cases.',
          'Worked Example: Retail Banking Daily Fund Transfer Limit (Ambiguity whether limit resets at midnight or 24 hours after transfer was detected during system testing and resolved through feedback to SRS).',
          'Most widely used lifecycle model in traditional commercial software projects.'
        ],
        diagramType: 'iterative_waterfall',
        examTips: 'Explain the concept of "Phase Containment of Errors" with the Retail Banking example for full marks.',
        fullNotes: `### Iterative Waterfall Model
The iterative waterfall model introduces feedback paths to the classical model, allowing developers to rectify errors in earlier phases.

#### Phase Containment of Errors
The fundamental premise is that error removal cost increases exponentially with the delay in detection. Catching a requirement error during requirements review costs 1x; catching it during integration testing costs 50x-100x because it invalidates all intermediate artifacts.`
      },
      {
        id: 'top-2-3',
        moduleId: 'mod-2',
        lessonNumber: 4,
        title: 'Prototyping Model & Refinement Cycle',
        day: 1,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Prototype', 'Throwaway', 'UI Design'],
        summary: 'Builds a rough toy implementation with shortcuts (dummy functions, table lookups) to elicit unclear user requirements and resolve technical uncertainties. Once approved, the prototype is discarded and the real system is built.',
        keyPoints: [
          'What is a Prototype?: A toy implementation with limited functionality, low reliability, and inefficient performance.',
          'Refinement Cycle: Quick Design -> Build Prototype -> Customer Evaluation -> Refine Requirements (repeat until approved).',
          'When to use?: When user requirements are not well understood (especially GUI) or when technical solutions are unclear (algorithm performance, hardware response time).',
          'Worked Example: Hospital OPD Token Display (Token G-021, staff discovered font too small, alert buzzer too quiet, no color cue for skipped tokens).',
          'Demerits: Throwaway development cost; risk that customer mistakes prototype for final product or insists on keeping crude prototype code.'
        ],
        diagramType: 'prototype_cycle',
        examTips: 'True or False: "A prototype is meant for full deployment." False! It is a throwaway toy model.',
        fullNotes: `### Prototyping Life Cycle Model
Prototyping involves building a quick, incomplete version of the software before committing to full development.

#### Why Build a Prototype?
1. Elicit and validate user requirements through hands-on interaction.
2. Investigate technical feasibility (e.g., test whether a sorting routine meets latency requirements).
3. "Plan to throw one away; you will, anyhow" (Fred Brooks).`
      },
      {
        id: 'top-2-4',
        moduleId: 'mod-2',
        lessonNumber: 4,
        title: 'Evolutionary Model (Successive Versions)',
        day: 1,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Incremental', 'Releases', 'Large Systems'],
        summary: 'System is delivered in successive, working releases. Each release is a real functioning product (not a throwaway demo). Starts with core functionality and expands. Ideal for large systems and object-oriented development.',
        keyPoints: [
          'Successive Versions / Incremental: Release 1 (Core) -> Release 2 (Grow) -> Release 3 (Mature).',
          'Every release does useful work: Users use Release 1 while Release 2 is being built.',
          'Worked Example: Campus ERP System (R1: Admissions & Enrollment; R2: Fees & Library; R3: Hostel Allocation & Placement Tracking).',
          'Advantages: Early user feedback from real use; reduces trauma of adjusting to an entirely new system; core modules get repeatedly tested; reduces risk of total project failure.',
          'Disadvantages: Hard to partition some problems into clean increments; difficult to fix upfront total contract cost and schedule.'
        ],
        diagramType: 'evolutionary_releases',
        examTips: 'Contrast Prototyping vs Evolutionary: Prototyping is a throwaway toy demo to understand requirements; Evolutionary delivers working, deployed increments that users actually run.',
        fullNotes: `### Evolutionary Life Cycle Model
In the evolutionary model, software is developed and delivered in increments of increasing functional capability.

#### University Smart Campus Platform Case
The university cannot wait 2 years for an all-or-nothing delivery. Delivering login and ID card first (V1), adding attendance and complaints (V2), and then lab booking (V3) ensures early return on investment and smooth training.`
      },
      {
        id: 'top-2-5',
        moduleId: 'mod-2',
        lessonNumber: 4,
        title: "Spiral Model (Boehm's Risk-Driven Meta-Model)",
        day: 1,
        difficulty: 'Hard',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Spiral', 'Boehm 1988', 'Risk Management', '4 Quadrants'],
        summary: 'Proposed by Barry Boehm in 1988. A risk-driven meta-model where every loop repeats 4 quadrants: Objective Setting, Risk Assessment & Reduction, Development & Validation, and Review & Planning. Subsumes all other models.',
        keyPoints: [
          'Barry Boehm (1988): Each loop represents a phase. No fixed number of loops.',
          'Four Quadrants in Every Loop: 1. Objective Setting (identify goals and constraints); 2. Risk Assessment & Reduction (analyze risks, build prototypes, benchmarks); 3. Development & Validation (develop next level product); 4. Review & Planning (customer review and plan next loop).',
          'Why a Meta-Model?: Subsumes waterfall (single loop step-wise), prototyping (risk reduction mechanism), and evolutionary (outward growing releases).',
          'Worked Example: University Online Exam System for 5,000 students (Loop 1 Feasibility load test -> Loop 2 Requirements prototype -> Loop 3 Scalable Cloud Architecture -> Loop 4 Construction & Security).',
          'Worked Example: Autonomous Drone Delivery (Loop 1 unproven obstacle avoidance algorithm test flight -> Loop 2 regulatory compliance -> Loop 3 full system).',
          'Summary: Waterfall is phase-driven; Evolutionary is release-driven; Spiral is risk-driven.'
        ],
        diagramType: 'spiral_quadrants',
        examTips: 'Must know: Draw the 4 quadrants of Spiral model and explain why it is called a "meta-model". Very common 10-mark exam question.',
        fullNotes: `### Barry Boehm's Spiral Model
The spiral model organizes software development into spiral loops, with each loop driven by risk resolution.

#### The 4 Quadrants
1. **Quadrant 1 (Top-Left): Objective Setting**: Determine phase objectives, alternative approaches, and constraints.
2. **Quadrant 2 (Top-Right): Risk Assessment and Reduction**: Detailed analysis of risks. If requirements are uncertain -> build prototype; if performance is uncertain -> run benchmark simulation.
3. **Quadrant 3 (Bottom-Right): Development and Validation**: Implement the phase deliverable (spec, design, code, or test).
4. **Quadrant 4 (Bottom-Left): Customer Review and Planning**: Review achievements with customer and plan the next loop.`
      }
    ]
  },
  {
    id: 'mod-3',
    moduleNumber: 3,
    title: 'Requirements Analysis & Formal Specification',
    description: 'System analyst role, SRS IEEE 830 standard, decision logic (trees/tables), formal methods (syn, sem, sat), axiomatic specs, algebraic specs, and Z notation.',
    day: 1,
    topics: [
      {
        id: 'top-3-1',
        moduleId: 'mod-3',
        lessonNumber: 5,
        title: 'Requirements Gathering, Analysis & Properties of Good SRS',
        day: 1,
        difficulty: 'Easy',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['SRS', 'IEEE 830', 'Analyst'],
        summary: 'Requirements gathering resolves inconsistencies and incompleteness. The SRS document acts as a user statement, contract, design reference, and validation baseline. It must follow a black-box view (WHAT, not HOW).',
        keyPoints: [
          '4 Questions Every Analyst Must Answer: What is the problem? Why solve it? What are possible solutions? What complexities might arise?',
          'Inconsistency (contradictory requirements) vs Incompleteness (omitted operational cases).',
          'Black-Box Principle: Specifies external behavior (inputs and outputs); NEVER specifies internal implementation (data structures, algorithms, DB schemas).',
          'Properties of Good SRS: Concise, unambiguous, consistent, complete, traceable, verifiable, modifiable.',
          'IEEE 830 Structure: 1. Introduction, 2. Overall Description, 3. Specific Requirements (Functional, Non-functional, Constraints), 4. Appendices.'
        ],
        diagramType: 'srs_blackbox',
        examTips: 'Question: "Why is an SRS called a black-box specification?" Answer: Because it specifies externally visible input-output behavior while deliberately leaving internal workings unspecified.',
        fullNotes: `### Requirements Analysis & Specification
The analyst collects user needs and removes anomalies.

#### IEEE 830 Standard Components
- **Functional Requirements**: Input-to-output transformations ($f_i : \text{Input} \to \text{Output}$).
- **Non-Functional Requirements**: System characteristics (reliability, performance, security, usability, maintainability).
- **Constraints**: Hardware limitations, OS/DBMS standards, compliance mandates.`
      },
      {
        id: 'top-3-2',
        moduleId: 'mod-3',
        lessonNumber: 5,
        title: 'Decision Logic: Decision Trees & Decision Tables',
        day: 1,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Decision Tree', 'Decision Table', 'Logic Modeling'],
        summary: 'Techniques for modeling complex conditional logic. In decision trees, edges represent condition evaluations and leaves represent actions. In decision tables, rows list conditions and actions, and each column represents a complete business rule.',
        keyPoints: [
          'Decision Tree: Edges = tested conditions; Leaf nodes = actions performed. Easy to visualize for small decision sets.',
          'Decision Table: Upper rows = conditions; Lower rows = actions. Each column = one decision rule.',
          'Advantage of Decision Table: Systematically reveals missing, duplicate, or contradictory logic rules.',
          'Worked Examples: Library Membership System (New, Renewal, Cancel); ATM Cash Withdrawal (Valid Card/PIN, Sufficient Balance & Limit).'
        ],
        diagramType: 'decision_logic',
        examTips: 'Practice drawing both the decision tree and the decision table for the ATM Cash Withdrawal or Library Membership problem!',
        fullNotes: `### Decision Trees and Decision Tables
Graphical and tabular formalisms for representing complex conditional rules.

#### Structure of a Decision Table
- **Condition Stub**: Names all condition variables.
- **Condition Entries**: Values (Y, N, or - for don\'t care).
- **Action Stub**: Lists all possible system responses.
- **Action Entries**: X indicates action triggered for that rule column.`
      },
      {
        id: 'top-3-3',
        moduleId: 'mod-3',
        lessonNumber: 6,
        title: 'Formal Specification: Syntactic/Semantic Domains & Operational Semantics',
        day: 1,
        difficulty: 'Hard',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Formal Methods', 'Semantics', 'Predicate Logic'],
        summary: 'Replaces ambiguous natural prose with mathematical precision. Defined by syntactic domain (syn), semantic domain (sem), and satisfaction relation (sat). Covers model-oriented vs property-oriented and 4 operational semantics.',
        keyPoints: [
          'Formal Specification Language: Defined by triplet (syn, sem, sat). syn = syntactic domain (alphabet, grammar); sem = semantic domain (abstract model); sat = satisfaction relation.',
          'Model-Oriented (Z, CSP, CCS, VDM): Direct mathematical model using sets, tuples, functions. Property-Oriented (Axiomatic, Algebraic): Indirect definition via axioms/equations.',
          'Operational Semantics: 1. Linear (sequence of states, interleaving concurrency); 2. Branching (directed graph, e.g., ATM states); 3. Maximally Parallel (all enabled actions run together); 4. Partial Order (poset of events, true concurrency, e.g., beverage selling machine).',
          'Merits: Mathematical soundness, removes ambiguity, enables automated consistency checking (tableaux, theorem provers). Limitations: Hard to learn, first-order logic incompleteness, state explosion.'
        ],
        diagramType: 'formal_semantics',
        examTips: 'Understand the Beverage Selling Machine partial order diagram: coin inserted -> accepted precedes dispensing; milk preparation and tea brewing occur concurrently.',
        fullNotes: `### Formal Requirements Specification
Mathematical technique ensuring specifications have unambiguous semantics.

#### First-Order Predicate Logic Translation
- $\\forall x \\in S$: "For all $x$ in $S$" (Universal quantifier).
- $\\exists x \\in S$: "There exists at least one $x$ in $S$" (Existential quantifier).
- Canonical Shape: $\\forall x \\in \\text{Domain} \\bullet \\text{Condition}(x) \\implies \\text{Conclusion}(x)$.
- Example: "A member may issue a book if member has no overdue books and book is available":
  $$\\forall m \\in \\text{Members}, b \\in \\text{Books} \\bullet (\\neg \\text{HasOverdue}(m) \\land \\text{Available}(b)) \\implies \\text{MayIssue}(m, b)$$`
      },
      {
        id: 'top-3-4',
        moduleId: 'mod-3',
        lessonNumber: 6,
        title: 'Axiomatic Specification: Preconditions & Postconditions',
        day: 1,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: false,
        tags: ['Axiomatic', 'Preconditions', 'Postconditions'],
        summary: 'Specifies operations as axioms using first-order logic. Preconditions capture input constraints before invocation; postconditions capture output assertions and state transformations after execution.',
        keyPoints: [
          'Precondition (pre): Conditions that must hold before invocation (input validity).',
          'Postcondition (post): Guarantees on results produced if precondition was met.',
          'Primed Variable Convention: $X\'$ denotes value of parameter $X$ after function execution.',
          'Worked Example: $f(x : \\text{real}) : \\text{real}$ where $f(x) = x/2$ if $x \\le 100$ else $2x$.',
          'Worked Example: Array search returning index where key is located.'
        ],
        diagramType: 'none',
        examTips: 'Write down the search specification: pre: exists i in [Xfirst..Xlast], X[i] = key; post: X\'[search(X,key)] = key and X = X\'.',
        fullNotes: `### Axiomatic Specification
A property-oriented formal technique.

#### Steps to Develop Axiomatic Specs
1. Establish input parameter domain and constraints -> write as $pre$ predicate.
2. Specify output conditions when function succeeds -> write as $post$ predicate.
3. Note any mutations to input parameters using primed notation ($X \to X'$).`
      },
      {
        id: 'top-3-5',
        moduleId: 'mod-3',
        lessonNumber: 7,
        title: 'Algebraic Specification, Guttag Rules & Z Notation',
        day: 1,
        difficulty: 'Hard',
        isHighYield: true,
        isNumerical: true,
        hasDiagram: true,
        tags: ['Algebraic', 'Guttag', 'Axiom Formula', 'Z Schema'],
        summary: 'Guttag (1980) ADT specification via heterogeneous algebras. 4 sections (Types, Exceptions, Syntax, Equations). Minimum axioms formula: m1 * (m2 + n1) + n2. Z notation schema structure with Delta, Xi, inputs (?), outputs (!), and primed state.',
        keyPoints: [
          'Heterogeneous Algebra: Different sets (sorts) connected by operations.',
          '4 Sections: Types, Exceptions, Syntax, Equations (rewrite rules).',
          '4 Operator Types: Basic Constructors (m1), Extra Constructors (m2), Basic Inspectors (n1), Extra Inspectors (n2).',
          'Axiom Formula: Minimum axioms = m1 * (m2 + n1) + n2. (For FIFO Queue: 2*(1+2)+0 = 6 equations).',
          '3 Properties: Completeness, Finite Termination, Unique Termination (Church-Rosser).',
          'Z Notation Schema: Declarations on top, predicates on bottom. Delta modifies state; Xi queries state.',
          '4GLs: Executable specification languages (e.g., SQL). Reusable, but can be 10x slower with 50% more memory.'
        ],
        diagramType: 'z_schema',
        formula: 'Axioms = m1 * (m2 + n1) + n2',
        examTips: 'Solve the FIFO queue and Point data type algebraic equations. Know the axiom counting formula for numerical questions!',
        fullNotes: `### Algebraic Specification
Specifies types in terms of algebraic rewrite equations.

#### FIFO Queue Specification
- **m1 (Basic Constructors)**: create, append
- **m2 (Extra Constructors)**: remove
- **n1 (Basic Inspectors)**: first, isempty
- **Equations (6 total)**:
  1. isempty(create()) = true
  2. isempty(append(q, e)) = false
  3. first(create()) = novalue
  4. first(append(q, e)) = if isempty(q) then e else first(q)
  5. remove(create()) = underflow
  6. remove(append(q, e)) = if isempty(q) then create() else append(remove(q), e)`
      }
    ]
  },
  {
    id: 'mod-4-5',
    moduleNumber: 4,
    title: 'Software Design & Function-Oriented Design (SA/SD & DFDs)',
    description: 'Modularity, 7 levels of Cohesion, 5 levels of Coupling, structure charts, DFD rules, balancing, transform vs transaction analysis, and Fire-Alarm case study.',
    day: 2,
    topics: [
      {
        id: 'top-4-1',
        moduleId: 'mod-4-5',
        lessonNumber: 8,
        title: 'Design Concepts, Modularity & Understandability',
        day: 2,
        difficulty: 'Easy',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Design Goals', 'Modularity', 'Understandability'],
        summary: 'Design bridges SRS and code. Preliminary design produces software architecture (structure chart); detailed design produces module specifications (MSPECs). Understandability is the supreme quality factor because maintenance accounts for 60% of lifecycle cost.',
        keyPoints: [
          'High-Level Design: Identifies modules, control invocation hierarchy, and data interfaces (Structure Chart).',
          'Detailed Design: Designs data structures and algorithms for each module (MSPECs).',
          'Why Understandability Matters Most: ~60% of total lifecycle effort is spent on maintenance. An incomprehensible design multiplies maintenance costs.',
          'Modularity: Divide-and-conquer. System decomposed into near-independent modules arranged in a clean tree hierarchy.'
        ],
        diagramType: 'design_flow',
        examTips: 'Define High-level design vs Detailed design and state why understandability is more important than pure computational efficiency.',
        fullNotes: `### Software Design Overview
Design translates the "WHAT" of SRS into the "HOW" of programming.

#### Desirable Characteristics of Good Design
1. Correctness (implements SRS)
2. Understandability (readable, maintainable)
3. Modularity (cohesive modules, clean tree structure)
4. Efficiency (sensible memory and execution time)
5. Maintainability (easy to modify without breaking other parts)`
      },
      {
        id: 'top-4-2',
        moduleId: 'mod-4-5',
        lessonNumber: 9,
        title: 'Cohesion (7 Levels) & Coupling (5 Levels)',
        day: 2,
        difficulty: 'Hard',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Cohesion', 'Coupling', 'Core SE Metric'],
        summary: 'Cohesion measures internal functional strength (Coincidental to Functional). Coupling measures inter-module dependence (Data to Content). Target: High Cohesion and Low Coupling = Functional Independence.',
        keyPoints: [
          'Cohesion Levels (Worst to Best): Coincidental -> Logical -> Temporal -> Procedural -> Communicational -> Sequential -> Functional.',
          'Coupling Levels (Best to Worst): Data -> Stamp -> Control -> Common -> Content.',
          'Functional Independence: High cohesion + Low coupling. Benefits: Error isolation, reuse, and understandability.',
          'Sentence Test for Cohesion: Single sentence with one action verb = Functional cohesion; "and", "first/then", "initialize" signal lower cohesion.',
          'Control Coupling: Passing a flag (e.g., isRushOrder) that directs the internal branch execution of another module.'
        ],
        diagramType: 'cohesion_coupling_ladders',
        examTips: 'Rank cohesion and coupling from best to worst. Be prepared to identify cohesion/coupling types from code snippets!',
        fullNotes: `### Cohesion & Coupling
The twin yardsticks of software modularity.

#### Cohesion Levels (Low to High)
1. **Coincidental**: Random functions grouped together (e.g., logError + readFile + openSocket).
2. **Logical**: Similar operations selected by flag (e.g., generic I/O routine).
3. **Temporal**: Executed in same time frame (e.g., startup/shutdown).
4. **Procedural**: Steps in an algorithm sequence (e.g., decodeMessage).
5. **Communicational**: Operate on same shared data structure (e.g., stack operations).
6. **Sequential**: Output of one step is input to next (pipeline: sort -> search -> display).
7. **Functional**: All elements achieve one single well-defined task (computePayroll).

#### Coupling Levels (Low to High)
1. **Data**: Elementary parameters passed (int, float). Loosest and safest!
2. **Stamp**: Entire composite structure passed when only a field is needed.
3. **Control**: Flag passed to direct internal control flow.
4. **Common**: Shared global data variables.
5. **Content**: Directly jumping into another module\'s internals. Severe defect!`
      },
      {
        id: 'top-4-3',
        moduleId: 'mod-4-5',
        lessonNumber: 9,
        title: 'Module Hierarchy Metrics & Function- vs Object-Oriented Design',
        day: 2,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Structure Chart', 'Fan-in', 'Fan-out', 'FOD vs OOD'],
        summary: 'Hierarchy metrics: Depth, Width, Fan-out (<= 7 +/- 2), Fan-in (high is good -> reuse). Layering principle prevents upward calls. FOD centralizes state; OOD distributes state into autonomous objects. Fire-alarm case study.',
        keyPoints: [
          'Depth: Levels of control in hierarchy. Width: Span across widest level.',
          'Fan-out: Number of modules directly called. High fan-out indicates lack of cohesion.',
          'Fan-in: Number of modules calling a module. High fan-in is desirable (signals reuse).',
          'Layering Principle: A module may call only modules in the layer immediately below it. Never call upwards.',
          'Grady Booch: "Identify verbs if you are after procedural design, and nouns if you are after object-oriented design."',
          'Fire Alarm Case Study: 80 floors, 1,000 rooms. FOD uses 5 global arrays; OOD uses Detector and Alarm classes managing localized state.'
        ],
        diagramType: 'structure_chart_hierarchy',
        examTips: 'Explain why high fan-in is good and high fan-out is a warning sign. Contrast centralized state (FOD) vs decentralized state (OOD).',
        fullNotes: `### Hierarchy and Design Paradigms
- **High Fan-in**: Multiple callers reuse the same utility module (good architecture).
- **High Fan-out**: A module has too many subordinates, indicating it is doing too much coordinating work (bad cohesion).
- **State Location**: In FOD, state is centralized in global data tables; in OOD, state is distributed among objects and accessed only via messages.`
      },
      {
        id: 'top-4-4',
        moduleId: 'mod-4-5',
        lessonNumber: 10,
        title: 'Data Flow Diagrams (DFDs) & Data Dictionary Grammar',
        day: 2,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['DFD', 'Data Dictionary', 'Rules', 'Balancing'],
        summary: 'DFD models data transformations. Uses 4 symbols: External Entity, Process, Data Flow, Data Store. Data dictionary operators (+, [], (), {}, =). Rules: Context diagram = 1 bubble, 3-7 rule, no control flow, DFD balancing.',
        keyPoints: [
          'DFD Symbols: Rectangle = External Entity; Circle = Process (verb); Arrow = Data Flow (data in motion, NO control); Parallel lines = Data Store.',
          'Synchronous vs Asynchronous Flow: Direct process-to-process arrow is synchronous; flow through data store is asynchronous.',
          'Data Dictionary Operators: + (composition), [,] (selection), () (optional), {} (iteration), = (equivalence), /**/ (comment).',
          'Balancing a DFD: Inputs and outputs of bubble X at Level N must exactly match inputs and outputs of the decomposed diagram at Level N+1.',
          'Common Mistakes: Multiple bubbles in Context diagram; External entities in Level 1/2; Showing control flow / loops; Unbalanced levels.'
        ],
        diagramType: 'dfd_notations',
        examTips: 'Common exam question: "What is meant by balancing a DFD? Give an example." Also know the 5 commonly made mistakes when drawing DFDs.',
        fullNotes: `### Data Flow Diagrams (DFDs)
Hierarchical graphical representation of data processing.

#### DFD Rules
1. **Context Diagram (Level 0)**: Exactly ONE bubble representing the entire system.
2. **Decomposition (Factoring)**: Each bubble explodes into 3 to 7 sub-bubbles.
3. **No Control Information**: Arrows represent data in motion, never order of execution or conditionals.
4. **Data Store Connections**: Data stores connect only to processes, never to other stores or external entities.`
      },
      {
        id: 'top-4-5',
        moduleId: 'mod-4-5',
        lessonNumber: 12,
        title: 'Transform Analysis & Transaction Analysis',
        day: 2,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Transform Analysis', 'Transaction Analysis', 'Structure Chart'],
        summary: 'Strategies to convert DFDs into Structure Charts. Transform analysis divides DFD into Afferent branch (input), Central Transform, and Efferent branch (output). Transaction analysis identifies transaction centers for divergent paths.',
        keyPoints: [
          'Structure Chart vs Flowchart: Structure chart shows module architecture and parameter interfaces without procedural sequence; flowchart shows procedural statement execution without modules.',
          'Transform Analysis: 1. Divide DFD into Afferent (input conversion), Central Transform (core processing), Efferent (output formatting); 2. Create root module; 3. Factor sub-functions.',
          'Transaction Analysis: Used when input data can take multiple alternative transaction paths. Structure chart features a Transaction Center module dispatching to transaction handlers.',
          'Worked Examples: RMS Calculator (Transform Analysis) and Supermarket Prize Scheme (Transaction Analysis).'
        ],
        diagramType: 'transform_transaction',
        examTips: 'Differentiate between a Structure Chart and a Flowchart (3 differences: modules, data interchange, sequential order).',
        fullNotes: `### Structured Design: Transforming DFD to Structure Chart
- **Transform Analysis**: Identifies afferent branch (physical to logical input), central transform (computations), and efferent branch (logical to physical output).
- **Transaction Analysis**: Maps divergent input transactions to a central dispatcher and specialized action modules.`
      }
    ]
  },
  {
    id: 'mod-6-7',
    moduleNumber: 6,
    title: 'Object Modeling Using UML',
    description: 'UML 5 architectural views, Use Case modeling and factoring (include/extend), Class diagrams, Association vs Aggregation vs Composition, Interaction diagrams, and State Charts.',
    day: 2,
    topics: [
      {
        id: 'top-6-1',
        moduleId: 'mod-6-7',
        lessonNumber: 14,
        title: 'UML Overview & The Five Architectural Views',
        day: 2,
        difficulty: 'Easy',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['UML Views', 'OMG', 'Architecture'],
        summary: 'UML standardized OMT (Rumbaugh), Booch, and OOSE (Jacobson) in 1997. Captures 5 views through 9 diagrams: User\'s View (Use Case), Structural View (Class, Object), Behavioral View (Sequence, Collaboration, State, Activity), Implementation View (Component), Environmental View (Deployment).',
        keyPoints: [
          'Origin: OMG standardized UML in 1997 uniting Rumbaugh (OMT), Booch, and Jacobson (OOSE).',
          'UML is a visual modeling language, not a methodology.',
          'User\'s View (Central): Functional black-box view (Use Case diagram). All other views must conform to it.',
          'Structural View (Static): Classes and relationships (Class, Object diagrams).',
          'Behavioral View (Dynamic): Time-dependent interaction and state changes (Sequence, Collaboration, State Chart, Activity diagrams).',
          'Implementation & Environmental: Physical components (Component diagram) and hardware nodes (Deployment diagram).'
        ],
        diagramType: 'uml_five_views',
        examTips: 'List the 5 views of UML and name the diagrams that represent each view. Classic 5-mark question.',
        fullNotes: `### Unified Modeling Language (UML)
Standardized by OMG in 1997 to eliminate notation confusion.

#### Five Views
1. **User\'s View**: Use Case Diagram
2. **Structural View**: Class Diagram, Object Diagram
3. **Behavioral View**: Sequence Diagram, Collaboration Diagram, State Chart Diagram, Activity Diagram
4. **Implementation View**: Component Diagram
5. **Environmental View**: Deployment Diagram`
      },
      {
        id: 'top-6-2',
        moduleId: 'mod-6-7',
        lessonNumber: 15,
        title: 'Use Case Modeling & Factoring (Generalization, Include, Extend)',
        day: 2,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Use Cases', 'Include', 'Extend', 'Actors'],
        summary: 'Use cases partition system behavior into user-centric transactions. Actors represent roles (human or <<external system>>). Factoring mechanisms: Generalization (inheritance), <<include>> (compulsory reuse), <<extend>> (conditional alternative paths at extension points).',
        keyPoints: [
          'Actor: Role played by an external entity interacting with the system. Stick figure notation.',
          'Use Case: Ellipse named with verb phrase from user perspective (e.g., "Play move", NOT "get-user-move").',
          'Generalization: Child use case specializes parent behavior (e.g., Pay fee -> Pay via Card / Pay via Cash).',
          '<<include>>: Base use case compulsorily invokes common behavior (e.g., Issue Book and Renew Book both <<include>> Check Reservation).',
          '<<extend>>: Optional or exceptional behavior added only at an extension point under specific guard conditions (e.g., Cash Withdrawal <<extend>> Insufficient Funds Handler).'
        ],
        diagramType: 'use_case_factoring',
        examTips: 'Exam favorite: Differentiate between <<include>> (compulsory, unconditional reuse) and <<extend>> (optional, conditional execution at extension points).',
        fullNotes: `### Use Case Modeling
- **Mainline Sequence**: The standard happy path.
- **Alternative Paths**: Variations or exception handling.
- **<<include>>**: Factors out identical behavior across multiple use cases to eliminate duplication.
- **<<extend>>**: Inserts optional behavior into a base use case without modifying the base use case text.`
      },
      {
        id: 'top-6-3',
        moduleId: 'mod-6-7',
        lessonNumber: 16,
        title: 'Class Diagrams: Association vs Aggregation vs Composition',
        day: 2,
        difficulty: 'Hard',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Class Diagram', 'Association', 'Aggregation', 'Composition'],
        summary: 'Class syntax (Name, Attributes, Operations). Association (general m:n link), Aggregation (weak whole-part, hollow diamond), Composition (strict existence-dependent whole-part, filled diamond). Inheritance vs Aggregation tradeoffs.',
        keyPoints: [
          'Class Box: Name (top), Attributes (middle: name:Type), Operations (bottom: name(params):Type).',
          'Association: General relationship between classes; represented as solid line with multiplicity (e.g., 1..*).',
          'Aggregation: "Has-a" whole-part relationship with hollow diamond at whole. Parts can exist independently (e.g., Room and Wall).',
          'Composition: Strict whole-part with filled diamond at whole. Part lifetime is strictly tied to whole (e.g., Order and OrderItem; when Order is deleted, OrderItems are destroyed).',
          'Inheritance vs Aggregation: Inheritance is static, compile-time "is-a" (breaks encapsulation); Aggregation is dynamic, runtime "has-a" (preserves encapsulation and handles changing roles like BusinessPartner as Customer/Supplier).'
        ],
        diagramType: 'class_relationships',
        examTips: 'Complete comparison table: Association vs Aggregation vs Composition. Highlight lifetime dependency and diamond symbols.',
        fullNotes: `### Class Diagrams and Relationships
- **Association**: General structural connection ($m:n$).
- **Aggregation**: Weak whole-part. Reflexive: No. Symmetric: No. Transitive: Yes.
- **Composition**: Exclusive aggregation. The whole is responsible for creation and destruction of its parts.
- **Inheritance vs Aggregation**: Favor composition/aggregation over inheritance to preserve encapsulation.`
      },
      {
        id: 'top-6-4',
        moduleId: 'mod-6-7',
        lessonNumber: 16,
        title: 'Interaction Diagrams: Sequence vs Collaboration',
        day: 2,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Sequence Diagram', 'Collaboration Diagram', 'Dynamic Modeling'],
        summary: 'Model how objects collaborate to realize a use case. Sequence diagram is a 2D chart read top-to-bottom (lifelines, activations, conditions, iterations). Collaboration diagram emphasizes spatial structural links with numbered messages.',
        keyPoints: [
          'Equivalence: Sequence and Collaboration diagrams are semantically equivalent and can be converted into each other.',
          'Sequence Diagram: X-axis = objects; Y-axis = time proceeding downwards. Lifeline = vertical dashed line; Activation = rectangle on lifeline.',
          'Control Information: Condition [guard] (message sent only if true); Iteration *[for each] (repeated message dispatch).',
          'Collaboration Diagram: Shows objects and links with sequence-numbered messages (1:, 1.1:, 2:) to denote chronological ordering.'
        ],
        diagramType: 'sequence_collaboration',
        examTips: 'Draw the sequence diagram for Library Book Renewal or Supermarket Prize Selection. Show lifelines and activation boxes clearly.',
        fullNotes: `### Interaction Modeling
- **Sequence Diagram**: Best for visualizing the chronological sequence of message calls.
- **Collaboration Diagram**: Best for understanding which classes are associated and how data flows spatially between collaborators.`
      },
      {
        id: 'top-6-5',
        moduleId: 'mod-6-7',
        lessonNumber: 17,
        title: 'Activity Diagrams (Swimlanes) & State Chart Diagrams (David Harel)',
        day: 2,
        difficulty: 'Hard',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Activity Diagram', 'Swimlanes', 'State Chart', 'FSM'],
        summary: 'Activity diagrams model business workflows with swimlanes and parallel fork/join synchronization. State charts (David Harel) model object lifetime state transitions using event[guard]/action syntax, solving FSM state explosion.',
        keyPoints: [
          'Activity Diagram: Focuses on workflow activities. Supports concurrency and synchronization via fork and join horizontal bars.',
          'Swimlanes: Group activities by departmental/component responsibility (e.g., Accounts vs Hostel vs Academic).',
          'Activity vs Flowchart: Flowcharts are strictly sequential; activity diagrams support parallel concurrent execution.',
          'State Chart Diagram: Models state changes of a SINGLE object across its lifetime. Based on Finite State Machines (FSM).',
          'David Harel State Charts: Overcomes FSM state explosion via hierarchical nested (composite) states and concurrent orthogonal states.',
          'Transition Syntax: event [guard] / action. Actions belong to transitions (instantaneous); activities belong to states (long-running).'
        ],
        diagramType: 'activity_statechart',
        examTips: 'Compare Activity Diagram vs State Chart Diagram: Activity diagrams model workflow across multiple objects; State charts model the lifetime states of a single object.',
        fullNotes: `### Dynamic Workflow & State Modeling
- **Activity Diagram**: Used in early requirements engineering for business process modeling.
- **State Chart Diagram**: State represented by rounded rectangle; Initial state = filled circle; Final state = filled circle inside ring; Transition = arrow with event[guard]/action.`
      }
    ]
  },
  {
    id: 'mod-8',
    moduleNumber: 8,
    title: 'Object-Oriented Software Development & Design Patterns',
    description: 'Domain modeling (Boundary, Controller, Entity), Booch grammatical analysis, CRC cards, and key design patterns (Expert, Creator, Controller, Facade, Model-View, Proxy).',
    day: 2,
    topics: [
      {
        id: 'top-8-1',
        moduleId: 'mod-8',
        lessonNumber: 19,
        title: 'Domain Modeling: Boundary, Controller & Entity Objects',
        day: 2,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Domain Modeling', 'BCE Architecture', 'Stereotypes'],
        summary: 'Domain modeling creates a conceptual model of the problem domain. Objects are classified into 3 stereotypes: Boundary (actor interaction, UI), Controller (use-case business logic), and Entity (persistent business data).',
        keyPoints: [
          'Boundary Objects: Interface with external actors (screens, forms, dialogs). Validate input format, no core business logic.',
          'Entity Objects: Encapsulate persistent data that outlives use case execution (e.g., Book, Member, Account). Often "dumb servers".',
          'Controller Objects: Coordinate entity objects and interface with boundary objects for a use case. Decouples UI from business logic.',
          'Why Decouple?: Changing UI (e.g., desktop to web/mobile) does not impact business logic or database entities.'
        ],
        diagramType: 'bce_architecture',
        examTips: 'Identify Boundary, Controller, and Entity objects for an ATM or Library system. Standard 5-mark question.',
        fullNotes: `### Three-Tier Domain Modeling (BCE)
- **Boundary**: One per actor/use-case pair.
- **Controller**: Manages use-case state and validates request ordering (e.g., voucher requested before payment).
- **Entity**: Persistent business domain models.`
      },
      {
        id: 'top-8-2',
        moduleId: 'mod-8',
        lessonNumber: 19,
        title: 'Object Identification (Booch Grammatical Method) & CRC Cards',
        day: 2,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Booch Method', 'CRC Cards', 'Responsibility'],
        summary: 'Booch grammatical analysis maps nouns to classes and verbs to methods, pruning non-objects. CRC (Class-Responsibility-Collaborator) index cards assign responsibilities and collaborators through team role-play.',
        keyPoints: [
          'Booch Grammatical Analysis: 1. Write processing narrative; 2. Nouns -> candidate classes; 3. Verbs -> candidate methods; 4. Prune synonyms, external actors, primitives, and imperative action nouns.',
          'Criteria for Legitimate Objects: Retained private state, multiple attributes, common operations across instances.',
          'Tic-Tac-Toe Example: Board is the only true entity object; player is external actor; move is an action verb.',
          'CRC Cards (Cunningham & Beck): 4"x6" index cards listing Class Name, Responsibilities, and Collaborators. Small size prevents bloated classes.'
        ],
        diagramType: 'crc_card',
        examTips: 'Explain the 3 pruning rules in Booch grammatical analysis and the structure of a CRC card.',
        fullNotes: `### Object Identification & CRC Cards
- **Booch Method**: Eliminates nouns outside problem space or lacking private state.
- **CRC Cards**: Team role-play exercise where cards are flipped through to verify interaction and responsibility allocation.`
      },
      {
        id: 'top-8-3',
        moduleId: 'mod-8',
        lessonNumber: 18,
        title: 'Core Design Patterns: Expert, Creator, Controller & Facade',
        day: 2,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Design Patterns', 'Expert', 'Creator', 'Facade'],
        summary: 'Proven reusable design solutions. Expert pattern assigns responsibility to the class holding the data. Creator pattern assigns object instantiation. Controller pattern handles actor requests. Facade provides a unified simplified interface.',
        keyPoints: [
          'Design Pattern Parts: Problem, Context, Solution, Consequences.',
          'Expert Pattern: Assign responsibility to the information expert (e.g., SaleTransaction computes total sales).',
          'Creator Pattern: Class A creates Class B if A aggregates, contains, or closely uses B, or has B\'s initialization data.',
          'Controller Pattern: Assign a non-UI controller to coordinate each use case and track session state.',
          'Façade Pattern: Creates a single unified entry class (e.g., DBFacade) to wrap a complex subsystem or package.'
        ],
        diagramType: 'design_patterns',
        examTips: 'Explain Expert and Creator patterns with class diagrams. Highly tested in university exams.',
        fullNotes: `### Fundamental Design Patterns
- **Information Expert**: Objects do things related to the information they own.
- **Creator**: Promotes low coupling by having natural containers instantiate parts.
- **Façade**: Shields clients from complex internal subsystem package structures.`
      },
      {
        id: 'top-8-4',
        moduleId: 'mod-8',
        lessonNumber: 18,
        title: 'Model-View Separation & Intermediary (Proxy) Pattern',
        day: 2,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Model-View', 'Observer', 'Proxy'],
        summary: 'Model-View separation prevents domain classes from depending on UI. Implemented via Polling (Pull) or Publish-Subscribe (Push via EventListener). Intermediary/Proxy pattern manages network distribution transparently.',
        keyPoints: [
          'Model-View Separation: Domain model classes must NEVER directly call UI presentation classes.',
          'Solution 1: Polling / Pull from Above (UI queries model; inefficient for real-time data).',
          'Solution 2: Publish-Subscribe / Observer (Model publishes events to Event Manager; UI subscribers receive callbacks).',
          'Proxy Pattern: A local client-side object acts as a surrogate for a remote server, handling serialization and network communication transparently.'
        ],
        diagramType: 'observer_proxy',
        examTips: 'Why is Push-from-below bad without Publish-Subscribe? Because direct upward calls from domain model into GUI break modularity and prevent model reuse!',
        fullNotes: `### Architectural Patterns
- **Model-View Separation**: Keeps business domain models completely independent of GUI widgets and platforms.
- **Proxy Pattern**: Provides the same interface as the remote service while abstracting network complexities.`
      }
    ]
  },
  {
    id: 'mod-10',
    moduleNumber: 10,
    title: 'Coding, Testing & Quality Verification',
    description: 'Coding standards, Walkthroughs vs Inspections, Cleanroom testing, Black-box testing (ECP, BVA), White-box testing (CFG, Cyclomatic complexity, DU chains, Mutation), and System performance tests.',
    day: 3,
    topics: [
      {
        id: 'top-10-1',
        moduleId: 'mod-10',
        lessonNumber: 23,
        title: 'Coding Standards, Code Reviews & Cleanroom Testing',
        day: 3,
        difficulty: 'Easy',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Coding Standards', 'Walkthrough', 'Inspection', 'Cleanroom'],
        summary: 'Coding standards enforce uniformity and prevent errors. Walkthrough (informal hand-simulation) vs Inspection (formal checklist audit). Cleanroom testing (IBM) targets zero-defect software by replacing unit testing with formal verification.',
        keyPoints: [
          'Coding Standards (Mandatory): Rules for globals, naming conventions, module headers, error return codes.',
          'Coding Guidelines (Advisory): No cryptic code, avoid side effects, max function length <= 10 lines, >= 1 comment per 3 code lines.',
          'Internal Documentation: Meaningful variable names are empirically PROVEN to be the most helpful internal documentation!',
          'Walkthrough vs Inspection: Walkthrough is informal hand-simulation by 3-7 peers (no managers!); Inspection is a formal checklist search for classic bugs and standard violations.',
          'Cleanroom Testing (IBM): Formal spec, incremental development, static formal verification (no unit execution testing by programmers!), and statistical testing against operational profile.'
        ],
        diagramType: 'code_review_process',
        examTips: 'Contrast Code Walkthrough vs Code Inspection. Explain why managers should NOT attend code walkthrough meetings.',
        fullNotes: `### Code Review and Cleanroom Engineering
- **Code Walkthrough**: Focuses on algorithmic/logical flaws through hand execution.
- **Code Inspection**: Formal review against common error checklists (uninitialized variables, array out-of-bounds, memory leaks).
- **Cleanroom Testing**: Defect prevention philosophy achieving zero-defect code through formal specification and static mathematical verification.`
      },
      {
        id: 'top-10-2',
        moduleId: 'mod-10',
        lessonNumber: 24,
        title: 'Black-Box Testing: Equivalence Partitioning & Boundary Value Analysis',
        day: 3,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: true,
        hasDiagram: true,
        tags: ['Black-Box', 'ECP', 'BVA', 'Test Cases'],
        summary: 'Black-box tests functional requirements without knowing internal code. Test case triplet [I, S, O]. Equivalence Class Partitioning divides input domain into valid/invalid classes. Boundary Value Analysis tests class boundaries where most bugs lurk.',
        keyPoints: [
          'Test Case Triplet: [I, S, O] = [Input data, System State, Expected Output].',
          'Random testing is ineffective: Test suite must be systematically designed to detect disjoint errors.',
          'Equivalence Class Partitioning (ECP): Input range [0, 5000] yields 1 valid class (0..5000) and 2 invalid classes (<0, >5000).',
          'Boundary Value Analysis (BVA): Tests boundaries where off-by-one errors happen. For [0, 5000]: {-1, 0, 1, 4999, 5000, 5001}.',
          'Worked Example: Intersection of two straight lines y=mx+c (Parallel lines m1=m2, c1!=c2; Intersecting m1!=m2; Coincident m1=m2, c1=c2).'
        ],
        diagramType: 'bva_ecp_diagram',
        examTips: 'Practice designing ECP and BVA test sets for given input ranges. Guaranteed numerical/analytical question.',
        fullNotes: `### Black-Box (Functional) Testing
- **ECP**: Tests one representative value per equivalence class.
- **BVA**: Tests values on, immediately below, and immediately above class boundaries.`
      },
      {
        id: 'top-10-3',
        moduleId: 'mod-10',
        lessonNumber: 25,
        title: 'White-Box Testing: CFG, McCabe Cyclomatic Complexity & Coverage',
        day: 3,
        difficulty: 'Hard',
        isHighYield: true,
        isNumerical: true,
        hasDiagram: true,
        tags: ['White-Box', 'CFG', 'McCabe', 'Complexity Formula'],
        summary: 'Structural testing based on code internals. Coverage hierarchy: Condition -> Branch -> Statement. Control Flow Graph (CFG) nodes and edges. McCabe Cyclomatic Complexity V(G) = E - N + 2 = Bounded Areas + 1 = Decisions + 1.',
        keyPoints: [
          'Coverage Hierarchy: Condition coverage is stronger than Branch coverage, which is stronger than Statement coverage.',
          'Condition Coverage: Requires 2^n test cases for n component conditions.',
          'Control Flow Graph (CFG): Numbered statements form nodes; control transitions form edges.',
          'McCabe Cyclomatic Complexity V(G): 1. V(G) = E - N + 2; 2. V(G) = Total bounded areas + 1; 3. V(G) = Decision statements + 1.',
          'Linearly Independent Path: Path introducing at least one new edge not covered by prior paths.',
          'Data Flow Testing: Covers Definition-Use (DU) chains [X, S, S\'].',
          'Mutation Testing: Injects syntax mutations; test cases must "kill" mutants. Surviving mutants indicate test suite gaps.'
        ],
        diagramType: 'cfg_cyclomatic',
        formula: 'V(G) = E - N + 2 = Regions + 1 = P + 1',
        examTips: 'Calculate V(G) for Euclid GCD, find-maximum, and binary search using all 3 methods. Always show that all three methods yield the same answer!',
        fullNotes: `### White-Box Structural Testing
- **Euclid GCD Algorithm**: 6 statements, 7 edges, 6 nodes -> V(G) = 7 - 6 + 2 = 3.
- **Linearly Independent Paths**: Form a basis set spanning all execution paths in the program.`
      },
      {
        id: 'top-10-4',
        moduleId: 'mod-10',
        lessonNumber: 26,
        title: 'Integration, System & Performance Testing + Error Seeding',
        day: 3,
        difficulty: 'Hard',
        isHighYield: true,
        isNumerical: true,
        hasDiagram: true,
        tags: ['Integration', 'Alpha/Beta', 'Performance Tests', 'Error Seeding'],
        summary: 'Integration testing approaches (Big-bang, Top-down with stubs, Bottom-up with drivers, Sandwich). System testing (Alpha, Beta, Acceptance). 9 Performance tests. Error seeding formula: N = S * n / s.',
        keyPoints: [
          'Integration Testing Approaches: Top-down needs Stubs (dummy lower routines); Bottom-up needs Drivers (test harnesses); Sandwich combines both.',
          'Incremental (add 1 module at a time -> easy fault localization) vs Phased (add clusters).',
          'System Testing: Alpha (internal developers/QA), Beta (friendly external users), Acceptance (customer signoff).',
          '9 Performance Tests: Stress (endurance under peak load), Volume, Configuration, Compatibility, Regression, Recovery, Maintenance, Documentation, Usability.',
          'Error Seeding Formula: n / N = s / S => Total defects N = S * n / s; Remaining defects = n * (S - s) / s.'
        ],
        diagramType: 'stubs_drivers_integration',
        formula: 'N = (S * n) / s | Remaining = n * (S - s) / s',
        examTips: 'Solve numericals on Error Seeding: Given 20 seeded bugs (S), 16 seeded found (s), and 40 natural found (n), calculate total natural defects N and remaining bugs!',
        fullNotes: `### Integration, System & Performance Testing
- **Stubs**: Simulate subordinates called by module under test (simple table lookups).
- **Drivers**: Invoke the module under test with parameters.
- **Error Seeding**: Statistical technique to estimate residual bugs by deliberately injecting artificial defects.`
      }
    ]
  },
  {
    id: 'mod-11',
    moduleNumber: 11,
    title: 'Software Project Planning, Estimation & Scheduling',
    description: 'Sliding window planning, SPMP, LOC vs Function Points (Albrecht), Halstead Software Science, COCOMO (Basic, Intermediate, Complete), Putnam Rayleigh curve, and CPM/PERT.',
    day: 3,
    topics: [
      {
        id: 'top-11-1',
        moduleId: 'mod-11',
        lessonNumber: 27,
        title: 'Project Planning, Size Metrics (LOC vs FP) & Halstead Science',
        day: 3,
        difficulty: 'Hard',
        isHighYield: true,
        isNumerical: true,
        hasDiagram: true,
        tags: ['Function Points', 'Halstead', 'Size Metrics', 'Formulas'],
        summary: 'Sliding window planning. Albrecht Function Point metric: UFP = 4I + 5O + 4E + 10F + 10Int; TCF = 0.65 + 0.01*DI; FP = UFP*TCF. Halstead Software Science analytical formulas for Length, Vocabulary, Volume, Effort, and Time.',
        keyPoints: [
          'Sliding Window Planning: Plan immediate phase in detail; distant phases at coarse level.',
          'LOC Shortcomings: Language dependent, rewards verbosity, penalizes reuse, impossible to measure during requirements.',
          'Albrecht Function Points (FP): Measures size directly from requirements. Independent of language. UFP = 4I + 5O + 4E + 10F + 10Int. TCF = 0.65 + 0.01*DI (DI = 0 to 70). FP = UFP * TCF.',
          'Feature Points: Adds Algorithm complexity (weight 15) for real-time systems.',
          'Halstead Science: Vocabulary eta = n1 + n2; Length N = N1 + N2; Volume V = N log2(eta); Level L = V*/V; Effort E = V / L = V^2 / V*; Time T = E / 18.'
        ],
        diagramType: 'fp_halstead',
        formula: 'UFP = 4I + 5O + 4E + 10F + 10Int | FP = UFP * (0.65 + 0.01*DI)',
        examTips: 'Practice calculating Halstead parameters for C programs and Function Points for given input/output/file counts!',
        fullNotes: `### Project Size Estimation & Halstead Metrics
- **Albrecht FP**: Computes size as weighted sum of Inputs, Outputs, Inquiries, Files, and Interfaces.
- **Halstead Software Science**: Analytical model calculating mental discriminations ($E$) and coding time ($T = E/18$).`
      },
      {
        id: 'top-11-2',
        moduleId: 'mod-11',
        lessonNumber: 28,
        title: 'COCOMO Model: Basic, Intermediate & Complete',
        day: 3,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: true,
        hasDiagram: true,
        tags: ['COCOMO', 'Effort Formula', 'Duration Formula'],
        summary: 'Barry Boehm (1981) cost estimation model. 3 project categories: Organic, Semi-detached, Embedded. Effort = a1*(KLOC)^a2 PM; Tdev = b1*(Effort)^b2 Months. Intermediate uses 15 cost drivers; Complete handles heterogeneous subsystems.',
        keyPoints: [
          '3 Categories: Organic (small team, stable, <=50 KLOC), Semi-detached (medium, mixed experience), Embedded (tight constraints, flight/hardware).',
          'Basic COCOMO Formulas: Effort = a1*(KLOC)^a2; Tdev = b1*(Effort)^b2.',
          'Constants: Organic: Effort = 2.4*(KLOC)^1.05, Tdev = 2.5*(Effort)^0.38.',
          'Semi-detached: Effort = 3.0*(KLOC)^1.12, Tdev = 2.5*(Effort)^0.35.',
          'Embedded: Effort = 3.6*(KLOC)^1.20, Tdev = 2.5*(Effort)^0.32.',
          'Effort is super-linear in size (a2 > 1); Tdev is sub-linear in effort (b2 < 1).',
          'Worked Example: 32 KLOC Organic -> Effort = 2.4*(32)^1.05 = 91 PM; Tdev = 2.5*(91)^0.38 = 14 months.'
        ],
        diagramType: 'cocomo_curves',
        formula: 'Effort = a1 * (KLOC)^a2 | Tdev = b1 * (Effort)^b2',
        examTips: 'Guaranteed numerical question on Basic COCOMO: memorize the constants (2.4/1.05/2.5/0.38 for organic, 3.0/1.12 for semi-detached, 3.6/1.20 for embedded).',
        fullNotes: `### Constructive Cost Model (COCOMO)
- **Basic COCOMO**: Estimates nominal effort and duration based purely on KLOC.
- **Intermediate COCOMO**: Refines basic estimate using 15 cost drivers categorized under Product, Computer, Personnel, and Project.
- **Complete COCOMO**: Decomposes large software into subsystems with different characteristics.`
      },
      {
        id: 'top-11-3',
        moduleId: 'mod-11',
        lessonNumber: 29,
        title: 'Staffing (Putnam & Norden) & Scheduling (CPM, Gantt, PERT)',
        day: 3,
        difficulty: 'Hard',
        isHighYield: true,
        isNumerical: true,
        hasDiagram: true,
        tags: ['Putnam 4th Power', 'Rayleigh Curve', 'CPM', 'Critical Path'],
        summary: 'Norden-Rayleigh curve models staffing build-up. Putnam\'s software equation: L = Ck * K^(1/3) * td^(4/3). Schedule compression incurs a devastating 4th power cost penalty (Cost proportional to 1/td^4). Critical Path Method (CPM) computes ES, EF, LS, LF, and Slack.',
        keyPoints: [
          'Norden Rayleigh Curve: Staffing level E = (K/td^2) * t * e^(-t^2 / 2td^2). Small initial staff, peaks during testing, falls in maintenance.',
          'Putnam Software Equation: L = Ck * K^(1/3) * td^(4/3) => Effort K = L^3 / (Ck^3 * td^4).',
          'Putnam 4th Power Law: Cost proportional to 1/td^4. Compressing schedule by 50% increases effort and cost by 2^4 = 16 TIMES!',
          'Critical Path Method (CPM): ES = max(EF pred); EF = ES + dur; LF = min(LS succ); LS = LF - dur; Slack = LS - ES = LF - EF.',
          'Critical Path: Chain of tasks with ZERO slack. Delays on critical path directly delay final project completion.',
          'Gantt Chart (resource allocation & slack bars) vs PERT Chart (statistical variation: optimistic, likely, pessimistic; expected time = (o + 4m + p)/6).'
        ],
        diagramType: 'cpm_activity_network',
        formula: 'Cost proportional to 1/td^4 | Slack = LS - ES = LF - EF',
        examTips: 'Understand Putnam\'s 4th power law: Why does halving development time increase cost 16x? Also know how to calculate Slack and identify the Critical Path in an activity network.',
        fullNotes: `### Staffing and Project Scheduling
- **Brooks\' Law**: Adding manpower to a late software project makes it later.
- **Putnam\'s 4th Power Law**: Explains why drastic schedule compression leads to exponential cost explosion.`
      }
    ]
  },
  {
    id: 'mod-12-17',
    moduleNumber: 12,
    title: 'Management, Reliability, Maintenance, CASE & Client-Server',
    description: 'Team structures, Risk Management, SCM, Software Reliability metrics, ISO 9001 vs SEI-CMM, Reverse engineering, CASE environments, Software Reuse, and CORBA/DCOM client-server middleware.',
    day: 3,
    topics: [
      {
        id: 'top-12-1',
        moduleId: 'mod-12-17',
        lessonNumber: 30,
        title: 'Organization Formats, Team Structures & Risk Management',
        day: 3,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Team Structures', 'Risk Assessment', 'Egoless'],
        summary: 'Functional vs Project organization. Chief Programmer vs Democratic vs Mixed team structures. Egoless programming. Risk management: 3 risk classes (Project, Technical, Business), Risk Priority p = r * s, Risk Leverage formula.',
        keyPoints: [
          'Functional Format (specialized pools, high communication, job specialization) vs Project Format (fixed cross-functional team, low communication friction).',
          'Chief Programmer Team (authoritarian, single point of failure, lower morale) vs Democratic Team (decentralized, egoless, high morale, max 5-6 people) vs Mixed Control Team (hierarchical reporting + democratic peer teams).',
          'Sackman Ratio: Coding speed 25:1, debugging speed 28:1 between worst and best engineers.',
          '3 Risk Categories: Project Risks (budget, schedule slippage), Technical Risks (uncertain algorithms, changing specs), Business Risks (unwanted product).',
          'Risk Assessment: Priority p = Probability (r) * Severity (s). Risk Containment: Avoid, Transfer, Reduce.',
          'Risk Leverage = (Exposure_before - Exposure_after) / Cost_of_reduction.'
        ],
        diagramType: 'team_structures',
        formula: 'Priority p = r * s | Leverage = (Exp_before - Exp_after)/Cost',
        examTips: 'Explain why schedule slippage is so common in software (software is intangible/invisible!). Also know the Risk Leverage formula.',
        fullNotes: `### Team Organization & Risk Management
- **Egoless Programming**: Culture where code belongs to the team, encouraging objective defect finding without defensive friction.
- **Visibility**: Increasing document reviews and milestones every 10-15 days counters the risk of schedule slippage.`
      },
      {
        id: 'top-12-2',
        moduleId: 'mod-12-17',
        lessonNumber: 31,
        title: 'Software Configuration Management (SCM) & Change Control',
        day: 3,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['SCM', 'Version Control', 'Baseline', 'CCB'],
        summary: 'Configuration management controls access to deliverables. Distinguishes Version, Revision, and Release. Controlled vs Precontrolled items. Baseline, Reserve (check-out) and Restore (check-in) managed by Change Control Board (CCB). SCCS & RCS store deltas.',
        keyPoints: [
          'Version (significant functional/platform change), Revision (minor bug fix), Release (formal distribution to users).',
          'Problems without SCM: Inconsistency between replicated copies, concurrent access overwrite, unstable development baseline.',
          'Configuration Control: Developer executes Reserve (check-out) -> gets private copy -> performs change -> submits to Change Control Board (CCB) -> CCB approves -> Restore (check-in) creates new baseline.',
          'Delta Storage (SCCS / RCS): Tools store original base file plus incremental changes (deltas), saving massive disk space.'
        ],
        diagramType: 'scm_workflow',
        examTips: 'Differentiate between Version, Revision, and Release. Describe the Reserve-Restore operation with the CCB.',
        fullNotes: `### Software Configuration Management (SCM)
SCM guarantees stability and traceability across the evolving project deliverables.`
      },
      {
        id: 'top-12-3',
        moduleId: 'mod-12-17',
        lessonNumber: 32,
        title: 'Software Reliability, Bathtub Curve & Reliability Growth Models',
        day: 3,
        difficulty: 'Hard',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['Reliability', 'Bathtub Curve', 'ROCOF', 'Growth Models'],
        summary: 'Core 10% instructions execute 90% of time. Hardware exhibits Bathtub curve (wear-out); software does not wear out (step curve). 6 metrics: ROCOF, MTTF, MTTR, MTBF, POFOD, Availability. Jelinski-Moranda (constant step) vs Littlewood-Verrall (stochastic Gamma).',
        keyPoints: [
          'Core 10%: Removing 60% of bugs from rarely used code gives only ~3% reliability improvement. Reliability depends on the operational profile.',
          'Hardware vs Software: Hardware wears out (bathtub curve); Software fails due to design errors (no wear-out). Repairing hardware restores baseline; repairing software may introduce new bugs.',
          '6 Metrics: ROCOF (failure frequency), MTTF (mean run-time to failure), MTTR (mean repair time), MTBF = MTTF + MTTR (calendar time), POFOD (failure on demand probability, e.g., 0.001), Availability = MTTF / MTBF.',
          '5 Failure Types: Transient, Permanent, Recoverable, Unrecoverable, Cosmetic.',
          'Growth Models: Jelinski-Moranda assumes constant step increase per bug fix (unrealistic); Littlewood-Verrall assumes Gamma distribution with diminishing returns and handles negative growth.'
        ],
        diagramType: 'bathtub_software_curve',
        examTips: 'Draw the Hardware Bathtub Curve vs Software Failure Curve. Define POFOD and Availability with formulas.',
        fullNotes: `### Software Reliability Engineering
- **POFOD**: Crucial metric for emergency protection systems (e.g., nuclear reactor scram).
- **Littlewood-Verrall Model**: Models diminishing returns and accounts for buggy bug-fixes.`
      },
      {
        id: 'top-12-4',
        moduleId: 'mod-12-17',
        lessonNumber: 34,
        title: 'Quality Standards: ISO 9001 vs SEI-CMM & Six Sigma',
        day: 3,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['ISO 9001', 'SEI-CMM', 'Six Sigma', 'Quality'],
        summary: 'Shift from product inspection to process assurance (TQM). ISO 9001 for design/dev. SEI-CMM 5 levels (Initial, Repeatable, Defined [~ISO 9001], Managed, Optimizing) and KPAs. Personal Software Process (PSP). Six Sigma (3.4 DPMO, DMAIC/DMADV).',
        keyPoints: [
          'Quality Evolution: Inspection -> Quality Control (QC) -> Quality Assurance (QA) -> Total Quality Management (TQM). Process Assurance is modern paradigm.',
          'ISO 9001: For design, dev, production. Assures adherence to documented process, but does not guarantee the process is optimal.',
          'SEI-CMM 5 Levels: 1. Initial (chaotic, heroics); 2. Repeatable (basic PM, cost/schedule); 3. Defined (standard org processes, peer reviews, ISO 9001 level); 4. Managed (product and process metrics); 5. Optimizing (continuous improvement, defect prevention).',
          'CMM vs ISO: ISO 9001 is international certification for external clients; CMM is internal process assessment roadmap towards TQM.',
          'Six Sigma: <= 3.4 defects per million opportunities (DPMO). DMAIC (improve existing) vs DMADV (design new).'
        ],
        diagramType: 'cmm_pyramid',
        examTips: 'Explain the 5 levels of SEI-CMM with their Key Process Areas (KPAs). Why does attempting Level 3 before Level 2 fail?',
        fullNotes: `### Quality Frameworks
- **CMM Level Progression**: You cannot skip levels because higher-level process discipline depends on foundational project management controls (Level 2).`
      },
      {
        id: 'top-12-5',
        moduleId: 'mod-12-17',
        lessonNumber: 36,
        title: 'Software Maintenance, Reengineering & Boehm ACT',
        day: 3,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: true,
        hasDiagram: true,
        tags: ['Maintenance', 'Reverse Engineering', 'Boehm ACT'],
        summary: '3 types: Corrective, Adaptive, Perfective. Reverse engineering reconstructs design/SRS from code. Process 1 (direct patch) used for <=15% rework; Process 2 (Reengineering) for >15% rework. Boehm Annual Change Traffic (ACT) formula.',
        keyPoints: [
          '3 Maintenance Types: Corrective (bug fix), Adaptive (porting to new OS/hardware), Perfective (adding features/tuning performance).',
          'Reverse Engineering: Code -> Module Specs -> Structure Chart/DFD -> SRS Document. Starts with cosmetic cleanup (prettyprint, meaningful names, remove gotos).',
          'Process Model 1 vs 2: Model 1 (direct patch) is cheaper for <= 15% rework; Model 2 (Reengineering: reverse + forward engineering) is best for > 15% rework or heavily degraded legacy systems.',
          'Boehm ACT Formula: ACT = (KLOC_added + KLOC_deleted) / KLOC_total. Annual Maintenance Cost = ACT * Development Cost.'
        ],
        diagramType: 'reengineering_cycle',
        formula: 'ACT = (KLOC_added + KLOC_deleted) / KLOC_total | Cost = ACT * DevCost',
        examTips: 'Calculate annual maintenance cost: Given Rs. 10M development cost and 5% annual code modification, compute ACT and maintenance cost.',
        fullNotes: `### Software Maintenance & Reengineering
- **Legacy Systems**: Characterized by missing docs, unstructured spaghetti code, and high maintenance costs.
- **Software Reengineering**: Combines reverse engineering to extract requirements, followed by forward engineering to rebuild a clean architecture.`
      },
      {
        id: 'top-12-6',
        moduleId: 'mod-12-17',
        lessonNumber: 37,
        title: 'CASE Tools, Software Reuse & Client-Server Architecture (CORBA/DCOM)',
        day: 3,
        difficulty: 'Medium',
        isHighYield: true,
        isNumerical: false,
        hasDiagram: true,
        tags: ['CASE Tools', 'Reuse', 'CORBA', 'Client-Server'],
        summary: 'CASE environment integrates tools around a central repository / data dictionary. Software reuse across domain analysis and Prieto-Diaz faceted classification. 3-tier client-server architecture with middleware: CORBA OMA (ORB, IDL, Stubs/Skeletons, IIOP) vs COM/DCOM.',
        keyPoints: [
          'CASE Environment: User Interface, Tool Set, Object Management System (OMS), Central Repository (Data Dictionary). Reduces effort by 30-40%.',
          'Software Reuse: Spec, Design, Code, Tests, Knowledge. Prieto-Diaz faceted classification uses n-tuples (action, object, data structure, system domain). Application generators (4GLs like SQL).',
          '2-Tier vs 3-Tier Client-Server: 2-Tier has client directly calling DB (proprietary, unscalable); 3-Tier adds Middleware for directory lookup, queuing, and translation.',
          'CORBA (OMG): Object Request Broker (ORB - "Object Bus"). IDL compiled into Client Stub (proxy) and Server Skeleton. GIOP over TCP/IP = IIOP.',
          'COM / DCOM (Microsoft): Binary components (.dll, .exe, ActiveX). DCOM extends across network; best for Windows desktop environments; CORBA is best for heterogeneous enterprise servers.'
        ],
        diagramType: 'corba_architecture',
        examTips: 'Explain the roles of ORB, IDL, Stub, and Skeleton in CORBA. Differentiate between 2-tier and 3-tier client-server architectures.',
        fullNotes: `### Advanced Paradigms: CASE, Reuse & Middleware
- **Central Repository**: Eliminates inconsistency between analysis, design, and code generators.
- **CORBA**: Vendor-neutral middleware allowing distributed objects to invoke methods across networks transparently.`
      }
    ]
  }
];
