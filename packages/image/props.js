module.exports = {
  url: {
    type: 'string',
    description:
      'The image source, must be from datocms to work with this component',
    testValue: 'https://www.datocms-assets.com/2885/1508522484-share.jpg',
  },
  alt: {
    type: 'string',
    description:
      'The alt description for the image, optional but strongly encouraged',
    testValue: 'HashiCorp Logo',
  },
  format: {
    type: 'string',
    description:
      'Just the extension of the image. If not provided, will be auto-detected via the URL',
    testValue: 'jpg',
  },
  steps: {
    type: 'array',
    description:
      'An array of image widths that the image should be available at - the image closest to the current screen width will be used. Default value provided.',
    testValue: [250, 500, 750, 1000, 1500, 2000, 2500],
  },
  sizes: {
    type: 'string',
    description:
      'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes - default value provided.',
    testValue: '100vw',
  },
  aspectRatio: {
    type: 'array',
    description:
      "Optional, automatically crops the image to an aspect ratio. The first two items in the array are the ratio (ex. `[16,9]`), and the third is the base width that images will be cropped to in IE, which doesn't support srcset (ex. `[16,9,500]`). If string is provided, brackets should be excluded (ex. `16,9,500`). String will be converted to array.",
    testValue: [16, 9, 500],
  },
  imgixOptions: {
    type: 'object',
    description:
      'Additional imgix url parameters to add to the image (reference: https://docs.imgix.com/apis/url)',
    testValue: {},
  },
}
