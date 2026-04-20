export interface LabelConfig {
  line1: string
  line2: string
  caption?: string
}

export interface BalancePalette {
  cold: string   // left plateau accent color (default: blue glass)
  warm: string   // right plateau accent color (default: warm gold)
}

export interface BalanceScaleProps {
  /** 0 = left heavy (left down), 0.5 = balanced, 1 = right heavy (right down) */
  ratio: number
  driver?: 'scroll' | 'manual'
  leftLabel?: LabelConfig
  rightLabel?: LabelConfig
  palette?: BalancePalette
  className?: string
}
