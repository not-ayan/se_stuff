import os

def write_deep_notes():
    print("Writing deep, exhaustive, pedagogical markdown notes for all 6 chapters...")
    os.makedirs("notes_md", exist_ok=True)
    os.makedirs("content", exist_ok=True)

    # -------------------------------------------------------------
    # MODULE 1
    # -------------------------------------------------------------
    mod1_content = """# Module 1: Introduction to Software Engineering & Structured Programming
*Authors & References: Dr. Rajib Mall (IIT Kharagpur) & Prof. Swarup Roy*

---

## 1. Scope, Necessity & Foundational Concepts

### 1.1 What is Software Engineering?
Software engineering is an **engineering discipline** that applies systematic, disciplined, and quantifiable approaches to the development, operation, and maintenance of software. Alternatively, it can be defined as:
> **Formal Definition:** A systematic collection of past software engineering experience arranged in the form of methodologies, principles, processes, and guidelines.

While a small "toy" script can be written using intuition and informal ad-hoc programming, developing large commercial software products requires rigorous software engineering principles to guarantee **high reliability**, **timely delivery**, **cost-effectiveness**, and **long-term maintainability**.

### 1.2 The Building Construction Analogy
The difference between small programming and industrial software development is best understood through the civil engineering analogy:
* **Building a Small Garden Wall**: A person can construct a small brick wall in their backyard using common sense, bricks, and mortar. The builder does not need knowledge of soil mechanics, structural load analysis, or formal blueprints. If a brick is misaligned, it can be patched quickly.
* **Building a 60-Story Skyscraper**: Using intuition to construct a multistoried skyscraper leads to catastrophic collapse. Constructing a skyscraper requires:
  1. Deep structural mechanics & strength of materials calculations.
  2. Architectural blueprints and electrical/plumbing specifications.
  3. Geological soil testing and foundation engineering.
  4. Project planning, budgeting, scheduling, and safety compliance codes.
  5. Multi-tier inspection and quality assurance.
* **The Software Parallel**: Writing a 50-line utility script is like building a small brick wall—common sense suffices. Constructing an industrial system with hundreds of thousands or millions of Lines of Code ($LOC$) is like building a skyscraper. Without architectural design, modular decomposition, formal specifications, and quality verification, the software collapses into unmaintainable bugs, schedule delays, and massive financial loss.

---

## 2. Exponential Complexity Growth with Program Size

### 2.1 The Problem of Scale
Program complexity and human comprehension effort do **not** grow linearly with program size ($LOC$); they grow **exponentially**.
* A program of $1,000$ $LOC$ has moderate complexity.
* A program of $10,000$ $LOC$ is not just $10$ times harder—it is often **$100$ to $1,000$ times more difficult** to understand, test, and debug without modular software engineering.

```
Complexity & Effort
       ^
       |                                .--- (Exponential Curve: Effort ∝ Size^k, k > 1)
       |                             .-'
       |                          .-'
       |                       .-'
       |                   _.-'
       |             _..--'
       |       _..--'
       +---------------------------------------------> Size in LOC
```

### 2.2 Mathematical Basis of Complexity Explosion
In an unstructured monolithic program of $N$ statements or variables, the number of potential interactions between components follows the combinatorial pairwise relationship:
$$\text{Potential Interactions} = \frac{N(N - 1)}{2} \approx O(N^2)$$
As $N$ grows from $100$ to $10,000$, potential interactions jump from $\approx 4,950$ to $\approx 49,995,000$. This causes immediate cognitive overload for human engineers.

### 2.3 Two Fundamental Problem-Solving Techniques
Software engineering tackles exponential complexity using two primary psychological and technical mechanisms:

#### 1. Abstraction
* **Definition**: Simplifying a problem by omitting irrelevant low-level details and focusing exclusively on aspects relevant to the current objective.
* **Mechanism**: Human working memory can hold approximately $7 \pm 2$ chunks of information simultaneously (Miller's Law). Abstraction encapsulates lower-level mechanics into higher-level conceptual modules.
* **Hierarchy of Abstraction**:
  ```
  [ Highest Level: Business Requirements & User Goals ]
                          |
                          v
  [ Architectural Level: Subsystem Interaction & Data Flow ]
                          |
                          v
  [ Module Level: Function Signatures, Cohesion & Coupling ]
                          |
                          v
  [ Lowest Level: Line-by-Line Code, Pointers, Memory Buffers ]
  ```

#### 2. Decomposition
* **Definition**: Dividing a large, complex problem into several smaller, intellectually manageable sub-problems that can be solved and verified independently.
* **The Critical Golden Rule of Decomposition**:
  > Any random partitioning does **not** reduce complexity. A successful decomposition must **minimize interactions (coupling)** between components while ensuring each component performs a single cohesive task (**high cohesion**). If modules share numerous global variables or inter-dependent control flows, complexity remains unchanged or even increases.

---

## 3. The Software Crisis & Historical Evolution

### 3.1 What was the Software Crisis?
In the late 1960s, computing hardware became dramatically cheaper and exponentially more powerful (Moore's Law). However, software development techniques remained primitive and artisanal. Software development organizations found themselves completely unable to deliver products within budget, on time, and with acceptable reliability—a historical milestone termed the **Software Crisis** (officially recognized at the 1968 NATO Science Committee Conference in Garmisch, Germany).

```
Cost Trend Over Decades
      ^
 100% | \                                      .--- Software Cost (> 85% of total budget)
      |  \                                 _.-'
      |   \                            _.-'
      |    \                       _.-'
      |     \                 _.-'
      |      \            _.-'
   0% |       '-------'------------------------------> Hardware Cost (< 15% of total budget)
     1960    1970    1980    1990    2000    Present
```

### 3.2 Five Major Symptoms of the Software Crisis
1. **Escalating Costs**: Software development and maintenance started consuming up to $85-90\%$ of total IT budgets.
2. **Chronic Schedule Slippage & Budget Overruns**: Projects were consistently delivered months or years late, or cancelled entirely.
3. **Low Reliability & Catastrophic Crashes**: Systems frequently failed in production under operational load.
4. **Failure to Meet User Requirements**: Delivered software often failed to solve what the client actually required due to poor requirements elicitation.
5. **Software Maintenance Nightmare**: Modifying or debugging delivered code was nearly impossible because of unstructured "spaghetti code".

### 3.3 The Root Causes
* Exponential increase in problem size and user expectations.
* Lack of formal training in structured software engineering.
* Severe shortage of skilled software engineers.
* Inherent intangibility of software (progress is invisible without milestone deliverables).

---

## 4. Program vs. Software Product

| Attribute | Simple Program (Toy Script) | Commercial Software Product |
| :--- | :--- | :--- |
| **Scale & Size** | Small (hundreds of $LOC$) | Large (thousands to millions of $LOC$) |
| **Users** | Developer is usually the sole user | Built for hundreds, thousands, or millions of external users |
| **Authors** | Single individual | Large teams of specialized engineers over months/years |
| **User Interface** | Primitive CLI or non-existent | Rigorously designed, intuitive, responsive GUI/API |
| **Documentation** | None or brief comments | Exhaustive (SRS, Architecture, Test Suites, User Manuals) |
| **Evolution** | Rarely maintained; easily rewritten | Maintained for 10-20+ years; requires backward compatibility |
| **Development Approach** | Exploratory / Ad-hoc intuition | Systematic Software Development Life Cycle (SDLC) |

---

## 5. Structured Programming & Control Flow

### 5.1 The Harm of Arbitrary GOTO Statements
In 1968, **Edsger W. Dijkstra** published his landmark paper, *"Go To Statement Considered Harmful"*.
* Uncontrolled `GOTO` jumps create "spaghetti code" where execution can jump anywhere, creating an unmanageable web of execution states.
* It makes static code reading completely disconnected from dynamic execution flow.

### 5.2 The Fundamental Theorem of Structured Programming (Böhm & Jacopini, 1966)
Any computable algorithm can be expressed using only **three single-entry, single-exit control structures**:
1. **Sequence**: Executing statement $S_1$ followed immediately by $S_2$.
2. **Selection (Conditional Branching)**: `if (Condition) then S1 else S2`.
3. **Iteration (Repetition / Looping)**: `while (Condition) do S`.

```
1. Sequence             2. Selection                     3. Iteration
   [ Entry ]                [ Entry ]                       [ Entry ]
       |                        |                               |
       v                        v                               v
    [ S1 ]               < Condition >                     +->< Condition >---+
       |                    /       \                      |     | True       | False
       v              True /         \ False               |     v            |
    [ S2 ]                v           v                    |   [ S ]          |
       |               [ S1 ]       [ S2 ]                 +-----+            |
       v                  \           /                                       v
   [ Exit ]                v         v                                    [ Exit ]
                          [   Exit   ]
```

### 5.3 Control Flow Graph (CFG)
A **Control Flow Graph** $G = (V, E)$ models all execution paths in a structured program:
* **Nodes ($V$)**: Basic blocks (sequences of non-branching statements).
* **Edges ($E$)**: Transfer of control between basic blocks.
* **Properties**:
  - Exactly one start node with in-degree $0$.
  - Exactly one exit/terminal node with out-degree $0$.
  - Every node is reachable from the start node and can reach the exit node.

---

## 6. Exam Tips, Common Traps & Practice Questions

> [!IMPORTANT]
> **High-Yield Exam Points:**
> * Always mention the **Building Wall vs Skyscraper** analogy when asked why small programs differ from software products.
> * The formula $\text{Interactions} = \frac{N(N-1)}{2}$ mathematically proves exponential complexity growth.
> * The three constructs of structured programming: **Sequence, Selection, Iteration** (all single-entry, single-exit).
> * The 1968 NATO conference and Dijkstra's *"GOTO Considered Harmful"* paper mark the birth of modern Software Engineering.

### 5-Mark Practice Questions
1. **Explain the Software Crisis. Describe the technological breakthroughs and methodological shifts that helped overcome it.**
2. **Differentiate between Abstraction and Decomposition. Why does random decomposition fail to reduce program complexity?**
3. **Why does software maintenance consume a significantly higher percentage of the budget than the initial development phase?**
"""

    with open("notes_md/module_01_intro_and_structured_programming.md", "w", encoding="utf-8") as f:
        f.write(mod1_content)
    with open("content/module-01/overview.md", "w", encoding="utf-8") as f:
        f.write(mod1_content)

    print("Wrote Module 1 notes.")

    # -------------------------------------------------------------
    # MODULE 2
    # -------------------------------------------------------------
    mod2_content = """# Module 2: Software Life Cycle Models (SDLC)
*Authors & References: Dr. Rajib Mall (IIT Kharagpur) & Prof. Swarup Roy*

---

## 1. What is a Software Life Cycle Model?

### 1.1 Definition & Necessity
A **Software Life Cycle Model** (or SDLC model) is a descriptive and diagrammatic representation of the software development life cycle. It defines:
* The precise sequence of stages through which a software product progresses from initial conception to final retirement.
* The specific **activities** and tasks undertaken in each stage.
* The required **deliverables** (documents, code, test reports) produced in each stage.
* The **Phase Entry and Exit Criteria**: A phase can only start when its entry criteria are satisfied, and can only be considered complete when all exit criteria and validation reviews are signed off.

### 1.2 Life Cycle Phases in Standard Order
1. **Feasibility Study**: Determine economic, technical, and operational viability.
2. **Requirements Analysis & Specification (SRS)**: Elicit customer needs, resolve ambiguities, and author the formal SRS document.
3. **Design**: Transform the SRS into a high-level architecture and detailed module specifications.
4. **Coding & Unit Testing**: Implement modules in a programming language and test them in isolation.
5. **Integration & System Testing**: Combine modules incrementally to test interfaces, and validate the complete system against the SRS.
6. **Maintenance**: Correct post-release defects, adapt to new operating environments, and enhance functionality over the product's operational lifespan.

```
Total Life Cycle Effort Distribution
┌──────────────────────────────┬────────────────────────────────────────────────────────┐
│     Development (~40%)       │                  Maintenance (~60%)                    │
└──────────────────────────────┴────────────────────────────────────────────────────────┘
 ├── Feasibility: ~5%
 ├── Requirements (SRS): ~10%
 ├── Design: ~15%
 ├── Coding: ~20%
 └── Testing (Unit + System): ~50% of Development!
```

---

## 2. Classical Waterfall Model (The Idealistic Baseline)

### 2.1 Characteristics
* Purely **linear sequential model**. A phase begins only after the preceding phase is completely finished and approved.
* **No Feedback Paths**: Assumes that human engineers make zero errors in any phase, and that customer requirements remain $100\%$ frozen.

```
[ Feasibility Study ]
         |
         v
[ Requirements Analysis & Specification ]
         |
         v
[ Design Phase ]
         |
         v
[ Coding & Unit Testing ]
         |
         v
[ Integration & System Testing ]
         |
         v
[ Maintenance ]
```

### 2.2 Why Classical Waterfall is an Idealistic Model
In practical real-world engineering:
1. Human engineers commit errors in every phase (misunderstood requirements, bad design choices, coding bugs).
2. Customer requirements evolve dynamically over time.
3. Because Classical Waterfall forbids feedback loops, defects discovered late (e.g. during system testing) cannot be traced back and resolved at the requirements or design level within the model's rules.
4. Therefore, Classical Waterfall is an **idealized reference framework** rather than a practical development model.

---

## 3. Iterative Waterfall Model & Phase Containment

### 3.1 Feedback Loops in Iterative Waterfall
The **Iterative Waterfall Model** provides practical realism by introducing **feedback paths** between adjacent phases.
* When testing reveals a design flaw, feedback is provided to the design phase to update blueprints and code.
* When design exposes an ambiguous requirement, feedback is provided to the requirements phase.

```
[ Feasibility Study ]
         |
         v
[ Requirements Specification ] <----+
         |                          |
         v                          | Feedback
[ Design Phase ] <--------------+   | Loops
         |                      |   |
         v                      |   |
[ Coding & Unit Testing ] <-----+---+
         |                      |   |
         v                      |   |
[ Integration & System Testing ]+---+
         |
         v
[ Maintenance ]
```

### 3.2 Phase Containment of Errors (Boehm's Cost Law)
> **The Principle of Phase Containment:** Defects must be detected and corrected in the **exact same phase** in which they are introduced.

#### Cost Escalation Curve
The cost to fix a defect grows **exponentially** the later it is discovered in the life cycle:
* **Requirements Phase**: $\$1$ (Simple text edit in SRS).
* **Design Phase**: $\$5$ (Update architecture and interface definitions).
* **Coding Phase**: $\$10$ (Rewrite module code).
* **System Testing Phase**: $\$50$ (Re-integrate, re-run test suites, update docs).
* **Maintenance / Post-Release**: $\$100 - \$200+$ (Emergency field patches, data corruption fixes, legal liability, customer churn).

```
Relative Cost to Fix a Bug
  $200 |                                                  .--- (Post-Release / Maintenance)
  $150 |                                               .-'
  $100 |                                            .-'
   $50 |                                      _..--' (System Testing)
   $10 |                              _..--'' (Coding)
    $5 |                      _..--'' (Design)
    $1 | ____________...--'' (Requirements)
       +----------------------------------------------------> Phase Discovered
```

---

## 4. Prototyping Model

### 4.1 When is Prototyping Required?
When the customer cannot clearly state their requirements, or when the user interface and system workflow are completely novel and ambiguous.

### 4.2 Step-by-Step Prototyping Process
1. **Requirements Gathering**: Collect initial high-level user goals.
2. **Quick Design & Prototype Construction**: Build a rapid, lightweight "toy" system (focusing exclusively on UI and input/output screens, using mock databases).
3. **Customer Evaluation**: The customer interacts hands-on with the working prototype and provides concrete feedback.
4. **SRS Refinement**: Customer feedback is translated into an accurate, complete, and verifiable SRS document.
5. **Throw Away the Prototype**: The prototype is discarded.
6. **Full Engineering**: The actual production software is built from scratch using structured methods and rigorous architecture.

```
[ Initial Requirements ]
          |
          v
[ Quick Design & Build Prototype ] <------+
          |                               | Customer
          v                               | Feedback
[ Customer Evaluates Prototype ] ---------+
          |
          v (Requirements Clarified)
[ Write Formal SRS ]
          |
          v
[ Standard Engineering (Design -> Code -> Test -> Deploy) ]
```

> [!CAUTION]
> **Common Student Trap:** Why must the prototype be thrown away?
> Rapid prototypes are built quickly using poor coding practices, no security, hard-coded data, and no architectural design. Converting a toy prototype directly into production software results in an unmaintainable, fragile system that crashes constantly.

---

## 5. Evolutionary (Incremental) Model

### 5.1 Architecture & Process
Instead of delivering the entire software in one giant "big-bang" release, the system is broken down into **functional increments**:
* **Increment 1 (Core Kernel)**: The foundational business logic and high-priority features are designed, coded, tested, and deployed to actual users.
* **Increment 2**: Secondary features are engineered and integrated into the deployed core.
* **Increment 3**: Advanced and tertiary features are added.

```
                   [ Overall System Requirements ]
                                  |
         +------------------------+------------------------+
         |                        |                        |
         v                        v                        v
[ Increment 1: Core ]    [ Increment 2: Features ] [ Increment 3: Advanced ]
         |                        |                        |
   (Mini-Waterfall)         (Mini-Waterfall)         (Mini-Waterfall)
         |                        |                        |
         v                        v                        v
  Deployed to User         Integrated & Deployed    Integrated & Deployed
```

### 5.2 Key Advantages
1. **Early Value Realization**: Customers receive working, usable software early.
2. **Reduces Customer Trauma**: Staff and organizations adapt to a new system gradually rather than facing a massive, destabilizing sudden changeover.
3. **Market Feedback**: Real-world usage of early increments directly informs the refinement of future increments.

---

## 6. Boehm's Spiral Model (The Meta-Model)

### 6.1 Why is it a "Meta-Model"?
Proposed by **Barry Boehm**, the Spiral Model is called a **meta-model** because it can accommodate and emulate all other SDLC models:
* A single spiral loop with zero risk acts as the **Classical Waterfall model**.
* A spiral that focuses heavily on UI prototyping in early loops acts as the **Prototyping model**.
* A spiral that delivers working versions at the end of each loop acts as the **Evolutionary model**.

### 6.2 The 4 Quadrants of Each Spiral Loop
Every cycle of the spiral proceeds clockwise through four distinct quadrants:

```
            Quadrant 1: Determine Objectives,         Quadrant 2: Identify & Resolve
            Alternatives & Constraints                Risks (Risk Analysis)
                                    |
                                    |     /--- (Risk Assessment) ---\
                         Cumulative |    /                           \
                            Cost    |   |    Prototype 1              |
                                    |   |      Prototype 2            |
            ------------------------+---------------------------------+--------------------->
                                    |   |                             |    Progress /
                                    |   |    SRS      Design          |    Review
                                    |    \           Code    Test    /
                                    |     \-------------------------/
            Quadrant 4: Review &    |          Quadrant 3: Develop &
            Plan Next Loop          |          Verify Next-Level Deliverable
```

1. **Quadrant 1 (Top-Left): Objective Setting & Alternative Identification**
   - Identify phase objectives (e.g. throughput, response time, user features).
   - Identify alternative implementation approaches and constraints (cost, hardware limitations, schedule).
2. **Quadrant 2 (Top-Right): Risk Assessment & Resolution**
   - Evaluate all technical, operational, and managerial risks (e.g. database bottleneck, skill gap, vendor reliability).
   - Formulate risk reduction strategies: build prototypes, run benchmarks, conduct simulations.
3. **Quadrant 3 (Bottom-Right): Development & Validation**
   - Develop the deliverable for this cycle (e.g., Detailed Design, Code, Integration).
   - Verify that the artifact satisfies requirements.
4. **Quadrant 4 (Bottom-Left): Review & Planning for Next Phase**
   - Review project progress with the customer.
   - Plan the next loop, update budget, and allocate team resources.

### 6.3 Geometric Interpretations
* **Radial Distance ($r$)**: Represents the cumulative development cost incurred up to that point.
* **Angular Dimension ($\theta$)**: Represents the percentage of progress achieved within the current phase.

---

## 7. SDLC Model Selection Matrix

| Project Characteristic | Recommended Model | Technical Justification |
| :--- | :--- | :--- |
| **Well-understood requirements, mature domain, strict milestones** | Iterative Waterfall | Predictable linear governance, simple tracking |
| **Ambiguous requirements, new GUI, high customer uncertainty** | Prototyping Model | Rapid prototypes elicit accurate customer feedback |
| **Large system, core features needed quickly, iterative budget** | Evolutionary Model | Early ROI, incremental user adoption, manageable risk |
| **High technical risk, experimental technology, large enterprise budget** | Spiral Model | Explicit risk analysis and mitigation in every loop |

---

## 8. Exam Review & Practice Questions

> [!IMPORTANT]
> **Key Exam Takeaways:**
> * Waterfall = Phase-driven; Evolutionary = Release-driven; Spiral = Risk-driven.
> * Boehm's cost law: Catching a bug during maintenance costs $100\times$ more than catching it during SRS.
> * Spiral model 4 quadrants in exact sequence: Objectives $\rightarrow$ Risk $\rightarrow$ Develop $\rightarrow$ Plan.

### Practice Questions (5-8 Marks)
1. **Explain Boehm's Spiral Model with a neat diagram. Why is it called a meta-model?**
2. **What is Phase Containment of Errors? Explain the economic justification for performing thorough SRS and design reviews.**
3. **Compare and contrast the Prototyping Model with the Evolutionary Model.**
"""

    with open("notes_md/module_02_life_cycle_models.md", "w", encoding="utf-8") as f:
        f.write(mod2_content)
    with open("content/module-02/overview.md", "w", encoding="utf-8") as f:
        f.write(mod2_content)

    print("Wrote Module 2 notes.")

    # -------------------------------------------------------------
    # MODULE 3
    # -------------------------------------------------------------
    mod3_content = """# Module 3: Requirements Analysis, Specification (SRS) & Formal Methods
*Authors & References: Dr. Rajib Mall (IIT Kharagpur) & Prof. Swarup Roy*

---

## 1. Requirements Engineering Overview

### 1.1 The Role of the System Analyst
The **System Analyst** acts as the crucial communication bridge between the non-technical customer/users and the technical software engineering team.
* **Key Roles & Activities**:
  1. **Requirements Gathering (Elicitation)**: Collects raw requirements through customer interviews, user questionnaires, on-site observation, and study of existing legacy workflows.
  2. **Requirements Analysis**: Analyzes gathered requirements to detect and eliminate:
     - **Inconsistencies**: Contradictory statements (e.g. "System must be completely free and open" vs "System requires paid credit card verification").
     - **Incompleteness**: Missing edge cases (e.g. what happens when network drops during checkout?).
     - **Ambiguities**: Vague qualitative terms (e.g. "System must be fast and user-friendly").
  3. **Requirements Specification**: Formats and documents all requirements into a formal, unambiguous **Software Requirements Specification (SRS)**.
  4. **Validation & Review**: Reviews the SRS with stakeholders to obtain formal sign-off.

---

## 2. The Software Requirements Specification (SRS) Document

### 2.1 The Four Primary Roles of an SRS
1. **Contract Document**: Legal agreement between customer and development agency on deliverable scope.
2. **Statement of User Needs**: Complete expression of what the user wants the software to do.
3. **Architectural Blueprint**: Input to the software design phase.
4. **Validation Baseline**: Foundation for generating system test suites and acceptance test plans.

### 2.2 Structure of an IEEE 830 Standard SRS Document
```
1. Introduction
   1.1 Purpose of the document
   1.2 Scope of the product
   1.3 Definitions, Acronyms, and Abbreviations
   1.4 References
   1.5 Overview of the document
2. Overall Description
   2.1 Product Perspective (Autonomous or Subsystem)
   2.2 Product Functions (High-level summary)
   2.3 User Classes and Characteristics
   2.4 Operating Environment & Hardware/Software Constraints
   2.5 User Documentation & Assumptions
3. Specific Requirements
   3.1 External Interface Requirements (User, Hardware, Software, Comm)
   3.2 Functional Requirements (Detailed inputs, processing, outputs)
   3.3 Non-Functional Requirements (Performance, Security, Reliability, Safety)
   3.4 Design Constraints (Programming language, standards, database)
```

### 2.3 Characteristics of a High-Quality SRS
* **Concise & Unambiguous**: Every requirement has exactly one interpretation.
* **Specifies WHAT, NOT HOW**: Specifies external behavior without dictating internal algorithms, data structures, or class hierarchies.
* **Consistent**: No contradictory statements.
* **Complete**: Covers all operating modes, valid inputs, invalid inputs, and error states.
* **Verifiable (Testable)**: It must be possible to design a finite, cost-effective test to verify compliance.
* **Traceable**: Each requirement has a unique identifier (e.g. `FR-1.2`) traceable to design components and test cases.
* **Modifiable**: Structured so changes can be made systematically without cascading errors.

---

## 3. Decision Logic: Decision Trees vs. Decision Tables

When complex functional requirements involve multiple conditional combinations and overlapping business actions, informal text leads to confusion. We use formal decision logic.

### 3.1 Decision Trees
A **Decision Tree** is a graphical representation of decision logic:
* **Root & Internal Edges**: Conditions / Decision criteria.
* **Leaf Nodes**: Actions to be executed.

```
                    [ Customer Order ]
                            |
           +----------------+----------------+
           | Eligible Customer               | Ineligible Customer
           v                                 v
     [ Order Amount ]                 [ Action: Reject Order ]
           |
     +-----+-----+
     | > $500    | <= $500
     v           v
 [ Action:   [ Action:
   Apply 10%   Apply Standard
   Discount ]  Shipping ]
```

### 3.2 Decision Tables
A **Decision Table** is a compact tabular matrix representing complex conditional logic. It is divided into 4 distinct quadrants:

```
┌─────────────────────────────────┬─────────────────────────────────┐
│         CONDITION STUB          │         CONDITION ENTRY         │
│   (List of all input conditions)│     (Rule permutations: Y / N)  │
├─────────────────────────────────┼─────────────────────────────────┤
│          ACTION STUB            │          ACTION ENTRY           │
│   (List of all possible actions)│  (Action indicators: X or blank)│
└─────────────────────────────────┴─────────────────────────────────┘
```

#### Worked Example: Bank Loan Eligibility
* **Conditions**:
  1. $C_1$: Credit Score $\ge 700$ (Y/N)
  2. $C_2$: Monthly Income $\ge \$5,000$ (Y/N)
  3. $C_3$: Existing Debt Ratio $\le 40\%$ (Y/N)
* **Total Possible Rules**: $2^n = 2^3 = 8$ Rules.

| Quadrant | Element | Rule 1 | Rule 2 | Rule 3 | Rule 4 | Rule 5 | Rule 6 | Rule 7 | Rule 8 |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Condition Stub** | $C_1$: Credit Score $\ge 700$? | Y | Y | Y | Y | N | N | N | N |
| | $C_2$: Income $\ge \$5,000$? | Y | Y | N | N | Y | Y | N | N |
| | $C_3$: Debt Ratio $\le 40\%$? | Y | N | Y | N | Y | N | Y | N |
| **Action Stub** | $A_1$: Approve Instant Loan | **X** | | | | | | | |
| | $A_2$: Manual Review Required | | **X** | **X** | | **X** | | | |
| | $A_3$: Reject Application | | | | **X** | | **X** | **X** | **X** |

#### Why Decision Tables are Superior to Decision Trees for Complex Logic:
1. Guaranteed completeness: An $n$-condition table has exactly $2^n$ rules, ensuring zero unhandled cases.
2. Tables can be algebraically simplified by merging "don't-care" (`-`) conditions.

---

## 4. Formal Requirements Specification

Natural language specifications suffer from ambiguity and semantic imprecision. **Formal methods** use mathematical notations based on set theory, first-order predicate logic, and discrete mathematics.

### 4.1 Axiomatic Specification (Hoare Triples)
Axiomatic specification describes operations by stating what must be true before and after execution:
$$\{P\} \, S \, \{Q\}$$
* **$P$ (Precondition)**: Predicate assertion that must hold true before invoking operation $S$.
* **$S$ (Operation / Program Statement)**.
* **$Q$ (Postcondition)**: Predicate assertion guaranteed to hold true upon completion of $S$, provided $P$ held beforehand.

#### Example: Integer Square Root Operation $\text{ISQRT}(n, r)$
* **Precondition $P$**: $n \ge 0$
* **Postcondition $Q$**: $(r^2 \le n) \land ((r + 1)^2 > n) \land (r \ge 0)$

---

### 4.2 Algebraic Specification
Algebraic specification models Abstract Data Types (ADTs) as heterogeneous algebras without referencing internal storage representations.

#### The 4 Components of an Algebraic Specification:
1. **Types / Sorts**: The data types being defined (e.g., `Stack`, `Element`, `Boolean`).
2. **Syntax / Operation Signatures**:
   - `New`: $\rightarrow \text{Stack}$ (Creates empty stack)
   - `Push`: $\text{Stack} \times \text{Element} \rightarrow \text{Stack}$
   - `Pop`: $\text{Stack} \rightarrow \text{Stack}$
   - `Top`: $\text{Stack} \rightarrow \text{Element}$
   - `IsEmpty`: $\text{Stack} \rightarrow \text{Boolean}$
3. **Classification of Operations**:
   - **Constructors**: Create or modify the ADT instances.
     - *Basic Constructors* ($m_1$): `New`
     - *Extra Constructors* ($m_2$): `Push`
   - **Inspectors (Observers)**: Query the ADT without altering it.
     - *Basic Inspectors* ($n_1$): `IsEmpty`
     - *Extra Inspectors* ($n_2$): `Top`, `Pop`
4. **Axioms / Equations**:
   - $\text{IsEmpty}(\text{New}()) = \text{True}$
   - $\text{IsEmpty}(\text{Push}(s, e)) = \text{False}$
   - $\text{Top}(\text{Push}(s, e)) = e$
   - $\text{Top}(\text{New}()) = \text{Error}$
   - $\text{Pop}(\text{Push}(s, e)) = s$
   - $\text{Pop}(\text{New}()) = \text{Error}$

#### Formula for Minimum Number of Axioms:
$$\text{Min Axioms} = m_1 \times (m_2 + n_1) + n_2$$
For Stack ($m_1=1, m_2=1, n_1=1, n_2=2$):
$$\text{Min Axioms} = 1 \times (1 + 1) + 2 = 4 \text{ Axioms}$$

---

## 5. Exam Review & High-Yield Questions

> [!IMPORTANT]
> **Key Exam Points:**
> * IEEE 830 Section 3 specifies Functional & Non-Functional requirements.
> * SRS specifies WHAT the system does, NOT HOW it is implemented.
> * Hoare Triple: $\{P\} S \{Q\}$ (Precondition $\rightarrow$ Program $\rightarrow$ Postcondition).
> * Minimum Algebraic Axioms formula: $m_1 \times (m_2 + n_1) + n_2$.

### Practice Questions
1. **Explain the structure and desirable characteristics of an IEEE 830 SRS document.**
2. **Construct a Decision Table for an automated ATM Cash Withdrawal system considering Card Validity, PIN Correctness, and Sufficient Account Balance.**
3. **Write the complete Algebraic Specification for a FIFO Queue ADT.**
"""

    with open("notes_md/module_03_requirements_and_formal_specifications.md", "w", encoding="utf-8") as f:
        f.write(mod3_content)
    with open("content/module-03/overview.md", "w", encoding="utf-8") as f:
        f.write(mod3_content)

    print("Wrote Module 3 notes.")

    # -------------------------------------------------------------
    # MODULE 4 & 5 (DESIGN, COHESION, COUPLING & DFD THEORY)
    # -------------------------------------------------------------
    mod4_content = """# Module 4 & 5: Software Design, Modularity, Cohesion, Coupling & DFD Theory
*Authors & References: Dr. Rajib Mall (IIT Kharagpur) & Prof. Swarup Roy*

---

## 1. Software Design Fundamentals

### 1.1 What is Software Design?
Software design is the phase where customer requirements documented in the SRS are transformed into a detailed structural blueprint suitable for direct implementation in a programming language.
* **High-Level (Architectural) Design**: Decomposes the system into modules, defines subsystem boundaries, and establishes inter-module control and data communication interfaces.
* **Detailed Design**: Designs internal algorithms, data structures, and state representations for each individual module.

### 1.2 Characteristics of Good Software Design
* **Correctness**: Satisfies all functional and non-functional requirements in the SRS.
* **Understandability & Modularity**: Easy to comprehend and maintain.
* **Low Coupling & High Cohesion**: The holy grail of software engineering.

---

## 2. Cohesion (Module Strength)

> **Definition:** Cohesion is a measure of the internal functional strength of a module—the degree to which all elements inside a single module belong together and perform a single dedicated task.

### The 7 Levels of Cohesion (Ranked from WORST to BEST)

```
[ 1. Coincidental (Worst) ] ──> Random unrelated statements grouped together
[ 2. Logical              ] ──> Groups functions of same category (e.g. all print routines)
[ 3. Temporal             ] ──> Groups functions executed at same time (e.g. startup/init)
[ 4. Procedural           ] ──> Functions executed in a specific sequential/loop order
[ 5. Communicational      ] ──> Functions operating on the exact same input/output dataset
[ 6. Sequential           ] ──> Output of one function becomes direct input of the next
[ 7. Functional (Best)    ] ──> Module performs exactly ONE dedicated mathematical/business task
```

#### Detailed Breakdown of All 7 Levels:

1. **Coincidental Cohesion (Worst)**:
   - Elements are bundled together with zero meaningful relationship (e.g. a `MiscUtils` class containing `sortArray()`, `printInvoice()`, `calculateTax()`, `connectDB()`).
   - *Drawback*: Impossible to reuse or maintain without breaking unrelated code.
2. **Logical Cohesion**:
   - Elements perform logically similar operations selected by a control flag (e.g. a single function `handleIO(flag)` that contains a giant `switch` statement for printing, disk reading, network sending, and mouse input).
3. **Temporal Cohesion**:
   - Elements are grouped simply because they are executed during the same phase of execution (e.g. a monolithic `initializeSystem()` module that opens DB connections, zeroes error counters, loads UI fonts, and reads config files).
4. **Procedural Cohesion**:
   - Elements are executed in a specific algorithm order to accomplish a broader task, but do not share data (e.g. `readStudentRecord()`, `calculateExamRank()`, `formatReport()`).
5. **Communicational Cohesion**:
   - All operations inside the module operate on the **exact same input data structure** or produce the same output buffer (e.g. a module `StudentDataProcessor` with functions `findAverage(studentRec)`, `checkEligibility(studentRec)`, `printTranscript(studentRec)`).
6. **Sequential Cohesion**:
   - The output data generated by one operation serves as the direct input data to the next operation in a pipeline (e.g. `readRawData() -> parseTokens() -> generateBytecode()`).
7. **Functional Cohesion (Best & Highest)**:
   - All elements in the module cooperate to perform **exactly one well-defined task** (e.g. `computeCosine(angle)`, `sortDescending(list)`, `authenticateUser(credentials)`).
   - *Advantage*: High reusability, easy testing, zero side-effects.

---

## 3. Coupling (Inter-Module Dependency)

> **Definition:** Coupling is a measure of the degree of interdependence between two software modules. High coupling makes code fragile; changing one module breaks others.

### The 6 Levels of Coupling (Ranked from BEST to WORST)

```
[ 1. Data Coupling (Best) ] ──> Passes simple primitive arguments (e.g. int, float)
[ 2. Stamp Coupling       ] ──> Passes entire composite structure (e.g. full Student object)
[ 3. Control Coupling     ] ──> Passes a flag dictating internal execution logic
[ 4. External Coupling    ] ──> Dependent on external hardware/protocol/OS formats
[ 5. Common Coupling      ] ──> Multiple modules share global variables
[ 6. Content Coupling (Worst) ] > One module directly modifies code/data inside another
```

#### Detailed Breakdown of All 6 Levels:

1. **Data Coupling (Best & Lowest)**:
   - Modules communicate exclusively by passing simple scalar/primitive arguments (e.g., passing `float principal, float rate, int time` to `computeInterest()`).
2. **Stamp (Data-Structure) Coupling**:
   - Modules pass an entire composite data structure (struct/record/object) when the receiving module only requires one or two fields (e.g. passing a 50-field `EmployeeRecord` struct to a function that only needs `employee.salary`).
3. **Control Coupling**:
   - One module passes a control flag or token to another module to explicitly control its internal execution flow (e.g. passing `mode = 1` for sort ascending, `mode = 2` for sort descending).
4. **Common Coupling**:
   - Multiple modules read and write to the same shared **global variable space** or shared memory pool.
   - *Severe Danger*: If a variable is corrupted, tracing which of 20 modules caused the bug is an engineering nightmare.
5. **Content Coupling (Worst & Highest)**:
   - One module directly accesses, branches into, or modifies the private internal data, memory pointers, or code lines of another module (e.g. using `goto` into another function's label or modifying internal struct offsets).

---

## 4. Structured Analysis & Structured Design (SA/SD)

### 4.1 Structure Charts
A **Structure Chart** represents the procedural hierarchy of modules:
* **Boxes**: Modules / subroutines.
* **Directed Lines**: Invocation (call hierarchy).
* **Data Couple (Open Circle Arrow $\circ\rightarrow$)**: Named data item passed between caller and callee.
* **Control Couple (Filled Circle Arrow $\bullet\rightarrow$)**: Named control flag passed between caller and callee.

```
                         [ Top-Level Executive ]
                                    |
            +-----------------------+-----------------------+
            | ⚬ InputData           | ⚬ RawData             | ⚬ FormattedData
            | • StatusFlag          |                       |
            v                       v                       v
     [ Get-Input ]          [ Transform-Data ]       [ Produce-Report ]
```

### 4.2 Fan-In and Fan-Out Rules
* **Fan-Out**: The number of modules directly invoked by a module.
  - *Rule*: Keep Fan-Out $\le 7 \pm 2$. Excessively high fan-out indicates poor cohesion (the caller is trying to do too much).
* **Fan-In**: The number of modules that directly invoke a given module.
  - *Rule*: **High Fan-In is highly desirable**. It indicates that a module provides a reusable, cohesive service across the system.

### 4.3 Transform Analysis vs. Transaction Analysis
* **Transform Analysis**: Applied when the system acts as a linear pipeline (Input $\rightarrow$ Process $\rightarrow$ Output). Divided into:
  - *Afferent Branch*: Cleans, parses, and converts raw input data into internal form.
  - *Central Transform*: Executes the core business calculation.
  - *Efferent Branch*: Converts internal data into formatted external outputs.
* **Transaction Analysis**: Applied when an input transaction tag determines which of several distinct operational processing arms should be invoked.

---

## 5. Data Flow Diagrams (DFD) — Theory, Rules & Grammar

### 5.1 What is a Data Flow Diagram?
A **Data Flow Diagram (DFD)** is a graphical modeling tool that visualizes how data moves through an information system, how it is transformed by processes, and where it is stored.

### 5.2 The 4 Standard DFD Symbols (Yourdon & Coad / Gane & Sarson)

```
1. Process (Bubble)             2. External Entity (Source/Sink)
      ┌───────────┐                         ┌───────────────────┐
     /  Compute    \                        │     Customer      │
    │     Tax       │                       │                   │
     \  (Circle)   /                        └───────────────────┘
      └───────────┘                             (Rectangle)

3. Data Store                   4. Data Flow
    ═════════════════════                   ───────────────────>
      Customer_Database                       Customer_Details
    ═════════════════════                       (Named Arrow)
    (Two Parallel Lines)
```

---

### 5.3 The DFD Hierarchy: Levels 0, 1, and 2

```
                       [ Level 0: Context Diagram ]
               (Entire system as EXACTLY 1 bubble, NO stores)
                                    │
                                    ▼
                         [ Level 1 DFD: Subsystems ]
                (Decomposed into 3 to 7 primary functional bubbles)
                                    │
                                    ▼
                         [ Level 2 DFD: Detailed ]
                 (Decomposed sub-bubbles: e.g. 1.1, 1.2, 1.3)
```

#### Level 0: Context Diagram
* The entire system is represented as **exactly one single bubble (Bubble 0)**.
* Shows system boundaries, surrounded by all **External Entities** and major inputs/outputs.
* **STRICT GRAMMAR RULE: NO data stores are permitted in a Level 0 Context Diagram**.

#### Level 1 DFD
* Decomposes Bubble 0 into **3 to 7 high-level functional candidate bubbles**.
* Data stores appear here for the first time to hold persistent data between processes.

#### Level 2 DFD
* Decomposes complex Level 1 bubbles into detailed child sub-bubbles (e.g., Bubble `2` decomposes into `2.1`, `2.2`, `2.3`).

---

### 5.4 The DFD Balancing Rule
> **The Fundamental Law of DFD Balancing:** All data flows entering and leaving a bubble at Level $N$ MUST strictly match the net external data flows entering and leaving its decomposed sub-diagram at Level $N+1$.

```
Level 0:  [Entity A] ─── Data X ───> (( System 0 )) ─── Data Y ───> [Entity B]

Level 1 MUST have:
          [Entity A] ─── Data X ───> (( Bubble 1 ))
                                          │
                                       Data Z
                                          │
                                          v
                                     (( Bubble 2 )) ─── Data Y ───> [Entity B]
          (Net Input = Data X, Net Output = Data Y. BALANCED!)
```

---

### 5.5 Illegal DFD Connections (Common Construction Errors)

```
❌ Entity to Entity:   [Customer] ───────────────> [Bank Manager]      (Illegal: Outside system scope)
❌ Store to Store:     ═ Database A ═ ───────────> ═ Database B ═      (Illegal: Needs a process to move data)
❌ Entity to Store:    [Customer] ───────────────> ═ Database ═        (Illegal: Must pass through a process)
❌ Black Hole:         Data In ───> (( Process )) (No output flows!)   (Illegal)
❌ Miracle:            (( Process )) ───> Data Out (No input flows!)   (Illegal)
```

---

### 5.6 Data Dictionary
A **Data Dictionary** provides formal structural definitions for every data item in the DFD:
* `+` : Composition / Sequence (AND).
* `[ | ]` : Selection / Choice (OR).
* `{ }` : Iteration / Repetition (0 or more).
* `( )` : Optional field.
* `* *` : Comment annotation.

#### Example Data Dictionary Entry:
```
Customer-Order = Customer-ID + Customer-Name + Delivery-Address + { Item-Details } + (Special-Instructions)
Item-Details   = Item-ID + Quantity + Unit-Price
Delivery-Address = Street + City + State + PIN-Code
Payment-Type   = [ Cash-On-Delivery | Credit-Card | Net-Banking | UPI ]
```

---

## 6. Exam Review & Practice Questions

> [!IMPORTANT]
> **Key Exam Points:**
> * Cohesion scale: Coincidental (worst) to Functional (best).
> * Coupling scale: Data (best) to Content (worst).
> * Structure chart: Fan-out $\le 7 \pm 2$, High fan-in is good.
> * Context diagram (Level 0): Exactly 1 bubble, NO data stores.
> * DFD Balancing rule: Inputs/outputs must match across levels.

### Practice Questions (5-8 Marks)
1. **Explain the 7 levels of Cohesion with clear real-world examples for each level.**
2. **Explain the 6 levels of Coupling. Why is Content Coupling considered hazardous?**
3. **What is the DFD Balancing Rule? Give an example of a balanced vs unbalanced DFD.**
"""

    with open("notes_md/module_04_05_software_design_and_dfd.md", "w", encoding="utf-8") as f:
        f.write(mod4_content)
    with open("content/module-04/overview.md", "w", encoding="utf-8") as f:
        f.write(mod4_content)
    with open("content/module-05/overview.md", "w", encoding="utf-8") as f:
        f.write(mod4_content)

    print("Wrote Module 4 and 5 notes.")

    # -------------------------------------------------------------
    # MODULE 6 (DFD PRACTICE PROBLEMS)
    # -------------------------------------------------------------
    mod6_content = """# Module 6: DFD Practice Studio — Master Tutorial & 10 Solved Exam Problems
*Authors & References: Dr. Rajib Mall (IIT Kharagpur) & University Exam Solutions*

---

## 1. Step-by-Step Methodology to Construct a DFD from Problem Statements

1. **Step 1: Identify System Boundaries & External Entities**
   - Read the specification and underline all nouns that represent actors, external departments, or external systems outside the software boundary.
2. **Step 2: Draw the Level 0 Context Diagram**
   - Draw Bubble 0 in the center with the complete system name.
   - Place External Entities around Bubble 0. Connect major input data flows from sources to Bubble 0, and output flows from Bubble 0 to sinks. **No data stores!**
3. **Step 3: Extract Candidate Functions (Processes)**
   - Underline all action verbs (e.g. `accept order`, `validate item`, `generate invoice`). Group related verbs into 3 to 7 primary Level 1 candidate bubbles.
4. **Step 4: Identify Data Stores**
   - Identify nouns representing persistent business files, records, or databases (e.g. `Customer-File`, `Inventory-DB`).
5. **Step 5: Construct the Level 1 DFD**
   - Draw the 3 to 7 candidate bubbles, place data stores, and connect internal data flow arrows.
6. **Step 6: Decompose Complex Bubbles into Level 2**
   - For any bubble with multi-step sub-logic, construct a child Level 2 diagram with sub-bubbles (e.g. `2.1`, `2.2`, `2.3`).
7. **Step 7: Verify Flow Balancing & Author Data Dictionary**
   - Verify that all inputs/outputs at Level 0 match Level 1, and Level 1 matches Level 2. Write formal data definitions.

---

## 2. Master Case Tutorial: Trading House Automation System (TAS / RMS)

### 2.1 Problem Specification
A trading house manages raw materials. Customers submit orders. The system validates customer credit and order details. If valid, an invoice is generated, inventory is updated, and a delivery challan is sent to the warehouse. When stock falls below reorder levels, the system automatically creates vendor purchase indents. Customers can also query order status.

### 2.2 Entity & Bubble Breakdown
* **External Entities**: `Customer`, `Warehouse`, `Vendor`, `Manager`.
* **Level 1 Candidate Bubbles**:
  - `0.1 Accept-Order`: Validates incoming customer order against `Customer-File`.
  - `0.2 Process-Order`: Checks `Inventory`, generates `Invoice`, creates `Delivery-Challan`, updates `Inventory`.
  - `0.3 Handle-Query`: Reads `Order-Status-Store` and responds to customer status inquiries.
  - `0.4 Handle-Indent-Request`: Checks low stock levels and generates `Vendor-Purchase-Indent`.
* **Data Stores**: `Customer-File`, `Inventory`, `Accepted-Orders`, `Pending-Orders`, `Vendor-List`.

### 2.3 Context Diagram (Level 0)
```
                    [ Customer ]
                      │      ▲
          Order-Form  │      │  Invoice / Query-Response
                      ▼      │
            ┌──────────────────────────┐
            │                          │ ──── Delivery-Challan ────> [ Warehouse ]
            │   0. Trading House       │
            │      Automation System   │ ──── Purchase-Indent ────> [ Vendor ]
            │                          │
            └──────────────────────────┘
                      ▲
                      │ Management-Query / Reports
                      ▼
                  [ Manager ]
```

### 2.4 Level 1 DFD Diagram
```
[ Customer ] ─── Order-Form ───> (( 0.1 Accept-Order )) ─── Validated-Order ───> ═ Accepted-Orders ═
                                          │                                            │
                                    ═ Customer-File ═                                  ▼
                                                                             (( 0.2 Process-Order )) ──> [ Warehouse ]
                                                                                   │        │
                                                                                   │        └─ Invoice ─> [ Customer ]
                                                                                   ▼
                                                                             ═ Inventory ═
                                                                                   │
                                                                                   ▼
                                                                       (( 0.4 Handle-Indent )) ──> [ Vendor ]
```

---

## 3. 10 Solved University Exam Practice Problems

### Problem 1: Library Management System (LMS)
* **Entities**: `Student/Faculty`, `Librarian`.
* **Level 1 Bubbles**: `1.0 Issue-Book`, `2.0 Return-Book`, `3.0 Search-Catalogue`, `4.0 Calculate-Fine`, `5.0 Manage-Inventory`.
* **Data Stores**: `Book-Catalogue`, `Member-Record`, `Transaction-Log`.

### Problem 2: Supermarket Point of Sale (POS) & Billing System
* **Entities**: `Cashier`, `Customer`, `Store-Manager`.
* **Level 1 Bubbles**: `1.0 Scan-Barcode`, `2.0 Lookup-Item-Price`, `3.0 Compute-Total-Bill`, `4.0 Process-Payment`, `5.0 Update-Stock`.
* **Data Stores**: `Item-Price-DB`, `Inventory`, `Daily-Sales-Log`.

### Problem 3: Hospital Management System (HMS)
* **Entities**: `Patient`, `Doctor`, `Pharmacist`, `Billing-Desk`.
* **Level 1 Bubbles**: `1.0 Register-Patient`, `2.0 Schedule-Appointment`, `3.0 Record-Prescription`, `4.0 Dispense-Medicine`, `5.0 Generate-Final-Bill`.
* **Data Stores**: `Patient-Records`, `Doctor-Schedules`, `Pharmacy-Inventory`, `Billing-Ledger`.

### Problem 4: Employee Payroll Processing System
* **Entities**: `Employee`, `HR-Department`, `Bank`.
* **Level 1 Bubbles**: `1.0 Record-Attendance`, `2.0 Compute-Gross-Salary`, `3.0 Calculate-Tax-Deductions`, `4.0 Generate-Payslip`, `5.0 Transfer-Salary-Bank`.
* **Data Stores**: `Employee-Master`, `Attendance-Log`, `Tax-Rules-DB`, `Payroll-History`.

### Problem 5: Automated Teller Machine (ATM) Banking System
* **Entities**: `Bank-Customer`, `Core-Banking-Server`, `Cash-Dispenser`.
* **Level 1 Bubbles**: `1.0 Validate-PIN-Card`, `2.0 Verify-Balance`, `3.0 Dispense-Cash`, `4.0 Update-Account-Ledger`, `5.0 Print-Receipt`.
* **Data Stores**: `ATM-Cash-Vault`, `Local-Audit-Log`.

### Problem 6: University Student Admission & Registration System
* **Entities**: `Applicant`, `Admission-Committee`, `Registrar`.
* **Level 1 Bubbles**: `1.0 Submit-Application`, `2.0 Verify-Eligibility-Merit`, `3.0 Allocate-Department-Seat`, `4.0 Collect-Tuition-Fee`, `5.0 Generate-Roll-Number`.
* **Data Stores**: `Applicant-DB`, `Seat-Matrix`, `Fee-Ledger`, `Student-Master`.

### Problem 7: Airline Flight Seat Reservation System
* **Entities**: `Passenger`, `Travel-Agent`, `Flight-Operations`.
* **Level 1 Bubbles**: `1.0 Query-Flight-Schedule`, `2.0 Check-Seat-Availability`, `3.0 Book-Ticket-Payment`, `4.0 Cancel-Booking-Refund`, `5.0 Generate-Boarding-Pass`.
* **Data Stores**: `Flight-Schedule-DB`, `Seat-Inventory`, `Passenger-Manifest`, `Ticket-Ledger`.

### Problem 8: Multi-Floor Automated Elevator Controller
* **Entities**: `Floor-Passenger`, `Cabin-Passenger`, `Motor-Hardware`, `Door-Sensor`.
* **Level 1 Bubbles**: `1.0 Read-Hall-Calls`, `2.0 Read-Cabin-Destination`, `3.0 Compute-Optimal-Dispatch-Direction`, `4.0 Control-Motor-Speed`, `5.0 Operate-Door-Safety`.
* **Data Stores**: `Floor-Request-Queue`, `Elevator-State-Store`.

### Problem 9: Automated Weather Monitoring & Reporting System
* **Entities**: `Atmospheric-Sensors (Temp, Humidity, Pressure, Wind)`, `Meteorologist`, `Public-Web-Portal`.
* **Level 1 Bubbles**: `1.0 Collect-Raw-Sensor-Data`, `2.0 Calibrate-Filter-Readings`, `3.0 Compute-Statistical-Trends`, `4.0 Detect-Extreme-Storm-Alerts`, `5.0 Publish-Weather-Bulletin`.
* **Data Stores**: `Raw-Sensor-Logs`, `Historical-Climatic-DB`, `Alert-Rules`.

### Problem 10: Warehouse Inventory & Order Dispatch System
* **Entities**: `Suppliers`, `E-Commerce-Platform`, `Delivery-Courier`.
* **Level 1 Bubbles**: `1.0 Inward-Goods-Receipt`, `2.0 Bin-Location-Allocation`, `3.0 Pick-And-Pack-Order`, `4.0 Generate-Shipping-Manifest`, `5.0 Reorder-Low-Stock`.
* **Data Stores**: `Warehouse-Bin-Map`, `Item-Inventory`, `Packing-Slip-Queue`, `Supplier-Directory`.

---

## 4. Exam Tips for DFD Questions (10-15 Marks)

> [!TIP]
> **Checklist for Full Marks in DFD Exam Questions:**
> 1. Always start by drawing the **Level 0 Context Diagram** first with single Bubble 0 and NO data stores.
> 2. Ensure every process bubble has an active **verb-noun** name (e.g. `Calculate-Salary`, never just `Salary`).
> 3. Verify the **Balancing Rule**: Every arrow going in/out of Level 0 must be accounted for in Level 1.
> 4. Ensure no direct Entity $\rightarrow$ Entity or Store $\rightarrow$ Store arrows exist.
> 5. Include a short **Data Dictionary** at the end for major composite data packets.
"""

    with open("notes_md/module_05_dfd_practice_problems_10_solved.md", "w", encoding="utf-8") as f:
        f.write(mod6_content)
    with open("content/module-06/overview.md", "w", encoding="utf-8") as f:
        f.write(mod6_content)

    print("Wrote Module 6 notes.")

if __name__ == '__main__':
    write_deep_notes()
