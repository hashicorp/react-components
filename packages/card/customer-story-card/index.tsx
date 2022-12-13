import * as CardPrimitives from '../primitives'
import type { CardProps, MetaProps, ThumbnailProps } from '../types'
import s from './style.module.css'

interface CustomerStoryCardProps {
  heading: string
  meta: MetaProps['items']
  link: string
  thumbnail: ThumbnailProps
  productBadges: CardProps['productBadges']
}

export default function CustomerStoryCard({
  heading,
  meta,
  link,
  thumbnail,
  productBadges,
}: CustomerStoryCardProps): JSX.Element {
  return (
    <CardPrimitives.Card heading={heading} link={link} withArrow={false}>
      <CardPrimitives.Thumbnail {...thumbnail} />
      <CardPrimitives.Content>
        <CardPrimitives.Meta items={meta}></CardPrimitives.Meta>
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
