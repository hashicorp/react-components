module.exports = {
  children: {
    type: 'function',
    description: 'Children to render into the Alert block.',
    required: true,
  },
  type: {
    type: 'string',
    description:
      'The type of message being displayed, which mainly affects coloration. Defaults to "info".',
    control: { type: 'select' },
    options: ['info', 'success', 'warning', 'danger'],
    required: false,
  },
  className: {
    type: 'function',
    description: 'Optional className to add to the root element.',
  },
}
