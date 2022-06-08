import {
  Renderable,
  Notification,
  NotificationOptions,
  ValueOrFunction,
} from './types'
import { genId } from './utils'
import { dispatch, ActionType } from './store'

type Message = ValueOrFunction<Renderable, Notification>

type NotificationHandler = (
  message: Message,
  options?: NotificationOptions
) => string

const createNotification = (message: Message, options): Notification => ({
  createdAt: Date.now(),
  visible: true,
  message,
  pauseDuration: 0,
  ...options,
  id: options?.id || `notification-${genId()}`,
})

const createHandler = (): NotificationHandler => (message, options) => {
  const notification = createNotification(message, options)
  dispatch({ type: ActionType.UPSERT_NOTIFICATION, notification })
  return notification.id
}

const notification = (message: Message, options?: NotificationOptions) => {
  createHandler()(message, options)
}

notification.dismiss = (notificationId?: string) => {
  dispatch({
    type: ActionType.DISMISS_NOTIFICATION,
    notificationId,
  })
}

notification.remove = (notificationId?: string) =>
  dispatch({ type: ActionType.REMOVE_NOTIFICATION, notificationId })

export { notification }
