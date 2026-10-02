# Modules 4 & 5: Software Design & Function-Oriented Design (SA/SD & DFDs)
*Author: Swarup Roy / Dr. Rajib Mall (IIT Kharagpur CSE Curriculum)*

---

## 1. Introduction to Software Design

### 1.1 What is Software Design?
Software design is the phase that transforms the Software Requirements Specification (SRS) document into a blueprint suitable for direct implementation in a programming language.

### 1.2 Two Stages of Design
1. **Preliminary / High-Level Design (Architectural Design)**:
   - Identifies modules, control relationships (invocation hierarchy), and interfaces (data exchanged).
   - Primary representation: **Structure Chart**.
2. **Detailed Design (Low-Level Design)**:
   - For each module, designs detailed internal data structures and algorithms.
   - Deliverable: **Module Specification (MSPEC)** document.

### 1.3 What Makes a Software Design "Good"?
1. **Correctness**: Implements every single requirement in the SRS.
2. **Understandability**: Clear, simple, readable structure (Crucial! ~60% of software lifecycle costs are maintenance; an unreadable design causes maintenance costs to explode).
3. **Modularity**: Cleanly decomposed into near-independent modules arranged in a shallow hierarchy.
4. **Efficiency**: Judicious use of memory and CPU cycles.
5. **Maintainability**: Low impact when adapting to future changes.

---

## 2. Cohesion: Functional Strength of a Module

Cohesion measures how tightly the internal elements (statements/functions) of a single module belong together.

```
LOW COHESION (Worst)                                       HIGH COHESION (Best)
[Coincidental] -> [Logical] -> [Temporal] -> [Procedural] -> [Communicational] -> [Sequential] -> [Functional]
```

### 2.1 The Seven Cohesion Levels

1. **Coincidental (Worst)**:
   - Elements are bundled with no meaningful relationship whatsoever.
   - *Example*: `utilityBag()` containing `logError()`, `readConfigFile()`, `openSocket()`.
2. **Logical**:
   - Performs a set of similar-category operations selected by a passed flag.
   - *Example*: `ioHandler(kind)` branching on whether `kind == "file"` or `"keyboard"` or `"network"`.
3. **Temporal**:
   - Elements are executed within the same time window (e.g., startup/shutdown).
   - *Example*: `startup()` initializing variables, setting up logging, and opening connections.
4. **Procedural**:
   - Elements follow a fixed sequence of execution steps in an algorithm.
   - *Example*: `decodeMessage()` calling `parseHeader()`, `verifyChecksum()`, `extractPayload()`.
5. **Communicational**:
   - All functions operate on and update the same data structure.
   - *Example*: `useStack()` calling `push()`, `pop()`, `peek()` on a shared stack.
6. **Sequential**:
   - Output of one activity feeds directly as the input to the next in a pipeline.
   - *Example*: `searchData()` doing `sort(data) -> find(sortedData) -> display()`.
7. **Functional (Best & Target Goal)**:
   - Every element directly cooperates to achieve a **single, well-defined mathematical/business task**.
   - *Example*: `computeOvertimePay(employee)` in a payroll module.

### 2.2 The Quick Sentence Test for Cohesion
Write one sentence describing what the module does:
- Contains *"and"* with unrelated actions $\implies$ Sequential or Communicational.
- Contains sequence words (*"first"*, *"then"*, *"next"*, *"after"*) $\implies$ Sequential or Temporal.
- Contains *"initialize"* or *"setup"* $\implies$ Temporal cohesion.
- **A single simple sentence with a single action verb** $\implies$ **Functional Cohesion!**

---

## 3. Coupling: Interdependence Between Modules

Coupling measures the degree of interdependence or interaction between two separate modules.

```
LOOSE COUPLING (Best)                                        TIGHT COUPLING (Worst)
[Data Coupling]  -->  [Stamp Coupling]  -->  [Control Coupling]  -->  [Common Coupling]  -->  [Content Coupling]
```

### 3.1 The Five Coupling Levels

1. **Data Coupling (Loosest & Best)**:
   - Modules communicate strictly by passing elementary data items as parameters (e.g., an `int` or `float` amount).
   - *Example*: `computeTax(amount)` returning `amount * 0.18`.
2. **Stamp Coupling**:
   - Modules exchange an entire composite data structure (record, struct) even though only a tiny field is used.
   - *Example*: Passing entire `Order` record to `calculateShipping()` which only reads `order.weight`.
3. **Control Coupling**:
   - One module passes a flag that directs the internal control flow or execution path of another module.
   - *Example*: Passing `isRushOrder` flag to `processOrder()` to decide whether to skip standard queue.
4. **Common Coupling**:
   - Multiple modules share access to the same global data space. If one module mutates the global variable, bugs ripple into others unpredictably.
   - *Example*: Modules reading and writing global `inventoryCount`.
5. **Content Coupling (Tightest & Worst - Defect)**:
   - One module directly branches into or modifies the internal code or memory of another module (e.g., `goto` into another module).

---

## 4. Module Hierarchy Metrics

```
                    [ Root / Main ]          <-- Level 1
                     /     |     \
                    v      v      v
                 [ ModA ] [ ModB ] [ ModC ]  <-- Level 2 (Fan-out = 3)
                    \      |      /
                     v     v     v
                   [ Shared Utility ]        <-- Level 3 (Fan-in = 3)
```

- **Depth**: Number of levels of control in the hierarchy tree.
- **Width**: The overall span of control across the widest level.
- **Fan-Out**: Number of modules directly called/controlled by a module.
  - *Design Rule*: Keep fan-out $\le 7 \pm 2$. High fan-out indicates poor cohesion (a module trying to coordinate too many things).
- **Fan-In**: Number of modules that directly invoke a given module.
  - *Design Rule*: High fan-in is **desirable** because it signals code reuse.
- **Layering Principle**: Upper layers perform high-level coordination; lower layers perform mechanical I/O. Modules must only call down to the immediate lower layer—**lower modules must NEVER call upwards** (preserves abstraction).

---

## 5. Function-Oriented Design (FOD) vs. Object-Oriented Design (OOD)

| Aspect | Function-Oriented Design (FOD) | Object-Oriented Design (OOD) |
| :--- | :--- | :--- |
| **Basic Abstraction** | Functions / processes (Verbs) | Real-world entities / classes (Nouns) |
| **System View** | System is a collection of functions | System is a society of collaborating objects |
| **State Storage** | **Centralized**: Shared global data/files | **Distributed**: Decentralized inside each object |
| **Communication** | Direct function calls passing data | Message passing between encapsulated objects |
| **Grady Booch Quote** | *"Identify verbs if you are after procedural design, and nouns if you are after object-oriented design."* |

### Case Study: Multi-Storey Fire Alarm (80 Floors, 1,000 Rooms)
- **FOD Approach**: 5 global arrays (`detector_status[1000]`, `alarm_status[1000]`, `neighbor_alarms[1000][10]`) manipulated by functions (`interrogate_detectors()`, `ring_alarm()`). No entity owns data; high vulnerability to accidental corruption.
- **OOD Approach**: Two concise classes: `class Detector` (status, location, neighbors) and `class Alarm` (location, status). 1,000 instances of each object manage their own state.

---

## 6. Data Flow Diagrams (DFD)

A DFD (bubble chart) is a hierarchical graphical model showing the data transformations in a system.

### 6.1 DFD Symbols
1. **External Entity**: Rectangle. People or systems outside system control (sources and sinks of data).
2. **Process**: Circle (Bubble). Transformation of data inputs into outputs. Annotated with a **verb**.
3. **Data Flow**: Arrow with data name. **Carries NO control information, no loops, no conditions!**
4. **Data Store**: Two parallel horizontal lines. Persistent data repository.

### 6.2 Data Dictionary Operators
- `+`: Composition ($A + B$)
- `[ , ]`: Selection ($[ \text{credit card} , \text{cash} ]$)
- `( )`: Optional $(( \text{discount} ))$
- `{ }`: Iteration ($\{ \text{item} \}^*$ for 0 or more, $\{ \text{pin} \}_4$ for 4)
- `=`: Equivalence definition
- `/* */`: Comment

### 6.3 Golden Rules of DFDs
1. **Context Diagram (Level 0)**: Exactly **ONE** bubble representing the entire system. All external entities connect here and nowhere else. Annotated with a **noun**.
2. **3 to 7 Rule**: Each bubble at any level decomposes into roughly 3 to 7 child bubbles. Fewer is redundant; more is unreadable.
3. **Balancing Rule**: All data flows entering/leaving a bubble at Level $N$ must exactly match the data flows entering/leaving the decomposed Level $N+1$ diagram.
4. **Data Stores**: Must connect only to processes (bubbles), never directly to external entities or other data stores!

---

## 7. Structured Design: Transform & Transaction Analysis

### 7.1 Transform Analysis
Used when input data passes through a sequential transform pipeline:
1. **Afferent Branch**: Converts raw physical input into clean logical form.
2. **Central Transform**: Performs the core computation / business logic.
3. **Efferent Branch**: Converts logical results into physical output (screens, reports).
4. **Factoring**: The central transform and branches are placed under a root module on the structure chart.

### 7.2 Transaction Analysis
Used in transaction-driven systems where an input transaction tag branches into one of several alternative action paths.
- The structure chart contains a **Transaction Center** module that dispatches execution to dedicated transaction submodules.
