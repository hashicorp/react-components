import * as CardPrimitives from '../primitives'
import type { CardProps, MetaProps, ThumbnailProps } from '../types'
import s from './style.module.css'

interface PartnerCardProps {
  description: string
  meta: MetaProps['items']
  link: string
  productBadges: CardProps['productBadges']
  thumbnail: ThumbnailProps
}

export default function PartnerCard({
  description,
  meta,
  link,
  thumbnail,
  productBadges,
}: PartnerCardProps) {
  return (
    <CardPrimitives.Card heading={description} link={link} withArrow={false}>
      <CardPrimitives.Thumbnail {...thumbnail} />
      <CardPrimitives.Content>
        <CardPrimitives.Meta items={meta}></CardPrimitives.Meta>
        <CardPrimitives.Description>{description}</CardPrimitives.Description>
        <div className={s.bottom}>
          {productBadges && productBadges?.length > 0 ? (
            <CardPrimitives.ProductBadges badges={productBadges} />
          ) : null}
        </div>
      </CardPrimitives.Content>
    </CardPrimitives.Card>
  )
}
