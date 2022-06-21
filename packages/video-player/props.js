module.exports = {
  url: {
    required: true,
    description: 'The URL for the video.',
  },
  autoplay: {
    required: false,
    description:
      'Autoplay the video when mounted. Used when rendering video within a modal. Will not work on iOS and other mobile devices due to restrictions on bandwidth on cellular networks.',
  },
  theme: {
    required: false,
    description:
      'Optional theme that modifies the players controls based on the choosen theme. Defaults to `primary`',
    options: ['primary', 'neutral'],
  },
}
