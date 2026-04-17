"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Icons ─── */
function IconLLC() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
    </svg>
  );
}
function IconCompta() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
function IconFisca() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  );
}
function IconBank() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

/* ─── How we work ─── */
const HOW = [
  {
    n: "01",
    title: "Un seul interlocuteur",
    body: "Christophe et son équipe suivent votre dossier de A à Z — création, comptabilité, fiscalité. Pas de transfert, pas de perte d'information.",
  },
  {
    n: "02",
    title: "100% à distance",
    body: "Tout se fait en ligne. Signature électronique, documents numérisés, communication par mail et visio. Vous n'avez rien à imprimer.",
  },
  {
    n: "03",
    title: "Suivi post-création inclus",
    body: "On répond à vos questions sous 48h après la création. Annual Report, modifications statutaires, déclarations — on reste là.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <PageHeader
        title="Ce qu'on fait pour vous."
        subtitle="Création de LLC, comptabilité américaine, optimisation fiscale — un seul cabinet franco-américain depuis 2014."
      />

      {/* ─── Services — flagship + 3 glass cards ─── */}
      <section
        className="py-[80px] lg:py-[120px]"
        style={{ background: "linear-gradient(160deg, #eef3f9 0%, #e8eef6 50%, #f2f6fb 100%)" }}
      >
        <div className="px-6 lg:px-10 max-w-[1200px] mx-auto">

          {/* Section label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            viewport={{ once: true }}
            className="text-[11px] uppercase tracking-[0.28em] text-[#0e1e38]/25 mb-10"
          >
            Nos prestations
          </motion.p>

          {/* Flagship card — Pack LLC (dark anchor) */}
          <motion.a
            href="/services/pack-llc"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            viewport={{ once: true, margin: "-40px" }}
            className="group relative block rounded-2xl overflow-hidden mb-4 transition-all duration-500"
            style={{
              background: "linear-gradient(140deg, #0d1e38 0%, #1a3060 55%, #0f2040 100%)",
            }}
          >
            {/* Chrome top */}
            <div
              className="h-[1px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(100,150,220,0.4) 25%, rgba(160,200,255,0.75) 50%, rgba(100,150,220,0.4) 75%, transparent)",
              }}
            />
            {/* Inner glow */}
            <div
              className="absolute pointer-events-none"
              style={{
                inset: 0,
                background:
                  "radial-gradient(ellipse 70% 60% at 30% 40%, rgba(74,127,212,0.12) 0%, transparent 70%)",
              }}
            />

            <div className="relative px-8 py-8 lg:px-12 lg:py-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 mb-6">
                  <div
                    className="flex items-center justify-center w-9 h-9 rounded-xl text-white/70"
                    style={{
                      background: "rgba(74,127,212,0.18)",
                      border: "1px solid rgba(74,127,212,0.25)",
                    }}
                  >
                    <IconLLC />
                  </div>
                  <span
                    className="text-[10px] uppercase tracking-[0.28em] font-semibold px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(74,127,212,0.15)",
                      border: "1px solid rgba(74,127,212,0.22)",
                      color: "#7ab4e8",
                    }}
                  >
                    Offre phare
                  </span>
                </div>

                <h2
                  className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold tracking-[-0.025em] leading-[1.1] text-white mb-3"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Pack LLC — création complète
                </h2>
                <p className="text-[15px] leading-relaxed text-white/45 max-w-xl">
                  LLC créée, numéro EIN obtenu, compte Mercury ouvert, carte VISA en main.
                  Zéro déplacement — on gère de A à Z depuis les USA en{" "}
                  <span className="text-white/70 font-medium">14 jours</span>.
                </p>

                {/* Includes list */}
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {["Registered Agent inclus", "Documents légaux fournis", "Obtention EIN", "Ouverture compte bancaire"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[12px] text-white/40">
                      <span className="w-1 h-1 rounded-full bg-[#4a80b8] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price + CTA */}
              <div className="flex flex-col items-start lg:items-end gap-4 shrink-0">
                <div className="lg:text-right">
                  <p className="text-[11px] text-white/25 uppercase tracking-[0.2em] mb-0.5">À partir de</p>
                  <p
                    className="text-[clamp(1.8rem,3vw,2.6rem)] font-bold text-white leading-none tracking-[-0.03em]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    $1&nbsp;990
                  </p>
                  <p className="text-[11px] text-white/25 mt-1">tout inclus · sans frais cachés</p>
                </div>
                <span
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold text-white group-hover:gap-3 transition-all"
                  style={{
                    background: "linear-gradient(135deg, #2a5090, #3a6ab8)",
                    boxShadow: "0 4px 20px rgba(42,80,144,0.40)",
                  }}
                >
                  Découvrir le pack
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </motion.a>

          {/* 3 glass service cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              {
                icon: <IconFisca />,
                label: "Fiscalité",
                title: "Optimisation fiscale",
                body: "Identification des déductions, stratégie fiscale personnalisée. Imposition pouvant aller jusqu'à 0% — légal, conforme OCDE.",
                price: "À partir de $400",
                href: "/services/fiscalite",
                cta: "En savoir plus",
              },
              {
                icon: <IconCompta />,
                label: "Comptabilité",
                title: "Gestion comptable & conformité",
                body: "Tenue des livres, déclarations fédérales (Form 5472, 1120), Annual Report. On reste en conformité pour vous.",
                price: "À partir de $399 /an",
                href: "/services/comptabilite",
                cta: "En savoir plus",
              },
              {
                icon: <IconBank />,
                label: "Compte bancaire",
                title: "Compte bancaire américain",
                body: "Ouverture chez notre partenaire en 7–10 jours. Carte VISA professionnelle. Sans se déplacer, sans visa.",
                price: "Inclus dans le Pack",
                href: "/services/compte-bancaire",
                cta: "En savoir plus",
                priceIsIncluded: true,
              },
            ].map((s) => (
              <motion.a
                key={s.title}
                href={s.href}
                variants={fadeUp}
                className="group relative flex flex-col rounded-2xl p-7 transition-all duration-400 hover:shadow-[0_12px_40px_rgba(80,120,180,0.13)]"
                style={{
                  background: "rgba(255,255,255,0.76)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.90)",
                  boxShadow: "0 4px 20px rgba(80,120,180,0.07), 0 1px 0 rgba(255,255,255,0.95) inset",
                }}
              >
                {/* Chrome top */}
                <div
                  className="absolute inset-x-0 top-0 h-[1px] rounded-t-2xl"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,1) 40%, rgba(255,255,255,1) 60%, transparent)" }}
                />

                {/* Icon chip */}
                <div
                  className="mb-5 w-10 h-10 rounded-xl flex items-center justify-center text-[#2a5090] transition-all group-hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, rgba(42,80,144,0.08) 0%, rgba(74,127,212,0.05) 100%)",
                    border: "1px solid rgba(42,80,144,0.12)",
                  }}
                >
                  {s.icon}
                </div>

                <p className="text-[10px] uppercase tracking-[0.25em] text-[#2a5090]/50 mb-1.5 font-medium">{s.label}</p>
                <h3
                  className="text-[17px] font-semibold text-[#0e1e38] mb-3 leading-snug tracking-[-0.01em]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {s.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#0e1e38]/50 flex-1 mb-5">
                  {s.body}
                </p>

                {/* Price */}
                <div
                  className="mb-5 px-3 py-2 rounded-lg"
                  style={{
                    background: s.priceIsIncluded
                      ? "linear-gradient(135deg, rgba(42,80,144,0.07) 0%, rgba(74,127,212,0.04) 100%)"
                      : "rgba(26,42,64,0.04)",
                    border: s.priceIsIncluded
                      ? "1px solid rgba(42,80,144,0.12)"
                      : "1px solid rgba(26,42,64,0.06)",
                  }}
                >
                  <p
                    className="text-[13px] font-semibold"
                    style={{ color: s.priceIsIncluded ? "#2a5090" : "#0e1e38" }}
                  >
                    {s.price}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#2a5090]/55 group-hover:text-[#2a5090] group-hover:gap-2.5 transition-all">
                  {s.cta}
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── How we work — 3 pillars, light strip ─── */}
      <section
        className="py-[80px] lg:py-[100px] border-t border-[#0e1e38]/[0.05]"
        style={{ background: "linear-gradient(180deg, #f2f6fb 0%, #eef3f9 100%)" }}
      >
        <div className="px-6 lg:px-10 max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#0e1e38]/25 mb-4">Notre méthode</p>
            <h2
              className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold tracking-[-0.025em] text-[#0e1e38] max-w-lg"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Un cabinet, pas un prestataire.
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {HOW.map((h) => (
              <motion.div
                key={h.n}
                variants={fadeUp}
                className="flex gap-5"
              >
                <span
                  className="text-[clamp(2rem,3vw,2.6rem)] font-bold leading-none flex-shrink-0 mt-1"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(42,80,144,0.18)",
                  }}
                >
                  {h.n}
                </span>
                <div>
                  <h3
                    className="text-[16px] font-semibold text-[#0e1e38] mb-2 tracking-[-0.01em]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {h.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[#0e1e38]/50">{h.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA — dark, chiffres, tension ─── */}
      <section
        className="relative py-[80px] lg:py-[100px] overflow-hidden"
        style={{ background: "linear-gradient(140deg, #0a1628 0%, #0f2040 55%, #091220 100%)" }}
      >
        {/* Glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "600px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(42,80,144,0.22) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            filter: "blur(80px)",
          }}
        />
        <div className="relative px-6 lg:px-10 max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/25 mb-5">Prêt à démarrer ?</p>
              <h2
                className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-[1.05] text-white mb-5"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Un entretien de 15 min<br />
                <span style={{ color: "#6aabde" }}>change tout.</span>
              </h2>
              <p className="text-[15px] text-white/40 max-w-lg leading-relaxed">
                Gratuit, sans engagement. On analyse votre situation et on vous dit si une LLC est pertinente — honnêtement.
              </p>

              {/* Stats mini-strip */}
              <div className="mt-8 flex flex-wrap gap-8">
                {[
                  { v: "500+", l: "sociétés créées" },
                  { v: "10 ans", l: "d'expertise" },
                  { v: "15M€", l: "d'économies générées" },
                ].map(({ v, l }) => (
                  <div key={l}>
                    <p className="text-[20px] font-bold text-white leading-none" style={{ fontFamily: "var(--font-heading)" }}>{v}</p>
                    <p className="text-[11px] text-white/30 mt-0.5 uppercase tracking-[0.15em]">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 shrink-0">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-[14px] font-semibold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #1a3a6a 0%, #2a5090 100%)",
                  boxShadow: "0 4px 24px rgba(42,80,144,0.45)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(42,80,144,0.60)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(42,80,144,0.45)";
                }}
              >
                Entretien gratuit — 15 min →
              </a>
              <p className="text-[11px] text-white/20 text-center">Réponse sous 24h · Sans engagement</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
