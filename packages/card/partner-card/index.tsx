import * as CardPrimitives from '../primitives'
import type { CardProps, ThumbnailProps } from '../types'
import s from './style.module.css'

interface PartnerCardProps {
  description: string
  category: string
  link: string
  productBadges: CardProps['productBadges']
  thumbnail: ThumbnailProps
  appearance?: CardProps['appearance']
}

export function PartnerCard({
  description,
  category,
  link,
  thumbnail,
  productBadges,
  appearance,
}: PartnerCardProps) {
  return (
    <CardPrimitives.Card
      heading={description}
      link={link}
      withArrow={false}
      appearance={appearance}
    >
      <CardPrimitives.Thumbnail {...thumbnail} />
      <CardPrimitives.Content>
        <CardPrimitives.Meta items={[category]} />
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
