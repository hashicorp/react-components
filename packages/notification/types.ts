import type { Products } from '@hashicorp/platform-product-meta'

export type NotificationLanguages = 'en' | 'de' | 'fr' | 'jp' | 'kr'
export type NotificationProducts = Exclude<Products, 'hashicorp'>
export type NotificationTypes = 'podcast' | 'webinar' | 'whitepaper'

export interface NotificationProps {
  appearance?: 'light' | 'dark'
  language?: NotificationLanguages
  type?: NotificationTypes
  thumbnail?: {
    src: string
    alt: string
  }
  product?: NotificationProducts
  description: string
  onDismiss: () => void
}
