const sampleNavData = require('./fixtures/navdata-example.json')

const productSlugs = [
  'nomad',
  'consul',
  'terraform',
  'packer',
  'vagrant',
  'boundary',
  'waypoint',
]

module.exports = {
  product: {
    type: 'string',
    description: 'Slug of the current product for color theming',
    testValue: 'terraform',
    options: productSlugs,
  },
  currentPath: {
    type: 'string',
    description:
      'Path to the current page, used to select the currently active page.',
    testValue: 'agent/autoauth',
  },
  rootPath: {
    type: 'string',
    description:
      'Top level navigation category, for example `docs`, `api`, etc.',
    testValue: 'docs',
  },
  disableFilter: {
    type: 'boolean',
    description: 'If true, disable the sidebar filter input',
    testValue: false,
  },
  navData: {
    type: 'object',
    description: 'Tree of navigation data to render',
    testValue: sampleNavData,
  },
}
