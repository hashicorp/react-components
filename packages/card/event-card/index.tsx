import Card from '../card'
import ExpandableArrow from '@hashicorp/react-expandable-arrow'
import { CardProps, ProductBadgesProps } from '../types'
import s from './style.module.css'
import useHover from '../hooks/use-hover'

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
  const [hoverRef, isHovered] = useHover<HTMLDivElement>()

  return (
    <Card
      hoverRef={hoverRef}
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
            <ExpandableArrow expanded={isHovered} />
          </span>
        </span>
      </Card.Content>
    </Card>
  )
}
