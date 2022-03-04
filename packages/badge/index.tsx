import type { Products } from '@hashicorp/platform-product-meta'
import productStyles from '@hashicorp/platform-product-meta/style.module.css'
import classNames from 'classnames'
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
  let themeClass
  const productClass = productStyles[theme]
  if (productClass) {
    themeClass = classNames(s.product, productClass)
  } else {
    themeClass = s[theme]
  }
  return (
    <span className={classNames(s.badge, themeClass, s[variant])}>
      {children}
    </span>
  )
}