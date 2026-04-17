"use client";

import { PageHeader } from "@/components/layout/PageHeader";

export default function ConfidentialitePage() {
  return (
    <main>
      <PageHeader title="Politique de confidentialité." />

      <section className="text-[#0e1e38] py-[100px] lg:py-[140px]">
        <div className="px-6 lg:px-10 max-w-3xl mx-auto">
          <div className="space-y-10 text-[15px] leading-relaxed text-[#0e1e38]/55">
            <div>
              <h2
                className="text-[20px] font-normal text-[#0e1e38] mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Collecte des données
              </h2>
              <p>
                Nous collectons uniquement les données personnelles nécessaires à
                la fourniture de nos services : nom, prénom, adresse email,
                numéro de téléphone, et informations relatives à votre projet de
                création de société.
              </p>
            </div>

            <div>
              <h2
                className="text-[20px] font-normal text-[#0e1e38] mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Utilisation des données
              </h2>
              <p>
                Vos données sont utilisées exclusivement pour le traitement de
                votre dossier, la communication relative à nos services, et le
                respect de nos obligations légales et réglementaires.
              </p>
            </div>

            <div>
              <h2
                className="text-[20px] font-normal text-[#0e1e38] mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Protection des données
              </h2>
              <p>
                Nous mettons en place les mesures techniques et
                organisationnelles appropriées pour protéger vos données
                personnelles. Vos données ne sont jamais revendues à des tiers.
              </p>
            </div>

            <div>
              <h2
                className="text-[20px] font-normal text-[#0e1e38] mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Contact
              </h2>
              <p>
                Pour toute question relative à vos données personnelles,
                contactez-nous à contact@ma-societe-us.com.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
