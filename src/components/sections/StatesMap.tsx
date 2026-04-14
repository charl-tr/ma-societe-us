"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import { STATES, type StateInfo } from "@/lib/states";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const HIGHLIGHT_FIPS = new Set(STATES.map((s) => s.fips));

const MAP_W = 800;
const MAP_H = 500;

/* ─── L-shaped line endpoints ─── */
/* Each card has an anchor point (where line exits card) and a mid-point for the L-bend */
const LINE_ANCHORS: Record<string, { cardX: number; cardY: number; midX: number; midY: number }> = {
  "35": { cardX: 55, cardY: 230, midX: 200, midY: 230 },     // NM → top-left card
  "08": { cardX: 745, cardY: 230, midX: 600, midY: 230 },    // CO → top-right card
  "56": { cardX: 55, cardY: 380, midX: 200, midY: 380 },     // WY → bottom-left card
  "10": { cardX: 745, cardY: 380, midX: 600, midY: 380 },    // DE → bottom-right card
};

interface GeoFeature {
  type: "Feature";
  id: string;
  geometry: GeoJSON.Geometry;
  properties: Record<string, unknown>;
}

/* ─── Map SVG ─── */
const USMap = memo(function USMap({
  activeFips,
  onStateHover,
}: {
  activeFips: string;
  onStateHover: (fips: string) => void;
}) {
  const [features, setFeatures] = useState<GeoFeature[]>([]);
  const [paths, setPaths] = useState<Map<string, string>>(new Map());
  const [centroids, setCentroids] = useState<Map<string, [number, number]>>(new Map());

  useEffect(() => {
    fetch(GEO_URL)
      .then((r) => r.json())
      .then((topology: Topology) => {
        const geojson = feature(topology, topology.objects.states as GeometryCollection);
        const feats = (geojson as GeoJSON.FeatureCollection).features as GeoFeature[];
        setFeatures(feats);

        const projection = geoAlbersUsa().fitSize([MAP_W, MAP_H], geojson as GeoJSON.FeatureCollection);
        const pathGen = geoPath(projection);
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

  if (paths.size === 0) return <div className="w-full aspect-[8/5]" />;

  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="w-full h-auto">
      <defs>
        {/* Fog mask */}
        <radialGradient id="fog" cx="50%" cy="48%" rx="46%" ry="44%">
          <stop offset="0%" stopColor="white" />
          <stop offset="65%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id="fogMask">
          <rect width={MAP_W} height={MAP_H} fill="url(#fog)" />
        </mask>

        {/* 3D bevel filter for highlighted states */}
        <filter id="bevel" x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="3" specularConstant="0.6" specularExponent="20" result="spec">
            <fePointLight x="200" y="100" z="200" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specIn" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="specIn" />
          </feMerge>
        </filter>

        {/* Active glow — blue + hint of red */}
        <filter id="activeGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="glow" />
          <feFlood floodColor="rgba(30,86,160,0.35)" result="blue" />
          <feComposite in="blue" in2="glow" operator="in" result="blueGlow" />
          <feMerge>
            <feMergeNode in="blueGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Shine gradient */}
        <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(200,215,240,0.25)" />
        </linearGradient>
      </defs>

      <g mask="url(#fogMask)">
        {/* Background states */}
        {features.map((f) => {
          const d = paths.get(f.id);
          if (!d || HIGHLIGHT_FIPS.has(f.id)) return null;
          return (
            <path key={f.id} d={d} fill="rgba(195,210,230,0.3)" stroke="rgba(255,255,255,0.5)" strokeWidth={0.4} />
          );
        })}

        {/* Highlighted states — 3D bevel */}
        {features.map((f) => {
          const d = paths.get(f.id);
          if (!d || !HIGHLIGHT_FIPS.has(f.id)) return null;
          const isActive = activeFips === f.id;

          return (
            <g
              key={f.id}
              filter={isActive ? "url(#activeGlow)" : "url(#bevel)"}
              style={{ cursor: "pointer", transition: "filter 0.5s ease" }}
              onMouseEnter={() => onStateHover(f.id)}
              onClick={() => onStateHover(f.id)}
            >
              <path d={d} fill={isActive ? "rgba(20,60,140,0.5)" : "rgba(60,120,200,0.22)"} stroke="rgba(255,255,255,0.8)" strokeWidth={isActive ? 1.5 : 0.8} style={{ transition: "all 0.4s ease" }} />
              <path d={d} fill="url(#shine)" opacity={isActive ? 0.7 : 0.35} style={{ transition: "opacity 0.4s ease" }} />
            </g>
          );
        })}

        {/* L-shaped connecting lines */}
        {STATES.map((s) => {
          const c = centroids.get(s.fips);
          const a = LINE_ANCHORS[s.fips];
          if (!c || !a) return null;
          const isActive = activeFips === s.fips;
          const color = isActive ? "rgba(30,86,160,0.5)" : "rgba(160,175,200,0.3)";
          const width = isActive ? 1 : 0.5;

          // L-shape: centroid → midpoint (horizontal) → card anchor (vertical)
          return (
            <g key={`line-${s.fips}`}>
              <polyline
                points={`${c[0]},${c[1]} ${a.midX},${c[1]} ${a.midX},${a.midY} ${a.cardX},${a.cardY}`}
                fill="none"
                stroke={color}
                strokeWidth={width}
                style={{ transition: "all 0.4s ease" }}
              />
              <circle cx={c[0]} cy={c[1]} r={isActive ? 3 : 2} fill={isActive ? "rgba(30,86,160,0.6)" : "rgba(160,175,200,0.4)"} style={{ transition: "all 0.4s ease" }} />
              <circle cx={a.cardX} cy={a.cardY} r={1.5} fill={color} style={{ transition: "all 0.4s ease" }} />
            </g>
          );
        })}
      </g>
    </svg>
  );
});

/* ─── Glass Card with chrome border ─── */
function GlassCard({ state, isActive, onHover, onClick }: {
  state: StateInfo;
  isActive: boolean;
  onHover: () => void;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} onMouseEnter={onHover} className="w-full text-left cursor-pointer">
      <div
        className={`rounded-xl overflow-hidden transition-all duration-400 ${
          isActive
            ? "shadow-[0_8px_32px_rgba(0,40,104,0.12)]"
            : "shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_24px_rgba(0,40,104,0.08)]"
        }`}
      >
        {/* Chrome gradient border — top */}
        <div
          className="h-[3px]"
          style={{
            background: isActive
              ? "linear-gradient(90deg, rgba(30,86,160,0.3), rgba(255,255,255,0.9) 25%, rgba(192,57,43,0.3) 50%, rgba(255,255,255,0.9) 75%, rgba(30,86,160,0.3))"
              : "linear-gradient(90deg, rgba(190,200,215,0.2), rgba(255,255,255,0.8) 30%, rgba(210,220,235,0.5) 50%, rgba(255,255,255,0.8) 70%, rgba(190,200,215,0.2))",
          }}
        />
        <div
          className={`p-4 lg:p-5 border border-t-0 rounded-b-xl transition-all duration-400 ${
            isActive
              ? "bg-white/85 backdrop-blur-xl border-white/80"
              : "bg-white/45 backdrop-blur-md border-white/50 hover:bg-white/65"
          }`}
        >
          <h3
            className={`text-[clamp(0.85rem,1.3vw,1rem)] font-normal tracking-tight transition-colors ${
              isActive ? "text-[#1a2a40]" : "text-[#1a2a40]/50"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {state.name}
          </h3>
          <p className={`mt-1 text-[11px] lg:text-[12px] leading-relaxed transition-colors ${isActive ? "text-[#1a2a40]/55" : "text-[#1a2a40]/30"}`}>
            {state.tagline}
          </p>
        </div>
      </div>
    </button>
  );
}

/* ─── Main ─── */
export function StatesMap() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeState = STATES[activeIdx];

  const handleHover = useCallback((fips: string) => {
    const idx = STATES.findIndex((s) => s.fips === fips);
    if (idx !== -1) setActiveIdx(idx);
  }, []);

  return (
    <motion.section
      id="juridictions"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8 } } }}
      className="relative py-10 lg:py-16 overflow-hidden"
    >
      {/* Misty bg */}
      <div className="absolute inset-0 bg-[#EDF1F6]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_20%,rgba(255,255,255,0.85),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_60%,rgba(255,255,255,0.4),transparent_50%)]" />

      <div className="relative px-6 lg:px-10 max-w-[1100px] mx-auto">
        {/* Header — centered, large */}
        <motion.div variants={fadeUp} className="text-center mb-10 lg:mb-14">
          <h2
            className="text-[clamp(1.6rem,3.5vw,2.8rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#1a2a40]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Le bon état, c&apos;est
            <br />
            des milliers d&apos;euros d&apos;écart.
          </h2>
        </motion.div>

        {/* 3-column layout: cards | map | cards */}
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_180px] gap-4 lg:gap-5 items-center">
          {/* Left: NM top, WY bottom */}
          <div className="hidden lg:flex flex-col gap-[100px]">
            {[STATES[0], STATES[2]].map((s) => (
              <GlassCard key={s.fips} state={s} isActive={activeIdx === STATES.indexOf(s)} onHover={() => setActiveIdx(STATES.indexOf(s))} onClick={() => setActiveIdx(STATES.indexOf(s))} />
            ))}
          </div>

          {/* Map */}
          <USMap activeFips={activeState.fips} onStateHover={handleHover} />

          {/* Right: CO top, DE bottom */}
          <div className="hidden lg:flex flex-col gap-[100px]">
            {[STATES[1], STATES[3]].map((s) => (
              <GlassCard key={s.fips} state={s} isActive={activeIdx === STATES.indexOf(s)} onHover={() => setActiveIdx(STATES.indexOf(s))} onClick={() => setActiveIdx(STATES.indexOf(s))} />
            ))}
          </div>
        </div>

        {/* Mobile: 2x2 grid */}
        <div className="lg:hidden grid grid-cols-2 gap-3 mt-5">
          {STATES.map((s, i) => (
            <GlassCard key={s.fips} state={s} isActive={activeIdx === i} onHover={() => setActiveIdx(i)} onClick={() => setActiveIdx(i)} />
          ))}
        </div>

        {/* CTA below — red accent button for DR punch */}
        <div className="mt-10 lg:mt-14 text-center">
          <a
            href={`/creer-llc/${activeState.slug}`}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-[14px] font-medium text-white transition-all duration-300 hover:shadow-[0_8px_30px_rgba(192,57,43,0.2)]"
            style={{
              background: "linear-gradient(135deg, #1e56a0, #c0392b)",
              boxShadow: "0 4px 20px rgba(30,86,160,0.2)",
            }}
          >
            Créer ma LLC au {activeState.name}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <p className="mt-3 text-[12px] text-[#1a2a40]/30">
            {activeState.pros[0]} · {activeState.pros[1]}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
