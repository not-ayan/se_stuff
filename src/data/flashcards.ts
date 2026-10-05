export interface Flashcard {
  id: string;
  chapterId: string;
  /** Short prompt shown on the front of the card. */
  front: string;
  /** Answer revealed on the back. */
  back: string;
}

/**
 * Active-recall deck for the whole course. Cards are deliberately short: they
 * test a single fact or definition pulled straight from the notes.
 */
export const FLASHCARDS: Flashcard[] = [
  // Chapter 1 / Module 1: Introduction & Structured Programming
  { id: 'fc-1-1', chapterId: 'ch-01', front: 'What is the Building Construction Analogy in Software Engineering?', back: 'A small brick wall can be built using intuition and common sense. A 60-story skyscraper collapses without structural engineering and blueprints. Similarly, small toy programs need no formal process, but large software requires software engineering principles.' },
  { id: 'fc-1-2', chapterId: 'ch-01', front: 'Two fundamental techniques used to fight exponential complexity growth?', back: 'Abstraction (suppress irrelevant detail at each level) and Decomposition (partition into modules with minimal cross-module coupling).' },
  { id: 'fc-1-3', chapterId: 'ch-01', front: 'Which famous paper (and author, year) argued GOTO is harmful?', back: 'Edsger W. Dijkstra, 1968 — "GOTO Statement Considered Harmful".' },
  { id: 'fc-1-4', chapterId: 'ch-01', front: 'What are the three fundamental constructs sufficient for any program logic?', back: 'Sequence, Selection (if-else), and Iteration (while/for) with single-entry, single-exit control flow.' },
  { id: 'fc-1-5', chapterId: 'ch-01', front: 'What were the major symptoms of the Software Crisis?', back: 'Escalating software costs, massive budget and schedule overruns, poor reliability and frequent crashes, failure to meet user requirements, and unmaintainable "spaghetti code".' },
  { id: 'fc-1-6', chapterId: 'ch-01', front: 'Exploratory style philosophy vs Modern Software Engineering philosophy?', back: 'Exploratory style relies on late error correction during testing. Modern SE relies on error prevention and phase containment (catching defects at the earliest phase).' },
  { id: 'fc-1-7', chapterId: 'ch-01', front: 'What is the mathematical relationship of potential component interactions?', back: 'Total potential interactions = N(N - 1)/2 ≈ O(N²), which explains why monolithic unstructured programs become exponentially complex.' },

  // Chapter 2 / Module 2: Software Life Cycle Models
  { id: 'fc-2-1', chapterId: 'ch-02', front: 'What is the core sequence of the 6 SDLC phases in order?', back: 'Feasibility Study → Requirements Analysis & Specification (SRS) → Design → Coding & Unit Testing → Integration & System Testing → Maintenance.' },
  { id: 'fc-2-2', chapterId: 'ch-02', front: 'What is the ratio of development effort to maintenance effort over a product lifetime?', back: 'About 40% development to 60% maintenance — maintenance is the largest and most expensive lifecycle phase.' },
  { id: 'fc-2-3', chapterId: 'ch-02', front: 'Why is the Classical Waterfall model considered an idealistic model?', back: 'It contains NO feedback paths and assumes zero defects are introduced during development. In reality, requirements change and errors occur in every phase.' },
  { id: 'fc-2-4', chapterId: 'ch-02', front: 'What is Phase Containment of Errors and why is it crucial?', back: 'Errors should be caught and eliminated in the exact phase they are introduced. A requirement defect costs 1x during SRS, 10x during system testing, and 100x during maintenance.' },
  { id: 'fc-2-5', chapterId: 'ch-02', front: 'What is the key difference between the Prototyping Model and the Evolutionary Model?', back: 'In the Prototyping model, the prototype is a disposable "throwaway toy" to clarify ambiguous GUI/requirements. In the Evolutionary model, every increment is a real, high-quality production release that customers use.' },
  { id: 'fc-2-6', chapterId: 'ch-02', front: 'What are the 4 quadrants of one spiral loop in Boehm\'s Spiral Model?', back: 'Quadrant 1: Objective Setting & Alternatives; Quadrant 2: Risk Assessment & Resolution; Quadrant 3: Development & Next-Level Validation; Quadrant 4: Review & Planning for Next Loop.' },
  { id: 'fc-2-7', chapterId: 'ch-02', front: 'Why is Boehm\'s Spiral Model known as a Meta-Model?', back: 'It encompasses and can emulate other models: a zero-risk spiral is Waterfall; an early UI loop is Prototyping; incremental spiral releases act as the Evolutionary model.' },

  // Chapter 3 / Module 3: Software Quality (Maintainability & Portability)
  { id: 'fc-3-1', chapterId: 'ch-03', front: 'Why is "fitness of purpose" an inadequate definition of Software Quality?', back: 'A program may calculate correct outputs (fitness of purpose) but possess an unusable UI or unmaintainable "spaghetti code" that makes modification impossible.' },
  { id: 'fc-3-2', chapterId: 'ch-03', front: 'What is the 40:60 Software Economics rule?', back: 'Over a software system’s lifetime, at least 60% of total expenditure and effort is spent on Maintenance, while 40% (or less) is spent on initial Development.' },
  { id: 'fc-3-3', chapterId: 'ch-03', front: 'What are the three core pillars of Software Maintainability?', back: '1. Understandability (ease of reading code and intent); 2. Modifiability (ease of making safe changes without ripple effects); 3. Testability (ease of verifying modifications via unit tests).' },
  { id: 'fc-3-4', chapterId: 'ch-03', front: 'How does a Hardware Abstraction Layer (HAL) / Portability Interface achieve portability?', back: 'It isolates machine-dependent logic (device drivers, OS system calls) into a thin boundary layer (<5% of code), keeping the remaining 95%+ of core business logic completely portable across platforms.' },
  { id: 'fc-3-5', chapterId: 'ch-03', front: 'What are the three main categories of Software Maintenance and their effort breakdown?', back: 'Corrective (~20%: fixing bugs), Adaptive (~20%: porting to new OS/hardware), and Perfective (~60%: adding user-requested features and tuning performance).' },

  // Chapter 4 / Module 4: Requirements Analysis & Specification (SRS)
  { id: 'fc-4-1', chapterId: 'ch-04', front: 'What are the primary responsibilities of a System Analyst?', back: 'Eliciting requirements from customers and users, resolving ambiguities/contradictions, analyzing feasibility, and authoring the formal SRS document.' },
  { id: 'fc-4-2', chapterId: 'ch-04', front: 'What are the two most common defects found in customer requirements?', back: 'Inconsistency (contradictory requirements) and Incompleteness (missing operational scenarios or unhandled edge cases).' },
  { id: 'fc-4-3', chapterId: 'ch-04', front: 'What are the essential properties of a good SRS (IEEE 830 standard)?', back: 'Concise, Complete, Consistent, Unambiguous, Verifiable, Modifiable, Traceable, and specifies WHAT the system should do, NOT HOW.' },
  { id: 'fc-4-4', chapterId: 'ch-04', front: 'What are the 4 quadrants of a formal Decision Table and the completeness rule?', back: 'Condition Stub (top-left), Condition Entry (top-right), Action Stub (bottom-left), Action Entry (bottom-right). For k boolean conditions, there must be exactly 2ᵏ rule columns.' },
  { id: 'fc-4-5', chapterId: 'ch-04', front: 'What is an Axiomatic Specification (Hoare Triple)?', back: 'Specifies operations using Preconditions and Postconditions: {P} S {Q}. If precondition P holds before executing program S, postcondition Q is guaranteed to hold after termination.' },

  // Chapter 5 / Module 5: Software Design (Modularity & FOD vs OOD)
  { id: 'fc-5-1', chapterId: 'ch-05', front: 'What is the full ranking of Cohesion from WORST to BEST?', back: '1. Coincidental (Worst) → 2. Logical → 3. Temporal → 4. Procedural → 5. Communicational → 6. Sequential → 7. Functional (Best: performs exactly one dedicated task).' },
  { id: 'fc-5-2', chapterId: 'ch-05', front: 'What is the full ranking of Coupling from BEST to WORST?', back: '1. Data (Best: passes simple scalar parameters) → 2. Stamp (passes entire data structure) → 3. Control (passes flags dictating execution) → 4. Common (shares global variables) → 5. Content (Worst: one module modifies internal data/code of another).' },
  { id: 'fc-5-3', chapterId: 'ch-05', front: 'What are Fan-In and Fan-Out in Structure Charts and their recommended rules?', back: 'Fan-Out: Number of modules directly called by a module (keep ≤ 7 ± 2). Fan-In: Number of modules calling this module (high fan-in is desirable because it indicates code reuse).' },
  { id: 'fc-5-4', chapterId: 'ch-05', front: 'What is Grady Booch’s Dictum on procedural vs. object-oriented design?', back: '“Identify verbs if you are after procedural / function-oriented design, and nouns if you are after object-oriented design.”' },
  { id: 'fc-5-5', chapterId: 'ch-05', front: 'How does state architecture differ between Function-Oriented Design and Object-Oriented Design?', back: 'Function-Oriented Design centralizes state in shared global data structures accessed by all functions. Object-Oriented Design distributes state into private, encapsulated fields inside distinct object instances.' },
  { id: 'fc-5-6', chapterId: 'ch-05', front: 'In the Fire-Alarm System case study, why does OOD exhibit superior maintainability over FOD?', back: 'In FOD, adding a new Smoke Sensor forces modifying and recompiling every centralized function. In OOD, a new SmokeSensor class is added polymorphically with zero modifications to existing code.' },

  // Chapter 6 / Module 6: Software Testing Fundamentals & Unit Testing
  { id: 'fc-6-1', chapterId: 'ch-06', front: 'What is the IEEE distinction between Error, Fault/Defect, and Failure?', back: 'Error is a human cognitive mistake. Fault (or Defect) is the static bug in the software code. Failure is the dynamic runtime deviation of observed program behavior from the specification.' },
  { id: 'fc-6-2', chapterId: 'ch-06', front: 'What is Barry Boehm’s classic definition of Verification vs. Validation?', back: 'Verification: “Are we building the product right?” (static reviews, inspections, conformance to specs). Validation: “Are we building the right product?” (dynamic execution of test cases against real user needs).' },
  { id: 'fc-6-3', chapterId: 'ch-06', front: 'What is the difference between a Driver and a Stub in unit testing?', back: 'A Driver sits ABOVE the module under test to call it, pass parameters, and verify outputs. A Stub sits BELOW the module under test to simulate missing subordinate routines by returning dummy mock responses.' },
  { id: 'fc-6-4', chapterId: 'ch-06', front: 'What is the difference between Equivalence Class Partitioning (ECP) and Boundary Value Analysis (BVA)?', back: 'ECP divides the input domain into valid and invalid partitions (one test case represents the whole class). BVA specifically tests values at boundaries (min, max, just below min, just above max) where defects cluster.' },
  { id: 'fc-6-5', chapterId: 'ch-06', front: 'Why must Unit Testing precede Integration Testing?', back: 'Testing modules in isolation narrows down the search space for bugs. If multiple untested modules are integrated at once, isolating the root cause of failures becomes a combinatorial nightmare.' },
];

export const getFlashcardsForChapter = (chapterId: string): Flashcard[] =>
  FLASHCARDS.filter((card) => card.chapterId === chapterId);
