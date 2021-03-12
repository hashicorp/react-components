module.exports = {
  name: {
    type: 'string',
    description: 'input name attribute',
    testValue: 'selection',
  },
  label: {
    type: 'string',
    description: 'text to display above the input',
    testValue: 'Label',
  },
  defaultLabel: {
    type: 'string',
    description: 'text to act as placeholder label',
    testValue: 'Placeholder',
  },
  size: {
    type: 'string',
    description: 'Controls font size and size of the element',
    testValue: 'medium',
    control: { type: 'select' },
    options: ['small', 'medium'],
  },
  value: {
    type: 'object',
    description: 'set the value via prop',
    properties: {
      name: {
        type: 'string',
        description: 'programmatic name of the option',
      },
      label: {
        type: 'string',
        description: 'visual, human-readable name of the option',
      },
    },
  },
  options: {
    type: 'array',
    description: 'array of option objects within the select',
    properties: [
      {
        type: 'object',
        properties: {
          name: { type: 'string' },
          label: { type: 'string' },
        },
      },
    ],
    required: true,
    testValue: [
      {
        name: '1',
        label: 'One',
      },
      {
        name: '2',
        label: 'Two',
      },
      {
        name: '3',
        label: 'Three',
      },
    ],
  },
  onValueChange: {
    type: 'function',
    description: 'function called with the value when it',
  },
}
