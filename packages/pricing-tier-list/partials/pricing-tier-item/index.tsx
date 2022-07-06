import Link from 'next/link'
import classNames from 'classnames'
import type { PricingTierItemProps } from '../../types'
import s from './style.module.css'
// import Button from 'packages/button'
import Button from '@hashicorp/react-button'

export default function PricingTierItem({
  icon,
  title,
  label,
  price,
  consumption,
  description,
  cta,
  supplementaryInfo,
  size = 'md',
}: PricingTierItemProps): React.ReactElement {
  const hasSmallFont = size === 'sm'
  const hasExtraSmallFont = size === 'xs'
  return (
    <div className={s.pricingTierItem}>
      {icon && <div className={s.icon}>{icon}</div>}
      <h3
        className={classNames(
          s.tierName,
          hasSmallFont && s.tierNameSM,
          hasExtraSmallFont && s.tierNameXS
        )}
      >
        {title}
      </h3>
      <div className={s.details}>
        {label && <span className={s.label}>{label}</span>}
        {price && (
          <span className={classNames(s.price, hasExtraSmallFont && s.priceXS)}>
            {price}
          </span>
        )}
        {consumption && <span className={s.consumption}>{consumption}</span>}
      </div>
      <div
        className={classNames(s.description, hasExtraSmallFont && s.xsFont)}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div className={s.bottom}>
        <div className={s.cta}>
          {cta.type === 'button' && size !== 'xs' ? (
            <Button url={cta.url} title={cta.title} theme={cta.theme} />
          ) : (
            <Link href={cta.url}>
              <a
                className={classNames(
                  s.textLink,
                  hasExtraSmallFont && s.textLinkXS
                )}
              >
                {cta.title}
              </a>
            </Link>
          )}
        </div>
        {supplementaryInfo && (
          <div
            className={classNames(s.supplementaryInfo, s.xsFont)}
            dangerouslySetInnerHTML={{ __html: supplementaryInfo }}
          />
        )}
      </div>
    </div>
  )
}
