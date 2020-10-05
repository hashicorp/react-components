// The following are building blocks of our default data exported below
export const DEFAULT_PRODUCT_GROUPS = {
  infrastructure: {
    title: 'Infrastructure',
    items: [
      {
        product: 'packer',
        url: 'https://www.packer.io',
        iconUrl:
          'https://www.hashicorp.com/img/product-logos/packer-icon-color.svg',
      },
      {
        product: 'terraform',
        url: 'https://www.terraform.io',
        iconUrl:
          'https://www.hashicorp.com/img/product-logos/terraform-icon-color.svg',
      },
      {
        product: 'vagrant',
        url: 'https://www.vagrantup.com',
        iconUrl:
          'https://www.hashicorp.com/img/product-logos/vagrant-icon-color.svg',
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
            product: 'terraform',
            url: 'https://app.terraform.io',
            iconUrl:
              'https://www.hashicorp.com/img/product-logos/terraform-icon-color.svg',
          },
        ],
      },
      {
        title: 'Partner Services',
        items: [
          {
            platform: 'HashiCorp Consul Service on Azure',
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
