import styles from './stack-menu-section.module.css'
import StackItem from '../stack-item'

export default function StackMenuSection({ groups }) {
  return (
    <menu className={styles.stackSection}>
      {groups.map((g) => (
        <StackGroup key={g.title} heading={g.title} items={g.items} />
      ))}
    </menu>
  )
}

export function StackGroup({ heading, items }) {
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
