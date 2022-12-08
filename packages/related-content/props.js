const baseProps = {
  appearance: {
    type: 'string',
    options: ['light', 'dark'],
    description: 'Render on light or dark backgrounds',
  },
  headline: {
    type: 'string',
    required: true,
    description: 'Headline for the section',
  },
  description: {
    type: 'string',
    description: 'Description text for the section',
  },
  cards: {
    type: 'array',
    required: true,
    description: `See props for the Card component <a href="https://react-components.vercel.app/components/card">here</a>`,
  },
  cta: {
    type: 'Object',
    description:
      'Optional CTA. Uses the StandaloneLink component. See StandaloneLink props <a href="https://react-components.vercel.app/components/standalone-link">here</a>',
  },
}

module.exports = {
  baseProps,
}
