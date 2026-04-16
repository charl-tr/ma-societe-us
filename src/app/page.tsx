"use client";

import { Hero } from "@/components/hero/Hero";
import { StatesMap } from "@/components/sections/StatesMap";

/* ─── Système de design unifié ─── */
const t = {
  bg:        "#0e0d0b",
  card:      "#131210",
  border:    "rgba(240,232,220,0.07)",
  // 3 niveaux seulement
  primary:   "#ede8e0",
  secondary: "rgba(240,232,220,0.45)",
  ghost:     "rgba(240,232,220,0.18)",
  // Boutons
  btnBg:     "#ede8e0",
  btnText:   "#0e0d0b",
  btnBorder: "rgba(240,232,220,0.12)",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.45em] mb-5 text-center"
       style={{ color: t.ghost, fontFamily: "var(--font-body)" }}>
      {children}
    </p>
  );
}

function Rule() {
  return <div className="mx-auto my-8 w-8 h-px" style={{ background: t.border }} />;
}

function H2({ children, align = "center" }: { children: React.ReactNode; align?: "center" | "left" }) {
  return (
    <h2
      className={`text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.1] ${align === "center" ? "text-center" : ""}`}
      style={{ fontFamily: "var(--font-heading)", fontWeight: 400, color: t.primary, letterSpacing: "-0.01em" }}
    >
      {children}
    </h2>
  );
}

function PrimaryBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center px-8 py-3.5 text-[11px] uppercase tracking-[0.18em] font-medium transition-opacity hover:opacity-75"
      style={{ background: t.btnBg, color: t.btnText }}
    >
      {children}
    </a>
  );
}

function GhostBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center px-7 py-3.5 text-[11px] uppercase tracking-[0.15em] transition-opacity hover:opacity-75"
      style={{ color: t.secondary, border: `1px solid ${t.btnBorder}` }}
    >
      {children}
    </a>
  );
}

export default function HomePage() {
  return (
    <main style={{ background: t.bg }}>
      <Hero />

      {/* ── Stats ── */}
      <section style={{ borderBottom: `1px solid ${t.border}` }}>
        <div className="px-6 lg:px-10 py-10 max-w-[1000px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[
              { val: "10+",  label: "années d'expertise" },
              { val: "500+", label: "sociétés créées" },
              { val: "11",   label: "professionnels" },
              { val: "4",    label: "états de juridiction" },
            ].map((s, i) => (
              <div
                key={s.label}
                className="text-center py-6"
                style={{ borderLeft: i > 0 ? `1px solid ${t.border}` : undefined }}
              >
                <div
                  className="text-[clamp(1.8rem,3vw,2.6rem)]"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 400, color: t.primary }}
                >
                  {s.val}
                </div>
                <div className="text-[11px] uppercase tracking-[0.12em] mt-2"
                     style={{ color: t.ghost, fontFamily: "var(--font-body)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-28 lg:py-36" style={{ borderBottom: `1px solid ${t.border}` }}>
        <div className="px-6 lg:px-10 max-w-[720px] mx-auto">
          <SectionLabel>Pourquoi nous choisir</SectionLabel>
          <H2>Créer une société aux USA.<br />Simple. Légal. Efficace.</H2>
          <Rule />
          <ul className="space-y-5 mt-2">
            {[
              "Les tâches administratives vous prennent tout votre temps.",
              "Vous étouffez sous une fiscalité qui pénalise votre activité.",
              "Vous aspirez au changement — mais ça paraît trop compliqué.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-5">
                <span className="mt-2.5 block w-5 h-px flex-shrink-0" style={{ background: t.border }} />
                <span className="text-[15px] leading-relaxed" style={{ color: t.secondary }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Tabous offshore ── */}
      <section className="py-28 lg:py-36" style={{ borderBottom: `1px solid ${t.border}` }}>
        <div className="px-6 lg:px-10 max-w-[720px] mx-auto">
          <H2>Levons certains tabous<br />sur les sociétés offshore.</H2>
          <Rule />
          <div className="space-y-3 mt-2">
            {[
              <>Détenir une société offshore tout en résidant dans un autre pays est <span style={{ color: t.primary }}>tout-à-fait légal</span>. De nombreuses confusions existent sur ce sujet.</>,
              <>Il est légal de détenir un compte ou une société à l&apos;étranger. Il est par contre <span style={{ color: t.primary }}>obligatoire de déclarer ces revenus</span> dans votre pays de résidence.</>,
            ].map((content, i) => (
              <div
                key={i}
                className="p-7 text-[15px] leading-relaxed"
                style={{ background: t.card, border: `1px solid ${t.border}`, color: t.secondary }}
              >
                {content}
              </div>
            ))}
          </div>
          <p className="mt-8 text-center">
            <a href="/creer-llc/faq"
               className="text-[11px] uppercase tracking-[0.2em] transition-opacity hover:opacity-100"
               style={{ color: t.ghost }}>
              Lire la FAQ →
            </a>
          </p>
        </div>
      </section>

      {/* ── Avantages ── */}
      <section className="py-28 lg:py-36" style={{ borderBottom: `1px solid ${t.border}` }}>
        <div className="px-6 lg:px-10 max-w-[860px] mx-auto">
          <SectionLabel>Les avantages</SectionLabel>
          <H2>Pourquoi la LLC américaine<br />change tout.</H2>
          <Rule />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
            {[
              "0 % d'imposition aux USA",
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
                className="p-5 text-center text-[13px] leading-snug"
                style={{ background: t.card, border: `1px solid ${t.border}`, color: t.secondary }}
              >
                {adv}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Notre offre ── */}
      <section className="py-28 lg:py-36" style={{ borderBottom: `1px solid ${t.border}` }}>
        <div className="px-6 lg:px-10 max-w-[960px] mx-auto">
          <SectionLabel>Notre offre</SectionLabel>
          <H2>Un package complet pour<br />votre société américaine.</H2>
          <Rule />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-2">
            {[
              { title: "Création de votre LLC",       desc: "Nous gérons de A à Z la création de votre LLC américaine avec notre partenaire local agréé par le Secretary of State." },
              { title: "Un véritable accompagnement", desc: "Nous serons à vos côtés tout au long du processus de création — et même après. Pas un formulaire en ligne, une relation." },
              { title: "Compte bancaire US",           desc: "Nous vous assistons à l'ouverture d'un compte bancaire avec carte de crédit professionnelle auprès de nos partenaires." },
            ].map((card) => (
              <div
                key={card.title}
                className="p-7"
                style={{ background: t.card, border: `1px solid ${t.border}` }}
              >
                <h3
                  className="text-[17px] mb-4"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 400, color: t.primary }}
                >
                  {card.title}
                </h3>
                <p className="text-[13px] leading-relaxed" style={{ color: t.secondary }}>{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <PrimaryBtn href="/services/pack-llc">Découvrir notre offre</PrimaryBtn>
          </div>
        </div>
      </section>

      {/* ── States Map ── */}
      <StatesMap />

      {/* ── Témoignage ── */}
      <section className="py-28 lg:py-36" style={{ borderBottom: `1px solid ${t.border}` }}>
        <div className="px-6 lg:px-10 max-w-[620px] mx-auto text-center">
          <SectionLabel>Témoignages</SectionLabel>
          <div className="mt-6 p-10" style={{ border: `1px solid ${t.border}` }}>
            <blockquote
              className="text-[20px] lg:text-[22px] leading-relaxed"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 400, color: t.secondary }}
            >
              &ldquo;Christophe et Mathieu ont été de très bons conseils et m&apos;ont permis de faire des économies significatives sur ma note fiscale.&rdquo;
            </blockquote>
            <div className="mt-8 w-6 h-px mx-auto" style={{ background: t.border }} />
            <p className="mt-6 text-[13px] uppercase tracking-[0.2em]" style={{ color: t.ghost }}>
              Antoine R. — Consultant IT · LLC au Nouveau-Mexique
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="py-32 lg:py-40">
        <div className="px-6 lg:px-10 max-w-[560px] mx-auto text-center">
          <H2>Parlons de<br />votre projet.</H2>
          <Rule />
          <p className="text-[15px] leading-relaxed mb-12" style={{ color: t.secondary }}>
            15 minutes pour découvrir comment optimiser
            votre structure juridique et fiscale.
          </p>
          <PrimaryBtn href="https://calendly.com/ypls/decouverte-site">
            Réserver un entretien
          </PrimaryBtn>
          <p className="mt-6 text-[10px] uppercase tracking-[0.2em]" style={{ color: t.ghost }}>
            Gratuit · Sans engagement
          </p>
        </div>
      </section>
    </main>
  );
}
