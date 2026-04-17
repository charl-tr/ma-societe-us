import { STATES, getStateBySlug } from "@/lib/states";
import { PageHeader } from "@/components/layout/PageHeader";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) return {};
  return {
    title: `Créer une LLC au ${state.name} — MA SOCIETE US`,
    description: `Créez votre LLC au ${state.name}. ${state.tagline}. Accompagnement de A à Z par notre cabinet franco-américain.`,
  };
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) notFound();

  return (
    <main>
      <PageHeader
        title={`Créer une LLC au ${state.name}.`}
        subtitle={state.tagline}
      />

      {/* Description */}
      <section className="text-[#0e1e38] py-[100px] lg:py-[140px]">
        <div className="px-6 lg:px-10 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#0e1e38]/30 mb-5">
                Pourquoi le {state.name}
              </p>
              <h2
                className="text-[clamp(1.5rem,3vw,2.2rem)] font-normal leading-[1.15] tracking-tight mb-8"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {state.tagline}
              </h2>
              <p className="text-[16px] leading-relaxed text-[#0e1e38]/55">
                {state.description}
              </p>
            </div>

            <div className="space-y-10">
              {/* Pros */}
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#0e1e38]/30 mb-5">
                  Avantages
                </p>
                <ul className="space-y-3">
                  {state.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2a5090]/15 flex-shrink-0" />
                      <span className="text-[15px] text-[#0e1e38]/65">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#0e1e38]/30 mb-5">
                  Points d&apos;attention
                </p>
                <ul className="space-y-3">
                  {state.cons.map((con) => (
                    <li key={con} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2a5090]/15 flex-shrink-0" />
                      <span className="text-[15px] text-[#0e1e38]/40">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other states */}
      <section className="text-[#0e1e38] py-[80px] lg:py-[100px] border-t border-[#0e1e38]/[0.06]">
        <div className="px-6 lg:px-10 max-w-4xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#1a2a40]/25 mb-8">
            Autres juridictions
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {STATES.filter((s) => s.slug !== state.slug).map((s) => (
              <a
                key={s.slug}
                href={`/creer-llc/${s.slug}`}
                className="rounded-xl p-6 transition-all" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.80)" }"
              >
                <span className="text-[13px] tracking-wide text-[#1a2a40]/40">
                  {s.abbr}
                </span>
                <h3
                  className="text-[18px] font-normal mt-1"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {s.name}
                </h3>
                <p className="text-[13px] text-[#1a2a40]/35 mt-2 line-clamp-2">
                  {s.tagline}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-[#0e1e38] py-[100px] lg:py-[140px] border-t border-[#0e1e38]/[0.06]">
        <div className="px-6 lg:px-10 max-w-2xl mx-auto text-center">
          <h2
            className="text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] font-normal tracking-[-0.02em] mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Créer votre LLC au {state.name}.
          </h2>
          <p className="text-[17px] text-[#1a2a40]/45 mb-10 leading-relaxed">
            Réservez un entretien découverte gratuit. Nous évaluons votre
            situation et vous accompagnons dans la création — sans engagement.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center text-[#0e1e38] px-8 py-4 rounded-full text-[15px] font-medium hover:bg-[#F2F1F0] transition-colors"
          >
            Réservez votre entretien découverte
          </a>
        </div>
      </section>
    </main>
  );
}
