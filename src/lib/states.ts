export interface StateInfo {
  name: string;
  slug: string;
  abbr: string;
  tagline: string;
  fips: string;
  icon: string;
  description: string;
  pros: string[];
  cons: string[];
}

export const STATES: StateInfo[] = [
  {
    name: "Nouveau-Mexique",
    slug: "nouveau-mexique",
    abbr: "NM",
    tagline: "Obtention de l'EIN en 5 à 6 jours",
    fips: "35",
    icon: "shield",
    description:
      "Le Nouveau-Mexique est l'état que nous recommandons en priorité pour les entrepreneurs étrangers souhaitant créer une LLC aux États-Unis. Il offre un anonymat total des actionnaires, aucune obligation comptable locale, et une fiscalité pouvant descendre à 0%. La gestion y est simplifiée, ce qui en fait le choix idéal pour une première société américaine.",
    pros: [
      "Anonymat total des actionnaires",
      "Aucune obligation comptable",
      "Fiscalité attractive (jusqu'à 0%)",
      "Gestion simplifiée",
      "Recommandé pour les entrepreneurs étrangers",
    ],
    cons: ["Délai légèrement plus long que le Colorado"],
  },
  {
    name: "Colorado",
    slug: "colorado",
    abbr: "CO",
    tagline: "Rapidité absolue — Création en 24h",
    fips: "08",
    icon: "zap",
    description:
      "Le Colorado se distingue par la rapidité exceptionnelle de ses procédures. Votre LLC peut être créée en 24 heures et l'obtention de l'EIN est la plus rapide de tous les états. Son écosystème startup-friendly et ses procédures simplifiées en font un choix privilégié pour les entrepreneurs pressés.",
    pros: [
      "EIN obtenu le plus rapidement",
      "Écosystème startup-friendly",
      "Procédure simplifiée",
    ],
    cons: ["Annual Report obligatoire", "Moins d'anonymat"],
  },
  {
    name: "Wyoming",
    slug: "wyoming",
    abbr: "WY",
    tagline: "L'état de prédilection pour les structures Crypto",
    fips: "56",
    icon: "lock",
    description:
      "Le Wyoming s'est imposé comme la référence pour les entrepreneurs dans le domaine de la blockchain et des cryptomonnaies. Sa législation pro-blockchain, son anonymat garanti et l'absence totale d'impôt sur le revenu de l'État en font le choix naturel pour les activités liées aux actifs numériques.",
    pros: [
      "Législation pro-blockchain",
      "Anonymat garanti",
      "Pas d'impôt sur le revenu de l'État",
    ],
    cons: ["Moins adapté aux activités classiques"],
  },
  {
    name: "Delaware",
    slug: "delaware",
    abbr: "DE",
    tagline: "Le standard pour la valorisation et la levée de fonds",
    fips: "10",
    icon: "building",
    description:
      "Le Delaware est l'état de référence pour les entreprises visant une levée de fonds ou une valorisation institutionnelle. La Court of Chancery, tribunal spécialisé en droit des affaires, offre un cadre juridique inégalé. C'est le choix de prestige pour les C-Corps et les projets ambitieux.",
    pros: [
      "Court of Chancery spécialisée",
      "Idéal pour levée de fonds",
      "Prestige institutionnel maximum",
    ],
    cons: ["Franchise Tax annuelle", "Plus adapté aux C-Corps"],
  },
];

export function getStateBySlug(slug: string): StateInfo | undefined {
  return STATES.find((s) => s.slug === slug);
}
