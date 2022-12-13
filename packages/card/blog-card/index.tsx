import * as CardPrimitives from '../primitives'
import type { CardProps, MetaProps } from '../types'
import s from './style.module.css'

interface BlogCardProps {
  heading: string
  description: string
  meta: MetaProps['items']
  link: string
  productBadges: CardProps['productBadges']
}

export default function BlogCard({
  heading,
  description,
  meta,
  link,
  productBadges,
}: BlogCardProps): JSX.Element {
  return (
    <CardPrimitives.Card heading={heading} link={link} withArrow={false}>
      <CardPrimitives.Content>
        <CardPrimitives.Meta items={meta} />
        <CardPrimitives.Heading>{heading}</CardPrimitives.Heading>
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
