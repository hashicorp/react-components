import type { ProductBadgeProps } from './types'
import useProductMeta from '@hashicorp/platform-product-meta'
import classNames from 'classnames'
import s from './style.module.css'

const ProductBadge = ({
  appearance = 'light',
  productName,
  theme = 'primary',
}: ProductBadgeProps) => {
  const { themeClass } = useProductMeta(productName)
  return (
    <div className={classNames([s.root, s[appearance], s[theme], themeClass])}>
      <p className={classNames([s.text, s[appearance], s[theme]])}>
        {productName}
      </p>
    </div>
  )
}

export default ProductBadge
