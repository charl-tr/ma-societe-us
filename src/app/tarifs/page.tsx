"use client";

import { PageHeader } from "@/components/layout/PageHeader";

const SERVICES_DOCS = [
  {
    title: "Rédaction de l'Operating Agreement",
    description:
      "L'objectif du pacte d'associé est de régir les opérations internes de l'entreprise de manière à répondre aux besoins spécifiques des associés de la société.",
    price: "A partir de $600",
    note: "selon complexité",
  },
  {
    title: "Préparation et dépôt de l'Annual Report",
    description: "Préparation et dépôt de l'Annual Report de votre LLC.",
    price: "A partir de $299",
    note: "selon complexité et l'État américain",
  },
  {
    title: "Rédaction du Banking Member Resolution",
    description:
      "Accorder les pouvoirs à certains associés autorisés à effectuer les formalités vis-à-vis des banques et d'emporter responsabilité.",
    price: "A partir de $135",
    note: "selon le nombre de banques",
  },
  {
    title: "Obtention du Certificate of Good Standing",
    description:
      "Document émis par l'administration américaine attestant qu'une société est dûment enregistrée auprès de l'État.",
    price: "A partir de $100",
    note: "selon l'État américain",
  },
];

const SERVICES_FISCAL = [
  {
    title: "Identifier les dépenses déductibles",
    description:
      "Identifier les dépenses déductibles au sein d'une comptabilité existante afin d'abaisser considérablement le résultat fiscal.",
    price: "A partir de $400",
    note: "sur devis et selon complexité",
  },
  {
    title: "Recherche de déductibilités en cours d'exercice",
    description:
      "Recherche de déductibilités en cours d'exercice pour baisser la note fiscale prévisionnelle.",
    price: "A partir de $800",
    note: "selon complexité",
  },
];

const SERVICES_OTHER = [
  {
    title: "Gestion pilotée LLC",
    description: "Pour une durée d'un an.",
    price: "$399",
  },
  {
    title: "Dissolution de LLC US",
    description: "Prestation « tout inclus ».",
    price: "A partir de $699",
    note: "sur devis et selon l'État US",
  },
  {
    title: "Cession de parts et modifications capitalistiques",
    description:
      "Notre équipe de juristes vous accompagne pour toute modification sur le plan capitalistique de votre entité américaine.",
    price: "A partir de $1.100",
    note: "sur devis et selon complexité",
  },
  {
    title: "Rédaction des CGV / CGU / PC (conformité RGPD)",
    description:
      "Nous nous chargeons de la rédaction de ces documents indispensables pour un entrepreneur souhaitant lancer son activité.",
    price: "Environ $1.200",
  },
];

function PricingGroup({
  label,
  items,
}: {
  label: string;
  items: { title: string; description: string; price: string; note?: string }[];
}) {
  return (
    <div className="mb-20">
      <p className="text-[13px] uppercase tracking-[0.15em] text-[#002868]/40 mb-8">
        {label}
      </p>
      <div className="divide-y divide-[#002868]/[0.06]">
        {items.map((item) => (
          <div
            key={item.title}
            className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 py-8 group hover:bg-[#002868]/[0.02] -mx-4 px-4 transition-colors duration-300 rounded"
          >
            <div className="lg:col-span-4">
              <h3
                className="text-[18px] font-normal text-[#002868]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {item.title}
              </h3>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[15px] text-[#002868]/50 leading-relaxed">
                {item.description}
              </p>
            </div>
            <div className="lg:col-span-3 lg:text-right">
              <span
                className="text-[18px] font-normal text-[#002868]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {item.price}
              </span>
              {item.note && (
                <span className="block text-[12px] text-[#002868]/30 mt-1">
                  {item.note}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TarifsPage() {
  return (
    <main>
      <PageHeader
        title="Monter une société aux États-Unis — les tarifs."
        subtitle="Tout l'univers de la LLC au travers de nos prestations additionnelles. Des tarifs transparents, sans surprise."
      />

      <section className="bg-[#FAFAF9] text-[#002868] py-[120px] lg:py-[180px]">
        <div className="px-6 lg:px-10">
          <PricingGroup label="Rédaction et obtention de documents" items={SERVICES_DOCS} />
          <PricingGroup label="Optimisation fiscale" items={SERVICES_FISCAL} />
          <PricingGroup label="Autres prestations" items={SERVICES_OTHER} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#002868] text-[#FAFAF9] py-[120px] lg:py-[144px]">
        <div className="px-6 lg:px-10 max-w-2xl mx-auto text-center">
          <h2
            className="text-[clamp(2rem,4.5vw,48px)] leading-[1.1] font-normal tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Un projet ? Parlons-en.
          </h2>
          <p className="mt-6 text-[17px] text-[#FAFAF9]/50 leading-relaxed">
            Réservez votre entretien découverte gratuit de 15 minutes.
          </p>
          <div className="mt-10">
            <a href="/contact" className="inline-flex items-center bg-[#FAFAF9] text-[#002868] px-8 py-4 rounded-full text-[15px] font-medium hover:bg-[#F2F1F0] transition-colors">
              Réservez votre entretien découverte
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
