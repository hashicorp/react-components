import classNames from 'classnames'
import PricingTierItem from './partials/pricing-tier-item'
import { PricingTierListProps } from './types'
import s from './style.module.css'

const CARD_SIZES = {
  1: 'lg',
  2: 'lg',
  3: 'md',
  4: 'sm',
  5: 'xs',
}

export default function PricingTierList({ tiers }: PricingTierListProps) {
  const tiersLength = tiers.length

  return (
    <div className={s.pricingTierListContainer}>
      <div
        className={classNames(s.pricingTierList, s[`length${tiersLength}`])}
        style={
          {
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
