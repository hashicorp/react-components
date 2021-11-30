import styles from './stack-menu-section.module.css'
import StackGroup from '../stack-group'

export default function StackMenuSection({ groups, visiblyNewSection }) {
  return (
    <menu
      className={
        visiblyNewSection // If this is a `visiblyNewSection`, a divider (as `:before` psuedoelement) + increased padding are added to the left side
          ? styles.stackMenuSectionPlusDivider
          : styles.stackMenuSection
      }
    >
      {groups.map((g) => (
        <StackGroup
          key={g.title}
          heading={g.title}
          description={g.description}
          items={g.items}
          cta={g.cta}
        />
      ))}
    </menu>
  )
}
