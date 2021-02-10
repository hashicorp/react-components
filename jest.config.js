module.exports = {
  moduleNameMapper: {
    '\\.module.css$': 'identity-obj-proxy',
    '\\.graphql$': '<rootDir>/__test-helpers/mocks/graphql-fragment-mock.js',
    '\\.svg(?:\\?.*)*$': '<rootDir>/__test-helpers/mocks/svg-mock.js',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@hashicorp/react-|@hashicorp/nextjs-scripts)',
    '\\.pnp\\.[^\\/]+$',
  ],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/__test-helpers/extend-expect.js'],
}
