"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const VALUES = [
  {
    title: "Transparence",
    desc: "Pas de frais cachés. Pas de mauvaises surprises. Tout est clair dès le départ.",
  },
  {
    title: "Réactivité",
    desc: "Réponse sous 24h. Vous n'attendez jamais.",
  },
  {
    title: "Expertise",
    desc: "10 ans de droit US, 500+ dossiers, 2 CPAs certifiés.",
  },
  {
    title: "Continuité",
    desc: "Votre interlocuteur reste le même de la création à la 5e année fiscale.",
  },
];

const STATS_DARK = [
  { value: "10+", label: "ans d'expertise" },
  { value: "500+", label: "LLC créées" },
  { value: "15M€", label: "économies générées" },
  { value: "4", label: "états optimisés" },
];

const TEAM = [
  { initials: "CT", name: "Christophe", title: "Fondateur & Directeur" },
  { initials: "MR", name: "Mathieu", title: "Expert-comptable US" },
  { initials: "EJ", name: "Notre équipe juridique", title: "Responsable juridique" },
];

export default function AProposPage() {
  return (
    <main>
      {/* ── 1. HERO STRIP ── */}
      <section
        className="relative overflow-hidden pt-32 pb-20"
        style={{ backgroundColor: "#060e1c" }}
      >
        {/* Grid background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        {/* Blue radial glow — top-right */}
        <div
          className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(42,80,144,0.28) 0%, transparent 70%)",
          }}
        />

        {/* Blue radial glow — bottom-left */}
        <div
          className="pointer-events-none absolute bottom-0 -left-24 w-[320px] h-[320px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(42,80,144,0.14) 0%, transparent 70%)",
          }}
        />

        <div className="relative px-6 lg:px-10 max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Kicker */}
            <motion.p
              variants={fadeUp}
              className="text-[11px] uppercase tracking-[0.28em] mb-5"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              À propos
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-bold leading-[1.1] tracking-tight mb-6 whitespace-pre-line max-w-3xl"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 5vw, 3.6rem)",
                color: "#ffffff",
              }}
            >
              {"10 ans. 500 LLC.\nLa référence franco-américaine."}
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed mb-10 max-w-lg"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Cabinet spécialisé, fondé en 2014, basé à Albuquerque, Nouveau-Mexique.
              L&apos;expert que les entrepreneurs francophones s&apos;échangent entre eux.
            </motion.p>

            {/* Stat pills */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              {["500+ LLC créées", "15M€ économisés", "4 états"].map((pill) => (
                <span
                  key={pill}
                  className="px-4 py-2 rounded-full text-[13px] font-medium"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
                    backdropFilter: "blur(28px)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {pill}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. STORY SECTION ── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="px-6 lg:px-10 max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Left — editorial */}
            <motion.div variants={fadeUp}>
              <p
                className="text-[11px] uppercase tracking-[0.28em] mb-5"
                style={{ color: "rgba(42,80,144,0.5)" }}
              >
                Notre histoire
              </p>
              <h2
                className="font-bold leading-[1.15] tracking-tight mb-8"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                  color: "#0f0e0d",
                }}
              >
                Plus de 10 ans au service des entrepreneurs francophones.
              </h2>
              <div
                className="space-y-5 text-base leading-relaxed"
                style={{ color: "rgba(15,14,13,0.6)" }}
              >
                <p>
                  MA SOCIETE US est né en 2014 d&apos;un constat simple : les
                  entrepreneurs francophones n&apos;avaient pas accès, dans leur langue,
                  à un accompagnement sérieux pour structurer leur activité aux
                  États-Unis. Christophe a fondé le cabinet avec une conviction —
                  la LLC américaine est un outil légal, puissant, et accessible
                  à tous.
                </p>
                <p>
                  Aujourd&apos;hui, notre équipe de 11 professionnels franco-américains
                  combine expertise comptable, juridique et fiscale pour offrir
                  un accompagnement complet. De la création de votre LLC à la
                  gestion de vos déclarations annuelles, vous n&apos;avez qu&apos;un seul
                  interlocuteur.
                </p>
                <p>
                  Basés à Albuquerque, Nouveau-Mexique, nous maîtrisons les
                  spécificités des quatre états que nous recommandons selon votre
                  profil : New Mexico, Delaware, Wyoming et Florida. 500 dossiers,
                  4 états, une seule obsession — votre tranquillité d&apos;esprit.
                </p>
              </div>
            </motion.div>

            {/* Right — values */}
            <motion.div variants={fadeUp}>
              <p
                className="text-[11px] uppercase tracking-[0.28em] mb-6"
                style={{ color: "rgba(42,80,144,0.5)" }}
              >
                Nos valeurs
              </p>
              <div className="space-y-7">
                {VALUES.map((v) => (
                  <div
                    key={v.title}
                    className="pl-5"
                    style={{ borderLeft: "2px solid rgba(42,80,144,0.2)" }}
                  >
                    <h3
                      className="text-[17px] font-semibold mb-1"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "#0f0e0d",
                      }}
                    >
                      {v.title}
                    </h3>
                    <p
                      className="text-[15px] leading-relaxed"
                      style={{ color: "rgba(15,14,13,0.55)" }}
                    >
                      {v.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. STATS SECTION ── */}
      <section
        className="py-16 lg:py-20"
        style={{ backgroundColor: "#0a1628" }}
      >
        <div className="px-6 lg:px-10 max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {STATS_DARK.map((stat) => (
              <motion.div
                key={stat.value}
                variants={fadeUp}
                className="relative rounded-2xl p-7 overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
              >
                {/* Chrome top shine */}
                <div
                  className="absolute top-0 left-0 right-0 h-[1px]"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                  }}
                />
                <p
                  className="font-bold leading-none mb-2"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    color: "#ffffff",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-[11px] uppercase tracking-[0.22em]"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. TEAM & PARTNERS ── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="px-6 lg:px-10 max-w-6xl mx-auto">
          {/* Title */}
          <motion.div
            className="text-center mb-12"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.h2
              variants={fadeUp}
              className="font-bold tracking-tight mb-3"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                color: "#0f0e0d",
              }}
            >
              Notre équipe
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base"
              style={{ color: "rgba(15,14,13,0.5)" }}
            >
              11 professionnels franco-américains. Avocats, CPAs, conseillers fiscaux.
            </motion.p>
          </motion.div>

          {/* Team cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {TEAM.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                className="rounded-2xl p-7"
                style={{
                  border: "1px solid rgba(26,42,64,0.08)",
                }}
              >
                {/* Avatar */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-[14px] font-semibold mb-5"
                  style={{
                    background: "rgba(42,80,144,0.1)",
                    color: "#2a5090",
                  }}
                >
                  {member.initials}
                </div>
                <p
                  className="text-[17px] font-semibold mb-1"
                  style={{ fontFamily: "var(--font-heading)", color: "#0f0e0d" }}
                >
                  {member.name}
                </p>
                <p
                  className="text-[14px]"
                  style={{ color: "rgba(15,14,13,0.5)" }}
                >
                  {member.title}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Partners */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
          >
            <p
              className="text-[11px] uppercase tracking-[0.28em] text-center mb-6"
              style={{ color: "rgba(15,14,13,0.3)" }}
            >
              Partenaires agréés
            </p>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded h-10 w-24"
                  style={{ background: "rgba(26,42,64,0.06)" }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 5. CTA ── */}
      <section
        className="py-16 lg:py-20"
        style={{ backgroundColor: "#060e1c" }}
      >
        {/* Blue glow */}
        <div
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(42,80,144,0.2) 0%, transparent 70%)",
          }}
        />
        <motion.div
          className="relative px-6 lg:px-10 max-w-2xl mx-auto text-center"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.h2
            variants={fadeUp}
            className="font-bold leading-[1.1] tracking-tight mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              color: "#ffffff",
            }}
          >
            Travaillons ensemble.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base mb-8"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            15 minutes pour changer votre situation fiscale.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 rounded-full text-[15px] font-semibold text-white transition-all"
              style={{
                background: "linear-gradient(135deg, #1a3a6a 0%, #2a5090 100%)",
                boxShadow: "0 4px 24px rgba(42,80,144,0.30)",
              }}
            >
              Réservez votre entretien gratuit
            </Link>
            <p
              className="text-[12px] tracking-wide"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Gratuit · Sans engagement · Réponse sous 24h
            </p>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
