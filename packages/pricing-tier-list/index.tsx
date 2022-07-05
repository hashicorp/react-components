import PricingTierItem from './partials/pricing-tier-item'
import { PricingTierListProps } from './types'
import s from './style.module.css'

const CARD_SIZES = {
  1: 'med',
  2: 'med',
  3: 'sm',
  4: 'sm',
  5: 'xs',
}

const STYLES = {
  1: {
    '--grid-column-start': 5,
    '--grid-column-end': 9,
    '--padding-x': '40px',
  },
  2: {
    '--grid-column-start': 2,
    '--grid-column-end': 12,
    '--column-gap': '135px',
    '--padding-x': '135px',
  },
  3: {
    '--grid-column-start': 1,
    '--grid-column-end': -1,
    '--column-gap': '36px',
    '--padding-x': '57px',
  },
  4: {
    '--grid-column-start': 1,
    '--grid-column-end': -1,
    '--column-gap': '32px',
    '--padding-x': '57px',
  },
  5: {
    '--grid-column-start': 1,
    '--grid-column-end': -1,
    '--column-gap': '32px',
    '--padding-x': '57px',
  },
}

export function PricingTierList({ tiers }: PricingTierListProps) {
  const tiersLength = tiers.length
  return (
    <div className={s.pricingTierListWrapper}>
      <div
        className={s.pricingTierList}
        style={
          {
            ...STYLES[tiersLength],
            '--tier-columns': tiersLength,
          } as React.CSSProperties
        }
      >
        {tiers.map((tier) => (
          <PricingTierItem
            {...tier}
            key={tier.title}
            size={CARD_SIZES[tiersLength]}
          />
        ))}
      </div>
    </div>
  )
}
