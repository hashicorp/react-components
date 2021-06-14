'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
const util_1 = __importDefault(require('util'))
const bundle_analyzer_1 = __importDefault(require('@next/bundle-analyzer'))
const next_optimized_images_1 = __importDefault(
  require('next-optimized-images')
)
const next_transpile_modules_1 = __importDefault(
  require('next-transpile-modules')
)
const with_css_1 = __importDefault(require('./plugins/with-css'))
const with_graphql_basic_1 = __importDefault(
  require('./plugins/with-graphql-basic')
)
const get_hashicorp_packages_1 = require('./get-hashicorp-packages')
const debugLog = util_1.default.debuglog('nextjs-scripts')
// Export a plugin function that just goes through and calls our chain
function withHashicorp({ css = {}, dato = {}, transpileModules = [] } = {}) {
  return function withHashicorpInternal(nextConfig = {}) {
    const chain = [
      next_optimized_images_1.default,
      bundle_analyzer_1.default({ enabled: process.env.ANALYZE === 'true' }),
      with_css_1.default(css),
      with_graphql_basic_1.default(),
    ]
    nextConfig.future = {
      ...nextConfig.future,
      strictPostcssConfiguration: true,
    }
    const hcPackages = get_hashicorp_packages_1.getHashicorpPackages(
      process.cwd()
    )
    debugLog('detected @hashicorp dependencies: %s', hcPackages)
    // Automatically determine hashicorp packages from directories in node_modules
    chain.unshift(
      next_transpile_modules_1.default([...transpileModules, ...hcPackages])
    )
    // Set dato token if a custom token is provided
    if (dato === null || dato === void 0 ? void 0 : dato.token) {
      if (!nextConfig.env) nextConfig.env = {}
      process.env.HASHI_DATO_TOKEN = dato.token
      nextConfig.env.HASHI_DATO_TOKEN = dato.token
    }
    // Set dato environment if custom environment is provided
    if (dato === null || dato === void 0 ? void 0 : dato.environment) {
      if (!nextConfig.env) nextConfig.env = {}
      process.env.HASHI_DATO_ENVIRONMENT = dato.environment
      nextConfig.env.HASHI_DATO_ENVIRONMENT = dato.environment
    }
    // the difference between defaults and permanents are that defaults will
    // be overridden by user land configuration, whereas permanents are always
    // tacked on to the end and therefore can't be overidden
    // header overriding docs: https://nextjs.org/docs/api-reference/next.config.js/headers#header-overriding-behavior
    const defaultHeaders = []
    const permanentHeaders = [
      {
        source: '/:path*{/}?',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ]
    // support tipBranch config, which activates noindex HTTP headers
    // MKTG-030 - https://docs.google.com/document/d/1AlBW3DPT7D54vDQa0P6QBMjTKqssJFPDz1CuthkI5oM/edit#
    if (
      nextConfig.tipBranch &&
      process.env.VERCEL_GIT_COMMIT_REF == nextConfig.tipBranch
    ) {
      defaultHeaders.push({
        source: '/:path*{/}?',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      })
    }
    // if there are user land headers, combine them with defaults & permanents
    if (nextConfig.headers) {
      const origHeaders = nextConfig.headers
      nextConfig.headers = () =>
        origHeaders().then((res) => {
          return [...defaultHeaders, ...res, ...permanentHeaders]
        })
    } else {
      // else, just add defaults and permanent headers and resolve the promise
      nextConfig.headers = () =>
        Promise.resolve([...defaultHeaders, ...permanentHeaders])
    }
    return chain.reduce((acc, next) => next(acc), nextConfig)
  }
}
module.exports = withHashicorp
