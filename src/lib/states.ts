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
  {
    name: "Floride",
    slug: "floride",
    abbr: "FL",
    tagline: "Zéro impôt sur le revenu — fiscalité optimale",
    fips: "12",
    icon: "sun",
    description:
      "La Floride ne prélève aucun impôt sur le revenu des particuliers, ce qui en fait l'une des structures les plus attractives pour les entrepreneurs digitaux. Son environnement business-friendly, sa croissance démographique record et son hub tech émergent à Miami en font un état d'avenir. Création rapide, coûts réduits.",
    pros: [
      "Pas d'impôt sur le revenu d'état",
      "Création LLC rapide et économique",
      "Hub tech Miami en plein essor",
      "Marché en forte croissance",
    ],
    cons: ["Sales tax applicable selon activité"],
  },
  {
    name: "Californie",
    slug: "californie",
    abbr: "CA",
    tagline: "La puissance économique numéro 1 mondiale",
    fips: "06",
    icon: "star",
    description:
      "La Californie est la 5ème économie mondiale et le berceau mondial de la tech. Pour les entrepreneurs qui visent les investisseurs institutionnels, les VCs de la Silicon Valley ou un prestige maximum sur le marché américain, la CA LLC est le choix stratégique. À réserver aux structures ambitieuses prêtes à absorber la franchise tax.",
    pros: [
      "Prestige institutionnel maximum",
      "Accès direct aux VCs et investisseurs",
      "Écosystème tech mondial (Silicon Valley)",
      "Marché consommateur le plus grand des USA",
    ],
    cons: ["Franchise tax $800/an minimum", "Impôt d'état élevé (8.84% corporate)"],
  },
];

export function getStateBySlug(slug: string): StateInfo | undefined {
  return STATES.find((s) => s.slug === slug);
}
