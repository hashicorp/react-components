const Basic = {
  data: {
    title: 'Testing',
    description: 'Etiam porta sem malesuada magna mollis euismod.',
    product: 'consul',
    backgroundImage: {
      url:
        'https://www.datocms-assets.com/2885/1538522323-vault-grid-background.jpg',
      format: 'svg',
      alt: 'terraform background',
    },
    buttons: [
      { title: 'Download', url: '#' },
      {
        title: 'Get Started',
        url: '#',
        theme: { variant: 'tertiary' },
        linkType: 'inbound',
      },
    ],
    videos: [
      {
        name: 'UI',
        playbackRate: 2,
        src: [
          {
            srcType: 'mp4',
            url: 'https://www.datocms-assets.com/2885/1621637919-consul-ui.mp4',
          },
        ],
      },
      {
        name: 'CLI',
        playbackRate: 2,
        src: [
          {
            srcType: 'mp4',
            url:
              'https://www.datocms-assets.com/2885/1621637930-consul-cli.mp4',
          },
        ],
      },
    ],
  },
}

const Boundary = {
  videoControlsFirst: true,
  data: {
    product: 'boundary',
    title: 'Simple and secure remote access',
    description: 'Access any system from anywhere based on user identity.',
    buttons: [
      {
        title: 'Get Started',
        url: 'https://learn.hashicorp.com/collections/boundary/getting-started',
        external: true,
      },
      {
        title: 'Boundary Desktop',
        url: '/downloads#desktop',
        linkType: 'inbound',
        theme: { variant: 'tertiary' },
      },
    ],
    backgroundTheme: 'light',
    centered: false,
    videos: [
      {
        name: 'UI',
        playbackRate: 2,
        src: [
          {
            srcType: 'mp4',
            url: 'https://www.datocms-assets.com/2885/1614100050-hero-ui.mp4',
          },
        ],
      },
      {
        name: 'CLI',
        aspectRatio: 0.62295082,
        playbackRate: 1,
        src: [
          {
            srcType: 'mp4',
            url: 'https://www.datocms-assets.com/2885/1614100038-hero-cli.mp4',
          },
        ],
      },
      {
        name: 'Desktop',
        aspectRatio: 0.59968354,
        playbackRate: 1,
        src: [
          {
            srcType: 'mp4',
            url:
              'https://www.datocms-assets.com/2885/1614100044-hero-desktop.mp4',
          },
        ],
      },
    ],
  },
}

export default { Basic, Boundary }
