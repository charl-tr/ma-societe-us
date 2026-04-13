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

      <section className="bg-[#FAFAF9] text-[#0F0E0D] py-[100px] lg:py-[140px]">
        <div className="px-6 lg:px-10 max-w-4xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#0F0E0D]/30 mb-5">
            Comment ça marche
          </p>
          <p className="text-[17px] leading-relaxed text-[#0F0E0D]/60 mb-16 max-w-2xl">
            Nous vous assistons pour l&apos;ouverture d&apos;un compte bancaire
            professionnel américain associé à votre LLC, auprès de nos
            partenaires bancaires. Pas besoin de se déplacer.
          </p>

          <div className="space-y-8">
            {STEPS.map((step) => (
              <div
                key={step.step}
                className="flex gap-6 lg:gap-10"
              >
                <span
                  className="text-[clamp(2rem,4vw,3rem)] font-normal text-[#0F0E0D]/10 flex-shrink-0"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {step.step}
                </span>
                <div>
                  <h3
                    className="text-[20px] font-normal mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#0F0E0D]/55">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0F0E0D] text-[#FAFAF9] py-[100px] lg:py-[140px]">
        <div className="px-6 lg:px-10 max-w-2xl mx-auto text-center">
          <h2
            className="text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] font-normal tracking-[-0.02em] mb-10"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ouvrez votre compte bancaire américain.
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
