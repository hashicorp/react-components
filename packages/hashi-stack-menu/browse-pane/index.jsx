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

const DEFAULT_MENU_DATA = {
  product: [
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
  platform: [
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
}
