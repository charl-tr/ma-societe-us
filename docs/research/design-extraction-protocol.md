# Design Extraction R&D — Image → Code Fidelity

## 1. Problem Statement

When given a visual reference (screenshot, mockup, image), the current workflow produces code that is an "approximation" of the original. Multiple iterations (5-6+) are needed, and the result still drifts from the source.

**Root cause hypothesis:** The extraction step is implicit — Claude "looks" at the image and writes code based on a vague impression, rather than first extracting a structured, precise description of the visual system, and then converting that description into code.

**Goal:** Find the extraction method that produces the highest visual fidelity between reference image and generated code, on the first attempt.

## 2. What "Fidelity" Means — Scoring Rubric

Each output is scored 1-5 on 8 dimensions:

| Dimension | What we measure | 1 (bad) | 5 (perfect) |
|---|---|---|---|
| **Color accuracy** | Exact hex values, gradient angles, opacity levels | Colors are wrong mood | Indistinguishable |
| **Typography** | Font weight, size ratios, letter-spacing, line-height | Wrong hierarchy | Exact match |
| **Spacing rhythm** | Padding, margin, gap proportions between elements | Cramped or too loose | Same breathing room |
| **Layout structure** | Grid, alignment, element positioning | Wrong layout entirely | Pixel-close |
| **Effects fidelity** | Shadows, blurs, borders, gradients, glass effects | Missing or wrong | Matches the feel |
| **Hierarchy/contrast** | Visual weight distribution, what pops first | Wrong focal point | Same eye path |
| **Micro-details** | Border-radius, icon style, divider lines, badges | Generic/missing | Precise |
| **Overall vibe** | Would someone confuse this for the original? | Clearly different | "Same designer" |

**Total: /40.** Threshold for "good": 32+/40.

## 3. Test Subjects — 3 Reference Images

We test against 3 different hero/landing sections with distinct styles:

1. **Partners LLC hero** — Dark bg, green accent, Trustpilot badge, avatars, video embed, sticky bar (DR aggressive)
2. **Glassmorphism map** — The reference image Charles shared (light, frosted glass, chrome cards, L-lines, Apple-like)
3. **Harvey.ai hero** — Minimal dark, cinematic, serif typography, institutional (premium law)

Each represents a different visual language. A good extraction method must work across all three.

## 4. Extraction Approaches to Test

### Approach A — "Structured Token Extraction"
Prompt asks Claude to extract a rigid JSON structure from the image:
- Colors (bg, text, accent, borders — with exact hex)
- Typography (font family guess, sizes in px, weights, spacing)
- Spacing (section padding, element gaps, container widths)
- Effects (shadow values, blur amounts, border specs, gradient definitions)
- Layout (grid structure, alignment, responsive behavior)

Then a second prompt converts those tokens into Tailwind code.

**Hypothesis:** Structured data → less interpretation drift.

### Approach B — "Forensic Visual Description"
Prompt asks Claude to describe the image in extreme detail as if writing instructions for a blind developer:
- Top-to-bottom scan, element by element
- Exact position descriptions ("logo top-left, 40px from edge")
- Color descriptions relative to each other ("text is 60% opacity of the bg")
- Comparisons ("the shadow is like iOS frosted glass, not Material elevation")

Then code is written from that description.

**Hypothesis:** Rich natural language → captures the "feel" better than tokens.

### Approach C — "Component Decomposition"
Prompt asks Claude to:
1. List every distinct component visible (nav, badge, heading, subheading, CTA, etc.)
2. For each component, describe its exact styling
3. Describe the relationships between components (spacing, visual hierarchy)
4. Describe the overall composition (layout, balance, focal point)

Then each component is coded individually, then assembled.

**Hypothesis:** Divide and conquer → fewer compound errors.

### Approach D — "Diff-Based Iterative"
1. First pass: quick extraction + code
2. Take a screenshot of the output
3. Compare output screenshot vs reference side-by-side
4. Extract the DIFFERENCES specifically
5. Fix only the differences
6. Repeat until converged

**Hypothesis:** Explicit error correction → converges faster than re-doing from scratch.

## 5. Test Protocol

For each (approach × image) combination (4 × 3 = 12 tests):

1. Start a fresh context (no prior bias)
2. Provide only the image + the extraction prompt
3. Capture the extracted description/tokens (save to file)
4. Generate a single self-contained HTML file from the extraction
5. Screenshot the output at 1440×900
6. Score on the 8-dimension rubric
7. Log: approach, image, score, time taken, observations

## 6. Success Criteria

- **Winner:** Highest average score across all 3 images
- **Minimum bar:** Must score 32+/40 on at least 2 of 3 images
- **Bonus:** If an approach consistently nails one dimension (e.g. "effects fidelity"), it can be combined with another approach as a hybrid

## 7. Deliverable

The winning approach becomes a **Claude Code skill** (`.claude/skills/`) that can be invoked on any reference image. The skill file contains:
- The extraction prompt template
- The code generation prompt template
- Usage instructions
- Scoring rubric for self-evaluation

## 8. Status

| Step | Status |
|---|---|
| Protocol defined | ✅ |
| Approaches written | ⬜ |
| Test images selected | ⬜ |
| Tests executed | ⬜ |
| Results analyzed | ⬜ |
| Skill created | ⬜ |
