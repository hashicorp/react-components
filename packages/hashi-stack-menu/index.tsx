import styles from './hashi-stack-menu.module.css'
import { useEffect, useState } from 'react'
import InlineSvg from '@hashicorp/react-inline-svg'
import LogoSvg from '@hashicorp/mktg-logos/corporate/hashicorp/primary/black.svg?include'
import NavItem from './nav-item'
import slugify from 'slugify'
import HASHI_STACK_MENU_ITEMS from './data'

interface HashiStackMenuProps {
  onPanelChange?: (activePanelKey: string) => void
}

export default function HashiStackMenu({ onPanelChange }: HashiStackMenuProps) {
  const [activePanelKey, setActivePanelKey] = useState('')
  const isActive = (a) => activePanelKey === a

  useEffect(() => {
    if (onPanelChange) {
      onPanelChange(activePanelKey)
    }
  }, [onPanelChange, activePanelKey])

  // Redirect to the branding page when someone right-clicks on the
  // HashiCorp logo
  const logoOnContextMenu = (e) => {
    e.preventDefault()
    window.location.href = 'https://www.hashicorp.com/brand'
  }

  return (
    <header className={styles.hashiStackMenu}>
      <nav
        className={styles.nav}
        aria-label="Primary HashiCorp website navigation"
      >
        <a
          aria-label="To main HashiCorp website"
          href="https://www.hashicorp.com/"
          className={styles.logoLink}
          onContextMenu={logoOnContextMenu}
        >
          <Logo />
        </a>
        <NavMenu>
          {HASHI_STACK_MENU_ITEMS?.map((item) => (
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
  return <ul className={styles.menu}>{children}</ul>
}

function Logo() {
  return <InlineSvg src={LogoSvg} />
}
