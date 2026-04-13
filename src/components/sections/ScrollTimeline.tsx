"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const steps = [
  {
    label: "ÉTAPE 1",
    title: "Constitution de votre dossier",
    description:
      "Une fois votre commande passée, vous réceptionnerez un email contenant un formulaire à compléter avec l\u2019ensemble des informations et documents nécessaires à la constitution de votre dossier.",
  },
  {
    label: "ÉTAPE 2",
    title: "Création de votre LLC américaine",
    description:
      "Après vérification de votre dossier, nous entamons les démarches légales. Comptez en moyenne 7\u00a0jours pour la création de votre LLC. Les originaux de vos documents seront conservés auprès du Registered Agent.",
  },
  {
    label: "ÉTAPE 3",
    title: "Obtention du numéro EIN",
    description:
      "Sorte de mix entre numéro SIRET et numéro de TVA, c\u2019est la carte d\u2019identité de votre LLC. Ce numéro est nécessaire pour l\u2019ouverture d\u2019un compte bancaire. L\u2019obtention de l\u2019EIN valide la création officielle de votre LLC.",
  },
  {
    label: "ÉTAPE 4",
    title: "Ouverture du compte bancaire",
    description:
      "Lorsque votre LLC aura été créée et que vous bénéficierez de votre numéro EIN, nous procéderons à l\u2019ouverture de votre compte bancaire. Délai moyen\u00a0: 7 à 10\u00a0jours. Comptez 10\u00a0jours supplémentaires pour votre carte VISA.",
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
    const viewportCenter = window.innerHeight * 0.6; // trigger point at 60% of viewport

    // Calculate line progress based on each checkpoint position
    const newActive = steps.map((_, i) => {
      const el = stepRefs.current[i];
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < viewportCenter;
    });
    setActiveSteps(newActive);

    // Line height: from container top to last active checkpoint
    let lastActiveIndex = -1;
    for (let i = newActive.length - 1; i >= 0; i--) {
      if (newActive[i]) { lastActiveIndex = i; break; }
    }

    if (lastActiveIndex >= 0 && stepRefs.current[lastActiveIndex]) {
      const checkpoint = stepRefs.current[lastActiveIndex];
      const checkpointRect = checkpoint!.getBoundingClientRect();
      const containerTop = containerRect.top;
      const height = checkpointRect.top - containerTop + 8; // +8 to center on the dot
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
    <section className="relative bg-[#141210] text-[#FAFAF9] py-[120px] lg:py-[160px] overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        {/* Header */}
        <div className="mb-24 text-center">
          <p className="text-[13px] uppercase tracking-[0.15em] text-[#FAFAF9]/40 mb-6">
            Le processus
          </p>
          <h2
            className="text-[clamp(1.8rem,4vw,48px)] leading-[1.15] font-normal tracking-tight mx-auto max-w-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Votre société créée en 4&nbsp;étapes.
          </h2>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Vertical line track */}
          <div className="absolute top-0 bottom-0 left-4 lg:left-1/2 lg:-translate-x-px w-px bg-white/[0.06]" />

          {/* Animated fill line */}
          <div
            className="absolute top-0 left-4 lg:left-1/2 lg:-translate-x-px w-px bg-white transition-[height] duration-300 ease-out"
            style={{
              height: lineHeight,
              boxShadow: "0 0 10px rgba(255,255,255,0.3), 0 0 3px rgba(255,255,255,0.6)",
            }}
          />

          {/* Glowing tip */}
          {lineHeight > 0 && (
            <div
              className="absolute left-4 lg:left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white transition-[top] duration-300 ease-out"
              style={{
                top: lineHeight,
                boxShadow: "0 0 14px rgba(255,255,255,0.5), 0 0 5px rgba(255,255,255,0.9)",
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
                className={`relative flex items-start ${i < steps.length - 1 ? "pb-24 lg:pb-32" : ""}`}
              >
                {/* Checkpoint dot */}
                <div
                  className={`absolute top-1 z-10 left-4 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                    isActive
                      ? "bg-white border-white scale-100"
                      : "bg-transparent border-white/20 scale-75"
                  }`}
                  style={isActive ? {
                    boxShadow: "0 0 12px rgba(255,255,255,0.5), 0 0 4px rgba(255,255,255,0.8)",
                  } : undefined}
                />

                {/* Card — mobile: right of line, desktop: alternating */}
                <div
                  className={`
                    ml-12 lg:ml-0
                    lg:w-[calc(50%-40px)]
                    ${isLeft ? "lg:mr-auto" : "lg:ml-auto"}
                    transition-all duration-700 ease-out
                    ${isActive ? "opacity-100 translate-y-0" : "opacity-[0.15] translate-y-4"}
                  `}
                >
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-8 py-7 backdrop-blur-sm">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#FAFAF9]/30 mb-3">
                      {step.label}
                    </p>
                    <h3
                      className="text-[22px] font-normal leading-snug mb-3"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-[#FAFAF9]/50">
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
