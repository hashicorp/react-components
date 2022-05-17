import * as React from 'react'
import classNames from 'classnames'
import type { NotificationWithActionsProps } from '../types'
import Button from '@hashicorp/react-button'
import CloseButton from '@hashicorp/react-close-button'
import s from '../style.module.css'

export default function Notification({
  appearance = 'light',
  heading,
  description,
  actions,
  onDismiss,
}: NotificationWithActionsProps) {
  return (
    <div
      className={classNames(s.notification, s[appearance])}
      data-testid="notification"
    >
      {onDismiss ? (
        <CloseButton
          appearance={appearance}
          onClick={onDismiss}
          ariaLabel="Dimiss notification"
          className={s.closeButton}
        />
      ) : null}
      <div className={s.content}>
        <h2 className={s.heading}>{heading}</h2>
        <p className={s.description}>{description}</p>
        <div className={s.actions}>
          {actions.map((action, index) => {
            return (
              <Button
                key={index}
                title={action.title}
                onClick={action.onClick}
                size="small"
                theme={{
                  variant: index === 0 ? 'primary' : 'tertiary-neutral',
                  background: appearance,
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
