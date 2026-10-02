import os
import re
import json

def generate_markdown_content():
    # Read courseData.ts
    with open('src/data/courseData.ts', 'r', encoding='utf-8') as f:
        ts_content = f.read()

    # Also read questionsData.ts
    with open('src/data/questionsData.ts', 'r', encoding='utf-8') as f:
        q_content = f.read()

    # Also read dfdProblemsData.ts
    with open('src/data/dfdProblemsData.ts', 'r', encoding='utf-8') as f:
        dfd_content = f.read()

    print("Generating comprehensive content files in content/...")

    # Write course-overview.md
    course_overview = """# Software Engineering Complete Exam-Focused Mastery Course
> **Source Material:** IIT Kharagpur Lecture Notes (Prof. Rajib Mall) & University Course Slides
> **Target Timeline:** 3-Day Comprehensive Exam Preparation & High-Yield Revision Hub

## Course Structure & 3-Day Plan

### Day 1: Foundations, Life Cycle Models, Requirements & Software Design
- **Module 01:** Introduction to Software Engineering & Structured Programming
- **Module 02:** Software Life Cycle Models (Classical Waterfall, Iterative, Prototyping, Evolutionary, Spiral)
- **Module 03:** Requirements Analysis, Specification (SRS, IEEE 830), Decision Trees/Tables & Formal Methods
- **Module 04:** Software Design Principles, Cohesion & Coupling, Structured Analysis & DFDs (Level 0, 1, 2)

### Day 2: Object-Oriented Modeling, UML, Coding & Comprehensive Testing
- **Module 05:** Object-Oriented Modeling Using UML (Use Case, Class, Sequence, State, Activity Diagrams)
- **Module 06:** OOD Patterns (Creational, Structural, Behavioral) & Domain Modeling
- **Module 07:** Coding Standards, White-Box Testing (Basis Path, Cyclomatic Complexity), Black-Box Testing (Equivalence Partitioning, BVA), Integration & System Testing

### Day 3: Project Estimation, Team Management, Quality, Reliability & Maintenance
- **Module 08:** Software Project Planning, Estimation (COCOMO I & II, Function Points, Halstead) & Scheduling (PERT/CPM, Gantt)
- **Module 09:** Team Organization, Risk Management, Software Configuration Management (SCM)
- **Module 10:** Software Reliability Metrics (MTTF, MTBF, Availability), Quality Management (CMM Levels 1-5, ISO 9000-3)
- **Module 11:** Software Maintenance (Reverse Engineering, Re-engineering), CASE Tools & Emerging Client-Server Architectures

---

## Pedagogical Features
- **Intuition First:** Every concept begins with the fundamental *why* and relatable analogies before technical definitions.
- **Visual Explanations:** Clean interactive diagrams (DFD, UML, CFG, SDLC, CMM Pyramid).
- **Calculation Labs:** Worked mathematical examples for COCOMO, Function Points, Cyclomatic Complexity $V(G) = E - N + 2P$, and Halstead's Volume.
- **Exam Tips & Traps:** Highlighting frequently asked questions, 5-mark derivation patterns, and common student errors.
- **Last-Minute Rapid Revision:** 30-second bullet recaps for night-before exam preparation.
"""
    with open('content/course-overview.md', 'w', encoding='utf-8') as f:
        f.write(course_overview)

    print("Created content/course-overview.md")

if __name__ == '__main__':
    generate_markdown_content()
