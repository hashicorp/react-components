import * as React from 'react'
import type { Products } from '@hashicorp/platform-product-meta'

export type NotificationLanguages = 'en' | 'de' | 'fr' | 'jp' | 'kr'
export type NotificationProducts = Exclude<Products, 'hashicorp'>
export type NotificationTypes = 'podcast' | 'webinar' | 'whitepaper'

export interface NotificationProps {
  appearance?: 'light' | 'dark'
  description: string
  onDismiss: () => void
  cta: {
    title: string
    url: string
  }
  children?: React.ReactNode
}

export interface NotificationWithLanguageProps
  extends Exclude<NotificationProps, 'children'> {
  language: NotificationLanguages
}

export interface NotificationWithProductProps
  extends Exclude<NotificationProps, 'children'> {
  product: NotificationProducts
}

export interface NotificationWithResourceProps
  extends Exclude<NotificationProps, 'children'> {
  type: NotificationTypes
}

export interface NotificationWithThumbnailProps
  extends Exclude<NotificationProps, 'children'> {
  thumbnail: {
    src: string
    alt: string
  }
}
