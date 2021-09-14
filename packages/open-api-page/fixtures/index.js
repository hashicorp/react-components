import PackerSwagger from './generated/packer.swagger.json'
import BoundarySwagger from './generated/boundary.swagger.json'
import { getPropsForPage } from '../utils/routing-utils'
import Aside from '../../aside'

const Packer = {
  ...getPropsForPage(PackerSwagger, { page: ['iteration-service'] }),
  productSlug: 'packer',
  renderOperationIntro: function PathAside({ data }) {
    return (
      <Aside>
        <strong>Note:</strong> Operation paths have been truncated for clarity.
        They should be prefixed with
        <code
          style={{ wordBreak: 'break-all' }}
        >{`/packer/2021-04-30/organizations/{location.organization_id}/projects/{location.project_id}`}</code>
        . The full path to this operation is:{' '}
        <pre>
          <code>{data.__path}</code>
        </pre>
      </Aside>
    )
  },
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
