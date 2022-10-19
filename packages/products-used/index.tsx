import type { ProductsUsedProps } from './types'
import classNames from 'classnames'
import s from './style.module.css'

const ProductsUsed = ({
  appearance = 'light',
  products,
}: ProductsUsedProps) => {
  const eyebrowText = 'Products used'

  return (
    <div className={classNames([s.root, s[appearance]])}>
      <p className={classNames([s.eyebrow, s[appearance]])}>{eyebrowText}</p>
      <ul className={s.productList}>
        {products.map((product, index) => {
          const isLink = !!product.href
          const iconStyles = {
            '--icon': `url("https://www.hashicorp.com/img/flight-icons/${product.name}-color-24.svg")`,
          } as React.CSSProperties

          return (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={classNames([
                s.product,
                s.isVerticallyCentered,
                s[appearance],
                { [s.isLink]: isLink },
              ])}
            >
              <ConditionalLink href={product.href}>
                <span
                  aria-label={product.name}
                  role="img"
                  className={s.productIcon}
                  style={iconStyles}
                />
                <span className={classNames([s.productName, s[appearance]])}>
                  {product.name}
                </span>
              </ConditionalLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const ConditionalLink = ({ href, children }) => {
  return href ? (
    <a href={href} className={s.isVerticallyCentered}>
      {children}
    </a>
  ) : (
    children
  )
}

export default ProductsUsed
