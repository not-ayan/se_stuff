import os

def update_deep_notes():
    print("Updating deep notes with image embeds, mathematical proofs, and exhaustive lecture notes...")

    # 1. Module 1: Intro & Structured Programming
    mod1 = """# Module 1: Introduction to Software Engineering & Structured Programming
*Authors & References: Dr. Rajib Mall (IIT Kharagpur CSE Curriculum) & Prof. Swarup Roy*

---

## 1. Scope, Necessity & Foundational Concepts

### 1.1 What is Software Engineering?
Software engineering is an **engineering discipline** that applies systematic, disciplined, and quantifiable approaches to the development, operation, and maintenance of software.
> **Formal Definition (IEEE / Rajib Mall):** Software engineering is a systematic collection of past software engineering experience arranged in the form of methodologies, principles, processes, and guidelines.

While a small "toy" script can be written using intuition and informal ad-hoc programming, developing large commercial software products makes software engineering principles **indispensable** to achieve high quality, cost-effectiveness, and long-term maintainability.

### 1.2 The Building Construction Analogy
The difference between small programming and industrial software development is best understood through the civil engineering analogy:
* **Building a Small Garden Wall**: A person can construct a small brick wall in their backyard using common sense, bricks, and mortar. The builder does not need knowledge of soil mechanics, structural load analysis, or formal blueprints. If a brick is misaligned, it can be patched quickly.
* **Building a 60-Story Skyscraper**: Using intuition to construct a multistoried skyscraper leads to catastrophic structural collapse. Constructing a skyscraper requires:
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
$$\\text{Potential Interactions} = \\frac{N(N - 1)}{2} \\approx O(N^2)$$
As $N$ grows from $100$ to $10,000$, potential interactions jump from $\\approx 4,950$ to $\\approx 49,995,000$. This causes immediate cognitive overload for human engineers.

### 2.3 Two Fundamental Problem-Solving Techniques
Software engineering tackles exponential complexity using two primary psychological and technical mechanisms:

#### 1. Abstraction
* **Definition**: Simplifying a problem by omitting irrelevant low-level details and focusing exclusively on aspects relevant to the current objective.
* **Mechanism**: Human working memory can hold approximately $7 \\pm 2$ chunks of information simultaneously (Miller's Law). Abstraction encapsulates lower-level mechanics into higher-level conceptual modules.
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
 100% | \\                                      .--- Software Cost (> 85% of total budget)
      |  \\                                 _.-'
      |   \\                            _.-'
      |    \\                       _.-'
      |     \\                 _.-'
      |      \\            _.-'
   0% |       '-------'------------------------------> Hardware Cost (< 15% of total budget)
     1960    1970    1980    1990    2000    Present
```

### 3.2 Five Major Symptoms of the Software Crisis
1. **Escalating Costs**: Software development and maintenance started consuming up to $85-90\\%$ of total IT budgets.
2. **Chronic Schedule Slippage & Budget Overruns**: Projects were consistently delivered months or years late, or cancelled entirely.
3. **Low Reliability & Catastrophic Crashes**: Systems frequently failed in production under operational load.
4. **Failure to Meet User Requirements**: Delivered software often failed to solve what the client actually required due to poor requirements elicitation.
5. **Software Maintenance Nightmare**: Modifying or debugging delivered code was nearly impossible because of unstructured "spaghetti code".

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
       |                    /       \\                      |     | True       | False
       v              True /         \\ False               |     v            |
    [ S2 ]                v           v                    |   [ S ]          |
       |               [ S1 ]       [ S2 ]                 +-----+            |
       v                  \\           /                                       v
   [ Exit ]                v         v                                    [ Exit ]
                          [   Exit   ]
```

---

## 6. Exam Tips, Common Traps & Practice Questions

> [!IMPORTANT]
> **High-Yield Exam Points:**
> * Always mention the **Building Wall vs Skyscraper** analogy when asked why small programs differ from software products.
> * The formula $\\text{Interactions} = \\frac{N(N-1)}{2}$ mathematically proves exponential complexity growth.
> * The three constructs of structured programming: **Sequence, Selection, Iteration** (all single-entry, single-exit).
> * The 1968 NATO conference and Dijkstra's *"GOTO Considered Harmful"* paper mark the birth of modern Software Engineering.

### 5-Mark Practice Questions
1. **Explain the Software Crisis. Describe the technological breakthroughs and methodological shifts that helped overcome it.**
2. **Differentiate between Abstraction and Decomposition. Why does random decomposition fail to reduce program complexity?**
3. **Why does software maintenance consume a significantly higher percentage of the budget than the initial development phase?**
"""

    with open("notes_md/module_01_intro_and_structured_programming.md", "w", encoding="utf-8") as f:
        f.write(mod1)

    # 2. Module 2: SDLC Models with Image Embed
    mod2 = """# Module 2: Software Life Cycle Models (SDLC)
*Authors & References: Dr. Rajib Mall (IIT Kharagpur CSE Curriculum) & Prof. Swarup Roy*

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

---

## 2. Visual Architecture: Iterative Waterfall vs. Boehm's Spiral Model

![SDLC Models Infographic](/images/sdlc_models_infographic.jpg)

---

## 3. Classical Waterfall Model (The Idealistic Baseline)

### 3.1 Characteristics
* Purely **linear sequential model**. A phase begins only after the preceding phase is completely finished and approved.
* **No Feedback Paths**: Assumes that human engineers make zero errors in any phase, and that customer requirements remain $100\\%$ frozen.

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

### 3.2 Why Classical Waterfall is an Idealistic Model
In practical real-world engineering:
1. Human engineers commit errors in every phase (misunderstood requirements, bad design choices, coding bugs).
2. Customer requirements evolve dynamically over time.
3. Because Classical Waterfall forbids feedback loops, defects discovered late (e.g. during system testing) cannot be traced back and resolved at the requirements or design level within the model's rules.
4. Therefore, Classical Waterfall is an **idealized reference framework** rather than a practical development model.

---

## 4. Iterative Waterfall Model & Phase Containment

### 4.1 Feedback Loops in Iterative Waterfall
The **Iterative Waterfall Model** provides practical realism by introducing **feedback paths** between adjacent phases.
* When testing reveals a design flaw, feedback is provided to the design phase to update blueprints and code.
* When design exposes an ambiguous requirement, feedback is provided to the requirements phase.

### 4.2 Phase Containment of Errors (Boehm's Cost Law)
> **The Principle of Phase Containment:** Defects must be detected and corrected in the **exact same phase** in which they are introduced.

#### Cost Escalation Curve
The cost to fix a defect grows **exponentially** the later it is discovered in the life cycle:
* **Requirements Phase**: $\$1$ (Simple text edit in SRS).
* **Design Phase**: $\$5$ (Update architecture and interface definitions).
* **Coding Phase**: $\$10$ (Rewrite module code).
* **System Testing Phase**: $\$50$ (Re-integrate, re-run test suites, update docs).
* **Maintenance / Post-Release**: $\$100 - \$200+$ (Emergency field patches, data corruption fixes, legal liability, customer churn).

---

## 5. Prototyping Model

### 5.1 When is Prototyping Required?
When the customer cannot clearly state their requirements, or when the user interface and system workflow are completely novel and ambiguous.

### 5.2 Step-by-Step Prototyping Process
1. **Requirements Gathering**: Collect initial high-level user goals.
2. **Quick Design & Prototype Construction**: Build a rapid, lightweight "toy" system (focusing exclusively on UI and input/output screens, using mock databases).
3. **Customer Evaluation**: The customer interacts hands-on with the working prototype and provides concrete feedback.
4. **SRS Refinement**: Customer feedback is translated into an accurate, complete, and verifiable SRS document.
5. **Throw Away the Prototype**: The prototype is discarded.
6. **Full Engineering**: The actual production software is built from scratch using structured methods and rigorous architecture.

---

## 6. Evolutionary (Incremental) Model

### 6.1 Architecture & Process
Instead of delivering the entire software in one giant "big-bang" release, the system is broken down into **functional increments**:
* **Increment 1 (Core Kernel)**: The foundational business logic and high-priority features are designed, coded, tested, and deployed to actual users.
* **Increment 2**: Secondary features are engineered and integrated into the deployed core.
* **Increment 3**: Advanced and tertiary features are added.

### 6.2 Key Advantages
1. **Early Value Realization**: Customers receive working, usable software early.
2. **Reduces Customer Trauma**: Staff and organizations adapt to a new system gradually rather than facing a massive, destabilizing sudden changeover.
3. **Market Feedback**: Real-world usage of early increments directly informs the refinement of future increments.

---

## 7. Boehm's Spiral Model (The Meta-Model)

### 7.1 Why is it a "Meta-Model"?
Proposed by **Barry Boehm**, the Spiral Model is called a **meta-model** because it can accommodate and emulate all other SDLC models:
* A single spiral loop with zero risk acts as the **Classical Waterfall model**.
* A spiral that focuses heavily on UI prototyping in early loops acts as the **Prototyping model**.
* A spiral that delivers working versions at the end of each loop acts as the **Evolutionary model**.

### 7.2 The 4 Quadrants of Each Spiral Loop
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

---

## 8. SDLC Model Selection Matrix

| Project Characteristic | Recommended Model | Technical Justification |
| :--- | :--- | :--- |
| **Well-understood requirements, mature domain, strict milestones** | Iterative Waterfall | Predictable linear governance, simple tracking |
| **Ambiguous requirements, new GUI, high customer uncertainty** | Prototyping Model | Rapid prototypes elicit accurate customer feedback |
| **Large system, core features needed quickly, iterative budget** | Evolutionary Model | Early ROI, incremental user adoption, manageable risk |
| **High technical risk, experimental technology, large enterprise budget** | Spiral Model | Explicit risk analysis and mitigation in every loop |

---

## 9. Practice Questions & Exam Tips

### Practice Questions (5-8 Marks)
1. **Explain Boehm's Spiral Model with a neat diagram. Why is it called a meta-model?**
2. **What is Phase Containment of Errors? Explain the economic justification for performing thorough SRS and design reviews.**
3. **Compare and contrast the Prototyping Model with the Evolutionary Model.**
"""

    with open("notes_md/module_02_life_cycle_models.md", "w", encoding="utf-8") as f:
        f.write(mod2)

    # 3. Module 4 & 5: Design, Cohesion, Coupling & DFD Theory with Image Embeds
    mod4 = """# Module 4 & 5: Software Design, Modularity, Cohesion, Coupling & DFD Theory
*Authors & References: Dr. Rajib Mall (IIT Kharagpur CSE Curriculum) & Prof. Swarup Roy*

---

## 1. Visual Overview: Cohesion Ladder vs. Coupling Scale

![Cohesion and Coupling Infographic](/images/cohesion_coupling_diagram.jpg)

---

## 2. Cohesion (Internal Module Strength)

> **Definition:** Cohesion is a measure of the internal functional strength of a module—the degree to which all elements inside a single module belong together and perform a single dedicated task.

### The 7 Levels of Cohesion (Ranked from WORST to BEST)

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

## 3. Coupling (Inter-Module Interdependence)

> **Definition:** Coupling is a measure of the degree of interdependence between two software modules. High coupling makes code fragile; changing one module breaks others.

### The 6 Levels of Coupling (Ranked from BEST to WORST)

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

## 4. Visual Overview: DFD Grammar & Decomposition Rules

![DFD Symbols and Rules Infographic](/images/dfd_symbols_and_rules.jpg)

---

## 5. Data Flow Diagrams (DFD) — Formal Grammar & Rules

### 5.1 The 4 Standard Symbols
1. **Process / Bubble (Circle)**: Transforms incoming data into outgoing data. Labeled with an active verb-noun phrase.
2. **External Entity / Source & Sink (Rectangle)**: Actors, external devices, or external organizations residing strictly **outside** the system boundary.
3. **Data Store (Two parallel lines / open rectangle)**: Data at rest (files, database tables, buffers).
4. **Data Flow (Directed Arrow)**: Data in motion. Labeled with a meaningful noun.

---

### 5.2 The DFD Hierarchy: Levels 0, 1, and 2

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

### 5.3 The DFD Balancing Rule
> **The Fundamental Law of DFD Balancing:** All data flows entering and leaving a bubble at Level $N$ MUST strictly match the net external data flows entering and leaving its decomposed sub-diagram at Level $N+1$.

---

### 5.4 Illegal DFD Connections (Common Construction Errors)
* ❌ **Entity to Entity**: Data moving directly between two external actors (outside system scope).
* ❌ **Store to Store**: Direct data flow between two databases without a processing function.
* ❌ **Entity to Store**: Direct data flow between an actor and a database without a validating process.
* ❌ **Black Hole**: A process bubble with input data flows but zero output data flows.
* ❌ **Miracle**: A process bubble with output data flows but zero input data flows.
* ❌ **Grey Hole**: A process bubble whose input data flows are insufficient to generate its declared outputs.

---

### 5.5 Data Dictionary Grammar
* `+` : Composition / Sequence (AND).
* `[ | ]` : Selection / Choice (OR).
* `{ }` : Iteration / Repetition (0 or more).
* `( )` : Optional field.
* `* *` : Comment annotation.

```
Customer-Order = Customer-ID + Customer-Name + Delivery-Address + { Item-Details } + (Special-Instructions)
Item-Details   = Item-ID + Quantity + Unit-Price
Delivery-Address = Street + City + State + PIN-Code
Payment-Type   = [ Cash-On-Delivery | Credit-Card | Net-Banking | UPI ]
```

---

## 6. Practice Questions & Exam Tips

### Practice Questions (5-8 Marks)
1. **Explain the 7 levels of Cohesion with clear real-world examples for each level.**
2. **Explain the 6 levels of Coupling. Why is Content Coupling considered hazardous?**
3. **What is the DFD Balancing Rule? Give an example of a balanced vs unbalanced DFD.**
"""

    with open("notes_md/module_04_05_software_design_and_dfd.md", "w", encoding="utf-8") as f:
        f.write(mod4)

    print("Updated all markdown notes with image embeds and deep content.")

if __name__ == '__main__':
    update_deep_notes()
