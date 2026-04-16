"use client";

import { motion } from "framer-motion";
import { HERO } from "@/lib/constants";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Hero() {
  return (
    <section className="relative min-h-dvh min-h-[640px] max-h-[1000px] flex flex-col overflow-hidden bg-[#060e1c]">

      {/* ── Background layers ── */}
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Red bottom-left glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(180,30,20,0.18) 0%, transparent 70%)",
          bottom: "-100px",
          left: "-100px",
          filter: "blur(60px)",
          animation: "floatA 22s ease-in-out infinite",
        }}
      />
      {/* Blue top-right glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle, rgba(30,70,160,0.22) 0%, transparent 65%)",
          top: "-200px",
          right: "-200px",
          filter: "blur(80px)",
          animation: "floatB 28s ease-in-out infinite",
        }}
      />

      {/* ── Main content — split layout ── */}
      <div className="relative z-10 flex-1 flex items-center px-6 lg:px-16 xl:px-20">
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-20 items-center">

          {/* Left — copy */}
          <div>
            {/* Trust pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.55, ease }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] mb-8 lg:mb-10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[12px] text-white/50 tracking-wide">500+ sociétés créées depuis 2014</span>
            </motion.div>

            {/* Headline — huge, left-aligned */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.65, ease }}
              className="text-[clamp(2.8rem,7vw,88px)] leading-[0.97] font-bold tracking-[-0.03em] text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Votre société<br />
              américaine.<br />
              <span
                className="relative inline-block"
                style={{
                  background: "linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.75) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Jusqu&apos;à 0%&nbsp;
              </span>
              <span
                style={{
                  background: "linear-gradient(90deg, #e84040 0%, #c02020 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                d&apos;impôts.
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.55, ease }}
              className="mt-6 text-[15px] lg:text-[17px] leading-relaxed text-white/45 max-w-lg"
            >
              {HERO.subline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.55, ease }}
              className="mt-9 flex flex-col sm:flex-row items-start gap-3"
            >
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-4 rounded-full text-[15px] font-semibold bg-[#c0392b] text-white hover:bg-[#a02020] transition-all shadow-[0_4px_28px_rgba(192,57,43,0.4)] hover:shadow-[0_8px_36px_rgba(192,57,43,0.5)]"
              >
                {HERO.cta}
              </a>
              <a
                href="/services/pack-llc"
                className="inline-flex items-center px-6 py-4 text-[14px] text-white/50 hover:text-white border border-white/[0.12] rounded-full hover:border-white/25 transition-all"
              >
                {HERO.ctaSecondary} →
              </a>
            </motion.div>

            {/* Trust micro */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              className="mt-5 text-[11px] text-white/20 tracking-wide"
            >
              Gratuit · Sans engagement · Réponse sous 24h
            </motion.p>
          </div>

          {/* Right — big stat panel (desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease }}
            className="hidden lg:flex flex-col gap-1 shrink-0"
          >
            {/* Big "0%" callout */}
            <div
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-8 xl:p-10 text-center"
              style={{ minWidth: "260px" }}
            >
              <p
                className="text-[80px] xl:text-[100px] font-bold leading-none tracking-[-0.05em] text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                0<span className="text-[#e84040]">%</span>
              </p>
              <p className="text-[13px] text-white/35 mt-2 tracking-wide uppercase">d&apos;impôts aux USA</p>
            </div>

            {/* Micro stats */}
            <div className="grid grid-cols-2 gap-1 mt-1">
              {[
                { v: "2 sem.", l: "Création" },
                { v: "4", l: "Juridictions" },
                { v: "500+", l: "Clients" },
                { v: "100%", l: "Légal" },
              ].map(({ v, l }) => (
                <div
                  key={l}
                  className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-4 text-center"
                >
                  <p className="text-[22px] font-bold text-white leading-none" style={{ fontFamily: "var(--font-heading)" }}>{v}</p>
                  <p className="text-[10px] text-white/25 mt-1 uppercase tracking-[0.15em]">{l}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom strip — jurisdictions ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="relative z-10 border-t border-white/[0.06]"
      >
        <div className="px-6 lg:px-16 xl:px-20 py-4 max-w-[1400px] mx-auto flex items-center justify-between">
          <span className="text-[11px] text-white/20 uppercase tracking-[0.2em]">Juridictions disponibles</span>
          <div className="flex items-center gap-6 sm:gap-10">
            {["Nouveau-Mexique", "Colorado", "Wyoming", "Delaware"].map((state, i) => (
              <div key={state} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#2a5090]/60" />
                <span className="text-[12px] font-medium text-white/50">{state}</span>
                {i < 3 && <span className="hidden sm:block w-px h-3 bg-white/[0.08] ml-4" />}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes floatA {
          0%,100% { transform: translate(0,0) scale(1); }
          40% { transform: translate(40px,-30px) scale(1.08); }
          70% { transform: translate(-20px,20px) scale(0.94); }
        }
        @keyframes floatB {
          0%,100% { transform: translate(0,0) scale(1); }
          35% { transform: translate(-50px,40px) scale(1.06); }
          65% { transform: translate(30px,-25px) scale(0.96); }
        }
      `}</style>
    </section>
  );
}
