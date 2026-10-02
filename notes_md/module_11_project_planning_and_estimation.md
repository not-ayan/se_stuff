# Module 11: Software Project Planning & Cost Estimation
*Author: Swarup Roy / Dr. Rajib Mall (IIT Kharagpur CSE Curriculum)*

---

## 1. Software Project Management & Planning

### 1.1 The Role of the Project Manager
Software project management is the art and science of planning, organizing, monitoring, and controlling software projects. The Project Manager (PM) is accountable for delivering high quality on time and within budget constraints.

### 1.2 Sliding Window Planning
Because uncertainty is high at the beginning of a project, the PM plans the immediate upcoming phase in microscopic detail while planning distant future phases only at a coarse, macroscopic level. As milestones are reached, the window slides forward and detailed plans are formulated for the next phase.

### 1.3 Software Project Management Plan (SPMP) Document
The SPMP standard (IEEE 1058) defines:
1. Introduction & Project Overview (objectives, deliverables)
2. Project Organization (org chart, roles)
3. Managerial Process Plans (risk management, monitoring, reporting)
4. Technical Process Plans (development methodologies, tools)
5. Work Packages, Schedule & Budget (WBS, Gantt, milestone gates)

---

## 2. Software Size Estimation Metrics

### 2.1 Lines of Code (LOC)
Measures physical or logical source code lines.
- **Shortcomings**:
  - Heavily dependent on the programming language used (1 LOC in Python != 1 LOC in Assembly).
  - Penalizes concise, well-architected code while rewarding verbose coding.
  - Cannot be measured during early requirements analysis (before code exists).

### 2.2 Function Point (FP) Metric (Allan Albrecht, IBM 1979)
Size is measured directly from the functional requirements in the SRS. Independent of the implementation language.

#### Calculation Steps:
1. **Unadjusted Function Points (UFP)**:
   $$UFP = (4 \times I) + (5 \times O) + (4 \times E) + (10 \times F) + (10 \times Int)$$
   *(Assuming average complexity weights)*:
   - $I$: External Inputs
   - $O$: External Outputs
   - $E$: External Inquiries
   - $F$: Internal Logical Files
   - $Int$: External Interface Files
2. **Technical Complexity Factor (TCF)**:
   Calculated from 14 General System Characteristics (GSCs), each scored $0 \text{ to } 5$ ($DI = \sum_{i=1}^{14} f_i$):
   $$TCF = 0.65 + (0.01 \times DI)$$
   - Minimum TCF = 0.65 ($DI = 0$); Maximum TCF = 1.35 ($DI = 70$).
3. **Final Function Points**:
   $$FP = UFP \times TCF$$

### 2.3 Feature Point Metric
Extension of FP designed for real-time, algorithmic, and embedded systems (telecom, avionics) where computational algorithms are complex but I/O count is low. Adds **Algorithms** as a 6th parameter (weight 15).

---

## 3. Cost Estimation Techniques

### 3.1 Empirical Techniques
- **Expert Judgment**: A senior expert estimates cost based on past experience (high variance, vulnerable to bias).
- **Delphi Cost Estimation (Rand Corp)**:
  - Facilitator gathers independent, anonymous estimates from a panel of experts.
  - Summarizes results and outliers, redistributes anonymously to the panel.
  - Experts refine estimates over multiple iterative rounds until consensus converges.

### 3.2 Analytical Technique: Halstead's Software Science (Maurice Halstead 1977)
Measures primitive program tokens:
- $\eta_1$: Number of unique operators
- $\eta_2$: Number of unique operands
- $N_1$: Total occurrences of operators
- $N_2$: Total occurrences of operands

#### Key Formulas:
- **Halstead Program Vocabulary**: $\eta = \eta_1 + \eta_2$
- **Halstead Program Length**: $N = N_1 + N_2$
- **Estimated Length**: $\hat{N} = \eta_1 \log_2 \eta_1 + \eta_2 \log_2 \eta_2$
- **Program Volume ($V$)**: $V = N \log_2 \eta$ (bits required to store the program in memory)
- **Potential Minimum Volume ($V^*$)**: $V^* = (2 + \eta_2^*) \log_2 (2 + \eta_2^*)$
- **Program Level ($L$)**: $L = \frac{V^*}{V} = \frac{2}{\eta_1} \times \frac{\eta_2}{N_2}$
- **Development Effort ($E$)**: $E = \frac{V}{L} = \frac{V^2}{V^*}$
- **Development Time ($T$)**: $T = \frac{E}{S}$ (where $S = 18$ mental discriminations/sec)

---

## 4. Heuristic Technique: Boehm's COCOMO Model

Constructive Cost Model proposed by Barry Boehm (1981).

### 4.1 Project Categories
1. **Organic**: Small team, familiar environment, well-understood requirements ($\le 50$ KLOC).
2. **Semi-Detached**: Medium team, mixed experience, intermediate constraints (50–300 KLOC).
3. **Embedded**: Extremely tight hardware/software coupling, rigid constraints, inflexible requirements (e.g., flight control, medical devices).

### 4.2 Basic COCOMO Equations
$$\text{Effort (Person-Months)} = a_1 \times (\text{KLOC})^{a_2}$$
$$\text{Development Time (Months)} = b_1 \times (\text{Effort})^{b_2}$$

| Category | $a_1$ | $a_2$ | $b_1$ | $b_2$ |
| :--- | :---: | :---: | :---: | :---: |
| **Organic** | 2.4 | 1.05 | 2.5 | 0.38 |
| **Semi-Detached** | 3.0 | 1.12 | 2.5 | 0.35 |
| **Embedded** | 3.6 | 1.20 | 2.5 | 0.32 |

- **Key Mathematical Observation**:
  - $a_2 > 1$: Effort grows **super-linearly** with size.
  - $b_2 < 1$: Development time grows **sub-linearly** with effort (adding people does not linearly decrease duration—Brooks' Law!).

### 4.3 Intermediate & Complete COCOMO
- **Intermediate COCOMO**: Multiplies basic effort by the product of **15 Cost Drivers (Effort Multipliers)**:
  $$\text{Effort} = a_1(\text{KLOC})^{a_2} \times \prod_{i=1}^{15} EM_i$$
- **Complete COCOMO**: Decomposes system into sub-systems, calculates effort per sub-system, and sums.

---

## 5. Staffing Estimation & Scheduling

### 5.1 Norden-Rayleigh Staffing Curve
Empirical distribution of manpower over time $t$:
$$E = \frac{K}{t_d^2} \cdot t \cdot e^{-\frac{t^2}{2t_d^2}}$$
- $K$: Total lifecycle effort.
- $t_d$: Time of peak staffing (delivery time).
- Staffing builds gradually during requirements/design, peaks during integration/testing, and tails off during maintenance.

### 5.2 Putnam's Software Equation & 4th Power Law
$$L = C_k \cdot K^{1/3} \cdot t_d^{4/3} \implies K = \frac{L^3}{C_k^3 \cdot t_d^4} \implies \text{Cost} \propto \frac{1}{t_d^4}$$
- **The Severe 4th Power Penalty**: Compressing delivery schedule $t_d$ by just $50\%$ causes required development effort and cost to explode by **$2^4 = 16\text{ times}$!** Beyond a compression limit (the "impossible region"), compression is impossible at any cost.

---

## 6. Project Scheduling & Critical Path Method (CPM)

### 6.1 Work Breakdown Structure (WBS)
Decomposes the project into small, atomic work packages ($\le 1-2$ person-weeks) arranged in a tree structure.

### 6.2 Critical Path Method (CPM) Activity Network
- **Earliest Start (ES)**: $\max(\text{EF of all predecessors})$
- **Earliest Finish (EF)**: $ES + \text{Duration}$
- **Latest Finish (LF)**: $\min(\text{LS of all successors})$
- **Latest Start (LS)**: $LF - \text{Duration}$
- **Slack Time (Float)**: $\text{Slack} = LS - ES = LF - EF$
- **Critical Path**: Sequence of activities connecting start to finish with **Zero Slack**. Any delay on this path directly delays project completion!

### 6.3 Gantt Charts & PERT Charts
- **Gantt Chart**: Bar chart showing start/finish dates, concurrency, and slack bars.
- **PERT (Program Evaluation & Review Technique)**: Uses 3 duration estimates: Optimistic ($o$), Most Likely ($m$), Pessimistic ($p$). Expected duration:
  $$\mu = \frac{o + 4m + p}{6}, \quad \sigma = \frac{p - o}{6}$$
