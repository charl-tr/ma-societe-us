"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Hero } from "@/components/hero/Hero";
import { StatesMap } from "@/components/sections/StatesMap";
import { ScrollTimeline } from "@/components/sections/ScrollTimeline";
import { CTASection } from "@/components/sections/CTASection";
import { SavingsEstimator } from "@/components/sections/SavingsEstimator";
import { STATS, TESTIMONIALS, VALUE_PROPS } from "@/lib/constants";

/* ─── Glass panel utility ─── */
const glass = {
  card: "bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_4px_24px_rgba(0,40,104,0.04)]",
  cardHover: "hover:bg-white/70 hover:shadow-[0_8px_32px_rgba(0,40,104,0.07)]",
  cardActive: "bg-white/80 backdrop-blur-xl border-white/80 shadow-[0_8px_32px_rgba(0,40,104,0.08)]",
  chrome: "linear-gradient(90deg, rgba(200,210,225,0.2), rgba(255,255,255,0.8) 30%, rgba(220,230,245,0.5) 50%, rgba(255,255,255,0.8) 70%, rgba(200,210,225,0.2))",
};

/* ─── Framer Motion variants ─── */
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── CountUp component ─── */
function CountUp({ target, suffix = "" }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 1.8, ease });
    }
  }, [isInView, count, target]);

  return (
    <motion.span ref={ref}>
      <CountDisplay value={rounded} suffix={suffix} />
    </motion.span>
  );
}

function CountDisplay({ value, suffix }: { value: ReturnType<typeof useTransform<number, number>>; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const unsubscribe = value.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${v}${suffix}`;
    });
    return unsubscribe;
  }, [value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/* Parse "10+" → { target: 10, suffix: "+" } */
function parseStat(val: string): { target: number; suffix: string } {
  const match = val.match(/^(\d+)(.*)$/);
  if (!match) return { target: 0, suffix: "" };
  return { target: parseInt(match[1], 10), suffix: match[2] };
}

/* ─── Icons ─── */
function PropIcon({ type }: { type: string }) {
  const cn = "w-5 h-5";
  switch (type) {
    case "percent":
      return (<svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="5" x2="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></svg>);
    case "shield":
      return (<svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>);
    case "clock":
      return (<svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>);
    case "globe":
      return (<svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>);
    default: return null;
  }
}

export default function HomePage() {
  return (
    <main>
      <Hero />

      {/* ─── Stats bar — misty glass, transition from hero ─── */}
      <section className="border-b border-[#1a2a40]/[0.07]" style={{ background: "linear-gradient(180deg, #eef3f9 0%, #e8eef6 100%)" }}>
        <div className="px-6 lg:px-10 max-w-[1200px] mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            className="grid grid-cols-2 lg:grid-cols-4"
          >
            {STATS.map((stat, i) => {
              const { target, suffix } = parseStat(stat.value);
              return (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className={`py-8 lg:py-10 flex flex-col gap-1 ${
                    i < STATS.length - 1 ? "lg:border-r border-[#1a2a40]/[0.08]" : ""
                  } ${i % 2 === 0 ? "lg:pr-10" : "pl-6 lg:px-10"} ${
                    i >= 2 ? "border-t lg:border-t-0 border-[#1a2a40]/[0.07]" : ""
                  }`}
                >
                  <span
                    className="text-[clamp(2.4rem,5vw,3.6rem)] font-bold leading-none tracking-[-0.03em] text-[#0a1628]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    <CountUp target={target} suffix={suffix} />
                  </span>
                  <span className="text-[12px] uppercase tracking-[0.18em] text-[#1a2a40]/40 font-medium">
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── Value props — dark, numbered, high contrast ─── */}
      {/* Hover : glow border propre — AUCUN backdrop-blur (dark bg = blur sur le contenu, pas sur le fond) */}
      <section className="bg-[#0a1628] py-16 lg:py-24">
        <div className="px-6 lg:px-10 max-w-[1200px] mx-auto">
          {/* Header row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/25 mb-4">
                Pourquoi la LLC
              </p>
              <h2
                className="text-[clamp(1.8rem,4vw,3.2rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white max-w-xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Ce que votre SARL ne pourra jamais vous offrir.
              </h2>
            </div>
            <a
              href="/creer-llc"
              className="shrink-0 self-start inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white border border-white/10 hover:border-white/25 rounded-full px-5 py-2.5 transition-all"
            >
              En savoir plus →
            </a>
          </div>

          {/* Grid — cartes séparées avec gap, pas gap-px fusionnées */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {VALUE_PROPS.map((prop, i) => (
              <motion.div
                key={prop.title}
                variants={fadeUp}
                className="relative p-7 lg:p-8 group rounded-2xl transition-all duration-400 cursor-default overflow-hidden"
                style={{
                  background: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                whileHover={{
                  background: "linear-gradient(160deg, rgba(74,127,212,0.10) 0%, rgba(42,80,144,0.06) 100%)",
                  borderColor: "rgba(74,127,212,0.35)",
                  boxShadow: "0 8px 32px rgba(42,80,144,0.18), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                {/* Chrome top — visible en permanence, s'intensifie au hover */}
                <div
                  className="absolute inset-x-0 top-0 h-[1px] opacity-40 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(100,160,240,0.8) 40%, rgba(140,190,255,1) 50%, rgba(100,160,240,0.8) 60%, transparent)" }}
                />

                {/* Number — stroke plus visible */}
                <span
                  className="block text-[clamp(2.8rem,4.5vw,3.6rem)] font-bold leading-none tracking-[-0.04em] mb-6 transition-all duration-400 group-hover:opacity-60"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(255,255,255,0.22)",
                  }}
                >
                  0{i + 1}
                </span>

                {/* Icon */}
                <div className="relative w-10 h-10 rounded-xl flex items-center justify-center text-white/45 mb-5 transition-all duration-400 group-hover:text-[#6aaee8]"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                  }}
                >
                  <PropIcon type={prop.icon} />
                </div>

                <h3
                  className="text-[17px] font-semibold mb-3 tracking-tight text-white/90 group-hover:text-white transition-colors duration-300"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {prop.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-white/38 group-hover:text-white/55 transition-colors duration-300">
                  {prop.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Testimonials — avant l'Estimator : preuve sociale avant calcul personnel ─── */}
      {/* Justification : le visiteur croit au résultat (témoignages) avant de calculer son propre gain (estimateur).
          L'inverse = calcul abstrait sans ancre de crédibilité. */}
      <section className="py-16 lg:py-24" style={{ background: "linear-gradient(160deg, #eef3f9 0%, #e8eef6 40%, #f2f6fb 100%)" }}>
        <div className="px-6 lg:px-10 max-w-[1400px] mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-10 lg:mb-14"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#2a5090]/40 mb-3">Témoignages</p>
            <h2
              className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.025em] leading-[1.05] text-[#0e1e38] max-w-lg"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Ils ont créé leur LLC.<br />Ils ne regrettent pas.
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4"
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.author}
                variants={fadeUp}
                className="rounded-2xl p-7 lg:p-8 flex flex-col relative overflow-hidden"
                style={{
                  background: i === 1
                    ? "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(235,244,255,0.75) 100%)"
                    : "linear-gradient(160deg, rgba(255,255,255,0.75) 0%, rgba(235,242,255,0.55) 100%)",
                  backdropFilter: "blur(20px) saturate(1.4)",
                  WebkitBackdropFilter: "blur(20px) saturate(1.4)",
                  border: "1px solid rgba(255,255,255,0.88)",
                  boxShadow: i === 1
                    ? "0 8px 32px rgba(80,120,180,0.12), 0 1px 0 rgba(255,255,255,0.95) inset"
                    : "0 4px 20px rgba(80,120,180,0.07), 0 1px 0 rgba(255,255,255,0.85) inset",
                }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-[1px]"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,1) 40%, rgba(255,255,255,1) 60%, transparent)" }}
                />
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, si) => (
                    <svg key={si} className="w-3.5 h-3.5" fill="#4a80b8" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-[14px] lg:text-[15px] leading-[1.7] text-[#0e1e38]/55 flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-5" style={{ borderTop: "1px solid rgba(26,42,64,0.07)" }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-white" style={{ background: "linear-gradient(135deg, #2a5090, #4a80b8)" }}>
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#0e1e38]">{t.author}</p>
                    <p className="text-[11px] text-[#0e1e38]/35">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Savings Estimator — conversion hook ─── */}
      <SavingsEstimator />

      {/* ─── States Map — glassmorphism ─── */}
      <StatesMap />

      {/* ─── Process steps — scroll timeline ─── */}
      <ScrollTimeline />

      {/* ─── Différenciateur — "pourquoi nous ?" ─── */}
      <section
        className="py-[80px] lg:py-[120px]"
        style={{ background: "linear-gradient(160deg, #eef3f9 0%, #e8eef6 50%, #f2f6fb 100%)" }}
      >
        <div className="px-6 lg:px-10 max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#0e1e38]/25 mb-4">
              Pourquoi nous
            </p>
            <h2
              className="text-[clamp(1.6rem,3.5vw,2.6rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[#0e1e38] max-w-2xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Pas une plateforme.<br />Un cabinet franco-américain.
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-5"
          >
            {[
              {
                n: "01",
                title: "Depuis 2014 — pas depuis la pandémie",
                body: "On a créé des LLC avant que ce soit tendance. 10 ans d'expérience dans les deux systèmes — américain et français — avec les vrais professionnels locaux agréés.",
              },
              {
                n: "02",
                title: "Un interlocuteur, pas un ticket",
                body: "Christophe et son équipe suivent votre dossier du début à la fin. Pas de bot, pas de formulaire en ligne, pas de transfert. Vous avez un numéro de téléphone et une réponse sous 24h.",
              },
              {
                n: "03",
                title: "Les deux fiscalités, pas une seule",
                body: "La plupart des prestataires connaissent le droit américain. Nous connaissons aussi la déclaration française (2047, revenus étrangers). Aucune surprise côté impôts, des deux côtés.",
              },
            ].map((d) => (
              <motion.div
                key={d.n}
                variants={fadeUp}
                className="relative rounded-2xl p-7 lg:p-8"
                style={{
                  background: "rgba(225,232,244,0.52)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(175,198,225,0.38)",
                  boxShadow: "0 4px 20px rgba(80,120,180,0.06)",
                }}
              >
                {/* Chrome top */}
                <div
                  className="absolute inset-x-0 top-0 h-[1px] rounded-t-2xl"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(175,198,225,0.60) 40%, rgba(210,225,245,0.80) 60%, transparent)",
                  }}
                />
                <span
                  className="block text-[clamp(2rem,3vw,2.4rem)] font-bold leading-none mb-5"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(42,80,144,0.20)",
                  }}
                >
                  {d.n}
                </span>
                <h3
                  className="text-[16px] font-semibold text-[#0e1e38] mb-3 leading-snug tracking-[-0.01em]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {d.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#0e1e38]/50">{d.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
