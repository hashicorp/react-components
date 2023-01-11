import useProductMeta from '@hashicorp/platform-product-meta'
import classNames from 'classnames'
import s from './style.module.css'

export default function Badge() {
  const variant = 'secondary'
  const theme = 'neutral'
  const page = 'action'
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
      Badge
    </span>
  )
}
