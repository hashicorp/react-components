const withHashicorp = require('@hashicorp/nextjs-scripts')
const withSwingset = require('swingset')

module.exports = withHashicorp({
  transpileModules: [
    'swingset',
    '@hashicorp/react-.*',
    '@hashicorp/nextjs-scripts',
  ],
})(
  withSwingset({
    componentsRoot: 'packages/*',
  })({ svgo: { plugins: [{ removeViewBox: false }] } })
)
