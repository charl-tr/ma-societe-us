"use client";

import { motion } from "framer-motion";
import { HERO } from "@/lib/constants";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Hero() {
  return (
    <section className="relative min-h-dvh min-h-[640px] max-h-[1020px] flex flex-col overflow-hidden">

      {/* ── Background — misty blue-gray, like the map ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(160deg, #eef3f9 0%, #e4ecf6 30%, #eaf1f8 60%, #f2f6fb 100%)",
        }}
      />
      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, #2a4a70 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Deep blue vignette — bottom center, atmospheric depth */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "900px",
          height: "600px",
          background: "radial-gradient(ellipse, rgba(80,130,200,0.08) 0%, transparent 70%)",
          bottom: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
          filter: "blur(60px)",
        }}
      />
      {/* Soft top-left warm mist */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "600px",
          height: "500px",
          background: "radial-gradient(ellipse, rgba(220,230,245,0.6) 0%, transparent 70%)",
          top: "-100px",
          left: "-100px",
          filter: "blur(80px)",
        }}
      />

      {/* ── Main content — split layout ── */}
      <div className="relative z-10 flex-1 flex items-center px-6 lg:px-16 xl:px-20">
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-20 items-center">

          {/* Left — copy */}
          <div>
            {/* Trust pill — chrome glass on light */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.55, ease }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-8 lg:mb-10"
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.85)",
                boxShadow: "0 2px 12px rgba(80,120,180,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4a80b8]" />
              <span className="text-[12px] text-[#0e1e38]/50 tracking-wide">500+ sociétés créées depuis 2014</span>
            </motion.div>

            {/* Headline — refined, high contrast */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.65, ease }}
              className="text-[clamp(2.8rem,7vw,88px)] leading-[0.97] font-bold tracking-[-0.03em] text-[#0e1e38]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Votre société<br />
              américaine.<br />
              <span
                style={{
                  background: "linear-gradient(90deg, #3a6898 0%, #5a90c8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Créée en 14 jours.
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.55, ease }}
              className="mt-6 text-[15px] lg:text-[17px] leading-relaxed text-[#0e1e38]/65 max-w-lg"
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
              {/* Primary — solid dark-blue, premium */}
              <a
                href="https://calendly.com/ma-societe-us/entretien-gratuit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-4 rounded-full text-[15px] font-semibold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #1a3a6a 0%, #2a5090 100%)",
                  boxShadow: "0 4px 24px rgba(42,80,144,0.30), 0 1px 0 rgba(255,255,255,0.12) inset",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(42,80,144,0.42), 0 1px 0 rgba(255,255,255,0.12) inset";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(42,80,144,0.30), 0 1px 0 rgba(255,255,255,0.12) inset";
                }}
              >
                {HERO.cta}
              </a>
              {/* Secondary — text link, no box */}
              <a
                href="/services/pack-llc"
                className="inline-flex items-center gap-1.5 py-4 text-[14px] font-medium text-[#0e1e38]/45 hover:text-[#2a5090] transition-colors duration-200"
              >
                {HERO.ctaSecondary}
                <span className="text-[12px]">→</span>
              </a>
            </motion.div>

            {/* Trust micro */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              className="mt-5 text-[12px] text-[#0e1e38]/45 tracking-wide"
            >
              Gratuit · Sans engagement · Réponse sous 24h
            </motion.p>
          </div>

          {/* Right — Liquid glass stat panel (desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease }}
            className="hidden lg:flex flex-col gap-2 shrink-0"
          >
            {/* Big "0%" — liquid glass on light bg */}
            <div
              className="relative rounded-2xl text-center overflow-hidden"
              style={{
                minWidth: "280px",
                background: "linear-gradient(160deg, rgba(255,255,255,0.85) 0%, rgba(235,244,255,0.70) 100%)",
                backdropFilter: "blur(32px) saturate(1.6)",
                WebkitBackdropFilter: "blur(32px) saturate(1.6)",
                border: "1px solid rgba(255,255,255,0.92)",
                boxShadow: "0 12px 48px rgba(80,120,180,0.14), 0 2px 0 rgba(255,255,255,0.95) inset, 0 -1px 0 rgba(100,140,200,0.08) inset",
                padding: "36px 40px 28px",
              }}
            >
              {/* Chrome top — sharp silver shine */}
              <div
                className="absolute inset-x-0 top-0 h-[1px]"
                style={{
                  background: "linear-gradient(90deg, rgba(180,200,225,0.3), rgba(255,255,255,1) 30%, rgba(255,255,255,1) 50%, rgba(255,255,255,1) 70%, rgba(180,200,225,0.3))",
                }}
              />
              {/* Inner top glow */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% -10%, rgba(255,255,255,0.6) 0%, transparent 55%)",
                }}
              />
              <p
                className="relative text-[88px] xl:text-[108px] font-bold leading-none tracking-[-0.05em] text-[#0e1e38]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                0<span style={{ color: "#4a80b8" }}>%</span>
              </p>
              <p className="relative text-[11px] text-[#0e1e38]/55 mt-3 tracking-[0.18em] uppercase">d&apos;impôts aux USA</p>
              {/* Legal badge */}
              <div
                className="relative mt-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(255,255,255,0.8)",
                  boxShadow: "0 1px 4px rgba(80,120,180,0.08)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#4a80b8]/60" />
                <span className="text-[10px] text-[#0e1e38]/40 tracking-wide">100% légal · Conforme OCDE</span>
              </div>
            </div>

            {/* Micro stats — liquid glass on light */}
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
                    background: "linear-gradient(160deg, rgba(255,255,255,0.75) 0%, rgba(235,244,255,0.55) 100%)",
                    backdropFilter: "blur(20px) saturate(1.4)",
                    WebkitBackdropFilter: "blur(20px) saturate(1.4)",
                    border: "1px solid rgba(255,255,255,0.85)",
                    boxShadow: "0 4px 20px rgba(80,120,180,0.09), 0 1px 0 rgba(255,255,255,0.95) inset",
                  }}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-[1px]"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,1) 50%, transparent)" }}
                  />
                  <p className="text-[22px] font-bold text-[#0e1e38] leading-none" style={{ fontFamily: "var(--font-heading)" }}>{v}</p>
                  <p className="text-[10px] text-[#0e1e38]/50 mt-1 uppercase tracking-[0.15em]">{l}</p>
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
        className="relative z-10"
        style={{ borderTop: "1px solid rgba(26,42,64,0.07)" }}
      >
        <div
          className="px-6 lg:px-16 xl:px-20 py-4 max-w-[1400px] mx-auto flex items-center justify-between"
          style={{ background: "rgba(255,255,255,0.35)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
        >
          <span className="text-[11px] text-[#0e1e38]/25 uppercase tracking-[0.2em]">Juridictions disponibles</span>
          <div className="flex items-center gap-6 sm:gap-10">
            {["Nouveau-Mexique", "Colorado", "Wyoming", "Delaware"].map((state, i) => (
              <div key={state} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full" style={{ background: "#6a9bc0" }} />
                <span className="text-[12px] font-medium text-[#0e1e38]/45">{state}</span>
                {i < 3 && <span className="hidden sm:block w-px h-3 ml-4" style={{ background: "rgba(26,42,64,0.08)" }} />}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </section>
  );
}
