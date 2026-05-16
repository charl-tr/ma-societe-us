"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// ── Spring physics: underdamped for dramatic overshoot/wobble ─
const K = 110, C = 8, M = 1.0;
const DT = 1 / 60;

// ── Scale geometry ────────────────────────────────────────
const PX = 400, PY = 205;          // pivot centre
const AL = 185, CL = 92, SP = 86;  // arm, chain, spread
const PRX = 90, PRY = 23;          // pan radii
const MAX_TILT = 24;               // degrees

function scaleGeo(deg: number) {
  const r = (deg * Math.PI) / 180;
  const c = Math.cos(r), s = Math.sin(r);
  const lT = { x: PX - AL * c, y: PY + AL * s };
  const rT = { x: PX + AL * c, y: PY - AL * s };
  const lP = { x: lT.x, y: lT.y + CL };
  const rP = { x: rT.x, y: rT.y + CL };
  const f = (n: number) => n.toFixed(2);
  return {
    lP, rP,
    lC: [
      `M${f(lT.x)} ${f(lT.y)} L${f(lP.x - SP)} ${f(lP.y)}`,
      `M${f(lT.x)} ${f(lT.y)} L${f(lP.x)} ${f(lP.y)}`,
      `M${f(lT.x)} ${f(lT.y)} L${f(lP.x + SP)} ${f(lP.y)}`,
    ],
    rC: [
      `M${f(rT.x)} ${f(rT.y)} L${f(rP.x - SP)} ${f(rP.y)}`,
      `M${f(rT.x)} ${f(rT.y)} L${f(rP.x)} ${f(rP.y)}`,
      `M${f(rT.x)} ${f(rT.y)} L${f(rP.x + SP)} ${f(rP.y)}`,
    ],
  };
}

const G0 = scaleGeo(0);

// ── Character reveal animation ────────────────────────────
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function CharReveal({ text, delay = 0, color }: { text: string; delay?: number; color: string }) {
  return (
    <span className="inline-flex overflow-hidden" aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: delay + i * 0.06, ease: EASE }}
          style={{ color, display: "inline-block" }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export function TaxBalance() {
  const sectionRef  = useRef<HTMLElement>(null);
  const svgWrapRef  = useRef<HTMLDivElement>(null);
  const armRef      = useRef<SVGGElement>(null);
  const lPanRef     = useRef<SVGGElement>(null);
  const rPanRef     = useRef<SVGGElement>(null);
  const lGlowRef    = useRef<SVGEllipseElement>(null);
  const rGlowRef    = useRef<SVGEllipseElement>(null);
  const lCRefs      = useRef<(SVGPathElement | null)[]>([null, null, null]);
  const rCRefs      = useRef<(SVGPathElement | null)[]>([null, null, null]);
  const ptcRef      = useRef<HTMLDivElement>(null);

  // InView trigger — fires reliably when section enters viewport
  const isInView = useInView(sectionRef, { once: true, margin: "-60px 0px" });
  const targetRef     = useRef(0);
  const hasTriggered  = useRef(false);

  // When visible → set target and let spring do the physics
  useEffect(() => {
    if (!isInView || hasTriggered.current) return;
    hasTriggered.current = true;
    const t = setTimeout(() => { targetRef.current = MAX_TILT; }, 450);
    return () => clearTimeout(t);
  }, [isInView]);

  useEffect(() => {
    let animId: number;
    let curTilt = 0, curVel = 0;

    function tick() {
      const target = targetRef.current;
      const accel = ((target - curTilt) * K - curVel * C) / M;
      curVel += accel * DT;
      curTilt += curVel * DT;
      // Allow slight overshoot for wobble feel
      curTilt = Math.max(-5, Math.min(MAX_TILT + 10, curTilt));

      const g = scaleGeo(curTilt);
      const t = Math.max(0, Math.min(1, curTilt / MAX_TILT));

      // ── SVG attribute transforms — immune to React reconciliation ──
      // Arm: rotate(angle, cx, cy) is native SVG, no CSS needed
      armRef.current?.setAttribute(
        "transform",
        `rotate(${curTilt.toFixed(3)}, ${PX}, ${PY})`
      );

      // Pans: translate via SVG attribute
      lPanRef.current?.setAttribute(
        "transform",
        `translate(${(g.lP.x - G0.lP.x).toFixed(2)}, ${(g.lP.y - G0.lP.y).toFixed(2)})`
      );
      rPanRef.current?.setAttribute(
        "transform",
        `translate(${(g.rP.x - G0.rP.x).toFixed(2)}, ${(g.rP.y - G0.rP.y).toFixed(2)})`
      );

      // Chains
      g.lC.forEach((d, i) => lCRefs.current[i]?.setAttribute("d", d));
      g.rC.forEach((d, i) => rCRefs.current[i]?.setAttribute("d", d));

      // Glow intensity driven by tilt progress
      if (lGlowRef.current) lGlowRef.current.style.opacity = String(0.25 + t * 0.65);
      if (rGlowRef.current) rGlowRef.current.style.opacity = String(0.15 + t * 0.55);

      // Particles appear when tilted > 60%
      if (ptcRef.current)
        ptcRef.current.style.opacity = String(t > 0.6 ? Math.min(1, (t - 0.6) / 0.4) : 0);

      animId = requestAnimationFrame(tick);
    }

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24"
      style={{ background: "linear-gradient(160deg,#060e1e 0%,#0b1828 55%,#070e1c 100%)" }}
    >
      <style>{`
        @keyframes tb-float {
          0%,100% { transform: translateY(0px) }
          50%      { transform: translateY(-9px) }
        }
        @keyframes tb-sweep {
          0%   { background-position: -300% center }
          100% { background-position: 300% center }
        }
        @keyframes tb-ptc {
          0%   { transform: translateY(0)   scale(1);   opacity: .8 }
          100% { transform: translateY(-90px) scale(.15); opacity: 0 }
        }
        @keyframes tb-pulse {
          0%,100% { opacity:.35 }
          50%      { opacity:.65 }
        }
        .tb-float { animation: tb-float 5s ease-in-out infinite }
        .tb-sweep {
          background: linear-gradient(90deg,
            transparent 0%, rgba(255,255,255,.55) 40%,
            rgba(210,238,255,.45) 55%, transparent 100%
          );
          background-size: 200% 100%;
          animation: tb-sweep 3.5s linear infinite;
        }
        .tb-ptc { animation: tb-ptc 2.2s ease-out infinite }
      `}</style>

      {/* Atmospheric BG orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute rounded-full" style={{ width:700,height:700,top:"5%",left:"50%",transform:"translateX(-50%)",background:"radial-gradient(circle,rgba(30,90,220,.06) 0%,transparent 70%)",filter:"blur(70px)" }} />
        <div className="absolute rounded-full" style={{ width:360,height:360,bottom:"0%",left:"8%",background:"radial-gradient(circle,rgba(230,70,50,.05) 0%,transparent 70%)",filter:"blur(50px)" }} />
        <div className="absolute rounded-full" style={{ width:360,height:360,bottom:"0%",right:"8%",background:"radial-gradient(circle,rgba(50,150,255,.05) 0%,transparent 70%)",filter:"blur(50px)" }} />
      </div>

      {/* Heading */}
      <motion.div
        className="text-center mb-14 px-4 relative z-10"
        initial={{ opacity:0, y:22 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:.7, ease:EASE }}
      >
        <p className="text-[11px] uppercase tracking-[.28em] text-white/30 mb-3" style={{fontFamily:"var(--font-body)"}}>
          France vs États-Unis
        </p>
        <h2 className="font-semibold text-white leading-tight" style={{fontFamily:"var(--font-cormorant)",fontSize:"clamp(2rem,4.5vw,3.4rem)"}}>
          Pourquoi vous payez trop&nbsp;?
        </h2>
        <p className="mt-2 text-white/30 text-sm italic" style={{fontFamily:"var(--font-body)"}}>
          La balance bascule en physique réelle dès l&rsquo;affichage
        </p>
      </motion.div>

      {/* 3-column */}
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[1fr_480px_1fr] gap-10 items-center relative z-10">

        {/* ── Left: France ── */}
        <motion.div
          className="flex flex-col gap-5 md:text-right order-2 md:order-1"
          initial={{ opacity:0, x:-36 }}
          whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true }}
          transition={{ duration:.9, delay:.15, ease:EASE }}
        >
          <div>
            <p className="text-[10px] uppercase tracking-[.25em] text-white/30 mb-2" style={{fontFamily:"var(--font-body)"}}>SARL / SAS France</p>
            <div
              className="font-bold leading-none"
              style={{ fontFamily:"var(--font-heading)", fontSize:"clamp(4.5rem,9vw,7rem)", textShadow:"0 0 80px rgba(240,80,55,.4),0 0 24px rgba(240,80,55,.2)" }}
            >
              <CharReveal text="45%" delay={.3} color="#f56045" />
            </div>
            <p className="text-white/35 text-sm mt-2" style={{fontFamily:"var(--font-body)"}}>de charges & impôts</p>
          </div>
          <ul className="flex flex-col gap-2.5">
            {["Charges sociales 40%+","Impôt sur les bénéfices","Comptabilité annuelle obligatoire"].map((item,i) => (
              <motion.li
                key={item}
                className="flex items-center md:justify-end gap-2.5"
                initial={{ opacity:0, x:-16 }}
                whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }}
                transition={{ delay:.4+i*.1, ease:EASE }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#f56045]/60 flex-shrink-0 md:order-2" />
                <span className="text-[13px] text-white/35 md:order-1" style={{fontFamily:"var(--font-body)"}}>{item}</span>
              </motion.li>
            ))}
          </ul>
          <motion.div
            className="md:self-end px-4 py-2 rounded-full text-[12px] font-semibold text-[#f56045] border border-[#f56045]/25 bg-[#f56045]/[.07]"
            style={{fontFamily:"var(--font-heading)"}}
            initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:.7 }}
          >
            Lourd & pénalisant
          </motion.div>
        </motion.div>

        {/* ── Center: SVG ── */}
        <div ref={svgWrapRef} className="w-full order-1 md:order-2 relative">
          {/* Floating particles (LLC side) */}
          <div
            ref={ptcRef}
            className="pointer-events-none absolute z-20"
            style={{ right:"8%", top:"38%", opacity:0, transition:"opacity .4s" }}
          >
            {([5,7,4,6,5,8,4] as const).map((sz,i) => (
              <div
                key={i}
                className="tb-ptc absolute rounded-full bg-[#60c0ff]"
                style={{
                  width: sz, height: sz,
                  left: (i%3)*18 - 18,
                  top: Math.floor(i/3)*18,
                  animationDelay:`${i*.28}s`,
                  animationDuration:`${1.8+i*.18}s`,
                  opacity:.8,
                }}
              />
            ))}
          </div>

          <motion.div
            className="tb-float"
            initial={{ opacity:0, scale:.93 }}
            whileInView={{ opacity:1, scale:1 }}
            viewport={{ once:true }}
            transition={{ duration:1.1, ease:EASE }}
          >
            <svg
              viewBox="0 0 800 490"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              style={{ filter:"drop-shadow(0 24px 70px rgba(0,10,50,.7))" }}
            >
              <defs>
                <linearGradient id="tb2-pole" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"  stopColor="#1e3a5a" />
                  <stop offset="22%" stopColor="#4a7aaa" />
                  <stop offset="50%" stopColor="#d8f0ff" />
                  <stop offset="78%" stopColor="#3a6090" />
                  <stop offset="100%" stopColor="#1a3050" />
                </linearGradient>
                <linearGradient id="tb2-arm" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="rgba(230,248,255,.99)" />
                  <stop offset="40%"  stopColor="rgba(155,215,255,.92)" />
                  <stop offset="100%" stopColor="rgba(65,120,185,.80)" />
                </linearGradient>
                <radialGradient id="tb2-pivot" cx="33%" cy="28%" r="68%">
                  <stop offset="0%"   stopColor="#eaf8ff" />
                  <stop offset="58%"  stopColor="#88c2e8" />
                  <stop offset="100%" stopColor="#305880" />
                </radialGradient>
                <radialGradient id="tb2-panL" cx="28%" cy="25%" r="72%">
                  <stop offset="0%"  stopColor="#fff6f3" />
                  <stop offset="45%" stopColor="#e8a898" />
                  <stop offset="100%" stopColor="#8c3828" />
                </radialGradient>
                <radialGradient id="tb2-panR" cx="28%" cy="25%" r="72%">
                  <stop offset="0%"  stopColor="#eef8ff" />
                  <stop offset="45%" stopColor="#88c8f5" />
                  <stop offset="100%" stopColor="#1858a8" />
                </radialGradient>
                <linearGradient id="tb2-base" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#3a6080" />
                  <stop offset="50%"  stopColor="#7aaccb" />
                  <stop offset="100%" stopColor="#1a3050" />
                </linearGradient>
                <radialGradient id="tb2-glowL" cx="50%" cy="35%" r="55%">
                  <stop offset="0%"   stopColor="rgba(240,80,50,.7)" />
                  <stop offset="100%" stopColor="rgba(240,80,50,0)" />
                </radialGradient>
                <radialGradient id="tb2-glowR" cx="50%" cy="35%" r="55%">
                  <stop offset="0%"   stopColor="rgba(50,155,255,.6)" />
                  <stop offset="100%" stopColor="rgba(50,155,255,0)" />
                </radialGradient>
                <filter id="tb2-dropL" x="-40%" y="-20%" width="180%" height="200%">
                  <feDropShadow dx="0" dy="14" stdDeviation="18" floodColor="rgba(240,70,40,.55)" />
                </filter>
                <filter id="tb2-dropR" x="-40%" y="-20%" width="180%" height="200%">
                  <feDropShadow dx="0" dy="14" stdDeviation="18" floodColor="rgba(40,140,255,.50)" />
                </filter>
                <filter id="tb2-armFx" x="-5%" y="-50%" width="110%" height="200%">
                  <feDropShadow dx="0" dy="7" stdDeviation="9" floodColor="rgba(0,10,50,.65)" />
                </filter>
              </defs>

              {/* Base */}
              <ellipse cx={400} cy={462} rx={120} ry={18} fill="url(#tb2-base)" opacity={.95} />
              <ellipse cx={400} cy={462} rx={84}  ry={10} fill="none" stroke="rgba(100,185,255,.22)" strokeWidth={1.5} />
              <rect x={385} y={434} width={30} height={30} rx={7} fill="url(#tb2-base)" />

              {/* Pole */}
              <rect x={387} y={22} width={26} height={416} rx={11} fill="url(#tb2-pole)" />
              <rect x={393} y={26} width={7}  height={406} rx={3.5} fill="rgba(215,245,255,.18)" />
              <circle cx={400} cy={22} r={16} fill="url(#tb2-pivot)" />
              <circle cx={400} cy={22} r={8}  fill="rgba(255,255,255,.62)" />

              {/* Pivot sphere */}
              <circle cx={PX} cy={PY} r={22} fill="url(#tb2-pivot)" filter="url(#tb2-armFx)" />
              <circle cx={PX-6} cy={PY-6} r={8} fill="rgba(255,255,255,.65)" />
              <circle cx={PX} cy={PY} r={27} fill="none" stroke="rgba(140,208,255,.15)" strokeWidth={2} />

              {/* Arm — SVG attribute transform, updated by RAF */}
              <g ref={armRef}>
                {/* Bar */}
                <rect
                  x={PX-AL-13} y={PY-8} width={(AL+13)*2} height={16} rx={8}
                  fill="url(#tb2-arm)" filter="url(#tb2-armFx)"
                />
                {/* Highlight stripe (SVG, not CSS background) */}
                <rect
                  x={PX-AL+18} y={PY-5} width={(AL-18)*2} height={3} rx={1.5}
                  fill="rgba(255,255,255,0.42)"
                />
                {/* Tip caps */}
                <circle cx={PX-AL} cy={PY} r={12} fill="url(#tb2-arm)" />
                <circle cx={PX+AL} cy={PY} r={12} fill="url(#tb2-arm)" />
                {/* Tip specular dots */}
                <circle cx={PX-AL-3} cy={PY-4} r={4} fill="rgba(255,255,255,.65)" />
                <circle cx={PX+AL-3} cy={PY-4} r={4} fill="rgba(255,255,255,.65)" />
              </g>

              {/* Chains */}
              {[0,1,2].map((i) => (
                <path key={`lc-${i}`} ref={(el)=>{ lCRefs.current[i]=el }} d={G0.lC[i]}
                  stroke="rgba(155,208,252,.78)" strokeWidth={i===1?3:2} fill="none" strokeLinecap="round" />
              ))}
              {[0,1,2].map((i) => (
                <path key={`rc-${i}`} ref={(el)=>{ rCRefs.current[i]=el }} d={G0.rC[i]}
                  stroke="rgba(155,208,252,.78)" strokeWidth={i===1?3:2} fill="none" strokeLinecap="round" />
              ))}

              {/* Left pan (France — heavy) — SVG attribute transform */}
              <g ref={lPanRef}>
                <ellipse ref={lGlowRef} cx={G0.lP.x} cy={G0.lP.y+28} rx={PRX+55} ry={46} fill="url(#tb2-glowL)" style={{ opacity:.25 }} />
                <ellipse cx={G0.lP.x} cy={G0.lP.y} rx={PRX} ry={PRY} fill="url(#tb2-panL)" stroke="rgba(240,130,100,.8)" strokeWidth={2.5} filter="url(#tb2-dropL)" />
                <ellipse cx={G0.lP.x} cy={G0.lP.y-8} rx={PRX-13} ry={PRY-9} fill="none" stroke="rgba(255,215,198,.62)" strokeWidth={1.5} />
                {/* Tax bricks */}
                {[{x:-42,w:30},{x:-8,w:30},{x:26,w:30}].map((b,i)=>(
                  <g key={i}>
                    <rect x={G0.lP.x+b.x} y={G0.lP.y-18} width={b.w} height={12} rx={3} fill={`rgba(210,58,38,${.85-i*.1})`} stroke="rgba(255,90,65,.35)" strokeWidth={1} />
                    <rect x={G0.lP.x+b.x} y={G0.lP.y-18} width={b.w} height={2.5} rx={1} fill="rgba(255,175,155,.4)" />
                  </g>
                ))}
              </g>

              {/* Right pan (LLC — light) — SVG attribute transform */}
              <g ref={rPanRef}>
                <ellipse ref={rGlowRef} cx={G0.rP.x} cy={G0.rP.y+28} rx={PRX+55} ry={46} fill="url(#tb2-glowR)" style={{ opacity:.15 }} />
                <ellipse cx={G0.rP.x} cy={G0.rP.y} rx={PRX} ry={PRY} fill="url(#tb2-panR)" stroke="rgba(70,175,255,.78)" strokeWidth={2.5} filter="url(#tb2-dropR)" />
                <ellipse cx={G0.rP.x} cy={G0.rP.y-8} rx={PRX-13} ry={PRY-9} fill="none" stroke="rgba(165,230,255,.62)" strokeWidth={1.5} />
                {/* Check mark */}
                <circle cx={G0.rP.x} cy={G0.rP.y-4} r={18} fill="rgba(35,130,255,.16)" />
                <path
                  d={`M${G0.rP.x-11} ${G0.rP.y-3} L${G0.rP.x-2} ${G0.rP.y+7} L${G0.rP.x+13} ${G0.rP.y-13}`}
                  stroke="rgba(130,225,255,.95)" strokeWidth={3.5} fill="none" strokeLinecap="round" strokeLinejoin="round"
                />
              </g>
            </svg>
          </motion.div>
        </div>

        {/* ── Right: LLC ── */}
        <motion.div
          className="flex flex-col gap-5 order-3"
          initial={{ opacity:0, x:36 }}
          whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true }}
          transition={{ duration:.9, delay:.15, ease:EASE }}
        >
          <div>
            <p className="text-[10px] uppercase tracking-[.25em] text-white/30 mb-2" style={{fontFamily:"var(--font-body)"}}>LLC USA</p>
            <div
              className="font-bold leading-none"
              style={{ fontFamily:"var(--font-heading)", fontSize:"clamp(4.5rem,9vw,7rem)", textShadow:"0 0 80px rgba(50,165,255,.4),0 0 24px rgba(50,165,255,.2)" }}
            >
              <CharReveal text="0%*" delay={.35} color="#4dbfff" />
            </div>
            <p className="text-white/35 text-sm mt-2" style={{fontFamily:"var(--font-body)"}}>d&rsquo;impôt fédéral</p>
          </div>
          <ul className="flex flex-col gap-2.5">
            {["Pass-through taxation","Anonymat total garanti","Aucune obligation locale"].map((item,i) => (
              <motion.li
                key={item}
                className="flex items-center gap-2.5"
                initial={{ opacity:0, x:16 }}
                whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }}
                transition={{ delay:.4+i*.1, ease:EASE }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#4dbfff]/60 flex-shrink-0" />
                <span className="text-[13px] text-white/35" style={{fontFamily:"var(--font-body)"}}>{item}</span>
              </motion.li>
            ))}
          </ul>
          <motion.div
            className="self-start px-4 py-2 rounded-full text-[12px] font-semibold text-[#4dbfff] border border-[#4dbfff]/25 bg-[#4dbfff]/[.07]"
            style={{fontFamily:"var(--font-heading)"}}
            initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:.7 }}
          >
            Léger & optimisé
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom badge */}
      <motion.div
        className="text-center mt-16 px-4 relative z-10"
        initial={{ opacity:0, y:16 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:.7, delay:.25, ease:EASE }}
      >
        <div
          className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl"
          style={{ background:"rgba(255,255,255,.035)", border:"1px solid rgba(255,255,255,.08)", backdropFilter:"blur(20px)" }}
        >
          <span className="text-2xl font-bold text-white" style={{fontFamily:"var(--font-heading)"}}>Jusqu&rsquo;à +45%</span>
          <span className="text-white/35" style={{fontFamily:"var(--font-body)"}}>de revenu net disponible</span>
        </div>
        <p className="mt-3 text-[11px] text-white/20 max-w-lg mx-auto" style={{fontFamily:"var(--font-body)"}}>
          *Non-résidents sans activité sur le sol américain. Résultat variable selon votre situation.
        </p>
      </motion.div>
    </section>
  );
}
