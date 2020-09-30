import styles from './hashi-stack-menu.module.css'
import { useState } from 'react'
import Link from 'next/link'
import Logo from './assets/logo'
import NavItem from './nav-item'

const H = () => <HashiStackMenu items={items} />

function HashiStackMenu({ items }) {
  const [activeNavKey, setActiveNavKey] = useState('')
  // console.log(activeNavKey)

  const isActive = (a) => activeNavKey === a
  function handleSet(a) {
    setActiveNavKey(a)
  }
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
              paneOpen={isActive(item.title)}
              onPaneOpen={() => handleSet(item.title)}
              onPaneClose={() => setActiveNavKey('')}
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

const PRODUCT_BROWSE_PANE_DATA = [
  {
    groups: [
      {
        title: 'Infrastructure',
        items: [
          {
            product: 'packer',
            url: 'https://www.packer.io',
            docsLink: 'https://www.packer.io/docs',
          },
          {
            product: 'terraform',
            url: 'https://www.terraform.io',
            docsLink: 'https://www.terraform.io/docs/index.html',
          },
          {
            product: 'vagrant',
            url: 'https://www.vagrantup.com',
            docsLink: 'https://www.vagrantup.com/docs',
          },
        ],
      },
      {
        title: 'Security',
        items: [
          {
            product: 'vault',
            url: 'https://www.vaultproject.io',
            docsLink: 'https://www.vaultproject.io/docs',
          },
        ],
      },
      {
        title: 'Networking',
        items: [
          {
            product: 'consul',
            url: 'https://www.consul.io/',
            docsLink: 'https://www.consul.io/docs',
          },
        ],
      },
      {
        title: 'Applications',
        items: [
          {
            product: 'nomad',
            url: 'https://www.nomadproject.io',
            docsLink: 'https://www.nomadproject.io/docs',
          },
        ],
      },
    ],
  },
  {
    groups: [
      {
        title: 'Cloud',
        items: [
          {
            platform: 'HashiCorp Cloud Platform (HCP)',
            url: 'https://cloud.hashicorp.com',
          },
          {
            platform: 'Terraform Cloud',
            url: 'https://app.terraform.io',
          },
        ],
      },
      {
        title: 'Policy',
        items: [
          {
            product: 'Sentinel',
            url: 'https://www.hashicorp.com/sentinel',
            docsLink: 'https://docs.hashicorp.com/sentinel',
          },
        ],
      },
    ],
  },
]

const items = [
  {
    title: 'Browse Products',
    sections: PRODUCT_BROWSE_PANE_DATA,
  },
  { title: 'HashiCorp Cloud Platform (HCP)', linkUrl: '#' },
  { title: 'About HashiCorp', linkUrl: '#' },
]

export default H
