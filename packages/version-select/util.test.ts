import { getVersionFromPath, removeVersionFromPath } from './util'

describe('getVersionFromPath', () => {
  it('should return the version if it is present', () => {
    const path =
      'https://waypointproject.io/docs/v10.2.4-canary.6/waypoint-hcl/variables/deploy'

    const version = getVersionFromPath(path)
    expect(version).toEqual('v10.2.4-canary.6')
  })

  it('should return `undefined` if no version is present', () => {
    const path = 'https://waypointproject.io/docs/waypoint-hcl/variables/deploy'
    const version = getVersionFromPath(path)
    expect(version).toBeUndefined()
  })

  it('should return `undefined` if version is not formatted properly', () => {
    let path =
      'https://waypointproject.io/docs/10.2.4-canary.6/waypoint-hcl/variables/deploy'
    let version = getVersionFromPath(path)
    expect(version).toBeUndefined()

    path = 'https://waypointproject.io/docs/v10.2/waypoint-hcl/variables/deploy'
    version = getVersionFromPath(path)
    expect(version).toBeUndefined()
  })
})

describe('removeVersionFromPath', () => {
  it('should return a cleaned path', () => {
    const path =
      'https://waypointproject.io/docs/v10.2.4-canary.6/waypoint-hcl/variables/deploy'

    const cleanedPath = removeVersionFromPath(path)
    expect(cleanedPath).toEqual(
      'https://waypointproject.io/docs/waypoint-hcl/variables/deploy'
    )
  })

  it('should return a cleaned path 2', () => {
    const path = '/v9.0.1/'

    const cleanedPath = removeVersionFromPath(path)
    expect(cleanedPath).toEqual('/')
  })

  it('should return the original path if no version is present', () => {
    const path = 'https://waypointproject.io/docs/waypoint-hcl/variables/deploy'

    const cleanedPath = removeVersionFromPath(path)
    expect(cleanedPath).toEqual(
      'https://waypointproject.io/docs/waypoint-hcl/variables/deploy'
    )
  })
})
