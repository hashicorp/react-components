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

  it('should return v-prefixed version and stripped path parms', () => {
    const [version, params] = stripVersionFromPathParams(['v0.5.x', 'destroy'])
    expect(version).toEqual('v0.5.x')
    expect(params).toEqual(['destroy'])
  })
})
