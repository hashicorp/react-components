import * as CardPrimitives from '../primitives'
import type { CardProps, MetaProps } from '../types'
import s from './style.module.css'

interface CareerCardProps {
  heading: string
  subHeading: string
  meta: MetaProps['items']
  link: string
  productBadges: CardProps['productBadges']
}

export function CareerCard({
  heading,
  meta,
  link,
  subHeading,
  productBadges,
}: CareerCardProps) {
  return (
    <CardPrimitives.Card heading={heading} link={link} withArrow={false}>
      <CardPrimitives.Content>
        <CardPrimitives.Meta items={meta}></CardPrimitives.Meta>
        <p className={s.subHeading}>{subHeading}</p>
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
