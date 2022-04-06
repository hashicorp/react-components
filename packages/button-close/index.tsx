import classNames from 'classnames'
import { IconX16 } from '@hashicorp/flight-icons/svg-react/x-16'
import type { ButtonCloseProps } from './types'
import s from './style.module.css'

export default function ButtonClose({
  className,
  variant = 'light',
  onClick,
  disabled,
}: ButtonCloseProps) {
  return (
    <button
      onClick={onClick}
      className={classNames(s.buttonClose, s[variant], className)}
      disabled={disabled}
    >
      <IconX16 />
    </button>
  )
}
