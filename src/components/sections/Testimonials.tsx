"use client";

import { motion } from "framer-motion";
import { TESTIMONIAL } from "@/lib/constants";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Testimonials() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden py-20 lg:py-32"
      style={{
        background: "linear-gradient(180deg, #EDF1F6, #F4F6FA)",
      }}
    >
      {/* Atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.7) 0%, transparent 80%)",
        }}
      />

      <div className="relative px-6 lg:px-10 max-w-[860px] mx-auto">
        {/* Decorative large quotation mark */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-8"
        >
          <span
            className="inline-block select-none leading-none"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(5rem, 10vw, 120px)",
              color: "rgba(42, 80, 144, 0.10)",
              lineHeight: 1,
            }}
          >
            &ldquo;
          </span>
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="text-center font-normal text-[#0f1e40] leading-[1.35]"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(1.5rem, 3.2vw, 36px)",
            letterSpacing: "-0.005em",
          }}
        >
          {TESTIMONIAL.quote}
        </motion.blockquote>

        {/* Author */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.25 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          {/* Avatar */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-medium"
            style={{
              background: "linear-gradient(135deg, rgba(42,80,144,0.12), rgba(42,80,144,0.06))",
              color: "rgba(42,80,144,0.6)",
              border: "1px solid rgba(42,80,144,0.12)",
              fontFamily: "var(--font-heading)",
            }}
          >
            {TESTIMONIAL.author.charAt(0)}
          </div>
          <div className="text-left">
            <p
              className="text-[14px] font-medium text-[#1a2a40]/80"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {TESTIMONIAL.author}
            </p>
            <p className="text-[12px] text-[#1a2a40]/35 mt-0.5">Client MA SOCIETE US</p>
          </div>
        </motion.div>

        {/* Star rating */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.35 }}
          className="mt-6 flex items-center justify-center gap-1"
        >
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-amber-400/80" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
