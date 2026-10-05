# Module 5: Software Design — Modularity, Cohesion, Coupling & FOD vs. OOD

![Module 5: Software Design — Modularity, Cohesion/Coupling & FOD vs OOD](/images/fod_vs_ood_design.jpg)

---

# Part I — Introduction to Software Design

## 1. What is the Software Design Phase?
The design phase is the critical engineering bridge that transforms a validated **Software Requirements Specification (SRS)** into a technical representation that is readily implementable in a chosen programming language.

```text
┌─────────────────┐       ┌──────────────────────┐       ┌──────────────────────┐
│  Validated SRS  │ ====> │ Software Design      │ ====> │ Implementable Code   │
│  (What to do)   │       │ (How to structure)   │       │ (Working Modules)    │
└─────────────────┘       └──────────────────────┘       └──────────────────────┘
```

The design process decides:
- The overall **module structure** and decomposition.
- The **control relationships** (which module calls and governs which).
- The **interfaces and data exchanged** between modules.
- The **internal data structures** of each module.
- The **algorithms** executed within each function.

---

## 2. High-Level Design vs. Detailed Design

Examiners frequently require students to distinguish between the two distinct sub-phases of software design:

```text
Validated SRS Document
         │
         ▼
┌────────────────────────────────────────────────────────┐
│                   HIGH-LEVEL DESIGN                    │
│ • Identify the system modules                         │
│ • Identify control relationships among modules         │
│ • Identify module interfaces and data exchanged        │
│ • Output: Program Structure / Software Architecture    │
│   (Represented via Structure Charts)                   │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                    DETAILED DESIGN                     │
│ • Design internal data structures for each module      │
│ • Design algorithms for each module                    │
│ • Output: Code-ready module specifications             │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
                   Coding & Unit Testing
```

---

## 3. What Makes a Design "Good"?

Because there is no single, unique design solution for any non-trivial specification, we need rigorous objective yardsticks to distinguish a superior design from an inferior one.

A good software design must be:
1. **Correct:** Accurately implements every requirement specified in the SRS.
2. **Understandable:** Exhibits a clear, readable structure that any qualified engineer can easily comprehend without consulting the original author.
3. **Efficient:** Utilizes processing time, memory, network bandwidth, and storage sensibly.
4. **Maintainable:** Amenable to safe, localized modifications as requirements evolve.

### 3.1 Why Understandability Matters Most
> **Key Insight (Rajib Mall):** Understandability is the single master property that governs nearly all other quality attributes. Since **60% or more of lifecycle effort is spent on maintenance**, a design that is difficult to understand multiplies maintenance costs exponentially. Every other quality—correctness, efficiency, and security—is vastly harder to verify in a design nobody can read.

---

# Part II — Modularity, Cohesion & Coupling

## 4. Modularity: Divide and Conquer
Modularity is the fundamental attribute of any engineered design. A large system is decomposed into a cleanly organized set of discrete modules—the classic **divide-and-conquer** principle.
- If modules are nearly independent of each other, each module can be reasoned about, implemented, and tested in isolation.
- Modules must be organized in a neat, tree-like hierarchy rather than an entangled web of cross-calls.

To measure the quality of modular decomposition, software engineering relies on two central yardsticks: **Cohesion** and **Coupling**.

```text
       COHESION                               COUPLING
(Intra-module strength)                (Inter-module dependency)
How tightly related are elements       How dependent are two separate
WITHIN a single module?                 modules on EACH OTHER?
     AIM: HIGH                              AIM: LOW
```

---

## 5. Cohesion: The 7 Levels (Worst to Best)

**Cohesion** measures the functional strength of a single module. A highly cohesive module performs a single, well-defined, focused task.

```text
Coincidental < Logical < Temporal < Procedural < Communicational < Sequential < Functional
[ WORST: Low Cohesion ]                                             [ BEST: High Cohesion ]
```

### Complete Classification of the 7 Cohesion Levels:

| Cohesion Level | Rank | Exact Definition | Code Example |
| :--- | :--- | :--- | :--- |
| **Coincidental** | 1 (Worst) | Elements are grouped into the same module with no meaningful relationship whatsoever. Pure random "utility bags". | `function misc() { logError(); readFile(); openSocket(); }` |
| **Logical** | 2 | Module performs a set of similar-category operations selected by a passed-in control flag. | `function ioHandler(flag) { if(flag == "file") readFile(); else readKeyboard(); }` |
| **Temporal** | 3 | Elements are grouped together solely because they execute within the same window of time (e.g. system startup or shutdown). | `function startup() { initVars(); setupLogging(); openConnections(); }` |
| **Procedural** | 4 | Elements are grouped because they execute in a specific sequential order across different algorithmic steps to accomplish a composite procedure. | `function decode(msg) { parseHeader(msg); verifyChecksum(msg); extractPayload(msg); }` |
| **Communicational** | 5 | All elements inside the module operate on the same input data structure or produce the same output data structure. | `function useStack(s) { push(s, val); pop(s); peek(s); }` (all operate on stack `s`) |
| **Sequential** | 6 | The output data produced by one processing element serves as the direct input to the next processing element (pipeline). | `function search(data) { const sorted = sort(data); return find(sorted); }` |
| **Functional** | 7 (Best) | **Every single element in the module contributes directly to executing one and only one well-defined mathematical or operational task.** | `function computeOvertimePay(employee) { ... }` or `Math.sin(angle)` |

### The Sentence Test for Cohesion
A famous practical heuristic for determining the cohesion of a module:
1. Write a single sentence describing what the module accomplishes.
2. If the sentence is compound (contains conjunctions like **"and"** or **"or"**), the module likely has **communicational**, **logical**, or **sequential** cohesion.
3. If the sentence uses temporal sequence words like **"first"**, **"next"**, **"after"**, or **"initialize"**, it likely has **temporal** or **procedural** cohesion.
4. If it is a clean, single sentence without conjunctions describing one specific action, it has **functional cohesion**.

---

## 6. Coupling: The 5 Levels (Best to Worst)

**Coupling** measures the degree of interdependence between two separate modules. High coupling means a change in one module breaks another; low coupling promotes isolation.

```text
Data Coupling < Stamp Coupling < Control Coupling < Common Coupling < Content Coupling
[ BEST: Loose Coupling ]                                          [ WORST: Tight Coupling ]
```

### Complete Classification of the 5 Coupling Levels:

| Coupling Level | Rank | Description | Code Demonstration |
| :--- | :--- | :--- | :--- |
| **Data Coupling** | 1 (Best) | Modules communicate exclusively by passing elementary data items (e.g., integers, booleans, floats) as formal parameters. | `function computeTax(amount: number) { return amount * 0.18; }` |
| **Stamp Coupling** | 2 | Modules pass a composite data structure (record, struct, object), but the called module uses only a small subset of the fields. | `function ship(order: Order) { print(order.address); }` (Passing whole `Order` when only address is needed) |
| **Control Coupling** | 3 | One module passes a control flag or signal that explicitly dictates the internal execution logic or branch choices of the other module. | `function process(isRush: boolean) { if (isRush) shipExpress(); else shipEconomy(); }` |
| **Common Coupling** | 4 | Multiple modules share direct read/write access to the same global data area or shared variables. | `let globalInventory = 100; function buy() { globalInventory--; }` |
| **Content Coupling** | 5 (Worst) | One module directly accesses, branches into, or modifies the internal code or private memory space of another module (e.g. `goto` into another module). | A module jumping directly into label 2 of module B: `goto ModuleB.label2;` |

---

## 7. Shape of the Module Hierarchy

In a structure chart representing software architecture, modular structure is evaluated using four topological dimensions:

```text
                 [ Root / Main Module ]          <── Level 0
                    /       |       \
                   /        |        \
                [Mod A]  [Mod B]   [Mod C]       <── Level 1
                /     \             /
             [Sub1]  [Sub2]      [Sub3]          <── Level 2
```

1. **Depth:** The number of levels of control in the hierarchy (e.g., Depth = 3).
2. **Width:** The overall span of control across the widest single horizontal level of the hierarchy.
3. **Fan-Out:** The number of modules directly controlled (called) by a given superordinate module.
   - *Rule:* A very high fan-out ($\ge 7$) indicates that a module is doing too much coordinating work and typically lacks functional cohesion.
4. **Fan-In:** The number of superordinate modules that directly invoke a given subordinate module.
   - *Rule:* **High fan-in is highly desirable!** It signifies widespread code reuse (e.g., a shared logging or math routine).

### Layering Rules of Modular Abstraction:
- **Superordinate & Subordinate:** The calling module is superordinate; the called module is subordinate.
- **Layering Principle:** A module may call only modules in the layer immediately below it.
- **Strict Abstraction:** A lower-level utility or I/O routine must **never call upward** into a higher-level business or coordinating module.

---

# Part III — Two Design Philosophies: FOD vs. OOD

## 8. Function-Oriented Design (FOD) vs. Object-Oriented Design (OOD)

Software engineering has witnessed two primary paradigms for decomposing complex systems:

```text
                    TWO CONTRASTING DESIGN PHILOSOPHIES
                                     │
         ┌───────────────────────────┴───────────────────────────┐
         ▼                                                       ▼
FUNCTION-ORIENTED DESIGN (FOD)                          OBJECT-ORIENTED DESIGN (OOD)
• Primary focus: FUNCTIONS / VERBS                     • Primary focus: OBJECTS / NOUNS
• Top-down functional decomposition                     • System is a collection of real entities
• State is CENTRALIZED in shared data structures        • State is DISTRIBUTED & ENCAPSULATED
• Example: Structured Analysis / Structured Design      • Example: Classes, Polymorphism, Inheritance
```

### 8.1 Booch's Master Heuristic
> **Grady Booch's Dictum:**  
> *"Identify **verbs** if you are after procedural / function-oriented design, and **nouns** if you are after object-oriented design."*

### 8.2 Comprehensive Comparison Table (Exam Favorite):

| Dimension | Function-Oriented Design (FOD) | Object-Oriented Design (OOD) |
| :--- | :--- | :--- |
| **Fundamental Unit** | Functions / Subroutines (Verbs: `compute()`, `validate()`) | Objects / Classes (Nouns: `Customer`, `Account`) |
| **System State Location** | **Centralized State:** Held in global or shared data structures accessible by multiple functions. | **Distributed State:** Decentralized and private inside each object instance. |
| **Decomposition Style** | Top-down step-wise functional refinement. | Entity abstraction and domain modeling. |
| **Data Security / Coupling** | Higher risk of Common Coupling due to shared data stores. | Encapsulation hides private fields; communication only via public messages/methods. |
| **Change Impact** | Modifying a data structure forces changes across all functions referencing it. | Modifying an internal attribute affects only methods of that specific class. |
| **Reuse Mechanism** | Library subroutines (procedural reuse). | Inheritance, composition, and polymorphic interfaces. |

---

# Part IV — Case Study: The Fire-Alarm System

## 9. The Fire-Alarm System (80 Floors, 1,000 Rooms)

To crystallize the architectural divergence between FOD and OOD, consider the canonical university examination case study from Dr. Rajib Mall's lectures:

> **System Specification:**  
> A large, multi-storied building (80 floors, 1,000 rooms) requires a computerized fire-alarm system. Every room is fitted with a smoke detector and a fire alarm.
> 1. When any smoke detector detects a fire condition, the system must determine its exact location.
> 2. The system must immediately trigger the alarms in the affected room and all neighboring rooms.
> 3. It must flash an emergency message and location map on the 24/7 operator console.
> 4. Once the fire is extinguished, the operator must be able to reset the system.

---

### 9.1 Solution A: The Function-Oriented Design (FOD) Approach
In FOD, the system is designed around a set of centralized global arrays and procedural functions:

```text
┌────────────────────────────────────────────────────────┐
│               CENTRALIZED GLOBAL STATE                 │
│ • detector_status[1000] : boolean                      │
│ • detector_locs[1000]   : integer                      │
│ • alarm_status[1000]    : boolean                      │
│ • alarm_locs[1000]      : integer                      │
│ • neighbor_alarms[1000][10] : integer                  │
└───────────────────────────┬────────────────────────────┘
                            │ Read & Write
       ┌────────────────────┼────────────────────┐
       ▼                    ▼                    ▼
interrogate_detectors()  determine_neighbor()  ring_alarm()
get_detector_location()  report_fire_loc()     reset_alarm()
```

#### Structural Flaws of the FOD Approach:
- **No Data Ownership:** None of the functions owns the state. All functions have direct read/write access to the raw arrays.
- **Tight Common Coupling:** If we change `detector_locs` from a single integer room number to a structured 3D coordinate `{floor, wing, room}`, **all six functions break simultaneously**.
- **Difficult Maintenance:** Any function can accidentally corrupt `neighbor_alarms` with zero compiler protection.

---

### 9.2 Solution B: The Object-Oriented Design (OOD) Approach
In OOD, the system is modeled around the real-world nouns: `Detector` and `Alarm`. State is distributed into 1,000 independent object instances.

```text
┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│         class Detector          │       │           class Alarm           │
├─────────────────────────────────┤       ├─────────────────────────────────┤
│ - status : boolean              │       │ - status : boolean              │
│ - location : LocationRecord     │       │ - location : LocationRecord     │
│ - neighborDetectors : List      │       │                                 │
├─────────────────────────────────┤       ├─────────────────────────────────┤
│ + senseStatus() : boolean       │       │ + ringAlarm() : void            │
│ + getLocation() : LocationRecord│       │ + resetAlarm() : void           │
│ + findNeighbors() : List        │       │ + getStatus() : boolean         │
└─────────────────────────────────┘       └─────────────────────────────────┘
```

#### Advantages of the OOD Approach:
- **Encapsulated State:** Only `Detector` methods can read or mutate detector attributes.
- **Localized Change Impact:** Changing `location` representation inside `Detector` does not affect `Alarm` or the operator console.
- **Natural Mental Mapping:** Real-world entities map 1-to-1 with software objects.

---

## 10. The Complementary Nature of FOD and OOD
Do FOD and OOD compete, or can they coexist?

> **Key Architectural Insight:** Modern software engineering recognizes that **FOD and OOD are complementary, not mutually exclusive**:
> 1. At the **macro architectural level**, OOD is used to identify domain entities, establish clean class boundaries, encapsulate distributed state, and minimize inter-component coupling.
> 2. At the **micro algorithmic level** (inside each method of a class), FOD is applied to decompose complex algorithms into smaller, top-down procedural functions with high functional cohesion!

---

# Part V — High-Yield Mid-Term Exam Summary

| Topic | Core Rules & Key Formulae | Exam Checkpoint |
| :--- | :--- | :--- |
| **High vs Detailed Design** | High-level produces program structure & structure charts; Detailed design produces algorithms and data structures. | 4-mark comparison. |
| **Cohesion Ranking** | Coincidental (worst) $\to$ Logical $\to$ Temporal $\to$ Procedural $\to$ Communicational $\to$ Sequential $\to$ Functional (best). | Must write from memory! |
| **Coupling Ranking** | Data (best/loosest) $\to$ Stamp $\to$ Control $\to$ Common $\to$ Content (worst/tightest). | High yield ordering question. |
| **Hierarchy Metrics** | High Fan-In = Good code reuse; High Fan-Out = Warning (lacks cohesion). | Structure chart calculation. |
| **State Comparison** | FOD = Centralized global data; OOD = Distributed encapsulated object state. | Fire-Alarm case study core point. |

