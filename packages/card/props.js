const baseProps = {
  children: {
    type: 'function',
    description: 'Children to render into the Card.',
    required: true,
  },
  withArrow: {
    type: 'boolean',
    description:
      'Allows the arrow at the bottom of the card to render. Defaults to `true`.',
  },
  thumbnail: {
    type: 'object',
    description: "An image showcasing the card's destination.",
    properties: {
      src: {
        description: 'URL for the image',
        type: 'string',
        control: { type: 'input' },
        required: true,
      },
      alt: {
        description: 'Alternative text for the image',
        type: 'string',
        control: { type: 'input' },
        required: false,
      },
    },
  },
  meta: {
    type: 'array',
    description: 'Content shown above the card heading.',
    required: false,
    testValue: ['August 15, 2022', 'Category'],
  },
  appearance: {
    description: 'Styles the card with either a light or dark theme.',
    type: 'string',
    required: false,
    options: ['light', 'dark'],
    testValue: 'light',
  },
  heading: {
    description: "A bold headline describing the card's destination.",
    type: 'string',
    required: false,
  },
  productBadges: {
    type: 'object',
    description: `A list of ProductBadges.`,
    properties: {
      appearance: {
        description:
          'Styles the ProductBadges with either a light or dark theme.',
        type: 'string',
        required: false,
        options: ['light', 'dark'],
      },
      badges: {
        type: 'array',
        description: `A list of ProductBadges. See props for the ProductBadges component <a href="https://react-components.vercel.app/components/productbadges">here</a>`,
      },
    },
  },
  description: {
    description: "Text describing the card's destination.",
    type: 'string',
    required: false,
  },
  link: {
    type: 'string',
    description: 'A link followed when the card is clicked.',
    required: true,
    testValue: 'https://hashicorp.com',
  },
}

const thumbnailProps = {
  src: {
    description: 'URL for the image',
    type: 'string',
    control: { type: 'input' },
    required: true,
  },
  alt: {
    description: 'Alternative text for the image',
    type: 'string',
    control: { type: 'input' },
    required: false,
  },
}

const metaProps = {
  items: {
    type: 'array',
    description: 'Content shown above the card heading.',
    required: false,
    testValue: ['August 15, 2022', 'Category'],
  },
}

const headingProps = {
  as: {
    description: 'Changes the HTML element used to wrap the heading text.',
    type: 'string',
    required: false,
    options: ['h2', 'h3', 'h4'],
    testValue: 'h2',
  },
  children: {
    type: 'string',
    description: 'Text to render into the component.',
    required: true,
  },
}

const descriptionProps = {
  children: {
    type: 'string',
    description: 'Text to render into the component.',
    required: true,
  },
}

module.exports = {
  baseProps,
  thumbnailProps,
  metaProps,
  headingProps,
  descriptionProps,
}
