import { ImageProps } from 'next/image'

export interface CardProps {
  children: string
  featured?: boolean
  appearance: 'light' | 'dark'
  heading: string
  description?: string
  cta: {
    title?: string
    url: string
  }
}

export interface ThumbnailProps {
  image: ImageProps
  url: string
}

export interface MetaProps {
  date?: string
  category?: string
}

export interface ContentProps {
  heading: string
  description?: string
}
