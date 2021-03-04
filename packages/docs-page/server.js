import fs from 'fs'
import path from 'path'
import validateFilePaths from '@hashicorp/react-docs-sidenav/utils/validate-file-paths'
import validateRouteStructure from '@hashicorp/react-docs-sidenav/utils/validate-route-structure'
import renderPageMdx from './render-page-mdx'

const DEFAULT_PARAM_ID = 'page'

async function generateStaticPaths(
  navDataFile,
  localContentDir,
  { paramId = DEFAULT_PARAM_ID } = {}
) {
  // Fetch and parse navigation data
  const navData = await resolveNavData(navDataFile, localContentDir)
  const paths = getPathsFromNavData(navData, paramId)
  return paths
}

async function resolveNavData(filePath, localContentDir) {
  // TODO - memo-ize? Will that affect things? Rationale is that NextJS
  // must be calling this function twice for every page render...
  // and input arguments and therefore return value will always be the same.
  // So may be worth memo-izing.
  const navDataFile = path.join(process.cwd(), filePath)
  const navDataRaw = JSON.parse(fs.readFileSync(navDataFile, 'utf8'))
  const withFilePaths = await validateFilePaths(navDataRaw, localContentDir)
  return withFilePaths
}

async function getPathsFromNavData(
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

async function generateStaticProps(
  navDataFile,
  localContentDir,
  params,
  {
    // Note: productName is ultimately only passed to createEnterpriseAlert.
    // we may be able to remove the need for this additional arg / option by
    // leveraging recent work on our product-meta provider:
    // where arg is used: https://github.com/hashicorp/nextjs-scripts/blob/462eb2efa0c95ab5d81ad1b5d7896427a0263011/lib/providers/docs/index.jsx#L35-L48
    // product-meta: https://github.com/hashicorp/nextjs-scripts/tree/main/lib/providers/product-meta
    productName,
    additionalComponents = {},
    remarkPlugins = [],
    scope, // optional, I think?
    paramId = DEFAULT_PARAM_ID,
  } = {}
) {
  //  Read in the nav data, and resolve local filePaths
  const navData = await resolveNavData(navDataFile, localContentDir)
  // Build the currentPath from page parameters
  const currentPath = params[paramId] ? params[paramId].join('/') : ''
  //  Get the navNode that matches this path
  const navNode = getNodeFromPath(currentPath, navData, localContentDir)
  //  Set up the MDX content to re-hydrate client-side
  const { filePath } = navNode
  const mdxString = fs.readFileSync(path.join(process.cwd(), filePath), 'utf8')
  const { mdxSource, frontMatter } = await renderPageMdx(mdxString, {
    productName,
    additionalComponents,
    remarkPlugins,
    scope,
  })
  // Return all the props
  return { currentPath, frontMatter, mdxSource, navData }
}

async function validateNavData(navData, localContentDir) {
  const withFilePaths = await validateFilePaths(navData, localContentDir)
  // Note: validateRouteStructure returns navData with additional __stack properties,
  // which detail the path we've inferred for each branch and node
  // (branches do not have paths defined explicitly, so we need to infer them)
  // We don't actually need the __stack properties for rendering, they're just
  // used in validation, so we don't use the output of this function.
  validateRouteStructure(withFilePaths)
  // Return the resolved, validated navData
  return withFilePaths
}

function getNodeFromPath(pathToMatch, navData, localContentDir) {
  // If there is no path array, we return a
  // constructed "home page" node. This is just to
  // provide authoring convenience to not have to define
  // this node. However, we could ask for this node to
  // be explicitly defined in `navData` (and if it isn't,
  // then we'd render a 404 for the root path)
  const isLandingPage = pathToMatch === ''
  if (isLandingPage) {
    return {
      filePath: path.join(localContentDir, 'index.mdx'),
    }
  }
  //  If it's not a landing page, then we search
  // through our navData to find the node with a path
  // that matches the pathArray we're looking for.
  function flattenRoutes(nodes) {
    return nodes.reduce((acc, n) => {
      if (!n.routes) return acc.concat(n)
      return acc.concat(flattenRoutes(n.routes))
    }, [])
  }
  const allNodes = flattenRoutes(navData)
  const matches = allNodes.filter((n) => n.path === pathToMatch)
  // Throw an error for missing files - if this happens,
  // we might have an issue with `getStaticPaths` or something
  if (matches.length === 0) {
    throw new Error(`Missing resource to match "${pathToMatch}"`)
  }
  // Throw an error if there are multiple matches
  // If this happens, there's likely an issue in the
  // content source repo
  if (matches.length > 1) {
    throw new Error(
      `Ambiguous path matches for "${pathToMatch}". Found:\n\n${JSON.stringify(
        matches
      )}`
    )
  }
  //  Otherwise, we have exactly one match,
  //  and we can return the filePath off of it
  return matches[0]
}

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

export {
  generateStaticPaths,
  generateStaticProps,
  getNodeFromPath,
  getPathsFromNavData,
  validateNavData,
  validateFilePaths,
}
