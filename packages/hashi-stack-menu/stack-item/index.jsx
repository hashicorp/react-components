import styles from './stack-item.module.css'

export default function StackItem({ item }) {
  const { product, platform, url, docsLink } = item
  if (product)
    return (
      <li className={styles.stackItem}>
        <a href={url} className={styles.itemLink}>
          {product}
        </a>
        |
        <a href={docsLink} className={styles.docsLink}>
          Docs
        </a>
      </li>
    )
  if (platform)
    return (
      <li className={styles.stackItem}>
        <a className={styles.itemLink} href={docsLink}>
          {platform}
        </a>
      </li>
    )
}
