import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { renderNotification } from '../../core/utils'
import { useNotifications } from '../../core/use-notifications'
import s from './style.module.css'

interface HTMLDialogElement extends HTMLElement {
  open: boolean
  returnValue: string
  close(returnValue?: string): void
  show(): void
  showModal(): void
}

const Dialog = ({ children }) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null)

  React.useEffect(() => {
    const dialog = dialogRef.current
    // Opens the dialog on mount
    dialog?.show()
    // Closes the dialog on unmount (if not already closed)
    return () => {
      dialog?.close()
    }
  }, [])

  return (
    <dialog ref={dialogRef} aria-modal={false} style={{ all: 'unset' }}>
      {children}
    </dialog>
  )
}

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
              {n.type === 'toast' ? (
                <div role="status" aria-live="polite">
                  {renderNotification(n.message, n)}
                </div>
              ) : (
                <Dialog>{renderNotification(n.message, n)}</Dialog>
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
