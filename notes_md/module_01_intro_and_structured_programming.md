# Module 1: Introduction to Software Engineering & Structured Programming

![Module 1: Foundations of Software Engineering & Structured Programming](/images/mod1_se_foundations_infographic.jpg)

---

# Part I — The Big Picture: What Software Engineering Is Trying to Solve

## 1. Software engineering is an engineering approach, not merely “writing code”

The introductory PDF begins with the idea of an **engineering approach to developing software**. The lecture uses the analogy of building construction: large buildings are not produced by a person improvising every structural decision while construction is already under way. The same broad idea applies to software. As systems grow, a purely ad hoc approach becomes unreliable, so engineering practice organizes experience into repeatable techniques, methodologies, and guidelines.

The important conceptual shift is this:

> A small program can sometimes be produced successfully by an individual programmer through direct experimentation. A large software product has to be understood, planned, designed, documented, tested, managed, and maintained in a disciplined way.

The source explicitly emphasizes a **systematic collection of past experience**. This does not mean every software engineering rule is a theorem. The lecture distinguishes among experience, theoretical or quantitative techniques, and practical “thumb rules.” Engineering practice therefore involves judgment as well as method.

### Art → craft → engineering

The introductory slides show a progression:

1. **Art:** highly individual work, based heavily on intuition.
2. **Craft:** experience exists, but its use is still relatively informal.
3. **Engineering:** past experience becomes organized and is combined with scientific or quantitative reasoning.

The point of the diagram is not that software stops requiring creativity. The point is that creativity must operate inside a framework strong enough to support large, complex projects.

### Why size changes the problem

The lecture stresses the rapidly increasing difficulty of large programs. It uses a comparison such as **10K versus 1000K lines of code** to make the point. The exact numeric values are illustrative; the core lesson is that complexity grows dramatically as software size grows. An approach that works for a small script may collapse once many people, modules, users, interfaces, and requirements interact.

This is why software engineering teaches **abstraction and decomposition**. Abstraction hides irrelevant detail so we can reason at the right level. Decomposition breaks a large problem into smaller units that can be understood and managed separately.

---

## 2. Why study software engineering?

The introductory lecture gives several related reasons.

### 2.1 To handle complex programming problems

The most important transferable skill is the ability to take a large problem and break it into manageable parts. The lecture explicitly connects this to:

- abstraction,
- decomposition,
- specification,
- design,
- interface development,
- testing,
- project management.

This is broader than learning a programming language. A language gives you a way to express a solution; software engineering teaches how to arrive at, organize, evaluate, and evolve that solution.

### 2.2 To become a better programmer

The source links software engineering with **higher productivity** and **better quality programs**. A disciplined programmer is not merely someone who writes fast; the goal is to produce software that satisfies the intended requirements, can be understood by others, and can be changed without excessive damage.

### 2.3 Because software products have recurring problems

The introductory lecture lists typical failure patterns of software products:

- failure to meet user requirements,
- frequent crashes,
- high cost,
- difficulty changing, debugging, or enhancing the product,
- late delivery,
- inefficient resource use.

These problems are precisely what the later lectures address. Requirements analysis attacks the “wrong product” problem. Design attacks complexity and maintainability. Testing attacks correctness. Life-cycle models attack unmanaged development. Maintenance addresses the long period after delivery.

---

## 3. Programs versus software products

One of the most useful conceptual distinctions in the introductory slides is between a **program** and a **software product**.

The program-oriented picture is small-scale:

- often small in size,
- possibly written by one developer,
- the author may also be the only user,
- documentation may be weak or absent,
- the interface may be minimal,
- development can be ad hoc.

The software-product picture is large-scale:

- many users,
- a team of developers,
- a well-designed interface,
- documentation and a user manual,
- systematic development.

The difference is therefore not simply “old versus modern.” It is primarily about **scale, stakeholders, longevity, coordination, and the consequences of mistakes**.

A useful exam sentence is:

> A program can be a personal artifact; a software product is an engineered deliverable that must satisfy users, survive maintenance, and be developed systematically by a team.

---

## 4. Software engineering inside computer systems engineering

The introduction makes an important systems-level point: **computer systems engineering encompasses software engineering** when the product includes both software and hardware.

The examples in the source include a coffee vending machine and a mobile communication product. For such systems, the high-level question becomes:

> Which tasks should be solved by software, and which should be solved by hardware?

This is the **hardware/software partitioning** problem.

The source also shows that hardware and software may be developed together. A hardware simulator may support software development before the physical hardware is ready, followed by hardware/software integration and final system testing.

A useful mental model is:

```text
                 FEASIBILITY STUDY
                         |
        REQUIREMENTS ANALYSIS & SPECIFICATION
                         |
                HARDWARE/SOFTWARE
                   PARTITIONING
                   /           \
          HARDWARE             SOFTWARE
         DEVELOPMENT          DEVELOPMENT
                   \           /
                    \         /
                 INTEGRATION
                 AND TESTING
```

The point is that “software engineering” does not automatically mean software exists in isolation. In embedded or cyber-physical products, software is one part of a larger engineered system.

---

## 5. Evolution of software development practice

The introductory PDF describes early programming in the 1950s as being dominated by assembly language and relatively small programs. Over time, development approaches evolved through several styles represented in the lecture as:

- ad hoc,
- control-flow-based,
- data-structure-based,
- data-flow-based,
- object-oriented.

The later stages also introduce a stronger process discipline:

- greater attention to requirements specification,
- a distinct design phase,
- standard design techniques,
- periodic reviews during development,
- systematic software testing,
- standard testing techniques,
- documentation supporting maintenance and fault diagnosis,
- metrics for project management and quality assurance,
- systematic estimation, scheduling, and monitoring,
- CASE tools.

This list forms the historical bridge into the rest of the course. The course is effectively showing why a project needs a sequence of engineering artifacts and decisions rather than one long coding activity.

---

---

# Deep Dive: Software Engineering Foundations & Proofs

# Deep Dive A — Software Engineering Foundations

## 107. “Engineering” in software engineering: what the word really implies

The introductory PDF compares software engineering with an engineering approach to construction and highlights the systematic collection of past experience: techniques, methodologies, and guidelines. The crucial word is **systematic**.

An engineer is not expected to reinvent the same basic method every time a similar problem appears. Previous experience is organized so it can inform new work. The lecture also stresses that practical engineering is not purely mathematical. It combines theoretical or quantitative techniques with practical rules and trade-offs.

### Engineering thinking has several recurring habits

1. **Decompose the problem.** Large systems are divided into manageable parts.
2. **Make assumptions explicit.** Hidden assumptions are a common source of defects.
3. **Use established techniques where they fit.** There is value in proven patterns and methods.
4. **Compare alternatives.** Engineering frequently means choosing between several imperfect options.
5. **Consider constraints early.** Cost, time, resources, technology, and interfaces can affect what is feasible.
6. **Record decisions.** Decisions need to remain understandable to people who were not present when they were made.
7. **Verify the result.** Engineering work is not finished merely because something has been built.

### Where is this important?

It is most important when the software is:

- large,
- long-lived,
- maintained by many people,
- safety- or reliability-sensitive,
- integrated with hardware or external systems,
- expensive to change after release,
- used by many users with competing needs.

A tiny personal script might survive with informal practices. A university ERP, banking platform, medical system, airline reservation system, or embedded controller cannot safely rely on one developer remembering everything.

### Why the “ad hoc approach” breaks down

Suppose a programmer builds a small utility with four functions. It may be entirely manageable because the programmer can keep the whole program in working memory. Now imagine multiplying the codebase by a hundred, adding several developers, external interfaces, persistent data, user roles, security constraints, reporting requirements, and a decade of maintenance.

The problem is not simply the number of lines. Larger systems create **more interactions**. A change in one component may affect several others. A requirement may have multiple interpretations. A data format may be shared across components. A small undocumented assumption can become a system-wide dependency.

This explains why the introductory lecture links software engineering with **abstraction and decomposition**. Abstraction lets a person reason about a component without holding every implementation detail in mind. Decomposition limits the amount of complexity any one part must manage.

---

## 108. Programs versus software products — a deeper distinction

The introduction contrasts small, often single-user programs with software products developed by teams for many users. It is tempting to interpret the distinction as merely a matter of size, but the more useful distinction is **engineering responsibility**.

### A personal program often permits shortcuts

A personal program may rely on:

- the author's memory,
- implicit assumptions,
- a minimal interface,
- little documentation,
- informal testing,
- direct editing of implementation details.

This can be entirely rational when the cost of failure is low and the programmer is the only consumer.

### A software product has additional obligations

A product normally needs to be understandable to people other than the original author. It may require:

- a defined user interface,
- configuration or deployment instructions,
- documentation,
- systematic testing,
- release/version management,
- support for changing requirements,
- mechanisms for diagnosing faults,
- predictable behavior under expected conditions.

### Where this matters

This distinction is especially important in exams because questions may ask **why software engineering is necessary** even though “programming” already existed. The strongest explanation is that the engineering problem is broader than writing instructions for a computer. It includes requirements, design, coordination, testing, quality, cost, schedule, and maintenance.

### Practical extension: the “bus factor” idea

A useful additional way to understand the distinction is this thought experiment: **What happens if the original programmer disappears tomorrow?** If the system can still be understood, tested, modified, and deployed by a team, it behaves like an engineered product. If nobody can safely change it without the original author, the process has accumulated excessive dependence on individual memory.

This concept is not named in the supplied slides, but it is a practical reason why the lecture values documentation, systematic development, and understandable design.

---

## 109. Hardware/software partitioning — where the concept is used

The introductory lecture places software engineering inside computer systems engineering and gives examples such as a coffee vending machine and a mobile communication product. The high-level problem is deciding which work belongs in hardware and which belongs in software.

### Why is the partition a design problem?

The same behavior can sometimes be implemented in several ways. A sensor signal can potentially be processed by dedicated circuitry, by a programmable processor, or by a combination. The engineering decision depends on constraints such as response time, cost, flexibility, power, production volume, and the available hardware.

### Why the life cycle changes

When hardware is involved, the project cannot treat software as an isolated artifact. The source shows a process involving:

```text
Feasibility
   ↓
Requirements analysis and specification
   ↓
Hardware/software partitioning
   ├──────────────┐
   ↓              ↓
Hardware        Software
Development     Development
   └──────────────┬───┘
                  ↓
         Integration & Testing
```

### Where used — practical extension

This is especially relevant to:

- embedded controllers,
- automotive systems,
- medical devices,
- industrial automation,
- appliances,
- communication equipment,
- robotics.

The practical lesson is that “software engineering” can sit inside a larger systems-engineering problem. A software decision can depend on hardware timing, sensor characteristics, processor capability, or an external simulator.

---
