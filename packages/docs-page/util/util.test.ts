/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

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
      'v1.2.x',
      'commands',
      'graph',
    ])
    expect(version).toEqual('v1.2.x')
    expect(params).toEqual(['commands', 'graph'])
  })

  it('should strip a TFE version string', () => {
    const [version, params] = stripVersionFromPathParams([
      'v202206-1',
      'support',
    ])
    expect(version).toEqual('v202206-1')
    expect(params).toEqual(['support'])
  })

  // /enterprise/[[...page]].tsx
  it('should not strip TFE versions that are intended occur later in the path', () => {
    {
      // GET terraform.io/enterprise/releases/2022/v202205-1
      const [version, params] = stripVersionFromPathParams([
        'releases',
        '2022',
        'v202205-1',
      ])
      expect(version).toEqual('latest')
      expect(params).toEqual(['releases', '2022', 'v202205-1'])
    }
    {
      // GET terraform.io/enterprise/v202206-1/releases/2022/v202205-1
      const [version, params] = stripVersionFromPathParams([
        'v202206-1',
        'releases',
        '2022',
        'v202205-1',
      ])
      expect(version).toEqual('v202206-1')
      expect(params).toEqual(['releases', '2022', 'v202205-1'])
    }
  })

  it('should return v-prefixed version and stripped path parms', () => {
    const [version, params] = stripVersionFromPathParams(['v0.5.x', 'destroy'])
    expect(version).toEqual('v0.5.x')
    expect(params).toEqual(['destroy'])
  })
})
