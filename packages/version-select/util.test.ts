import {
  getVersionFromPath,
  removeVersionFromPath,
  getTargetPath,
} from './util'

describe('getVersionFromPath', () => {
  it('should return the version if it is present', () => {
    {
      const path =
        'https://waypointproject.io/docs/v10.2.x/waypoint-hcl/variables/deploy'

      const version = getVersionFromPath(path)
      expect(version).toEqual('v10.2.x')
    }

    {
      const path =
        'https://waypointproject.io/docs/v9000.9000.x/waypoint-hcl/variables/deploy'

      const version = getVersionFromPath(path)
      expect(version).toEqual('v9000.9000.x')
    }

    {
      const path =
        'https://waypointproject.io/docs/v0.5.x/waypoint-hcl/variables/deploy'

      const version = getVersionFromPath(path)
      expect(version).toEqual('v0.5.x')
    }
  })

  it('should return `undefined` if no version is present', () => {
    const path = 'https://waypointproject.io/docs/waypoint-hcl/variables/deploy'
    const version = getVersionFromPath(path)
    expect(version).toBeUndefined()
  })

  it('should return `undefined` if version is not formatted properly', () => {
    {
      const path =
        'https://waypointproject.io/docs/10.2.4-canary.6/waypoint-hcl/variables/deploy'
      const version = getVersionFromPath(path)
      expect(version).toBeUndefined()
    }

    {
      const path =
        'https://waypointproject.io/docs/v10.2/waypoint-hcl/variables/deploy'
      const version = getVersionFromPath(path)
      expect(version).toBeUndefined()
    }
  })
})

describe('removeVersionFromPath', () => {
  it('should return a cleaned path', () => {
    {
      const path =
        'https://waypointproject.io/docs/v10.2.x/waypoint-hcl/variables/deploy'

      const cleanedPath = removeVersionFromPath(path)
      expect(cleanedPath).toEqual(
        'https://waypointproject.io/docs/waypoint-hcl/variables/deploy'
      )
    }

    {
      const path = '/v9.0.1/'

      const cleanedPath = removeVersionFromPath(path)
      expect(cleanedPath).toEqual('/')
    }

    {
      const path =
        'https://waypointproject.io/docs/v0.5.x/waypoint-hcl/variables/deploy'

      const cleanedPath = removeVersionFromPath(path)
      expect(cleanedPath).toEqual(
        'https://waypointproject.io/docs/waypoint-hcl/variables/deploy'
      )
    }
  })

  it('should return the original path if no version is present', () => {
    const path = 'https://waypointproject.io/docs/waypoint-hcl/variables/deploy'

    const cleanedPath = removeVersionFromPath(path)
    expect(cleanedPath).toEqual(
      'https://waypointproject.io/docs/waypoint-hcl/variables/deploy'
    )
  })
})

describe('getTargetPath', () => {
  describe('with a nested path', () => {
    it('should return a target path while on "latest"', () => {
      {
        const input = {
          basePath: 'sentinel/intro',
          asPath: '/sentinel/intro/some/nested/article',
          version: 'v1.10.x',
        }
        const target = getTargetPath(input)
        expect(target).toEqual('/sentinel/intro/v1.10.x/some/nested/article')
      }
    })

    it('should return a target path while on an older version', () => {
      {
        const input = {
          basePath: 'sentinel/intro',
          asPath: '/sentinel/intro/v1.8.x/some/nested/article',
          version: 'v1.10.x',
        }
        const target = getTargetPath(input)
        expect(target).toEqual('/sentinel/intro/v1.10.x/some/nested/article')
      }
    })
  })

  describe('with a non-nested path', () => {
    it('should return a target path while on "latest"', () => {
      {
        const input = {
          basePath: 'sentinel/intro',
          asPath: '/sentinel/intro',
          version: 'v1.10.x',
        }
        const target = getTargetPath(input)
        expect(target).toEqual('/sentinel/intro/v1.10.x')
      }
    })

    it('should return a target path while on an older version', () => {
      {
        const input = {
          basePath: 'sentinel/intro',
          asPath: '/sentinel/intro/v1.8.x',
          version: 'v1.10.x',
        }
        const target = getTargetPath(input)
        expect(target).toEqual('/sentinel/intro/v1.10.x')
      }
    })
  })
})
