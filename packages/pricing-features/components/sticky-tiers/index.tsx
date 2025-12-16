/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Link from 'next/link'
import classNames from 'classnames'
import s from './style.module.css'

export interface StickyTiersProps {
  tiers: Array<{
    title: string
    cta: {
      title: string
      url: string
      onClick?: () => void
    }
  }>
  isVisible?: boolean
}

export default function StickyTiers({
  tiers,
  isVisible = false,
}: StickyTiersProps) {
  const tierCount = tiers.length
  const gridTemplateColumns =
    tierCount > 3
      ? `2fr repeat(${tierCount}, 1fr)`
      : `repeat(${tierCount + 1}, 1fr)`
  const colGap = tierCount === 2 ? '34px' : '22px'

  if (tierCount > 5) {
    throw new Error('<StickyTiers /> only supports up to five tiers')
  }

  return (
    <div
      className={classNames(s.stickyTiers, isVisible && s.isVisible)}
      style={
        {
          '--grid-template-columns': gridTemplateColumns,
          '--col-gap': colGap,
        } as React.CSSProperties
      }
      // content in this component is available in other parts of the page
      aria-hidden={true}
    >
      <div className={s.inner}>
        <div />
        {tiers.map(({ title, cta }) => (
          <div key={title} className={s.tier}>
            <p className={s.tierName}>{title}</p>
            <div className={s.cta}>
              <Link href={cta.url} legacyBehavior>
                {/* links should not be tabbable since they are in other locations on the page (see tier cards in hero) */}
                <a onClick={cta.onClick} tabIndex={-1}>
                  {cta.title}
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
