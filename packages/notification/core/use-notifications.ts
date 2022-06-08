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
    const timeouts = notifications.map((t) => {
      if (t.duration === Infinity) {
        return
      }

      const durationLeft =
        (t.duration || 0) + t.pauseDuration - (now - t.createdAt)

      if (durationLeft < 0) {
        if (t.visible) {
          notification.dismiss(t.id)
        }
        return
      }
      return setTimeout(() => notification.dismiss(t.id), durationLeft)
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
