import styles from './hashi-stack-menu.module.css'
import { useState } from 'react'
import Link from 'next/link'
import Logo from './assets/logo'
import NavItem from './nav-item'

function HashiStackMenu({ items }) {
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

export const DEFAULT_HASHISTACK_DATA = [
  {
    type: 'product',
    groups: [
      {
        title: 'Infrastructure',
        items: [
          {
            product: 'packer',
            url: 'https://www.packer.io',
            iconUrl:
              'https://www.hashicorp.com/img/product-logos/packer-icon-color.svg',
            docsLink: 'https://www.packer.io/docs',
          },
          {
            product: 'terraform',
            url: 'https://www.terraform.io',
            iconUrl:
              'https://www.hashicorp.com/img/product-logos/terraform-icon-color.svg',
            docsLink: 'https://www.terraform.io/docs/index.html',
          },
          {
            product: 'vagrant',
            url: 'https://www.vagrantup.com',
            iconUrl:
              'https://www.hashicorp.com/img/product-logos/vagrant-icon-color.svg',
            docsLink: 'https://www.vagrantup.com/docs',
          },
        ],
      },
      {
        title: 'Networking',
        items: [
          {
            product: 'consul',
            url: 'https://www.consul.io',
            iconUrl:
              'https://www.hashicorp.com/img/product-logos/consul-icon-color.svg',
            docsLink: 'https://www.consul.io/docs',
          },
        ],
      },
    ],
  },
  {
    type: 'product',
    groups: [
      {
        title: 'Security',
        items: [
          {
            product: 'vault',
            url: 'https://www.vaultproject.io',
            iconUrl:
              'https://www.hashicorp.com/img/product-logos/vault-icon-color.svg',
            docsLink: 'https://www.vaultproject.io/docs',
          },
        ],
      },

      {
        title: 'Applications',
        items: [
          {
            product: 'nomad',
            url: 'https://www.nomadproject.io',
            iconUrl:
              'https://www.hashicorp.com/img/product-logos/nomad-icon-color.svg',
            docsLink: 'https://www.nomadproject.io/docs',
          },
        ],
      },
    ],
  },
  {
    type: 'platform',
    groups: [
      {
        title: 'Cloud',
        items: [
          {
            platform: 'HashiCorp Cloud Platform (HCP)',
            url: 'https://cloud.hashicorp.com',
          },
          {
            platform: 'HashiCorp Consul Service on Azure',
            url: 'https://www.hashicorp.com/products/consul/service-on-azure',
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
    sections: DEFAULT_HASHISTACK_DATA,
  },
  { title: 'HashiCorp Cloud Platform (HCP)', linkUrl: '#' },
  { title: 'About HashiCorp', linkUrl: '#' },
]

const H = () => <HashiStackMenu items={items} currentSite={'nomad'} />
export default H
