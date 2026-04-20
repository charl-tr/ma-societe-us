'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useBalanceAnimation } from './useBalanceAnimation'
import type { BalanceScaleProps } from './types'

const DEFAULT_PALETTE = {
  cold: '#7eb8d4',   // blue-glass
  warm: '#c8a456',   // warm gold
}

const DEFAULT_LEFT  = { line1: 'Sans cabinet', line2: 'expert', caption: '90% marketing' }
const DEFAULT_RIGHT = { line1: 'Avec MA SOCIÉTÉ US', line2: '', caption: '100% expertise' }

export function BalanceScale({
  ratio = 0.2,
  driver = 'manual',
  leftLabel = DEFAULT_LEFT,
  rightLabel = DEFAULT_RIGHT,
  palette = DEFAULT_PALETTE,
  className = '',
}: BalanceScaleProps) {
  const { sectionRef, rotation, leftY, rightY, leftGlow, rightGlow } =
    useBalanceAnimation(ratio, driver)

  return (
    <div
      ref={sectionRef}
      className={`relative flex flex-col items-center select-none ${className}`}
      style={{ minHeight: 320 }}
    >
      {/* ── Column & Base ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
        {/* Column */}
        <div
          style={{
            width: 10,
            height: 200,
            background: 'linear-gradient(90deg, #9fa4af 0%, #d8dce6 40%, #b8bcc8 70%, #8a8f9c 100%)',
            borderRadius: '5px 5px 0 0',
          }}
        />
        {/* Base disk */}
        <div
          style={{
            width: 80,
            height: 18,
            background: 'linear-gradient(180deg, #c4c9d4 0%, #9fa4af 50%, #b8bcc8 100%)',
            borderRadius: '50%',
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
          }}
        />
        <div
          style={{
            width: 56,
            height: 10,
            background: 'linear-gradient(180deg, #9fa4af 0%, #8a8f9c 100%)',
            borderRadius: '0 0 8px 8px',
          }}
        />
      </div>

      {/* ── Pivot cap ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: 32,
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #e8eaed, #9fa4af)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          zIndex: 10,
        }}
      />

      {/* ── Animated Beam ── */}
      <motion.div
        className="absolute left-1/2"
        style={{
          top: 40,
          translateX: '-50%',
          rotate: rotation,
          transformOrigin: '50% 0%',
          width: 340,
          zIndex: 5,
        }}
      >
        {/* Beam bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background: 'linear-gradient(180deg, #d8dce6 0%, #b0b5be 40%, #c8cdd4 70%, #9fa4af 100%)',
            borderRadius: 5,
            boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
          }}
        />

        {/* Left hook */}
        <div style={{
          position: 'absolute', top: 8, left: 24, width: 2, height: 12,
          background: 'linear-gradient(180deg, #b0b5be, #8a8f9c)', borderRadius: 1,
        }} />

        {/* Right hook */}
        <div style={{
          position: 'absolute', top: 8, right: 24, width: 2, height: 12,
          background: 'linear-gradient(180deg, #b0b5be, #8a8f9c)', borderRadius: 1,
        }} />

        {/* ── Left plateau + label ── */}
        <motion.div
          style={{
            position: 'absolute',
            left: 0,
            top: 20,
            width: 130,
            translateY: leftY,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Chains (CSS lines) */}
          <div style={{ display: 'flex', gap: 28, height: 40, alignItems: 'stretch' }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 1, background: 'rgba(160,165,175,0.6)' }} />
            ))}
          </div>

          {/* Glow */}
          <motion.div
            style={{
              position: 'absolute',
              top: 28,
              left: '50%',
              translateX: '-50%',
              width: 120,
              height: 60,
              borderRadius: '50%',
              background: `radial-gradient(ellipse, ${palette.cold}55 0%, transparent 70%)`,
              opacity: leftGlow,
              filter: 'blur(8px)',
              pointerEvents: 'none',
            }}
          />

          {/* Plateau bowl */}
          <div
            style={{
              width: 130,
              height: 24,
              background: `linear-gradient(180deg, ${palette.cold}22 0%, ${palette.cold}44 40%, ${palette.cold}88 100%)`,
              borderRadius: '0 0 50% 50%',
              border: `1px solid ${palette.cold}99`,
              boxShadow: `0 4px 16px ${palette.cold}33, inset 0 1px 0 rgba(255,255,255,0.4)`,
              backdropFilter: 'blur(8px)',
            }}
          />

          {/* Label card */}
          <div
            style={{
              marginTop: 10,
              padding: '12px 14px',
              background: `linear-gradient(160deg, rgba(255,255,255,0.72) 0%, ${palette.cold}18 100%)`,
              border: `1px solid ${palette.cold}55`,
              borderRadius: 10,
              textAlign: 'center',
              backdropFilter: 'blur(12px)',
              boxShadow: `0 4px 20px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.8) inset`,
              minWidth: 118,
            }}
          >
            <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: 13, lineHeight: 1.4, color: '#1a2540' }}>
              {leftLabel.line1}
            </div>
            {leftLabel.line2 && (
              <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: 13, lineHeight: 1.4, color: '#1a2540' }}>
                {leftLabel.line2}
              </div>
            )}
            {leftLabel.caption && (
              <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 200, fontSize: 10, color: palette.cold, marginTop: 4, letterSpacing: '0.06em' }}>
                {leftLabel.caption}
              </div>
            )}
          </div>
        </motion.div>

        {/* ── Right plateau + label ── */}
        <motion.div
          style={{
            position: 'absolute',
            right: 0,
            top: 20,
            width: 130,
            translateY: rightY,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Chains */}
          <div style={{ display: 'flex', gap: 28, height: 40, alignItems: 'stretch' }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 1, background: 'rgba(160,165,175,0.6)' }} />
            ))}
          </div>

          {/* Glow */}
          <motion.div
            style={{
              position: 'absolute',
              top: 28,
              left: '50%',
              translateX: '-50%',
              width: 120,
              height: 60,
              borderRadius: '50%',
              background: `radial-gradient(ellipse, ${palette.warm}55 0%, transparent 70%)`,
              opacity: rightGlow,
              filter: 'blur(8px)',
              pointerEvents: 'none',
            }}
          />

          {/* Plateau bowl */}
          <div
            style={{
              width: 130,
              height: 24,
              background: `linear-gradient(180deg, ${palette.warm}22 0%, ${palette.warm}44 40%, ${palette.warm}88 100%)`,
              borderRadius: '0 0 50% 50%',
              border: `1px solid ${palette.warm}99`,
              boxShadow: `0 4px 16px ${palette.warm}33, inset 0 1px 0 rgba(255,255,255,0.4)`,
            }}
          />

          {/* Label card */}
          <div
            style={{
              marginTop: 10,
              padding: '12px 14px',
              background: `linear-gradient(160deg, rgba(255,255,255,0.82) 0%, ${palette.warm}18 100%)`,
              border: `1px solid ${palette.warm}55`,
              borderRadius: 10,
              textAlign: 'center',
              backdropFilter: 'blur(12px)',
              boxShadow: `0 4px 20px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.9) inset`,
              minWidth: 118,
            }}
          >
            <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: 13, lineHeight: 1.4, color: '#1a2540' }}>
              {rightLabel.line1}
            </div>
            {rightLabel.line2 && (
              <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: 13, lineHeight: 1.4, color: '#1a2540' }}>
                {rightLabel.line2}
              </div>
            )}
            {rightLabel.caption && (
              <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 200, fontSize: 10, color: palette.warm, marginTop: 4, letterSpacing: '0.06em' }}>
                {rightLabel.caption}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
