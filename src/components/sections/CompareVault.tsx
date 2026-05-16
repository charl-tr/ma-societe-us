"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const WEAKNESSES = [
  { icon: "⚠", text: "Opèrent en zone grise juridique" },
  { icon: "🔓", text: "Risques URSSAF & IRS non gérés" },
  { icon: "👻", text: "Support inexistant post-création" },
  { icon: "📄", text: "Aucun juriste réel derrière" },
];

const STRENGTHS = [
  { icon: "✓", text: "Conformité IRS certifiée" },
  { icon: "✓", text: "Registered Agent agréé USA" },
  { icon: "✓", text: "Suivi post-création inclus" },
  { icon: "✓", text: "Juristes franco-américains" },
];

// ── Animation phases ──────────────────────────────────────
// 0: locked  1: bolts  2: gears  3: door-open  4: done
type Phase = 0 | 1 | 2 | 3 | 4;

// ── Bolt positions ────────────────────────────────────────
const BOLTS = [
  { x:90,  y:44,  w:16, h:22, axis:"top"   },
  { x:155, y:44,  w:16, h:22, axis:"top"   },
  { x:215, y:44,  w:16, h:22, axis:"top"   },
  { x:90,  y:258, w:16, h:22, axis:"bot"   },
  { x:155, y:258, w:16, h:22, axis:"bot"   },
  { x:215, y:258, w:16, h:22, axis:"bot"   },
  { x:246, y:95,  w:22, h:14, axis:"right" },
  { x:246, y:152, w:22, h:14, axis:"right" },
  { x:246, y:210, w:22, h:14, axis:"right" },
];

// ── Vault SVG Component ───────────────────────────────────
function Vault({ phase }: { phase: Phase }) {
  const open = phase >= 3;
  const boltsActive = phase >= 1;
  const gearsActive = phase >= 2;

  return (
    <div style={{ perspective:"900px", perspectiveOrigin:"50% 50%" }}>
      <svg
        viewBox="0 0 300 325"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        style={{ filter:"drop-shadow(0 16px 55px rgba(10,50,140,.35))" }}
      >
        <defs>
          <linearGradient id="cv2-frame" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"  stopColor="#baccde" />
            <stop offset="28%" stopColor="#deeeff" />
            <stop offset="58%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#9ab8d0" />
          </linearGradient>
          <linearGradient id="cv2-door" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"  stopColor="#c8d8f0" />
            <stop offset="38%" stopColor="#eef6ff" />
            <stop offset="68%" stopColor="#dceeff" />
            <stop offset="100%" stopColor="#a8c4e0" />
          </linearGradient>
          <radialGradient id="cv2-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="rgba(80,180,255,.7)" />
            <stop offset="40%" stopColor="rgba(29,78,216,.35)" />
            <stop offset="100%" stopColor="rgba(6,14,32,0)" />
          </radialGradient>
          <linearGradient id="cv2-handle" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor="#90b8d8" />
            <stop offset="48%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#82aaca" />
          </linearGradient>
          <linearGradient id="cv2-gear" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"  stopColor="#b0ccec" />
            <stop offset="100%" stopColor="#d8f0ff" />
          </linearGradient>
          <linearGradient id="cv2-bolt-on" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#60d0ff" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="cv2-bolt-off" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#e0f0ff" />
            <stop offset="100%" stopColor="#88b0d0" />
          </linearGradient>
          <filter id="cv2-glow-f" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="cv2-bolt-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* ── Outer frame ── */}
        <rect x={16} y={16} width={268} height={293} rx={22} fill="url(#cv2-frame)" stroke="rgba(170,210,250,.65)" strokeWidth={2} />
        <rect x={26} y={26} width={248} height={273} rx={17} fill="none" stroke="rgba(255,255,255,.55)" strokeWidth={1.5} />

        {/* ── Interior glow ── */}
        <rect x={38} y={38} width={224} height={249} rx={13}
          fill="url(#cv2-glow)"
          style={{ opacity: open ? 1 : 0, transition:"opacity .9s ease .5s" }}
        />

        {/* ── Corner gears — outside door, spin when phase≥2 ── */}
        {[{cx:70,cy:82,cw:true},{cx:230,cy:82,cw:false},{cx:70,cy:243,cw:false},{cx:230,cy:243,cw:true}].map((g,i)=>(
          <g key={i} style={{
            transformOrigin:`${g.cx}px ${g.cy}px`,
            animation: gearsActive ? `cv2-spin${g.cw?"Cw":"Ccw"} ${3.5+i*.3}s linear infinite` : "none",
          }}>
            <circle cx={g.cx} cy={g.cy} r={20} fill="none" stroke="url(#cv2-gear)" strokeWidth={3.5} strokeDasharray="8 4.5" />
            <circle cx={g.cx} cy={g.cy} r={9}  fill="url(#cv2-gear)" stroke="rgba(140,200,245,.55)" strokeWidth={1.5} />
            <circle cx={g.cx} cy={g.cy} r={3.5} fill="rgba(215,245,255,.9)" />
          </g>
        ))}

        {/* ── Vault door (3D rotation on open) ── */}
        <g style={{
          transformOrigin:"280px 162px",
          transform: open ? "perspective(600px) rotateY(-82deg)" : "perspective(600px) rotateY(0deg)",
          transition:"transform 1.1s cubic-bezier(0.22,1,0.36,1)",
        }}>
          {/* Door body */}
          <rect x={35} y={35} width={230} height={255} rx={15} fill="url(#cv2-door)" stroke="rgba(150,195,240,.85)" strokeWidth={2} />
          {/* Door sheen */}
          <rect x={46} y={46} width={105} height={230} rx={9} fill="rgba(255,255,255,.20)" />

          {/* Locking bolts */}
          {BOLTS.map((b,i) => (
            <rect
              key={i}
              x={b.x} y={b.y} width={b.w} height={b.h} rx={5}
              fill={boltsActive ? "url(#cv2-bolt-on)" : "url(#cv2-bolt-off)"}
              filter={boltsActive ? "url(#cv2-bolt-glow)" : undefined}
              style={{ transition:`fill .18s ease ${i*.08}s, filter .18s ease ${i*.08}s` }}
            />
          ))}

          {/* Handle assembly */}
          <circle cx={150} cy={162} r={54} fill="none" stroke="url(#cv2-handle)" strokeWidth={5.5} />
          <circle cx={150} cy={162} r={38} fill="rgba(218,238,255,.55)" stroke="rgba(155,200,245,.7)" strokeWidth={2} />
          {/* Cross bars */}
          <line x1={112} y1={162} x2={188} y2={162} stroke="url(#cv2-handle)" strokeWidth={5.5} strokeLinecap="round" />
          <line x1={150} y1={124} x2={150} y2={200} stroke="url(#cv2-handle)" strokeWidth={5.5} strokeLinecap="round" />
          {/* Diagonal bars */}
          <line x1={123} y1={135} x2={177} y2={189} stroke="rgba(175,215,248,.68)" strokeWidth={2.5} strokeLinecap="round" />
          <line x1={177} y1={135} x2={123} y2={189} stroke="rgba(175,215,248,.68)" strokeWidth={2.5} strokeLinecap="round" />
          {/* Center knob */}
          <circle cx={150} cy={162} r={15} fill="url(#cv2-gear)" filter="url(#cv2-glow-f)" />
          <circle cx={150} cy={162} r={9}  fill="url(#cv2-handle)" />
          <circle cx={150} cy={162} r={3.5} fill="rgba(210,240,255,.92)" />
        </g>

        <style>{`
          @keyframes cv2-spinCw  { to { transform: rotate(360deg)  } }
          @keyframes cv2-spinCcw { to { transform: rotate(-360deg) } }
        `}</style>
      </svg>
    </div>
  );
}

// ── Compare card ──────────────────────────────────────────
function CompareCard({ side, title, items, isInView }: {
  side: "left" | "right";
  title: string;
  items: { icon: string; text: string }[];
  isInView: boolean;
}) {
  const left = side === "left";
  return (
    <motion.div
      initial={{ opacity:0, x: left ? -28 : 28 }}
      animate={isInView ? { opacity:1, x:0 } : {}}
      transition={{ duration:.8, delay:.25, ease:EASE }}
      className="relative rounded-2xl p-6 flex flex-col overflow-hidden"
      style={{
        background: left
          ? "linear-gradient(135deg,rgba(130,20,20,.08),rgba(255,255,255,.88))"
          : "linear-gradient(135deg,rgba(20,70,200,.07),rgba(255,255,255,.92))",
        border: left ? "1px solid rgba(192,57,43,.2)" : "1px solid rgba(29,78,216,.2)",
        backdropFilter:"blur(16px)",
        boxShadow: left ? "0 6px 36px rgba(192,57,43,.09)" : "0 6px 36px rgba(29,78,216,.10)",
      }}
    >
      {/* Top chrome bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{
        background: left
          ? "linear-gradient(90deg,transparent,rgba(192,57,43,.55),transparent)"
          : "linear-gradient(90deg,transparent,rgba(29,78,216,.55),transparent)",
      }} />

      <div className="mb-5">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3"
          style={{
            fontFamily:"var(--font-heading)",
            background: left ? "rgba(192,57,43,.1)" : "rgba(29,78,216,.1)",
            color: left ? "#c0392b" : "#1d4ed8",
          }}
        >
          {left ? "⚠ Leurs risques" : "✦ Votre bouclier"}
        </span>
        <h3 className="text-[17px] font-semibold text-[#0e1e3a] leading-snug" style={{fontFamily:"var(--font-cormorant)"}}>{title}</h3>
      </div>

      <ul className="flex flex-col gap-3.5 flex-1">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity:0, x: left ? -14 : 14 }}
            animate={isInView ? { opacity:1, x:0 } : {}}
            transition={{ duration:.5, delay:.4+i*.1, ease:EASE }}
            className="flex items-start gap-3"
          >
            <span
              className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold"
              style={{ background: left ? "rgba(192,57,43,.12)" : "rgba(29,78,216,.1)", color: left ? "#c0392b" : "#1d4ed8" }}
            >
              {left ? "✕" : "✓"}
            </span>
            <span className="text-[13px] text-[#2a3a4e] leading-relaxed" style={{fontFamily:"var(--font-body)"}}>{item.text}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────
export function CompareVault() {
  const ref      = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once:true, margin:"-60px" });
  const [phase, setPhase] = useState<Phase>(0);

  // Choreographed multi-phase sequence
  useEffect(() => {
    if (!isInView) return;
    const t1 = setTimeout(() => setPhase(1), 300);   // bolts light up
    const t2 = setTimeout(() => setPhase(2), 900);   // gears start spinning
    const t3 = setTimeout(() => setPhase(3), 1600);  // door swings open
    const t4 = setTimeout(() => setPhase(4), 2800);  // done
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [isInView]);

  return (
    <section
      className="relative overflow-hidden py-24 px-4"
      style={{ background:"linear-gradient(180deg,#e8f2fc 0%,#f3f8ff 100%)" }}
    >
      <style>{`
        @keyframes cv2-shimmer {
          0%  { background-position:-200% center }
          100%{ background-position:200%  center }
        }
      `}</style>

      {/* BG texture */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute rounded-full" style={{ width:700,height:700,top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:"radial-gradient(circle,rgba(29,78,216,.04) 0%,transparent 70%)" }} />
      </div>

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">

        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity:0, y:28 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:.75, ease:EASE }}
        >
          <p className="text-[11px] uppercase tracking-[.28em] text-[#1a2a40]/30 mb-3" style={{fontFamily:"var(--font-body)"}}>Pourquoi nous choisir</p>
          <h2 className="font-semibold text-[#0e1e3a] leading-tight" style={{fontFamily:"var(--font-cormorant)",fontSize:"clamp(2rem,4.5vw,3.4rem)"}}>
            Pourquoi nous font-ils confiance&nbsp;?
          </h2>
          <p className="mt-2 text-[#4a6280] text-base" style={{fontFamily:"var(--font-body)"}}>
            La différence entre un prestataire opaque et un partenaire certifié.
          </p>
        </motion.div>

        {/* 3-column */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px_1fr] gap-7 items-center">

          <CompareCard side="left" title="Ce que risquent vos concurrents" items={WEAKNESSES} isInView={isInView} />

          {/* Center vault */}
          <motion.div
            className="flex flex-col items-center gap-5"
            initial={{ opacity:0, scale:.88, y:20 }}
            animate={isInView ? { opacity:1, scale:1, y:0 } : {}}
            transition={{ duration:1.0, delay:.1, ease:EASE }}
          >
            {/* Badge */}
            <div
              className="text-center px-4 py-2 rounded-xl"
              style={{ background:"rgba(29,78,216,.07)", border:"1px solid rgba(29,78,216,.14)" }}
            >
              <span className="text-[10px] font-bold uppercase tracking-[.22em] text-[#1d4ed8]" style={{fontFamily:"var(--font-heading)"}}>
                MA SOCIÉTÉ US
              </span>
            </div>

            {/* Phase indicator */}
            <AnimatePresence mode="wait">
              <motion.p
                key={phase}
                className="text-[11px] text-center text-[#4a6280]"
                style={{fontFamily:"var(--font-body)"}}
                initial={{ opacity:0, y:6 }}
                animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, y:-6 }}
                transition={{ duration:.3 }}
              >
                {phase === 0 && "Verrouillé"}
                {phase === 1 && "Vérification des accès…"}
                {phase === 2 && "Mécanisme en cours…"}
                {phase === 3 && "Ouverture sécurisée"}
                {phase === 4 && "Protection active ✓"}
              </motion.p>
            </AnimatePresence>

            <Vault phase={phase} />

            {/* Trust badge */}
            <motion.div
              initial={{ opacity:0, y:10 }}
              animate={isInView && phase >= 4 ? { opacity:1, y:0 } : {}}
              transition={{ duration:.6, ease:EASE }}
            >
              <div
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold"
                style={{ fontFamily:"var(--font-heading)", background:"linear-gradient(135deg,rgba(29,78,216,.14),rgba(29,78,216,.06))", border:"1px solid rgba(29,78,216,.22)", color:"#1d4ed8", boxShadow:"0 4px 16px rgba(29,78,216,.12)" }}
              >
                <span>🔐</span>
                <span>Protection totale</span>
              </div>
            </motion.div>
          </motion.div>

          <CompareCard side="right" title="Ce que vous obtenez avec nous" items={STRENGTHS} isInView={isInView} />
        </div>

        {/* Trust stats bar */}
        <motion.div
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity:0, y:20 }}
          animate={isInView && phase >= 4 ? { opacity:1, y:0 } : {}}
          transition={{ duration:.7, delay:.1, ease:EASE }}
        >
          {[
            { n:"+500", label:"LLC créées" },
            { n:"5 ★",  label:"Avis clients" },
            { n:"100%", label:"Conformité IRS" },
            { n:"48h",  label:"Délai moyen" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center py-5 px-4 rounded-xl relative overflow-hidden"
              style={{ background:"rgba(255,255,255,.72)", border:"1px solid rgba(29,78,216,.1)", backdropFilter:"blur(12px)" }}
              whileHover={{ scale:1.03, boxShadow:"0 8px 28px rgba(29,78,216,.12)" }}
              transition={{ type:"spring", stiffness:400, damping:25 }}
            >
              {/* Chrome bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background:"linear-gradient(90deg,transparent,rgba(29,78,216,.40),transparent)" }} />
              <div className="text-2xl font-bold text-[#1d4ed8]" style={{fontFamily:"var(--font-heading)"}}>{stat.n}</div>
              <div className="text-[11px] text-[#5a7a9c] mt-1" style={{fontFamily:"var(--font-body)"}}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
