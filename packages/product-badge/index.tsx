import type { ProductBadgeProps } from './types'
import useProductMeta from '@hashicorp/platform-product-meta'
import classNames from 'classnames'
import s from './style.module.css'

const ProductBadge = ({
  appearance = 'light',
  productName,
  theme = 'primary',
  hasDot,
}: ProductBadgeProps) => {
  const { themeClass } = useProductMeta(productName)
  return (
    <div
      className={classNames([
        s.root,
        s[appearance],
        s[theme],
        themeClass,
        { [(s.secondary, s.hasDot)]: hasDot },
      ])}
    >
      <p
        className={classNames([
          s.text,
          s[appearance],
          s[theme],
          { [(s.secondary, s.hasDot)]: hasDot },
        ])}
      >
        {productName}
      </p>
    </div>
  )
}

export default ProductBadge
