"use client";

import { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

/* ─── State data ─── */
interface StateInfo {
  name: string;
  abbr: string;
  tagline: string;
  fips: string;
  icon: string;
  coordinates: [number, number]; // [lng, lat] for marker placement
  pros: string[];
  cons: string[];
}

const STATES: StateInfo[] = [
  {
    name: "Nouveau-Mexique",
    abbr: "NM",
    tagline: "Obtention de l'EIN en 5 à 6 jours",
    fips: "35",
    icon: "shield",
    coordinates: [-106.0, 34.4],
    pros: [
      "Anonymat total des actionnaires",
      "Aucune obligation comptable",
      "Fiscalité attractive (jusqu'à 0%)",
      "Gestion simplifiée",
      "Recommandé pour les entrepreneurs étrangers",
    ],
    cons: ["Délai légèrement plus long que le Colorado"],
  },
  {
    name: "Colorado",
    abbr: "CO",
    tagline: "Rapidité absolue — Création en 24h",
    fips: "08",
    icon: "zap",
    coordinates: [-105.5, 39.0],
    pros: [
      "EIN obtenu le plus rapidement",
      "Écosystème startup-friendly",
      "Procédure simplifiée",
    ],
    cons: ["Annual Report obligatoire", "Moins d'anonymat"],
  },
  {
    name: "Wyoming",
    abbr: "WY",
    tagline: "L'état de prédilection pour les structures Crypto",
    fips: "56",
    icon: "lock",
    coordinates: [-107.5, 43.0],
    pros: [
      "Législation pro-blockchain",
      "Anonymat garanti",
      "Pas d'impôt sur le revenu de l'État",
    ],
    cons: ["Moins adapté aux activités classiques"],
  },
  {
    name: "Delaware",
    abbr: "DE",
    tagline: "Le standard pour la valorisation et la levée de fonds",
    fips: "10",
    icon: "building",
    coordinates: [-75.5, 39.0],
    pros: [
      "Court of Chancery spécialisée",
      "Idéal pour levée de fonds",
      "Prestige institutionnel maximum",
    ],
    cons: ["Franchise Tax annuelle", "Plus adapté aux C-Corps"],
  },
];

const FIPS_MAP = new Map(STATES.map((s) => [s.fips, s]));
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

/* ─── Map with overlay markers ─── */
const USMap = memo(function USMap({
  activeFips,
  onSelect,
}: {
  activeFips: string;
  onSelect: (fips: string) => void;
}) {
  return (
    <ComposableMap
      projection="geoAlbersUsa"
      projectionConfig={{ scale: 1000 }}
      width={800}
      height={500}
      style={{ width: "100%", height: "auto" }}
    >
      {/* Glow filter for active state */}
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

      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const fips = geo.id;
            const isHighlighted = HIGHLIGHT_FIPS.has(fips);
            const isActive = activeFips === fips;

            return (
              <Geography
                key={geo.rpiKey ?? geo.id}
                geography={geo}
                onMouseEnter={() => {
                  if (isHighlighted) onSelect(fips);
                }}
                onClick={() => {
                  if (isHighlighted) onSelect(fips);
                }}
                style={{
                  default: {
                    fill: isActive
                      ? "rgba(250,250,249,0.22)"
                      : isHighlighted
                        ? "rgba(250,250,249,0.09)"
                        : "rgba(250,250,249,0.025)",
                    stroke: isActive
                      ? "rgba(250,250,249,0.55)"
                      : isHighlighted
                        ? "rgba(250,250,249,0.18)"
                        : "rgba(250,250,249,0.04)",
                    strokeWidth: isActive ? 1.4 : isHighlighted ? 0.7 : 0.2,
                    outline: "none",
                    cursor: isHighlighted ? "pointer" : "default",
                    filter: isActive ? "url(#glow)" : "none",
                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  },
                  hover: {
                    fill: isHighlighted
                      ? "rgba(250,250,249,0.16)"
                      : "rgba(250,250,249,0.035)",
                    stroke: isHighlighted
                      ? "rgba(250,250,249,0.35)"
                      : "rgba(250,250,249,0.04)",
                    strokeWidth: isHighlighted ? 1 : 0.2,
                    outline: "none",
                    cursor: isHighlighted ? "pointer" : "default",
                    filter: isHighlighted ? "url(#glowSoft)" : "none",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  },
                  pressed: {
                    fill: isHighlighted
                      ? "rgba(250,250,249,0.22)"
                      : "rgba(250,250,249,0.025)",
                    outline: "none",
                  },
                }}
              />
            );
          })
        }
      </Geographies>

      {/* State abbreviation labels */}
      {STATES.map((s) => {
        const isActive = activeFips === s.fips;
        return (
          <Marker key={s.fips} coordinates={s.coordinates}>
            <text
              textAnchor="middle"
              dominantBaseline="central"
              fill={isActive ? "rgba(250,250,249,0.95)" : "rgba(250,250,249,0.3)"}
              fontSize={isActive ? 16 : 12}
              fontWeight={isActive ? 600 : 400}
              letterSpacing="0.1em"
              fontFamily="var(--font-body), system-ui, sans-serif"
              style={{
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                pointerEvents: "none",
                filter: isActive ? "url(#glowSoft)" : "none",
              }}
            >
              {s.abbr}
            </text>
          </Marker>
        );
      })}
    </ComposableMap>
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
      {/* Background line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#FAFAF9]/[0.06]" />
      {/* Animated indicator */}
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
      className="relative bg-[#0F0E0D] text-[#FAFAF9] py-[100px] lg:py-[140px] overflow-hidden"
    >
      {/* Subtle ambient glow */}
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

        {/* Map + Detail panel side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Map */}
          <div className="lg:col-span-7 relative">
            <USMap activeFips={activeState.fips} onSelect={handleMapSelect} />
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-5 lg:pt-2">
            {/* Tabs */}
            <StateTabs
              states={STATES}
              activeIdx={activeIdx}
              onSelect={setActiveIdx}
            />

            {/* Content card */}
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
                  {/* Tagline */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-[#FAFAF9]/35">
                      <StateIcon type={activeState.icon} />
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.15em] text-[#FAFAF9]/35">
                      {activeState.tagline}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-[clamp(1.4rem,2.5vw,1.8rem)] font-normal tracking-[-0.01em] mb-8"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {activeState.name}
                  </h3>

                  {/* Pros */}
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
                          <span className="text-[14px] leading-relaxed text-[#FAFAF9]/55">
                            {pro}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
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
                          <span className="text-[14px] leading-relaxed text-[#FAFAF9]/30">
                            {con}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="pt-2 border-t border-[#FAFAF9]/[0.04]">
                    <a
                      href="#contact"
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
