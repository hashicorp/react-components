const TwoUp = {
  data: {
    caseStudies: [
      {
        company: {
          monochromeLogo: {
            url:
              'https://www.datocms-assets.com/2885/1538067560-proofpoint-logo-reg-k.png',
          },
          whiteLogo: {
            url:
              'https://www.datocms-assets.com/2885/1538067567-proofpoint-logo-reg-reversed.png',
          },
        },
        headline: 'Lorem pellentesque',
        description:
          'A phasellus diam dignissim pretium mi semper torquent, curae risus neque justo dictum nulla vitae, aliquam sollicitudin cum lacinia nisl interdum.',
        caseStudyResource: {
          slug: 'https://www.hashicorp.com',
          image: {
            url: 'https://www.datocms-assets.com/2885/1538142087-ye-endahl.jpg',
          },
        },
        buttonLabel: 'Read the study',
      },
      {
        company: {
          monochromeLogo: {
            url:
              'https://www.datocms-assets.com/2885/1524097005-adobe-black-1.svg',
          },
          whiteLogo: {
            url:
              'https://www.datocms-assets.com/2885/1539889072-1524097013-adobe-white-1.svg',
          },
        },
        headline: 'Placerat dolor volutpat',
        description:
          'Porttitor justo praesent torquent magnis dis maecenas eleifend, cras gravida elit volutpat semper potenti metus, sagittis accumsan consequat dictum mauris et.',
        caseStudyResource: {
          slug: 'https://www.hashicorp.com',
          image: {
            url:
              'https://www.datocms-assets.com/2885/1538233406-wa-6h7-400x400.jpg',
          },
        },
      },
    ],
  },
}

const ThreeUp = {
  data: {
    caseStudies: [
      TwoUp.data.caseStudies[0],
      TwoUp.data.caseStudies[1],
      {
        company: {
          monochromeLogo: {
            url: 'https://www.datocms-assets.com/2885/1535495419-black.png',
            alt: 'Logo dark',
            format: 'png',
          },
          whiteLogo: {
            url: 'https://www.datocms-assets.com/2885/1535495424-white.png',
            alt: 'Logo white',
            format: 'png',
          },
        },
        headline: 'This is the third case study',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut arcu justo, et convallis lectus. Sed commodo massa eget risus feugiat suscipit. Nulla velit lectus.',
        caseStudyResource: {
          slug: 'https://www.hashicorp.com',
          image: {
            url:
              'https://www.datocms-assets.com/2885/1535120026-36755049704aeaabe64ddk.jpg',
            alt: 'Test image',
            format: 'jpg',
          },
        },
        caseStudyImage: {
          url:
            'https://www.datocms-assets.com/2885/1535120026-36755049704aeaabe64ddk.jpg',
          alt: 'Case Study image override',
          format: 'jpg',
        },
      },
    ],
  },
}

export default {
  TwoUp,
  ThreeUp,
}
