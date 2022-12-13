import * as CardPrimitives from '../primitives'
import type { MetaProps, ThumbnailProps } from '../types'

export interface NewsroomCardProps {
  heading: string
  meta: MetaProps['items']
  link: string
  thumbnail: ThumbnailProps
}

export default function NewsroomCard({
  heading,
  meta,
  link,
  thumbnail,
}: NewsroomCardProps): JSX.Element {
  return (
    <CardPrimitives.Card heading={heading} link={link} withArrow={false}>
      <CardPrimitives.Thumbnail {...thumbnail} />
      <CardPrimitives.Content>
        <CardPrimitives.Meta items={meta}></CardPrimitives.Meta>
        <CardPrimitives.Heading>{heading}</CardPrimitives.Heading>
      </CardPrimitives.Content>
    </CardPrimitives.Card>
  )
}
