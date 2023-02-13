/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import Button from '@hashicorp/react-button'
import { PricingTiersProps } from './types'
import s from './style.module.css'

export default function PricingTiers({ tiers }: PricingTiersProps) {
  const tiersLength = tiers.length
  if (tiersLength > 5) {
    throw new Error('<PricingTiers /> only supports up to five tiers')
  }

  return (
    <div
      className={classNames(s.pricingTiersContainer, s[`length${tiersLength}`])}
      data-testid="pricing-tiers"
    >
      <div
        className={s.pricingTiers}
        style={
          {
            '--col': tiersLength,
          } as React.CSSProperties
        }
      >
        {tiers.map(
          (
            {
              tag,
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
                  {tag && <span className={s.tag}>{tag}</span>}
                  {icon && <div className={s.icon}>{icon}</div>}
                  <p className={s.tierName}>{title}</p>
                  <div className={s.details}>
                    <span className={s.label}>{label || ''}</span>
                    <span className={s.price}>{price || ''}</span>
                    <span className={s.consumption}>{consumption || ''}</span>
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
                  <div
                    className={classNames(
                      s.cta,
                      cta.type === 'textLink' ||
                        (tiersLength >= 5 && s.textLinkCta)
                    )}
                  >
                    {cta.type === 'button' && tiersLength < 5 ? (
                      <Button
                        url={cta.url}
                        title={cta.title}
                        theme={{ variant: cta.variant, brand: cta.brand }}
                        onClick={cta.onClick}
                      />
                    ) : (
                      <Link href={cta.url} legacyBehavior>
                        <a className={s.textLink} onClick={cta.onClick}>
                          {cta.title}
                        </a>
                      </Link>
                    )}
                  </div>
                  {footnote && (
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
