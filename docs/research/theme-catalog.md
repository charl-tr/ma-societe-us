# Catalogue des Thèmes — MA SOCIETE US

## Thèmes disponibles

| Nom | Branche | Mood | Fond | Accent | Typo | Statut |
|---|---|---|---|---|---|---|
| **Liquid Glass Institutional** | `skin/liquid-glass` | Froid, aérien, Apple-like | #E8ECF2 (misty) | Chrome argent | Serif + Sans | ✅ Actif |
| **Partners LLC DR** | `skin/partners-llc` | Dark, DR, urgence soft | rgb(22,24,29) | Vert #34d399 | Poppins 800 | ✅ Pushé |
| **Navy White** | `theme/navy-white` | Navy institutionnel | White + Navy | Bleu #002868 | Cardo + DM Sans | Archivé |
| **Main (Vercel)** | `main` | Glassmorphism + orbs abstract | #EDF1F6 | Bleu/rouge | Space Grotesk + Cardo | ✅ En prod |

## Comment utiliser

```bash
# Voir un thème
git checkout skin/liquid-glass
npm run dev

# Revenir au main (prod)
git checkout main

# Comparer 2 thèmes : ouvrir 2 terminaux
# Terminal 1: git checkout main && npm run dev --port 3003
# Terminal 2: git checkout skin/liquid-glass && npm run dev --port 3004
```

## Règle
- `main` = ce qui est sur Vercel. On ne touche pas sans décision validée.
- Chaque skin est une branche isolée. On peut switcher instantanément.
- Le contenu et la structure sont les mêmes sur chaque skin (seul le thème change).
