import * as CardPrimitives from '../primitives'
import type { CardProps, MetaProps, ThumbnailProps } from '../types'

export interface NewsroomCardProps {
  heading: string
  publishedDate: Date
  link: string
  thumbnail: ThumbnailProps
  appearance?: CardProps['appearance']
}

export function NewsroomCard({
  heading,
  publishedDate,
  link,
  thumbnail,
  appearance,
}: NewsroomCardProps): JSX.Element {
  const formattedDate = new Date(publishedDate).toLocaleDateString('en-US')

  return (
    <CardPrimitives.Card
      heading={heading}
      link={link}
      withArrow={false}
      appearance={appearance}
    >
      <CardPrimitives.Thumbnail {...thumbnail} />
      <CardPrimitives.Content>
        <CardPrimitives.Meta items={[formattedDate]} />
        <CardPrimitives.Heading>{heading}</CardPrimitives.Heading>
      </CardPrimitives.Content>
    </CardPrimitives.Card>
  )
}
