import parseGithubUrl from './index.js'

describe('<Subnav /> - parseGithubUrl', () => {
  it('should gracefully handle an invalid URL', () => {
    //  Suppress console.warn for this test, we expect warnings
    jest.spyOn(console, 'warn')
    global.console.warn.mockImplementation(() => {})
    expect(parseGithubUrl(undefined)).toBe(false)
    expect(parseGithubUrl('blah-blah')).toBe(false)
    //  Restore console.warn for further tests
    global.console.warn.mockRestore()
  })

  it('should handle a non-GitHub URL', () => {
    expect(parseGithubUrl('https://www.example.com/hashicorp/terraform')).toBe(
      false
    )
  })

  it('should parse the org and repo from a GitHub URL', () => {
    const testInput = 'https://www.github.com/hashicorp/terraform'
    expect(parseGithubUrl(testInput).repo).toBe('terraform')
    expect(parseGithubUrl(testInput).org).toBe('hashicorp')
  })
})
