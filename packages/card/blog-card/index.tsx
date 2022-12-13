import * as CardPrimitives from '../primitives'
import type { CardProps } from '../types'
import s from './style.module.css'

interface BlogCardProps {
  heading: string
  description: string
  date: Date
  category: string
  link: string
  productBadges: CardProps['productBadges']
  appearance?: CardProps['appearance']
}

export function BlogCard({
  heading,
  description,
  date,
  category,
  link,
  productBadges,
  appearance,
}: BlogCardProps): JSX.Element {
  const formattedDate = new Date(date).toLocaleDateString('en-US')

  return (
    <CardPrimitives.Card
      heading={heading}
      link={link}
      withArrow={false}
      appearance={appearance}
    >
      <CardPrimitives.Content>
        <CardPrimitives.Meta items={[formattedDate, category]} />
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
