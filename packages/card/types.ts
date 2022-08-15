import type { Products } from '@hashicorp/platform-product-meta'

export interface CardProps {
  children: string
  featured?: boolean
  appearance: 'light' | 'dark'
  meta?: {
    date?: string
    category?: string
  }
  heading: string
  description?: string
  thumbnail?: $TSFixMe
  badges?: Array<{
    label: string
    product: Products
  }>
  cta: {
    text?: string
    url: string
  }
}
