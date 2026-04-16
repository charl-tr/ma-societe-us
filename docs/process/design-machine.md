# The Design Machine

Process pour ship du world-class, intentionnel et traçable.

---

## Principe fondamental

Chaque choix de design est **intentionnel**, **sourcé** et **vérifiable**.
Pas de "au feeling". Pas de sur-documentation. La vitesse est non-négociable.

> "Fait > parfait" — mais chaque "fait" doit être justifiable.

---

## La boucle : INTENT → BUILD → JUDGE → LOG

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│   1. INTENT          2. BUILD         3. JUDGE       │
│                                                      │
│   1 phrase :         Code it.         Compare         │
│   [élément]          Vertical slice.  résultat vs     │
│   inspiré [source]   Fast.            source.         │
│   pour [pilier(s)]                                   │
│                                       Gap ? → 2.     │
│                                       OK ?  → 4.     │
│                                                      │
│                      4. LOG                          │
│                      1 ligne dans                    │
│                      decision-log.md                 │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Étape 1 — INTENT (5 secondes)

Avant de toucher le code, écrire une phrase :

```
[élément] → inspiré [source] → pour [pilier(s)]
```

Exemples :
- "Nav → Partners LLC → Simplicité"
- "Hero → Harvey.ai → Confiance + Compétence"
- "Sticky CTA → Partners LLC adapté → Conviction"

C'est tout. Pas de brief de 3 pages.

### Étape 2 — BUILD

- Coder le changement sur `skin/liquid-glass`
- Vertical slice : l'élément est complet (design + responsive + interactions)
- Un commit par élément modifié

### Étape 3 — JUDGE

Comparaison directe : screenshot du résultat vs la source d'inspiration.

Question unique : **"Est-ce qu'on atteint le niveau ?"**
- Non → retour étape 2, itérer
- Oui → étape 4

### Étape 4 — LOG

Ajouter une ligne dans `docs/process/decision-log.md` :

```
| Élément | Dimension | Source | Pilier(s) | Status |
```

---

## Les 4 piliers (Benjamin Koch)

Grille d'évaluation — chaque choix impacte un ou plusieurs piliers.

| Pilier | Définition opérationnelle |
|--------|--------------------------|
| **Confiance** | Un DG de 45 ans prendrait-il ce cabinet au sérieux ? |
| **Compétence** | Voit-on que ces gens savent de quoi ils parlent ? |
| **Simplicité** | Un entrepreneur pressé comprend-il en 5 secondes ? |
| **Conviction** | Le visiteur passe-t-il à l'action ? |

---

## Les 3 dimensions (décomposition)

| Dimension | Ce qu'elle couvre |
|-----------|------------------|
| **Structure** | Sitemap, navigation, flow de page, placement CTAs, lead capture, convergence |
| **Design** | Couleurs, typographie, spacing, animations, craft, effets visuels, responsive |
| **Copy** | Headline, ton, arguments, spécificité (chiffres), objections, preuve sociale, texte des CTAs |

---

## Règles anti-chaos

### Branches
- `main` → Vercel prod. **NE JAMAIS TOUCHER.**
- `skin/liquid-glass` → branche de travail. Tous les commits vont là.
- Pas d'autre branche sans raison explicite.

### Non-cannibalisation
- On ne change qu'**une dimension à la fois** par itération
- Si on modifie la nav (Structure), on ne refait pas le copy en même temps
- Ça permet de juger l'impact de chaque changement isolément

### Vertical slices
- Chaque élément est shippé complet : design + responsive + interactions
- Pas de "d'abord tout le design, puis tout le responsive"

---

## Sources de référence

| Site | Force principale | À prendre |
|------|-----------------|-----------|
| **Harvey.ai** | Craft, autorité, design system | Palette, typo, motion, ton premium |
| **Partners LLC** | Conversion, simplicité, flow | Nav, CTA, sticky bar, linéarité |
| **MA Societe US (actuel)** | Contenu, SEO, profondeur | Copy factuel, FAQ, pages services |

---

## Contexte stratégique

Ce site est la **Couche 1 — La Vitrine** (rapport autopsie Benjamin).

- Objectif : perception de valeur et confiance. PAS de conversion agressive.
- DA : fusion institutionnel × Liquid Glass sobre
- Le copy existant est conservé, l'UX est repensée
- Le site doit créer l'effet "Waouh" pour le pitch à Christophe & Bretaard (budget 30-35K€)
- Le trafic payant n'atterrira JAMAIS sur la vitrine (→ Couche 2 : LPs dédiées)

---

*Dernière mise à jour : 16 avril 2026*
