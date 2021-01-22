module.exports = {
  product: {
    type: 'object',
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
          'terraform',
          'vault',
          'nomad',
          'consul',
          'packer',
          'vagrant',
          'red',
          'blue',
        ],
      },
    },
  },
  order: {
    type: 'object',
    description:
      'Pass in the export of a `data/xxx-navigation.js` file, this is the user-defined navigation order and structure. Passed directly to the `order` prop to `@hashicorp/react-docs-sidenav` - see that component for details on object structure.',
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
