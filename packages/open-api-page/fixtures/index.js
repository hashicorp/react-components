import PackerSwagger from './generated/packer.swagger.json'
import BoundarySwagger from './generated/boundary.swagger.json'
import { getPropsForPage } from '../utils/routing-utils'
import Aside from '../../aside'
import CodeBlock from '../../code-block'

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
        . The full path to this operation is:
        <div style={{ marginBottom: '1rem' }} />
        <CodeBlock
          code={data.__path}
          theme="dark"
          options={{ showClipboard: true }}
        />
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
