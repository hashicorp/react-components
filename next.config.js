const withHashicorp = require('@hashicorp/platform-nextjs-plugin')
const withSwingset = require('swingset')

module.exports = withHashicorp({
  transpileModules: [
    'swingset',
    '@hashicorp/sentinel-embedded',
    '@hashicorp/flight-icons',
  ],
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
    images: {
      domains: ['www.datocms-assets.com'],
      disableStaticImages: true,
    },
  })
)
