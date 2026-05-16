"use client";

import { useRef, useState, useEffect } from "react";
import { useInView, motion, useScroll, useTransform, animate } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const FRANCE_RATE = 0.45;
const LLC_RATE = 0.12;
const MAX_REVENUE = 500000;

function formatRevenue(n: number): string {
  return (
    Math.round(n)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €/an"
  );
}

// Animated counter component
function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const prevValue = useRef(value);

  useEffect(() => {
    const from = prevValue.current;
    prevValue.current = value;

    const controls = animate(from, value, {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });

    return controls.stop;
  }, [value]);

  return (
    <span>
      {display
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
    </span>
  );
}

export function SavingsCalculator() {
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [revenue, setRevenue] = useState(150000);

  const franceTax = revenue * FRANCE_RATE;
  const llcTax = revenue * LLC_RATE;
  const savings = revenue * (FRANCE_RATE - LLC_RATE);

  // Bar heights scale with revenue — both bars animate with slider AND on entrance
  const maxBarH = 260;
  const franceBarH = isInView ? Math.round((revenue / MAX_REVENUE) * maxBarH) : 0;
  const llcBarH = isInView
    ? Math.round(((revenue * LLC_RATE) / (MAX_REVENUE * FRANCE_RATE)) * maxBarH)
    : 0;

  // Savings tooltip value (shows above slider thumb)
  const savingsFormatted = Math.round(savings)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  // Section scroll parallax for background orbs
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  // Slider thumb position percentage
  const sliderPct = ((revenue - 50000) / (500000 - 50000)) * 100;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 px-4"
      style={{ background: "#060e20" }}
    >
      {/* Background orbs with parallax */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            top: "-10%",
            left: "-15%",
            background:
              "radial-gradient(circle, rgba(29,78,216,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
            y: bgY,
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            bottom: "-10%",
            right: "-10%",
            background:
              "radial-gradient(circle, rgba(14,40,120,0.18) 0%, transparent 70%)",
            filter: "blur(60px)",
            y: bgY,
          }}
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: EASE }}
          className="text-center mb-12"
        >
          <h2
            style={{ fontFamily: "var(--font-cormorant)" }}
            className="text-4xl md:text-5xl font-semibold text-white leading-tight"
          >
            Calculez vos économies fiscales
          </h2>
          <p
            style={{ fontFamily: "var(--font-body)" }}
            className="mt-3 text-[#7ca0cc] text-lg"
          >
            Ajustez votre revenu annuel et visualisez l&rsquo;écart en temps réel.
          </p>
        </motion.div>

        {/* Revenue slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-3">
            <span
              style={{ fontFamily: "var(--font-body)" }}
              className="text-sm text-[#5a7a9c] uppercase tracking-wider"
            >
              Revenu annuel
            </span>
            <span
              style={{ fontFamily: "var(--font-heading)" }}
              className="text-2xl font-semibold text-white"
            >
              {formatRevenue(revenue)}
            </span>
          </div>

          {/* Custom styled slider */}
          <div className="relative h-2 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div
              className="absolute top-0 left-0 h-full rounded-full"
              style={{
                width: `${sliderPct}%`,
                background: "linear-gradient(90deg, #0e2878, #1d4ed8)",
                transition: "width 0.1s",
              }}
            />
            <input
              type="range"
              min={50000}
              max={500000}
              step={10000}
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
              style={{ margin: 0 }}
            />
            {/* Savings tooltip above thumb */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: `calc(${sliderPct}% - 10px)`,
                bottom: "calc(100% + 10px)",
                transition: "left 0.1s",
              }}
            >
              <div
                className="relative px-2 py-1 rounded-lg text-xs font-semibold text-white whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-heading)",
                  background: "rgba(29,78,216,0.85)",
                  border: "1px solid rgba(29,78,216,0.5)",
                  boxShadow: "0 2px 8px rgba(29,78,216,0.3)",
                }}
              >
                Économie&nbsp;: {savingsFormatted}&nbsp;€
                {/* Tooltip caret */}
                <span
                  className="absolute"
                  style={{
                    bottom: -5,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "5px solid transparent",
                    borderRight: "5px solid transparent",
                    borderTop: "5px solid rgba(29,78,216,0.85)",
                  }}
                />
              </div>
            </div>
            {/* Thumb indicator */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-[#1d4ed8] bg-white shadow-lg"
              style={{
                left: `calc(${sliderPct}% - 10px)`,
                transition: "left 0.1s",
                boxShadow: "0 0 0 4px rgba(29,78,216,0.2)",
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span style={{ fontFamily: "var(--font-body)" }} className="text-xs text-[#3a5a7c]">50&nbsp;000&nbsp;€</span>
            <span style={{ fontFamily: "var(--font-body)" }} className="text-xs text-[#3a5a7c]">500&nbsp;000&nbsp;€</span>
          </div>
        </motion.div>

        {/* Comparison bars */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          className="grid grid-cols-2 gap-6 mb-12"
        >
          {/* France bar */}
          <div className="flex flex-col items-center">
            <div
              className="w-full rounded-t-xl overflow-hidden relative"
              style={{ height: maxBarH, display: "flex", alignItems: "flex-end" }}
            >
              {/* Background track */}
              <div
                className="absolute inset-0 rounded-t-xl"
                style={{ background: "rgba(255,255,255,0.04)" }}
              />
              {/* Gap indicator bracket (top of LLC bar to top of France bar) */}
              <motion.div
                className="relative w-full rounded-t-xl"
                initial={{ height: 0 }}
                animate={{ height: franceBarH }}
                transition={{ duration: 0.6, ease: EASE }}
                style={{
                  background: "linear-gradient(180deg, #8b1a1a 0%, #c0392b 100%)",
                  boxShadow: "0 0 32px rgba(192,57,43,0.35) inset",
                }}
              >
                {/* Sheen */}
                <div
                  className="absolute inset-0 rounded-t-xl"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)",
                  }}
                />
                {/* Amount on bar */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      style={{ fontFamily: "var(--font-heading)" }}
                      className="text-white font-bold text-xl"
                    >
                      <AnimatedNumber value={Math.round(franceTax)} />
                      <span className="text-sm ml-1">€</span>
                    </div>
                    <div
                      style={{ fontFamily: "var(--font-body)" }}
                      className="text-red-200 text-xs mt-0.5"
                    >
                      {Math.round(FRANCE_RATE * 100)}%
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div
              className="mt-3 text-center px-2 py-1.5 rounded-lg"
              style={{ background: "rgba(192,57,43,0.12)" }}
            >
              <span
                style={{ fontFamily: "var(--font-body)" }}
                className="text-[#f87171] text-sm font-medium"
              >
                Charges &amp; impôts
              </span>
              <div
                style={{ fontFamily: "var(--font-body)" }}
                className="text-[#7a90a8] text-xs"
              >
                SARL / SAS France
              </div>
            </div>
          </div>

          {/* LLC bar */}
          <div className="flex flex-col items-center">
            <div
              className="w-full rounded-t-xl overflow-hidden relative"
              style={{ height: maxBarH, display: "flex", alignItems: "flex-end" }}
            >
              <div
                className="absolute inset-0 rounded-t-xl"
                style={{ background: "rgba(255,255,255,0.04)" }}
              />
              {/* Gap indicator — dotted line from LLC bar top to France bar top */}
              {franceBarH > llcBarH && (
                <div
                  className="absolute pointer-events-none z-10"
                  style={{
                    bottom: llcBarH,
                    left: 0,
                    right: 0,
                  }}
                >
                  {/* Dotted horizontal bracket line */}
                  <div
                    style={{
                      borderTop: "2px dashed rgba(100,200,100,0.45)",
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    {/* "Économies" label */}
                    <span
                      className="absolute text-[10px] font-semibold text-green-400 whitespace-nowrap"
                      style={{
                        fontFamily: "var(--font-heading)",
                        top: -18,
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "rgba(6,14,32,0.7)",
                        padding: "1px 5px",
                        borderRadius: 4,
                      }}
                    >
                      ↑ Économies
                    </span>
                  </div>
                </div>
              )}
              <motion.div
                className="relative w-full rounded-t-xl"
                initial={{ height: 0 }}
                animate={{ height: llcBarH }}
                transition={{ duration: 0.6, ease: EASE }}
                style={{
                  background: "linear-gradient(180deg, #0e2878 0%, #1d4ed8 100%)",
                  boxShadow: "0 0 32px rgba(29,78,216,0.35) inset",
                }}
              >
                <div
                  className="absolute inset-0 rounded-t-xl"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      style={{ fontFamily: "var(--font-heading)" }}
                      className="text-white font-bold text-xl"
                    >
                      <AnimatedNumber value={Math.round(llcTax)} />
                      <span className="text-sm ml-1">€</span>
                    </div>
                    <div
                      style={{ fontFamily: "var(--font-body)" }}
                      className="text-blue-200 text-xs mt-0.5"
                    >
                      {Math.round(LLC_RATE * 100)}%
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div
              className="mt-3 text-center px-2 py-1.5 rounded-lg"
              style={{ background: "rgba(29,78,216,0.12)" }}
            >
              <span
                style={{ fontFamily: "var(--font-body)" }}
                className="text-[#60a5fa] text-sm font-medium"
              >
                Optimisation LLC
              </span>
              <div
                style={{ fontFamily: "var(--font-body)" }}
                className="text-[#7a90a8] text-xs"
              >
                LLC USA (non-résident)
              </div>
            </div>
          </div>
        </motion.div>

        {/* Savings highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
          className="relative rounded-2xl p-8 text-center mb-8 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(14,40,120,0.55) 0%, rgba(29,78,216,0.25) 100%)",
            border: "1px solid rgba(29,78,216,0.35)",
            boxShadow: "0 0 60px rgba(29,78,216,0.15)",
          }}
        >
          {/* Glow */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(29,78,216,0.22) 0%, transparent 70%)",
            }}
          />
          <div className="relative" style={{ fontFamily: "var(--font-body)" }}>
            <p className="text-[#7ca0cc] text-sm uppercase tracking-widest mb-2">
              Vous économiseriez
            </p>
            <div
              className="text-5xl md:text-6xl font-bold text-white mb-1"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <AnimatedNumber value={Math.round(savings)} />
              <span className="text-3xl ml-2 text-blue-300">€/an</span>
            </div>
            <p className="text-[#5a80b0] text-sm mt-2">
              soit{" "}
              <span className="text-white font-semibold">
                <AnimatedNumber value={Math.round(savings / 12)} />
                &nbsp;€/mois
              </span>{" "}
              de plus dans votre poche
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
          className="text-center"
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5"
            style={{
              fontFamily: "var(--font-heading)",
              background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
              boxShadow: "0 4px 24px rgba(29,78,216,0.4)",
            }}
          >
            Calculer ma situation exacte
            <span className="text-lg" aria-hidden="true">→</span>
          </a>
          <p
            style={{ fontFamily: "var(--font-body)" }}
            className="mt-3 text-xs text-[#3a5a7c]"
          >
            Simulation indicative — résultats variables selon votre situation
            personnelle.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
