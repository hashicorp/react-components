import { stripVersionFromPathParams } from '.'

describe('stripVersionFromPathParams', () => {
  it('should return "latest" if no version is found', () => {
    {
      const [version, params] = stripVersionFromPathParams([])
      expect(version).toEqual('latest')
      expect(params).toEqual([])
    }
    {
      const [version, params] = stripVersionFromPathParams(['path', 'params'])
      expect(version).toEqual('latest')
      expect(params).toEqual(['path', 'params'])
    }
  })

  it('should strip a regular version string', () => {
    const [version, params] = stripVersionFromPathParams([
      'cli',
      'v1.2.x',
      'commands',
      'graph',
    ])
    expect(version).toEqual('v1.2.x')
    expect(params).toEqual(['cli', 'commands', 'graph'])
  })

  it('should strip a TFE version string', () => {
    const [version, params] = stripVersionFromPathParams([
      'enterprise',
      'v202206-1',
      'support',
    ])
    expect(version).toEqual('v202206-1')
    expect(params).toEqual(['enterprise', 'support'])
  })

  it('should return v-prefixed version and stripped path parms', () => {
    const [version, params] = stripVersionFromPathParams(['v0.5.x', 'destroy'])
    expect(version).toEqual('v0.5.x')
    expect(params).toEqual(['destroy'])
  })
})
