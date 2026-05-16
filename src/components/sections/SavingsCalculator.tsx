"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useScroll, useTransform, animate } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const FRANCE_RATE = 0.45;
const LLC_RATE    = 0.12;
const MAX_REV     = 500_000;
const MAX_BAR_H   = 280;

// ── Animated count-up ─────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref  = useRef<HTMLSpanElement>(null);
  const prev = useRef(to);

  useEffect(() => {
    const from = prev.current;
    prev.current = to;
    const ctrl = animate(from, to, {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current)
          ref.current.textContent =
            Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + suffix;
      },
    });
    return ctrl.stop;
  }, [to, suffix]);

  return (
    <span ref={ref}>
      {Math.round(to).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{suffix}
    </span>
  );
}

// ── Animated bar with spring + SVG wave top ───────────────
function Bar({
  color,
  glowColor,
  targetH,
  label,
  pct,
  amount,
  suffix,
}: {
  color: string;
  glowColor: string;
  targetH: number;
  label: string;
  pct: string;
  amount: number;
  suffix: string;
}) {
  const barRef  = useRef<HTMLDivElement>(null);
  const curH    = useRef(0);
  const curV    = useRef(0);
  const animRef = useRef<number | undefined>(undefined);

  // Spring constants for bar height
  const K = 180, Cd = 22, Mm = 1.0;

  useEffect(() => {
    const target = targetH;

    function tick() {
      const f = (target - curH.current) * K - curV.current * Cd;
      curV.current += (f / Mm) / 60;
      curH.current += curV.current / 60;
      curH.current = Math.max(0, curH.current);

      if (barRef.current)
        barRef.current.style.height = `${curH.current}px`;

      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [targetH]);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Bar track */}
      <div className="relative w-full rounded-xl overflow-visible" style={{ height: MAX_BAR_H }}>
        {/* Ghost track */}
        <div className="absolute inset-0 rounded-xl" style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)" }} />

        {/* Animated bar */}
        <div
          className="absolute bottom-0 left-0 right-0 rounded-xl overflow-hidden"
          ref={barRef}
          style={{ height:0 }}
        >
          <div className="absolute inset-0" style={{ background:color, boxShadow:`inset 0 0 40px rgba(0,0,0,.25)` }} />
          {/* Inner sheen */}
          <div className="absolute inset-0" style={{ background:"linear-gradient(90deg,transparent,rgba(255,255,255,.08) 50%,transparent)" }} />
          {/* Amount label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-2">
              <div className="text-white font-bold text-lg" style={{fontFamily:"var(--font-heading)"}}>
                <Counter to={amount} suffix=" €" />
              </div>
              <div className="text-white/55 text-xs mt-0.5">{pct}</div>
            </div>
          </div>
        </div>

        {/* Glow at top of bar — lives outside bar div so it's always visible */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            bottom: curH.current,
            height: 24,
            background: `linear-gradient(0deg, ${glowColor} 0%, transparent 100%)`,
            filter: "blur(6px)",
            opacity: curH.current > 10 ? 1 : 0,
          }}
        />
      </div>

      {/* Label */}
      <div className="text-center">
        <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: glowColor, fontFamily:"var(--font-heading)" }}>{label}</div>
      </div>
    </div>
  );
}

export function SavingsCalculator() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once:true, margin:"-100px" });
  const [revenue, setRevenue]   = useState(150_000);
  const [dragging, setDragging] = useState(false);

  const franceTax = revenue * FRANCE_RATE;
  const llcTax    = revenue * LLC_RATE;
  const savings   = revenue * (FRANCE_RATE - LLC_RATE);

  const franceH = isInView ? Math.round((revenue / MAX_REV) * MAX_BAR_H) : 0;
  const llcH    = isInView ? Math.round((revenue * LLC_RATE) / (MAX_REV * FRANCE_RATE) * MAX_BAR_H) : 0;

  const sliderPct = ((revenue - 50_000) / (MAX_REV - 50_000)) * 100;

  // Parallax on scroll
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end","end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const handleSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRevenue(Number(e.target.value));
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 px-4"
      style={{ background: "linear-gradient(160deg,#040b18 0%,#060e20 60%,#040b18 100%)" }}
    >
      <style>{`
        @keyframes sc-pulse { 0%,100%{box-shadow:0 0 30px rgba(29,78,216,.25)} 50%{box-shadow:0 0 55px rgba(29,78,216,.45)} }
        @keyframes sc-coin  { 0%{transform:translateY(0) scale(1);opacity:.9} 100%{transform:translateY(-70px) scale(.1);opacity:0} }
        .sc-coin-anim { animation: sc-coin 1.6s ease-out infinite }
        input[type=range] { -webkit-appearance:none; appearance:none; background:transparent; cursor:pointer; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; appearance:none; width:22px; height:22px; border-radius:50%; background:white; border:3px solid #1d4ed8; box-shadow:0 0 0 5px rgba(29,78,216,.2),0 4px 12px rgba(0,0,30,.4); cursor:grab; }
        input[type=range]:active::-webkit-slider-thumb { cursor:grabbing; transform:scale(1.15); }
        input[type=range]::-moz-range-thumb { width:20px; height:20px; border-radius:50%; background:white; border:3px solid #1d4ed8; }
      `}</style>

      {/* Parallax BG orbs */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ y: bgY }}
        aria-hidden="true"
      >
        <div className="absolute rounded-full" style={{ width:600,height:600,top:"-15%",left:"-10%",background:"radial-gradient(circle,rgba(29,78,216,.1) 0%,transparent 70%)",filter:"blur(55px)" }} />
        <div className="absolute rounded-full" style={{ width:500,height:500,bottom:"-10%",right:"-10%",background:"radial-gradient(circle,rgba(14,40,120,.14) 0%,transparent 70%)",filter:"blur(65px)" }} />
        <div className="absolute rounded-full" style={{ width:300,height:300,top:"40%",right:"20%",background:"radial-gradient(circle,rgba(50,130,255,.06) 0%,transparent 70%)",filter:"blur(40px)" }} />
      </motion.div>

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity:0, y:28 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:.75, ease:EASE }}
        >
          <p className="text-[11px] uppercase tracking-[.28em] text-white/30 mb-3" style={{fontFamily:"var(--font-body)"}}>Simulation fiscale</p>
          <h2 className="font-semibold text-white leading-tight" style={{fontFamily:"var(--font-cormorant)",fontSize:"clamp(2rem,4.5vw,3.4rem)"}}>
            Calculez vos économies
          </h2>
          <p className="mt-2 text-[#7ca0cc] text-base" style={{fontFamily:"var(--font-body)"}}>
            Glissez pour voir l&rsquo;écart en temps réel.
          </p>
        </motion.div>

        {/* Slider */}
        <motion.div
          className="mb-14"
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:.7, delay:.15, ease:EASE }}
        >
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-sm text-[#5a7a9c] uppercase tracking-wider" style={{fontFamily:"var(--font-body)"}}>Revenu annuel</span>
            <span className="text-2xl font-bold text-white" style={{fontFamily:"var(--font-heading)"}}>
              <Counter to={revenue} suffix=" €/an" />
            </span>
          </div>

          {/* Slider track */}
          <div className="relative h-3 rounded-full" style={{ background:"rgba(255,255,255,.07)", boxShadow:"inset 0 1px 3px rgba(0,0,30,.4)" }}>
            {/* Filled portion */}
            <div
              className="absolute top-0 left-0 h-full rounded-full"
              style={{ width:`${sliderPct}%`, background:"linear-gradient(90deg,#0e2878,#1d4ed8,#3b82f6)", transition:"width .08s", boxShadow:"0 0 12px rgba(59,130,246,.5)" }}
            />
            {/* Thumb tooltip */}
            {dragging && (
              <div
                className="absolute -top-9 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white pointer-events-none"
                style={{ left:`calc(${sliderPct}% - 32px)`, background:"rgba(29,78,216,.9)", backdropFilter:"blur(8px)" }}
              >
                Éco: {Math.round(savings / 1000)}k€
              </div>
            )}
            <input
              type="range" min={50_000} max={500_000} step={5_000}
              value={revenue}
              onChange={handleSlider}
              onMouseDown={() => setDragging(true)}
              onMouseUp={() => setDragging(false)}
              onTouchStart={() => setDragging(true)}
              onTouchEnd={() => setDragging(false)}
              className="absolute inset-0 w-full h-full opacity-0"
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-[#3a5a7c]" style={{fontFamily:"var(--font-body)"}}>50 000 €</span>
            <span className="text-xs text-[#3a5a7c]" style={{fontFamily:"var(--font-body)"}}>500 000 €</span>
          </div>
        </motion.div>

        {/* Comparison bars */}
        <motion.div
          className="grid grid-cols-2 gap-8 mb-14"
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:.7, delay:.25, ease:EASE }}
        >
          <Bar
            color="linear-gradient(180deg,#7c1010 0%,#c0312b 100%)"
            glowColor="rgba(192,49,43,.8)"
            targetH={franceH}
            label="SARL / SAS France"
            pct={`${Math.round(FRANCE_RATE*100)}%`}
            amount={Math.round(franceTax)}
            suffix=" €"
          />
          <Bar
            color="linear-gradient(180deg,#0c2068 0%,#1d4ed8 100%)"
            glowColor="rgba(29,78,216,.8)"
            targetH={llcH}
            label="LLC USA"
            pct={`${Math.round(LLC_RATE*100)}%`}
            amount={Math.round(llcTax)}
            suffix=" €"
          />
        </motion.div>

        {/* Savings card */}
        <motion.div
          className="relative rounded-2xl overflow-hidden mb-8"
          initial={{ opacity:0, scale:.96 }}
          whileInView={{ opacity:1, scale:1 }}
          viewport={{ once:true }}
          transition={{ duration:.7, delay:.4, ease:EASE }}
          style={{ animation:"sc-pulse 3s ease-in-out infinite" }}
        >
          {/* Background */}
          <div className="absolute inset-0" style={{ background:"linear-gradient(135deg,rgba(14,40,120,.6) 0%,rgba(29,78,216,.22) 100%)", border:"1px solid rgba(29,78,216,.35)" }} />
          {/* Top glow */}
          <div className="absolute inset-0" style={{ background:"radial-gradient(ellipse at 50% 0%,rgba(29,78,216,.28) 0%,transparent 65%)" }} />

          {/* Floating coins (décoration) */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[0,1,2,3].map((i)=>(
              <div key={i} className="sc-coin-anim absolute w-2 h-2 rounded-full bg-blue-400/40"
                style={{ left:`${20+i*20}%`, bottom:"10%", animationDelay:`${i*.4}s`, animationDuration:`${1.4+i*.2}s` }} />
            ))}
          </div>

          <div className="relative p-8 text-center">
            <p className="text-[#7ca0cc] text-xs uppercase tracking-[.22em] mb-3" style={{fontFamily:"var(--font-body)"}}>Vous économiseriez</p>
            <div className="font-bold text-white mb-2" style={{ fontFamily:"var(--font-heading)", fontSize:"clamp(2.8rem,7vw,5rem)", lineHeight:1, textShadow:"0 0 60px rgba(59,130,246,.4)" }}>
              <Counter to={Math.round(savings)} suffix=" €/an" />
            </div>
            <p className="text-[#5a80b0] text-sm" style={{fontFamily:"var(--font-body)"}}>
              soit{" "}
              <span className="text-white font-semibold">
                <Counter to={Math.round(savings/12)} suffix=" €/mois" />
              </span>{" "}
              de plus dans votre poche
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity:0, y:16 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:.6, delay:.55, ease:EASE }}
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-xl font-semibold text-white text-[15px] transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
            style={{ fontFamily:"var(--font-heading)", background:"linear-gradient(135deg,#1d4ed8,#2563eb)", boxShadow:"0 5px 28px rgba(29,78,216,.45)" }}
          >
            Calculer ma situation exacte
            <span aria-hidden="true">→</span>
          </a>
          <p className="mt-3 text-[11px] text-[#3a5a7c]" style={{fontFamily:"var(--font-body)"}}>
            Simulation indicative — résultat variable selon votre situation personnelle.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
