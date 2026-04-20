'use client'

import { useState } from 'react'
import { BalanceScale } from '@/components/BalanceScale'

const SPIKE_PALETTE = {
  cold: '#c0392b',
  warm: '#f39c12',
}

export default function PlaygroundPage() {
  const [ratio, setRatio] = useState(0.15)

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-3xl mx-auto space-y-24">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-light tracking-tight text-slate-800 mb-2">
            BalanceScale — Playground
          </h1>
          <p className="text-sm text-slate-500">3 instances · manual, scroll-driven, custom palette</p>
        </div>

        {/* ── Instance 1: Manual slider ── */}
        <section className="bg-white rounded-2xl shadow-sm p-8 space-y-8">
          <div className="text-center">
            <h2 className="text-lg font-medium text-slate-700">1. Manual control</h2>
            <p className="text-xs text-slate-400 mt-1">Drag the slider to tip the scale</p>
          </div>

          <BalanceScale
            ratio={ratio}
            driver="manual"
            leftLabel={{ line1: 'Sans cabinet', line2: 'expert', caption: '90% marketing' }}
            rightLabel={{ line1: 'Avec MA SOCIÉTÉ US', line2: '', caption: '100% expertise' }}
            className="mx-auto"
          />

          <div className="flex flex-col items-center gap-3">
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={ratio}
              onChange={e => setRatio(Number(e.target.value))}
              className="w-72 accent-blue-400"
            />
            <div className="flex w-72 justify-between text-xs text-slate-400">
              <span>Gauche en bas</span>
              <span>Équilibré ({ratio.toFixed(2)})</span>
              <span>Droite en bas</span>
            </div>
          </div>
        </section>

        {/* ── Instance 2: Scroll-driven ── */}
        <section className="bg-white rounded-2xl shadow-sm p-8 space-y-8">
          <div className="text-center">
            <h2 className="text-lg font-medium text-slate-700">2. Scroll-driven</h2>
            <p className="text-xs text-slate-400 mt-1">The scale tips as you scroll past it</p>
          </div>

          {/* Extra height so scroll detection has room to work */}
          <div style={{ minHeight: 480 }} className="flex items-center justify-center">
            <BalanceScale
              ratio={0.5}
              driver="scroll"
              leftLabel={{ line1: 'Seul face à', line2: "l'administration", caption: 'Délai : 6 mois' }}
              rightLabel={{ line1: 'Accompagné', line2: 'par nos experts', caption: 'Délai : 3 semaines' }}
              className="mx-auto"
            />
          </div>
        </section>

        {/* ── Instance 3: Custom palette (SPIKE / red-gold) ── */}
        <section className="bg-slate-900 rounded-2xl shadow-lg p-8 space-y-8">
          <div className="text-center">
            <h2 className="text-lg font-medium text-white">3. Custom palette — SPIKE theme</h2>
            <p className="text-xs text-slate-400 mt-1">Red left / amber gold right — ratio locked at 0.8</p>
          </div>

          <BalanceScale
            ratio={0.8}
            driver="manual"
            palette={SPIKE_PALETTE}
            leftLabel={{ line1: 'Risque fiscal', line2: 'non-déclaré', caption: 'FBAR / FATCA' }}
            rightLabel={{ line1: 'Conformité', line2: 'garantie', caption: 'Zéro pénalité' }}
            className="mx-auto"
          />
        </section>

      </div>
    </main>
  )
}
