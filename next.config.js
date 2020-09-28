const withHashicorp = require('@hashicorp/nextjs-scripts')
const withOctavo = require('@hashicorp/octavo')

module.exports = withHashicorp({
  transpileModules: ['@hashicorp/octavo', '@hashicorp/react-.*'],
})(withOctavo({ componentsRoot: 'packages/*' })())
