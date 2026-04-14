"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function CTASection() {
  return (
    <section className="relative min-h-[55vh] flex items-center overflow-hidden">
      <Image
        src="/nyc-building.jpg"
        alt=""
        fill
        className="object-cover"
        quality={85}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/75 to-[#0a1628]/40" />

      <div className="relative z-10 px-6 lg:px-10 py-[60px] lg:py-[80px] max-w-2xl">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease }}
          viewport={{ once: true }}
          className="text-[11px] uppercase tracking-[0.25em] text-white/35 mb-5"
        >
          Prêt ?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease }}
          viewport={{ once: true }}
          className="text-[clamp(1.8rem,4vw,44px)] leading-[1.1] font-bold tracking-tight text-white"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          15 minutes pour changer
          <br />
          votre fiscalité.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease }}
          viewport={{ once: true }}
          className="mt-5 text-[15px] text-white/50 leading-relaxed"
        >
          Entretien gratuit, sans engagement. On analyse votre situation
          et on vous dit si une LLC fait sens pour vous — honnêtement.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5, ease }}
          viewport={{ once: true }}
          className="mt-8 flex flex-col sm:flex-row items-start gap-4"
        >
          <a
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full text-[14px] font-semibold transition-all bg-[#002868] text-white shadow-[0_4px_20px_rgba(0,40,104,0.4)] hover:shadow-[0_8px_24px_rgba(0,40,104,0.5)] border border-white/10"
          >
            Réserver mon créneau gratuit →
          </a>
          <span className="text-[13px] text-white/25 self-center">
            Réponse sous 24h
          </span>
        </motion.div>
      </div>
    </section>
  );
}
