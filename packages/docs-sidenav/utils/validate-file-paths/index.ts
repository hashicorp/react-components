import * as fs from 'fs'
import * as path from 'path'

import type { NavNode, NavLeaf } from '../../types'

async function validateFilePaths(navNodes: NavNode[], localDir: string) {
  //  Clone the nodes, and validate each one
  return await Promise.all(
    navNodes.slice(0).map(async (navNode) => {
      return await validateNode(navNode, localDir)
    })
  )
}

async function validateNode(
  navNode: NavNode,
  localDir: string
): Promise<NavNode> {
  // Handle local leaf nodes
  if ('path' in navNode) {
    const indexFilePath = path.join(navNode.path, 'index.mdx')
    const namedFilePath = `${navNode.path}.mdx`
    const hasIndexFile = fs.existsSync(
      path.join(process.cwd(), localDir, indexFilePath)
    )
    const hasNamedFile = fs.existsSync(
      path.join(process.cwd(), localDir, namedFilePath)
    )
    if (!hasIndexFile && !hasNamedFile) {
      throw new Error(
        `Could not find file to match path "${navNode.path}". Neither "${namedFilePath}" or "${indexFilePath}" could be found.`
      )
    }
    if (hasIndexFile && hasNamedFile) {
      throw new Error(
        `Ambiguous path "${navNode.path}". Both "${namedFilePath}" and "${indexFilePath}" exist. Please delete one of these files.`
      )
    }
    const filePath = path.join(
      localDir,
      hasIndexFile ? indexFilePath : namedFilePath
    )
    return { ...navNode, filePath } as NavLeaf
  }
  //  Handle local branch nodes
  if ('routes' in navNode) {
    const routesWithFilePaths = await validateFilePaths(
      navNode.routes,
      localDir
    )
    return { ...navNode, routes: routesWithFilePaths }
  }
  // Return all other node types unmodified
  return navNode
}

export default validateFilePaths
