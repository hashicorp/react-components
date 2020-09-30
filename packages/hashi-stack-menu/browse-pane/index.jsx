import StackMenuSection from '../stack-menu-section'
import styles from './browse-pane.module.css'

export default function BrowsePane({ isOpen, children }) {
  return (
    <section className={`${styles.browsePane} ${isOpen ? styles.isOpen : ''}`}>
      {children}
    </section>
  )
}

export function ProductBrowsePane({ isOpen }) {
  return (
    <BrowsePane isOpen={isOpen}>
      <StackMenuSection groups={DEFAULT_MENU_DATA.product} />
      <StackMenuSection groups={DEFAULT_MENU_DATA.platform} />
    </BrowsePane>
  )
}

function VisualHiddenSpan({ children }) {
  return <span className={styles.visuallyHidden}> {children} </span>
}
