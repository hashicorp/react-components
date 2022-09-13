/* eslint-disable jsx-a11y/anchor-is-valid */
import type { StandaloneLinkProps } from './types'
import Link from 'next/link'
import classNames from 'classnames'
import s from './style.module.css'

type Noop = () => void
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop: Noop = () => {}

export default function StandaloneLink({
  appearance = 'light',
  href,
  children,
  variant = 'primary',
  onClick = noop,
}: StandaloneLinkProps) {
  return (
    <Link href={href}>
      <a
        className={classNames(s.root, s[appearance], s[variant])}
        onClick={onClick}
      >
        <span>{children}</span>
        <span>
          <svg
            className={s.icon}
            width="9"
            height="10"
            viewBox="0 0 9 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            focusable={false}
          >
            <path
              className={s.arrow}
              d="M4 1L8 5L4 9"
              stroke="currentColor"
              strokeWidth={1.8}
            />
            <path
              className={s.line}
              d="M8 5H0"
              stroke="currentColor"
              strokeWidth={1.8}
            />
          </svg>
        </span>
      </a>
    </Link>
  )
}
