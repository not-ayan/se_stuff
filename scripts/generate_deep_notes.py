import os

os.makedirs("notes_md", exist_ok=True)

# -------------------------------------------------------------
# MODULE 1: INTRODUCTION & STRUCTURED PROGRAMMING
# -------------------------------------------------------------
mod1_content = """# Module 1: Introduction to Software Engineering & Structured Programming

![Module 1: Foundations of Software Engineering & Structured Programming](/images/mod1_se_foundations_infographic.jpg)

---

## 1.1 Scope and Necessity of Software Engineering

Software Engineering (SE) is defined by IEEE as:
> **IEEE 610.12 Definition:** *"The application of a systematic, disciplined, quantifiable approach to the development, operation, and maintenance of software; that is, the application of engineering to software."*

Alternatively, as articulated by Prof. Rajib Mall (IIT Kharagpur), Software Engineering can be viewed as:
> *"A systematic collection of past experience arranged in the form of methodologies, guidelines, tools, and principles to achieve good quality software cost-effectively."*

### The Building Construction Analogy
To appreciate why software engineering principles are essential, consider the classic civil engineering analogy:
* **Constructing a Small Garden Wall:**
  * Requires basic intuition, a pile of bricks, a trowel, and cement.
  * No formal architectural drawings, structural load calculations, or soil testing are needed.
  * If the wall leans slightly or collapses, the failure cost is negligible, and it can be rebuilt quickly by a single person.
  * *Software Parallel:* A 50-line hobby script or personal automation script written in an ad-hoc ("exploratory") style.
* **Constructing a 50-Story Multistoried Skyscraper:**
  * Cannot simply be treated as "stacking more bricks."
  * Requires civil engineers, architects, electrical consultants, plumbing plans, zoning permits, soil mechanics, and seismic testing.
  * If built on pure intuition without engineering principles, catastrophic collapse, massive financial loss, and danger to life occur.
  * *Software Parallel:* An enterprise banking system, air traffic control system, or cloud infrastructure running millions of lines of code across distributed servers.

```
       Small Wall Construction                    Skyscraper Construction
   ┌─────────────────────────────┐           ┌─────────────────────────────────┐
   │ • 1 Person                  │           │ • 100+ Specialized Engineers     │
   │ • Intuition & Basic Tools   │    VS     │ • Formal Blueprints & Standards │
   │ • Zero Formal Planning      │           │ • Structural Analysis & Testing │
   │ • Negligible Risk           │           │ • Catastrophic Cost of Failure  │
   └─────────────────────────────┘           └─────────────────────────────────┘
             ▲                                               ▲
             │                                               │
     Toy Script (50 LOC)                         Enterprise System (1M+ LOC)
```

---

## 1.2 The Exponential Complexity Growth Curve

Why does software development become so challenging as size increases?
In manufacturing, producing 10,000 bolts is roughly 10 times the effort of producing 1,000 bolts (linear growth $O(N)$). However, in unengineered software, **effort and complexity grow exponentially or super-linearly with problem size**:

$$Effort = c \cdot S^k \quad \text{where } k > 1 \text{ (typically } k \approx 1.2 \text{ to } 1.5 \text{)}$$

Where:
* $S$ is the size of the software (e.g., in KLOC — Thousands of Lines of Code).
* $c$ is a project-specific constant.
* $k$ is the exponent representing non-linear inter-module coupling and cognitive complexity.

```
Effort (Person-Months)
   ▲                                              . * (Exploratory Style: O(N²))
   │                                           . *
   │                                        . *
   │                                     . *
   │                                  . *
   │                               . *
   │                            . *
   │                         . *
   │  ─────────────────────.───────────────────── (With SE Modularization: Near Linear O(N))
   │                  . *  /
   │             . *      /
   │        . *          /
   │   . *              /
   └──────────────────────────────────────────────► Problem Size (LOC / Functions)
```

### The $O(N^2)$ Cognitive Interconnection Proof
If a program consists of $N$ statements or modules that arbitrarily communicate with one another:
* Total potential communication paths / interactions = $\frac{N(N - 1)}{2} \approx O(N^2)$.
* If $N = 10$, interactions = $\frac{10 \times 9}{2} = 45$.
* If $N = 1,000$, interactions = $\frac{1,000 \times 999}{2} = 499,500$ (over 10,000 times more complex for a 100-fold size increase!).
* A human mind can only hold $7 \pm 2$ chunks of information simultaneously (Miller's Law). Unmanaged software quickly exceeds human cognitive limits.

---

## 1.3 Core Pillars for Taming Complexity: Abstraction & Decomposition

Software engineering counters this super-linear complexity curve through two fundamental scientific techniques:

```
                          ┌────────────────────────┐
                          │   High-Level Problem   │
                          └───────────┬────────────┘
                                      │ (Top-Down Decomposition)
                   ┌──────────────────┴──────────────────┐
                   ▼                                     ▼
         ┌──────────────────┐                  ┌──────────────────┐
         │   Sub-Problem 1  │                  │   Sub-Problem 2  │
         └─────────┬────────┘                  └─────────┬────────┘
                   │                                     │
          ┌────────┴────────┐                   ┌────────┴────────┐
          ▼                 ▼                   ▼                 ▼
     ┌─────────┐       ┌─────────┐         ┌─────────┐       ┌─────────┐
     │ Module A│       │ Module B│         │ Module C│       │ Module D│
     └─────────┘       └─────────┘         └─────────┘       └─────────┘
          │                 │                   │                 │
          └─────────────────┴───────────────────┴─────────────────┘
                                      │ (Abstraction: Clean Interfaces)
                                      ▼
                        Independently Solvable Units
```

### 1. Principle of Abstraction
* **Definition:** The cognitive process of simplifying a problem by focusing strictly on relevant properties while suppressing and hiding unnecessary operational details.
* **Mechanism:** Enables an engineer to work at a higher conceptual level without being bogged down by low-level hardware or data structure minutiae.
* **Examples in Practice:**
  * *High-level programming languages:* Abstract away CPU registers, stack pointers, and machine opcodes.
  * *Abstract Data Types (ADTs):* A `Stack` is defined by operations `push()`, `pop()`, and `top()` without exposing the underlying dynamic array or linked-list implementation.
  * *Layered Architecture:* The UI layer talks to the Business Logic layer via interfaces without knowing SQL database schemas.

### 2. Principle of Decomposition (Modularization)
* **Definition:** Breaking down a complex, unmanageable monolith into smaller, distinct sub-problems until each sub-problem is simple enough to be understood and solved independently.
* **Requirements for Effective Decomposition:**
  1. **Independent Solvability:** Each sub-component must be solvable and testable in isolation.
  2. **Re-composability:** Combining the solutions of individual sub-components must yield the complete, correct solution to the original problem without unexpected side effects.
  3. **Low Inter-dependence:** Communication between decomposed units must be minimal (Low Coupling).

---

## 1.4 The Software Crisis & Hardware vs Software Cost Trends

### Historical Background of the Crisis
During the 1960s and 1970s, rapid advancements in semiconductor physics (Moore's Law) made computer hardware exponentially faster, smaller, and cheaper. Organizations began deploying computers for complex missions (space exploration, military defense, enterprise payroll, hospital systems).

However, software development methodologies remained stuck in artisan, craft-based, ad-hoc programming.

```
% of Total Cost
100% ┌─────────────────────────────────────────────────────────────┐
     │ \ Hardware Costs Drop Rapidly                               │
     │  \                                  Software Maintenance    │
 80% │   \                                    Soars to ~80%        │
     │    \                                         ▲              │
 60% │     \                                       /               │
     │      \                                     /                │
 40% │       \                                   /                 │
     │        \                                 /  Software Dev    │
 20% │         \                               /                   │
     │          \_____________________________/                    │
  0% └─────────────────────────────────────────────────────────────┘
    1960     1970     1980     1990     2000     2010     2020+
```

### Key Symptoms of the Software Crisis
1. **Severe Schedule Slippages:** Projects consistently delivered months or years behind deadlines (the "Mythical Man-Month" phenomenon).
2. **Catastrophic Budget Overruns:** Software costs routinely exceeded original budgets by 200% to 500%.
3. **Low Quality & Reliability:** Deployed software was plagued with critical bugs, memory leaks, and unpredictable crashes.
4. **Maintenance Nightmare:** Modifying or fixing one bug inadvertently introduced two new bugs elsewhere due to tangled spaghetti logic. Maintenance costs ballooned to **60%–80%** of total software lifetime cost.
5. **Software Invisibility & Intangibility:** Management had no objective way to measure progress during development until the code was tested.

### Root Causes
* **Exploratory Style ("Code and Fix"):** Writing code immediately upon hearing requirements, without formal analysis, architecture blueprints, or test planning.
* **Lack of Systematic Methodologies:** No standard lifecycle models, formal verification, or quality control gates.
* **Absence of Documentation:** Software existed solely in the programmer's head. When the programmer left, the code became unmaintainable.

---

## 1.5 Software Product vs Toy Program

A critical distinction emphasized in university curricula is that a **Software Product is fundamentally different from a simple Program**:

$$\text{Software Product} = \text{Source Code} + \text{Documentation} + \text{Operating Procedures} + \text{Maintenance Support}$$

| Characteristic | Toy / Student Program | Commercial Software Product |
| :--- | :--- | :--- |
| **Target User** | Developed for self or single professor | Developed for thousands/millions of non-technical users |
| **Size & Scope** | Small (typically $< 1,000$ LOC) | Large ($50,000$ to millions of LOC) |
| **Development Team** | Single programmer | Large teams of engineers, testers, designers, and managers |
| **Documentation** | Minimal or none | SRS, Design Documents (SDD), Test Plans, API Specs, User Manuals |
| **User Interface** | Basic CLI or console inputs | Polished, accessible GUI/Web/Mobile UX with validation |
| **Error Handling** | Crashes on unexpected input | Robust error handling, recovery, transaction rollbacks, logs |
| **Lifespan & Maintenance** | Abandoned after grading / one-time use | Actively maintained for 10 to 30+ years |
| **Cost Focus** | Minimal time investment | Multi-million dollar investment where maintenance accounts for ~80% |

---

## 1.6 Exploratory Development Style vs Modern Software Engineering

```
                          EXPLORATORY ("CODE AND FIX") STYLE
 ┌───────────────┐        ┌───────────────┐        ┌──────────────────┐
 │ Vague Customer│───────►│ Start Coding  │───────►│ Test & Patch     │◄───┐
 │ Discussion    │        │ Immediately   │        │ in Production    │    │ (Endless
 └───────────────┘        └───────────────┘        └────────┬─────────┘    │  Bug Cycles)
                                                            └──────────────┘

                              MODERN SOFTWARE ENGINEERING
 ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
 │ Requirements │────►│ Design &     │────►│ Coding with  │────►│ Multi-Tier   │
 │ & SRS Spec   │     │ Architecture │     │ Unit Tests   │     │ Verification │
 └──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

### Detailed Comparison

1. **Error Philosophy:**
   * *Exploratory:* Relies on **error correction** after software is built (reactive patching).
   * *Modern SE:* Relies on **error prevention** throughout every phase (proactive defect containment).
2. **Development Mindset:**
   * *Exploratory:* Code-centric. Coding begins on day one.
   * *Modern SE:* Engineering-centric. Code is written only after requirements analysis and architectural design are verified.
3. **Test Planning:**
   * *Exploratory:* Ad-hoc testing only after the entire program is compiled.
   * *Modern SE:* Test cases and acceptance criteria are designed early during requirements specification (V-Model alignment).
4. **Visibility & Traceability:**
   * *Exploratory:* Complete black box. Management cannot gauge completion percentage until the very end.
   * *Modern SE:* High phase visibility with verified milestone deliverables (SRS, SDD, Code Reviews, CI/CD builds).

---

## 1.7 Structured Programming & Control Flow Graph (CFG) Analysis

### The Historical `goto` Controversy
In the early days of programming (Assembly, FORTRAN, early BASIC), control flow was governed primarily by unconditional jumps (`goto label` / `JMP`). As software grew, jump statements crisscrossed throughout the codebase, creating **spaghetti code**:
* Code execution paths became untraceable.
* Reasoning about program invariants or variables at any specific line became mathematically impossible.
* In 1968, **Edsger W. Dijkstra** published his famous letter: *"Go To Statement Considered Harmful"*, arguing that software quality is directly proportional to how easily programmers can trace control flow.

### The Böhm-Jacopini Theorem (1966)
The theoretical foundation of modern structured programming:
> **Theorem:** *Any computable algorithm (or flow chart program) can be expressed using only THREE fundamental control structures:*
> 1. **Sequence:** Statements executed in strict sequential order.
> 2. **Selection (Conditional Branching):** `if-then-else` constructs.
> 3. **Iteration (Repetition / Looping):** `while-do` / `do-while` loops.

```
       1. SEQUENCE                 2. SELECTION                 3. ITERATION
         ┌──────┐                     ┌──────┐                    ┌──────┐
         │ S₁   │                     │ Cond?│                    │ Cond?│◄────┐
         └──┬───┘                    ╱└───┬──┘╲                  ╱└───┬──┘╲    │
            ▼                       ▼     │    ▼                ▼     │    ▼   │
         ┌──────┐                [True]   │  [False]         [True]   │ [False]│
         │ S₂   │                  │      │    │                │     │    │   │
         └──┬───┘                  ▼      │    ▼                ▼     │    │   │
            ▼                   ┌────┐    │  ┌────┐          ┌────┐   │    │   │
         ┌──────┐               │ S₁ │    │  │ S₂ │          │Body│───┘    │   │
         │ S₃   │               └─┬──┘    │  └─┬──┘          └────┘        │   │
         └──────┘                 └───────┼────┘                           │   │
                                          ▼                                ▼   │
                                       (Merge)                          (Exit)─┘
```

### The SESE Property (Single-Entry, Single-Exit)
A core rule of structured programming is that every component module, loop, and block must possess the **Single-Entry Single-Exit (SESE)** property:
* **Single Entry:** Control enters the block only at one designated start node.
* **Single Exit:** Control leaves the block only at one designated exit node.
* **No Uncontrolled Jumps:** No jumping into the middle of a loop or skipping out of nested loops without cleanup.

### Benefits of Structured Programming
1. **Easy Static Code Analysis:** The static textual structure of code directly mirrors its dynamic execution sequence at runtime.
2. **Formal Verification:** Enables mathematical induction and Hoare logic proofs on loops using pre-conditions, post-conditions, and loop invariants.
3. **High Modularity & Maintainability:** Functions can be refactored, tested, and replaced as self-contained black boxes.

---

## 1.8 Exam Essentials & Revision Summary

### High-Yield Flash Summary
* **Software Engineering Definition:** Systematic, disciplined, quantifiable application of engineering principles to software development, operation, and maintenance.
* **Building Analogy:** Small Wall (Simple script, intuition-based, zero risk) vs Skyscraper (Large product, formal blueprints, structural testing, fatal failure risk).
* **Complexity Curve:** Non-linear / exponential effort growth $E = c \cdot S^k$ ($k > 1$) due to $O(N^2)$ interaction paths. SE flattens this curve via **Abstraction** and **Decomposition**.
* **Software Crisis:** Caused by hardware advances outpacing software techniques; characterized by budget overruns, late delivery, and soaring maintenance costs (~80% of lifecycle cost).
* **Software Product:** Source Code + Full Documentation + Operating Manuals + Maintenance Infrastructure.
* **Böhm-Jacopini Theorem:** Any computable logic requires only 3 structures: **Sequence**, **Selection** (`if-else`), and **Iteration** (`while-do`). All structured blocks must be **SESE** (Single-Entry Single-Exit).
"""

# -------------------------------------------------------------
# MODULE 2: SOFTWARE LIFE CYCLE MODELS
# -------------------------------------------------------------
mod2_content = """# Module 2: Software Life Cycle Models (SDLC)

![Module 2: SDLC Models, Phase Containment & Spiral Architecture](/images/sdlc_models_infographic.jpg)

---

## 2.1 The Need for a Life Cycle Model

A **Software Life Cycle Model** (SDLC - Software Development Life Cycle) is a descriptive and diagrammatic framework representing the phases through which a software product moves from inception to retirement.

### Why Ad-Hoc Development Fails Without an SDLC
1. **Lack of Entry and Exit Criteria:** Without clear phase boundaries, developers begin coding before understanding requirements, leading to massive rewrites.
2. **Zero Project Visibility:** Project managers cannot track real progress or milestone completion.
3. **No Quality Gates:** Errors made in initial phases go undetected until integration testing, where fixing them is 100x more expensive.
4. **Poor Resource Allocation:** Difficult to plan staffing, budget, and test environments.

---

## 2.2 The Classical Waterfall Model

The **Classical Waterfall Model** is the earliest and most fundamental conceptual SDLC model. It proposes a strict, linear-sequential sequence of phases.

```
 ┌───────────────────────────┐
 │     Feasibility Study     │
 └─────────────┬─────────────┘
               ▼
 ┌───────────────────────────┐
 │ Requirements Analysis (SRS│
 └─────────────┬─────────────┘
               ▼
 ┌───────────────────────────┐
 │ Design (Architectural/Det)│
 └─────────────┬─────────────┘
               ▼
 ┌───────────────────────────┐
 │ Coding and Unit Testing   │
 └─────────────┬─────────────┘
               ▼
 ┌───────────────────────────┐
 │ Integration & System Test │
 └─────────────┬─────────────┘
               ▼
 ┌───────────────────────────┐
 │  Maintenance & Evolution  │
 └───────────────────────────┘
```

### Detailed Phase Breakdown

#### Phase 1: Feasibility Study
* **Objective:** Determine whether the proposed software project is technically, financially, and operationally viable.
* **Key Activities:**
  * Collect high-level problem definitions.
  * Analyze alternative conceptual solutions.
  * Conduct **Cost-Benefit Analysis (CBA)**: Compare development/operational costs against projected revenue and savings.
  * Technical feasibility: Does technology, hardware, and expertise exist?
* **Deliverable:** *Feasibility Study Report*.

#### Phase 2: Requirements Analysis and Specification
* **Objective:** Understand exact customer needs and produce a precise, unambiguous contract.
* **Two Sub-stages:**
  1. *Requirements Gathering & Analysis:* Collect needs via interviews/surveys, resolve inconsistencies, eliminate ambiguities.
  2. *Requirements Specification:* Structure requirements into a formal **SRS (Software Requirements Specification)** document following standards like IEEE 830.
* **Deliverable:** *IEEE 830 Software Requirements Specification (SRS)*.

#### Phase 3: Software Design
* **Objective:** Transform the "WHAT" of the SRS into the "HOW" of software architecture and module structures.
* **Two Sub-stages:**
  1. *Architectural / High-Level Design (HLD):* Decompose system into major modules, define interfaces, data flows, and database schemas.
  2. *Detailed / Low-Level Design (LLD):* Specify internal data structures, algorithms, and pseudo-code for each module.
* **Deliverable:** *Software Design Document (SDD)*.

#### Phase 4: Coding and Unit Testing
* **Objective:** Translate low-level module designs into executable source code and test each module in isolation.
* **Key Activities:** Follow coding standards, write unit test suites, perform static code inspections.
* **Deliverable:** *Fully tested and commented source code modules*.

#### Phase 5: Integration and System Testing
* **Objective:** Assemble individual modules into a complete system and verify overall functional, performance, and security compliance against the SRS.
* **Testing Levels:**
  * *Integration Testing:* Test module interfaces (Top-down, Bottom-up, or Big-Bang).
  * *System Testing:* Test entire integrated system (Performance, Load, Security, Recovery).
  * *Acceptance Testing:* Validation testing conducted by the client (Alpha & Beta testing).
* **Deliverable:** *Test Execution Reports and Certified Executable Software Release*.

#### Phase 6: Maintenance
* **Objective:** Support and evolve the software after deployment throughout its operational lifespan.
* **Maintenance Categories:**
  1. *Corrective Maintenance (20%):* Fixing residual bugs and runtime faults.
  2. *Adaptive Maintenance (20%):* Modifying software to run in changed environments (OS upgrades, hardware shifts).
  3. *Perfective Maintenance (50%):* Adding new features or enhancing performance based on user feedback.
  4. *Preventive Maintenance (10%):* Refactoring code to reduce future maintenance overhead.
* **Deliverable:** *Patches, minor/major version releases, and maintenance logs*.

### Shortcomings of Classical Waterfall
* **Idealistic & Theoretical:** Assumes requirements are 100% frozen on day one with zero human error.
* **No Feedback Paths:** Does not accommodate errors discovered in later phases.
* **Delayed Risk Resolution:** Working software is not visible until the very end; if requirements were misunderstood, catastrophic failure occurs.

---

## 2.3 The Iterative Waterfall Model

The **Iterative Waterfall Model** modifies the classical model by introducing **systematic feedback loops** between adjacent phases.

```
 ┌───────────────────────────┐
 │ Requirements Analysis/SRS │◄───────┐
 └─────────────┬─────────────┘        │
               ▼                      │ Feedback for
 ┌───────────────────────────┐        │ Spec Inconsistencies
 │      Design (HLD/LLD)     │◄───────┼───────┐
 └─────────────┬─────────────┘        │       │
               ▼                      │       │ Feedback for
 ┌───────────────────────────┐        │       │ Design Flaws
 │  Coding and Unit Testing  │◄───────┼───────┼───────┐
 └─────────────┬─────────────┘        │       │       │
               ▼                      │       │       │ Feedback for
 ┌───────────────────────────┐        │       │       │ Interface Bugs
 │ Integration & System Test ├────────┴───────┴───────┘
 └─────────────┬─────────────┘
               ▼
 ┌───────────────────────────┐
 │        Maintenance        │
 └───────────────────────────┘
```

### Phase Containment of Errors
* **Definition:** The principle that errors should be identified and eliminated within the exact phase in which they originate, rather than propagating into downstream phases.
* **Why Iterative Feedback to Upstream Phases is Costly:**
  If a requirement defect is only discovered during Integration Testing:
  1. The SRS must be updated.
  2. Architectural and detailed designs must be redrawn.
  3. Multiple source files must be recoded.
  4. All unit tests, integration test suites, and user documentation must be regenerated.

---

## 2.4 Boehm's Error Cost Escalation Curve

Barry Boehm established that the **cost to rectify a defect escalates exponentially (by orders of magnitude)** the later it is detected in the lifecycle:

```
Relative Cost to Fix Defect
   200x ┌─────────────────────────────────────────────────────────────* (Post-Release/Maint)
        │                                                          . *
   100x │                                                       . *
        │                                                    . *
    50x │                                                 . *
        │                                              . * (System Testing)
    20x │                                           . *
        │                                        . * (Coding & Unit Test)
    10x │                                     . *
        │                                  . * (Design Phase)
     1x │───────────────────────────────. * (Requirements Phase)
        └─────────────────────────────────────────────────────────────►
          Requirements    Design      Coding       Testing    Maintenance
```

| Phase of Defect Detection | Relative Cost Multiplier | Example Fix Cost | Impact / Scope |
| :--- | :--- | :--- | :--- |
| **Requirements** | $1\times$ | \$100 | Edit a line of text in the SRS document. |
| **Design** | $3\times - 5\times$ | \$500 | Redraw structure chart / database schema. |
| **Coding** | $10\times$ | \$1,000 | Rewrite function, re-run unit test. |
| **System Testing** | $20\times - 50\times$ | \$5,000 | Re-architect subsystems, regress integration test suite. |
| **Maintenance / Post-Release**| $100\times - 200\times$ | \$20,000+ | Recall release, hotfix patch, legal liability, data loss. |

---

## 2.5 The Prototyping Model

When customer requirements are vague, ill-defined, or complex (especially for novel UI/UX), the **Prototyping Model** constructs a rapid, throwaway mockup before full-scale development.

```
 ┌───────────────────────────┐
 │ High-Level Requirements   │
 └─────────────┬─────────────┘
               ▼
 ┌───────────────────────────┐
 │   Quick Prototype Design  │◄──────────────────┐
 └─────────────┬─────────────┘                   │
               ▼                                 │ User Suggestions
 ┌───────────────────────────┐                   │ & Refinements
 │ Build Working Prototype   │                   │
 └─────────────┬─────────────┘                   │
               ▼                                 │
 ┌───────────────────────────┐                   │
 │ Customer Evaluation / Demo├───────────────────┘
 └─────────────┬─────────────┘
               │ Requirements Fully Understood & Approved
               ▼
 ┌───────────────────────────┐
 │ Detailed SRS Specification│
 └─────────────┬─────────────┘
               ▼
 ┌───────────────────────────┐
 │ Standard Waterfall SDLC   │
 └───────────────────────────┘
```

### Key Highlights
* **Throwaway Prototype:** The prototype is built quickly (often cutting corners in error handling, security, and performance) solely to discover user needs. Once requirements are frozen, the prototype is discarded or refactored.
* **Advantages:** Minimizes requirements misunderstanding; highly effective for novel GUI applications.
* **Disadvantages:** Customer may mistake the prototype for the finished product; extra upfront development overhead.

---

## 2.6 The Evolutionary (Iterative Enhancement) Model

The **Evolutionary Model** divides the software into core functional subsets. The core is built and deployed to the customer first, followed by incremental releases adding more functionality over time.

$$\text{System} = \text{Core Release 1} \rightarrow \text{Release 2 (+ Features)} \rightarrow \text{Release 3 (+ Complex Features)} \dots$$

```
 [Inception] ──► [Develop Core Release 1] ──► [Customer Deployment & Feedback]
                           │
                           ▼
                 [Develop Release 2 (+ Modules)] ──► [Customer Deployment]
                           │
                           ▼
                 [Develop Release 3 (+ Advanced)] ──► [Final Mature System]
```

* **Best Suited For:** Large software systems where getting an initial functional product to market early (MVP - Minimum Viable Product) is critical.
* **Key Risks:** Architectural rot if increments are patched without disciplined refactoring.

---

## 2.7 Boehm's Spiral Model (The Meta-Model)

Proposed by **Barry Boehm (1988)**, the **Spiral Model** is a **risk-driven** lifecycle meta-model. It is termed a "meta-model" because it subsumes other models (Waterfall, Prototyping, Evolutionary) based on the risk profile of each iteration.

```
                    QUADRANT 1:                      QUADRANT 2:
            Determine Objectives,             Identify & Resolve Risks,
            Alternatives & Constraints         Evaluate Alternatives
                            │                       │
                            │      [Spiral Start]   │
                            │            │          │
                     ───────┼────────────┼──────────┼───────
                            │            │          │
                            │                       │
             QUADRANT 4:    │                       │   QUADRANT 3:
           Review & Plan    │                       │ Develop, Verify &
           Next Phase       │                       │ Test Product
```

### The 4 Quadrants of Each Spiral Loop

1. **Quadrant 1: Determine Objectives, Alternatives, and Constraints:**
   * Identify the specific goals of the current loop (e.g., performance, functionality).
   * Explore architectural alternatives and identify project constraints (budget, schedule, hardware).
2. **Quadrant 2: Identify and Resolve Risks (Risk Assessment):**
   * Perform detailed risk analysis (technological uncertainty, staffing shortage, vendor delays).
   * Construct prototypes, benchmarks, or simulations to mitigate identified risks.
3. **Quadrant 3: Develop and Verify Next-Level Product:**
   * Execute design, coding, unit testing, and verification for this iteration (using Waterfall, Prototyping, etc.).
4. **Quadrant 4: Review and Plan Next Phase:**
   * Client reviews the deliverables produced in this loop.
   * Plan the next spiral cycle or terminate if risks are insurmountable.

### Dimensions of the Spiral
* **Radial Dimension ($r$):** Represents cumulative cost incurred to date.
* **Angular Dimension ($\theta$):** Represents progress made in completing the current phase/loop.

---

## 2.8 SDLC Model Selection Matrix

| Model | Project Size | Requirement Clarity | Risk Profile | Customer Involvement |
| :--- | :--- | :--- | :--- | :--- |
| **Classical Waterfall** | Small / Academic | Perfectly Clear | Very Low Risk | At Beginning & End |
| **Iterative Waterfall** | Medium | Well Understood | Low to Moderate | Milestone Reviews |
| **Prototyping** | Small to Medium | Vague / Novel UI | Moderate (UI/UX risk)| High (Continuous feedback)|
| **Evolutionary** | Large / Long-term| Clear Core, Evolving | Moderate | Continuous between releases|
| **Spiral Model** | Large / Complex | High Uncertainty | High Risk | Formal Review every loop |

---

## 2.9 Exam Essentials & Revision Summary

* **SDLC Purpose:** Defines entry/exit criteria, provides milestone visibility, and enforces quality control gates.
* **Waterfall Phases:** Feasibility $\rightarrow$ Requirements (SRS) $\rightarrow$ Design (HLD/LLD) $\rightarrow$ Coding/Unit Test $\rightarrow$ Integration/System Test $\rightarrow$ Maintenance.
* **Maintenance Distribution:** Perfective (~50%) > Corrective (~20%) $\approx$ Adaptive (~20%) > Preventive (~10%).
* **Phase Containment & Boehm Cost Curve:** Rectifying an error in post-release maintenance is **$100\times - 200\times$** more expensive than fixing it during Requirements specification.
* **Spiral Model 4 Quadrants:** 1) Objectives/Constraints $\rightarrow$ 2) Risk Analysis/Prototypes $\rightarrow$ 3) Development/Verification $\rightarrow$ 4) Review/Planning.
"""

# -------------------------------------------------------------
# MODULE 3: REQUIREMENTS & FORMAL SPECIFICATIONS
# -------------------------------------------------------------
mod3_content = """# Module 3: Requirements Analysis, Specification (SRS) & Formal Methods

![Module 3: Requirements Analysis, IEEE 830 SRS, Logic Modeling & Formal Specifications](/images/mod3_requirements_and_formal_specs.jpg)

---

## 3.1 The Requirements Engineering Process

Requirements Engineering is the structured discipline of establishing the services a customer requires from a software system and the constraints under which it must operate.

```
 ┌───────────────┐     ┌───────────────┐     ┌───────────────┐     ┌───────────────┐
 │ Requirements  │────►│ Requirements  │────►│ Requirements  │────►│ Requirements  │
 │  Elicitation  │     │   Analysis    │     │ Specification │     │  Validation   │
 └───────────────┘     └───────────────┘     └───────┬───────┘     └───────────────┘
                                                     │
                                                     ▼
                                            IEEE 830 SRS Document
```

### The System Analyst: The Human Bridge
The **System Analyst** acts as an essential communication bridge between non-technical end-users (who know business problems) and software developers (who understand technical architectures).

```
 ┌──────────────────────┐          ┌──────────────────────┐          ┌──────────────────────┐
 │   Business Clients   │◄────────►│    System Analyst    │◄────────►│ Software Developers  │
 │ (Non-Technical Realm)│          │  (Requirements Bridge│          │  (Technical Realm)   │
 └──────────────────────┘          └──────────────────────┘          └──────────────────────┘
```

### Requirements Elicitation Techniques
1. **Interviews:** Structured or unstructured 1-on-1 dialogues with stakeholders.
2. **Questionnaires & Surveys:** Useful for collecting broad input from thousands of distributed users.
3. **Document Inspection & Archival Review:** Studying existing forms, manuals, invoices, and legacy software logs.
4. **On-Site Observation & Task Analysis:** Observing end-users in their actual operational environment.
5. **Brainstorming & Joint Application Development (JAD):** Intensive multi-day workshops bringing clients and developers into one room.

---

## 3.2 Requirements Analysis

Raw elicited requirements are almost always messy. The analyst must systematically resolve:
1. **Ambiguity:** Terms open to multiple interpretations (e.g., *"The system must respond rapidly"* $\rightarrow$ specify *"p99 response time $< 200\text{ms}$ under 500 concurrent requests"*).
2. **Inconsistency & Contradictions:** Two stakeholders requesting opposing behaviors.
3. **Incompleteness:** Missing edge cases, failure states, or recovery actions.
4. **Feasibility Analysis:** Verifying whether requested features violate physical constraints, budget, or hardware capabilities.

---

## 3.3 The IEEE 830 Standard for Software Requirements Specification (SRS)

The **SRS** is the official contract between client and developers. The IEEE 830 standard defines the 8 mandatory quality characteristics of a professional SRS:

```
                            THE 8 QUALITY PILLARS OF IEEE 830 SRS
  ┌───────────────────────────────────────────────┬───────────────────────────────────────────────┐
  │ 1. Correct      : Every stated requirement    │ 2. Unambiguous  : Has exactly one semantic   │
  │                   accurately reflects needs.  │                   interpretation for all.     │
  ├───────────────────────────────────────────────┼───────────────────────────────────────────────┤
  │ 3. Complete     : Includes all functions, UI, │ 4. Consistent   : No internal conflicts or    │
  │                   performance, and errors.    │                   contradictory statements.   │
  ├───────────────────────────────────────────────┼───────────────────────────────────────────────┤
  │ 5. Ranked       : Prioritized by criticality  │ 6. Verifiable   : Has concrete testable       │
  │                   and stability (MoSCoW).     │                   pass/fail criteria.         │
  ├───────────────────────────────────────────────┼───────────────────────────────────────────────┤
  │ 7. Modifiable   : Cleanly structured with     │ 8. Traceable    : Backward & forward traceable│
  │                   unique IDs and cross-refs.  │                   via Requirements Matrix.    │
  └───────────────────────────────────────────────┴───────────────────────────────────────────────┘
```

### Standard IEEE 830 Document Outline
```
1. INTRODUCTION
   1.1 Purpose
   1.2 Scope of the Product
   1.3 Definitions, Acronyms, and Abbreviations
   1.4 References
   1.5 Overview of the Document
2. OVERALL DESCRIPTION
   2.1 Product Perspective (Autonomous or Subsystem)
   2.2 Product Functions (High-level summary)
   2.3 User Characteristics & Skill Levels
   2.4 General Constraints (Hardware, Regulatory, Security)
   2.5 Assumptions and Dependencies
3. SPECIFIC REQUIREMENTS
   3.1 External Interface Requirements (User, Hardware, Software, Comm)
   3.2 Functional Requirements (Detailed Input-Processing-Output)
   3.3 Performance Requirements (Throughput, Latency, Concurrency)
   3.4 Design Constraints (Programming language, Standards)
   3.5 Non-Functional Attributes (Reliability, Availability, Security, Maintainability)
```

---

## 3.4 Logic Modeling: Decision Trees & Decision Tables

When requirements involve complex business rules and nested conditional policies, natural language prose fails. Two formal operational modeling tools are used:

### 1. Decision Trees
A graphical branching tree representation of decision logic where internal nodes represent conditional tests and leaves represent concrete actions.

```
                           ┌── Age < 18 ──────────► [No Loan Allowed]
                           │
       ┌── Credit Score ───┤
       │   >= 700          │                       ┌── Income >= $50k ──► [Approve Premium Loan]
       │                   └── Age >= 18 ──────────┤
[Loan]─┤                                           └── Income < $50k ───► [Approve Standard Loan]
[App]  │
       │                   ┌── Collateral Present ─► [Approve Secured Loan]
       └── Credit Score ───┤
           < 700           └── No Collateral ──────► [Reject Application]
```

### 2. Decision Tables (The 4-Quadrant Standard)
A precise tabular representation composed of 4 distinct quadrants that guarantees exhaustive coverage of all condition combinations ($2^n$ rules for $n$ binary conditions).

```
  ┌──────────────────────────────────┬──────────────────────────────────┐
  │         CONDITION STUB           │         CONDITION ENTRY          │
  │   (List of all input conditions) │   (Truth values: Y, N, Don't Care│
  ├──────────────────────────────────┼──────────────────────────────────┤
  │          ACTION STUB             │          ACTION ENTRY            │
  │    (List of all possible actions)│      (Execution flags: X, -)     │
  └──────────────────────────────────┴──────────────────────────────────┘
```

#### Worked Example: Software Discount Policy
* **Conditions:**
  * $C_1$: Customer is a Student? ($Y/N$)
  * $C_2$: Purchase Amount $> \$100$? ($Y/N$)
  * $C_3$: First-time Buyer? ($Y/N$)
* Total Rules = $2^3 = 8$ Rules.

| Quadrant / Element | Rule 1 | Rule 2 | Rule 3 | Rule 4 | Rule 5 | Rule 6 | Rule 7 | Rule 8 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **$C_1$: Student?** | Y | Y | Y | Y | N | N | N | N |
| **$C_2$: Amount $> \$100$?** | Y | Y | N | N | Y | Y | N | N |
| **$C_3$: First Buyer?** | Y | N | Y | N | Y | N | Y | N |
| **$A_1$: Apply 25% Discount** | **X** | - | - | - | - | - | - | - |
| **$A_2$: Apply 15% Discount** | - | **X** | **X** | - | **X** | - | - | - |
| **$A_3$: Apply 10% Discount** | - | - | - | **X** | - | **X** | **X** | - |
| **$A_4$: Standard Price (0%)**| - | - | - | - | - | - | - | **X** |

---

## 3.5 Formal Requirements Specification

### Why Formal Specifications?
Natural language is inherently ambiguous, incomplete, and subjective. Formal specifications use **mathematical notations** (logic, set theory, algebra) to define software behavior with unambiguous precision, enabling automated verification and mathematical proof of correctness.

```
       INFORMAL SPECIFICATION                   FORMAL SPECIFICATION
   ┌─────────────────────────────┐           ┌─────────────────────────────────┐
   │ • Natural Language (English)│           │ • Mathematical Logic & Algebra  │
   │ • Ambiguous & Subjective    │    VS     │ • Unambiguous & Provable        │
   │ • Cannot be Auto-Verified   │           │ • Machine Checkable Semantics   │
   │ • Prone to Misinterpretation│           │ • Zero Semantic Ambiguity       │
   └─────────────────────────────┘           └─────────────────────────────────┘
```

---

## 3.6 Axiomatic Specification (Hoare Triples)

Pioneered by **C. A. R. Hoare (1969)**, axiomatic specification describes program behavior by specifying preconditions and postconditions as first-order predicate logic formulas:

$$\{P\} \; S \; \{Q\}$$

Where:
* $\{P\}$ is the **Precondition**: An assertion about program variables that must hold true *immediately before* statement or routine $S$ executes.
* $S$ is the **Program Statement / Routine**.
* $\{Q\}$ is the **Postcondition**: An assertion guaranteed to hold true *immediately after* execution of $S$, provided $P$ held beforehand.

### Axiomatic Examples

#### 1. Integer Square Root Function
* **Routine:** `int_sqrt(int n)`
* **Precondition $\{P\}$:** $\{n \ge 0\}$
* **Postcondition $\{Q\}$:** $\{r \ge 0 \land r^2 \le n \land (r + 1)^2 > n\}$

#### 2. Swap Two Variables
* **Routine:** `swap(x, y)`
* **Precondition $\{P\}$:** $\{x = X_0 \land y = Y_0\}$
* **Postcondition $\{Q\}$:** $\{x = Y_0 \land y = X_0\}$

---

## 3.7 Algebraic Specification of Abstract Data Types (ADTs)

Algebraic specification defines an Abstract Data Type (ADT) by specifying the signatures of its operations and a set of **algebraic equations (axioms)** that define how operations interact.

### Categorization of Operations in an ADT
1. **Constructors / Creators:** Operations that build a new instance of the data type from scratch (e.g., `newStack()`).
2. **Transformers / Mutators:** Operations that take an existing instance and produce a modified instance (e.g., `push(s, x)`, `enqueue(q, x)`).
3. **Observers / Inspectors:** Operations that query the instance and return values of other types (e.g., `top(s)`, `isEmpty(s)`, `size(s)`).

### Complete Formal Specification of a Stack ADT

#### 1. Signature ($\Sigma$) Specification:
* $\text{newStack} : \emptyset \rightarrow \text{Stack}$ (Constructor)
* $\text{push} : \text{Stack} \times \text{Elem} \rightarrow \text{Stack}$ (Transformer)
* $\text{pop} : \text{Stack} \rightarrow \text{Stack} \cup \{\text{error}\}$ (Transformer)
* $\text{top} : \text{Stack} \rightarrow \text{Elem} \cup \{\text{error}\}$ (Observer)
* $\text{isEmpty} : \text{Stack} \rightarrow \text{Boolean}$ (Observer)

#### 2. Axioms (Rewrite Equations):
1. $\text{isEmpty}(\text{newStack}()) = \text{true}$
2. $\text{isEmpty}(\text{push}(s, x)) = \text{false}$
3. $\text{top}(\text{newStack}()) = \text{error}$
4. $\text{top}(\text{push}(s, x)) = x$
5. $\text{pop}(\text{newStack}()) = \text{error}$
6. $\text{pop}(\text{push}(s, x)) = s$

### General Algebraic Equation Formula
For an ADT with $m_1$ constructors, $m_2$ transformers, $n_1$ observers, and $n_2$ error checks, the number of defining equations is given by:

$$\text{Equations} = m_1(m_2 + n_1) + n_2$$

---

## 3.8 Exam Essentials & Revision Summary

* **System Analyst:** Connects non-technical clients to technical developers; gathers, analyzes, and formalizes requirements.
* **IEEE 830 Quality Metrics:** Correct, Unambiguous, Complete, Consistent, Ranked, Verifiable, Modifiable, Traceable.
* **Decision Tables:** 4 Quadrants (Condition Stub, Condition Entry, Action Stub, Action Entry). $n$ conditions yield $2^n$ rules.
* **Hoare Triples:** $\{P\} S \{Q\}$ defines Precondition $\{P\}$, Program $S$, and Postcondition $\{Q\}$.
* **Algebraic Specifications:** Defines ADTs via Signatures and Axiom Equations without exposing internal representation.
"""

# -------------------------------------------------------------
# MODULE 4: SOFTWARE DESIGN & MODULARITY (COHESION & COUPLING)
# -------------------------------------------------------------
mod4_content = """# Module 4: Software Design & Modularity Principles

![Module 4: The 7 Levels of Cohesion & 6 Levels of Coupling Spectrum](/images/cohesion_coupling_diagram.jpg)

---

## 4.1 Software Design: Bridging Problem to Solution Space

Software Design is the engineering process of transforming the **Problem Space** (documented in the SRS as "WHAT" the system must do) into the **Solution Space** (detailed architectural blueprints defining "HOW" the system will execute).

```
 ┌───────────────────────────┐                    ┌───────────────────────────┐
 │       PROBLEM SPACE       │                    │      SOLUTION SPACE       │
 │   • User Requirements     │   Transform Via    │   • Architectural Modules │
 │   • IEEE 830 SRS Document │ ─────────────────► │   • Algorithms & Logic    │
 │   • What the system does  │   Software Design  │   • Database Schemas      │
 └───────────────────────────┘                    └───────────────────────────┘
```

### Two Stages of Software Design
1. **Architectural / High-Level Design (HLD):**
   * Decomposes the system into a hierarchy of independent modules.
   * Defines data flows and control relationships between modules.
   * Produces Structure Charts and Module Interface Specifications.
2. **Detailed / Low-Level Design (LLD):**
   * Specifies data structures and algorithms for each individual module.
   * Produces pseudo-code / PDL (Program Design Language) ready for coding.

---

## 4.2 Modularity and Information Hiding

A software module is an independently named and addressable collection of code statements (e.g., function, class, package) characterized by:
* **Interface:** What the module presents to the outside world.
* **Implementation:** The private internal algorithms and data structures.

> **Parnas's Principle of Information Hiding (1972):**
> *"Every module should be designed to hide a secret (an implementation detail or design decision) behind a stable, abstract interface."*

---

## 4.3 Cohesion: The Internal Binding Metric

**Cohesion** measures the **strength of functional relatedness** among the internal elements (statements, subroutines, data structures) within a single module.

$$\text{Design Goal: MAXIMIZE Cohesion (Aim for Functional Cohesion)}$$

```
  WORST COHESION (Avoid)                                           BEST COHESION (Target)
 ┌──────────────┬──────────┬──────────┬────────────┬───────────────┬────────────┬────────────┐
 │ Coincidental │ Logical  │ Temporal │ Procedural │ Communicational│ Sequential │ Functional │
 └──────────────┴──────────┴──────────┴────────────┴───────────────┴────────────┴────────────┘
       1             2          3           4              5             6            7
```

### The 7 Levels of Cohesion (Strict Ordering from Worst to Best)

#### 1. Coincidental Cohesion (Level 1 - Worst)
* **Definition:** Elements are grouped into a module purely by coincidence, with zero meaningful relationship.
* **Example:** A `UtilityMisc` file containing `calculateTax()`, `formatDate()`, `printReverseString()`, and `connectBluetooth()`.
* **Drawback:** Impossible to understand, test, or reuse without pulling in unrelated code.

#### 2. Logical Cohesion (Level 2)
* **Definition:** Module performs a set of logically related activities, selected by a control flag passed as a parameter.
* **Example:** A function `processInput(int flag, void* data)` that parses mouse clicks if `flag=1`, keyboard keystrokes if `flag=2`, and voice audio if `flag=3`.
* **Drawback:** Code becomes a tangled `switch-case` block; modifying one operation risks breaking others.

#### 3. Temporal Cohesion (Level 3)
* **Definition:** Operations are grouped together simply because they must execute at roughly the same point in time.
* **Example:** A `startupInitialization()` module that initializes hardware drivers, opens database pools, resets error logs, and displays splash screens.
* **Drawback:** Functions have low logical coherence; testing individual components requires executing all startup steps.

#### 4. Procedural Cohesion (Level 4)
* **Definition:** Operations are grouped because they must execute in a specific sequential algorithm, but do not operate on the same data.
* **Example:** A routine `executePayrollStep()` that: 1) checks employee swipe cards, 2) updates building security logs, 3) prints building evacuation list.
* **Drawback:** High coupling between dissimilar business domains.

#### 5. Communicational Cohesion (Level 5)
* **Definition:** Operations perform different functions, but all operate upon the exact same input dataset or produce the exact same output dataset.
* **Example:** A module `manageStudentRecord()` containing `calculateGPA(student)`, `printReportCard(student)`, and `checkGraduationEligibility(student)`.
* **Drawback:** Changes to GPA calculation might inadvertently affect report printing if state is shared.

#### 6. Sequential Cohesion (Level 6)
* **Definition:** Elements are arranged such that the output data of one operation serves as the direct input data to the next operation (assembly line / pipe-and-filter).
* **Example:** A module `processTransactionData()` that: 1) reads raw bank string, 2) parses into account struct, 3) validates cryptographic hash, 4) formats output JSON.
* **Drawback:** Better than procedural, but still couples multiple operations into a single file.

#### 7. Functional Cohesion (Level 7 - Best / Ideal)
* **Definition:** Every statement within the module contributes directly to executing **one and only one well-defined mathematical or logical function**.
* **Example:** `calculateSine(double radians)`, `computeCosineSimilarity(vecA, vecB)`, `encryptAES256(byte[] data, Key k)`.
* **Advantages:** Maximum reusability, trivial isolated unit testing, minimal cognitive load.

---

## 4.4 Coupling: The Inter-Module Dependency Metric

**Coupling** measures the **degree of interdependence and interconnection** between two distinct modules.

$$\text{Design Goal: MINIMIZE Coupling (Aim for Data Coupling or No Coupling)}$$

```
  WORST COUPLING (Avoid)                                           BEST COUPLING (Target)
 ┌──────────────┬──────────┬──────────┬────────────┬───────────────┬────────────┐
 │   Content    │  Common  │ Control  │   Stamp    │     Data      │ No Coupling│
 └──────────────┴──────────┴──────────┴────────────┴───────────────┴────────────┘
       1             2          3           4              5             6
```

### The 6 Levels of Coupling (Strict Ordering from Worst/Tightest to Best/Loosest)

#### 1. Content Coupling (Level 1 - Worst)
* **Definition:** One module directly accesses, modifies, or branches into the internal code, branch labels, or private memory of another module.
* **Example:** Module A using assembly pointer arithmetic or `goto` to jump directly into the middle of Module B's loop.
* **Risk:** Any minor internal change in Module B immediately crashes Module A.

#### 2. Common Coupling (Level 2)
* **Definition:** Multiple modules share read/write access to a global variable pool, shared memory block, or global database table.
* **Example:** 15 distinct modules modifying a global struct `global_system_state` without locks or access control.
* **Risk:** Uncontrolled race conditions, debugging nightmare (impossible to determine who corrupted global data).

#### 3. Control Coupling (Level 3)
* **Definition:** One module passes a control flag or token to another module to explicitly dictate its internal control flow logic.
* **Example:** `calculateBonus(employee, int isManagerFlag)`.
* **Risk:** The calling module must know the internal implementation details and branch conditions of the called module.

#### 4. Stamp / Data Structure Coupling (Level 4)
* **Definition:** Modules communicate by passing a large, composite data structure (e.g., full record or object) where the called routine only needs a few individual fields.
* **Example:** Passing the entire 50-field `EmployeeRecord` to a function `printBadge(Employee e)` that only needs `e.firstName`.
* **Risk:** If an unrelated field in `EmployeeRecord` changes, `printBadge` must be recompiled and re-tested.

#### 5. Data Coupling (Level 5 - Best Practical)
* **Definition:** Modules communicate strictly by passing primitive scalar parameters (e.g., `int`, `float`, `string`) where every parameter is strictly used.
* **Example:** `computeTax(double salary, float taxRate)`.
* **Advantages:** Modules are completely decoupled from internal data formats; maximum testability.

#### 6. No Coupling / Independent (Level 6 - Ideal)
* **Definition:** Modules have zero communication or shared state; execute completely independently.

---

## 4.5 Structured Analysis / Structured Design (SA/SD) & Structure Charts

The **SA/SD** methodology converts Data Flow Diagrams (DFDs) produced during requirements analysis into hierarchical **Structure Charts** for implementation.

```
                         STRUCTURE CHART HIERARCHY
                       ┌───────────────────────────┐
                       │       Root Module         │
                       │     (System Controller)   │
                       └─────────────┬─────────────┘
                                     │
                 ┌───────────────────┴───────────────────┐
                 ▼                                       ▼
       ┌───────────────────┐                   ┌───────────────────┐
       │   Input Module    │                   │ Transform Module  │
       │ (Get Valid Input) │                   │ (Process Logic)   │
       └─────────┬─────────┘                   └─────────┬─────────┘
                 │                                       │
          ┌──────┴──────┐                         ┌──────┴──────┐
          ▼             ▼                         ▼             ▼
     ┌─────────┐   ┌─────────┐               ┌─────────┐   ┌─────────┐
     │ Read Raw│   │ Validate│               │ Compute │   │ Format  │
     └─────────┘   └─────────┘               └─────────┘   └─────────┘
```

### Structure Chart Notations
* **Rectangles:** Represent modules/subroutines.
* **Directed Arrows:** Represent module invocation (calling relationship).
* **Open Circle Arrow ($\circ\rightarrow$):** Data Couple (passing pure data values).
* **Filled Circle Arrow ($\bullet\rightarrow$):** Control Couple (passing flags/status signals).

### Structure Chart vs Flowchart
| Feature | Structure Chart | Flowchart |
| :--- | :--- | :--- |
| **Primary Purpose** | Shows module hierarchy and inter-module calling structure | Shows operational step-by-step sequence of instructions |
| **Temporal Sequence**| Does NOT indicate execution order over time | Explicitly shows time flow and control jumps |
| **Data Communication**| Explicitly shows data tokens ($\circ$) and control tokens ($\bullet$) | Shows data modification inside steps |

### Key Design Heuristics
* **Fan-In:** The number of calling modules that invoke a specific module. **High Fan-In is highly desirable** as it indicates good code reuse.
* **Fan-Out:** The number of sub-modules directly invoked by a module. Ideal range is **$5 \pm 2$** (3 to 7). Very high fan-out indicates lack of intermediate factoring.

---

## 4.6 Transform Analysis vs Transaction Analysis

```
       TRANSFORM ANALYSIS                        TRANSACTION ANALYSIS
   (Linear Data Flow Stream)                    (Parallel Action Branches)
 ┌────────┐  ┌────────┐  ┌────────┐                     ┌─────────┐
 │ Input  ├──►│Compute ├──►│ Output │               ┌────►│ Action A│
 └────────┘  └────────┘  └────────┘          ┌──────┴─┐ ├────►│ Action B│
      │           │           │              │Dispatch├─┼────►│ Action C│
      ▼           ▼           ▼              └────────┘ ├────►│ Action D│
  Afferent     Central     Efferent                     └────►│ Action E│
   Stream     Transform     Stream
```

1. **Transform Analysis:** Applied when data flows into the system, undergoes a sequential transformation at a central processing hub, and flows out.
   * *Afferent Branch:* Reads and validates input stream.
   * *Central Transform:* Performs core algorithmic processing.
   * *Efferent Branch:* Formats and delivers output stream.
2. **Transaction Analysis:** Applied when a single input token (transaction) triggers one of many completely distinct, parallel processing paths based on transaction type.
   * Features a central **Transaction Center / Dispatcher** module.

---

## 4.7 Exam Essentials & Revision Summary

* **Cohesion Ladder (Worst to Best):** Coincidental $\rightarrow$ Logical $\rightarrow$ Temporal $\rightarrow$ Procedural $\rightarrow$ Communicational $\rightarrow$ Sequential $\rightarrow$ **Functional**.
* **Coupling Ladder (Worst to Best):** Content $\rightarrow$ Common $\rightarrow$ Control $\rightarrow$ Stamp $\rightarrow$ **Data** $\rightarrow$ No Coupling.
* **Golden Rule of Software Design:** **High Cohesion + Low Coupling**.
* **Structure Charts:** Hierarchical calling tree; uses open circles for data couples and solid circles for control couples.
* **Fan-In / Fan-Out:** Aim for **High Fan-In** (maximum reuse) and **Balanced Fan-Out** ($5 \pm 2$).
"""

# -------------------------------------------------------------
# MODULE 5: DATA FLOW DIAGRAMS (DFD) — THEORY & RULES
# -------------------------------------------------------------
mod5_content = """# Module 5: Data Flow Diagrams (DFD) — Theory, Rules & Data Dictionary

![Module 5: DFD Symbols, Balancing Rules & Data Dictionary Grammar](/images/dfd_symbols_and_rules.jpg)

---

## 5.1 The Core Philosophy of Data Flow Diagrams

A **Data Flow Diagram (DFD)** is a structured graphical modeling tool that represents how data moves, transforms, and is stored throughout a software system.

### Why DFDs are Essential
* **Data-Centric Viewpoint:** DFDs focus entirely on the flow and transformation of data rather than control flow, iteration, or machine states.
* **Procedural Agnostic:** A DFD does **NOT** contain loops, `if-else` branches, or sequential ordering.
* **Customer Comprehensibility:** DFDs are intuitive enough for non-technical stakeholders to review and validate during requirements engineering.

---

## 5.2 The 4 Standard DFD Symbols (Yourdon & DeMarco vs Gane & Sarson)

```
 ┌───────────────────────────┬────────────────────────────────────────────────────────┐
 │ 1. PROCESS (Bubble)       │ Transforms incoming data into outgoing data.           │
 │    Yourdon: Circle (○)    │ Named with an active [Verb + Noun Phrase]              │
 │    Gane-Sarson: Round-Rect│ (e.g., "Calculate Tax", "Validate Password").          │
 ├───────────────────────────┼────────────────────────────────────────────────────────┤
 │ 2. EXTERNAL ENTITY        │ External source or sink of data outside system bounds  │
 │    Rectangle (▭)          │ Named with a [Noun] (e.g., "Student", "Bank Server").  │
 ├───────────────────────────┼────────────────────────────────────────────────────────┤
 │ 3. DATA STORE             │ Persistent repository of data at rest.                 │
 │    Parallel Lines (═)     │ Named with a plural [Noun Phrase] (e.g., "Books_DB").  │
 ├───────────────────────────┼────────────────────────────────────────────────────────┤
 │ 4. DATA FLOW              │ Directed arrow showing data packets in motion.         │
 │    Directed Arrow (──►)   │ Labeled with a descriptive [Noun] (e.g., "Bill_Data"). │
 └───────────────────────────┴────────────────────────────────────────────────────────┘
```

---

## 5.3 Strict DFD Semantic Rules & Illegal Patterns

```
                 ILLEGAL PATTERNS (AVOID)
 ┌───────────────────────────┬───────────────────────────┬───────────────────────────┐
 │ 1. BLACK HOLE             │ 2. MIRACLE (White Hole)   │ 3. DIRECT DATA STORE LINK │
 │    Input with no output   │    Output with no input   │    Store-to-Store link    │
 │       ┌───────┐           │       ┌───────┐           │    ┌─────┐     ┌─────┐    │
 │  ───► │Process│           │       │Process│ ───►      │    │Store│ ──► │Store│    │
 │       └───────┘           │       └───────┘           │    └─────┘     └─────┘    │
 └───────────────────────────┴───────────────────────────┴───────────────────────────┘
```

### The 5 Golden Rules of DFD Construction
1. **Rule 1: All Data Flows Must Connect to a Process:**
   * An External Entity **CANNOT** connect directly to another External Entity.
   * An External Entity **CANNOT** connect directly to a Data Store.
   * A Data Store **CANNOT** connect directly to another Data Store.
   * *Data can only move to/from entities and stores through an active Process bubble!*
2. **Rule 2: No Black Holes:** A process must not have only inputs with zero outgoing data flows.
3. **Rule 3: No Miracles / White Holes:** A process must not generate outputs spontaneously without corresponding input data flows.
4. **Rule 4: No Grey Holes:** The outputs of a process must be logically derivable from its inputs.
5. **Rule 5: No Control Signals:** Data flow arrows must carry real data packets, never control instructions or triggers (e.g., "Start Process" is illegal).

---

## 5.4 Hierarchical Decomposition (Top-Down Layering)

To keep complex systems manageable, DFDs are organized hierarchically:

```
                            LEVEL 0 (Context Diagram)
                            ┌───────────────────────┐
                            │ Single System Bubble  │
                            └───────────┬───────────┘
                                        │
                                        ▼ (Decompose into 3-7 Bubbles)
                            LEVEL 1 (Subsystem Overview)
                     ┌──────────────────┴──────────────────┐
                     ▼                                     ▼
           ┌───────────────────┐                 ┌───────────────────┐
           │ Process 1: Search │                 │ Process 2: Checkout│
           └─────────┬─────────┘                 └─────────┬─────────┘
                     │                                     │
                     ▼ (Decompose Complex Bubble)          ▼
           LEVEL 2 (Sub-processes: 1.1, 1.2)     LEVEL 2 (2.1, 2.2, 2.3)
```

### Level 0: The Context Diagram
* The highest conceptual view of the entire software product.
* Contains **exactly ONE process bubble** (numbered 0) representing the whole system.
* Displays all External Entities interacting with the system and primary input/output flows.
* **NEVER displays internal data stores** (unless the store is completely external to the system).

### Level 1: Subsystem Functional Decomposition
* The single Level 0 bubble is exploded into **3 to 7 primary functional bubbles** (numbered 1.0, 2.0, 3.0, etc.).
* Displays internal Data Stores where persistent data is written and read.
* Displays inter-process data communication.

### Level 2: Sub-Bubble Decomposition
* Complex Level 1 bubbles are further exploded into sub-processes (e.g., Process 2.0 explodes into 2.1, 2.2, 2.3).
* Continues until each bubble represents a single cohesive function (Functional Primitive).

---

## 5.5 The Fundamental Balancing Rule

> **The DFD Balancing Rule:**
> *All input data flows entering a parent process bubble and all output data flows leaving that parent bubble MUST appear with exact semantic equivalence in the decomposed child DFD.*

```
       PARENT (Level 0)                           CHILD (Level 1 Decomposed)
       Input A ──► ( 0 ) ──► Output X              Input A ──► ( 1.0 ) ──► Data_Mid
                                                                   │
                                                                   ▼
                                                                ( 2.0 ) ──► Output X
```
* If Input $A$ enters Bubble 0, it must enter the Level 1 diagram.
* If Output $X$ leaves Bubble 0, it must leave the Level 1 diagram.

---

## 5.6 The Data Dictionary: Grammar & Notations

A DFD is incomplete without a **Data Dictionary** (DD). The Data Dictionary is the centralized repository providing precise, unambiguous mathematical definitions for every data flow and data store in the system.

### Extended Backus-Naur Form (EBNF) Notations in DD

| Symbol | Mathematical Meaning | Example Usage | English Interpretation |
| :---: | :--- | :--- | :--- |
| `=` | **Is Composed Of** / Defined As | `Address = Street + City + Zip` | Address consists of street, city, and zip. |
| `+` | **Sequence / AND** | `Name = First_Name + Last_Name` | Name consists of first name followed by last name. |
| `[ \| ]` | **Selection / OR** | `Payment = [ Cash \| Credit_Card \| UPI ]`| Payment is exactly one of Cash, Credit Card, or UPI. |
| `{ }` | **Iteration / Repetition** ($0 \dots \infty$) | `Order = { Item_Record }` | Order contains 0 or more Item Records. |
| `m{ }n`| **Bounded Iteration** ($m \dots n$) | `Pin_Number = 4{ Digit }6` | PIN consists of 4 to 6 digits. |
| `( )` | **Optional Element** ($0 \text{ or } 1$) | `Customer_Profile = Name + ( Middle_Name ) + Phone` | Middle Name is optional. |
| `* *` | **Comment / Annotation** | `* Validated against ISO standards *` | Explanatory note. |

---

## 5.7 Step-by-Step Methodology: The Trading House / RMS Tutorial

Let us walk through the classic university case study: **The Trading House System**.

### Problem Specification:
* A Trading House receives purchase orders from customers.
* The system checks if the customer has an existing account and sufficient credit.
* The system checks warehouse inventory:
  * If items are in stock, an invoice is generated, inventory is decremented, and goods are dispatched.
  * If out of stock, a backorder notice is sent to the customer and a purchase request is sent to suppliers.
* Management receives weekly sales and inventory summary reports.

### Step 1: Identify External Entities
1. `Customer` (Source of orders, receiver of invoices & backorders).
2. `Warehouse / Supplier` (Receiver of purchase orders, source of stock updates).
3. `Management` (Receiver of sales reports).

### Step 2: Level 0 Context Diagram
```
                      ┌───────────────────────┐
                      │       Customer        │
                      └───────┬───────▲───────┘
          Customer_Order      │       │ Invoice / Backorder_Notice
                              ▼       │
                       ┌──────────────────────┐
                       │         0.0          │
                       │    Trading House     │
                       │    Order System      │
                       └──────┬───────▲───────┘
       Supplier_Order /       │       │ Stock_Delivery /
       Restock_Request        ▼       │ Inventory_Data
                      ┌───────────────┴───────┐
                      │  Warehouse / Supplier │
                      └───────────────────────┘
```

### Step 3: Level 1 Functional Decomposition
Explode Bubble 0.0 into 4 primary processes:
1. `1.0 Validate Customer & Credit`
2. `2.0 Check Inventory & Stock`
3. `3.0 Generate Invoice & Dispatch`
4. `4.0 Manage Backorders & Supplier Orders`

#### Data Stores:
* `D1: Customers_DB`
* `D2: Inventory_DB`
* `D3: Orders_DB`

```
 ┌────────┐ Customer_Order ┌─────────┐ Valid_Order ┌─────────┐ In_Stock_Order ┌─────────┐
 │Customer├───────────────►│ 1.0     ├────────────►│ 2.0     ├───────────────►│ 3.0     ├──► Invoice
 └────────┘                │Validate │             │Check    │                │Dispatch │    to Customer
       ▲                   └────┬────┘             └───┬─────┘                └────┬────┘
       │                        │                      │ Out_of_Stock              │
       │                   ┌────┴────┐                 ▼                           │
       │                   │   D1    │             ┌─────────┐                     │
       │                   │Customers│             │ 4.0     │                     │
       │                   └─────────┘             │Backorder│                     │
       │                                           └────┬────┘                     │
       │ Backorder_Notice                               │                          │
       └────────────────────────────────────────────────┘                          ▼
                                                                              ┌─────────┐
                                                                              │   D2    │
                                                                              │Inventory│
                                                                              └─────────┘
```

### Step 4: Data Dictionary Definitions
```
Customer_Order   = Customer_ID + { Item_ID + Quantity } + Shipping_Address + Payment_Method
Valid_Order      = Customer_ID + Customer_Name + { Item_ID + Quantity + Unit_Price } + Credit_Approved
Invoice          = Invoice_Number + Customer_ID + { Item_ID + Quantity + Amount } + Total_Amount + Tax + Date
Backorder_Notice = Customer_ID + Order_ID + { Item_ID + Out_Of_Stock_Qty } + Expected_Delivery_Date
Inventory_Record = Item_ID + Item_Name + Current_Stock + Reorder_Threshold + Unit_Cost
```

---

## 5.8 Exam Essentials & Revision Summary

* **4 DFD Symbols:** Process (Bubble), External Entity (Rectangle), Data Store (Open Parallel Lines), Data Flow (Directed Arrow).
* **Illegal Connections:** Entity $\leftrightarrow$ Entity, Entity $\leftrightarrow$ Store, Store $\leftrightarrow$ Store (Must always pass through a Process).
* **Illegal Process Defects:** Black Hole (no output), Miracle (no input), Grey Hole (output cannot be derived from inputs).
* **Balancing Rule:** Inputs and outputs of parent bubble must match inputs and outputs of child decomposition.
* **Data Dictionary Symbols:** `=` (definition), `+` (sequence), `[ | ]` (selection), `{ }` (iteration), `( )` (optional).
"""

# -------------------------------------------------------------
# MODULE 6: 10 SOLVED DFD PRACTICE PROBLEMS MASTERCLASS
# -------------------------------------------------------------
mod6_content = """# Module 6: DFD Practice Masterclass — 10 Solved Exam Problems

---

## Problem Solving Blueprint for DFDs in University Exams

When presented with an exam problem statement:
1. **Identify External Entities:** Find all external sources and sinks of data (e.g., Student, Admin, Bank, Sensor).
2. **Identify Primary Input & Output Data Flows:** Track what data enters and leaves the system.
3. **Construct Level 0 (Context Diagram):** Draw the single system bubble with external entities and flows.
4. **Identify Persistent Data Stores:** Determine database tables (e.g., `Books_DB`, `Users_DB`).
5. **Decompose into Level 1 Processes:** Break into 3 to 6 major functional bubbles.
6. **Apply the Balancing Check:** Verify that every input/output in Level 0 appears in Level 1.
7. **Write the Data Dictionary:** Define key data flows using EBNF notation (`=`, `+`, `[ | ]`, `{ }`).

---

## Problem 1: Library Management System (LMS)

### Problem Description:
A university library system allows members to search for books, borrow books, return books, and pay overdue fines. Librarians can add new book titles, update inventory records, and view borrowing statistics.

### Entities:
* `Member` (Student / Faculty)
* `Librarian`
* `Payment Gateway`

### Level 0 Context Diagram:
* **Inputs from Member:** `Book_Search_Query`, `Issue_Request`, `Return_Request`, `Fine_Payment`
* **Outputs to Member:** `Search_Results`, `Issue_Confirmation`, `Fine_Receipt`
* **Inputs from Librarian:** `New_Book_Details`, `Inventory_Update_Command`
* **Outputs to Librarian:** `Borrowing_Report`, `Overdue_Summary`

### Level 1 Functional Decomposition:
1. `1.0 Catalog Search & Query`
2. `2.0 Book Issue & Verification`
3. `3.0 Book Return & Fine Calculation`
4. `4.0 Library Catalog Maintenance`
5. `5.0 Report Generation`

### Data Stores:
* `D1: Books_Catalog`
* `D2: Member_Records`
* `D3: Transaction_Ledger`

### Data Dictionary:
```
Issue_Request        = Member_ID + Book_ISBN + Issue_Date
Issue_Confirmation   = Member_ID + Book_ISBN + Due_Date + Transaction_ID
Fine_Receipt         = Member_ID + Book_ISBN + Overdue_Days + Fine_Amount + Payment_Status
Book_Record          = Book_ISBN + Title + { Author } + Publisher + Total_Copies + Available_Copies
```

---

## Problem 2: Supermarket Point of Sale (POS) & Billing System

### Problem Description:
Cashiers scan barcodes of purchased items. The system retrieves unit prices, calculates subtotals, applies promotional discounts, computes sales tax, and generates printed receipts. The inventory database is automatically updated.

### Entities:
* `Cashier` / `Customer`
* `Store Manager`
* `Bank / Card Processor`

### Level 1 Decomposition:
1. `1.0 Scan Barcode & Lookup Item`
2. `2.0 Compute Bill, Discounts & Taxes`
3. `3.0 Process Payment (Cash / Card)`
4. `4.0 Update Inventory Stock`
5. `5.0 Generate Daily Sales Audit`

### Data Stores:
* `D1: Items_Catalog`
* `D2: Discounts_DB`
* `D3: Daily_Sales_Log`

---

## Problem 3: Hospital Patient Management System (HMS)

### Problem Description:
Patients register for appointments with doctors. Doctors record diagnoses and prescribe medications. The pharmacy dispenses medicine, and the billing desk issues comprehensive medical bills covering consultations, lab tests, and room charges.

### Entities:
* `Patient`
* `Doctor`
* `Pharmacist`
* `Billing Officer`

### Level 1 Decomposition:
1. `1.0 Patient Registration & Appointment Scheduling`
2. `2.0 Consultation & Prescription Recording`
3. `3.0 Pharmacy Dispensation & Inventory Update`
4. `4.0 Inpatient & Outpatient Billing`

### Data Stores:
* `D1: Patients_DB`
* `D2: Doctors_Schedule_DB`
* `D3: Prescriptions_DB`
* `D4: Pharmacy_Inventory`

---

## Problem 4: Enterprise Payroll Processing System

### Problem Description:
Monthly employee attendance data and timesheets are collected. The system calculates gross pay, computes mandatory deductions (Income Tax, Provident Fund, Health Insurance), generates salary pay slips, and creates bank direct-deposit transfer files.

### Entities:
* `Employee`
* `HR Officer`
* `Bank Server`
* `Tax Authority`

### Level 1 Decomposition:
1. `1.0 Attendance & Overtime Verification`
2. `2.0 Gross Salary Computation`
3. `3.0 Tax & Benefit Deductions Calculation`
4. `4.0 Pay Slip & Bank Transfer File Generation`

### Data Stores:
* `D1: Employees_DB`
* `D2: Attendance_Log`
* `D3: Tax_Rules_DB`
* `D4: Payroll_Ledger`

---

## Problem 5: Automated Teller Machine (ATM) Banking System

### Problem Description:
A customer inserts a debit card and enters a PIN. The ATM validates credentials with the central bank server, allows cash withdrawals, balance inquiries, and funds transfers, updates the account balance, and prints transaction receipts.

### Entities:
* `Bank Customer`
* `Central Banking Server`
* `Cash Dispenser Mechanism`

### Level 1 Decomposition:
1. `1.0 Card Verification & PIN Authentication`
2. `2.0 Account Balance Inquiry`
3. `3.0 Cash Withdrawal & Balance Update`
4. `4.0 Funds Transfer Processing`
5. `5.0 Dispenser Control & Receipt Printing`

### Data Stores:
* `D1: Local_ATM_Cash_Store`
* `D2: ATM_Audit_Log`

---

## Problem 6: University Online Student Admission System

### Problem Description:
Applicants submit online admission forms with academic grades and course preferences. The system validates eligibility, computes cutoff merit ranks, allocates seats based on merit and reservation quotas, and issues admission offer letters.

### Entities:
* `Applicant`
* `Admission Committee`
* `Department Registrar`

### Level 1 Decomposition:
1. `1.0 Application Intake & Document Verification`
2. `2.0 Merit Rank Calculation`
3. `3.0 Seat Allocation & Quota Matching`
4. `4.0 Fee Payment & Enrollment Confirmation`

### Data Stores:
* `D1: Applications_DB`
* `D2: Course_Seat_Matrix`
* `D3: Merit_List_DB`

---

## Problem 7: Airline Ticket Reservation System

### Problem Description:
Passengers search for flights by origin, destination, and date. The system checks seat availability across classes, reserves seats, processes payments, issues e-tickets with PNR numbers, and handles flight cancellations with refund deductions.

### Entities:
* `Passenger`
* `Airline Admin`
* `Payment Gateway`

### Level 1 Decomposition:
1. `1.0 Flight Search & Schedule Query`
2. `2.0 Seat Selection & Reservation`
3. `3.0 Ticket Fare & Payment Processing`
4. `4.0 Cancellation & Refund Processing`

### Data Stores:
* `D1: Flight_Schedules_DB`
* `D2: Seat_Inventory_DB`
* `D3: Bookings_PNR_DB`

---

## Problem 8: Multi-Floor Smart Elevator Control System

### Problem Description:
Passengers press floor request buttons inside elevator cabins and hall call buttons on various floors. The elevator controller evaluates cab load, floor requests, and movement direction, optimizes stopping sequences, and controls motor movement and door mechanisms.

### Entities:
* `Passenger (Hall & Cabin Buttons)`
* `Motor & Brake Actuator`
* `Door Sensor & Actuator`
* `Weight / Load Sensor`

### Level 1 Decomposition:
1. `1.0 Hall & Cabin Request Collector`
2. `2.0 Direction & Scheduling Optimizer`
3. `3.0 Motor Speed & Brake Controller`
4. `4.0 Door Safety & Obstacle Management`

### Data Stores:
* `D1: Pending_Requests_Queue`
* `D2: Elevator_Status_State`

---

## Problem 9: Automated Weather Monitoring Station

### Problem Description:
Automated IoT sensors record temperature, atmospheric pressure, relative humidity, wind speed, and precipitation at regular intervals. The station validates sensor telemetry, detects extreme storm conditions, archives climate data, and broadcasts weather bulletins.

### Entities:
* `IoT Sensor Array`
* `Meteorologist`
* `Public Alert Broadcast System`

### Level 1 Decomposition:
1. `1.0 Sensor Data Sampling & Calibration`
2. `2.0 Anomaly & Severe Weather Detection`
3. `3.0 Historical Climate Archival`
4. `4.0 Weather Bulletin & Alert Generation`

### Data Stores:
* `D1: Raw_Telemetry_DB`
* `D2: Historical_Weather_Archive`
* `D3: Alert_Thresholds_DB`

---

## Problem 10: Warehouse Inventory & Supply Chain Management

### Problem Description:
A central warehouse tracks product stock levels. When stock falls below reorder thresholds, automated purchase requisitions are sent to vendors. Received shipments are inspected, logged, and stocked. Dispatches to retail outlets are tracked with delivery notes.

### Entities:
* `Store Manager`
* `Vendor / Supplier`
* `Retail Outlet Dispatcher`

### Level 1 Decomposition:
1. `1.0 Stock Intake & Inspection Logging`
2. `2.0 Real-Time Stock Tracking & Threshold Alerting`
3. `3.0 Automated Purchase Requisition Generation`
4. `4.0 Outlet Dispatch & Waybill Generation`

### Data Stores:
* `D1: Warehouse_Stock_DB`
* `D2: Vendors_Catalog_DB`
* `D3: Purchase_Orders_DB`
* `D4: Dispatch_Log_DB`

---

## 6.11 Exam Checklist for DFD Practice
When drawing any DFD in an exam:
* [x] Did you number processes consistently (Level 0: `0.0`, Level 1: `1.0, 2.0`, Level 2: `1.1, 1.2`)?
* [x] Are all process names formatted as **[Verb + Noun Phrase]**?
* [x] Are external entities labeled as nouns?
* [x] Are data stores labeled as plural nouns with parallel open lines?
* [x] Have you verified the **Balancing Rule** between Level 0 and Level 1?
* [x] Have you eliminated all **Black Holes**, **Miracles**, and **Direct Entity-Store connections**?
"""

# Write all 6 notes files
files = {
    "module_01_intro_and_structured_programming.md": mod1_content,
    "module_02_life_cycle_models.md": mod2_content,
    "module_03_requirements_and_formal_specifications.md": mod3_content,
    "module_04_software_design_cohesion_coupling.md": mod4_content,
    "module_05_dfd_theory_and_rules.md": mod5_content,
    "module_06_dfd_practice_problems_10_solved.md": mod6_content,
}

for filename, content in files.items():
    filepath = os.path.join("notes_md", filename)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\\n")
    print(f"Wrote {filepath} ({len(content.encode('utf-8'))} bytes)")

print("Successfully generated all deep notes!")
