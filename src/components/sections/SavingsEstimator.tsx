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
  // French effective rate: IR + charges sociales (TNS/freelance)
  // Progressive approximation
  let frenchRate: number;
  if (revenue < 40_000) frenchRate = 0.30;
  else if (revenue < 80_000) frenchRate = 0.38;
  else if (revenue < 150_000) frenchRate = 0.44;
  else if (revenue < 300_000) frenchRate = 0.49;
  else frenchRate = 0.53;

  // LLC effective cost: agent fee + accounting + CPA (~4-8% depending on size)
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
  const [sliderIndex, setSliderIndex] = useState(3); // 100K default
  const sliderId = useId();

  const revenue = STEPS[sliderIndex];
  const { frenchTax, llcCost, saved, rate } = computeSavings(revenue);

  const frenchPct = Math.round((frenchTax / revenue) * 100);
  const llcPct = Math.round((llcCost / revenue) * 100);

  return (
    <section className="py-14 lg:py-20 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #f0f4fa 0%, #e8eef6 40%, #edf1f6 100%)",
        }}
      />
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1a2a40 1px, transparent 1px)",
          backgroundSize: "28px 28px",
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
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#2a5090]/50 mb-4">
            Simulateur
          </p>
          <h2
            className="text-[clamp(1.6rem,3.5vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#1a2a40]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Combien pourriez-vous économiser&nbsp;?
          </h2>
          <p className="mt-3 text-[14px] lg:text-[15px] text-[#1a2a40]/45 max-w-md mx-auto leading-relaxed">
            Glissez pour voir l&rsquo;écart entre votre charge fiscale actuelle et ce que vous paieriez avec une LLC.
          </p>
        </motion.div>

        {/* Estimator card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease }}
          viewport={{ once: true, margin: "-60px" }}
          className="relative rounded-2xl overflow-hidden max-w-3xl mx-auto"
        >
          {/* Chrome top border */}
          <div
            className="h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(200,210,225,0.2), rgba(255,255,255,0.9) 30%, rgba(220,230,245,0.5) 50%, rgba(255,255,255,0.9) 70%, rgba(200,210,225,0.2))",
            }}
          />
          <div className="bg-white/60 backdrop-blur-2xl border border-white/70 border-t-0 rounded-b-2xl px-7 py-8 lg:px-10 lg:py-10 shadow-[0_8px_40px_rgba(0,40,104,0.07)]">
            {/* Revenue slider */}
            <div className="mb-8">
              <div className="flex items-baseline justify-between mb-3">
                <label
                  htmlFor={sliderId}
                  className="text-[13px] font-medium text-[#1a2a40]/55 uppercase tracking-[0.15em]"
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
                    className="text-[22px] lg:text-[26px] font-bold text-[#1a2a40] tabular-nums"
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
                    background: `linear-gradient(to right, #2a5090 0%, #2a5090 ${(sliderIndex / (STEPS.length - 1)) * 100}%, rgba(26,42,64,0.12) ${(sliderIndex / (STEPS.length - 1)) * 100}%, rgba(26,42,64,0.12) 100%)`,
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
                          ? "text-[#2a5090] font-semibold"
                          : "text-[#1a2a40]/25 hover:text-[#1a2a40]/50"
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
                  <span className="text-[12px] text-[#1a2a40]/50 font-medium">
                    Charge fiscale en France (IR + charges sociales)
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`fr-${frenchTax}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-[14px] font-semibold text-[#c0392b] tabular-nums"
                    >
                      −{fmt(frenchTax)}&nbsp;€ <span className="text-[11px] font-normal opacity-60">({frenchPct}%)</span>
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="h-2 rounded-full bg-[#1a2a40]/[0.07] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #c0392b, #e05040)" }}
                    animate={{ width: `${frenchPct}%` }}
                    transition={{ duration: 0.5, ease }}
                  />
                </div>
              </div>

              {/* LLC */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[12px] text-[#1a2a40]/50 font-medium">
                    Coût total LLC américaine (frais + comptabilité)
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`llc-${llcCost}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-[14px] font-semibold text-[#2a5090] tabular-nums"
                    >
                      −{fmt(llcCost)}&nbsp;€ <span className="text-[11px] font-normal opacity-60">({llcPct}%)</span>
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="h-2 rounded-full bg-[#1a2a40]/[0.07] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #2a5090, #4a7fd4)" }}
                    animate={{ width: `${llcPct}%` }}
                    transition={{ duration: 0.5, ease }}
                  />
                </div>
              </div>
            </div>

            {/* Savings callout */}
            <div
              className="rounded-xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
              style={{
                background:
                  "linear-gradient(135deg, rgba(42,80,144,0.06) 0%, rgba(42,80,144,0.03) 100%)",
                border: "1px solid rgba(42,80,144,0.12)",
              }}
            >
              <div>
                <p className="text-[12px] uppercase tracking-[0.2em] text-[#2a5090]/50 mb-0.5">
                  Économie estimée
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={saved}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3, ease }}
                    className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-[#1a2a40] tabular-nums leading-none"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    +{fmt(saved)}&nbsp;€<span className="text-[16px] font-normal text-[#1a2a40]/35">/an</span>
                  </motion.p>
                </AnimatePresence>
                <p className="text-[12px] text-[#1a2a40]/35 mt-1">
                  soit {rate}% de votre CA réinvesti dans votre activité
                </p>
              </div>

              <a
                href="/contact"
                className="shrink-0 w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full text-[13px] font-semibold bg-[#0a1628] text-white hover:bg-[#1a2a40] transition-all shadow-[0_4px_16px_rgba(10,22,40,0.18)] hover:shadow-[0_8px_24px_rgba(10,22,40,0.22)]"
              >
                Valider mon potentiel →
              </a>
            </div>

            {/* Disclaimer */}
            <p className="mt-4 text-[10px] text-[#1a2a40]/25 text-center leading-relaxed">
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
          border: 2px solid #2a5090;
          box-shadow: 0 2px 8px rgba(42,80,144,0.25);
          cursor: pointer;
          transition: box-shadow 0.2s;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 6px rgba(42,80,144,0.12), 0 2px 8px rgba(42,80,144,0.25);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #2a5090;
          box-shadow: 0 2px 8px rgba(42,80,144,0.25);
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}
