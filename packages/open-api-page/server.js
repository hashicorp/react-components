import { capitalCase } from 'change-case'
import {
  getServicePathSlug,
  getOperationObjects,
  getServiceId,
  getServiceIds,
} from './utils'

/**
 * Given a schema, current service slug, and parentPath,
 * return all props needed for an openapi component page.
 *
 * @param {*} schema
 * @param {*} params
 * @returns
 */
function getPropsForPage(schema, params) {
  // parse the data we'll show to the user from the schema
  const operationObjects = getOperationObjects(schema)
  const serviceIds = getServiceIds(operationObjects)
  // info and sidenav data are needed on all pages
  const info = schema.info
  const navData = serviceIds.map((serviceId) => {
    return {
      title: capitalCase(serviceId),
      indexData: true,
      path: getServicePathSlug(serviceId),
    }
  })
  const isSingleService = navData.length == 1
  // If there's no "page" param, then this is the landing page
  const isLanding = !params || !params.page || params.page.length == 0

  const currentPath = params && params.page ? params.page.join('/') : ''

  // Otherwise, we should have an operationCategory that matches the slug-ified ID from the URL path
  const targetServiceId = isSingleService
    ? getServicePathSlug(serviceIds[0])
    : params.page[0]
  const operationCategory = isLanding
    ? false
    : serviceIds
        .filter((id) => getServicePathSlug(id) === targetServiceId)
        .map((serviceId) => {
          const name = capitalCase(serviceId)
          const slug = getServicePathSlug(serviceId)
          const operations = operationObjects.filter(
            (o) => getServiceId(o) === serviceId
          )
          return { name, slug, operations }
        })[0]
  return { info, navData, isSingleService, operationCategory, currentPath }
}

/**
 * Given a schema,
 * return all the paths we'll render for our openapi generated docs
 *
 * @param {*} schema
 * @returns
 */
function getPathsFromSchema(schema) {
  // Assign each operation category to a URL using its slug-ified ID
  const operationObjects = getOperationObjects(schema)
  const slugs = getServiceIds(operationObjects).map(getServicePathSlug)
  // If this is a single service, just return an index page
  const isSingleService = slugs.length === 1
  if (isSingleService) return [{ params: { page: [] } }]
  // Otherwise, return path entries for each service, as well
  // as well as an index path entry
  // We need a path for each "service"
  const paths = slugs.map((slug) => ({ params: { page: [slug] } }))
  paths.push({ params: { page: [] } })
  return paths
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getPropsForPage, getPathsFromSchema, getServiceIds }
export { getPropsForPage, getPathsFromSchema, getServiceIds }
