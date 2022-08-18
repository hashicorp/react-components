import { ImageProps } from 'next/image'
import React from 'react'

interface BaseCardProps {
  appearance?: 'light' | 'dark'
  heading: string
  link: string
}

interface CardWithChildren extends BaseCardProps {
  meta?: never
  description?: never
  thumbnail?: never
  children: React.ReactNode
}

interface CardWithProps extends BaseCardProps {
  children?: never
  thumbnail?: ThumbnailProps
  meta?: MetaProps['items']
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

export interface DescriptionProps {
  children: string
}
