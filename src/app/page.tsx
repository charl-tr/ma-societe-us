"use client";

import { Hero } from "@/components/hero/Hero";
import { StatesMap } from "@/components/sections/StatesMap";

const d = {
  bg: "#0e0d0b",
  card: "#141210",
  border: "rgba(240,232,220,0.06)",
  text: "#f0e8dc",
  muted: "rgba(240,232,220,0.40)",
  soft: "rgba(240,232,220,0.22)",
  ghost: "rgba(240,232,220,0.10)",
  cta: "linear-gradient(135deg, #b89550, #c8a456)",
};

export default function HomePage() {
  return (
    <main style={{ background: d.bg }}>
      <Hero />

      {/* ═══ Stats bar ═══ */}
      <section className="border-y" style={{ borderColor: d.border }}>
        <div className="px-6 lg:px-10 py-8 max-w-[1100px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
            {[
              { val: "10+", label: "années d'expertise" },
              { val: "500+", label: "sociétés créées" },
              { val: "11", label: "professionnels" },
              { val: "4", label: "états de juridiction" },
            ].map((s, i) => (
              <div key={s.label} className={`text-center ${i > 0 ? "lg:border-l" : ""}`} style={{ borderColor: d.border }}>
                <div
                  className="text-[clamp(1.6rem,3vw,2.4rem)] text-[#f0e8dc]/85"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 300 }}
                >
                  {s.val}
                </div>
                <div className="text-[11px] uppercase tracking-[0.12em] mt-1.5" style={{ color: d.soft }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION : Intro ═══ */}
      <section className="py-24 lg:py-32">
        <div className="px-6 lg:px-10 max-w-[780px] mx-auto">
          <p className="text-[10px] uppercase tracking-[0.35em] mb-6" style={{ color: d.soft }}>
            Pourquoi nous choisir
          </p>
          <h2
            className="text-[clamp(1.6rem,3.5vw,2.4rem)] leading-[1.15] mb-8"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 300, color: d.text }}
          >
            Créer une société aux USA<br />en quelques semaines.
          </h2>
          <p className="text-[15px] leading-relaxed mb-5" style={{ color: d.muted }}>
            Vous devriez songer à créer une société aux USA si…
          </p>
          <ul className="space-y-4 text-[15px] leading-relaxed" style={{ color: d.muted }}>
            {[
              "Les tâches administratives vous prennent tout votre temps.",
              "Vous avez l'impression d'étouffer sous une fiscalité qui pénalise votre activité.",
              "Vous aspirez à du changement, mais cela paraît trop compliqué.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-4">
                <span className="mt-2.5 block w-4 h-px flex-shrink-0" style={{ background: d.soft }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ SECTION : Offshore ═══ */}
      <section className="py-20 lg:py-24 border-t" style={{ borderColor: d.border }}>
        <div className="px-6 lg:px-10 max-w-[780px] mx-auto">
          <h2
            className="text-[clamp(1.4rem,2.5vw,1.9rem)] text-center mb-10"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 300, color: d.text }}
          >
            Levons certains tabous sur les sociétés dites &quot;offshore&quot;.
          </h2>
          <div className="space-y-3">
            {[
              <>Détenir une société offshore tout en résidant fiscalement dans un autre état est <strong className="text-[#f0e8dc]/90 font-normal">tout-à-fait légal</strong>. De nombreuses confusions sont faites à ce sujet.</>,
              <>Il est parfaitement légal de détenir un compte ou une société à l&apos;étranger. Il est par contre <strong className="text-[#f0e8dc]/90 font-normal">obligatoire de déclarer ces revenus</strong> dans votre pays de résidence.</>,
            ].map((content, i) => (
              <div
                key={i}
                className="p-6 lg:p-7 text-[15px] leading-relaxed"
                style={{ background: d.card, border: `1px solid ${d.border}`, color: d.muted }}
              >
                {content}
              </div>
            ))}
          </div>
          <p className="text-center mt-8">
            <a href="/creer-llc/faq" className="text-[12px] uppercase tracking-[0.12em] transition-colors duration-300" style={{ color: d.soft }}>
              Des questions ? Lire la FAQ →
            </a>
          </p>
        </div>
      </section>

      {/* ═══ SECTION : 9 Avantages ═══ */}
      <section className="py-20 lg:py-24 border-t" style={{ borderColor: d.border }}>
        <div className="px-6 lg:px-10 max-w-[900px] mx-auto">
          <p className="text-[10px] uppercase tracking-[0.35em] mb-4 text-center" style={{ color: d.soft }}>
            Les avantages
          </p>
          <h2
            className="text-[clamp(1.4rem,2.5vw,1.9rem)] text-center mb-12"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 300, color: d.text }}
          >
            Pourquoi la LLC américaine change tout.
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              "0 % d'imposition aux USA", "Souplesse comptable", "Pas de capital minimum",
              "Pas besoin de résider aux USA", "Rapidité de création", "Anonymat",
              "Pas besoin de se déplacer", "Une solution économique", "Responsabilité limitée",
            ].map((adv) => (
              <div
                key={adv}
                className="p-4 text-center text-[13px] transition-all duration-300"
                style={{ background: d.card, border: `1px solid ${d.border}`, color: d.muted }}
              >
                {adv}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION : Notre offre ═══ */}
      <section className="py-20 lg:py-24 border-t" style={{ borderColor: d.border }}>
        <div className="px-6 lg:px-10 max-w-[1000px] mx-auto">
          <p className="text-[10px] uppercase tracking-[0.35em] mb-4 text-center" style={{ color: d.soft }}>
            Notre offre
          </p>
          <h2
            className="text-[clamp(1.4rem,2.5vw,1.9rem)] text-center mb-3"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 300, color: d.text }}
          >
            Un package complet pour votre société américaine.
          </h2>
          <p className="text-[14px] text-center mb-12 max-w-xl mx-auto" style={{ color: d.soft }}>
            Transparent et sans surcoûts.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {[
              { title: "Création de votre LLC", desc: "Nous gérons pour vous de A à Z la création de votre LLC américaine avec la collaboration de notre partenaire local agréé par le Secretary of State." },
              { title: "Un véritable accompagnement", desc: "En souscrivant à notre offre, vous bénéficierez d'un véritable accompagnement, nous serons à vos côtés tout au long du processus de création, et même après." },
              { title: "Compte bancaire US", desc: "Nous vous assistons à l'ouverture d'un compte bancaire associé à une carte de crédit professionnelle auprès de nos partenaires bancaires." },
            ].map((card) => (
              <div
                key={card.title}
                className="p-6 lg:p-7"
                style={{ background: d.card, border: `1px solid ${d.border}` }}
              >
                <h3
                  className="text-[16px] mb-3"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 400, color: d.text }}
                >
                  {card.title}
                </h3>
                <p className="text-[13px] leading-relaxed" style={{ color: d.muted }}>{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="/services/pack-llc"
              className="inline-flex items-center px-7 py-3.5 text-[12px] uppercase tracking-[0.1em] font-medium text-[#0e0d0b] transition-all duration-300 hover:opacity-90"
              style={{ background: d.cta }}
            >
              Découvrir notre offre →
            </a>
          </div>
        </div>
      </section>

      {/* ═══ SECTION : States Map ═══ */}
      <StatesMap />

      {/* ═══ SECTION : Avis clients ═══ */}
      <section className="py-20 lg:py-24 border-t" style={{ borderColor: d.border }}>
        <div className="px-6 lg:px-10 max-w-[680px] mx-auto">
          <p className="text-[10px] uppercase tracking-[0.35em] mb-4 text-center" style={{ color: d.soft }}>
            Témoignages
          </p>
          <h2
            className="text-[clamp(1.4rem,2.5vw,1.9rem)] text-center mb-10"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 300, color: d.text }}
          >
            Ils ont créé leur LLC avec nous.
          </h2>
          <div className="p-8 lg:p-10" style={{ background: d.card, border: `1px solid ${d.border}` }}>
            <blockquote
              className="text-[17px] leading-relaxed text-center italic"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 300, color: d.muted }}
            >
              &laquo;&nbsp;Un grand merci à toute l&apos;équipe ! Christophe et Mathieu ont été de très bons conseils et m&apos;ont permis de faire des économies sur ma note fiscale. Je referai sans aucun doute appel à eux pour mes déclarations fiscales.&nbsp;&raquo;
            </blockquote>
            <p className="mt-6 text-center text-[13px]" style={{ color: "rgba(240,232,220,0.6)" }}>Antoine R.</p>
            <p className="text-center text-[11px] mt-1" style={{ color: d.soft }}>Consultant IT · LLC au Nouveau-Mexique</p>
          </div>
        </div>
      </section>

      {/* ═══ SECTION : Contact CTA ═══ */}
      <section className="py-24 lg:py-32 border-t" style={{ borderColor: d.border }}>
        <div className="px-6 lg:px-10 max-w-[560px] mx-auto text-center">
          <h2
            className="text-[clamp(1.7rem,3.5vw,2.4rem)] mb-4"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 300, color: d.text }}
          >
            Parlons de votre projet.
          </h2>
          <p className="text-[15px] leading-relaxed mb-10" style={{ color: d.muted }}>
            15 minutes pour découvrir comment optimiser votre structure juridique et fiscale.
          </p>
          <a
            href="https://calendly.com/ypls/decouverte-site"
            className="inline-flex items-center px-9 py-4 text-[12px] uppercase tracking-[0.12em] font-medium text-[#0e0d0b] transition-all duration-300 hover:opacity-90"
            style={{ background: d.cta }}
          >
            Réservez votre entretien
          </a>
          <p className="mt-5 text-[11px] uppercase tracking-[0.12em]" style={{ color: d.ghost }}>
            Gratuit · Sans engagement
          </p>
        </div>
      </section>
    </main>
  );
}
