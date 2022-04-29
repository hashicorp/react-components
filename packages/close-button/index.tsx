import classNames from 'classnames'
import { IconX16 } from '@hashicorp/flight-icons/svg-react/x-16'
import type { CloseButtonProps } from './types'
import s from './style.module.css'

export default function CloseButton({
  className,
  appearance = 'light',
  onClick,
  disabled,
  ariaLabel,
}: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className={classNames(s.closeButton, s[appearance], className)}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <IconX16 />
    </button>
  )
}
