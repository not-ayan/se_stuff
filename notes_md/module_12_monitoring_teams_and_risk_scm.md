# Module 12: Software Project Monitoring, Team Structures, Risk Management & SCM
*Author: Swarup Roy / Dr. Rajib Mall (IIT Kharagpur CSE Curriculum)*

---

## 1. Organization Formats & Team Structures

### 1.1 Functional Organization vs. Project Organization
- **Functional Organization**:
  - Developers are organized into specialized functional pools (Requirements, Design, Coding, Testing, Maintenance).
  - Projects borrow specialists for specific phases and return them to their pool.
  - *Advantages*: Job specialization, smooth handling of staff turnover, easy adherence to Rayleigh staffing.
  - *Disadvantages*: Requires high communication overhead, strict documentation handoffs, not suitable for small companies or niche domains.
- **Project Organization**:
  - A fixed cross-functional team is assigned to a project from inception to delivery.
  - *Advantages*: Low inter-team communication friction, high team ownership, job rotation.
  - *Disadvantages*: Suboptimal staffing (overstaffed in early/late phases), vulnerable to key personnel departure.

### 1.2 Team Structures
1. **Chief Programmer Team (Hierarchical)**:
   - Senior expert ("Chief Programmer") takes technical leadership, does high-level design, codes critical modules, and integrates the system. Junior engineers code non-critical modules.
   - *Best For*: Well-understood, small to medium projects within the intellectual grasp of one person.
   - *Risks*: Low team morale, inhibits creative initiative, severe single point of failure.
2. **Democratic Team (Decentralized / Egoless)**:
   - No rigid hierarchy. Leadership rotates based on task expertise.
   - *Best For*: Research-oriented, innovative, less-understood problems ($\le 5-6$ people).
   - *Risks*: Can degenerate into chaotic debates on large teams.
3. **Mixed Control Team (Modern Industry Standard)**:
   - Combines hierarchical management reporting with democratic peer collaboration.
   - Senior engineers work democratically to partition the architecture; individual sub-teams solve allocated modules democratically while reporting upward.

### 1.3 Egoless Programming & Programmer Productivity
- **Egoless Programming (Gerald Weinberg)**: Programmers naturally get emotionally attached to their code. In an egoless culture, code and design belong to the team, not the individual. Peer reviews and walkthroughs are welcomed as constructive defect hunts rather than personal criticisms.
- **Sackman Experiment (1968)**:
  - Ratio of coding hours for worst vs. best programmers = **25 : 1**.
  - Ratio of debugging hours for worst vs. best programmers = **28 : 1**.
  - Shows immense individual variance, highlighting the importance of hiring and domain knowledge.

---

## 2. Software Risk Management

A software risk is any anticipated adverse circumstance that might hamper the successful completion or delivery of a project.

### 2.1 Three Main Risk Categories
1. **Project Risks**: Budget overruns, schedule slippage, staff turnover, resource deficits.
   - *Why schedule slippage is so common*: Software is **intangible** (invisible). In car manufacturing, physical assembly progress is visible; in software, progress is invisible unless disciplined milestone documentation is enforced.
2. **Technical Risks**: Vague/changing requirements, complex algorithm failure, hardware/third-party API incompatibility, technical obsolescence.
3. **Business Risks**: Building a high-quality product that nobody buys or wants; loss of senior executive sponsorship.

### 2.2 Risk Assessment & Prioritization
$$\text{Priority } (p) = \text{Probability } (r) \times \text{Severity of Impact } (s)$$

### 2.3 Three Risk Containment Strategies
1. **Avoid the Risk**: Renegotiate scope with customer, eliminate high-risk unproven features, provide retention bonuses to prevent turnover.
2. **Transfer the Risk**: Outsource risky components to specialized third-party vendors; purchase indemnity insurance.
3. **Reduce the Risk**: Active abatement plans (e.g., maintain parallel candidate libraries, cross-train developers, develop early prototypes).

### 2.4 Risk Leverage Formula
$$\text{Risk Leverage} = \frac{\text{Risk Exposure}_{\text{before}} - \text{Risk Exposure}_{\text{after}}}{\text{Cost of Risk Reduction}}$$
Higher leverage indicates high return on investment for risk mitigation actions.

---

## 3. Software Configuration Management (SCM)

### 3.1 What is Software Configuration?
The complete state of all project deliverables and artifacts (SRS, architecture documents, code files, test suites, build scripts, compilers, bug reports) at any given point in time.

### 3.2 Key Distinctions
- **Version**: A major evolution of a software product reflecting significant functional, algorithmic, or architectural shifts (e.g., Python 2 to Python 3).
- **Revision**: A minor update created to fix defects or patch vulnerabilities without altering major functionality.
- **Release**: A formal deployment package packaged and distributed to customers.
- **Variant**: Parallel versions configured for different hardware or OS platforms (e.g., Unix vs. Windows).

### 3.3 Core SCM Activities & Workflows
1. **Configuration Identification**: Classifying artifacts into:
   - *Controlled*: Frozen under formal SCM; modification requires formal approval.
   - *Precontrolled*: Currently in development; will enter control upon milestone signoff.
   - *Uncontrolled*: Scratch notes, personal temporary files.
2. **Configuration Control (Reserve & Restore)**:
   - **Reserve (Check-Out)**: A developer checks out a private working copy. The master repository locks the file or flags it to prevent concurrent conflicting edits.
   - **Restore (Check-In)**: Developer submits modified files back. Requires approval from the **Change Control Board (CCB)**.
3. **Change Control Board (CCB)**:
   - Evaluates change requests: is it well-motivated? What are the ripple effects? Has it been regression tested?
4. **Baseline & Deltas**:
   - **Baseline**: A formally frozen set of configuration items forming a stable platform for subsequent phases.
   - **Deltas (SCCS, RCS)**: Rather than storing complete duplicate source files for each version, SCM tools store only the incremental text differences (**deltas**), saving massive disk space.
