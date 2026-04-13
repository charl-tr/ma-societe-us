"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Services } from "@/components/sections/Services";
import { StatesMap } from "@/components/sections/StatesMap";

export default function CreerLLCPage() {
  return (
    <main>
      <PageHeader
        title="Créer une LLC aux États-Unis."
        subtitle="Nous vous accompagnons dans le choix de la juridiction et la création de votre société américaine — de A à Z."
      />

      {/* Intro + Avantages */}
      <Services />

      {/* Transition text */}
      <section className="bg-[#002868] text-[#FAFAF9] py-[80px] lg:py-[100px] border-t border-white/[0.06]">
        <div className="px-6 lg:px-10 max-w-3xl mx-auto text-center">
          <p className="text-[17px] lg:text-[19px] leading-relaxed text-[#FAFAF9]/50">
            Le choix de l&apos;état d&apos;immatriculation est déterminant pour votre
            structure. Fiscalité, anonymat, rapidité de création — chaque
            juridiction présente des avantages spécifiques. Nous vous guidons
            vers le choix le plus adapté à votre situation.
          </p>
        </div>
      </section>

      {/* Interactive states map */}
      <StatesMap />

      {/* CTA */}
      <section className="bg-[#002868] text-[#FAFAF9] py-[100px] lg:py-[140px] border-t border-white/[0.06]">
        <div className="px-6 lg:px-10 max-w-2xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#FAFAF9]/25 mb-5">
            Prêt à vous lancer ?
          </p>
          <h2
            className="text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] font-normal tracking-[-0.02em] mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Créer votre LLC en toute sérénité.
          </h2>
          <p className="text-[17px] text-[#FAFAF9]/45 mb-10 leading-relaxed">
            Réservez un entretien découverte de 15 minutes. Nous évaluons votre situation
            et vous orientons vers la meilleure juridiction — sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center bg-[#FAFAF9] text-[#002868] px-8 py-4 rounded-full text-[15px] font-medium hover:bg-[#F2F1F0] transition-colors"
            >
              Réservez votre entretien découverte
            </a>
            <a
              href="/services/pack-llc"
              className="inline-flex items-center text-[#FAFAF9]/50 hover:text-[#FAFAF9] px-6 py-4 text-[15px] transition-colors"
            >
              Voir notre offre
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
