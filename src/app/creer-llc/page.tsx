"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Data ─────────────────────────────────────────────────────────── */

const advantages = [
  {
    title: "0% d'impôts",
    desc: "Là où la France prend 45%+, une LLC bien structurée peut descendre à zéro. 100% légal, conforme OCDE.",
  },
  {
    title: "Anonymat total",
    desc: "Votre nom n'apparaît dans aucun registre public. Pas de trace, pas d'exposition.",
  },
  {
    title: "14 jours chrono",
    desc: "LLC, EIN, compte Mercury. Vous facturez en dollars 2 semaines après votre premier appel.",
  },
  {
    title: "100% à distance",
    desc: "Pas de visa, pas de consulat, pas de déplacement. Vous signez — on fait le reste.",
  },
  {
    title: "Aucun capital minimum",
    desc: "0€ de capital obligatoire. Pas de blocage de trésorerie.",
  },
  {
    title: "Flexibilité totale",
    desc: "Souplesse comptable, pas d'AG obligatoire, gestion simplifiée.",
  },
];

const states = [
  {
    name: "Nouveau-Mexique",
    tag: "Le plus discret.",
    chrome: "rgba(99,179,237,0.6)",
    avantages: "0 frais annuels État · Anonymat maximal · Idéal freelances",
    bestFor: "Consultants, freelances, e-commerce",
  },
  {
    name: "Colorado",
    tag: "Le polyvalent.",
    chrome: "rgba(99,179,237,0.6)",
    avantages:
      "Reconnaissance internationale · Frais annuels $10 · Solidité juridique",
    bestFor: "SaaS, agences, e-commerce",
  },
  {
    name: "Wyoming",
    tag: "Le premium.",
    chrome: "rgba(52,211,153,0.6)",
    avantages: "Asset protection maximal · Charging order · Pas d'impôt État",
    bestFor: "Holding, patrimoine, actifs",
  },
  {
    name: "Delaware",
    tag: "Le corporatif.",
    chrome: "rgba(251,191,36,0.6)",
    avantages: "Preferred by investors · Court of Chancery · Venture-ready",
    bestFor: "Startups levant des fonds",
  },
];

const steps = [
  {
    n: "1",
    title: "Constitution du dossier",
    desc: "Formulaire simple, guidé. 10 minutes de votre temps.",
  },
  {
    n: "2",
    title: "Création LLC",
    desc: "7 jours en moyenne. Registered Agent inclus.",
  },
  {
    n: "3",
    title: "Obtention EIN",
    desc: "Identité fiscale de votre LLC. Débloque l'ouverture bancaire.",
  },
  {
    n: "4",
    title: "Compte bancaire",
    desc: "Mercury ou Relay. Carte VISA sous 10 jours.",
  },
];

const faqs = [
  {
    q: "Dois-je résider aux USA ?",
    a: "Non. Aucune présence physique n'est requise.",
  },
  {
    q: "Faut-il un visa ou permis de travail ?",
    a: "Non. La LLC est une entité américaine, vous en êtes le gérant depuis la France.",
  },
  {
    q: "Est-ce 100% légal ?",
    a: "Oui. Conforme OCDE, CDI France-USA, exercé depuis 2014.",
  },
  {
    q: "Combien ça coûte réellement ?",
    a: "À partir de 1 490$ tout inclus. Voir notre page tarifs.",
  },
  {
    q: "Quel délai pour être opérationnel ?",
    a: "14 jours en moyenne : LLC + EIN + compte Mercury.",
  },
  {
    q: "Puis-je garder ma structure française ?",
    a: "Oui. La LLC et la SARL peuvent coexister. On analyse votre situation.",
  },
];

/* ─── Sub-components ───────────────────────────────────────────────── */

function GlassCard({
  chrome,
  children,
  className = "",
}: {
  chrome: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-xl overflow-hidden ${className}`}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
        backdropFilter: "blur(28px)",
        border: "1px solid rgba(255,255,255,0.09)",
      }}
    >
      {/* chrome top */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${chrome} 50%, transparent 100%)`,
        }}
      />
      {children}
    </div>
  );
}

function FaqItem({
  item,
  open,
  onToggle,
}: {
  item: { q: string; a: string };
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#1a2a40]/[0.10]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        aria-expanded={open}
      >
        <span className="text-[16px] font-medium text-[#1a2a40] leading-snug">
          {item.q}
        </span>
        <span
          className="shrink-0 w-7 h-7 rounded-full border border-[#1a2a40]/20 flex items-center justify-center text-[#1a2a40]/50 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[15px] text-[#1a2a40]/60 leading-relaxed">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────── */

export default function CreerLLCPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <main>
      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-32 pb-16"
        style={{ background: "#060e1c" }}
      >
        {/* grid bg */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* blue glow top-right */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(42,80,144,0.35) 0%, transparent 70%)",
          }}
        />
        {/* blue glow bottom-left */}
        <div
          className="pointer-events-none absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(42,80,144,0.15) 0%, transparent 70%)",
          }}
        />

        <div className="relative px-6 lg:px-10 max-w-5xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-[11px] uppercase tracking-[0.28em] text-white/40 mb-5"
            >
              Création LLC
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-bold leading-[1.08] tracking-[-0.03em] mb-6 whitespace-pre-line"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 5.5vw, 3.6rem)",
                color: "#fff",
              }}
            >
              {"Votre LLC américaine.\nOpérationnelle en 14 jours."}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-[17px] lg:text-[18px] leading-relaxed mb-10 max-w-xl"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              LLC créée, EIN obtenu, compte Mercury ouvert. Tout ça depuis chez
              vous — sans billet d&apos;avion.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <a
                href="/contact"
                className="text-white rounded-full font-semibold px-8 py-4 text-[15px] transition-all inline-flex items-center"
                style={{
                  background: "linear-gradient(135deg, #1a3a6a 0%, #2a5090 100%)",
                  boxShadow: "0 4px 24px rgba(42,80,144,0.30)",
                }}
              >
                Entretien gratuit — 15 min
              </a>
              <a
                href="/tarifs"
                className="inline-flex items-center text-white/50 hover:text-white px-2 py-4 text-[15px] transition-colors"
              >
                Voir les tarifs →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Why LLC ──────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="px-6 lg:px-10 max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.p
              variants={fadeUp}
              className="text-[11px] uppercase tracking-[0.28em] mb-4"
              style={{ color: "rgba(42,80,144,0.5)" }}
            >
              Pourquoi la LLC
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-bold leading-[1.1] tracking-[-0.025em] mb-12 max-w-2xl"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
                color: "#0d1a2d",
              }}
            >
              Ce que vous ne pouvez pas faire avec une SARL.
            </motion.h2>
            <motion.div
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {advantages.map((adv) => (
                <motion.div
                  key={adv.title}
                  variants={fadeUp}
                  className="rounded-2xl border border-[#1a2a40]/[0.07] bg-white p-7"
                >
                  <h3
                    className="text-[18px] font-bold mb-3 text-[#0d1a2d]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {adv.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#1a2a40]/55">
                    {adv.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. States comparison ─────────────────────────────────── */}
      <section
        className="py-16 lg:py-24"
        style={{ background: "#0a1628" }}
      >
        <div className="px-6 lg:px-10 max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.p
              variants={fadeUp}
              className="text-[11px] uppercase tracking-[0.28em] text-white/35 mb-4"
            >
              Juridictions disponibles
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-bold leading-[1.1] tracking-[-0.025em] text-white mb-12 max-w-xl"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
              }}
            >
              Quel état pour votre profil ?
            </motion.h2>
            <motion.div
              variants={stagger}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {states.map((s) => (
                <motion.div key={s.name} variants={fadeUp}>
                  <GlassCard chrome={s.chrome} className="h-full px-6 py-7">
                    <div className="pt-3 flex flex-col h-full">
                      <span className="inline-block text-[10px] uppercase tracking-[0.22em] text-white/40 mb-4">
                        {s.tag}
                      </span>
                      <p className="text-[13px] leading-relaxed text-white/50 mb-6 flex-1">
                        {s.avantages}
                      </p>
                      <div className="border-t border-white/[0.06] pt-4">
                        <p className="text-[12px] text-white/30 mb-1">
                          Idéal pour
                        </p>
                        <p className="text-[13px] text-white/55 leading-snug">
                          {s.bestFor}
                        </p>
                      </div>
                      <p
                        className="text-[17px] font-bold text-white mt-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {s.name}
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. Process ───────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <div className="px-6 lg:px-10 max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.h2
              variants={fadeUp}
              className="font-bold leading-[1.1] tracking-[-0.025em] text-[#0d1a2d] mb-12 max-w-xl"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              }}
            >
              De zéro à opérationnel en 4 étapes.
            </motion.h2>
            <motion.div
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {steps.map((step) => (
                <motion.div key={step.n} variants={fadeUp}>
                  <div className="w-10 h-10 rounded-full bg-[#0a1628] text-white flex items-center justify-center font-bold text-[14px] mb-4">
                    {step.n}
                  </div>
                  <h3
                    className="text-[16px] font-bold text-[#0d1a2d] mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#1a2a40]/55">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 5. FAQ ───────────────────────────────────────────────── */}
      <section className="bg-white pb-16 lg:pb-24">
        <div className="px-6 lg:px-10 max-w-3xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.h2
              variants={fadeUp}
              className="font-bold leading-[1.1] tracking-[-0.025em] text-[#0d1a2d] mb-10"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              }}
            >
              Questions fréquentes.
            </motion.h2>
            <motion.div variants={fadeUp}>
              {faqs.map((item, i) => (
                <FaqItem
                  key={i}
                  item={item}
                  open={openIdx === i}
                  onToggle={() => setOpenIdx(openIdx === i ? null : i)}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 6. CTA final ─────────────────────────────────────────── */}
      <section
        className="py-16"
        style={{ background: "#060e1c" }}
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="px-6 lg:px-10 max-w-2xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="font-bold leading-[1.1] tracking-[-0.025em] text-white mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
            }}
          >
            Prêt à passer à la vitesse supérieure ?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[16px] leading-relaxed mb-10"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Un entretien de 15 minutes pour changer votre situation fiscale.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/contact"
              className="text-white rounded-full font-semibold px-8 py-4 text-[15px] transition-all inline-flex items-center"
              style={{
                background: "linear-gradient(135deg, #1a3a6a 0%, #2a5090 100%)",
                boxShadow: "0 4px 24px rgba(42,80,144,0.30)",
              }}
            >
              Entretien gratuit — 15 min
            </a>
            <a
              href="/tarifs"
              className="inline-flex items-center text-white/50 hover:text-white px-2 py-4 text-[15px] transition-colors"
            >
              Voir les tarifs →
            </a>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
