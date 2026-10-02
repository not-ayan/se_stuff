# Module 3: Requirements Analysis & Formal Specification
*Author: Swarup Roy / Dr. Rajib Mall (IIT Kharagpur CSE Curriculum)*

---

## 1. Requirements Analysis & Specification Basics

### 1.1 Why Projects Fail Before Coding Starts
Teams frequently begin coding before understanding what the customer genuinely wants. By the time mismatches surface during testing, months of effort and capital are wasted. Requirements engineering catches these mismatches early while they are inexpensive to correct.

### 1.2 The System Analyst's Role
The analyst bridges the communication gap between end-users and software engineers.
**Four Core Questions Every Analyst Must Answer**:
1. **What is the problem?** (Define the problem boundaries precisely before discussing solutions).
2. **Why solve it?** (Understand business value and justification).
3. **What are the possible solutions?** (Evaluate architectural alternatives).
4. **What complexities might arise?** (Anticipate edge cases, concurrency, and interface constraints).

### 1.3 Two Chief Defect Categories Caught by the Analyst
1. **Inconsistency**: Contradictory requirements from different stakeholders.
   - *Example*: One user specifies *"turn off heater and turn ON water shower when temperature $> 100^\circ\text{C}$"*, while another says *"turn off heater and turn ON cooler at the same threshold"*.
2. **Incompleteness**: Crucial operational conditions omitted.
   - *Example*: Specifying what happens when temperature rises above $100^\circ\text{C}$, but omitting what happens when temperature falls below $90^\circ\text{C}$.

---

## 2. The Software Requirements Specification (SRS) Document

### 2.1 Four Vital Roles of the SRS
1. **Statement of User Needs**: Expresses requirements from the user's perspective.
2. **Contract Document**: Serves as a legally binding contract between client and developers. Controversies are resolved by referring to the SRS.
3. **Reference Document**: Guides designers and coders during implementation.
4. **Definition for Implementation & Testing**: Forms the baseline against which acceptance test cases are created.

### 2.2 Black-Box Specification Principle
- The SRS must specify **WHAT** the system shall do (externally visible behavior, inputs, outputs).
- It must **NEVER** specify **HOW** to do it (internal data structures, algorithms, database tables, or design choices are strictly prohibited).

### 2.3 Properties of a High-Quality SRS
- **Concise & Unambiguous**: Exactly one semantic interpretation.
- **Specifies What, Not How**: Preserves designer freedom.
- **Consistent**: No mutual contradictions.
- **Complete**: All functional scenarios and exceptions covered.
- **Traceable**: Requirements map forward to design/code and backward to user requests.
- **Verifiable**: Quantifiable and testable (e.g., *"Response time under 2s for 100,000 records"* instead of *"System must be fast and user-friendly"*).
- **Modifiable**: Cleanly structured so changes do not ripple unpredictably.

### 2.4 IEEE 830 Standard Structure for SRS
1. **Introduction**: Purpose, Scope, Definitions & Acronyms, References, Document Overview.
2. **Overall Description**: Product Perspective, Product Functions, User Characteristics, General Constraints, Assumptions & Dependencies.
3. **Specific Requirements**: Functional Requirements, External Interface Requirements (UI, hardware, software, comms), Performance Requirements, Design Constraints.
4. **Appendices / Index**: Data Dictionary, Glossary, Traceability Matrix.

---

## 3. Decision Logic: Trees vs. Tables

Complex processing logic with multiple branching conditions must be represented without ambiguity.

### 3.1 Decision Trees
- **Edges**: Represent condition evaluations (Yes/No, True/False).
- **Leaf Nodes**: Represent actions taken once a path of conditions is resolved.
- **Best For**: Small to medium decision paths with sequential flow.

### 3.2 Decision Tables
- **Upper Rows**: Conditions (Stub & Condition Entries).
- **Lower Rows**: Actions (Action Stub & Action Entries).
- **Columns (Rules)**: Each column defines one complete rule ($C_1 \land C_2 \dots \implies \text{Actions}$).
- **Best For**: Complex logic where verifying completeness (checking for missing rules) is essential.

### 3.3 Worked Example: ATM Cash Withdrawal Decision Table

| Condition / Rule | Rule 1 | Rule 2 | Rule 3 |
| :--- | :---: | :---: | :---: |
| **Card & PIN Valid?** | Yes | Yes | No |
| **Amount $\le$ Account Balance & Daily Limit?** | Yes | No | — |
| **Action: Dispense cash, update balance, print receipt** | **X** | — | — |
| **Action: Reject: display insufficient funds / limit error** | — | **X** | — |
| **Action: Reject transaction, display invalid PIN, retain/eject card** | — | — | **X** |

---

## 4. Formal Requirements Specification

### 4.1 Foundations of Formal Methods
A formal technique replaces natural language prose with **set theory and mathematical logic** so that specifications have well-defined semantics without linguistic ambiguity.
- **Syntactic Domain ($syn$)**: An alphabet of mathematical symbols and grammar rules to form well-formed formulas (WFF).
- **Semantic Domain ($sem$)**: The mathematical objects / models being specified (algebras, state sequences, transition trees).
- **Satisfaction Relation ($sat$)**: $sat(syn, sem)$ denotes that $syn$ correctly specifies $sem$.

```
+------------+       sat (syn, sem)        +------------+
|    SYN     | --------------------------> |    SEM     |
| (Syntactic |     Homomorphism            |  (Semantic |
|   Domain)  | <-------------------------- |   Domain)  |
+------------+                             +------------+
```

### 4.2 Classification of Formal Methods

#### Model-Oriented vs. Property-Oriented
- **Model-Oriented (e.g., Z, CSP, VDM, CCS)**: Defines system behavior directly by constructing an abstract mathematical model using sets, relations, sequences, and tuples. (Essentially writing a simpler, abstract program).
- **Property-Oriented (e.g., Axiomatic, Algebraic)**: Defines behavior indirectly by stating the mathematical axioms or equations the system must satisfy. Easier to modify during early requirements.

#### Operational Semantics
1. **Linear Semantics**: A system run is an execution sequence of states/events. Concurrency is modeled by non-deterministic interleaving ($a \parallel b = \{a;b, b;a\}$).
2. **Branching Semantics**: Behavior modeled as a directed tree/graph of states where branch points represent non-deterministic choices.
3. **Maximally Parallel Semantics**: All enabled actions at a state fire simultaneously (assumes unlimited processing hardware).
4. **Partial Order Semantics**: States form a partial order. Models true concurrency as incomparable events (e.g., in a beverage machine: coins accepted precedes dispensing, while milk preparation and tea brewing happen concurrently).

---

## 5. Axiomatic Specification
Axiomatic specification uses first-order predicate logic to express operations as axioms defined by **preconditions** and **postconditions**.
- **Precondition ($pre$)**: What must hold true before the operation can be invoked (input domain constraint).
- **Postcondition ($post$)**: What is guaranteed to be true after completion (output constraint and state change).

### 5.1 Examples
**Example 1: Function $f(x)$**
A function takes real $x$ and returns $x/2$ if $x \le 100$, else $2x$:
$$f(x : \text{real}) : \text{real}$$
$$pre: x \in \mathbb{R}$$
$$post: \{(x \le 100 \land f(x) = x/2) \lor (x > 100 \land f(x) = 2x)\}$$

**Example 2: Search in Array**
Find index where $key$ resides in array $X$:
$$search(X : \text{IntArray}, key : \text{Integer}) : \text{Integer}$$
$$pre: \exists i \in [X_{first} \dots X_{last}], X[i] = key$$
$$post: \{X'[search(X, key)] = key \land X = X'\}$$
*(Note: $X'$ represents primed variable—value of $X$ after execution).*

---

## 6. Algebraic Specification

Formal specification of abstract data types (ADTs) pioneered by **John Guttag (1980, 1985)**.
A system is specified as a **heterogeneous algebra** (multiple sets called **sorts** and operations connecting them).

### 6.1 Four Standard Sections
1. **Types**: Declares sorts (e.g., `defines queue`, `uses boolean, integer`).
2. **Exceptions**: Exceptional condition names (e.g., `underflow`, `novalue`).
3. **Syntax**: Operation signatures with input domains and target range (e.g., `append : queue x element -> queue`).
4. **Equations (Rewrite Rules)**: Axioms defining how operations reduce.

### 6.2 Operator Classification
- **Basic Constructors ($m_1$)**: Necessary to construct all possible values of the type (e.g., `create`, `append`).
- **Extra Constructors ($m_2$)**: State-modifying operations expressible using basic constructors (e.g., `remove`).
- **Basic Inspectors ($n_1$)**: Operations returning attributes of the type without modifying it (e.g., `first`, `isempty`).
- **Extra Inspectors ($n_2$)**: Inspectors expressible in terms of basic inspectors.

### 6.3 Axiom Counting Rule of Thumb
To ensure completeness, the minimum number of rewrite equations required is:
$$\text{Min Axioms} = m_1 \times (m_2 + n_1) + n_2$$
*Example (FIFO Queue)*:
- $m_1 = 2$ (`create`, `append`)
- $m_2 = 1$ (`remove`)
- $n_1 = 2$ (`first`, `isempty`)
- $n_2 = 0$
$$\text{Min Axioms} = 2 \times (1 + 2) + 0 = 6 \text{ equations}$$

### 6.4 Three Desirable Properties of Algebraic Specs
1. **Completeness**: An arbitrary sequence of operations can always be simplified.
2. **Finite Termination Property**: Applications of rewrite rules always terminate (provable if RHS has fewer terms than LHS).
3. **Unique Termination Property (Church-Rosser)**: Applying rewrite rules in different orders always yields the exact same result.

---

## 7. Z Notation & Predicate Logic Translation

### 7.1 Z Schema Structure
A Z specification consists of named two-part boxes called **schemas**:
- Top half: Declarations of variables and their mathematical types.
- Bottom half: Predicates (invariants, preconditions, and postconditions).
- **Conventions**:
  - $\Delta S$: Operation modifies state of schema $S$.
  - $\Xi S$: Operation inspects (queries) state of $S$ without modifying it.
  - $x?$: Input variable.
  - $x!$: Output variable.
  - $x'$: Primed variable (value of $x$ after operation).

### 7.2 Worked Z Schema: ATM Cash Withdrawal
```
+-- ATM -------------------------------------+
| balance, dailyWithdrawn : N                |
| dailyLimit : N                             |
+--------------------------------------------+
| dailyWithdrawn <= dailyLimit               |
+--------------------------------------------+

+-- Withdraw --------------------------------+
| Delta ATM                                  |
| amt? : N                                   |
+--------------------------------------------+
| amt? <= balance                            |  <-- Precondition 1
| dailyWithdrawn + amt? <= dailyLimit        |  <-- Precondition 2
| balance' = balance - amt?                  |  <-- Postcondition 1
| dailyWithdrawn' = dailyWithdrawn + amt?    |  <-- Postcondition 2
+--------------------------------------------+
```
