import styles from './stack-item.module.css'
import { PRODUCT_ICON_OPTIONS } from '../assets/product-icons'

export default function StackItem({ item }) {
  const { product, platform, url, docsLink } = item
  let Icon =
    product && PRODUCT_ICON_OPTIONS.hasOwnProperty(product)
      ? PRODUCT_ICON_OPTIONS[product]
      : null

  if (product)
    return (
      <li className={styles.stackItem}>
        <a href={url} className={styles.itemLink}>
          {Icon && <Icon size={24} title={`${product} by HashiCorp`} />}{' '}
          <span className={`g-type-body-small-strong ${styles.productName}`}>
            {product}
          </span>
        </a>
        <a href={docsLink} className={styles.docsLink}>
          <span>Docs</span>
        </a>
      </li>
    )
  if (platform)
    return (
      <li className={styles.stackItem}>
        <a className={styles.itemLink} href={url}>
          <span className={`g-type-body-small-strong`}>{platform}</span>
        </a>
      </li>
    )
}
