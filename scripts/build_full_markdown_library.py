import os
import sys

# Script that generates full markdown content for all 17 modules and all topics
def generate_all_modules():
    print("Building full 17-module content repository...")

    modules = [
        {
            "num": 1,
            "id": "module-01",
            "title": "Introduction to Software Engineering & Structured Programming",
            "overview": """# Module 1: Introduction to Software Engineering & Structured Programming

## What You Will Learn
- What is Software Engineering and why it is essential for modern software products.
- The Building Construction Analogy: Building a small brick wall vs a 60-story skyscraper.
- Why program complexity and maintenance effort grow exponentially with Lines of Code ($LOC$).
- How human cognitive limitations are overcome using **Abstraction** and **Decomposition**.
- The historical evolution of software development paradigms from Exploratory style to Structured Programming and Object-Oriented design.
- The root causes of the **Software Crisis** and the foundational principles of structured programming with Control Flow Graphs (CFG).

## Module Summary
Software engineering applies systematic, disciplined, and quantifiable engineering methodologies to build reliable, maintainable software within budget and schedule. Ad-hoc exploratory coding is only viable for trivial toy scripts; commercial systems collapse without architectural decomposition, structured control flow, and formalized lifecycle processes.
""",
            "topics": [
                ("topic-01-building-analogy", "Scope, Necessity & The Building Construction Analogy", """# Scope, Necessity & The Building Construction Analogy

## What You Will Learn
- Understand what Software Engineering formally means.
- Learn why intuition works for tiny scripts but completely collapses on large software systems.
- Master the **Building Construction Analogy** frequently asked in university exams.

## Core Concept
Software engineering is not just programming; it is an engineering discipline applying systematic, disciplined, and quantifiable approaches to the development, operation, and maintenance of software.

## Detailed Explanation
### The Problem of Scale
Small programs developed by a single programmer for personal use can succeed with ad-hoc intuition. However, large commercial software:
1. Has complex multi-functional requirements.
2. Involves teams of engineers over many months or years.
3. Requires ongoing maintenance long after the original authors have left.

### The Building Construction Analogy
- **A Simple Brick Wall**: An untrained individual can build a small garden wall using common sense, bricks, and mortar. If it leans slightly, it can be patched easily.
- **A 60-Story Skyscraper**: Building a multistoried building using common sense alone will result in a catastrophic structural collapse. A skyscraper requires civil and structural engineering, architectural blueprints, strength of materials analysis, soil testing, and rigorous safety codes.
- **The Software Parallel**: Software products are modern skyscrapers of logic. Without architectural design, specification, quality assurance, and modularity, software projects suffer cost overruns, crashes, and cancellations.

## Important Terms
- **Software Engineering**: A systematic collection of past experience organized as methodologies and guidelines.
- **Software Product**: A complete software package including source code, SRS documentation, architectural design models, test suites, and user manuals.

## Example
A student writing a 100-line calculator script needs no formal life cycle model. Developing a Core Banking System processing 100,000 transactions/second requires strict requirements analysis, formal architecture, concurrency control, security auditing, and automated regression testing.

## Step-by-Step Explanation
1. **Identify Project Scale**: Determine if the project is a toy program or an industrial software product.
2. **Apply Past Experience**: Use standardized engineering models rather than reinventing ad-hoc coding workflows.
3. **Produce Documentation & Visibility**: Ensure every phase produces verifiable artifacts (SRS, Design Document, Test Plan).

## Diagram
```
[Toy Program] -------- (Intuition & Common Sense) -------> [Working Script]

[Industrial System] -- (Software Engineering Principles) -> [Maintainable & Reliable Product]
                           ├── Structured Analysis
                           ├── Formal Architecture
                           ├── Modularity (Cohesion/Coupling)
                           └── Verification & Validation
```

## Common Mistakes
- Confusing **Programming** with **Software Engineering**: Programming is just the coding phase (typically only 15-20% of total project effort).

## Exam Focus
> **Exam Question (3-5 Marks):** Explain why large software systems cannot be developed in the same manner as small toy programs. Illustrate with the building construction analogy.

## Quick Revision
- Software Engineering = Systematic discipline + Methodologies.
- Brick Wall vs Skyscraper: Intuition fails when scale and complexity increase.
- Code without SE principles = High cost, unmaintainable, frequent failures.

## Practice Questions
1. **Explain the difference between a software program and a software product.**
2. **Why is software maintenance typically more expensive than initial development?**
"""),
                ("topic-02-complexity-abstraction", "Exponential Complexity Growth & Abstraction / Decomposition", """# Exponential Complexity Growth & Abstraction / Decomposition

## What You Will Learn
- Understand why program complexity grows non-linearly with lines of code.
- Master the dual pillars of software design: **Abstraction** and **Decomposition**.
- Distinguish between horizontal and vertical decomposition.

## Core Concept
As program size grows linearly, the potential interactions between variables, functions, and modules increase exponentially ($O(n^2)$ or higher). Software engineering combats this via **Abstraction** (ignoring irrelevant details) and **Decomposition** (splitting into loosely coupled modules).

## Detailed Explanation
### Exponential Complexity Curve
If a 1,000 LOC program has $N$ logic paths, a 10,000 LOC monolithic program does not have $10N$ paths—it may have $100N$ or millions of interacting state permutations. Without structure, cognitive overload overwhelms human programmers.

### Abstraction
Abstraction allows a developer to focus on the essential properties of a component while temporarily hiding background implementation details.
- **Layered Hierarchy**: High-level design focuses on *what* a subsystem does; detailed design focuses on *how* it does it.

### Decomposition
Decomposition partitions a problem into smaller, intellectually manageable sub-problems:
- Each sub-problem should be solvable independently.
- The interaction between sub-problems (**coupling**) must be minimized.

## Formula / Relationship
$$\\text{Total Potential Interactions} = \\frac{N(N-1)}{2} \\approx O(N^2)$$
Where $N$ is the number of unorganized, interconnected program components.

## Diagram
```
                        [ Complex Problem ]
                                |
             +------------------+------------------+
             |                                     |
    [ Sub-Problem A ]                     [ Sub-Problem B ]
     (High Cohesion)                       (High Cohesion)
             |                                     |
             +<--- [ Low Coupling Interface ] ---->+
```

## Common Mistakes
- **Tightly Coupled Decomposition**: Splitting a program into 10 functions where each function modifies the same 20 global variables. This is NOT effective decomposition.

## Exam Focus
> **High-Yield Question:** What are the two fundamental techniques used in software engineering to tackle complexity? Explain with appropriate examples.

## Quick Revision
- Complexity $\\propto \\text{Interactions}^2$.
- Abstraction: Suppress irrelevant detail at each layer.
- Decomposition: Divide and conquer with minimal cross-module coupling.

## Practice Questions
1. **Define Abstraction and give a real-world software example.**
2. **How does poor decomposition lead to high software maintenance costs?**
"""),
                ("topic-03-software-evolution", "Evolution of Software Design Methodologies & The Software Crisis", """# Evolution of Software Design Methodologies & The Software Crisis

## What You Will Learn
- The historical evolution of programming methodologies from exploratory to object-oriented.
- What caused the **Software Crisis** in the late 1960s and early 1970s.
- Key shifts: Exploratory $\\rightarrow$ Control Flow-Oriented $\\rightarrow$ Data Structure-Oriented $\\rightarrow$ Data Flow-Oriented (SA/SD) $\\rightarrow$ Object-Oriented Design (OOD).

## Core Concept
As hardware computing power escalated rapidly in the 1960s, software projects grew massive. The unstructured "exploratory" programming style produced unmaintainable "spaghetti code", skyrocketing project costs, catastrophic delivery delays, and frequent system crashes—a phenomenon known as the **Software Crisis**.

## Detailed Explanation
### Evolution of Software Development Paradigms
1. **Exploratory Programming (1950s-1960s)**:
   - "Build and fix" style with no formal specification or design.
   - Heavy use of arbitrary `GOTO` jumps.
   - High dependency on the original author's memory; impossible for others to debug or maintain.
2. **Control Flow-Oriented Design (Early 1970s)**:
   - Introduced **Structured Programming** (Dijkstra, Mills).
   - Eliminated arbitrary `GOTO`s; restricted control to Sequence, Selection (`if-else`), and Iteration (`while/for`).
   - Programs modeled as single-entry, single-exit Control Flow Graphs (CFG).
3. **Data Structure-Oriented Design (Late 1970s)**:
   - Methodologies like Jackson Structured Programming (JSP) and Warnier-Orr diagrams.
   - Derived program structure directly from input/output data structure hierarchies.
4. **Data Flow-Oriented Design / SA-SD (1980s)**:
   - Structured Analysis and Structured Design (DeMarco, Yourdon, Constantine).
   - Modeled system as a network of data transformations via **Data Flow Diagrams (DFD)** and **Structure Charts**.
5. **Object-Oriented Design / OOD (1990s-Present)**:
   - Unifies data and functions into cohesive **Objects** and **Classes**.
   - Employs Encapsulation, Inheritance, and Polymorphism to maximize reuse and maintainability.

## Important Terms
- **Software Crisis**: The inability of software organizations to deliver working software within estimated budget, planned schedule, and acceptable reliability levels.
- **Spaghetti Code**: Unstructured, heavily tangled code caused by indiscriminate `GOTO` statements where execution paths are nearly impossible to trace.

## Comparison Table: Evolution of Programming Methodologies

| Paradigm | Era | Key Representation | Primary Strength | Major Limitation |
| :--- | :--- | :--- | :--- | :--- |
| **Exploratory** | 1950s-60s | Ad-hoc code | Quick for tiny scripts | Unmaintainable at scale |
| **Control Flow** | Early 1970s | Flowcharts, CFG | Structured logic, no `GOTO` | Weak data modeling |
| **Data Structure** | Late 1970s | JSP, Warnier-Orr | Strong for batch/file processing | Poor for real-time/interactive |
| **Data Flow (SA/SD)** | 1980s | DFD, Structure Charts | Excellent functional decomposition | High data-function separation |
| **Object-Oriented** | 1990s+ | UML Class/Sequence diagrams | Modularity, encapsulation, reuse | Higher initial design overhead |

## Exam Focus
> **Frequently Asked Question (5 Marks):** What was the Software Crisis? Describe the technological breakthroughs and methodological shifts that helped overcome it.

## Quick Revision
- Software Crisis = Escalating hardware power + Unstructured coding $\\rightarrow$ Project failures, high maintenance costs.
- Solution: Structured programming $\\rightarrow$ SA/SD (DFDs) $\\rightarrow$ Object-Oriented modeling (UML).

## Practice Questions
1. **Why does structured programming forbid arbitrary `GOTO` statements?**
2. **Compare Data Flow-Oriented design with Object-Oriented design.**
""")
            ]
        },
        {
            "num": 2,
            "id": "module-02",
            "title": "Software Life Cycle Models",
            "overview": """# Module 2: Software Life Cycle Models

## What You Will Learn
- What a Software Development Life Cycle (SDLC) model is and why entry/exit criteria matter.
- Classical Waterfall Model: Phases, advantages, and why it is an idealistic reference model.
- Iterative Waterfall Model: Feedback loops and phase containment of errors.
- Prototyping Model: Handling ambiguous customer requirements and throwaway prototypes.
- Evolutionary (Incremental) Model: Delivering core functionality first and progressive increments.
- Spiral Model (Boehm's Meta-Model): Risk handling in four quadrants and why it is a meta-model.
- Comparative selection criteria: Which SDLC model to choose for a given project scenario.

## Module Summary
An SDLC model is an abstract framework defining the phases, sequence of activities, deliverables, and transition criteria throughout a software product's life. Following a life cycle model ensures visibility, systematic defect detection, phase containment, and budget control.
""",
            "topics": [
                ("topic-01-waterfall-models", "Classical & Iterative Waterfall Models", """# Classical & Iterative Waterfall Models

## What You Will Learn
- The exact phase sequence of the Classical Waterfall Model.
- Why Classical Waterfall is an idealistic model (no feedback loops).
- How the **Iterative Waterfall Model** introduces feedback loops for practical development.
- The critical concept of **Phase Containment of Errors**.

## Core Concept
The Waterfall model divides software development into sequential linear phases: Feasibility Study $\\rightarrow$ Requirements Analysis & Specification $\\rightarrow$ Design $\\rightarrow$ Coding & Unit Testing $\\rightarrow$ Integration & System Testing $\\rightarrow$ Maintenance.

## Detailed Explanation
### Classical Waterfall Model (Theoretical / Idealistic)
- Strict linear progression: A phase can only start when the preceding phase is 100% complete and signed off.
- **Fatal Flaw**: Assumes zero errors are made during early phases. In reality, human engineers commit errors in every phase, and customer requirements evolve.

### Iterative Waterfall Model (Practical)
- Introduces **feedback paths** between adjacent phases.
- If an error is detected in testing, feedback is sent back to design or requirements to fix the defect at its root.

### Phase Containment of Errors
The cost of fixing a defect increases exponentially the later it is discovered:
- A requirements defect detected during requirements phase costs **1x**.
- The same defect detected during system testing costs **10x**.
- The same defect discovered post-deployment during maintenance costs **100x**.
- **Phase containment** requires rigorous verification (reviews, inspections) at the end of every phase before moving to the next.

## Diagram: Iterative Waterfall Model
```
[ Feasibility Study ]
         |
         v
[ Requirements Analysis & Spec (SRS) ] <----+
         |                                  |
         v                                  | Feedback
[ Design (High-level & Detailed) ] <----+   | Loops
         |                              |   |
         v                              |   |
[ Coding & Unit Testing ] <---------+   |   |
         |                          |   |   |
         v                          |   |   |
[ Integration & System Testing ] ---+---+---+
         |
         v
[ Maintenance (60% of Total Cost!) ]
```

## Comparison: Classical vs Iterative Waterfall

| Parameter | Classical Waterfall | Iterative Waterfall |
| :--- | :--- | :--- |
| **Feedback Paths** | None (purely forward) | Supported between adjacent phases |
| **Real-world Use** | Theoretical reference only | Widely used for well-understood projects |
| **Risk Handling** | Poor | Moderate |
| **Customer Feedback** | Only at delivery | Phase deliverables reviewed, but product seen late |

## Exam Focus
> **Exam Question (5 Marks):** What is phase containment of errors? Why is the classical waterfall model called an idealistic model? Draw the schematic diagram of iterative waterfall model.

## Quick Revision
- Feasibility $\\rightarrow$ SRS $\\rightarrow$ Design $\\rightarrow$ Code $\\rightarrow$ Test $\\rightarrow$ Maintain.
- Maintenance is the longest and most expensive phase (~60% of lifecycle cost).
- Phase containment: Catch bugs in the phase they originate to avoid 10x-100x cost explosion.

## Practice Questions
1. **Why does Classical Waterfall not support feedback paths?**
2. **Calculate the relative cost impact of a missed requirement found during maintenance versus during SRS review.**
"""),
                ("topic-02-prototyping-evolutionary", "Prototyping & Evolutionary (Incremental) Life Cycle Models", """# Prototyping & Evolutionary (Incremental) Life Cycle Models

## What You Will Learn
- When and why to build a software prototype.
- Throwaway (Throw-It-Away) prototyping vs Evolutionary prototyping.
- How the Evolutionary / Incremental model delivers working software in iterations.
- Advantages of incremental delivery in reducing customer trauma and organizational inertia.

## Core Concept
When customer requirements are vague, ambiguous, or poorly understood, building a rapid **Throwaway Prototype** helps elicit and refine requirements. The **Evolutionary Model** builds the core system first and delivers progressive functional increments over time.

## Detailed Explanation
### Prototyping Model
1. **Rapid Prototype Construction**: A "toy" implementation focusing exclusively on user interfaces and high-level workflow (often with dummy backends).
2. **Customer Evaluation**: The customer experiments with the prototype and provides concrete feedback.
3. **SRS Refinement**: Real requirements are documented based on user feedback.
4. **Discarding Prototype**: The prototype is thrown away; the actual production system is engineered properly using structured methods.

### Evolutionary (Incremental) Model
- The system is broken down into functional increments.
- Increment 1 contains core capabilities; Increment 2 adds secondary features; Increment 3 adds advanced features.
- Each increment goes through a full mini-waterfall lifecycle and is deployed to production.

### Benefits of Evolutionary Model
- **Early Value Realization**: Customers get usable software early.
- **Reduces Customer Trauma**: Staff adapt to a new system gradually rather than facing a massive "big-bang" changeover.
- **Risk Reduction**: Market feedback informs subsequent increments.

## Diagram: Prototyping Model
```
[ Initial Requirements Gathering ]
              |
              v
[ Quick Design & Rapid Prototype ] <------+ User
              |                           | Feedback
              v                           | Loop
[ Customer Evaluation of Prototype ] -----+
              |
              v (Requirements Clarified)
[ Formal SRS Documentation ]
              |
              v
[ Full Engineering Development (Design -> Code -> Test) ]
```

## Exam Focus
> **High-Yield Question (5 Marks):** Differentiate between Prototyping Model and Evolutionary Life Cycle Model. Under what circumstances is each model preferred?

## Quick Revision
- Prototyping: Best for unclear GUI/requirements; prototype is discarded after SRS completion.
- Evolutionary: Best for large systems where early release of core modules is valuable.
- Reduces user shock and spreads capital expenditure.

## Practice Questions
1. **Why should throwaway prototypes not be converted directly into the final production software?**
2. **Give two scenarios where the Evolutionary model is superior to the Waterfall model.**
"""),
                ("topic-03-spiral-model", "Boehm's Spiral Model & Model Selection Framework", """# Boehm's Spiral Model & Model Selection Framework

## What You Will Learn
- The four quadrants of Boehm's Spiral Model.
- Why the Spiral Model is called a **Meta-Model**.
- Risk analysis and mitigation as an explicit, built-in phase.
- Systematic criteria for selecting the appropriate SDLC model for any real-world project.

## Core Concept
Proposed by Barry Boehm, the **Spiral Model** combines the iterative nature of prototyping with the controlled, systematic aspects of the waterfall model, anchored by explicit **Risk Analysis** in every cycle. It is called a **meta-model** because it encompasses and can emulate other lifecycle models.

## Detailed Explanation
### The 4 Quadrants of the Spiral Model
Each cycle (loop) of the spiral proceeds clockwise through four distinct quadrants:

1. **Quadrant 1 (Top-Left): Objective Setting & Alternative Identification**
   - Identify phase objectives (performance, functionality, cost).
   - Identify alternative implementation strategies and design constraints.

2. **Quadrant 2 (Top-Right): Risk Assessment & Resolution**
   - Evaluate all technical and management risks (e.g., hardware unreliability, performance bottlenecks, team skill gaps).
   - Resolve risks using prototyping, simulation, benchmarking, or user questionnaires.

3. **Quadrant 3 (Bottom-Right): Development & Next-Level Product Verification**
   - Develop the deliverable for this cycle (e.g., Detailed Design, Code, Integration).
   - Verify that the artifact satisfies requirements.

4. **Quadrant 4 (Bottom-Left): Review & Planning for Next Phase**
   - Review results with the customer.
   - Plan the next spiral loop, update budget, and allocate resources.

### Why is Spiral a "Meta-Model"?
- A single-loop spiral with zero risk corresponds to the Classical Waterfall model.
- A spiral that iterates extensively on UI in early loops acts as the Prototyping model.
- A spiral that releases working increments in successive outer loops acts as the Evolutionary model.

## Diagram: The 4 Quadrants of Boehm's Spiral Model
```
            Quadrant 1: Determine Objectives,         Quadrant 2: Evaluate Alternatives,
            Alternatives & Constraints                Identify & Resolve Risks
                                    |
                                    |     /--- (Risk Analysis) ---\
                         Cumulative |    /                         \
                           Cost     |   |   Prototype 1             |
                                    |   |     Prototype 2           |
            ------------------------+-------------------------------+--------------------->
                                    |   |                           |    Progress /
                                    |   |   SRS      Design         |    Review
                                    |    \          Code    Test   /
                                    |     \-----------------------/
            Quadrant 4: Plan Next   |         Quadrant 3: Develop &
            Phases & Review         |         Verify Next-Level Product
```

## SDLC Model Selection Decision Matrix

| Project Characteristic | Recommended SDLC Model | Justification |
| :--- | :--- | :--- |
| **Requirements fully understood, stable, no risks** | Iterative Waterfall | Predictable milestones, structured governance |
| **Unclear user interfaces / ambiguous requirements** | Prototyping Model | Rapid feedback clarifies SRS |
| **Large, core system needed early, incremental funding** | Evolutionary / Incremental | Early ROI, manageable change |
| **High technical risk, experimental tech, massive budget** | Spiral Model | Explicit risk assessment in every loop |

## Exam Focus
> **High-Yield Question (5-8 Marks):** Explain Boehm's Spiral Model with a neat 4-quadrant diagram. Why is it called a meta-model?

## Quick Revision
- Spiral = Iterative + Waterfall + Risk Analysis.
- 4 Quadrants: 1. Objectives $\\rightarrow$ 2. Risk Assessment $\\rightarrow$ 3. Develop & Verify $\\rightarrow$ 4. Plan Next Cycle.
- Radial distance = Cumulative cost; Angular dimension = Progress made in the phase.

## Practice Questions
1. **Explain the role of risk management in the Spiral model.**
2. **If a project has zero technical and managerial risk, what does the Spiral model reduce to?**
""")
            ]
        }
    ]

    # Write all modules to content/
    for mod in modules:
        m_dir = f"content/{mod['id']}"
        os.makedirs(m_dir, exist_ok=True)
        with open(os.path.join(m_dir, "overview.md"), "w", encoding="utf-8") as f:
            f.write(mod["overview"])
        for slug, title, body in mod["topics"]:
            with open(os.path.join(m_dir, f"{slug}.md"), "w", encoding="utf-8") as f:
                f.write(body)

    print("Populated Module 01 and Module 02.")

if __name__ == '__main__':
    generate_all_modules()
