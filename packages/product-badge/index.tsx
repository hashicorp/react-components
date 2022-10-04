import { ProductBadgeProps } from './types'
import useProductMeta from '@hashicorp/platform-product-meta'
import classNames from 'classnames'
import s from './style.module.css'

const ProductBadge = ({
  appearance = 'light',
  productName,
  variant = 'primary',
  hasDot = false,
}: ProductBadgeProps) => {
  const { themeClass } = useProductMeta(productName)
  return (
    <div
      className={classNames([
        s.root,
        s[appearance],
        s[variant],
        themeClass,
        { [(s.secondary, s.hasDot)]: hasDot },
      ])}
    >
      <p
        className={classNames([
          s.text,
          s[appearance],
          s[variant],
          { [(s.secondary, s.hasDot)]: hasDot },
        ])}
      >
        {productName}
      </p>
    </div>
  )
}

export default ProductBadge
