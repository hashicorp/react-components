import * as CardPrimitives from '../primitives'
import type { CardProps, ThumbnailProps } from '../types'
import s from './style.module.css'

interface ResourceCardProps {
  heading: string
  date: string
  category: string
  link: string
  productBadges?: CardProps['productBadges']
  thumbnail: ThumbnailProps
  appearance?: CardProps['appearance']
}

export function ResourceCard({
  heading,
  date,
  category,
  link,
  productBadges,
  thumbnail,
  appearance,
}: ResourceCardProps): JSX.Element {
  return (
    <CardPrimitives.Card
      heading={heading}
      link={link}
      withArrow={false}
      appearance={appearance}
    >
      <CardPrimitives.Thumbnail {...thumbnail} />
      <CardPrimitives.Content>
        <CardPrimitives.Meta items={[date, category]} />
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
