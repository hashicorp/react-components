import type { CardProps, ProductBadgesProps, ThumbnailProps } from '../types'
import Card from '../card'
import { IconGithub16 } from '@hashicorp/flight-icons/svg-react/github-16'
import { IconTwitter16 } from '@hashicorp/flight-icons/svg-react/twitter-16'
import { IconLinkedin16 } from '@hashicorp/flight-icons/svg-react/linkedin-16'
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

function Icon({ url }) {
  let icon
  if (url.includes('twitter')) {
    icon = <IconTwitter16 data-testid={'wpl-personcard-twitter-icon'} />
  }
  if (url.includes('github')) {
    icon = <IconGithub16 data-testid={'wpl-personcard-github-icon'} />
  }
  if (url.includes('linkedin')) {
    icon = <IconLinkedin16 data-testid={'wpl-personcard-linkedin-icon'} />
  }

  return icon ? <div className={s.thumbnailIcon}>{icon}</div> : null
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
    <Card heading={name} link={link} appearance={appearance} withArrow={false}>
      <div className={s.thumbnailContainer}>
        <Card.Thumbnail {...thumbnail} />
        <Icon url={link} />
      </div>
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
