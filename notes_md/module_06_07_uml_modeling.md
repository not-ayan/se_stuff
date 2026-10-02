# Modules 6 & 7: Object Modeling Using UML
*Author: Swarup Roy / Dr. Rajib Mall (IIT Kharagpur CSE Curriculum)*

---

## 1. Introduction to UML & Conceptual Modeling

### 1.1 What is UML?
The **Unified Modeling Language (UML)** is a standardized visual modeling language used to visualize, specify, construct, and document software artifacts.
- It provides a standard notation (rectangles, ellipses, solid/dashed lines, stereotypes).
- **Critical Distinction**: UML is **NOT** a software development methodology—it is a visual notation language used to document object-oriented analysis and design models.

### 1.2 Origin of UML
In the late 1980s and early 1990s, the software industry suffered from conflicting, incompatible OO design notations:
- **OMT (Object Modeling Technique)**: James Rumbaugh (1991)
- **Booch Method**: Grady Booch (1991)
- **OOSE (Object-Oriented Software Engineering)**: Ivar Jacobson (1992)
In 1997, the **Object Management Group (OMG)** standardized and unified these three methodologies into UML 1.0.

### 1.3 The Five Architectural Views of UML (9 Diagrams)

```
                       +-------------------+
                       |    User's View    |
                       | (Use Case Diagram)|
                       +-------------------+
                                 |
        +------------------------+------------------------+
        |                                                 |
+-------------------+                           +--------------------+
|  Structural View  |                           |   Behavioral View  |
| - Class Diagram   |                           | - Sequence Diagram |
| - Object Diagram  |                           | - Collaboration    |
+-------------------+                           | - State Chart      |
        |                                       | - Activity Diagram |
+-------------------+                           +--------------------+
| Implementation    |                                     |
|    View           |                           +--------------------+
| - Component Diag  |                           | Environmental View |
+-------------------+                           | - Deployment Diag  |
                                                +--------------------+
```

1. **User's View (Central / Black-Box)**:
   - Captures external functional requirements as perceived by users.
   - **Diagram**: Use Case Diagram. All other views must conform to this view!
2. **Structural View (Static)**:
   - Captures classes, objects, and their relationships (inheritance, aggregation, association). Does not change with time.
   - **Diagrams**: Class Diagram, Object Diagram.
3. **Behavioral View (Dynamic)**:
   - Captures time-dependent interactions, message sequences, state transitions, and workflow concurrency.
   - **Diagrams**: Sequence Diagram, Collaboration Diagram, State Chart Diagram, Activity Diagram.
4. **Implementation View**:
   - Captures code components, libraries, and their physical packaging/dependencies.
   - **Diagram**: Component Diagram.
5. **Environmental View**:
   - Models physical hardware topology, servers, network links, and execution nodes.
   - **Diagram**: Deployment Diagram.

---

## 2. Use Case Modeling

### 2.1 Concepts
- **Actor (Stick Person)**: A role that an external entity (human user or external system) plays when interacting with the system. Annotated with `<<external system>>` if non-human.
- **Use Case (Ellipse)**: A chunk of coherent behavior / transaction delivering value to an actor from the user's perspective (named using an active verb phrase, e.g., `Issue Book`, not `Get User Input`).
- **System Boundary (Rectangle)**: Encapsulates all use cases; actors sit outside.

### 2.2 Text Description Structure
Every use case ellipse must be accompanied by structured text:
1. Contact Persons (client meeting participants)
2. Actors involved
3. Pre-conditions (system state before start)
4. Post-conditions (guaranteed state upon completion)
5. Mainline Sequence (normal happy path)
6. Alternative Paths / Variations (branching conditions, error recovery)
7. Non-functional constraints and UI notes

### 2.3 Factoring Use Cases (Three Mechanisms)
1. **Generalization**: A child use case specializes a parent use case (e.g., `Pay Membership Fee` specialized by `Pay via Credit Card` and `Pay via Library Cash Card`).
2. **Include (`<<include>>`)**: Compulsory reuse of common behavior across multiple use cases (e.g., `Issue Book` and `Renew Book` both `<<include>>` `Check Reservation`).
3. **Extend (`<<extend>>`)**: Captures optional or exceptional behavior executed only at a specific **extension point** when a guard condition holds.

---

## 3. Class Diagrams & Relationships

A class diagram describes the static structure of the system.

### 3.1 Class Representation
- Solid rectangle with 3 compartments:
  1. **Top**: Class Name (Bold, centered, singular noun, CamelCase).
  2. **Middle**: Attributes (`attributeName : Type = defaultValue`).
  3. **Bottom**: Operations (`operationName(in param: Type): ReturnType`).

### 3.2 Association vs. Aggregation vs. Composition

| Relationship | Notation | Multiplicity | Lifetime Dependency | Reflexive? |
| :--- | :--- | :--- | :--- | :--- |
| **Association** | Straight solid line | $m:n$ | Independent; objects communicate via references/pointers | Yes |
| **Aggregation** | Hollow diamond at whole | Whole-Part ($1:n$) | Weak; parts can exist independently of the whole | No (Anti-symmetric) |
| **Composition** | Filled diamond at whole | Whole-Part ($1:n$) | **Strict existence dependency**; when whole dies, parts die | No |

- *Aggregation Example*: `Document <>-- Paragraph <>-- Line`. (A Wall can belong to multiple Rooms).
- *Composition Example*: `Order *-- OrderItem`. (An OrderItem cannot exist without its Order).
- *Inheritance vs. Aggregation Rule*:
  - Inheritance is **"is-a"** (static compile-time; breaks encapsulation).
  - Aggregation is **"has-a"** (dynamic runtime; preserves encapsulation; preferred when roles change dynamically, e.g., `BusinessPartner` having `Customer` or `Supplier` roles).

---

## 4. Interaction Diagrams: Sequence vs. Collaboration

Both diagrams represent the realization of a single use case and are semantically equivalent.

### 4.1 Sequence Diagram
- Two-dimensional chart read from **top to bottom**.
- **X-axis**: Objects participating in the interaction (`object:ClassName`).
- **Y-axis**: Time proceeding downwards.
- **Lifeline**: Vertical dashed line showing object existence.
- **Activation Box**: Narrow rectangle on lifeline showing period when object is active.
- **Messages**: Horizontal arrows with method names, conditions `[condition]`, and iteration markers `*[for each book]`.

### 4.2 Collaboration Diagram (Communication Diagram)
- Focuses on **spatial object links** and message passing.
- Shows objects as boxes connected by association links.
- Messages are annotated on links with **sequence numbers** (e.g., `1:`, `1.1:`, `2:`) to indicate ordering.

---

## 5. Activity Diagrams & State Chart Diagrams

### 5.1 Activity Diagrams
- Focuses on **chunks of workflow / computational activities**.
- **Swim Lanes**: Vertical columns grouping activities by departmental responsibility (e.g., Academic Section vs. Accounts vs. Hostel Office).
- **Fork and Join (Synchronization Bar)**: Heavy horizontal bar showing initiation of parallel concurrent activities (Fork) and waiting for all to finish before proceeding (Join).
- **Difference from Flowchart**: Flowcharts are purely sequential procedural control flows; activity diagrams support true **parallel concurrency and synchronization**.

### 5.2 State Chart Diagrams (David Harel Formalism)
- Models how the internal state of a **single object** changes across its entire lifetime across multiple use cases.
- **Overcomes FSM State Explosion**: Traditional Finite State Machines blow up exponentially in states. David Harel introduced **hierarchical nested (composite) states** and orthogonal concurrent states.
- **Transition Syntax**:
  $$\text{event} [\text{guard condition}] / \text{action}$$
  - `event`: Triggering occurrence.
  - `guard`: Boolean condition that must be true for transition to fire.
  - `action`: Quick, non-interruptible atomic process executed during state change.
  - *(Note: Actions belong to transitions; Activities belong to states and can be long-running/interruptible).*
