import { ProductBadgeProps } from './types'
import useProductMeta from '@hashicorp/platform-product-meta'
import classNames from 'classnames'
import s from './style.module.css'

const ProductBadge = ({
  appearance = 'light',
  productName,
  variant = 'primary',
}: ProductBadgeProps) => {
  const { themeClass } = useProductMeta(productName)
  return (
    <div
      className={classNames([s.root, s[appearance], s[variant], themeClass])}
    >
      <p className={classNames([s.text, s[appearance], s[variant]])}>
        {productName}
      </p>
    </div>
  )
}

export default ProductBadge
