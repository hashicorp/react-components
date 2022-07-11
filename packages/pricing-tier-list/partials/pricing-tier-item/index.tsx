import Link from 'next/link'
import classNames from 'classnames'
import type { PricingTierItemProps } from '../../types'
import s from './style.module.css'
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
  size = 'lg',
}: PricingTierItemProps): React.ReactElement {
  return (
    <div className={classNames(s.pricingTierItem, s[`${size}Size`])}>
      {icon && <div className={s.icon}>{icon}</div>}
      <h3 className={s.tierName}>{title}</h3>
      <div className={s.details}>
        {label && <span className={s.label}>{label}</span>}
        {price && <span className={s.price}>{price}</span>}
        {consumption && <span className={s.consumption}>{consumption}</span>}
      </div>
      <div
        className={s.description}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div className={s.bottom}>
        <div className={s.cta}>
          {cta.type === 'button' && size !== 'xs' ? (
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
    </div>
  )
}
