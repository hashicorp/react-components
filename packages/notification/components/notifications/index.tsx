/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import * as React from 'react'
import type { NotificationsProps } from '@hashicorp/react-notification/types'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import classNames from 'classnames'
import { renderNotification } from '../../core/utils'
import { useNotifications } from '../../core/use-notifications'
import s from './style.module.css'

export const Notifications = ({
  anchor = 'left',
  inset = 24,
  gutter = 16,
}: NotificationsProps) => {
  const { notifications, handlers } = useNotifications()
  const reducedMotion = useReducedMotion()
  return (
    <div
      style={
        {
          '--inset': inset,
          '--gutter': gutter,
        } as React.CSSProperties
      }
      className={classNames(s.root, s[anchor])}
      onMouseEnter={handlers.startPause}
      onMouseLeave={handlers.endPause}
      data-testid="notifications"
    >
      <AnimatePresence initial={false}>
        {notifications.map((n) => {
          /**
           * Define the role attribute based on toast type.
           * toast.dialog() should be used in the case that
           * the notification contians interactive content.
           */
          const role = n.type === 'toast' ? 'alert' : 'alertDialog'
          return (
            <m.div
              key={n.id}
              layout={reducedMotion ? false : 'position'}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: reducedMotion ? 1 : 0.75,
                transition: { duration: 0.2 },
              }}
              role={role}
              aria-live="polite"
            >
              {renderNotification(n.message, n)}
            </m.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
