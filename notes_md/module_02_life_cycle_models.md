# Module 2: Software Life Cycle Models (SDLC)

![Module 2: SDLC Models, Phase Containment & Spiral Architecture](/images/sdlc_models_infographic.jpg)

---

# Part II — The Software Life Cycle

## 6. What is a software life cycle?

The Life Cycle Models PDF defines the software life cycle as a **series of identifiable stages that a software product undergoes during its lifetime**. The six stages used throughout the lecture are:

1. feasibility study,
2. requirements analysis and specification,
3. design,
4. coding,
5. testing,
6. maintenance.

This six-stage model is a foundation. The different life-cycle models in the lecture do not invent completely different activities; rather, they organize these activities differently, especially with respect to sequencing, iteration, feedback, releases, and risk.

### What is a life-cycle model?

A life-cycle model is both **descriptive and diagrammatic**. According to the source, it:

- identifies the activities required for product development,
- establishes a precedence ordering among activities,
- divides the life cycle into phases that the development team must identify and adhere to.

That means a process model is not just a pretty flowchart. It tells the team **how the work is arranged**.

---

## 7. Why model the life cycle?

The source provides three central reasons.

### Common understanding

A written life-cycle description gives developers a common understanding of the activities. This matters much more in a team than in solo work.

### Finding process defects

A process model can reveal:

- inconsistencies,
- redundant activities,
- missing activities.

The model is therefore itself a review artifact.

### Tailoring the process

Different projects have different characteristics. A life-cycle model gives a starting structure that can be adapted to a particular project.

### Team coordination

The introductory and lifecycle lectures emphasize the difference between a single programmer and a development team. A solo programmer can often decide the exact order of work informally. A team needs a shared answer to **who does what, and when**. The lifecycle source explicitly corrects a possible misunderstanding: the problem is **unmanaged team development**, not the existence of solo development itself.

---

## 8. The six phases — what each one contributes

### 8.1 Feasibility study

This phase asks whether developing the product is worthwhile and technically feasible. The analyst obtains a rough understanding of inputs, processing, outputs, and constraints and explores alternative solution strategies.

### 8.2 Requirements analysis and specification

The team learns what the customer actually needs, resolves ambiguity and inconsistency, and records the result in an SRS.

### 8.3 Design

The SRS is transformed into an implementable structure: modules, their relationships, interfaces, data structures, and algorithms.

### 8.4 Coding and unit testing

The design is translated into source code. Each module is independently tested and debugged.

### 8.5 Integration and system testing

Modules are integrated through planned steps. Partially integrated systems are tested along the way, and the complete system is tested against the SRS.

### 8.6 Maintenance

The product continues to change after delivery. The source distinguishes corrective, perfective, and adaptive maintenance.

The most useful memory chain is:

```text
Feasibility → What is possible/worthwhile?
Requirements → What is needed?
Design → How will the required system be structured?
Coding → Build it.
Testing → Does the built system satisfy the requirements?
Maintenance → Keep it correct, useful, and usable as the world changes.
```

---

## 9. Classical Waterfall Model

The classical Waterfall model is presented as the original idealized model: six phases, one after another, with no way back.

```text
Feasibility
    ↓
Requirements Analysis & Specification
    ↓
Design
    ↓
Coding & Unit Testing
    ↓
Integration & System Testing
    ↓
Maintenance
```

The central assumption is strict sequencing: a phase starts only after the previous phase is complete.

### Why the model is attractive

The source emphasizes that Waterfall is simple to understand and easy to manage. Each phase has a clear start and end, deliverables can be reviewed, and organizations can define entry/exit criteria and standards for each phase.

This structure gives project managers visible milestones. It also forces documentation, which can help later maintenance.

### Effort distribution

The source shows illustrative relative effort values that increase toward maintenance, with maintenance consuming the maximum effort among all life-cycle phases and testing the maximum among the development phases. The lecture explicitly labels the displayed proportions as **illustrative, not exact published percentages**.

The important exam point is not to memorize the chart as a universal statistic. Memorize the comparative message:

> Maintenance consumes the largest overall effort in the illustrated lifecycle, and testing is the heaviest effort among the development phases.

### Worked example: University Examination Portal

The source uses a fixed-scope examination portal with requirements such as exam form fill-up, admit cards, marks entry, and result publication. Design establishes modules, database schema, and roles for students, faculty, and administrators. Coding builds forms, validation, login, and reports. Testing covers registrations, invalid data, and result calculations. Deployment happens before the examination cycle, and maintenance handles report-format changes or minor policy updates.

This example works for Waterfall because the project is framed as comparatively fixed and milestone-driven.

---

## 10. Feasibility study in detail

The feasibility study is not “start coding to see whether it works.” It is a structured early investigation.

### What the analyst explores

The source says the analyst:

- obtains an overall understanding of the problem,
- formulates different solution strategies,
- compares strategies by resources, cost, and development time,
- performs cost/benefit analysis,
- recognizes that the project can be infeasible because of high cost, resource limits, or technical limitations.

A project can therefore fail **correctly and usefully** at feasibility: discovering early that an idea is not viable is preferable to discovering it after a large implementation investment.

### GMC case study

The Galaxy Mining Company case involves roughly 50 mine sites across 8 states and a proposed Special Provident Fund system. The sanctioned budget is ₹1 million. This number is explicitly important because every feasibility trade-off must fit the stated budget. The case illustrates how feasibility depends simultaneously on business payoff, project cost, and the scale of the system.

---

## 11. Requirements phase inside the life cycle

The Life Cycle lecture gives the same requirements concepts that are expanded in the dedicated Requirements Analysis lecture. The source identifies two activities:

1. requirements gathering and analysis,
2. requirements specification.

The goals are to collect relevant data, understand what the customer wants, discover inconsistencies and incompleteness, and resolve them.

The source notes that interviews and discussions are common ways of collecting information from end users. Raw interviews rarely produce a perfect specification because users have partial views, and different people may contradict each other. The analyst therefore cleans and resolves the input and produces an SRS.

---

## 12. Design, implementation, testing, and maintenance in the life cycle

### Design

The traditional approach described in the lifecycle lecture has two activities: **structured analysis** and **structured design**. Structured analysis identifies functions and requirements. Structured design then produces modules, invocation relationships, data structures, and algorithms.

### Coding and unit testing

Each module is implemented and tested individually. This gives a set of modules that are already individually debugged before they are integrated.

### Integration and system testing

Integration occurs through planned steps rather than assuming all modules will work when connected at once. The fully integrated system is then tested against the SRS.

### Maintenance

The lecture gives a development-to-maintenance effort ratio of approximately **40:60** as a typical framing in the source. Maintenance types shown are:

- **Corrective:** fix errors missed during development.
- **Perfective:** improve implementation and enhance functionality.
- **Adaptive:** port the software to a new environment, such as a new operating system or computer.

The percentage is a source-level heuristic rather than a law; the classification of maintenance is the important concept.

---

## 13. Classical Waterfall — merits and demerits

### Merits from the source

- simple to understand and use,
- easy to manage through staged deliverables and reviews,
- disciplined documentation at every phase,
- suitable for small projects with clear, stable requirements.

### Demerits from the source

- idealized assumption that defects are not introduced and discovered later,
- no formal feedback path to earlier phases,
- customer sees working software only late,
- poor fit when requirements are unclear, incomplete, or likely to change.

The most exam-worthy contrast is:

> Waterfall gives strong structure and predictability, but pays heavily when early assumptions turn out to be wrong.

---

## 14. Iterative Waterfall Model

The Iterative Waterfall Model keeps the phase structure but adds **feedback paths**.

The central problem with Classical Waterfall is that defects are often introduced in one phase and discovered in a later phase. A design defect, for example, may only become obvious during coding or testing.

The iterative model uses the **principle of phase containment of errors**:

> Ideally, an error should be detected in the same phase in which it was introduced.

When a defect is detected, work returns to the phase where it was introduced and the affected later phases are redone.

### Fund-transfer example

The lecture uses ambiguity in a “daily fund-transfer limit”: does the limit reset at midnight or 24 hours after the first transfer? System testing discovers the ambiguity. The team traces it to requirements, clarifies it with the business team, and then updates the downstream artifacts.

This is exactly the kind of situation classical Waterfall handles badly and iterative Waterfall handles more realistically.

### Merits and limitations

The source describes Iterative Waterfall as more realistic, with better error containment, while still remaining understandable. It is presented as the most widely used life-cycle model in practice in the lecture. However, it is still not ideal for highly uncertain or rapidly changing requirements and late major changes remain expensive.

---

## 15. Prototyping Model

A prototype is a **working but intentionally limited version** built before the final system. The source calls it a “toy implementation”: limited functionality, low reliability, and inefficient performance are acceptable because the prototype exists primarily to learn.

### Why prototype?

The lecture gives two major reasons plus the practical observation that the first version may need to be discarded:

1. Show customers input formats, messages, reports, and interaction/dialog behavior.
2. Investigate technical issues such as controller response time or algorithm efficiency.
3. Learn what the correct requirements/design should actually be by trying something concrete.

### Building the prototype

Start with approximate requirements, make a quick design, and use shortcuts. A dummy routine or simple table lookup may stand in for a real algorithm. The purpose is not production quality; the purpose is information.

### Refinement cycle

The conceptual loop is:

```text
Approximate requirements
        ↓
Quick design
        ↓
Prototype
        ↓
Customer / technical feedback
        ↓
Refine understanding
        ↓
Repeat or discard prototype
        ↓
Build the real product
```

### Prototype danger

The source explicitly warns that customers may mistake the prototype for an almost-finished product, and a rushed prototype architecture may accidentally get carried into the final system. The final system should not inherit poor design simply because the prototype already exists.

---

## 16. Hospital OPD token display example

The prototype example concerns a hospital screen that calls patients using tokens. The key lesson is that a seemingly simple interface can expose questions about how information should appear, what the staff need to see, and what real interaction feels like.

When the source shows the example over multiple pages, treat it as a **refinement illustration**, not as two unrelated examples: the repeated pages reinforce how a prototype helps reveal requirements and interaction decisions before the final product is constructed.

---

## 17. Evolutionary Model

The Evolutionary Model is also described as the **successive-versions or incremental model**. The idea is to deliver a working core first, then grow the system through successive releases.

```text
Release 1: Core working system
          ↓
Release 2: More functionality / refinements
          ↓
Release 3: More complete mature system
          ↓
...
```

The crucial property is that **each release is itself a functioning system capable of doing useful work**. This distinguishes it from a disposable prototype.

### Combining evolutionary and iterative ideas

The lecture says organizations frequently combine iterative and incremental development. A new release can add new functionality, improve old functionality, incorporate customer feedback, and address problems discovered during actual use.

### Campus ERP example

The source uses a campus ERP scenario:

- Release 1: admissions and enrolment.
- Release 2: fee payment and library modules, informed by Release 1 feedback.
- Release 3: hostel allocation and placement tracking.

Each release is genuinely used by the university rather than thrown away.

### Merits

- users can experiment with working software earlier,
- real requirements surface earlier,
- core modules receive repeated testing,
- overall project failure becomes less likely because a useful core appears early.

### Demerits

- not every problem can be cleanly decomposed into independent increments,
- upfront total cost and schedule are harder to fix,
- works best when the system has natural functional modules and sufficient scale.

---

## 18. Spiral Model

The Spiral Model is presented as a **risk-driven meta-model**, associated in the source with Barry Boehm in 1988.

Unlike a model defined mainly by a fixed list of phases or by releases, Spiral is driven by the question:

> What is the biggest unresolved risk right now, and what should we do this loop to reduce it?

### Four quadrants in every loop

1. **Objective setting** — define objectives and identify associated risks.
2. **Risk assessment and reduction** — analyze identified risks and take steps to reduce them.
3. **Development and validation** — produce and validate the appropriate next artifact or level of product.
4. **Review and planning** — review progress with the customer/stakeholders and plan the next iteration.

### The key subtlety

The “development” quadrant does not necessarily mean writing the full application. In an early loop it could produce:

- a feasibility study,
- an experiment,
- a prototype,
- a technical proof,
- a validated requirements model.

Only when the risk picture and project maturity justify implementation does the development activity become full coding and integration.

### Spiral as a meta-model

The source says Spiral can subsume ideas from the other models:

- a single loop can resemble a waterfall-style sequence,
- successive loops provide evolutionary growth,
- prototyping can be used as a risk-reduction technique.

It can even build a family of related products in which different components use different models, such as Waterfall for one component, prototyping for another, and evolutionary development for a third.

---

## 19. Online examination system — spiral example

The source identifies risks such as:

- 5,000 students attempting to log in together,
- internet interruption,
- exam security/cheating,
- disagreement among teachers over rules,
- unacceptable failure during an exam.

The loops then focus on the currently dominant risk.

### Loop 1 — feasibility

Question: can the system support the target load and is it economically/technically viable?

A smaller load experiment may be run, such as simulating 500 students.

### Loop 2 — requirements

Question: what exactly should happen when users lose connectivity, autosave answers, move between questions, or apply exam rules?

The main output is a validated requirements understanding.

### Loop 3 — design

Question: can the architecture support the target load reliably?

The source considers alternatives such as a powerful single server, multiple load-balanced servers, or a cloud-based scalable design, with experimental validation of the alternatives.

### Loop 4 — implementation

Now actual coding, integration, testing, and readiness work dominate. Risks include security vulnerabilities, database failure, cheating, and performance.

### The one-sentence distinction

The source gives an excellent memorization line:

> **Waterfall is phase-driven. Evolutionary is release-driven. Spiral is risk-driven.**

---

## 20. Overall life-cycle comparison

| Model | Main organizing idea | Source emphasis |
|---|---|---|
| Classical Waterfall | strict sequential phases | simplicity and discipline |
| Iterative Waterfall | phases + feedback | error containment |
| Prototyping | learn before final build | unclear requirements / technical uncertainty |
| Evolutionary | useful releases | early working functionality |
| Spiral | risk-driven loops | explicit risk management |

The source’s final selection table should be remembered as a **fit-by-project-characteristics** table, not as a universal formula. Stable, well-understood projects fit the more sequential approaches; unclear requirements call for prototyping; very large systems with natural increments fit evolutionary development; large, technically risky projects fit Spiral.

---

---

# Deep Dive: Life Cycle Models & Risk-Driven Engineering

# Deep Dive B — Life Cycle Models

## 110. What a life-cycle model is actually controlling

The life-cycle lecture calls a life-cycle model a descriptive and diagrammatic model that identifies development activities, establishes their precedence, and divides the life cycle into phases.

Students often memorize the diagrams without asking what is being controlled. A process model controls at least four things conceptually:

- **sequence** — which activities are expected to happen before others,
- **feedback** — whether later discoveries can send work back to earlier activities,
- **release strategy** — whether users get a working system before everything is complete,
- **risk treatment** — whether high-risk issues are explicitly attacked early.

These four dimensions make the five models much easier to compare.

| Model | Main organizing idea |
|---|---|
| Classical Waterfall | Phase sequence |
| Iterative Waterfall | Phase sequence + feedback |
| Prototyping | Early learning through a rough system |
| Evolutionary | Useful releases over time |
| Spiral | Risk reduction loop by loop |

This is the deeper reason the models look different even though they contain many of the same underlying engineering activities.

---

## 111. Classical Waterfall — when the assumptions are favorable

The source defines the classical model as six sequential phases:

```text
Feasibility
   ↓
Requirements Analysis & Specification
   ↓
Design
   ↓
Coding & Unit Testing
   ↓
Integration & System Testing
   ↓
Maintenance
```

The defining feature is that each phase starts only after the previous phase is complete. The classical form has **no formal way back**.

### Why the model can be useful

Its greatest practical advantage is not that it is technologically sophisticated. Its advantage is that it is **easy to organize and manage**. Each phase has an identifiable deliverable, and project managers can ask whether the phase has been completed.

It is particularly useful as a mental model for projects where:

- requirements are already known,
- the domain is well understood,
- technology is familiar,
- the team has experience with similar systems,
- major change is not expected during construction.

The payroll case in the source deliberately creates those conditions: established salary rules, a familiar technology stack, an experienced team, and stable requirements.

### Where this matters in practice

A classical or near-classical staged approach can be easier to apply when building software for an organization with a mature process and a frozen set of contractual requirements. Examples include certain regulated or contract-driven systems where extensive documentation and approval gates are required.

That does not mean every regulated project literally uses textbook waterfall. Real organizations frequently combine staged approvals with iteration. The lecture's classical model is the conceptual baseline.

### Why its assumptions are dangerous

The source calls the model idealistic because defects can be introduced in one phase and discovered much later. A requirements error can become a design error, which becomes a coding error, which finally appears as a system-test failure.

The later a defect is found, the more previously completed work may have to be revisited.

### A simple propagation example

Suppose the requirement says:

> “The system shall calculate late fees according to the approved policy.”

During requirements analysis, nobody defines the exact rule. During design, developers create one fee field. During coding, they implement a fixed percentage. During system testing, the customer discovers that the policy actually uses a graduated slab.

The problem did not originate in coding. Coding merely exposed a requirement ambiguity. The project may now need changes in the requirements, design, implementation, and tests.

This example explains why later models add feedback or early validation.

---

## 112. Waterfall effort distribution — how to interpret the chart

The waterfall lecture includes illustrative relative effort figures and explicitly warns that they are **illustrative proportions, not exact published percentages**. The conceptual pattern is more important than memorizing the numbers:

- maintenance consumes the largest effort over the full life of the software;
- among development phases, testing is shown as a major effort consumer.

The later maintenance slide gives a development-to-maintenance ratio of approximately **40:60** as a typical relationship in the source discussion.

### Where important

This is highly important whenever a question asks why maintainability matters. A design decision that saves a few hours during initial coding can become expensive if the code must be modified repeatedly for years.

This is also why the Software Design lecture says understandability is especially important: maintenance is not a small fraction of the system's existence.

### Practical extension: total cost of ownership

A useful way to think about it is:

```text
Total lifecycle cost
= initial development
+ testing and deployment
+ corrective maintenance
+ adaptive maintenance
+ enhancement/perfective maintenance
+ operational support
```

The supplied slides focus on lifecycle effort rather than presenting a full accounting formula. The formula above is a teaching aid that helps explain the same principle.

---

## 113. Iterative Waterfall — the central idea is “return to the phase of origin”

The iterative waterfall model keeps the six phases but adds feedback paths. The most important source statement is the **phase containment of errors** principle:

> Errors should ideally be detected in the same phase in which they are introduced.

A defect discovered in requirements should lead back to requirements, followed by rework of later dependent phases. A design error discovered during testing should lead back toward design, not merely be patched blindly in code.

### Why this is better than “just fix the bug”

Consider a design based on a false assumption. If the developer patches only the implementation, the design document and test basis may still be wrong. The next developer may reintroduce the defect because the root cause was never corrected.

The feedback loop therefore has two purposes:

1. correct the software;
2. correct the **artifact where the misunderstanding originated**.

### Source example: fund-transfer limit

The source's banking example shows a daily fund-transfer limit discovered to be ambiguous during system testing. The team traces the ambiguity to requirements, clarifies that the limit resets at midnight, and then updates the design, code, and tests.

### When useful

It is useful when requirements are comparatively stable but the project team recognizes that defects can appear at any stage.

### Practical extension: change impact analysis

In real development, a feedback loop should not mean “start the whole project from zero.” The point is targeted rework based on dependency. A change to one requirement may affect specific designs, modules, test cases, and documentation but not unrelated areas.

This is why traceability in the SRS becomes valuable later: it helps identify what needs to be reconsidered when a requirement changes.

---

## 114. Prototyping — the prototype is a learning instrument

The prototyping lecture deliberately defines a prototype as a **toy implementation** with limited functionality, low reliability, and inefficient performance. That definition is extremely important because it prevents a common misunderstanding: a prototype is not automatically the final product in miniature.

### What uncertainty does a prototype attack?

The source gives two especially important targets:

1. **user-interface/interaction uncertainty** — what input formats, messages, reports, dialogs, or displays should look like;
2. **technical uncertainty** — whether an important implementation idea, such as response time or algorithm efficiency, is technically workable.

### A prototype can be deliberately ugly

A prototype may use:

- dummy data,
- hard-coded responses,
- lookup tables instead of real computation,
- incomplete validation,
- inefficient algorithms,
- temporary interfaces.

That is not necessarily bad. The point is to reduce uncertainty quickly.

### Why throw the first prototype away?

The source explicitly recommends being prepared to throw the first version away. This is a powerful engineering idea: **learning and production quality are different objectives**.

If the prototype was built quickly to answer “What should this screen look like?”, then optimizing it into production quality may be less useful than discarding it after the question has been answered.

### When prototyping is important

It is particularly valuable when:

- users are unsure what they want,
- the interface is difficult to describe verbally,
- a new interaction style is involved,
- a technical question could invalidate the project,
- the customer needs something tangible to react to.

The hospital OPD token-display example makes this obvious. Staff discover that font size, sound level, skipped-token cues, and emergency cases matter when they see an actual screen.

### Prototype danger

The source lists several dangers:

- customers may mistake the prototype for near-final software;
- hurried prototype structures can leak into the final design;
- customer feedback requires sustained availability;
- prototyping adds cost and is unnecessary when requirements are already clear.

A good exam answer should mention both the benefits **and** these specific risks.

---

## 115. Evolutionary model — “working software” changes the release strategy

The evolutionary model delivers the system in successive working releases. The source also calls it the successive-versions or incremental model.

The defining property is:

> **Each release is a functioning system capable of doing useful work.**

That distinguishes it from a throwaway prototype.

### Prototype versus evolutionary release

| Prototype | Evolutionary release |
|---|---|
| Mainly for learning and clarification | Intended for actual use |
| May be inefficient or incomplete | Must provide useful capability |
| Often thrown away | Becomes part of the final product |
| User feedback shapes requirements | User feedback shapes later releases |
| Focuses on uncertainty | Focuses on delivering value incrementally |

### Why the model works for large systems

A large integrated system often contains naturally separable capabilities. The source's campus ERP example has releases for admissions/enrolment, fee payment/library, and hostel/placement.

Instead of waiting for the entire system, users obtain a useful subset, gain experience with it, and influence subsequent releases.

### Where useful

This approach is especially useful when:

- a subset of functionality can operate independently,
- users need value before the whole system is complete,
- requirements evolve from real-world use,
- the system is large enough to contain natural incremental units.

### Major limitation

The source points out that it can be difficult to subdivide some problems into independent functional units. This is the most important condition to test before choosing an evolutionary approach.

If every feature depends heavily on every other feature, incremental release boundaries become difficult.

---

## 116. Spiral model — understand the loop, not the drawing

The source's strongest conceptual statement is:

> **The driving force in the spiral is risk.**

A spiral loop contains four recurring activities:

1. determine objectives,
2. identify/analyze risks,
3. develop and validate something to reduce those risks,
4. review and plan the next loop.

### What counts as “development” in spiral?

A critical source clarification is that “develop & validate” does **not** necessarily mean building the complete application. In an early loop it may produce:

- a feasibility study,
- an experiment,
- a proof of concept,
- a technical report,
- a prototype.

Later, when the important risks have been reduced, the output can become actual software.

### Why spiral is not simply evolutionary

Both models can produce a growing product, but they answer different primary questions:

```text
Waterfall       → What phase comes next?
Iterative WF    → Where should a defect be revisited?
Prototype       → What do we need to learn quickly?
Evolutionary    → What useful release should we deliver next?
Spiral          → What is the biggest unresolved risk?
```

### Source example: online examination system

The spiral case moves through feasibility, requirements, design, and implementation while changing the dominant concern each time:

- can 5,000 students take the exam together?
- do users agree on behavior for disconnection, autosave, and exam rules?
- will the architecture survive peak load?
- will the final implementation be secure and reliable?

This is the ideal kind of exam example because each loop is driven by a different uncertainty.

### Where important

The spiral model becomes particularly relevant to:

- large projects,
- technically challenging systems,
- projects with significant uncertainty,
- systems where failure would be expensive,
- projects where requirements and technical solutions evolve together.

The source's drone example adds a safety-oriented illustration: identify the largest technical risk, run a focused experiment, reduce it, and then move to the next risk.

---

## 117. Life-cycle model decision table

Use this as a **recognition tool**, not as a rule that mechanically chooses a process for every project.

| Situation described in a question | Model highlighted by the lectures |
|---|---|
| Requirements are clear and stable; familiar technology; experienced team | Classical Waterfall |
| Requirements are stable but late defects must be fed back to their phase of origin | Iterative Waterfall |
| Users are unclear about screens, dialogs, reports, or interaction | Prototyping |
| Large system can be divided into useful working releases | Evolutionary |
| Major technical/project risks dominate and must be attacked explicitly | Spiral |

### How to answer a “choose the model” question properly

Do not write only “Use Spiral.” Explain **which property of the problem matches which property of the model**.

For example:

> “The project has unresolved technical risks and must validate architecture before committing to full construction. A risk-driven iterative model is therefore appropriate; the spiral process explicitly identifies and reduces major risks in each loop.”

This style demonstrates understanding rather than memorization.

---
