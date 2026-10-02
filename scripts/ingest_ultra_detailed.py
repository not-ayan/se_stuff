import os
import re

source_path = r"d:\se_stuff\pdfs\software_engineering_ultra_detailed (1).md"
with open(source_path, "r", encoding="utf-8", errors="ignore") as f:
    master_text = f.read()

# Save complete master notes in notes_md
os.makedirs("notes_md", exist_ok=True)
with open("notes_md/master_notes_ultra_detailed.md", "w", encoding="utf-8") as f:
    f.write(master_text)

print(f"Saved master_notes_ultra_detailed.md ({len(master_text.encode('utf-8'))} bytes)")

def get_section(title_pattern, next_title_pattern=None):
    m = re.search(r"^(#+\s+" + title_pattern + r"[^\n]*)", master_text, flags=re.MULTILINE | re.IGNORECASE)
    if not m:
        print(f"Warning: pattern '{title_pattern}' not found!")
        return ""
    start = m.start()
    if next_title_pattern:
        m_next = re.search(r"^(#+\s+" + next_title_pattern + r"[^\n]*)", master_text[start+5:], flags=re.MULTILINE | re.IGNORECASE)
        if m_next:
            end = start + 5 + m_next.start()
            return master_text[start:end].strip()
    return master_text[start:].strip()

part1 = get_section(r"Part I\b", r"Part II\b")
part2 = get_section(r"Part II\b", r"Part III\b")
part3 = get_section(r"Part III\b", r"Part IV\b")
part4 = get_section(r"Part IV\b", r"Part V\b")
part5 = get_section(r"Part V\b", r"Part VI\b")
part6 = get_section(r"Part VI\b", r"Part VII\b")
part7 = get_section(r"Part VII\b", r"Part VIII\b")
part8_to_end = get_section(r"Part VIII\b", r"Deep Dive A\b")

deep_a = get_section(r"Deep Dive A\b", r"Deep Dive B\b")
deep_b = get_section(r"Deep Dive B\b", r"Deep Dive C\b")
deep_c = get_section(r"Deep Dive C\b", r"Deep Dive D\b")
deep_d = get_section(r"Deep Dive D\b", r"Deep Dive E\b")
deep_e = get_section(r"Deep Dive E\b", r"Deep Dive F\b")
deep_f = get_section(r"Deep Dive F\b", r"Deep Dive G\b")
deep_g = get_section(r"Deep Dive G\b", r"Deep Dive H\b")
deep_h = get_section(r"Deep Dive H\b", r"Deep Dive I\b")
deep_i = get_section(r"Deep Dive I\b", r"Deep Dive J\b")
deep_j = get_section(r"Deep Dive J\b", r"Deep Dive K\b")
deep_k = get_section(r"Deep Dive K\b", r"Deep Dive L\b")
deep_l = get_section(r"Deep Dive L\b", r"Deep Dive M\b")
deep_m_to_end = get_section(r"Deep Dive M\b", None)

mod1 = "# Module 1: Introduction to Software Engineering & Structured Programming\n\n![Module 1: Foundations of Software Engineering & Structured Programming](/images/mod1_se_foundations_infographic.jpg)\n\n---\n\n" + part1 + "\n\n---\n\n# Deep Dive: Software Engineering Foundations & Proofs\n\n" + deep_a

mod2 = "# Module 2: Software Life Cycle Models (SDLC)\n\n![Module 2: SDLC Models, Phase Containment & Spiral Architecture](/images/sdlc_models_infographic.jpg)\n\n---\n\n" + part2 + "\n\n---\n\n# Deep Dive: Life Cycle Models & Risk-Driven Engineering\n\n" + deep_b

mod3 = "# Module 3: Requirements Analysis, Specification (SRS) & Formal Methods\n\n![Module 3: Requirements Analysis, IEEE 830 SRS, Logic Modeling & Formal Specifications](/images/mod3_requirements_and_formal_specs.jpg)\n\n---\n\n" + part3 + "\n\n---\n\n# Deep Dive: Requirements Analysis, Decision Logic & Formal Specifications\n\n" + deep_c + "\n\n" + deep_d + "\n\n" + deep_e + "\n\n" + deep_f

mod4 = "# Module 4: Software Design & Modularity Principles\n\n![Module 4: The 7 Levels of Cohesion & 6 Levels of Coupling Spectrum](/images/cohesion_coupling_diagram.jpg)\n\n---\n\n" + part4 + "\n\n---\n\n# Deep Dive: Software Design, Cohesion, Coupling & Structure Charts\n\n" + deep_g + "\n\n" + deep_h + "\n\n" + deep_i

mod5 = "# Module 5: Data Flow Diagrams (DFD) — Theory, Rules & Data Dictionary\n\n![Module 5: DFD Symbols, Balancing Rules & Data Dictionary Grammar](/images/dfd_symbols_and_rules.jpg)\n\n---\n\n" + part5 + "\n\n---\n\n# Master Case Study: The Trading-House Automation System\n\n" + part6 + "\n\n---\n\n# Deep Dive: Structured Analysis, DFD Rules & System Modeling\n\n" + deep_j + "\n\n" + deep_k

mod6 = "# Module 6: DFD Practice Masterclass — 10 Solved Exam Problems\n\n---\n\n" + part7 + "\n\n---\n\n# Deep Dive: Extended Step-by-Step DFD Reasoning for All 10 Problems\n\n" + deep_l

mod7 = "# Module 7: Exam Mastery, Examiner Answer Bank & Revision Sheets\n\n---\n\n" + part8_to_end + "\n\n---\n\n# Deep Dive: Concept Maps, Examiner Answers & High-Yield Summary\n\n" + deep_m_to_end

modules = {
    "notes_md/module_01_intro_and_structured_programming.md": mod1,
    "notes_md/module_02_life_cycle_models.md": mod2,
    "notes_md/module_03_requirements_and_formal_specifications.md": mod3,
    "notes_md/module_04_software_design_cohesion_coupling.md": mod4,
    "notes_md/module_05_dfd_theory_and_rules.md": mod5,
    "notes_md/module_06_dfd_practice_problems_10_solved.md": mod6,
    "notes_md/module_07_exam_mastery_and_examiner_bank.md": mod7,
}

for path, text in modules.items():
    with open(path, "w", encoding="utf-8") as f:
        f.write(text.strip() + "\n")
    print(f"Generated {path} ({len(text.encode('utf-8'))} bytes)")

print("Ingestion and module synthesis complete!")
