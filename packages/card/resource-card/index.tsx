/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import * as CardPrimitives from '../primitives'
import type { CardProps, ThumbnailProps } from '../types'

export interface ResourceCardProps {
  heading: string
  date?: string
  category: string
  link: string
  productBadges?: CardProps['productBadges']
  thumbnail: ThumbnailProps
  appearance?: CardProps['appearance']
}

export function ResourceCard({
  heading,
  date,
  category,
  link,
  productBadges,
  thumbnail,
  appearance,
}: ResourceCardProps): JSX.Element {
  const meta: string[] = date ? [date, category] : [category]

  return (
    <CardPrimitives.Card
      heading={heading}
      link={link}
      withArrow={false}
      appearance={appearance}
    >
      <CardPrimitives.Thumbnail {...thumbnail} />
      <CardPrimitives.Content>
        <CardPrimitives.Meta items={meta} />
        <CardPrimitives.Heading>{heading}</CardPrimitives.Heading>
        {productBadges && productBadges?.length > 0 ? (
          <CardPrimitives.ProductBadges
            badges={productBadges}
            appearance={appearance}
          />
        ) : null}
      </CardPrimitives.Content>
    </CardPrimitives.Card>
  )
}
