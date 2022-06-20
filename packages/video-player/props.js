module.exports = {
  url: {
    required: true,
    description: 'The URL for the video.',
  },
  theme: {
    required: false,
    description:
      'Optional theme that modifies the players controls based on the choosen theme. Defaults to `primary`',
    options: ['primary', 'neutral'],
  },
}
