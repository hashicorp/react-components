import type { CardProps, ProductBadgesProps, ThumbnailProps } from '../types'
import * as CardPrimitive from '../primitives'
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
    <CardPrimitive.Card
      heading={name}
      link={link}
      appearance={appearance}
      withArrow={false}
    >
      <div className={s.thumbnailContainer}>
        <CardPrimitive.Thumbnail {...thumbnail} />
        <Icon url={link} />
      </div>
      <CardPrimitive.Content>
        <div>
          <CardPrimitive.Heading>{name}</CardPrimitive.Heading>
          {location ? <p className={s.location}>{location}</p> : null}
        </div>
        <CardPrimitive.Description>{bio}</CardPrimitive.Description>
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
