// The following are building blocks of our default data exported below
export const DEFAULT_PRODUCT_GROUPS = {
  infrastructure: {
    title: 'Infrastructure',
    items: [
      {
        product: 'terraform',
        url: 'https://www.terraform.io',
        iconSrc: require('../assets/product-icons/terraform-icon-color.svg?include'),
      },
      {
        product: 'packer',
        url: 'https://www.packer.io',
        iconSrc: require('../assets/product-icons/packer-icon-color.svg?include'),
      },
      {
        product: 'vagrant',
        url: 'https://www.vagrantup.com',
        iconSrc: require('../assets/product-icons/vagrant-icon-color.svg?include'),
      },
    ],
  },
  networking: {
    title: 'Networking',
    items: [
      {
        product: 'consul',
        url: 'https://www.consul.io',
        iconSrc: require('../assets/product-icons/consul-icon-color.svg?include'),
      },
    ],
  },
  security: {
    title: 'Security',
    items: [
      {
        product: 'vault',
        url: 'https://www.vaultproject.io',
        iconSrc: require('../assets/product-icons/vault-icon-color.svg?include'),
      },
      {
        product: 'boundary',
        url: 'https://www.boundaryproject.io',
        iconSrc: require('../assets/product-icons/boundary-icon-color.svg?include'),
        badge: 'New',
      },
    ],
  },
  applications: {
    title: 'Applications',
    items: [
      {
        product: 'nomad',
        url: 'https://www.nomadproject.io',
        iconSrc: require('../assets/product-icons/nomad-icon-color.svg?include'),
      },
      {
        product: 'waypoint',
        url: 'https://www.waypointproject.io',
        iconSrc: require('../assets/product-icons/waypoint-icon-color.svg?include'),
        badge: 'New',
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
        title: 'HashiCorp Cloud Platform',
        items: [
          {
            product: 'consul',
            url: 'https://www.hashicorp.com/cloud-platform',
            iconSrc: require('../assets/product-icons/consul-icon-color.svg?include'),
            badge: 'Public Beta',
          },
          {
            product: 'terraform',
            url: 'https://app.terraform.io',
            iconSrc: require('../assets/product-icons/terraform-icon-color.svg?include'),
          },
          {
            product: 'vault',
            url: 'https://www.hashicorp.com/cloud-platform',
            iconSrc: require('../assets/product-icons/vault-icon-color.svg?include'),
            badge: 'Private Beta',
          },
        ],
      },
      {
        title: 'Partner Services',
        items: [
          {
            platform: 'HashiCorp Consul Service (HCS) on Azure',
            url: 'https://www.hashicorp.com/products/consul/service-on-azure',
          },
        ],
      },
    ],
  },
]

export default [
  {
    title: 'Browse Products',
    sections: DEFAULT_MENU_SECTIONS,
  },
  { title: 'About HashiCorp', linkUrl: 'https://www.hashicorp.com/about' },
]
