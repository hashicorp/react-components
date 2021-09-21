const image = {
  url: {
    type: 'string',
    description: 'url of the image',
  },
  alt: {
    type: 'string',
    description: 'alt text for the image',
  },
  format: {
    type: 'string',
    description: 'format of the image, like "jpg" or "svg"',
  },
}

module.exports = {
  data: {
    type: 'object',
    description: 'All of the data for the hero',
    properties: {
      title: {
        type: 'string',
        description: 'Primary title text',
      },
      description: {
        type: 'string',
        description: 'Subheading text, HTML allowed',
      },
      centered: {
        type: 'boolean',
        description: 'Whether or not to center the contents',
      },
      product: {
        type: 'string',
        options: [
          'hashicorp',
          'boundary',
          'consul',
          'nomad',
          'packer',
          'terraform',
          'vault',
          'vagrant',
          'waypoint',
        ],
        description: 'Color theme of links, buttons, highlights',
      },
      backgroundTheme: {
        type: 'string',
        options: ['dark', 'light'],
        description:
          'Adjust the text color if its over a dark or light background image',
      },
      backgroundImage: {
        type: 'object',
        description: 'sets the background image of the hero',
        properties: image,
      },
      smallTextTag: {
        type: 'string',
        description:
          'A small section of text that appears on top of the primary headline if present',
      },
      titleLogo: {
        type: 'object',
        description:
          'A small logo intended to appear above the primary headline',
        properties: image,
      },
      alert: {
        type: 'object',
        description:
          'An `Alert` component, displays above the primary headline.',
        properties: {
          url: { type: 'string' },
          tagColor: { type: 'string' },
          text: { type: 'string' },
        },
      },
      formLeadInput: {
        type: 'object',
        description:
          'A single-field form intended to capture emails, appears below the headline, description, and buttons',
        properties: {
          destinationUrl: { type: 'string' },
          buttonText: { type: 'string' },
        },
      },
      buttons: {
        type: 'array',
        description:
          'Array of buttons to display below the title and subtitle as the primary calls to action. All props match those of the `<Button>` component.',
        // TODO: import the button props.js and drop it here?
        properties: [
          {
            type: 'object',
            properties: {
              title: { type: 'string' },
              url: { type: 'string' },
              external: { type: 'boolean' },
              theme: { type: 'string' },
            },
          },
        ],
      },
      helpText: {
        type: 'string',
        description:
          'A small piece of help text that appears below buttons/form input, HTML allowed',
      },
      image: {
        type: 'object',
        description: 'sets an image to the right of the text',
        properties: image,
      },
      videos: {
        type: 'array',
        description:
          'One or more videos to play to the right of the text and buttons. Videos should have an aspect ratio of about 5:9. Typically dimensions are 1150 px wide by 660 px tall. ',
        properties: [
          {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'name of the video displayed in the UI',
              },
              playbackRate: {
                type: 'number',
                description:
                  'integer indicating the playback rate, with 1 being the default',
              },
              src: {
                type: 'array',
                description: 'one or more video sources',
                properties: [
                  {
                    type: 'object',
                    properties: { srcType: 'string', url: 'string' },
                  },
                ],
              },
            },
          },
        ],
      },
    },
    testValue: {
      title: 'Testing 123',
      description:
        'Lorem ipsum dolor sit amet, consectetur amet adipiscing elit dolor lorem.',
      centered: false,
      backgroundTheme: 'dark',
      theme: 'nomad-green',
      backgroundImage: {
        url:
          'https://www.datocms-assets.com/2885/1538522323-vault-grid-background.jpg',
        format: 'svg',
        alt: 'terraform background',
      },
      smallTextTag: null,
      titleLogo: {
        url:
          'https://www.datocms-assets.com/2885/1512161155-terraform-color.svg',
        format: 'svg',
        alt: 'terraform logo',
      },
      alert: {
        url: '#',
        tag: 'NEW',
        tagColor: 'error-red',
        text: 'Some notification',
      },
      formLeadInput: { destinationUrl: '#', buttonText: 'Submit' },
      buttons: [
        {
          title: 'Download',
          url: '#',
          external: false,
          theme: '',
          gaPrefix: null,
        },
        {
          title: 'Get Started',
          url: '#',
          external: false,
          theme: '',
          gaPrefix: null,
        },
      ],
      helpText: '<a href="#">View demo of web UI</a>',
      videos: [
        {
          name: 'UI',
          playbackRate: 2,
          src: [
            {
              srcType: 'ogg',
            },
            {
              srcType: 'webm',
              url: '',
            },
            {
              srcType: 'mp4',
              url:
                '//consul-static-asssets.global.ssl.fastly.net/videos/v1/connect-video-ui.mp4',
            },
          ],
        },
        {
          name: 'CLI',
          src: [
            {
              srcType: 'mp4',
              url:
                '//consul-static-asssets.global.ssl.fastly.net/videos/v1/connect-video-cli.mp4',
            },
          ],
        },
      ],
    },
  },
  centered: {
    type: 'boolean',
    description: 'Whether or not to center the hero content',
    testValue: false,
  },
  videoControlsTop: {
    type: 'boolean',
    description:
      'If true, video controls will be shown above videos, rather than below.',
    testValue: false,
  },
  className: {
    type: 'string',
    description: 'Optional className to add to the root element.',
  },
  gaPrefix: {
    type: 'string',
    description: 'prefix override for CTA custom events',
  },
}
