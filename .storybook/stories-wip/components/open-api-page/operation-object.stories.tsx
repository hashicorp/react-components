import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import OperationObject from '../../../../packages/open-api-page/partials/operation-object'

function ControlDecorator(Story, { args }) {
  const [isCollapsed, setIsCollapsed] = useState(true)
  return (
    <div style={{ position: 'relative', padding: '1rem' }}>
      <Story args={{ ...args, isCollapsed, setIsCollapsed }} />
    </div>
  )
}

export default {
  title: 'Components/OpenApiPage/OperationObject',
  component: OperationObject,
} as ComponentMeta<typeof OperationObject>

const Template: ComponentStory<typeof OperationObject> = (args) => {
  return <OperationObject {...args} />
}

export const GetOperation = Template.bind({})
GetOperation.decorators = [ControlDecorator]
GetOperation.args = {
  path: '/builds/{build_id}',
  type: 'get',
  data: {
    summary:
      'TODO: make it possible to query by iteration.incremental_version, not just ULID',
    operationId: 'BuildService_GetBuild',
    responses: {
      '200': {
        description: 'A successful response.',
        schema: {
          type: 'object',
          properties: {
            build: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  title: 'ULID',
                },
                iteration_id: {
                  type: 'string',
                  title: 'ULID of the iteration',
                },
                component_type: {
                  type: 'string',
                  title: 'builder or post-processor used to build this',
                },
                packer_run_uuid: {
                  type: 'string',
                },
                images: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        title: 'ULID for the image',
                      },
                      image_id: {
                        type: 'string',
                        description:
                          'ID or URL of the remote cloud image as given by a build.',
                      },
                      region: {
                        type: 'string',
                        title:
                          'region as given by `packer build`. eg. "ap-east-1"',
                      },
                      created_at: {
                        type: 'string',
                        format: 'date-time',
                        title: 'Timestamp at which this image was created',
                      },
                    },
                    description:
                      'Represents the actual region:image_id mapping for a single image, in a\nsingle build.',
                  },
                },
                cloud_provider: {
                  type: 'string',
                  title: 'aws',
                },
                status: {
                  type: 'string',
                  enum: ['UNSET', 'RUNNING', 'DONE', 'CANCELLED', 'FAILED'],
                  default: 'UNSET',
                  title:
                    '- UNSET: UNSET is a sentinel zero value so that an uninitialized value can be\ndetected.\n - RUNNING: Running means the Packer build is currently running\n - DONE: Done means the Packer build has finished successfully\n - CANCELLED: Cancelled means the Packer build was cancelled by a user\n - FAILED: Failed means the Packer build and therefore iteration creation failed',
                },
                created_at: {
                  type: 'string',
                  format: 'date-time',
                },
                updated_at: {
                  type: 'string',
                  format: 'date-time',
                },
                labels: {
                  type: 'object',
                  additionalProperties: {
                    type: 'string',
                  },
                  title: 'unstructured metadata',
                },
              },
            },
          },
        },
      },
    },
    parameters: [
      {
        name: 'location.organization_id',
        description: 'organization_id is the id of the organization.',
        in: 'path',
        required: true,
        type: 'string',
      },
      {
        name: 'location.project_id',
        description: 'project_id is the projects id.',
        in: 'path',
        required: true,
        type: 'string',
      },
      {
        name: 'build_id',
        description: 'build ULID',
        in: 'path',
        required: true,
        type: 'string',
      },
      {
        name: 'location.region.provider',
        description:
          'provider is the named cloud provider ("aws", "gcp", "azure").',
        in: 'query',
        required: false,
        type: 'string',
      },
      {
        name: 'location.region.region',
        description: 'region is the cloud region ("us-west1", "us-east1").',
        in: 'query',
        required: false,
        type: 'string',
      },
    ],
    tags: ['PackerService'],
  },
}

export const DeleteOperation = Template.bind({})
DeleteOperation.decorators = [ControlDecorator]
DeleteOperation.args = {
  path: '/v1/accounts/{id}',
  type: 'delete',
  data: {
    summary: 'Deletes an Account.',
    operationId: 'AccountService_DeleteAccount',
    responses: {
      '200': {
        description: 'A successful response.',
        schema: {
          type: 'object',
        },
      },
    },
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        type: 'string',
      },
    ],
    tags: ['controller.api.services.v1.AccountService'],
  },
}
