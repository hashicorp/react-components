import styles from './browse-panel.module.css'

export default function BrowsePanel({ isOpen, children }) {
  return (
    <section className={`${styles.browsePanel} ${isOpen ? styles.isOpen : ''}`}>
      {children}
    </section>
  )
}
