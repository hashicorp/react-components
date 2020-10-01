import styles from './stack-item.module.css'

export default function StackItem({ item }) {
  const { product, platform, url, docsLink, iconUrl, badge } = item

  if (product)
    return (
      <li className={styles.stackItem}>
        <a href={url} className={styles.itemLink}>
          {iconUrl && (
            <img
              src={iconUrl}
              className={styles.productIcon}
              alt={`${product} by HashiCorp`}
            />
          )}
          <span className={`g-type-body-small-strong ${styles.productName}`}>
            {product}
          </span>
        </a>
        <a href={docsLink} className={styles.docsLink}>
          <span>Docs</span>
          {badge && <span className={styles.badge}>{badge}</span>}
        </a>
      </li>
    )
  if (platform)
    return (
      <li className={styles.stackItem}>
        <a className={styles.itemLink} href={url}>
          <span className={`g-type-body-small-strong`}>{platform}</span>
          {badge && <span className={styles.badge}>{badge}</span>}
        </a>
      </li>
    )
}
