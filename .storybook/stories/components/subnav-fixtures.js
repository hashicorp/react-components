const Basic = {
  titleLink: { text: 'Title', url: '#' },
  menuItems: [
    { text: 'Link One', url: '#' },
    { text: 'Link Two', url: '#' },
    { text: 'Link Three', url: '#' },
  ],
  ctaLinks: [{ text: 'CTA Button', url: '#' }],
}

const WithProductLogo = {
  currentPath: '/enterprise',
  titleLink: {
    text: 'terraform',
    url: '/',
  },
  ctaLinks: [
    {
      text: 'GitHub',
      url: 'https://www.github.com/hashicorp/terraform',
    },
    {
      text: 'Download',
      url: '/download',
    },
  ],
  menuItems: [
    {
      text: 'Overview',
      url: '/',
    },
    {
      text: 'Use Cases',
      submenu: [
        {
          text: 'Infrastructure as Code',
          url: '/use-cases/infrastructure-as-code',
        },
        {
          text: 'Multi-Cloud Compliance and Management',
          url: '/use-cases/multi-cloud-compliance-and-management',
        },
        {
          text: 'Self-Service Infrastructure',
          url: '/use-cases/self-service-infrastructure',
        },
      ],
    },
    {
      text: 'Enterprise',
      url: '/enterprise',
    },
    'divider',
    {
      text: 'Whitepaper',
      url: '/whitepaper',
    },
    {
      text: 'Docs',
      url: '/docs',
    },
  ],
}

const AlignRight = {
  titleLink: {
    text: 'nomad',
    url: '/',
  },
  currentPath: '/',
  menuItemsAlign: 'right',
  menuItems: [
    {
      text: 'Overview',
      url: '/',
    },
    {
      text: 'Use Cases',
      submenu: [
        {
          text: 'Infrastructure as Code',
          url: '/use-cases/infrastructure-as-code',
        },
        {
          text: 'Multi-Cloud Compliance and Management',
          url: '/use-cases/multi-cloud-compliance-and-management',
        },
        {
          text: 'Self-Service Infrastructure',
          url: '/use-cases/self-service-infrastructure',
        },
      ],
    },
    {
      text: 'Enterprise',
      url: '/enterprise',
    },
    'divider',
    {
      text: 'Whitepaper',
      url: '/whitepaper',
    },
    {
      text: 'Docs',
      url: '/docs',
    },
    {
      text: 'API',
      url: '/api',
    },
    {
      text: 'Community',
      url: '/community',
    },
  ],
  ctaLinks: [
    {
      text: 'GitHub',
      url: 'https://www.github.com/hashicorp/nomad',
    },
    {
      text: 'Download',
      url: '/download',
    },
  ],
}

const WithFailingStarCount = {
  currentPath: '/enterprise',
  titleLink: {
    text: 'terraform',
    url: '/',
  },
  ctaLinks: [
    {
      text: 'GitHub',
      url:
        'https://www.github.com/hashicorp/will-probably-never-make-a-repo-with-this-name-that-has-any-stars',
    },
    {
      text: 'Download',
      url: '/download',
    },
  ],
  menuItems: [
    {
      text: 'Overview',
      url: '/',
    },
    {
      text: 'Use Cases',
      submenu: [
        {
          text: 'Infrastructure as Code',
          url: '/use-cases/infrastructure-as-code',
        },
        {
          text: 'Multi-Cloud Compliance and Management',
          url: '/use-cases/multi-cloud-compliance-and-management',
        },
        {
          text: 'Self-Service Infrastructure',
          url: '/use-cases/self-service-infrastructure',
        },
      ],
    },
    {
      text: 'Enterprise',
      url: '/enterprise',
    },
    'divider',
    {
      text: 'Whitepaper',
      url: '/whitepaper',
    },
    {
      text: 'Docs',
      url: '/docs',
    },
  ],
}

const WithHiddenStarCount = {
  currentPath: '/enterprise',
  titleLink: {
    text: 'terraform',
    url: '/',
  },
  ctaLinks: [
    {
      text: 'GitHub',
      url:
        'https://www.github.com/hashicorp/will-probably-never-make-a-repo-with-this-name-that-has-any-stars',
    },
    {
      text: 'Download',
      url: '/download',
    },
  ],
  hideGithubStars: true,
  menuItems: [
    {
      text: 'Overview',
      url: '/',
    },
    {
      text: 'Use Cases',
      submenu: [
        {
          text: 'Infrastructure as Code',
          url: '/use-cases/infrastructure-as-code',
        },
        {
          text: 'Multi-Cloud Compliance and Management',
          url: '/use-cases/multi-cloud-compliance-and-management',
        },
        {
          text: 'Self-Service Infrastructure',
          url: '/use-cases/self-service-infrastructure',
        },
      ],
    },
    {
      text: 'Enterprise',
      url: '/enterprise',
    },
    'divider',
    {
      text: 'Whitepaper',
      url: '/whitepaper',
    },
    {
      text: 'Docs',
      url: '/docs',
    },
  ],
}

const WithTitle = {
  currentPath: '/technical-account-management',
  titleLink: {
    text: 'Support',
    url: '/customer-success',
  },
  menuItems: [
    {
      text: 'Technical Account Management',
      url: '/technical-account-management',
    },
    {
      text: 'Implementation Services',
      url: '/implementation-services',
    },
    {
      text: 'Enterprise Architecture',
      url: '/enterprise-architecture',
    },
  ],
  ctaLinks: [
    {
      text: 'Get Support',
      url: '/',
    },
  ],
}

// export const WithPageContents = () => {
//   return (
//     <div>
//       <div
//         style={{
//           background: 'aliceblue',
//           paddingTop: '2vh',
//           paddingBottom: '2vh',
//         }}
//       >
//         <div className="g-grid-container">
//           Hello world! This is an alert banner or something.
//         </div>
//       </div>

//       <div
//         style={{
//           background: 'ghostwhite',
//           padding: '24px',
//         }}
//       >
//         Primary nav placeholder, it's full-width
//       </div>
//       <Subnav
//         constrainWidth={true}
//         currentPath="/enterprise"
//         titleLink={{
//           text: 'terraform',
//           url: '/',
//         }}
//         ctaLinks={[
//           {
//             text: 'GitHub',
//             url: 'https://www.github.com/hashicorp/terraform',
//           },
//           {
//             text: 'Download',
//             url: '/download',
//           },
//         ]}
//         menuItems={[
//           {
//             text: 'Overview',
//             url: '/',
//           },
//           {
//             text: 'Use Cases',
//             submenu: [
//               {
//                 text: 'Infrastructure as Code',
//                 url: '/use-cases/infrastructure-as-code',
//               },
//               {
//                 text: 'Multi-Cloud Compliance and Management',
//                 url: '/use-cases/multi-cloud-compliance-and-management',
//               },
//               {
//                 text: 'Self-Service Infrastructure',
//                 url: '/use-cases/self-service-infrastructure',
//               },
//             ],
//           },
//           {
//             text: 'Enterprise',
//             url: '/enterprise',
//           },
//           'divider',
//           {
//             text: 'Whitepaper',
//             url: '/whitepaper',
//           },
//           {
//             text: 'Docs',
//             url: '/docs',
//           },
//         ]}
//       />
//       <div
//         style={{
//           background: 'aliceblue',
//           textAlign: 'center',
//         }}
//       >
//         <div className="g-grid-container" style={{ minHeight: '200vh' }}>
//           <div style={{ background: 'lavender', padding: '10vh 0' }}>
//             Hello world! this is some centered page content in g-grid-container.
//             <br />
//             It just needs to take up some space on the page.
//           </div>
//         </div>
//         <div className="g-grid-container" style={{ padding: '10vh 0' }}>
//           Okay, that's enough.
//         </div>
//       </div>
//     </div>
//   )
// }

export default {
  Basic,
  WithProductLogo,
  AlignRight,
  WithFailingStarCount,
  WithHiddenStarCount,
  WithTitle,
}
