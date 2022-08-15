import type { Products } from '@hashicorp/platform-product-meta'

export interface CardProps {
  children: string
  featured?: boolean
  appearance: 'light' | 'dark'
  heading: string
  description?: string
  cta: {
    text?: string
    url: string
  }
}

export interface ThumbnailProps {
  url: string
}

export interface BadgesProps {
  badges: Array<{
    label: string
    product: Products
  }>
}

export interface MetaProps {
  meta: {
    date?: string
    category?: string
  }
}
