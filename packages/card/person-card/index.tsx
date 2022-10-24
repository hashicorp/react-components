import type { CardProps, ProductBadgesProps, ThumbnailProps } from '../types'
import Card from '../card'
import s from './style.module.css'

interface PersonCardProps {
  appearance?: CardProps['appearance']
  thumbnail: ThumbnailProps
  link: string
  name: string
  location?: string
  bio: string
  productBadges?: ProductBadgesProps['badges']
}

export function PersonCard({
  appearance,
  link,
  thumbnail,
  name,
  location,
  bio,
  productBadges,
}: PersonCardProps) {
  return (
    <Card heading={name} link={link} appearance={appearance}>
      <Card.Thumbnail {...thumbnail} />
      <Card.Content>
        <div>
          <Card.Heading>{name}</Card.Heading>
          {location ? <p className={s.location}>{location}</p> : null}
        </div>
        <Card.Description>{bio}</Card.Description>
        {productBadges && productBadges?.length > 0 ? (
          <Card.ProductBadges badges={productBadges} appearance={appearance} />
        ) : null}
      </Card.Content>
    </Card>
  )
}
