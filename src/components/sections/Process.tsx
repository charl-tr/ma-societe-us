"use client";

import { motion } from "framer-motion";
import { OFFER } from "@/lib/constants";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

const ICONS = [
  /* LLC */
  <svg key="llc" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
  </svg>,
  /* Support */
  <svg key="sup" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>,
  /* Bank */
  <svg key="bank" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>,
];

export function Process() {
  return (
    <section
      className="py-[80px] lg:py-[120px]"
      style={{ background: "linear-gradient(160deg, #eef3f9 0%, #e4ecf6 40%, #f2f6fb 100%)" }}
    >
      <div className="px-6 lg:px-10 max-w-[1200px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#0e1e38]/25 mb-4">
            Ce qui est inclus
          </p>
          <h2
            className="text-[clamp(1.5rem,3.5vw,2.4rem)] leading-[1.1] font-bold tracking-[-0.025em] text-[#0e1e38] max-w-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Tout est géré.<br />
            <span
              style={{
                background: "linear-gradient(90deg, #2a5090 0%, #4a80b8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              De A jusqu&rsquo;à Z.
            </span>
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4"
        >
          {OFFER.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="relative rounded-2xl p-7 lg:p-8 flex flex-col transition-all hover:shadow-[0_10px_40px_rgba(80,120,180,0.12)]"
              style={{
                background: "rgba(255,255,255,0.80)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.92)",
                boxShadow: "0 4px 20px rgba(80,120,180,0.07), 0 1px 0 rgba(255,255,255,0.95) inset",
              }}
            >
              {/* Chrome top */}
              <div
                className="absolute inset-x-0 top-0 h-[1px] rounded-t-2xl"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,1) 40%, rgba(255,255,255,1) 60%, transparent)" }}
              />

              {/* Icon */}
              <div
                className="mb-5 w-10 h-10 rounded-xl flex items-center justify-center text-[#2a5090]"
                style={{
                  background: "linear-gradient(135deg, rgba(42,80,144,0.08) 0%, rgba(74,127,212,0.05) 100%)",
                  border: "1px solid rgba(42,80,144,0.10)",
                }}
              >
                {ICONS[i]}
              </div>

              <h3
                className="text-[17px] font-semibold text-[#0e1e38] mb-3 leading-snug tracking-[-0.01em]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {item.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-[#0e1e38]/50 flex-1">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
