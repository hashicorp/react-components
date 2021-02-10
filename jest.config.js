module.exports = {
  moduleNameMapper: {
    '\\.module.css$': '<rootDir>/__test-helpers/mocks/css-module-mock.js',
    '\\.graphql$': '<rootDir>/__test-helpers/mocks/graphql-fragment-mock.js',
    '\\.svg(?:\\?.*)*$': '<rootDir>/__test-helpers/mocks/svg-mock.js',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@hashicorp/react-)',
    '\\.pnp\\.[^\\/]+$',
  ],
  verbose: true,
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['<rootDir>/__test-helpers/extend-expect.js'],
}
