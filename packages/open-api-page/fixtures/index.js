import PackerSwagger from './generated/packer.swagger.json'
import BoundarySwagger from './generated/boundary.swagger.json'
import { getPropsForPage } from '../utils/routing-utils'

// TODO: dereference swagger JSON.
// Has to be done async, so may have be done in a decorator
// within the actual story.

const Packer = {
  ...getPropsForPage(PackerSwagger, { page: ['build-service'] }),
  productSlug: 'packer',
  massageOperationPathFn: (path) =>
    path.replace(
      '/packer/2021-04-30/organizations/{location.organization_id}/projects/{location.project_id}',
      ''
    ),
}

const Boundary = {
  ...getPropsForPage(BoundarySwagger, { page: ['account-service'] }),
  productSlug: 'boundary',
}

const defaultExport = { Boundary, Packer }
export default defaultExport
export { Boundary, Packer }
