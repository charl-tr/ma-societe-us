"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import { STATES, type StateInfo } from "@/lib/states";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const HIGHLIGHT_FIPS = new Set(STATES.map((s) => s.fips));

const MAP_W = 800;
const MAP_H = 500;

/* ─── Straight-line anchors from centroid → SVG edge ─── */
/* The cards sit in HTML columns flanking the SVG.
   Lines run from state centroid to the nearest horizontal SVG edge. */
const LINE_ANCHORS: Record<string, { edgeX: number; edgeY: number }> = {
  "35": { edgeX: 0,     edgeY: 355 }, // NM → left edge
  "08": { edgeX: MAP_W, edgeY: 150 }, // CO → right edge
  "56": { edgeX: 0,     edgeY: 130 }, // WY → left edge
  "10": { edgeX: MAP_W, edgeY: 370 }, // DE → right edge
};

interface GeoFeature {
  type: "Feature";
  id: string;
  geometry: GeoJSON.Geometry;
  properties: Record<string, unknown>;
}

/* ─── Map SVG — reference image aesthetic ─── */
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

  if (paths.size === 0) return <div className="w-full" style={{ aspectRatio: `${MAP_W}/${MAP_H}` }} />;

  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="w-full h-auto overflow-visible">
      <defs>
        {/* Atmospheric fog */}
        <radialGradient id="fog2" cx="50%" cy="47%" rx="52%" ry="52%">
          <stop offset="0%"   stopColor="white" stopOpacity="1" />
          <stop offset="52%"  stopColor="white" stopOpacity="1" />
          <stop offset="75%"  stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="fogMask2">
          <rect width={MAP_W} height={MAP_H} fill="url(#fog2)" />
        </mask>

        {/* Active state glow */}
        <filter id="glassGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feFlood floodColor="rgba(40,100,200,0.50)" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feGaussianBlur in="glow" stdDeviation="4" result="softGlow" />
          <feMerge>
            <feMergeNode in="softGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Shine for active state */}
        <linearGradient id="stateShine" x1="0%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.55)" />
          <stop offset="40%"  stopColor="rgba(255,255,255,0.12)" />
          <stop offset="100%" stopColor="rgba(180,210,250,0.08)" />
        </linearGradient>

        {/* Arrow markers — pointing toward the card (end of line) */}
        <marker id="arrowActive" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <polygon points="0,0 7,3.5 0,7" fill="rgba(42,80,144,0.80)" />
        </marker>
        <marker id="arrowIdle" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0,0 6,3 0,6" fill="rgba(120,155,200,0.50)" />
        </marker>

        {/* Line gradient — centroid (transparent) → edge (opaque) */}
        <linearGradient id="lineGradLeft" x1="0" y1="0" x2={MAP_W} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"  stopColor="rgba(42,80,144,0.85)" />
          <stop offset="100%" stopColor="rgba(42,80,144,0.10)" />
        </linearGradient>
        <linearGradient id="lineGradRight" x1="0" y1="0" x2={MAP_W} y2="0">
          <stop offset="0%"  stopColor="rgba(42,80,144,0.10)" />
          <stop offset="100%" stopColor="rgba(42,80,144,0.85)" />
        </linearGradient>
      </defs>

      <g mask="url(#fogMask2)">
        {/* Background states — icy pale blue, white borders */}
        {features.map((f) => {
          const d = paths.get(f.id);
          if (!d || HIGHLIGHT_FIPS.has(f.id)) return null;
          return (
            <path
              key={f.id}
              d={d}
              fill="rgba(175,200,228,0.28)"
              stroke="rgba(255,255,255,0.70)"
              strokeWidth={0.6}
            />
          );
        })}

        {/* Highlighted states — deep blue glass, reference style */}
        {features.map((f) => {
          const d = paths.get(f.id);
          if (!d || !HIGHLIGHT_FIPS.has(f.id)) return null;
          const isActive = activeFips === f.id;

          return (
            <g
              key={f.id}
              filter={isActive ? "url(#glassGlow)" : undefined}
              style={{ cursor: "pointer", transition: "filter 0.5s ease" }}
              onMouseEnter={() => onStateHover(f.id)}
              onClick={() => onStateHover(f.id)}
            >
              {/* Base fill — deep blue glass */}
              <path
                d={d}
                fill={isActive ? "rgba(35,90,185,0.62)" : "rgba(100,150,210,0.32)"}
                stroke={isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.60)"}
                strokeWidth={isActive ? 1.5 : 0.8}
                style={{ transition: "all 0.45s ease" }}
              />
              {/* Specular shine overlay — top-left highlight */}
              <path
                d={d}
                fill="url(#stateShine)"
                opacity={isActive ? 0.9 : 0.35}
                style={{ transition: "opacity 0.45s ease" }}
              />
            </g>
          );
        })}

        {/* Connecting lines — elegant arrows from state centroid to card */}
        {STATES.map((s) => {
          const c = centroids.get(s.fips);
          const a = LINE_ANCHORS[s.fips];
          if (!c || !a) return null;
          const isActive = activeFips === s.fips;
          const isLeft = a.edgeX === 0;

          return (
            <g key={`line-${s.fips}`}>
              {/* Line track (faint full line always visible) */}
              <line
                x1={c[0]} y1={c[1]}
                x2={a.edgeX} y2={a.edgeY}
                stroke={isLeft ? "rgba(42,80,144,0.18)" : "rgba(42,80,144,0.18)"}
                strokeWidth={1}
                strokeDasharray="none"
                style={{ transition: "all 0.45s ease" }}
              />
              {/* Active overlay line — thick, gradient-like */}
              {isActive && (
                <line
                  x1={c[0]} y1={c[1]}
                  x2={a.edgeX} y2={a.edgeY}
                  stroke="rgba(42,80,144,0.70)"
                  strokeWidth={2}
                  markerEnd="url(#arrowActive)"
                  style={{ transition: "all 0.45s ease" }}
                />
              )}
              {/* Idle arrowhead on non-active lines */}
              {!isActive && (
                <line
                  x1={c[0]} y1={c[1]}
                  x2={a.edgeX} y2={a.edgeY}
                  stroke="rgba(120,155,200,0.42)"
                  strokeWidth={1.2}
                  markerEnd="url(#arrowIdle)"
                  style={{ transition: "all 0.45s ease" }}
                />
              )}
              {/* State centroid anchor — small dot + outer ring */}
              <circle
                cx={c[0]} cy={c[1]}
                r={isActive ? 5 : 3.5}
                fill="none"
                stroke={isActive ? "rgba(42,80,144,0.35)" : "rgba(120,155,200,0.25)"}
                strokeWidth={isActive ? 1.5 : 1}
                style={{ transition: "all 0.45s ease" }}
              />
              <circle
                cx={c[0]} cy={c[1]}
                r={isActive ? 3 : 2}
                fill={isActive ? "rgba(42,80,144,0.80)" : "rgba(120,155,200,0.50)"}
                style={{ transition: "all 0.45s ease" }}
              />
              {/* Card-side terminus — small diamond at edge */}
              <circle
                cx={a.edgeX === 0 ? a.edgeX + 4 : a.edgeX - 4}
                cy={a.edgeY}
                r={isActive ? 3 : 2}
                fill={isActive ? "rgba(42,80,144,0.70)" : "rgba(120,155,200,0.35)"}
                style={{ transition: "all 0.45s ease" }}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
});

/* ─── Glass Card — reference image style ─── */
/* Large state name, centered text, chrome on all edges, minimal */
function GlassCard({
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
      className="w-full text-left cursor-pointer focus:outline-none"
    >
      {/* Verre dépoli gris-argent — pas blanc SaaS.
          Fond : gris-bleu froid translucide. Bordure : argent/acier, pas blanc pur.
          Blur élevé (32px) + saturate réduit pour casser la "clarté digitale". */}
      <div
        className="relative rounded-2xl overflow-hidden transition-all duration-500"
        style={{
          background: isActive
            ? "linear-gradient(160deg, rgba(218,228,242,0.82) 0%, rgba(200,218,240,0.70) 100%)"
            : "linear-gradient(160deg, rgba(225,232,244,0.62) 0%, rgba(208,222,240,0.46) 100%)",
          backdropFilter: "blur(32px) saturate(1.2) brightness(1.04)",
          WebkitBackdropFilter: "blur(32px) saturate(1.2) brightness(1.04)",
          border: isActive
            ? "1px solid rgba(170,195,225,0.70)"
            : "1px solid rgba(175,198,225,0.42)",
          boxShadow: isActive
            ? "0 12px 40px rgba(60,100,180,0.13), 0 1px 0 rgba(255,255,255,0.65) inset, 0 0 0 0.5px rgba(150,185,225,0.30)"
            : "0 4px 20px rgba(80,110,160,0.07), 0 1px 0 rgba(255,255,255,0.50) inset",
          transform: isActive ? "translateY(-2px)" : "translateY(0)",
        }}
      >
        {/* Chrome top — argent métallique, pas blanc pur */}
        <div
          className="absolute inset-x-0 top-0 h-[1px]"
          style={{
            background: isActive
              ? "linear-gradient(90deg, rgba(160,190,225,0.3), rgba(230,238,250,0.95) 30%, rgba(245,250,255,1) 50%, rgba(230,238,250,0.95) 70%, rgba(160,190,225,0.3))"
              : "linear-gradient(90deg, rgba(160,185,215,0.15), rgba(210,225,242,0.70) 40%, rgba(220,232,248,0.75) 50%, rgba(210,225,242,0.70) 60%, rgba(160,185,215,0.15))",
          }}
        />
        {/* Reflet bas — verre épais */}
        <div
          className="absolute inset-x-0 bottom-0 h-[1px]"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(140,170,210,0.25) 40%, rgba(140,170,210,0.25) 60%, transparent)",
          }}
        />
        {/* Lueur active — glow intérieur subtil */}
        {isActive && (
          <div
            className="absolute inset-x-0 top-0 h-20 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(60,110,200,0.05) 0%, transparent 75%)",
            }}
          />
        )}

        <div className="px-5 py-6 text-center">
          <h3
            className="font-bold leading-tight transition-colors duration-300"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              letterSpacing: "-0.02em",
              color: isActive ? "rgba(10,24,50,0.95)" : "rgba(14,30,56,0.72)",
            }}
          >
            {state.name}
          </h3>
          <p
            className="mt-2 leading-snug"
            style={{
              fontSize: "clamp(0.72rem, 1.2vw, 0.82rem)",
              color: isActive ? "rgba(14,30,56,0.55)" : "rgba(14,30,56,0.32)",
              transition: "color 0.3s ease",
            }}
          >
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
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8 } } }}
      className="relative py-12 lg:py-20 overflow-hidden"
    >
      {/* Background — matches reference image exactly */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(160deg, #eef3f9 0%, #e4ecf6 30%, #edf3f9 65%, #f3f6fb 100%)",
        }}
      />
      {/* Center atmospheric depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(200,218,238,0.45) 0%, transparent 70%)",
        }}
      />

      <div className="relative px-6 lg:px-10 max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center mb-10 lg:mb-14">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#2a5090]/40 mb-4">
            Juridictions disponibles
          </p>
          <h2
            className="text-[clamp(1.6rem,3.5vw,2.8rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#0e1e38]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Le bon état, c&apos;est
            <br />
            des milliers d&apos;euros d&apos;écart.
          </h2>
          <p className="mt-3 text-[14px] text-[#0e1e38]/40 max-w-sm mx-auto leading-relaxed">
            Survolez chaque état pour découvrir son profil. On vous guide vers le vôtre.
          </p>
        </motion.div>

        {/* 3-column layout — cards | map | cards */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_200px] gap-4 lg:gap-8 items-center">
          {/* Left: WY top, NM bottom */}
          <div className="hidden lg:flex flex-col gap-[90px]">
            {[STATES[2], STATES[0]].map((s) => (
              <GlassCard
                key={s.fips}
                state={s}
                isActive={activeIdx === STATES.indexOf(s)}
                onHover={() => setActiveIdx(STATES.indexOf(s))}
                onClick={() => setActiveIdx(STATES.indexOf(s))}
              />
            ))}
          </div>

          {/* Map */}
          <USMap activeFips={activeState.fips} onStateHover={handleHover} />

          {/* Right: CO top, DE bottom */}
          <div className="hidden lg:flex flex-col gap-[90px]">
            {[STATES[1], STATES[3]].map((s) => (
              <GlassCard
                key={s.fips}
                state={s}
                isActive={activeIdx === STATES.indexOf(s)}
                onHover={() => setActiveIdx(STATES.indexOf(s))}
                onClick={() => setActiveIdx(STATES.indexOf(s))}
              />
            ))}
          </div>
        </div>

        {/* Mobile: map first (reduced), then 2×2 cards below */}
        <div className="lg:hidden">
          {/* Mobile map — tap to select state */}
          <div className="w-full mb-6">
            <USMap activeFips={activeState.fips} onStateHover={handleHover} />
            <p className="text-center text-[11px] text-[#0e1e38]/30 mt-2 tracking-wide">
              Touchez un état pour le sélectionner
            </p>
          </div>
          {/* 2×2 grid with active indicator */}
          <div className="grid grid-cols-2 gap-3">
            {STATES.map((s, i) => (
              <div key={s.fips} className="flex flex-col gap-1">
                {/* Active connector dot above card */}
                <div className="flex justify-center h-4">
                  {activeIdx === i && (
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="w-px h-2 bg-[#2a5090]/50" />
                      <div className="w-2 h-2 rounded-full bg-[#2a5090]/60" />
                    </div>
                  )}
                </div>
                <GlassCard
                  state={s}
                  isActive={activeIdx === i}
                  onHover={() => setActiveIdx(i)}
                  onClick={() => setActiveIdx(i)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Active state detail — minimal, below map */}
        <motion.div
          key={activeState.fips}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease }}
          className="mt-10 lg:mt-12 text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#2a5090]/40 mb-3">
            {activeState.name} — en savoir plus
          </p>
          <a
            href={`/creer-llc/${activeState.slug}`}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-[14px] font-semibold text-white transition-all"
            style={{
              background: "linear-gradient(135deg, #1a3a6a 0%, #2a5090 100%)",
              boxShadow: "0 4px 20px rgba(42,80,144,0.28)",
            }}
          >
            Créer ma LLC au {activeState.name}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <p className="mt-3 text-[11px] text-[#0e1e38]/30">
            {activeState.pros[0]} · {activeState.pros[1]}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
