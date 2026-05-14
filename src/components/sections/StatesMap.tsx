"use client";

import { useState, useEffect, useCallback, memo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import { STATES, type StateInfo } from "@/lib/states";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const HIGHLIGHT_FIPS = new Set(STATES.map((s) => s.fips));
const CYCLE_INTERVAL = 3800;
const MAP_W = 800;
const MAP_H = 500;

// L-shaped line anchors in SVG space
// Layout matching reference: WY top-left, CO top-right, NM bottom-left, DE bottom-right
const LINE_ANCHORS: Record<string, { cardX: number; cardY: number; midX: number }> = {
  "56": { cardX: 56,  cardY: 226, midX: 198 }, // WY → top-left
  "08": { cardX: 744, cardY: 226, midX: 602 }, // CO → top-right
  "35": { cardX: 56,  cardY: 376, midX: 198 }, // NM → bottom-left
  "10": { cardX: 744, cardY: 376, midX: 602 }, // DE → bottom-right
};

interface GeoFeature {
  type: "Feature";
  id: string;
  geometry: GeoJSON.Geometry;
  properties: Record<string, unknown>;
}

/* ─── SVG map (memoised) ─── */
const USMap = memo(function USMap({
  activeFips,
  onStateHover,
}: {
  activeFips: string;
  onStateHover: (fips: string) => void;
}) {
  const [features,  setFeatures]  = useState<GeoFeature[]>([]);
  const [paths,     setPaths]     = useState<Map<string, string>>(new Map());
  const [centroids, setCentroids] = useState<Map<string, [number, number]>>(new Map());

  useEffect(() => {
    fetch(GEO_URL)
      .then((r) => r.json())
      .then((topo: Topology) => {
        const geojson = feature(topo, topo.objects.states as GeometryCollection) as GeoJSON.FeatureCollection;
        const feats   = geojson.features as GeoFeature[];
        setFeatures(feats);

        const proj    = geoAlbersUsa().fitSize([MAP_W, MAP_H], geojson);
        const pathGen = geoPath(proj);
        const pm = new Map<string, string>();
        const cm = new Map<string, [number, number]>();
        feats.forEach((f) => {
          const d = pathGen(f.geometry);
          if (d) {
            pm.set(f.id, d);
            if (HIGHLIGHT_FIPS.has(f.id)) cm.set(f.id, pathGen.centroid(f.geometry) as [number, number]);
          }
        });
        setPaths(pm);
        setCentroids(cm);
      });
  }, []);

  if (paths.size === 0) {
    return <div className="w-full" style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }} />;
  }

  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="w-full h-auto">
      <defs>
        {/* Vignette fog — states dissolve into white at edges */}
        <radialGradient id="mapFog" cx="50%" cy="48%" rx="48%" ry="46%">
          <stop offset="0%"   stopColor="white" stopOpacity="1" />
          <stop offset="60%"  stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="fogMask">
          <rect width={MAP_W} height={MAP_H} fill="url(#mapFog)" />
        </mask>

        {/* Deep blue bloom for active state */}
        <filter id="activeGlow" x="-55%" y="-55%" width="210%" height="210%">
          <feGaussianBlur stdDeviation="16" result="blur" />
          <feFlood floodColor="rgba(12,38,140,0.52)" result="c" />
          <feComposite in="c" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Specular bevel for inactive highlighted states */}
        <filter id="bevel" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="4" specularConstant="0.5"
            specularExponent="22" result="spec">
            <fePointLight x="250" y="50" z="300" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="s" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="s" />
          </feMerge>
        </filter>

        {/* Glass shine sweep */}
        <linearGradient id="shine" x1="0%" y1="0%" x2="78%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.54)" />
          <stop offset="48%"  stopColor="rgba(255,255,255,0.03)" />
          <stop offset="100%" stopColor="rgba(185,212,248,0.18)" />
        </linearGradient>
      </defs>

      <g mask="url(#fogMask)">
        {/* Non-highlighted states — near-invisible mist */}
        {features.map((f) => {
          const d = paths.get(f.id);
          if (!d || HIGHLIGHT_FIPS.has(f.id)) return null;
          return (
            <path key={f.id} d={d}
              fill="rgba(198,214,236,0.17)"
              stroke="rgba(255,255,255,0.62)"
              strokeWidth={0.3}
            />
          );
        })}

        {/* Highlighted states with deep glass fill + shine */}
        {features.map((f) => {
          const d = paths.get(f.id);
          if (!d || !HIGHLIGHT_FIPS.has(f.id)) return null;
          const isActive = activeFips === f.id;

          return (
            <g key={f.id}
              filter={isActive ? "url(#activeGlow)" : "url(#bevel)"}
              style={{ cursor: "pointer", transition: "filter 0.5s" }}
              onMouseEnter={() => onStateHover(f.id)}
              onClick={() => onStateHover(f.id)}
            >
              <path d={d}
                fill={isActive ? "rgba(8,28,100,0.62)" : "rgba(52,108,200,0.22)"}
                stroke={isActive ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.55)"}
                strokeWidth={isActive ? 1.5 : 0.75}
                style={{ transition: "fill 0.5s ease, stroke 0.5s ease, stroke-width 0.5s ease" }}
              />
              <path d={d} fill="url(#shine)"
                opacity={isActive ? 0.60 : 0.28}
                style={{ pointerEvents: "none", transition: "opacity 0.5s ease" }}
              />
            </g>
          );
        })}

        {/* L-shaped connecting lines */}
        {STATES.map((s) => {
          const c = centroids.get(s.fips);
          const a = LINE_ANCHORS[s.fips];
          if (!c || !a) return null;
          const isActive = activeFips === s.fips;
          const stroke = isActive ? "rgba(55,95,215,0.50)" : "rgba(180,202,238,0.32)";

          return (
            <g key={`ln-${s.fips}`}>
              <polyline
                points={`${c[0]},${c[1]} ${a.midX},${c[1]} ${a.midX},${a.cardY} ${a.cardX},${a.cardY}`}
                fill="none"
                stroke={stroke}
                strokeWidth={isActive ? 0.9 : 0.5}
                style={{ transition: "stroke 0.5s ease, stroke-width 0.5s ease" }}
              />
              <circle cx={c[0]} cy={c[1]}
                r={isActive ? 3.2 : 2.2}
                fill={isActive ? "rgba(45,88,215,0.65)" : "rgba(160,188,232,0.45)"}
                style={{ transition: "all 0.5s ease" }}
              />
              <circle cx={a.cardX} cy={a.cardY} r={1.8}
                fill={stroke}
                style={{ transition: "fill 0.5s ease" }}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
});

/* ─── Chrome glass card ─── */
function ChromeCard({
  state,
  isActive,
  onHover,
  onClick,
}: {
  state: StateInfo;
  isActive: boolean;
  onHover: () => void;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} onMouseEnter={onHover} className="w-full text-left">
      {/* Gradient-border wrapper — creates the "chrome" edge */}
      <div
        className="rounded-[20px] transition-all duration-500"
        style={{
          padding: "1.5px",
          background: isActive
            ? `linear-gradient(160deg,
                rgba(255,255,255,0.97) 0%,
                rgba(212,228,255,0.82) 30%,
                rgba(255,255,255,0.94) 58%,
                rgba(192,215,254,0.68) 84%,
                rgba(255,255,255,0.96) 100%)`
            : `linear-gradient(160deg,
                rgba(240,246,255,0.80) 0%,
                rgba(210,224,248,0.48) 45%,
                rgba(250,253,255,0.72) 72%,
                rgba(196,215,244,0.42) 100%)`,
          boxShadow: isActive
            ? "0 10px 44px rgba(18,52,168,0.10), 0 2px 10px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.92)"
            : "0 3px 16px rgba(0,20,80,0.04), 0 1px 3px rgba(0,0,0,0.02)",
        }}
      >
        {/* Frosted glass interior */}
        <div
          className="rounded-[18.5px] transition-all duration-500"
          style={{
            padding: "18px 22px",
            background: isActive ? "rgba(255,255,255,0.86)" : "rgba(255,255,255,0.54)",
            backdropFilter: "blur(48px) saturate(1.6)",
            WebkitBackdropFilter: "blur(48px) saturate(1.6)",
          }}
        >
          <h3
            className="font-normal leading-tight mb-1.5 transition-colors duration-500"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(15px, 1.35vw, 19px)",
              letterSpacing: "-0.01em",
              color: isActive ? "rgba(8,20,54,0.92)" : "rgba(22,44,92,0.35)",
            }}
          >
            {state.name}
          </h3>
          <p
            className="leading-relaxed transition-colors duration-500"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(10px, 0.78vw, 12px)",
              color: isActive ? "rgba(25,52,100,0.58)" : "rgba(68,102,158,0.28)",
            }}
          >
            {state.tagline}
          </p>
        </div>
      </div>
    </button>
  );
}

/* ─── Animated pill progress indicator ─── */
function ProgressDots({
  count,
  active,
  onChange,
}: {
  count: number;
  active: number;
  onChange: (i: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button key={i} onClick={() => onChange(i)} className="py-1.5">
          <motion.div
            className="rounded-full"
            animate={{
              width: active === i ? 22 : 6,
              background:
                active === i
                  ? "linear-gradient(90deg, #0e2878, #2563eb)"
                  : "rgba(30,58,138,0.16)",
            }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: 6 }}
          />
        </button>
      ))}
    </div>
  );
}

/* ─── Main export ─── */
export function StatesMap() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeState = STATES[activeIdx];

  // Auto-cycle — pauses on hover
  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setActiveIdx((p) => (p + 1) % STATES.length);
    }, CYCLE_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isHovered]);

  const handleFipsHover = useCallback((fips: string) => {
    const idx = STATES.findIndex((s) => s.fips === fips);
    if (idx !== -1) { setActiveIdx(idx); setIsHovered(true); }
  }, []);

  const selectIdx = useCallback((i: number) => {
    setActiveIdx(i);
    setIsHovered(true);
  }, []);

  // Reference layout: WY top-left, CO top-right, NM bottom-left, DE bottom-right
  const leftCards  = [STATES[2], STATES[0]]; // WY (idx 2) top, NM (idx 0) bottom
  const rightCards = [STATES[1], STATES[3]]; // CO (idx 1) top, DE (idx 3) bottom

  return (
    <motion.section
      id="juridictions"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative overflow-hidden py-16 lg:py-24"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Misty white background — layered radial gradients */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 85% 70% at 50% 52%, rgba(220,234,255,0.58) 0%, rgba(238,244,255,0.24) 55%, transparent 100%)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 38% 85% at 0% 50%, rgba(232,241,255,0.42) 0%, transparent 70%)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 38% 85% at 100% 50%, rgba(232,241,255,0.42) 0%, transparent 70%)",
      }} />

      <div className="relative px-6 lg:px-10 max-w-[1200px] mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#0c1830]/22 mb-3">
            Juridictions
          </p>
          <h2
            className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.022em] text-[#0c1830]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Le bon état, c&apos;est
            <br />
            des milliers d&apos;euros d&apos;écart.
          </h2>
        </motion.div>

        {/* Desktop 3-col: left cards | map | right cards */}
        <div className="hidden lg:grid grid-cols-[215px_1fr_215px] gap-5 items-center">
          <div className="flex flex-col gap-[88px]">
            {leftCards.map((s) => (
              <ChromeCard key={s.fips} state={s}
                isActive={activeIdx === STATES.indexOf(s)}
                onHover={() => selectIdx(STATES.indexOf(s))}
                onClick={() => selectIdx(STATES.indexOf(s))}
              />
            ))}
          </div>

          <USMap activeFips={activeState.fips} onStateHover={handleFipsHover} />

          <div className="flex flex-col gap-[88px]">
            {rightCards.map((s) => (
              <ChromeCard key={s.fips} state={s}
                isActive={activeIdx === STATES.indexOf(s)}
                onHover={() => selectIdx(STATES.indexOf(s))}
                onClick={() => selectIdx(STATES.indexOf(s))}
              />
            ))}
          </div>
        </div>

        {/* Mobile: map + 2×2 card grid */}
        <div className="lg:hidden">
          <USMap activeFips={activeState.fips} onStateHover={handleFipsHover} />
          <div className="grid grid-cols-2 gap-3 mt-5">
            {STATES.map((s, i) => (
              <ChromeCard key={s.fips} state={s}
                isActive={activeIdx === i}
                onHover={() => selectIdx(i)}
                onClick={() => selectIdx(i)}
              />
            ))}
          </div>
        </div>

        {/* Active state description — AnimatePresence cross-fade */}
        <div className="mt-10 lg:mt-12" style={{ minHeight: 68 }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeState.fips}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-center text-[13px] lg:text-[14px] max-w-[540px] mx-auto leading-[1.72]"
              style={{
                color: "rgba(20,45,100,0.48)",
                fontFamily: "var(--font-body)",
              }}
            >
              {activeState.description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress dots + animated CTA */}
        <div className="flex flex-col items-center gap-6 mt-8">
          <ProgressDots count={STATES.length} active={activeIdx} onChange={selectIdx} />

          <AnimatePresence mode="wait">
            <motion.a
              key={activeState.fips}
              href={`/creer-llc/${activeState.slug}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-[14px] font-medium text-white transition-shadow duration-300 hover:shadow-[0_10px_32px_rgba(10,38,130,0.32)]"
              style={{
                background: "linear-gradient(135deg, #0e2878, #1d4ed8)",
                boxShadow: "0 4px 22px rgba(10,38,130,0.22)",
              }}
            >
              Créer ma LLC au {activeState.name}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          </AnimatePresence>
        </div>

      </div>
    </motion.section>
  );
}
