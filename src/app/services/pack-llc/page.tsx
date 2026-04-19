"use client";

import { PageHeader } from "@/components/layout/PageHeader";

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
      <section className="py-[120px] lg:py-[180px] text-[#0e1e38]" style={{ background: "linear-gradient(160deg, #eef3f9 0%, #e8eef6 40%, #f2f6fb 100%)" }}>
        <div className="px-6 lg:px-10 max-w-[1200px] mx-auto">
          <p className="text-[13px] uppercase tracking-[0.15em] text-[#0e1e38]/35 mb-16">
            Ce qui est inclus
          </p>

          <div className="space-y-16">
            {OFFER_DETAILS.map((item) => (
              <div
                key={item.title}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 rounded-2xl p-8 lg:p-10"
                style={{
                  background: "rgba(255,255,255,0.72)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.88)",
                  boxShadow: "0 4px 24px rgba(80,120,180,0.07)",
                }}
              >
                <h3
                  className="text-[clamp(1.6rem,3vw,36px)] font-semibold leading-tight tracking-[-0.02em] text-[#0e1e38]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.title}
                </h3>
                <div>
                  <p className="text-[16px] leading-relaxed text-[#0e1e38]/55 mb-6">
                    {item.description}
                  </p>
                  <ul className="space-y-3">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-[15px] text-[#0e1e38]/65">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2a5090] flex-shrink-0" />
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

      {/* CTA */}
      <section className="py-[120px] lg:py-[144px] border-t border-[#0e1e38]/[0.06]" style={{ background: "linear-gradient(160deg, #eef3f9 0%, #e4ecf6 40%, #f2f6fb 100%)" }}>
        <div className="px-6 lg:px-10 max-w-2xl mx-auto text-center">
          <h2
            className="text-[clamp(2rem,4.5vw,48px)] leading-[1.1] font-semibold tracking-[-0.025em] text-[#0e1e38]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            N&apos;hésitez pas à nous contacter pour toutes questions.
          </h2>
          <div className="mt-10">
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
        </div>
      </section>
    </main>
  );
}
