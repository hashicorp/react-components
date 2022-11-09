import * as CardPrimitive from '../primitives'
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
  const [hoverRef, isHovered] = useHover<HTMLAnchorElement>()

  return (
    <CardPrimitive.Card
      ref={hoverRef}
      heading={title}
      link={link}
      appearance={appearance}
      withArrow={false}
    >
      <CardPrimitive.Content>
        <CardPrimitive.Meta items={[eventDate, eventType]}></CardPrimitive.Meta>
        <CardPrimitive.Heading>{title}</CardPrimitive.Heading>
        {productBadges && productBadges?.length > 0 ? (
          <CardPrimitive.ProductBadges
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
      </CardPrimitive.Content>
    </CardPrimitive.Card>
  )
}
