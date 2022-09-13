module.exports = {
  children: {
    description: 'The text that appears inside the link.',
    type: 'string',
    control: { type: 'text' },
    testValue: 'New',
    required: true,
  },
  href: {
    description: '',
    required: true,
  },
  variant: {
    description: '',
    type: 'string',
    control: { type: 'text' },
    testValue: 'New',
    required: false,
  },
}
