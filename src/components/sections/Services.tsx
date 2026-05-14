"use client";

import { motion } from "framer-motion";
import { INTRO, ADVANTAGES } from "@/lib/constants";

// Framer Motion 12 requires tuple literal for cubic-bezier ease
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const pillContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

const pillVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASE },
  },
};

const introVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

export function Services() {
  return (
    <div className="bg-[#FAFAF9]">
      {/* Intro section */}
      <section className="py-[100px] lg:py-[140px]">
        <div className="px-6 lg:px-10">
          <motion.div
            className="flex gap-8 max-w-4xl"
            variants={introVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Decorative vertical line */}
            <div className="hidden lg:block flex-shrink-0 w-px bg-gradient-to-b from-[#2a5090]/50 via-[#2a5090]/20 to-transparent self-stretch" />

            <div>
              <h2
                className="leading-[1.12] font-normal tracking-tight text-[#1a2a40]"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(2.2rem, 4.5vw, 52px)",
                }}
              >
                {INTRO.headline}
              </h2>
              <p className="mt-10 text-[17px] leading-relaxed text-[#1a2a40]/55 max-w-2xl">
                {INTRO.body}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Advantages section */}
      <section id="offre" className="pb-[100px] lg:pb-[140px]">
        <div className="px-6 lg:px-10">
          <p className="text-[13px] uppercase tracking-[0.15em] text-[#2a5090]/40 mb-10">
            Avantages à créer une LLC
          </p>

          <motion.div
            className="flex flex-wrap gap-3"
            variants={pillContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {ADVANTAGES.map((adv) => (
              <motion.span
                key={adv}
                variants={pillVariants}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-sm border border-white/70 text-[15px] text-[#1a2a40]/70 hover:bg-white/85 hover:border-[#2a5090]/20 transition-colors duration-250 cursor-default shadow-[0_2px_8px_rgba(0,40,104,0.04)]"
              >
                {/* Blue dot indicator */}
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#2a5090]/50" />

                {/* Checkmark icon */}
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  aria-hidden="true"
                  className="flex-shrink-0 text-[#2a5090]/60"
                >
                  <path
                    d="M2 6.5L5.2 9.5L11 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {adv}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
