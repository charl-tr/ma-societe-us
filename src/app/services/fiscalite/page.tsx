"use client";

import { PageHeader } from "@/components/layout/PageHeader";

const SERVICES = [
  {
    title: "Identification des dépenses déductibles",
    price: "À partir de $400",
    description:
      "Analyse complète de vos dépenses professionnelles pour identifier toutes les déductions fiscales applicables à votre LLC et optimiser votre assiette imposable.",
  },
  {
    title: "Recherche de déductibilités",
    price: "À partir de $800",
    description:
      "Étude approfondie des régimes fiscaux et conventions fiscales applicables à votre situation. Identification des opportunités d'optimisation légale.",
  },
  {
    title: "Stratégie fiscale personnalisée",
    price: "Sur devis",
    description:
      "Élaboration d'une stratégie fiscale sur mesure tenant compte de votre résidence, de votre activité et des conventions bilatérales France-USA.",
  },
];

export default function FiscalitePage() {
  return (
    <main>
      <PageHeader
        title="Fiscalité."
        subtitle="Optimisation fiscale légale de votre structure américaine."
      />

      <section className="bg-[#FAFAF9] text-[#0F0E0D] py-[100px] lg:py-[140px]">
        <div className="px-6 lg:px-10 max-w-4xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#0F0E0D]/30 mb-5">
            Optimisation fiscale
          </p>
          <p className="text-[17px] leading-relaxed text-[#0F0E0D]/60 mb-16 max-w-2xl">
            La fiscalité d&apos;une LLC américaine détenue par un non-résident offre
            des opportunités d&apos;optimisation significatives. Nous vous aidons à
            structurer votre activité pour une imposition pouvant aller
            jusqu&apos;à 0%.
          </p>

          <div className="space-y-8">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="border border-[#0F0E0D]/[0.08] rounded-xl p-8 hover:border-[#0F0E0D]/[0.15] transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3
                    className="text-[20px] font-normal"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {service.title}
                  </h3>
                  <span className="text-[14px] text-[#0F0E0D]/40 whitespace-nowrap">
                    {service.price}
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed text-[#0F0E0D]/55">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EDF1F6] text-[#1a2a40] py-[100px] lg:py-[140px]">
        <div className="px-6 lg:px-10 max-w-2xl mx-auto text-center">
          <h2
            className="text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] font-normal tracking-[-0.02em] mb-10"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Optimisons votre fiscalité.
          </h2>
          <a
            href="/contact"
            className="inline-flex items-center bg-[#FAFAF9] text-[#0F0E0D] px-8 py-4 rounded-full text-[15px] font-medium hover:bg-[#F2F1F0] transition-colors"
          >
            Réservez votre entretien découverte
          </a>
        </div>
      </section>
    </main>
  );
}
