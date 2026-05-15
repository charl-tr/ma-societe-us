"use client";

import { useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// --- Geometry constants ---
const PIVOT_X = 300;
const PIVOT_Y = 195;
const ARM_LENGTH = 155;
const CHAIN_LENGTH = 65;
const PAN_RX = 60;
const PAN_RY = 10;

const DEG = Math.PI / 180;
const TILT = 13 * DEG;

function computeGeometry(tilted: boolean) {
  const angle = tilted ? TILT : 0;
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);

  const leftTip = {
    x: PIVOT_X - ARM_LENGTH * cosA,
    y: PIVOT_Y + ARM_LENGTH * sinA,
  };
  const rightTip = {
    x: PIVOT_X + ARM_LENGTH * cosA,
    y: PIVOT_Y - ARM_LENGTH * sinA,
  };

  const leftPan = { x: leftTip.x, y: leftTip.y + CHAIN_LENGTH };
  const rightPan = { x: rightTip.x, y: rightTip.y + CHAIN_LENGTH };

  // 3 chains per side: left spread, center, right spread
  const spread = 60;
  const leftChains = [
    { from: leftTip, to: { x: leftPan.x - spread, y: leftPan.y } },
    { from: leftTip, to: { x: leftPan.x, y: leftPan.y } },
    { from: leftTip, to: { x: leftPan.x + spread, y: leftPan.y } },
  ];
  const rightChains = [
    { from: rightTip, to: { x: rightPan.x - spread, y: rightPan.y } },
    { from: rightTip, to: { x: rightPan.x, y: rightPan.y } },
    { from: rightTip, to: { x: rightPan.x + spread, y: rightPan.y } },
  ];

  return { leftTip, rightTip, leftPan, rightPan, leftChains, rightChains };
}

export function TaxBalance() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [tilted] = useState(false);

  const triggered = isInView;
  const geo = computeGeometry(triggered);

  const POLE_X = 292;
  const POLE_Y_TOP = 30;
  const POLE_Y_BOT = 380;
  const POLE_W = 16;

  const ARM_ROTATE = triggered ? 13 : 0;

  const transition = {
    duration: 1.2,
    ease: EASE,
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 px-4"
      style={{
        background: "linear-gradient(180deg, #f8fbff 0%, #edf4fc 100%)",
      }}
    >
      {/* Heading */}
      <div className="text-center mb-10">
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
      </div>

      {/* Scale container — relative so labels can be positioned */}
      <div className="relative mx-auto" style={{ maxWidth: 600 }}>
        {/* Left floating label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          className="absolute pointer-events-none z-10"
          style={{ left: "2%", top: "48%" }}
        >
          <div
            className="text-center"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <div className="text-[11px] font-medium text-[#7a90a8] uppercase tracking-widest mb-0.5">
              SARL / SAS France
            </div>
            <div className="text-4xl font-bold text-[#c0392b] leading-none">
              45%
            </div>
            <div className="text-[10px] text-[#7a90a8] mt-0.5">de charges</div>
          </div>
        </motion.div>

        {/* Right floating label */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          className="absolute pointer-events-none z-10"
          style={{ right: "2%", top: "35%" }}
        >
          <div
            className="text-center"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <div className="text-[11px] font-medium text-[#7a90a8] uppercase tracking-widest mb-0.5">
              LLC USA
            </div>
            <div className="text-4xl font-bold text-[#1d4ed8] leading-none">
              0%*
            </div>
            <div className="text-[10px] text-[#7a90a8] mt-0.5">
              impôt fédéral
            </div>
          </div>
        </motion.div>

        {/* SVG Scale */}
        <svg
          viewBox="0 0 600 420"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          style={{ filter: "drop-shadow(0 8px 32px rgba(60,100,160,0.13))" }}
        >
          <defs>
            {/* Chrome pole gradient */}
            <linearGradient
              id="sc-pole"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="#d8e4f0" />
              <stop offset="25%" stopColor="#f4f8fc" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="75%" stopColor="#c0d2e8" />
              <stop offset="100%" stopColor="#98b0ca" />
            </linearGradient>

            {/* Chrome arm gradient */}
            <linearGradient
              id="sc-arm"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="50%" stopColor="rgba(200,218,238,0.88)" />
              <stop offset="100%" stopColor="rgba(140,165,195,0.82)" />
            </linearGradient>

            {/* Chrome pan gradient */}
            <radialGradient
              id="sc-pan-left"
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop offset="0%" stopColor="rgba(248,252,255,0.95)" />
              <stop offset="60%" stopColor="rgba(210,228,246,0.85)" />
              <stop offset="100%" stopColor="rgba(158,188,220,0.75)" />
            </radialGradient>
            <radialGradient
              id="sc-pan-right"
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop offset="0%" stopColor="rgba(248,252,255,0.95)" />
              <stop offset="60%" stopColor="rgba(210,228,246,0.85)" />
              <stop offset="100%" stopColor="rgba(158,188,220,0.75)" />
            </radialGradient>

            {/* Glass card gradient */}
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

            <filter id="pan-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(30,70,130,0.18)" />
            </filter>
          </defs>

          {/* ── Base ── */}
          <ellipse cx={300} cy={395} rx={80} ry={12} fill="url(#sc-base)" />
          <rect
            x={288}
            y={372}
            width={24}
            height={24}
            rx={4}
            fill="url(#sc-base)"
          />

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

          {/* ── Arm (rotates around pivot) ── */}
          <g
            style={{
              transformOrigin: `${PIVOT_X}px ${PIVOT_Y}px`,
              transform: `rotate(${ARM_ROTATE}deg)`,
              transition: `transform 1.2s cubic-bezier(0.22,1,0.36,1)`,
            }}
          >
            {/* Arm bar */}
            <rect
              x={PIVOT_X - ARM_LENGTH - 8}
              y={PIVOT_Y - 4.5}
              width={(ARM_LENGTH + 8) * 2}
              height={9}
              rx={4.5}
              fill="url(#sc-arm)"
            />
            {/* Arm ends */}
            <circle cx={PIVOT_X - ARM_LENGTH} cy={PIVOT_Y} r={7} fill="url(#sc-arm)" />
            <circle cx={PIVOT_X + ARM_LENGTH} cy={PIVOT_Y} r={7} fill="url(#sc-arm)" />
          </g>

          {/* ── Chains — animated via absolute coords ── */}
          <g
            style={{
              transition: `all 1.2s cubic-bezier(0.22,1,0.36,1)`,
            }}
          >
            {geo.leftChains.map((c, i) => (
              <line
                key={`lc-${i}`}
                x1={c.from.x}
                y1={c.from.y}
                x2={c.to.x}
                y2={c.to.y}
                stroke="rgba(160,180,210,0.7)"
                strokeWidth={1.2}
                style={{
                  transition: `all 1.2s cubic-bezier(0.22,1,0.36,1)`,
                }}
              />
            ))}
            {geo.rightChains.map((c, i) => (
              <line
                key={`rc-${i}`}
                x1={c.from.x}
                y1={c.from.y}
                x2={c.to.x}
                y2={c.to.y}
                stroke="rgba(160,180,210,0.7)"
                strokeWidth={1.2}
                style={{
                  transition: `all 1.2s cubic-bezier(0.22,1,0.36,1)`,
                }}
              />
            ))}
          </g>

          {/* ── Left pan ── */}
          <g
            style={{
              transition: `all 1.2s cubic-bezier(0.22,1,0.36,1)`,
              transform: `translate(${geo.leftPan.x - 145}px, ${geo.leftPan.y - 260}px)`,
            }}
            filter="url(#pan-shadow)"
          >
            {/* Pan ellipse body */}
            <ellipse
              cx={145}
              cy={260}
              rx={PAN_RX}
              ry={PAN_RY}
              fill="url(#sc-pan-left)"
              stroke="rgba(180,205,235,0.9)"
              strokeWidth={1.5}
            />
            {/* Pan rim highlight */}
            <ellipse
              cx={145}
              cy={257}
              rx={PAN_RX - 6}
              ry={PAN_RY - 2}
              fill="none"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth={1}
            />
            {/* Glass card on left pan */}
            <rect
              x={95}
              y={236}
              width={100}
              height={42}
              rx={8}
              fill="url(#sc-glass-l)"
              stroke="rgba(180,210,245,0.55)"
              strokeWidth={1}
            />
          </g>

          {/* ── Right pan ── */}
          <g
            style={{
              transition: `all 1.2s cubic-bezier(0.22,1,0.36,1)`,
              transform: `translate(${geo.rightPan.x - 455}px, ${geo.rightPan.y - 260}px)`,
            }}
            filter="url(#pan-shadow)"
          >
            <ellipse
              cx={455}
              cy={260}
              rx={PAN_RX}
              ry={PAN_RY}
              fill="url(#sc-pan-right)"
              stroke="rgba(180,205,235,0.9)"
              strokeWidth={1.5}
            />
            <ellipse
              cx={455}
              cy={257}
              rx={PAN_RX - 6}
              ry={PAN_RY - 2}
              fill="none"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth={1}
            />
            {/* Glass card on right pan */}
            <rect
              x={405}
              y={236}
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
