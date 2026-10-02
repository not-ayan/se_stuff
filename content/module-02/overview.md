# Module 2: Software Life Cycle Models (SDLC)
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
                                    |     /--- (Risk Assessment) ---                         Cumulative |    /                                                       Cost    |   |    Prototype 1              |
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
* **Angular Dimension ($	heta$)**: Represents the percentage of progress achieved within the current phase.

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
> * Boehm's cost law: Catching a bug during maintenance costs $100	imes$ more than catching it during SRS.
> * Spiral model 4 quadrants in exact sequence: Objectives $ightarrow$ Risk $ightarrow$ Develop $ightarrow$ Plan.

### Practice Questions (5-8 Marks)
1. **Explain Boehm's Spiral Model with a neat diagram. Why is it called a meta-model?**
2. **What is Phase Containment of Errors? Explain the economic justification for performing thorough SRS and design reviews.**
3. **Compare and contrast the Prototyping Model with the Evolutionary Model.**
