"use client";

import { PageHeader } from "@/components/layout/PageHeader";

export default function MentionsLegalesPage() {
  return (
    <main>
      <PageHeader title="Mentions légales." />

      <section className="bg-[#FAFAF9] text-[#0F0E0D] py-[100px] lg:py-[140px]">
        <div className="px-6 lg:px-10 max-w-3xl mx-auto prose-sm">
          <div className="space-y-10 text-[15px] leading-relaxed text-[#0F0E0D]/60">
            <div>
              <h2
                className="text-[20px] font-normal text-[#0F0E0D] mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Éditeur du site
              </h2>
              <p>
                MA SOCIETE US est une marque déposée de Yes Please LLC.
                <br />
                120 Madeira Drive NE STE 220, 87108 Albuquerque, New Mexico, USA
                <br />
                Email : contact@ma-societe-us.com
                <br />
                Téléphone : +1 (302) 555-0147
              </p>
            </div>

            <div>
              <h2
                className="text-[20px] font-normal text-[#0F0E0D] mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Hébergement
              </h2>
              <p>
                Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133,
                Covina, CA 91723, États-Unis.
              </p>
            </div>

            <div>
              <h2
                className="text-[20px] font-normal text-[#0F0E0D] mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Profession réglementée
              </h2>
              <p>
                Les services comptables et juridiques proposés sont soumis à la
                réglementation en vigueur aux États-Unis. Profession comptable et
                juridique réglementée.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
