"use client";

import { PageHeader } from "@/components/layout/PageHeader";

export default function CGVPage() {
  return (
    <main>
      <PageHeader title="Conditions générales de vente." />

      <section className="bg-[#FAFAF9] text-[#0F0E0D] py-[100px] lg:py-[140px]">
        <div className="px-6 lg:px-10 max-w-3xl mx-auto">
          <div className="space-y-10 text-[15px] leading-relaxed text-[#0F0E0D]/60">
            <div>
              <h2
                className="text-[20px] font-normal text-[#0F0E0D] mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Objet
              </h2>
              <p>
                Les présentes conditions générales de vente régissent les
                relations contractuelles entre Yes Please LLC, opérant sous la
                marque MA SOCIETE US, et ses clients dans le cadre de la
                fourniture de services de création et de gestion de sociétés
                américaines.
              </p>
            </div>

            <div>
              <h2
                className="text-[20px] font-normal text-[#0F0E0D] mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Services
              </h2>
              <p>
                Les services proposés comprennent la création de LLC, la gestion
                comptable, l&apos;optimisation fiscale, et l&apos;assistance à
                l&apos;ouverture de comptes bancaires, tels que décrits sur le
                site et dans nos devis personnalisés.
              </p>
            </div>

            <div>
              <h2
                className="text-[20px] font-normal text-[#0F0E0D] mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Tarifs et paiement
              </h2>
              <p>
                Les tarifs en vigueur sont indiqués sur la page tarifs du site.
                Le paiement est dû à la commande. Les prix sont indiqués en
                dollars américains (USD), hors taxes applicables.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
