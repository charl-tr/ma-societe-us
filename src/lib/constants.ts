export const SITE = {
  name: "MA SOCIETE US",
  phone: "+1 (302) 555-0147",
  email: "contact@ma-societe-us.com",
};

// Nav: 4 items max — simplicité pilier #1
// "Tarifs" retiré → pricing vit dans /services, double emploi = friction
// "Contact" retiré → le bouton CTA navbar fait ce travail (dupliquer = diluer sa valeur)
// "À propos" ajouté → confiance pilier #1, page équipe doit être accessible depuis le nav
export const NAV_ITEMS = [
  { label: "Créer une LLC", href: "/creer-llc" },
  { label: "Services", href: "/services" },
  { label: "À propos", href: "/a-propos" },
  { label: "Blog", href: "/blog" },
] as const;

export const HERO = {
  headline: "Votre société américaine.\nCréée en 14 jours.",
  subline:
    "Cabinet franco-américain depuis 2014. 100% légal, 100% à distance — sans billet d'avion, sans visa, sans frais cachés.",
  cta: "Entretien gratuit — 15 min",
  ctaSecondary: "Voir comment ça marche",
};

export const INTRO = {
  headline:
    "Vous payez trop d'impôts. La LLC américaine change la donne.",
  body: "Si la fiscalité française pénalise votre activité, si l'administratif vous étouffe, ou si vous sentez que votre structure actuelle vous freine — la LLC aux USA est la solution qu'utilisent déjà des milliers d'entrepreneurs européens.",
};

export const ADVANTAGES = [
  "0% d'imposition aux USA",
  "Pas besoin de résider aux USA",
  "Pas besoin de se déplacer",
  "Souplesse comptable",
  "Rapidité de création",
  "Solution économique",
  "Pas de capital minimum",
  "Anonymat",
  "Responsabilité limitée",
];

export const OFFER = [
  {
    title: "Création de votre LLC américaine",
    description:
      "Nous gérons pour vous de A à Z la création de votre LLC américaine avec la collaboration de notre partenaire local agréé par le Secretary of State pour immatriculer votre société.",
  },
  {
    title: "Un véritable accompagnement",
    description:
      "En souscrivant à notre offre, vous bénéficierez d'un véritable accompagnement, nous serons à vos côtés tout au long du processus de création, et même après.",
  },
  {
    title: "Assistance à la création d'un compte bancaire",
    description:
      "Nous vous assistons à l'ouverture d'un compte bancaire associé à une carte de crédit professionnelle auprès de l'un de nos partenaires bancaires.",
  },
];

export const STATS = [
  { value: "10+", label: "ans d'expertise franco-américaine" },
  { value: "500+", label: "sociétés créées" },
  { value: "15M€", label: "d'économies générées" },
  { value: "4", label: "états fiscalement optimisés" },
];

export const FOOTER_LINKS = {
  services: [
    { label: "Pack LLC", href: "/services/pack-llc" },
    { label: "Comptabilité", href: "/services/comptabilite" },
    { label: "Fiscalité", href: "/services/fiscalite" },
    { label: "Compte bancaire", href: "/services/compte-bancaire" },
    { label: "Tarifs", href: "/tarifs" },
  ],
  cabinet: [
    { label: "À propos", href: "/a-propos" },
    { label: "Créer une LLC", href: "/creer-llc" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "CGV", href: "/cgv" },
    { label: "Confidentialité", href: "/confidentialite" },
  ],
};

export const TESTIMONIAL = {
  quote:
    "Un grand merci à toute l'équipe ! Christophe et Mathieu ont été de très bons conseils et m'ont permis de faire des économies sur ma note fiscale. Je referai sans aucun doute appel à eux pour mes déclarations fiscales.",
  author: "Antoine R.",
};

export const TESTIMONIALS = [
  {
    quote:
      "J'économise plus de 30 000€ par an grâce à ma LLC. Christophe et son équipe ont tout géré — je n'ai eu qu'à signer.",
    author: "Antoine R.",
    role: "Consultant IT · LLC au Nouveau-Mexique",
  },
  {
    quote:
      "14 jours entre mon premier appel et ma première facture en dollars. Compte Mercury inclus. J'aurais dû le faire il y a 3 ans.",
    author: "Sophie M.",
    role: "E-commerce · LLC au Colorado",
  },
  {
    quote:
      "Le seul cabinet qui parle français ET qui comprend la fiscalité des deux côtés de l'Atlantique. L'accompagnement post-création, c'est ce qui fait la différence.",
    author: "Thomas D.",
    role: "Fondateur SaaS · LLC au Delaware",
  },
];

export const VALUE_PROPS = [
  {
    icon: "percent",
    title: "Jusqu'à 0% d'impôts",
    description: "Là où la France vous prend 45%+, une LLC au bon état peut descendre à zéro. 100% légal, conforme OCDE, exercé depuis 2014.",
  },
  {
    icon: "shield",
    title: "Personne ne peut vous chercher",
    description: "Votre nom n'apparaît nulle part dans les registres publics. Pas de trace, pas d'exposition. Un anonymat que votre SARL ne peut pas vous offrir.",
  },
  {
    icon: "clock",
    title: "Opérationnel en 14 jours",
    description: "LLC créée, EIN obtenu, compte Mercury ouvert. Vous facturez en dollars dans les 2 semaines — pas dans 6 mois.",
  },
  {
    icon: "globe",
    title: "Zéro déplacement, zéro visa",
    description: "100% à distance. Pas de billet d'avion, pas de consulat, pas de déplacement. Vous signez — on fait le reste depuis les USA.",
  },
];
