"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STEPS = [
  {
    index: "01",
    label: "Constitution du dossier",
    description: "Vous recevez un formulaire guidé. Vous renseignez votre nom, adresse, activité. 10 minutes maximum.",
    detail: "Formulaire sécurisé · Données chiffrées",
    visual: "form",
  },
  {
    index: "02",
    label: "Création de la LLC",
    description: "Nos juristes déposent votre dossier auprès du Secretary of State. Délai moyen : 7 jours ouvrés.",
    detail: "Enregistrement officiel · Registered Agent inclus",
    visual: "filing",
  },
  {
    index: "03",
    label: "Obtention de l'EIN",
    description: "L'Employer Identification Number est la carte d'identité fiscale de votre LLC. Obtenu en 48h.",
    detail: "IRS · Federal Tax ID · Débloque le compte bancaire",
    visual: "ein",
  },
  {
    index: "04",
    label: "Ouverture bancaire",
    description: "Compte Mercury ou Relay ouvert en 7 à 10 jours. Carte VISA sous 10 jours. Vous êtes opérationnel.",
    detail: "Mercury · Relay · Carte VISA Business",
    visual: "bank",
  },
];

/* ─── Step visuals ─── */
function FormVisual() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="px-5 py-3 border-b border-white/[0.06] flex items-center gap-2">
        {["#FF5F57","#FEBC2E","#28C840"].map(c => (
          <div key={c} className="w-3 h-3 rounded-full" style={{ background: c, opacity: 0.7 }} />
        ))}
        <span className="ml-2 text-[11px] text-white/20 tracking-wide">formation-dossier.pdf</span>
      </div>
      <div className="p-5 space-y-3">
        {[
          { label: "Nom du gérant", val: "Jean Dupont" },
          { label: "Dénomination LLC", val: "Dupont Ventures LLC" },
          { label: "État de création", val: "Wyoming" },
          { label: "Activité principale", val: "Conseil / Consulting" },
        ].map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="text-[11px] text-white/30 pt-0.5">{f.label}</div>
            <div className="rounded-lg px-3 py-1.5 text-[13px] text-white/70" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {f.val}
            </div>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4, ease }}
          className="mt-4 flex items-center justify-between px-4 py-2.5 rounded-xl"
          style={{ background: "rgba(42,80,144,0.15)", border: "1px solid rgba(42,80,144,0.2)" }}
        >
          <span className="text-[12px] text-[#6ea8ff]">Dossier prêt à soumettre</span>
          <svg className="w-4 h-4 text-[#6ea8ff]" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

function FilingVisual() {
  return (
    <div className="space-y-3">
      {[
        { label: "Dossier reçu", status: "done", time: "J+0" },
        { label: "Vérification juridique", status: "done", time: "J+1" },
        { label: "Dépôt Secretary of State", status: "active", time: "J+2" },
        { label: "Confirmation enregistrement", status: "pending", time: "J+7" },
      ].map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.45, ease }}
          className="flex items-center gap-4 p-3 rounded-xl"
          style={{
            background: item.status === "active" ? "rgba(42,80,144,0.12)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${item.status === "active" ? "rgba(42,80,144,0.25)" : "rgba(255,255,255,0.06)"}`,
          }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: item.status === "done" ? "rgba(16,185,129,0.15)" : item.status === "active" ? "rgba(42,80,144,0.2)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${item.status === "done" ? "rgba(16,185,129,0.3)" : item.status === "active" ? "rgba(42,80,144,0.3)" : "rgba(255,255,255,0.08)"}`,
            }}
          >
            {item.status === "done"
              ? <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
              : item.status === "active"
                ? <div className="w-2 h-2 rounded-full bg-blue-400" style={{ animation: "pulse 1.5s ease-in-out infinite" }} />
                : <div className="w-2 h-2 rounded-full bg-white/20" />
            }
          </div>
          <span className="flex-1 text-[13px]" style={{ color: item.status === "active" ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.4)" }}>{item.label}</span>
          <span className="text-[11px] text-white/25">{item.time}</span>
        </motion.div>
      ))}
    </div>
  );
}

function EINVisual() {
  return (
    <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(20,40,90,0.6), rgba(10,22,50,0.8))", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 50%, transparent)" }} />
      <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-3">Internal Revenue Service</p>
      <p className="text-[13px] text-white/50 mb-1">Employer Identification Number</p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="font-bold text-white/90 mb-6"
        style={{ fontFamily: "var(--font-heading)", fontSize: 28, letterSpacing: "0.05em" }}
      >
        85-4291037
      </motion.p>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Entité", value: "LLC" },
          { label: "Obtention", value: "48h" },
          { label: "Statut", value: "Actif" },
          { label: "Validité", value: "Permanente" },
        ].map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 * i + 0.4, duration: 0.4 }}
            className="rounded-lg p-2.5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-[10px] text-white/25 mb-1">{f.label}</p>
            <p className="text-[13px] text-white/65" style={{ fontFamily: "var(--font-heading)" }}>{f.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function BankVisual() {
  return (
    <div className="space-y-3">
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="rounded-2xl p-5 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a2a60, #0d1a40)", border: "1px solid rgba(255,255,255,0.1)", aspectRatio: "1.586" }}
      >
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2) 50%, transparent)" }} />
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] text-white/30 mb-1">Mercury Business</p>
            <p className="text-[13px] font-semibold text-white/80">Dupont Ventures LLC</p>
          </div>
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
            <circle cx="12" cy="16" r="8" fill="rgba(255,255,255,0.12)" />
            <circle cx="20" cy="16" r="8" fill="rgba(255,165,0,0.2)" />
          </svg>
        </div>
        <p className="absolute bottom-5 left-5 text-[16px] tracking-[0.2em] text-white/50 font-mono">•••• •••• •••• 4291</p>
        <div className="absolute bottom-5 right-5 flex items-center gap-1.5">
          <span className="text-[10px] text-white/30 uppercase tracking-wide">VISA</span>
        </div>
      </motion.div>
      {/* Balance */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.45, ease }}
        className="flex items-center justify-between rounded-xl px-4 py-3"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div>
          <p className="text-[10px] text-white/25 mb-0.5">Compte USD</p>
          <p className="text-[18px] font-bold text-white/80" style={{ fontFamily: "var(--font-heading)" }}>$12,450.00</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[10px] text-emerald-400/80">Actif</span>
        </div>
      </motion.div>
    </div>
  );
}

const VISUALS: Record<string, React.ReactNode> = {
  form: <FormVisual />,
  filing: <FilingVisual />,
  ein: <EINVisual />,
  bank: <BankVisual />,
};

/* ─── Main component ─── */
export function ProcessParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length));
    setActiveStep(idx);
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} style={{ height: `${STEPS.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden" style={{ background: "#060e20" }}>
        {/* Atmosphere */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(30,60,130,0.12) 0%, transparent 70%)"
        }} />

        {/* Progress bar */}
        <div className="relative z-10 h-[2px] bg-white/[0.05]">
          <motion.div
            className="h-full"
            style={{ width: progressWidth, background: "linear-gradient(90deg, #2a5090, #6ea8ff)" }}
          />
        </div>

        <div className="relative z-10 flex-1 flex flex-col px-6 lg:px-16 py-10 lg:py-14 max-w-[1280px] mx-auto w-full">
          {/* Header */}
          <div className="mb-8 lg:mb-12 flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/25 mb-3">Comment ça marche</p>
              <h2
                className="font-normal leading-none text-white"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem,4vw,3.2rem)", letterSpacing: "-0.01em" }}
              >
                Votre LLC en 4 étapes.
              </h2>
            </div>
            <p className="hidden lg:block text-[13px] text-white/30">
              Défilez pour suivre le processus
            </p>
          </div>

          {/* Step tabs */}
          <div className="flex gap-2 mb-10 overflow-x-auto pb-1">
            {STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!containerRef.current) return;
                  const top = containerRef.current.offsetTop + (i / STEPS.length) * containerRef.current.offsetHeight;
                  window.scrollTo({ top, behavior: "smooth" });
                }}
                className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2 rounded-full transition-all duration-300"
                style={{
                  background: i === activeStep ? "rgba(42,80,144,0.2)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${i === activeStep ? "rgba(42,80,144,0.35)" : "rgba(255,255,255,0.07)"}`,
                }}
              >
                <span
                  className="text-[11px] font-semibold"
                  style={{ fontFamily: "var(--font-heading)", color: i === activeStep ? "rgba(110,168,255,0.9)" : "rgba(255,255,255,0.25)" }}
                >
                  {s.index}
                </span>
                <span
                  className="text-[12px] hidden sm:block"
                  style={{ color: i === activeStep ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.3)" }}
                >
                  {s.label}
                </span>
              </button>
            ))}
          </div>

          {/* Main content — split */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-0">
            {/* Left: text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.38, ease }}
              >
                <p
                  className="text-[11px] uppercase tracking-[0.3em] mb-4"
                  style={{ color: "rgba(110,168,255,0.6)" }}
                >
                  Étape {STEPS[activeStep].index}
                </p>
                <h3
                  className="font-normal leading-[1.1] text-white mb-5"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(1.6rem,3vw,2.4rem)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {STEPS[activeStep].label}
                </h3>
                <p className="text-[15px] leading-relaxed text-white/45 mb-6 max-w-sm">
                  {STEPS[activeStep].description}
                </p>
                <div
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[12px]"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                  {STEPS[activeStep].detail}
                </div>

                {/* Step dots */}
                <div className="flex gap-2 mt-8">
                  {STEPS.map((_, i) => (
                    <div
                      key={i}
                      className="h-[3px] rounded-full transition-all duration-500"
                      style={{
                        width: i === activeStep ? 24 : 8,
                        background: i === activeStep ? "rgba(110,168,255,0.8)" : "rgba(255,255,255,0.12)",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right: visual */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -10, scale: 0.98 }}
                transition={{ duration: 0.42, ease }}
              >
                {VISUALS[STEPS[activeStep].visual]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
