import { Question } from '../types';

export const SYLLABUS_EXAM_QUESTIONS: Question[] = [
  {
    "id": "q-m1-01",
    "moduleId": "mod-1",
    "type": "true_false",
    "question": "Software engineering principles are purely theoretical and derived strictly from mathematical theorems.",
    "correctAnswer": false,
    "explanation": "Many software engineering principles are empirical heuristics, guidelines, and best practices formulated from decades of past industry experience, rather than pure theoretical proofs.",
    "hint": "Recall the definition: a systematic collection of past experience arranged as methodologies."
  },
  {
    "id": "q-m1-02",
    "moduleId": "mod-1",
    "type": "mcq",
    "question": "According to the building construction analogy, why can an individual write a small toy program without software engineering, but not a large enterprise software product?",
    "options": [
      "Building a small garden wall relies on intuition with negligible failure cost, whereas a 50-story skyscraper requires structural engineering, formal blueprints, and load calculations to avoid catastrophic collapse.",
      "Toy programs use object-oriented languages while enterprise products only use assembly.",
      "Skyscrapers do not require testing, but small walls require continuous integration.",
      "Toy programs are always more complex than enterprise software systems."
    ],
    "correctAnswer": "Building a small garden wall relies on intuition with negligible failure cost, whereas a 50-story skyscraper requires structural engineering, formal blueprints, and load calculations to avoid catastrophic collapse.",
    "explanation": "A small script can be solved intuitively by one person. Large software products have exponentially increasing interactions ($O(N^2)$) and fatal failure risks, demanding formal engineering methods."
  },
  {
    "id": "q-m1-03",
    "moduleId": "mod-1",
    "type": "mcq",
    "question": "What is the primary mathematical reason that software development effort grows super-linearly with program size ($Effort = c \\cdot S^k, k > 1$)?",
    "options": [
      "The number of potential communication and interaction paths between N modules grows as O(N\u00b2).",
      "Compilers take exponential time to parse comments.",
      "Hardware speed decreases exponentially over time.",
      "The number of keyboard keystrokes decreases linearly."
    ],
    "correctAnswer": "The number of potential communication and interaction paths between N modules grows as O(N\u00b2).",
    "explanation": "For $N$ components, potential inter-component communication channels equal $N(N-1)/2 \\approx O(N^2)$, quickly exceeding human cognitive capacity ($7 \\pm 2$ chunks)."
  },
  {
    "id": "q-m1-04",
    "moduleId": "mod-1",
    "type": "mcq",
    "question": "Which two fundamental cognitive principles does Software Engineering utilize to tame problem complexity?",
    "options": [
      "Abstraction and Decomposition",
      "Compilation and Interpretation",
      "Overloading and Polymorphism",
      "GOTO jumps and Recursion"
    ],
    "correctAnswer": "Abstraction and Decomposition",
    "explanation": "Abstraction suppresses irrelevant details to focus on essentials; Decomposition divides a complex monolith into smaller, independently solvable modules."
  },
  {
    "id": "q-m1-05",
    "moduleId": "mod-1",
    "type": "mcq",
    "question": "What constitutes the majority of software lifetime expenditure in modern organizations?",
    "options": [
      "Maintenance (60% to 80% of total cost)",
      "Hardware purchasing (over 90%)",
      "Initial requirements gathering (under 5%)",
      "Compiling source code"
    ],
    "correctAnswer": "Maintenance (60% to 80% of total cost)",
    "explanation": "Over the life of a software system, maintenance accounts for 60%\u201380% of total costs, far eclipsing initial development expenses."
  },
  {
    "id": "q-m1-06",
    "moduleId": "mod-1",
    "type": "mcq",
    "question": "According to the B\u00f6hm-Jacopini Theorem (1966), which three constructs are mathematically sufficient to express any computable program logic?",
    "options": [
      "Sequence, Selection (if-else), and Iteration (while-do)",
      "Sequence, GOTO, and Subroutine call",
      "Recursion, Pointers, and Macros",
      "Threads, Semaphores, and Exceptions"
    ],
    "correctAnswer": "Sequence, Selection (if-else), and Iteration (while-do)",
    "explanation": "B\u00f6hm and Jacopini proved that any flowchart or computable algorithm can be transformed into a structured program using only Sequence, Selection, and Iteration."
  },
  {
    "id": "q-m1-07",
    "moduleId": "mod-1",
    "type": "true_false",
    "question": "In structured programming, every code block and control structure must obey the Single-Entry Single-Exit (SESE) property.",
    "correctAnswer": true,
    "explanation": "The SESE property guarantees that control enters a block at exactly one start node and leaves at exactly one exit node, eliminating arbitrary jumps and making static code analysis tractable."
  },
  {
    "id": "q-m1-08",
    "moduleId": "mod-1",
    "type": "short_answer",
    "question": "Complete the equation: Software Product = Source Code + Operating Procedures + Maintenance Support + _______?",
    "correctAnswer": "Documentation",
    "explanation": "A Software Product equals Source Code + Complete Documentation (SRS, SDD, User Manuals) + Operating Procedures + Maintenance Infrastructure."
  },
  {
    "id": "q-m2-01",
    "moduleId": "mod-2",
    "type": "mcq",
    "question": "Why is the Classical Waterfall Model described as an idealistic or theoretical model?",
    "options": [
      "It assumes zero human error and provides no feedback loops to revisit earlier phases when errors are uncovered.",
      "It is only applicable to quantum computers.",
      "It does not produce any documentation deliverables.",
      "It requires daily releases to production customers."
    ],
    "correctAnswer": "It assumes zero human error and provides no feedback loops to revisit earlier phases when errors are uncovered.",
    "explanation": "The Classical Waterfall model is purely sequential with no feedback paths, assuming requirements and design are executed with 100% perfection on the first pass."
  },
  {
    "id": "q-m2-02",
    "moduleId": "mod-2",
    "type": "mcq",
    "question": "What is the primary difference between the Classical Waterfall Model and the Iterative Waterfall Model?",
    "options": [
      "Iterative Waterfall incorporates feedback loops between adjacent phases to accommodate defect discovery and rework.",
      "Iterative Waterfall skips the requirements phase completely.",
      "Classical Waterfall uses agile sprints while Iterative does not.",
      "Iterative Waterfall does not allow testing."
    ],
    "correctAnswer": "Iterative Waterfall incorporates feedback loops between adjacent phases to accommodate defect discovery and rework.",
    "explanation": "Iterative Waterfall introduces feedback paths from downstream phases back to preceding phases so that defects identified later can trigger necessary rework."
  },
  {
    "id": "q-m2-03",
    "moduleId": "mod-2",
    "type": "mcq",
    "question": "What does the principle of 'Phase Containment of Errors' mandate?",
    "options": [
      "Errors should be identified and eliminated within the exact phase in which they originate.",
      "All errors must be ignored until the maintenance phase.",
      "Only the testing team is permitted to find errors.",
      "Phases should be skipped if errors occur."
    ],
    "correctAnswer": "Errors should be identified and eliminated within the exact phase in which they originate.",
    "explanation": "Phase containment minimizes defect leakage into downstream phases, preventing exponential escalation in rework costs."
  },
  {
    "id": "q-m2-04",
    "moduleId": "mod-2",
    "type": "mcq",
    "question": "According to Boehm's Cost Escalation Curve, approximately how much more expensive is it to fix a requirement error discovered during post-release maintenance compared to fixing it during the requirements phase?",
    "options": [
      "100x to 200x more expensive",
      "Equal cost (1x)",
      "Twice as expensive (2x)",
      "Ten times cheaper (0.1x)"
    ],
    "correctAnswer": "100x to 200x more expensive",
    "explanation": "A defect caught in requirements requires editing a document ($1\\times$). Caught in production, it requires code redesign, recompilation, re-testing, redeployment, and hotfix distribution ($100\\times-200\\times$)."
  },
  {
    "id": "q-m2-05",
    "moduleId": "mod-2",
    "type": "mcq",
    "question": "Which category of software maintenance accounts for the largest share (~50%) of all maintenance effort?",
    "options": [
      "Perfective Maintenance (adding new features and performance enhancements)",
      "Corrective Maintenance (bug fixing)",
      "Adaptive Maintenance (porting to new OS / hardware)",
      "Preventive Maintenance (refactoring)"
    ],
    "correctAnswer": "Perfective Maintenance (adding new features and performance enhancements)",
    "explanation": "Perfective maintenance (enhancing functionality based on user feedback) consumes ~50% of maintenance effort, followed by corrective (~20%) and adaptive (~20%)."
  },
  {
    "id": "q-m2-06",
    "moduleId": "mod-2",
    "type": "mcq",
    "question": "When is the Prototyping Model most strongly recommended?",
    "options": [
      "When customer requirements are vague, ill-defined, or involve novel interactive UI/UX.",
      "When requirements are 100% frozen and understood by all developers.",
      "When the project has zero risk and a short one-week deadline.",
      "When building batch processing scripts with no user interface."
    ],
    "correctAnswer": "When customer requirements are vague, ill-defined, or involve novel interactive UI/UX.",
    "explanation": "Building a rapid mockup enables customers to test and refine requirements before committing major capital to full-scale development."
  },
  {
    "id": "q-m2-07",
    "moduleId": "mod-2",
    "type": "mcq",
    "question": "Why is Boehm's Spiral Model called a 'meta-model'?",
    "options": [
      "It subsumes and incorporates other lifecycle models (Waterfall, Prototyping, Evolutionary) dynamically based on risk assessment in each iteration.",
      "It was developed by Meta (Facebook).",
      "It does not require human developers.",
      "It produces no code deliverables."
    ],
    "correctAnswer": "It subsumes and incorporates other lifecycle models (Waterfall, Prototyping, Evolutionary) dynamically based on risk assessment in each iteration.",
    "explanation": "The Spiral Model evaluates risk in Quadrant 2; low-risk increments may use Waterfall, whereas high-risk UI increments may trigger Prototyping, making it a meta-model."
  },
  {
    "id": "q-m2-08",
    "moduleId": "mod-2",
    "type": "mcq",
    "question": "In the Spiral Model diagram, what do the radial dimension (r) and angular dimension (\u03b8) represent?",
    "options": [
      "Radial distance represents cumulative cost incurred; Angular displacement represents phase completion progress.",
      "Radial distance represents code size; Angular displacement represents lines of comments.",
      "Radial distance represents developer salary; Angular displacement represents server speed.",
      "Radial distance represents number of bugs; Angular displacement represents customer meetings."
    ],
    "correctAnswer": "Radial distance represents cumulative cost incurred; Angular displacement represents phase completion progress.",
    "explanation": "As the spiral winds outward, radius $r$ measures cumulative financial expenditure, while angle $\\theta$ tracks advancement through the 4 quadrants."
  },
  {
    "id": "q-m3-01",
    "moduleId": "mod-4",
    "type": "mcq",
    "question": "What is the primary role of the System Analyst in requirements engineering?",
    "options": [
      "To act as a communication bridge translating vague business problems into structured technical specifications (SRS).",
      "To write low-level machine assembly code.",
      "To deploy cloud Kubernetes clusters.",
      "To purchase office furniture for developers."
    ],
    "correctAnswer": "To act as a communication bridge translating vague business problems into structured technical specifications (SRS).",
    "explanation": "System analysts understand the business domain and technical architecture, translating client needs into clear, unambiguous IEEE 830 SRS specifications."
  },
  {
    "id": "q-m3-02",
    "moduleId": "mod-4",
    "type": "mcq",
    "question": "Which of the following is NOT an IEEE 830 quality attribute of a well-formed SRS?",
    "options": [
      "Algorithmic Design Details (specifying database indexes and sorting algorithms)",
      "Unambiguous (exactly one semantic interpretation)",
      "Verifiable (quantifiable test pass/fail criteria)",
      "Traceable (backward and forward traceability to requirements)"
    ],
    "correctAnswer": "Algorithmic Design Details (specifying database indexes and sorting algorithms)",
    "explanation": "An SRS must specify WHAT the system should do, NOT HOW (design/algorithmic implementation details). Overspecification is a recognized anti-pattern."
  },
  {
    "id": "q-m3-03",
    "moduleId": "mod-4",
    "type": "mcq",
    "question": "In a formal 4-quadrant Decision Table, what are the four constituent sections?",
    "options": [
      "Condition Stub, Condition Entry, Action Stub, Action Entry",
      "Header, Body, Footer, Appendix",
      "Input Stream, Process Bubble, Data Store, Output Stream",
      "Class Name, Attributes, Methods, Visibility"
    ],
    "correctAnswer": "Condition Stub, Condition Entry, Action Stub, Action Entry",
    "explanation": "Top-left is Condition Stub, top-right is Condition Entry (Y/N/Don't Care), bottom-left is Action Stub, bottom-right is Action Entry (X/-)."
  },
  {
    "id": "q-m3-04",
    "moduleId": "mod-4",
    "type": "numerical",
    "question": "If a business policy has 4 binary independent conditions (each True or False), how many total rules are required in the decision table to guarantee exhaustive coverage?",
    "correctAnswer": "16",
    "explanation": "For $n$ independent binary conditions, total rule permutations = $2^n = 2^4 = 16$ rules."
  },
  {
    "id": "q-m3-05",
    "moduleId": "mod-4",
    "type": "mcq",
    "question": "In Hoare Logic axiomatic specifications, what does the triple {P} S {Q} assert?",
    "options": [
      "If precondition P holds before executing S, and S terminates, then postcondition Q is guaranteed to hold immediately after S.",
      "Statement S executes only if postcondition Q is false.",
      "Precondition P is converted into assembly statement S by Q.",
      "Program S will run infinitely in loop P."
    ],
    "correctAnswer": "If precondition P holds before executing S, and S terminates, then postcondition Q is guaranteed to hold immediately after S.",
    "explanation": "Hoare Triples represent partial correctness: Precondition $\\{P\\}$, Statement $S$, and Postcondition $\\{Q\\}$."
  },
  {
    "id": "q-m3-06",
    "moduleId": "mod-4",
    "type": "mcq",
    "question": "In the algebraic specification of an Abstract Data Type (ADT), how are operations categorized?",
    "options": [
      "Constructors (creators), Transformers (mutators), and Observers (inspectors)",
      "Variables, Functions, and Objects",
      "Public, Protected, and Private",
      "Iterators, Compilers, and Linkers"
    ],
    "correctAnswer": "Constructors (creators), Transformers (mutators), and Observers (inspectors)",
    "explanation": "Constructors create instances, transformers alter existing instances, and observers return values of external types (e.g. `isEmpty`, `top`)."
  },
  {
    "id": "q-m3-07",
    "moduleId": "mod-4",
    "type": "mcq",
    "question": "For a Stack ADT with operations newStack, push(s, x), pop(s), top(s), and isEmpty(s), what is the evaluation of pop(push(s, x))?",
    "options": [
      "s (the original stack before the push)",
      "x (the element pushed)",
      "error",
      "newStack()"
    ],
    "correctAnswer": "s (the original stack before the push)",
    "explanation": "By algebraic axiom: pushing an element $x$ onto stack $s$ and then immediately popping it leaves the stack in state $s$."
  },
  {
    "id": "q-m4-01",
    "moduleId": "mod-5",
    "type": "mcq",
    "question": "What is the primary difference between Cohesion and Coupling in software architecture?",
    "options": [
      "Cohesion measures functional relatedness within a single module (aim high); Coupling measures inter-module dependency (aim low).",
      "Cohesion measures network speed; Coupling measures disk storage.",
      "Coupling is internal to a function; Cohesion is external between servers.",
      "Both should be kept as low as possible."
    ],
    "correctAnswer": "Cohesion measures functional relatedness within a single module (aim high); Coupling measures inter-module dependency (aim low).",
    "explanation": "High Cohesion means a module focuses on one well-defined task; Low Coupling means modules are loosely connected, maximizing maintainability."
  },
  {
    "id": "q-m4-02",
    "moduleId": "mod-5",
    "type": "mcq",
    "question": "Which of the following represents the 7 levels of Cohesion in strict order from WORST to BEST?",
    "options": [
      "Coincidental < Logical < Temporal < Procedural < Communicational < Sequential < Functional",
      "Functional < Sequential < Communicational < Procedural < Temporal < Logical < Coincidental",
      "Coincidental < Temporal < Logical < Procedural < Functional < Sequential < Communicational",
      "Data < Stamp < Control < Common < Content < Functional < Sequential"
    ],
    "correctAnswer": "Coincidental < Logical < Temporal < Procedural < Communicational < Sequential < Functional",
    "explanation": "Coincidental is the lowest/worst (unrelated utilities); Functional is the highest/best (single well-defined mathematical or logical goal)."
  },
  {
    "id": "q-m4-03",
    "moduleId": "mod-5",
    "type": "mcq",
    "question": "A module called `startupInitialization()` that turns on hardware drivers, clears display screens, opens database connections, and resets logs exhibits what level of cohesion?",
    "options": [
      "Temporal Cohesion",
      "Functional Cohesion",
      "Coincidental Cohesion",
      "Logical Cohesion"
    ],
    "correctAnswer": "Temporal Cohesion",
    "explanation": "Operations are grouped together solely because they execute during the same time window (system startup), characteristic of Temporal Cohesion."
  },
  {
    "id": "q-m4-04",
    "moduleId": "mod-5",
    "type": "mcq",
    "question": "Which of the following represents the 6 levels of Coupling in strict order from WORST (tightest) to BEST (loosest)?",
    "options": [
      "Content > Common > Control > Stamp > Data > No Coupling",
      "Data > Stamp > Control > Common > Content > No Coupling",
      "Coincidental > Logical > Temporal > Procedural > Functional",
      "Common > Content > Stamp > Control > Data"
    ],
    "correctAnswer": "Content > Common > Control > Stamp > Data > No Coupling",
    "explanation": "Content coupling is worst (direct memory/code tampering); Common coupling shares globals; Data coupling is best practical (scalar arguments)."
  },
  {
    "id": "q-m4-05",
    "moduleId": "mod-5",
    "type": "mcq",
    "question": "Why is Common Coupling (sharing global variables among multiple modules) dangerous in software systems?",
    "options": [
      "Any module can corrupt shared state without trace, creating untraceable side-effects and making isolated unit testing nearly impossible.",
      "It uses too many CPU registers during compilation.",
      "It forces all modules to run in separate threads.",
      "It prevents functions from returning integers."
    ],
    "correctAnswer": "Any module can corrupt shared state without trace, creating untraceable side-effects and making isolated unit testing nearly impossible.",
    "explanation": "With global data, debugging becomes difficult because determining which module modified the global state improperly requires auditing every single module."
  },
  {
    "id": "q-m4-06",
    "moduleId": "mod-5",
    "type": "mcq",
    "question": "In a Structure Chart, what do an open circle arrow (\u25cb\u2192) and a solid/filled circle arrow (\u25cf\u2192) signify?",
    "options": [
      "Open circle represents a Data Couple; Solid circle represents a Control Couple (flag/status).",
      "Open circle represents an infinite loop; Solid circle represents program termination.",
      "Open circle is a database read; Solid circle is a network packet.",
      "Both represent identical GOTO jumps."
    ],
    "correctAnswer": "Open circle represents a Data Couple; Solid circle represents a Control Couple (flag/status).",
    "explanation": "Data couples pass pure data parameters; control couples pass flags that dictate branching logic in the invoked routine."
  },
  {
    "id": "q-m4-07",
    "moduleId": "mod-5",
    "type": "mcq",
    "question": "What is the recommended design heuristic for Fan-In and Fan-Out in module structure charts?",
    "options": [
      "Aim for High Fan-In (promotes code reuse) and Moderate Fan-Out (ideally 5 \u00b1 2 to prevent cognitive overload).",
      "Aim for Zero Fan-In and High Fan-Out (> 20).",
      "Both Fan-In and Fan-Out must equal exactly 1.",
      "Fan-In should always be strictly lower than Fan-Out."
    ],
    "correctAnswer": "Aim for High Fan-In (promotes code reuse) and Moderate Fan-Out (ideally 5 \u00b1 2 to prevent cognitive overload).",
    "explanation": "High Fan-In indicates a module is widely reused. Fan-Out should be bounded around $7 \\pm 2$ to maintain manageable span of control."
  },
  {
    "id": "q-m5-01",
    "moduleId": "mod-5",
    "type": "mcq",
    "question": "According to Grady Booch's dictum, how do Function-Oriented Design (FOD) and Object-Oriented Design (OOD) view the primary organizational structure of software?",
    "options": [
      "FOD organizes software around functions (subroutines) with data secondary, whereas OOD organizes software around autonomous entities (objects) encapsulating state and operations.",
      "FOD is purely for embedded systems while OOD is strictly for cloud web applications.",
      "FOD encapsulates state inside classes, while OOD relies exclusively on global centralized data structures.",
      "FOD eliminates functions entirely in favor of database triggers, while OOD eliminates data."
    ],
    "correctAnswer": "FOD organizes software around functions (subroutines) with data secondary, whereas OOD organizes software around autonomous entities (objects) encapsulating state and operations.",
    "explanation": "In FOD, the primary building blocks are subroutines/functions that operate on shared or passed data. In OOD, the fundamental units are objects that encapsulate data together with the operations operating on that data."
  },
  {
    "id": "q-m5-02",
    "moduleId": "mod-5",
    "type": "mcq",
    "question": "In the Fire-Alarm System design comparison, why does the Function-Oriented Design (FOD) struggle when a new sensor type (e.g., Smoke Detector alongside Heat Detector) is introduced?",
    "options": [
      "The central controller's interrogator and processor functions must be modified and recompiled because logic is centralized by action rather than device type.",
      "FOD does not allow hardware communication or polling loops.",
      "FOD requires that every sensor be implemented as a separate microservice.",
      "FOD cannot read analog signals from electrical sensors."
    ],
    "correctAnswer": "The central controller's interrogator and processor functions must be modified and recompiled because logic is centralized by action rather than device type.",
    "explanation": "In FOD, adding a new sensor requires modifying every centralized function that handles sensors (e.g. Interrogate(), SoundAlarm()). In OOD, a new Sensor subclass can be added polymorphically without modifying existing classes."
  },
  {
    "id": "q-m5-03",
    "moduleId": "mod-6",
    "type": "mcq",
    "question": "In unit testing, what is the key difference between a Test Driver and a Test Stub?",
    "options": [
      "A Driver simulates a calling module (calls the unit under test), while a Stub simulates a called module (called by the unit under test).",
      "A Driver is used only in system testing, while a Stub is used only in acceptance testing.",
      "A Driver simulates database failure, while a Stub replaces the entire operating system.",
      "A Driver is written in machine code, while a Stub is written in Python."
    ],
    "correctAnswer": "A Driver simulates a calling module (calls the unit under test), while a Stub simulates a called module (called by the unit under test).",
    "explanation": "A driver acts as the dummy main program sending test cases into the module under test. A stub provides dummy responses when the module under test calls subordinate subroutines."
  },
  {
    "id": "q-m5-04",
    "moduleId": "mod-6",
    "type": "mcq",
    "question": "Which sequence correctly captures the causal chain from human mistake to observable dynamic breakdown?",
    "options": [
      "Error (human mistake in code/design) \u2192 Fault/Defect (static bug in artifact) \u2192 Failure (dynamic manifestation during execution).",
      "Failure \u2192 Fault \u2192 Error.",
      "Defect \u2192 Failure \u2192 Error.",
      "Bug \u2192 Crash \u2192 Human mistake."
    ],
    "correctAnswer": "Error (human mistake in code/design) \u2192 Fault/Defect (static bug in artifact) \u2192 Failure (dynamic manifestation during execution).",
    "explanation": "An Error is a human cognitive mistake. It introduces a Fault (static defect) into the source code or design. When that code is executed under conditions triggering the fault, a Failure (runtime deviation from expected behavior) occurs."
  },
  {
    "id": "q-m5-05",
    "moduleId": "mod-6",
    "type": "mcq",
    "question": "How does Barry Boehm succinctly distinguish between 'Verification' and 'Validation'?",
    "options": [
      "Verification: 'Are we building the product right?' | Validation: 'Are we building the right product?'",
      "Verification: 'Is the product cheap?' | Validation: 'Is the product fast?'",
      "Verification: 'Did we write unit tests?' | Validation: 'Did we run them on Linux?'",
      "Verification: 'Are we building the right product?' | Validation: 'Are we building the product right?'"
    ],
    "correctAnswer": "Verification: 'Are we building the product right?' | Validation: 'Are we building the right product?'",
    "explanation": "Verification checks adherence to phase specifications (syntax, design rules, static analysis). Validation checks adherence to the actual user needs and operational goals."
  },
  {
    "id": "q-m5-06",
    "moduleId": "mod-3",
    "type": "mcq",
    "question": "In modern software engineering economics, what proportion of total life cycle software effort/cost is spent on Maintenance versus initial Development?",
    "options": [
      "Approximately 60% or more on Maintenance, with 40% or less on initial Development.",
      "Approximately 90% on initial Development and 10% on Maintenance.",
      "Exactly 50% Development and 50% Maintenance across all domains.",
      "99% on Hardware purchasing and 1% on Maintenance."
    ],
    "correctAnswer": "Approximately 60% or more on Maintenance, with 40% or less on initial Development.",
    "explanation": "Extensive empirical studies (Boehm, Lientz & Swanson, Rajib Mall) show that maintenance consumes roughly 60% to 80% of total life cycle costs, with development accounting for only 20% to 40%."
  },
  {
    "id": "q-m5-07",
    "moduleId": "mod-1",
    "type": "mcq",
    "question": "What is the primary role of Backward (or Reverse) Traceability in a Requirement Traceability Matrix (RTM)?",
    "options": [
      "To verify that every design component and line of code traces back to an authorized customer requirement (detecting gold plating or unauthorized features).",
      "To enable developers to write code before requirements are approved.",
      "To automatically reverse-compile assembly code into high-level C++.",
      "To trace git commit hashes backwards to the previous release tag."
    ],
    "correctAnswer": "To verify that every design component and line of code traces back to an authorized customer requirement (detecting gold plating or unauthorized features).",
    "explanation": "Backward traceability links design components, code, and tests back to the SRS requirement that justified their existence, preventing extraneous features (gold plating) and unverified code."
  },
  {
    "id": "q-m3-qual-01",
    "moduleId": "mod-3",
    "type": "mcq",
    "question": "Why is 'fitness of purpose' an insufficient definition of Software Quality?",
    "options": [
      "A program may compute correct results but have an unusable UI or unmaintainable spaghetti code.",
      "Fitness of purpose applies only to mechanical appliances like ceiling fans, not software.",
      "Software quality is exclusively measured by execution speed in nanoseconds.",
      "Fitness of purpose ignores compiler warnings."
    ],
    "correctAnswer": "A program may compute correct results but have an unusable UI or unmaintainable spaghetti code.",
    "explanation": "In software engineering, functional correctness alone does not guarantee quality. A product that cannot be maintained, ported, or easily used fails modern quality criteria."
  },
  {
    "id": "q-m3-qual-02",
    "moduleId": "mod-3",
    "type": "mcq",
    "question": "According to the 40:60 Software Economics rule, what proportion of total lifetime expenditure is consumed by post-delivery Maintenance?",
    "options": [
      "At least 60% (with development accounting for <= 40%).",
      "Exactly 10% (development is 90%).",
      "50% development and 50% maintenance in all domains.",
      "Less than 5% if using Agile methodologies."
    ],
    "correctAnswer": "At least 60% (with development accounting for <= 40%).",
    "explanation": "Extensive empirical research (Boehm, Lientz & Swanson) demonstrates that maintenance accounts for >60% of total lifetime software cost."
  },
  {
    "id": "q-m3-qual-03",
    "moduleId": "mod-3",
    "type": "mcq",
    "question": "Which three sub-characteristics form the core pillars of Software Maintainability?",
    "options": [
      "Understandability, Modifiability, and Testability",
      "Speed, Memory Footprint, and Battery Consumption",
      "Compilation Time, LOC, and Function Count",
      "Encryption Key Length, HTTPS, and Firewalls"
    ],
    "correctAnswer": "Understandability, Modifiability, and Testability",
    "explanation": "Maintainability depends on how easily maintainers can understand the logic, modify code without ripple effects, and re-test changes."
  },
  {
    "id": "q-m3-qual-04",
    "moduleId": "mod-3",
    "type": "mcq",
    "question": "How does a Portability Interface or Hardware Abstraction Layer (HAL) enable software portability?",
    "options": [
      "By isolating machine-dependent device drivers and OS system calls into a thin boundary layer.",
      "By automatically compiling C++ code into Java bytecode at runtime.",
      "By running all applications inside web browsers exclusively.",
      "By eliminating the need for operating systems entirely."
    ],
    "correctAnswer": "By isolating machine-dependent device drivers and OS system calls into a thin boundary layer.",
    "explanation": "A portability interface isolates hardware and OS specifics to <5% of the codebase, allowing the remaining 95%+ of application code to run unchanged across platforms."
  },
  {
    "id": "q-m3-qual-05",
    "moduleId": "mod-3",
    "type": "mcq",
    "question": "In McCall's Quality Factor Model, under which category does Portability fall?",
    "options": [
      "Product Transition",
      "Product Operation",
      "Product Revision",
      "Product Feasibility"
    ],
    "correctAnswer": "Product Transition",
    "explanation": "McCall partitions quality into: Product Operation (correctness, reliability, usability), Product Revision (maintainability, flexibility, testability), and Product Transition (portability, reusability, interoperability)."
  },
  {
    "id": "q-m6-test-01",
    "moduleId": "mod-6",
    "type": "mcq",
    "question": "What is Glenford Myers' classic maxim regarding the primary goal of software testing?",
    "options": [
      "Testing is the process of executing a program with the deliberate intent of finding errors, not showing it works.",
      "Testing proves mathematically that zero bugs exist in the software.",
      "Testing is performed solely to satisfy client contract clauses.",
      "Testing should only be executed by end-users in production."
    ],
    "correctAnswer": "Testing is the process of executing a program with the deliberate intent of finding errors, not showing it works.",
    "explanation": "Glenford Myers formulated that a successful test case is one that uncovers an undiscovered defect. If testing aimed only to show the program works, testers would subconsciously select inputs that avoid triggering bugs."
  },
  {
    "id": "q-m6-test-02",
    "moduleId": "mod-6",
    "type": "mcq",
    "question": "Why must Unit Testing strictly precede Integration Testing?",
    "options": [
      "Testing modules in isolation narrows down the search space for bugs, preventing combinatorial debugging complexity.",
      "Unit testing is performed by managers while integration is done by developers.",
      "Compilers refuse to link modules before unit tests pass.",
      "Unit testing tests the database while integration testing tests the UI."
    ],
    "correctAnswer": "Testing modules in isolation narrows down the search space for bugs, preventing combinatorial debugging complexity.",
    "explanation": "When units are thoroughly verified in isolation, any bug discovered during integration can be attributed directly to interface mismatches between modules."
  },
  {
    "id": "q-m6-test-03",
    "moduleId": "mod-6",
    "type": "mcq",
    "question": "In black-box testing, why is Boundary Value Analysis (BVA) considered superior to random test data generation?",
    "options": [
      "Empirical evidence demonstrates that programming defects cluster predominantly at the boundaries of input domains.",
      "Boundary values are faster for CPUs to compute than middle values.",
      "BVA eliminates the need for unit testing.",
      "BVA tests only negative numbers."
    ],
    "correctAnswer": "Empirical evidence demonstrates that programming defects cluster predominantly at the boundaries of input domains.",
    "explanation": "Programmers frequently make off-by-one errors (< vs <=, > vs >=). BVA targets these exact boundary conditions (min-1, min, min+1, max-1, max, max+1)."
  }
];