"use client";

import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ContactPage() {
  return (
    <main>
      {/* ── 1. Hero strip ── */}
      <section
        style={{ backgroundColor: "#060e1c", position: "relative", overflow: "hidden" }}
        className="pt-32 pb-16"
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            pointerEvents: "none",
          }}
        />

        {/* Blue glow top-right */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "520px",
            height: "520px",
            background:
              "radial-gradient(circle, rgba(74,127,212,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="relative px-6 lg:px-10 max-w-5xl">
          {/* Kicker */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="text-[11px] uppercase tracking-[0.25em] text-white/25 mb-5"
          >
            Contact
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.08 }}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              lineHeight: 1.12,
              fontWeight: 700,
              color: "#fff",
              whiteSpace: "pre-line",
            }}
            className="mb-6"
          >
            {"Parlons de votre projet.\nSous 24h, c'est notre engagement."}
          </motion.h1>

          {/* Trust micro */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.18 }}
            className="text-[13px] text-white/20 tracking-wide"
          >
            Gratuit · Sans engagement · Confidentiel
          </motion.p>
        </div>
      </section>

      {/* ── 2. Form + Info section ── */}
      <section
        style={{ backgroundColor: "#0a1628" }}
        className="py-16 lg:py-24"
      >
        <div className="px-6 lg:px-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

            {/* Left — Glass form card */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "20px",
                position: "relative",
                overflow: "hidden",
              }}
              className="p-8 lg:p-10"
            >
              {/* Chrome top shine */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0.08) 70%, transparent 100%)",
                }}
              />

              {/* Card title */}
              <h2
                style={{ fontFamily: "var(--font-heading)" }}
                className="text-white text-[1.4rem] font-bold mb-2"
              >
                Entretien gratuit — 15 min
              </h2>
              <p className="text-white/45 text-[14px] leading-relaxed mb-8">
                Décrivez votre situation en 2 lignes. On vous rappelle sous 24h.
              </p>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                {/* Row: Prénom / Nom */}
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Prénom"
                    className="bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/25 outline-none focus:border-[#4a7fd4]/50 focus:bg-white/[0.08] transition-all w-full text-[14px]"
                  />
                  <input
                    type="text"
                    placeholder="Nom"
                    className="bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/25 outline-none focus:border-[#4a7fd4]/50 focus:bg-white/[0.08] transition-all w-full text-[14px]"
                  />
                </div>

                {/* Email */}
                <input
                  type="email"
                  placeholder="Email professionnel"
                  className="bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/25 outline-none focus:border-[#4a7fd4]/50 focus:bg-white/[0.08] transition-all w-full text-[14px]"
                />

                {/* Phone */}
                <input
                  type="tel"
                  placeholder="Téléphone"
                  className="bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/25 outline-none focus:border-[#4a7fd4]/50 focus:bg-white/[0.08] transition-all w-full text-[14px]"
                />

                {/* Textarea */}
                <textarea
                  rows={3}
                  placeholder="Votre situation en quelques mots (facultatif)"
                  className="bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder:text-white/25 outline-none focus:border-[#4a7fd4]/50 focus:bg-white/[0.08] transition-all w-full text-[14px] resize-none"
                />

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full text-white rounded-full font-semibold px-8 py-4 text-[15px] transition-all inline-flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #1a3a6a 0%, #2a5090 100%)",
                    boxShadow: "0 4px 24px rgba(42,80,144,0.30)",
                  }}
                >
                  Demander mon entretien gratuit
                </button>

                {/* Below button trust */}
                <p className="text-[11px] text-white/25 text-center tracking-wide">
                  Gratuit · Sans engagement · Réponse sous 24h
                </p>
              </form>
            </motion.div>

            {/* Right — Info column */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.12 }}
              className="flex flex-col justify-between"
            >
              <div>
                {/* Kicker */}
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/30 mb-8">
                  Informations
                </p>

                {/* Info blocks */}
                <div className="space-y-8">
                  {/* Siège social */}
                  <div className="flex items-start gap-4">
                    <div
                      className="mt-1 flex-shrink-0 w-[6px] h-[6px] rounded-full"
                      style={{ backgroundColor: "rgba(255,255,255,0.2)", marginTop: "6px" }}
                    />
                    <div>
                      <p className="text-[13px] font-semibold text-white/70 mb-1 uppercase tracking-[0.1em]">
                        Siège social
                      </p>
                      <p className="text-[15px] text-white/40 leading-relaxed">
                        120 Madeira Drive NE STE 220
                        <br />
                        87108 Albuquerque, New Mexico
                        <br />
                        USA
                      </p>
                    </div>
                  </div>

                  {/* Téléphone */}
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-[6px] h-[6px] rounded-full"
                      style={{ backgroundColor: "rgba(255,255,255,0.2)", marginTop: "6px" }}
                    />
                    <div>
                      <p className="text-[13px] font-semibold text-white/70 mb-1 uppercase tracking-[0.1em]">
                        Téléphone
                      </p>
                      <a
                        href="tel:+13025550147"
                        className="text-[15px] text-white/40 hover:text-white/80 transition-colors"
                      >
                        +1 (302) 555-0147
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-[6px] h-[6px] rounded-full"
                      style={{ backgroundColor: "rgba(255,255,255,0.2)", marginTop: "6px" }}
                    />
                    <div>
                      <p className="text-[13px] font-semibold text-white/70 mb-1 uppercase tracking-[0.1em]">
                        Email
                      </p>
                      <a
                        href="mailto:contact@ma-societe-us.com"
                        className="text-[15px] text-white/40 hover:text-white/80 transition-colors"
                      >
                        contact@ma-societe-us.com
                      </a>
                    </div>
                  </div>

                  {/* Délai */}
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-[6px] h-[6px] rounded-full"
                      style={{ backgroundColor: "rgba(255,255,255,0.2)", marginTop: "6px" }}
                    />
                    <div>
                      <p className="text-[13px] font-semibold text-white/70 mb-1 uppercase tracking-[0.1em]">
                        Délai de réponse
                      </p>
                      <p className="text-[15px] text-white/40">
                        Sous 24h en moyenne
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reassurance glass pill */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: 0.28 }}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
                  backdropFilter: "blur(28px)",
                  WebkitBackdropFilter: "blur(28px)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: "40px",
                  position: "relative",
                  overflow: "hidden",
                }}
                className="mt-10 px-6 py-4 inline-flex flex-col"
              >
                {/* Chrome line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
                  }}
                />
                <p className="text-[12px] text-white/30 text-center tracking-wide">
                  500+ entrepreneurs nous font confiance · 10 ans d&apos;expertise
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. CTA strip ── */}
      <section className="bg-white py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="px-6 lg:px-10 max-w-3xl mx-auto text-center"
        >
          <p
            className="text-[#0a1628]/50 text-[13px] uppercase tracking-[0.2em] mb-4"
          >
            Préférez vous un appel direct ?
          </p>
          <a
            href="tel:+13025550147"
            style={{ fontFamily: "var(--font-heading)" }}
            className="text-[clamp(1.6rem,4vw,2.4rem)] font-bold text-[#0a1628] hover:text-[#2a5090] transition-colors"
          >
            +1 (302) 555-0147
          </a>
        </motion.div>
      </section>
    </main>
  );
}
