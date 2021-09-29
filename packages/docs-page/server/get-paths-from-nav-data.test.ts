import {
  getPathArraysFromNodes,
  getPathsFromNavData,
} from './get-paths-from-nav-data'

import navData from './__fixtures__/navData.json'

describe('getPathArraysFromNodes', () => {
  it('should return an array of "path arrays"', () => {
    expect(getPathArraysFromNodes(navData)).toMatchSnapshot()
  })
})

describe('getPathsFromNavData', () => {
  // https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
  it('should return an array of Next.js paths', () => {
    expect(getPathsFromNavData(navData)).toMatchSnapshot()
  })
})
