const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  moduleNameMapper: {
    '\\.module.css$': 'identity-obj-proxy',
    '\\.graphql$': '<rootDir>/__test-helpers/mocks/graphql-fragment-mock.js',
    // For .svg?include imports, remove the ?include suffix,
    // so that it can be resolved and loaded with jest-raw-loader
    '(.*)\\.svg\\?include$': '$1.svg',
  },
  transform: {
    // Load .svg imports as raw strings.
    // Our mapping above means this only targets .svg?include imports.
    '\\.svg$': '<rootDir>/__test-helpers/raw-loader.js',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@hashicorp/mktg-logos|@hashicorp/react-|@hashicorp/sentinel-embedded|@hashicorp/nextjs-scripts|@hashicorp/platform-|unist-|@hashicorp/flight-icons))',
    '\\.pnp\\.[^\\/]+$',
  ],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/__test-helpers/extend-expect.js'],
  testEnvironment: 'jest-environment-jsdom',
  snapshotFormat: {
    escapeString: true,
    printBasicPrototype: true,
  },
}

const config = createJestConfig(customJestConfig)

module.exports = async () => {
  const baseConfig = await config()
  // This step is necessary because the config provided by Next _explicitly_
  // does not transform node_modules.
  baseConfig.transformIgnorePatterns = customJestConfig.transformIgnorePatterns
  return baseConfig
}
