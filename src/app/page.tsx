"use client";

import { Hero } from "@/components/hero/Hero";
import { StatesMap } from "@/components/sections/StatesMap";
import { CTASection } from "@/components/sections/CTASection";

/* Partners LLC DNA */
const C = {
  bg: "rgb(22, 24, 29)",
  bgLight: "rgb(30, 33, 39)",
  bgCard: "rgba(255,255,255,0.03)",
  text: "rgb(242, 242, 242)",
  muted: "rgba(242, 242, 242, 0.5)",
  dim: "rgba(242, 242, 242, 0.3)",
  accent: "rgb(52, 211, 153)",
  border: "rgba(255, 255, 255, 0.06)",
};

export default function HomePage() {
  return (
    <main style={{ background: C.bg, color: C.text }}>
      <Hero />

      {/* ═══ SECTION : Intro ═══ */}
      <section className="py-12 lg:py-16" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="px-5 lg:px-10 max-w-[900px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-[clamp(1.3rem,3vw,1.6rem)] font-bold leading-tight mb-4">
              Créer une société aux USA en quelques clics !
            </h2>
            <p className="text-[14px] leading-relaxed mb-2" style={{ color: C.muted }}>
              <strong style={{ color: C.text }}>Vous devriez songer à créer une société aux USA si…</strong>
            </p>
            <ul className="space-y-2 text-[14px]" style={{ color: C.muted }}>
              <li>Les tâches administratives vous prennent tout votre temps ?</li>
              <li>Vous avez l&apos;impression d&apos;étouffer sous une fiscalité qui pénalise votre activité ?</li>
              <li>Vous aspirez à du changement, mais cela paraît trop compliqué ?</li>
            </ul>
            <a
              href="/blog"
              className="inline-block mt-4 text-[14px] font-semibold underline underline-offset-4"
              style={{ color: C.accent }}
            >
              Créer une société aux USA est LA solution pour optimiser son business !
            </a>
          </div>
          <div className="flex justify-center">
            <div className="w-48 h-48 rounded-2xl flex items-center justify-center" style={{ background: C.bgCard, border: `1px solid ${C.border}` }}>
              <span className="text-[20px] font-extrabold tracking-wider" style={{ color: C.accent }}>MA SOCIÉTÉ US</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION : Préjugés offshore ═══ */}
      <section className="py-12 lg:py-16" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="px-5 lg:px-10 max-w-[900px] mx-auto">
          <h2 className="text-[clamp(1.2rem,2.5vw,1.5rem)] font-bold text-center mb-6">
            Levons certains tabous sur les sociétés dites &quot;offshore&quot;.
          </h2>
          <div className="space-y-4">
            <div className="rounded-xl p-5 text-[14px] leading-relaxed" style={{ border: `1px solid ${C.border}`, background: C.bgCard, color: C.muted }}>
              Une société offshore est une société ayant établi son siège social dans un pays étranger dans lequel elle n&apos;exerce pas d&apos;activité. Détenir une société offshore tout en résidant fiscalement dans un autre état est <strong style={{ color: C.text }}>tout-à-fait légal</strong>.
            </div>
            <div className="rounded-xl p-5 text-[14px] leading-relaxed" style={{ border: `1px solid rgba(52,211,153,0.15)`, background: "rgba(52,211,153,0.03)", color: C.muted }}>
              Il est parfaitement légal de détenir un compte ou une société à l&apos;étranger. Il est par contre <strong style={{ color: C.accent }}>illégal d&apos;omettre de déclarer ces revenus</strong> dans votre pays de résidence. Notre approche est légale et structurée.
            </div>
          </div>
          <p className="text-center mt-5">
            <a href="/creer-llc/faq" className="text-[13px] underline underline-offset-4" style={{ color: C.accent }}>
              Des questions ? Vous trouverez la plupart de vos réponses ici →
            </a>
          </p>
        </div>
      </section>

      {/* ═══ SECTION : 9 Avantages ═══ */}
      <section className="py-12 lg:py-16" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="px-5 lg:px-10 max-w-[1000px] mx-auto">
          <p className="text-[11px] uppercase tracking-[0.2em] text-center mb-2" style={{ color: C.accent }}>
            Avantages
          </p>
          <h2 className="text-[clamp(1.2rem,2.5vw,1.5rem)] font-bold text-center mb-8">
            Créer une société aux USA sous la forme d&apos;une LLC
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              "0% d'imposition aux USA",
              "Souplesse comptable",
              "Pas de capital minimum",
              "Pas besoin de résider aux USA",
              "Rapidité de création",
              "Anonymat",
              "Pas besoin de se déplacer",
              "Solution économique",
              "Responsabilité limitée",
            ].map((adv) => (
              <div
                key={adv}
                className="rounded-xl p-4 text-center"
                style={{ border: `1px solid ${C.border}`, background: C.bgCard }}
              >
                <span className="text-[13px] font-medium">{adv}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION : Notre offre ═══ */}
      <section className="py-12 lg:py-16" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="px-5 lg:px-10 max-w-[1000px] mx-auto">
          <p className="text-[11px] uppercase tracking-[0.2em] text-center mb-2" style={{ color: C.accent }}>
            Notre offre exclusive
          </p>
          <h2 className="text-[clamp(1.2rem,2.5vw,1.5rem)] font-bold text-center mb-3">
            Un package complet, transparent et sans surcoûts.
          </h2>
          <p className="text-[14px] text-center mb-8 max-w-xl mx-auto" style={{ color: C.muted }}>
            De nombreux sites proposent de créer votre société aux USA pour quelques centaines de dollars. Leurs offres sont rarement complètes car elles se limitent à l&apos;enregistrement, sans aucun suivi par la suite.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              { title: "Création de votre LLC américaine", desc: "Nous gérons pour vous de A à Z la création de votre LLC américaine avec la collaboration de notre partenaire local agréé par le Secretary of State." },
              { title: "Un véritable accompagnement", desc: "Nous serons à vos côtés tout au long du processus de création, et même après. Réponse sous 48h, suivi personnalisé." },
              { title: "Assistance compte bancaire", desc: "Nous vous assistons pour l'ouverture d'un compte bancaire associé à une carte de crédit professionnelle auprès de nos partenaires bancaires." },
            ].map((card) => (
              <div key={card.title} className="rounded-xl p-6" style={{ border: `1px solid ${C.border}`, background: C.bgCard }}>
                <h3 className="text-[15px] font-bold mb-3">{card.title}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: C.muted }}>{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <a href="/services/pack-llc" className="inline-flex items-center px-6 py-3 rounded-full text-[14px] font-semibold" style={{ background: C.accent, color: C.bg }}>
              Notre offre en détail →
            </a>
          </div>
        </div>
      </section>

      {/* ═══ SECTION : Pricing ═══ */}
      <section className="py-12 lg:py-16" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="px-5 lg:px-10 max-w-[900px] mx-auto">
          <h2 className="text-[clamp(1.2rem,2.5vw,1.5rem)] font-bold text-center mb-8">Nos offres</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-xl p-6 lg:p-8" style={{ border: `1px solid ${C.border}`, background: C.bgCard }}>
              <p className="text-[12px] uppercase tracking-wider font-bold mb-2" style={{ color: C.accent }}>Pack LLC USA — Tout inclus</p>
              <p className="text-[clamp(2rem,5vw,3rem)] font-extrabold mb-4">$997</p>
              <ul className="space-y-2 text-[13px] mb-6" style={{ color: C.muted }}>
                {["Rédaction de vos documents légaux", "Création de votre LLC sous 2 semaines", "Suivi intégral de votre dossier", "Obtention de votre numéro EIN", "Chargé d'affaires dédié (2 entretiens/an)", "Portail client sécurisé"].map(item => (
                  <li key={item} className="flex items-start gap-2"><span style={{ color: C.accent }}>✓</span> {item}</li>
                ))}
              </ul>
              <a href="https://calendly.com/ypls/decouverte-site" className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full text-[14px] font-semibold" style={{ border: `1px solid ${C.accent}`, color: C.accent }}>
                Commander →
              </a>
            </div>
            <div className="rounded-xl p-6 lg:p-8 relative overflow-hidden" style={{ border: `1px solid ${C.accent}40`, background: "rgba(52,211,153,0.04)" }}>
              <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-lg text-[11px] font-bold" style={{ background: C.accent, color: C.bg }}>Populaire</div>
              <p className="text-[12px] uppercase tracking-wider font-bold mb-2" style={{ color: C.accent }}>Pack Premium — LLC + Banque</p>
              <p className="text-[clamp(2rem,5vw,3rem)] font-extrabold mb-4">$1,597</p>
              <ul className="space-y-2 text-[13px] mb-6" style={{ color: C.muted }}>
                {["Tout le Pack LLC inclus", "Ouverture compte bancaire US", "Carte Visa ou Mastercard", "Compatible Stripe, PayPal, Amazon", "Aucun déplacement nécessaire"].map(item => (
                  <li key={item} className="flex items-start gap-2"><span style={{ color: C.accent }}>✓</span> {item}</li>
                ))}
              </ul>
              <a href="https://calendly.com/ypls/decouverte-site" className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full text-[14px] font-semibold" style={{ background: C.accent, color: C.bg }}>
                Commander →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION : Carte des états ═══ */}
      <StatesMap />

      {/* ═══ SECTION : Avis clients ═══ */}
      <section className="py-12 lg:py-16" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="px-5 lg:px-10 max-w-[900px] mx-auto">
          <h2 className="text-[clamp(1.2rem,2.5vw,1.5rem)] font-bold text-center mb-8">
            Créer une société aux USA avec MA-SOCIÉTÉ-US — Avis clients
          </h2>
          <div className="rounded-xl p-6 lg:p-8" style={{ border: `1px solid ${C.border}`, background: C.bgCard }}>
            <div className="flex gap-0.5 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-[16px] lg:text-[18px] leading-relaxed italic" style={{ color: "rgba(242,242,242,0.8)" }}>
              &laquo;&nbsp;Un grand merci à toute l&apos;équipe ! Christophe et Mathieu ont été de très bons conseils et m&apos;ont permis de faire des économies sur ma note fiscale. Je referai sans aucun doute appel à eux pour mes déclarations fiscales.&nbsp;&raquo;
            </blockquote>
            <p className="mt-4 text-[14px] font-medium">Antoine R.</p>
          </div>
        </div>
      </section>

      {/* ═══ SECTION : Formation gratuite ═══ */}
      <section className="py-12 lg:py-16" style={{ borderTop: `1px solid ${C.border}`, background: C.bgLight }}>
        <div className="px-5 lg:px-10 max-w-[700px] mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: C.accent }}>Formation gratuite</p>
          <h2 className="text-[clamp(1.2rem,2.5vw,1.5rem)] font-bold mb-3">
            Devenez incollable sur les LLC américaines
          </h2>
          <p className="text-[14px] mb-6" style={{ color: C.muted }}>
            7 modules pour comprendre la LLC, la fiscalité, et savoir si c&apos;est fait pour vous. 100% gratuit.
          </p>
          <a
            href="https://formations.ma-societe-us.com/formation-gratuite-llc-site"
            className="inline-flex items-center px-6 py-3 rounded-full text-[14px] font-semibold"
            style={{ background: C.accent, color: C.bg }}
          >
            Recevoir la formation gratuite →
          </a>
        </div>
      </section>

      {/* ═══ SECTION : Contact CTA ═══ */}
      <section className="py-12 lg:py-16" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="px-5 lg:px-10 max-w-[700px] mx-auto text-center">
          <h2 className="text-[clamp(1.3rem,3vw,1.7rem)] font-bold mb-4">
            N&apos;hésitez pas à nous contacter pour toutes questions !
          </h2>
          <p className="text-[14px] mb-6" style={{ color: C.muted }}>
            Profitez d&apos;un entretien découverte de 15 minutes pour découvrir notre offre et voir si elle est adaptée à votre activité.
          </p>
          <a
            href="https://calendly.com/ypls/decouverte-site"
            className="inline-flex items-center px-6 py-3 rounded-full text-[14px] font-semibold"
            style={{ background: C.accent, color: C.bg }}
          >
            Réservez votre entretien découverte →
          </a>
        </div>
      </section>
    </main>
  );
}
