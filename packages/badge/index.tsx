import classNames from 'classnames'
import { BadgeProps } from './types'
import useProductMeta from '@hashicorp/platform-product-meta'
import s from './style.module.css'

const Badge = ({
  text,
  variant = 'primary',
  theme = 'vagrant',
  page = 'light',
}: BadgeProps) => {
  const products = [
    'boundary',
    'consul',
    'nomad',
    'packer',
    'terraform',
    'vault',
    'vagrant',
    'waypoint',
  ]
  const isProductTheme = products.includes(theme)
  const productName = isProductTheme ? theme : 'hashicorp'
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - The ternary above ensures that `useProductMeta` always gets
  // the appropriate value but this does not seem to appease the the TS gods
  const { themeClass: productThemeClass } = useProductMeta(productName)

  const themeClass = isProductTheme
    ? `${productThemeClass} ${s.theme_product}`
    : s[`theme_${theme}`]

  return (
    <span
      className={classNames([
        s.root,
        s[variant],
        themeClass,
        s[`page_${page}`],
      ])}
    >
      {text}
    </span>
  )
}

export default Badge
