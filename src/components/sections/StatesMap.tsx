"use client";

import { useState, useEffect, memo } from "react";
import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import { STATES, type StateInfo } from "@/lib/states";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const HIGHLIGHT_FIPS = new Set(STATES.map((s) => s.fips));

const MAP_W = 800;
const MAP_H = 500;

/* Card positions relative to the map container (percentage-based) */
const CARD_POSITIONS: Record<string, { top: string; left: string; anchor: "left" | "right" }> = {
  "56": { top: "2%", left: "0%", anchor: "left" },       // Wyoming — top-left
  "08": { top: "2%", left: "68%", anchor: "right" },      // Colorado — top-right
  "35": { top: "62%", left: "0%", anchor: "left" },       // New Mexico — bottom-left
  "10": { top: "62%", left: "68%", anchor: "right" },     // Delaware — bottom-right
};

/* ─── Map ─── */
interface GeoFeature {
  type: "Feature";
  id: string;
  geometry: GeoJSON.Geometry;
  properties: Record<string, unknown>;
}

const USMap = memo(function USMap({
  activeFips,
  centroids,
}: {
  activeFips: string | null;
  centroids: Map<string, [number, number]>;
}) {
  const [features, setFeatures] = useState<GeoFeature[]>([]);
  const [paths, setPaths] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    fetch(GEO_URL)
      .then((r) => r.json())
      .then((topology: Topology) => {
        const geojson = feature(
          topology,
          topology.objects.states as GeometryCollection,
        );
        const feats = (geojson as GeoJSON.FeatureCollection).features as GeoFeature[];
        setFeatures(feats);

        const projection = geoAlbersUsa().fitSize([MAP_W, MAP_H], geojson as GeoJSON.FeatureCollection);
        const pathGen = geoPath(projection);

        const pathMap = new Map<string, string>();
        feats.forEach((f) => {
          const d = pathGen(f.geometry);
          if (d) {
            pathMap.set(f.id, d);
            if (HIGHLIGHT_FIPS.has(f.id)) {
              const c = pathGen.centroid(f.geometry);
              centroids.set(f.id, c as [number, number]);
            }
          }
        });
        setPaths(pathMap);
      });
  }, [centroids]);

  if (paths.size === 0) return <div className="w-full aspect-[8/5]" />;

  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="w-full h-auto">
      <defs>
        <filter id="stateGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {features.map((f) => {
        const d = paths.get(f.id);
        if (!d) return null;
        const isHighlighted = HIGHLIGHT_FIPS.has(f.id);
        const isActive = activeFips === f.id;

        return (
          <path
            key={f.id}
            d={d}
            fill={
              isActive
                ? "rgba(0, 80, 180, 0.35)"
                : isHighlighted
                  ? "rgba(0, 80, 180, 0.18)"
                  : "rgba(180, 200, 220, 0.25)"
            }
            stroke={
              isHighlighted
                ? "rgba(0, 80, 180, 0.3)"
                : "rgba(180, 200, 220, 0.4)"
            }
            strokeWidth={isHighlighted ? 0.8 : 0.3}
            filter={isActive ? "url(#stateGlow)" : "none"}
            style={{ transition: "all 0.5s ease" }}
          />
        );
      })}
    </svg>
  );
});

/* ─── Glass Card ─── */
function GlassCard({
  state,
  isActive,
  onHover,
  onClick,
  position,
}: {
  state: StateInfo;
  isActive: boolean;
  onHover: () => void;
  onClick: () => void;
  position: { top: string; left: string; anchor: "left" | "right" };
}) {
  return (
    <div
      className="absolute z-10"
      style={{
        top: position.top,
        left: position.anchor === "left" ? position.left : undefined,
        right: position.anchor === "right" ? `calc(100% - ${position.left} - 30%)` : undefined,
        width: "min(30%, 260px)",
      }}
    >
      <button
        onClick={onClick}
        onMouseEnter={onHover}
        className={`w-full text-left rounded-xl p-5 lg:p-6 transition-all duration-400 cursor-pointer border ${
          isActive
            ? "bg-white/80 backdrop-blur-xl border-white/90 shadow-[0_8px_32px_rgba(0,40,104,0.08)]"
            : "bg-white/40 backdrop-blur-md border-white/50 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:bg-white/60 hover:shadow-[0_6px_24px_rgba(0,40,104,0.06)]"
        }`}
      >
        <h3
          className={`text-[clamp(0.95rem,1.5vw,1.15rem)] font-normal tracking-tight transition-colors duration-300 ${
            isActive ? "text-[#0A1628]" : "text-[#0A1628]/60"
          }`}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {state.name}
        </h3>
        <p
          className={`mt-1.5 text-[12px] lg:text-[13px] leading-relaxed transition-colors duration-300 ${
            isActive ? "text-[#0A1628]/60" : "text-[#0A1628]/35"
          }`}
        >
          {state.tagline}
        </p>
      </button>
    </div>
  );
}

/* ─── Main Component ─── */
export function StatesMap() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [centroidsMap] = useState(() => new Map<string, [number, number]>());
  const activeState = STATES[activeIdx];

  return (
    <section id="juridictions" className="relative py-16 lg:py-[120px] overflow-hidden">
      {/* Misty light background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#EEF2F7] via-[#F4F7FA] to-[#EEF2F7]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(255,255,255,0.8),transparent)]" />

      <div className="relative px-6 lg:px-10 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#0A1628]/30 mb-4">
            4 juridictions
          </p>
          <h2
            className="text-[clamp(1.6rem,3.5vw,2.8rem)] font-normal leading-[1.1] tracking-[-0.02em] text-[#0A1628]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Le bon état, c&apos;est des milliers
            <br />
            d&apos;euros de différence.
          </h2>
        </div>

        {/* Map + Glass Cards container */}
        <div className="relative max-w-[900px] mx-auto">
          {/* Glass cards — positioned around the map */}
          {STATES.map((state, idx) => {
            const pos = CARD_POSITIONS[state.fips];
            if (!pos) return null;
            return (
              <GlassCard
                key={state.fips}
                state={state}
                isActive={activeIdx === idx}
                onHover={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
                position={pos}
              />
            );
          })}

          {/* The map — centered, below cards in z-order */}
          <div className="px-[12%] py-[8%]">
            <USMap activeFips={activeState.fips} centroids={centroidsMap} />
          </div>
        </div>

        {/* Detail section below */}
        <div className="mt-12 lg:mt-16 max-w-2xl mx-auto text-center">
          <div
            key={activeIdx}
            className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl p-8 lg:p-10 shadow-[0_8px_40px_rgba(0,40,104,0.06)]"
          >
            <div className="flex items-center justify-center gap-6 flex-wrap mb-6">
              {activeState.pros.map((pro) => (
                <span
                  key={pro}
                  className="inline-flex items-center gap-2 text-[13px] text-[#0A1628]/60"
                >
                  <span className="w-1 h-1 rounded-full bg-[#002868]/40" />
                  {pro}
                </span>
              ))}
            </div>
            {activeState.cons.length > 0 && (
              <p className="text-[13px] text-[#0A1628]/30 mb-6">
                À noter : {activeState.cons.join(". ")}
              </p>
            )}
            <a
              href={`/creer-llc/${activeState.slug}`}
              className="inline-flex items-center gap-2 bg-[#002868] text-white px-6 py-3 rounded-full text-[14px] font-medium hover:bg-[#002868]/90 transition-colors"
            >
              Créer ma LLC au {activeState.name}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
