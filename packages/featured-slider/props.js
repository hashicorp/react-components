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
  heading: {
    type: 'string',
    description: 'text displayed in the primary heading',
    control: { type: 'text' },
  },
  theme: {
    type: 'string',
    description:
      'used to control whether the component appears on a light or dark background',
    control: { type: 'select' },
    options: ['light', 'dark'],
  },
  product: {
    type: 'string',
    description: 'Product-centric brand theme accents, if necessary',
    control: { type: 'select' },
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
  },
  features: {
    type: 'array',
    description: 'The actual "features" rendered by the component',
    properties: [
      {
        type: 'object',
        properties: {
          heading: { type: 'string', description: 'title of the feature' },
          content: {
            type: 'string',
            description: 'text content of the feature, html accepted',
          },
          logo: {
            type: 'object',
            description: 'company logo',
            properties: image,
          },
          image: {
            type: 'object',
            description: 'featured image',
            properties: image,
          },
          link: {
            type: 'object',
            description: 'controls a link to a resource with further details',
            properties: {
              text: { type: 'string', description: 'link text' },
              url: { type: 'string', description: 'link url' },
              type: {
                type: 'string',
                description: 'link type',
                options: ['internal', 'external', 'anchor'],
              },
            },
          },
        },
      },
    ],
  },
}
