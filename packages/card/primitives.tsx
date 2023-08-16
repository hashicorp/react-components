/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import * as React from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import ProductBadge from '@hashicorp/react-product-badge'
import { IconArrowRight24 } from '@hashicorp/flight-icons/svg-react/arrow-right-24'
import type {
  CardPrimitiveProps,
  ThumbnailProps,
  MetaProps,
  ContentProps,
  HeadingProps,
  ProductBadgesProps,
  DescriptionProps,
} from './types'
import s from './style.module.css'

const Card = React.forwardRef<HTMLAnchorElement, CardPrimitiveProps>(
  (props, ref) => {
    const {
      appearance = 'light',
      withArrow = true,
      heading,
      link,
      isExternal,
      children,
    } = props
    return (
      <div className={classNames(s.card, s[appearance])} data-testid="wpl-card">
        <div className={s.contentContainer}>
          {children}

          <div className={s.cta} data-testid="wpl-card-cta">
            {withArrow ? <IconArrowRight24 /> : null}
          </div>

          <Link href={link} legacyBehavior>
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
            <a
              ref={ref}
              className={s.link}
              aria-label={heading}
              target={isExternal ? '_blank' : undefined}
            />
          </Link>
        </div>
      </div>
    )
  }
)

function Thumbnail({ src, alt }: ThumbnailProps) {
  return (
    <div className={s.thumbnail} data-testid="wpl-card-thumbnail">
      <div className={s.image}>
        <Image src={src} alt={alt} width={800} height={450} />
      </div>
    </div>
  )
}

function LogoThumbnail({ src, alt }: ThumbnailProps) {
  return (
    <div className={s.logoThumbnail} data-testid="wpl-card-logo-thumbnail">
      <div className={s.image}>
        <Image src={src} alt={alt} width={800} height={450} />
      </div>
    </div>
  )
}

function Meta({ items }: MetaProps) {
  return (
    <ul className={s.meta} data-testid="wpl-card-meta">
      {items.map((item, stableIdx) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <li key={stableIdx}>
            {item}
            {stableIdx < items.length - 1 ? (
              <span className={s.metaSeparator} aria-hidden={true}>
                |
              </span>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}

function Content({ children }: ContentProps) {
  return (
    <div className={s.content} data-testid="wpl-card-content">
      {children}
    </div>
  )
}

function Heading({ as: Component = 'h2', children }: HeadingProps) {
  return (
    <Component className={s.heading} data-testid="wpl-card-heading">
      {children}
    </Component>
  )
}

function ProductBadges({ badges, appearance = 'light' }: ProductBadgesProps) {
  return (
    <div className={s.productBadges}>
      {badges.map((badge, stableIdx) => {
        return (
          <ProductBadge
            // eslint-disable-next-line react/no-array-index-key
            key={stableIdx}
            appearance={appearance}
            productName={badge}
            hasDot={true}
          />
        )
      })}
    </div>
  )
}

function Description({ children }: DescriptionProps) {
  return (
    <p className={s.description} data-testid="wpl-card-description">
      {children}
    </p>
  )
}

Card.displayName = 'Card'
export {
  Card,
  Thumbnail,
  LogoThumbnail,
  Meta,
  Content,
  Heading,
  Description,
  ProductBadges,
}
