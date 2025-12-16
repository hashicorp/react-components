/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import {
  Renderable,
  Notification,
  NotificationOptions,
  NotificationType,
  ValueOrFunction,
} from '../types'
import { genId } from './utils'
import { dispatch, ActionType } from './store'

type Message = ValueOrFunction<Renderable, Notification>

type NotificationHandler = (
  message: Message,
  options?: NotificationOptions
) => string

const createNotification = (
  message: Message,
  type: NotificationType = 'toast',
  options
): Notification => ({
  createdAt: Date.now(),
  visible: true,
  type,
  message,
  pauseDuration: 0,
  ...options,
  id: options?.id || `notification-${genId()}`,
})

const createHandler =
  (type?: NotificationType): NotificationHandler =>
  (message, options) => {
    const notification = createNotification(message, type, options)
    dispatch({ type: ActionType.UPSERT_NOTIFICATION, notification })
    return notification.id
  }

const notification = (message: Message, options?: NotificationOptions) => {
  createHandler('toast')(message, options)
}

notification.dismiss = (notificationId?: string) => {
  dispatch({
    type: ActionType.DISMISS_NOTIFICATION,
    notificationId,
  })
}

notification.remove = (notificationId?: string) =>
  dispatch({ type: ActionType.REMOVE_NOTIFICATION, notificationId })

notification.toast = createHandler('toast')
notification.dialog = createHandler('dialog')

export { notification }
