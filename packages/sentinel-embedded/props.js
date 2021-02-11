module.exports = {
  exampleId: {
    type: 'string',
    description: 'An ID to load a saved example',
  },
  exampleData: {
    type: 'object',
    description: 'Data to present in the playground',
    policy: {
      type: 'string',
      description: 'Sentinel policy for the example',
    },
    mocks: {
      type: 'object',
      descriptions: 'Module mocks for the example',
    },
    globals: {
      type: 'object',
      description: 'Globals for the example',
    },
    parameters: {
      type: 'object',
      description: 'Parameters for the example',
    },
  },
  height: {
    type: 'string',
    description: 'The height of the playground',
  },
  policyPathContent: {
    type: 'string',
    description: 'Content to be provided as the policy',
  },
}
