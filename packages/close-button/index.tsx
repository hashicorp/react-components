/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import classNames from 'classnames'
import { IconX16 } from '@hashicorp/flight-icons/svg-react/x-16'
import { IconX24 } from '@hashicorp/flight-icons/svg-react/x-24'
import type { CloseButtonProps } from './types'
import s from './style.module.css'

export default function CloseButton({
  className,
  appearance = 'light',
  onClick,
  disabled,
  ariaLabel,
  size = 'medium',
}: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className={classNames(s.closeButton, s[appearance], s[size], className)}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {size === 'medium' ? <IconX16 /> : <IconX24 />}
    </button>
  )
}
