import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import Button from '@hashicorp/react-button'
import { PricingTiersProps } from './types'
import s from './style.module.css'

export default function PricingTiers({
  tiers,
  isCollapsed,
}: PricingTiersProps) {
  const tiersLength = tiers.length
  if (tiersLength > 5) {
    throw new Error('<PricingTiers /> only supports up to five tiers')
  }

  return (
    <div
      className={classNames(
        s.pricingTiersContainer,
        s[`length${tiersLength}`],
        isCollapsed && s.isCollapsed
      )}
    >
      <div
        className={s.pricingTiers}
        style={
          {
            '--col': tiersLength,
          } as React.CSSProperties
        }
        data-testid="pricing-tiers"
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
              footnote,
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
                  {icon && !isCollapsed && <div className={s.icon}>{icon}</div>}
                  <p className={s.tierName}>{title}</p>
                  {!isCollapsed && (
                    <div className={s.details}>
                      {label && <span className={s.label}>{label}</span>}
                      {price && <span className={s.price}>{price}</span>}
                      {consumption && (
                        <span className={s.consumption}>{consumption}</span>
                      )}
                    </div>
                  )}
                </div>
                {!isCollapsed && (
                  <div
                    className={s.description}
                    dangerouslySetInnerHTML={{ __html: description }}
                    style={
                      {
                        '--column-index': _columnIndex,
                      } as React.CSSProperties
                    }
                  />
                )}
                <div className={s.bottom}>
                  <div className={s.cta}>
                    {cta.type === 'button' &&
                    tiersLength < 5 &&
                    !isCollapsed ? (
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
                  {footnote && !isCollapsed && (
                    <div
                      className={s.footnote}
                      dangerouslySetInnerHTML={{ __html: footnote }}
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
