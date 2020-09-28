import styles from './hashi-stack-menu.module.css'
import Link from 'next/link'
import Logo from './assets/logo'
import NavItem from './nav-item'
import { useState } from 'react'

export default function HashiStackMenu({ constrainWidth, children }) {
  const [activeNavItem, setActiveNavItem] = useState('')
  const isActiveNavItem = (key) => activeNavItem === NAV_ITEM_TITLES[key]
  return (
    <header
      className={`${styles.hashiStackMenu} ${
        constrainWidth ? `g-grid-container` : ''
      }`}
    >
      <nav className={styles.nav}>
        <Link href="/">
          <a className={styles.logoLink}>
            <Logo />
          </a>
        </Link>
        <NavItem
          title={NAV_ITEM_TITLES['a']}
          handleActivate={() =>
            isActiveNavItem('a')
              ? setActiveNavItem('')
              : setActiveNavItem(NAV_ITEM_TITLES['a'])
          }
          active={isActiveNavItem('a')}
        />
        <NavItem title={NAV_ITEM_TITLES['b']} linkUrl={''} />
        <NavItem title={NAV_ITEM_TITLES['c']} linkUrl={''} />
      </nav>
    </header>
  )
}

const NAV_ITEM_TITLES = {
  a: 'Browse Products',
  b: 'HashiCorp Cloud Platform (HCP)',
  c: 'About HashiCorp',
}
