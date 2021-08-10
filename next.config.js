const path = require('path')
const fs = require('fs')

const withHashicorp = require('@hashicorp/platform-nextjs-plugin')
const withSwingset = require('swingset')

module.exports = withHashicorp({
  transpileModules: ['swingset', '@hashicorp/sentinel-embedded'],
})(
  withSwingset({
    componentsRoot: 'packages/*',
    docsRoot: 'docs/*',
  })({
    eslint: {
      // Warning: Dangerously allow production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    svgo: { plugins: [{ removeViewBox: false }] },
    publicRuntimeConfig: {
      SOURCEGRAPH_URL: process.env.SOURCEGRAPH_URL,
    },
  })
)
