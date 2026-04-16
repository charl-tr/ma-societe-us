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

      {/* ─── Stats bar — white, high contrast ─── */}
      <section className="bg-white border-b border-[#1a2a40]/[0.07]">
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

          {/* Grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06]"
          >
            {VALUE_PROPS.map((prop, i) => (
              <motion.div
                key={prop.title}
                variants={fadeUp}
                className="bg-[#0a1628] p-7 lg:p-8 group hover:bg-[#0f1e34] transition-colors duration-300"
              >
                {/* Number */}
                <span
                  className="block text-[clamp(3rem,5vw,4rem)] font-bold leading-none tracking-[-0.04em] mb-6"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(255,255,255,0.15)",
                  }}
                >
                  0{i + 1}
                </span>
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/60 mb-5 group-hover:bg-white/[0.1] transition-colors">
                  <PropIcon type={prop.icon} />
                </div>
                <h3
                  className="text-[17px] font-semibold mb-2.5 tracking-tight text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {prop.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-white/40">
                  {prop.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Savings Estimator — conversion hook ─── */}
      <SavingsEstimator />

      {/* ─── CTA Strip #1 — dark, conversion push ─── */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-6 lg:py-8"
        style={{ background: "linear-gradient(135deg, #0a1628, #1a3050)" }}
      >
        <div className="px-6 lg:px-10 max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-[15px] lg:text-[17px] text-white/80 text-center sm:text-left font-medium"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Prêt à diviser votre note fiscale ?
          </p>
          <a
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full text-[14px] font-medium bg-white text-[#0a1628] shadow-[0_4px_16px_rgba(255,255,255,0.15)] hover:bg-white/90 transition-all"
          >
            Entretien gratuit — 15 min →
          </a>
        </div>
      </motion.section>

      {/* ─── Teaser cards — differentiated glass panels ─── */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-8 lg:py-12"
      >
        <div className="px-6 lg:px-10 max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Card 1 — light glass */}
            <motion.a
              href="/creer-llc"
              variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group rounded-xl overflow-hidden transition-all duration-300"
            >
              <div className="h-[2px]" style={{ background: glass.chrome }} />
              <div className={`p-5 lg:p-10 ${glass.card} border-t-0 rounded-t-none transition-all duration-300 ${glass.cardHover}`}>
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#2a5090]/50 mb-4">
                  4 juridictions
                </p>
                <h3
                  className="text-[clamp(1.3rem,2.2vw,1.7rem)] font-semibold tracking-tight mb-3 text-[#1a2a40] whitespace-pre-line"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {"Le bon état,\nc'est des milliers d'euros\nde différence."}
                </h3>
                <p className="text-[14px] leading-relaxed text-[#1a2a40]/40 mb-6">
                  Nouveau-Mexique, Colorado, Wyoming, Delaware — on vous montre laquelle maximise vos gains.
                </p>
                <span className="inline-flex items-center gap-2 text-[14px] text-[#2a5090] font-semibold group-hover:gap-3 transition-all">
                  Comparer les états →
                </span>
              </div>
            </motion.a>

            {/* Card 2 — dark navy, stands out */}
            <motion.a
              href="/services/pack-llc"
              variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group rounded-xl overflow-hidden transition-all duration-300"
            >
              <div className={`p-5 lg:p-10 bg-[#0a1628] rounded-xl transition-all duration-300 hover:bg-[#0f1e34]`}>
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/30 mb-4">
                  Pack tout inclus
                </p>
                <h3
                  className="text-[clamp(1.3rem,2.2vw,1.7rem)] font-semibold tracking-tight mb-3 text-white whitespace-pre-line"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {"Vous signez.\nOn fait le reste."}
                </h3>
                <p className="text-[14px] leading-relaxed text-white/40 mb-6">
                  LLC, EIN, compte bancaire US, documents légaux, suivi post-création — zéro prise de tête.
                </p>
                <span className="inline-flex items-center gap-2 text-[14px] text-white/70 font-semibold group-hover:gap-3 group-hover:text-white transition-all">
                  Voir ce qui est inclus →
                </span>
              </div>
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* ─── States Map — glassmorphism ─── */}
      <StatesMap />

      {/* ─── Process steps — scroll timeline ─── */}
      <ScrollTimeline />

      {/* ─── CTA Strip #2 — credible, not fake urgency ─── */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-5 lg:py-6 border-y border-white/30"
        style={{ background: "linear-gradient(180deg, rgba(225,232,242,0.6), rgba(237,241,246,0.3))" }}
      >
        <div className="px-6 lg:px-10 max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[14px] text-[#1a2a40]/60 text-center sm:text-left">
            <span className="font-semibold text-[#1a2a40]">500+ entrepreneurs</span> nous ont déjà fait confiance. À votre tour ?
          </p>
          <a
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full text-[14px] font-medium bg-[#0a1628] text-white hover:bg-[#1a2a40] transition-all shadow-[0_4px_16px_rgba(10,22,40,0.15)]"
          >
            Parler à un expert →
          </a>
        </div>
      </motion.section>

      {/* ─── Testimonials — glass cards ─── */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="py-10 lg:py-16"
        style={{ background: "linear-gradient(180deg, rgba(220,228,240,0.4), rgba(237,241,246,0.2))" }}
      >
        <div className="px-6 lg:px-10 max-w-[1200px] mx-auto">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#1a2a40]/25 mb-2 text-center">
            Ce qu&apos;ils en disent
          </p>
          <h2
            className="text-[clamp(1.4rem,2.5vw,2rem)] font-semibold tracking-tight text-[#1a2a40] text-center mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ils ont créé leur LLC avec nous.
          </h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-5"
          >
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.author}
                variants={fadeUp}
                className="rounded-xl overflow-hidden"
              >
                <div className="h-[2px]" style={{ background: glass.chrome }} />
                <div className={`p-5 lg:p-7 ${glass.card} border-t-0 rounded-t-none h-full flex flex-col`}>
                  {/* Star rating */}
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-[14px] leading-[1.65] text-[#1a2a40]/65 flex-1">
                    &laquo;&nbsp;{t.quote}&nbsp;&raquo;
                  </blockquote>
                  <div className="mt-5 pt-4 border-t border-[#1a2a40]/[0.06] flex items-center gap-3">
                    {/* Avatar placeholder */}
                    <div className="w-9 h-9 rounded-full bg-[#2a5090]/10 flex items-center justify-center text-[13px] font-semibold text-[#2a5090]">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-[#1a2a40]">{t.author}</p>
                      <p className="text-[12px] text-[#1a2a40]/35">{t.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <CTASection />
    </main>
  );
}
