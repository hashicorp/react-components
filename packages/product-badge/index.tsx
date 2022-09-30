import { ProductBadgeProps } from './types'
import classNames from 'classnames'
import s from './style.module.css'

const ProductBadge = ({
  appearance = 'light',
  productName = 'boundary',
  hasDot,
  variant,
}: ProductBadgeProps) => {
  return (
    <div className={classNames([s.root, s[appearance]])}>
      <p className={s.text}>{productName}</p>
    </div>
  )
}

export default ProductBadge
