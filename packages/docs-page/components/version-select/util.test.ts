/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import {
  getVersionFromPath,
  removeVersionFromPath,
  getTargetPath,
} from './util'

describe('getVersionFromPath', () => {
  it.each([
    [
      'http://localhost:3000/docs/v10.2.x/waypoint-hcl/variables/deploy',
      'v10.2.x',
    ],
    [
      'https://www.terraform.io/enterprise/v202208-1/releases/2022/v202207-2',
      'v202208-1',
    ],
    ['/docs/v10.2.x/waypoint-hcl/variables/deploy', 'v10.2.x'],
    ['/docs/v0.5.x/waypoint-hcl/variables/deploy', 'v0.5.x'],
    ['/enterprise/v202205-1/reference-architecture', 'v202205-1'],
    ['/enterprise/v202208-1/releases/2022/v202207-2', 'v202208-1'],
  ])('given "%s", should return "%s"', (path, expectedVersion) => {
    const version = getVersionFromPath(path)
    expect(version).toEqual(expectedVersion)
  })

  it('should return `undefined` if no version is present', () => {
    const path = 'https://waypointproject.io/docs/waypoint-hcl/variables/deploy'
    const version = getVersionFromPath(path)
    expect(version).toBeUndefined()
  })

  it.each([
    '/docs/10.2.4-canary.6/waypoint-hcl/variables/deplo',
    'https://waypointproject.io/docs/10.2.4-canary.6/waypoint-hcl/variables/deploy',
    'https://waypointproject.io/docs/v10.2/waypoint-hcl/variables/deploy',
  ])(
    'should return `undefined` if version is not formatted properly',
    (path) => {
      const version = getVersionFromPath(path)
      expect(version).toBeUndefined()
    }
  )

  it.each([
    '/enterprise/releases/2022/v202207-2',
    'https://www.terraform.io/enterprise/releases/2022/v202207-2,',
  ])(
    'should return `undefined` when a version is not in the expected position',
    (path) => {
      const version = getVersionFromPath(path)
      expect(version).toBeUndefined()
    }
  )
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
      const path =
        'https://terraform.io/enterprise/v202205-1/reference-architecture'

      const cleanedPath = removeVersionFromPath(path)
      expect(cleanedPath).toEqual(
        'https://terraform.io/enterprise/reference-architecture'
      )
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
