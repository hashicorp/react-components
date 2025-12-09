/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

module.exports = {
  formId: {
    type: 'number',
    required: true,
    description:
      'The numeric ID of the Marketo form that this component is rendering.',
  },
  marketoForm: {
    type: 'object',
    required: true,
    description:
      'The API response containing the fields of the form this component should render.',
  },
  groups: {
    type: 'object',
    description:
      'Mapping of fields that should be rendered with a single component.',
  },
  components: {
    type: 'object',
    description: 'Custom components to use instead of the built-in components',
    properties: {
      text: {
        type: 'React.ComponentType',
        description: 'Component to use for text fields',
      },
      email: {
        type: 'React.ComponentType',
        description: 'Component to use for email fields',
      },
      select: {
        type: 'React.ComponentType',
        description: 'Component to use for select fields',
      },
      checkbox: {
        type: 'React.ComponentType',
        description: 'Component to use for checkbox fields',
      },
      hidden: {
        type: 'React.ComponentType',
        description: 'Component to use for hidden fields',
      },
    },
  },
  submitTitle: {
    type: 'string',
    description: 'Title to use for the submit button',
  },
  className: {
    type: 'string',
    description: 'Additional classNames passed to the form element.',
  },
  onSubmitSuccess: {
    type: 'function',
    description: 'Callback function invoked on submission success',
  },
  onSubmitFailure: {
    type: 'function',
    description: 'Callback function invoked on submission failure',
  },
}
