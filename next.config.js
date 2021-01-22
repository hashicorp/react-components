const withHashicorp = require('@hashicorp/nextjs-scripts')
const withSwingset = require('swingset')

module.exports = withHashicorp({
  transpileModules: [
    'swingset',
    '@hashicorp/react-.*',
    '@hashicorp/nextjs-scripts',
    '@hashicorp/sentinel-embedded',
  ],
})(
  withSwingset({
    componentsRoot: 'packages/*',
  })({
    svgo: { plugins: [{ removeViewBox: false }] },
    publicRuntimeConfig: {
      SOURCEGRAPH_URL: process.env.SOURCEGRAPH_URL,
    },
  })
)
