module.exports = {
  avatar: {
    type: 'string',
    description: 'url of the image',
  },
  name: {
    type: 'string',
    required: true,
    description: '',
  },
  role: {
    type: 'string',
    required: true,
    description: '',
  },
  variant: {
    type: 'string',
    options: ['light', 'dark'],
  },
}
