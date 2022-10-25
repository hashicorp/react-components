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

function Card(props: CardProps) {
  const {
    appearance = 'light',
    withArrow = true,
    meta,
    thumbnail,
    heading,
    productBadges,
    description,
    link,
    withArrow = true,
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
            {description ? <Description>{description}</Description> : null}
            {productBadges && productBadges?.length > 0 ? (
              <ProductBadges badges={productBadges} appearance={appearance} />
            ) : null}
          </Content>
        </>
      )}

      <div className={s.cta}>{withArrow ? <IconArrowRight24 /> : null}</div>

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

Card.Thumbnail = Thumbnail
Card.Meta = Meta
Card.Content = Content
Card.Heading = Heading
Card.Description = Description
Card.ProductBadges = ProductBadges

export default Card
