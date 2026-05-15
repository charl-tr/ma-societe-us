"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const weaknesses = [
  "Opèrent en zone grise",
  "Risques URSSAF / IRS",
  "Support inexistant post-création",
  "Pas de juriste réel",
];

const strengths = [
  "Conformité IRS certifiée",
  "Registered Agent agréé",
  "Suivi post-création inclus",
  "Juristes franco-américains",
];

// --- Vault SVG ---
function VaultDoor({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 300 320"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 8px 40px rgba(20,60,140,0.22))" }}
    >
      <defs>
        {/* Vault frame gradient */}
        <linearGradient id="vault-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c8d8ec" />
          <stop offset="30%" stopColor="#eaf2fc" />
          <stop offset="60%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#a8c0dc" />
        </linearGradient>

        {/* Door gradient */}
        <linearGradient id="vault-door" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d0e0f4" />
          <stop offset="40%" stopColor="#f0f7ff" />
          <stop offset="70%" stopColor="#e0eeff" />
          <stop offset="100%" stopColor="#b0c8e8" />
        </linearGradient>

        {/* Interior glow */}
        <radialGradient id="vault-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(100,180,255,0.55)" />
          <stop offset="40%" stopColor="rgba(29,78,216,0.25)" />
          <stop offset="100%" stopColor="rgba(6,14,32,0.0)" />
        </radialGradient>

        {/* Handle gradient */}
        <linearGradient id="vault-handle" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#98b8d8" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#8aadcc" />
        </linearGradient>

        {/* Gear gradient */}
        <linearGradient id="vault-gear" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b8d0ea" />
          <stop offset="100%" stopColor="#dceeff" />
        </linearGradient>

        {/* Bolt gradient */}
        <linearGradient id="vault-bolt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8f4ff" />
          <stop offset="100%" stopColor="#90b8d8" />
        </linearGradient>

        <filter id="glow-filter" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Vault frame (outer chrome border) ── */}
      <rect
        x={20}
        y={20}
        width={260}
        height={280}
        rx={20}
        fill="url(#vault-frame)"
        stroke="rgba(180,210,245,0.7)"
        strokeWidth={2}
      />
      {/* Frame inner bevel */}
      <rect
        x={30}
        y={30}
        width={240}
        height={260}
        rx={16}
        fill="none"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth={1.5}
      />

      {/* ── Interior glow (visible when "open") ── */}
      <rect
        x={40}
        y={40}
        width={220}
        height={240}
        rx={12}
        fill="url(#vault-glow)"
        style={{
          opacity: open ? 1 : 0,
          transition: "opacity 0.8s ease 0.5s",
        }}
      />

      {/* Interior depth lines */}
      {open && (
        <>
          <line x1={40} y1={40} x2={260} y2={40} stroke="rgba(100,180,255,0.15)" strokeWidth={1} />
          <line x1={40} y1={280} x2={260} y2={280} stroke="rgba(100,180,255,0.15)" strokeWidth={1} />
        </>
      )}

      {/* ── Vault door (scales/skews on open) ── */}
      <g
        style={{
          transformOrigin: "260px 160px",
          transform: open ? "scaleX(0.18) skewY(-3deg)" : "scaleX(1) skewY(0deg)",
          transition: "transform 1.0s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Door body */}
        <rect
          x={38}
          y={38}
          width={224}
          height={244}
          rx={14}
          fill="url(#vault-door)"
          stroke="rgba(160,195,235,0.8)"
          strokeWidth={2}
        />
        {/* Door sheen */}
        <rect
          x={50}
          y={50}
          width={100}
          height={220}
          rx={8}
          fill="rgba(255,255,255,0.22)"
        />

        {/* Locking bolts — top */}
        <rect x={80} y={42} width={16} height={22} rx={5} fill="url(#vault-bolt)" />
        <rect x={150} y={42} width={16} height={22} rx={5} fill="url(#vault-bolt)" />
        <rect x={200} y={42} width={16} height={22} rx={5} fill="url(#vault-bolt)" />
        {/* Locking bolts — bottom */}
        <rect x={80} y={256} width={16} height={22} rx={5} fill="url(#vault-bolt)" />
        <rect x={150} y={256} width={16} height={22} rx={5} fill="url(#vault-bolt)" />
        <rect x={200} y={256} width={16} height={22} rx={5} fill="url(#vault-bolt)" />
        {/* Locking bolts — right */}
        <rect x={240} y={90} width={22} height={14} rx={5} fill="url(#vault-bolt)" />
        <rect x={240} y={148} width={22} height={14} rx={5} fill="url(#vault-bolt)" />
        <rect x={240} y={210} width={22} height={14} rx={5} fill="url(#vault-bolt)" />

        {/* ── Central handle assembly ── */}
        {/* Outer ring */}
        <circle
          cx={150}
          cy={160}
          r={52}
          fill="none"
          stroke="url(#vault-handle)"
          strokeWidth={5}
        />
        {/* Inner ring */}
        <circle
          cx={150}
          cy={160}
          r={38}
          fill="rgba(220,236,255,0.6)"
          stroke="rgba(160,200,240,0.7)"
          strokeWidth={2}
        />
        {/* Cross bars */}
        <line
          x1={150 - 38}
          y1={160}
          x2={150 + 38}
          y2={160}
          stroke="url(#vault-handle)"
          strokeWidth={5}
          strokeLinecap="round"
        />
        <line
          x1={150}
          y1={160 - 38}
          x2={150}
          y2={160 + 38}
          stroke="url(#vault-handle)"
          strokeWidth={5}
          strokeLinecap="round"
        />
        {/* Diagonal bars */}
        <line
          x1={150 - 27}
          y1={160 - 27}
          x2={150 + 27}
          y2={160 + 27}
          stroke="rgba(180,210,240,0.7)"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <line
          x1={150 + 27}
          y1={160 - 27}
          x2={150 - 27}
          y2={160 + 27}
          stroke="rgba(180,210,240,0.7)"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        {/* Center knob */}
        <circle cx={150} cy={160} r={14} fill="url(#vault-gear)" />
        <circle cx={150} cy={160} r={8} fill="url(#vault-handle)" />
        <circle cx={150} cy={160} r={3} fill="rgba(200,225,255,0.9)" />

        {/* Corner gear circles */}
        {[
          { cx: 72, cy: 82 },
          { cx: 228, cy: 82 },
          { cx: 72, cy: 238 },
          { cx: 228, cy: 238 },
        ].map((g, i) => (
          <g
            key={i}
            style={{
              transformOrigin: `${g.cx}px ${g.cy}px`,
              animation: open ? `spin${i % 2 === 0 ? "Cw" : "Ccw"} 4s linear infinite` : "none",
            }}
          >
            <circle
              cx={g.cx}
              cy={g.cy}
              r={18}
              fill="none"
              stroke="url(#vault-gear)"
              strokeWidth={3}
              strokeDasharray="7 4"
            />
            <circle
              cx={g.cx}
              cy={g.cy}
              r={8}
              fill="url(#vault-gear)"
              stroke="rgba(160,200,240,0.6)"
              strokeWidth={1.5}
            />
            <circle cx={g.cx} cy={g.cy} r={3} fill="rgba(220,240,255,0.8)" />
          </g>
        ))}
      </g>

      <style>{`
        @keyframes spinCw  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes spinCcw { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
      `}</style>
    </svg>
  );
}

// --- Comparison card ---
function CompareCard({
  side,
  title,
  items,
  isInView,
}: {
  side: "left" | "right";
  title: string;
  items: string[];
  isInView: boolean;
}) {
  const isLeft = side === "left";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
      className="relative rounded-2xl p-6 flex flex-col"
      style={{
        background: isLeft
          ? "linear-gradient(135deg, rgba(139,26,26,0.08) 0%, rgba(255,255,255,0.85) 100%)"
          : "linear-gradient(135deg, rgba(29,78,216,0.07) 0%, rgba(255,255,255,0.9) 100%)",
        border: isLeft
          ? "1px solid rgba(192,57,43,0.18)"
          : "1px solid rgba(29,78,216,0.18)",
        backdropFilter: "blur(12px)",
        boxShadow: isLeft
          ? "0 4px 32px rgba(192,57,43,0.07)"
          : "0 4px 32px rgba(29,78,216,0.09)",
      }}
    >
      {/* Card header */}
      <div className="mb-5">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
          style={{
            fontFamily: "var(--font-heading)",
            background: isLeft ? "rgba(192,57,43,0.1)" : "rgba(29,78,216,0.1)",
            color: isLeft ? "#c0392b" : "#1d4ed8",
          }}
        >
          {isLeft ? "⚠ Leurs risques" : "✦ Votre bouclier"}
        </div>
        <h3
          style={{ fontFamily: "var(--font-cormorant)" }}
          className="text-xl font-semibold text-[#0e1e3a]"
        >
          {title}
        </h3>
      </div>

      {/* Items */}
      <ul className="flex flex-col gap-3">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: isLeft ? -16 : 16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 + i * 0.1, ease: EASE }}
            className="flex items-start gap-3"
          >
            <span
              className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background: isLeft ? "rgba(192,57,43,0.12)" : "rgba(29,78,216,0.1)",
                color: isLeft ? "#c0392b" : "#1d4ed8",
              }}
            >
              {isLeft ? "✕" : "✓"}
            </span>
            <span
              style={{ fontFamily: "var(--font-body)" }}
              className="text-[#2a3a4e] text-sm leading-relaxed"
            >
              {item}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export function CompareVault() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 px-4"
      style={{
        background: "linear-gradient(180deg, #eaf3fc 0%, #f5f9ff 100%)",
      }}
    >
      {/* Subtle background texture */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(29,78,216,0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: EASE }}
          className="text-center mb-14"
        >
          <h2
            style={{ fontFamily: "var(--font-cormorant)" }}
            className="text-4xl md:text-5xl font-semibold text-[#0e1e3a] leading-tight"
          >
            Pourquoi nous font-ils confiance&nbsp;?
          </h2>
          <p
            style={{ fontFamily: "var(--font-body)" }}
            className="mt-3 text-[#4a6280] text-lg"
          >
            La différence entre un prestataire opaque et un partenaire certifié.
          </p>
        </motion.div>

        {/* Three-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Left card */}
          <CompareCard
            side="left"
            title="Ce que risquent vos concurrents"
            items={weaknesses}
            isInView={isInView}
          />

          {/* Center vault */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="flex flex-col items-center gap-4"
          >
            {/* Vault label */}
            <div
              className="text-center px-4 py-2 rounded-xl"
              style={{
                background: "rgba(29,78,216,0.07)",
                border: "1px solid rgba(29,78,216,0.12)",
              }}
            >
              <span
                style={{ fontFamily: "var(--font-heading)" }}
                className="text-xs font-semibold uppercase tracking-widest text-[#1d4ed8]"
              >
                MA SOCIÉTÉ US
              </span>
            </div>

            {/* Vault SVG */}
            <div
              className="w-full"
              style={{
                perspective: "800px",
              }}
            >
              <motion.div
                animate={
                  isInView
                    ? { rotateY: -8, scale: 1 }
                    : { rotateY: 0, scale: 0.95 }
                }
                transition={{ duration: 1.0, delay: 0.3, ease: EASE }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <VaultDoor open={isInView} />
              </motion.div>
            </div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
              className="text-center"
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  fontFamily: "var(--font-heading)",
                  background:
                    "linear-gradient(135deg, rgba(29,78,216,0.12), rgba(29,78,216,0.06))",
                  border: "1px solid rgba(29,78,216,0.2)",
                  color: "#1d4ed8",
                  boxShadow: "0 2px 12px rgba(29,78,216,0.1)",
                }}
              >
                <span>🔐</span>
                <span>Protection totale</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right card */}
          <CompareCard
            side="right"
            title="Ce que vous obtenez avec nous"
            items={strengths}
            isInView={isInView}
          />
        </div>

        {/* Bottom trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { n: "+500", label: "LLC créées" },
            { n: "5★", label: "Avis clients" },
            { n: "100%", label: "Conformité IRS" },
            { n: "48h", label: "Délai moyen" },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center py-5 px-4 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(29,78,216,0.1)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                style={{ fontFamily: "var(--font-heading)" }}
                className="text-2xl font-bold text-[#1d4ed8]"
              >
                {stat.n}
              </div>
              <div
                style={{ fontFamily: "var(--font-body)" }}
                className="text-xs text-[#5a7a9c] mt-1"
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
