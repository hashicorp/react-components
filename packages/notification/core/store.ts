/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
'use client'

import * as React from 'react'
import { Notification } from '../types'

export enum ActionType {
  ADD_NOTIFICATION,
  UPDATE_NOTIFICATION,
  UPSERT_NOTIFICATION,
  DISMISS_NOTIFICATION,
  REMOVE_NOTIFICATION,
  START_PAUSE,
  END_PAUSE,
}

type Action =
  | {
      type: ActionType.ADD_NOTIFICATION
      notification: Notification
    }
  | {
      type: ActionType.UPSERT_NOTIFICATION
      notification: Notification
    }
  | {
      type: ActionType.UPDATE_NOTIFICATION
      notification: Partial<Notification>
    }
  | {
      type: ActionType.DISMISS_NOTIFICATION
      notificationId?: string
    }
  | {
      type: ActionType.REMOVE_NOTIFICATION
      notificationId?: string
    }
  | {
      type: ActionType.START_PAUSE
      time: number
    }
  | {
      type: ActionType.END_PAUSE
      time: number
    }

interface State {
  notifications: Notification[]
  pausedAt: number | undefined
}

const notificationTimeouts = new Map<
  Notification['id'],
  ReturnType<typeof setTimeout>
>()

const addToRemoveQueue = (notificationId: string) => {
  if (notificationTimeouts.has(notificationId)) {
    return
  }

  const timeout = setTimeout(() => {
    notificationTimeouts.delete(notificationId)
    dispatch({
      type: ActionType.REMOVE_NOTIFICATION,
      notificationId,
    })
  }, 1000)

  notificationTimeouts.set(notificationId, timeout)
}

const clearFromRemoveQueue = (notificationId: string) => {
  const timeout = notificationTimeouts.get(notificationId)
  if (timeout) {
    clearTimeout(timeout)
  }
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ADD_NOTIFICATION: {
      return {
        ...state,
        notifications: [action.notification, ...state.notifications],
      }
    }
    case ActionType.UPDATE_NOTIFICATION: {
      if (action.notification.id) {
        clearFromRemoveQueue(action.notification.id)
      }
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.notification.id ? { ...n, ...action.notification } : n
        ),
      }
    }
    case ActionType.UPSERT_NOTIFICATION: {
      const { notification } = action
      return state.notifications.find((n) => n.id === notification.id)
        ? reducer(state, { type: ActionType.UPDATE_NOTIFICATION, notification })
        : reducer(state, { type: ActionType.ADD_NOTIFICATION, notification })
    }
    case ActionType.DISMISS_NOTIFICATION: {
      const { notificationId } = action
      if (notificationId) {
        addToRemoveQueue(notificationId)
      } else {
        state.notifications.forEach((n) => {
          addToRemoveQueue(n.id)
        })
      }

      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === notificationId || notificationId === undefined
            ? {
                ...n,
                visible: false,
              }
            : n
        ),
      }
    }
    case ActionType.REMOVE_NOTIFICATION: {
      if (action.notificationId === undefined) {
        return {
          ...state,
          notifications: [],
        }
      }
      return {
        ...state,
        notifications: state.notifications.filter(
          (n) => n.id !== action.notificationId
        ),
      }
    }
    case ActionType.START_PAUSE: {
      return {
        ...state,
        pausedAt: action.time,
      }
    }
    case ActionType.END_PAUSE: {
      const diff = action.time - (state.pausedAt || 0)
      return {
        ...state,
        pausedAt: undefined,
        notifications: state.notifications.map((t) => ({
          ...t,
          pauseDuration: t.pauseDuration + diff,
        })),
      }
    }
  }
}

const listeners: Array<(state) => void> = []

let memoryState: State = { notifications: [], pausedAt: undefined }

export const dispatch = (action: Action) => {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

export const useStore = () => {
  const [state, setState] = React.useState<State>(memoryState)
  // handle subscribing to state updates, immediately update state to ensure what's stored in the useState hook
  // above is fresh
  React.useEffect(() => {
    listeners.push(setState)
    setState(memoryState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  const mergedNotifications = state.notifications.map((n) => ({
    ...n,
    duration: n.duration || 6000,
  }))

  return {
    ...state,
    notifications: mergedNotifications,
  }
}
