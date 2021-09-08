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
    type: 'array',
    description: 'An array of data for displaying logos',
    control: { type: 'json' },
    properties: [
      {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          logo: { type: 'object', properties: image },
          integrationPage: { type: 'string' },
        },
      },
    ],
    defaultValue: [
      {
        name: 'Solo.io',
        description:
          'Gloo provides all the tools needed to glue together traditional and cloud-native apps.',
        link: '',
        integrationPage: { slug: '' },
        logo: {
          url:
            'https://www.datocms-assets.com/2885/1531117610-sknnx4wk400x4002.svg',
          format: 'svg',
        },
        monochromeLogo: {
          url:
            'https://www.datocms-assets.com/2885/1531120298-sknnx4wk400x400black.svg',
          format: 'svg',
        },
        whiteLogo: {
          url:
            'https://www.datocms-assets.com/2885/1531120304-sknnx4wk400x400white.svg',
          format: 'svg',
        },
      },
      {
        name: 'PostgreSQL',
        description:
          'PostgreSQL is a powerful, open source object-relational database system.',
        link: '',
        integrationPage: { slug: '' },
        logo: {
          url: 'https://www.datocms-assets.com/2885/1539818112-postgresql.svg',
          format: 'svg',
        },
        monochromeLogo: {
          url:
            'https://www.datocms-assets.com/2885/1539818117-postgresql-black.svg',
          format: 'svg',
        },
        whiteLogo: {
          url:
            'https://www.datocms-assets.com/2885/1539818125-postgresql-white.svg',
          format: 'svg',
        },
      },
      {
        name: 'AA Cloud',
        link: '',
        integrationPage: { slug: '' },
        logo: {
          url: 'https://www.datocms-assets.com/2885/1520536519-aa-cloud.png',
          format: 'png',
        },
        monochromeLogo: {
          url: 'https://www.datocms-assets.com/2885/1520536519-aa-cloud.png',
          format: 'png',
        },
        whiteLogo: {
          url: 'https://www.datocms-assets.com/2885/1520536519-aa-cloud.png',
          format: 'png',
        },
      },
      {
        name: 'Cumulus Technologies',
        description: 'Cumulus Technologies description.',
        link: '',
        integrationPage: { slug: '' },
        logo: {
          url: 'https://www.datocms-assets.com/2885/1519150128-kumulus.jpg',
          format: 'jpg',
        },
        monochromeLogo: {
          url: 'https://www.datocms-assets.com/2885/1519150128-kumulus.jpg',
          format: 'jpg',
        },
        whiteLogo: {
          url: 'https://www.datocms-assets.com/2885/1519150128-kumulus.jpg',
          format: 'jpg',
        },
      },
      {
        name: 'Magentys',
        description: 'Magentys description.',
        link: '',
        integrationPage: { slug: '' },
        logo: {
          url: 'https://www.datocms-assets.com/2885/1520536829-magentys.png',
          format: 'png',
        },
        monochromeLogo: {
          url: 'https://www.datocms-assets.com/2885/1520536829-magentys.png',
          format: 'png',
        },
        whiteLogo: {
          url: 'https://www.datocms-assets.com/2885/1520536829-magentys.png',
          format: 'png',
        },
      },
      {
        name: 'AWS',
        description: 'AWS description.',
        link: '',
        integrationPage: { slug: '' },
        logo: {
          url:
            'https://www.datocms-assets.com/2885/1510033601-aws_logo_rgb_fullcolor.svg',
          format: 'svg',
        },
        monochromeLogo: {
          url:
            'https://www.datocms-assets.com/2885/1510033601-aws_logo_rgb_blk.svg',
          format: 'svg',
        },
        whiteLogo: {
          url:
            'https://www.datocms-assets.com/2885/1510033601-aws_logo_rgb_wht.svg',
          format: 'svg',
        },
      },
      {
        name: 'Azure',
        description: 'Azure description.',
        link: '',
        integrationPage: { slug: '' },
        logo: {
          url:
            'https://www.datocms-assets.com/2885/1539799149-azure-stacked-color.svg',
          format: 'svg',
        },
        monochromeLogo: {
          url:
            'https://www.datocms-assets.com/2885/1539799149-azure-stacked-black.svg',
          format: 'svg',
        },
        whiteLogo: {
          url:
            'https://www.datocms-assets.com/2885/1539799149-azure-stacked-white.svg',
          format: 'svg',
        },
      },
      {
        name: 'MongoDB',
        description: 'MongoDB description.',
        link: '',
        integrationPage: { slug: '' },
        logo: {
          url: 'https://www.datocms-assets.com/2885/1506540175-color.svg',
          format: 'svg',
        },
        monochromeLogo: {
          url: 'https://www.datocms-assets.com/2885/1506540175-color.svg',
          format: 'svg',
        },
        whiteLogo: {
          url: 'https://www.datocms-assets.com/2885/1506540175-color.svg',
          format: 'svg',
        },
      },
      {
        name: 'Wide Placeholder',
        description: 'Wide Placeholder description.',
        link: '',
        integrationPage: { slug: '' },
        logo: {
          url: 'http://placehold.it/600x100.png',
          format: 'png',
        },
        monochromeLogo: {
          url: 'http://placehold.it/600x100.png',
          format: 'png',
        },
        whiteLogo: {
          url: 'http://placehold.it/600x100.png',
          format: 'png',
        },
      },
      {
        name: 'Tall Placeholder',
        description: 'Tall Placeholder description.',
        link: '',
        integrationPage: { slug: '' },
        logo: {
          url: 'http://placehold.it/100x600.png',
          format: 'png',
        },
        monochromeLogo: {
          url: 'http://placehold.it/100x600.png',
          format: 'png',
        },
        whiteLogo: {
          url: 'http://placehold.it/100x600.png',
          format: 'png',
        },
      },
      {
        name: 'Square Placeholder',
        description: 'Square Placeholder description.',
        link: '',
        integrationPage: { slug: '' },
        logo: {
          url: 'http://placehold.it/100x100.png',
          format: 'png',
        },
        monochromeLogo: {
          url: 'http://placehold.it/100x100.png',
          format: 'png',
        },
        whiteLogo: {
          url: 'http://placehold.it/100x100.png',
          format: 'png',
        },
      },
      {
        name: 'Tiny Placeholder',
        description: 'Tiny Placeholder description.',
        link: '',
        integrationPage: { slug: '' },
        logo: {
          url: 'http://placehold.it/20x20.png',
          format: 'png',
        },
        monochromeLogo: {
          url: 'http://placehold.it/20x20.png',
          format: 'png',
        },
        whiteLogo: {
          url: 'http://placehold.it/20x20.png',
          format: 'png',
        },
      },
      {
        name: 'AWS with Integration Link',
        description: 'AWS with Integration Link description.',
        link: '',
        integrationPage: { slug: 'aws' },
        logo: {
          url:
            'https://www.datocms-assets.com/2885/1510033601-aws_logo_rgb_fullcolor.svg',
          format: 'svg',
        },
        monochromeLogo: {
          url:
            'https://www.datocms-assets.com/2885/1510033601-aws_logo_rgb_blk.svg',
          format: 'svg',
        },
        whiteLogo: {
          url:
            'https://www.datocms-assets.com/2885/1510033601-aws_logo_rgb_wht.svg',
          format: 'svg',
        },
      },
    ],
  },
  color: {
    type: 'string',
    options: ['monochrome', 'white'],
    control: { type: 'select' },
    description:
      'Color modifier for logos - make sure all logos have the selected color in the data',
  },
  size: {
    type: 'string',
    options: ['small', 'medium', 'large'],
    control: { type: 'select' },
    description: 'Display size of the logos within the grid',
    default: 'small',
  },
  removeBorders: {
    type: 'boolean',
    description: 'If true, borders around logo items will be removed',
    control: { type: 'checkbox', value: false },
  },
  hashUrl: {
    type: 'boolean',
    description: 'If true, hashes the url with the company slug when clicked',
    control: { type: 'checkbox', value: false },
  },
  integrationLink: {
    type: 'boolean',
    description:
      'If true, links to integration pages are enabled if an item has a valid `data.integrationPage` property. It will override `details` if true',
    control: { type: 'checkbox', value: false },
  },
  details: {
    type: 'boolean',
    description:
      'If true, creates a popup with company details when a logo is clicked',
    control: { type: 'checkbox', value: false },
  },
  className: {
    type: 'string',
    description: 'Optional className to render on the root element',
  },
}
