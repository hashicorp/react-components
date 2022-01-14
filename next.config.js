const withHashicorp = require('@hashicorp/platform-nextjs-plugin')
const withSwingset = require('swingset')
const SSRPlugin = require('next/dist/build/webpack/plugins/nextjs-ssr-import')
  .default
const { dirname, relative, resolve, join } = require('path')

// Unfortunately there isn't an easy way to override the replacement function body, so we
// have to just replace the whole plugin `apply` body.
function patchSsrPlugin(plugin) {
  plugin.apply = function apply(compiler) {
    compiler.hooks.compilation.tap('NextJsSSRImport', (compilation) => {
      compilation.mainTemplate.hooks.requireEnsure.tap(
        'NextJsSSRImport',
        (code, chunk) => {
          // This is the block that fixes https://github.com/vercel/next.js/issues/22581
          if (!chunk.name) {
            return
          }

          // Update to load chunks from our custom chunks directory
          const outputPath = resolve('/')
          const pagePath = join('/', dirname(chunk.name))
          const relativePathToBaseDir = relative(pagePath, outputPath)
          // Make sure even in windows, the path looks like in unix
          // Node.js require system will convert it accordingly
          const relativePathToBaseDirNormalized = relativePathToBaseDir.replace(
            /\\/g,
            '/'
          )
          return code
            .replace(
              'require("./"',
              `require("${relativePathToBaseDirNormalized}/"`
            )
            .replace(
              'readFile(join(__dirname',
              `readFile(join(__dirname, "${relativePathToBaseDirNormalized}"`
            )
        }
      )
    })
  }
}

module.exports = withHashicorp({
  transpileModules: ['swingset', '@hashicorp/sentinel-embedded'],
  nextOptimizedImages: true,
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
    headers: async () => [
      {
        source: '/:path*{/}?', // https://github.com/vercel/next.js/issues/14930
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "frame-ancestors 'self' https://design-system-website.vercel.app",
          },
        ],
      },
    ],
    webpack(config) {
      // ref: https://github.com/vercel/next.js/issues/22581#issuecomment-864476385
      const ssrPlugin = config.plugins.find(
        (plugin) => plugin instanceof SSRPlugin
      )
      if (ssrPlugin) {
        patchSsrPlugin(ssrPlugin)
      }

      config.module.rules.push({
        test: /\.wasm$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/wasm/[modulehash].wasm',
        },
      })
      return config
    },
  })
)
