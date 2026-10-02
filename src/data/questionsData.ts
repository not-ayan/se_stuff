import { Question } from '../types';

export const EXAM_QUESTIONS: Question[] = [
  // Module 1 Questions
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

  // Module 2 Questions
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

  // Module 3 Questions
  {
    id: 'q-3-1',
    moduleId: 'mod-3',
    type: 'true_false',
    question: 'Functional requirements address maintainability, portability, and usability issues.',
    correctAnswer: false,
    explanation: 'Maintainability, portability, and usability are Non-Functional Requirements. Functional requirements describe input-to-output behavioral transformations.'
  },
  {
    id: 'q-3-2',
    moduleId: 'mod-3',
    type: 'true_false',
    question: 'In a decision tree, the edges represent the actions to be performed.',
    correctAnswer: false,
    explanation: 'In a decision tree, edges represent tested conditions/decisions; leaf nodes represent the resulting actions.'
  },
  {
    id: 'q-3-3',
    moduleId: 'mod-3',
    type: 'true_false',
    question: 'A column in a decision table is called a rule.',
    correctAnswer: true,
    explanation: 'Each column specifies a combination of condition values and the corresponding action to execute, which constitutes one complete rule.'
  },
  {
    id: 'q-3-4',
    moduleId: 'mod-3',
    type: 'true_false',
    question: 'Homogeneous algebra is a collection of different sets on which several operations are defined.',
    correctAnswer: false,
    explanation: 'A homogeneous algebra consists of a single set and operations. A collection of different sets (sorts) is called a heterogeneous algebra.'
  },
  {
    id: 'q-3-5',
    moduleId: 'mod-3',
    type: 'true_false',
    question: 'Pre-conditions of axiomatic specifications state the requirements on the parameters of the function before it can start executing.',
    correctAnswer: true,
    explanation: 'Preconditions define the valid input domain and state requirements that must hold before invocation.'
  },
  {
    id: 'q-3-6',
    moduleId: 'mod-3',
    type: 'numerical',
    question: 'In an algebraic specification for an ADT with 2 basic constructors, 1 extra constructor, 2 basic inspectors, and 0 extra inspectors, what is the minimum number of rewrite axioms required?',
    correctAnswer: 6,
    explanation: 'Using the formula m1 * (m2 + n1) + n2: 2 * (1 + 2) + 0 = 6 equations.'
  },

  // Module 4 & 5 Questions
  {
    id: 'q-4-1',
    moduleId: 'mod-4-5',
    type: 'mcq',
    question: 'Which of the following is the most desirable (highest quality) type of cohesion?',
    options: ['Logical cohesion', 'Sequential cohesion', 'Communicational cohesion', 'Functional cohesion'],
    correctAnswer: 'Functional cohesion',
    explanation: 'Functional cohesion is the highest and best form: every element in the module directly cooperates to achieve a single, well-defined task.'
  },
  {
    id: 'q-4-2',
    moduleId: 'mod-4-5',
    type: 'mcq',
    question: 'Which of the following represents the loosest (most desirable) coupling between two modules?',
    options: ['Data coupling', 'Stamp coupling', 'Control coupling', 'Common coupling'],
    correctAnswer: 'Data coupling',
    explanation: 'Data coupling is the loosest and best: modules interact solely by passing elementary data items (e.g., an integer or float).'
  },
  {
    id: 'q-4-3',
    moduleId: 'mod-4-5',
    type: 'true_false',
    question: 'In a Data Flow Diagram (DFD), external entities can appear at any level (Level 1, Level 2, etc.).',
    correctAnswer: false,
    explanation: 'All external entities interacting with the system must appear ONLY in the Context Diagram (Level 0). They must not appear at lower levels.'
  },
  {
    id: 'q-4-4',
    moduleId: 'mod-4-5',
    type: 'true_false',
    question: 'A DFD captures the exact order in which processes (bubbles) execute.',
    correctAnswer: false,
    explanation: 'A DFD contains NO control information, no execution order, and no loops. It represents strictly data in motion.'
  },
  {
    id: 'q-4-5',
    moduleId: 'mod-4-5',
    type: 'mcq',
    question: 'In a Structure Chart, a module drawn with double vertical edges represents:',
    options: ['A root module', 'A library module', 'A control module', 'A recursive module'],
    correctAnswer: 'A library module',
    explanation: 'A rectangle with double side edges denotes a pre-existing reusable library module.'
  },

  // Module 6 & 7 Questions
  {
    id: 'q-6-1',
    moduleId: 'mod-6-7',
    type: 'mcq',
    question: 'Which UML diagram represents the central, user-centric black-box view of the system to which all other views must conform?',
    options: ['Class Diagram', 'Sequence Diagram', 'Use Case Diagram', 'Deployment Diagram'],
    correctAnswer: 'Use Case Diagram',
    explanation: 'The User\'s View captured by the Use Case Diagram is the central functional model representing user requirements.'
  },
  {
    id: 'q-6-2',
    moduleId: 'mod-6-7',
    type: 'true_false',
    question: 'Aggregation relationship between classes is symmetric (If A aggregates B, then B can aggregate A).',
    correctAnswer: false,
    explanation: 'Aggregation is strictly anti-symmetric: if class B is part of composite class A, class A cannot simultaneously be a part of class B.'
  },
  {
    id: 'q-6-3',
    moduleId: 'mod-6-7',
    type: 'true_false',
    question: 'In Composition, the lifetime of the parts is strictly dependent on the lifetime of the whole.',
    correctAnswer: true,
    explanation: 'Composition is exclusive aggregation with strict existence dependency: when the whole is destroyed, its parts are automatically destroyed.'
  },
  {
    id: 'q-6-4',
    moduleId: 'mod-6-7',
    type: 'mcq',
    question: 'What is the key difference between Activity diagrams and procedural flow charts?',
    options: [
      'Activity diagrams only work with databases',
      'Activity diagrams support description of parallel activities and synchronization (fork/join)',
      'Flow charts can model classes while activity diagrams cannot',
      'There is no difference'
    ],
    correctAnswer: 'Activity diagrams support description of parallel activities and synchronization (fork/join)',
    explanation: 'Activity diagrams support concurrent, parallel processing branches and synchronization bars (fork/join), whereas flowcharts are strictly sequential.'
  },

  // Module 8 Questions
  {
    id: 'q-8-1',
    moduleId: 'mod-8',
    type: 'mcq',
    question: 'Which design pattern assigns responsibility to the class that holds the information necessary to fulfill that responsibility?',
    options: ['Creator Pattern', 'Controller Pattern', 'Expert Pattern', 'Facade Pattern'],
    correctAnswer: 'Expert Pattern',
    explanation: 'The Information Expert pattern assigns responsibility to the class that owns the required data.'
  },
  {
    id: 'q-8-2',
    moduleId: 'mod-8',
    type: 'true_false',
    question: 'In Model-View Separation, the domain model classes should directly invoke methods on GUI presentation classes to update the screen.',
    correctAnswer: false,
    explanation: 'Model classes must never have direct knowledge of GUI classes. Communication is handled via polling or Publish-Subscribe callbacks.'
  },
  {
    id: 'q-8-3',
    moduleId: 'mod-8',
    type: 'mcq',
    question: 'The three types of objects identified during domain modeling are:',
    options: [
      'Input, Output, Storage',
      'Boundary, Controller, Entity',
      'Client, Server, Middleware',
      'Model, View, Template'
    ],
    correctAnswer: 'Boundary, Controller, Entity',
    explanation: 'Boundary objects handle user interaction, Controller objects handle business workflow logic, and Entity objects hold persistent data.'
  },

  // Module 10 Questions
  {
    id: 'q-10-1',
    moduleId: 'mod-10',
    type: 'true_false',
    question: 'During code inspection, developers detect errors, whereas during program execution testing, they detect failures.',
    correctAnswer: true,
    explanation: 'Inspection directly examines static code to find defects (errors); dynamic execution reveals failures (deviations from expected output).'
  },
  {
    id: 'q-10-2',
    moduleId: 'mod-10',
    type: 'true_false',
    question: 'Empirical studies prove that code commenting is more useful for program understanding than using meaningful variable names.',
    correctAnswer: false,
    explanation: 'Careful experiments have shown that meaningful variable names are the single most effective internal documentation aid, outperforming comments.'
  },
  {
    id: 'q-10-3',
    moduleId: 'mod-10',
    type: 'mcq',
    question: 'Which integration testing approach requires the design of test "stubs"?',
    options: ['Bottom-up integration', 'Top-down integration', 'Big-bang integration', 'None of the above'],
    correctAnswer: 'Top-down integration',
    explanation: 'Top-down integration starts from high-level modules and requires stubs (dummy lower-level procedures) to simulate unbuilt subordinate modules.'
  },
  {
    id: 'q-10-4',
    moduleId: 'mod-10',
    type: 'numerical',
    question: 'A program control flow graph has 7 edges and 6 nodes. What is its McCabe Cyclomatic Complexity V(G)?',
    correctAnswer: 3,
    explanation: 'V(G) = E - N + 2 = 7 - 6 + 2 = 3.'
  },
  {
    id: 'q-10-5',
    moduleId: 'mod-10',
    type: 'numerical',
    question: 'In an error seeding experiment, 25 artificial errors were seeded into a software module. Testing uncovered 20 of the seeded errors and 50 natural errors. What is the estimated total number of natural errors N?',
    correctAnswer: 62.5,
    explanation: 'n/N = s/S => N = S * n / s = 25 * 50 / 20 = 62.5 defects (or approx 63 defects).'
  },

  // Module 11 Questions
  {
    id: 'q-11-1',
    moduleId: 'mod-11',
    type: 'mcq',
    question: 'According to Putnam\'s Software Equation, how does the development cost/effort change if the project delivery schedule is compressed?',
    options: [
      'Inversely proportional to schedule',
      'Inversely proportional to square of schedule',
      'Inversely proportional to the 4th power of schedule duration',
      'Cost remains constant'
    ],
    correctAnswer: 'Inversely proportional to the 4th power of schedule duration',
    explanation: 'Putnam\'s derivation shows Cost is proportional to 1/(td^4). Compressing time by 50% increases effort by 16 times!'
  },
  {
    id: 'q-11-2',
    moduleId: 'mod-11',
    type: 'true_false',
    question: 'In the Basic COCOMO model, development effort is a linear function of product size (KLOC).',
    correctAnswer: false,
    explanation: 'Effort = a1 * (KLOC)^a2 where a2 > 1 (1.05 for organic, 1.12 for semi-detached, 1.20 for embedded). Thus, effort is super-linear.'
  },
  {
    id: 'q-11-3',
    moduleId: 'mod-11',
    type: 'short_answer',
    question: 'In the Critical Path Method (CPM), what is the slack time of tasks lying on the critical path?',
    correctAnswer: 'Zero',
    explanation: 'A critical task has zero slack (float) time. Any delay on a critical task directly delays the completion date of the entire project.'
  },

  // Module 12 Questions
  {
    id: 'q-12-1',
    moduleId: 'mod-12',
    type: 'mcq',
    question: 'Which team structure is subject to a single point of failure and may suffer from low team morale under constant supervision?',
    options: ['Democratic Team', 'Chief Programmer Team', 'Mixed Control Team', 'Extreme Programming Team'],
    correctAnswer: 'Chief Programmer Team',
    explanation: 'In the chief programmer team, technical authority and design decisions rest solely with one individual, creating a single point of failure.'
  },
  {
    id: 'q-12-2',
    moduleId: 'mod-12',
    type: 'true_false',
    question: 'In SCM, SCCS and RCS minimize disk storage by storing full duplicate copies of every version file.',
    correctAnswer: false,
    explanation: 'SCCS and RCS store only the incremental differences between versions, known as "deltas", saving huge amounts of disk space.'
  },
  {
    id: 'q-12-3',
    moduleId: 'mod-12',
    type: 'mcq',
    question: 'What is the formula to compute risk priority in project risk management?',
    options: ['p = r + s', 'p = r * s', 'p = r / s', 'p = (r - s) / 2'],
    correctAnswer: 'p = r * s',
    explanation: 'Risk priority p is the product of probability of occurrence (r) and the severity of damage caused (s).'
  },

  // Module 13 Questions
  {
    id: 'q-13-1',
    moduleId: 'mod-13',
    type: 'mcq',
    question: 'At which level of the SEI Capability Maturity Model (CMM) are both product and process metrics quantitatively collected and managed?',
    options: ['Level 2 (Repeatable)', 'Level 3 (Defined)', 'Level 4 (Managed)', 'Level 5 (Optimizing)'],
    correctAnswer: 'Level 4 (Managed)',
    explanation: 'Level 4 is the Managed level where quantitative software metrics are collected and statistical process control is applied.'
  },
  {
    id: 'q-13-2',
    moduleId: 'mod-13',
    type: 'mcq',
    question: 'ISO 9001 certification roughly corresponds to which level of the SEI-CMM?',
    options: ['Level 1', 'Level 2', 'Level 3', 'Level 5'],
    correctAnswer: 'Level 3',
    explanation: 'ISO 9001 requires defined, documented, and organization-wide standard processes, which corresponds to CMM Level 3 (Defined).'
  },
  {
    id: 'q-13-3',
    moduleId: 'mod-13',
    type: 'mcq',
    question: 'What maximum defect rate is permissible to achieve Six Sigma quality?',
    options: ['3.4 defects per million opportunities', '34 defects per thousand opportunities', '3.4% defect rate', 'Zero defects'],
    correctAnswer: '3.4 defects per million opportunities',
    explanation: 'Six Sigma statistically specifies a defect rate of no more than 3.4 defects per million opportunities (DPMO).'
  },

  // Module 14 to 17 Questions
  {
    id: 'q-14-1',
    moduleId: 'mod-14-17',
    type: 'true_false',
    question: 'Software maintenance process model 1 (direct code patch) is preferable over reengineering when the percentage of rework is greater than 15%.',
    correctAnswer: false,
    explanation: 'Empirical studies show that Process 1 is preferred when rework is <= 15%. Above 15% rework, Process 2 (Reengineering) is more cost-effective.'
  },
  {
    id: 'q-14-2',
    moduleId: 'mod-14-17',
    type: 'mcq',
    question: 'In CORBA architecture, what component serves as the "Object Bus" connecting clients and servers transparently across networks?',
    options: ['IDL Compiler', 'Object Request Broker (ORB)', 'Interface Repository', 'Client Stub'],
    correctAnswer: 'Object Request Broker (ORB)',
    explanation: 'The ORB is the central middleware backbone that locates servers, marshals requests, and routes messages transparently.'
  },
  {
    id: 'q-14-3',
    moduleId: 'mod-14-17',
    type: 'mcq',
    question: 'Prieto-Diaz\'s software reuse classification scheme describes reusable components using:',
    options: ['A single alphabetical index', 'A strict single-inheritance tree', 'An n-tuple of facets (action, object, data structure, system)', 'Binary machine opcodes'],
    correctAnswer: 'An n-tuple of facets (action, object, data structure, system)',
    explanation: 'Prieto-Diaz proposed faceted classification, which avoids rigid hierarchies by characterizing components across multiple descriptive facets.'
  }
];
