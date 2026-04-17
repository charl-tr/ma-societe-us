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

      <section className="py-[100px] lg:py-[140px] text-[#0e1e38]" style={{ background: "linear-gradient(160deg, #eef3f9 0%, #e8eef6 40%, #f2f6fb 100%)" }}>
        <div className="px-6 lg:px-10 max-w-4xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#0e1e38]/30 mb-5">
            Optimisation fiscale
          </p>
          <p className="text-[17px] leading-relaxed text-[#0e1e38]/55 mb-16 max-w-2xl">
            La fiscalité d&apos;une LLC américaine détenue par un non-résident offre
            des opportunités d&apos;optimisation significatives. Nous vous aidons à
            structurer votre activité pour une imposition pouvant aller
            jusqu&apos;à 0%.
          </p>

          <div className="space-y-6">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="rounded-xl p-8 transition-all"
                style={{
                  background: "rgba(255,255,255,0.72)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.88)",
                  boxShadow: "0 4px 20px rgba(80,120,180,0.07)",
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3
                    className="text-[20px] font-semibold text-[#0e1e38]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {service.title}
                  </h3>
                  <span className="text-[14px] text-[#2a5090] font-medium whitespace-nowrap">
                    {service.price}
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed text-[#0e1e38]/55">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[100px] lg:py-[140px] border-t border-[#0e1e38]/[0.06]" style={{ background: "linear-gradient(160deg, #eef3f9 0%, #e4ecf6 40%, #f2f6fb 100%)" }}>
        <div className="px-6 lg:px-10 max-w-2xl mx-auto text-center">
          <h2
            className="text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] font-semibold tracking-[-0.025em] mb-10 text-[#0e1e38]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Optimisons votre fiscalité.
          </h2>
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
