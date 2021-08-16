const path = require('path')
const fs = require('fs')
const {
  getHashicorpPackages,
} = require('@hashicorp/platform-nextjs-plugin/dist/get-hashicorp-packages')

const withHashicorp = require('@hashicorp/platform-nextjs-plugin')
const withSwingset = require('swingset')

// Determine HC packages which are included in the monorepo to ensure we are transpiling all of our dependencies
const workspaceRoot = path.join(process.cwd(), 'packages')
let hashicorpPackagesInWorkspaces = []

fs.readdirSync(workspaceRoot).forEach((dir) => {
  hashicorpPackagesInWorkspaces = hashicorpPackagesInWorkspaces.concat(
    getHashicorpPackages(path.join(workspaceRoot, dir))
  )
})

module.exports = withHashicorp({
  transpileModules: [
    'swingset',
    '@hashicorp/sentinel-embedded',
    ...hashicorpPackagesInWorkspaces,
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
