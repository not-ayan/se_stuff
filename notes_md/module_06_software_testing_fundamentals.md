# Module 6: Software Testing Fundamentals & Unit Testing

![Module 6: Software Testing Fundamentals & Unit Testing Harness](/images/testing_unit_harness.jpg)

---

# Part I — Testing Fundamentals

## 1. What is Software Testing?

### 1.1 The Classical Philosophy of Testing
In software engineering, testing is the process of executing a program with the deliberate intention of finding errors.

> **Glenford Myers' Maxim:**  
> *"Testing is not the process of showing that a program contains no errors. Rather, testing is the process of executing a program with the explicit intent of finding errors."*

A successful test case is **not** one that runs without failure; a successful test case is one that **uncovers a previously undiscovered defect**!

---

## 2. Core Terminology: Error vs. Fault/Defect vs. Failure

Examiners frequently test students on the precise IEEE definitions of these three interrelated terms:

```text
  HUMAN MISTAKE               SOURCE CODE FLAW              OBSERVED BEHAVIOR
┌────────────────┐           ┌─────────────────┐           ┌─────────────────┐
│     ERROR      │ ========> │  FAULT / DEFECT │ ========> │     FAILURE     │
│(Mental slip by │           │ (Static bug in  │           │(Dynamic deviation│
│  a developer)  │           │  the codebase)  │           │ during runtime) │
└────────────────┘           └─────────────────┘           └─────────────────┘
```

1. **Error (Human Mistake):**
   - An incorrect decision or action taken by a software engineer, designer, or programmer during development (e.g., misunderstanding a requirement, typing `<` instead of `<=`).
2. **Fault / Defect / Bug:**
   - The static manifestation of an error inside the software artifact (SRS document, design model, or source code). A fault sits dormant in the code until that particular instruction path is executed.
3. **Failure:**
   - A dynamic runtime deviation of the program’s observed output or behavior from its expected specification.
   - *Crucial Rule:* A fault does not necessarily result in a failure unless the faulty line of code is executed with input data that triggers the defective condition and propagates it to observable output!

---

## 3. Verification versus Validation (Boehm's Criterion)

One of the most famous and high-frequency university exam questions is the distinction between **Verification** and **Validation**:

```text
                  VERIFICATION vs. VALIDATION
                               │
         ┌─────────────────────┴─────────────────────┐
         ▼                                           ▼
   VERIFICATION                                 VALIDATION
 "Are we building the                         "Are we building the
    product RIGHT?"                              RIGHT product?"
```

| Dimension | Verification | Validation |
| :--- | :--- | :--- |
| **Barry Boehm's Question** | *"Are we building the product right?"* | *"Are we building the right product?"* |
| **Core Objective** | Checks whether the software conforms to the specification developed in the immediate preceding phase. | Checks whether the final software satisfies the customer's true operational needs and expectations. |
| **Activity Nature** | **Static analysis & reviews:** Inspections, walkthroughs, desk-checking, syntax validation, formal proofs. | **Dynamic execution:** Running executable test cases against the live software with actual input data. |
| **Execution Required?** | **No executable code needed.** Can verify requirements, architecture diagrams, and source code statically. | **Yes.** Requires executing compiled code to observe runtime behavior. |
| **Phase Scope** | Carried out continuously at every phase boundary of the SDLC. | Carried out primarily during integration, system, and user acceptance testing. |

---

## 4. Testing versus Debugging

Although often confused by novices, testing and debugging are two fundamentally different engineering activities:

| Attribute | Testing | Debugging |
| :--- | :--- | :--- |
| **Primary Goal** | To discover failures and expose the existence of dormant defects. | To locate the exact line/source of the defect and correct it in code. |
| **Starting State** | Begins with an unverified software module or build. | Begins *only* after a test case has produced a confirmed failure. |
| **Who Performs It?** | Software Quality Assurance (QA) engineers, testers, or developers. | The software developer who coded the module. |
| **Methodology** | Systematic, repeatable, guided by test plans, ECP, and BVA. | Heuristic, inductive/deductive reasoning, traceback, breakpoints. |
| **Outcome** | Test execution reports listing passed and failed test cases. | Source code modifications fixing the bug without introducing regressions. |

---

## 5. Testing in the Small vs. Testing in the Large

Software testing cannot be accomplished in one massive, chaotic step. Instead, it follows a structured bottom-up progression:

```text
               SYSTEM TESTING (Testing in the Large)
                     ▲
                     │
            INTEGRATION TESTING
                     ▲
                     │
               UNIT TESTING (Testing in the Small)
```

1. **Testing in the Small (Unit Testing):**
   - Testing individual components, procedures, or modules in strict isolation.
   - Performed immediately after coding and peer code review.
2. **Testing in the Large (Integration & System Testing):**
   - **Integration Testing:** Assembling individual unit-tested modules incrementally to detect interface errors, parameter mismatches, and data flow collisions.
   - **System Testing:** Testing the fully integrated, complete software product against the original SRS document (includes Alpha, Beta, Performance, and Acceptance testing).

---

# Part II — Unit Testing Fundamentals

## 6. What is Unit Testing?

> **Unit Testing (Module Testing):** The testing of different units or modules of a system in **complete isolation** from one another.

### 6.1 Why Isolate Modules During Unit Testing?
If we attempt to test multiple modules simultaneously without unit testing them first, isolating the root cause of any failure becomes a combinatorial nightmare. When an isolated module fails, we know with 100% certainty that the bug lies inside that specific module!

---

## 7. The Unit Test Environment: Drivers and Stubs

A single module under test (MUT) almost never exists in a vacuum. It interacts with the rest of the application:
1. It calls other subordinate procedures.
2. It accesses global or nonlocal data structures.
3. It expects to be called with specific parameters by superordinate routines.

When a module is ready for unit testing, the modules that call it and the modules it calls are usually **not yet coded or tested**. Therefore, special scaffolding programs must be built:

```text
                    ┌─────────────────────────┐
                    │      DRIVER MODULE      │  <── Simulates superordinate caller
                    │ (Generates test inputs) │      (passes parameters, logs output)
                    └────────────┬────────────┘
                                 │ Calls
                                 ▼
                    ┌─────────────────────────┐
                    │    MODULE UNDER TEST    │
                    │         (MUT)           │
                    └────────────┬────────────┘
                                 │ Calls
                                 ▼
                    ┌─────────────────────────┐
                    │       STUB MODULE       │  <── Simulates subordinate callee
                    │ (Dummy return / lookup) │      (returns hardcoded sample data)
                    └─────────────────────────┘
```

---

### 7.1 Driver Modules
- **Definition:** A **Driver** is a dummy main program or harness written specifically to test a module.
- **Responsibilities:**
  1. Initializes global data structures or variables required by the MUT.
  2. Invokes the module under test, passing carefully designed test case parameters.
  3. Captures the return values or side-effects and prints/validates them against expected outputs.

#### Example Driver (in TypeScript):
```typescript
// Driver for computeTaxRate(salary, age)
function runTaxDriver() {
  const testCases = [
    { salary: 250000, age: 30, expected: 0.05 },
    { salary: 600000, age: 65, expected: 0.10 },
  ];
  
  for (const tc of testCases) {
    const actual = computeTaxRate(tc.salary, tc.age);
    console.assert(actual === tc.expected, `FAILED for salary ${tc.salary}: got ${actual}`);
  }
}
```

---

### 7.2 Stub Modules
- **Definition:** A **Stub** is a dummy procedure that has the identical interface (parameters and return type) as a subordinate procedure called by the MUT, but contains a highly simplified implementation.
- **Responsibilities:**
  - Prevents compilation/runtime linking errors when subordinate modules are missing.
  - Returns hardcoded values, simple table lookups, or dummy acknowledgments so the MUT can continue executing.

#### Example Stub (in TypeScript):
```typescript
// Real database module is not ready yet; Stub returns mock credit score
function stubFetchCreditScore(customerId: string): number {
  // Simple table lookup stub
  if (customerId === "CUST-999") return 780;
  return 650; // Default simulated score
}
```

---

### 7.3 Comparison: Driver vs. Stub

| Feature | Driver Module | Stub Module |
| :--- | :--- | :--- |
| **Simulates** | Superordinate (Calling) module. | Subordinate (Called) module. |
| **Control Flow** | **Calls** the module under test. | **Is called by** the module under test. |
| **Direction** | Sits **above** the MUT. | Sits **below** the MUT. |
| **Functionality** | Passes test inputs, invokes MUT, verifies outputs. | Receives calls from MUT, returns dummy data/acknowledgment. |
| **Complexity** | Usually contains test harnesses and assertions. | Minimal, often a simple hardcoded return or lookup table. |

---

## 8. Basic Black-Box Test Case Design

How do we choose input values to unit test a module effectively without testing all infinite combinations?

### 8.1 Equivalence Class Partitioning (ECP)
The input domain is partitioned into a finite number of **equivalence classes** such that testing any single representative value from a class is assumed to yield the same program behavior as any other value in that class:
- **Valid Equivalence Classes:** Inputs that represent valid, legitimate values expected by the specification.
- **Invalid Equivalence Classes:** Inputs that represent illegal, boundary-violating, or error states.

### 8.2 Boundary Value Analysis (BVA)
Extensive programming experience shows that **most defects congregate at the boundaries of input ranges** (e.g., off-by-one errors like `<` instead of `<=`).
- For an input variable restricted to the range $[a, b]$, BVA prescribes generating test cases at:
  $$\{ a, \; a+1, \; \text{nominal}, \; b-1, \; b \}$$
  along with invalid boundary points $\{ a-1, \; b+1 \}$.

---

# Part III — High-Yield Mid-Term Summary

| Concept | Key Definition / Takeaway | Exam Anchor |
| :--- | :--- | :--- |
| **Testing Objective** | Finding defects, not proving correctness (Myers). | 2-mark definition. |
| **Error vs Fault vs Failure** | Error (human mistake) $\to$ Fault (bug in code) $\to$ Failure (incorrect output at runtime). | 5-mark distinction question. |
| **Verification vs Validation** | Verification = Building product right (specs/static); Validation = Building right product (needs/dynamic). | Boehm's quote must be cited! |
| **Testing vs Debugging** | Testing reveals failures; Debugging locates and fixes faults. | Comparative table. |
| **Driver** | Dummy calling program above MUT (passes inputs, checks outputs). | Diagram & definition. |
| **Stub** | Dummy called routine below MUT (returns simplified/mock response). | Diagram & definition. |
| **Black Box Techniques** | Equivalence Class Partitioning (ECP) + Boundary Value Analysis (BVA). | Test case generation question. |
