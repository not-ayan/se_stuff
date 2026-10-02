# Module 10: Coding, Testing & Quality Verification
*Author: Swarup Roy / Dr. Rajib Mall (IIT Kharagpur CSE Curriculum)*

---

## 1. Coding Standards, Guidelines & Code Review

### 1.1 Coding Standards vs. Guidelines
- **Coding Standards**: Strict organizational rules that *must* be followed by all engineers (e.g., rules for global variable usage, standard module header format, variable naming conventions).
- **Coding Guidelines**: Recommended best practices to enhance comprehensibility and maintainability (e.g., avoid cryptic clever coding, keep function length $\le 10$ lines, maintain $\ge 1$ comment line per 3 code lines, avoid obscure side effects).

### 1.2 Internal vs. External Documentation
- **Internal Documentation**: Code-level features embedded directly in the source code:
  - **Meaningful variable names** (*proven by empirical studies to be the single most effective internal documentation!*).
  - Module/function header banners (author, date, synopsis, inputs/outputs, globals modified).
  - Thoughtful comments explaining non-obvious logic (avoid useless comments like `a = 10; /* a made 10 */`).
- **External Documentation**: Formal documents delivered across the lifecycle: SRS, Architectural Design Document, Test Plan & Test Suite Reports, User Manuals, Installation Guides.

### 1.3 Code Reviews: Walkthroughs vs. Inspections
Carried out *after* clean compilation but *before* integration/testing:
- **Code Walkthrough (Informal)**:
  - Team of 3 to 7 peers.
  - Reviewers hand-simulate execution with selected test cases.
  - Focuses on discovering logical and algorithmic flaws.
  - **Golden Rule**: Managers must *not* attend (to maintain non-evaluative psychological safety). Focus is on *finding* errors, not fixing them.
- **Code Inspection (Formal)**:
  - Systematically audits code against a checklist of commonly made programming errors and coding standard violations.
  - *Classic Error Checklist*: Uninitialized variables, array index out of bounds, jumps into loops, non-terminating loops, incompatible assignments, memory allocation/leak issues, formal vs. actual parameter mismatches.

### 1.4 Cleanroom Testing (IBM Methodology)
- **Goal**: Zero-defect software.
- Analogy to semiconductor cleanrooms: eliminate impurities before manufacturing.
- **Key Characteristics**:
  1. Formal mathematical specification (state-transition models).
  2. Incremental development.
  3. Structured programming with stepwise refinement.
  4. **Static Verification**: Replaces traditional unit testing completely with rigorous formal inspection and mathematical verification. *No unit execution testing by programmers!*
  5. **Statistical Testing**: Integrated increments are tested against user operational profiles to measure reliability.

---

## 2. Software Testing Fundamentals

### 2.1 Essential Terminology
- **Error (Defect / Bug)**: A flaw in requirements, design, or source code.
- **Failure**: A dynamic manifestation of an error during execution (system deviates from expected behavior). Testing directly detects *failures*, which are then debugged to locate the underlying *errors*.
- **Test Case**: A triplet $[I, S, O]$:
  - $I$: Input data to the system.
  - $S$: State of the system prior to input.
  - $O$: Expected output or state transformation.
- **Test Suite**: A systematically curated set of test cases designed to test a product.

### 2.2 Verification vs. Validation
- **Verification**: *"Are we building the product right?"* Ensures the output of one phase conforms to its input specification from the previous phase (concerned with **phase containment of errors**).
- **Validation**: *"Are we building the right product?"* Ensures the fully integrated, delivered software satisfies the customer's actual requirements in the SRS.

---

## 3. Black-Box Testing (Functional Testing)

Test cases are derived solely from requirements and functional specifications without knowledge of internal code structure.

### 3.1 Equivalence Class Partitioning (ECP)
- Partitions the input domain into disjoint equivalence classes where program behavior is assumed identical.
- Testing any single value from a class is representative of all values in that class.
- **Guidelines**:
  - Input range $[a, b] \implies 1$ valid class ($a \le x \le b$) and $2$ invalid classes ($x < a$, $x > b$).
  - Discrete sets $\implies 1$ valid class, $1$ invalid class.
- *Example (Square Root for [0, 5000])*:
  - Valid: $\{500\}$; Invalid: $\{-5, 6000\}$.

### 3.2 Boundary Value Analysis (BVA)
- Programmers frequently commit off-by-one errors at boundaries due to psychological slips ($<$ vs $\le$).
- Tests values at the edges: minimum, just above minimum, nominal, just below maximum, maximum, and out-of-bound edge values.
- *Example for [0, 5000]*: Test inputs $\{-1, 0, 1, 4999, 5000, 5001\}$.

---

## 4. White-Box Testing (Structural Testing)

Test cases are designed with full knowledge of the source code and control structure.

### 4.1 Coverage Hierarchy & Strength
$$\text{Condition Coverage} \implies \text{Branch / Edge Coverage} \implies \text{Statement Coverage}$$
- **Stronger Testing**: Strategy $A$ is stronger than $B$ if all errors detected by $B$ are also detected by $A$, and $A$ detects additional error classes.
- **Complementary Testing**: Strategies $A$ and $B$ detect disjoint classes of errors.
- **Condition Coverage**: For an expression with $n$ boolean variables, requires $2^n$ test cases.

### 4.2 Control Flow Graph (CFG) & Cyclomatic Complexity
Statements form nodes; control transitions form directed edges.

#### McCabe's Cyclomatic Complexity Metric $V(G)$
Defines the upper bound for the number of linearly independent paths. Three equivalent calculation methods:
1. **Method 1 (Graph Theoretic)**:
   $$V(G) = E - N + 2$$
   ($E$ = edges, $N$ = nodes).
2. **Method 2 (Planar Regions)**:
   $$V(G) = \text{Bounded Areas} + 1$$
3. **Method 3 (Predicate Nodes)**:
   $$V(G) = P + 1$$
   ($P$ = number of decision / branching statements).

### 4.3 Data Flow Testing & DU Chains
- **$DEF(S)$**: Variables defined (assigned) at statement $S$.
- **$USES(S)$**: Variables read/used at statement $S$.
- **Definition-Use Chain (DU Chain) $[X, S, S']$**: Variable $X$ is defined at $S$, used at $S'$, and the definition remains *live* (not overwritten) along the path from $S$ to $S'$. Data flow testing requires covering every DU chain.

### 4.4 Mutation Testing
- Synthetically introduces minor syntactic mutations into the code (e.g., replacing `+` with `-`, `<` with `<=`).
- If a test case produces different output on the mutant, the mutant is **killed** (good!).
- If a mutant stays alive after all test cases run, the test suite is deficient and must be augmented.

---

## 5. Integration, System & Performance Testing

### 5.1 Integration Testing Approaches
1. **Big Bang**: All modules combined at once. Unmanageable error localization; only for tiny projects.
2. **Top-Down**: Starts from main routine; requires **Stubs** (dummy lower-level procedures with simplified table lookups). No drivers needed.
3. **Bottom-Up**: Starts from leaf modules; requires **Drivers** (test harness modules calling lower routines). No stubs needed.
4. **Mixed (Sandwich)**: Combines top-down and bottom-up; modules tested as they become available.
- **Incremental vs. Phased**: Incremental adds 1 module at a time (easiest bug localization); phased adds clusters of modules.

### 5.2 System Testing
- **Alpha Testing**: Internal testing by developers/QA in controlled environment.
- **Beta Testing**: Real-world field testing by friendly external users.
- **Acceptance Testing**: Final evaluation by the customer prior to contractual signoff.

### 5.3 Nine Essential Performance Tests (Non-Functional)
1. **Stress / Endurance Testing**: Evaluates behavior under abnormal overload beyond rated capacity (e.g., 5,000 simultaneous users).
2. **Volume Testing**: Stresses data structures (e.g., symbol table overflow on massive programs).
3. **Configuration Testing**: Verifies software across supported hardware and OS configurations.
4. **Compatibility Testing**: Verifies interfaces with external third-party software and databases.
5. **Regression Testing**: Re-executes test suites after bug fixes or code modifications to ensure existing features did not break.
6. **Recovery Testing**: Tests fault recovery after sudden power cuts, network disconnection, or disk pull.
7. **Maintenance Testing**: Validates diagnostic scripts and maintenance utilities.
8. **Documentation Testing**: Audits user manuals against actual software behavior.
9. **Usability Testing**: Evaluates UI ergonomics, accessibility, and navigation.

### 5.4 Error Seeding
Estimates remaining residual defects in code by injecting $S$ known seeded bugs:
$$\frac{n}{N} = \frac{s}{S} \implies N = \frac{S \times n}{s}$$
$$\text{Remaining Unseeded Defects} = N - n = \frac{n(S - s)}{s}$$
- $S$: Number of seeded defects.
- $s$: Number of seeded defects detected during testing.
- $n$: Number of natural (unseeded) defects detected.
- $N$: Total estimated natural defects.
