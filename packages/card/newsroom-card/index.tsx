/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import * as CardPrimitives from '../primitives'
import type { CardProps, ThumbnailProps } from '../types'

export interface NewsroomCardProps {
  heading: string
  date: string
  category: string
  link: string
  thumbnail?: ThumbnailProps
  appearance?: CardProps['appearance']
  withArrow?: boolean
}

export function NewsroomCard({
  heading,
  date,
  category,
  link,
  thumbnail,
  appearance,
  withArrow = false,
}: NewsroomCardProps): JSX.Element {
  console.log(withArrow)
  return (
    <CardPrimitives.Card
      heading={heading}
      link={link}
      withArrow={withArrow}
      appearance={appearance}
    >
      {thumbnail ? <CardPrimitives.LogoThumbnail {...thumbnail} /> : null}
      <CardPrimitives.Content>
        <CardPrimitives.Meta items={[date, category]} />
        <CardPrimitives.Heading>{heading}</CardPrimitives.Heading>
      </CardPrimitives.Content>
    </CardPrimitives.Card>
  )
}
