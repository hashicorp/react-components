import styles from './stack-item.module.css'

export default function StackItem({ item }) {
  const { product, platform, url, iconUrl, badge } = item

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
          <span className={styles.productName}>{product}</span>
          {badge && <span className={getBadgeClassName(badge)}>{badge}</span>}
        </a>
      </li>
    )
  if (platform)
    return (
      <li className={styles.stackItem}>
        <a className={styles.itemLink} href={url}>
          <span className={styles.itemName}>{platform}</span>
          {badge && <span className={getBadgeClassName(badge)}>{badge}</span>}
        </a>
      </li>
    )
}

// This will need to be adjusted if we ever need more specific badge styles but for now it achieves the expected design
function getBadgeClassName(badgeText) {
  return badgeText.toLowerCase().includes('new')
    ? styles.badgeTypeNew
    : styles.badge
}
