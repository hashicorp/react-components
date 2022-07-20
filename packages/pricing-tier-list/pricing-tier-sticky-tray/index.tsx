import Link from 'next/link'
import { handleTiersLength } from '../helpers'
import { PricingStickyTrayProps } from '../types'
import s from './style.module.css'

export default function PricingStickyTray({ tiers }: PricingStickyTrayProps) {
  handleTiersLength(tiers.length)

  return (
    <div
      className={s.pricingStickyTrayContainer}
      style={
        {
          '--col': tiers.length,
        } as React.CSSProperties
      }
    >
      <div className={s.pricingStickyTray}>
        {tiers.map(({ title, cta }) => (
          <div className={s.tier} key={title}>
            <p className={s.tierName}>{title}</p>
            <Link href={cta.url}>
              <a className={s.textLink}>{cta.title}</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
