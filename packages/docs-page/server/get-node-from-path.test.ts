import path from 'path'
import { flattenRoutes, getNodeFromPath } from './get-node-from-path'

import navData from './__fixtures__/navData.json'

const CONTENT_DIR = 'content/commands'

describe('flattenRoutes', () => {
  it('should flatten navdata', () => {
    expect(flattenRoutes(navData)).toMatchSnapshot()
  })
})

describe('getNodeFromPath', () => {
  it('should return a node for a given path', () => {
    const pathToMatch = 'extending-waypoint/creating-plugins/main'
    expect(getNodeFromPath(pathToMatch, navData, CONTENT_DIR))
      .toMatchInlineSnapshot(`
Object {
  "path": "extending-waypoint/creating-plugins/main",
  "title": "Registering Plugin Components",
}
`)
  })

  it('should return a "home page" node for an empty path', () => {
    const pathToMatch = ''
    expect(getNodeFromPath(pathToMatch, navData, CONTENT_DIR))
      .toMatchInlineSnapshot(`
Object {
  "filePath": ${JSON.stringify(path.join('content', 'commands', 'index.mdx'))},
}
`)
  })

  it('should throw for a missing path', () => {
    const pathToMatch = 'i_am_not_found'
    expect(() => {
      getNodeFromPath(pathToMatch, navData, CONTENT_DIR)
    }).toThrowErrorMatchingInlineSnapshot(
      `"Missing resource to match \\"i_am_not_found\\""`
    )
  })

  // provide a navData fixture that has duplicate nodes
  it.todo('should throw if a path results in duplicate nodes')
})
