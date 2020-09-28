module.exports = {
  moduleNameMapper: {
    '\\.graphql$': '<rootDir>/__test-helpers/mocks/graphql-fragment-mock.js',
    '\\.svg(?:\\?.*)*$': '<rootDir>/__test-helpers/mocks/svg-mock.js',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@hashicorp/react-)',
    '\\.pnp\\.[^\\/]+$',
  ],
  verbose: true,
}
