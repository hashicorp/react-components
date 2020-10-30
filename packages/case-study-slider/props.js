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
    description: 'Data for the case study slider',
    properties: {
      caseStudies: {
        type: 'array',
        description: 'Collection of case study objects',
        properties: [
          {
            type: 'object',
            properties: {
              company: {
                type: 'object',
                description:
                  'object containing a company logo, typically returned directly from nextjs',
                properties: {
                  monochromeLogo: {
                    type: 'object',
                    description: 'black/gray logo',
                    properties: image,
                  },
                  whiteLogo: {
                    type: 'object',
                    description: 'white logo',
                    properties: image,
                  },
                },
              },
              headline: {
                type: 'string',
                description: 'headline text',
              },
              description: {
                type: 'string',
                description: 'body text under the deadline',
              },
              caseStudyResource: {
                slug: {
                  type: 'string',
                  description: 'slug returned from the CMS',
                },
                image: {
                  type: 'object',
                  description: 'case study resource image',
                  properties: image,
                },
              },
              caseStudyImage: {
                type: 'object',
                description: 'image representing a linked case study',
                properties: image,
              },
              buttonLabel: {
                type: 'string',
                description: 'overrides the button text',
              },
            },
          },
        ],
      },
    },
    testValue: {
      caseStudies: [
        {
          company: {
            monochromeLogo: {
              url:
                'https://www.datocms-assets.com/2885/1538067560-proofpoint-logo-reg-k.png',
              alt: 'Logo dark',
              format: 'png',
            },
            whiteLogo: {
              url:
                'https://www.datocms-assets.com/2885/1538067567-proofpoint-logo-reg-reversed.png',
              alt: 'Logo white',
              format: 'png',
            },
          },
          headline: 'This is the first case study',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut arcu justo, et convallis lectus. Sed commodo massa eget risus feugiat suscipit. ',
          caseStudyResource: {
            slug: 'https://www.hashicorp.com',
            image: {
              url:
                'https://www.datocms-assets.com/2885/1538142087-ye-endahl.jpg',
              alt: 'Test image',
              format: 'jpg',
            },
          },
          buttonLabel: 'Custom Label',
        },
        {
          company: {
            monochromeLogo: {
              url:
                'https://www.datocms-assets.com/2885/1524097005-adobe-black-1.svg',
              alt: 'Logo dark',
              format: 'svg',
            },
            whiteLogo: {
              url:
                'https://www.datocms-assets.com/2885/1524097013-adobe-white-1.svg',
              alt: 'Logo white',
              format: 'svg',
            },
          },
          headline: 'This is the second case study',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut arcu justo, et convallis lectus. Sed commodo massa eget risus feugiat suscipit. Nulla velit lectus, imperdiet cursus tempor at, ',
          caseStudyResource: {
            slug: 'https://www.hashicorp.com',
            image: {
              url:
                'https://www.datocms-assets.com/2885/1538233406-wa-6h7-400x400.jpg',
              alt: 'Test image',
              format: 'jpg',
            },
          },
        },
        {
          company: {
            monochromeLogo: {
              url: 'https://www.datocms-assets.com/2885/1535495419-black.png',
              alt: 'Logo dark',
              format: 'png',
            },
            whiteLogo: {
              url: 'https://www.datocms-assets.com/2885/1535495424-white.png',
              alt: 'Logo white',
              format: 'png',
            },
          },
          headline: 'This is the third case study',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut arcu justo, et convallis lectus. Sed commodo massa eget risus feugiat suscipit. Nulla velit lectus, ',
          caseStudyResource: {
            slug: 'https://www.hashicorp.com',
            image: {
              url:
                'https://www.datocms-assets.com/2885/1535120026-36755049704aeaabe64ddk.jpg',
              alt: 'Test image',
              format: 'jpg',
            },
          },
          caseStudyImage: {
            url:
              'https://www.datocms-assets.com/2885/1535120026-36755049704aeaabe64ddk.jpg',
            alt: 'Case Study image override',
            format: 'jpg',
          },
        },
      ],
    },
  },
  timing: {
    type: 'integer',
    description: 'Slider timing in seconds',
    testValue: 10,
  },
  dark: {
    type: 'boolean',
    description: 'Controls color of some elements - button and progress bars',
    testValue: false,
  },
}
