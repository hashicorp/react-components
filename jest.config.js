module.exports = {
  moduleNameMapper: {
    '\\.module.css$': '<rootDir>/__test-helpers/mocks/css-module-mock.js',
    '\\.graphql$': '<rootDir>/__test-helpers/mocks/graphql-fragment-mock.js',
    '\\.svg(?:\\?.*)*$': '<rootDir>/__test-helpers/mocks/svg-mock.js',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@hashicorp/react-|@hashicorp/sentinel-embedded))',
    '\\.pnp\\.[^\\/]+$',
  ],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/__test-helpers/extend-expect.js'],
}
