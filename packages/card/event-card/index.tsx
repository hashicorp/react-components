import { useState } from 'react'
import Card from '../card'
import ExpandableArrow from '@hashicorp/react-expandable-arrow'
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
  const [arrowExpanded, setArrowExpanded] = useState(false)

  function handleHover(isHovered: boolean) {
    setArrowExpanded(isHovered)
  }

  return (
    <Card
      hoverHandler={handleHover}
      heading={title}
      link={link}
      appearance={appearance}
      withArrow={false}
    >
      <Card.Content>
        <Card.Meta items={[eventDate, eventType]}></Card.Meta>
        <Card.Heading>{title}</Card.Heading>
        {productBadges && productBadges?.length > 0 ? (
          <Card.ProductBadges badges={productBadges} appearance={appearance} />
        ) : null}
        <span className={s.pseudoCta}>
          <span className={s.pseudoCtaLabel}>{ctaText}</span>
          <span className={s.pseudoCtaIcon}>
            <ExpandableArrow expanded={arrowExpanded} />
          </span>
        </span>
      </Card.Content>
    </Card>
  )
}
