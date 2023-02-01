/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import * as CardPrimitives from '../primitives'
import type { CardProps, ThumbnailProps } from '../types'

export interface NewsroomCardProps {
  heading: string
  date: string
  link: string
  thumbnail: ThumbnailProps
  appearance?: CardProps['appearance']
}

export function NewsroomCard({
  heading,
  date,
  link,
  thumbnail,
  appearance,
}: NewsroomCardProps): JSX.Element {
  return (
    <CardPrimitives.Card
      heading={heading}
      link={link}
      withArrow={false}
      appearance={appearance}
    >
      <CardPrimitives.Thumbnail {...thumbnail} />
      <CardPrimitives.Content>
        <CardPrimitives.Meta items={[date]} />
        <CardPrimitives.Heading>{heading}</CardPrimitives.Heading>
      </CardPrimitives.Content>
    </CardPrimitives.Card>
  )
}
