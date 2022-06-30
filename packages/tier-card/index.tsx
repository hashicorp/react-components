import * as React from 'react'
import Link from 'next/link'
import type { TierCardProps } from './types'
import s from './style.module.css'
import Button from 'packages/button'

export default function TierCard({
  icon,
  title,
  label,
  price,
  consumption,
  description,
  cta,
  supplementaryInfo,
  size = 'sm',
}: TierCardProps): React.ReactElement {
  const hasExtraSmallFont = size === 'xs'
  return (
    <div className={s.root}>
      {icon && <div className={s.icon}>{icon}</div>}
      <h2 className={hasExtraSmallFont ? s.tierNameXS : s.tierName}>{title}</h2>
      <div className={s.details}>
        <span className={s.label}>{label}</span>
        <span className={s.price}>{price}</span>
        <span className={s.consumption}>{consumption}</span>
      </div>
      <p className={hasExtraSmallFont ? s.descroptionXS : s.descroption}>
        {description}
      </p>
      <div className={s.cta}>
        {cta.type === 'button' ? (
          <Button url={cta.url} title={cta.title} theme={cta.theme} />
        ) : (
          <Link href={cta.url}>{cta.title}</Link>
        )}
      </div>
      {supplementaryInfo && (
        <span className={s.supplementaryInfo}>{supplementaryInfo}</span>
      )}
    </div>
  )
}
