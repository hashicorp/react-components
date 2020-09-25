import formatStarCount from './index.js'

describe('<Subnav /> - formatStarCount', () => {
  it('should return zero for an undefined, null, or zero count', () => {
    expect(formatStarCount(undefined)).toBe(false)
    expect(formatStarCount(null)).toBe(false)
    expect(formatStarCount(0)).toBe(false)
  })

  it('should return numbers 1 to 999 without formatting', () => {
    expect(formatStarCount(1)).toBe('1')
    expect(formatStarCount(999)).toBe('999')
  })

  it('should abbreviate numbers in the tens of thousands with "k" and a single decimal point', () => {
    expect(formatStarCount(1003)).toBe('1.0k')
    expect(formatStarCount(1280)).toBe('1.2k')
    expect(formatStarCount(15630)).toBe('15.6k')
  })

  it('should abbreviate numbers in the hundreds of thousands with "k" and no decimal point', () => {
    expect(formatStarCount(100000)).toBe('100k')
    expect(formatStarCount(156783)).toBe('156k')
  })
})
