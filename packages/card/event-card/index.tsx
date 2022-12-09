import * as CardPrimitives from '../primitives'
import ExpandableArrow from '@hashicorp/react-expandable-arrow'
import { CardProps, ProductBadgesProps } from '../types'
import s from './style.module.css'
import useHover from '../hooks/use-hover'

export interface EventCardProps {
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
  const [hoverRef, isHovered] = useHover<HTMLAnchorElement>()

  return (
    <CardPrimitives.Card
      ref={hoverRef}
      heading={title}
      link={link}
      appearance={appearance}
      withArrow={false}
    >
      <CardPrimitives.Content>
        <CardPrimitives.Meta
          items={[eventDate, eventType]}
        ></CardPrimitives.Meta>
        <CardPrimitives.Heading>{title}</CardPrimitives.Heading>
        {productBadges && productBadges?.length > 0 ? (
          <CardPrimitives.ProductBadges
            badges={productBadges}
            appearance={appearance}
          />
        ) : null}
        <span className={s.pseudoCta}>
          <span className={s.pseudoCtaLabel}>{ctaText}</span>
          <span className={s.pseudoCtaIcon}>
            <ExpandableArrow expanded={isHovered} />
          </span>
        </span>
      </CardPrimitives.Content>
    </CardPrimitives.Card>
  )
}
