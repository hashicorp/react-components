/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import React from 'react'
import * as Popover from '@radix-ui/react-popover'
import InlineSvg from '@hashicorp/react-inline-svg'
import classNames from 'classnames'
import svgX from '../../icons/x.svg?include'
import s from './style.module.css'

interface PopoverTooltipProps {
  /** Elements to render in the content area of the popover. */
  children: React.ReactNode
  /** Color scheme appearance of the component. Works best in contexts with a matching theme. */
  theme?: 'light' | 'dark'
}

function PopoverTooltip({ children, theme = 'light' }: PopoverTooltipProps) {
  return (
    <Popover.Portal>
      <Popover.Content className={classNames(s.popover, s[theme])}>
        {children}
        <Popover.Close className={s.dialogClose} aria-label="Close">
          <InlineSvg src={svgX} aria-hidden />
        </Popover.Close>
        <Popover.Arrow className={s.dialogArrow}></Popover.Arrow>
      </Popover.Content>
    </Popover.Portal>
  )
}

export default PopoverTooltip
