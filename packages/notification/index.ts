/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
'use client'

import { notification } from './core/notification'
import { useNotifications } from './core/use-notifications'
import { useStore as useNotificationStore } from './core/store'

import { Notifications } from './components/notifications'
import Notification from './components/notification'
import NotificationWithLanguage from './components/notification-with-language'
import NotificationWithProduct from './components/notification-with-product'
import NotificationWithResource from './components/notification-with-resource'
import NotificationWithThumbnail from './components/notification-with-thumbnail'
import NotificationWithActions from './components/notification-with-actions'

export default notification
export {
  notification,
  useNotifications,
  useNotificationStore,
  Notifications,
  Notification,
  NotificationWithLanguage,
  NotificationWithProduct,
  NotificationWithResource,
  NotificationWithThumbnail,
  NotificationWithActions,
}
