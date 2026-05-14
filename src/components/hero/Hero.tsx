"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HERO } from "@/lib/constants";
import { MagneticButton } from "@/components/ui/MagneticButton";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── LLC Certificate Artifact ─── */
function LLCCertificate() {
  return (
    <div className="relative select-none" style={{ animation: "floatDoc 6s ease-in-out infinite" }}>
      {/* Outer chrome frame */}
      <div
        className="rounded-2xl"
        style={{
          padding: "1.5px",
          background: "linear-gradient(145deg, rgba(255,255,255,0.55) 0%, rgba(180,200,230,0.3) 40%, rgba(255,255,255,0.6) 60%, rgba(160,185,220,0.2) 100%)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        <div
          className="rounded-[14px] relative overflow-hidden"
          style={{
            background: "linear-gradient(145deg, rgba(12,22,48,0.92) 0%, rgba(8,16,36,0.96) 100%)",
            backdropFilter: "blur(40px)",
            width: 340,
            padding: "28px 28px 24px",
          }}
        >
          {/* Top shimmer line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25) 40%, rgba(180,210,255,0.4) 60%, transparent)" }}
          />

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-[9px] uppercase tracking-[0.35em] text-white/25 mb-1">Certificate of Formation</p>
              <p className="text-[11px] text-white/40" style={{ fontFamily: "var(--font-body)" }}>State of Wyoming · LLC</p>
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, rgba(42,80,144,0.3), rgba(42,80,144,0.1))", border: "1px solid rgba(42,80,144,0.3)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="rgba(100,160,255,0.7)" />
              </svg>
            </div>
          </div>

          {/* Company name */}
          <div className="mb-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 mb-1.5">Dénomination sociale</p>
            <p
              className="text-white leading-none"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: 22, letterSpacing: "-0.01em" }}
            >
              Votre Société LLC
            </p>
          </div>

          {/* Fields grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { label: "Juridiction", value: "Wyoming, USA" },
              { label: "Type", value: "Single-Member LLC" },
              { label: "EIN", value: "XX-XXXXXXX" },
              { label: "Date création", value: "J+14 ouvrés" },
            ].map((f) => (
              <div key={f.label} className="rounded-lg p-2.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-[9px] uppercase tracking-[0.18em] text-white/20 mb-1">{f.label}</p>
                <p className="text-[12px] text-white/65" style={{ fontFamily: "var(--font-heading)" }}>{f.value}</p>
              </div>
            ))}
          </div>

          {/* Status badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px rgba(16,185,129,0.8)" }} />
              <span className="text-[10px] text-emerald-400/80 tracking-wide">Actif · En règle</span>
            </div>
            <p className="text-[9px] text-white/15 uppercase tracking-[0.2em]">MSUS-2025</p>
          </div>

          {/* Bottom shimmer */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 50%, transparent)" }}
          />
        </div>
      </div>

      {/* Reflection glow beneath */}
      <div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(42,80,144,0.25) 0%, transparent 70%)", filter: "blur(8px)" }}
      />

      {/* Floating stat pills */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6, ease }}
        className="absolute -right-12 top-8 rounded-xl px-3 py-2"
        style={{ background: "rgba(8,16,36,0.9)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}
      >
        <p className="text-[10px] text-white/30 mb-0.5 tracking-wide">Imposition</p>
        <p className="text-[18px] font-bold text-emerald-400" style={{ fontFamily: "var(--font-heading)" }}>0%</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6, ease }}
        className="absolute -left-10 bottom-12 rounded-xl px-3 py-2"
        style={{ background: "rgba(8,16,36,0.9)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}
      >
        <p className="text-[10px] text-white/30 mb-0.5 tracking-wide">Délai création</p>
        <p className="text-[18px] font-bold text-white/80" style={{ fontFamily: "var(--font-heading)" }}>14j</p>
      </motion.div>
    </div>
  );
}

/* ─── Hero ─── */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  /* Scroll-based content fade */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  /* Lightweight tilt on mouse move — single RAF, no springs */
  useEffect(() => {
    const section = sectionRef.current;
    const tilt = tiltRef.current;
    if (!section || !tilt) return;

    let targetRX = 0, targetRY = 0;
    let currentRX = 0, currentRY = 0;
    let rafId: number;
    let active = false;

    const animate = () => {
      currentRX += (targetRX - currentRX) * 0.06;
      currentRY += (targetRY - currentRY) * 0.06;
      tilt.style.transform = `perspective(800px) rotateX(${currentRX}deg) rotateY(${currentRY}deg)`;
      rafId = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      const { width, height, left, top } = section.getBoundingClientRect();
      const nx = (e.clientX - left) / width;
      const ny = (e.clientY - top) / height;
      targetRY = (nx - 0.5) * 8;
      targetRX = -(ny - 0.5) * 5;
      if (!active) { active = true; rafId = requestAnimationFrame(animate); }
    };

    const onLeave = () => {
      targetRX = 0;
      targetRY = 0;
    };

    section.addEventListener("mousemove", onMove, { passive: true });
    section.addEventListener("mouseleave", onLeave, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh min-h-[700px] flex flex-col overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#060e20]" />

      {/* Static gradient atmosphere — GPU-only, no JS */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 70% 30%, rgba(30,86,160,0.22) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(192,57,43,0.12) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 80% 75%, rgba(42,80,144,0.10) 0%, transparent 60%)",
      }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex-1 flex items-center"
      >
        <div className="w-full px-6 lg:px-16 max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ─── Left: Copy ─── */}
            <div>
              {/* Trust badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.55, ease }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-8"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/90" style={{ boxShadow: "0 0 6px rgba(16,185,129,0.7)" }} />
                <span className="text-[11px] text-white/45">500+ sociétés créées depuis 2014</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.65, ease }}
                className="font-bold text-white leading-[1.06] whitespace-pre-line mb-6"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2.6rem,5vw,62px)",
                  letterSpacing: "-0.025em",
                }}
              >
                {HERO.headline}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.48, duration: 0.6, ease }}
                className="text-[15px] lg:text-[16px] leading-relaxed text-white/45 max-w-sm mb-10"
              >
                {HERO.subline}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.62, duration: 0.55, ease }}
                className="flex flex-col sm:flex-row gap-3 mb-8"
              >
                <MagneticButton
                  href="/contact"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-[14px] font-semibold text-white transition-all"
                  style={{
                    background: "linear-gradient(135deg, #bf3a2a, #922010)",
                    boxShadow: "0 4px 20px rgba(192,57,43,0.38), inset 0 1px 0 rgba(255,255,255,0.12)",
                  } as React.CSSProperties}
                >
                  {HERO.cta}
                </MagneticButton>
                <MagneticButton
                  href="/services/pack-llc"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-[14px] text-white/50 hover:text-white/80 transition-all"
                  style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" } as React.CSSProperties}
                >
                  {HERO.ctaSecondary} →
                </MagneticButton>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-[11px] text-white/20 tracking-wide"
              >
                Gratuit · Sans engagement · Réponse sous 24h
              </motion.p>
            </div>

            {/* ─── Right: Artifact ─── */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease }}
              className="hidden lg:flex items-center justify-center"
            >
              <div ref={tiltRef} className="will-change-transform">
                <LLCCertificate />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        style={{ opacity: contentOpacity }}
        className="relative z-10 flex justify-center pb-6"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5 cursor-pointer"
          onClick={() => document.getElementById("juridictions")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/15">Découvrir</span>
          <div className="w-5 h-8 rounded-full border border-white/[0.1] flex items-start justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="w-[3px] h-2.5 rounded-full bg-white/22"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom states bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6, ease }}
        className="relative z-10 border-t border-white/[0.07]"
        style={{ background: "rgba(6,14,32,0.85)", backdropFilter: "blur(20px)" }}
      >
        <div className="px-6 lg:px-16 py-3.5 flex items-center justify-center gap-6 sm:gap-12">
          {["Nouveau-Mexique", "Colorado", "Wyoming", "Delaware"].map((state, i) => (
            <div key={state} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2a5090]/70" />
              <span className="text-[11px] sm:text-[12px] text-white/40 tracking-wide">{state}</span>
              {i < 3 && <span className="hidden sm:block w-px h-3 bg-white/[0.07] ml-4" />}
            </div>
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes floatDoc {
          0%, 100% { transform: translateY(0px) rotate(0.5deg); }
          50% { transform: translateY(-12px) rotate(-0.5deg); }
        }
      `}</style>
    </section>
  );
}
