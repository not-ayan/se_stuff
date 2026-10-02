# Module 8: Object-Oriented Software Development & Design Patterns
*Author: Swarup Roy / Dr. Rajib Mall (IIT Kharagpur CSE Curriculum)*

---

## 1. Object-Oriented Analysis (OOA) vs. Design (OOD)

- **Object-Oriented Analysis (OOA)**: Focuses on understanding the problem domain from requirements and identifying conceptual objects and real-world relationships without committing to implementation details.
- **Object-Oriented Design (OOD)**: Refines the analysis model into an implementable software design. Defines class interfaces, method signatures, data structures, inheritance hierarchies, and interactions.
- **Object-Oriented Programming (OOP)**: Realizes the OOD models into executable source code using an OOP language (C++, Java, Python). *(Note: An OOD can also be implemented in a procedural language like C, but requires significantly more manual scaffolding).*

---

## 2. Domain Modeling (Conceptual Modeling)

### 2.1 The Three Types of Domain Objects
During domain analysis, all identified objects are categorized into three distinct stereotypes:
1. **Boundary Objects (Interface Objects)**:
   - Handle interaction between external actors and the system (screens, forms, dialogs, REST endpoints).
   - Contain NO business logic—only input collection, formatting, and validation.
   - *Rule of Thumb*: Start with one boundary class per actor/use case pair.
2. **Entity Objects**:
   - Encapsulate persistent business data that outlives use case execution (e.g., `Book`, `Member`, `Account`, `Order`).
   - Often act as "dumb servers" storing and retrieving fundamental data records.
3. **Controller Objects**:
   - Mediate between Boundary and Entity objects.
   - Coordinate the business workflow logic for a specific use case.
   - **Crucial Benefit**: Decouples presentation (boundary) from data (entities). Changes in UI or database schema do not cascade into business rules.

```
+------------+       messages        +--------------+       messages        +------------+
|  Boundary  | <-------------------> |  Controller  | <-------------------> |   Entity   |
|  (UI Form) |                       | (Logic Flow) |                       |   (Data)   |
+------------+                       +--------------+                       +------------+
```

---

## 3. Object Identification Approaches

### 3.1 Grady Booch’s Grammatical Analysis (Nouns & Verbs Method)
1. Write an informal processing narrative of the problem.
2. Identify all **nouns** $\rightarrow$ candidate objects/classes.
3. Identify all **verbs** $\rightarrow$ candidate operations/methods.
4. **Pruning Rules**:
   - Eliminate synonyms.
   - Eliminate nouns that belong outside the problem domain (e.g., human players or external systems, unless surrogates are needed).
   - Eliminate nouns that lack private state or multiple attributes (e.g., simple primitives).
   - Eliminate imperative verb-nouns that denote actions (e.g., "move", "display").
   - *Result*: Crisp, legitimate domain entities (e.g., in Tic-Tac-Toe, only `Board` survives as an entity!).

### 3.2 CRC Cards (Class-Responsibility-Collaborator)
Pioneered by **Ward Cunningham and Kent Beck** at Tektronix.
- Standard 4" $\times$ 6" index cards.
- **Top**: Class Name.
- **Left Column**: Responsibilities (high-level services the class provides).
- **Right Column**: Collaborators (other classes this class must invoke).
- Small card size intentionally restricts each class to a small, cohesive set of responsibilities.

---

## 4. Fundamental Design Patterns

A design pattern is a reusable, proven architectural solution to a recurring design problem.
Four key elements: **Problem, Context, Solution, Consequences**.

### 4.1 Expert Pattern (Information Expert)
- **Problem**: Which class should be assigned a particular responsibility?
- **Solution**: Assign the responsibility to the **information expert**—the class that possesses the data necessary to fulfill it.
- *Example*: Calculating total bill amount is assigned to `SaleTransaction`, which aggregates `SaleItem`, which in turn queries `ItemSpecification` for price.

### 4.2 Creator Pattern
- **Problem**: Who should be responsible for instantiating a new object of Class $B$?
- **Solution**: Assign Class $A$ to create $B$ if:
  - $A$ aggregates or contains $B$.
  - $A$ records or closely uses instances of $B$.
  - $A$ has the initialization data needed to instantiate $B$.

### 4.3 Controller Pattern
- **Problem**: Who should handle user interface events from actors?
- **Solution**: Assign a non-UI controller class per use case to receive actor requests, maintain use-case state, and coordinate domain objects.

### 4.4 Façade Pattern
- **Problem**: How to provide a simple, unified interface to a complex subsystem or package?
- **Solution**: Create a single Façade class (e.g., `DBFacade`) that provides simplified high-level entry methods, hiding inner package complexity.

### 4.5 Model-View Separation Pattern
- **Problem**: How should non-GUI domain classes communicate with GUI presentation classes?
- **Rule**: Domain (Model) classes must **never have direct compile-time dependencies** on GUI (View) classes.
- **Two Communication Solutions**:
  1. *Polling / Pull from Above*: GUI actively queries the model.
  2. *Publish-Subscribe (Observer Pattern)*: Model publishes state change events to an Event Manager; registered GUI subscribers receive callbacks (`EventListener`).

### 4.6 Intermediary / Proxy Pattern
- **Problem**: How should client and server objects communicate across a network?
- **Solution**: Create a local proxy object at the client side that exposes the same interface as the remote server. The proxy abstracts network sockets, serialization, and server discovery.

---

## 5. Five Criteria for Judging Goodness of an Object-Oriented Design

1. **Coupling Guidelines**: Minimize message exchanges between objects. High coupling prevents class reuse and complicates testing.
2. **Three-Level Cohesion**:
   - *Method Cohesion*: Each method performs exactly one distinct operation.
   - *Class Cohesion*: All data attributes and methods logically belong together.
   - *Hierarchy Cohesion*: Class inheritance tree exhibits true behavioral subtyping.
3. **Hierarchy and Factoring Guidelines**:
   - Keep inheritance breadth $\le 7 \pm 2$ subclasses per base class.
   - Restrict depth of inheritance tree to avoid excessive inherited method complexity.
4. **Simple Message Protocols**: Parameter lists should be small ($\le 3$ arguments).
5. **Class Response (RFC - Response for a Class)**: Limit the number of distinct methods invoked by a class ($\le 7$).
