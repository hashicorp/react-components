import classNames from 'classnames'
import { PricingTierListProps } from './types'
import s from './style.module.css'
import Button from '@hashicorp/react-button'
import Link from 'next/link'
import React from 'react'

export default function PricingTierList({ tiers }: PricingTierListProps) {
  const tiersLength = tiers.length

  if (tiersLength > 5) {
    throw new Error('<PricingTierList /> only supports up to five tiers')
  }

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
        {tiers.map(
          (
            {
              icon,
              title,
              label,
              price,
              consumption,
              description,
              cta,
              supplementaryInfo,
            },
            colIdx
          ) => {
            const _columnIndex = colIdx + 1
            return (
              <React.Fragment key={title}>
                <div
                  className={s.header}
                  style={
                    {
                      '--column-index': _columnIndex,
                    } as React.CSSProperties
                  }
                >
                  {icon && <div className={s.icon}>{icon}</div>}
                  <h3 className={s.tierName}>{title}</h3>
                  <div className={s.details}>
                    {label && <span className={s.label}>{label}</span>}
                    {price && <span className={s.price}>{price}</span>}
                    {consumption && (
                      <span className={s.consumption}>{consumption}</span>
                    )}
                  </div>
                </div>
                <div
                  className={s.description}
                  dangerouslySetInnerHTML={{ __html: description }}
                  style={
                    {
                      '--column-index': _columnIndex,
                    } as React.CSSProperties
                  }
                />
                <div className={s.bottom}>
                  <div className={s.cta}>
                    {cta.type === 'button' && tiersLength < 5 ? (
                      <Button
                        url={cta.url}
                        title={cta.title}
                        theme={cta.theme}
                      />
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
              </React.Fragment>
            )
          }
        )}
      </div>
    </div>
  )
}
