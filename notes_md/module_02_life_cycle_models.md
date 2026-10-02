# Module 2: Software Life Cycle Models
*Author: Swarup Roy / Dr. Rajib Mall (IIT Kharagpur CSE Curriculum)*

---

## 1. Foundations of Software Life Cycle Models

### 1.1 What is a Life Cycle Model?
A **software life cycle model** (or **process model**) is a descriptive and diagrammatic representation of the software life cycle. It identifies:
1. All the activities required for product development from inception to retirement.
2. The **precedence ordering** (sequence and dependencies) among these activities.
3. The division of development into discrete **phases**, each with clear **entry and exit criteria**.

### 1.2 Why Model the Life Cycle?
- **Team Coordination**: In solo programming, an individual can work arbitrarily. In a development team, without a shared life-cycle model, members do different things at different times (e.g., one coding while another designs), leading to chaotic breakdown and project failure.
- **Common Understanding**: Builds a documented agreement on who does what and when.
- **Progress Tracking & Milestones**: Enables project managers to track progress through measurable deliverables.
- **Process Tailoring**: Allows selecting and customizing the model to fit project risks and constraints.

---

## 2. Six Fundamental Life Cycle Phases

1. **Feasibility Study**: Determine whether developing the product is financially worthwhile and technically feasible.
2. **Requirements Analysis & Specification**: Gather customer needs, eliminate ambiguities and inconsistencies, produce Software Requirements Specification (SRS).
3. **Design**: Transform SRS into software architecture (high-level) and module specs (detailed).
4. **Coding & Unit Testing**: Translate design into code and test each module in isolation.
5. **Integration & System Testing**: Combine modules in planned steps and test the integrated system against SRS (Alpha, Beta, Acceptance).
6. **Maintenance**: Preserve and adapt delivered software (Corrective, Adaptive, Perfective).

### 2.1 Relative Effort Distribution Across Phases
Empirical data reveals a surprising distribution of effort:
- **Development vs. Maintenance**: Ratio is roughly **40 : 60**. Maintenance consumes the vast majority of life cycle effort!
- **Among Development Phases**:
  - Feasibility Study: ~5%
  - Requirements Analysis: ~10%
  - Design: ~12%
  - Coding: ~15%
  - **Testing**: **~18% (Highest among all development phases!)**
  - Maintenance: ~40% (of entire life cycle)

---

## 3. Five Classical Life Cycle Models

### 3.1 Model 1: Classical Waterfall Model
- **Concept**: Theoretical, idealized linear sequential model. Each phase starts only after the previous phase is completely finished.
- **Flow**: Feasibility $\rightarrow$ Requirements $\rightarrow$ Design $\rightarrow$ Coding $\rightarrow$ Testing $\rightarrow$ Maintenance.
- **Key Assumption**: Assumes **no errors** are ever made during any phase!
- **Merits**:
  - Simple, disciplined, and very easy to understand.
  - Clear entry and exit criteria with reviewable deliverables at each milestone.
  - Good for small projects with stable, crystal-clear requirements.
- **Demerits**:
  - **Idealistic & Impractical**: Real engineers commit errors in every phase.
  - **No Feedback Path**: Defects discovered late cannot be formally fixed by revisiting earlier phases.
  - **Late Software Visibility**: Customer sees nothing working until the very end.
- **Case Study**: *Payroll Processing System for Government College* (Stable service rules, experienced team, known technology $\rightarrow$ Classical Waterfall works).

---

### 3.2 Model 2: Iterative Waterfall Model
- **Concept**: The classical waterfall model made practical by adding **explicit feedback paths** between successive phases.
- **Core Principle: Phase Containment of Errors**:
  - Errors should ideally be detected and corrected in the same phase where they are introduced.
  - An error in design caught during the design phase costs very little; the same error caught during system testing requires redoing requirements, design, code, and test cases!
- **Feedback Mechanism**: When a defect is discovered during coding or testing, work rolls back to the phase where the defect originated, and subsequent phases are updated.
- **Worked Example**: *Retail Banking - Daily Fund Transfer Limit* (Ambiguity regarding whether daily limit resets at midnight or 24 hours after first transfer was detected in system testing, traced back to SRS, clarified with business, and updated across design, code, and test cases).
- **Merits**: Realistic, contains errors close to origin, widely used in industry.
- **Demerits**: Still poorly suited for projects with volatile, unclear requirements or high technical risks.

---

### 3.3 Model 3: Prototyping Model
- **Concept**: Build a quick, rough, toy version of the system first—let real customer feedback shape the true requirements before committing to full development.
- **What is a Prototype?**: A "toy" implementation exhibiting limited functionality, low reliability, and inefficient performance (often using shortcuts, hardcoded tables, dummy APIs).
- **Refinement Cycle**:
  $$\text{Quick Design} \longrightarrow \text{Build Prototype} \longrightarrow \text{Customer Evaluation} \longrightarrow \text{Refine Requirements} \circlearrowleft$$
- Once approved, the prototype is **thrown away**, and the actual system is built using the iterative waterfall model.
- **Why Extra Cost is Worth It**:
  - Clarifies user requirements and resolves technical risks early.
  - Reduces the risk of massive, expensive redesigns late in the project.
- **Worked Example**: *Hospital OPD Token Display* (Prototype screen built in days with placeholder buzzer. Staff noted font was too small, alert was too soft, and no color indicator existed for skipped tokens. Refined twice before final production).
- **Demerits**: Cost of throwaway code, risk that customer mistakes prototype for final product, or developer adopts bad prototype code into final product.

---

### 3.4 Model 4: Evolutionary Model (Incremental Model)
- **Concept**: Deliver the system in successive, working increments. Start with a core working skeleton and grow it release by release.
- **Structure**:
  - **Release 1 (Core)**: Fundamental features delivered first (usable from day one).
  - **Release 2 (Grow)**: New functionality added based on real user feedback from Release 1.
  - **Release 3 (Mature)**: Full planned capabilities integrated and polished.
- **Key Difference from Prototyping**: Every release is a **real, functioning product** used by end-users, NOT a throwaway demo!
- **Worked Example**: *Campus ERP System* (R1: Admissions & Enrollment; R2: Fee Payment & Library; R3: Hostel Allocation & Placement Tracking).
- **Merits**: Users get value early; exact requirements surface through real usage; core modules receive extensive real-world testing; low risk of total project failure.
- **Demerits**: Hard to partition some systems into clean increments; difficult to fix upfront total cost and schedule.

---

### 3.5 Model 5: Spiral Model (Boehm's Meta-Model)
- **Proposed by**: Barry Boehm in 1988.
- **Definition**: A **risk-driven meta-model** where each loop represents a phase, and every loop is split into **Four Quadrants**:
  1. **Quadrant 1: Objective Setting**: Identify phase objectives, alternative solutions, and constraints.
  2. **Quadrant 2: Risk Assessment & Reduction**: Formally analyze every project and technical risk; execute risk abatement (e.g., benchmark, simulation, prototype).
  3. **Quadrant 3: Development & Validation**: Develop and validate the next level of the product (can use Waterfall, Prototyping, or Evolutionary for specific components).
  4. **Quadrant 4: Review & Planning**: Review results with customer and plan the next loop.
- **Why Called a Meta-Model?**: Subsumes all other models! A single loop resembles a waterfall phase; prototyping is used for risk reduction; successive loops represent evolutionary releases.
- **Worked Example**: *Online Examination System for 5,000 Concurrent Students*:
  - *Loop 1 (Feasibility)*: Risk = Server crash under 5,000 load $\rightarrow$ Conduct load test with 500 simulated users.
  - *Loop 2 (Requirements)*: Risk = Disconnect & autosave ambiguity $\rightarrow$ Prototype workflow.
  - *Loop 3 (Design)*: Risk = Single server failure $\rightarrow$ Evaluate load-balanced cloud cluster.
  - *Loop 4 (Build & Test)*: Build, integrate, and security test full software.
- **Memory Rule**:
  - **Waterfall is phase-driven.**
  - **Evolutionary is release-driven.**
  - **Spiral is risk-driven.**

---

## 4. Life Cycle Model Selection Matrix

| Model | Best Suited For | Key Strength | Key Limitation |
| :--- | :--- | :--- | :--- |
| **Classical Waterfall** | Small, well-understood projects with fixed rules | Simple, structured, clear milestones | No feedback path; defects costly to fix late |
| **Iterative Waterfall** | Standard projects with moderate size & known scope | Feedback paths contain errors close to source | Poor fit for fast-changing or risky requirements |
| **Prototyping** | Unclear user requirements or unknown technical solutions | Validates UI and technical viability early | Extra initial cost; throwaway code overhead |
| **Evolutionary** | Large systems that naturally decompose into releases | Early working software, lowers total failure risk | Difficult to divide some monolithic problems |
| **Spiral Model** | High-risk, technically complex, large-scale systems | Built-in risk analysis and management control | High cost, complex to manage, requires risk experts |
