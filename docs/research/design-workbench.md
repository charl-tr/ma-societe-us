# Design Workbench — Architecture

## Le problème

Aujourd'hui chaque redesign est monolithique : on prend tout d'un site et on code from scratch.
On veut pouvoir **décomposer** n'importe quel site en couches indépendantes et les **recomposer** librement.

## Les 4 couches d'un site

```
LAYER 1 — THEME (l'identité visuelle)
  Couleurs, fonts, font weights, letter-spacing, border-radius,
  shadows, blur effects, gradients, icon style, button shape

LAYER 2 — STRUCTURE (le squelette)
  Nombre de sections, leur ordre, la navigation (sitemap),
  le layout de chaque section (centré, split, grid),
  la hiérarchie (hero → social proof → features → pricing → CTA)

LAYER 3 — COPY (les mots)
  Headlines, subheadlines, body text, CTAs, labels,
  testimonials, FAQs, micro-copy

LAYER 4 — BEHAVIOR (les interactions)
  Animations, hover states, scroll effects, sticky elements,
  dropdowns, mobile menu, transitions
```

## Le workflow

```
Étape 1 — EXTRACT (décomposer)
  Input: URL ou screenshot
  Output: 4 fichiers JSON séparés (theme.json, structure.json, copy.json, behavior.json)

Étape 2 — SELECT (choisir)
  "Prends le THEME de partnersllc.fr"
  "Prends la STRUCTURE de ma-societe-us.com"
  "Prends le COPY de notre propre version"
  "Prends le BEHAVIOR de harvey.ai"

Étape 3 — COMPOSE (assembler)
  Merge les 4 layers sélectionnés en un brief cohérent
  Détecter les conflits (ex: structure attend 9 sections mais le copy n'en a que 5)
  Produire un document d'assemblage

Étape 4 — VALIDATE (humain)
  Charles review le document d'assemblage
  Confirme ou ajuste

Étape 5 — GENERATE (coder)
  Produire le HTML/code final à partir du brief validé

Étape 6 — COMPARE (feedback)
  Côte à côte avec les références
  Charles pointe les écarts
  On itère
```

## Les extracteurs (1 par layer)

### extract-theme.js
Récupère depuis une URL live :
- Palette de couleurs (body bg, text, accent, muted, border)
- Fonts (family, weights, sizes, letter-spacing, line-height)
- Border-radius (buttons, cards, inputs)
- Shadows (box-shadow values)
- Effects (backdrop-filter, gradients, opacity patterns)
- Button styles (shape, padding, colors)

Output : `theme.json`

### extract-structure.js
Récupère depuis une URL live :
- Navigation (items, dropdowns, CTA position)
- Sections (dans l'ordre, avec leur type : hero, intro, features, pricing, testimonial, CTA, footer)
- Layout de chaque section (centré, left-aligned, grid, split)
- Éléments spéciaux (sticky bar, announcement bar, logo bar)

Output : `structure.json`

### extract-copy.js
Récupère depuis une URL live :
- Tous les headings (h1-h4) dans l'ordre
- Tous les paragraphes de body text
- Tous les CTA texts
- Labels de navigation
- Testimonials (quote + author)
- Footer text
- Meta (title, description)

Output : `copy.json`

### extract-behavior.js
Récupère depuis une URL live :
- Éléments fixed/sticky
- Transitions (durées, easing)
- Animations détectées (keyframes)
- Hover states (via :hover rules dans les CSS)
- Scroll behavior (smooth, parallax indicators)

Output : `behavior.json`

## Le composeur

Prend en input : 4 fichiers JSON (un par layer, possiblement de sources différentes)
Produit : un brief structuré lisible par un humain ET par Claude pour générer le code

Détecte les conflits :
- "Le theme a 3 couleurs d'accent mais le copy ne mentionne jamais d'accent secondaire"
- "La structure a 9 sections mais le copy n'a que 6 headings"
- "Le behavior attend un sticky bar mais la structure n'en a pas"

## Stockage

```
tests/skins/
├── extractions/
│   ├── partners-llc/
│   │   ├── theme.json
│   │   ├── structure.json
│   │   ├── copy.json
│   │   └── behavior.json
│   ├── harvey-ai/
│   │   ├── theme.json
│   │   ├── structure.json
│   │   ├── copy.json
│   │   └── behavior.json
│   └── ma-societe-us/
│       ├── theme.json
│       ├── structure.json
│       ├── copy.json
│       └── behavior.json
├── compositions/
│   ├── masociete-x-partners-theme.json   ← brief assemblé
│   └── masociete-x-harvey-theme.json
└── outputs/
    ├── masociete-x-partners.html         ← résultat final
    └── masociete-x-harvey.html
```

## Ce qu'on construit dans l'ordre

1. Les 4 scripts d'extraction (JS browser, exécutables via Chrome automation)
2. Le skill SKILL.md qui orchestre le tout
3. Test : extraire partners-llc + ma-societe-us séparément
4. Test : composer partners-theme + masociete-structure + masociete-copy
5. Charles valide
6. Itérer sur les extracteurs basé sur le feedback
