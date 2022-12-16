import * as CardPrimitives from '../primitives'
import type { CardProps } from '../types'

export interface BlogCardProps {
  heading: string
  description: string
  date: string
  category: string
  link: string
  productBadges?: CardProps['productBadges']
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
  return (
    <CardPrimitives.Card
      heading={heading}
      link={link}
      withArrow={false}
      appearance={appearance}
    >
      <CardPrimitives.Content>
        <CardPrimitives.Meta items={[date, category]} />
        <CardPrimitives.Heading>{heading}</CardPrimitives.Heading>
        <CardPrimitives.Description>{description}</CardPrimitives.Description>
        {productBadges && productBadges?.length > 0 ? (
          <CardPrimitives.ProductBadges
            badges={productBadges}
            appearance={appearance}
          />
        ) : null}
      </CardPrimitives.Content>
    </CardPrimitives.Card>
  )
}
