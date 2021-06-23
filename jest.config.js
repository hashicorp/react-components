module.exports = {
  moduleNameMapper: {
    '\\.module.css$': 'identity-obj-proxy',
    '\\.graphql$': '<rootDir>/__test-helpers/mocks/graphql-fragment-mock.js',
    // Remove ?include suffixes from .svg imports
    '(.*)\\.svg(?:\\?.*)*$': '$1.svg',
  },
  transform: {
    // Note: babel-jest transform is from Jest's defaults for `transform`
    // ref: https://jestjs.io/docs/next/configuration
    '\\.[jt]sx?$': 'babel-jest',
    // Load all .svg imports as raw strings.
    '\\.svg(?:\\?.*)*$': 'jest-raw-loader',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@hashicorp/mktg-logos|@hashicorp/react-|@hashicorp/sentinel-embedded|@hashicorp/nextjs-scripts))',
    '\\.pnp\\.[^\\/]+$',
  ],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/__test-helpers/extend-expect.js'],
}
