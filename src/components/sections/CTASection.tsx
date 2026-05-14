"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* Subtle parallax: background image drifts slower than scroll */
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative min-h-[55vh] flex items-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image
          src="/nyc-building.jpg"
          alt=""
          fill
          className="object-cover scale-[1.12]"
          quality={85}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/92 via-[#0a1628]/76 to-[#0a1628]/40" />

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
          className="leading-[1.08] font-normal text-white"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2rem,4.5vw,52px)",
            letterSpacing: "-0.01em",
          }}
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
          <MagneticButton
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full text-[14px] font-semibold transition-all bg-[#002868] text-white shadow-[0_4px_20px_rgba(0,40,104,0.4)] hover:shadow-[0_8px_32px_rgba(0,40,104,0.55)] border border-white/10 hover:bg-[#1a3a78]"
          >
            Réserver mon créneau gratuit →
          </MagneticButton>
          <span className="text-[13px] text-white/25 self-center">
            Réponse sous 24h
          </span>
        </motion.div>
      </div>
    </section>
  );
}
