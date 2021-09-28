import { DEFAULT_PARAM_ID } from './consts'

function getPathArraysFromNodes(navNodes) {
  const slugs = navNodes.reduce((acc, navNode) => {
    // Individual items have a path, these should be added
    if (navNode.path) return acc.concat([navNode.path.split('/')])
    // Category items have child routes, these should all be added
    if (navNode.routes)
      return acc.concat(getPathArraysFromNodes(navNode.routes))
    // All other node types (dividers, external links) can be ignored
    return acc
  }, [])
  return slugs
}

export async function getPathsFromNavData(
  navDataResolved,
  paramId = DEFAULT_PARAM_ID
) {
  //  Transform navigation data into path arrays
  const pagePathArrays = getPathArraysFromNodes(navDataResolved)
  // Include an empty array for the "/" index page path
  const allPathArrays = [[]].concat(pagePathArrays)
  const paths = allPathArrays.map((p) => ({ params: { [paramId]: p } }))
  return paths
}
