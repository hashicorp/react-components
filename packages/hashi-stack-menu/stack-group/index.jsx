import styles from './stack-group.module.css'
import StackItem from '../stack-item'

export default function StackGroup({ heading, items }) {
  return (
    <li className={styles.stackGroup}>
      <h5 className={styles.stackGroupHeading}>{heading}</h5>
      <ul className={styles.stackGroupLinkList}>
        {items.map((item, stableIdx) => (
          // eslint-disable-next-line react/no-array-index-key
          <StackItem key={stableIdx} item={item} />
        ))}
      </ul>
    </li>
  )
}
