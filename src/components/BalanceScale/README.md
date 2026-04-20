# BalanceScale

An animated balance scale component for franco-american legal cabinet landing pages. Built with pure CSS/Tailwind and Framer Motion — no SVG, no images. Chrome/metal column with glass-blue and warm-gold plateaux.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ratio` | `number` | `0.2` | `0` = left heavy (left down), `0.5` = balanced, `1` = right heavy (right down) |
| `driver` | `'scroll' \| 'manual'` | `'manual'` | Animation driver. `scroll` ties the tilt to scroll position. |
| `leftLabel` | `LabelConfig` | See defaults | Text content for left plateau card |
| `rightLabel` | `LabelConfig` | See defaults | Text content for right plateau card |
| `palette` | `BalancePalette` | Blue/Gold | Accent colors for left and right plateaux |
| `className` | `string` | `''` | Additional CSS classes on the wrapper |

## Usage Examples

### 1. Manual control (ratio from state/slider)

```tsx
import { useState } from 'react'
import { BalanceScale } from '@/components/BalanceScale'

export default function ComparisonSection() {
  const [ratio, setRatio] = useState(0.15)

  return (
    <section className="py-24">
      <BalanceScale
        ratio={ratio}
        driver="manual"
        leftLabel={{ line1: 'Sans cabinet', line2: 'expert', caption: '90% marketing' }}
        rightLabel={{ line1: 'Avec MA SOCIÉTÉ US', line2: '', caption: '100% expertise' }}
      />
      <input
        type="range" min={0} max={1} step={0.01}
        value={ratio}
        onChange={e => setRatio(Number(e.target.value))}
      />
    </section>
  )
}
```

### 2. Scroll-driven (balance tips as you scroll past)

```tsx
import { BalanceScale } from '@/components/BalanceScale'

export default function WhyUsSection() {
  return (
    <section className="py-32 min-h-screen">
      <h2 className="text-center text-3xl mb-16">Pourquoi un cabinet spécialisé ?</h2>
      <BalanceScale
        ratio={0.5}
        driver="scroll"
        leftLabel={{ line1: 'Seul face à', line2: 'l\'administration', caption: 'Délai moyen : 6 mois' }}
        rightLabel={{ line1: 'Accompagné', line2: 'par nos experts', caption: 'Délai moyen : 3 semaines' }}
      />
    </section>
  )
}
```

### 3. Custom palette — SPIKE theme (red/gold)

```tsx
import { BalanceScale } from '@/components/BalanceScale'

const SPIKE_PALETTE = {
  cold: '#c0392b',   // SPIKE red
  warm: '#f39c12',   // amber gold
}

export default function SpikeComparison() {
  return (
    <BalanceScale
      ratio={0.8}
      driver="manual"
      palette={SPIKE_PALETTE}
      leftLabel={{ line1: 'Risque fiscal', line2: 'non-déclaré', caption: 'FBAR / FATCA' }}
      rightLabel={{ line1: 'Conformité', line2: 'garantie', caption: 'Zéro pénalité' }}
      className="mx-auto max-w-lg"
    />
  )
}
```
