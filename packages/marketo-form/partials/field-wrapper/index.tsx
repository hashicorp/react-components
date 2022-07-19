import type { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './style.module.css'

const FieldWrapper = ({
  size,
  children,
}: {
  size?: 'lg'
  children: ReactNode
}) => {
  return (
    <div
      className={clsx('marketo-form-field-wrapper', styles.wrapper, {
        [styles.sizeLg]: size === 'lg',
      })}
    >
      {children}
    </div>
  )
}

export default FieldWrapper
