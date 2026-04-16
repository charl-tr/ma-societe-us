---
name: design-extraction
description: Extract the complete visual DNA of any website or screenshot image, then apply it to generate faithful code. Use this skill whenever the user shares a reference site URL, a screenshot, or says "make it look like this", "absorb this vibe", "match this style", or wants to reproduce a visual identity.
---

# Design Extraction

Extract a website's visual identity ("DNA") and translate it into code with maximum fidelity.

## When to use
- User shares a URL: "extract the style of [url]"
- User shares a screenshot: "reproduce this"
- User wants to match a reference: "make it look like this"
- Any task where visual fidelity to a reference matters

## Process

### STEP 1 — Extract

**If the user provides a URL:**

1. Open the URL in Chrome
2. Wait for full load (5s minimum)
3. Execute the DNA extraction script (read `extract-dna.js` from this skill folder, run it via `javascript_tool`)
4. The script returns ONE JSON with: fonts, CSS variables, stylesheet URLs, media, overlays, sections structure, and computed styles of all key elements (body, nav, headings, paragraphs, CTAs, cards, sticky bar)
5. If the JSON is truncated, retrieve it in parts: `JSON.stringify(window.__DNA.fonts)`, `JSON.stringify(window.__DNA.elements.headings)`, etc.

**If the user provides only an image:**

1. List every visible element, numbered
2. For each: estimate colors (hex), sizes (px), spacing, effects (CSS syntax)
3. Mark uncertain values with [?]
4. Identify the 3 elements that make this design unique

### STEP 2 — Present to user

Show the extracted DNA as a clear summary:

```
SITE DNA — [url or image name]

FONTS: [family] (heading), [family] (body)
PALETTE: bg [hex], text [hex], accent [hex], muted [hex]
HEADING: [size]px, weight [n], spacing [n]px
BODY: [size]px, weight [n], line-height [n]px
CTA: bg [hex], text [hex], radius [n]px, padding [values]
NAV: [transparent/solid/blur], [n] items
SECTIONS: [n] sections, alternating [color pattern]
SPECIAL: [sticky bar / trustpilot / video hero / glassmorphism / etc.]
```

### STEP 3 — User validates

Ask: "Does this capture the design correctly? Anything missing or wrong?"

**WAIT for user validation. Do NOT proceed to code without it.**

### STEP 4 — Generate code

Use the EXACT extracted values:
- Font families from the extraction (not substitutes)
- Exact hex colors (not approximations)
- Exact px values for sizes, spacing, radius
- Exact CSS for shadows, blur, gradients

If the font is custom (not on Google Fonts), load it via @font-face with the extracted URL.
If the font is on Google Fonts, use the Google Fonts CDN link.

### STEP 5 — Compare

Screenshot the output and show it next to the reference. Ask: "What's different?"

## Rules

1. **NEVER code before validation.** The user must confirm the extraction.
2. **Use EXACT values.** No "close enough". If the script says 80px, use 80px.
3. **No font substitution.** If it's HarveySerifFont, load HarveySerifFont. Don't pick Playfair Display.
4. **Mark uncertainty.** If something can't be measured, say so with [?].
5. **The user is the judge.** They compare, they decide, they close the loop.

## Files in this skill

- `SKILL.md` — this file (instructions)
- `extract-dna.js` — the browser script that extracts all visual data in one call

## What the script captures

| Category | Data |
|---|---|
| Fonts | @font-face URLs, family names, weights |
| CSS Variables | All --custom-property values from :root |
| Stylesheets | URLs of all CSS files |
| Media | Videos, hero images |
| Overlays | Gradient overlays on hero section |
| Sections | Count, heights, background colors, text preview |
| Nav | Styles + each item (text, dropdown flag, button vs link) |
| Headings | h1-h3 with full typography |
| Paragraphs | Body text styles |
| CTAs | All prominent buttons/links |
| Cards | Elements with border-radius + shadow/blur |
| Sticky bar | Fixed/sticky bottom bars (if present) |

## What the script does NOT capture

- Animations and transitions (hover states, keyframes)
- Google Fonts loaded via `<link>` (but computed fontFamily reveals the name)
- Iframe content (embedded videos)
- Layout composition (element positioning relative to each other)
- The "mood" / subjective feel

These gaps are filled by Claude's visual analysis of the screenshot in Step 1.
