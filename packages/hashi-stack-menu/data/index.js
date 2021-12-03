// The following are building blocks of our default data exported below
export const DEFAULT_PRODUCT_GROUPS = {
  infrastructure: {
    title: 'Infrastructure',
    items: [
      {
        product: 'terraform',
        url: 'https://www.terraform.io',
        iconSrc: require('@hashicorp/mktg-logos/product/terraform/logomark/color.svg?include'),
      },
      {
        product: 'packer',
        url: 'https://www.packer.io',
        iconSrc: require('@hashicorp/mktg-logos/product/packer/logomark/color.svg?include'),
      },
    ],
  },
  networking: {
    title: 'Networking',
    items: [
      {
        product: 'consul',
        url: 'https://www.consul.io',
        iconSrc: require('@hashicorp/mktg-logos/product/consul/logomark/color.svg?include'),
      },
    ],
  },
  security: {
    title: 'Security',
    items: [
      {
        product: 'vault',
        url: 'https://www.vaultproject.io',
        iconSrc: require('@hashicorp/mktg-logos/product/vault/logomark/color.svg?include'),
      },
      {
        product: 'boundary',
        url: 'https://www.boundaryproject.io',
        iconSrc: require('@hashicorp/mktg-logos/product/boundary/logomark/color.svg?include'),
      },
    ],
  },
  applications: {
    title: 'Applications',
    items: [
      {
        product: 'nomad',
        url: 'https://www.nomadproject.io',
        iconSrc: require('@hashicorp/mktg-logos/product/nomad/logomark/color.svg?include'),
      },
      {
        product: 'waypoint',
        url: 'https://www.waypointproject.io',
        iconSrc: require('@hashicorp/mktg-logos/product/waypoint/logomark/color.svg?include'),
      },
      {
        product: 'vagrant',
        url: 'https://www.vagrantup.com',
        iconSrc: require('@hashicorp/mktg-logos/product/vagrant/logomark/color.svg?include'),
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
        description:
          'A fully managed platform to automate infrastructure on any cloud with HashiCorp products.',
        items: [
          {
            product: 'consul',
            url: 'https://cloud.hashicorp.com/',
            iconSrc: require('@hashicorp/mktg-logos/product/consul/logomark/color.svg?include'),
          },
          {
            product: 'terraform',
            url: 'https://app.terraform.io',
            iconSrc: require('@hashicorp/mktg-logos/product/terraform/logomark/color.svg?include'),
          },
          {
            product: 'vault',
            url: 'https://cloud.hashicorp.com/',
            iconSrc: require('@hashicorp/mktg-logos/product/vault/logomark/color.svg?include'),
          },
          {
            product: 'packer',
            url: 'https://cloud.hashicorp.com/products/packer',
            iconSrc: require('@hashicorp/mktg-logos/product/packer/logomark/color.svg?include'),
            badge: 'beta',
          },
        ],
        cta: {
          text: 'Visit cloud.hashicorp.com',
          url: 'https://cloud.hashicorp.com',
        },
      },
    ],
  },
]

export default [
  {
    title: 'Browse Products',
    sections: DEFAULT_MENU_SECTIONS,
  },
]
