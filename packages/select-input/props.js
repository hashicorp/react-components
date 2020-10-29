{
  name: {
    type: 'string',
    description: 'input name attribute',
    defaultValue: 'selection',
  },
  label: {
    type: 'string',
    description: 'text to display above the input',
    defaultValue: 'Label',
  },
  defaultLabel: {
    type: 'string',
    description: 'text to act as placeholder label',
    defaultValue: 'Placeholder',
  },
  value: {
    type: 'object',
    description: 'set the value via prop',
    // sub-properties
    name: {
      type: 'string',
      description: 'programmatic name of the option',
    },
    label: {
      type: 'string',
      description: 'visual, human-readable name of the option',
    },
  },
  options: {
    type: 'array',
    description: 'array of option objects within the select',
    itemType: '{ name: string, label: string }',
    required: true,
    defaultValue: [
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
