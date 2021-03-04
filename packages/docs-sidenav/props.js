const sampleNavData = require('./fixtures/nav-data.json')
const sharedProps = require('../../props')

module.exports = {
  product: sharedProps.product,
  currentPath: {
    type: 'string',
    description:
      'Path to the current page, used to select the currently active page.',
    testValue: 'agent/autoauth',
  },
  baseRoute: {
    type: 'string',
    description:
      'Top level navigation route, for example `docs`, `api-docs`, etc.',
    testValue: 'docs',
  },
  disableFilter: {
    type: 'boolean',
    description: 'If true, disable the sidebar filter input',
    testValue: false,
  },
  navData: {
    type: 'object',
    description:
      'Tree of navigation data to render. See `docs-sidenav/types.js` for details.',
    testValue: sampleNavData,
  },
}
