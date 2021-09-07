const baseProps = require('../../props.js')

module.exports = {
  product: { ...baseProps.product },
  centerText: {
    type: 'boolean',
    description: 'Is text centered on mobile viewports?',
    control: 'checkbox',
    testValue: false,
  },
  data: {
    type: 'array',
    description: 'An object containing data from the CMS',
    control: { type: 'json' },
    properties: [
      {
        type: 'object',
        properties: {
          header: {
            description: 'headline of the current item',
            type: 'string',
          },
          body: {
            type: 'string',
            description:
              'text that appears to the right of the headline, can contain HTML',
          },
          linkUrl: {
            type: 'string',
            description:
              'when the item is clicked, it will direct to this URL, if present',
          },
          logo: {
            type: 'object',
            description:
              'an image displayed instead of the `header`, if present',
            properties: {
              url: { type: 'string', description: 'image url' },
              alt: { type: 'string', description: 'image alt' },
            },
          },
        },
      },
    ],
    testValue: [
      {
        logo: {
          url:
            'https://www.datocms-assets.com/2885/1536611731-meganav-terraform.svg',
          alt: 'Terraform Logo',
        },
        header: 'This is a header',
        body: 'This is some body text to display',
        linkUrl: 'https://learn.hashicorp.com/terraform',
      },
      {
        header: 'This is a header 2',
        body: 'This is some [body text](http://www.google.com) to display',
      },
      {
        logo: {
          url:
            'https://www.datocms-assets.com/2885/1536611729-meganav-nomad.svg',
          alt: 'Nomad Logo',
        },
        header: 'This is a header 3',
        body:
          'This is some body text to display. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut **arcu justo**, et convallis lectus. Sed commodo massa eget risus [feugiat suscipit](https://www.hashicorp.com). Nulla velit lectus, imperdiet cursus tempor at, adipiscing sit amet nisi. Aliquam vitae egestas erat. Aliquam erat volutpat. Aliquam iaculis facilisis elit, sed vulputate sem cursus ut. Morbi elit lacus, varius at porttitor nec, gravida in sapien. Aliquam erat volutpat. Nulla ut lorem libero, in lacinia velit.',
        linkUrl: 'https://learn.hashicorp.com/nomad',
      },
      {
        header: 'This is a longer header that wraps',
        body:
          'This is some [body text](http://www.google.com) to display with some additional text to see how it handles it.',
      },
      {
        logo: {
          url:
            'https://www.datocms-assets.com/2885/1537300245-terraform-color.svg',
          alt: 'Terraform Logo',
        },
        header: 'This is a header 4',
        body: 'This is some body text to display wow',
      },
    ],
  },
  className: {
    type: 'string',
    description: 'Optional className to add to the root element',
  },
}
