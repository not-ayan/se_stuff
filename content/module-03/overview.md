# Module 3: Requirements Analysis, Specification (SRS) & Formal Methods
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

#### Example: Integer Square Root Operation $	ext{ISQRT}(n, r)$
* **Precondition $P$**: $n \ge 0$
* **Postcondition $Q$**: $(r^2 \le n) \land ((r + 1)^2 > n) \land (r \ge 0)$

---

### 4.2 Algebraic Specification
Algebraic specification models Abstract Data Types (ADTs) as heterogeneous algebras without referencing internal storage representations.

#### The 4 Components of an Algebraic Specification:
1. **Types / Sorts**: The data types being defined (e.g., `Stack`, `Element`, `Boolean`).
2. **Syntax / Operation Signatures**:
   - `New`: $ightarrow 	ext{Stack}$ (Creates empty stack)
   - `Push`: $	ext{Stack} 	imes 	ext{Element} ightarrow 	ext{Stack}$
   - `Pop`: $	ext{Stack} ightarrow 	ext{Stack}$
   - `Top`: $	ext{Stack} ightarrow 	ext{Element}$
   - `IsEmpty`: $	ext{Stack} ightarrow 	ext{Boolean}$
3. **Classification of Operations**:
   - **Constructors**: Create or modify the ADT instances.
     - *Basic Constructors* ($m_1$): `New`
     - *Extra Constructors* ($m_2$): `Push`
   - **Inspectors (Observers)**: Query the ADT without altering it.
     - *Basic Inspectors* ($n_1$): `IsEmpty`
     - *Extra Inspectors* ($n_2$): `Top`, `Pop`
4. **Axioms / Equations**:
   - $	ext{IsEmpty}(	ext{New}()) = 	ext{True}$
   - $	ext{IsEmpty}(	ext{Push}(s, e)) = 	ext{False}$
   - $	ext{Top}(	ext{Push}(s, e)) = e$
   - $	ext{Top}(	ext{New}()) = 	ext{Error}$
   - $	ext{Pop}(	ext{Push}(s, e)) = s$
   - $	ext{Pop}(	ext{New}()) = 	ext{Error}$

#### Formula for Minimum Number of Axioms:
$$	ext{Min Axioms} = m_1 	imes (m_2 + n_1) + n_2$$
For Stack ($m_1=1, m_2=1, n_1=1, n_2=2$):
$$	ext{Min Axioms} = 1 	imes (1 + 1) + 2 = 4 	ext{ Axioms}$$

---

## 5. Exam Review & High-Yield Questions

> [!IMPORTANT]
> **Key Exam Points:**
> * IEEE 830 Section 3 specifies Functional & Non-Functional requirements.
> * SRS specifies WHAT the system does, NOT HOW it is implemented.
> * Hoare Triple: $\{P\} S \{Q\}$ (Precondition $ightarrow$ Program $ightarrow$ Postcondition).
> * Minimum Algebraic Axioms formula: $m_1 	imes (m_2 + n_1) + n_2$.

### Practice Questions
1. **Explain the structure and desirable characteristics of an IEEE 830 SRS document.**
2. **Construct a Decision Table for an automated ATM Cash Withdrawal system considering Card Validity, PIN Correctness, and Sufficient Account Balance.**
3. **Write the complete Algebraic Specification for a FIFO Queue ADT.**
