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

// 3 cards per side, cardY values tuned to SVG space
// Left col (cardX=52): WY top, NM mid, CA bottom
// Right col (cardX=748): CO top, DE mid, FL bottom
const LINE_ANCHORS: Record<string, { cardX: number; cardY: number; midX: number }> = {
  "56": { cardX: 52,  cardY: 140, midX: 200 }, // WY → top-left
  "08": { cardX: 748, cardY: 140, midX: 605 }, // CO → top-right
  "35": { cardX: 52,  cardY: 268, midX: 200 }, // NM → mid-left
  "10": { cardX: 748, cardY: 268, midX: 680 }, // DE → mid-right
  "06": { cardX: 52,  cardY: 396, midX: 118 }, // CA → bot-left
  "12": { cardX: 748, cardY: 396, midX: 640 }, // FL → bot-right
};

interface GeoFeature {
  type: "Feature";
  id: string;
  geometry: GeoJSON.Geometry;
  properties: Record<string, unknown>;
}

/* ─── US Map SVG ─── */
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
        {/* Bottom fog dissolve */}
        <linearGradient id="fogGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="white" stopOpacity="0" />
          <stop offset="68%"  stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <mask id="fogMask">
          <rect width={MAP_W} height={MAP_H} fill="white" />
          <rect width={MAP_W} height={MAP_H} fill="url(#fogGrad)" />
        </mask>

        {/* Active state deep bloom */}
        <filter id="bloom" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feFlood floodColor="#0c1e8a" floodOpacity="0.60" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Inactive highlighted: subtle specular bevel */}
        <filter id="bevel" x="-15%" y="-15%" width="130%" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="b" />
          <feSpecularLighting in="b" surfaceScale="3.5" specularConstant="0.45" specularExponent="20" result="spec">
            <fePointLight x="280" y="60" z="380" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="s" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="s" />
          </feMerge>
        </filter>

        {/* Glass shine on active */}
        <linearGradient id="shine" x1="0%" y1="0%" x2="65%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.58)" />
          <stop offset="45%"  stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(150,195,255,0.14)" />
        </linearGradient>
      </defs>

      <g mask="url(#fogMask)">
        {/* All 50 states — visible ice-blue fill */}
        {features.map((f) => {
          if (!HIGHLIGHT_FIPS.has(f.id)) {
            const d = paths.get(f.id);
            if (!d) return null;
            return (
              <path key={f.id} d={d}
                fill="rgba(165,200,235,0.30)"
                stroke="rgba(255,255,255,0.80)"
                strokeWidth={0.55}
              />
            );
          }
          return null;
        })}

        {/* 6 featured states */}
        {features.map((f) => {
          if (!HIGHLIGHT_FIPS.has(f.id)) return null;
          const d = paths.get(f.id);
          if (!d) return null;
          const isActive = activeFips === f.id;

          return (
            <g key={f.id}
              filter={isActive ? "url(#bloom)" : "url(#bevel)"}
              style={{ cursor: "pointer" }}
              onClick={() => onStateHover(f.id)}
              onMouseEnter={() => onStateHover(f.id)}
            >
              <path d={d}
                fill={isActive ? "rgba(6,22,100,0.72)" : "rgba(38,88,198,0.28)"}
                stroke={isActive ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.68)"}
                strokeWidth={isActive ? 1.7 : 0.9}
                style={{ transition: "fill 0.55s, stroke 0.55s, stroke-width 0.55s" }}
              />
              <path d={d} fill="url(#shine)"
                opacity={isActive ? 0.68 : 0.22}
                style={{ pointerEvents: "none", transition: "opacity 0.55s" }}
              />
            </g>
          );
        })}

        {/* Connecting lines */}
        {STATES.map((s) => {
          const c = centroids.get(s.fips);
          const a = LINE_ANCHORS[s.fips];
          if (!c || !a) return null;
          const isActive = activeFips === s.fips;
          const stroke = isActive ? "rgba(36,72,196,0.60)" : "rgba(140,185,235,0.32)";

          return (
            <g key={`ln-${s.fips}`}>
              <polyline
                points={`${c[0]},${c[1]} ${a.midX},${c[1]} ${a.midX},${a.cardY} ${a.cardX},${a.cardY}`}
                fill="none" stroke={stroke}
                strokeWidth={isActive ? 1.1 : 0.55}
                style={{ transition: "stroke 0.55s, stroke-width 0.55s" }}
              />
              {/* State centroid dot */}
              <circle cx={c[0]} cy={c[1]}
                r={isActive ? 3.8 : 2.2}
                fill={isActive ? "rgba(24,64,196,0.75)" : "rgba(120,175,230,0.45)"}
                style={{ transition: "all 0.55s" }}
              />
              {/* Radar-ping pulse on active */}
              {isActive && (
                <g transform={`translate(${c[0]},${c[1]})`}>
                  <circle r="4" fill="rgba(60,110,240,0.65)" />
                  <circle r="4" fill="none" stroke="rgba(80,140,255,0.75)" strokeWidth="1.5">
                    <animate attributeName="r" values="4;22" dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.85;0" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                  <circle r="4" fill="none" stroke="rgba(80,140,255,0.50)" strokeWidth="1">
                    <animate attributeName="r" values="4;22" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.65;0" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
                  </circle>
                </g>
              )}
              {/* Card anchor dot */}
              <circle cx={a.cardX} cy={a.cardY} r={1.8} fill={stroke}
                style={{ transition: "fill 0.55s" }}
              />
            </g>
          );
        })}
      </g>

      {/* Edge vignette — above fog group */}
      <radialGradient id="edgeVig" cx="50%" cy="46%" rx="50%" ry="52%">
        <stop offset="52%" stopColor="white" stopOpacity="0" />
        <stop offset="100%" stopColor="white" stopOpacity="0.85" />
      </radialGradient>
      <rect width={MAP_W} height={MAP_H} fill="url(#edgeVig)" style={{ pointerEvents: "none" }} />
    </svg>
  );
});

/* ─── Chrome glass card — research-backed metallic border ─── */
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
    <button
      onClick={onClick}
      onMouseEnter={onHover}
      className="w-full text-left"
      style={{ position: "relative" }}
    >
      {/* Animated shimmer overlay on active */}
      {isActive && (
        <div
          className="absolute inset-0 rounded-[18px] pointer-events-none overflow-hidden z-10"
          style={{ borderRadius: 18 }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
              animation: "chromeSweep 2.2s ease-in-out infinite",
            }}
          />
        </div>
      )}

      {/* Chrome metallic border via background-clip trick */}
      <div
        className="rounded-[18px] transition-all duration-500"
        style={{
          background: isActive
            ? `linear-gradient(rgba(252,254,255,0.92), rgba(248,252,255,0.92)) padding-box,
               linear-gradient(
                 140deg,
                 #ffffff 0%,
                 #d0dcec 16%,
                 #8fa5bf 32%,
                 #c4d3e8 48%,
                 #ffffff 55%,
                 #a8bfd4 68%,
                 #d8e6f4 84%,
                 #f2f7fc 100%
               ) border-box`
            : `linear-gradient(rgba(248,252,255,0.55), rgba(244,250,255,0.55)) padding-box,
               linear-gradient(
                 140deg,
                 rgba(240,246,255,0.85) 0%,
                 rgba(210,225,248,0.52) 40%,
                 rgba(248,252,255,0.75) 70%,
                 rgba(200,218,242,0.45) 100%
               ) border-box`,
          border: "1.5px solid transparent",
          boxShadow: isActive
            ? "0 14px 52px rgba(10,38,150,0.12), 0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.98)"
            : "0 2px 10px rgba(0,20,80,0.04), inset 0 1px 0 rgba(255,255,255,0.72)",
        }}
      >
        {/* Frosted glass interior */}
        <div
          className="rounded-[16.5px]"
          style={{
            padding: "14px 18px 16px",
            background: isActive ? "rgba(255,255,255,0)" : "rgba(248,252,255,0)",
            backdropFilter: "blur(16px) saturate(160%) brightness(1.06)",
            WebkitBackdropFilter: "blur(16px) saturate(160%) brightness(1.06)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.90), inset 0 -1px 0 rgba(155,185,220,0.18)",
          }}
        >
          <h3
            className="font-normal leading-tight mb-1"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(14px, 1.32vw, 18px)",
              letterSpacing: "-0.01em",
              color: isActive ? "rgba(5,16,50,0.92)" : "rgba(18,40,88,0.38)",
              transition: "color 0.5s",
            }}
          >
            {state.name}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(9px, 0.72vw, 11px)",
              lineHeight: 1.55,
              color: isActive ? "rgba(18,48,108,0.58)" : "rgba(55,88,145,0.26)",
              transition: "color 0.5s",
            }}
          >
            {state.tagline}
          </p>
        </div>
      </div>
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
              background: active === i
                ? "linear-gradient(90deg, #0d2574, #2460d8)"
                : "rgba(25,55,138,0.14)",
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
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse parallax on background — single RAF loop
  const bgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let rafId: number;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth, h = window.innerHeight;
      tx = (e.clientX / w - 0.5) * 18;
      ty = (e.clientY / h - 0.5) * 12;
    };
    const animate = () => {
      cx += (tx - cx) * 0.04;
      cy += (ty - cy) * 0.04;
      if (bgRef.current) {
        bgRef.current.style.transform = `translate(${cx}px, ${cy}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("mousemove", onMove); };
  }, []);

  const activeState = STATES[activeIdx];

  useEffect(() => {
    if (isHovered) { if (timerRef.current) clearInterval(timerRef.current); return; }
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

  // Layout: [WY, NM, CA] left | map | [CO, DE, FL] right
  // STATES order: 0=NM, 1=CO, 2=WY, 3=DE, 4=FL, 5=CA
  const leftCards  = [STATES[2], STATES[0], STATES[5]]; // WY, NM, CA
  const rightCards = [STATES[1], STATES[3], STATES[4]]; // CO, DE, FL

  return (
    <motion.section
      ref={sectionRef}
      id="juridictions"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative overflow-hidden py-16 lg:py-24"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Layered atmospheric background — research fog recipe */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(ellipse 70% 55% at 50% 38%, #ffffff 0%, transparent 68%),
          radial-gradient(ellipse 50% 42% at 15% 58%, #d4e8f8 0%, transparent 65%),
          radial-gradient(ellipse 45% 38% at 85% 55%, #d9eeff 0%, transparent 60%),
          linear-gradient(180deg, #eaf3fc 0%, #f5f9ff 48%, #ffffff 100%)
        `,
      }} />

      {/* Parallax orb layer */}
      <div
        ref={bgRef}
        className="absolute inset-[-5%] pointer-events-none will-change-transform"
        style={{
          background: `
            radial-gradient(ellipse 40% 35% at 25% 35%, rgba(190,220,248,0.45) 0%, transparent 70%),
            radial-gradient(ellipse 35% 30% at 75% 65%, rgba(200,228,252,0.38) 0%, transparent 65%)
          `,
        }}
      />

      {/* Bottom cloud fade */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
        height: "28%",
        background: "linear-gradient(to bottom, transparent, rgba(245,250,255,0.92))",
      }} />

      {/* Sparkle decorations */}
      <div className="absolute bottom-8 right-10 pointer-events-none select-none" style={{
        color: "rgba(120,165,220,0.35)",
        fontSize: 22,
        animation: "sparkle 3.5s ease-in-out infinite",
      }}>✦</div>
      <div className="absolute top-12 left-14 pointer-events-none select-none" style={{
        color: "rgba(140,185,235,0.22)",
        fontSize: 14,
        animation: "sparkle 4.2s ease-in-out infinite 1.1s",
      }}>✦</div>

      <div className="relative px-4 lg:px-8 max-w-[1220px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 lg:mb-12"
        >
          <p className="text-[10px] uppercase tracking-[0.38em] text-[#1a3a6e]/28 mb-3">
            6 Juridictions
          </p>
          <h2
            className="font-normal leading-[1.08] text-[#08183e]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.9rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Le bon état, c&apos;est<br />des milliers d&apos;euros d&apos;écart.
          </h2>
        </motion.div>

        {/* Desktop — 3-col layout */}
        <div className="hidden lg:grid grid-cols-[182px_1fr_182px] gap-4 items-center">
          {/* Left cards */}
          <div className="flex flex-col justify-between h-full py-2" style={{ gap: 52 }}>
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
          <div className="flex flex-col justify-between h-full py-2" style={{ gap: 52 }}>
            {rightCards.map((s) => (
              <ChromeCard key={s.fips} state={s}
                isActive={activeIdx === STATES.indexOf(s)}
                onHover={() => selectIdx(STATES.indexOf(s))}
                onClick={() => selectIdx(STATES.indexOf(s))}
              />
            ))}
          </div>
        </div>

        {/* Mobile — map + 2×3 grid */}
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

        {/* Active state description */}
        <div className="mt-10 lg:mt-12" style={{ minHeight: 60 }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeState.fips}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="text-center max-w-[540px] mx-auto leading-[1.78]"
              style={{
                color: "rgba(16,40,98,0.46)",
                fontFamily: "var(--font-body)",
                fontSize: "clamp(12px, 0.95vw, 14px)",
              }}
            >
              {activeState.description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress + CTA */}
        <div className="flex flex-col items-center gap-5 mt-7">
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
                background: "linear-gradient(135deg, #0d2574, #1c4cd4)",
                boxShadow: "0 5px 22px rgba(12,37,116,0.30)",
              }}
            >
              Créer ma LLC en {activeState.name}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          </AnimatePresence>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes chromeSweep {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0.35; transform: scale(1) rotate(0deg); }
          50%       { opacity: 0.65; transform: scale(1.2) rotate(15deg); }
        }
      `}</style>
    </motion.section>
  );
}
