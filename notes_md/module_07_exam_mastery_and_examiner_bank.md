# Module 7: Exam Mastery, Examiner Answer Bank & Revision Sheets

---

# Part VIII — Cross-Topic Connections: Requirements → DFD → Design → Code

## 91. The course is one continuous chain

Although the PDFs are separated into lectures, they form a single engineering story.

```text
Problem / user need
        ↓
Requirements gathering & analysis
        ↓
SRS
        ↓
Structured analysis / functional understanding
        ↓
Design
   ┌────┴────┐
   ↓         ↓
FOD       OOD perspectives
   ↓         ↓
Module hierarchy / objects
        ↓
Detailed data structures + algorithms
        ↓
Coding
        ↓
Unit testing
        ↓
Integration + system testing
        ↓
Maintenance
```

The life-cycle lecture gives the overall process. The requirements lecture explains how to define the “WHAT.” The DFD exercises show one traditional analysis technique. The design lecture explains how to turn the understood system into modules. The introductory lecture explains why all this discipline is necessary as software size and organizational complexity increase.

---

## 92. SRS versus DFD versus design

### SRS
Describes required external behavior and constraints.

### DFD
Within the traditional structured-analysis approach, describes functions/processes and data moving among processes and data stores. It does not specify implementation-level algorithms.

### High-level design
Maps understood functions onto modules and defines relationships and interfaces.

### Detailed design
Defines module-level data structures and algorithms.

A useful “do not mix levels” table:

| Question | Artifact |
|---|---|
| What must the system do? | SRS |
| Which functions and data flows exist? | Structured analysis / DFD |
| Which modules should exist and how are they connected? | High-level design / structure chart |
| How does one module calculate its result? | Detailed design |
| Is the code correct? | Testing |

---

## 93. Requirement quality and design quality are related

A good design cannot rescue a requirement that was never understood. The requirements lecture emphasizes inconsistency, incompleteness, ambiguity, and the need for resolution before design.

Conversely, a perfect SRS can still be implemented poorly. That is why the design lecture introduces correct, understandable, efficient, and maintainable design, with cohesion, coupling, and hierarchy as concrete design-quality yardsticks.

The two stages therefore solve different problems:

> **Requirements quality asks whether the team is building the right thing. Design quality asks whether the required thing has been structured well enough to implement and maintain.**

---

## 94. DFD and function-oriented design fit together

The lifecycle lecture says structured analysis identifies functions and data flow using DFDs. The same lecture then says structured design decomposes the software into modules and defines invocation relationships.

The Software Design lecture continues this traditional path through functional decomposition:

```text
Requirement understanding
        ↓
Functions + data flow (DFD)
        ↓
Functional decomposition
        ↓
Module hierarchy / structure chart
        ↓
Detailed module design
```

This is why the Trading-House DFD exercise belongs next to the design lecture rather than being an isolated diagramming topic.

---

## 95. Cohesion and coupling as design consequences

When DFD functions are mapped into modules, the mapping is not arbitrary.

A good mapping aims for:

- high cohesion within a module,
- low coupling between modules,
- sensible hierarchy,
- reasonable fan-in/fan-out,
- proper layering and abstraction.

Imagine a DFD process named `Generate Invoice`. If the designer bundles invoice formatting, socket management, employee login, unrelated error handling, and inventory scanning into one module, the module may become low-cohesion. If `Generate Invoice` reaches directly into internal variables owned by five other modules, coupling becomes tight.

The analysis artifact gives a functional vocabulary; the design stage determines whether that vocabulary becomes a healthy module structure.

---

# Part IX — Exam-Oriented Master Sheets

## 96. Life-cycle models — one-page memory sheet

### Classical Waterfall
**Shape:** sequential, no way back.

**Use when:** requirements are small, stable, and well understood.

**Strength:** simple and disciplined.

**Weakness:** late discovery of defects/changes is expensive.

### Iterative Waterfall
**Shape:** sequential phases + feedback paths.

**Use when:** requirements are relatively stable but defects can emerge later.

**Strength:** phase containment of errors.

**Weakness:** still weak for highly uncertain/change-heavy work.

### Prototyping
**Shape:** quick rough implementation → feedback → refine.

**Use when:** requirements or technical issues are unclear.

**Strength:** learn early.

**Weakness:** prototype may be mistaken for production software or poor design may leak into final product.

### Evolutionary
**Shape:** working releases grow over time.

**Use when:** large problems have natural functional increments.

**Strength:** useful software arrives early.

**Weakness:** not every problem decomposes cleanly; total cost/schedule is harder to freeze.

### Spiral
**Shape:** repeated risk-driven loops.

**Use when:** project is large, complex, and high-risk.

**Strength:** explicit risk analysis in every loop.

**Weakness:** more difficult and costly to manage.

---

## 97. Six life-cycle stages — what comes out

| Stage | Main question | Main output idea |
|---|---|---|
| Feasibility | Is the project worthwhile and feasible? | feasibility understanding / decision |
| Requirements | What exactly is needed? | reviewed SRS |
| Design | How will it be structured? | architecture + module specifications |
| Coding | Can the design be implemented? | source modules |
| Testing | Does the system satisfy requirements? | tested/integrated system |
| Maintenance | How is the product kept useful? | corrected/enhanced/adapted product |

---

## 98. SRS master sheet

### Three major requirement categories

- Functional requirements
- Nonfunctional requirements
- Constraints

### Seven good-SRS properties

**Concise & unambiguous — specifies what not how — easy to change — consistent — complete — traceable — verifiable.**

### Four standard roles

**User needs — contract — reference — implementation definition.**

### Black-box principle

Only external observable input/output behavior is specified; internal design is left open.

---

## 99. Decision logic master sheet

### Decision tree

- branches/edges = conditions,
- leaves = actions,
- visually intuitive for small decision sets.

### Decision table

- rows/rules = combinations/actions,
- easier to inspect for completeness and duplicates.

### ATM logic

```text
Valid card & PIN?
  No  → reject
  Yes → amount within balance and daily limit?
           No  → reject
           Yes → dispense + update balance + receipt
```

---

## 100. Z notation master sheet

### Five steps

1. identify state,
2. write state schema,
3. name operation,
4. add inputs/outputs,
5. write pre/postconditions.

### Core symbols

`ℕ` natural numbers; `ℤ` integers; `Δ` state change; `Ξ` state read without change; `?` input; `!` output; prime = after-state.

### Logic

`∧` AND; `∨` OR; `¬` NOT; `⇒` implication; `⇔` iff; `∀` for all; `∃` there exists.

### ATM withdrawal

Preconditions:

\[
amt? \le balance
\]

\[
dailyWithdrawn + amt? \le dailyLimit
\]

Postconditions:

\[
balance' = balance - amt?
\]

\[
dailyWithdrawn' = dailyWithdrawn + amt?
\]

Invariant:

\[
dailyWithdrawn \le dailyLimit
\]

---

## 101. Cohesion master sheet

```text
Coincidental → Logical → Temporal → Procedural →
Communicational → Sequential → Functional
```

Think of the question:

> “Why are these things together?”

If the answer becomes “they are all random utilities,” cohesion is poor. If the answer is “every part contributes to one clearly defined task,” cohesion is high.

---

## 102. Coupling master sheet

```text
Data → Stamp → Control → Common → Content
```

Think of the question:

> “How much knowledge/dependency crosses the module boundary?”

- elementary value → data;
- whole structure when only part is needed → stamp;
- flag that directs behavior → control;
- shared global state → common;
- direct access to internals → content.

The source’s design direction is to prefer **data coupling** and avoid unnecessarily tight coupling.

---

## 103. Module hierarchy master sheet

- **Depth:** number of control levels.
- **Width:** span at widest level.
- **Fan-out:** how many modules one module directly controls.
- **Fan-in:** how many modules directly call a module.
- **Superordinate:** controller of another module.
- **Subordinate:** controlled module.
- **Visibility:** reachable by direct/indirect calling.
- **Layering:** upper level should call the immediately lower layer.
- **Abstraction:** lower-level modules should not call upward.

The source’s high-level design target is a **neat, shallow hierarchy** with high cohesion and low coupling.

---

## 104. FOD versus OOD in one table

| Feature | Function-Oriented | Object-Oriented |
|---|---|---|
| Primary viewpoint | functions/actions | objects/entities |
| Refinement | function → sub-functions | object/class responsibilities |
| State | centralized | distributed |
| Data/behavior | commonly separated/shared | bundled |
| Communication | function calls / shared data structures | message passing |
| Source mnemonic | focus on verbs | focus on nouns |

The fire-alarm case makes this concrete: global arrays plus functions versus Detector/Alarm objects with local state and operations.

---

# Part X — Source Page-by-Page Audit

The following section is the completeness layer. It maps **all 105 pages** from the supplied PDFs to a study note. The extracted page text is retained in normalized form so that small labels, examples, lists, and slide-specific wording are not silently lost. Each page also receives a teaching interpretation.

> **Important:** The page audit is a source-coverage device. The long concept chapters above explain the ideas; this section verifies that each source page was considered.



# Part XI — One-to-One Audit of All 105 Source Pages

Each source page below has its own study entry. Source text is normalized only for layout noise; the conceptual content is retained. The teaching note is an explanatory layer built from the supplied material.

\newpage

## Study Page 001 — Introduction to Software Engineering — PDF page 1

**Source file:** `SoftEngg - Intro.txt`  
**PDF page:** 1

### Page focus

**What is Software Engineering? — Programs vs. Software Products**

### Captured source points

- What is Software Engineering?
- Programs vs. Software Products
S Roy Evolution of Software Engineering  
Sikkim (Central) University  
Gangtok, Sikkim Notable Changes In Software  
Development Practices  
sroy01@cus.ac.in  
- Introduction to Life Cycle Models
- Summary
1 2  
3 4  

### Deep explanation

This page provides foundational context for the course. Read the slide as part of the larger engineering chain rather than as an isolated definition. The useful study technique is to connect the page's terms to the later artifacts and decisions: why a concept is needed, what problem it addresses, and what later activity depends on it. For examinations, retain both the definition and the practical implication shown by the example or diagram.

\newpage

## Study Page 002 — Introduction to Software Engineering — PDF page 2

**Source file:** `SoftEngg - Intro.txt`  
**PDF page:** 2

### Page focus

** Engineering approach to develop software.  Heavy use of past experience: —  Building Construction Analogy.**

### Captured source points

- Engineering approach to develop software.  Heavy use of past experience:
- Building Construction Analogy.
- Past experience is systematically arranged.
- Theoretical basis and quantitative techniques provided.
- Many are just thumb rules.
- Tradeoff between alternatives
- Systematic collection of past experience:
- Pragmatic approach to cost-effectiveness
- techniques,
- methodologies,
- guidelines.
5 6  
- To acquire skills to develop large
Engineering  
programs.  
Technology  Exponential growth in complexity and difficulty level  
with size.  
Esoteric Past  
Craft Systematic Use of Past  10K vs 1000K LOC  
Experience Experience and Scientific Basis  
Unorganized Use of  
Past Experience  
Art  
Time  
- The ad hoc approach breaks down when
size of software increases: --- “One thorn  
of experience is worth a whole wilderness of warning.”  
7 8  

### Deep explanation

This page provides foundational context for the course. Read the slide as part of the larger engineering chain rather than as an isolated definition. The useful study technique is to connect the page's terms to the later artifacts and decisions: why a concept is needed, what problem it addresses, and what later activity depends on it. For examinations, retain both the definition and the practical implication shown by the example or diagram.

\newpage

## Study Page 003 — Introduction to Software Engineering — PDF page 3

**Source file:** `SoftEngg - Intro.txt`  
**PDF page:** 3

### Page focus

** Ability to solve complex programming problems: To acquire skills to be a better —  abstraction and decomposition**

### Captured source points

- Ability to solve complex programming problems: To acquire skills to be a better
- abstraction and decomposition
programmer:  
- How to break large projects into smaller and manageable parts?
- Higher Productivity
- Better Quality Programs
- Learn techniques of:
- specification, design, interface development, testing,
project management, etc.  
9 10  
- Software products:
- fail to meet user requirements. Hw cost
- frequently crash. Sw cost
- expensive.
- difficult to alter, debug, and enhance.
- often delivered late.
- use resources non-optimally.
1960 Year  
1999  
Relative Cost of Hardware and Software  
11 12  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

\newpage

## Study Page 004 — Introduction to Software Engineering — PDF page 4

**Source file:** `SoftEngg - Intro.txt`  
**PDF page:** 4

### Page focus

** Usually small in size  Large — Larger problems,**

### Captured source points

- Usually small in size  Large
- Larger problems,
- Author himself is sole  Large number of users
- Lack of adequate training in user
- Single developer
software engineering,  Team of developers  
- Lacks proper user  Well-designed interface
- Increasing skill shortage, interface
- Low productivity improvements.  Lacks proper  Well documented &
documentation user-manual prepared  
- Ad hoc development.  Systematic development
13 14  
- The high-level problem:
- Computer systems engineering:
- encompasses software engineering.
- deciding which tasks are to be solved by software
- Many products require development of software  which ones by hardware.
as well as specific hardware to run it:  
- a coffee vending machine,
- a mobile communication product, etc.
15 16  

### Deep explanation

This page provides foundational context for the course. Read the slide as part of the larger engineering chain rather than as an isolated definition. The useful study technique is to connect the page's terms to the later artifacts and decisions: why a concept is needed, what problem it addresses, and what later activity depends on it. For examinations, retain both the definition and the practical implication shown by the example or diagram.

\newpage

## Study Page 005 — Introduction to Software Engineering — PDF page 5

**Source file:** `SoftEngg - Intro.txt`  
**PDF page:** 5

### Page focus

** Often, hardware and software are developed Feasibility — Study**

### Captured source points

- Often, hardware and software are developed Feasibility
Study  
together:  
Requirements  
- Hardware simulator is used during software Analysis and
Specification Hardware  
development. Development  
Hardware  
Software  
- Integration of hardware and software. Partitioning
Software  
Development  
- Final system testing Integration
and Testing  
Project Management  
17 18  
- Early Computer Programming
Object-Oriented  
(1950s): Data flow-based  
- Programs were being written in Data structure-
based  
assembly language.  
Control flow-  
- Programs were limited to about a based
few hundreds of lines of assembly  
Ad hoc  
code.  
19 40  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

\newpage

## Study Page 006 — Introduction to Software Engineering — PDF page 6

**Source file:** `SoftEngg - Intro.txt`  
**PDF page:** 6

### Page focus

**During all stages of development — A lot of effort and attention is now**

### Captured source points

- During all stages of development
- A lot of effort and attention is now
process:  
being paid to:  
- Periodic reviews are being carried out
- requirements specification.
- Software testing has become
- Also, now there is a distinct design
systematic:  
phase:  
- standard testing techniques are
- standard design techniques are being
available.  
used.  
41 42  
- Because of good documentation: Projects are being thoroughly
- fault diagnosis and maintenance are planned:
smoother now.  estimation,  
- Several metrics are being used:  scheduling,
- help in software project management,  monitoring mechanisms.
quality assurance, etc. Use of CASE tools.  
43 44  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

\newpage

## Study Page 007 — Introduction to Software Engineering — PDF page 7

**Source file:** `SoftEngg - Intro.txt`  
**PDF page:** 7

### Page focus

**Software life cycle (or software process): A software life cycle model (or —  seriesof identifiable stages that a**

### Captured source points

- Software life cycle (or software process): A software life cycle model (or
- seriesof identifiable stages that a
software product undergoes during its life process model):  
- a descriptive and diagrammatic model of
time:  
- Feasibility study
- requirements analysis and specification,
software life cycle:  
- identifies all the activities required for product
- design,
development,  
- coding,
- establishes a precedence ordering among the different
- testing
activities,  
- maintenance.
- Divides life cycle into phases.
45 46  
- A written description:
- The development team must identify
- forms a common understanding of
activities among the software developers. a suitable life cycle model:  
- helps in identifying inconsistencies,  and then adhere to it.
redundancies, and omissions in the  Primary advantage of adhering to a life  
development process. cycle model:  
- Helps in tailoring a process model for  helps development of software in a systematic
specific projects. and disciplined manner.  
47 48  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

\newpage

## Study Page 008 — Introduction to Software Engineering — PDF page 8

**Source file:** `SoftEngg - Intro.txt`  
**PDF page:** 8

### Page focus

**When a program is developed by When a software product is being — a single programmer --- developed by a team:**

### Captured source points

- When a program is developed by When a software product is being
a single programmer --- developed by a team:  
- there must be a precise understanding
- he has the freedom to decide his
among team members as to when to do  
exact steps.  
what,  
- otherwise it would lead to chaos and
project failure.  
49 50  
- R. Mall, “Fundamentals of Software Engineering,”
- Many life cycle models have been proposed . Prentice-Hall of India, 1999, CHAPTER 1.
- We will confine our attention to a few important and
commonly used models.  
- classical waterfall model
- iterative waterfall,
- evolutionary,
- prototyping, and
- spiral model
51 52  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

\newpage

## Study Page 009 — Life Cycle Models — PDF page 1

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 1

### Page focus

**Life Cycle Models**

### Captured source points

SOFTWARE ENGINEERING  
Understanding, choosing, and applying software development process models  
Swarup Roy · Tezpur University  
FOUNDATIONS  
The Software Life Cycle  
A series of identifiable stages that a software product undergoes  
during its lifetime  
Six stages: feasibility study, requirements analysis & specification,  
design, coding, testing, and maintenance  
Life Cycle Models 2  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

\newpage

## Study Page 010 — Life Cycle Models — PDF page 2

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 2

### Page focus

**FOUNDATIONS**

### Captured source points

FOUNDATIONS  
What Is a Life Cycle Model?  
A descriptive and diagrammatic model of the software life cycle  
Identifies all the activities required for product development  
Establishes a precedence ordering among the different activities  
Divides the life cycle into phases — which the development team  
must identify, and then adhere to  
Life Cycle Models 3  
FOUNDATIONS  
Why Model the Life Cycle?  
A written description builds a common understanding of activities  
among developers  
Helps identify inconsistencies, redundancies, and omissions in the  
development process  
Helps tailor a process model to the needs of a specific project  
Life Cycle Models 4  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

\newpage

## Study Page 011 — Life Cycle Models — PDF page 3

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 3

### Page focus

**FOUNDATIONS**

### Captured source points

FOUNDATIONS  
Why It Matters More in a Team  
Single Programmer Development Team  
Has the freedom to decide the exact steps to follow. Must share a precise, common understanding of who does what and when.  
No coordination with anyone else is required. Without a shared life-cycle model, that coordination breaks down — team-based  
projects (not solo work) drift into chaos and project failure.  
Correction from the source slide: it is unmanaged team development, not solo development, that leads to chaos.  
Life Cycle Models 5  
FOUNDATIONS  
Five Life Cycle Models We Will Cover  
Classical Iterative  
Prototyping Evolutionary Spiral  
Waterfall Waterfall  
Sequential, six phases, Same six phases, with Build small, learn fast, Grow the system Manage risk, one loop  
no way back feedback loops then build for real release by release at a time  
Life Cycle Models 6  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

\newpage

## Study Page 012 — Life Cycle Models — PDF page 4

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 4

### Page focus

**MODEL 01 OF 05**

### Captured source points

MODEL 01 OF 05  
Classical Waterfall Model  
The original, idealized model — six phases, one after another, with a document at the end of each.  
CLASSICAL WATERFALL MODEL  
Six Sequential Phases  
1 2 3 4 5 6  
Requirements  
Coding & Unit Integration & System  
Feasibility Study → Analysis & → Design → Testing → Testing → Maintenance  
Specification  
Each phase starts only after the previous one is complete — the classical model has no way back.  
Life Cycle Models 8  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

\newpage

## Study Page 013 — Life Cycle Models — PDF page 5

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 5

### Page focus

**CLASSICAL WATERFALL MODEL**

### Captured source points

CLASSICAL WATERFALL MODEL  
Relative Effort Across Phases  
Feasibility Requirements Design Coding Testing Maintenance  
Phases from feasibility study to testing are known as the development phases  
Among all life-cycle phases, maintenance consumes the maximum effort  
Among the development phases, testing consumes the maximum effort  
(Illustrative proportions, not exact published percentages)  
Life Cycle Models 9  
CLASSICAL WATERFALL MODEL  
Process Discipline  
Most organizations define standards for the deliverables produced at  
the end of every phase  
Entry and exit criteria are defined for every phase  
Specific methodologies are prescribed for specification, design,  
testing, and project management  
Life Cycle Models 10  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

\newpage

## Study Page 014 — Life Cycle Models — PDF page 6

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 6

### Page focus

**CLASSICAL WATERFALL MODEL · WORKED EXAMPLE**

### Captured source points

CLASSICAL WATERFALL MODEL · WORKED EXAMPLE  
University Examination Portal  
A fixed-scope project, planned and executed through six clear milestones.  
Requirement Design Code Test Deploy Maintain  
Exam form fill- Modules, Build form pages, Check sample Launch before Fix report  
up, admit card, → database → validation, login, → registrations, → the examination → formats or minor  
marks entry, schema, roles for and reports invalid data, cycle policy updates  
result publication student, faculty, result calculation  
admin  
Waterfall is simple to understand and easy to evaluate — but it assumes the requirements are known early.  
Life Cycle Models 11  
FEASIBILITY STUDY  
Setting the Scope  
Aim: determine whether developing the product is financially  
worthwhile and technically feasible  
First, get a rough understanding of what the customer wants — the  
data flowing in, the processing needed, the data flowing out, and the  
constraints on system behaviour  
Life Cycle Models 12  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 015 — Life Cycle Models — PDF page 7

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 7

### Page focus

**FEASIBILITY STUDY**

### Captured source points

FEASIBILITY STUDY  
What the Analyst Does  
Explore the Options Decide  
Work out an overall understanding of the problem Perform a cost/benefit analysis to pick the best solution  
Formulate different solution strategies A project may turn out to be infeasible altogether — due to high  
cost, resource constraints, or technical limitations  
Compare strategies by resources required, cost, and development  
time  
Life Cycle Models 13  
FEASIBILITY STUDY · CASE STUDY  
Galaxy Mining Company Ltd. (GMC) CASE STUDY  
GMC runs about 50 mine sites across 8 states. Wanting to speed up compensation payouts for its miners, GMC proposes a Special Provident  
Fund (SPF) — deducted monthly at each site and deposited with a Central SPF Commissioner (CSPFC), who tracks every miner's installments.  
WHAT HAPPENS  
GMC hires Adventure Software Inc. to automate SPF record-keeping for every employee  
Expected payoff: less manual bookkeeping, and much faster settlement of claims  
Sanctioned budget: ₹1 million to develop and install the software — the number every feasibility trade-off has to fit  
Life Cycle Models 14  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 016 — Life Cycle Models — PDF page 8

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 8

### Page focus

**REQUIREMENTS ANALYSIS & SPECIFICATION**

### Captured source points

REQUIREMENTS ANALYSIS & SPECIFICATION  
Understanding What the Customer Wants  
Two Activities Four Goals  
Requirements gathering and analysis Collect all related data from the customer  
Analyse it to clearly understand what the customer wants  
Requirements specification  
Find inconsistencies and incompleteness in the requirements  
Resolve all inconsistencies and incompleteness  
Life Cycle Models 15  
REQUIREMENTS ANALYSIS  
Requirements Gathering  
Relevant data is usually collected from end-users through interviews  
and discussions  
Example: for business accounting software, the analyst interviews  
every accountant in the organization to learn their requirements  
Life Cycle Models 16  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 017 — Life Cycle Models — PDF page 9

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 9

### Page focus

**REQUIREMENTS ANALYSIS**

### Captured source points

REQUIREMENTS ANALYSIS  
From Raw Interviews to a Clean SRS  
Data collected from users usually contains contradictions and  
ambiguities — each user has only a partial, incomplete view of the  
system  
These ambiguities and contradictions must be identified, then  
resolved through discussion with the customer  
The resolved requirements are organized into a Software  
Requirements Specification (SRS) document  
Engineers who do this work are designated Analysts  
Life Cycle Models 17  
DESIGN  
From Specification to Architecture  
What Happens Two Approaches  
The design phase transforms the SRS into a form suitable for Traditional (function-oriented) approach  
implementation in a programming language  
In technical terms, the software architecture is derived from the Object-oriented approach  
SRS document  
Life Cycle Models 18  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

\newpage

## Study Page 018 — Life Cycle Models — PDF page 10

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 10

### Page focus

**DESIGN · TRADITIONAL APPROACH**

### Captured source points

DESIGN · TRADITIONAL APPROACH  
Structured Analysis  
First of the traditional approach's two activities — the second is  
structured design  
Identify all the functions to be performed, and the data flow among  
them  
Recursively decompose each function into sub-functions, and  
identify data flow among the sub-functions too  
Carried out using Data Flow Diagrams (DFDs)  
Life Cycle Models 19  
DESIGN · TRADITIONAL APPROACH  
Structured Design  
Follows structured analysis, and works at two levels of detail  
High-level (architectural) design: decompose the system into  
modules, and define the invocation relationships among them  
Detailed (low-level) design: design the data structures and algorithms  
for each module  
Life Cycle Models 20  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

**DFD cue:** keep process names as functions, flow names as data, stores as persistent information, and external entities outside the system boundary.

\newpage

## Study Page 019 — Life Cycle Models — PDF page 11

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 11

### Page focus

**IMPLEMENTATION**

### Captured source points

IMPLEMENTATION  
Coding and Unit Testing  
What Happens Unit Testing  
Translate the software design into source code Each module is tested independently, as a stand-alone unit, and  
debugged  
Each module is coded, then documented Purpose: verify that individual modules work correctly  
End product: a set of program modules, each already tested on its  
own  
Life Cycle Models 21  
INTEGRATION & SYSTEM TESTING  
Bringing the Modules Together  
Modules are almost never integrated in one shot — integration  
happens through a number of planned steps  
At each integration step, the partially integrated system is tested  
Once all modules are integrated and tested, system testing is carried  
out  
Goal of system testing: confirm the system works according to the  
requirements specified in the SRS document  
Life Cycle Models 22  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

\newpage

## Study Page 020 — Life Cycle Models — PDF page 12

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 12

### Page focus

**MAINTENANCE**

### Captured source points

MAINTENANCE  
Life After Delivery  
Maintenance takes far more effort than building the product in the first place — development-to-maintenance effort is typically about 40 : 60.  
Corrective Perfective Adaptive  
Correct errors that were not discovered during Improve the implementation, and enhance the Port the software to a new environment — e.g.  
development system's functionalities a new computer or operating system  
Life Cycle Models 23  
Case Study: Payroll Processing System for a Government College  
Project Details  
About Development Team  
A government college wants to replace its old payroll software. The new system The development team has previously developed two similar payroll systems  
must calculate monthly salary based on already-established rules: basic pay, DA, using the same programming language, database, and reporting  
HRA, deductions, income tax, NPS/PF, leave deductions, and generate salary framework. The team members are experienced with payroll applications  
slips and statutory reports. The requirements are already documented in the and understand the relevant salary rules. The customer can provide  
institution’s service and financial rules. These rules are stable and are unlikely to complete requirements and formally approve the SRS before design begins.  
change during the development period.  
Requirements Technology Team expertise Risk  
Well documented salary rules; low Known language, database and Low experimentation; low technical  
Built similar payroll systems earlier  
change expected reporting tools uncertainty  
Integration +  
Feasibility Requirements Design Coding + Unit Test Maintenance  
System Test  
Why this sequence works: the team can freeze SRS early, design once, implement predictably, and test against stable rules.  
Case A: Experienced team + familiar technology + fixed rules →  
Case B: Fresh team + unclear rules + new technology → ??  
Classical Waterfall is appropriate  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 021 — Life Cycle Models — PDF page 13

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 13

### Page focus

**CLASSICAL WATERFALL MODEL**

### Captured source points

CLASSICAL WATERFALL MODEL  
Merits & Demerits  
MERITS DEMERITS  
✓ Simple to understand and use — each phase has a clear start ✗ Idealistic — assumes no defect is ever introduced during  
and end development  
✓ Easy to manage: staged deliverables and reviews make ✗ No feedback path: a defect found late must be fixed without  
progress easy to track formally revisiting earlier phases  
✓ Forces disciplined documentation at every phase, which helps ✗ The customer sees no working software until very late in the  
later maintenance project  
✓ Works well for small projects with clear, stable requirements ✗ A poor fit when requirements are unclear, incomplete, or  
likely to change  
Life Cycle Models 24  
MODEL 02 OF 05  
Iterative Waterfall Model  
The classical model, made realistic — with feedback paths that let the team fix defects where they  
were introduced.  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

**Exam method:** separate the two columns explicitly. A merit is a benefit created by the model’s structure; a demerit is a consequence of that same structure under unsuitable project conditions.

\newpage

## Study Page 022 — Life Cycle Models — PDF page 14

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 14

### Page focus

**ITERATIVE WATERFALL MODEL**

### Captured source points

ITERATIVE WATERFALL MODEL  
The Problem With the Classical Model  
The classical waterfall model is idealistic — it assumes no defect  
is ever introduced during any development activity  
In practice, defects get introduced in almost every phase of the  
life cycle  
Defects are often detected much later — e.g. a design defect  
might go unnoticed until coding or testing  
Life Cycle Models 26  
ITERATIVE WATERFALL MODEL  
Adding Feedback Paths  
1 2 3 4 5 6  
Requirements  
Coding & Unit Integration & System  
Feasibility Study → Analysis & → Design → Testing → Testing → Maintenance  
Specification  
↺ ↺ ↺ ↺ ↺  
Once a defect is found, work returns to the phase where it was introduced —  
and every phase after it is redone.  
Life Cycle Models 27  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

\newpage

## Study Page 023 — Life Cycle Models — PDF page 15

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 15

### Page focus

**ITERATIVE WATERFALL MODEL**

### Captured source points

ITERATIVE WATERFALL MODEL  
Principle: Phase Containment of Errors  
Errors should ideally be detected in the same phase in which they  
are introduced  
Example: A design problem found during the design phase itself  
is far cheaper to fix than the same problem found at the end of  
integration and system testing  
Life Cycle Models 28  
ITERATIVE WATERFALL MODEL · EXAMPLE  
Fund Transfer Limit — Retail Banking EXAMPLE  
A bank's IT team adds a "daily fund-transfer limit" feature to its net-banking system. During system testing, testers discover that "daily  
limit" is ambiguous — does it reset at midnight, or 24 hours after the first transfer?  
WHAT HAPPENS  
The team traces the ambiguity back to the requirements phase, where it was introduced  
They clarify the rule with the business team ("resets at midnight"), then update the design, code, and test cases  
Because the feedback path exists, only the affected phases are redone — not the whole project  
Life Cycle Models 30  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 024 — Life Cycle Models — PDF page 16

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 16

### Page focus

**ITERATIVE WATERFALL MODEL**

### Captured source points

ITERATIVE WATERFALL MODEL  
Merits & Demerits  
MERITS DEMERITS  
✓ Adds feedback paths, fixing the classical model's biggest ✗ Still suitable only for well-understood, relatively stable  
weakness requirements  
✓ Errors can be contained close to the phase where they were ✗ Not a good fit for very large or very risky projects  
introduced, reducing rework  
✗ The customer still sees no working software until late in the  
✓ More realistic than the classical model, while staying simple project  
to understand  
✗ Accommodating a late, large change request is still costly  
✓ The most widely used life-cycle model in practice  
Life Cycle Models 29  
MODEL 03 OF 05  
Prototyping Model  
Build a quick, rough version first — let real feedback shape the requirements before committing to the  
real system.  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

**Exam method:** separate the two columns explicitly. A merit is a benefit created by the model’s structure; a demerit is a consequence of that same structure under unsuitable project conditions.

\newpage

## Study Page 025 — Life Cycle Models — PDF page 17

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 17

### Page focus

**PROTOTYPING MODEL**

### Captured source points

PROTOTYPING MODEL  
What Is a Prototype?  
Before starting actual development, a working prototype of the  
system is built first  
A prototype is a toy implementation: limited functional  
capabilities, low reliability, and inefficient performance  
Life Cycle Models 32  
PROTOTYPING MODEL  
Why Build One?  
To illustrate to the customer input data formats, messages,  
reports, or interactive dialogs  
To examine technical issues associated with product development  
— major design decisions often hinge on things like a hardware  
controller's response time, or a sorting algorithm's efficiency  
Life Cycle Models 33  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

\newpage

## Study Page 026 — Life Cycle Models — PDF page 18

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 18

### Page focus

**PROTOTYPING MODEL**

### Captured source points

PROTOTYPING MODEL  
Building the Prototype  
A third reason to prototype: it's rarely possible to "get it right"  
the first time — plan to throw the first version away if you want a  
good final product  
Start with approximate requirements, then carry out a quick  
design  
Built using short-cuts — inefficient, inaccurate, or dummy  
functions (e.g. a table look-up standing in for a real computation)  
Life Cycle Models 34  
PROTOTYPING MODEL  
Building the Prototype  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

\newpage

## Study Page 027 — Life Cycle Models — PDF page 19

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 19

### Page focus

**PROTOTYPING MODEL**

### Captured source points

PROTOTYPING MODEL  
The Refinement Cycle  
Build Customer  
Quick Design Refine ↺  
Prototype Evaluation  
Approximate → Short-cuts allowed → The customer tries → Requirements are  
requirements, fast — dummy or it and gives refined from the  
turnaround inefficient feedback feedback — repeat  
functions until approved  
Once the customer approves the prototype, the actual system is built using the  
classical/iterative waterfall approach.  
Life Cycle Models 35  
PROTOTYPING MODEL  
Is the Extra Cost Worth It?  
The requirements analysis and specification phase becomes  
almost redundant — the approved prototype already reflects all  
user feedback  
The prototype's design and code are usually thrown away, but the  
experience gained helps a great deal when building the real  
product  
Building a prototype adds cost — but overall development cost  
can still be lower for systems with unclear requirements or  
unresolved technical issues  
Requirements get properly defined and technical issues resolved  
early — avoiding what would otherwise surface later as costly  
change requests  
Life Cycle Models 36  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

\newpage

## Study Page 028 — Life Cycle Models — PDF page 20

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 20

### Page focus

**PROTOTYPING MODEL · EXAMPLE**

### Captured source points

PROTOTYPING MODEL · EXAMPLE  
Hospital OPD Token Display EXA MP LE  
A hospital wants a screen that calls patients by token number in the outpatient department. Staff aren't sure what the display should  
look like, or how clearly it should announce each call.  
WHAT HAPPENS  
The team builds a rough screen — dummy tokens, a placeholder alert tone — in a few days  
Life Cycle Models 38  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 029 — Life Cycle Models — PDF page 21

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 21

### Page focus

**PROTOTYPING MODEL · EXAMPLE**

### Captured source points

PROTOTYPING MODEL · EXAMPLE  
Hospital OPD Token Display EXA MP LE  
A hospital wants a screen that calls patients by token number in the outpatient department. Staff aren't sure what the display should  
look like, or how clearly it should announce each call.  
Flag Issues  
Receptionists and nurses try it and flag issues: font too small, alert too soft, no colour cue for "skipped" tokens, Emergency  
patient arrives  
Requirements are refined over two more quick rounds, then the real system is built using the classical waterfall approach  
Life Cycle Models 38  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 030 — Life Cycle Models — PDF page 22

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 22

### Page focus

**PROTOTYPING MODEL**

### Captured source points

PROTOTYPING MODEL  
Merits & Demerits  
MERITS DEMERITS  
✓ Clarifies unclear user requirements through hands-on ✗ Adds cost and time to build a version that is usually thrown  
feedback, before real development starts away  
✓ Resolves unclear technical issues early (e.g. algorithm ✗ Customers may mistake the rough prototype for the (nearly)  
efficiency, response time) finished product  
✗ Risk that a hastily-built prototype design gets carried into the  
✓ Reduces the risk of costly, large-scale redesign later in the final system  
project  
✗ Needs significant, sustained customer availability for  
✓ Improves customer engagement — they see and react to feedback — not always possible  
something tangible early  
✗ Unnecessary overhead when requirements are already clear  
and well understood  
Life Cycle Models 37  
Another Problem: University Smart Campus Platform  
Case: University Smart Campus Why simple choices struggle Project realities discovered early  
Platform  
The university wants one integrated  
platform, but usable services are Core login + ID must go live first  
needed at different points of the  
Fixed full-system handover  
semester. • Too long before students/staff get any usable  
feature Departments join in different phases  
- Semester rules and workflows may change
Digital ID Attendance  
before final delivery  
- Late discovery of department-specific needs
Reports change after real usage data  
Hostel Complaints Lab Booking  
New policy rules appear each semester  
One disposable demonstration  
Certificates Training can start before all modules exist  
- A demo clarifies screens, but does not serve
real users  
- Working modules must be deployed, tested, Useful software grows in visible releases
and improved  
Each service can be useful by itself, but • Different modules mature at different speeds  
feedback from real users changes later  
services.  
V1 V2 V3 V4  
Which development approach lets us deliver useful parts early, learn from real use, and extend the system safely?  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

**Exam method:** separate the two columns explicitly. A merit is a benefit created by the model’s structure; a demerit is a consequence of that same structure under unsuitable project conditions.

\newpage

## Study Page 031 — Life Cycle Models — PDF page 23

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 23

### Page focus

**MODEL 04 OF 05**

### Captured source points

MODEL 04 OF 05  
Evolutionary Model  
Deliver the system in successive, working versions — starting with a core and growing it release by  
release.  
EVOLUTIONARY MODEL  
Grow the System in Releases  
Also called the successive-versions or incremental model.  
Release 3 — Mature  
The skeleton is refined into an increasingly  
capable, complete system  
Release 2 — Grow →  
→ New functionality is added; existing  
functionality may be enhanced  
Release 1 — Core  
The core modules are built and delivered  
first  
Each successive release is itself a functioning system, capable of doing useful work.  
Life Cycle Models 40  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

\newpage

## Study Page 032 — Life Cycle Models — PDF page 24

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 24

### Page focus

**EVOLUTIONARY MODEL**

### Captured source points

EVOLUTIONARY MODEL  
Combining Evolutionary and Iterative  
Many organizations combine iterative and incremental  
development: a new release may add functionality, and modify  
functionality already released  
Training can start on an earlier release, and customer feedback is  
folded into later ones  
Markets can be created for functionality that has never been  
offered before  
Frequent releases let developers fix unanticipated problems  
quickly  
Life Cycle Models 42  
EVOLUTIONARY MODEL · EXAMPLE  
Campus ERP System EXA MP LE  
A university commissions a campus-wide ERP system — far too large to build and deliver in one pass.  
WHAT HAPPENS  
Release 1: student admissions and enrolment — usable from day one  
Release 2: adds fee payment and library modules, informed by feedback from Release 1  
Release 3: adds hostel allocation and placement tracking, completing the core system  
Each release is a working system the university actually uses — not a throwaway demo  
Life Cycle Models 43  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 033 — Life Cycle Models — PDF page 25

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 25

### Page focus

**EVOLUTIONARY MODEL**

### Captured source points

EVOLUTIONARY MODEL  
Merits & Demerits  
MERITS DEMERITS  
✓ Users can experiment with a partially developed system long ✗ Often hard to subdivide a problem into functional units that  
before the full version ships can be built and delivered incrementally  
✓ Exact user requirements surface much earlier than in a single, ✗ Works best for very large problems, where it's easier to find  
monolithic delivery natural modules for incremental delivery  
✓ Core modules get tested thoroughly and repeatedly, reducing ✗ Harder to fix an overall cost and schedule upfront, since  
errors in the final product scope is refined release by release  
✓ Total project failure is less likely, since a working core is  
delivered early  
Life Cycle Models 41  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

**Exam method:** separate the two columns explicitly. A merit is a benefit created by the model’s structure; a demerit is a consequence of that same structure under unsuitable project conditions.

\newpage

## Study Page 034 — Life Cycle Models — PDF page 26

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 26

### Page focus

**MODEL 05 OF 05**

### Captured source points

MODEL 05 OF 05  
Spiral Model  
A risk-driven meta-model — every loop repeats objective-setting, risk analysis, development, and  
review.  
SPIRAL MODEL  
How the Spiral Model Works  
Loops as Phases Structuring the Project  
Proposed by Barry Boehm in 1988 The team decides how to structure the project into phases  
Each loop of the spiral represents a phase of the process  
Start from a generic model, and add phases for the specific  
project, or as problems are identified  
The innermost loop might address feasibility; the next,  
requirements; the next, design — and so on  
Each loop is split into four sectors (quadrants)  
There are no fixed phases — these are just examples  
Life Cycle Models 45  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 035 — Life Cycle Models — PDF page 27

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 27

### Page focus

**SPIRAL MODEL**

### Captured source points

SPIRAL MODEL  
One Model Can Combine Several  
The spiral model can also build a family of related products — each component using whichever life-cycle model suits it best.  
Component P Component Q Component R  
Built using the classical waterfall model Built using the prototyping model Built using an evolutionary model  
Together, P, Q, and R combine into the larger application A.  
Life Cycle Models 46  
SPIRAL MODEL  
Four Quadrants, Every Loop  
1. Objective Setting 2. Risk Assessment & Reduction  
Identify the objectives of this phase and examine the risks associated Analyse each identified risk in detail and take steps to reduce it  
with them  
3. Development & Validation 4. Review & Planning  
Develop and validate the next level of the product Review progress with the customer and plan the next iteration  
Life Cycle Models 47  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

\newpage

## Study Page 036 — Life Cycle Models — PDF page 28

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 28

### Page focus

**SPIRAL MODEL**

### Captured source points

SPIRAL MODEL  
Risk, in Practice  
Risk: any adverse circumstance that might hamper the successful  
completion of a software project  
Example: if there's a risk that the requirements are inappropriate,  
the team may build a prototype to reduce that risk  
With each iteration around the spiral, a progressively more  
complete version of the software gets built  
Life Cycle Models 48  
SPIRAL MODEL  
Spiral as a Meta-Model  
Subsumes all the other models discussed — a single loop of the  
spiral is essentially the waterfall model  
Uses an evolutionary approach: each iteration through the spiral  
is an evolutionary level  
Enables the team to understand and react to risk during every  
iteration  
Uses prototyping as a risk-reduction mechanism, while retaining  
the waterfall model's step-wise structure  
Life Cycle Models 49  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 037 — Life Cycle Models — PDF page 29

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 29

### Page focus

**Example: Online Examination System for a University**

### Captured source points

Example: Online Examination System for a University  
Why this project is risky One loop = one risk-driven round  
Objective Risk Develop / Validate Review / Plan  
- 5,000 students may login together
- Internet interruption can occur
- Exam security and cheating risk
- Teachers may disagree on rules The loop may produce feasibility proof,
- Failure during exam is unacceptable
requirements, design, or software — depending  
on the current risk.  
Core idea: do not move forward blindly. First reduce the biggest unresolved risk.  
LIFE CYCLE MODELS 1  
How the online exam system grows outward  
The dominant concern changes, but the four-quadrant thinking repeats.  
Loop 1 Loop 2 Loop 3 Loop 4 Loop 5  
Feasibility Requirements Design Build & Test Deploy / Improve  
Proof of feasibility Validated SRS Validated architecture Working system Safer improved system  
Increasing clarity, confidence and completeness  
Software Engineering • Spiral Model 2  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 038 — Life Cycle Models — PDF page 30

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 30

### Page focus

**LOOP 1**

### Captured source points

LOOP 1  
Feasibility — “Should we build this system at all?”  
Dominant concern: Feasibility of an Online Examination System for 5,000 students  
1 Objective 2 Risk Analysis  
Can we conduct online examinations for • Internet may fail.  
thousands of students? • Server may not support 5,000  
simultaneous students.  
- Cost may be too high.
Investigate through a small load test with  
500 simulated students.  
4 Review & Plan 3 Develop & Validate  
University reviews the result. We are not developing the whole system  
yet. We may develop:  
Decision: “Yes, proceed. In the next loop, • a small technical experiment  
determine exactly what the system should • a load-testing setup  
do.” • a rough proof-of-concept  
Result: or  
Key idea: In early loops, “Develop & Validate” may produce a study, experiment, prototype, technically  
report — notfeasible.  
full software. 1  
LOOP 2  
Requirements — “What exactly should the system do?”  
Dominant concern: Understanding and validating user requirements  
1 Objective 2 Risk Analysis  
Find the requirements. For example: • What should happen if a student’s  
- faculty creates examination internet disconnects for 5 minutes?
- student logs in • Teachers may disagree on whether
- questions appear students can go back to previous
- answers autosave questions.
- exam automatically submits
- faculty downloads results Clarify these by interviewing users and
4 Review & Plan 3 Develop  
trying & interface  
a small Validateprototype.  
The university approves the requirements. Develop the requirements specification  
(SRS), possibly supported by a prototype.  
Decision: “Requirements are sufficiently  
clear. Next we must determine how to Validate the requirements with students,  
design the system.” teachers, and administrators.  
Key idea: Here the output is mainly a validated SRS / workflow prototype, not the final software. 2  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 039 — Life Cycle Models — PDF page 31

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 31

### Page focus

**LOOP 3**

### Captured source points

LOOP 3  
Design — “How should we design it?”  
Dominant concern: Choosing a reliable and scalable architecture  
1 Objective 2 Risk Analysis  
Design an architecture capable of Major risk: “A single server may crash  
supporting 5,000 students. during the examination.”  
Alternatives considered:  
- Design A: One powerful server
- Design B: Multiple load-balanced servers
- Design C: Cloud-based scalable system
4 Review & Plan 3 Develop & Validate  
These alternatives may be tested  
The architecture is reviewed. Develop and validate the  
experimentally.  
architecture/design.  
Decision: “Use cloud servers with load  
balancing. Now we can develop the actual This still does not necessarily mean  
system.” building the complete application.  
Key idea: The main output here is a validated architecture and design decisions. 3  
LOOP 4  
Implementation — “Build the actual system”  
Dominant concern: Construction, integration, testing, and readiness for deployment  
1 Objective 2 Risk Analysis  
Build and test the examination system. Potential risks:  
- security vulnerabilities
- database failure
- cheating
- performance problems
The team evaluates and reduces these  
4 Review & Plan 3 Develop & Validate  
risks.  
The university evaluates the system and Now actual coding, integration, and testing  
plans deployment, enhancements, occur.  
maintenance, and the next loop if needed.  
A working system is produced.  
Key idea: In this loop, “Develop & Validate” really includes coding, integration, testing, and user acceptance. 4  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

\newpage

## Study Page 040 — Life Cycle Models — PDF page 32

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 32

### Page focus

**Spiral Model: University Examination System**

### Captured source points

Spiral Model: University Examination System  
KEY UNDERSTANDING  
Why Spiral is not just incremental development  
The product may grow outward, but the driving force is risk.  
Loop Main concern Biggest unresolved risk Validated output  
1 Feasibility Can 5,000 students take exam together? Feasibility proof  
2 Requirements Do users agree on disconnection, autosave and rules? Validated SRS  
3 Design Will architecture survive peak load? Validated architecture  
4 Build & test Will final system be secure and reliable? Working software  
One sentence to remember: Waterfall is phase-driven. Evolutionary is release-driven. Spiral is risk-driven.  
Software Engineering • Spiral Model 7  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

\newpage

## Study Page 041 — Life Cycle Models — PDF page 33

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 33

### Page focus

**SPIRAL MODEL**

### Captured source points

SPIRAL MODEL  
Merits & Demerits  
MERITS DEMERITS  
✓ Explicit risk analysis in every loop — the best fit for high-risk, ✗ More complex to understand and manage than simpler  
technically challenging projects models  
✓ Flexible: subsumes waterfall, prototyping, and evolutionary ✗ Demands real risk-analysis expertise — a poor risk  
ideas within one framework assessment can undermine the whole project  
✓ Strong management control, through a formal review-and- ✗ Can be costly and slow for small or low-risk projects  
plan step at the end of every loop  
✗ Not as widely used for ordinary projects, largely because of  
✓ Well suited to large, complex projects whose requirements this complexity  
evolve over time  
Life Cycle Models 50  
SPIRAL MODEL · EXAMPLE  
Autonomous Drone Delivery Software EXA MP LE  
A logistics startup is building flight-control software for autonomous delivery drones — a safety-critical system built on an unproven  
obstacle-avoidance algorithm.  
WHAT HAPPENS  
Loop 1: identify the biggest risk (can the algorithm avoid obstacles reliably?) and run a small test flight to reduce it  
Loop 2: with that risk reduced, tackle the next one — regulatory compliance — with a focused prototype and review  
Loop 3: expand scope toward the full delivery system, now that the highest risks are under control  
Each loop ends with a customer/stakeholder review before the next, larger loop begins  
Life Cycle Models 51  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

**Exam method:** separate the two columns explicitly. A merit is a benefit created by the model’s structure; a demerit is a consequence of that same structure under unsuitable project conditions.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 042 — Life Cycle Models — PDF page 34

**Source file:** `LECT2_LifeCycleModels_Redesigned.txt`  
**PDF page:** 34

### Page focus

**BRINGING IT TOGETHER**

### Captured source points

BRINGING IT TOGETHER  
Choosing the Right Model  
Model Best Suited For Key Strength Key Limitation  
Classical Waterfall Small, well-understood projects with stable Simple, disciplined, easy to manage No feedback path — defects are costly  
requirements to fix late  
Iterative Waterfall The most common case — moderate size, Feedback paths contain errors close to Still a poor fit for unclear or fast-  
reasonably well-understood requirements their source changing requirements  
Prototyping Projects where user requirements or Validates requirements and technical Extra cost; risk of the prototype  
technical issues are unclear risk early, cheaply becoming the product  
Evolutionary Very large projects that decompose into Early, working releases reduce overall Hard to decompose some problems into  
deliverable modules project risk clean increments  
Spiral Large, technically challenging, high-risk Built-in risk analysis every iteration Complex and expensive for small or low-  
projects risk projects  
Life Cycle Models 52  
Life Cycle Models — Recap  
Five ways to structure the same six phases.  
Classical Waterfall Iterative Waterfall Prototyping Evolutionary Spiral  
S. Roy · Tezpur University · Slide content courtesy Dr. Rajib Mall  

### Deep explanation

This page belongs to the life-cycle/process-model thread. Read it as a question of **how software-development activities are organized**, not as a different set of fundamental activities. Compare the page against the six-stage baseline—feasibility, requirements, design, coding, testing, maintenance—and ask what this model changes about sequencing, feedback, releases, or risk. The most important exam move is to connect the model to the project characteristic highlighted on the page: stability, uncertainty, need for feedback, natural increments, or technical risk.

\newpage

## Study Page 043 — Requirements Analysis & Specification — PDF page 1

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 1

### Page focus

**Requirements Analysis &**

### Captured source points

SOFTWARE ENGINEERING  
Requirements Analysis &  
Specification  
Turning what the customer wants into a document the whole project can build from  
Swarup Roy · Tezpur University  
OVERVIEW  
What We'll Cover  
Requirements The SRS Types of Good vs Bad Decision Formal  
Analysis Document Requirements SRS Logic Specification  
Requirements Analysis & Specification 2  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

\newpage

## Study Page 044 — Requirements Analysis & Specification — PDF page 2

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 2

### Page focus

**MOTIVATION**

### Captured source points

MOTIVATION  
Many Projects Fail Before Coding Even Starts  
Teams begin implementing the system before determining  
whether they are building what the customer really wants  
By the time the mismatch surfaces, months of coding effort may  
already be wasted  
Requirements analysis and specification exist to catch this  
mismatch early — while it is still cheap to fix  
Requirements Analysis & Specification 3  
PART 01 OF 03  
Requirements Analysis  
Understanding what the customer actually needs, before a single line of design begins.  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

\newpage

## Study Page 045 — Requirements Analysis & Specification — PDF page 3

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 3

### Page focus

**REQUIREMENTS ANALYSIS**

### Captured source points

REQUIREMENTS ANALYSIS  
Two Activities, One Deliverable  
1 2 3  
SRS Document (Reviewed &  
Requirements Gathering & Analysis → Requirements Specification →  
Approved)  
The reviewed SRS document forms the basis of all future development activities — design, coding, and testing all trace back to  
it.  
Requirements Analysis & Specification 5  
REQUIREMENTS ANALYSIS  
How Analysts Gather Requirements  
Observation of the existing system or procedures  
Studying documentation of current processes  
Discussion with the customer and end-users  
Analysis of what actually needs to be done, beyond what's simply  
asked for  
Requirements Analysis & Specification 6  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

\newpage

## Study Page 046 — Requirements Analysis & Specification — PDF page 4

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 4

### Page focus

**REQUIREMENTS ANALYSIS**

### Captured source points

REQUIREMENTS ANALYSIS  
Two Very Different Starting Points  
Automating an Existing System Building Something New  
The analyst can directly observe input/output formats and With no working system to study, gathering requirements  
operational procedures — the task is comparatively easy. demands imagination, creativity, and an experienced analyst  
with strong interaction skills.  
Either way, gathering the right requirements is rarely as simple as just asking the customer what they want.  
Requirements Analysis & Specification 7  
REQUIREMENTS ANALYSIS · EXAMPLE  
Two Ways Requirements Go Wrong  
Inconsistent Requirement Incomplete Requirement  
One customer says: The analyst records  
“turn off the heater and open the water shower when what happens above 100°C,  
temperature > 100°C”.  
but never records  
Another says: what should happen when temperature falls below 90°C —  
“turn off the heater and turn ON the cooler at the same  
threshold”. the heater should turn ON and the shower OFF. The omission  
is simply an oversight.  
The two requirements directly contradict each other.  
Inconsistency and incompleteness are the two most common defects an analyst must catch before writing the SRS.  
Requirements Analysis & Specification 8  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 047 — Requirements Analysis & Specification — PDF page 5

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 5

### Page focus

**REQUIREMENTS ANALYSIS**

### Captured source points

REQUIREMENTS ANALYSIS  
Why Careful Analysis Is Hard  
Without a working model of the problem, a clear, in-depth  
understanding is genuinely difficult to reach  
Even experienced analysts take considerable time to understand  
exactly what the customer has in mind  
Some anomalies and inconsistencies are subtle enough to escape  
even the most experienced eyes  
Building a formal model of the system helps surface many of  
these subtle issues  
Requirements Analysis & Specification 9  
REQUIREMENTS ANALYSIS  
Four Questions Every Analyst Must Answer  
What Is the Problem? Why Solve It?  
Define the problem precisely before any solution is Understand why the problem matters enough to invest  
discussed in solving it  
What Are the Possible Solutions? What Complexities Might Arise?  
Explore alternative approaches before committing to Anticipate the difficulties before they become surprises  
one  
Requirements Analysis & Specification 10  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

\newpage

## Study Page 048 — Requirements Analysis & Specification — PDF page 6

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 6

### Page focus

**REQUIREMENTS ANALYSIS · PRACTICE**

### Captured source points

REQUIREMENTS ANALYSIS · PRACTICE  
Practice Problem: ATM Cash Withdrawal PRACTICE  
A bank wants its ATMs to let a customer withdraw cash. The customer inserts a card, enters a PIN, and requests an amount. The  
system must validate the card and PIN, check that the amount does not exceed the account balance or the daily withdrawal limit, then  
dispense the cash and update the balance.  
WHAT HAPPENS  
Your task: write at least three functional requirements in standard SRS "shall" format  
Identify at least two constraints on the system  
Then represent the decision logic as both a decision tree and a decision table  
Requirements Analysis & Specification 11  
REQUIREMENTS ANALYSIS · PRACTICE — SOLUTION  
Solution: ATM Cash Withdrawal — SRS Excerpt  
3.2 FUNCTIONAL REQUIREMENTS  
ID Requirement  
FR-1 The system shall validate the customer's card and PIN before accepting a withdrawal request.  
FR-2 The system shall reject any requested amount that exceeds the available account balance.  
FR-3 The system shall reject any requested amount that would exceed the account's daily withdrawal limit.  
FR-4 The system shall dispense the requested cash and update the account balance only after all validation checks pass.  
3.4 CONSTRAINTS  
The system shall respond to a withdrawal request within 5 seconds under normal network conditions  
Cash may only be dispensed in denominations the ATM's currently loaded cassettes can supply  
The system shall retain the card after 3 consecutive incorrect PIN attempts  
Requirements Analysis & Specification 12  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

**Decision-logic cue:** every branch is a condition; every terminal result is an action. A decision table expresses the same logical cases as explicit rules, making missing combinations easier to spot.

\newpage

## Study Page 049 — Requirements Analysis & Specification — PDF page 7

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 7

### Page focus

**PART 02 OF 03**

### Captured source points

PART 02 OF 03  
The SRS Document  
Systematically organising analysed requirements into the document that governs everything that  
follows.  
THE SRS DOCUMENT  
Why Write an SRS?  
The main aim of specification is to systematically organise the  
requirements uncovered during analysis  
And to document those requirements properly, in a form everyone  
can rely on  
A well-written SRS removes ambiguity before a single design  
decision is made  
Requirements Analysis & Specification 12  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

\newpage

## Study Page 050 — Requirements Analysis & Specification — PDF page 8

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 8

### Page focus

**THE SRS DOCUMENT**

### Captured source points

THE SRS DOCUMENT  
Four Roles of the SRS Document  
Statement of User Definition for  
Contract Document Reference Document  
Needs Implementation  
Requirements Analysis & Specification 13  
THE SRS DOCUMENT  
The SRS as a Contract  
Once the SRS is approved by the customer, it becomes a contract  
between the development team and the customer  
Any later controversies are settled by referring back to the SRS  
document — not to memory or assumption  
The development team builds strictly according to what the SRS  
records  
The final product is acceptable as long as it satisfies every  
requirement recorded in the SRS  
Requirements Analysis & Specification 14  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

\newpage

## Study Page 051 — Requirements Analysis & Specification — PDF page 9

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 9

### Page focus

**THE SRS DOCUMENT**

### Captured source points

THE SRS DOCUMENT  
Black-Box Specification  
1 2 3  
Input Data → System S (Black Box) → Output Data  
The SRS documents only the visible, external input/output behaviour of the system — its internal details are deliberately left unspecified.  
Requirements Analysis & Specification 15  
THE SRS DOCUMENT  
What the SRS Should — and Shouldn't — Say  
The SRS Should The SRS Should Avoid  
State clearly WHAT needs to be done Describing HOW to do it — that's a design decision, not a  
requirement  
Use end-user terminology, not implementation jargon  
Premature technical detail that restricts the designer's options  
Serve as a careful, unambiguous contract  
Vague or literary language that different readers could interpret  
differently  
Be written so it can later be turned into a formal specification if  
needed  
Requirements Analysis & Specification 16  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

\newpage

## Study Page 052 — Requirements Analysis & Specification — PDF page 10

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 10

### Page focus

**THE SRS DOCUMENT**

### Captured source points

THE SRS DOCUMENT  
Properties of a Good SRS  
Property What It Means  
Concise & Unambiguous Says exactly what's meant, without excess text or room for misreading  
Specifies What, Not How Describes the required behaviour, not the implementation  
Easy to Change Well-structured enough that one change doesn't ripple unpredictably  
Consistent No two requirements contradict one another  
Complete Nothing important has been left out  
Traceable Each part of the spec can be traced to the design and code that implements it, and  
back  
Verifiable "The system should be user-friendly" is not verifiable — "response time under 2  
seconds" is  
Requirements Analysis & Specification 17  
THE SRS DOCUMENT  
Three Parts of Every SRS  
Functional Requirements Nonfunctional Requirements Constraints  
What the system must do, Qualities the system must have Things the system should, or  
expressed as input → output that aren't a single function should not, do  
transformations  
Requirements Analysis & Specification 18  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

\newpage

## Study Page 053 — Requirements Analysis & Specification — PDF page 11

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 11

### Page focus

**FUNCTIONAL REQUIREMENTS**

### Captured source points

FUNCTIONAL REQUIREMENTS  
Functional Requirements, Defined  
Every system can be viewed as performing a set of functions 𝒇𝒊  
Each function 𝒇𝒊 transforms a set of input data into  
input output corresponding output data  
A high-level requirement may itself consist of several identifiable  
functions  
fi  
Each function is described by its input data, its output data, and  
the processing needed to get from one to the other.  
Requirements Analysis & Specification 19  
FUNCTIONAL REQUIREMENTS · EXAMPLE  
Function F1 — Search Book EXAMPLE  
Function F1 of the Library Management System lets a member search the catalogue by author.  
WHAT HAPPENS  
Input: an author's name  
Processing: match the name against the catalogue  
Output: details of the author's books and their locations in the library  
Requirements Analysis & Specification 20  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 054 — Requirements Analysis & Specification — PDF page 12

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 12

### Page focus

**THE SRS DOCUMENT**

### Captured source points

THE SRS DOCUMENT  
Nonfunctional Requirements & Constraints  
Nonfunctional Requirements Constraints  
Qualities that can't be expressed as a single function: Things the system should or should not do:  
reliability, standards compliance,  
performance, hardware/OS/DBMS to be used,  
human-computer interface, capabilities of I/O devices,  
interfacing with other systems, how fast results must be produced,  
security, data representation required by an interfaced system.  
maintainability,  
portability,  
usability.  
Requirements Analysis & Specification 21  
STANDARD SRS STRUCTURE  
Organization of a Standard SRS Document  
Section Typical Contents  
1. Introduction Purpose, scope, definitions & abbreviations, references, document overview  
2. Overall Description Product perspective, major functions, user characteristics, general constraints and  
assumptions  
3. Specific Requirements Functional requirements, external interface requirements, performance requirements,  
design constraints  
4. Appendices / Index Supporting data, glossary, cross-reference index  
This structure follows the same shape as the IEEE 830 standard for SRS documents — a template most real-world SRS  
documents still follow today.  
Requirements Analysis & Specification 22  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

\newpage

## Study Page 055 — Requirements Analysis & Specification — PDF page 13

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 13

### Page focus

**SAMPLE SRS DOCUMENT**

### Captured source points

SAMPLE SRS DOCUMENT  
Excerpt: Requirement F1 — Search Book SRS SAMPLE  
A real SRS clause states each requirement precisely, in a standard form — never as vague prose.  
WHAT HAPPENS  
Requirement ID: F1 — Search Book · Priority: High  
Input: author's name (free text, 2–50 characters)  
Output: Title, Author, Publisher, Year of Publication, ISBN, Catalog Number, Shelf Location  
Non-functional note: response returned within 2 seconds for a catalogue of up to 200,000 titles  
Requirements Analysis & Specification 23  
INDUSTRY PRACTICE  
What a Real SRS Document Looks Like  
WHAT TO NOTICE  
A clear title block naming the product and version  
Numbered sections and subsections (1, 1.1, 1.2 …) — exactly the IEEE 830 structure  
covered in this lecture  
A definitions table instead of a wall of prose — precise and easy to scan  
A consistent footer for document identity and traceability  
Excerpt from a full SRS built earlier in this course, formatted to the  
IEEE 830 standard.  
Requirements Analysis & Specification 26  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

\newpage

## Study Page 056 — Requirements Analysis & Specification — PDF page 14

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 14

### Page focus

**EXAMPLE FUNCTIONAL REQUIREMENTS**

### Captured source points

EXAMPLE FUNCTIONAL REQUIREMENTS  
Req. 1 — Search Book, Formally Specified  
Clause Input → Output  
R.1.1 Input: "search" option selected → Output: user prompted to enter key words  
R.1.2 Input: key words → Output: details of all books whose title or author matches any key  
word (Title, Author, Publisher, Year, ISBN, Catalog No., Location). Processing: search the book  
list for the keywords.  
Requirements Analysis & Specification 24  
EXAMPLE FUNCTIONAL REQUIREMENTS  
Req. 1 — Search Book, Formally Specified  
R.1.1:  
Input: “search” option,  
Output: user prompted to enter the key words.  
R.1.2:  
Input: key words  
Output: Details of all books whose title or author  
name matches any of the key words.  
Details include: Title, Author Name, Publisher  
name, Year of Publication, ISBN Number, Catalog  
Number, Location in the Library.  
Processing: Search the book list for the keywords  
Requirements Analysis & Specification 24  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 057 — Requirements Analysis & Specification — PDF page 15

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 15

### Page focus

**EXAMPLE FUNCTIONAL REQUIREMENTS**

### Captured source points

EXAMPLE FUNCTIONAL REQUIREMENTS  
Req. 2 — Renew Book, Formally Specified  
Clause Input → Output  
R.2.1 Input: "renew" option selected → Output: user is prompted for membership number and  
password  
R.2.2 Input: Membership number & password → Output: list of borrowed books displayed, or an  
error if the password is invalid. Processing: password validation, search the borrower list.  
R.2.3 Input: User's renewal choices (via renew checkboxes) → Output: confirmation of books  
renewed. Processing: update the borrower list.  
Requirements Analysis & Specification 25  
EXAMPLE FUNCTIONAL REQUIREMENTS  
Req. 2 — Renew Book, Formally Specified  
R.2.1:  
Input: “renew” option selected,  
Output: user prompted to enter his membership number and  
password.  
R2.2:  
Input: membership number and password  
Output:  
list of the books borrowed by user are displayed. User  
prompted to enter books to be renewed or  
user informed about bad password  
Processing: Password validation, search books issued to the user  
from borrower list and display.  
R2.3:  
Input: user choice for renewal of the books issued to him through  
mouse clicks in the corresponding renew box.  
Output: Confirmation of the books renewed  
Processing: Renew the books selected by the in the borrower list.  
Requirements Analysis & Specification 25  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 058 — Requirements Analysis & Specification — PDF page 16

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 16

### Page focus

**GOOD VS BAD SRS**

### Captured source points

GOOD VS BAD SRS  
Examples of a Bad SRS (1 of 2)  
Unstructured Specification Noise  
A narrative essay — one of the worst formats: hard to Text present that is simply irrelevant to the problem  
change, hard to be precise or unambiguous, prone to  
contradiction  
Silence Overspecification  
Aspects important to the solution are left out entirely Describing HOW to do it — e.g. dictating names be  
stored in sorted order — needlessly restricts the  
designer  
Requirements Analysis & Specification 26  
GOOD VS BAD SRS  
Examples of a Bad SRS (2 of 2)  
Contradictions Ambiguity  
The same requirement described differently in two Literary or unquantifiable language, like "a good user  
places in the document interface"  
Forward References Wishful Thinking  
References to something the document only defines Describing an aspect for which no realistic solution  
later on actually exists  
Requirements Analysis & Specification 27  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 059 — Requirements Analysis & Specification — PDF page 17

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 17

### Page focus

**PART 03 OF 03**

### Captured source points

PART 03 OF 03  
Decision Logic & Formal Specification  
Representing complex conditional logic precisely — and, sometimes, mathematically.  
DECISION LOGIC  
Representing Complex Processing Logic  
Decision Trees Decision Tables  
Edges represent conditions; leaf nodes represent the The same condition/action logic laid out as rows in a  
action to take table — often easier to check for completeness  
Both give a graphic — or tabular — view of the logic involved in decision-making, and the actions that follow.  
Requirements Analysis & Specification 29  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

**Decision-logic cue:** every branch is a condition; every terminal result is an action. A decision table expresses the same logical cases as explicit rules, making missing combinations easier to spot.

\newpage

## Study Page 060 — Requirements Analysis & Specification — PDF page 18

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 18

### Page focus

**DECISION LOGIC**

### Captured source points

DECISION LOGIC  
Decision Trees, Defined  
Edges of the tree represent the conditions being tested  
Leaf nodes represent the actions to be performed once a path of  
conditions is satisfied  
Together they give a clear graphic view of decision logic and its  
resulting actions  
They work best when the number of conditions and actions is  
small enough to stay readable as a tree  
Requirements Analysis & Specification 30  
DECISION LOGIC · EXAMPLE  
Example: LMS — Three Membership Options  
New Member Renewal Cancel Membership  
Collects the member's name, Validates the member and extends Validates the member and closes  
address, and phone number their membership out their record  
The Library Membership automation Software (LMS) is a small system, but its logic branches exactly the way a real decision tree  
does.  
Requirements Analysis & Specification 31  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

**Decision-logic cue:** every branch is a condition; every terminal result is an action. A decision table expresses the same logical cases as explicit rules, making missing combinations easier to spot.

\newpage

## Study Page 061 — Requirements Analysis & Specification — PDF page 19

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 19

### Page focus

**DECISION LOGIC · EXAMPLE**

### Captured source points

DECISION LOGIC · EXAMPLE  
LMS Options as a Decision Table  
CONDITION ACTION TAKEN  
Create a membership record and print a bill for  
New Member: valid details entered →  
the annual charge plus security deposit  
Update the membership expiry date and print  
Renewal: valid member and membership number →  
the annual renewal bill  
Display an error message — no record is  
Renewal: invalid member →  
changed  
Cancel the membership, print a cheque for the  
Cancel Membership: valid member →  
balance due, and delete the record  
Requirements Analysis & Specification 32  
DECISION LOGIC · PRACTICE EXAMPLE  
Decision Tree — ATM Cash Withdrawal  
Card & PIN Valid?  
No Yes  
✗ Reject Transaction — Display Error, Amount ≤ Balance & Daily Limit?  
Retain/Eject Card  
No Yes  
✗ Reject — Insufficient Funds / ✓ Dispense Cash, Update Balance,  
Limit Exceeded Print Receipt  
Each edge tests one condition; each leaf is the action taken once the path of conditions is resolved.  
Requirements Analysis & Specification 36  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

**Decision-logic cue:** every branch is a condition; every terminal result is an action. A decision table expresses the same logical cases as explicit rules, making missing combinations easier to spot.

\newpage

## Study Page 062 — Requirements Analysis & Specification — PDF page 20

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 20

### Page focus

**DECISION LOGIC · PRACTICE EXAMPLE**

### Captured source points

DECISION LOGIC · PRACTICE EXAMPLE  
Decision Table — ATM Cash Withdrawal  
Card & PIN Valid? Amount ≤ Balance & Daily Limit? Action  
Y Y Dispense the cash, update the balance, and print a receipt  
Y N Reject: display "insufficient funds / limit exceeded" and return the card  
N — Reject the transaction, display an invalid card/PIN message, and retain or eject the  
card per policy  
The same branching logic as the decision tree, laid out as rules — easier to scan for a missing or duplicated case.  
Requirements Analysis & Specification 37  
SOFTWARE ENGINEERING  
Precise, mathematical requirements — what they are, why they matter, and how to write them  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

**Decision-logic cue:** every branch is a condition; every terminal result is an action. A decision table expresses the same logical cases as explicit rules, making missing combinations easier to spot.

\newpage

## Study Page 063 — Requirements Analysis & Specification — PDF page 21

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 21

### Page focus

**WHAT**

### Captured source points

WHAT  
What Is Formal Specification?  
A formal specification technique is a mathematical method for  
describing a system's required behaviour  
It replaces natural-language prose with set theory and predicate  
logic, so every statement has exactly one meaning  
The system's state is modelled as a set of variables, and each  
operation is defined by what must be true before and after it runs  
Formal Specification 3  
WHY  
Why Use Formal Specification?  
Natural-language requirements are easy to write but easy to  
misread — the same sentence can mean different things to  
different readers  
A formal specification removes that ambiguity: it can be checked  
with the same rigour as a mathematical proof  
It lets you verify that an implementation actually satisfies the  
specification, and prove properties of the specification itself —  
before a line of code is written  
It is most valuable exactly where a mistake is most expensive:  
safety-critical and high-reliability systems  
Formal Specification 4  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

\newpage

## Study Page 064 — Requirements Analysis & Specification — PDF page 22

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 22

### Page focus

**How Is It Done?**

### Captured source points

HOW  
How Is It Done?  
1. Choose a Notation 2. Model the State 3. Define Each Operation  
Pick a formal notation with well- Identify the variables the system needs State a precondition — what must  
defined mathematical semantics to remember hold for the operation to run  
Z notation is one of the most widely Group them, with their types, into a State a postcondition — what must be  
used standards for this named "schema" true once it has run  
Formal Specification 5  
PART 02 OF 03  
Z Notation  
A closer look at the standard we'll use to actually write a formal specification.  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

**Formal-specification cue:** distinguish the state before the operation, the conditions that permit the operation, and the state after the operation. Primed variables are after-values in the worked Z example.

\newpage

## Study Page 065 — Requirements Analysis & Specification — PDF page 23

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 23

### Page focus

**Z NOTATION**

### Captured source points

Z NOTATION  
What Is Z Notation?  
Developed at Oxford University in the early 1980s, built on set  
theory and first-order predicate logic  
Organises a specification into "schemas" — self-contained boxes  
that group related declarations and constraints  
Separates the description of state (what the system remembers)  
from the description of operations (how that state may change)  
Used across industry on safety- and reliability-critical systems,  
including IBM's CICS transaction processing system  
Formal Specification 7  
Z NOTATION · REFERENCE  
List of Notations — Types & Schema Conventions  
Symbol / Convention Interpretation  
ℕ, ℤ Natural numbers, integers — the basic types a declared variable can hold  
Schema box A named box with two parts: declarations on top, predicates (constraints) below  
Δ (Delta) before a name This operation changes the system's state  
Ξ (Xi) before a name This operation reads the state but changes nothing (a query)  
x? An input to the operation  
x! An output from the operation  
x, x′ The value of x before the operation, and after it (the "primed" value)  
Formal Specification 8  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

**Formal-specification cue:** distinguish the state before the operation, the conditions that permit the operation, and the state after the operation. Primed variables are after-values in the worked Z example.

\newpage

## Study Page 066 — Requirements Analysis & Specification — PDF page 24

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 24

### Page focus

**Z NOTATION · REFERENCE**

### Captured source points

Z NOTATION · REFERENCE  
List of Notations — Logical & Set Operators  
Symbol Interpretation  
∧, ∨, ¬ Logical AND, OR, NOT  
⇒, ⇔ "Implies", and "if and only if"  
∀, ∃ "For all", and "there exists"  
∈, ⊆ "Is a member of" a set, and "is a subset of" a set  
∪, ∩ Set union, and set intersection  
→ A total function from one set to another  
dom, ran The domain (valid inputs) and range (possible outputs) of a function  
Formal Specification 9  
FIRST-ORDER PREDICATE LOGIC · INTRO  
Introduction to First-Order Predicate Logic  
A predicate is a statement about one or more objects that is either true  
or false — e.g. PassedAll(s), Available(b). It becomes an ordinary  
Boolean once its objects are fixed  
Predicates combine using the connectives ∧ (and), ∨ (or), ¬ (not), ⇒  
(implies), and ⇔ (if and only if) — exactly as in propositional logic  
∀ x ∈ S reads "for every x in S"; ∃ x ∈ S reads "there exists an x in S".  
Everything after the • is its scope — e.g. in ∀ s ∈ Students •  
PassedAll(s) ⇒ Graduates(s), the teal part is ∀ s's scope, even past ⇒  
Almost every specification rule has the same shape: ∀ x ∈ Domain •  
Condition(x) ⇒ Conclusion(x) — "for every x satisfying the condition,  
the conclusion must follow". Spot the domain, the condition, and the  
conclusion first, and the formula follows  
Formal Specification 10  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

\newpage

## Study Page 067 — Requirements Analysis & Specification — PDF page 25

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 25

### Page focus

**FIRST-ORDER PREDICATE LOGIC · GENERAL EXAMPLE**

### Captured source points

FIRST-ORDER PREDICATE LOGIC · GENERAL EXAMPLE  
From a General Statement to Formal Logic  
P LA I N E N GLI S H F O R M A L LO GI C  
"Every student ..." → ∀ s ∈ Students — for every student s  
PassedAll(s) — a predicate, true when s has passed  
"... who has passed all exams ..." →  
all exams  
"... graduates." → Graduates(s) — a predicate, true when s graduates  
"if ... then ..." → ⇒ — logical implication  
Putting it together: "Every student who has passed all  
→ ∀ s ∈ Students • PassedAll(s) ⇒ Graduates(s)  
exams graduates."  
Formal Specification 11  
FIRST-ORDER PREDICATE LOGIC · SOFTWARE EXAMPLE  
The Same Pattern, Applied to Software  
P LA I N E N GLI S H F O R M A L LO GI C  
"Every request ..." → ∀ r ∈ Requests — for every request r  
¬Authenticated(r) — negation, using ¬ ("fails" = "is  
"... that fails authentication ..." →  
not")  
"... is rejected." → Rejected(r) — a predicate, true when r is rejected  
"if ... then ..." → ⇒ — logical implication  
Putting it together: "Every request that fails  
→ ∀ r ∈ Requests • ¬Authenticated(r) ⇒ Rejected(r)  
authentication is rejected."  
Formal Specification 12  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 068 — Requirements Analysis & Specification — PDF page 26

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 26

### Page focus

**FORMAL LOGIC · TRANSLATION GUIDE**

### Captured source points

FORMAL LOGIC · TRANSLATION GUIDE  
Turning English Into Formal Logic — Key Phrases  
English Phrase (Look For This) Symbol What It Means  
"All", "every", "each" ... ∀ For every element of a set — introduces a universally  
quantified variable  
"Some", "there exists", "at least one" ... ∃ For at least one element of a set — introduces an  
existentially quantified variable  
"... and ...", "both ... and ..." ∧ Logical AND — both conditions must hold together  
"... or ...", "either ... or ..." ∨ Logical OR — at least one condition must hold  
"not", "no", "never", "none" ¬ Logical NOT — negates the condition that follows  
"if ... then ...", "... implies ..." ⇒ Implication — whenever the left side is true, the right side  
must be too  
"... if and only if ..." ⇔ Biconditional — the two sides are always both true or both  
false  
Exam tip: underline these phrases first in the problem statement, then assemble the formula left to right — quantifier, then condition, then  
connective.  
Formal Specification 11  
PRACTICE CASE STUDY 1 · LIBRARY SYSTEM  
Case Study: Library Book-Issue Rule  
PLAIN ENGLISH FORMAL LOGIC  
∀ m ∈ Members, b ∈ Books • ... ⇒ MayIssue(m,  
"A member may issue a book if ..." →  
b)  
"... the member has no overdue books ..." → ¬HasOverdue(m) — negation, using ¬  
"... and ..." → ∧ — both conditions must hold  
"... the book is available." → Available(b)  
Putting it together: "A member may issue a  
∀ m ∈ Members, b ∈ Books • (¬HasOverdue(m) ∧  
book if the member has no overdue books and →  
Available(b)) ⇒ MayIssue(m, b)  
the book is available."  
Formal Specification 12  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 069 — Requirements Analysis & Specification — PDF page 27

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 27

### Page focus

**PRACTICE CASE STUDY 2 · COURSE REGISTRATION**

### Captured source points

PRACTICE CASE STUDY 2 · COURSE REGISTRATION  
Case Study: Course-Registration Rule  
PLAIN ENGLISH FORMAL LOGIC  
∀ s ∈ Students, c ∈ Courses • ... ⇒  
"A student can register for a course if ..." →  
CanRegister(s, c)  
"... a seat is available ..." (at least one free seat ∃ seat ∈ Seats(c) • Free(seat) — existential,  
→  
exists) using ∃  
"... or ..." → ∨ — at least one condition must hold  
"... the student has special permission." → HasPermission(s, c)  
Putting it together: "A student can register if a ∀ s ∈ Students, c ∈ Courses • ((∃ seat ∈ Seats(c)  
seat is available or the student has special → • Free(seat)) ∨ HasPermission(s, c)) ⇒  
permission." CanRegister(s, c)  
Formal Specification 13  
FIRST-ORDER PREDICATE LOGIC · PRACTICE  
More Practice: Statement → Logic  
No breakdown this time — read the statement, then check your own translation against the logic below it.  
“Every employee has a unique employee ID.”  
→ ∀ e1, e2 ∈ Employees • e1 ≠ e2 ⇒ ID(e1) ≠ ID(e2)  
“At least one administrator is logged in at all times.”  
→ ∃ u ∈ Users • IsAdmin(u) ∧ LoggedIn(u)  
“No file can be both encrypted and publicly readable.”  
→ ∀ f ∈ Files • ¬(Encrypted(f) ∧ PubliclyReadable(f))  
Formal Specification 16  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 070 — Requirements Analysis & Specification — PDF page 28

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 28

### Page focus

**FIRST-ORDER PREDICATE LOGIC · PRACTICE**

### Captured source points

FIRST-ORDER PREDICATE LOGIC · PRACTICE  
More Practice: Statement → Logic (Continued)  
“A product is out of stock if and only if its quantity is zero.”  
→ ∀ p ∈ Products • OutOfStock(p) ⇔ Quantity(p) = 0  
“Every transaction must be either logged or flagged as suspicious.”  
→ ∀ t ∈ Transactions • Logged(t) ∨ Flagged(t)  
“All passwords must be at least eight characters long.”  
→ ∀ pw ∈ Passwords • Length(pw) ≥ 8  
Formal Specification 17  
Z NOTATION  
How to Write a Z Schema, Step by Step  
1 2 3 4 5  
Identify the State → Write the State Schema → Name the Operation → Add Inputs & Outputs → Write Pre/Postconditions  
We'll follow exactly these five steps, in order, to build a complete formal specification in the worked example that follows.  
Formal Specification 14  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

**Formal-specification cue:** distinguish the state before the operation, the conditions that permit the operation, and the state after the operation. Primed variables are after-values in the worked Z example.

\newpage

## Study Page 071 — Requirements Analysis & Specification — PDF page 29

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 29

### Page focus

**WORKED EXAMPLE**

### Captured source points

WORKED EXAMPLE  
The Problem, Informally EXAMPLE  
A bank wants its ATMs to let a customer withdraw cash. The customer inserts a card, enters a PIN, and requests an amount. The  
system must check the amount against the account balance and the daily withdrawal limit, then dispense the cash and update the  
balance.  
WHAT HAPPENS  
Before we can write this formally, we need to know what the system must remember (its state)  
Then we need to know what must be true before, and after, a withdrawal is allowed to happen  
The next five slides build that specification up one step at a time  
Formal Specification 16  
STEP 1 OF 5  
Identify the State  
Before writing any notation, ask in plain language: what does the  
ATM need to remember between transactions?  
The current account balance  
How much has already been withdrawn today  
The daily withdrawal limit for the account  
Formal Specification 17  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 072 — Requirements Analysis & Specification — PDF page 30

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 30

### Page focus

**STEP 2 OF 5**

### Captured source points

STEP 2 OF 5  
Write the State Schema  
IN PLAIN ENGLISH  
ATM  
This schema names the state and gives each variable a type  
balance, dailyWithdrawn : ℕ — every value here is a natural number  
dailyLimit : ℕ  
The line below the second divider is the invariant: a fact  
dailyWithdrawn ≤ dailyLimit  
that must always stay true, no matter what operations run  
Here, the invariant says the amount already withdrawn  
today can never exceed the daily limit  
Formal Specification 18  
STEP 3 OF 5  
Name the Operation & Add Its Input  
IN PLAIN ENGLISH  
Withdraw  
Amber lines (+) are what's new this step  
+ ΔATM  
+ amt? : ℕ  
"Withdraw" is the name of the operation we're specifying  
ΔATM declares that this operation changes the state  
described by the ATM schema  
amt? declares the one input this operation needs: the  
amount requested  
Formal Specification 19  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

**Formal-specification cue:** distinguish the state before the operation, the conditions that permit the operation, and the state after the operation. Primed variables are after-values in the worked Z example.

\newpage

## Study Page 073 — Requirements Analysis & Specification — PDF page 31

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 31

### Page focus

**STEP 4 OF 5**

### Captured source points

STEP 4 OF 5  
Write the Precondition  
I N P LA I N EN GLI S H  
Withdraw  
Amber lines (+) are what's new this step  
ΔATM  
amt? : ℕ  
A precondition states what must already be true for the operation to  
+ amt? ≤ balance be allowed to run  
+ dailyWithdrawn + amt? ≤ dailyLimit  
Here: the request can't exceed the current balance, and can't push  
today's total past the daily limit  
If either line is false, this operation is not defined — the ATM must  
not dispense cash  
Formal Specification 20  
STEP 5 OF 5  
Write the Postcondition  
I N P LA I N EN GLI S H  
Withdraw  
Amber lines (+) are what's new this step  
ΔATM  
amt? : ℕ  
A postcondition states what must be true once the operation has  
amt? ≤ balance finished  
dailyWithdrawn + amt? ≤ dailyLimit  
+ balance′ = balance − amt? The primed variables (balance′, dailyWithdrawn′) are the after-values  
+ dailyWithdrawn′ = dailyWithdrawn + amt?  
The specification is now complete: every precondition and  
postcondition is written  
Formal Specification 21  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

**Formal-specification cue:** distinguish the state before the operation, the conditions that permit the operation, and the state after the operation. Primed variables are after-values in the worked Z example.

\newpage

## Study Page 074 — Requirements Analysis & Specification — PDF page 32

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 32

### Page focus

**WORKED EXAMPLE · RESULT**

### Captured source points

WORKED EXAMPLE · RESULT  
The Complete Specification  
I N P LA I N EN GLI S H  
Withdraw  
ΔATM means this operation changes the ATM's state  
ΔATM  
amt? : ℕ  
amt? is the amount the customer requests to withdraw  
amt? ≤ balance  
dailyWithdrawn + amt? ≤ dailyLimit  
balance′ = balance − amt? Precondition: the request can't exceed the balance or the daily limit  
dailyWithdrawn′ = dailyWithdrawn + amt?  
Postcondition: the balance and daily total are updated by exactly  
that amount  
Formal Specification 22  
FORMAL SPECIFICATION  
Formal Specification — Merits & Demerits  
MERITS DEMERITS  
✓ Well-defined semantics leave no scope for ambiguity ✗ Difficult to learn and use without a strong mathematical  
background  
✓ Automated tools can check properties of the specification  
✗ Not well suited to handling very large, complex systems  
✓ A specification can sometimes be executed directly, as a  
working prototype  
Formal Specification 23  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

**Exam method:** separate the two columns explicitly. A merit is a benefit created by the model’s structure; a demerit is a consequence of that same structure under unsuitable project conditions.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

**Formal-specification cue:** distinguish the state before the operation, the conditions that permit the operation, and the state after the operation. Primed variables are after-values in the worked Z example.

\newpage

## Study Page 075 — Requirements Analysis & Specification — PDF page 33

**Source file:** `LECT3_Requirements_Analysis_Specification_Redesigned.txt`  
**PDF page:** 33

### Page focus

**Requirements Analysis & Specification**

### Captured source points

A recap: from a customer's rough idea to a precise, contractual document.  
Requirements Analysis The SRS Document Good vs Bad SRS Decision Logic Formal Specification  
S. Roy · Tezpur University  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

\newpage

## Study Page 076 — Software Design — PDF page 1

**Source file:** `LECT4_Software_Design_Redesigned.txt`  
**PDF page:** 1

### Page focus

**Software Design**

### Captured source points

SOFTWARE ENGINEERING  
Turning a validated SRS into a module structure a programming language can implement  
Swarup Roy · Tezpur University ·  
OVERVIEW  
What We'll Cover  
Module  
Intro Good Design Cohesion Coupling FOD vs OOD Case Study  
Hierarchy  
Software Design 2  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

**Design cue:** ask “Why are these responsibilities in the same module?” A stronger answer means stronger cohesion.

**Design cue:** ask “What must this module know about the other module?” Less cross-boundary dependency generally means looser coupling.

\newpage

## Study Page 077 — Software Design — PDF page 2

**Source file:** `LECT4_Software_Design_Redesigned.txt`  
**PDF page:** 2

### Page focus

**PART 01 OF 07**

### Captured source points

PART 01 OF 07  
Introduction to Design  
Where design fits between requirements and code, and what it actually produces.  
INTRODUCTION  
The Design Phase  
The design phase transforms the SRS document into a form that  
is easily implementable in a programming language  
It takes the SRS document as input, and produces design  
documents as output  
Design decides: the module structure, how modules call and  
control each other, the interfaces and data exchanged between  
them, each module's own data structures, and the algorithms it  
runs  
Software Design 4  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

\newpage

## Study Page 078 — Software Design — PDF page 3

**Source file:** `LECT4_Software_Design_Redesigned.txt`  
**PDF page:** 3

### Page focus

**INTRODUCTION**

### Captured source points

INTRODUCTION  
Anatomy of a Module: Data + Functions  
Data Functions  
D1 — e.g. a customer record F1 — e.g. validateInput()  
F2 — e.g. computeInterest()  
D2 — e.g. an account balance  
F3 — e.g. postTransaction()  
F4 — e.g. generateReceipt()  
D3 — e.g. a transaction log  
F5 — e.g. auditEntry()  
Software Design 5  
INTRODUCTION  
High-Level Design vs. Detailed Design  
High-Level Design Detailed Design  
Identify the modules For each module, design its data  
structures  
Identify control relationships among For each module, design its algorithms  
modules Code-ready  
Validated SRS → → →  
Identify the interfaces among modules module specs  
Usual notation: the structure chart  
Outcome: the program structure Outcome: module specs, detailed  
(software architecture) enough to code from  
Software Design 6  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

\newpage

## Study Page 079 — Software Design — PDF page 4

**Source file:** `LECT4_Software_Design_Redesigned.txt`  
**PDF page:** 4

### Page focus

**PART 02 OF 07**

### Captured source points

PART 02 OF 07  
What Makes a Design Good?  
There's no single correct design — so we need a way to tell a good one from a bad one.  
GOOD DESIGN  
A Fundamental Question  
How do we distinguish between a good design and a bad one?  
There is no single, unique way to design a system — even using  
the same methodology, different engineers reach very different  
solutions  
Unless we know what a good software design actually looks  
like, we can't possibly design one  
Software Design 8  

### Deep explanation

This page belongs to the design thread. The central job is to transform a validated SRS into a structure that programmers can implement and maintain. When the page talks about cohesion, ask how strongly the responsibilities inside one module belong together. When it talks about coupling, ask how much dependency crosses a module boundary. When it talks about hierarchy, inspect control, fan-in, fan-out, depth, width, and layering. For FOD versus OOD, identify what is treated as the primary design unit—functions or objects—and where system state lives.

\newpage

## Study Page 080 — Software Design — PDF page 5

**Source file:** `LECT4_Software_Design_Redesigned.txt`  
**PDF page:** 5

### Page focus

**GOOD DESIGN**

### Captured source points

GOOD DESIGN  
What is Good Software Design?  
Correct Understandable Efficient Maintainable  
Implements every functionality A clear, readable structure that Uses processing time and Easy to change safely as  
specified in the SRS other engineers can follow resources sensibly requirements evolve  
Software Design 9  
GOOD DESIGN  
KEY INSIGHT  
Why Understandability Matters Most  
Understandability is the property that determines the goodness of nearly everything else. A design that is  
easy to understand is also easy to maintain and change — and maintenance is not a small slice of a  
system's life.  
WHAT HAPPENS  
About 60% of total lifecycle effort is typically spent on maintenance, not initial development  
If a design is hard to understand, that maintenance effort multiplies many times over  
Every other quality — efficiency, correctness, extensibility — is harder to verify in a design nobody can follow  
Software Design 10  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

\newpage

## Study Page 081 — Software Design — PDF page 6

**Source file:** `LECT4_Software_Design_Redesigned.txt`  
**PDF page:** 6

### Page focus

**GOOD DESIGN**

### Captured source points

GOOD DESIGN  
Modularity: Divide and Conquer  
Modularity is a fundamental attribute of any good design  
A design solution should consist of a cleanly decomposed set  
of modules — the classic divide-and-conquer principle  
If modules are nearly independent of one another, each can be  
understood on its own, which greatly reduces overall complexity  
Modules should also be neatly arranged in a hierarchy — a  
clean, tree-like diagram, not a tangle  
Software Design 11  
GOOD DESIGN  
Modularity: Divide and Conquer  
Modularity is a fundamental attribute of any good design: decompose the system into a cleanly organized set of modules —  
the classic divide-and-conquer principle.  
Payroll System  
Employee Records Time & Attendance Deductions & Tax Payslip Generation  
Nearly-independent modules are each understandable on their own — and the hierarchy stays a clean tree, not a tangle.  
Software Design 11  

### Deep explanation

This page belongs to the design thread. The central job is to transform a validated SRS into a structure that programmers can implement and maintain. When the page talks about cohesion, ask how strongly the responsibilities inside one module belong together. When it talks about coupling, ask how much dependency crosses a module boundary. When it talks about hierarchy, inspect control, fan-in, fan-out, depth, width, and layering. For FOD versus OOD, identify what is treated as the primary design unit—functions or objects—and where system state lives.

\newpage

## Study Page 082 — Software Design — PDF page 7

**Source file:** `LECT4_Software_Design_Redesigned.txt`  
**PDF page:** 7

### Page focus

**GOOD DESIGN**

### Captured source points

GOOD DESIGN  
Cohesion and Coupling: The Two Yardsticks  
Cohesion Coupling  
A measure of the functional strength of a single A measure of how interdependent two modules  
module are  
A cohesive module performs one clearly Depends on the complexity of the interface  
describable task between them  
High cohesion → easier to understand in isolation, Low coupling → a change in one module is  
fewer errors propagate, more reusable unlikely to break another  
Software Design 12  
PART 03 OF 07  
Cohesion  
Classifying how tightly the responsibilities inside one module actually belong together.  

### Deep explanation

This page belongs to the design thread. The central job is to transform a validated SRS into a structure that programmers can implement and maintain. When the page talks about cohesion, ask how strongly the responsibilities inside one module belong together. When it talks about coupling, ask how much dependency crosses a module boundary. When it talks about hierarchy, inspect control, fan-in, fan-out, depth, width, and layering. For FOD versus OOD, identify what is treated as the primary design unit—functions or objects—and where system state lives.

**Design cue:** ask “Why are these responsibilities in the same module?” A stronger answer means stronger cohesion.

**Design cue:** ask “What must this module know about the other module?” Less cross-boundary dependency generally means looser coupling.

\newpage

## Study Page 083 — Software Design — PDF page 8

**Source file:** `LECT4_Software_Design_Redesigned.txt`  
**PDF page:** 8

### Page focus

**COHESION**

### Captured source points

COHESION  
Classifying Cohesion — Worst to Best  
The classification is somewhat subjective, but it gives a practical scale for judging how cohesive a module is.  
LOW COHESION — WORST HIGH COHESION — BEST  
Communication  
Coincidental Logical Temporal Procedural Sequential Functional  
al  
Functional cohesion is the goal: every element in the module serves one clearly describable purpose.  
Software Design 14  
COHESION · REFERENCE  
Types of Cohesion  
Type Description Example  
Coincidental Elements are grouped with no meaningful relationship at A module that prints an error, reads a file, and  
all opens a socket — with nothing in common  
Logical Similar-category operations, selected by a passed-in flag One generic I/O routine for files, keyboard, and  
network, chosen by a parameter  
Temporal Elements are related only because they run in the same A start-up routine doing initialization, logging  
time window setup, and opening connections  
Procedural Elements follow a fixed sequence of steps in one The successive stages of a message-decoding  
procedure algorithm  
Communicational Elements all operate on the same data structure A set of functions that all read and update one  
shared array or stack  
Sequential Output of one element feeds directly into the next sort() → search() → display(), chained in a pipeline  
Functional Every element contributes to one single, well-defined task computeOvertime(), computeWorkHours(),  
computeDeductions() in a payroll module  
Software Design 15  

### Deep explanation

This page belongs to the design thread. The central job is to transform a validated SRS into a structure that programmers can implement and maintain. When the page talks about cohesion, ask how strongly the responsibilities inside one module belong together. When it talks about coupling, ask how much dependency crosses a module boundary. When it talks about hierarchy, inspect control, fan-in, fan-out, depth, width, and layering. For FOD versus OOD, identify what is treated as the primary design unit—functions or objects—and where system state lives.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

**Design cue:** ask “Why are these responsibilities in the same module?” A stronger answer means stronger cohesion.

\newpage

## Study Page 084 — Software Design — PDF page 9

**Source file:** `LECT4_Software_Design_Redesigned.txt`  
**PDF page:** 9

### Page focus

**COHESION · CODE EXAMPLES**

### Captured source points

COHESION · CODE EXAMPLES  
Each Type of Cohesion, in Code  
Coincidental Logical Temporal Procedural  
function utilityBag() { function ioHandler(k) { function startup() { function decode(msg) {  
logError(); if (k === "file") initVars(); parseHeader(msg);  
readConfigFile(); readFile(); setupLogging(); verifyChecksum(msg);  
openSocket(); else readKeyboard(); openConnections(); extractPayload(msg);  
} } } }  
Communicational Sequential Functional  
function useStack(s) { function search(data) { function payroll(emp) {  
push(s, 1); const s = sort(data); computeWorkHours(emp);  
pop(s); return find(s); computeOvertime(emp);  
peek(s); } computeDeductions(emp);  
} }  
Worst to best, left to right, top to bottom — same order as the classification scale.  
Software Design 16  
COHESION  
Determining Cohesiveness: A Quick Test  
Write one sentence describing what the module does  
If the sentence is compound (joined by “and”), it likely has  
sequential or communicational cohesion  
If it uses words like “first”, “next”, “after”, “then”, it likely has  
sequential or temporal cohesion  
If it uses a word like “initialize”, it probably has temporal  
cohesion  
A single, simple sentence with none of these — that's the sign  
of functional cohesion  
Software Design 16  

### Deep explanation

This page belongs to the design thread. The central job is to transform a validated SRS into a structure that programmers can implement and maintain. When the page talks about cohesion, ask how strongly the responsibilities inside one module belong together. When it talks about coupling, ask how much dependency crosses a module boundary. When it talks about hierarchy, inspect control, fan-in, fan-out, depth, width, and layering. For FOD versus OOD, identify what is treated as the primary design unit—functions or objects—and where system state lives.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

**Design cue:** ask “Why are these responsibilities in the same module?” A stronger answer means stronger cohesion.

\newpage

## Study Page 085 — Software Design — PDF page 10

**Source file:** `LECT4_Software_Design_Redesigned.txt`  
**PDF page:** 10

### Page focus

**COHESION**

### Captured source points

COHESION  
Determining Cohesiveness: A Quick Test  
Write one sentence describing what the module does, then check the sentence itself against these cues:  
“startup() initializes variables, sets up logging, and opens connections.”  
→ Uses “initializes” → temporal cohesion  
“useStack() pushes an item, pops an item, and peeks at the same stack.”  
→ Compound with “and”, same data structure → communicational cohesion  
“search() sorts the data and then finds the match.”  
→ Compound, uses “then” → sequential cohesion  
“payroll() computes the overtime pay for an employee.”  
→ One simple sentence, no compounding → functional cohesion  
Software Design 17  
PART 04 OF 07  
Coupling  
Classifying how tightly two separate modules are tangled up with each other.  

### Deep explanation

This page belongs to the design thread. The central job is to transform a validated SRS into a structure that programmers can implement and maintain. When the page talks about cohesion, ask how strongly the responsibilities inside one module belong together. When it talks about coupling, ask how much dependency crosses a module boundary. When it talks about hierarchy, inspect control, fan-in, fan-out, depth, width, and layering. For FOD versus OOD, identify what is treated as the primary design unit—functions or objects—and where system state lives.

**Design cue:** ask “Why are these responsibilities in the same module?” A stronger answer means stronger cohesion.

**Design cue:** ask “What must this module know about the other module?” Less cross-boundary dependency generally means looser coupling.

\newpage

## Study Page 086 — Software Design — PDF page 11

**Source file:** `LECT4_Software_Design_Redesigned.txt`  
**PDF page:** 11

### Page focus

**COUPLING**

### Captured source points

COUPLING  
Classifying Coupling — Best to Worst  
There is no way to measure coupling precisely — but classifying its type approximates the degree of interdependence.  
LOOSE COUPLING — BEST TIGHT COUPLING — WORST  
Data Stamp Control Common Content  
Design for data coupling wherever possible — it keeps modules as independent of one another as the problem allows.  
Software Design 18  
COUPLING · REFERENCE  
Types of Coupling  
Type Description Example  
Data Modules exchange only an elementary data item An integer amount passed as a single  
through a parameter parameter  
Stamp Modules exchange a composite (structured) data A whole Order record passed, even though  
item only order.total is used  
Control One module passes a flag that directs the other's An isRushOrder flag that selects which  
logic branch runs  
Common Modules share access to the same global data Two modules both reading and writing one  
global inventoryCount  
Content One module directly reaches into or branches into Jumping into the middle of another  
another's internals module's code  
Coupling gets worse from left to right — data coupling is the loosest and most desirable; content coupling is the  
tightest and almost always a defect.  
Software Design 19  

### Deep explanation

This page belongs to the design thread. The central job is to transform a validated SRS into a structure that programmers can implement and maintain. When the page talks about cohesion, ask how strongly the responsibilities inside one module belong together. When it talks about coupling, ask how much dependency crosses a module boundary. When it talks about hierarchy, inspect control, fan-in, fan-out, depth, width, and layering. For FOD versus OOD, identify what is treated as the primary design unit—functions or objects—and where system state lives.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

**Design cue:** ask “What must this module know about the other module?” Less cross-boundary dependency generally means looser coupling.

\newpage

## Study Page 087 — Software Design — PDF page 12

**Source file:** `LECT4_Software_Design_Redesigned.txt`  
**PDF page:** 12

### Page focus

**COUPLING · CODE EXAMPLES**

### Captured source points

COUPLING · CODE EXAMPLES  
Each Type of Coupling, in Code  
Data Stamp Control  
function computeTax(amount) { function shipOrder(order) { function processOrder(isRush) {  
return amount * 0.18; return order.total; if (isRush) shipToday();  
} // only .total is used else queueStandard();  
computeTax(500); } }  
Common Content  
let inventoryCount; // global function moduleB() {  
function reserve() { goto moduleA.label2;  
inventoryCount--; // jumps into A's  
} // own internals  
function inventorycheck() { }  
print(inventoryCount);  
}  
Best to worst, left to right — data coupling is loosest and safest; content coupling is tightest and almost always a defect.  
Software Design 21  
COUPLING · WORKED EXAMPLE  
Control Coupling — A Flag Directs Another Module  
isRushOrder (flag)  
validateOrder() processOrder()  
CONTROL  
validateOrder() sets a boolean flag that tells processOrder() which branch of its own logic to execute next. This is more than data changing hands  
— one module is reaching into the control flow of another.  
EXAMPLE If isRushOrder is true, processOrder() skips the standard queue and ships the order the same day.  
Software Design 20  

### Deep explanation

This page belongs to the design thread. The central job is to transform a validated SRS into a structure that programmers can implement and maintain. When the page talks about cohesion, ask how strongly the responsibilities inside one module belong together. When it talks about coupling, ask how much dependency crosses a module boundary. When it talks about hierarchy, inspect control, fan-in, fan-out, depth, width, and layering. For FOD versus OOD, identify what is treated as the primary design unit—functions or objects—and where system state lives.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

**Design cue:** ask “What must this module know about the other module?” Less cross-boundary dependency generally means looser coupling.

\newpage

## Study Page 088 — Software Design — PDF page 13

**Source file:** `LECT4_Software_Design_Redesigned.txt`  
**PDF page:** 13

### Page focus

**PART 05 OF 07**

### Captured source points

PART 05 OF 07  
Shape of the Module Hierarchy  
Cohesion and coupling describe one module. These measures describe the whole tree.  
MODULE HIERARCHY · REFERENCE  
Depth, Width, Fan-Out, and Fan-In  
Term Meaning  
Depth The number of levels of control in the hierarchy  
Width The overall span of control across the hierarchy's widest level  
Fan-out The number of modules directly controlled (called) by a given module  
Fan-in The number of modules that directly call a given module  
High fan-in is usually good — it signals reuse. High fan-out is a warning sign: a module coordinating too many subordinates  
usually lacks cohesion.  
Software Design 22  

### Deep explanation

This page belongs to the design thread. The central job is to transform a validated SRS into a structure that programmers can implement and maintain. When the page talks about cohesion, ask how strongly the responsibilities inside one module belong together. When it talks about coupling, ask how much dependency crosses a module boundary. When it talks about hierarchy, inspect control, fan-in, fan-out, depth, width, and layering. For FOD versus OOD, identify what is treated as the primary design unit—functions or objects—and where system state lives.

**Design cue:** ask “Why are these responsibilities in the same module?” A stronger answer means stronger cohesion.

**Design cue:** ask “What must this module know about the other module?” Less cross-boundary dependency generally means looser coupling.

\newpage

## Study Page 089 — Software Design — PDF page 14

**Source file:** `LECT4_Software_Design_Redesigned.txt`  
**PDF page:** 14

### Page focus

**MODULE HIERARCHY · EXAMPLE**

### Captured source points

MODULE HIERARCHY · EXAMPLE  
Fan-In and Fan-Out in a Structure Chart  
Main  
fan-out = 3  
Validate Input Compute Report  
d1 d2  
Log Utility  
fan-in = 3  
data couple  
Log Utility is called from three places — high fan-in, good reuse. Main directly controls three modules — fan-out = 3.  
Software Design 23  
MODULE HIERARCHY  
Control, Visibility, and Layering  
A module that controls another is superordinate to it; the  
controlled module is subordinate  
Module A is visible to module B if A calls B, directly or  
indirectly  
The layering principle: a module may call only the modules in  
the layer immediately below it  
Lower-level modules handle low-level, mechanical work (I/O);  
upper-level modules handle managerial, coordinating work  
Abstraction (layered design): a lower-level module must never  
call upward into a higher-level one  
Software Design 24  

### Deep explanation

This page belongs to the design thread. The central job is to transform a validated SRS into a structure that programmers can implement and maintain. When the page talks about cohesion, ask how strongly the responsibilities inside one module belong together. When it talks about coupling, ask how much dependency crosses a module boundary. When it talks about hierarchy, inspect control, fan-in, fan-out, depth, width, and layering. For FOD versus OOD, identify what is treated as the primary design unit—functions or objects—and where system state lives.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 090 — Software Design — PDF page 15

**Source file:** `LECT4_Software_Design_Redesigned.txt`  
**PDF page:** 15

### Page focus

**MODULE HIERARCHY**

### Captured source points

MODULE HIERARCHY  
The Goal of High-Level Design  
High-level design maps a system's functions {f1, f2, … fn} onto  
a set of modules {m1, m2, … mj}  
… such that each module has high cohesion  
… coupling among modules is kept as low as possible  
… and the modules are organized into a neat, shallow hierarchy  
Get this mapping right, and the detailed design of every  
individual module becomes far easier  
Software Design 25  
PART 06 OF 07  
Two Design Philosophies  
Function-oriented and object-oriented design ask a very different first question.  

### Deep explanation

This page belongs to the design thread. The central job is to transform a validated SRS into a structure that programmers can implement and maintain. When the page talks about cohesion, ask how strongly the responsibilities inside one module belong together. When it talks about coupling, ask how much dependency crosses a module boundary. When it talks about hierarchy, inspect control, fan-in, fan-out, depth, width, and layering. For FOD versus OOD, identify what is treated as the primary design unit—functions or objects—and where system state lives.

**Design cue:** ask “Why are these responsibilities in the same module?” A stronger answer means stronger cohesion.

**Design cue:** ask “What must this module know about the other module?” Less cross-boundary dependency generally means looser coupling.

\newpage

## Study Page 091 — Software Design — PDF page 16

**Source file:** `LECT4_Software_Design_Redesigned.txt`  
**PDF page:** 16

### Page focus

**DESIGN PHILOSOPHIES**

### Captured source points

DESIGN PHILOSOPHIES  
Function-Oriented vs. Object-Oriented Design  
Function-Oriented Design Object-Oriented Design  
The system is viewed as a set of functions to The system is viewed as a collection of real-world  
perform objects (entities)  
Each function is successively refined into more Each object bundles its own data with the  
detailed sub-functions functions that act on it  
Functions are then mapped onto a module Objects communicate only by passing messages to  
structure one another  
State is centralized — held in data shared across State is decentralized — every object manages its  
many functions own state  
Software Design 27  
FUNCTION-ORIENTED · WORKED EXAMPLE  
Functional Decomposition: create-library-member  
create-library-member  
assign-membership-  
create-member-record print-bill  
number  
Each sub-function is refined further into still more detailed sub-functions, and so on, until every module is small enough to implement directly.  
Software Design 28  

### Deep explanation

This page belongs to the design thread. The central job is to transform a validated SRS into a structure that programmers can implement and maintain. When the page talks about cohesion, ask how strongly the responsibilities inside one module belong together. When it talks about coupling, ask how much dependency crosses a module boundary. When it talks about hierarchy, inspect control, fan-in, fan-out, depth, width, and layering. For FOD versus OOD, identify what is treated as the primary design unit—functions or objects—and where system state lives.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 092 — Software Design — PDF page 17

**Source file:** `LECT4_Software_Design_Redesigned.txt`  
**PDF page:** 17

### Page focus

**OBJECT-ORIENTED · WORKED EXAMPLE**

### Captured source points

OBJECT-ORIENTED · WORKED EXAMPLE  
The Same System, as Objects  
Library Automation Software: each library member is a separate  
object, with its own data and its own functions  
A class defines the structure and behaviour shared by similar  
objects — every member object belongs to class Member  
Classes may inherit features from a more general super-class  
Functions on one object cannot directly touch another object's  
data — objects communicate only by sending messages  
Software Design 29  
DESIGN PHILOSOPHIES · CONTRAST  
Where Does the System's State Live?  
FUNCTION-ORIENTED: STATE IS CENTRALIZED OBJECT-ORIENTED: STATE IS DISTRIBUTED  
Member: Asha Member: Rahul  
createMember()  
own data + methods own data + methods  
message  
returnBook() deleteMember()  
Book: OS Concepts Librarian  
Member  
Records  
own data + methods own data + methods  
issueBook() updateRecord()  
Function-oriented systems share one pool of state across many functions; object-oriented systems give each object its own state, reached only  
through a message.  
Software Design 30  

### Deep explanation

This page belongs to the design thread. The central job is to transform a validated SRS into a structure that programmers can implement and maintain. When the page talks about cohesion, ask how strongly the responsibilities inside one module belong together. When it talks about coupling, ask how much dependency crosses a module boundary. When it talks about hierarchy, inspect control, fan-in, fan-out, depth, width, and layering. For FOD versus OOD, identify what is treated as the primary design unit—functions or objects—and where system state lives.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 093 — Software Design — PDF page 18

**Source file:** `LECT4_Software_Design_Redesigned.txt`  
**PDF page:** 18

### Page focus

**“Identify verbs if you are after procedural design, and nouns if**

### Captured source points

“Identify verbs if you are after procedural design, and nouns if  
you are after object-oriented design.”  
Grady Booch  
on the essential difference between the two design philosophies  
PART 07 OF 07  
Case Study: The Fire-Alarm System  
One problem, solved two ways — to see function-oriented and object-oriented design side by side.  

### Deep explanation

This page belongs to the design thread. The central job is to transform a validated SRS into a structure that programmers can implement and maintain. When the page talks about cohesion, ask how strongly the responsibilities inside one module belong together. When it talks about coupling, ask how much dependency crosses a module boundary. When it talks about hierarchy, inspect control, fan-in, fan-out, depth, width, and layering. For FOD versus OOD, identify what is treated as the primary design unit—functions or objects—and where system state lives.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 094 — Software Design — PDF page 19

**Source file:** `LECT4_Software_Design_Redesigned.txt`  
**PDF page:** 19

### Page focus

**CASE STUDY**

### Captured source points

CASE STUDY  
The Problem: A Building-Wide Fire-Alarm CASE STUDY  
System  
A large, multi-storied building — 80 floors and 1,000 rooms — needs a computerized fire-alarm system. Every room is fitted with a smoke  
detector and an alarm.  
WHAT HAPPENS  
When any smoke detector reports a fire, the system must determine its location  
… and sound the alarms in the neighboring locations  
It must flash a message on the console the fire-fighting staff watch around the clock  
Once the fire condition has been handled, staff must be able to reset the alarms  
Software Design 33  
C A S E S T U D Y · F U N C T I O N- O R I E N T E D  
Function-Oriented Approach: One Global State  
IN PLAIN ENGLISH  
Global State (shared by every function)  
All state lives in five global arrays, indexed by detector or alarm number  
detector_status[1000] : BOOL  
detector_locs[1000] : INT  
alarm_status[1000] : BOOL  
alarm_locs[1000] : INT Every function below the divider can read or update any of this data  
directly  
neighbor_alarms[1000][10] : INT  
interrogate_detectors()  
Nothing “owns” the data — correctness depends on every function using it  
get_detector_location()  
consistently  
determine_neighbor()  
ring_alarm()  
reset_alarm()  
report_fire_location()  
Software Design 34  

### Deep explanation

This page belongs to the design thread. The central job is to transform a validated SRS into a structure that programmers can implement and maintain. When the page talks about cohesion, ask how strongly the responsibilities inside one module belong together. When it talks about coupling, ask how much dependency crosses a module boundary. When it talks about hierarchy, inspect control, fan-in, fan-out, depth, width, and layering. For FOD versus OOD, identify what is treated as the primary design unit—functions or objects—and where system state lives.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 095 — Software Design — PDF page 20

**Source file:** `LECT4_Software_Design_Redesigned.txt`  
**PDF page:** 20

### Page focus

**C A S E S TUDY · OBJEC T-ORIENTED**

### Captured source points

C A S E S TUDY · OBJEC T-ORIENTED  
Object-Oriented Approach: Two Small Classes  
class Detector class Alarm In Practice  
Attributes: status, location, neighbors Attributes: location, status One Detector object and one Alarm  
object exist for every room in the  
building  
Operations: create(), senseStatus(), Operations: create(), ringAlarm(),  
getLocation(), findNeighbors() getLocation(), resetAlarm()  
Software Design 35  
CASE STUDY  
Comparing the Two Approaches  
Function-oriented: the state is centralized in five global arrays, with  
six functions all reaching into it  
Object-oriented: the state is distributed — every Detector and Alarm  
object manages only its own status and location  
In practice, most real designs use both: object-oriented design  
shapes the classes, then top-down function-oriented design designs  
the methods inside each class  
A system can look entirely object-oriented from the outside, while  
each class still contains a small, top-down hierarchy of functions on  
the inside  
Software Design 36  

### Deep explanation

This page belongs to the design thread. The central job is to transform a validated SRS into a structure that programmers can implement and maintain. When the page talks about cohesion, ask how strongly the responsibilities inside one module belong together. When it talks about coupling, ask how much dependency crosses a module boundary. When it talks about hierarchy, inspect control, fan-in, fan-out, depth, width, and layering. For FOD versus OOD, identify what is treated as the primary design unit—functions or objects—and where system state lives.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

\newpage

## Study Page 096 — Software Design — PDF page 21

**Source file:** `LECT4_Software_Design_Redesigned.txt`  
**PDF page:** 21

### Page focus

**SUMMARY**

### Captured source points

SUMMARY  
Summary  
Two Complementary  
The Design Phase Hallmarks of Good Design  
Approaches  
Turns a validated SRS into a form that is High cohesion, low coupling, in a neat, Function-oriented: centralized state, top-  
easy to implement shallow hierarchy down function refinement  
High-level design → program structure; Sensible fan-in, low fan-out, and a Object-oriented: decentralized state,  
detailed design → module specification layered sense of abstraction objects that message each other  
Not competing techniques — each fits a  
different stage of design  
Software Design 37  
A recap: from a validated SRS to a module structure ready to implement.  
Introduction Good Design Cohesion Coupling Module Hierarchy Design Case Study  
Philosophies  
S. Roy · Tezpur University · Slide content courtesy Dr. Rajib Mall  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

**Example-reading method:** identify the project situation, identify why the lecture chose this technique/model, then explain what the example demonstrates. Do not memorize the story without the reason it was selected.

**Design cue:** ask “Why are these responsibilities in the same module?” A stronger answer means stronger cohesion.

**Design cue:** ask “What must this module know about the other module?” Less cross-boundary dependency generally means looser coupling.

\newpage

## Study Page 097 — Trading-House Problem Statement — PDF page 1

**Source file:** `DFD_problem_statement.txt`  
**PDF page:** 1

### Page focus

**Trading-House Automation System — A structured-analysis practice problem — read the requirement below,**

### Captured source points

SOFTWARE ENGINEERING · IN-CLASS EXERCISE  
Trading-House Automation System  
A structured-analysis practice problem — read the requirement below,  
then draw the DFDs yourself, before we work through the solution together.  
Swarup Roy · Tezpur University · Problem courtesy Dr. Rajib Mall  
The Requirement  
A large trading house wants software to automate the book-keeping activities of its business. It has many  
regular customers, who place orders for various kinds of commodities. The trading house maintains the name  
and address of every regular customer, and each is assigned a unique customer identification number (CIN).  
As per current practice, when a customer places an order, the accounts department first checks the customer’s  
credit-worthiness, determined by analyzing the history of the customer’s payments against past bills. If a cus-  
tomer is not credit-worthy, the order is not processed any further, and an appropriate order-rejection message  
is generated for the customer.  
If the customer is credit-worthy, the ordered items are checked against the list of items the trading house deals  
with. Items the trading house does not deal with are dropped, and a message is generated for the customer  
about those items. The remaining items are checked for availability in the inventory. If an item is available in  
the desired quantity, a bill (with the customer’s forwarding address) and a material issue slip are printed. The  
customer presents the material issue slip at the store house to take delivery, and the inventory is adjusted to  
reflect the sale.  
If an ordered item is not available in sufficient quantity, it is recorded in a “pending-order” file, along with  
the quantity ordered and the customer’s identification number. The purchase department periodically issues  
a command to generate indents. On this command, the system examines the pending-order file, determines  
which orders are pending and the total quantity required for each item, finds the vendors who supply those  
items from a file of vendor details, and prints indents addressed to the purchase department for those vendors.  
The system should also answer managerial queries. Given a time period, it should report the statistics of  
different items sold over that period — for each item, the quantity sold and the price realized.  
A FEW DFD REMINDERS  
- The context diagram represents the whole system as a single bubble — every external entity appears
there, and nowhere else.  
- Each bubble should decompose into roughly 3 to 7 child bubbles — not fewer, not many more.
- A DFD carries no control information — no order of execution, no conditions, just data in motion.
- Every function named in the requirement should show up as a bubble somewhere — and nothing
beyond the requirement should be invented.  
YOUR TASK  
Using only the requirement above, work through structured analysis for the Trading-House Automation  
System.  
1. List the external entities the system talks to, the functions it must perform, and the reports or  
documents it must produce.  
2. Draw the context diagram (level 0) — the whole system as one bubble, with every external entity  
and every flow crossing its boundary.  
3. Decompose the context bubble into a level 1 DFD — the 3 to 7 major functions, and the data stores  
they read from or write to.  
4. Pick one level 1 bubble that still hides real complexity, and decompose it one level further, into a  
level 2 DFD.  
Once you’ve sketched your own version, we’ll work through a complete step-by-step solution — from identifying entities and  
functions, to a full level 0 → 1 → 2 DFD.  
TAS · DFD Practice Problem 1  

### Deep explanation

This page belongs to the structured-analysis/DFD thread. Extract **external entities, functions, outputs, and persistent data stores** before drawing. A context diagram compresses the system to one process and shows only external boundary flows; lower levels reveal the internal functions and stores. Keep arrows data-oriented: do not turn the process sequence or an IF statement into a control-flow arrow. The requirement itself is the boundary of the model—do not invent actors, files, or functions that the text does not support.

**DFD cue:** keep process names as functions, flow names as data, stores as persistent information, and external entities outside the system boundary.

\newpage

## Study Page 098 — Trading-House Worked DFD Solution — PDF page 1

**Source file:** `DFD_solution_tutorial.txt`  
**PDF page:** 1

### Page focus

**From Problem Statement to DFD — A complete, step-by-step structured analysis of the Trading-House Automation System —**

### Captured source points

SOFTWARE ENGINEERING · WORKED SOLUTION  
From Problem Statement to DFD  
A complete, step-by-step structured analysis of the Trading-House Automation System —  
entities, functions and reports first, then the DFD itself, level 0 through level 2.  
Swarup Roy · Tezpur University · Problem courtesy Dr. Rajib Mall  
Step 1 · Entities, Functions & Reports  
Before drawing a single bubble, mine the requirement for its nouns and verbs. Every “who” outside the  
system’s control is a candidate external entity; every verb describing something the system does is a candidate  
function; every document or message handed back out is a candidate report; and every noun the system must  
remember between requests is a candidate data store.  
Who sits outside the system?  
Three parties exchange data with TAS — nothing else in the requirement acts on the system from outside it.  
External entity Sends the system Receives from the system  
Customer order bill / material-issue-slip / reject-  
message  
Purchase Department Generate-indent (command) indents  
Manager query statistics  
Vendors are never contacted directly by TAS — indents are printed and handed to the purchase department, so the vendor list stays  
an internal file, not an entity.  
What must the system do?  
Four verbs cover the whole requirement — these four become the level 1 bubbles.  
# Function Triggered by What it does  
0.1 Accept-order Customer places an Look up the customer, check  
order credit-worthiness, accept or reject the  
order  
0.2 Process-order An order is accepted Validate the items, check stock, bill and  
issue what’s available, log the rest as  
pending  
0.3 Handle-query Manager asks a Look up sales statistics for the requested  
question period  
0.4 Handle-indent- Purchase dept. Tally pending orders, find vendors, print  
request requests indents indents  
What comes out — and what gets remembered  
Report / output Produced by Goes to  
reject-message Accept-order Customer  
bill + material-issue-slip Process-order Customer  
indents Handle-indent-request Purchase Dept.  
statistics Handle-query Manager  
Data stores identified: Customer-file, Customer-history, Item-file, Inventory, Accepted-orders, Pending-order, Vendor-list,  
Sales-statistics.  
TAS · Step-by-Step DFD Tutorial 1  

### Deep explanation

This page belongs to the structured-analysis/DFD thread. Extract **external entities, functions, outputs, and persistent data stores** before drawing. A context diagram compresses the system to one process and shows only external boundary flows; lower levels reveal the internal functions and stores. Keep arrows data-oriented: do not turn the process sequence or an IF statement into a control-flow arrow. The requirement itself is the boundary of the model—do not invent actors, files, or functions that the text does not support.

**DFD cue:** keep process names as functions, flow names as data, stores as persistent information, and external entities outside the system boundary.

\newpage

## Study Page 099 — Trading-House Worked DFD Solution — PDF page 2

**Source file:** `DFD_solution_tutorial.txt`  
**PDF page:** 2

### Page focus

**Step 2 · The Context Diagram (Level 0) — The whole system, as a single bubble, with every entity attached.**

### Captured source points

Step 2 · The Context Diagram (Level 0)  
The whole system, as a single bubble, with every entity attached.  
Purchase  
Department  
indents Generate-indent  
order query  
Trading-House-  
Automation-  
Customer Manager  
System  
response statistics  
“response” stands for whichever of bill + material-issue-slip or reject-message applies to that order — the context diagram  
doesn’t distinguish them yet.  
Step 3 · The Level 1 DFD, Bubble by Bubble  
Decompose the context bubble into its four functions — one at a time.  
Bubble 1: Accept-order 0.1  
Every order starts here: look the customer up, decide if they’re credit-worthy, and either pass the order on or  
reject it.  
Customer-  
file  
customer record  
order  
Accept-  
Customer order TO PROCESS-ORDER 0.2 →  
0.1  
reject-message  
payment history  
Customer-  
history  
Not credit-worthy, or the CIN doesn’t check out? The order stops here — a reject-message goes straight back to the customer.  
Bubble 2: Process-order 0.2  
For every accepted order: check the items are real, check the stock, then bill what’s available and backorder  
the rest.  
Item-file Inventory  
item validity stock qty  
accepted-order Process- bill + issue slip  
FROM 0.1 order Customer  
0.2  
log entry backorder  
Accepted- Pending-  
orders order  
Items the trading house doesn’t stock, or can’t supply in full, never reach the customer as a bill — they’re logged to pending-order  
instead.  
TAS · Step-by-Step DFD Tutorial 2  

### Deep explanation

This page belongs to the structured-analysis/DFD thread. Extract **external entities, functions, outputs, and persistent data stores** before drawing. A context diagram compresses the system to one process and shows only external boundary flows; lower levels reveal the internal functions and stores. Keep arrows data-oriented: do not turn the process sequence or an IF statement into a control-flow arrow. The requirement itself is the boundary of the model—do not invent actors, files, or functions that the text does not support.

**DFD cue:** keep process names as functions, flow names as data, stores as persistent information, and external entities outside the system boundary.

\newpage

## Study Page 100 — Trading-House Worked DFD Solution — PDF page 3

**Source file:** `DFD_solution_tutorial.txt`  
**PDF page:** 3

### Page focus

**Bubble 3: Handle-query 0.3 — The simplest of the four — a manager asks, the system looks up the answer.**

### Captured source points

Bubble 3: Handle-query 0.3  
The simplest of the four — a manager asks, the system looks up the answer.  
query  
Handle- item, qty & price  
Manager Sales-  
query  
statistics  
0.3  
statistics  
Sales-statistics is written to every time Process-order completes a sale — Handle-query only ever reads it.  
Bubble 4: Handle-indent-request 0.4  
On command from the purchase department, turn everything that’s still pending into indents.  
Purchase  
Department Generate-indent Pending-  
order  
pending items  
Handle-  
indents  
indent-  
request 0.4  
vendor address  
Vendor-  
list  
Pending-order is shared with Process-order 0.2 — one bubble writes backorders into it, this one reads them back out.  
Putting it together  
The same four bubbles and eight stores, assembled into one diagram — this is the level 1 DFD in full. Flow  
names are dropped here for clarity; see the bubble-by-bubble figures above for those.  
Customer- Purchase Sales-  
Item-file Dept.  
file statistics  
Customer  
Accept- Process- Handle- Handle-  
order order indent-req query  
0.1 0.2 0.4 0.3  
Customer  
Customer- Pending- Vendor-  
Inventory Manager  
history order list  
Accepted-orders (a simple write-only log from Process-order) is left off this recap for clarity — it was shown on the Process-order  
figure above.  
Step 4 · Going One Level Deeper  
Pick the bubble that still hides the most decisions, and decompose it.  
Why decompose Process-order 0.2?  
- Of the four level 1 bubbles, Process-order 0.2 still hides the most: it validates items, checks stock, and
branches into two very different outcomes.  
- That’s exactly the kind of bubble the guidelines warn about — its label alone doesn’t tell you everything it
does.  
- Accept-order, Handle-query and Handle-indent-request are each already close to a single, well-defined step
— decomposing them further would add little.  
- So Process-order 0.2 is the one we refine into a level 2 DFD.
TAS · Step-by-Step DFD Tutorial 3  

### Deep explanation

This page belongs to the structured-analysis/DFD thread. Extract **external entities, functions, outputs, and persistent data stores** before drawing. A context diagram compresses the system to one process and shows only external boundary flows; lower levels reveal the internal functions and stores. Keep arrows data-oriented: do not turn the process sequence or an IF statement into a control-flow arrow. The requirement itself is the boundary of the model—do not invent actors, files, or functions that the text does not support.

**DFD cue:** keep process names as functions, flow names as data, stores as persistent information, and external entities outside the system boundary.

\newpage

## Study Page 101 — Trading-House Worked DFD Solution — PDF page 4

**Source file:** `DFD_solution_tutorial.txt`  
**PDF page:** 4

### Page focus

**Decomposing Process-order 0.2 — Item-file Inventory**

### Captured source points

Decomposing Process-order 0.2  
Item-file Inventory  
Generate- bill + issue slip  
documents Customer  
0.2.3  
available-items  
item master stock qty  
accepted-order Validate- valid-items Check- decrement  
FROM 0.1 items availability sold-items  
0.2.1 0.2.2  
Accepted-  
short-items orders  
log entry  
reject-message  
Update-  
records  
0.2.4  
Customer backorder  
Pending-  
order  
This is exactly the fan-out / fan-in shape decomposition usually takes: one input splits two ways, and both paths report back  
to a single bubble that updates the stores.  
Step 5 · Checking the Work  
A finished DFD should pass the same guidelines it was built from.  
What makes this a good DFD  
- The context diagram is a single bubble, with all three external entities — Customer, Purchase Department,
Manager — attached to it, and nowhere else.  
- Level 1 has exactly 4 bubbles — comfortably inside the 3-to-7 rule — and only one of them was decomposed
further.  
- No arrow anywhere shows order-of-execution or a condition — every flow is a named piece of data in
motion.  
- Every function named in the requirement shows up as a bubble, and nothing beyond the requirement was
invented.  
Entities, functions and reports first — then a context diagram, a level 1 DFD built bubble by bubble, and one level 2  
decomposition where it actually mattered.  
TAS · Step-by-Step DFD Tutorial 4  

### Deep explanation

This page belongs to the structured-analysis/DFD thread. Extract **external entities, functions, outputs, and persistent data stores** before drawing. A context diagram compresses the system to one process and shows only external boundary flows; lower levels reveal the internal functions and stores. Keep arrows data-oriented: do not turn the process sequence or an IF statement into a control-flow arrow. The requirement itself is the boundary of the model—do not invent actors, files, or functions that the text does not support.

**DFD cue:** keep process names as functions, flow names as data, stores as persistent information, and external entities outside the system boundary.

\newpage

## Study Page 102 — Ten DFD Practice Problems — PDF page 1

**Source file:** `dfd_practice_10.txt`  
**PDF page:** 1

### Page focus

**SOFTWARE ENGINEERING · IN-CLASS EXERCISE SET — Ten DFD Practice Problems**

### Captured source points

SOFTWARE ENGINEERING · IN-CLASS EXERCISE SET  
Ten DFD Practice Problems  
Ten independent structured-analysis requirements — read each one, then draw its own context  
diagram, level 1, and level 2 DFD, the same way we did for the Trading-House Automation  
System.  
Swarup Roy · Tezpur University · In the style of problems by Dr. Rajib Mall  
How to Use This Set  
Each of the ten problems below is a self-contained requirement, exactly like the Trading-House Automation  
System exercise. For every problem, work through the same four steps.  
YOUR TASK — FOR EACH PROBLEM  
1. List the external entities the system talks to, the functions it must perform, and the reports or  
documents it must produce.  
2. Draw the context diagram (level 0) — the whole system as one bubble, with every external entity  
and every flow crossing its boundary.  
3. Decompose the context bubble into a level 1 DFD — the 3 to 7 major functions, and the data stores  
they read from or write to.  
4. Pick one level 1 bubble that still hides real complexity, and decompose it one level further, into a  
level 2 DFD.  
A FEW DFD REMINDERS  
- The context diagram represents the whole system as a single bubble — every external entity appears
there, and nowhere else.  
- Each bubble should decompose into roughly 3 to 7 child bubbles — not fewer, not many more.
- A DFD carries no control information — no order of execution, no conditions, just data in motion.
- Every function named in a requirement should show up as a bubble somewhere — and nothing
beyond the requirement should be invented.  
PROBLEM 1 Community Library Automation System  
A public library wants to automate the issue and return of books. Every member holds a library card  
with a unique membership number, and the library maintains each member’s name, address, and the  
maximum number of books they may borrow at once. When a member presents a book at the counter,  
the clerk checks whether the member’s borrowing limit has already been reached and whether the  
member has any unpaid fines; if either is true, the book is not issued and a message is printed for the  
member. Otherwise, the book is issued, the loan is recorded against the member’s card, and a due date  
fourteen days later is stamped on the book.  
When a book is returned, the clerk checks the due date against today’s date. If the book is overdue,  
a fine is calculated at a fixed rate per day and added to the member’s outstanding balance; a receipt  
showing the fine is printed. The loan record is then closed and the book is marked available again. The  
library also wants the system to let the clerk search the catalogue by title or author to check whether  
a book is currently available, and to let the librarian generate a weekly list of all books still overdue,  
addressed to the members concerned.  
DFD Practice Set · 10 Problems 1  

### Deep explanation

This page belongs to the requirements/specification thread. The central discipline is **precision before implementation**. Identify the required behavior, inputs, outputs, conditions, constraints, and any missing or contradictory cases. When notation appears, focus on what each symbol contributes to precision rather than memorizing a picture. When an SRS example appears, treat its IDs, inputs, outputs, processing, and measurable constraints as a template for writing requirements that can later be designed and tested. For decision logic, identify conditions and actions. For formal logic, identify the domain, quantifier, condition, connective, and conclusion.

**DFD cue:** keep process names as functions, flow names as data, stores as persistent information, and external entities outside the system boundary.

\newpage

## Study Page 103 — Ten DFD Practice Problems — PDF page 2

**Source file:** `dfd_practice_10.txt`  
**PDF page:** 2

### Page focus

**PROBLEM 2 Outpatient Appointment System for a Clinic — A multi-doctor clinic wants to computerize the booking of outpatient appointments. A patient calls the**

### Captured source points

PROBLEM 2 Outpatient Appointment System for a Clinic  
A multi-doctor clinic wants to computerize the booking of outpatient appointments. A patient calls the  
reception desk and requests an appointment with a particular doctor, or with any available doctor in a  
chosen specialty, for a preferred date. The receptionist checks that doctor’s schedule for an open slot on  
or near that date; if a slot exists, it is reserved in the patient’s name and a confirmation slip showing the  
date, time, and doctor is printed for the patient. If no slot is available, the patient is offered the next  
open slot or placed on a waiting list for that doctor.  
On the day of the visit, the patient checks in at the desk; the receptionist marks the appointment as  
arrived and pulls up the patient’s history so the doctor can review it during the consultation. After the  
consultation, the doctor records the diagnosis and any prescribed medicines against the patient’s file,  
and the system prints a visit summary for the patient to take away. The clinic administrator should also  
be able to request a daily list of appointments for each doctor, and a monthly count of consultations per  
specialty for billing purposes.  
PROBLEM 3 Hotel Room Reservation System  
A mid-sized hotel wants a system to manage room bookings. A guest — either by phone or at the front  
desk — specifies the check-in and check-out dates and the type of room required. The front-desk clerk  
checks room availability for that room type across the requested dates; if a suitable room is free, it is  
reserved under the guest’s name and contact details, and a booking confirmation is printed. If no room  
of that type is free for the full period, the clerk offers the nearest alternative dates or a different room  
type.  
When the guest arrives, the clerk checks them in against the reservation, assigns a specific room number,  
and issues a room key along with a printed registration card. Charges for the room, and any additional  
services the guest requests during the stay such as room service or laundry, are added to the guest’s  
running bill. At check-out, the clerk totals the bill, accepts payment, and prints a final invoice; the room  
is then marked as needing housekeeping before it can be booked again. The hotel manager should also  
be able to request an occupancy report for any given date range, showing how many rooms of each type  
were booked.  
PROBLEM 4 Courier Parcel Tracking System  
A courier company wants to track parcels from pickup to delivery. A customer books a pickup by giving  
the sender and receiver addresses, the parcel’s weight, and the desired delivery speed. The booking  
clerk calculates the shipping charge from a rate table based on weight, distance, and speed, and prints a  
shipping label bearing a unique tracking number, which is stuck onto the parcel when the pickup agent  
collects it.  
As the parcel moves through the company’s network, each hub it passes through scans the tracking  
number and logs the parcel’s current location and timestamp against its tracking record. A customer  
can, at any time, submit a tracking number and receive back the parcel’s current status and location  
history. When the parcel reaches its destination hub, a delivery agent attempts delivery; if the receiver  
is unavailable, the attempt is logged and a re-delivery is scheduled for the next day, up to three attempts,  
after which the parcel is returned to the sender. Once delivered, the receiver signs for the parcel, and a  
proof-of-delivery record is stored and made available to the sender on request. The operations manager  
should be able to request a report of all parcels currently overdue against their promised delivery date.  
DFD Practice Set · 10 Problems 2  

### Deep explanation

This page belongs to the structured-analysis/DFD thread. Extract **external entities, functions, outputs, and persistent data stores** before drawing. A context diagram compresses the system to one process and shows only external boundary flows; lower levels reveal the internal functions and stores. Keep arrows data-oriented: do not turn the process sequence or an IF statement into a control-flow arrow. The requirement itself is the boundary of the model—do not invent actors, files, or functions that the text does not support.

**DFD cue:** keep process names as functions, flow names as data, stores as persistent information, and external entities outside the system boundary.

\newpage

## Study Page 104 — Ten DFD Practice Problems — PDF page 3

**Source file:** `dfd_practice_10.txt`  
**PDF page:** 3

### Page focus

**PROBLEM 5 University Course Registration System — A university wants to automate course registration at the start of each semester. A student logs in with**

### Captured source points

PROBLEM 5 University Course Registration System  
A university wants to automate course registration at the start of each semester. A student logs in with  
their roll number and selects the courses they wish to take for the semester. For each course, the system  
checks that the student has completed its prerequisite courses and that the course’s seat limit has not  
already been reached; a course failing either check is rejected, with a message telling the student why.  
Courses that pass both checks are added to the student’s provisional timetable, and the system also  
checks that no two selected courses clash in schedule.  
Once the student confirms the selection, the registration is finalized, the seat count for each chosen  
course is decremented, and a printed registration slip listing the confirmed courses is generated. The  
finance office is separately notified of each finalized registration so that the semester fee can be billed to  
the student’s account. A faculty member should be able to request the final class list for any course they  
teach, once registration closes. The academic office also wants a report, generated after registration  
closes, showing enrolment numbers for every course offered that semester, to help plan the following  
semester’s sections.  
PROBLEM 6 Restaurant Table and Order Management System  
A restaurant wants to computerize how it takes and fulfils orders. When a group of customers arrives,  
the host checks the seating chart for a free table of adequate size and assigns it, marking that table  
occupied. The waiter then takes the order at the table, entering each dish and any special instructions  
into the system; the order is checked against the day’s menu to confirm every item is currently available,  
and unavailable items are flagged back to the waiter immediately.  
Once confirmed, the order is sent to the kitchen display, split automatically into separate tickets for  
the starters, mains, and desserts stations. As each station finishes preparing its items, it marks them  
ready, and the waiter is notified to serve that course. When the customers are ready to leave, the waiter  
requests the bill; the system totals the order, applies any applicable discount, and prints an itemized  
bill. Once payment is recorded, the table is marked free again for the host to reassign. The restaurant  
manager should be able to request a report, for any chosen day, of total sales broken down by menu  
category.  
PROBLEM 7 Car Rental Booking System  
A car rental agency wants to automate vehicle bookings across its branches. A customer requests a car  
of a particular category for pickup at one branch and return at the same or a different branch, over a  
given date range. The booking clerk checks the fleet at the pickup branch for a car of that category free  
over the whole period; if one is available, it is reserved against the customer’s driving-license details  
and a booking reference is issued, along with an estimated charge based on the category’s daily rate  
and the number of days.  
At pickup, the clerk records the car’s odometer reading and fuel level, marks the reservation as active,  
and hands over the keys. At return — possibly at a different branch — the receiving clerk records the  
odometer and fuel level again, calculates any extra charges for mileage beyond the included limit or for  
fuel shortfall, and prints a final invoice covering the rental and these extras. If the car is returned to  
a branch other than its home branch, the system flags it for eventual repositioning. The fleet manager  
should be able to request a report showing the current location and status — available, rented, or under  
maintenance — of every car in the fleet.  
DFD Practice Set · 10 Problems 3  

### Deep explanation

This page belongs to the structured-analysis/DFD thread. Extract **external entities, functions, outputs, and persistent data stores** before drawing. A context diagram compresses the system to one process and shows only external boundary flows; lower levels reveal the internal functions and stores. Keep arrows data-oriented: do not turn the process sequence or an IF statement into a control-flow arrow. The requirement itself is the boundary of the model—do not invent actors, files, or functions that the text does not support.

**DFD cue:** keep process names as functions, flow names as data, stores as persistent information, and external entities outside the system boundary.

\newpage

## Study Page 105 — Ten DFD Practice Problems — PDF page 4

**Source file:** `dfd_practice_10.txt`  
**PDF page:** 4

### Page focus

**PROBLEM 8 Utility Bill Payment System — A city electricity board wants to automate the billing and payment of household electricity connections.**

### Captured source points

PROBLEM 8 Utility Bill Payment System  
A city electricity board wants to automate the billing and payment of household electricity connections.  
Each month, a meter reader visits every connection, and enters the current meter reading against that  
connection’s account number. The system calculates the units consumed since the previous reading,  
applies the board’s slab-wise tariff to compute the amount due, and adds any unpaid balance carried  
over from previous months; a bill showing the units consumed, the amount due, and the payment due  
date is then printed and mailed to the customer.  
A customer may pay a bill in person at a collection counter, or through an online payment gateway;  
either way, the payment is recorded against the account and a receipt is issued. If a bill is not paid by  
its due date, a late-payment surcharge is added to the following month’s bill, and if two consecutive  
bills remain unpaid, the account is flagged for disconnection and a notice is sent to the customer. The  
board’s revenue office should be able to request, for any billing month, a report of total units billed and  
total amount collected across all connections, as well as a separate list of all currently flagged accounts.  
PROBLEM 9 Online Bookstore Order System  
An online bookstore wants to automate the placing and fulfilment of customer orders. A customer  
browses the catalogue and adds books to a cart; at checkout, the system verifies that every book in  
the cart is currently in stock in the requested quantity, and rejects items that are not, showing the  
customer an expected restock date where one is known. For the remaining items, the customer supplies  
a delivery address and a payment method; the system calculates the order total including shipping,  
processes the payment, and — once payment succeeds — confirms the order and prints a packing slip  
for the warehouse.  
The warehouse picks and packs the ordered books against the packing slip, updates the inventory to  
reflect the reduction in stock, and hands the package to a delivery partner, who provides a tracking  
number that is recorded against the order and emailed to the customer. If a book later turns out to be  
damaged or missing during picking, the warehouse flags the order as partially fulfilled, and the system  
automatically issues a partial refund for the missing item. The store manager should be able to request  
a report of best-selling titles over any chosen date range, and a separate report of all orders currently  
awaiting fulfilment.  
PROBLEM 10 Fitness Club Membership System  
A fitness club wants to computerize how it manages memberships and class bookings. A prospective  
member signs up at the front desk, choosing a membership plan; the staff member records the appli-  
cant’s personal details, collects the joining payment, and activates a membership valid from that date for  
the plan’s duration, printing a membership card. Existing members may renew before expiry, extending  
their validity by the plan’s duration, or upgrade to a different plan, with the fee difference calculated  
automatically.  
The club also runs scheduled group classes, each with a maximum number of participants. A member  
can book a spot in an upcoming class through the front desk or a kiosk; the system checks the class  
isn’t already full and that the member’s plan includes group classes, then reserves the spot and prints a  
confirmation. If a member cancels a booking, the freed spot is offered to the first person on that class’s  
waiting list, if any. Each time a member enters the club, their card is scanned at the gate, which checks  
that the membership is currently active before allowing entry and logs the visit. The club manager  
should be able to request a report of attendance trends by month, and a separate list of all memberships  
due to expire within the next two weeks.  
DFD Practice Set · 10 Problems 4  

### Deep explanation

This page belongs to the structured-analysis/DFD thread. Extract **external entities, functions, outputs, and persistent data stores** before drawing. A context diagram compresses the system to one process and shows only external boundary flows; lower levels reveal the internal functions and stores. Keep arrows data-oriented: do not turn the process sequence or an IF statement into a control-flow arrow. The requirement itself is the boundary of the model—do not invent actors, files, or functions that the text does not support.

**DFD cue:** keep process names as functions, flow names as data, stores as persistent information, and external entities outside the system boundary.

\newpage

# Part XII — Final Integrated Revision Guide

## 105-source-page completeness check

The audit above contains one entry for every PDF page in the supplied set: 8 introductory pages + 34 life-cycle pages + 33 requirements pages + 21 software-design pages + 1 Trading-House problem page + 4 Trading-House solution pages + 4 DFD-practice pages = **105 source pages**.

## The final mental model

The entire supplied course can be remembered as a chain of increasingly precise descriptions: **problem → requirements → SRS → analysis/DFD → design → modules/objects → detailed design → code → testing → maintenance**. Life-cycle models explain how that work is organized over time; requirements engineering makes the “what” precise; structured analysis explains functions and data flows; software design turns the understood behavior into a coherent implementation structure.

## Last-minute exam checklist

- [ ] Can I name and explain the six software life-cycle stages in order?
- [ ] Can I distinguish Classical Waterfall, Iterative Waterfall, Prototyping, Evolutionary, and Spiral by their organizing idea?
- [ ] Can I explain feasibility study and the four analyst questions?
- [ ] Can I distinguish inconsistency from incompleteness?
- [ ] Can I define SRS, black-box specification, functional requirement, nonfunctional requirement, and constraint?
- [ ] Can I list the properties of a good SRS and recognize bad-SRS patterns?
- [ ] Can I draw a decision tree and an equivalent decision table from a small rule set?
- [ ] Can I translate English quantifier/connective phrases into predicate logic?
- [ ] Can I write the five-step Z-schema workflow and explain Δ, Ξ, ?, !, and prime notation?
- [ ] Can I explain preconditions, postconditions, and invariants using the ATM example?
- [ ] Can I distinguish high-level design from detailed design?
- [ ] Can I define cohesion and list its seven types from worst to best?
- [ ] Can I define coupling and list its five types from loosest to tightest?
- [ ] Can I compute/describe depth, width, fan-in, and fan-out in a structure chart?
- [ ] Can I explain superordinate/subordinate modules, visibility, layering, and abstraction?
- [ ] Can I contrast function-oriented and object-oriented design, especially where state lives?
- [ ] Can I analyze a requirements paragraph into DFD external entities, functions, reports, and data stores?
- [ ] Can I draw TAS context, level 1, and level 2 DFDs and explain why Process-order is decomposed?
- [ ] Can I apply the same DFD method to all ten practice problems without inventing actors or behavior?

## One-minute memory anchors

- **Waterfall:** phase-driven.
- **Evolutionary:** release-driven.
- **Spiral:** risk-driven.
- **SRS:** what, not how.
- **Good SRS:** precise, complete, consistent, traceable, verifiable.
- **DFD:** data in motion, not control flow.
- **Cohesion:** strength within a module.
- **Coupling:** dependency between modules.
- **FOD:** functions and centralized state.
- **OOD:** objects, encapsulated/distributed state, message passing.
- **Z:** state + operation + precondition + postcondition.

# Part XIII — Ultra-Deep Practical Expansion

> **Important reading rule for this section:** the material in Parts I–XII is a close study guide to the supplied PDFs. This new section adds **practical teaching explanations, usage guidance, recognition tips, design intuition, worked reasoning, and exam strategies** around those same concepts. Whenever an explanation goes beyond the wording of the supplied slides, it is deliberately presented as a **practical extension** rather than as a claim that the lecturer explicitly stated it.

---

## 106. How to use these notes as an actual Software Engineering course

The seven supplied PDFs are easier to remember when treated as one connected chain rather than as seven independent documents. The introductory lecture answers **why software engineering exists**. The life-cycle lecture answers **how development work can be organized over time**. The requirements lecture answers **what must be understood and written down before design**. The DFD exercises show one way of expressing functions and data flow during structured analysis. The design lecture then explains **how the understood functionality is organized into modules or objects**.

A very useful mental pipeline is:

```text
Real-world problem
      ↓
Feasibility
      ↓
Requirements gathering and analysis
      ↓
SRS
      ↓
Analysis models / DFDs / decision logic
      ↓
High-level design
      ↓
Detailed design
      ↓
Coding
      ↓
Testing
      ↓
Deployment
      ↓
Maintenance
```

The important idea is that each stage reduces a different kind of uncertainty.

| Stage | Main uncertainty being reduced | Main question |
|---|---|---|
| Feasibility | Whether the project is worthwhile and possible | “Should we build it?” |
| Requirements | What the customer actually needs | “What must the system do?” |
| Analysis models | How the problem can be represented clearly | “What functions, data and rules exist?” |
| High-level design | How functionality should be partitioned | “What modules/objects should exist?” |
| Detailed design | How individual modules operate internally | “What data structures and algorithms are needed?” |
| Coding | Implementation | “How do we express the design in code?” |
| Testing | Correctness against expectations | “Does the implementation behave as required?” |
| Maintenance | Post-delivery change | “How do we keep it useful and correct?” |

### Why this chain matters

A common student mistake is to remember definitions separately and miss the **dependency between them**. A designer should not invent a module hierarchy without knowing what functionality is required. A tester should not invent acceptance criteria independently of the SRS. A DFD should not introduce business functions that the requirement never mentions. The discipline of software engineering is largely the discipline of preserving traceability from one stage to the next.

### Where this is important in real projects — practical extension

This separation becomes especially useful when many people work on the same software. A product manager, analyst, designer, programmer, tester, and maintenance engineer can each look at the same project from a different perspective. Shared artifacts such as the SRS, design documents, test cases, and reports become a common language.

This is also why documentation is not simply “for teachers.” In a real system, the person who originally understood a business rule may leave the organization. The written artifact becomes the memory of the project.

---

---

# Deep Dive: Concept Maps, Examiner Answers & High-Yield Summary

# Deep Dive M — High-Yield Connections Between Concepts

## 185. Requirements errors become design problems later

A major theme running through the course is that artifacts depend on one another.

Suppose a requirement is incomplete:

> “The system should notify users about overdue items.”

What does “overdue” mean? One day late? Any lateness? What if there is a grace period? What channel? What exactly is the message?

If these questions are unanswered, a designer must make assumptions. Those assumptions then become architectural behavior. Testers may later discover that the customer meant something else.

This is why the requirements lecture says careful analysis should catch inconsistency and incompleteness before SRS creation is finalized.

---

## 186. DFDs help expose missing requirements

Consider a requirement that says:

> “The clerk processes a returned book and the system updates the record.”

A DFD decomposition may force you to ask:

- Which record?
- Where is the due date stored?
- Where is the fine balance stored?
- Does the book become available immediately?
- Is a receipt produced?
- What does the clerk receive when the book is not overdue?

The DFD is therefore not merely a drawing exercise. It can expose missing information because every process needs meaningful inputs and outputs.

This connects directly to the requirements lecture's statement that formal models can surface subtle anomalies.

---

## 187. Design quality can be seen as the next layer of the same idea

Once the DFD identifies functions, design asks how to map them into modules.

Suppose a DFD shows:

```text
Search
Validate
Calculate
GenerateReport
```

That does not automatically mean those exact names become modules. The designer evaluates responsibilities, cohesion, coupling, data flow, hierarchy, and interfaces.

A good decomposition might combine a few tightly related operations while separating independent responsibilities.

The course's design lecture therefore gives the student **criteria for judging the mapping**, not merely a mechanical rule for producing it.

---

## 188. Life-cycle choice and design choice are different decisions

It is possible to use a waterfall-like process and still produce an excellent or poor design. It is possible to use an evolutionary process and still have poor cohesion.

These decisions exist at different levels:

```text
Life-cycle model
     ↓
How the project organizes work over time

Design method
     ↓
How the solution is structured

Implementation
     ↓
How the structure becomes executable code
```

Do not answer a design-quality question with only a life-cycle model, or a process-model question with only cohesion/coupling.

---

## 189. A practical traceability chain for exams

When solving a large question, you can build a traceability chain like this:

```text
Requirement sentence
      ↓
Functional requirement ID
      ↓
DFD process
      ↓
Design module
      ↓
Implementation unit
      ↓
Test case
```

For example:

```text
“System shall reject withdrawal above balance.”
            ↓
FR-2
            ↓
ATM decision / withdrawal validation
            ↓
ValidateWithdrawal module
            ↓
balance-check implementation
            ↓
Test: amount > balance → reject
```

The exact names are illustrative, but the structure is a powerful way to understand why the SRS is described as traceable and why later stages refer back to it.

---

# Deep Dive N — Exam Strategy: How to Write Strong Answers

## 190. Definition question strategy

For a “Define software engineering” question, do not write a vague sentence such as “software engineering is making software.” Include three elements:

1. engineering approach,
2. systematic use/organization of experience, techniques, methodologies, or guidelines,
3. development of software in a disciplined manner.

Then add one line about why it is needed: large systems become too complex for ad hoc development.

---

## 191. Comparison question strategy

For “Waterfall vs Iterative Waterfall,” compare on:

| Dimension | Classical | Iterative |
|---|---|---|
| Phase order | Sequential | Sequential with feedback |
| Error handling | No formal return path | Return to phase of origin |
| Customer/change flexibility | Lower | Better defect containment |
| Core assumption | Stable process | Stable requirements but realistic defect flow |

For “Prototype vs Evolutionary,” emphasize **throwaway learning vs working releases**.

For “Evolutionary vs Spiral,” emphasize **release-driven vs risk-driven**.

---

## 192. “Why is this model appropriate?” strategy

Use this three-part answer pattern:

```text
Project characteristic
       ↓
Relevant model property
       ↓
Why the property addresses the characteristic
```

Example:

> “The requirements are unclear to users. Prototyping is therefore useful because a working but limited prototype allows users to see inputs, outputs, reports, or dialogs and provide concrete feedback before the final system is built.”

This is much stronger than simply naming the model.

---

## 193. Requirements question strategy

When given a paragraph and asked to extract requirements:

```text
Circle actors
Underline verbs
Box inputs/outputs
Mark persistent information
Mark conditions and thresholds
Look for exceptions and missing cases
Assign requirement IDs
```

Then classify each statement as:

- functional requirement,
- nonfunctional requirement,
- constraint.

---

## 194. Decision-table question strategy

First list conditions.

Example ATM:

```text
C1 = card/PIN valid?
C2 = amount ≤ balance?
C3 = amount ≤ daily remaining limit?
```

Then list outcomes:

```text
A1 = reject
A2 = dispense cash
A3 = update balance
```

Then build combinations. Remove impossible/redundant combinations only after you have shown that your rules cover all meaningful cases.

---

## 195. Z notation question strategy

Do not begin by writing symbols immediately.

Use the source's five-step procedure:

```text
1. Identify state
2. Write state schema
3. Name operation
4. Add inputs/outputs
5. Write pre/postconditions
```

For every operation ask:

- What state can change?
- What must be true before?
- What must be true after?

Remember the prime notation: the primed variable is the after-state value.

---

## 196. Cohesion question strategy

Memorize the order:

```text
Coincidental
Logical
Temporal
Procedural
Communicational
Sequential
Functional
```

Then memorize one **recognition cue** for each:

| Type | Recognition cue |
|---|---|
| Coincidental | unrelated things together |
| Logical | same category, selected by flag |
| Temporal | same time/initialization phase |
| Procedural | same procedure/sequence |
| Communicational | same data structure |
| Sequential | one output feeds next |
| Functional | one clearly defined task |

---

## 197. Coupling question strategy

Memorize:

```text
Data → Stamp → Control → Common → Content
```

Recognition:

| Type | Recognition cue |
|---|---|
| Data | elementary data passed |
| Stamp | whole structure passed |
| Control | flag directs other module's behavior |
| Common | shared global data |
| Content | direct access to internals |

---

## 198. DFD question strategy — the “nouns and verbs” trick

The worked Trading-House tutorial gives an especially powerful rule:

- **Who** outside the system → candidate external entity;
- **verb** describing system work → candidate function;
- **document/message going out** → candidate output;
- **noun remembered between requests** → candidate data store.

### Example

Requirement:

> “The clerk checks the customer's borrowing limit and unpaid fines. If valid, the system issues the book and records the loan.”

Extraction:

```text
Who?       Clerk
Verbs?     checks, issues, records
Stores?    member data, loan data, fine data
Outputs?   issue confirmation / rejection message
```

This method dramatically reduces the chance of inventing unrelated DFD elements.

---

# Part XIV — Ultra-Condensed Concept Maps for Fast Revision

## 199. Software engineering map

```text
Software engineering
├── engineering approach
├── systematic experience
├── techniques / methodologies / guidelines
├── abstraction
├── decomposition
├── quality
├── productivity
└── lifecycle discipline
```

---

## 200. Life-cycle map

```text
Life cycle
├── Feasibility
├── Requirements
├── Design
├── Coding
├── Testing
└── Maintenance

Models
├── Classical Waterfall → phase-driven
├── Iterative Waterfall → feedback-driven
├── Prototype → learning-driven
├── Evolutionary → release-driven
└── Spiral → risk-driven
```

---

## 201. Requirements map

```text
Requirements analysis
├── gathering
│   ├── observation
│   ├── documentation
│   ├── discussion
│   └── analysis
├── defect detection
│   ├── inconsistency
│   └── incompleteness
└── specification
    └── reviewed/approved SRS
```

---

## 202. SRS map

```text
SRS
├── user needs
├── contract
├── reference
├── implementation basis
├── black-box behavior
└── requirements
    ├── functional
    ├── nonfunctional
    └── constraints
```

Good SRS:

```text
Concise + Unambiguous
Complete
Consistent
Traceable
Verifiable
Easy to change
WHAT, not HOW
```

---

## 203. Decision logic map

```text
Complex rule
├── decision tree → visual path
└── decision table → systematic combinations
```

---

## 204. Formal specification map

```text
Formal specification
├── choose notation
├── model state
├── define operations
├── preconditions
└── postconditions

Z
├── schemas
├── Δ / Ξ
├── ? / !
└── primes

Predicate logic
├── ∀
├── ∃
├── ∧
├── ∨
├── ¬
├── ⇒
└── ⇔
```

---

## 205. Design map

```text
Design
├── High-level design
│   ├── modules
│   ├── control relationships
│   ├── interfaces
│   └── structure chart
└── Detailed design
    ├── data structures
    └── algorithms
```

Good design:

```text
Correct
Understandable
Efficient
Maintainable
```

Structural qualities:

```text
High cohesion
Low coupling
Neat shallow hierarchy
Sensible fan-in
Low/unexcessive fan-out
Layering
```

---

## 206. Cohesion map

```text
Worst → Best
Coincidental
Logical
Temporal
Procedural
Communicational
Sequential
Functional
```

Mnemonic cue:

> **C L T P C S F**

A practical memory story:

> “Random things become a category; category actions happen together; a procedure follows a sequence; actions may share data; a pipeline passes results; finally everything serves one function.”

---

## 207. Coupling map

```text
Best → Worst
Data
Stamp
Control
Common
Content
```

Memory cue:

> **D S C C C**

Recognition ladder:

```text
data
 ↓
record/structure
 ↓
control flag
 ↓
global data
 ↓
internal code access
```

---

## 208. DFD map

```text
Requirement
   ↓
External entities
Functions
Outputs
Data stores
   ↓
Context diagram
   ↓
Level 1 (3–7 major processes)
   ↓
Level 2 (one complex process)
   ↓
Balance + requirement coverage check
```

Never forget:

```text
DFD = data in motion
NOT = execution control flow
```

---

# Part XV — Final “Where Is This Used?” Guide

## 209. Where software engineering concepts show up outside the classroom

### Software engineering foundations

Used when a team must build and maintain a large product rather than a small personal program.

### Life-cycle models

Used to structure development activities, responsibilities, reviews, feedback, releases, and risk handling.

### Feasibility study

Used before major investment to evaluate technical and economic viability and compare solution strategies.

### Requirements analysis

Used before design to determine what users actually need and to uncover incomplete or conflicting requirements.

### SRS

Used as a common, contractual, traceable statement of required external behavior.

### Decision tables/trees

Used whenever behavior depends on several conditions and analysts need confidence that important combinations have been covered.

### Formal specification

Used where mathematical precision and explicit state/behavior rules are valuable, especially in safety- and reliability-critical contexts highlighted by the lecture.

### DFDs

Used in structured analysis to model processes, external entities, data stores, and data flows.

### High-level design

Used to define the module structure and interfaces before implementation details are finalized.

### Cohesion

Used to judge whether a module contains a strong, coherent responsibility.

### Coupling

Used to judge how much modules depend on one another through their interfaces.

### Fan-in/fan-out and layering

Used to inspect the structure of the complete module hierarchy and detect reuse or excessive coordination.

### Function-oriented design

Useful when thinking naturally in terms of system functions and top-down refinement.

### Object-oriented design

Useful when thinking naturally in terms of entities/objects whose data and behavior are bundled together.

---

# Part XVI — A Very Detailed Final Checklist

## 210. Before submitting a requirements-analysis answer

Ask:

- Have I defined the problem before proposing a solution?
- Have I found inconsistent statements?
- Have I checked boundary conditions?
- Have I looked for missing behavior?
- Have I separated functional requirements from qualities and constraints?
- Can every requirement be verified?
- Is the language precise?

## 211. Before submitting an SRS answer

Ask:

- Did I state WHAT rather than HOW?
- Did I use clear IDs?
- Did I define inputs and outputs?
- Did I avoid irrelevant text?
- Did I avoid contradictions?
- Did I specify exceptional cases?
- Is the requirement complete enough to implement and test?

## 212. Before submitting a formal specification answer

Ask:

- Have I identified the state correctly?
- Did I state the invariant?
- Did I distinguish `Δ` from `Ξ`?
- Did I mark inputs with `?`?
- Did I mark outputs with `!` if required?
- Did I distinguish preconditions from postconditions?
- Did I use primes for after-state values?
- Did I translate quantifiers and connectives correctly?

## 213. Before submitting a design answer

Ask:

- Does the design implement every required function?
- Is each module understandable?
- Is cohesion high?
- Is coupling low?
- Is fan-out excessive?
- Are useful reusable modules likely to have sensible fan-in?
- Is layering respected?
- Are interfaces explicit?
- Is the hierarchy neat rather than tangled?

## 214. Before submitting a DFD answer

Ask:

- Is the context diagram exactly one system bubble?
- Are all external entities shown there?
- Have I kept internal stores out of the context diagram?
- Does level 1 contain around 3–7 major processes?
- Does every requirement function appear somewhere?
- Did I name flows as data rather than control conditions?
- Did I choose a genuinely complex process for level 2?
- Does the level-2 decomposition explain the parent process?
- Did I avoid inventing entities or features not in the requirement?
- Did I preserve every required output/report?

---

# Part XVII — “Explain It Like an Examiner” Answer Bank

## 215. Why is modularity important?

**Core answer:** Modularity divides a complex system into smaller, more understandable units. Nearly independent modules can be understood individually, which reduces overall complexity and makes change, testing, and maintenance easier.

**Add for detail:** Good modular design seeks high cohesion within modules and low coupling between modules, with a neat hierarchy.

---

## 216. Why is high cohesion desirable?

**Core answer:** High cohesion means the elements of a module contribute strongly to one clearly defined task. Such modules are easier to understand in isolation, easier to test, less likely to propagate errors through unrelated responsibilities, and more reusable.

---

## 217. Why is low coupling desirable?

**Core answer:** Low coupling keeps modules relatively independent. A change in one module is then less likely to require changes in others, improving maintainability and reducing interface-related complexity.

---

## 218. Why is functional cohesion considered the goal?

Because all elements contribute to one clearly describable function. The module has a narrow and understandable responsibility, making it easier to reason about, test, reuse, and modify.

---

## 219. Why is content coupling the worst?

Because one module depends directly on another module's internal implementation. Internal changes can therefore break external callers, defeating modularity and encapsulation.

---

## 220. Why is the SRS called a black-box specification?

Because it defines the externally observable input/output behavior of the system while intentionally leaving internal implementation details unspecified.

---

## 221. Why is a prototype not necessarily production software?

Because the source defines it as a limited “toy implementation” designed primarily to clarify requirements or investigate technical issues. It can use shortcuts and may have low reliability or inefficient performance.

---

## 222. Why does the spiral model focus on risk?

Because each loop identifies and analyzes the most important unresolved risk, develops/validates something to reduce it, reviews the result, and then plans the next loop. Its defining organizing force is risk rather than simply phases or releases.

---

## 223. Why is iterative waterfall better than classical waterfall for defect handling?

Because it provides feedback paths. When a defect is discovered, the team can return to the phase where the defect was introduced and redo the affected downstream work rather than treating the late symptom as an isolated coding problem.

---

## 224. Why do DFDs not show execution order?

Because a DFD is intended to model data transformations and data movement. Execution sequence, timing, and branching control belong to other forms of behavioral modeling; the supplied DFD exercise explicitly says a DFD carries data, not control information.

---

# Part XVIII — Final Integrated Example: One Requirement Viewed Through Every Lecture

## 225. ATM withdrawal as the course's “master example”

The supplied requirements lecture uses ATM withdrawal for ordinary requirements, decision logic, and formal specification. It is also useful as a compact way to connect the entire course.

### Requirement perspective

The system must validate the card/PIN, check balance and daily limit, dispense cash, and update the balance only after validation succeeds.

### SRS perspective

Write numbered `shall` clauses:

```text
FR-1 validate card/PIN
FR-2 reject above available balance
FR-3 reject above daily limit
FR-4 dispense + update balance only after checks pass
```

Constraints include response time, denomination availability, and card retention after three incorrect PIN attempts.

### Decision logic perspective

```text
Valid card/PIN?
   ↓ yes
Enough balance?
   ↓ yes
Within daily limit?
   ↓ yes
Dispense + update
```

### Formal specification perspective

State:

```text
balance
 dailyWithdrawn
dailyLimit
```

Invariant:

```text
dailyWithdrawn ≤ dailyLimit
```

Operation:

```text
Withdraw
ΔATM
amt? : ℕ
```

Preconditions:

```text
amt? ≤ balance
dailyWithdrawn + amt? ≤ dailyLimit
```

Postconditions:

```text
balance′ = balance − amt?
dailyWithdrawn′ = dailyWithdrawn + amt?
```

### Design perspective — practical extension

A designer may need separate modules for authentication, withdrawal validation, cash dispensing, and account update. The exact design is not prescribed by the SRS. The design quality can then be judged using cohesion, coupling, hierarchy, and interface clarity.

### Testing perspective — practical extension

A tester can derive cases from each requirement:

```text
Invalid PIN → reject
Amount > balance → reject
Amount > daily limit → reject
Valid request within all constraints → dispense + update
```

### Life-cycle perspective

If the ATM rule is already well known and stable, a staged process may be easier to organize. If a new technical challenge such as unusual cash-dispensing hardware creates major uncertainty, prototyping or risk-focused experimentation may be introduced. The process choice depends on the project's characteristics.

This integrated example demonstrates the main purpose of the course: each artifact answers a different question, but all artifacts refer to the same underlying system.

---

# Part XIX — Source-Fidelity Note

This expanded section deliberately follows the terminology and examples of the supplied lecture material. The main source-derived anchors include:

- the introductory lecture's engineering analogy, program/product distinction, historical evolution, hardware/software partitioning, and life-cycle introduction;
- the life-cycle lecture's six stages, five models, feasibility study, maintenance categories, worked cases, and model-specific merits/demerits;
- the requirements lecture's gathering techniques, inconsistency/incompleteness examples, ATM exercise, SRS roles, black-box view, good/bad SRS properties, functional/nonfunctional/constraint classification, decision logic, Z notation, and predicate-logic examples;
- the software-design lecture's design-phase definition, good-design criteria, modularity, seven cohesion types, five coupling types, hierarchy measures, layering, function-oriented/object-oriented contrast, and fire-alarm case;
- the Trading-House DFD statement and its worked decomposition;
- the ten DFD practice requirements.

Where this document says **“practical extension”**, the purpose is to explain why the source concept matters, where such a concept is useful, how to recognize it, and how to apply it in an exam or engineering discussion. Those explanations are teaching extensions, not claims that every sentence appeared verbatim in the supplied slides.

---

# Part XX — Final Memory Sheet: The 25 Things to Know Without Hesitation

1. Software engineering is an engineering approach to software development.
2. Large software problems require abstraction and decomposition.
3. A software product needs systematic development, documentation, and maintainability.
4. The software life cycle has six stages in the course framework.
5. Classical waterfall is sequential with no formal way back.
6. Iterative waterfall adds feedback paths and phase containment of errors.
7. Prototyping is primarily for learning/clarification and can be thrown away.
8. Evolutionary development grows a usable system release by release.
9. Spiral development is primarily risk-driven.
10. Requirements analysis happens before design.
11. Inconsistency means requirements conflict.
12. Incompleteness means important behavior is missing.
13. Functional requirements describe input → processing → output behavior.
14. Nonfunctional requirements describe qualities such as performance, security, usability, and maintainability.
15. Constraints restrict what the system should/should not do or its environment.
16. An SRS specifies WHAT, not unnecessary HOW.
17. A good SRS should be complete, consistent, traceable, and verifiable.
18. Decision trees show paths; decision tables systematically enumerate conditions and actions.
19. Z schemas separate state/declarations from predicates and use pre/postconditions for operations.
20. High-level design defines module structure and interfaces; detailed design defines module data structures and algorithms.
21. Cohesion concerns the internal strength of one module.
22. Coupling concerns interdependence between modules.
23. Aim for high cohesion and low coupling.
24. A context DFD has one system bubble and all external entities at the boundary.
25. A DFD models data movement, not execution control flow.

---

## End of expanded study guide

The original 105-page source audit remains above this section. This expansion is intentionally designed to make the notes usable not only for remembering **what** the lecturer said, but for understanding **why the concept exists, when it matters, how to recognize it, how it connects to the rest of software engineering, and how to write it in an examination answer**.
