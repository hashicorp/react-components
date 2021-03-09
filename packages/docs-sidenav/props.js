const sampleNavData = require('./fixtures/nav-data.json')
const sharedProps = require('../../props')

module.exports = {
  product: sharedProps.product,
  currentPath: {
    type: 'string',
    description:
      'Path to the current page, relative to the `baseRoute`. Used to highlight the current page.',
    testValue: 'agent/autoauth/methods/aws',
  },
  baseRoute: {
    type: 'string',
    required: true,
    description:
      'Top level navigation route, for example `docs`, `api-docs`, etc.',
    testValue: 'docs',
  },
  disableFilter: {
    type: 'boolean',
    description: 'If `true`, disable the sidebar filter input.',
    testValue: false,
  },
  navData: {
    type: 'object',
    required: true,
    description:
      'Tree of navigation data to render. See `docs-sidenav/types.js` for details.',
    testValue: sampleNavData,
  },
}
