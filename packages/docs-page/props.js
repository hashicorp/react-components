const navDataExample = require('../docs-sidenav/fixtures/navdata-example.json')

module.exports = {
  product: {
    type: 'string',
    description: 'Name and slug of the product this page is being rendered for',
    properties: {
      name: {
        type: 'string',
        description: 'Human-readable proper case product name',
      },
      slug: {
        type: 'string',
        description: 'HashiCorp product slug',
        control: { type: 'select' },
        options: [
          'hashicorp',
          'boundary',
          'consul',
          'nomad',
          'packer',
          'terraform',
          'vault',
          'vagrant',
          'waypoint',
        ],
      },
    },
  },
  subpath: {
    type: 'string',
    description:
      'The path this page is rendering under, for example "docs" or "api-docs". Passed directly to the `category` prop of `@hashicorp/react-docs-sidenav`',
  },
  navData: {
    type: 'object',
    testValue: navDataExample,
  },
  currentPath: {
    type: 'string',
    testValue: 'agent/autoauth',
  },
  additionalComponents: {
    type: 'object',
    description:
      'Object containing additional components to be made available within mdx pages. Uses the format { [key]: Component }, for example, `{ TestComponent: () => <p>hello world</p> }`',
  },
  showEditPage: {
    type: 'boolean',
    description:
      'if true, an "edit this page" link will appear on the bottom right',
    default: true,
  },
  mainBranch: {
    type: 'string',
    description:
      'The default branch of the project being documented, typically either "master" or "main". Used for the `showEditPage` prop',
    default: 'main',
  },
  staticProps: {
    type: 'object',
    description:
      'Directly pass the return value of `server/generateStaticProps` in here.',
  },
}
