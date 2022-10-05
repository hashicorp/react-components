import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import ProductBadge from '@hashicorp/react-product-badge'
import { IconArrowRight24 } from '@hashicorp/flight-icons/svg-react/arrow-right-24'
import type {
  CardProps,
  ThumbnailProps,
  MetaProps,
  ContentProps,
  HeadingProps,
  ProductBadgesProps,
  DescriptionProps,
} from './types'
import s from './style.module.css'
import React from 'react'

function Card(props: CardProps) {
  const {
    appearance = 'light',
    meta,
    thumbnail,
    heading,
    productBadges,
    description,
    link,
    children,
  } = props

  return (
    <div className={classNames(s.card, s[appearance])} data-testid="wpl-card">
      {children ? (
        children
      ) : (
        <>
          {thumbnail ? <Thumbnail {...thumbnail} /> : null}
          <Content>
            {meta && meta.length > 0 ? <Meta items={meta} /> : null}
            <Heading>{heading}</Heading>
            {productBadges && ProductBadges.length > 0 ? (
              <ProductBadges
                productBadges={productBadges}
                appearance={appearance}
              />
            ) : null}
            {description ? <Description>{description}</Description> : null}
          </Content>
        </>
      )}
      <div className={s.cta}>
        <IconArrowRight24 />
      </div>
      <Link href={link}>
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a className={s.link} aria-label={heading} />
      </Link>
    </div>
  )
}

function Thumbnail({ src, alt }: ThumbnailProps) {
  return (
    <div className={s.thumbnail} data-testid="wpl-card-thumbnail">
      <div className={s.image}>
        <Image
          src={src}
          alt={alt}
          width={800}
          height={450}
          layout="responsive"
          objectFit="cover"
        />
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
            {stableIdx > 0 ? (
              <span className={s.metaSeparator} aria-hidden={true}>
                |
              </span>
            ) : null}
            {item}
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

function ProductBadges({
  productBadges,
  appearance = 'light',
}: ProductBadgesProps) {
  return (
    <div className={s.productBadges}>
      {productBadges.map((badge, stableIdx) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={stableIdx}>
            <ProductBadge
              appearance={appearance}
              productName={badge.productName}
              hasDot={true}
            />
          </React.Fragment>
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

Card.Thumbnail = Thumbnail
Card.Meta = Meta
Card.Content = Content
Card.Heading = Heading
Card.ProductBadges = ProductBadges
Card.Description = Description

export default Card
