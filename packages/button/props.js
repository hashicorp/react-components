module.exports = {
  title: {
    description: 'The text that appears inside the button.',
    type: 'string',
    control: { type: 'text' },
    testValue: 'Button Text',
    required: true,
  },
  url: {
    description: 'Where the button links to when clicked.',
    type: 'string',
    control: { type: 'text' },
    testValue: 'https://www.hashicorp.com',
  },
  label: {
    description:
      'A label that describes what this button does or where it takes the user. This is used for accessibility when the button text itself may not provide enough behavioral context. For example, when using generic CTAs ("Learn More"), use this property to add clarity.',
    type: 'string',
    control: { type: 'text' },
    testValue: 'To main HashiCorp website',
  },
  className: {
    description:
      'A custom class to be added directly to the button if necessary.',
    type: 'string',
    control: { type: 'text' },
  },
  external: {
    description: 'If true, rel="noopener" and target="_blank" will be set.',
    type: 'boolean',
    control: { type: 'checkbox' },
    testValue: false,
  },
  onClick: {
    description: 'A function that will be called when the button is clicked.',
    type: 'function',
  },
  size: {
    description: 'Styles the button with modified padding and font-size.',
    type: 'string',
    control: { type: 'select' },
    options: ['small', 'medium'],
    testValue: 'medium',
  },
  linkType: {
    description:
      'Allows convenient rendering of animated icons associate with each link type. If "outbound", `rel="noopener"` and `target="_blank"` will be set.',
    type: 'string',
    control: { type: 'select' },
    options: ['inbound', 'outbound', 'anchor', 'download'],
  },
  disabled: {
    description: 'If true, button will be disabled',
    type: 'boolean',
    control: { type: 'checkbox' },
    testValue: false,
  },
  theme: {
    type: 'object',
    description: 'Controls the visual appearance of the button.',
    properties: {
      brand: {
        description:
          'Styles the button with a color based on a HashiCorp product',
        type: 'string',
        control: { type: 'select' },
        options: [
          'neutral',
          'hashicorp',
          'nomad',
          'consul',
          'terraform',
          'vault',
          'packer',
          'vagrant',
          'waypoint',
          'boundary',
        ],
        testValue: 'hashicorp',
      },
      variant: {
        description:
          'Applies a styling to the button based on the desired hierarchy.',
        type: 'string',
        control: { type: 'select' },
        options: [
          'primary',
          'secondary',
          'tertiary',
          'tertiary-neutral',
          'ghost',
        ],
        testValue: 'primary',
      },
    },
  },
  icon: {
    type: 'object',
    description: 'Options for icon display within the button.',
    svg: {
      type: 'string',
      description:
        'SVG string to render, it will be resized to fit the button size.',
      control: { type: 'text' },
    },
    position: {
      type: 'string',
      description: 'The position of the icon relative to the button text.',
      control: { type: 'select' },
      options: ['left', 'right'],
      testValue: 'right',
    },
    isAnimated: {
      type: 'boolean',
      description:
        'Whether or not to animate the icon. Requires a corresponding animationId to be set. Note that linkType will also serve as the animationId.',
      control: { type: 'checkbox' },
      testValue: false,
    },
    animationId: {
      type: 'string',
      description:
        'A matching animationId, combined with "isAnimated" set to "true", will trigger specific icon animations on hover.',
      control: { type: 'text' },
    },
  },
}
