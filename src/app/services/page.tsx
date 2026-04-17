"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Process } from "@/components/sections/Process";

const SERVICES_GRID = [
  {
    title: "Pack LLC",
    description:
      "Création complète de votre LLC américaine, de A à Z. Accompagnement, documents légaux, obtention de l'EIN et ouverture de compte bancaire inclus.",
    href: "/services/pack-llc",
    label: "Découvrir le pack",
  },
  {
    title: "Comptabilité",
    description:
      "Gestion comptable de votre LLC : tenue des livres, déclarations fiscales, et conformité comptable américaine pour non-résidents.",
    href: "/services/comptabilite",
    label: "En savoir plus",
  },
  {
    title: "Fiscalité",
    description:
      "Optimisation fiscale de votre structure américaine. Identification des déductions, recherche de déductibilités, et stratégie fiscale personnalisée.",
    href: "/services/fiscalite",
    label: "En savoir plus",
  },
  {
    title: "Compte bancaire",
    description:
      "Assistance à l'ouverture d'un compte bancaire professionnel américain, avec carte de crédit, sans besoin de se déplacer.",
    href: "/services/compte-bancaire",
    label: "En savoir plus",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <PageHeader
        title="Nos services."
        subtitle="Un accompagnement complet pour créer et gérer votre société américaine."
      />

      {/* Offer cards */}
      <Process />

      {/* Services grid */}
      <section
        className="py-[100px] lg:py-[140px] border-t border-[#0e1e38]/[0.06]"
        style={{ background: "linear-gradient(160deg, #eef3f9 0%, #e8eef6 40%, #f2f6fb 100%)" }}
      >
        <div className="px-6 lg:px-10 max-w-[1400px] mx-auto">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#0e1e38]/25 mb-12">
            Tous nos services
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES_GRID.map((service) => (
              <a
                key={service.title}
                href={service.href}
                className="group rounded-2xl p-8 lg:p-10 transition-all hover:shadow-[0_8px_40px_rgba(80,120,180,0.13)]"
                style={{
                  background: "rgba(255,255,255,0.72)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.88)",
                  boxShadow: "0 4px 24px rgba(80,120,180,0.08)",
                }}
              >
                <h3
                  className="text-[clamp(1.3rem,2vw,1.6rem)] font-semibold tracking-tight mb-4 text-[#0e1e38]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {service.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[#0e1e38]/50 mb-6">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-2 text-[13px] text-[#2a5090]/60 group-hover:text-[#2a5090] transition-colors font-medium">
                  {service.label}
                  <svg
                    className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-[100px] lg:py-[140px] border-t border-[#0e1e38]/[0.06]"
        style={{ background: "linear-gradient(160deg, #eef3f9 0%, #e4ecf6 40%, #f2f6fb 100%)" }}
      >
        <div className="px-6 lg:px-10 max-w-2xl mx-auto text-center">
          <h2
            className="text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] font-semibold tracking-[-0.025em] mb-6 text-[#0e1e38]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Un projet ? Parlons-en.
          </h2>
          <p className="text-[17px] text-[#0e1e38]/45 mb-10 leading-relaxed">
            Réservez un entretien découverte gratuit de 15 minutes.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 rounded-full text-[15px] font-semibold text-white transition-all"
            style={{
              background: "linear-gradient(135deg, #1a3a6a 0%, #2a5090 100%)",
              boxShadow: "0 4px 20px rgba(42,80,144,0.30)",
            }}
          >
            Réservez votre entretien découverte
          </a>
        </div>
      </section>
    </main>
  );
}
