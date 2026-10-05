import { Question } from '../types';

export const EXAM_QUESTIONS: Question[] = [
  // ============================================================================
  // Module 1: Introduction to Software Engineering
  // ============================================================================
  {
    id: 'q-1-1',
    moduleId: 'mod-1',
    type: 'true_false',
    question: 'All software engineering principles are backed by either scientific basis or theoretical proof.',
    correctAnswer: false,
    explanation: 'Many software engineering principles are empirical rules of thumb, heuristics, and best practices derived from decades of practical experience, rather than formal mathematical proofs.',
    hint: 'Think about thumb rules vs scientific laws.'
  },
  {
    id: 'q-1-2',
    moduleId: 'mod-1',
    type: 'true_false',
    question: 'There are well-defined steps through which a problem is solved using an exploratory programming style.',
    correctAnswer: false,
    explanation: 'Exploratory programming is intuitive and ad-hoc without formal, disciplined steps. It is based on error correction rather than error prevention.',
    hint: 'How did 1950s programmers work?'
  },
  {
    id: 'q-1-3',
    moduleId: 'mod-1',
    type: 'mcq',
    question: 'Which of the following problems can be considered to be contributing to the present software crisis?',
    options: [
      'Large problem size',
      'Shortage of skilled manpower',
      'Lack of rapid progress in software engineering techniques compared to hardware',
      'All of the above'
    ],
    correctAnswer: 'All of the above',
    explanation: 'Increasing problem complexity, manpower skill shortage, and low software productivity improvements are the key drivers of the software crisis.'
  },
  {
    id: 'q-1-4',
    moduleId: 'mod-1',
    type: 'mcq',
    question: 'Which of the following are the three essential program constructs proved sufficient to express any programming logic?',
    options: [
      'Sequence, Selection, and Iteration',
      'Sequence, Jump, and Recursion',
      'Selection, GOTO, and Subroutine',
      'Iteration, GOTO, and Branch'
    ],
    correctAnswer: 'Sequence, Selection, and Iteration',
    explanation: 'Dijkstra (1968) and the structured programming theorem proved that sequence, selection (if-then-else), and iteration (loops) are sufficient for any program logic.'
  },
  {
    id: 'q-1-5',
    moduleId: 'mod-1',
    type: 'short_answer',
    question: 'Identify the two important techniques that software engineering uses to tackle the exponential growth of problem complexity with its size.',
    correctAnswer: 'Abstraction and Decomposition',
    explanation: 'Abstraction suppresses irrelevant details to solve a simpler model first. Decomposition divides a complex problem into smaller parts that can be solved independently with minimal interaction.'
  },
  {
    id: 'q-1-6',
    moduleId: 'mod-1',
    type: 'mcq',
    question: 'What is the primary objective of backward requirement traceability in a Requirements Traceability Matrix (RTM)?',
    options: [
      'To ensure that each requirement is implemented by at least one code module',
      'To prevent gold-plating by verifying that every code component traces back to a valid requirement',
      'To estimate the cost of future maintenance releases',
      'To automatically generate compiler bytecode'
    ],
    correctAnswer: 'To prevent gold-plating by verifying that every code component traces back to a valid requirement',
    explanation: 'Backward traceability traces from code/tests back to requirements, guaranteeing that no developer has added unrequested extraneous code (gold-plating).'
  },

  // ============================================================================
  // Module 2: Software Life Cycle Models
  // ============================================================================
  {
    id: 'q-2-1',
    moduleId: 'mod-2',
    type: 'mcq',
    question: 'Among the development phases of the software life cycle, which phase typically consumes the maximum effort?',
    options: ['Requirements Analysis', 'Design', 'Coding', 'Testing'],
    correctAnswer: 'Testing',
    explanation: 'Testing consumes roughly 18-20% of effort, which is the highest among all development phases (Coding is ~15%, Design is ~12%).'
  },
  {
    id: 'q-2-2',
    moduleId: 'mod-2',
    type: 'mcq',
    question: 'Among all phases of the entire software life cycle (development + post-delivery), which phase consumes the maximum effort?',
    options: ['Design', 'Coding', 'Testing', 'Maintenance'],
    correctAnswer: 'Maintenance',
    explanation: 'Maintenance consumes about 60% of total lifecycle cost/effort (the development to maintenance ratio is typically 40:60).'
  },
  {
    id: 'q-2-3',
    moduleId: 'mod-2',
    type: 'mcq',
    question: 'Which development phase in the classical waterfall life cycle immediately follows the coding phase?',
    options: ['Design', 'Integration and System Testing', 'Maintenance', 'Acceptance Testing'],
    correctAnswer: 'Integration and System Testing',
    explanation: 'After coding and unit testing is completed, the modules are integrated and tested together during integration & system testing.'
  },
  {
    id: 'q-2-4',
    moduleId: 'mod-2',
    type: 'true_false',
    question: 'The Evolutionary life cycle model is ideally suited for development of very small software products typically requiring a few months of effort.',
    correctAnswer: false,
    explanation: 'The evolutionary model is best suited for very large projects that can be cleanly decomposed into successive increments for delivery.'
  },
  {
    id: 'q-2-5',
    moduleId: 'mod-2',
    type: 'true_false',
    question: 'The Prototyping life cycle model is the most suitable one for undertaking a software development project susceptible to schedule slippage.',
    correctAnswer: false,
    explanation: 'Prototyping is specifically suited when user requirements or underlying technical solutions are unclear, not for schedule slippage.'
  },
  {
    id: 'q-2-6',
    moduleId: 'mod-2',
    type: 'mcq',
    question: 'Why is Barry Boehm\'s Spiral Model referred to as a "meta-model"?',
    options: [
      'Because it is only used for artificial intelligence projects',
      'Because it encompasses and subsumes all other life cycle models within its framework',
      'Because it requires no project management',
      'Because it eliminates the need for testing'
    ],
    correctAnswer: 'Because it encompasses and subsumes all other life cycle models within its framework',
    explanation: 'A single loop of the spiral mirrors the waterfall steps; prototyping is used for risk reduction in quadrant 2; and successive loops deliver evolutionary increments.'
  },

  // ============================================================================
  // Module 3: Software Quality (Maintainability & Portability)
  // ============================================================================
  {
    id: 'q-3-1',
    moduleId: 'mod-3',
    type: 'true_false',
    question: 'Software maintainability accounts for approximately 60% of the total life cycle expenditure across typical enterprise software products.',
    correctAnswer: true,
    explanation: 'The classic software economics ratio is 40% development vs 60% maintenance, demonstrating that maintenance dominates lifetime cost.'
  },
  {
    id: 'q-3-2',
    moduleId: 'mod-3',
    type: 'mcq',
    question: 'Which three sub-attributes constitute the core pillars of Software Maintainability?',
    options: [
      'Speed, Concurrency, and Bandwidth',
      'Understandability, Modifiability, and Testability',
      'Encryption, Authorization, and Non-repudiation',
      'Compression, Compilation, and Execution'
    ],
    correctAnswer: 'Understandability, Modifiability, and Testability',
    explanation: 'Maintainability requires that code can be easily understood by new engineers, modified safely without ripple effects, and retested thoroughly.'
  },
  {
    id: 'q-3-3',
    moduleId: 'mod-3',
    type: 'true_false',
    question: 'Empirical studies prove that code commenting is more useful for program understanding than using meaningful variable names.',
    correctAnswer: false,
    explanation: 'Careful empirical studies show that meaningful variable names and clean identifiers are significantly more effective than code comments for maintainability.'
  },
  {
    id: 'q-3-4',
    moduleId: 'mod-3',
    type: 'true_false',
    question: 'Portability is defined as the ease with which a software program can be transferred from one hardware or operating system environment to another without extensive code rewrites.',
    correctAnswer: true,
    explanation: 'Portability is preserved by isolating machine-dependent logic into a dedicated hardware-abstraction layer or interface (portability interface).'
  },
  {
    id: 'q-3-5',
    moduleId: 'mod-3',
    type: 'mcq',
    question: 'How does an Abstract Machine or Hardware Abstraction Layer (HAL) enhance software portability?',
    options: [
      'It isolates all machine-dependent device drivers and OS calls behind a standardized interface',
      'It automatically converts code into assembly at runtime',
      'It eliminates the need for unit testing',
      'It duplicates the source code for every target CPU'
    ],
    correctAnswer: 'It isolates all machine-dependent device drivers and OS calls behind a standardized interface',
    explanation: 'A HAL/portability interface confines hardware-specific device registers and OS syscalls to a thin layer, allowing application business logic to recompile without modification.'
  },
  {
    id: 'q-3-6',
    moduleId: 'mod-3',
    type: 'true_false',
    question: 'Software maintenance process model 1 (direct code patch) is preferable over reengineering when the percentage of rework is greater than 15%.',
    correctAnswer: false,
    explanation: 'Empirical studies show that Process 1 is preferred when rework is <= 15%. Above 15% rework, Process 2 (Reengineering) is more cost-effective.'
  },

  // ============================================================================
  // Module 4: Requirements Analysis & Specification
  // ============================================================================
  {
    id: 'q-4-1',
    moduleId: 'mod-4',
    type: 'true_false',
    question: 'Functional requirements address maintainability, portability, and usability issues.',
    correctAnswer: false,
    explanation: 'Maintainability, portability, and usability are Non-Functional Requirements. Functional requirements describe input-to-output behavioral transformations.'
  },
  {
    id: 'q-4-2',
    moduleId: 'mod-4',
    type: 'true_false',
    question: 'In a decision tree, the edges represent the actions to be performed.',
    correctAnswer: false,
    explanation: 'In a decision tree, edges represent tested conditions/decisions; leaf nodes represent the resulting actions.'
  },
  {
    id: 'q-4-3',
    moduleId: 'mod-4',
    type: 'true_false',
    question: 'A column in a decision table is called a rule.',
    correctAnswer: true,
    explanation: 'Each column specifies a combination of condition values and the corresponding action to execute, which constitutes one complete rule.'
  },
  {
    id: 'q-4-4',
    moduleId: 'mod-4',
    type: 'true_false',
    question: 'Homogeneous algebra is a collection of different sets on which several operations are defined.',
    correctAnswer: false,
    explanation: 'A homogeneous algebra consists of a single set and operations. A collection of different sets (sorts) is called a heterogeneous algebra.'
  },
  {
    id: 'q-4-5',
    moduleId: 'mod-4',
    type: 'true_false',
    question: 'Pre-conditions of axiomatic specifications state the requirements on the parameters of the function before it can start executing.',
    correctAnswer: true,
    explanation: 'Preconditions define the valid input domain and state requirements that must hold before invocation.'
  },
  {
    id: 'q-4-6',
    moduleId: 'mod-4',
    type: 'numerical',
    question: 'In an algebraic specification for an ADT with 2 basic constructors, 1 extra constructor, 2 basic inspectors, and 0 extra inspectors, what is the minimum number of rewrite axioms required?',
    correctAnswer: 6,
    explanation: 'Using the formula m1 * (m2 + n1) + n2: 2 * (1 + 2) + 0 = 6 equations.'
  },

  // ============================================================================
  // Module 5: Software Design (Modularity & FOD vs OOD)
  // ============================================================================
  {
    id: 'q-5-1',
    moduleId: 'mod-5',
    type: 'mcq',
    question: 'Which of the following is the most desirable (highest quality) type of cohesion?',
    options: ['Logical cohesion', 'Sequential cohesion', 'Communicational cohesion', 'Functional cohesion'],
    correctAnswer: 'Functional cohesion',
    explanation: 'Functional cohesion is the highest and best form: every element in the module directly cooperates to achieve a single, well-defined task.'
  },
  {
    id: 'q-5-2',
    moduleId: 'mod-5',
    type: 'mcq',
    question: 'Which of the following represents the loosest (most desirable) coupling between two modules?',
    options: ['Data coupling', 'Stamp coupling', 'Control coupling', 'Common coupling'],
    correctAnswer: 'Data coupling',
    explanation: 'Data coupling is the loosest and best: modules interact solely by passing elementary data items (e.g., an integer or float).'
  },
  {
    id: 'q-5-3',
    moduleId: 'mod-5',
    type: 'true_false',
    question: 'In Object-Oriented Design (OOD), state information is encapsulated within individual objects rather than held in shared global stores.',
    correctAnswer: true,
    explanation: 'OOD treats objects as autonomous encapsulations of both state variables and associated methods, preventing uncontrolled global side effects.'
  },
  {
    id: 'q-5-4',
    moduleId: 'mod-5',
    type: 'mcq',
    question: 'In the Fire-Alarm System case study, which design approach localizes changes when a new Smoke Sensor is added?',
    options: ['Object-Oriented Design (OOD)', 'Function-Oriented Design (FOD)', 'Exploratory programming', 'Classical Waterfall'],
    correctAnswer: 'Object-Oriented Design (OOD)',
    explanation: 'In OOD, a new Sensor class inherits from a base Sensor abstraction; existing controller and alarm methods do not require modification.'
  },
  {
    id: 'q-5-5',
    moduleId: 'mod-5',
    type: 'mcq',
    question: 'In a Structure Chart, a module drawn with double vertical edges represents:',
    options: ['A root module', 'A library module', 'A control module', 'A recursive module'],
    correctAnswer: 'A library module',
    explanation: 'A rectangle with double side edges denotes a pre-existing reusable library module.'
  },
  {
    id: 'q-5-6',
    moduleId: 'mod-5',
    type: 'mcq',
    question: 'What is the fundamental difference between FOD and OOD according to Grady Booch?',
    options: [
      'FOD decomposes systems around procedural steps; OOD decomposes systems around real-world autonomous abstractions',
      'FOD is only written in assembly; OOD is written in HTML',
      'FOD allows inheritance; OOD does not',
      'There is no architectural difference between them'
    ],
    correctAnswer: 'FOD decomposes systems around procedural steps; OOD decomposes systems around real-world autonomous abstractions',
    explanation: 'FOD focuses on the transformation of data through sequential functions, while OOD models the application domain directly via encapsulated objects.'
  },

  // ============================================================================
  // Module 6: Software Testing Fundamentals & Unit Testing
  // ============================================================================
  {
    id: 'q-6-1',
    moduleId: 'mod-6',
    type: 'true_false',
    question: 'During code inspection, developers detect errors/faults, whereas during program execution testing, they detect failures.',
    correctAnswer: true,
    explanation: 'Inspection directly examines static code to find defects (faults); dynamic execution reveals failures (deviations from expected output).'
  },
  {
    id: 'q-6-2',
    moduleId: 'mod-6',
    type: 'mcq',
    question: 'According to Glenford Myers, what is the proper definition of software testing?',
    options: [
      'The process of demonstrating that no errors are present in a program',
      'The process of executing a program with the explicit intent of finding errors',
      'The process of writing exhaustive documentation for end users',
      'The process of verifying that code compiles without warnings'
    ],
    correctAnswer: 'The process of executing a program with the explicit intent of finding errors',
    explanation: 'Myers\' Maxim states that testing with the presumption that a program works is a psychological anti-pattern; testing succeeds when it exposes latent faults.'
  },
  {
    id: 'q-6-3',
    moduleId: 'mod-6',
    type: 'mcq',
    question: 'Which test scaffolding component is designed to simulate a subordinate routine called by the module under test?',
    options: ['Test Driver', 'Test Stub', 'Test Suite', 'Test Oracle'],
    correctAnswer: 'Test Stub',
    explanation: 'A stub replaces a called lower-level module (callee) with a canned mock response, isolating the unit under test from subordinate dependencies.'
  },
  {
    id: 'q-6-4',
    moduleId: 'mod-6',
    type: 'mcq',
    question: 'Which test scaffolding component is designed to call the module under test and pass it test vectors?',
    options: ['Test Driver', 'Test Stub', 'Compiler', 'Debugger'],
    correctAnswer: 'Test Driver',
    explanation: 'A driver is dummy calling code that sets up input parameters, invokes the module under test, and records the returned results.'
  },
  {
    id: 'q-6-5',
    moduleId: 'mod-6',
    type: 'numerical',
    question: 'A program control flow graph has 7 edges and 6 nodes. What is its McCabe Cyclomatic Complexity V(G)?',
    correctAnswer: 3,
    explanation: 'V(G) = E - N + 2 = 7 - 6 + 2 = 3.'
  },
  {
    id: 'q-6-6',
    moduleId: 'mod-6',
    type: 'numerical',
    question: 'In an error seeding experiment, 25 artificial errors were seeded into a software module. Testing uncovered 20 of the seeded errors and 50 natural errors. What is the estimated total number of natural errors N?',
    correctAnswer: 62.5,
    explanation: 'n/N = s/S => N = S * n / s = 25 * 50 / 20 = 62.5 defects (or approx 63 defects).'
  },

  // ============================================================================
  // Module 7: Mid-Term Exam Mastery & Examiner Solution Bank
  // ============================================================================
  {
    id: 'q-7-1',
    moduleId: 'mod-7',
    type: 'mcq',
    question: 'Which combination of engineering practices most effectively mitigates the exponential cost explosion of late-phase defect correction?',
    options: [
      'Formal SRS review, Phase Containment, and automated Unit Testing with Stubs/Drivers',
      'Eliminating requirements documentation and writing code immediately',
      'Deferring all testing to the user acceptance phase',
      'Using exploratory programming without design charts'
    ],
    correctAnswer: 'Formal SRS review, Phase Containment, and automated Unit Testing with Stubs/Drivers',
    explanation: 'Catching defects early via formal reviews and phase containment prevents the 100x cost explosion of fixing requirements errors during post-delivery maintenance.'
  },
  {
    id: 'q-7-2',
    moduleId: 'mod-7',
    type: 'true_false',
    question: 'Verification answers "Are we building the product right?", while Validation answers "Are we building the right product?".',
    correctAnswer: true,
    explanation: 'Barry Boehm\'s distinction: Verification checks conformance to specification; Validation checks conformance to genuine user operational needs.'
  }
];
