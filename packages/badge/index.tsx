import useProductMeta from '@hashicorp/platform-product-meta'
import classNames from 'classnames'
import s from './style.module.css'

export default function Badge() {
  const variant = 'secondary'
  const theme = 'boundary'
  const page = 'strongFaint'
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
  const productName = products.includes(theme) ? theme : 'hashicorp'
  const { themeClass: productThemeClass } = useProductMeta(productName)
  const themeClass = products.includes(theme)
    ? productThemeClass
    : s[`theme_${theme}`]

  return (
    <span
      className={classNames([
        s.root,
        s[variant],
        s[`theme_${theme}`],
        s[`page_${page}`],
      ])}
    >
      Badge
    </span>
  )
}
