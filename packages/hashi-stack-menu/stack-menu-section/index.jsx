import styles from './stack-menu-section.module.css'
import StackGroup from '../stack-group'

export default function StackMenuSection({ groups, visiblyNewSection }) {
  return (
    <menu
      className={
        visiblyNewSection
          ? styles.stackMenuSectionPlusDivider
          : styles.stackMenuSection
      }
    >
      {groups.map((g) => (
        <StackGroup key={g.title} heading={g.title} items={g.items} />
      ))}
    </menu>
  )
}
