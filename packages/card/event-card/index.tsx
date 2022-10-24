import Card from '../card'
import { CardProps, ProductBadgesProps } from '../types'

interface EventCardProps {
  appearance?: CardProps['appearance']
  link: string
  eventDate: string
  eventType: string
  title: string
  productBadges?: ProductBadgesProps['badges']
}

export function EventCard({
  appearance,
  link,
  eventDate,
  eventType,
  title,
  productBadges,
}: EventCardProps) {
  const ctaText = `Register for ${eventType.toLowerCase()}`

  return (
    // TODO Determine how to make these two props optional for EventCard
    // TODO Possibly make their requirement dependent on whether children are passed or not? May need a type guard function...
    <Card heading={title} link={link} appearance={appearance}>
      <Card.Content>
        <Card.Meta items={[eventDate, eventType]}></Card.Meta>
        <Card.Heading>{title}</Card.Heading>
        {productBadges && productBadges?.length > 0 ? (
          <Card.ProductBadges badges={productBadges} appearance={appearance} />
        ) : null}
      </Card.Content>
    </Card>
  )
}
