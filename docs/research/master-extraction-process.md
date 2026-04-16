# Design Extraction — Master Process

## Le problème qu'on résout

Quand on reçoit une référence visuelle, le code produit dérive de l'original.
La perte vient de l'absence de MESURE — on interprète au lieu d'extraire.

Ce document définit le process exact pour passer de "référence" à "code fidèle"
avec le minimum de perte et le minimum d'itérations.

---

## 2 cas d'usage, 2 pipelines

### CAS A — On a l'URL du site
→ Pipeline automatique. On MESURE tout.

### CAS B — On a juste une image (screenshot, mockup, photo)
→ Pipeline assisté. Claude analyse, l'humain valide avant le code.

---

## CAS A — Pipeline URL (automatisable)

### Entrée
Une URL live (ex: `https://partnersllc.fr`)

### Étape 1 — Tokens de base (Firecrawl)
```
firecrawl.scrape(url, formats=["branding"])
```
**Output :** JSON avec couleurs hex, font families, font sizes, spacing, logo, color scheme.

Ce sont les FONDATIONS — les valeurs objectives qui ne nécessitent aucune interprétation.

### Étape 2 — Computed styles des éléments clés (Chrome automation)
Script JS exécuté dans le navigateur qui cible les 12-15 éléments structurants :

```
Éléments à extraire :
1. nav / header
2. hero heading (h1)
3. hero subheading / body text
4. CTA button (primary)
5. CTA button (secondary / ghost)
6. trust badge / social proof element
7. card / glass panel
8. section background
9. testimonial block
10. footer
11. sticky bar (si présent)
12. icon / badge décoratif
```

Pour chaque élément, extraire :
```
- background (color, gradient, image)
- color (text)
- font-family, font-size, font-weight, letter-spacing, line-height, text-transform
- padding, margin
- border, border-radius, border-image
- box-shadow
- backdrop-filter
- opacity
- transition, animation
- transform
- width, height (ou max-width)
- position, z-index
```

**Output :** JSON structuré par élément, avec les valeurs CSS réelles.

### Étape 3 — CSS source (hover states, animations, keyframes)
Scraper les stylesheets du site et extraire :
- Les `:hover` states (qu'est-ce qui change au survol)
- Les `@keyframes` (animations)
- Les `@media` queries (responsive breakpoints)
- Les CSS custom properties (`--var`)

**Output :** les règles CSS pertinentes, pas le fichier entier.

### Étape 4 — Structure DOM
Extraire le HTML nettoyé des sections clés :
- Hierarchy (quels éléments dans quels conteneurs)
- Classes (en Tailwind, elles sont le design)
- Ordre des éléments (ce qui vient avant/après)
- Nesting depth (la profondeur de composition)

**Output :** HTML simplifié avec les classes préservées.

### Étape 5 — Screenshot
Capturer à 1440×900 (desktop) et 375×812 (mobile).
Pas pour l'extraction — pour la VÉRIFICATION ultérieure.

### Étape 6 — Assemblage
Tout est compilé dans un document unique :

```
DESIGN EXTRACTION REPORT — [url]
Date: [date]

## 1. Tokens de base (Firecrawl)
[JSON branding]

## 2. Styles par élément
### nav
[computed styles]
### hero-heading
[computed styles]
...

## 3. Interactions & animations
### Hover states
[CSS rules]
### Animations
[keyframes]
### Transitions
[transition values]

## 4. Structure
[HTML simplifié]

## 5. Screenshots de référence
[desktop.png]
[mobile.png]
```

### Étape 7 — Validation humaine
L'humain review le document et :
- Confirme que les tokens sont corrects
- Signale ce qui manque ("tu n'as pas capturé l'effet de reflet sur les cards")
- Valide avant toute génération de code

### Étape 8 — Génération de code
Claude reçoit le document validé et code.
Il n'interprète plus — il TRADUIT des mesures en Tailwind/CSS.

---

## CAS B — Pipeline Image (assisté par Claude)

### Entrée
Une image (screenshot, mockup, photo de Dribbble, etc.) — PAS d'URL.

### Étape 1 — Inventaire
Claude liste CHAQUE élément visible, numéroté :
```
1. Background — gradient sombre navy
2. Badge — pill shape, fond semi-transparent, étoiles
3. Heading — serif, blanc, très grand, centré
4. Subheading — sans-serif, blanc 60% opacity
5. CTA primary — pill blanc, texte sombre
6. CTA secondary — ghost, bordure fine
...
```

### Étape 2 — Mesures relatives
Pour chaque élément, Claude ESTIME les mesures.
Comme il n'a pas de computed styles, il utilise des ratios :
```
Heading est environ 4x plus grand que le body text
Le CTA fait environ 1/4 de la largeur du heading
L'espace entre heading et subheading ≈ 1.5x la hauteur d'une ligne de body
Le border-radius du CTA ≈ la moitié de sa hauteur (full-rounded)
```

Important : Claude MARQUE ce dont il n'est pas sûr avec [?].

### Étape 3 — Couleurs
Claude identifie les couleurs à partir de l'image.
Pour chaque couleur :
```
Background principal : #0a1628 [confiance haute]
Texte heading : #ffffff [confiance haute]
Texte muted : rgba(255,255,255,0.5) [confiance moyenne — pourrait être 0.4 ou 0.6]
Accent vert : #10b981 [confiance moyenne — pourrait être plus saturé]
```

### Étape 4 — Effets
Claude décrit les effets visuels en CSS :
```
Card glass effect :
  background: rgba(255,255,255,0.5) [?]
  backdrop-filter: blur(20px) [?]
  border: 1px solid rgba(255,255,255,0.6) [?]
  box-shadow: 0 8px 32px rgba(0,0,0,0.04) [?]

Hero overlay :
  background: linear-gradient(to bottom, rgba(10,22,40,0.6), rgba(10,22,40,0.9))
```

### Étape 5 — Ce qui rend ce design unique
Claude identifie les 3 éléments différenciants :
```
1. Le reflet chrome en haut des cards (gradient métallique de 3px)
2. Les lignes de connexion en L entre les cards et les états
3. Le fog qui dissout les bords de la carte (radial gradient mask)
```

Ce sont les éléments qui, s'ils sont ratés, font que le résultat "ne ressemble pas" à l'original.

### Étape 6 — Document d'extraction
Tout est compilé. L'humain review.
Il corrige les [?] et valide.

### Étape 7 — Génération de code
Identique au CAS A.

---

## Règles du process

1. **JAMAIS coder avant que le document d'extraction soit validé par l'humain.**
2. **Mesurer > interpréter.** Un hex est mieux qu'un "bleu foncé". Un px est mieux qu'un "assez grand".
3. **Marquer l'incertitude.** Si Claude n'est pas sûr, il met [?]. Mieux vaut un doute explicite qu'une erreur silencieuse.
4. **L'humain est le juge final.** Pas d'auto-évaluation. L'humain compare le résultat à la référence.
5. **Un élément à la fois.** Si l'extraction est mauvaise sur un élément, on corrige cet élément. On ne refait pas tout.

---

## Métriques de succès

- **Nombre d'itérations pour convergence** : objectif ≤ 2 (extraction → code → 1 correction max)
- **Temps total** : objectif < 30 min pour une section hero
- **Score de fidélité** (évalué par l'humain) : objectif ≥ 8/10

---

## Outils requis

| Outil | Pour quoi | Statut |
|---|---|---|
| Firecrawl API | Tokens de base (CAS A) | À setup |
| Chrome automation (Claude in Chrome) | Computed styles + screenshots | ✅ Disponible |
| Skill d'extraction (CAS B) | Analyse d'image structurée | À construire |
| Skill-creator | Itérer sur le skill | ✅ Installé |

---

## Prochaines étapes

1. Setup Firecrawl (API key, test sur Harvey.ai)
2. Écrire le script d'extraction computed styles
3. Construire le skill CAS B avec le skill-creator
4. Tester les 2 pipelines sur nos 3 références
5. Charles évalue, on itère
