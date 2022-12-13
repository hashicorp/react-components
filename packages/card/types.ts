import type { ProductBadgeProps } from '@hashicorp/react-product-badge/types'
import React from 'react'
import type { BlogCardProps } from './blog-card'
import type { CareerCardProps } from './career-card'
import type { CustomerStoryCardProps } from './customer-story-card'
import type { EventCardProps } from './event-card'
import type { NewsroomCardProps } from './newsroom-card'
import type { PartnerCardProps } from './partner-card'
import type { PersonCardProps } from './person-card'
import type { ResourceCardProps } from './resource-card'

export interface BaseCardProps {
  appearance?: 'light' | 'dark'
  withArrow?: boolean
  heading: string
  link: string
}

export interface CardPrimitiveProps extends BaseCardProps {
  children: React.ReactNode
}

export interface ThumbnailProps {
  src: string
  alt: string
}

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

export interface CardProps extends BaseCardProps {
  thumbnail?: ThumbnailProps
  meta?: MetaProps['items']
  description?: DescriptionProps['children']
  productBadges?: ProductBadgesProps['badges']
}

export {
  BlogCardProps,
  CareerCardProps,
  CustomerStoryCardProps,
  EventCardProps,
  NewsroomCardProps,
  PartnerCardProps,
  PersonCardProps,
  ResourceCardProps,
}
