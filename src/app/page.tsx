"use client";

import { Hero } from "@/components/hero/Hero";
import { StatesMap } from "@/components/sections/StatesMap";
import { CTASection } from "@/components/sections/CTASection";

/* Liquid Glass theme tokens */
const G = {
  card: "background:rgba(255,255,255,0.5);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.7)",
  chrome: "linear-gradient(90deg, rgba(180,190,210,0.15), rgba(255,255,255,0.8) 30%, rgba(200,210,225,0.4) 50%, rgba(255,255,255,0.8) 70%, rgba(180,190,210,0.15))",
};

export default function HomePage() {
  return (
    <main style={{ background: "#E8ECF2" }}>
      <Hero />

      {/* ═══ SECTION : Intro — exact copy from ma-societe-us.com ═══ */}
      <section className="py-16 lg:py-20">
        <div className="px-6 lg:px-10 max-w-[900px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              className="text-[clamp(1.3rem,3vw,1.7rem)] font-normal leading-tight tracking-tight text-[#1a2a40] mb-5"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Créer une société aux USA en quelques clics !
            </h2>
            <p className="text-[14px] font-medium text-[#1a2a40] mb-3">
              Vous devriez songer à créer une société aux USA si…
            </p>
            <ul className="space-y-2 text-[14px] text-[#1a2a40]/50">
              <li>Les tâches administratives vous prennent tout votre temps ?</li>
              <li>Vous avez l&apos;impression d&apos;étouffer sous une fiscalité qui pénalise votre activité ?</li>
              <li>Vous aspirez à du changement, mais cela paraît trop compliqué ?</li>
            </ul>
            <a href="/blog" className="inline-block mt-4 text-[14px] font-medium text-[#1a2a40]/60 hover:text-[#1a2a40] underline underline-offset-4 transition-colors">
              Créer une société aux USA est LA solution pour optimiser son business !
            </a>
          </div>
          <div className="flex justify-center">
            <div
              className="w-44 h-44 rounded-2xl flex items-center justify-center text-center"
              style={{ ...parseStyle(G.card) }}
            >
              <div>
                <div className="h-[2px] rounded-t-2xl -mt-[1px] -mx-[1px] mb-4" style={{ background: G.chrome }} />
                <span className="text-[15px] font-medium text-[#1a2a40]/70" style={{ fontFamily: "var(--font-heading)" }}>
                  MA SOCIÉTÉ US
                </span>
                <p className="text-[10px] text-[#1a2a40]/35 mt-1">Créez votre LLC en quelques clics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION : Offshore — exact copy ═══ */}
      <section className="py-16 lg:py-20" style={{ borderTop: "1px solid rgba(255,255,255,0.5)" }}>
        <div className="px-6 lg:px-10 max-w-[800px] mx-auto">
          <h2
            className="text-[clamp(1.2rem,2.5vw,1.5rem)] font-normal text-center text-[#1a2a40] mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Levons certains tabous sur les sociétés dites &quot;offshore&quot;.
          </h2>
          <div className="space-y-4">
            <div className="rounded-xl p-5 text-[14px] leading-relaxed text-[#1a2a40]/50" style={{ ...parseStyle(G.card) }}>
              <div className="h-[2px] -mt-5 -mx-5 mb-5 rounded-t-xl" style={{ background: G.chrome }} />
              Détenir une société offshore tout en résidant fiscalement dans un autre état est <strong className="text-[#1a2a40]">tout-à-fait légal</strong>. De nombreuses confusions sont faites à ce sujet.
            </div>
            <div className="rounded-xl p-5 text-[14px] leading-relaxed text-[#1a2a40]/50" style={{ ...parseStyle(G.card), borderColor: "rgba(140,170,210,0.2)" }}>
              <div className="h-[2px] -mt-5 -mx-5 mb-5 rounded-t-xl" style={{ background: G.chrome }} />
              Il est parfaitement légal de détenir un compte ou une société à l&apos;étranger. Il est par contre <strong className="text-[#1a2a40]">obligatoire de déclarer ces revenus</strong> dans votre pays de résidence.
            </div>
          </div>
          <p className="text-center mt-6">
            <a href="/creer-llc/faq" className="text-[12px] text-[#1a2a40]/40 hover:text-[#1a2a40] underline underline-offset-4 transition-colors">
              Des questions ? Vous y trouverez la plupart de vos réponses ici →
            </a>
          </p>
        </div>
      </section>

      {/* ═══ SECTION : 9 Avantages — exact copy ═══ */}
      <section className="py-16 lg:py-20" style={{ borderTop: "1px solid rgba(255,255,255,0.5)" }}>
        <div className="px-6 lg:px-10 max-w-[900px] mx-auto">
          <h2
            className="text-[clamp(1.2rem,2.5vw,1.5rem)] font-normal text-center text-[#1a2a40] mb-10"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Avantages à créer une société aux USA sous la forme d&apos;une LLC
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              "0 % d'imposition aux USA", "Souplesse comptable", "Pas de capital minimum",
              "Lieux de résidence", "Rapidité de création", "Anonymat",
              "Pas besoin de se déplacer", "Une solution économique", "Responsabilité limitée",
            ].map((adv) => (
              <div
                key={adv}
                className="rounded-xl p-4 text-center text-[13px] text-[#1a2a40]/60"
                style={{ ...parseStyle(G.card) }}
              >
                {adv}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION : Notre offre — exact copy ═══ */}
      <section className="py-16 lg:py-20" style={{ borderTop: "1px solid rgba(255,255,255,0.5)" }}>
        <div className="px-6 lg:px-10 max-w-[1000px] mx-auto">
          <h2
            className="text-[clamp(1.2rem,2.5vw,1.5rem)] font-normal text-center text-[#1a2a40] mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Notre offre exclusive pour créer une société aux USA
          </h2>
          <p className="text-[14px] text-center text-[#1a2a40]/40 mb-10 max-w-xl mx-auto">
            Un package complet, transparent et sans surcoûts.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              { title: "Création de votre LLC américaine", desc: "Nous gérons pour vous de A à Z la création de votre LLC américaine avec la collaboration de notre partenaire local agréé par le Secretary of State." },
              { title: "Un véritable accompagnement", desc: "En souscrivant à notre offre, vous bénéficierez d'un véritable accompagnement, nous serons à vos côtés tout au long du processus de création, et même après." },
              { title: "Assistance à la création d'un compte bancaire", desc: "Nous vous assistons à l'ouverture d'un compte bancaire associé à une carte de crédit professionnelle auprès de nos partenaires bancaires." },
            ].map((card) => (
              <div key={card.title} className="rounded-xl overflow-hidden" style={{ ...parseStyle(G.card) }}>
                <div className="h-[2px]" style={{ background: G.chrome }} />
                <div className="p-6">
                  <h3 className="text-[15px] font-medium text-[#1a2a40] mb-3" style={{ fontFamily: "var(--font-heading)" }}>{card.title}</h3>
                  <p className="text-[13px] leading-relaxed text-[#1a2a40]/45">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="/services/pack-llc"
              className="inline-flex items-center px-6 py-3 rounded-lg text-[14px] font-medium text-[#1a2a40] transition-all hover:shadow-[0_8px_24px_rgba(26,42,64,0.08)]"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.8)",
                backdropFilter: "blur(12px)",
              }}
            >
              Notre offre en détail →
            </a>
          </div>
        </div>
      </section>

      {/* ═══ SECTION : Avis clients — exact copy ═══ */}
      <section className="py-16 lg:py-20" style={{ borderTop: "1px solid rgba(255,255,255,0.5)" }}>
        <div className="px-6 lg:px-10 max-w-[700px] mx-auto">
          <h2
            className="text-[clamp(1.2rem,2.5vw,1.5rem)] font-normal text-center text-[#1a2a40] mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Avis clients
          </h2>
          <div className="rounded-xl overflow-hidden" style={{ ...parseStyle(G.card) }}>
            <div className="h-[2px]" style={{ background: G.chrome }} />
            <div className="p-8 text-center">
              <blockquote className="text-[16px] leading-relaxed text-[#1a2a40]/70 italic" style={{ fontFamily: "var(--font-heading)" }}>
                &laquo;&nbsp;Un grand merci à toute l&apos;équipe ! Christophe et Mathieu ont été de très bons conseils et m&apos;ont permis de faire des économies sur ma note fiscale. Je referai sans aucun doute appel à eux pour mes déclarations fiscales.&nbsp;&raquo;
              </blockquote>
              <p className="mt-4 text-[14px] font-medium text-[#1a2a40]">Antoine R.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION : Contact CTA — exact copy ═══ */}
      <section className="py-16 lg:py-20" style={{ borderTop: "1px solid rgba(255,255,255,0.5)" }}>
        <div className="px-6 lg:px-10 max-w-[600px] mx-auto text-center">
          <h2
            className="text-[clamp(1.2rem,2.5vw,1.5rem)] font-normal text-[#1a2a40] mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            N&apos;hésitez pas à nous contacter pour toutes questions !
          </h2>
          <p className="text-[14px] text-[#1a2a40]/40 mb-6">
            Profitez d&apos;un entretien découverte de 15 minutes pour découvrir notre offre.
          </p>
          <a
            href="https://calendly.com/ypls/decouverte-site"
            className="inline-flex items-center px-6 py-3 rounded-lg text-[14px] font-medium text-[#1a2a40] transition-all hover:shadow-[0_8px_24px_rgba(26,42,64,0.08)]"
            style={{
              background: "rgba(255,255,255,0.65)",
              border: "1px solid rgba(255,255,255,0.85)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 4px 16px rgba(26,42,64,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            Réservez votre entretien découverte →
          </a>
        </div>
      </section>
    </main>
  );
}

/* Helper to parse inline style string to object */
function parseStyle(str: string): React.CSSProperties {
  const obj: Record<string, string> = {};
  str.split(";").forEach(rule => {
    const [key, val] = rule.split(":").map(s => s.trim());
    if (key && val) {
      const camelKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      obj[camelKey] = val;
    }
  });
  return obj as React.CSSProperties;
}
