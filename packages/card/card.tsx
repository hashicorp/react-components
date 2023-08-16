/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { CardProps } from './types'
import * as CardPrimitive from './primitives'

function Card({
  appearance,
  heading,
  link,
  thumbnail,
  meta,
  description,
  productBadges,
  isExternal,
}: CardProps) {
  return (
    <CardPrimitive.Card
      appearance={appearance}
      heading={heading}
      link={link}
      isExternal={isExternal}
    >
      {thumbnail ? (
        <CardPrimitive.Thumbnail src={thumbnail.src} alt={thumbnail.alt} />
      ) : null}
      <CardPrimitive.Content>
        {meta && meta.length > 0 ? <CardPrimitive.Meta items={meta} /> : null}
        <CardPrimitive.Heading>{heading}</CardPrimitive.Heading>
        {description ? (
          <CardPrimitive.Description>{description}</CardPrimitive.Description>
        ) : null}
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

export default Card
