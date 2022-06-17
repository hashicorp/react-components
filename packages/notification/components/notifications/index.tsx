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
        {notifications.map((n, i) => {
          return (
            <m.div
              key={n.id}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: reducedMotion ? 1 : 0.75,
                transition: { duration: 0.2 },
              }}
            >
              {renderNotification(n.message, n)}
            </m.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
