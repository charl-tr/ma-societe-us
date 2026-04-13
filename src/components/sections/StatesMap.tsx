"use client";

import { useState, useEffect, useRef, memo } from "react";
import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import { STATES, type StateInfo } from "@/lib/states";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const HIGHLIGHT_FIPS = new Set(STATES.map((s) => s.fips));

const MAP_W = 800;
const MAP_H = 500;

/* ─── Card anchor points (SVG coords) for connecting lines ─── */
const LINE_TARGETS: Record<string, { cardX: number; cardY: number }> = {
  "56": { cardX: 80, cardY: 60 },    // Wyoming → top-left card
  "08": { cardX: 720, cardY: 60 },   // Colorado → top-right card
  "35": { cardX: 80, cardY: 440 },   // New Mexico → bottom-left card
  "10": { cardX: 720, cardY: 440 },  // Delaware → bottom-right card
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
  onCentroidsReady,
  onStateHover,
}: {
  activeFips: string;
  onCentroidsReady: (c: Map<string, [number, number]>) => void;
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

        const pathMap = new Map<string, string>();
        const centroidMap = new Map<string, [number, number]>();

        feats.forEach((f) => {
          const d = pathGen(f.geometry);
          if (d) {
            pathMap.set(f.id, d);
            if (HIGHLIGHT_FIPS.has(f.id)) {
              const c = pathGen.centroid(f.geometry);
              centroidMap.set(f.id, c as [number, number]);
            }
          }
        });

        setPaths(pathMap);
        setCentroids(centroidMap);
        onCentroidsReady(centroidMap);
      });
  }, [onCentroidsReady]);

  if (paths.size === 0) return <div className="w-full aspect-[8/5]" />;

  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="w-full h-auto" style={{ filter: "drop-shadow(0 4px 20px rgba(0,40,104,0.06))" }}>
      <defs>
        {/* Fog mask — dissolve edges */}
        <radialGradient id="fogMask" cx="50%" cy="48%" rx="48%" ry="46%">
          <stop offset="0%" stopColor="white" />
          <stop offset="70%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id="mapFog">
          <rect width={MAP_W} height={MAP_H} fill="url(#fogMask)" />
        </mask>

        {/* 3D glow for active states */}
        <filter id="activeGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="glow" />
          <feFlood floodColor="rgba(60,130,220,0.3)" result="color" />
          <feComposite in="color" in2="glow" operator="in" result="colorGlow" />
          <feMerge>
            <feMergeNode in="colorGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Inner light for highlighted states */}
        <linearGradient id="stateShine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(200,220,240,0.2)" />
        </linearGradient>
      </defs>

      {/* Map group with fog mask */}
      <g mask="url(#mapFog)">
        {/* Background states */}
        {features.map((f) => {
          const d = paths.get(f.id);
          if (!d) return null;
          const isHighlighted = HIGHLIGHT_FIPS.has(f.id);
          const isActive = activeFips === f.id;

          if (isHighlighted) return null; // render highlighted separately on top

          return (
            <path
              key={f.id}
              d={d}
              fill="rgba(195, 210, 230, 0.3)"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth={0.5}
              style={{ transition: "all 0.5s ease" }}
            />
          );
        })}

        {/* Highlighted states — rendered on top with 3D effect */}
        {features.map((f) => {
          const d = paths.get(f.id);
          if (!d || !HIGHLIGHT_FIPS.has(f.id)) return null;
          const isActive = activeFips === f.id;

          return (
            <g
              key={f.id}
              filter={isActive ? "url(#activeGlow)" : "none"}
              style={{ transition: "filter 0.5s ease", cursor: "pointer" }}
              onMouseEnter={() => onStateHover(f.id)}
              onClick={() => onStateHover(f.id)}
            >
              {/* Shadow layer */}
              <path
                d={d}
                fill={isActive ? "rgba(40, 100, 190, 0.35)" : "rgba(60, 120, 200, 0.18)"}
                stroke="none"
                transform="translate(1, 1)"
                opacity={0.3}
              />
              {/* Main fill */}
              <path
                d={d}
                fill={isActive ? "rgba(60, 130, 220, 0.4)" : "rgba(80, 140, 220, 0.2)"}
                stroke="rgba(255,255,255,0.7)"
                strokeWidth={isActive ? 1.2 : 0.8}
                style={{ transition: "all 0.5s ease" }}
              />
              {/* Shine overlay */}
              <path
                d={d}
                fill="url(#stateShine)"
                stroke="none"
                opacity={isActive ? 0.6 : 0.3}
                style={{ transition: "opacity 0.5s ease" }}
              />
            </g>
          );
        })}

        {/* Connecting lines from states to card anchor points */}
        {STATES.map((s) => {
          const centroid = centroids.get(s.fips);
          const target = LINE_TARGETS[s.fips];
          if (!centroid || !target) return null;
          const isActive = activeFips === s.fips;

          return (
            <g key={`line-${s.fips}`}>
              <line
                x1={centroid[0]}
                y1={centroid[1]}
                x2={target.cardX}
                y2={target.cardY}
                stroke={isActive ? "rgba(60,130,220,0.4)" : "rgba(150,170,200,0.25)"}
                strokeWidth={isActive ? 1 : 0.5}
                strokeDasharray={isActive ? "none" : "4 3"}
                style={{ transition: "all 0.5s ease" }}
              />
              {/* Dot at state end */}
              <circle
                cx={centroid[0]}
                cy={centroid[1]}
                r={isActive ? 3 : 2}
                fill={isActive ? "rgba(60,130,220,0.6)" : "rgba(150,170,200,0.3)"}
                style={{ transition: "all 0.5s ease" }}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
});

/* ─── Glass Card with chrome highlight ─── */
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
      className={`w-full text-left rounded-xl overflow-hidden transition-all duration-500 cursor-pointer ${
        isActive
          ? "shadow-[0_8px_32px_rgba(0,40,104,0.10)]"
          : "shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_24px_rgba(0,40,104,0.08)]"
      }`}
    >
      {/* Chrome highlight bar — the metallic reflet at top */}
      <div
        className={`h-[3px] transition-opacity duration-500 ${
          isActive ? "opacity-100" : "opacity-40"
        }`}
        style={{
          background: "linear-gradient(90deg, rgba(200,210,225,0.3), rgba(255,255,255,0.9) 30%, rgba(220,230,245,0.6) 50%, rgba(255,255,255,0.9) 70%, rgba(200,210,225,0.3))",
        }}
      />

      {/* Card body */}
      <div
        className={`p-4 lg:p-5 border border-t-0 rounded-b-xl transition-all duration-500 ${
          isActive
            ? "bg-white/85 backdrop-blur-xl border-[#c8d4e0]/60"
            : "bg-white/50 backdrop-blur-md border-[#d4dce6]/40 hover:bg-white/70"
        }`}
      >
        <h3
          className={`text-[clamp(0.9rem,1.4vw,1.05rem)] font-normal tracking-tight transition-colors duration-300 ${
            isActive ? "text-[#0A1628]" : "text-[#0A1628]/50"
          }`}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {state.name}
        </h3>
        <p
          className={`mt-1 text-[11px] lg:text-[12px] leading-relaxed transition-colors duration-300 ${
            isActive ? "text-[#0A1628]/55" : "text-[#0A1628]/30"
          }`}
        >
          {state.tagline}
        </p>
      </div>
    </button>
  );
}

/* ─── Main Component ─── */
export function StatesMap() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [, setReady] = useState(false);
  const activeState = STATES[activeIdx];

  return (
    <section id="juridictions" className="relative py-16 lg:py-[100px] overflow-hidden">
      {/* Misty background — layered gradients for depth */}
      <div className="absolute inset-0 bg-[#EDF1F6]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_20%,rgba(255,255,255,0.9),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_70%,rgba(255,255,255,0.5),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_30%,rgba(255,255,255,0.4),transparent_50%)]" />

      <div className="relative px-6 lg:px-10 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#0A1628]/25 mb-4">
            4 juridictions
          </p>
          <h2
            className="text-[clamp(1.5rem,3.5vw,2.6rem)] font-normal leading-[1.1] tracking-[-0.02em] text-[#0A1628]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Le bon état, c&apos;est des milliers
            <br />
            d&apos;euros de différence.
          </h2>
        </div>

        {/* Map + Cards layout */}
        <div className="relative max-w-[1000px] mx-auto">
          {/* Grid: cards left | map center | cards right */}
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_200px] gap-4 lg:gap-6 items-center">
            {/* Left cards — Wyoming + New Mexico */}
            <div className="hidden lg:flex flex-col gap-6 lg:gap-[120px]">
              {[STATES[2], STATES[0]].map((state) => {
                const idx = STATES.indexOf(state);
                return (
                  <GlassCard
                    key={state.fips}
                    state={state}
                    isActive={activeIdx === idx}
                    onHover={() => setActiveIdx(idx)}
                    onClick={() => setActiveIdx(idx)}
                  />
                );
              })}
            </div>

            {/* Center — Map */}
            <div className="relative">
              <USMap
                activeFips={activeState.fips}
                onCentroidsReady={() => setReady(true)}
                onStateHover={(fips) => {
                  const idx = STATES.findIndex((s) => s.fips === fips);
                  if (idx !== -1) setActiveIdx(idx);
                }}
              />
            </div>

            {/* Right cards — Colorado + Delaware */}
            <div className="hidden lg:flex flex-col gap-6 lg:gap-[120px]">
              {[STATES[1], STATES[3]].map((state) => {
                const idx = STATES.indexOf(state);
                return (
                  <GlassCard
                    key={state.fips}
                    state={state}
                    isActive={activeIdx === idx}
                    onHover={() => setActiveIdx(idx)}
                    onClick={() => setActiveIdx(idx)}
                  />
                );
              })}
            </div>
          </div>

          {/* Mobile cards — horizontal scroll */}
          <div className="lg:hidden grid grid-cols-2 gap-3 mt-6">
            {STATES.map((state, idx) => (
              <GlassCard
                key={state.fips}
                state={state}
                isActive={activeIdx === idx}
                onHover={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
              />
            ))}
          </div>
        </div>

        {/* Detail panel below */}
        <div className="mt-10 lg:mt-14 max-w-2xl mx-auto text-center">
          <div
            key={activeIdx}
            className="rounded-2xl p-6 lg:p-8"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(240,244,250,0.5))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(200,215,235,0.4)",
              boxShadow: "0 8px 40px rgba(0,40,104,0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            <div className="flex items-center justify-center gap-4 lg:gap-6 flex-wrap mb-5">
              {activeState.pros.map((pro) => (
                <span key={pro} className="inline-flex items-center gap-2 text-[13px] text-[#0A1628]/55">
                  <span className="w-1 h-1 rounded-full bg-[#3C82DC]/50" />
                  {pro}
                </span>
              ))}
            </div>
            {activeState.cons.length > 0 && (
              <p className="text-[12px] text-[#0A1628]/30 mb-5">
                À noter : {activeState.cons.join(". ")}
              </p>
            )}
            <a
              href={`/creer-llc/${activeState.slug}`}
              className="inline-flex items-center gap-2 bg-[#002868] text-white px-6 py-2.5 rounded-full text-[13px] font-medium hover:bg-[#002868]/90 transition-colors"
            >
              Créer ma LLC au {activeState.name}
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
