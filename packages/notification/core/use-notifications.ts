import * as React from 'react'
import { dispatch, ActionType, useStore } from './store'
import { notification } from './notification'

export const useNotifications = () => {
  const { notifications, pausedAt } = useStore()

  React.useEffect(() => {
    if (pausedAt) {
      return
    }

    const now = Date.now()
    const timeouts = notifications.map((n) => {
      if (n.duration === Infinity) {
        return
      }

      const durationLeft =
        (n.duration || 0) + n.pauseDuration - (now - n.createdAt)

      if (durationLeft < 0) {
        if (n.visible) {
          notification.dismiss(n.id)
        }
        return
      }
      return setTimeout(() => notification.dismiss(n.id), durationLeft)
    })

    return () => {
      timeouts.forEach((timeout) => timeout && clearTimeout(timeout))
    }
  }, [notifications, pausedAt])

  const handlers = React.useMemo(
    () => ({
      startPause: () => {
        dispatch({
          type: ActionType.START_PAUSE,
          time: Date.now(),
        })
      },
      endPause: () => {
        if (pausedAt) {
          dispatch({ type: ActionType.END_PAUSE, time: Date.now() })
        }
      },
    }),
    [pausedAt]
  )

  return {
    notifications,
    handlers,
  }
}
