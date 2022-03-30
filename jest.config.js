module.exports = {
  moduleNameMapper: {
    '\\.module.css$': 'identity-obj-proxy',
    '\\.graphql$': '<rootDir>/__test-helpers/mocks/graphql-fragment-mock.js',
    // For .svg?include imports, remove the ?include suffix,
    // so that it can be resolved and loaded with jest-raw-loader
    '(.*)\\.svg\\?include$': '$1.svg',
    // For all other svg imports, use a mock
    '\\.svg$': '<rootDir>/__test-helpers/mocks/svg-mock.js',
  },
  transform: {
    // Note: babel-jest transform is from Jest's defaults for `transform`
    // ref: https://jestjs.io/docs/next/configuration
    '\\.[jt]sx?$': [
      '@swc-node/jest',
      {
        jsx: true,
        react: { runtime: 'automatic' },
        minify: false,
      },
    ],
    // Load .svg imports as raw strings.
    // Our mapping above means this only targets .svg?include imports.
    '\\.svg$': 'jest-raw-loader',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@hashicorp/mktg-logos|@hashicorp/react-|@hashicorp/sentinel-embedded|@hashicorp/nextjs-scripts|@hashicorp/platform-|unist-|@hashicorp/flight-icons))',
    '\\.pnp\\.[^\\/]+$',
  ],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/__test-helpers/extend-expect.js'],
  testEnvironment: 'jsdom',
}
