import Card from '../card'
import { CardProps, ProductBadgesProps } from '../types'
import s from './style.module.css'

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
    <Card heading={title} link={link} appearance={appearance} withArrow={false}>
      <Card.Content>
        <Card.Meta items={[eventDate, eventType]}></Card.Meta>
        <Card.Heading>{title}</Card.Heading>
        {productBadges && productBadges?.length > 0 ? (
          <Card.ProductBadges badges={productBadges} appearance={appearance} />
        ) : null}
        <span className={s.pseudoCta}>
          <span className={s.pseudoCtaLabel}>{ctaText}</span>
          <span className={s.pseudoCtaIcon}>
            <svg
              className={s.pseudoCtaIconArrow}
              width="9"
              height="10"
              viewBox="0 0 9 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              focusable={false}
            >
              <path d="M4 1L8 5L4 9" stroke="currentColor" strokeWidth={1.8} />
              <path
                className={s.pseudoCtaIconLine}
                d="M8 5H0"
                stroke="currentColor"
                strokeWidth={1.8}
              />
            </svg>
          </span>
        </span>
      </Card.Content>
    </Card>
  )
}
