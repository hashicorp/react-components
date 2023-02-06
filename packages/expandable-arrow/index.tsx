/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import classNames from 'classnames'
import s from './style.module.css'

interface ExpandableArrowProps {
  className?: string
  expanded?: boolean
}

export default function ExpandableArrow({
  className,
  expanded = false,
}: ExpandableArrowProps) {
  return (
    <svg
      className={classNames(s.root, expanded && s.expanded, className)}
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable={false}
      data-testid="expandable-arrow"
    >
      <path
        d="M7.25 1L11.25 5L7.25 9"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        className={s.line}
        d="M10 5H0"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}
