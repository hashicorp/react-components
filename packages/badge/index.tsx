import { Products } from '@hashicorp/platform-product-meta'
import classnames from 'classnames'
import s from './style.module.css'

interface BadgeProps {
  children: string
  theme?: Products | 'neutral' | 'white' | 'black'
  variant?: 'primary' | 'secondary'
}

export default function Badge({
  children,
  variant = 'primary',
  theme = 'neutral',
}: BadgeProps) {
  return (
    <span className={classnames(s.badge, s[theme], s[variant])}>
      {children}
    </span>
  )
}
