import { ImageProps } from 'next/image'
import type { ProductBadgeProps } from '@hashicorp/react-product-badge/types'
import React from 'react'

interface BaseCardProps {
  appearance?: 'light' | 'dark'
  heading: string
  link: string
  withArrow?: boolean
}

interface CardWithChildren extends BaseCardProps {
  meta?: never
  productBadges?: never
  description?: never
  thumbnail?: never
  children: React.ReactNode
}

interface CardWithProps extends BaseCardProps {
  children?: never
  thumbnail?: ThumbnailProps
  meta?: MetaProps['items']
  productBadges?: Array<ProductBadgeProps['productName']>
  description?: DescriptionProps['children']
}

export type CardProps = CardWithChildren | CardWithProps

export type ThumbnailProps = ImageProps

export interface MetaProps {
  items: Array<string | React.ReactNode>
}

export interface ContentProps {
  children: React.ReactNode
}

export interface HeadingProps {
  as?: 'h2' | 'h3' | 'h4'
  children: string
}

export interface ProductBadgesProps {
  badges: Array<ProductBadgeProps['productName']>
  appearance?: 'light' | 'dark'
}

export interface DescriptionProps {
  children: string
}
