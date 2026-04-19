"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Tax model (simplified — for illustration) ─── */
function computeSavings(revenue: number): {
  frenchTax: number;
  llcCost: number;
  saved: number;
  rate: number;
} {
  let frenchRate: number;
  if (revenue < 40_000) frenchRate = 0.30;
  else if (revenue < 80_000) frenchRate = 0.38;
  else if (revenue < 150_000) frenchRate = 0.44;
  else if (revenue < 300_000) frenchRate = 0.49;
  else frenchRate = 0.53;

  const llcRate = revenue < 100_000 ? 0.07 : 0.05;

  const frenchTax = Math.round(revenue * frenchRate);
  const llcCost = Math.round(revenue * llcRate);
  const saved = frenchTax - llcCost;
  const rate = Math.round((saved / revenue) * 100);

  return { frenchTax, llcCost, saved, rate };
}

function fmt(n: number): string {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n);
}

const STEPS = [30_000, 50_000, 75_000, 100_000, 150_000, 200_000, 300_000, 500_000];

export function SavingsEstimator() {
  const [sliderIndex, setSliderIndex] = useState(3);
  const sliderId = useId();

  const revenue = STEPS[sliderIndex];
  const { frenchTax, llcCost, saved, rate } = computeSavings(revenue);

  const frenchPct = Math.round((frenchTax / revenue) * 100);
  const llcPct = Math.round((llcCost / revenue) * 100);

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden bg-[#060e1c]">
      {/* Background layers */}
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Blue mid glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "700px",
          height: "500px",
          background: "radial-gradient(ellipse, rgba(30,70,160,0.18) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(80px)",
        }}
      />
      {/* Red bottom-right accent */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(42,80,144,0.10) 0%, transparent 70%)",
          bottom: "-100px",
          right: "-80px",
          filter: "blur(60px)",
        }}
      />

      <div className="relative px-6 lg:px-10 max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          viewport={{ once: true, margin: "-60px" }}
          className="text-center mb-10 lg:mb-14"
        >
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/25 mb-4">
            Simulateur fiscal
          </p>
          <h2
            className="text-[clamp(1.6rem,3.5vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Votre note fiscale France vs.{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #4a7fd4 0%, #6a9fe4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              votre LLC.
            </span>
          </h2>
          <p className="mt-3 text-[14px] lg:text-[15px] text-white/35 max-w-md mx-auto leading-relaxed">
            Glissez pour voir l&rsquo;écart entre votre charge fiscale actuelle et ce que vous paieriez avec une LLC.
          </p>
        </motion.div>

        {/* Estimator card — glassmorphism on dark */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease }}
          viewport={{ once: true, margin: "-60px" }}
          className="relative rounded-2xl overflow-hidden max-w-3xl mx-auto"
        >
          {/* Chrome top border */}
          <div
            className="h-[1px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.25) 30%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.25) 70%, transparent)",
            }}
          />
          <div
            className="rounded-b-2xl px-7 py-8 lg:px-10 lg:py-10"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderTop: "none",
              boxShadow: "0 8px 48px rgba(0,0,0,0.4), 0 -1px 0 rgba(0,0,0,0.3) inset",
            }}
          >
            {/* Inner top glow */}
            <div
              className="absolute inset-x-0 top-0 h-32 pointer-events-none rounded-t-2xl"
              style={{
                background: "radial-gradient(ellipse at 50% 0%, rgba(74,127,212,0.08) 0%, transparent 70%)",
              }}
            />

            {/* Revenue slider */}
            <div className="relative mb-8">
              <div className="flex items-baseline justify-between mb-3">
                <label
                  htmlFor={sliderId}
                  className="text-[13px] font-medium text-white/40 uppercase tracking-[0.15em]"
                >
                  Chiffre d&rsquo;affaires annuel
                </label>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={revenue}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="text-[22px] lg:text-[26px] font-bold text-white tabular-nums"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {fmt(revenue)}&nbsp;€
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Custom range slider */}
              <div className="relative">
                <input
                  id={sliderId}
                  type="range"
                  min={0}
                  max={STEPS.length - 1}
                  step={1}
                  value={sliderIndex}
                  onChange={(e) => setSliderIndex(Number(e.target.value))}
                  className="w-full appearance-none h-1.5 rounded-full outline-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #4a7fd4 0%, #4a7fd4 ${(sliderIndex / (STEPS.length - 1)) * 100}%, rgba(255,255,255,0.1) ${(sliderIndex / (STEPS.length - 1)) * 100}%, rgba(255,255,255,0.1) 100%)`,
                  }}
                />
                {/* Tick labels */}
                <div className="flex justify-between mt-1.5 px-0.5">
                  {STEPS.map((s, i) => (
                    <span
                      key={s}
                      onClick={() => setSliderIndex(i)}
                      className={`text-[10px] cursor-pointer transition-colors ${
                        i === sliderIndex
                          ? "text-[#4a7fd4] font-semibold"
                          : "text-white/20 hover:text-white/40"
                      }`}
                      style={{ minWidth: "1px" }}
                    >
                      {s >= 1000 ? `${s / 1000}k` : s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Comparison bars */}
            <div className="space-y-4 mb-8">
              {/* France */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[12px] text-white/40 font-medium">
                    Charge fiscale en France (IR + charges sociales)
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`fr-${frenchTax}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-[14px] font-semibold text-[#7a5a50] tabular-nums"
                    >
                      −{fmt(frenchTax)}&nbsp;€ <span className="text-[11px] font-normal opacity-60">({frenchPct}%)</span>
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #7a5a50, #9a7060)" }}
                    animate={{ width: `${frenchPct}%` }}
                    transition={{ duration: 0.5, ease }}
                  />
                </div>
              </div>

              {/* LLC */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[12px] text-white/40 font-medium">
                    Coût total LLC américaine (frais + comptabilité)
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`llc-${llcCost}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-[14px] font-semibold text-[#4a7fd4] tabular-nums"
                    >
                      −{fmt(llcCost)}&nbsp;€ <span className="text-[11px] font-normal opacity-60">({llcPct}%)</span>
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #2a5090, #4a7fd4)" }}
                    animate={{ width: `${llcPct}%` }}
                    transition={{ duration: 0.5, ease }}
                  />
                </div>
              </div>
            </div>

            {/* Savings callout — glass panel */}
            <div
              className="relative rounded-xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(74,127,212,0.12) 0%, rgba(42,80,144,0.08) 100%)",
                border: "1px solid rgba(74,127,212,0.2)",
                boxShadow: "0 0 40px rgba(42,80,144,0.15) inset",
              }}
            >
              {/* Glow top */}
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(74,127,212,0.5) 40%, rgba(100,160,240,0.7) 50%, rgba(74,127,212,0.5) 60%, transparent)",
                }}
              />
              <div>
                <p className="text-[12px] uppercase tracking-[0.2em] text-white/30 mb-0.5">
                  Économie estimée
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={saved}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3, ease }}
                    className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-white tabular-nums leading-none"
                    style={{
                      fontFamily: "var(--font-heading)",
                      textShadow: "0 0 40px rgba(74,127,212,0.4)",
                    }}
                  >
                    +{fmt(saved)}&nbsp;€<span className="text-[16px] font-normal text-white/35">/an</span>
                  </motion.p>
                </AnimatePresence>
                <p className="text-[12px] text-white/30 mt-1">
                  soit {rate}% de votre CA réinvesti dans votre activité
                </p>
              </div>

              <a
                href="https://calendly.com/ma-societe-us/entretien-gratuit"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full text-[13px] font-semibold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #2a5090, #1a3a70)",
                  border: "1px solid rgba(74,127,212,0.3)",
                  boxShadow: "0 4px 20px rgba(42,80,144,0.4)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(42,80,144,0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(42,80,144,0.4)";
                }}
              >
                Valider mon potentiel →
              </a>
            </div>

            {/* Disclaimer */}
            <p className="mt-4 text-[10px] text-white/20 text-center leading-relaxed">
              Estimation indicative. Les économies réelles dépendent de votre situation personnelle, du pays de résidence
              et du mode d&rsquo;exercice. Consultez un expert pour une analyse précise.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Range input global styles */}
      <style jsx global>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #4a7fd4;
          box-shadow: 0 2px 8px rgba(74,127,212,0.4), 0 0 0 0 rgba(74,127,212,0);
          cursor: pointer;
          transition: box-shadow 0.2s;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 6px rgba(74,127,212,0.15), 0 2px 8px rgba(74,127,212,0.4);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #4a7fd4;
          box-shadow: 0 2px 8px rgba(74,127,212,0.4);
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}
