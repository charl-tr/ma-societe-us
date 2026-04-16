# RUN #1b — Harvey.ai (Exact Extraction)

**Date:** 15 avril 2026
**Input:** URL https://www.harvey.ai
**Méthode:** Script Chrome (computed styles) + font-face URLs + video URL + overlay gradient
**Output:** harvey-run-1b.html

## Ce que le script a extrait (données utilisées)

### Fonts (exactes — fichiers woff2 récupérés)
- HarveySerifFont: https://www.harvey.ai/_next/static/media/subset_HarveySerif_Regular-s.p.c22aac23.woff2
- HarveySerifFont italic: https://www.harvey.ai/_next/static/media/subset_HarveySerif_Italic-s.p.30ae7599.woff2
- HarveySansFont (variable): https://www.harvey.ai/_next/static/media/HarveySansDiatypeVariable-s.p.55ae9097.woff2

### Video
- https://www.harvey.ai/videos/impact-hero.webm

### Overlay (exact CSS from computed styles)
- linear-gradient(to right in oklab, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)
- + rgba(15, 14, 13, 0.25) overlay

### Heading (h1)
- font-family: HarveySerifFont
- font-size: 80px
- font-weight: 400
- letter-spacing: -1px
- line-height: 84px
- color: rgb(250, 250, 249)

### Subheading (p)
- font-family: HarveySansFont
- font-size: 20px
- font-weight: 400
- line-height: 26px
- color: rgba(250, 250, 249, 0.75)

### CTA "Request a Demo"
- font-size: 14px
- font-weight: 500
- background: rgb(250, 250, 249)
- color: rgb(15, 14, 13)
- border-radius: 4px
- padding: 0 12px
- height: ~40px

### "Our Customers" button
- font-size: 14px
- font-weight: 400
- border: 1px solid rgb(250, 250, 249)
- border-radius: 4px

### Nav
- font-size: 14px
- font-weight: 500
- color: rgba(250, 250, 249, 0.8)
- position: absolute (floats over hero)

### Body
- background: rgb(15, 14, 13)
- font-family: HarveySansFont
- font-size: 16px

## Différences Run 1 → Run 1b
- Run 1: Playfair Display (Google Font substitute) → Run 1b: HarveySerifFont (exact woff2)
- Run 1: CSS gradient background → Run 1b: actual video from harvey.ai
- Run 1: guessed overlay → Run 1b: exact linear-gradient from computed styles
- Run 1: hero only → Run 1b: hero + logo bar + 3 sections below

## Feedback Charles
(à remplir)
- 
- 

## Actions pour Run #2
(basées sur le feedback)
- 
