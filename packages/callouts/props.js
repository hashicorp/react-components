module.exports = {
  heading: {
    type: 'string',
    description: 'Title text for the block of callouts.',
    testValue: 'Engagement Model',
  },
  subheading: {
    type: 'string',
    description: 'Descriptive text that will be shown below the heading.',
    testValue:
      'Meet your business goals with our end-to-end services. Our expert engineers  leverage reference architectures and proven best practices to deliver complete design, build, validation and go-live project phases.',
  },
  centerHeading: {
    type: 'boolean',
    description: 'Determines whether the heading will be centered',
    testValue: false,
  },
  layout: {
    type: 'string',
    description: 'Determines column layout (when space is available)',
    testValue: 'two-up',
    options: ['two-up', 'three-up', 'four-up'],
  },
  theme: {
    type: 'string',
    description:
      'Background color context for the component and items within it',
    testValue: 'light',
    options: ['light', 'dark'],
  },
  className: {
    type: 'string',
    description: 'Optional className to add to the root element',
  },
  product: {
    type: 'string',
    description: 'Product name for color theming',
    testValue: 'boundary',
    options: [
      'hashicorp',
      'terraform',
      'vault',
      'nomad',
      'consul',
      'packer',
      'vagrant',
      'boundary',
      'waypoint',
    ],
  },
  items: {
    type: 'array',
    description:
      'An array of item objects, each with properties `{ icon, heading, content, link }`. . `heading` is a string. `content` can be either a string, or a render function for custom content - the render function will be provided a props object `{ theme, product }`. `link` is an object with properties `{ text, url, type }`. `link.text` is a string. `link.url` is a string. `link.type` is one of "inbound", "outbound", or "anchor", and sets the icon shown next to the link.',
    properties: [
      {
        type: 'object',
        properties: {
          icon: {
            type: 'string|function',
            description:
              "A SVG string, or a render function for an SVGR component - the render function is provided a props object `{ theme, product }` to facilitate matching the parent component's appearance",
          },
          heading: {
            type: 'string',
            description: 'The heading text within the callout',
          },
          content: {
            type: 'string|function',
            description:
              'Can be either a string, or a render function for custom content - the render function will be provided a props object `{ theme, product }`',
          },
          link: {
            type: 'object',
            description: 'creates a button linking to a URL within the callout',
            properties: {
              text: { type: 'string', description: 'the text that is linked' },
              url: { type: 'string', description: 'url that is linked to' },
              type: {
                type: 'string',
                description: 'sets the icon shown next to the link',
                options: ['inbound', 'outbound', 'anchor'],
              },
            },
          },
        },
      },
    ],
    testValue: [
      {
        heading: 'Worldwide Support',
        content:
          'With HashiCorp Worldwide Support, you can get assistance when you need it from anywhere in the world with our ready-to-serve ticketing system and expert support team.',
        link: {
          text: 'Compare Plans',
          url: '#',
          linkType: 'anchor',
        },
      },
      {
        heading: 'Technical Account Management',
        content:
          'From best practice advice to regular cadences and quarterly business reviews, our Technical Account Managers (TAMs) will be your advocate, ensuring your teams are set up for long term success with HashiCorp every step of the way.',
        link: {
          text: 'Learn More',
          url: '#',
          linkType: 'inbound',
        },
      },
      {
        heading: 'Implementation Services',
        content:
          'Let highly skilled product domain experts help you achieve success by simplifying and accelerating the adoption of our cloud solutions starting at the implementation phase.',
        link: {
          text: 'Learn More',
          url: '#',
          linkType: 'inbound',
        },
      },
      {
        heading: 'Enterprise Architecture',
        content:
          "Large-scale systems and services can become complex to design and manage. Our Enterprise Architects can lay the foundation for your success through design consultation and architecture review using HashiCorp's recommended patterns.",
        link: {
          text: 'Learn More',
          url: '#',
          linkType: 'inbound',
        },
      },
    ],
  },
}
