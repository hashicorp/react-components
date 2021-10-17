import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import OpenApiPage from '../../../../packages/open-api-page'
import PackerSwagger from '../../../../packages/open-api-page/fixtures/generated/packer.swagger.json'
import BoundarySwagger from '../../../../packages/open-api-page/fixtures/generated/boundary.swagger.json'
import { getPropsForPage } from '../../../../packages/open-api-page/server'
import Aside from '../../../../packages/aside'
import CodeBlock from '../../../../packages/code-block'

function StaticPropsDecorator(Story, { args }) {
  const { swaggerJson, pageSlug, options, ...restArgs } = args
  const staticProps = getPropsForPage(
    swaggerJson,
    { page: [pageSlug] },
    options
  )
  return <Story args={{ ...staticProps, ...restArgs }} />
}

export default {
  title: 'Components/OpenApiPage',
  component: OpenApiPage,
  decorators: [StaticPropsDecorator],
} as ComponentMeta<typeof OpenApiPage>

const Template: ComponentStory<typeof OpenApiPage> = (args) => {
  return <OpenApiPage {...args} />
}

/* Basic Example */
export const Packer = Template.bind({})
Packer.args = {
  options: { forceSidebar: false },
  swaggerJson: PackerSwagger,
  pageSlug: 'packer-service',
  productSlug: 'packer',
  renderOperationIntro: function PathAside({ data }) {
    return (
      <Aside>
        <strong>Note:</strong> Operation paths have been truncated for clarity.
        The full path to this operation is:
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

export const Boundary = Template.bind({})
Boundary.args = {
  swaggerJson: BoundarySwagger,
  pageSlug: 'account-service',
  productSlug: 'boundary',
}
