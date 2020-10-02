import styles from './hashi-stack-menu.module.css'
import { useEffect, useState } from 'react'
import Logo from './assets/logo'
import NavItem from './nav-item'
import slugify from 'slugify'

export default function HashiStackMenu({ Link, items, onPanelChange }) {
  const [activePanelKey, setActivePanelKey] = useState('')
  const isActive = (a) => activePanelKey === a

  useEffect(() => {
    if (onPanelChange) {
      onPanelChange(activePanelKey)
    }
  }, [activePanelKey])

  return (
    <header className={styles.hashiStackMenu}>
      <nav className={styles.nav}>
        {Link ? (
          <Link href="/">
            <a className={styles.logoLink}>
              <Logo />
            </a>
          </Link>
        ) : (
          <a className={styles.logoLink}>
            <Logo />
          </a>
        )}
        <NavMenu>
          {items?.map((item) => (
            <NavItem
              key={slugifyToKey(item.title)}
              item={item}
              panelOpen={isActive(slugifyToKey(item.title)) || false}
              onPanelOpen={() => setActivePanelKey(slugifyToKey(item.title))}
              onPanelClose={() => setActivePanelKey('')}
            />
          ))}
        </NavMenu>
      </nav>
    </header>
  )
}

function slugifyToKey(title) {
  return slugify(title, { lower: true })
}

function NavMenu({ children }) {
  return <menu className={styles.menu}>{children}</menu>
}
