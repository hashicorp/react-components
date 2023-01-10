import useProductMeta from '@hashicorp/platform-product-meta'
import classNames from 'classnames'
import s from './style.module.css'

export default function Badge() {
  const page = 'strongFaint'
  const theme = 'action'
  const variant = 'secondary'
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
    : s[`theme${theme}`]
  return (
    <span
      className={classNames([s.root, s[variant], themeClass, s[`page${page}`]])}
    >
      im a badge
    </span>
  )
}
