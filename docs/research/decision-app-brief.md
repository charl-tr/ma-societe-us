# Brief — App de Décision All-in-One

## Ce que l'app doit permettre

Un seul outil web qui centralise toutes les analyses pour produire le nouveau site MA SOCIETE US. Chaque choix est justifié, comparable, et traçable.

## Les 5 vues de l'app

### VUE 1 — Scoring Matrix
Évalue chaque site de référence sur les critères de Benjamin.

Critères issus du WhatsApp + des PDFs :
- **Confiance** : trust signals, social proof, crédibilité visuelle, pricing transparent, légitimité, rassurance
- **Compétence** : expertise affichée, spécificité contenu, design authority, interactivité, blog/ressources
- **Simplicité** : clarté message, hiérarchie visuelle, navigation, mobile, densité, flow
- **Conviction** : CTA clarity, CTA frequency, urgence, objection handling, bénéfices concrets, lead capture

Les critères de Benjamin directs :
- "Confiance, compétence, simplicité, conviction" (chat WhatsApp)
- "Se démarquer tout en conservant une forte autorité institutionnelle"
- DA : new-yorkaise tamisée OU Liquid Glass sobre
- Mobile-first
- Rien au hasard

Sites évalués : MA Societe US actuel, Partners LLC, Harvey.ai
+ Score cible pour le nouveau site

Affichage : radar chart comparatif + barres par critère + détail par sous-critère

### VUE 2 — Tunnel de Conversion
Le parcours utilisateur complet de chaque site.

Pour chaque site :
- Flow step-by-step (entrée → sections → CTA → destination)
- Chaque CTA coloré par type (conversion / lead magnet / exploration / impasse)
- Carte de convergence (où mène chaque page)
- Stats clés (nb pages, nb clics, sticky bar oui/non, lead magnet oui/non)
- Forces et faiblesses

Comparaison côte-à-côte : tableau métrique par métrique
Tunnel cible proposé

### VUE 3 — Identité Visuelle (Brand DNA)
L'ADN visuel extrait de chaque site.

Pour chaque site :
- Palette (hex codes, preview)
- Typographie (family, sizes, weights)
- Effets (shadows, blur, gradients)
- Composants (CTA style, card style, nav style)
- Mood (3 mots-clés)

Comparaison côte-à-côte : quelle palette on prend, quelle typo, quels effets
Le "pourquoi" de chaque choix

### VUE 4 — Structure / Sitemap
L'architecture de chaque site.

Pour chaque site :
- Arbre des pages (nav principale + sous-pages)
- Liens internes entre les pages (qui pointe vers quoi)
- Ordre des sections sur la homepage
- Éléments persistants (nav, footer, sticky bar)

Comparaison : quelle structure on adopte pour le nouveau site
Justification de chaque choix de page/section

### VUE 5 — Décisions Finales
Le récap de tous les choix faits.

Pour chaque dimension :
- Le choix (ex: "On prend la palette warm gold de Harvey + la sticky bar de Partners")
- La source (quel site, quel critère)
- La justification (quel pilier de Benjamin ça sert)
- Le score attendu (impact sur la matrice)

C'est le cahier des charges final qui précède le code.

## Données déjà disponibles

| Donnée | Fichier | Status |
|---|---|---|
| Scoring Partners LLC | docs/research/scoring-results.md | ✅ Fait |
| Scoring Harvey.ai | docs/research/scoring-results.md | ✅ Fait |
| Scoring MA Societe US | docs/research/scoring-results.md | ✅ Fait |
| Tunnel MA Societe US | docs/research/conversion-tunnels.md | ✅ Fait |
| Tunnel Partners LLC | docs/research/conversion-tunnels.md | ✅ Fait |
| Tunnel Harvey.ai | docs/research/conversion-tunnels.md | ✅ Fait |
| DNA Partners LLC | .claude/skills/design-extraction/ (JSON) | ✅ Fait |
| DNA Harvey.ai | .claude/skills/design-extraction/ (JSON) | ✅ Fait |
| Contenu MA Societe US | docs/research/content-extraction-masocieteus.md | ✅ Fait |
| Sitemap MA Societe US | memory/site_actuel_audit.md | ✅ Fait |
| PDFs Benjamin | memory/project_strategy.md | ✅ Logué |

## Stack technique

HTML standalone (comme les tests qu'on a déjà) — PAS dans le projet Next.js.
Tailwind CDN + vanilla JS. Pas de framework.
Servi via python http.server sur le port 8889.
Fichier : tests/skins/decision-app.html

## Principes de l'app

- Clean, dark, Inter font, espacé
- Onglets pour switcher entre les vues
- Chaque donnée est cliquable pour voir le détail
- Chaque choix a un champ "justification" éditable
- L'app est un outil de TRAVAIL, pas un showcase
