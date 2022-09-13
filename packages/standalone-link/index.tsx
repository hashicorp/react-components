import type { StandaloneLinkProps } from './types'
import Link from 'next/link'
import classNames from 'classnames'
import s from './style.module.css'

export default function StandaloneLink({
  href,
  children,
}: StandaloneLinkProps) {
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  )
}
