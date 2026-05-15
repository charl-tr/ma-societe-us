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

// Anchor points in SVG viewport space for L-shaped connecting lines
const LINE_ANCHORS: Record<string, { cardX: number; cardY: number; midX: number }> = {
  "56": { cardX: 56,  cardY: 210, midX: 190 }, // WY → top-left
  "08": { cardX: 744, cardY: 210, midX: 610 }, // CO → top-right
  "35": { cardX: 56,  cardY: 370, midX: 190 }, // NM → bottom-left
  "10": { cardX: 744, cardY: 370, midX: 610 }, // DE → bottom-right
};

interface GeoFeature {
  type: "Feature";
  id: string;
  geometry: GeoJSON.Geometry;
  properties: Record<string, unknown>;
}

/* ─── US Map SVG (memoised) ─── */
const USMap = memo(function USMap({
  activeFips,
  onStateHover,
}: {
  activeFips: string;
  onStateHover: (fips: string) => void;
}) {
  const [paths, setPaths] = useState<Map<string, string>>(new Map());
  const [centroids, setCentroids] = useState<Map<string, [number, number]>>(new Map());
  const [features, setFeatures] = useState<GeoFeature[]>([]);

  useEffect(() => {
    fetch(GEO_URL)
      .then((r) => r.json())
      .then((topo: Topology) => {
        const geojson = feature(topo, topo.objects.states as GeometryCollection) as GeoJSON.FeatureCollection;
        const feats = geojson.features as GeoFeature[];
        setFeatures(feats);

        const proj = geoAlbersUsa().fitSize([MAP_W, MAP_H], geojson);
        const pathGen = geoPath(proj);
        const pm = new Map<string, string>();
        const cm = new Map<string, [number, number]>();
        feats.forEach((f) => {
          const d = pathGen(f.geometry);
          if (d) {
            pm.set(f.id, d);
            if (HIGHLIGHT_FIPS.has(f.id)) {
              const c = pathGen.centroid(f.geometry);
              if (c && !isNaN(c[0])) cm.set(f.id, c as [number, number]);
            }
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
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="w-full h-auto overflow-visible">
      <defs>
        {/* Bottom fog — fades map into the section background */}
        <linearGradient id="bottomFog" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="white" stopOpacity="0" />
          <stop offset="72%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <mask id="bottomFogMask">
          <rect width={MAP_W} height={MAP_H} fill="white" />
          <rect width={MAP_W} height={MAP_H} fill="url(#bottomFog)" />
        </mask>

        {/* Edge-dissolve vignette — L/R sides fade to background */}
        <radialGradient id="edgeFade" cx="50%" cy="46%" rx="50%" ry="52%">
          <stop offset="55%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="0.9" />
        </radialGradient>

        {/* Active state bloom glow */}
        <filter id="activeGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="14" result="blur" />
          <feFlood floodColor="#0c2480" floodOpacity="0.55" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Highlighted-but-inactive specular */}
        <filter id="inactiveGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="3" specularConstant="0.4" specularExponent="18" result="spec">
            <fePointLight x="300" y="80" z="400" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="s" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="s" />
          </feMerge>
        </filter>

        {/* Glass shine on active states */}
        <linearGradient id="activeShine" x1="0%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.55)" />
          <stop offset="50%"  stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(160,200,255,0.12)" />
        </linearGradient>
      </defs>

      {/* Map group with bottom fog mask */}
      <g mask="url(#bottomFogMask)">
        {/* All 50 states — visible blue-gray fill */}
        {features.map((f) => {
          const d = paths.get(f.id);
          if (!d || HIGHLIGHT_FIPS.has(f.id)) return null;
          return (
            <path
              key={f.id}
              d={d}
              fill="rgba(168,198,232,0.28)"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth={0.55}
            />
          );
        })}

        {/* 4 featured states — deep glass + bloom */}
        {features.map((f) => {
          const d = paths.get(f.id);
          if (!d || !HIGHLIGHT_FIPS.has(f.id)) return null;
          const isActive = activeFips === f.id;

          return (
            <g
              key={f.id}
              filter={isActive ? "url(#activeGlow)" : "url(#inactiveGlow)"}
              style={{ cursor: "pointer" }}
              onClick={() => onStateHover(f.id)}
              onMouseEnter={() => onStateHover(f.id)}
            >
              <path
                d={d}
                fill={isActive ? "rgba(8,26,108,0.68)" : "rgba(42,90,198,0.30)"}
                stroke={isActive ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.65)"}
                strokeWidth={isActive ? 1.6 : 0.9}
                style={{ transition: "fill 0.55s ease, stroke-width 0.55s ease" }}
              />
              {/* Shine overlay */}
              <path
                d={d}
                fill="url(#activeShine)"
                opacity={isActive ? 0.65 : 0.22}
                style={{ pointerEvents: "none", transition: "opacity 0.55s ease" }}
              />
            </g>
          );
        })}

        {/* Connecting lines — L-shaped polylines */}
        {STATES.map((s) => {
          const c = centroids.get(s.fips);
          const a = LINE_ANCHORS[s.fips];
          if (!c || !a) return null;
          const isActive = activeFips === s.fips;
          const stroke = isActive ? "rgba(40,80,200,0.55)" : "rgba(150,190,240,0.30)";

          return (
            <g key={`ln-${s.fips}`}>
              <polyline
                points={`${c[0]},${c[1]} ${a.midX},${c[1]} ${a.midX},${a.cardY} ${a.cardX},${a.cardY}`}
                fill="none"
                stroke={stroke}
                strokeWidth={isActive ? 1.0 : 0.55}
                style={{ transition: "stroke 0.55s, stroke-width 0.55s" }}
              />
              {/* State dot */}
              <circle
                cx={c[0]} cy={c[1]}
                r={isActive ? 3.5 : 2.2}
                fill={isActive ? "rgba(30,70,200,0.70)" : "rgba(130,170,230,0.45)"}
                style={{ transition: "all 0.55s" }}
              />
              {/* Card anchor dot */}
              <circle cx={a.cardX} cy={a.cardY} r={1.8} fill={stroke} style={{ transition: "fill 0.55s" }} />
            </g>
          );
        })}
      </g>

      {/* Edge vignette overlay — separate rect so it's above the map */}
      <rect width={MAP_W} height={MAP_H} fill="url(#edgeFade)" style={{ pointerEvents: "none" }} />
    </svg>
  );
});

/* ─── Chrome glass card — matches reference images ─── */
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
    <button onClick={onClick} onMouseEnter={onHover} className="w-full text-left group">
      <motion.div
        animate={{
          boxShadow: isActive
            ? "0 12px 48px rgba(12,40,160,0.13), 0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.95)"
            : "0 2px 12px rgba(0,20,80,0.05), inset 0 1px 0 rgba(255,255,255,0.7)",
        }}
        transition={{ duration: 0.5 }}
        className="rounded-[18px]"
        style={{
          padding: "1.5px",
          background: isActive
            ? "linear-gradient(155deg, rgba(255,255,255,0.98) 0%, rgba(210,228,255,0.85) 28%, rgba(255,255,255,0.95) 55%, rgba(195,218,255,0.70) 82%, rgba(255,255,255,0.97) 100%)"
            : "linear-gradient(155deg, rgba(235,242,255,0.78) 0%, rgba(210,225,250,0.45) 50%, rgba(240,248,255,0.70) 100%)",
        }}
      >
        <div
          className="rounded-[16.5px]"
          style={{
            padding: "16px 20px 18px",
            background: isActive
              ? "rgba(252,254,255,0.92)"
              : "rgba(248,252,255,0.60)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            transition: "background 0.5s",
          }}
        >
          <h3
            className="font-normal leading-tight mb-1.5"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(16px, 1.4vw, 20px)",
              letterSpacing: "-0.01em",
              color: isActive ? "rgba(6,18,52,0.92)" : "rgba(20,44,92,0.40)",
              transition: "color 0.5s",
            }}
          >
            {state.name}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(10px, 0.75vw, 12px)",
              lineHeight: 1.6,
              color: isActive ? "rgba(20,50,110,0.58)" : "rgba(60,90,148,0.28)",
              transition: "color 0.5s",
            }}
          >
            {state.tagline}
          </p>
        </div>
      </motion.div>
    </button>
  );
}

/* ─── Progress dots ─── */
function ProgressDots({ count, active, onChange }: { count: number; active: number; onChange: (i: number) => void }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button key={i} onClick={() => onChange(i)} className="py-1.5">
          <motion.div
            className="rounded-full"
            animate={{
              width: active === i ? 24 : 6,
              background: active === i ? "linear-gradient(90deg, #0e2878, #2563eb)" : "rgba(30,58,138,0.15)",
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: 6 }}
          />
        </button>
      ))}
    </div>
  );
}

/* ─── Section ─── */
export function StatesMap() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeState = STATES[activeIdx];

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
  const leftCards  = [STATES[2], STATES[0]]; // WY top, NM bottom
  const rightCards = [STATES[1], STATES[3]]; // CO top, DE bottom

  return (
    <motion.section
      id="juridictions"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative overflow-hidden py-16 lg:py-24"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Atmospheric background — light steel blue, NOT white */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, #dce8f4 0%, #e8f0f9 45%, #f0f5fb 100%)",
      }} />

      {/* Central light halo */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 65% at 50% 48%, rgba(220,235,255,0.65) 0%, transparent 70%)",
      }} />

      {/* Bottom white fog */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
        height: "30%",
        background: "linear-gradient(to bottom, transparent, rgba(240,245,251,0.90))",
      }} />

      {/* Left + right atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 30% 80% at 0% 50%, rgba(210,228,250,0.40) 0%, transparent 70%), radial-gradient(ellipse 30% 80% at 100% 50%, rgba(210,228,250,0.40) 0%, transparent 70%)",
      }} />

      <div className="relative px-6 lg:px-10 max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 lg:mb-14"
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#1a3a6e]/30 mb-3">
            Juridictions
          </p>
          <h2
            className="font-normal leading-[1.08] text-[#0a1e48]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Le bon état, c&apos;est<br />des milliers d&apos;euros d&apos;écart.
          </h2>
        </motion.div>

        {/* Desktop: 3-col layout */}
        <div className="hidden lg:grid grid-cols-[200px_1fr_200px] gap-6 items-center">
          {/* Left cards */}
          <div className="flex flex-col gap-[80px]">
            {leftCards.map((s) => (
              <ChromeCard key={s.fips} state={s}
                isActive={activeIdx === STATES.indexOf(s)}
                onHover={() => selectIdx(STATES.indexOf(s))}
                onClick={() => selectIdx(STATES.indexOf(s))}
              />
            ))}
          </div>

          {/* Map */}
          <USMap activeFips={activeState.fips} onStateHover={handleFipsHover} />

          {/* Right cards */}
          <div className="flex flex-col gap-[80px]">
            {rightCards.map((s) => (
              <ChromeCard key={s.fips} state={s}
                isActive={activeIdx === STATES.indexOf(s)}
                onHover={() => selectIdx(STATES.indexOf(s))}
                onClick={() => selectIdx(STATES.indexOf(s))}
              />
            ))}
          </div>
        </div>

        {/* Mobile */}
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

        {/* Active description */}
        <div className="mt-10 lg:mt-12" style={{ minHeight: 64 }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeState.fips}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-center max-w-[540px] mx-auto leading-[1.75]"
              style={{
                color: "rgba(18,42,100,0.48)",
                fontFamily: "var(--font-body)",
                fontSize: "clamp(12px, 1vw, 14px)",
              }}
            >
              {activeState.description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress + CTA */}
        <div className="flex flex-col items-center gap-5 mt-8">
          <ProgressDots count={STATES.length} active={activeIdx} onChange={selectIdx} />

          <AnimatePresence mode="wait">
            <motion.a
              key={activeState.fips}
              href={`/creer-llc/${activeState.slug}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-[13px] font-medium text-white"
              style={{
                background: "linear-gradient(135deg, #0e2878, #1d4ed8)",
                boxShadow: "0 4px 20px rgba(14,40,120,0.28)",
              }}
            >
              Créer ma LLC au {activeState.name}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
