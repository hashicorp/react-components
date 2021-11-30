import styles from './stack-group.module.css'
import StackItem from '../stack-item'

export default function StackGroup({ heading, description, items, cta }) {
  return (
    <li className={styles.stackGroup}>
      <h5 className={styles.stackGroupHeading}>{heading}</h5>
      {description && (
        <p className={styles.stackGroupDescription}>{description}</p>
      )}
      <ul className={styles.stackGroupLinkList}>
        {items.map((item, stableIdx) => (
          // eslint-disable-next-line react/no-array-index-key
          <StackItem key={stableIdx} item={item} />
        ))}
      </ul>
      {/* // TODO Finish markup for this link */}
      {cta && <a href={cta.url}>{cta.text}</a>}
    </li>
  )
}
