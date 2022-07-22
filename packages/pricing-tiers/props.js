module.exports = {
  icon: {
    type: 'element',
    description: 'Flight Icon as React element',
  },
  title: {
    type: 'string',
    required: true,
    description: 'Tier name',
  },
  label: {
    type: 'string',
    description: 'Pricing information',
  },
  price: {
    type: 'string',
    description: 'Price detail',
  },
  consumption: {
    type: 'string',
    description: 'Consumption detail',
  },
  description: {
    type: 'string',
    required: true,
    description: 'Detailed description of tier (html string)',
  },
  cta: {
    type: 'object',
    description: 'Button or text link call to action',
    required: true,
    properties: {
      url: {
        type: 'string',
        required: true,
      },
      title: {
        type: 'string',
        required: true,
      },
      type: {
        type: 'string',
        options: ['button', 'textLink'],
        default: 'textLink',
      },
      theme: {
        type: 'object',
        properties: {
          variant: {
            type: 'string',
            options: ['primary', 'secondary'],
            default: 'primary',
          },
        },
      },
    },
  },
  footnote: {
    type: 'string',
    description: 'Small footer (html string)',
  },
  size: {
    type: 'string',
    options: ['lg', 'md', 'xs', 'sm'],
    description:
      'If rendered within a PricingTierItemList, font sizes depend on the amount of cards in list',
    default: 'lg',
  },
}
