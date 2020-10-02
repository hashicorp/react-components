import styles from './hashi-stack-menu.module.css'
import { useState } from 'react'
import Link from 'next/link'
import Logo from './assets/logo'
import NavItem from './nav-item'

export default function HashiStackMenu({ items }) {
  const [activePanelKey, setActivePanelKey] = useState('')
  const isActive = (a) => activePanelKey === a

  return (
    <header className={styles.hashiStackMenu}>
      <nav className={styles.nav}>
        <Link href="/">
          <a className={styles.logoLink}>
            <Logo />
          </a>
        </Link>
        <NavMenu>
          {items?.map((item, idx) => (
            <NavItem
              key={`${item.title}-${idx}`}
              item={item}
              panelOpen={isActive(item.title) || false}
              onPanelOpen={() => setActivePanelKey(item.title)}
              onPanelClose={() => setActivePanelKey('')}
            />
          ))}
        </NavMenu>
      </nav>
    </header>
  )
}

function NavMenu({ children }) {
  return <menu className={styles.menu}>{children}</menu>
}
