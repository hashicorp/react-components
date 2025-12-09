/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { Products } from '@hashicorp/platform-product-meta'

export type Renderable = JSX.Element | string | null

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue
export type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>
export type NotificationType = 'toast' | 'dialog'

export interface NotificationsProps {
  /**
   * Anchor the notifications to the left or right side of the viewport
   */
  anchor?: 'left' | 'right'
  /**
   * The position in pixels that the notifications should be inset within the viewport
   */
  inset?: number
  /**
   * The space in pixels between each rendered notification
   */
  gutter?: number
}

export interface Notification {
  type: NotificationType
  createdAt: number
  id: string
  message: ValueOrFunction<Renderable, Notification>
  duration?: number
  pauseDuration: number
  visible: boolean
}

export type NotificationOptions = Partial<Pick<Notification, 'id' | 'duration'>>

export type NotificationLanguages =
  | 'en'
  | 'de'
  | 'fr'
  | 'jp'
  | 'kr'
  | 'pt'
  | 'es'
export type NotificationProducts = Exclude<Products, 'hashicorp'>
export type NotificationResources = 'podcast' | 'webinar' | 'whitepaper'

export interface NotificationProps {
  /**
   * Render on light or dark background.
   */
  appearance?: 'light' | 'dark'
  /**
   * The text that appears within the notification.
   */
  description: string
  /**
   * A function called when the close button is clicked.
   */
  onDismiss: () => void
  /**
   * The call to action for the notification.
   */
  cta: {
    title: string
    url: string
    onClick?: () => void
  }
}

export interface NotificationWithLanguageProps extends NotificationProps {
  /**
   * Renders flag associated to language defined.
   */
  language: NotificationLanguages
}

export interface NotificationWithProductProps extends NotificationProps {
  /**
   * Renders product logo and name.
   */
  product: NotificationProducts
}

export interface NotificationWithResourceProps extends NotificationProps {
  /**
   * Renders resource type name and icon.
   */
  type: NotificationResources
}

export interface NotificationWithThumbnailProps extends NotificationProps {
  /**
   * Renders a 4/3 ratio image above the content.
   */
  thumbnail: {
    src: string
    alt: string
  }
}

export interface NotificationWithActionsProps
  extends Pick<NotificationProps, 'appearance' | 'description' | 'onDismiss'> {
  /**
   * The text that introduces the notification.
   */
  heading: string
  /**
   * When true render the close button.
   */
  dismissible?: boolean
  /**
   * The text that appears within the notification.
   */
  actions: Array<{
    title: string
    onClick: () => void
  }>
}
