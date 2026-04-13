"use client";

import { useState, useCallback, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";

import { STATES, type StateInfo } from "@/lib/states";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const HIGHLIGHT_FIPS = new Set(STATES.map((s) => s.fips));

/* ─── Icons ─── */
function StateIcon({ type }: { type: string }) {
  const cn = "w-3.5 h-3.5";
  switch (type) {
    case "shield":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "zap":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "lock":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      );
    case "building":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
        </svg>
      );
    default:
      return null;
  }
}

/* ─── Centroid helper ─── */
function getCentroid(pathData: string): [number, number] {
  // Parse the SVG path to find approximate center using bounding box
  const nums: number[] = [];
  const matches = pathData.match(/[-+]?[0-9]*\.?[0-9]+/g);
  if (!matches) return [0, 0];
  matches.forEach((m) => nums.push(parseFloat(m)));

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (let i = 0; i < nums.length; i += 2) {
    if (i + 1 < nums.length) {
      const x = nums[i], y = nums[i + 1];
      if (x < 1000 && y < 1000) { // filter out noise
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  }
  return [(minX + maxX) / 2, (minY + maxY) / 2];
}

/* ─── US Map rendered with d3-geo ─── */
interface GeoFeature {
  type: "Feature";
  id: string;
  geometry: GeoJSON.Geometry;
  properties: Record<string, unknown>;
}

const MAP_W = 800;
const MAP_H = 500;

const USMap = memo(function USMap({
  activeFips,
  onSelect,
}: {
  activeFips: string;
  onSelect: (fips: string) => void;
}) {
  const [features, setFeatures] = useState<GeoFeature[]>([]);
  const [paths, setPaths] = useState<Map<string, string>>(new Map());
  const [centroids, setCentroids] = useState<Map<string, [number, number]>>(new Map());

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
      });
  }, []);

  if (paths.size === 0) return <div className="w-full aspect-[8/5]" />;

  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="w-full h-auto">
      {/* Glow filters */}
      <defs>
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glowSoft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* All states */}
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
                ? "rgba(250,250,249,0.22)"
                : isHighlighted
                  ? "rgba(250,250,249,0.09)"
                  : "rgba(250,250,249,0.025)"
            }
            stroke={
              isActive
                ? "rgba(250,250,249,0.55)"
                : isHighlighted
                  ? "rgba(250,250,249,0.18)"
                  : "rgba(250,250,249,0.04)"
            }
            strokeWidth={isActive ? 1.4 : isHighlighted ? 0.7 : 0.2}
            filter={isActive ? "url(#glow)" : "none"}
            cursor={isHighlighted ? "pointer" : "default"}
            onMouseEnter={() => {
              if (isHighlighted) onSelect(f.id);
            }}
            onClick={() => {
              if (isHighlighted) onSelect(f.id);
            }}
            style={{ transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
          />
        );
      })}

      {/* State abbreviation labels */}
      {STATES.map((s) => {
        const c = centroids.get(s.fips);
        if (!c) return null;
        const isActive = activeFips === s.fips;

        return (
          <text
            key={s.fips}
            x={c[0]}
            y={c[1]}
            textAnchor="middle"
            dominantBaseline="central"
            fill={isActive ? "rgba(250,250,249,0.95)" : "rgba(250,250,249,0.3)"}
            fontSize={isActive ? 16 : 12}
            fontWeight={isActive ? 600 : 400}
            letterSpacing="0.1em"
            fontFamily="var(--font-body), system-ui, sans-serif"
            filter={isActive ? "url(#glowSoft)" : "none"}
            style={{
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              pointerEvents: "none",
            }}
          >
            {s.abbr}
          </text>
        );
      })}
    </svg>
  );
});

/* ─── Tab bar ─── */
function StateTabs({
  states,
  activeIdx,
  onSelect,
}: {
  states: StateInfo[];
  activeIdx: number;
  onSelect: (idx: number) => void;
}) {
  return (
    <div className="relative">
      <div className="flex">
        {states.map((s, idx) => (
          <button
            key={s.fips}
            onClick={() => onSelect(idx)}
            className={`relative flex-1 py-4 text-center text-[13px] tracking-wide font-light transition-colors duration-300 ${
              activeIdx === idx
                ? "text-[#FAFAF9]"
                : "text-[#FAFAF9]/25 hover:text-[#FAFAF9]/50"
            }`}
          >
            {s.abbr}
          </button>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#FAFAF9]/[0.06]" />
      <motion.div
        className="absolute bottom-0 h-[2px] bg-[#FAFAF9]"
        initial={false}
        animate={{
          left: `${(activeIdx / states.length) * 100}%`,
          width: `${100 / states.length}%`,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
      />
    </div>
  );
}

/* ─── Main Component ─── */
export function StatesMap() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeState = STATES[activeIdx];

  const handleMapSelect = useCallback((fips: string) => {
    const idx = STATES.findIndex((s) => s.fips === fips);
    if (idx !== -1) setActiveIdx(idx);
  }, []);

  return (
    <section
      id="juridictions"
      className="relative bg-[#002868] text-[#FAFAF9] py-[100px] lg:py-[140px] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(250,250,249,0.02),transparent)]" />

      <div className="relative px-6 lg:px-10 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#FAFAF9]/25 mb-5">
            Juridictions
          </p>
          <h2
            className="text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] font-normal tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Une maîtrise chirurgicale
            <br />
            de la carte fiscale.
          </h2>
        </div>

        {/* Map + Detail panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 relative">
            <USMap activeFips={activeState.fips} onSelect={handleMapSelect} />
          </div>

          <div className="lg:col-span-5 lg:pt-2">
            <StateTabs states={STATES} activeIdx={activeIdx} onSelect={setActiveIdx} />

            <div className="border border-[#FAFAF9]/[0.06] border-t-0 rounded-b-2xl overflow-hidden bg-[#FAFAF9]/[0.015]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="p-8 lg:p-10"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-[#FAFAF9]/35">
                      <StateIcon type={activeState.icon} />
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.15em] text-[#FAFAF9]/35">
                      {activeState.tagline}
                    </span>
                  </div>

                  <h3
                    className="text-[clamp(1.4rem,2.5vw,1.8rem)] font-normal tracking-[-0.01em] mb-8"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {activeState.name}
                  </h3>

                  <div className="mb-6">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#FAFAF9]/20 mb-4">
                      Avantages
                    </p>
                    <ul className="space-y-2.5">
                      {activeState.pros.map((pro, i) => (
                        <motion.li
                          key={pro}
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: 0.04 * i }}
                          className="flex items-start gap-2.5"
                        >
                          <span className="mt-[7px] h-1 w-1 rounded-full bg-[#FAFAF9]/40 flex-shrink-0" />
                          <span className="text-[14px] leading-relaxed text-[#FAFAF9]/55">{pro}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#FAFAF9]/20 mb-4">
                      Points d&apos;attention
                    </p>
                    <ul className="space-y-2.5">
                      {activeState.cons.map((con, i) => (
                        <motion.li
                          key={con}
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: 0.04 * (activeState.pros.length + i) }}
                          className="flex items-start gap-2.5"
                        >
                          <span className="mt-[7px] h-1 w-1 rounded-full bg-[#FAFAF9]/15 flex-shrink-0" />
                          <span className="text-[14px] leading-relaxed text-[#FAFAF9]/30">{con}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-[#FAFAF9]/[0.04]">
                    <a
                      href={`/creer-llc/${activeState.slug}`}
                      className="group inline-flex items-center gap-2 pt-5 text-[13px] tracking-wide text-[#FAFAF9]/50 hover:text-[#FAFAF9] transition-colors duration-300"
                    >
                      <span>Créer ma LLC au {activeState.name}</span>
                      <svg
                        className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
