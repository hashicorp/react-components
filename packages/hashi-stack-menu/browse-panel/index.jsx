import styles from './browse-panel.module.css'

export default function BrowsePanel({ isOpen, children }) {
  return (
    <section className={`${styles.browsePanel} ${isOpen ? styles.isOpen : ''}`}>
      {children}
    </section>
  )
}

// ToDo: a11y
// function VisualHiddenSpan({ children }) {
//   return <span className={styles.visuallyHidden}>{children}</span>
// }
