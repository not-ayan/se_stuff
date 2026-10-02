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

  // Chapter 3 / Module 3: Requirements Analysis & Specification (SRS)
  { id: 'fc-3-1', chapterId: 'ch-03', front: 'What are the primary responsibilities of a System Analyst?', back: 'Eliciting requirements from customers and users, resolving ambiguities/contradictions, analyzing feasibility, and authoring the formal SRS document.' },
  { id: 'fc-3-2', chapterId: 'ch-03', front: 'What are the two most common defects found in customer requirements?', back: 'Inconsistency (contradictory requirements) and Incompleteness (missing operational scenarios or unhandled edge cases).' },
  { id: 'fc-3-3', chapterId: 'ch-03', front: 'What are the essential properties of a good SRS (IEEE 830 standard)?', back: 'Concise, Complete, Consistent, Unambiguous, Verifiable, Modifiable, Traceable, and specifies WHAT the system should do, NOT HOW.' },
  { id: 'fc-3-4', chapterId: 'ch-03', front: 'When are Decision Tables preferred over Decision Trees?', back: 'When complex logic involves many combinations of boolean conditions with overlapping actions. Decision tables prevent missing combinations through exhaustive 2ⁿ rule columns.' },
  { id: 'fc-3-5', chapterId: 'ch-03', front: 'What is an Axiomatic Specification (Hoare Triple)?', back: 'Specifies operations using Preconditions and Postconditions: {P} S {Q}. If precondition P holds before executing program S, postcondition Q is guaranteed to hold after termination.' },
  { id: 'fc-3-6', chapterId: 'ch-03', front: 'What are the four components of an Algebraic Specification?', back: '1. Types/Sorts, 2. Syntax/Signatures of Operations, 3. Operations classification (constructors and inspectors), 4. Axioms/Equations defining behavior.' },

  // Chapter 4 / Module 4: Software Design, Cohesion & Coupling
  { id: 'fc-4-1', chapterId: 'ch-04', front: 'What is the full ranking of Cohesion from WORST to BEST?', back: '1. Coincidental (Worst) → 2. Logical → 3. Temporal → 4. Procedural → 5. Communicational → 6. Sequential → 7. Functional (Best: performs exactly one dedicated task).' },
  { id: 'fc-4-2', chapterId: 'ch-04', front: 'What is the full ranking of Coupling from BEST to WORST?', back: '1. Data (Best: passes simple scalar parameters) → 2. Stamp (passes entire data structure) → 3. Control (passes flags dictating execution) → 4. Common (shares global variables) → 5. Content (Worst: one module modifies internal data/code of another).' },
  { id: 'fc-4-3', chapterId: 'ch-04', front: 'What are Fan-In and Fan-Out in Structure Charts and their recommended rules?', back: 'Fan-Out: Number of modules directly called by a module (keep ≤ 7 ± 2). High fan-out suggests low cohesion. Fan-In: Number of modules calling this module (high fan-in is good because it indicates code reuse).' },
  { id: 'fc-4-4', chapterId: 'ch-04', front: 'Transform Analysis vs Transaction Analysis in Structured Design?', back: 'Transform Analysis maps linear input-process-output pipelines with a central transform. Transaction Analysis handles systems where an input transaction tag dispatches execution to one of several distinct operational paths.' },

  // Chapter 5 & 6 / Modules 5 & 6: DFD Theory, Rules & Solved Practice
  { id: 'fc-5-1', chapterId: 'ch-04', front: 'What are the four standard symbols used in Data Flow Diagrams?', back: '1. Process / Bubble (Circle): transforms data. 2. External Entity (Rectangle): source or sink outside system boundary. 3. Data Store (Two parallel lines / open rectangle): data repository. 4. Data Flow (Directed Arrow): pipeline of moving data.' },
  { id: 'fc-5-2', chapterId: 'ch-05', front: 'What are the critical rules of a Context Diagram (Level 0 DFD)?', back: 'The entire system is represented as EXACTLY ONE bubble (Bubble 0), surrounded by External Entities and major I/O data flows. NO data stores are permitted at Level 0.' },
  { id: 'fc-5-3', chapterId: 'ch-05', front: 'What is the DFD Balancing Rule?', back: 'All incoming and outgoing data flows to a bubble at Level N must be preserved and match the external data flows entering and leaving its decomposed sub-diagram at Level N+1.' },
  { id: 'fc-5-4', chapterId: 'ch-05', front: 'What are the illegal connections in a DFD?', back: '1. Entity to Entity (outside system scope). 2. Store to Store (cannot move data without a process). 3. Entity to Store (must pass through a process). 4. Black Hole (process with only inputs, no output). 5. Miracle (process with only outputs, no input).' },
  { id: 'fc-5-5', chapterId: 'ch-05', front: 'What operators are used in a Data Dictionary?', back: '+ (Sequence / Composition), [ | ] (Selection / Choice), { } (Iteration / Repetition), ( ) (Optional field), * * (Comment / Descriptive annotation).' },
  { id: 'fc-6-1', chapterId: 'ch-06', front: 'In the Trading House (RMS) DFD tutorial, what are the Level 1 bubbles?', back: '0.1 Accept-Order (validates customer order), 0.2 Process-Order (checks inventory & generates invoices), 0.3 Handle-Query (reports order status), 0.4 Handle-Indent-Request (creates vendor reorders when stock is low).' },
  { id: 'fc-6-2', chapterId: 'ch-06', front: 'What is the standard procedure to draw a DFD from an informal problem statement?', back: '1. Identify system boundaries & External Entities. 2. Draw Context Diagram (Level 0). 3. Identify candidate high-level functions (verbs) and data stores (nouns). 4. Construct Level 1 DFD. 5. Decompose complex bubbles into Level 2. 6. Verify flow balancing and write the Data Dictionary.' },
];

export const getFlashcardsForChapter = (chapterId: string): Flashcard[] =>
  FLASHCARDS.filter((card) => card.chapterId === chapterId);
