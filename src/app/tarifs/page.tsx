"use client";

import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease },
};

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES_DOCS = [
  {
    title: "Rédaction de l'Operating Agreement",
    description:
      "L'objectif du pacte d'associé est de régir les opérations internes de l'entreprise de manière à répondre aux besoins spécifiques des associés de la société.",
    price: "A partir de $600",
    note: "selon complexité",
  },
  {
    title: "Préparation et dépôt de l'Annual Report",
    description: "Préparation et dépôt de l'Annual Report de votre LLC.",
    price: "A partir de $299",
    note: "selon complexité et l'État américain",
  },
  {
    title: "Rédaction du Banking Member Resolution",
    description:
      "Accorder les pouvoirs à certains associés autorisés à effectuer les formalités vis-à-vis des banques et d'emporter responsabilité.",
    price: "A partir de $135",
    note: "selon le nombre de banques",
  },
  {
    title: "Obtention du Certificate of Good Standing",
    description:
      "Document émis par l'administration américaine attestant qu'une société est dûment enregistrée auprès de l'État.",
    price: "A partir de $100",
    note: "selon l'État américain",
  },
];

const SERVICES_FISCAL = [
  {
    title: "Identifier les dépenses déductibles",
    description:
      "Identifier les dépenses déductibles au sein d'une comptabilité existante afin d'abaisser considérablement le résultat fiscal.",
    price: "A partir de $400",
    note: "sur devis et selon complexité",
  },
  {
    title: "Recherche de déductibilités en cours d'exercice",
    description:
      "Recherche de déductibilités en cours d'exercice pour baisser la note fiscale prévisionnelle.",
    price: "A partir de $800",
    note: "selon complexité",
  },
];

const SERVICES_OTHER = [
  {
    title: "Gestion pilotée LLC",
    description: "Pour une durée d'un an.",
    price: "$399",
  },
  {
    title: "Dissolution de LLC US",
    description: "Prestation « tout inclus ».",
    price: "A partir de $699",
    note: "sur devis et selon l'État US",
  },
  {
    title: "Cession de parts et modifications capitalistiques",
    description:
      "Notre équipe de juristes vous accompagne pour toute modification sur le plan capitalistique de votre entité américaine.",
    price: "A partir de $1 100",
    note: "sur devis et selon complexité",
  },
  {
    title: "Rédaction des CGV / CGU / PC (conformité RGPD)",
    description:
      "Nous nous chargeons de la rédaction de ces documents indispensables pour un entrepreneur souhaitant lancer son activité.",
    price: "Environ $1 200",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <span
      style={{ color: "#4a7fd4" }}
      className="mt-0.5 flex-shrink-0 text-[15px] font-bold"
      aria-hidden="true"
    >
      ✓
    </span>
  );
}

function ServiceRow({
  title,
  description,
  price,
  note,
}: {
  title: string;
  description: string;
  price: string;
  note?: string;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 py-7 border-b border-[#1a2a40]/[0.07] last:border-0">
      <div className="lg:col-span-4">
        <h3
          className="text-[17px] font-normal text-[#0a1628]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h3>
      </div>
      <div className="lg:col-span-5">
        <p className="text-[14px] text-[#0a1628]/50 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="lg:col-span-3 lg:text-right">
        <span
          className="text-[17px] font-normal text-[#0a1628]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {price}
        </span>
        {note && (
          <span className="block text-[11px] text-[#0a1628]/35 mt-1">
            {note}
          </span>
        )}
      </div>
    </div>
  );
}

function ServiceGroup({
  label,
  items,
}: {
  label: string;
  items: { title: string; description: string; price: string; note?: string }[];
}) {
  return (
    <div className="mb-14">
      <p className="text-[11px] uppercase tracking-[0.25em] text-[#0a1628]/40 mb-6">
        {label}
      </p>
      <div>
        {items.map((item) => (
          <ServiceRow key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TarifsPage() {
  return (
    <main>
      {/* ── 1. Hero ── */}
      <section
        className="relative overflow-hidden pt-32 pb-16"
        style={{ backgroundColor: "#060e1c" }}
      >
        {/* Grid background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Blue radial glow — top right */}
        <div
          className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(74,127,212,0.18) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 px-6 lg:px-10 max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/40 mb-6">
              Tarifs
            </p>
            <h1
              className="font-bold leading-[1.08] tracking-tight text-white"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
              }}
            >
              {"Des tarifs clairs."}
              <br />
              {"Sans surprise."}
            </h1>
            <p className="mt-6 text-[17px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              Tout est inclus. Aucun frais caché. Vous savez exactement ce que vous payez.
            </p>
            {/* Trust pill */}
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px]"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              Paiement sécurisé · Garantie satisfait
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Offer cards ── */}
      <section
        className="py-16 lg:py-24"
        style={{ backgroundColor: "#0a1628" }}
      >
        <div className="px-6 lg:px-10 max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div {...fadeUp} className="mb-12 text-center">
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/40 mb-4">
              Nos formules
            </p>
            <h2
              className="text-white font-bold"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              }}
            >
              Choisissez la formule adaptée à votre situation.
            </h2>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Card 1 — Essentiel */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, ease, delay: 0 }}
              className="relative flex flex-col rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
                backdropFilter: "blur(28px)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              {/* Chrome top bar */}
              <div className="h-[1px] w-full" style={{ background: "rgba(255,255,255,0.12)" }} />

              <div className="flex flex-col flex-1 p-7">
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/40 mb-5">
                  Essentiel
                </p>
                <div className="mb-6">
                  <span
                    className="text-white font-bold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                    }}
                  >
                    $1 490
                  </span>
                  <span className="text-white/40 text-[14px] ml-1">/création</span>
                </div>
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {[
                    "Création LLC complète",
                    "Enregistrement Secretary of State",
                    "Registered Agent (1 an)",
                    "Obtention EIN",
                    "Documents constitutifs",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[14px] text-white/70">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className="mt-auto inline-flex items-center justify-center px-6 py-3 rounded-full text-[14px] text-white/80 transition-all duration-200 hover:text-white"
                  style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                >
                  Démarrer →
                </a>
              </div>
            </motion.div>

            {/* Card 2 — Premium (featured) */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, ease, delay: 0.08 }}
              className="relative flex flex-col rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)",
                backdropFilter: "blur(28px)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {/* Chrome top bar — blue glow */}
              <div
                className="h-[1px] w-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(74,127,212,0.6) 30%, rgba(120,170,240,0.9) 50%, rgba(74,127,212,0.6) 70%, transparent)",
                }}
              />

              <div className="flex flex-col flex-1 p-7">
                <div className="flex items-center gap-3 mb-5">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
                    Premium
                  </p>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-medium text-white"
                    style={{ backgroundColor: "#4a7fd4" }}
                  >
                    Le plus populaire
                  </span>
                </div>
                <div className="mb-6">
                  <span
                    className="text-white font-bold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                    }}
                  >
                    $2 490
                  </span>
                  <span className="text-white/40 text-[14px] ml-1">/création</span>
                </div>
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {[
                    "Création LLC complète",
                    "Enregistrement Secretary of State",
                    "Registered Agent (1 an)",
                    "Obtention EIN",
                    "Documents constitutifs",
                    "Assistance ouverture compte Mercury",
                    "Carte VISA professionnelle",
                    "Suivi post-création 3 mois",
                    "Template Operating Agreement",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[14px] text-white/70">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className="mt-auto inline-flex items-center justify-center px-6 py-3 rounded-full text-[14px] text-white font-medium transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, #1a3a6a 0%, #2a5090 100%)",
                    boxShadow: "0 4px 28px rgba(42,80,144,0.30)",
                  }}
                >
                  Démarrer →
                </a>
              </div>
            </motion.div>

            {/* Card 3 — LLC Pilotée */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, ease, delay: 0.16 }}
              className="relative flex flex-col rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
                backdropFilter: "blur(28px)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              {/* Chrome top bar — purple-blue accent */}
              <div
                className="h-[1px] w-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(100,140,220,0.6) 30%, rgba(100,140,220,0.9) 50%, rgba(100,140,220,0.6) 70%, transparent)",
                }}
              />

              <div className="flex flex-col flex-1 p-7">
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/40 mb-5">
                  LLC Pilotée
                </p>
                <div className="mb-6">
                  <span
                    className="text-white font-bold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                    }}
                  >
                    $3 990
                  </span>
                  <span className="text-white/40 text-[14px] ml-1">/an</span>
                </div>
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {[
                    "Création LLC complète",
                    "Enregistrement Secretary of State",
                    "Registered Agent (1 an)",
                    "Obtention EIN",
                    "Documents constitutifs",
                    "Assistance ouverture compte Mercury",
                    "Carte VISA professionnelle",
                    "Suivi post-création 3 mois",
                    "Template Operating Agreement",
                    "Comptabilité annuelle",
                    "Déclaration fiscale IRS (Form 5472)",
                    "Annual Report filing",
                    "Conseil fiscal illimité (12 mois)",
                    "Renouvellement Registered Agent",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[14px] text-white/70">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className="mt-auto inline-flex items-center justify-center px-6 py-3 rounded-full text-[14px] text-white/80 transition-all duration-200 hover:text-white"
                  style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                >
                  Démarrer →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. Included services list ── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="px-6 lg:px-10 max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <h2
              className="font-bold text-[#0a1628]"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              }}
            >
              Prestations complémentaires
            </h2>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease, delay: 0.1 }}>
            <ServiceGroup label="Rédaction de documents" items={SERVICES_DOCS} />
            <ServiceGroup label="Optimisation fiscale" items={SERVICES_FISCAL} />
            <ServiceGroup label="Autres" items={SERVICES_OTHER} />
          </motion.div>
        </div>
      </section>

      {/* ── 4. Guarantees + CTA ── */}
      <section
        className="py-16"
        style={{ backgroundColor: "#060e1c" }}
      >
        <div className="px-6 lg:px-10 max-w-4xl mx-auto">
          {/* Guarantee pills */}
          <motion.div
            {...fadeUp}
            className="flex flex-wrap justify-center gap-3 mb-14"
          >
            {[
              "100% légal · Conforme OCDE",
              "Remboursé si non créé en 30 jours",
              "Interlocuteur dédié inclus",
            ].map((label) => (
              <div
                key={label}
                className="px-5 py-2.5 rounded-full text-[13px] text-white/65"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
                  backdropFilter: "blur(28px)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
              >
                {label}
              </div>
            ))}
          </motion.div>

          {/* CTA block */}
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease, delay: 0.1 }} className="text-center">
            <h2
              className="text-white font-bold"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              }}
            >
              Pas encore convaincu ? Parlons-en.
            </h2>
            <div className="mt-8">
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 rounded-full text-[15px] font-semibold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #1a3a6a 0%, #2a5090 100%)",
                  boxShadow: "0 4px 24px rgba(42,80,144,0.30)",
                }}
              >
                Prendre contact →
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
