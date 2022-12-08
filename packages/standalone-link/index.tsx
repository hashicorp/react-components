import * as React from 'react'
import type { StandaloneLinkProps } from './types'
import Link from 'next/link'
import classNames from 'classnames'
import ExpandableArrow from '@hashicorp/react-expandable-arrow'
import s from './style.module.css'

export default function StandaloneLink({
  appearance = 'light',
  href,
  children,
  theme = 'primary',
  ...restProps
}: StandaloneLinkProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const { onMouseOver, onMouseOut } = restProps
  return (
    <Link href={href} legacyBehavior>
      <a
        className={classNames(s.root, s[appearance], s[theme])}
        onMouseOver={(event) => {
          setIsHovered(true)
          onMouseOver?.(event)
        }}
        onMouseOut={(event) => {
          setIsHovered(false)
          onMouseOut?.(event)
        }}
        {...restProps}
      >
        <span className={s.label}>{children}</span>
        <span className={s.icon}>
          <ExpandableArrow expanded={isHovered} />
        </span>
      </a>
    </Link>
  )
}
