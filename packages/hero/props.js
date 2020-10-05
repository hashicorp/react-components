const props = {}
props.default = [
  {
    name: 'data',
    type: 'json',
    description: 'JSON data for the footer',
    value: {
      centered: false,
      backgroundTheme: 'dark',
      theme: 'nomad-green',
      backgroundImage: {
        url:
          'https://www.datocms-assets.com/2885/1538522323-vault-grid-background.jpg',
        format: 'svg',
        alt: 'terraform background'
      },
      smallTextTag: null,
      titleLogo: {
        url:
          'https://www.datocms-assets.com/2885/1512161155-terraform-color.svg',
        format: 'svg',
        alt: 'terraform logo'
      },
      alert: {
        url: '#',
        tag: 'NEW',
        tagColor: 'error-red',
        text: 'Some notification'
      },
      title: 'Testing 123',
      description:
        'Lorem ipsum dolor sit amet, consectetur amet adipiscing elit dolor lorem.',
      formLeadInput: { destinationUrl: '#', buttonText: 'Submit' },
      buttons: [
        {
          title: 'Download',
          url: '#',
          external: false,
          theme: '',
          gaPrefix: null
        },
        {
          title: 'Get Started',
          url: '#',
          external: false,
          theme: '',
          gaPrefix: null
        }
      ],
      helpText: '<a href="#">View demo of web UI</a>',
      videos: [
        {
          name: 'UI',
          playbackRate: 2,
          src: [
            {
              srcType: 'ogg'
            },
            {
              srcType: 'webm',
              url: ''
            },
            {
              srcType: 'mp4',
              url:
                '//consul-static-asssets.global.ssl.fastly.net/videos/v1/connect-video-ui.mp4'
            }
          ]
        },
        {
          name: 'CLI',
          src: [
            {
              srcType: 'mp4',
              url:
                '//consul-static-asssets.global.ssl.fastly.net/videos/v1/connect-video-cli.mp4'
            }
          ]
        }
      ]
    }
  },
  {
    name: 'centered',
    type: 'boolean',
    description: 'Whether or not to center the hero content',
    value: false
  },
  {
    name: 'gaPrefix',
    type: 'string',
    description: 'prefix override for CTA custom events',
    value: null
  }
]

props.variants = [
  {
    name: 'Light theme',
    props: [
      {
        name: 'data',
        value: {
          centered: false,
          backgroundTheme: 'light',
          theme: 'nomad-green',
          smallTextTag: null,
          titleLogo: {
            url:
              'https://www.datocms-assets.com/2885/1512161155-terraform-color.svg',
            format: 'svg',
            alt: 'terraform logo'
          },
          alert: {
            url: '#',
            tag: 'NEW',
            tagColor: 'error-red',
            text: 'Some notification'
          },
          title: 'Testing 123',
          description:
            'Lorem ipsum dolor sit amet, consectetur amet adipiscing elit dolor lorem.',
          formLeadInput: { destinationUrl: '#', buttonText: 'Submit' },
          buttons: [
            {
              title: 'Download',
              url: '#',
              external: false,
              theme: '',
              gaPrefix: null
            },
            {
              title: 'Get Started',
              url: '#',
              external: false,
              theme: '',
              gaPrefix: null
            }
          ],
          helpText: '<a href="#">View demo of web UI</a>',
          videos: [
            {
              name: 'UI',
              playbackRate: 2,
              src: [
                {
                  srcType: 'ogg'
                },
                {
                  srcType: 'webm',
                  url: ''
                },
                {
                  srcType: 'mp4',
                  url:
                    '//consul-static-asssets.global.ssl.fastly.net/videos/v1/connect-video-ui.mp4'
                }
              ]
            },
            {
              name: 'CLI',
              src: [
                {
                  srcType: 'mp4',
                  url:
                    '//consul-static-asssets.global.ssl.fastly.net/videos/v1/connect-video-cli.mp4'
                }
              ]
            }
          ]
        }
      }
    ]
  },
  {
    name: 'Centered, plain',
    props: [
      {
        name: 'data',
        value: {
          backgroundTheme: 'dark',
          theme: 'nomad-green',
          backgroundImage: {
            url:
              'https://www.datocms-assets.com/2885/1538522323-vault-grid-background.jpg',
            format: 'svg',
            alt: 'terraform background'
          },
          smallTextTag: null,
          title: 'Testing 123',
          description:
            'Lorem ipsum dolor sit amet, consectetur amet adipiscing elit dolor lorem.'
        }
      },
      { name: 'centered', value: true }
    ]
  },
  {
    name: 'Centered, plain with image',
    props: [
      {
        name: 'data',
        value: {
          backgroundTheme: 'dark',
          theme: 'nomad-green',
          backgroundImage: {
            url:
              'https://www.datocms-assets.com/2885/1538522323-vault-grid-background.jpg',
            format: 'svg',
            alt: 'terraform background'
          },
          image: {
            url:
              'https://www.datocms-assets.com/2885/1529968639-intro-consul-armon-dadgar-hashicorp-video-overview.jpg',
            format: 'jpg',
            alt: 'product stack'
          },
          smallTextTag: null,
          title: 'Testing 123',
          description:
            'Lorem ipsum dolor sit amet, consectetur amet adipiscing elit dolor lorem.'
        }
      },
      { name: 'centered', value: true }
    ]
  },
  {
    name: 'Centered, buttons, markdown, tag line',
    props: [
      {
        name: 'data',
        value: {
          backgroundTheme: 'dark',
          theme: 'nomad-green',
          backgroundImage: {
            url:
              'https://www.datocms-assets.com/2885/1538522323-vault-grid-background.jpg',
            format: 'svg',
            alt: 'terraform background'
          },
          smallTextTag: 'I am a small text tag.',
          title: '**Markdown headline**',
          description:
            '*Lorem ipsum dolor sit amet, consectetur amet adipiscing elit dolor lorem.*',
          helpText: '_Markdown help text_',
          buttons: [
            {
              title: 'Download',
              url: '#',
              external: false,
              theme: '',
              gaPrefix: null
            },
            {
              title: 'Get Started',
              url: '#',
              external: false,
              theme: '',
              gaPrefix: null
            },
            {
              title: 'Learn More',
              url: '#',
              external: false,
              theme: '',
              gaPrefix: null
            }
          ]
        }
      },
      { name: 'centered', value: true }
    ]
  }
]

props.name = 'Hero'
export default props
