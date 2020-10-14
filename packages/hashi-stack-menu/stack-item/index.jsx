import styles from './stack-item.module.css'
import InlineSvg from '@hashicorp/react-inline-svg'

export default function StackItem({ item }) {
  const { product, platform, url, iconSrc, badge } = item

  if (product)
    return (
      <li className={styles.stackItem}>
        <a href={url} className={styles.itemLink}>
          {iconSrc && (
            <InlineSvg className={styles.productIcon} src={iconSrc} />
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
