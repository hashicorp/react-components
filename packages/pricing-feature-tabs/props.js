module.exports = {
  features: {
    type: 'array',
    properties: [
      {
        type: 'object',
        properties: {
          tabLabel: {
            type: 'object',
            required: true,
            properties: {
              icon: {
                type: 'React.ReactNode',
                required: true,
              },
              feature: {
                type: 'string',
                required: true,
              },
            },
          },
          tabContent: {
            type: 'React.ReactNode',
            required: true,
            description:
              'Element displayed in panel, usually <PricingTierTable />',
          },
        },
      },
    ],
  },
}
