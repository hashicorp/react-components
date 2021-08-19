import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import CaseStudySlider from '../../../packages/case-study-slider'

export default {
  title: 'Components/CaseStudySlider',
  component: CaseStudySlider,
} as ComponentMeta<typeof CaseStudySlider>

const Template: ComponentStory<typeof CaseStudySlider> = (args) => {
  return <CaseStudySlider {...args} />
}

export const Basic = Template.bind({})
Basic.args = {
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
        headline: 'Case Study 1',
        description: 'Sample Text 1',
        caseStudyResource: {
          slug: 'https://www.hashicorp.com',
          image: {
            url: 'https://www.datocms-assets.com/2885/1538142087-ye-endahl.jpg',
          },
        },
        buttonLabel: 'Custom Label',
      },
      {
        company: {
          monochromeLogo: {
            url:
              'https://www.datocms-assets.com/2885/1524097005-adobe-black-1.svg',
          },
          whiteLogo: {
            url:
              'https://www.datocms-assets.com/2885/1524097013-adobe-white-1.svg',
          },
        },
        headline: 'Case Study 2',
        description: 'Sample Text 2',
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
