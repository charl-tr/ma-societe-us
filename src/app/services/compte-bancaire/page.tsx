"use client";

import { PageHeader } from "@/components/layout/PageHeader";

const STEPS = [
  {
    step: "01",
    title: "Constitution du dossier",
    description:
      "Nous vous fournissons la liste exhaustive des documents requis par la banque et vous accompagnons dans leur préparation.",
  },
  {
    step: "02",
    title: "Soumission à notre partenaire bancaire",
    description:
      "Votre dossier est soumis à notre banque partenaire avec laquelle nous avons négocié des conditions préférentielles.",
  },
  {
    step: "03",
    title: "Ouverture du compte",
    description:
      "Votre compte est ouvert sous 7 à 10 jours. Vous recevez votre carte VISA ou Mastercard professionnelle — sans besoin de vous déplacer.",
  },
];

export default function CompteBancairePage() {
  return (
    <main>
      <PageHeader
        title="Compte bancaire."
        subtitle="Ouverture d'un compte bancaire professionnel américain à distance."
      />

      <section className="py-[100px] lg:py-[140px] text-[#0e1e38]" style={{ background: "linear-gradient(160deg, #eef3f9 0%, #e8eef6 40%, #f2f6fb 100%)" }}>
        <div className="px-6 lg:px-10 max-w-4xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#0e1e38]/30 mb-5">
            Comment ça marche
          </p>
          <p className="text-[17px] leading-relaxed text-[#0e1e38]/55 mb-16 max-w-2xl">
            Nous vous assistons pour l&apos;ouverture d&apos;un compte bancaire
            professionnel américain associé à votre LLC, auprès de nos
            partenaires bancaires. Pas besoin de se déplacer.
          </p>

          <div className="space-y-6">
            {STEPS.map((step) => (
              <div
                key={step.step}
                className="flex gap-6 lg:gap-10 rounded-xl p-8"
                style={{
                  background: "rgba(255,255,255,0.72)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.88)",
                  boxShadow: "0 4px 20px rgba(80,120,180,0.07)",
                }}
              >
                <span
                  className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#2a5090]/15 flex-shrink-0 leading-none"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {step.step}
                </span>
                <div>
                  <h3
                    className="text-[20px] font-semibold mb-2 text-[#0e1e38]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#0e1e38]/55">
                    {step.description}
                  </p>
                </div>
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
            Ouvrez votre compte bancaire américain.
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
