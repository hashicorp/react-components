import * as CardPrimitives from '../primitives'
import type { CardProps } from '../types'
import s from './style.module.css'

interface CareerCardProps {
  heading: string
  workplaceType: string
  location: string
  link: string
  productBadges?: CardProps['productBadges']
  appearance?: CardProps['appearance']
}

export function CareerCard({
  heading,
  workplaceType,
  location,
  link,
  productBadges,
  appearance,
}: CareerCardProps) {
  return (
    <CardPrimitives.Card
      heading={heading}
      link={link}
      withArrow={false}
      appearance={appearance}
    >
      <CardPrimitives.Content>
        <CardPrimitives.Meta items={[workplaceType]} />
        <p className={s.subHeading}>{location}</p>
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
