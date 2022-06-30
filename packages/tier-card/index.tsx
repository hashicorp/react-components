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
    <div className={s.tierCard}>
      {icon && <div className={s.icon}>{icon}</div>}
      <h3 className={hasExtraSmallFont ? s.tierNameXS : s.tierName}>{title}</h3>
      <div className={s.details}>
        {label && <span className={s.label}>{label}</span>}
        {price && <span className={s.price}>{price}</span>}
        {consumption && <span className={s.consumption}>{consumption}</span>}
      </div>
      <div
        className={hasExtraSmallFont ? s.descriptionXS : s.description}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div className={s.cta}>
        {cta.type === 'button' ? (
          <Button url={cta.url} title={cta.title} theme={cta.theme} />
        ) : (
          <Link href={cta.url}>
            <a className={s.textLink}>{cta.title}</a>
          </Link>
        )}
      </div>
      {supplementaryInfo && (
        <div
          className={s.supplementaryInfo}
          dangerouslySetInnerHTML={{ __html: supplementaryInfo }}
        />
      )}
    </div>
  )
}
