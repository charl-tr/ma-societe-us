"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── Geometry ──────────────────────────────────────────────
const PIVOT_X = 400, PIVOT_Y = 195;
const ARM_LEN = 190, CHAIN_LEN = 88, SPREAD = 82;
const PAN_RX = 90, PAN_RY = 22;
const MAX_TILT = 22;

function computeGeo(deg: number) {
  const a = deg * (Math.PI / 180);
  const c = Math.cos(a), s = Math.sin(a);
  const lTip = { x: PIVOT_X - ARM_LEN * c, y: PIVOT_Y + ARM_LEN * s };
  const rTip = { x: PIVOT_X + ARM_LEN * c, y: PIVOT_Y - ARM_LEN * s };
  const lPan = { x: lTip.x, y: lTip.y + CHAIN_LEN };
  const rPan = { x: rTip.x, y: rTip.y + CHAIN_LEN };
  const fmt = (n: number) => n.toFixed(1);
  return {
    lTip, rTip, lPan, rPan,
    lChains: [
      `M${fmt(lTip.x)} ${fmt(lTip.y)} L${fmt(lPan.x - SPREAD)} ${fmt(lPan.y)}`,
      `M${fmt(lTip.x)} ${fmt(lTip.y)} L${fmt(lPan.x)} ${fmt(lPan.y)}`,
      `M${fmt(lTip.x)} ${fmt(lTip.y)} L${fmt(lPan.x + SPREAD)} ${fmt(lPan.y)}`,
    ],
    rChains: [
      `M${fmt(rTip.x)} ${fmt(rTip.y)} L${fmt(rPan.x - SPREAD)} ${fmt(rPan.y)}`,
      `M${fmt(rTip.x)} ${fmt(rTip.y)} L${fmt(rPan.x)} ${fmt(rPan.y)}`,
      `M${fmt(rTip.x)} ${fmt(rTip.y)} L${fmt(rPan.x + SPREAD)} ${fmt(rPan.y)}`,
    ],
  };
}

const G0 = computeGeo(0); // neutral positions

export function TaxBalance() {
  const sectionRef = useRef<HTMLElement>(null);
  const armRef     = useRef<SVGGElement>(null);
  const lPanRef    = useRef<SVGGElement>(null);
  const rPanRef    = useRef<SVGGElement>(null);
  const lCRefs     = useRef<(SVGPathElement | null)[]>([null, null, null]);
  const rCRefs     = useRef<(SVGPathElement | null)[]>([null, null, null]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "center 30%"],
  });

  const tP = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(tP, "change", (p) => {
    const geo = computeGeo(p * MAX_TILT);
    if (armRef.current)
      armRef.current.style.transform = `rotate(${p * MAX_TILT}deg)`;
    if (lPanRef.current)
      lPanRef.current.style.transform = `translate(${geo.lPan.x - G0.lPan.x}px,${geo.lPan.y - G0.lPan.y}px)`;
    if (rPanRef.current)
      rPanRef.current.style.transform = `translate(${geo.rPan.x - G0.rPan.x}px,${geo.rPan.y - G0.rPan.y}px)`;
    geo.lChains.forEach((d, i) => lCRefs.current[i]?.setAttribute("d", d));
    geo.rChains.forEach((d, i) => rCRefs.current[i]?.setAttribute("d", d));
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24"
      style={{ background: "linear-gradient(160deg, #070f22 0%, #0c1830 55%, #091424 100%)" }}
    >
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute rounded-full" style={{ width: 700, height: 700, top: "10%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(30,80,200,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "0%", left: "10%", background: "radial-gradient(circle, rgba(220,70,50,0.06) 0%, transparent 70%)", filter: "blur(50px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "0%", right: "10%", background: "radial-gradient(circle, rgba(50,140,255,0.06) 0%, transparent 70%)", filter: "blur(50px)" }} />
      </div>

      {/* Heading */}
      <motion.div
        className="text-center mb-16 px-4 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <p className="text-[11px] uppercase tracking-[0.28em] text-white/30 mb-3" style={{ fontFamily: "var(--font-body)" }}>
          France vs États-Unis
        </p>
        <h2
          className="font-semibold text-white leading-tight"
          style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem,4.5vw,3.4rem)" }}
        >
          Pourquoi vous payez trop&nbsp;?
        </h2>
        <p className="mt-2 text-white/35 text-sm italic" style={{ fontFamily: "var(--font-body)" }}>
          Faites défiler — la balance bascule en temps réel
        </p>
      </motion.div>

      {/* 3-column layout */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[1fr_500px_1fr] gap-10 items-center relative z-10">

        {/* ── Left: France ── */}
        <motion.div
          className="flex flex-col gap-5 md:text-right order-2 md:order-1"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/30 mb-2" style={{ fontFamily: "var(--font-body)" }}>
              SARL / SAS France
            </p>
            <div
              className="font-bold text-[#f56550] leading-none"
              style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(4rem,8vw,6.5rem)", textShadow: "0 0 60px rgba(240,90,70,0.35)" }}
            >
              45%
            </div>
            <p className="text-white/35 text-sm mt-2" style={{ fontFamily: "var(--font-body)" }}>
              de charges & impôts
            </p>
          </div>
          <ul className="flex flex-col gap-2.5">
            {["Charges sociales 40%+", "Impôt sur les bénéfices", "Comptabilité annuelle"].map((item) => (
              <li key={item} className="flex items-center md:justify-end gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f56550]/60 flex-shrink-0 md:order-2" />
                <span className="text-[13px] text-white/35 md:order-1" style={{ fontFamily: "var(--font-body)" }}>{item}</span>
              </li>
            ))}
          </ul>
          <div
            className="md:self-end px-4 py-2 rounded-full text-[12px] font-semibold text-[#f56550] border border-[#f56550]/25 bg-[#f56550]/08"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Lourd & pénalisant
          </div>
        </motion.div>

        {/* ── Center: Chrome Scale SVG ── */}
        <motion.div
          className="w-full order-1 md:order-2"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: EASE }}
        >
          <svg
            viewBox="0 0 800 490"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            style={{ filter: "drop-shadow(0 20px 60px rgba(0,10,40,0.6))" }}
          >
            <defs>
              <linearGradient id="tb-pole" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1e3a5a" />
                <stop offset="20%" stopColor="#4a7aaa" />
                <stop offset="50%" stopColor="#d0e8ff" />
                <stop offset="75%" stopColor="#3a6090" />
                <stop offset="100%" stopColor="#1a3050" />
              </linearGradient>
              <linearGradient id="tb-arm" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(220,242,255,0.98)" />
                <stop offset="40%" stopColor="rgba(160,210,250,0.92)" />
                <stop offset="100%" stopColor="rgba(70,120,180,0.80)" />
              </linearGradient>
              <radialGradient id="tb-pivot" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#e8f6ff" />
                <stop offset="60%" stopColor="#90c0e8" />
                <stop offset="100%" stopColor="#3a6090" />
              </radialGradient>
              <radialGradient id="tb-panL" cx="30%" cy="28%" r="70%">
                <stop offset="0%" stopColor="#fff5f2" />
                <stop offset="45%" stopColor="#e8b0a0" />
                <stop offset="100%" stopColor="#904030" />
              </radialGradient>
              <radialGradient id="tb-panR" cx="30%" cy="28%" r="70%">
                <stop offset="0%" stopColor="#f0f8ff" />
                <stop offset="45%" stopColor="#90c8f0" />
                <stop offset="100%" stopColor="#2060b0" />
              </radialGradient>
              <linearGradient id="tb-base" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3a6080" />
                <stop offset="50%" stopColor="#7aaac8" />
                <stop offset="100%" stopColor="#1a3050" />
              </linearGradient>
              <radialGradient id="tb-glowL" cx="50%" cy="30%" r="60%">
                <stop offset="0%" stopColor="rgba(240,90,60,0.55)" />
                <stop offset="100%" stopColor="rgba(240,90,60,0)" />
              </radialGradient>
              <radialGradient id="tb-glowR" cx="50%" cy="30%" r="60%">
                <stop offset="0%" stopColor="rgba(60,160,255,0.50)" />
                <stop offset="100%" stopColor="rgba(60,160,255,0)" />
              </radialGradient>
              <filter id="tb-dropL" x="-40%" y="-20%" width="180%" height="200%">
                <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="rgba(240,80,50,0.5)" />
              </filter>
              <filter id="tb-dropR" x="-40%" y="-20%" width="180%" height="200%">
                <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="rgba(50,140,255,0.45)" />
              </filter>
              <filter id="tb-armFx" x="-5%" y="-40%" width="110%" height="180%">
                <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="rgba(0,10,40,0.6)" />
              </filter>
            </defs>

            {/* ── Base ── */}
            <ellipse cx={400} cy={466} rx={115} ry={17} fill="url(#tb-base)" opacity={0.95} />
            <ellipse cx={400} cy={466} rx={82} ry={10} fill="none" stroke="rgba(100,180,255,0.25)" strokeWidth={1.5} />
            <rect x={386} y={438} width={28} height={30} rx={6} fill="url(#tb-base)" />

            {/* ── Pole ── */}
            <rect x={388} y={24} width={24} height={418} rx={10} fill="url(#tb-pole)" />
            <rect x={393} y={28} width={7} height={408} rx={3} fill="rgba(220,240,255,0.18)" />
            {/* Pole cap */}
            <circle cx={400} cy={24} r={15} fill="url(#tb-pivot)" />
            <circle cx={400} cy={24} r={7} fill="rgba(255,255,255,0.65)" />

            {/* ── Pivot sphere ── */}
            <circle cx={PIVOT_X} cy={PIVOT_Y} r={20} fill="url(#tb-pivot)" filter="url(#tb-armFx)" />
            <circle cx={PIVOT_X - 6} cy={PIVOT_Y - 6} r={7} fill="rgba(255,255,255,0.68)" />
            <circle cx={PIVOT_X} cy={PIVOT_Y} r={24} fill="none" stroke="rgba(140,200,255,0.18)" strokeWidth={2} />

            {/* ── Arm — imperative rotation ── */}
            <g
              ref={armRef}
              style={{ transformOrigin: `${PIVOT_X}px ${PIVOT_Y}px`, transform: "rotate(0deg)" }}
            >
              <rect
                x={PIVOT_X - ARM_LEN - 12}
                y={PIVOT_Y - 8}
                width={(ARM_LEN + 12) * 2}
                height={16}
                rx={8}
                fill="url(#tb-arm)"
                filter="url(#tb-armFx)"
              />
              {/* Arm tip caps */}
              <circle cx={PIVOT_X - ARM_LEN} cy={PIVOT_Y} r={11} fill="url(#tb-arm)" />
              <circle cx={PIVOT_X + ARM_LEN} cy={PIVOT_Y} r={11} fill="url(#tb-arm)" />
              {/* Arm top highlight */}
              <rect
                x={PIVOT_X - ARM_LEN + 15}
                y={PIVOT_Y - 5}
                width={(ARM_LEN - 15) * 2}
                height={3}
                rx={1.5}
                fill="rgba(255,255,255,0.40)"
              />
            </g>

            {/* ── Chains — imperative path updates ── */}
            {[0, 1, 2].map((i) => (
              <path
                key={`lc-${i}`}
                ref={(el) => { lCRefs.current[i] = el; }}
                d={G0.lChains[i]}
                stroke="rgba(160,205,248,0.75)"
                strokeWidth={i === 1 ? 2.8 : 1.9}
                fill="none"
                strokeLinecap="round"
              />
            ))}
            {[0, 1, 2].map((i) => (
              <path
                key={`rc-${i}`}
                ref={(el) => { rCRefs.current[i] = el; }}
                d={G0.rChains[i]}
                stroke="rgba(160,205,248,0.75)"
                strokeWidth={i === 1 ? 2.8 : 1.9}
                fill="none"
                strokeLinecap="round"
              />
            ))}

            {/* ── Left pan — France (heavy, drops) ── */}
            <g ref={lPanRef} style={{ transform: "translate(0px,0px)" }}>
              {/* Glow halo */}
              <ellipse
                cx={G0.lPan.x}
                cy={G0.lPan.y + 24}
                rx={PAN_RX + 50}
                ry={42}
                fill="url(#tb-glowL)"
              />
              {/* Bowl */}
              <ellipse
                cx={G0.lPan.x}
                cy={G0.lPan.y}
                rx={PAN_RX}
                ry={PAN_RY}
                fill="url(#tb-panL)"
                stroke="rgba(240,140,110,0.75)"
                strokeWidth={2}
                filter="url(#tb-dropL)"
              />
              {/* Rim highlight */}
              <ellipse
                cx={G0.lPan.x}
                cy={G0.lPan.y - 7}
                rx={PAN_RX - 12}
                ry={PAN_RY - 8}
                fill="none"
                stroke="rgba(255,210,195,0.65)"
                strokeWidth={1.5}
              />
              {/* Weight bricks — tax load */}
              {[
                { x: G0.lPan.x - 40, y: G0.lPan.y - 16, w: 28, h: 10, op: 0.85 },
                { x: G0.lPan.x - 14, y: G0.lPan.y - 16, w: 28, h: 10, op: 0.78 },
                { x: G0.lPan.x + 12, y: G0.lPan.y - 16, w: 28, h: 10, op: 0.70 },
              ].map((b, i) => (
                <rect
                  key={i}
                  x={b.x} y={b.y} width={b.w} height={b.h} rx={3}
                  fill={`rgba(210,65,45,${b.op})`}
                  stroke="rgba(255,100,80,0.30)"
                  strokeWidth={1}
                />
              ))}
              {/* Brick top highlight */}
              <rect x={G0.lPan.x - 40} y={G0.lPan.y - 16} width={28} height={2.5} rx={1} fill="rgba(255,180,160,0.40)" />
              <rect x={G0.lPan.x - 14} y={G0.lPan.y - 16} width={28} height={2.5} rx={1} fill="rgba(255,180,160,0.35)" />
              <rect x={G0.lPan.x + 12} y={G0.lPan.y - 16} width={28} height={2.5} rx={1} fill="rgba(255,180,160,0.30)" />
            </g>

            {/* ── Right pan — LLC (light, rises) ── */}
            <g ref={rPanRef} style={{ transform: "translate(0px,0px)" }}>
              {/* Glow halo */}
              <ellipse
                cx={G0.rPan.x}
                cy={G0.rPan.y + 24}
                rx={PAN_RX + 50}
                ry={42}
                fill="url(#tb-glowR)"
              />
              {/* Bowl */}
              <ellipse
                cx={G0.rPan.x}
                cy={G0.rPan.y}
                rx={PAN_RX}
                ry={PAN_RY}
                fill="url(#tb-panR)"
                stroke="rgba(80,170,255,0.75)"
                strokeWidth={2}
                filter="url(#tb-dropR)"
              />
              {/* Rim highlight */}
              <ellipse
                cx={G0.rPan.x}
                cy={G0.rPan.y - 7}
                rx={PAN_RX - 12}
                ry={PAN_RY - 8}
                fill="none"
                stroke="rgba(170,225,255,0.65)"
                strokeWidth={1.5}
              />
              {/* Check mark — freedom */}
              <circle cx={G0.rPan.x} cy={G0.rPan.y - 4} r={16} fill="rgba(40,130,255,0.18)" />
              <path
                d={`M${G0.rPan.x - 10} ${G0.rPan.y - 3} L${G0.rPan.x - 2} ${G0.rPan.y + 6} L${G0.rPan.x + 12} ${G0.rPan.y - 12}`}
                stroke="rgba(140,220,255,0.92)"
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </motion.div>

        {/* ── Right: LLC ── */}
        <motion.div
          className="flex flex-col gap-5 order-3"
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/30 mb-2" style={{ fontFamily: "var(--font-body)" }}>
              LLC USA
            </p>
            <div
              className="font-bold text-[#4db8ff] leading-none"
              style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(4rem,8vw,6.5rem)", textShadow: "0 0 60px rgba(60,160,255,0.35)" }}
            >
              0%*
            </div>
            <p className="text-white/35 text-sm mt-2" style={{ fontFamily: "var(--font-body)" }}>
              d&rsquo;impôt fédéral
            </p>
          </div>
          <ul className="flex flex-col gap-2.5">
            {["Pass-through taxation", "Anonymat total garanti", "Aucune obligation comptable locale"].map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4db8ff]/60 flex-shrink-0" />
                <span className="text-[13px] text-white/35" style={{ fontFamily: "var(--font-body)" }}>{item}</span>
              </li>
            ))}
          </ul>
          <div
            className="self-start px-4 py-2 rounded-full text-[12px] font-semibold text-[#4db8ff] border border-[#4db8ff]/25 bg-[#4db8ff]/[0.08]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Léger & optimisé
          </div>
        </motion.div>
      </div>

      {/* Bottom stat badge */}
      <motion.div
        className="text-center mt-16 px-4 relative z-10"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      >
        <div
          className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
            backdropFilter: "blur(20px)",
          }}
        >
          <span className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
            Jusqu&rsquo;à +45%
          </span>
          <span className="text-white/35" style={{ fontFamily: "var(--font-body)" }}>
            de revenu net disponible
          </span>
        </div>
        <p className="mt-3 text-[11px] text-white/20 max-w-lg mx-auto" style={{ fontFamily: "var(--font-body)" }}>
          *La LLC n&rsquo;est pas imposée au niveau fédéral pour les non-résidents sans activité sur le sol américain. Résultat variable selon votre situation.
        </p>
      </motion.div>
    </section>
  );
}
