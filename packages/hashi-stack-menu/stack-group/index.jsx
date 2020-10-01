import styles from './stack-group.module.css'
import StackItem from '../stack-item'

export default function StackGroup({ heading, items }) {
  return (
    <li className={styles.stackGroup}>
      <h5 className={`g-type-display-6 ${styles.stackGroupHeading}`}>
        {heading}
      </h5>
      <ul className={styles.stackGroupLinkList}>
        {items.map((item) => (
          <StackItem key={JSON.stringify(item)} item={item} />
        ))}
      </ul>
    </li>
  )
}
