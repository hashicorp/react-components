import { prettyArch } from '../downloader'

describe('prettyArch', () => {
  test('returns expected label for architecture', () => {
    const mapping = {
      // inputs that require special handling
      all: 'Universal (386 and Amd64)',
      x86_64: 'Amd64',
      i686: '686',
      // inputs that can use default handling
      amd64: 'Amd64',
      '386': '386',
      arm: 'Arm',
      arm64: 'Arm64',
    }

    for (const [input, expectedOutput] of Object.entries(mapping)) {
      expect(prettyArch(input)).toBe(expectedOutput)
    }
  })
})
