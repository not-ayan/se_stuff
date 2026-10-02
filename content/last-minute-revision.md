# Last-Minute 30-Second Exam Revision Cheat Sheet
> **Exam Strategy:** Review these condensed definitions, formulas, and comparison matrices 2 hours before your exam.

---

## 1. Life Cycle Models Rapid Fire
- **Classical Waterfall**: Linear sequential, no feedback, idealistic reference model only.
- **Iterative Waterfall**: Adds feedback loops between adjacent phases; enforces **phase containment of errors** (catching bugs early saves 10x-100x cost).
- **Prototyping Model**: Build throwaway mockups to elicit ambiguous GUI/customer requirements. Discard prototype after SRS sign-off.
- **Evolutionary Model**: Incremental delivery. Core kernel first, successive functional increments reduce customer trauma.
- **Spiral Model (Boehm)**: Meta-model with explicit **Risk Analysis** in 4 quadrants (Objectives -> Risk -> Develop -> Plan).

---

## 2. Requirements & SRS (IEEE 830)
- **Role of System Analyst**: Elicits requirements from customers/users, resolves contradictions, produces verifiable SRS.
- **Good SRS Characteristics**: Concise, Complete, Consistent, Unambiguous, Verifiable, Modifiable, Traceable.
- **Decision Trees vs Decision Tables**: Trees give visual branching logic; Tables handle complex multi-condition combinatorial logic without missing cases.
- **Formal Specifications**: Axiomatic (Pre/Post conditions, Hoare triples $\{P\} S \{Q\}$) and Algebraic (Sorts, Operations, Equations).

---

## 3. Design: Cohesion & Coupling
- **Cohesion (Aim for HIGH, Functional)**:
  1. *Functional* (Best: does 1 single well-defined task)
  2. *Sequential* (Output of A is input to B)
  3. *Communicational* (Operates on same data structure)
  4. *Procedural* (Iterative/sequential loop order)
  5. *Temporal* (Executed at same time, e.g. startup)
  6. *Logical* (Related by category, e.g. all print routines in 1 switch)
  7. *Coincidental* (Worst: random grouped code)
- **Coupling (Aim for LOW, Data)**:
  1. *Data* (Best: simple primitive parameters passed)
  2. *Stamp* (Passes entire struct when only 1 field needed)
  3. *Control* (Passes a flag telling called function what to do)
  4. *Common* (Shared global variables)
  5. *Content* (Worst: one module modifies internal code/data of another)

---

## 4. DFD & Structured Design (SA/SD)
- **Symbols**: Process (Circle/Bubble), External Entity (Rectangle), Data Store (Open rectangle / parallel lines), Data Flow (Arrow).
- **Level 0 (Context Diagram)**: Entire system as exactly 1 bubble, surrounding external entities, high-level inputs/outputs. NO data stores.
- **Level 1**: Decompose into 3-7 primary candidate functional bubbles + Data stores.
- **Level 2**: Decomposes complex Level 1 bubbles.
- **Balancing Rule**: Net inputs/outputs of a bubble at Level $N$ MUST strictly equal the net inputs/outputs of its decomposed diagram at Level $N+1$.
- **Transform vs Transaction Analysis**: Transform has linear input-process-output; Transaction dispatches to distinct paths based on transaction tag.

---

## 5. Object Modeling & UML
- **Use Case**: Actor, Use Case (Ellipse), `<<include>>` (mandatory subflow), `<<extend>>` (optional/conditional subflow).
- **Class Relationships**:
  - *Association* (solid line: uses)
  - *Aggregation* (hollow diamond: has-a, independent lifecycle, e.g., Car and Wheel)
  - *Composition* (filled diamond: part-of, owned lifecycle, e.g., House and Room)
  - *Generalization* (hollow triangle: is-a inheritance)
  - *Dependency* (dashed arrow: temporary method parameter use)
- **Sequence Diagram**: Lifelines, synchronous messages (solid arrow), asynchronous (open arrow), reply (dashed arrow).

---

## 6. Testing & Quality Verification
- **Verification vs Validation**:
  - *Verification*: "Are we building the product right?" (Phase review, static inspection, no execution).
  - *Validation*: "Are we building the right product?" (Dynamic execution against SRS requirements).
- **Black-Box Testing**:
  - *Equivalence Class Partitioning*: Divide input domain into valid and invalid partitions; pick 1 test case per partition.
  - *Boundary Value Analysis (BVA)*: If range is $[a, b]$, test $\{a-1, a, a+1, b-1, b, b+1\}$.
- **White-Box Testing**:
  - *McCabe's Cyclomatic Complexity*:
    $$V(G) = E - N + 2P = P_{\text{nodes}} + 1 = \text{Number of Bounded Regions}$$
  - *Test Strength Order*: Path Coverage > Condition Coverage > Branch Coverage > Statement Coverage.
- **Integration Testing**: Top-Down (needs Stubs), Bottom-Up (needs Drivers), Big-Bang (chaos), Sandwich (combined).
- **System Testing**: Smoke, Performance, Stress/Endurance, Alpha (at developer site by users), Beta (at customer site), Acceptance.

---

## 7. Estimation & Project Management
- **COCOMO I (Basic)**:
  - *Organic* ($<50$ KLOC): $\text{Effort} = 2.4(KLOC)^{1.05}$, $\text{Tdev} = 2.5(\text{Effort})^{0.38}$
  - *Semi-detached* ($50-300$ KLOC): $\text{Effort} = 3.0(KLOC)^{1.12}$, $\text{Tdev} = 2.5(\text{Effort})^{0.35}$
  - *Embedded* ($>300$ KLOC / strict hardware): $\text{Effort} = 3.6(KLOC)^{1.20}$, $\text{Tdev} = 2.5(\text{Effort})^{0.32}$
- **Function Point Analysis (FPA)**:
  $$UFP = \sum (\text{Count} \times \text{Weight}), \quad VAF = 0.65 + 0.01 \sum_{i=1}^{14} F_i, \quad FP = UFP \times VAF$$
- **Halstead's Volume**:
  $$N = N_1 + N_2, \quad \eta = \eta_1 + \eta_2, \quad V = N \log_2 \eta$$
- **Reliability Metrics**:
  $$MTBF = MTTF + MTTR, \quad \text{Availability} = \frac{MTTF}{MTTF + MTTR}$$
- **SEI CMM 5 Levels**:
  1. *Initial* (Ad-hoc, chaotic)
  2. *Repeatable* (Project-level tracking, SCM, QA)
  3. *Defined* (Organization-wide standard processes)
  4. *Managed* (Quantitative process metrics, statistical process control)
  5. *Optimizing* (Continuous defect prevention and process innovation)
