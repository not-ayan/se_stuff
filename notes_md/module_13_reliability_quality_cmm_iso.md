# Module 13: Software Reliability, Quality Management, ISO 9001 & SEI-CMM
*Author: Swarup Roy / Dr. Rajib Mall (IIT Kharagpur CSE Curriculum)*

---

## 1. Software Reliability Basics

### 1.1 What is Software Reliability?
The probability of a software product operating **without failure** for a specified period of time in a specified environment.

### 1.2 The Core 10% vs. Non-Core 90% Principle
- Empirical analysis shows that **90% of execution time is spent running only 10% of instructions** (the core loops and frequent transactions).
- Eliminating 60% of latent defects from rarely executed non-core code often yields only ~3% perceived reliability improvement!
- Software reliability is strictly dependent on the **operational profile** (how the user actually executes the system).

### 1.3 Hardware vs. Software Reliability Differences

| Dimension | Hardware Reliability | Software Reliability |
| :--- | :--- | :--- |
| **Root Cause of Failure** | Physical wear and tear, component aging | Latent design and programming errors |
| **Failure Curve** | Classical **Bathtub Curve** (burn-in $\to$ steady life $\to$ wear-out) | Step-function decrease during test; flat in useful life |
| **Effect of Repair** | Returns reliability to pre-failure baseline | Can increase reliability OR decrease it (if bug fix introduces new bugs!) |
| **Study Goal** | Stability (constant inter-failure times) | **Reliability Growth** (inter-failure times increase) |

```
Hardware "Bathtub" Curve:
Failure Rate
     ^   \                  / (Wear-out)
     |    \                /
     |     '--------------'  (Useful Life)
     +-----------------------------------> Time

Software Failure Curve:
Failure Rate
     ^   |
     |   |---.
     |       |---. (Testing phase error removal)
     |           '------------ (Useful Life - no physical wear!)
     +-----------------------------------> Time
```

---

## 2. Six Standard Reliability Metrics

1. **ROCOF (Rate of Occurrence of Failure)**: Number of failures observed per unit of operational time.
2. **MTTF (Mean Time To Failure)**: Average operational execution time between two successive failures:
   $$\text{MTTF} = \frac{1}{n-1} \sum_{i=1}^{n-1} (t_{i+1} - t_i)$$
   *(Clock stops during downtime/repair).*
3. **MTTR (Mean Time To Repair)**: Average time required to locate and correct a defect.
4. **MTBF (Mean Time Between Failures)**:
   $$\text{MTBF} = \text{MTTF} + \text{MTTR}$$
   *(Measures real calendar clock time).*
5. **POFOD (Probability of Failure on Demand)**: Likelihood that the system fails when a specific service request is invoked (e.g., POFOD = 0.001 means 1 failure per 1,000 requests). Ideal for safety-critical emergency shutdown systems.
6. **Availability ($A$)**: Measure of system uptime fraction:
   $$A = \frac{\text{MTTF}}{\text{MTTF} + \text{MTTR}} = \frac{\text{MTTF}}{\text{MTBF}}$$

### 2.1 Five Classes of Software Failures
- **Transient**: Occurs only for specific combinations of inputs.
- **Permanent**: Occurs for all input invocations of a function.
- **Recoverable**: System restores itself with or without operator aid.
- **Unrecoverable**: System crashes and requires reboot / restart.
- **Cosmetic**: Minor irritations (e.g., clicking a button twice) with no corrupted data.

---

## 3. Reliability Growth Models

1. **Jelinski and Moranda Model (Step Function)**:
   - Assumes reliability increases by a constant increment every time an error is repaired.
   - *Limitation*: Unrealistic because different bugs contribute vastly different amounts to reliability growth.
2. **Littlewood and Verrall’s Model (Stochastic Gamma Model)**:
   - Treats an error's contribution to reliability growth as an independent random variable following a **Gamma distribution**.
   - Accurately accounts for negative reliability growth (when bug fixes introduce secondary defects) and diminishing returns as testing progresses.

---

## 4. Software Quality Management Evolution

### 4.1 "Fitness of Purpose" Limitation
Traditionally, quality meant *"fitness of purpose"*. In software, a program can be functionally fit according to requirements but completely unmaintainable, spaghetti-coded, and insecure. Hence, modern software quality requires five core quality factors:
1. **Portability**
2. **Usability**
3. **Reusability**
4. **Correctness**
5. **Maintainability**

### 4.2 Quality Evolution Paradigm Shift
$$\text{Product Inspection} \longrightarrow \text{Quality Control (QC)} \longrightarrow \text{Quality Assurance (QA)} \longrightarrow \text{Total Quality Management (TQM)}$$
- Modern quality philosophy: **Process Assurance over Product Inspection**. If the engineering process is rigorous and disciplined, high product quality follows as a natural consequence.

---

## 5. ISO 9001 vs. SEI-CMM

### 5.1 ISO 9001 Standard
- **Origin**: International Organization for Standardization (1987).
- Applicable to organizations engaged in design, development, production, and maintenance.
- **Key Tenet**: *"Say what you do, do what you say, and document it."*
- **Shortcomings**: Focuses on adherence to a documented process, but does *not* guarantee that the documented process itself is high-quality or state-of-the-art. Does not automatically drive continuous process optimization (TQM).

### 5.2 SEI Capability Maturity Model (CMM)
Developed by the Software Engineering Institute (Carnegie Mellon University). Defines **Five Maturity Levels**:

```
[Level 5: Optimizing]  --> Defect Prevention, Technology & Process Change Mgmt
[Level 4: Managed]     --> Quantitative Process Metrics, Software Quality Mgmt
[Level 3: Defined]     --> Standard Org Processes, Training Program, Peer Reviews (ISO 9001 ~ Level 3)
[Level 2: Repeatable]  --> Basic PM, Cost/Schedule Tracking, Configuration Mgmt, Requirements Mgmt
[Level 1: Initial]     --> Ad hoc, chaotic, heroics-dependent, no formal processes
```

- **Key Process Areas (KPAs)**: The focus areas required to advance from one level to the next.
  - *Level 2*: Project planning, project tracking, subcontract management, SCM.
  - *Level 3*: Organization process definition, training program, peer reviews, intergroup coordination.
  - *Level 4*: Quantitative process management, software quality management.
  - *Level 5*: Defect prevention, technology change management, process change management.
- **Personal Software Process (PSP)**: Watts Humphrey's framework applying CMM principles to individual engineers (PSP0 measurement $\to$ PSP1 planning $\to$ PSP2 quality/reviews $\to$ PSP3 cyclic development).
- **Six Sigma**: Data-driven defect reduction aiming for **$\le 3.4$ defects per million opportunities (DPMO)** using **DMAIC** (existing processes) or **DMADV** (new processes).
