import type { CardProps } from './types'
import * as CardPrimitive from './primitives'

function Card({
  appearance,
  heading,
  link,
  thumbnail,
  meta,
  description,
  productBadges,
}: CardProps) {
  return (
    <CardPrimitive.Card appearance={appearance} heading={heading} link={link}>
      {thumbnail ? (
        <CardPrimitive.Thumbnail src={thumbnail.src} alt={thumbnail.alt} />
      ) : null}
      <CardPrimitive.Content>
        {meta && meta.length > 0 ? <CardPrimitive.Meta items={meta} /> : null}
        <CardPrimitive.Heading>{heading}</CardPrimitive.Heading>
        {description ? (
          <CardPrimitive.Description>{description}</CardPrimitive.Description>
        ) : null}
        {productBadges && productBadges?.length > 0 ? (
          <CardPrimitive.ProductBadges
            badges={productBadges}
            appearance={appearance}
          />
        ) : null}
      </CardPrimitive.Content>
    </CardPrimitive.Card>
  )
}

export default Card
