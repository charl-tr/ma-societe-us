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

          {/* Right — glassmorphism stat panel (desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease }}
            className="hidden lg:flex flex-col gap-2 shrink-0"
          >
            {/* Big "0%" — glass premium */}
            <div
              className="relative rounded-2xl text-center overflow-hidden"
              style={{
                minWidth: "280px",
                background: "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                border: "1px solid rgba(255,255,255,0.13)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.12) inset, 0 -1px 0 rgba(0,0,0,0.2) inset",
                padding: "36px 40px 28px",
              }}
            >
              {/* Chrome top shine */}
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 60%, transparent)" }}
              />
              {/* Subtle inner glow */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.07) 0%, transparent 60%)" }}
              />
              <p
                className="relative text-[88px] xl:text-[108px] font-bold leading-none tracking-[-0.05em] text-white"
                style={{
                  fontFamily: "var(--font-heading)",
                  textShadow: "0 2px 20px rgba(255,255,255,0.1)",
                }}
              >
                0<span style={{ color: "#e84040", textShadow: "0 4px 24px rgba(232,64,64,0.5)" }}>%</span>
              </p>
              <p className="relative text-[11px] text-white/40 mt-3 tracking-[0.22em] uppercase">d&apos;impôts aux USA</p>
              {/* Legal badge */}
              <div className="relative mt-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                <span className="text-[10px] text-white/35 tracking-wide">100% légal · Conforme OCDE</span>
              </div>
            </div>

            {/* Micro stats — glass */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { v: "2 sem.", l: "Création" },
                { v: "4", l: "Juridictions" },
                { v: "500+", l: "Clients" },
                { v: "10 ans", l: "Expertise" },
              ].map(({ v, l }) => (
                <div
                  key={l}
                  className="rounded-xl p-4 text-center relative overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,0.08) inset",
                  }}
                >
                  <p className="text-[22px] font-bold text-white leading-none" style={{ fontFamily: "var(--font-heading)" }}>{v}</p>
                  <p className="text-[10px] text-white/30 mt-1 uppercase tracking-[0.15em]">{l}</p>
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
