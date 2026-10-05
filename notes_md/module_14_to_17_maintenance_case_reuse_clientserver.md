# Modules 14 to 17: Maintenance, CASE Tools, Software Reuse & Client-Server Architecture
*Author: Swarup Roy / Dr. Rajib Mall (IIT Kharagpur CSE Curriculum)*

---

## 1. Software Maintenance & Reengineering (Module 14)

### 1.1 Why Software Maintenance is Inevitable
Software maintenance accounts for **~60% of total lifecycle costs** (and up to 2x to 4x development cost for embedded systems).
Three primary types of maintenance:
1. **Corrective**: Fixing bugs discovered during customer operation.
2. **Adaptive**: Porting software to new operating systems, hardware platforms, or external libraries.
3. **Perfective**: Enhancing existing features, adding user-requested functionality, or optimizing performance.

### 1.2 Legacy Systems & Reverse Engineering
- **Legacy Software**: Systems that are hard to maintain due to poor documentation, spaghetti unstructured code, and loss of original developer knowledge.
- **Software Reverse Engineering**: The process of recovering the high-level design and SRS from an analysis of source code:
  $$\text{Code} \longrightarrow \text{Module Specs} \longrightarrow \text{Structure Chart / Architectural Model} \longrightarrow \text{SRS Document}$$
- **Cosmetic Clean-Up (First Step)**: Reformatting using pretty-printers, assigning meaningful variable names, removing `goto` statements, and simplifying nested conditionals.

### 1.3 Maintenance Process Models
- **Process Model 1 (Direct Patch)**: Suitable when rework is **$\le 15\%$**. Code is directly modified, and documentation updated later.
- **Process Model 2 (Reengineering)**: Suitable when rework is **$> 15\%$** or code structure is severely degraded. Combines a **Reverse Engineering cycle** followed by a **Forward Engineering cycle**.
- **Boehm’s Annual Change Traffic (ACT)**:
  $$ACT = \frac{\text{KLOC}_{\text{added}} + \text{KLOC}_{\text{deleted}}}{\text{KLOC}_{\text{total}}}$$
  $$\text{Annual Maintenance Cost} = ACT \times \text{Development Cost}$$

---

## 2. Computer-Aided Software Engineering (CASE) (Module 15)

### 2.1 CASE Environment vs. Programming Environment
- **Programming Environment**: Tools (compiler, editor, debugger) supporting only the *coding phase*.
- **CASE Environment**: Comprehensive suite of integrated tools supporting *all phases* (requirements, design, code generation, testing, SCM, project tracking).

### 2.2 Modern CASE Environment Architecture
- **User Interface**: Consistent look-and-feel across all lifecycle tools.
- **Tool Set**: Analysis/design diagrammers, code generators, test harness generators, documentation exporters (DTP/PostScript).
- **Object Management System (OMS)**: Maps complex software entities (classes, architectural models, test cases) into storage.
- **Central Repository (Data Dictionary)**: Centralized store ensuring consistency and traceability across all phases.
- **Second-Generation CASE**: Intelligent diagram layout engines, formal methodology rule checking, and automated code-generation synchronization.

---

## 3. Software Reuse (Module 16)

### 3.1 Reusable Artifacts & Domain Analysis
- **Reusable Artifacts**: Requirements, Designs, Code, Test Cases, and Knowledge.
- **Why Mathematical Functions Reuse Easily**: Standard semantics (everyone agrees on `cos(x)`), small standardized interfaces (single float input/output), no hidden side-effects.
- **Domain Analysis**: Generalizing concepts and operations across related applications in a domain (e.g., airline reservation, banking).
- **Four Stages of Domain Evolution**:
  - *Stage 1*: No standard notation; all code written from scratch.
  - *Stage 2*: Ad hoc knowledge reuse from experienced developers.
  - *Stage 3*: Stabilized concepts; standard component libraries available.
  - *Stage 4*: Fully explored domain; software generated automatically using **Application Generators / 4GLs**.

### 3.2 Prieto-Diaz Faceted Classification Scheme
Replaces rigid hierarchical taxonomies with an **$n$-tuple of facets**:
1. Action embodied (e.g., `calculate`, `display`)
2. Object manipulated (e.g., `account`, `matrix`)
3. Data structure used (e.g., `b-tree`, `hash-table`)
4. System domain (e.g., `payroll`, `flight-control`)

---

## 4. Client-Server Architecture & Middleware (Module 17)

### 4.1 Fundamentals
- **Client & Server as Roles**: A client is a consumer of services; a server is a provider of services. Even a single machine can act as both.
- **Two-Tier Architecture**: Client desktop (UI + business logic) connects directly to Database Server.
  - *Limitation*: Proprietary database drivers, vendor lock-in, heavy client maintenance, lacks open interoperability.
- **Three-Tier Architecture**: Adds a **Middleware** layer between client and server.
  - Middleware handles service directory discovery, load balancing, request queuing, and protocol translation.

### 4.2 CORBA (Common Object Request Broker Architecture)
Standardized by the **Object Management Group (OMG)**.
- **Object Request Broker (ORB - "Object Bus")**: Core middleware component that routes requests transparently across machines, OSes, and programming languages.
- **Interface Definition Language (IDL)**: Language-neutral specification of data interfaces and method signatures. Compiled using IDL compilers (`IDL2Java`, `IDL2C++`) into:
  - **Client Stub**: Local client proxy marshaling parameters.
  - **Server Skeleton**: Unmarshals requests on the server.
- **Dynamic Invocation Interface (DII)**: Allows clients to discover and invoke services at runtime without compile-time stubs.
- **GIOP / IIOP**: General Inter-ORB Protocol implemented over TCP/IP as Internet Inter-ORB Protocol (IIOP).

### 4.3 COM / DCOM vs. CORBA
- **COM / DCOM (Microsoft)**: Binary component standard (`.dll`, `.exe`, ActiveX). Excellent for Windows desktop applications; DCOM extends across network.
- **CORBA (OMG)**: Vendor-neutral, open standard; superior for heterogeneous, multi-platform enterprise backend servers.
