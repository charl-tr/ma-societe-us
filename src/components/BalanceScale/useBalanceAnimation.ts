'use client'
import { useRef, useEffect } from 'react'
import { useSpring, useScroll, useTransform, useMotionValue, MotionValue } from 'framer-motion'

const SPRING = { stiffness: 100, damping: 15 }
const SPRING_SLOW = { stiffness: 100, damping: 18 }

export function useBalanceAnimation(ratio: number, driver: 'scroll' | 'manual') {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Manual ratio as a MotionValue so we can use it uniformly
  const manualRatio = useMotionValue(ratio)
  useEffect(() => { manualRatio.set(ratio) }, [ratio, manualRatio])

  // Scroll ratio
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const scrollRatio = useTransform(scrollYProgress, [0.1, 0.5, 0.85], [0.5, 0.0, 1.0])

  // Active source
  const activeRatio: MotionValue<number> = driver === 'scroll' ? scrollRatio : manualRatio

  // Derived motion values
  const targetRotation  = useTransform(activeRatio, (r) => (r - 0.5) * 40)
  const targetLeftY     = useTransform(activeRatio, (r) => (0.5 - r) * 24)
  const targetRightY    = useTransform(activeRatio, (r) => (r - 0.5) * 24)
  const targetLeftGlow  = useTransform(activeRatio, (r) => Math.max(0, (0.5 - r) * 2))
  const targetRightGlow = useTransform(activeRatio, (r) => Math.max(0, (r - 0.5) * 2))

  // Springs (always called, no conditionals)
  const rotation  = useSpring(targetRotation, SPRING)
  const leftY     = useSpring(targetLeftY, SPRING_SLOW)
  const rightY    = useSpring(targetRightY, SPRING_SLOW)
  const leftGlow  = useSpring(targetLeftGlow, SPRING)
  const rightGlow = useSpring(targetRightGlow, SPRING)

  return { sectionRef, rotation, leftY, rightY, leftGlow, rightGlow }
}
