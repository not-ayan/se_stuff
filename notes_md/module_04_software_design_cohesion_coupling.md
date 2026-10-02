# Module 4: Software Design & Modularity Principles

![Module 4: The 7 Levels of Cohesion & 6 Levels of Coupling Spectrum](/images/cohesion_coupling_diagram.jpg)

---

# Part IV — Software Design

## 48. Where design sits between requirements and code

The Software Design lecture defines design as the transformation of a validated SRS into a form that can be implemented in a programming language.

The inputs and outputs are explicit:

```text
Validated SRS
     ↓
Software Design
     ↓
Design documents / module specifications
     ↓
Code
```

The design phase decides:

- module structure,
- control relationships among modules,
- interfaces and data exchanged,
- data structures inside modules,
- algorithms.

This is the “HOW” stage that follows the SRS “WHAT.”

---

## 49. Anatomy of a module: data + functions

The source depicts a module as a combination of information and behavior. Its example data include a customer record, account balance, and transaction log. Example functions include validation, interest computation, transaction posting, receipt generation, and audit entry.

This is a deliberately general abstraction. A module is not merely a function; it can contain the data it works with and multiple closely related operations.

The quality question becomes: **do those data and functions belong together, and how much does the module depend on other modules?** That leads directly to cohesion and coupling.

---

## 50. High-level versus detailed design

### High-level design

The source says high-level design:

- identifies modules,
- identifies control relationships,
- identifies interfaces,
- commonly uses a structure chart,
- produces the program structure/architecture.

### Detailed design

Detailed design:

- designs module data structures,
- designs module algorithms,
- produces module specifications detailed enough to code from.

Thus:

```text
Validated SRS
   ↓
High-Level Design
   → modules + relationships + interfaces
   ↓
Detailed Design
   → data structures + algorithms
   ↓
Code-ready module specifications
```

---

## 51. What makes a design good?

The lecture highlights four major properties:

1. **Correct** — implements every SRS functionality.
2. **Understandable** — has a clear structure other engineers can follow.
3. **Efficient** — uses processing time and resources sensibly.
4. **Maintainable** — can be changed safely as requirements evolve.

The lecture gives special emphasis to understandability. A design that is hard to understand is difficult to maintain and change, and the lecture states that roughly 60% of total lifecycle effort is typically spent on maintenance. Again, that percentage is used as a lecture-level heuristic; the conceptual takeaway is that maintenance is a major part of software life.

---

## 52. Modularity: divide and conquer

A good design is decomposed into a clean set of modules. The source repeatedly emphasizes **divide and conquer**.

If modules are close to independent, each one can be understood in isolation. This lowers the amount of information a developer needs to hold in their head simultaneously.

The hierarchy should also be tree-like rather than tangled. The payroll example separates employee records, time and attendance, deductions and tax, and payslip generation.

The deeper idea is not “make as many modules as possible.” Over-decomposition also adds coordination overhead. The goal is to find modules whose boundaries make the overall system easier to understand.

---

## 53. Cohesion

**Cohesion** measures the functional strength of a single module: how strongly the responsibilities inside one module belong together.

The source gives a scale from low to high:

```text
Coincidental
   ↓
Logical
   ↓
Temporal
   ↓
Procedural
   ↓
Communicational
   ↓
Sequential
   ↓
Functional
```

The target is **functional cohesion**: all elements contribute to one clearly describable purpose.

### Why high cohesion helps

A highly cohesive module has an obvious reason to exist. It is easier to understand, explain, test, and potentially reuse.

---

## 54. Seven types of cohesion

### 54.1 Coincidental cohesion

Elements are grouped together without meaningful relationship. The lecture’s example mixes error logging, file reading, and socket opening.

This is the weakest form because the module is effectively a random utility bag.

### 54.2 Logical cohesion

Several operations belong to the same broad category but one operation is selected by a parameter. An I/O handler that switches among file, keyboard, or network behavior illustrates this.

The operations are similar conceptually, but the module still contains multiple distinct responsibilities.

### 54.3 Temporal cohesion

Functions are grouped because they execute in the same time period. The lecture’s startup example initializes variables, sets up logging, and opens connections.

The common link is “these things happen during startup,” not one single functional purpose.

### 54.4 Procedural cohesion

Elements follow a sequence of steps in one procedure, such as successive stages in message decoding.

The relationship comes from order of execution.

### 54.5 Communicational cohesion

Elements operate on the same data structure. The stack example pushes, pops, and peeks at the same stack.

The shared data provides the relationship.

### 54.6 Sequential cohesion

The output of one part becomes the input of the next, such as `sort → search → display`.

The functions form a pipeline.

### 54.7 Functional cohesion

Every element contributes to one single, well-defined task. The payroll example groups work such as calculating work hours, overtime, and deductions as one coherent payroll-processing purpose in the lecture.

---

## 55. Quick cohesion test

The lecture gives a clever textual test: write one sentence that explains what the module does.

Watch the language:

- a compound “and” sentence may indicate sequential or communicational cohesion;
- words such as “first,” “next,” “after,” or “then” suggest sequential or temporal relationships;
- “initialize” strongly suggests temporal cohesion;
- a single simple sentence describing one purpose is a strong sign of functional cohesion.

The examples are:

```text
startup() initializes variables, sets up logging, and opens connections.
→ temporal

useStack() pushes, pops, and peeks at the same stack.
→ communicational

search() sorts the data and then finds the match.
→ sequential

payroll() computes the overtime pay for an employee.
→ functional
```

This heuristic is not a mathematical measurement. It is a fast design-review aid.

---

## 56. Coupling

**Coupling** measures how interdependent two modules are. The source connects coupling to the complexity of the interface between modules.

The scale is:

```text
Data → Stamp → Control → Common → Content
loosest                         tightest
```

The design goal is **low/loose coupling**. When one module can change without forcing changes in another, the design is easier to maintain.

---

## 57. Five types of coupling

### Data coupling

Modules exchange only an elementary data item through a parameter. Example: passing an integer amount.

This is the loosest and most desirable form in the lecture’s scale.

### Stamp coupling

A composite structure is passed even though only part of it is used. Example: passing a whole `Order` object when only `order.total` is needed.

The interface exposes more structure than necessary.

### Control coupling

One module passes a flag that directs the logic of another module. Example: `isRushOrder` causes the callee to choose one branch or another.

This means information crossing the boundary is influencing the callee’s control flow rather than merely supplying data.

### Common coupling

Modules share global data. Two modules can both access and modify a global inventory count.

This creates hidden dependencies because a change from one location can affect the other.

### Content coupling

One module directly reaches into another’s internals, such as jumping into the middle of another module’s code. This is the tightest form and is presented as almost always a defect.

---

## 58. Control coupling worked example

The lecture shows `validateOrder()` setting an `isRushOrder` flag which is then passed to `processOrder()`.

The flag does not merely describe a business datum. It tells the second module **which path of its own internal logic to execute**.

That is why this is worse than simple data coupling: the caller must know something about the callee’s control decisions.

A useful test is:

> If a parameter is essentially telling the receiving module **how to behave**, rather than merely supplying data it needs, suspect control coupling.

---

## 59. Module hierarchy: depth, width, fan-out, fan-in

These measures concern the shape of the whole module tree.

### Depth
Number of levels of control in the hierarchy.

### Width
Overall span across the widest level.

### Fan-out
How many modules a module directly controls/calls.

### Fan-in
How many modules directly call a particular module.

The source emphasizes a design intuition:

- **High fan-in** often indicates useful reuse.
- **High fan-out** can be a warning that a module is coordinating too many subordinates and may lack cohesion.

The structure-chart example shows a `Log Utility` called from three places, giving it fan-in of 3, while `Main` directly controls three modules, giving it fan-out of 3.

---

## 60. Visibility and layering

The source defines a module that controls another as **superordinate**, while the controlled module is **subordinate**.

A module is visible to another if the caller can reach it directly or indirectly.

The **layering principle** says a module should call only modules in the immediately lower layer. Lower layers perform lower-level mechanical work such as I/O; upper layers coordinate and manage.

The abstraction principle is crucial:

> A lower-level module must not call upward into a higher-level module.

This preserves direction of dependency and makes the structure easier to reason about.

---

## 61. Goal of high-level design

The source describes high-level design as mapping system functions \(\{f_1, f_2, …, f_n\}\) onto modules \(\{m_1, m_2, …, m_j\}\) such that:

- each module has high cohesion,
- coupling among modules is low,
- the modules form a neat, shallow hierarchy.

This mapping is one of the core design decisions of the course.

---

## 62. Function-oriented design versus object-oriented design

The two philosophies ask different first questions.

### Function-oriented design (FOD)

- views the system as functions to perform;
- successively refines functions into sub-functions;
- maps functions to modules;
- centralizes state in shared data structures.

### Object-oriented design (OOD)

- views the system as a collection of real-world entities/objects;
- bundles data with the operations acting on that data;
- lets objects communicate through messages;
- distributes state across objects.

The lecture’s mnemonic is a quote attributed to Grady Booch:

> “Identify verbs if you are after procedural design, and nouns if you are after object-oriented design.”

The point is a modeling heuristic: procedural analysis naturally focuses on actions, while object-oriented analysis naturally focuses on entities and their responsibilities.

---

## 63. Function-oriented worked example: create-library-member

The source starts with:

```text
create-library-member
        /       |       \
       /        |        \
assign membership  create-member-record  print-bill
number
```

Each sub-function can be refined again until the resulting modules are small enough to implement directly.

This is **functional decomposition**: repeatedly break a larger function into smaller functions while preserving the overall purpose.

The key concept is recursive refinement rather than merely splitting the screen into UI components.

---

## 64. Object-oriented library example

In the OOD version, each library member is represented as an object with its own state and operations. A class defines the shared structure and behavior of similar objects, such as a `Member` class.

The lecture also mentions inheritance: classes may inherit features from a more general superclass.

A central rule is that one object’s functions do not directly reach into another object’s data. Objects communicate by sending messages.

This creates encapsulation of state.

---

## 65. Where the state lives: the central contrast

The source visualizes the distinction clearly.

### Function-oriented
Many functions interact with one central pool of member records.

```text
createMember()  ─┐
returnBook()    ─┼→ Member Records ← issueBook()
deleteMember() ─┤
updateRecord() ─┘
```

### Object-oriented
Each object owns its state and exposes behavior through its interface.

```text
Member: Asha  ↔ messages ↔ Member: Rahul
    own data + methods        own data + methods

Book: OS Concepts             Librarian
own data + methods            own data + methods
```

The important conceptual contrast is **centralized versus distributed state**.

---

## 66. Fire-alarm case study: why the difference matters

The case describes an 80-floor, 1,000-room building. Every room has a smoke detector and alarm.

When a detector reports a fire, the system must:

1. determine the location,
2. sound alarms in neighboring locations,
3. display a message for fire-fighting staff,
4. allow staff to reset alarms after the condition is handled.

### Function-oriented version

The lecture uses five global arrays:

- `detector_status[1000]`
- `detector_locs[1000]`
- `alarm_status[1000]`
- `alarm_locs[1000]`
- `neighbor_alarms[1000][10]`

and six functions:

- `interrogate_detectors()`
- `get_detector_location()`
- `determine_neighbor()`
- `ring_alarm()`
- `reset_alarm()`
- `report_fire_location()`

All functions can access the shared state. Nothing explicitly owns it. Therefore, correctness depends on all functions consistently understanding the same global structures.

### Object-oriented version

The source defines two small classes:

`Detector`
- attributes: status, location, neighbors;
- operations: create, senseStatus, getLocation, findNeighbors.

`Alarm`
- attributes: location, status;
- operations: create, ringAlarm, getLocation, resetAlarm.

In practice there is a Detector object and Alarm object associated with each room.

### The deeper lesson

The source concludes that real systems commonly use both styles. An overall design may use objects to encapsulate data, while individual class methods can still be refined in a top-down function-oriented way.

Thus FOD and OOD are not presented as mutually exclusive religions; they are complementary perspectives.

---

---

# Deep Dive: Software Design, Cohesion, Coupling & Structure Charts

# Deep Dive G — Software Design

## 136. What changes when the project moves from SRS to design?

The Software Design lecture describes design as the transformation of a validated SRS into a form that is easily implementable in a programming language.

The design phase decides:

- module structure,
- how modules call/control one another,
- interfaces and exchanged data,
- each module's data structures,
- each module's algorithms.

The important distinction is that the SRS is primarily about required external behavior, while design creates the internal organization needed to implement that behavior.

---

## 137. High-level design versus detailed design — do not mix them

### High-level design

Answers:

- Which modules exist?
- Which modules call which?
- What interfaces connect them?
- What is the overall program structure?

The source identifies the **structure chart** as the usual notation.

### Detailed design

Answers:

- What data structures does each module use?
- What algorithm does each module execute?
- What is detailed enough for direct coding?

### Example

Suppose the system has a top-level function `ProcessOrder`.

High-level design might produce:

```text
ProcessOrder
├── ValidateOrder
├── CheckInventory
├── CalculateBill
└── UpdateRecords
```

Detailed design then specifies exactly how `CheckInventory` searches inventory, what data structures it uses, and what it returns.

### Where important

This distinction appears in design questions asking “what is high-level design?” or “what is detailed design?” It also helps explain why a structure chart is not a substitute for algorithm design.

---

## 138. What makes a good design — the four high-level qualities

The source names four properties:

### Correct

Implements every functionality specified in the SRS.

### Understandable

The structure can be followed by other engineers.

### Efficient

Uses processing time and resources sensibly.

### Maintainable

Can be changed safely as requirements evolve.

The lecture places special emphasis on **understandability**. The reason is straightforward: if nobody can understand the architecture, it becomes harder to verify correctness, diagnose faults, and make changes safely.

### Where important

These qualities are useful whenever a question asks “what is a good software design?” Do not answer only “high cohesion and low coupling.” Those are specific design mechanisms supporting the broader qualities.

---

## 139. Modularity — divide and conquer at the design level

The design lecture calls modularity a fundamental attribute of good design. The idea is to decompose a large system into a cleanly organized set of modules.

### Why modularity helps

If modules are nearly independent, each module can be understood in relative isolation. That reduces the amount of information a developer must keep in mind.

A well-modularized system also localizes change. If a requirement affects one cohesive module and the module's interface stays stable, the rest of the system may require little or no modification.

### Where used

Modularity is central to:

- large codebases,
- team development,
- testing,
- maintenance,
- reuse,
- fault isolation.

### Practical extension: module boundaries should follow responsibilities

A module boundary is useful when it separates responsibilities that can be understood and changed independently. This is why cohesion and coupling are taught immediately after modularity.

---

## 140. Cohesion — measure the internal unity of one module

The source defines cohesion as a measure of the **functional strength of a single module**. A cohesive module performs one clearly describable task.

The seven forms are presented from worst to best:

```text
Coincidental
     ↓
Logical
     ↓
Temporal
     ↓
Procedural
     ↓
Communicational
     ↓
Sequential
     ↓
Functional
```

### The key question

> “How strongly do the responsibilities inside this one module belong together?”

If the answer is “barely,” cohesion is low.

If the answer is “every part contributes to one well-defined task,” cohesion is high.

---

## 141. Cohesion type 1 — coincidental cohesion

This is the weakest form in the source.

The module contains unrelated elements simply because they happened to be grouped together.

Source-style example:

```text
utilityBag()
    logError()
    readConfigFile()
    openSocket()
```

These actions may all be “utilities,” but there is no strong functional relationship among them.

### Why bad?

The module is difficult to describe in one meaningful sentence. Changes to one activity are unlikely to have much conceptual relationship to the others.

### Where you might encounter it

Large “miscellaneous” or “helper” modules that accumulate unrelated code over time.

### Exam clue

Words such as “unrelated,” “randomly grouped,” or “no meaningful relationship.”

---

## 142. Cohesion type 2 — logical cohesion

Logical cohesion groups operations that are similar in category but performs one of them based on a flag or selector.

Example:

```text
ioHandler(kind)
   if kind == file      → readFile()
   else if keyboard     → readKeyboard()
   ...
```

### Why better than coincidental but still weak

At least the functions belong to one broad conceptual category. However, the module contains different operations that are activated selectively.

### Exam clue

Look for a **generic category handler** controlled by a parameter or flag.

---

## 143. Cohesion type 3 — temporal cohesion

Elements are grouped because they happen during the same time period or phase, not because they perform one unified business function.

Source example:

```text
startup()
    initVars()
    setupLogging()
    openConnections()
```

These belong to startup, so they have a timing relationship.

### Recognition clue

Words like:

- initialize,
- startup,
- shutdown,
- boot,
- beginning.

The source's quick test explicitly points to the word “initialize” as a clue.

---

## 144. Cohesion type 4 — procedural cohesion

Elements are grouped because they follow a specific sequence of steps within one procedure.

Source-style example:

```text
decode(message)
    parseHeader()
    verifyChecksum()
    extractPayload()
```

The steps belong to one procedure, but the emphasis is on the sequence rather than one indivisible single function.

### Recognition clue

Look for words such as:

- first,
- next,
- then,
- after.

---

## 145. Cohesion type 5 — communicational cohesion

Several operations work on the same data structure.

Source example:

```text
useStack(s)
    push(s, 1)
    pop(s)
    peek(s)
```

The functions are related because they operate on `s`.

### Recognition clue

Ask:

> “Are these operations grouped mainly because they read or update the same data?”

If yes, think communicational cohesion.

---

## 146. Cohesion type 6 — sequential cohesion

The output of one element directly feeds the next element.

Source example:

```text
sort(data)
   ↓
search(sortedData)
   ↓
display(result)
```

### Recognition clue

Look for a chain:

```text
A produces output → B consumes it → C consumes B's output
```

The source's quick test uses wording such as “then” as a clue.

---

## 147. Cohesion type 7 — functional cohesion

This is the strongest form in the source. Every element contributes to one clearly defined task.

A payroll module that computes the overtime pay for one employee is a good example of a single clear purpose.

### Recognition clue

The one-sentence description is simple:

> “This module computes overtime pay.”

There is no need to connect unrelated actions with “and.”

### Why high cohesion matters

The source links high cohesion to:

- easier isolation and understanding,
- fewer error propagations,
- greater reuse.

### Practical extension

High cohesion tends to make a module easier to test because the input-output purpose is narrow enough to define meaningful cases.

---

## 148. The cohesion “one-sentence test” — how to use it under exam pressure

The design lecture provides an unusually practical diagnostic method.

Write one sentence describing what the module does.

Then inspect the sentence.

```text
“Does A and B and C ...”
       ↓
Possibly procedural/communicational or low cohesion

“First ..., then ..., after ...”
       ↓
Sequential/procedural/temporal clue

“Initialize ...”
       ↓
Temporal clue

“Computes one clearly defined thing.”
       ↓
Functional cohesion clue
```

This test is not a perfect mathematical classifier; the source itself says the classification is somewhat subjective. But it is a very effective exam heuristic.

---

## 149. Coupling — measure the interdependence between modules

The source defines coupling as the measure of how interdependent two modules are. It depends on the complexity of the interface between them.

The goal is:

> **Low coupling.**

Why? Because when modules depend heavily on one another, changes in one place are more likely to break another.

The source classifies coupling from best to worst:

```text
Data
 ↓
Stamp
 ↓
Control
 ↓
Common
 ↓
Content
```

---

## 150. Data coupling

Two modules exchange only elementary data items through parameters.

Example:

```text
computeTax(amount)
```

Only the amount is passed.

### Why desirable

The interface is small and explicit. A change to unrelated fields elsewhere does not have to affect the receiving module.

### Exam clue

Look for simple scalar/basic values passed as parameters.

---

## 151. Stamp coupling

One module passes a composite/structured record to another even though the receiver uses only part of it.

Example from the source:

```text
shipOrder(order)
    return order.total
```

The complete `Order` structure is passed even though only `total` is needed.

### Why worse than data coupling

The receiving module becomes dependent on the structure of a larger data object.

### Recognition clue

A whole record/object/structure crosses the interface when only a small portion is needed.

---

## 152. Control coupling

One module passes a flag that directs another module's internal logic.

Source example:

```text
processOrder(isRush)
```

The flag determines whether an order follows the rush or standard path.

### Why worse

The caller is no longer simply providing data. It is influencing the **control flow** of the callee.

The source's worked example explains this using `validateOrder()` setting `isRushOrder`, which `processOrder()` then interprets.

### Recognition clue

Look for parameters named like:

- flag,
- mode,
- option,
- type,
- switch,

when that parameter selects the receiver's algorithmic branch.

---

## 153. Common coupling

The modules share access to common global data.

Source example:

```text
inventoryCount
```

may be read or modified by several modules.

### Why risky

A change made by one module can affect others unexpectedly. There is less encapsulation around the shared state.

### Recognition clue

Look for global variables, common blocks, or shared mutable state directly visible to multiple modules.

---

## 154. Content coupling

The strongest and worst form in the source. One module directly reaches into another module's internals, such as jumping into the middle of another module's logic.

The source gives a `goto`-style example.

### Why almost always a defect

The boundary of the module is effectively broken. Internal implementation details become external dependencies.

If module A can assume where a label or internal variable exists inside module B, B cannot safely change its internal structure.

### Exam clue

Look for direct access to another module's internals or branching into its code.

---

## 155. Cohesion and coupling together — the core design slogan

The design lecture's practical goal can be summarized as:

> **High cohesion inside modules + low coupling between modules.**

These are not competing properties. They describe different boundaries:

```text
One module
┌───────────────────────────────┐
│ How strongly do its parts     │
│ belong together?              │
│            → COHESION         │
└───────────────────────────────┘

Between modules
A ───────── interface ───────── B
       How much do A and B
       depend on each other?
              → COUPLING
```

### A practical change scenario

Suppose a payment module has high cohesion and communicates with the billing module using only a transaction amount and result code. If the internal payment algorithm changes, billing may continue working unchanged.

Now imagine billing directly manipulates payment module's internal state. That creates tight coupling, increasing the cost of change.

---

# Deep Dive H — Module Hierarchy

## 156. Depth, width, fan-out, and fan-in

The source uses four structural measures.

### Depth

Number of levels of control in the hierarchy.

### Width

Overall span of control across the widest level.

### Fan-out

Number of modules directly controlled/called by one module.

### Fan-in

Number of modules that directly call a given module.

### Why these are useful

They help describe the **shape of the whole module tree**, whereas cohesion and coupling describe individual modules or their relationships.

---

## 157. Fan-in — why reuse can be good

If many modules call a utility that performs a genuinely common function, fan-in can be high.

The source example has a `Log Utility` called from three places.

```text
        Main
      /  |   \
     A   B    C
      \  |   /
       Log Utility
```

The lecture describes high fan-in as usually good because it signals reuse.

### Important qualification

High fan-in is not automatically good. A shared utility should actually represent a stable common responsibility. Otherwise a central module may become a fragile bottleneck.

The source's statement is about the general design signal: **reuse is usually valuable when the shared functionality is cohesive**.

---

## 158. Fan-out — why too much coordination can be a warning

If one module controls many subordinate modules directly, fan-out becomes high.

The source describes high fan-out as a warning sign because a module coordinating too many subordinates may lack cohesion.

### Practical interpretation

A top-level coordinator naturally has some fan-out. The problem appears when the parent knows too many low-level details or must manage too many unrelated tasks.

### Refactoring intuition

Instead of:

```text
Main
├─ Validate A
├─ Validate B
├─ Load File
├─ Format Report
├─ Save Database
├─ Send Email
├─ Log Audit
├─ Check Permission
└─ ...
```

a designer might create meaningful intermediary modules so that each layer has a clearer abstraction.

This is a practical extension illustrating the source's warning about excessive fan-out.

---

## 159. Layering and visibility

The source states:

- a module that controls another is superordinate;
- the controlled module is subordinate;
- a module is visible to another if it calls it directly or indirectly;
- a layering principle says a module should call the layer immediately below it;
- lower levels handle low-level mechanical work such as I/O;
- upper levels handle managerial/coordinating work;
- lower-level modules should not call upward.

### Why layering matters

Imagine a UI module, business-logic layer, and data-access layer:

```text
Presentation / UI
        ↓
Business Logic
        ↓
Data Access / I/O
```

The UI should not need to manipulate low-level storage details directly if the architecture intends to enforce the business layer. Likewise, a low-level I/O module should not start calling the user-interface logic upward.

### Where important

Layering is useful when systems become large enough that responsibilities need clear boundaries. It improves comprehensibility and reduces tangled dependencies.

### Exam clue

If the question describes modules calling both downward and upward across levels, mention a violation of layering/abstraction.

---

## 160. High-level design as a mapping problem

The design lecture describes high-level design mathematically as mapping system functions:

```text
{f1, f2, ..., fn}
```

onto modules:

```text
{m1, m2, ..., mj}
```

such that:

- cohesion is high,
- coupling is low,
- the hierarchy is neat and shallow.

This is a useful conceptual bridge between requirements analysis and design.

### Why this matters

There is no universal rule saying “one requirement = one module.” Several functions may belong together, or one function may need to be decomposed. The goal is to find a partition that creates understandable and manageable responsibilities.

---

# Deep Dive I — Function-Oriented and Object-Oriented Design

## 161. Function-oriented design — start from verbs

The source describes function-oriented design as viewing the system as a set of functions, successively refining functions into detailed sub-functions, and mapping them onto a module structure.

The state is described as **centralized**, held in data shared across many functions.

The worked example:

```text
create-library-member
├── assign-membership-number
├── create-member-record
└── print-bill
```

Each function can then be refined further until the resulting modules are small enough to implement directly.

### Where useful

Function-oriented thinking is particularly natural when the problem is expressed as a clear sequence or collection of transformations:

- data processing pipelines,
- batch processing,
- transaction processing,
- algorithmically structured systems.

The exact application fit depends on the system; the source presents FOD as one of two complementary design philosophies.

---

## 162. Object-oriented design — start from nouns/entities

The source describes object-oriented design as viewing the system as a collection of real-world objects/entities. Each object bundles its own data with the functions that act on it.

Objects communicate by passing messages, and state is decentralized.

The library example describes `Member` objects containing their own data and behavior, with classes defining shared structure and behavior for similar objects.

### Where useful

Object-oriented thinking becomes especially natural when the domain contains entities with:

- identity,
- state,
- behavior,
- relationships with other entities.

Examples include members, books, accounts, orders, employees, cars, reservations, and physical devices.

---

## 163. The central contrast: where does state live?

This is the single most important conceptual difference in the source's comparison.

### Function-oriented

```text
               shared state
            ┌───────────────┐
            │ member records│
            │ orders        │
            │ etc.          │
            └───────────────┘
              ↑    ↑    ↑
             f1    f2   f3
```

Multiple functions operate over a common pool of state.

### Object-oriented

```text
Member A       Member B       Book X
data+methods   data+methods   data+methods
      \            |            /
             messages
```

Each object manages its own state.

### Why state distribution matters

Centralized state makes it easy for many functions to access the same information, but it can create broad dependencies. Distributed state improves encapsulation because the owner of the data controls how it is used.

The supplied lecture's fire-alarm case is designed to make exactly this point.

---

## 164. Fire-alarm case — why the example is powerful

The source uses a building with **80 floors and 1,000 rooms**, each containing a smoke detector and alarm.

Required behavior includes:

- determining the location of a detected fire,
- sounding neighboring alarms,
- flashing a console message,
- allowing staff to reset alarms.

### Function-oriented representation

The source puts information into global arrays such as:

```text
detector_status[1000]
detector_locs[1000]
alarm_status[1000]
alarm_locs[1000]
neighbor_alarms[1000][10]
```

Functions then operate on that shared data.

The source's core criticism is that **nothing owns the data**. Correctness depends on every function using the shared structures consistently.

### Object-oriented representation

The source introduces classes such as:

```text
Detector
    status
    location
    neighbors

    create()
    senseStatus()
    getLocation()
    findNeighbors()

Alarm
    location
    status

    create()
    ringAlarm()
    getLocation()
    resetAlarm()
```

Now one detector object and one alarm object can exist for each room.

### The deeper lesson

The source does not say that one philosophy makes the other obsolete. It explicitly says that in practice many real designs use both: object-oriented design can shape classes, while top-down function-oriented decomposition can still be used to design methods inside those classes.

This is important because students sometimes treat FOD and OOD as mutually exclusive programming religions. The source frames them as complementary design approaches.

---
