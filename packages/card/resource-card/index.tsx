import * as CardPrimitives from '../primitives'
import type { MetaProps, CardProps, ThumbnailProps } from '../types'
import s from './style.module.css'

interface ResourceCardProps {
  heading: string
  meta: MetaProps['items']
  link: string
  productBadges: CardProps['productBadges']
  thumbnail: ThumbnailProps
}

export function ResourceCard({
  heading,
  meta,
  link,
  productBadges,
  thumbnail,
}: ResourceCardProps): JSX.Element {
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
