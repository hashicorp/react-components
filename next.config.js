const withHashicorp = require('@hashicorp/platform-nextjs-plugin')
const withSwingset = require('swingset')

module.exports = withHashicorp({
  transpileModules: [
    'swingset',
    '@hashicorp/react-.*',
    '@hashicorp/platform-*',
    '@hashicorp/sentinel-embedded',
  ],
})(
  withSwingset({
    componentsRoot: 'packages/*',
    docsRoot: 'docs/*',
  })({
    svgo: { plugins: [{ removeViewBox: false }] },
    publicRuntimeConfig: {
      SOURCEGRAPH_URL: process.env.SOURCEGRAPH_URL,
    },
  })
)
