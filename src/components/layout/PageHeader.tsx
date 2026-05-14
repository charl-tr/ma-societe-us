"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function PageHeader({ title, subtitle, eyebrow }: PageHeaderProps) {
  return (
    <section className="noise relative pt-32 lg:pt-44 pb-20 lg:pb-28 overflow-hidden">
      {/* Dark atmospheric background — echoes the Hero */}
      <div className="absolute inset-0 bg-[#070f1e]" />

      {/* Gradient orbs */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full blur-[110px] opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #1e56a0 0%, transparent 70%)",
          top: "-30%",
          right: "-10%",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-12 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #c0392b 0%, transparent 70%)",
          bottom: "-20%",
          left: "5%",
        }}
      />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(250,250,249,0.08))",
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-6 lg:px-10 max-w-[1200px] mx-auto">
        {/* Eyebrow / category */}
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-[11px] uppercase tracking-[0.3em] text-white/28 mb-5"
          >
            {eyebrow}
          </motion.p>
        )}

        {/* Main title — Cormorant Garamond, editorial */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease, delay: eyebrow ? 0.1 : 0 }}
          className="font-normal text-white max-w-3xl leading-[1.06]"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.4rem,5vw,62px)",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.18 }}
            className="mt-6 text-[15px] lg:text-[16px] text-white/40 max-w-lg leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Thin chrome rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.25 }}
          className="mt-10 h-px max-w-[120px] origin-left"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.35), transparent)",
          }}
        />
      </div>
    </section>
  );
}
