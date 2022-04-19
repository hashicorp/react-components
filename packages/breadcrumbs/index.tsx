import type { BreadcrumbsProps } from './types'
import s from './style.module.css'

export default function Breadcrumbs({ label }: BreadcrumbsProps) {
  return (
    <nav
      aria-label={label}
      className={s.breadcrumbs}
      data-testid="breadcrumbs"
    ></nav>
  )
}
