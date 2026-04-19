import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ── SEO 301s — live WordPress slugs → redesign slugs ──────────────
      // Preserves PageRank from 10 years of indexing + backlinks.
      // Source: audit ma-societe-us.com (avril 2026)
      {
        source: "/llc-usa",
        destination: "/creer-llc",
        permanent: true,
      },
      {
        source: "/llc-usa/",
        destination: "/creer-llc",
        permanent: true,
      },
      {
        source: "/creer-llc-offre",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/creer-llc-offre/",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/ouvrir-compte-bancaire-usa-solution",
        destination: "/services/compte-bancaire",
        permanent: true,
      },
      {
        source: "/ouvrir-compte-bancaire-usa-solution/",
        destination: "/services/compte-bancaire",
        permanent: true,
      },
      {
        source: "/monter-societe-usa-pourquoi",
        destination: "/creer-llc",
        permanent: true,
      },
      {
        source: "/monter-societe-usa-pourquoi/",
        destination: "/creer-llc",
        permanent: true,
      },
      {
        source: "/monter-societe-etats-unis-tarifs",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/monter-societe-etats-unis-tarifs/",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/declaration-llc",
        destination: "/services/fiscalite",
        permanent: true,
      },
      {
        source: "/declaration-llc/",
        destination: "/services/fiscalite",
        permanent: true,
      },
      {
        source: "/creer-entreprise-etats-unis-contact",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/creer-entreprise-etats-unis-contact/",
        destination: "/contact",
        permanent: true,
      },
      // Immigration page supprimée → homepage
      // (service dépriorisé du nav, contenu non repris dans le redesign)
      {
        source: "/visa-e2",
        destination: "/",
        permanent: true,
      },
      {
        source: "/visa-e2/",
        destination: "/",
        permanent: true,
      },
    ];
  },

  // ── i18n-ready ───────────────────────────────────────────────────────────
  // Architecture préparée pour /en prefix si besoin futur.
  // Activé ici dès que le contenu anglais existe.
  // i18n: {
  //   locales: ["fr", "en"],
  //   defaultLocale: "fr",
  // },
};

export default nextConfig;
