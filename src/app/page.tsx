"use client";

import { Hero } from "@/components/hero/Hero";
import { StatesMap } from "@/components/sections/StatesMap";
import { CTASection } from "@/components/sections/CTASection";

/* ─── Warm NYC palette ─── */
const warm = {
  bg: "#131110",
  card: "#1a1816",
  cardBorder: "rgba(200,160,80,0.08)",
  gold: "#c8a050",
  goldMuted: "rgba(200,160,80,0.5)",
  text: "#f0e8dc",
  textMuted: "rgba(240,232,220,0.45)",
  textSoft: "rgba(240,232,220,0.65)",
  divider: "rgba(200,160,80,0.08)",
};

export default function HomePage() {
  return (
    <main className="bg-[#131110]">
      <Hero />

      {/* ═══ Stats bar ═══ */}
      <section className="border-y" style={{ borderColor: warm.divider }}>
        <div className="px-6 lg:px-10 py-6 max-w-[1100px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
            {[
              { val: "10+", label: "années d'expertise" },
              { val: "500+", label: "sociétés créées" },
              { val: "11", label: "professionnels" },
              { val: "4", label: "états de juridiction" },
            ].map((s, i) => (
              <div key={s.label} className={`text-center ${i > 0 ? "lg:border-l" : ""}`} style={{ borderColor: warm.divider }}>
                <div className="text-[clamp(1.5rem,3vw,2.2rem)] font-light text-[#c8a050]" style={{ fontFamily: "var(--font-heading)" }}>
                  {s.val}
                </div>
                <div className="text-[12px] text-[#f0e8dc]/30 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION : Intro ═══ */}
      <section className="py-20 lg:py-28">
        <div className="px-6 lg:px-10 max-w-[800px] mx-auto">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#c8a050]/50 mb-5">Pourquoi nous choisir</p>
          <h2
            className="text-[clamp(1.5rem,3.5vw,2.2rem)] leading-[1.15] text-[#f0e8dc] mb-6"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
          >
            Créer une société aux USA en quelques clics.
          </h2>
          <p className="text-[16px] leading-relaxed text-[#f0e8dc]/40 mb-4">
            Vous devriez songer à créer une société aux USA si…
          </p>
          <ul className="space-y-3 text-[15px] text-[#f0e8dc]/55 leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#c8a050]/40 flex-shrink-0" />
              Les tâches administratives vous prennent tout votre temps ?
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#c8a050]/40 flex-shrink-0" />
              Vous avez l&apos;impression d&apos;étouffer sous une fiscalité qui pénalise votre activité ?
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#c8a050]/40 flex-shrink-0" />
              Vous aspirez à du changement, mais cela paraît trop compliqué ?
            </li>
          </ul>
        </div>
      </section>

      {/* ═══ SECTION : Offshore ═══ */}
      <section className="py-20 lg:py-24 border-t" style={{ borderColor: warm.divider }}>
        <div className="px-6 lg:px-10 max-w-[800px] mx-auto">
          <h2
            className="text-[clamp(1.3rem,2.5vw,1.7rem)] text-center text-[#f0e8dc] mb-10"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
          >
            Levons certains tabous sur les sociétés dites &quot;offshore&quot;.
          </h2>
          <div className="space-y-4">
            {[
              <>Détenir une société offshore tout en résidant fiscalement dans un autre état est <strong className="text-[#c8a050]">tout-à-fait légal</strong>. De nombreuses confusions sont faites à ce sujet.</>,
              <>Il est parfaitement légal de détenir un compte ou une société à l&apos;étranger. Il est par contre <strong className="text-[#c8a050]">obligatoire de déclarer ces revenus</strong> dans votre pays de résidence.</>,
            ].map((content, i) => (
              <div
                key={i}
                className="rounded-lg p-6 text-[15px] leading-relaxed text-[#f0e8dc]/55"
                style={{
                  background: warm.card,
                  border: `1px solid ${warm.cardBorder}`,
                }}
              >
                {content}
              </div>
            ))}
          </div>
          <p className="text-center mt-8">
            <a href="/creer-llc/faq" className="text-[13px] text-[#c8a050]/50 hover:text-[#c8a050] transition-colors">
              Des questions ? Trouvez vos réponses ici →
            </a>
          </p>
        </div>
      </section>

      {/* ═══ SECTION : 9 Avantages ═══ */}
      <section className="py-20 lg:py-24 border-t" style={{ borderColor: warm.divider }}>
        <div className="px-6 lg:px-10 max-w-[900px] mx-auto">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#c8a050]/50 mb-4 text-center">Les avantages</p>
          <h2
            className="text-[clamp(1.3rem,2.5vw,1.7rem)] text-center text-[#f0e8dc] mb-12"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
          >
            Pourquoi la LLC américaine change tout.
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              "0 % d'imposition aux USA", "Souplesse comptable", "Pas de capital minimum",
              "Pas besoin de résider aux USA", "Rapidité de création", "Anonymat",
              "Pas besoin de se déplacer", "Une solution économique", "Responsabilité limitée",
            ].map((adv) => (
              <div
                key={adv}
                className="rounded-lg p-4 text-center text-[14px] text-[#f0e8dc]/50 transition-all duration-300 hover:text-[#f0e8dc]/70 hover:border-[#c8a050]/15"
                style={{
                  background: warm.card,
                  border: `1px solid ${warm.cardBorder}`,
                }}
              >
                {adv}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION : Notre offre ═══ */}
      <section className="py-20 lg:py-24 border-t" style={{ borderColor: warm.divider }}>
        <div className="px-6 lg:px-10 max-w-[1000px] mx-auto">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#c8a050]/50 mb-4 text-center">Notre offre</p>
          <h2
            className="text-[clamp(1.3rem,2.5vw,1.7rem)] text-center text-[#f0e8dc] mb-4"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
          >
            Un package complet pour votre société américaine.
          </h2>
          <p className="text-[15px] text-center text-[#f0e8dc]/35 mb-12 max-w-xl mx-auto">
            Transparent et sans surcoûts.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              { title: "Création de votre LLC", desc: "Nous gérons pour vous de A à Z la création de votre LLC américaine avec la collaboration de notre partenaire local agréé par le Secretary of State." },
              { title: "Un véritable accompagnement", desc: "En souscrivant à notre offre, vous bénéficierez d'un véritable accompagnement, nous serons à vos côtés tout au long du processus de création, et même après." },
              { title: "Compte bancaire US", desc: "Nous vous assistons à l'ouverture d'un compte bancaire associé à une carte de crédit professionnelle auprès de nos partenaires bancaires." },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-lg p-6 transition-all duration-300 hover:border-[#c8a050]/15"
                style={{
                  background: warm.card,
                  border: `1px solid ${warm.cardBorder}`,
                }}
              >
                <h3
                  className="text-[17px] text-[#f0e8dc] mb-3"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
                >
                  {card.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-[#f0e8dc]/40">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="/services/pack-llc"
              className="inline-flex items-center px-7 py-3.5 rounded text-[14px] uppercase tracking-[0.08em] font-medium text-[#131110] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(200,160,80,0.3)]"
              style={{ background: "linear-gradient(135deg, #c8a050, #d4b060)" }}
            >
              Découvrir notre offre →
            </a>
          </div>
        </div>
      </section>

      {/* ═══ SECTION : States Map ═══ */}
      <StatesMap />

      {/* ═══ SECTION : Avis clients ═══ */}
      <section className="py-20 lg:py-24 border-t" style={{ borderColor: warm.divider }}>
        <div className="px-6 lg:px-10 max-w-[700px] mx-auto">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#c8a050]/50 mb-4 text-center">Témoignages</p>
          <h2
            className="text-[clamp(1.3rem,2.5vw,1.7rem)] text-center text-[#f0e8dc] mb-10"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
          >
            Ils ont créé leur LLC avec nous.
          </h2>
          <div
            className="rounded-lg p-8 lg:p-10"
            style={{
              background: warm.card,
              border: `1px solid ${warm.cardBorder}`,
            }}
          >
            <blockquote
              className="text-[17px] leading-relaxed text-[#f0e8dc]/60 italic text-center"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
            >
              &laquo;&nbsp;Un grand merci à toute l&apos;équipe ! Christophe et Mathieu ont été de très bons conseils et m&apos;ont permis de faire des économies sur ma note fiscale. Je referai sans aucun doute appel à eux pour mes déclarations fiscales.&nbsp;&raquo;
            </blockquote>
            <p className="mt-6 text-center text-[14px] text-[#c8a050]">Antoine R.</p>
            <p className="text-center text-[12px] text-[#f0e8dc]/25 mt-1">Consultant IT · LLC au Nouveau-Mexique</p>
          </div>
        </div>
      </section>

      {/* ═══ SECTION : Contact CTA ═══ */}
      <section className="py-20 lg:py-28 border-t" style={{ borderColor: warm.divider }}>
        <div className="px-6 lg:px-10 max-w-[600px] mx-auto text-center">
          <h2
            className="text-[clamp(1.5rem,3vw,2rem)] text-[#f0e8dc] mb-4"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
          >
            Parlons de votre projet.
          </h2>
          <p className="text-[15px] text-[#f0e8dc]/35 mb-8">
            15 minutes pour découvrir comment optimiser votre structure juridique et fiscale.
          </p>
          <a
            href="https://calendly.com/ypls/decouverte-site"
            className="inline-flex items-center px-8 py-4 rounded text-[15px] uppercase tracking-[0.08em] font-medium text-[#131110] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(200,160,80,0.3)]"
            style={{ background: "linear-gradient(135deg, #c8a050, #d4b060)" }}
          >
            Réservez votre entretien →
          </a>
          <p className="mt-4 text-[12px] text-[#f0e8dc]/20">
            Gratuit · Sans engagement
          </p>
        </div>
      </section>
    </main>
  );
}
