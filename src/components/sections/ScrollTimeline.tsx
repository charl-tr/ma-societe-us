"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const steps = [
  {
    label: "ÉTAPE 1",
    title: "Constitution de votre dossier",
    description:
      "Vous réceptionnez un formulaire avec les informations et documents nécessaires. Simple, rapide, guidé.",
  },
  {
    label: "ÉTAPE 2",
    title: "Création de votre LLC",
    description:
      "Nous entamons les démarches légales. Comptez en moyenne 7\u00a0jours. Les originaux sont conservés auprès du Registered Agent.",
  },
  {
    label: "ÉTAPE 3",
    title: "Obtention du numéro EIN",
    description:
      "C\u2019est la carte d\u2019identité fiscale de votre LLC. Ce numéro valide la création officielle et débloque l\u2019ouverture bancaire.",
  },
  {
    label: "ÉTAPE 4",
    title: "Ouverture du compte bancaire",
    description:
      "Compte Mercury ou Relay ouvert en 7 à 10\u00a0jours. Carte VISA sous 10\u00a0jours supplémentaires. Vous êtes opérationnel.",
  },
];

export function ScrollTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lineHeight, setLineHeight] = useState(0);
  const [activeSteps, setActiveSteps] = useState<boolean[]>(new Array(steps.length).fill(false));

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const viewportCenter = window.innerHeight * 0.6;

    const newActive = steps.map((_, i) => {
      const el = stepRefs.current[i];
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < viewportCenter;
    });
    setActiveSteps(newActive);

    let lastActiveIndex = -1;
    for (let i = newActive.length - 1; i >= 0; i--) {
      if (newActive[i]) { lastActiveIndex = i; break; }
    }

    if (lastActiveIndex >= 0 && stepRefs.current[lastActiveIndex]) {
      const checkpoint = stepRefs.current[lastActiveIndex];
      const checkpointRect = checkpoint!.getBoundingClientRect();
      const containerTop = containerRect.top;
      const height = checkpointRect.top - containerTop + 8;
      setLineHeight(Math.max(0, height));
    } else {
      setLineHeight(0);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section className="relative bg-[#0a1628] text-white py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 lg:mb-20 text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/30 mb-4">
            Comment ça marche
          </p>
          <h2
            className="text-[clamp(1.6rem,3.5vw,2.8rem)] leading-[1.1] font-bold tracking-tight mx-auto max-w-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Votre LLC créée en 4&nbsp;étapes.
          </h2>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Vertical line track */}
          <div className="absolute top-0 bottom-0 left-4 lg:left-1/2 lg:-translate-x-px w-px bg-white/[0.08]" />

          {/* Animated fill line */}
          <div
            className="absolute top-0 left-4 lg:left-1/2 lg:-translate-x-px w-px transition-[height] duration-300 ease-out"
            style={{
              height: lineHeight,
              background: "linear-gradient(180deg, #2a5090, #4a7fd4)",
              boxShadow: "0 0 10px rgba(42,80,144,0.4), 0 0 3px rgba(42,80,144,0.6)",
            }}
          />

          {/* Glowing tip */}
          {lineHeight > 0 && (
            <div
              className="absolute left-4 lg:left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-[top] duration-300 ease-out"
              style={{
                top: lineHeight,
                background: "#4a7fd4",
                boxShadow: "0 0 14px rgba(42,80,144,0.6), 0 0 5px rgba(74,127,212,0.9)",
              }}
            />
          )}

          {/* Steps */}
          {steps.map((step, i) => {
            const isActive = activeSteps[i];
            const isLeft = i % 2 === 0;

            return (
              <div
                key={i}
                ref={(el) => { stepRefs.current[i] = el; }}
                className={`relative flex items-start ${i < steps.length - 1 ? "pb-16 lg:pb-24" : ""}`}
              >
                {/* Checkpoint dot */}
                <div
                  className={`absolute top-1 z-10 left-4 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                    isActive
                      ? "bg-[#2a5090] border-[#4a7fd4] scale-100"
                      : "bg-transparent border-white/15 scale-75"
                  }`}
                  style={isActive ? {
                    boxShadow: "0 0 12px rgba(42,80,144,0.5), 0 0 4px rgba(74,127,212,0.8)",
                  } : undefined}
                />

                {/* Card */}
                <div
                  className={`
                    ml-12 lg:ml-0
                    lg:w-[calc(50%-40px)]
                    ${isLeft ? "lg:mr-auto" : "lg:ml-auto"}
                    transition-all duration-700 ease-out
                    ${isActive ? "opacity-100 translate-y-0" : "opacity-[0.15] translate-y-4"}
                  `}
                >
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-6 py-5 lg:px-8 lg:py-7 backdrop-blur-sm">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#4a7fd4]/70 mb-2 font-semibold">
                      {step.label}
                    </p>
                    <h3
                      className="text-[18px] lg:text-[20px] font-semibold leading-snug mb-2"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-white/45">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
