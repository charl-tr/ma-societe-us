# Extraction Prompts — 4 Approaches

## Approach A — Structured Token Extraction

```
You are a design forensics expert. Analyze this UI screenshot and extract a complete, precise design specification as JSON.

Be EXACT — don't guess. If you can measure it, measure it. If you can identify the hex, identify it. Wrong is worse than "unsure".

Extract:

{
  "colors": {
    "background": { "primary": "#hex", "secondary": "#hex", "gradient": "description" },
    "text": { "heading": "#hex", "body": "#hex", "muted": "#hex at X% opacity" },
    "accent": { "primary": "#hex", "secondary": "#hex" },
    "borders": { "color": "#hex at X% opacity", "width": "Xpx" },
    "effects": { "shadows": "CSS box-shadow value", "glows": "description" }
  },
  "typography": {
    "heading": { "family_guess": "serif/sans", "size_px": X, "weight": X, "letter_spacing": "Xem", "line_height": X, "transform": "uppercase/none" },
    "subheading": { same structure },
    "body": { same structure },
    "label": { same structure },
    "cta": { same structure }
  },
  "spacing": {
    "section_padding_vertical": "Xpx",
    "section_padding_horizontal": "Xpx",
    "heading_to_body_gap": "Xpx",
    "body_to_cta_gap": "Xpx",
    "element_gaps": "Xpx",
    "container_max_width": "Xpx"
  },
  "effects": {
    "background_technique": "solid/gradient/image+overlay/abstract",
    "blur_values": "Xpx backdrop-blur or none",
    "border_radius": "Xpx for cards, Xpx for buttons, Xpx for badges",
    "glass_effect": "yes/no — if yes, bg opacity, blur amount, border opacity",
    "shadows": [{ "element": "name", "css": "full CSS box-shadow value" }],
    "gradients": [{ "element": "name", "css": "full CSS gradient value" }]
  },
  "layout": {
    "structure": "centered/left-aligned/split/grid",
    "vertical_order": ["element1", "element2", ...],
    "alignment": "center/left",
    "responsive_hint": "description of how this would adapt to mobile"
  },
  "components": [
    { "name": "trust_badge", "description": "...", "position": "..." },
    { "name": "heading", "content_summary": "...", "emphasis_words": [...] },
    ...
  ]
}

Be precise. Measure pixels by comparing to known reference sizes (standard viewport is 1440px wide). Estimate confidently.
```

---

## Approach B — Forensic Visual Description

```
You are describing this UI screenshot to a senior frontend developer who cannot see the image. They will recreate it EXACTLY from your description alone. Any detail you miss, they will get wrong.

Scan the image top-to-bottom, left-to-right. For EVERY visual element:

1. POSITION: Where is it? (top-left, centered, X pixels from top, etc.)
2. SIZE: How large relative to the viewport and to other elements?
3. COLOR: Exact description — not "blue" but "deep navy, approximately #0a1628, with 90% opacity"
4. TYPOGRAPHY: Serif or sans? Bold or light? Size relative to other text? Spacing?
5. EFFECTS: Any shadow, blur, glow, gradient, border? Describe the exact CSS you'd write.
6. RELATIONSHIPS: How does this element relate to what's above/below/beside it?

After describing all elements, describe:
- The OVERALL MOOD in 3 words
- The CONTRAST STRATEGY (what's bright vs dim, what draws the eye first)
- The COLOR TEMPERATURE (warm, cool, neutral)
- What makes this design feel PREMIUM vs GENERIC (specific techniques)
- The ONE thing that would look most wrong if you got it slightly off

Write at least 800 words. More detail = more fidelity.
```

---

## Approach C — Component Decomposition

```
You are a UI architect reverse-engineering this screenshot into implementable components.

Step 1 — INVENTORY
List every distinct visual component you see, numbered. Example:
1. Navigation bar
2. Trust badge
3. Hero heading
...

Step 2 — COMPONENT SPECS
For each component, provide:
- HTML structure (what elements, nesting)
- Tailwind CSS classes you would use (be specific — real class names)
- Any custom CSS needed beyond Tailwind
- Content (exact text or description of text)
- Interactive behavior (hover states, animations visible)

Step 3 — COMPOSITION
Describe how the components are arranged:
- What's the outer container? (max-width, padding, centering)
- What's the stacking order? (which overlaps which)
- What are the gaps between components?
- What's the background treatment behind everything?

Step 4 — HIERARCHY MAP
Draw the visual hierarchy as a tree:
- First thing eye sees: ___
- Second: ___
- Third: ___
This tells us what needs the most contrast/size/weight.

Step 5 — DANGER ZONES
What are the 3 things most likely to go wrong when coding this?
(e.g. "the gradient angle will be off", "the blur amount will be too strong")
```

---

## Approach D — Diff-Based Iterative

```
PHASE 1: Look at this reference image. Write a complete, self-contained HTML page with inline Tailwind CSS that recreates this UI section as faithfully as possible. Use CDN Tailwind. Be precise but fast — this is your first draft.

PHASE 2 (after screenshot comparison): Here are two images:
- LEFT: The reference (original)
- RIGHT: Your output

List EVERY visible difference between them, no matter how small:
1. [element] — reference shows X, output shows Y
2. [element] — reference shows X, output shows Y
...

Then provide the corrected code that fixes ALL listed differences. Be surgical — only change what's different.

PHASE 3 (repeat until converged or 3 iterations max)
```

---

## Code Generation Prompt (same for A/B/C)

Used after extraction to generate the actual code:

```
Using the design specification below, create a React component using Tailwind CSS that faithfully recreates this UI section.

Rules:
- Use only Tailwind classes + inline styles where Tailwind can't express it
- Match colors EXACTLY (use the hex values from the spec, not approximations)
- Match spacing EXACTLY (use the px values, convert to Tailwind rem or use arbitrary values)
- Match typography EXACTLY (font sizes, weights, letter-spacing)
- Include ALL effects (shadows, blurs, gradients, borders)
- The component should be self-contained and responsive

Spec:
[INSERT EXTRACTION OUTPUT HERE]
```
