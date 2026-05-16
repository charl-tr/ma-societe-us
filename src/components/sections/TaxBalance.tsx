"use client";

import { useRef } from "react";
import { useInView, motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// --- Geometry constants ---
const PIVOT_X = 300;
const PIVOT_Y = 190;
const ARM_LEN = 155;
const CHAIN_LEN = 68;
const SPREAD = 55;
const PAN_RX = 62;
const PAN_RY = 12;
const MAX_TILT_DEG = 13;

function computeGeo(tiltDeg: number) {
  const a = tiltDeg * (Math.PI / 180);
  const c = Math.cos(a);
  const s = Math.sin(a);
  const lTip = { x: PIVOT_X - ARM_LEN * c, y: PIVOT_Y + ARM_LEN * s };
  const rTip = { x: PIVOT_X + ARM_LEN * c, y: PIVOT_Y - ARM_LEN * s };
  const lPan = { x: lTip.x, y: lTip.y + CHAIN_LEN };
  const rPan = { x: rTip.x, y: rTip.y + CHAIN_LEN };
  return {
    lTip,
    rTip,
    lPan,
    rPan,
    lChains: [
      `M${lTip.x.toFixed(1)} ${lTip.y.toFixed(1)} L${(lPan.x - SPREAD).toFixed(1)} ${lPan.y.toFixed(1)}`,
      `M${lTip.x.toFixed(1)} ${lTip.y.toFixed(1)} L${lPan.x.toFixed(1)} ${lPan.y.toFixed(1)}`,
      `M${lTip.x.toFixed(1)} ${lTip.y.toFixed(1)} L${(lPan.x + SPREAD).toFixed(1)} ${lPan.y.toFixed(1)}`,
    ],
    rChains: [
      `M${rTip.x.toFixed(1)} ${rTip.y.toFixed(1)} L${(rPan.x - SPREAD).toFixed(1)} ${rPan.y.toFixed(1)}`,
      `M${rTip.x.toFixed(1)} ${rTip.y.toFixed(1)} L${rPan.x.toFixed(1)} ${rPan.y.toFixed(1)}`,
      `M${rTip.x.toFixed(1)} ${rTip.y.toFixed(1)} L${(rPan.x + SPREAD).toFixed(1)} ${rPan.y.toFixed(1)}`,
    ],
  };
}

// Pre-compute neutral positions (tilt = 0) — used as SVG initial state
const GEO_0 = computeGeo(0);

const POLE_X = 292;
const POLE_Y_TOP = 30;
const POLE_Y_BOT = 380;
const POLE_W = 16;

export function TaxBalance() {
  const sectionRef = useRef<HTMLElement>(null);
  const inViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inViewRef, { once: false, margin: "-80px" });

  // Refs for imperative SVG updates
  const armRef = useRef<SVGGElement>(null);
  const lPanRef = useRef<SVGGElement>(null);
  const rPanRef = useRef<SVGGElement>(null);
  const lChainRefs = useRef<(SVGPathElement | null)[]>([null, null, null]);
  const rChainRefs = useRef<(SVGPathElement | null)[]>([null, null, null]);

  // Scroll-indexed progress through this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "center 35%"],
  });

  const tiltProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  // Imperative DOM updates on every scroll tick — avoids React re-render overhead
  useMotionValueEvent(tiltProgress, "change", (p) => {
    const deg = p * MAX_TILT_DEG;
    const geo = computeGeo(deg);

    if (armRef.current) {
      armRef.current.style.transform = `rotate(${deg}deg)`;
    }

    if (lPanRef.current) {
      const dx = geo.lPan.x - GEO_0.lPan.x;
      const dy = geo.lPan.y - GEO_0.lPan.y;
      lPanRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
    }

    if (rPanRef.current) {
      const dx = geo.rPan.x - GEO_0.rPan.x;
      const dy = geo.rPan.y - GEO_0.rPan.y;
      rPanRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
    }

    geo.lChains.forEach((d, i) => {
      lChainRefs.current[i]?.setAttribute("d", d);
    });
    geo.rChains.forEach((d, i) => {
      rChainRefs.current[i]?.setAttribute("d", d);
    });
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 px-4"
      style={{
        background: "linear-gradient(180deg, #f8fbff 0%, #edf4fc 100%)",
      }}
    >
      {/* Parallax background orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 560,
            height: 560,
            top: "-8%",
            left: "-12%",
            background:
              "radial-gradient(circle, rgba(29,78,216,0.07) 0%, transparent 70%)",
            filter: "blur(48px)",
            y: bgY,
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 420,
            height: 420,
            bottom: "-10%",
            right: "-8%",
            background:
              "radial-gradient(circle, rgba(14,40,120,0.09) 0%, transparent 70%)",
            filter: "blur(56px)",
            y: bgY,
          }}
        />
      </div>

      {/* Heading */}
      <div ref={inViewRef} className="text-center mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ fontFamily: "var(--font-cormorant)" }}
          className="text-4xl md:text-5xl font-semibold text-[#0e1e3a] leading-tight"
        >
          Pourquoi vous payez trop&nbsp;?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          style={{ fontFamily: "var(--font-body)" }}
          className="mt-3 text-[#4a6280] text-lg"
        >
          Visualisez l&rsquo;écart fiscal en un coup d&rsquo;œil.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          style={{ fontFamily: "var(--font-body)" }}
          className="mt-2 text-sm text-[#8ba0b8] italic"
        >
          Faites défiler — regardez la balance basculer.
        </motion.p>
      </div>

      {/* Scale container */}
      <div className="relative mx-auto" style={{ maxWidth: 600 }}>
        {/* Left floating label — France (heavy side, drops) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          className="absolute pointer-events-none z-10"
          style={{ left: "2%", top: "50%" }}
        >
          <div
            className="text-center"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <div className="text-[11px] font-medium text-[#7a90a8] uppercase tracking-widest mb-0.5">
              SARL / SAS France
            </div>
            <div
              className="font-bold text-[#c0392b] leading-none"
              style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}
            >
              45%
            </div>
            <div className="text-[10px] text-[#7a90a8] mt-0.5">de charges</div>
          </div>
        </motion.div>

        {/* Right floating label — LLC (light side, rises) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          className="absolute pointer-events-none z-10"
          style={{ right: "2%", top: "28%" }}
        >
          <div
            className="text-center"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <div className="text-[11px] font-medium text-[#7a90a8] uppercase tracking-widest mb-0.5">
              LLC USA
            </div>
            <div
              className="font-bold text-[#1d4ed8] leading-none"
              style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}
            >
              0%*
            </div>
            <div className="text-[10px] text-[#7a90a8] mt-0.5">
              impôt fédéral
            </div>
          </div>
        </motion.div>

        {/* SVG Scale — all animation is imperative via refs */}
        <svg
          viewBox="0 0 600 430"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          style={{ filter: "drop-shadow(0 8px 32px rgba(60,100,160,0.13))" }}
        >
          <defs>
            {/* Chrome pole gradient */}
            <linearGradient id="sc-pole" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#d8e4f0" />
              <stop offset="25%" stopColor="#f4f8fc" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="75%" stopColor="#c0d2e8" />
              <stop offset="100%" stopColor="#98b0ca" />
            </linearGradient>

            {/* Chrome arm gradient */}
            <linearGradient id="sc-arm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="50%" stopColor="rgba(200,218,238,0.88)" />
              <stop offset="100%" stopColor="rgba(140,165,195,0.82)" />
            </linearGradient>

            {/* Chrome pan gradients */}
            <radialGradient id="sc-pan-left" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(248,252,255,0.95)" />
              <stop offset="60%" stopColor="rgba(210,228,246,0.85)" />
              <stop offset="100%" stopColor="rgba(158,188,220,0.75)" />
            </radialGradient>
            <radialGradient id="sc-pan-right" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(248,252,255,0.95)" />
              <stop offset="60%" stopColor="rgba(210,228,246,0.85)" />
              <stop offset="100%" stopColor="rgba(158,188,220,0.75)" />
            </radialGradient>

            {/* Glass card gradients */}
            <linearGradient id="sc-glass-l" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.65)" />
              <stop offset="100%" stopColor="rgba(215,232,252,0.45)" />
            </linearGradient>
            <linearGradient id="sc-glass-r" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.65)" />
              <stop offset="100%" stopColor="rgba(215,232,252,0.45)" />
            </linearGradient>

            {/* Pole highlight */}
            <linearGradient id="sc-pole-shine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="40%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>

            {/* Base gradient */}
            <linearGradient id="sc-base" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c8ddf0" />
              <stop offset="50%" stopColor="#e8f2fb" />
              <stop offset="100%" stopColor="#a8c4e0" />
            </linearGradient>

            {/* Drop shadow filter for arm and pans */}
            <filter id="pan-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(30,70,130,0.18)" />
            </filter>
            <filter id="arm-shadow" x="-10%" y="-30%" width="120%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="rgba(30,70,130,0.14)" />
            </filter>
          </defs>

          {/* ── Base ── */}
          <ellipse cx={300} cy={405} rx={80} ry={12} fill="url(#sc-base)" />
          <rect x={288} y={382} width={24} height={24} rx={4} fill="url(#sc-base)" />

          {/* ── Pole ── */}
          <rect
            x={POLE_X}
            y={POLE_Y_TOP}
            width={POLE_W}
            height={POLE_Y_BOT - POLE_Y_TOP - 20}
            rx={7}
            fill="url(#sc-pole)"
          />
          {/* Pole highlight */}
          <rect
            x={POLE_X + 4}
            y={POLE_Y_TOP + 4}
            width={4}
            height={POLE_Y_BOT - POLE_Y_TOP - 28}
            rx={2}
            fill="url(#sc-pole-shine)"
          />
          {/* Pole cap */}
          <ellipse cx={300} cy={POLE_Y_TOP + 8} rx={10} ry={10} fill="#e8f2fb" />
          <ellipse cx={300} cy={POLE_Y_TOP + 8} rx={6} ry={6} fill="#c0d2e8" />

          {/* ── Pivot sphere ── */}
          <circle cx={PIVOT_X} cy={PIVOT_Y} r={14} fill="url(#sc-pole)" />
          <circle cx={PIVOT_X - 3} cy={PIVOT_Y - 3} r={5} fill="rgba(255,255,255,0.7)" />

          {/* ── Arm — imperatively updated via armRef ── */}
          <g
            ref={armRef}
            style={{
              transformOrigin: `${PIVOT_X}px ${PIVOT_Y}px`,
              transform: "rotate(0deg)",
            }}
            filter="url(#arm-shadow)"
          >
            {/* Arm bar */}
            <rect
              x={PIVOT_X - ARM_LEN - 8}
              y={PIVOT_Y - 4.5}
              width={(ARM_LEN + 8) * 2}
              height={9}
              rx={4.5}
              fill="url(#sc-arm)"
            />
            {/* Arm ends */}
            <circle cx={PIVOT_X - ARM_LEN} cy={PIVOT_Y} r={7} fill="url(#sc-arm)" />
            <circle cx={PIVOT_X + ARM_LEN} cy={PIVOT_Y} r={7} fill="url(#sc-arm)" />
          </g>

          {/* ── Chains — imperatively updated via path refs ── */}
          {GEO_0.lChains.map((d, i) => (
            <path
              key={`lc-${i}`}
              ref={(el) => { lChainRefs.current[i] = el; }}
              d={d}
              fill="none"
              stroke="rgba(160,180,210,0.7)"
              strokeWidth={1.2}
            />
          ))}
          {GEO_0.rChains.map((d, i) => (
            <path
              key={`rc-${i}`}
              ref={(el) => { rChainRefs.current[i] = el; }}
              d={d}
              fill="none"
              stroke="rgba(160,180,210,0.7)"
              strokeWidth={1.2}
            />
          ))}

          {/* ── Left pan — imperatively updated via lPanRef ── */}
          {/* Positioned at GEO_0 neutral, transform adjusted imperatively */}
          <g
            ref={lPanRef}
            style={{ transform: "translate(0px, 0px)" }}
            filter="url(#pan-shadow)"
          >
            <ellipse
              cx={GEO_0.lPan.x}
              cy={GEO_0.lPan.y}
              rx={PAN_RX}
              ry={PAN_RY}
              fill="url(#sc-pan-left)"
              stroke="rgba(180,205,235,0.9)"
              strokeWidth={1.5}
            />
            {/* Pan rim highlight */}
            <ellipse
              cx={GEO_0.lPan.x}
              cy={GEO_0.lPan.y - 3}
              rx={PAN_RX - 6}
              ry={PAN_RY - 2}
              fill="none"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth={1}
            />
            {/* Glass card on left pan */}
            <rect
              x={GEO_0.lPan.x - 50}
              y={GEO_0.lPan.y - 24}
              width={100}
              height={42}
              rx={8}
              fill="url(#sc-glass-l)"
              stroke="rgba(180,210,245,0.55)"
              strokeWidth={1}
            />
          </g>

          {/* ── Right pan — imperatively updated via rPanRef ── */}
          <g
            ref={rPanRef}
            style={{ transform: "translate(0px, 0px)" }}
            filter="url(#pan-shadow)"
          >
            <ellipse
              cx={GEO_0.rPan.x}
              cy={GEO_0.rPan.y}
              rx={PAN_RX}
              ry={PAN_RY}
              fill="url(#sc-pan-right)"
              stroke="rgba(180,205,235,0.9)"
              strokeWidth={1.5}
            />
            <ellipse
              cx={GEO_0.rPan.x}
              cy={GEO_0.rPan.y - 3}
              rx={PAN_RX - 6}
              ry={PAN_RY - 2}
              fill="none"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth={1}
            />
            {/* Glass card on right pan */}
            <rect
              x={GEO_0.rPan.x - 50}
              y={GEO_0.rPan.y - 24}
              width={100}
              height={42}
              rx={8}
              fill="url(#sc-glass-r)"
              stroke="rgba(180,210,245,0.55)"
              strokeWidth={1}
            />
          </g>
        </svg>
      </div>

      {/* Bottom stat */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
        className="text-center mt-8"
      >
        <div
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(29,78,216,0.08) 0%, rgba(29,78,216,0.04) 100%)",
            border: "1px solid rgba(29,78,216,0.15)",
          }}
        >
          <span
            className="text-2xl font-bold text-[#1d4ed8]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Jusqu&rsquo;à +45%
          </span>
          <span
            className="text-[#4a6280]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            de revenu net disponible
          </span>
        </div>
        <p
          className="mt-3 text-xs text-[#8ba0b8]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          *La LLC américaine n&rsquo;est pas imposée au niveau fédéral pour les
          non-résidents sans activité sur le sol américain. Résultat variable
          selon votre situation personnelle.
        </p>
      </motion.div>
    </section>
  );
}
