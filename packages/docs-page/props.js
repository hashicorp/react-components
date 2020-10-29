module.exports = {
  product: {
    type: 'string',
    description: 'Name of the product this page is being rendered for',
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
  resourceUrl: {
    type: 'string',
    description:
      'A link to each page in github, for the "edit on github" link at the bottom of the page',
  },
  head: {
    type: 'object',
    description: 'Configuration passed to the `react-head` component',
    required: true,
    properties: {
      is: {
        type: 'React.Element',
        description: 'Pass in `next/head` here',
      },
      title: {
        type: 'string',
        description:
          'The title of each documentation page should be rendered here',
      },
      description: {
        type: 'string',
        description:
          'The description of each documentation page should be rendered here',
      },
      siteName: {
        type: 'string',
        description: 'Name of the website to be passed to the og:site_name tag',
      },
    },
  },
  sidenav: {
    type: 'object',
    description: 'Configuration passed to the `react-docs-sidenav` component',
    required: true,
    properties: {
      Link: {
        type: 'React.Element',
        description: 'Pass in `next/link` here',
      },
      category: {
        type: 'string',
        description: 'The root url of the current set of docs pages',
      },
      currentPage: {
        type: 'string',
        description: 'Relative URL of the current page',
      },
      data: {
        type: 'object',
        description: 'Same as the `data` object passed to `react-docs-sidenav`',
      },
      order: {
        type: 'array',
        description:
          'Same as the `order` object passed to `react-docs-sidenav`',
        required: true,
      },
    },
  },
}
