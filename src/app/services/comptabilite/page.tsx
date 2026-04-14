"use client";

import { PageHeader } from "@/components/layout/PageHeader";

const SERVICES = [
  {
    title: "Managed LLC",
    price: "À partir de $399/an",
    description:
      "Nous gérons les obligations annuelles de votre LLC : Annual Report, maintien du Registered Agent, et veille réglementaire.",
  },
  {
    title: "Tenue comptable",
    price: "Sur devis",
    description:
      "Tenue des livres comptables de votre LLC selon les normes américaines. Réconciliation bancaire, catégorisation des dépenses, et reporting mensuel.",
  },
  {
    title: "Déclarations fiscales",
    price: "Sur devis",
    description:
      "Préparation et dépôt de vos déclarations fiscales américaines (Form 5472, Form 1120, etc.) dans le respect des délais de l'IRS.",
  },
];

export default function ComptabilitePage() {
  return (
    <main>
      <PageHeader
        title="Comptabilité."
        subtitle="Gestion comptable et conformité de votre LLC américaine."
      />

      <section className="bg-[#FAFAF9] text-[#0F0E0D] py-[100px] lg:py-[140px]">
        <div className="px-6 lg:px-10 max-w-4xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#0F0E0D]/30 mb-5">
            Nos prestations comptables
          </p>
          <p className="text-[17px] leading-relaxed text-[#0F0E0D]/60 mb-16 max-w-2xl">
            Que vous soyez résident ou non-résident, nous assurons la conformité
            comptable et fiscale de votre société américaine auprès des autorités
            fédérales et étatiques.
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

      {/* CTA */}
      <section className="bg-[#EDF1F6] text-[#1a2a40] py-[100px] lg:py-[140px]">
        <div className="px-6 lg:px-10 max-w-2xl mx-auto text-center">
          <h2
            className="text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] font-normal tracking-[-0.02em] mb-10"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Besoin d&apos;un accompagnement comptable ?
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
