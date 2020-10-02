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

export const DEFAULT_PRODUCT_GROUPS = {
  infrastructure: {
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
  networking: {
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
  security: {
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
  applications: {
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
}

export const DEFAULT_MENU_SECTIONS = [
  {
    type: 'product',
    groups: [
      DEFAULT_PRODUCT_GROUPS['infrastructure'],
      DEFAULT_PRODUCT_GROUPS['networking'],
    ],
  },
  {
    type: 'product',
    groups: [
      DEFAULT_PRODUCT_GROUPS['security'],
      DEFAULT_PRODUCT_GROUPS['applications'],
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
