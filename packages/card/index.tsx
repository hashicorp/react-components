import type { CardProps } from './types'
import classNames from 'classnames'
import s from './style.module.css'

export default function Card({
  children,
  appearance,
  featured,
  thumbnail,
  meta,
  heading,
  description,
  badges,
  cta,
}: CardProps) {
  return (
    <a href={cta.url} className={classNames(s.card, s[appearance])}>
      {children}
    </a>
  )
}
