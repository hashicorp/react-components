function validateRouteStructure(navData) {
  return validateBranchRoutes(navData)[1]
}

function validateBranchRoutes(navNodes, depth = 0) {
  //  In order to be a valid branch, there needs to be at least one navNode.
  if (navNodes.length === 0) {
    throw new Error(`Found empty array of navNodes. Depth: ${depth}`)
  }
  // Augment each navNode with its path __stack
  const navNodesWithStacks = navNodes.map((navNode) => {
    // Handle leaf nodes - split their paths into a __stack
    if (navNode.path) return { ...navNode, __stack: navNode.path.split('/') }
    // Handle branch nodes - we recurse depth-first here
    if (navNode.routes) return handleBranchNode(navNode, depth)
    // Other nodes aren't relevant, we don't touch them
    return navNode
  })
  // Gather all the path stacks at this level
  const routeStacks = navNodesWithStacks.reduce((acc, navNode) => {
    // Ignore nodes that don't have a path stack
    if (!navNode.__stack) return acc
    // For other nodes, add their stacks
    return acc.concat([navNode.__stack])
  }, [])
  // Ensure that there are no duplicate routes
  // (for example, a nested route with a particular path,
  // and a named page at the same level with the same path)
  const routePaths = routeStacks.map((s) => s.join('/'))
  const duplicateRoutes = routePaths.filter((value, index, self) => {
    return self.indexOf(value) !== index
  })
  if (duplicateRoutes.length > 0) {
    throw new Error(
      `Duplicate routes found:\n\n${JSON.stringify(duplicateRoutes)}\n`
    )
  }
  // Gather an array of all resolved paths at this level
  const parentRoutes = routeStacks.map((stack) => {
    // Index leaf nodes will have the same
    // number of path parts as the current nesting depth.
    const isIndexNode = stack.length === depth
    if (isIndexNode) {
      // The "dirPath" for index nodes is
      // just the original path
      return stack.join('/')
    }
    // Named leaf nodes, and nested routes,
    // will have one more path part than the current nesting depth.
    const isNamedNode = stack.length === depth + 1
    if (isNamedNode) {
      // The "dirPath" for named nodes is
      // the original path with the last part dropped.
      return stack.slice(0, stack.length - 1).join('/')
    }
    // If we have any other number of parts in the
    // leaf node's path, then it is invalid.
    throw new Error(
      `Invalid path depth. At depth ${depth}, found path "${stack.join('/')}"`
    )
  })
  // We expect all routes at any level to share the same parent directory.
  // In other words, we expect there to be exactly one unique "dirPath"
  // shared across all the routes at this level.
  const uniqueParents = parentRoutes.filter((value, index, self) => {
    return self.indexOf(value) === index
  })
  // We throw an error if we find mismatched paths
  // that don't share the same parent path.
  if (uniqueParents.length > 1) {
    throw new Error(`Found mismatched paths: ${JSON.stringify(uniqueParents)}`)
  }
  const path = uniqueParents[0]
  //  Finally, we return
  return [path, navNodesWithStacks]
}

function handleBranchNode(navNode, depth) {
  // We recurse depth-first here, and we'll throw an error
  // if the nested routes had structural issues
  const [path, routesWithStacks] = validateBranchRoutes(
    navNode.routes,
    depth + 1
  )
  const __stack = path.split('/')
  return { ...navNode, __stack, routes: routesWithStacks }
}

module.exports = validateRouteStructure

//
//
//
//
//
//
//
//

// TODO - throw error if any non-divider node does not have a title
// function collectEmptyTitleErrors(navData) {
//   const errors = [];
//   return errors;
// }

// TODO - throw error if direct link nodes don't have both { title, href }
// function collectDirectLinkErrors(navData) {
//   const errors = [];
//   return errors;
// }
