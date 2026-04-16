"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import { STATES, type StateInfo } from "@/lib/states";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const HIGHLIGHT_FIPS = new Set(STATES.map((s) => s.fips));
const MAP_W = 800;
const MAP_H = 500;

const LINE_ANCHORS: Record<string, { cardX: number; cardY: number; midX: number; midY: number }> = {
  "35": { cardX: 55, cardY: 310, midX: 200, midY: 310 },
  "08": { cardX: 745, cardY: 180, midX: 600, midY: 180 },
  "56": { cardX: 55, cardY: 180, midX: 200, midY: 180 },
  "10": { cardX: 745, cardY: 310, midX: 600, midY: 310 },
};

interface GeoFeature {
  type: "Feature";
  id: string;
  geometry: GeoJSON.Geometry;
  properties: Record<string, unknown>;
}

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
        <radialGradient id="fog" cx="50%" cy="48%" rx="48%" ry="45%">
          <stop offset="0%" stopColor="white" />
          <stop offset="50%" stopColor="white" />
          <stop offset="72%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="88%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id="fogMask">
          <rect width={MAP_W} height={MAP_H} fill="url(#fog)" />
        </mask>
        <filter id="warmGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="glow" />
          <feFlood floodColor="rgba(200,160,80,0.4)" result="gold" />
          <feComposite in="gold" in2="glow" operator="in" result="goldGlow" />
          <feMerge>
            <feMergeNode in="goldGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="warmShine" x1="0%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="rgba(240,220,180,0.5)" />
          <stop offset="40%" stopColor="rgba(200,160,80,0.1)" />
          <stop offset="100%" stopColor="rgba(240,220,180,0.25)" />
        </linearGradient>
      </defs>

      <g mask="url(#fogMask)">
        {features.map((f) => {
          const d = paths.get(f.id);
          if (!d || HIGHLIGHT_FIPS.has(f.id)) return null;
          return <path key={f.id} d={d} fill="rgba(80,65,45,0.4)" stroke="rgba(200,160,80,0.1)" strokeWidth={0.4} />;
        })}

        {features.map((f) => {
          const d = paths.get(f.id);
          if (!d || !HIGHLIGHT_FIPS.has(f.id)) return null;
          const isActive = activeFips === f.id;
          return (
            <g
              key={f.id}
              filter={isActive ? "url(#warmGlow)" : undefined}
              style={{ cursor: "pointer", transition: "filter 0.5s ease" }}
              onMouseEnter={() => onStateHover(f.id)}
              onClick={() => onStateHover(f.id)}
            >
              <path d={d} fill={isActive ? "rgba(200,160,80,0.35)" : "rgba(160,120,60,0.2)"} stroke={isActive ? "rgba(200,160,80,0.5)" : "rgba(200,160,80,0.15)"} strokeWidth={isActive ? 1.5 : 0.8} style={{ transition: "all 0.4s ease" }} />
              <path d={d} fill="url(#warmShine)" opacity={isActive ? 0.6 : 0.25} style={{ transition: "opacity 0.4s ease" }} />
            </g>
          );
        })}

        {STATES.map((s) => {
          const c = centroids.get(s.fips);
          const a = LINE_ANCHORS[s.fips];
          if (!c || !a) return null;
          const isActive = activeFips === s.fips;
          const color = isActive ? "rgba(200,160,80,0.4)" : "rgba(200,160,80,0.12)";
          return (
            <g key={`line-${s.fips}`}>
              <polyline points={`${c[0]},${c[1]} ${a.midX},${c[1]} ${a.midX},${a.midY} ${a.cardX},${a.cardY}`} fill="none" stroke={color} strokeWidth={isActive ? 1 : 0.5} style={{ transition: "all 0.4s ease" }} />
              <circle cx={c[0]} cy={c[1]} r={isActive ? 3 : 1.5} fill={isActive ? "rgba(200,160,80,0.5)" : "rgba(200,160,80,0.2)"} style={{ transition: "all 0.4s ease" }} />
            </g>
          );
        })}
      </g>
    </svg>
  );
});

function StateCard({ state, isActive, onHover, onClick }: {
  state: StateInfo;
  isActive: boolean;
  onHover: () => void;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} onMouseEnter={onHover} className="w-full text-left cursor-pointer">
      <div
        className="rounded-lg p-4 lg:p-5 transition-all duration-500"
        style={{
          background: isActive ? "#1a1816" : "rgba(26,24,22,0.6)",
          border: `1px solid rgba(200,160,80,${isActive ? 0.15 : 0.05})`,
          boxShadow: isActive ? "0 8px 32px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.15)",
        }}
      >
        <h3
          className={`text-[clamp(0.95rem,1.4vw,1.1rem)] transition-colors duration-300 ${isActive ? "text-[#c8a050]" : "text-[#f0e8dc]/35"}`}
          style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
        >
          {state.name}
        </h3>
        <p className={`mt-1.5 text-[12px] leading-relaxed transition-colors duration-300 ${isActive ? "text-[#f0e8dc]/50" : "text-[#f0e8dc]/20"}`}>
          {state.tagline}
        </p>
      </div>
    </button>
  );
}

export function StatesMap() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeState = STATES[activeIdx];

  const handleHover = useCallback((fips: string) => {
    const idx = STATES.findIndex((s) => s.fips === fips);
    if (idx !== -1) setActiveIdx(idx);
  }, []);

  return (
    <section id="juridictions" className="relative py-20 lg:py-28 overflow-hidden border-t" style={{ borderColor: "rgba(200,160,80,0.08)" }}>
      <div className="absolute inset-0 bg-[#0f0e0c]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(60,45,20,0.4),transparent_60%)]" />

      <div className="relative px-6 lg:px-10 max-w-[1100px] mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#c8a050]/50 mb-4 text-center">4 juridictions</p>
        <h2
          className="text-[clamp(1.3rem,2.5vw,1.7rem)] text-center text-[#f0e8dc] mb-14"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 400 }}
        >
          Le bon état, des milliers d&apos;euros d&apos;écart.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_200px] gap-4 lg:gap-6 items-center">
          <div className="hidden lg:flex flex-col gap-[80px]">
            {[STATES[2], STATES[0]].map((s) => (
              <StateCard key={s.fips} state={s} isActive={activeIdx === STATES.indexOf(s)} onHover={() => setActiveIdx(STATES.indexOf(s))} onClick={() => setActiveIdx(STATES.indexOf(s))} />
            ))}
          </div>
          <USMap activeFips={activeState.fips} onStateHover={handleHover} />
          <div className="hidden lg:flex flex-col gap-[80px]">
            {[STATES[1], STATES[3]].map((s) => (
              <StateCard key={s.fips} state={s} isActive={activeIdx === STATES.indexOf(s)} onHover={() => setActiveIdx(STATES.indexOf(s))} onClick={() => setActiveIdx(STATES.indexOf(s))} />
            ))}
          </div>
        </div>

        <div className="lg:hidden grid grid-cols-2 gap-3 mt-5">
          {STATES.map((s, i) => (
            <StateCard key={s.fips} state={s} isActive={activeIdx === i} onHover={() => setActiveIdx(i)} onClick={() => setActiveIdx(i)} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={`/creer-llc/${activeState.slug}`}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-[14px] uppercase tracking-[0.08em] font-medium text-[#131110] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(200,160,80,0.3)]"
            style={{ background: "linear-gradient(135deg, #c8a050, #d4b060)" }}
          >
            Créer ma LLC au {activeState.name}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
