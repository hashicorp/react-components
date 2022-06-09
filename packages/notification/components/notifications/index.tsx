import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { renderNotification } from '../../core/utils'
import { useNotifications } from '../../core/use-notifications'
import s from './style.module.css'

export const Notifications = () => {
  const { notifications, handlers } = useNotifications()
  return (
    <div
      className={s.root}
      onMouseEnter={handlers.startPause}
      onMouseLeave={handlers.endPause}
    >
      <AnimatePresence initial={false}>
        {notifications.map((n, i) => {
          return (
            <motion.div
              key={n.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.75,
                transition: { duration: 0.2 },
              }}
            >
              {renderNotification(n.message, n)}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
