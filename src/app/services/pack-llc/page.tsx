"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { ScrollTimeline } from "@/components/sections/ScrollTimeline";

const OFFER_DETAILS = [
  {
    title: "Accompagnement sur la durée",
    description:
      "De nombreux prestataires vous proposent de créer votre société puis n'assurent plus aucun suivi une fois cette tâche effectuée. Créer votre structure n'est pourtant pas une fin en soi, c'est même là que tout démarre.",
    bullets: [
      "Vos obligations fiscales (aux USA ET en France)",
      "Les futurs changements dans votre société (nom, statuts, capital, actionnaires)",
      "Répondre à vos questions (réponse par mail sous 48h)",
      "Nous restons votre interlocuteur pour tous ces points",
    ],
  },
  {
    title: "Création de votre LLC américaine",
    description:
      "Nous gérons pour vous de A à Z la création de votre LLC américaine en collaboration avec notre partenaire local agréé par le Secretary of State.",
    bullets: [
      "Liste exhaustive des documents légaux à constituer",
      "Modèles de documents fournis (un avocat facturerait plusieurs centaines de dollars)",
      "Suivi du dossier en vue d'immatriculer votre société sous 2 semaines",
      "Obtention de votre numéro EIN",
      "Société fonctionnelle et prête pour votre business",
    ],
  },
  {
    title: "Ouverture d'un compte bancaire",
    description:
      "Nous vous assistons pour l'ouverture d'un compte bancaire pour votre LLC auprès d'une banque partenaire où vous profiterez de conditions avantageuses négociées.",
    bullets: [
      "Liste exhaustive des documents à fournir",
      "Suivi du statut d'avancement du dossier bancaire",
      "Ouverture de votre compte sans besoin de se déplacer",
      "Votre carte VISA ou Mastercard",
      "Délai d'ouverture : 7 à 10 jours",
    ],
  },
];

export default function PackLLCPage() {
  return (
    <main>
      <PageHeader
        title="Créer une LLC américaine — notre offre en détail."
        subtitle="Une offre sans frais cachés. Nous gérons pour vous de A à Z la création de votre LLC américaine. Pas de frais cachés, tout est inclus."
      />

      {/* Offer details — light section */}
      <section className="bg-[#FAFAF9] text-[#002868] py-[120px] lg:py-[180px]">
        <div className="px-6 lg:px-10">
          <p className="text-[13px] uppercase tracking-[0.15em] text-[#002868]/40 mb-16">
            Ce qui est inclus
          </p>

          <div className="space-y-20">
            {OFFER_DETAILS.map((item) => (
              <div key={item.title} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
                <h3
                  className="text-[clamp(1.6rem,3vw,36px)] font-normal leading-tight tracking-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.title}
                </h3>
                <div>
                  <p className="text-[16px] leading-relaxed text-[#002868]/60 mb-6">
                    {item.description}
                  </p>
                  <ul className="space-y-3">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-[15px] text-[#002868]/70">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#FAFAF9] border border-[#002868]/20 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline steps — dark section with scroll animation */}
      <ScrollTimeline />

      {/* CTA */}
      <section className="bg-[#002868] text-[#FAFAF9] py-[120px] lg:py-[144px] border-t border-white/[0.06]">
        <div className="px-6 lg:px-10 max-w-2xl mx-auto text-center">
          <h2
            className="text-[clamp(2rem,4.5vw,48px)] leading-[1.1] font-normal tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            N&apos;hésitez pas à nous contacter pour toutes questions.
          </h2>
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
