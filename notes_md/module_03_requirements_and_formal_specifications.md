# Module 4: Requirements Analysis, Specification (SRS) & Formal Methods

![Module 3: Requirements Analysis, IEEE 830 SRS, Logic Modeling & Formal Specifications](/images/mod3_requirements_and_formal_specs.jpg)

---

# Part III — Requirements Analysis and Specification

## 21. Why requirements work happens before design

The Requirements Analysis lecture opens with a simple but powerful motivation: many projects fail before coding starts because teams implement a system before establishing that they are building what the customer actually needs.

Requirements work exists to catch the mismatch **early, when it is cheaper to fix**.

The lecture presents two activities and one deliverable:

```text
Requirements Gathering & Analysis
              ↓
Requirements Specification
              ↓
      Reviewed & Approved SRS
```

The approved SRS then becomes the basis for later development. Design, coding, and testing all trace back to it.

---

## 22. Requirements gathering — what analysts actually do

The source identifies four ways of learning the real requirements:

1. observe the existing system or procedures,
2. study existing documentation,
3. discuss with customers and end users,
4. analyze what actually needs to be done beyond what is simply asked for.

The fourth item is particularly important. A user may ask for a button, report, or feature because that is how they imagine the solution. The analyst has to understand the underlying problem rather than blindly turning every request into a feature.

### Existing system versus new system

When automating an existing system, the analyst can observe input/output formats and procedures directly, so the starting point is more concrete.

When building something new, there may be no working system to observe. The analyst must therefore use more imagination, experience, questioning, modeling, and interaction.

The source states that in both situations, simply asking “what do you want?” is rarely enough.

---

## 23. Two common defects: inconsistency and incompleteness

### Inconsistency

Two requirements conflict.

The lecture’s example is a temperature-control situation in which one stakeholder says that when temperature exceeds 100°C the heater should turn off and the shower should open, while another says the heater should turn off and the cooler should switch on at the same threshold.

The analyst must identify the contradiction and resolve it before writing the final SRS.

### Incompleteness

The specification omits an important case.

The same example says the system behavior above 100°C is written down, but the behavior when temperature falls below 90°C is omitted. The missing case might require the heater to turn on and the shower to turn off.

The important exam distinction is:

> **Inconsistency = two recorded rules conflict. Incompleteness = a required case is missing.**

---

## 24. Four questions every analyst should answer

The requirements lecture summarizes analysis around four questions:

1. **What is the problem?** — define it precisely before discussing a solution.
2. **Why solve it?** — understand the reason the investment matters.
3. **What are the possible solutions?** — consider alternatives rather than prematurely choosing one.
4. **What complexities might arise?** — anticipate difficulties before they become surprises.

These four questions are a practical checklist for requirements interviews and examination answers.

---

## 25. Functional requirements

The source defines a functional requirement in terms of system behavior. A system can be viewed as performing functions \(f_i\), and each function transforms input data into corresponding output data.

Conceptually:

```text
Input data ──→ Function fᵢ ──→ Output data
```

The function description should make the input, output, and necessary processing clear. A high-level requirement may contain several identifiable functions and can therefore be decomposed further.

### Library search example

The lecture defines a library Search Book function:

- **Input:** an author name.
- **Processing:** match the name against the catalogue.
- **Output:** details of the author’s books and their library locations.

This is a useful template for writing a functional requirement:

> Given this input, the system shall perform this required transformation and make this output available.

---

## 26. Nonfunctional requirements and constraints

The lecture separates the SRS into three major categories:

1. **Functional requirements** — what the system must do.
2. **Nonfunctional requirements** — qualities the system must have.
3. **Constraints** — things the system must or must not do because of imposed conditions.

The source examples of nonfunctional qualities include:

- reliability,
- performance,
- human-computer interface,
- system interfacing,
- security,
- maintainability,
- portability,
- usability.

Constraints can concern standards, hardware/OS/DBMS choices, I/O-device capabilities, response time, and data representation required by another system.

### Practical distinction

A functional statement usually describes an action or transformation.

A nonfunctional statement describes a quality.

A constraint describes an imposed limitation or requirement on what the system should or should not use/do.

---

## 27. What is an SRS?

The SRS is more than a list of features. The lecture presents four roles:

- statement of user needs,
- contract document,
- reference document,
- definition used for implementation.

The approved SRS becomes the common reference point between customer and development team.

### SRS as a contract

The lecture explicitly says that after approval, the SRS acts as a contract. Later disputes should be settled by referring back to what the document records rather than relying on memory or assumption.

The product is therefore judged against the requirements that were recorded and approved.

---

## 28. SRS as a black-box specification

The SRS should primarily specify **externally visible behavior**.

```text
              +----------------------+
Input Data →  |  System S (Black Box)| → Output Data
              +----------------------+
```

The internal algorithms, data structures, and implementation choices are deliberately left unspecified at this stage.

This connects directly to the following rule:

> SRS says **WHAT**, design says **HOW**.

### Why this separation matters

If the requirement says “store names in alphabetical order,” that may be unnecessarily prescriptive if sorted storage is not actually a user need. Dictating an implementation strategy too early reduces the designer’s freedom.

---

## 29. What the SRS should and should not say

### It should

- state clearly what needs to be done,
- use end-user terminology,
- remain precise and contractual,
- be written so it can later support formal specification if needed.

### It should avoid

- prescribing implementation details,
- premature technical detail that unnecessarily restricts the design,
- vague literary language,
- ambiguous expressions that different readers could interpret differently.

---

## 30. Properties of a good SRS

The source’s table is central and should be learned almost verbatim in meaning:

| Property | Meaning |
|---|---|
| Concise & unambiguous | Says exactly what is meant without excess or multiple interpretations |
| Specifies what, not how | Describes required behavior rather than implementation |
| Easy to change | Structured so changes do not create unpredictable ripple effects |
| Consistent | No two requirements contradict each other |
| Complete | No important requirement is omitted |
| Traceable | Requirements can be linked to design/code and traced back to their origin |
| Verifiable | It is possible to determine objectively whether the requirement is satisfied |

The lecture’s classic contrast is between “user-friendly” and an objectively measurable response-time requirement. The first is ambiguous; the second is verifiable.

---

## 31. Standard SRS structure

The source presents a four-part structure aligned with the shape of IEEE 830-style documents:

### 1. Introduction
Purpose, scope, definitions and abbreviations, references, and document overview.

### 2. Overall Description
Product perspective, major functions, user characteristics, general constraints, and assumptions.

### 3. Specific Requirements
Functional requirements, external interfaces, performance requirements, and design constraints.

### 4. Appendices / Index
Supporting data, glossary, cross-reference index.

For an exam question asking “write standard SRS structure,” this four-section hierarchy is the safest framework from the supplied lecture.

---

## 32. Writing precise functional clauses

The Library Search example shows how a vague requirement becomes a sequence of smaller, testable clauses.

For Search Book:

- selecting the search option should cause the system to prompt for keywords;
- entering keywords should cause the system to return all books whose title or author matches the keywords;
- the output includes title, author, publisher, year, ISBN, catalogue number, and location;
- the processing is a search through the book list;
- the sample also gives a performance note: response within 2 seconds for a catalogue of up to 200,000 titles.

The key technique is **input → processing → output** with a stable requirement ID and, where useful, priority.

---

## 33. Renew Book — clause-by-clause precision

The source decomposes Renew Book into:

### R.2.1
Input: Renew option selected. Output: prompt for membership number and password.

### R.2.2
Input: membership number and password. Output: list of borrowed books or an error for invalid password. Processing includes password validation and searching the borrower list.

### R.2.3
Input: selected renewal choices. Output: confirmation of renewed books. Processing updates the borrower list.

This style is valuable because every clause has a clear trigger/input and observable result. It also helps testing: each clause can be turned into a test objective.

---

## 34. Bad SRS patterns

The lecture lists several failure modes.

### Unstructured specification
A narrative essay makes precise editing, traceability, and consistency difficult.

### Noise
Irrelevant material makes the real requirement harder to find.

### Silence
Important aspects are omitted.

### Overspecification
Implementation details are dictated unnecessarily.

### Contradictions
The same requirement is stated differently in multiple places.

### Ambiguity
Terms such as “good user interface” or other non-quantifiable descriptions invite multiple interpretations.

### Forward references
A statement relies on a definition the reader has not encountered yet, making local interpretation difficult.

### Wishful thinking
A desired capability is written even though no realistic solution is available under the project conditions.

A good SRS avoids all eight patterns.

---

## 35. Decision logic

Decision logic is introduced when a process depends on multiple conditions and outcomes. The lecture presents two equivalent representations:

- **decision tree:** conditions are represented by branches and actions at leaf nodes;
- **decision table:** conditions and resulting actions are arranged as rules/rows.

### When to use which

Trees are intuitive when the number of conditions is small and you want to visualize branching paths.

Tables are especially useful for checking that cases are complete and that conditions are not duplicated or accidentally omitted.

---

## 36. ATM example — decision tree

The supplied ATM practice problem requires:

1. validate card and PIN,
2. check amount against balance and daily withdrawal limit,
3. dispense cash and update balance only when checks pass.

The decision tree is effectively:

```text
Card & PIN valid?
├── No  → Reject / show error / retain or eject card per policy
└── Yes
    ↓
Amount ≤ balance AND daily limit?
├── No  → Reject: insufficient funds / limit exceeded
└── Yes → Dispense cash + update balance + print receipt
```

The source solution gives four functional requirements and three listed constraints, including a 5-second response target under normal network conditions, supported cash denominations, and retaining the card after three consecutive incorrect PIN attempts.

---

## 37. Formal specification — why mathematics appears in requirements

Formal specification is a mathematical way to describe required system behavior. The lecture says it replaces natural-language ambiguity with set theory and predicate logic.

The basic pattern is:

- represent system **state** using variables,
- describe what is true before an operation,
- describe what must be true after the operation,
- use notation with precise semantics.

### Why use it?

Natural language is easy to write but easy to interpret differently. Formal notation aims to give each statement one mathematical meaning that can be checked rigorously.

The lecture emphasizes that formal specification is especially valuable when a mistake is expensive, such as in safety-critical or high-reliability systems.

---

## 38. How formal specification is built

The lecture presents three broad steps:

1. choose a notation;
2. model the state;
3. define each operation with preconditions and postconditions.

The notation introduced in detail is **Z notation**.

---

## 39. Z notation — core ideas

The source describes Z as a formal notation developed at Oxford University in the early 1980s and built on set theory and first-order predicate logic.

The major structural idea is the **schema**: a named box containing declarations and predicates/constraints.

Z separates:

- the state: what the system remembers;
- operations: how the state may change.

### Core notation reference

| Symbol / convention | Meaning |
|---|---|
| \(\mathbb{N}, \mathbb{Z}\) | natural numbers, integers |
| Schema box | named structure containing declarations and predicates |
| \(\Delta\) | the operation changes state |
| \(\Xi\) | query/read operation that does not change state |
| `x?` | input |
| `x!` | output |
| `x, x′` | before and after values |

### Logical and set operators

- \(\land\): AND
- \(\lor\): OR
- \(\neg\): NOT
- \(\Rightarrow\): implication
- \(\Leftrightarrow\): if and only if
- \(\forall\): for all
- \(\exists\): there exists
- \(\in\): member of
- \(\subseteq\): subset of
- \(\cup\): union
- \(\cap\): intersection
- \(\to\): total function
- `dom`: domain
- `ran`: range

---

## 40. First-order predicate logic

A predicate is a statement about one or more objects that is either true or false. Examples from the lecture include `PassedAll(s)` and `Available(b)`.

Predicates can be combined using logical connectives, and quantifiers let us state rules over sets of objects.

The recurring structure emphasized in the lecture is:

```text
∀ x ∈ Domain • Condition(x) ⇒ Conclusion(x)
```

Read it as:

> For every x in the domain, if the condition holds, then the conclusion must hold.

The exam technique recommended by the source is to identify, in order:

1. the domain,
2. the condition,
3. the conclusion,
4. the connective or quantifier words in the English sentence.

---

## 41. Translating English into first-order logic

The translation guide in the lecture gives the following clues:

| English | Symbol |
|---|---|
| all / every / each | \(\forall\) |
| some / there exists / at least one | \(\exists\) |
| and / both | \(\land\) |
| or / either-or | \(\lor\) |
| not / no / never / none | \(\neg\) |
| if … then / implies | \(\Rightarrow\) |
| if and only if | \(\Leftrightarrow\) |

### Example: students

English:

> Every student who has passed all exams graduates.

Formal structure:

\[
\forall s \in Students \bullet PassedAll(s) \Rightarrow Graduates(s)
\]

Notice that “every student” creates the universal quantifier, “passed all exams” becomes the condition, and “graduates” becomes the consequence.

### Software example

English:

> Every request that fails authentication is rejected.

Formal form:

\[
\forall r \in Requests \bullet \neg Authenticated(r) \Rightarrow Rejected(r)
\]

---

## 42. Formal-logic practice cases

### Library rule

A member may issue a book if the member has no overdue books **and** the book is available.

The lecture formalizes this with:

\[
\forall m \in Members, b \in Books \bullet
(\neg HasOverdue(m) \land Available(b)) \Rightarrow MayIssue(m,b)
\]

### Course registration

A student can register if a seat exists **or** special permission has been granted:

\[
\forall s \in Students, c \in Courses \bullet
((\exists seat \in Seats(c) \bullet Free(seat)) \lor HasPermission(s,c))
\Rightarrow CanRegister(s,c)
\]

### Additional practice statements

The source provides examples for:

- unique employee IDs,
- at least one administrator logged in,
- encryption versus public readability,
- stock status being equivalent to zero quantity,
- every transaction being logged or flagged,
- passwords being at least eight characters.

The point of these questions is not memorization. They train the transformation from English quantifier/connective phrases to a formal rule.

---

## 43. Building a Z schema — five-step method

The source gives a five-step sequence:

1. **Identify the State**
2. **Write the State Schema**
3. **Name the Operation**
4. **Add Inputs & Outputs**
5. **Write Preconditions and Postconditions**

Memorize the sequence because it is the structure of the worked ATM example.

---

## 44. ATM withdrawal in Z — state

The source asks: what must the ATM remember between transactions?

It identifies:

- current account balance,
- amount already withdrawn today,
- daily withdrawal limit.

The state schema is conceptually:

```text
ATM
-------------------------
balance, dailyWithdrawn : ℕ
dailyLimit              : ℕ
-------------------------
dailyWithdrawn ≤ dailyLimit
```

The lower line is an **invariant**: a fact that must always remain true.

---

## 45. ATM withdrawal in Z — operation and input

The operation is named `Withdraw`.

`ΔATM` says the ATM state changes.

`amt? : ℕ` says the requested amount is an input and is a natural number.

Then the source adds preconditions:

\[
amt? \le balance
\]

and

\[
dailyWithdrawn + amt? \le dailyLimit
\]

Together they say that the requested withdrawal cannot exceed the balance and cannot push the daily total beyond the daily limit.

---

## 46. ATM withdrawal in Z — postcondition

The after-values are written using primes:

\[
balance' = balance - amt?
\]

\[
dailyWithdrawn' = dailyWithdrawn + amt?
\]

The specification therefore expresses both legality and state change:

```text
Before:
    amount is within balance
    amount keeps daily total within limit

After:
    balance has decreased by the withdrawn amount
    dailyWithdrawn has increased by the withdrawn amount
```

This is the essence of a formal operation specification: **state + conditions before + exact state relation after**.

---

## 47. Formal specification merits and demerits

### Merits in the source

- well-defined semantics reduce ambiguity;
- automated tools can check properties;
- some specifications can be executed as working prototypes.

### Demerits in the source

- difficult to learn/use without mathematical background;
- less suitable for very large and complex systems.

The important exam theme is the trade-off: mathematical precision is gained at the cost of accessibility and modeling effort.

---

---

# Deep Dive: Requirements Analysis, Decision Logic & Formal Specifications

# Deep Dive C — Requirements Analysis

## 118. Requirements analysis is fundamentally an uncertainty-removal activity

The requirements lecture begins with a strong motivation: projects can waste months of implementation because the team eventually discovers that it built the wrong thing. Requirements analysis exists to catch this mismatch while it is still inexpensive to correct.

The source divides requirements work into two activities:

```text
Requirements gathering & analysis
              ↓
Requirements specification
              ↓
Reviewed and approved SRS
```

### What the analyst is actually trying to discover

The source explicitly lists:

- what the customer says,
- what end users actually do,
- what existing procedures require,
- what documentation reveals,
- what needs to be done beyond the literal words of a request.

The final point is subtle. An analyst is not simply a transcription machine.

Suppose a customer says:

> “We want a button to print the report.”

The analyst should understand what “report” means, who can request it, which information it contains, what inputs control its scope, and what should happen when there is no matching data. The analyst asks clarifying questions because incomplete interpretation creates later defects.

---

## 119. Existing system versus new system — why the difficulty differs

When automating an existing system, analysts can observe:

- input formats,
- output formats,
- actual procedures,
- existing records,
- human workarounds,
- organizational roles.

This reduces some uncertainty because there is a concrete system to study.

When building something entirely new, there may be no operational system to observe. Requirements gathering then depends more heavily on:

- discussion,
- imagination,
- domain knowledge,
- examples,
- prototypes,
- careful elicitation.

### Where important

This distinction matters when estimating how difficult requirements work will be. A seemingly simple new system can be difficult to specify because users are being asked to describe behavior they have never previously performed through a system.

It also explains why prototyping can be particularly valuable for new systems: users may discover what they actually need only after interacting with a concrete example.

---

## 120. The two classic defects: inconsistency and incompleteness

The lecture's examples deserve deep understanding because both defects are common examination questions.

### Inconsistency

Two requirements are inconsistent when they prescribe incompatible behavior for the same situation.

The source example has one stakeholder saying that when temperature exceeds a threshold the system should turn off the heater and open a shower, while another says the system should turn off the heater and turn on a cooler at the same threshold.

The important lesson is not the specific devices. It is the analysis method:

1. identify the same condition;
2. compare the prescribed actions;
3. detect the conflict;
4. return to the stakeholders;
5. decide which rule is correct;
6. record the resolved rule in the SRS.

### Incompleteness

A requirement set is incomplete when it leaves an important situation unspecified.

The source gives a threshold example where behavior above the threshold is described, but behavior below another threshold is omitted even though the system obviously needs to define what happens there.

### Why these defects are expensive

A developer cannot safely implement an undefined behavior. They must either guess or ask for clarification. A guess effectively turns an undocumented assumption into an implementation decision.

### Practical extension: boundary analysis during requirements review

A very effective technique is to actively ask:

- What happens exactly at the threshold?
- What happens above it?
- What happens below it?
- What happens when the input is missing?
- What happens when two rules could both apply?
- What happens after repeated failure?
- What happens when a resource is unavailable?

This style of questioning is visible in the ATM and decision table examples throughout the supplied material.

---

## 121. The four questions every analyst should be able to answer

The source gives four direct questions:

### 1. What is the problem?

State the problem before discussing a solution.

### 2. Why solve it?

Understand why solving the problem is worth resources.

### 3. What are the possible solutions?

Explore alternatives instead of assuming the first proposed design is inevitable.

### 4. What complexities might arise?

Anticipate problems before they become expensive surprises.

### How to use this in practice

For an ATM example:

```text
Problem:
Allow a customer to withdraw cash subject to authentication,
balance, daily limit and machine constraints.

Why:
Provide automated access to account funds.

Possible solution approaches:
ATM terminal + bank transaction service;
other deployment choices may exist depending on the project.

Complexities:
invalid PINs, insufficient funds, daily limits,
ATM denomination limits, network response time, etc.
```

The lecture does not require a particular architecture here; the important point is that analysis should surface these issues before design begins.

---

## 122. Functional requirements — think “input → processing → output”

The source defines a functional requirement as a function that transforms a set of input data into corresponding output data.

A useful representation is:

```text
Input data
   ↓
Function / processing
   ↓
Output data
```

For the Library `Search Book` example:

- **Input:** author's name;
- **Processing:** match the name against the catalogue;
- **Output:** details of matching books and their locations.

### Why this representation is powerful

It forces the analyst to answer three questions:

1. What information does the function need?
2. What transformation does the function perform?
3. What observable result does it produce?

Vague requirements often disappear once you try to fill those three boxes.

### Where this is important

This is useful for:

- writing numbered SRS clauses,
- identifying architectural functions,
- designing test cases,
- designing module interfaces,
- tracing implementation back to requirements.

### Practical extension: one large function can hide several smaller functions

The lecture explicitly notes that a high-level requirement may itself consist of several identifiable functions. For example, “Process an order” may contain validation, stock checking, billing, logging, and backordering.

---

## 123. Functional requirements versus nonfunctional requirements versus constraints

The source separates these into three categories.

### Functional requirements

What the system must do.

Examples from the course include:

- validate an ATM card and PIN;
- reject an amount above the account balance;
- search a book catalogue;
- generate a bill;
- record a consultation.

### Nonfunctional requirements

Qualities or characteristics that are not naturally expressed as one input-output function. The source lists:

- reliability,
- performance,
- human-computer interface,
- interfaces with other systems,
- security,
- maintainability,
- portability,
- usability.

### Constraints

Things the system should or should not do, including:

- standards compliance,
- required hardware/OS/DBMS,
- I/O device capabilities,
- speed requirements,
- required data representation for an interface.

### Why the distinction matters

Consider the statement:

> “The system shall return a search result within 2 seconds.”

The business function is still “search.” The two-second condition is a performance quality.

The ATM example gives a concrete constraint: the system should respond within five seconds under normal network conditions. It also says cash can only be dispensed in denominations the loaded cassettes can supply and that the card is retained after three consecutive incorrect PIN attempts.

### Practical extension: why this matters to testing

Functional requirements often map naturally to **behavioral test cases**: given input X, verify output Y.

Nonfunctional requirements create **quality-oriented tests**: verify response time, accessibility, reliability targets, security constraints, or compatibility.

Constraints can become acceptance checks about the environment or architecture.

---

# Deep Dive D — The SRS

## 124. Why an SRS is more than “documentation”

The source identifies four roles of an SRS:

1. statement of user needs,
2. contract document,
3. reference document,
4. definition for implementation.

This means the SRS is simultaneously a communication artifact and a control artifact.

### Role 1: Statement of user needs

The SRS captures what stakeholders require from the system.

### Role 2: Contract document

Once approved, the source says it becomes a contract between customer and development team. Later controversies are settled by consulting the recorded requirements rather than relying on memory.

### Role 3: Reference document

Designers, developers, testers, project managers, and maintainers can use it as a shared reference.

### Role 4: Definition for implementation

The SRS does not tell programmers exactly how to implement the software, but it gives the externally required behavior from which implementation must be derived.

### Where this is important

This is especially important when:

- customers and developers are different organizations,
- many teams work on one product,
- contractual acceptance matters,
- the system will be maintained for a long time,
- multiple developers need a stable reference.

---

## 125. SRS as a black-box specification — what “black box” really means

The source models the SRS as:

```text
Input Data → [ System S ] → Output Data
```

with the internal implementation hidden.

### Why deliberately hide the internals?

Because the requirement should remain independent of a particular solution whenever possible.

Suppose a requirement says:

> “The system shall return all matching books within two seconds.”

That leaves the designer free to choose among multiple implementation approaches. The requirement does not need to say “store the titles in a B-tree” or “use a specific database index.” Those are design choices unless a genuine external constraint requires them.

### What the SRS should say

The lecture says it should:

- clearly state **WHAT** needs to be done,
- use end-user terminology,
- be a careful and unambiguous contract,
- be suitable for later formal specification if needed.

### What it should avoid

It should avoid:

- implementation HOW details,
- premature technical restrictions,
- vague literary language.

### The “what, not how” exam rule

When deciding whether a statement belongs in an SRS, ask:

> “Could two different designs satisfy this requirement?”

If yes, the statement may be describing **what**. If the statement unnecessarily forces one implementation technique while other valid solutions exist, it may be premature design.

This is a practical decision tool rather than a replacement for analyzing actual project constraints.

---

## 126. Good SRS properties — understand each one separately

The supplied lecture lists:

- concise and unambiguous,
- specifies what, not how,
- easy to change,
- consistent,
- complete,
- traceable,
- verifiable.

### Concise and unambiguous

Two readers should understand the same requirement in the same way.

Bad:

> “The interface should be user-friendly.”

Better:

> “The system shall return the catalogue search results within 2 seconds for a catalogue containing up to 200,000 titles.”

The second statement is more measurable.

### Easy to change

A well-organized SRS isolates requirements rather than embedding one rule in a long paragraph. If a single business rule changes, its impact should be easy to locate.

### Consistent

Different clauses must not prescribe contradictory behavior.

### Complete

The system's important behavior cannot be left to developer imagination.

### Traceable

Every requirement should be traceable forward into design/code/test artifacts and backward to its source where appropriate.

### Verifiable

A requirement should permit someone to determine whether it has been satisfied.

### Where these properties become important later

These are not purely writing-quality concerns. They affect:

```text
SRS quality
   ↓
Design certainty
   ↓
Implementation certainty
   ↓
Testability
   ↓
Acceptance confidence
```

A requirement that cannot be interpreted or tested clearly creates problems downstream.

---

## 127. Standard SRS structure — how to use the four sections

The source's standard structure follows the shape of IEEE 830:

### Section 1 — Introduction

Typical contents:

- purpose,
- scope,
- definitions and abbreviations,
- references,
- document overview.

**Why useful:** establishes the context needed to read the rest of the document.

### Section 2 — Overall Description

Typical contents:

- product perspective,
- major functions,
- user characteristics,
- general constraints,
- assumptions.

**Why useful:** provides the big picture before the detailed requirements.

### Section 3 — Specific Requirements

Typical contents:

- functional requirements,
- external interface requirements,
- performance requirements,
- design constraints.

**Why useful:** this is where developers and testers find detailed behavioral expectations.

### Section 4 — Appendices / Index

Supporting data, glossary, cross-references, and similar material.

### Practical extension: document navigation

As SRS documents become large, section numbering becomes a maintenance tool. A requirement such as `R.2.3` can be referenced from a design module and test case without copying its entire wording everywhere.

---

## 128. Writing functional requirements with input → output precision

The sample `Search Book` and `Renew Book` requirements in the lecture are useful because they turn ordinary prose into explicit clauses.

### Example pattern

```text
Requirement ID: R.X.Y
Input:
Processing:
Output:
```

This format makes hidden assumptions visible.

For `Renew Book`:

```text
R.2.1
Input: renew option selected
Output: prompt for membership number and password

R.2.2
Input: membership number + password
Output: borrowed-book list OR invalid-password message
Processing: validate password and find the borrower's books

R.2.3
Input: selected books for renewal
Output: renewal confirmation
Processing: update the borrower record
```

### Why split one requirement into multiple clauses?

Because “renew a book” contains several externally visible interactions. Breaking it into smaller clauses improves:

- testability,
- traceability,
- changeability,
- completeness checking.

### Where useful

This style is especially effective for exam questions asking you to convert a paragraph into SRS clauses. Look for distinct input-output interactions rather than trying to turn the entire paragraph into one enormous sentence.

---

## 129. Bad SRS patterns — how to diagnose them quickly

The lecture lists several bad patterns.

### Unstructured specification

A narrative essay can hide important requirements inside prose and make later changes difficult.

**Diagnostic clue:** many rules are buried in paragraphs without identifiers or structure.

### Noise

Irrelevant material makes it harder to find actual requirements.

**Diagnostic clue:** information that does not affect system behavior or constraints.

### Silence

Important behavior is not specified.

**Diagnostic clue:** a realistic operating situation has no defined outcome.

### Overspecification

The SRS dictates a particular implementation when it need not.

**Example:** requiring names to be stored in sorted order when the requirement only needs names to be searchable.

### Contradictions

Two places say incompatible things.

### Ambiguity

Different readers could reasonably interpret a phrase differently.

### Forward references

A requirement assumes a definition will appear later or elsewhere without making the meaning easy to resolve.

### Wishful thinking

The document demands an outcome without specifying meaningful behavior or constraints that make it testable.

### Exam technique

When shown a “bad SRS” paragraph, classify the defect by asking:

```text
Is something irrelevant?             → Noise
Is something missing?               → Silence / incompleteness
Does it force implementation?       → Overspecification
Do two rules conflict?              → Contradiction / inconsistency
Could readers interpret it oddly?   → Ambiguity
Is it a wall of prose?              → Unstructured specification
```

---

# Deep Dive E — Decision Logic

## 130. Why decision trees and decision tables are taught with requirements

A requirement is often not just a simple transformation. It may contain several conditions and outcomes.

For the ATM example, the system needs to evaluate multiple conditions before dispensing cash.

The source asks students to represent this logic in two ways:

- a decision tree,
- a decision table.

These are complementary representations.

### Decision tree

Best for visualizing how conditions lead to outcomes.

Example:

```text
Card/PIN valid?
 ├── No  → Reject
 └── Yes
      ↓
Amount ≤ balance?
 ├── No  → Reject
 └── Yes
      ↓
Amount within daily limit?
 ├── No  → Reject
 └── Yes → Dispense + update balance
```

### Decision table

Best for systematically checking combinations of conditions.

| Rule | Card/PIN valid | Amount ≤ balance | Within daily limit | Action |
|---|---|---|---|---|
| R1 | No | – | – | Reject |
| R2 | Yes | No | – | Reject |
| R3 | Yes | Yes | No | Reject |
| R4 | Yes | Yes | Yes | Dispense and update |

The “–” means the later condition is irrelevant to that outcome under the chosen decision structure.

### Where important

Decision tables are particularly valuable when there are many conditions and possible combinations. Decision trees are especially useful when explaining the logic to a human.

### Practical extension: completeness checking

One major advantage of a table is that it can expose missing cases. If a condition can be true or false and no rule covers one combination, the requirements may be incomplete.

This links directly back to the requirements lecture's warning about incompleteness.

---

# Deep Dive F — Formal Specification, Z, and Predicate Logic

## 131. Why formal methods appear after ordinary SRS writing

The requirements lecture moves from ordinary natural-language requirements into formal specification. The motivation is precision.

Natural language is expressive, but it can be ambiguous. Formal notation gives a mathematically defined way to describe state and rules.

The source's workflow is:

```text
Choose a notation
      ↓
Model the state
      ↓
Define each operation
      ↓
State preconditions
      ↓
State postconditions
```

### Where formal specification is important

The source particularly emphasizes safety- and reliability-critical systems and notes that formal notation can support automated property checking. It also describes formal specification as useful when ambiguity needs to be removed.

It is not necessary for every ordinary business application. The source explicitly lists difficulty of learning and poor fit for very large, complex systems among its disadvantages.

---

## 132. Z notation — understand each symbol as a piece of a state model

The source describes Z as a specification notation built on set theory and first-order predicate logic. It organizes specifications into **schemas**.

A schema has two main conceptual parts:

```text
+------------------------------+
| declarations                 |
+------------------------------+
| predicates / constraints     |
+------------------------------+
```

### Core conventions from the source

| Symbol | Meaning |
|---|---|
| `ℕ` | Natural numbers |
| `ℤ` | Integers |
| `ΔATM` | The operation changes ATM state |
| `ΞATM` | The operation reads state but does not change it |
| `x?` | Input |
| `x!` | Output |
| `x` and `x′` | Before-state and after-state values |
| `∧` | AND |
| `∨` | OR |
| `¬` | NOT |
| `⇒` | Implies |
| `⇔` | If and only if |
| `∀` | For all |
| `∃` | There exists |
| `∈` | Member of |
| `⊆` | Subset of |
| `∪` | Union |
| `∩` | Intersection |
| `→` | Total function |
| `dom` | Domain |
| `ran` | Range |

### Practical learning trick

Do not memorize all symbols as isolated mathematics. Associate each symbol with the question it answers:

- `Δ` → “Does this operation change state?”
- `Ξ` → “Is this only a query?”
- `?` → “What comes in?”
- `!` → “What goes out?”
- prime `'` → “What is the new value after the operation?”
- `∀` → “For every object?”
- `∃` → “Does at least one exist?”

This makes formal notation much easier to decode under exam pressure.

---

## 133. Building the ATM Z specification step by step

The source deliberately constructs the ATM example in five steps.

### Step 1 — Identify the state

Ask:

> “What must the ATM/account model remember between transactions?”

The source identifies:

- current balance,
- amount withdrawn today,
- daily withdrawal limit.

### Step 2 — State schema

Conceptually:

```text
ATM
---------------------------
balance, dailyWithdrawn : ℕ
dailyLimit              : ℕ
---------------------------
dailyWithdrawn ≤ dailyLimit
```

The predicate below the divider is an invariant: it must remain true.

### Step 3 — Operation and input

```text
Withdraw
ΔATM
amt? : ℕ
```

`ΔATM` says the operation can change the state. `amt?` is the requested amount.

### Step 4 — Preconditions

```text
amt? ≤ balance
 dailyWithdrawn + amt? ≤ dailyLimit
```

These conditions must hold before the withdrawal is valid.

### Step 5 — Postconditions

```text
balance′ = balance − amt?
dailyWithdrawn′ = dailyWithdrawn + amt?
```

The primed variables represent after-values.

### Why this style is powerful

Compare the formal form with a vague English statement such as “withdraw the amount if allowed.” The formal version precisely specifies:

- what must be true before,
- what changes,
- exactly how the state changes.

### Where used

This style is useful when correctness of state transitions matters greatly: banking rules, reservation invariants, safety conditions, resource-accounting systems, and other domains where “what must always remain true?” is a central question.

---

## 134. First-order predicate logic — a translation skill rather than a memorization topic

The source teaches a repeatable pattern for translating English statements.

### Key phrase mapping

```text
Every / all / each       → ∀
a member of a set       → ∈
some / at least one     → ∃
and                      → ∧
or                       → ∨
not / no / never         → ¬
if ... then              → ⇒
if and only if           → ⇔
```

### Example from the source

English:

> Every student who has passed all exams graduates.

Formal pattern:

```text
∀ s ∈ Students • PassedAll(s) ⇒ Graduates(s)
```

The core pattern is:

```text
∀ object ∈ domain • condition ⇒ conclusion
```

### Software example from the source

English:

> Every request that fails authentication is rejected.

Formal form:

```text
∀ r ∈ Requests • ¬Authenticated(r) ⇒ Rejected(r)
```

### Practical translation algorithm

When solving an exam question:

1. circle the domain noun (`students`, `requests`, `products`);
2. find quantifier words (`every`, `some`, `at least one`);
3. underline conditions;
4. identify the conclusion;
5. determine whether conditions are joined by AND or OR;
6. assemble the formula.

This is much safer than trying to translate the entire sentence at once.

---

## 135. The subtle difference between implication and “if and only if”

The source includes both `⇒` and `⇔`, and this distinction is often tested.

### Implication

```text
A ⇒ B
```

means: whenever A is true, B must be true.

It does **not** by itself say that B guarantees A.

### Biconditional

```text
A ⇔ B
```

means both directions:

```text
A ⇒ B
B ⇒ A
```

The source example:

```text
OutOfStock(p) ⇔ Quantity(p) = 0
```

is stronger than merely saying “if quantity is zero, the product is out of stock.” It states an equivalence.

### Exam trap

If the English says “if and only if,” do not translate it as a one-way implication.

---
