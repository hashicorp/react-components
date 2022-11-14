const makeConfig = require('@hashicorp/platform-configs/jest/config')

module.exports = makeConfig({
  setupFilesAfterEnv: ['<rootDir>/__test-helpers/extend-expect.js'],
  testEnvironment: 'jsdom',
})
