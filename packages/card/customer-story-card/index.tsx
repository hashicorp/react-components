import * as CardPrimitives from '../primitives'
import type { CardProps, ThumbnailProps } from '../types'
import s from './style.module.css'

export interface CustomerStoryCardProps {
  heading: string
  category: string
  link: string
  productBadges?: CardProps['productBadges']
  thumbnail: ThumbnailProps
  appearance?: CardProps['appearance']
}

export function CustomerStoryCard({
  heading,
  category,
  link,
  thumbnail,
  productBadges,
  appearance,
}: CustomerStoryCardProps): JSX.Element {
  return (
    <CardPrimitives.Card
      heading={heading}
      link={link}
      withArrow={false}
      appearance={appearance}
    >
      <CardPrimitives.Thumbnail {...thumbnail} />
      <CardPrimitives.Content>
        <CardPrimitives.Meta items={[category]} />
        <CardPrimitives.Heading>{heading}</CardPrimitives.Heading>
        <div className={s.bottom}>
          {productBadges && productBadges?.length > 0 ? (
            <CardPrimitives.ProductBadges badges={productBadges} />
          ) : null}
        </div>
      </CardPrimitives.Content>
    </CardPrimitives.Card>
  )
}
