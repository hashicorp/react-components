import type { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './style.module.css'

const FieldWrapper = ({
  size,
  children,
  fieldId,
}: {
  size?: 'lg'
  children: ReactNode
  fieldId: string
}) => {
  return (
    <div
      className={clsx('marketo-form-field-wrapper', styles.wrapper, {
        [styles.sizeLg]: size === 'lg',
      })}
      data-field-id={fieldId}
    >
      {children}
    </div>
  )
}

export default FieldWrapper
